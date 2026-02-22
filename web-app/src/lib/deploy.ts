import { exec, spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

const DEPLOY_BASE_DIR =
  process.env.DEPLOY_BASE_DIR || "e:/Github/folify.portal/deployments";
const DEPLOY_PORT_START = parseInt(
  process.env.DEPLOY_PORT_START || "55550",
  10
);

interface DeployConfig {
  projectId: string;
  routes: {
    path: string;
    components: {
      instanceId: string;
      componentId: string;
      category: string;
      props: Record<string, unknown>;
      order: number;
    }[];
  }[];
}

function getComponentFileName(componentId: string): string {
  return componentId.split("/").pop() || componentId;
}

function getCategory(componentId: string): string {
  return componentId.split("/")[0] || componentId;
}

// Generate the page.tsx content for a route
function generatePageContent(
  routeComponents: DeployConfig["routes"][0]["components"]
): string {
  if (routeComponents.length === 0) {
    return `export default function Page() {
  return <main><p>No components yet.</p></main>;
}
`;
  }

  const imports: string[] = [];
  const componentUsages: string[] = [];

  routeComponents
    .sort((a, b) => a.order - b.order)
    .forEach((comp) => {
      const fileName = getComponentFileName(comp.componentId);
      const category = getCategory(comp.componentId);
      const importName = `${fileName}_${comp.instanceId.replace(/-/g, "").slice(0, 8)}`;

      imports.push(
        `import ${importName} from "@/components/${category}/${fileName}";`
      );

      const propsStr = Object.entries(comp.props)
        .map(([key, value]) => {
          if (typeof value === "string") return `${key}="${value}"`;
          return `${key}={${JSON.stringify(value)}}`;
        })
        .join(" ");

      componentUsages.push(`      <${importName} ${propsStr} />`);
    });

  return `"use client";

${imports.join("\n")}

export default function Page() {
  return (
    <main>
${componentUsages.join("\n")}
    </main>
  );
}
`;
}

function generatePackageJson(projectId: string): string {
  return JSON.stringify(
    {
      name: `deployed-${projectId}`,
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: "16.1.6",
        react: "19.2.3",
        "react-dom": "19.2.3",
      },
      devDependencies: {
        "@tailwindcss/postcss": "^4",
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        tailwindcss: "^4",
        typescript: "^5",
      },
    },
    null,
    2
  );
}

function generateTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: false,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./src/*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    },
    null,
    2
  );
}

function generateNextConfig(): string {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
`;
}

function generatePostcssConfig(): string {
  return `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`;
}

function generateNextEnvDts(): string {
  return `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`;
}

function generateGlobalsCss(): string {
  return `@import "tailwindcss";`;
}

function generateRootLayout(): string {
  return `import "./globals.css";

export const metadata = {
  title: "My LMS Site",
  description: "Built with Folify LMS Builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
}

async function findAvailablePort(usedPorts: number[]): Promise<number> {
  let port = DEPLOY_PORT_START;
  while (usedPorts.includes(port)) {
    port++;
  }
  return port;
}

export async function freePort(port: number): Promise<void> {
  try {
    if (process.platform === "win32") {
      // Find PIDs using the port and kill them
      const { stdout } = await execAsync(
        `netstat -ano | findstr :${port} | findstr LISTENING`
      );
      const lines = stdout.trim().split("\n");
      const pids = new Set<string>();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== "0") pids.add(pid);
      }
      for (const pid of pids) {
        await execAsync(`taskkill /F /PID ${pid} /T`).catch(() => {});
      }
    } else {
      await execAsync(`lsof -ti:${port} | xargs -r kill -9`).catch(() => {});
    }
  } catch {
    // Port might not be in use
  }
}

export async function killProcess(pid: number): Promise<void> {
  try {
    if (process.platform === "win32") {
      await execAsync(`taskkill /F /PID ${pid} /T`);
    } else {
      process.kill(pid, "SIGTERM");
    }
  } catch {
    // Process might already be dead
  }
}

async function copyComponentFile(
  componentId: string,
  deployDir: string,
  sourceBaseDir: string
): Promise<void> {
  const category = getCategory(componentId);
  const fileName = getComponentFileName(componentId);

  const sourcePath = path.join(
    sourceBaseDir,
    "src/components/lms",
    category,
    `${fileName}.tsx`
  );
  const destDir = path.join(deployDir, "src/components", category);
  const destPath = path.join(destDir, `${fileName}.tsx`);

  await fs.mkdir(destDir, { recursive: true });

  // Read the component, strip the type import and replace typed params with `any`
  let content = await fs.readFile(sourcePath, "utf-8");

  // Remove type imports from @/types/components
  content = content.replace(
    /import\s+type\s+\{[^}]*\}\s+from\s+["']@\/types\/components["'];?\s*\n?/g,
    ""
  );

  // Replace typed destructured params like }: NavbarProps) with }: any)
  content = content.replace(
    /\}:\s*(?:NavbarProps|FooterProps|CardProps|CheckoutProps|SubscriptionProps|LoginProps|RegistrationProps|BaseComponentProps)\)/g,
    "}: any)"
  );

  await fs.writeFile(destPath, content, "utf-8");
}

export async function deployProject(
  config: DeployConfig,
  existingPort: number | null,
  existingPid: number | null,
  usedPorts: number[]
): Promise<{ port: number; pid: number }> {
  const deployDir = path.join(DEPLOY_BASE_DIR, config.projectId);
  const sourceBaseDir = path.resolve(process.cwd());

  // Kill existing deployment if any
  if (existingPid) {
    await killProcess(existingPid);
  }

  // If this project already had a port, free that port
  if (existingPort) {
    await freePort(existingPort);
  }

  // Remove existing deploy directory
  try {
    await fs.rm(deployDir, { recursive: true, force: true });
  } catch {
    // Directory might not exist
  }

  // Create directory structure
  await fs.mkdir(path.join(deployDir, "src/app"), { recursive: true });

  // Write base project files
  await fs.writeFile(
    path.join(deployDir, "package.json"),
    generatePackageJson(config.projectId)
  );
  await fs.writeFile(path.join(deployDir, "tsconfig.json"), generateTsConfig());
  await fs.writeFile(
    path.join(deployDir, "next.config.mjs"),
    generateNextConfig()
  );
  await fs.writeFile(
    path.join(deployDir, "postcss.config.mjs"),
    generatePostcssConfig()
  );
  await fs.writeFile(
    path.join(deployDir, "next-env.d.ts"),
    generateNextEnvDts()
  );
  await fs.writeFile(
    path.join(deployDir, "src/app/globals.css"),
    generateGlobalsCss()
  );
  await fs.writeFile(
    path.join(deployDir, "src/app/layout.tsx"),
    generateRootLayout()
  );

  // Collect all unique component IDs used across all routes
  const usedComponentIds = new Set<string>();
  for (const route of config.routes) {
    for (const comp of route.components) {
      usedComponentIds.add(comp.componentId);
    }
  }

  // Copy component files (with type imports stripped)
  for (const componentId of usedComponentIds) {
    await copyComponentFile(componentId, deployDir, sourceBaseDir);
  }

  // Generate page files for each route
  for (const route of config.routes) {
    const routePath = route.path === "/" ? "" : route.path;
    const pageDir = path.join(deployDir, "src/app", routePath);
    await fs.mkdir(pageDir, { recursive: true });

    const pageContent = generatePageContent(route.components);
    await fs.writeFile(path.join(pageDir, "page.tsx"), pageContent);
  }

  // Determine port: reuse existing port or find a new one
  const port = existingPort || (await findAvailablePort(usedPorts));

  // Make sure the port is free before starting
  await freePort(port);

  // Install dependencies & build
  const isWindows = process.platform === "win32";
  const npmCmd = isWindows ? "npm.cmd" : "npm";
  const npxCmd = isWindows ? "npx.cmd" : "npx";

  await execAsync(`${npmCmd} install`, {
    cwd: deployDir,
    timeout: 120000,
    env: { ...process.env, NODE_ENV: "development" },
  });

  await execAsync(`${npmCmd} run build`, {
    cwd: deployDir,
    timeout: 120000,
    env: { ...process.env, NODE_ENV: "production" },
  });

  // Start the production server as a detached process so it survives main server restarts.
  // On Windows, spawn + detached + stdio:"ignore" throws EINVAL, so use `start /B` via execAsync instead.
  let pid: number;
  if (isWindows) {
    const { stdout } = await execAsync(
      `powershell -Command "Start-Process -FilePath '${npxCmd}' -ArgumentList 'next','start','-p','${port}' -WorkingDirectory '${deployDir}' -WindowStyle Hidden -PassThru | Select-Object -ExpandProperty Id"`,
      { env: { ...process.env, NODE_ENV: "production" } }
    );
    pid = parseInt(stdout.trim(), 10);
  } else {
    const child = spawn(npxCmd, ["next", "start", "-p", String(port)], {
      cwd: deployDir,
      detached: true,
      stdio: "ignore",
      env: { ...process.env, NODE_ENV: "production" },
    });
    child.unref();
    pid = child.pid!;
  }

  // Poll until the server is ready (up to 30s)
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://localhost:${port}`, { signal: AbortSignal.timeout(1000) });
      if (res.status < 500) break;
    } catch {
      // Not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return { port, pid };
}

/**
 * Restarts an already-built deployed project (e.g. after main server restart).
 * The project directory and build must already exist.
 */
export async function startDeployedProject(
  projectId: string,
  port: number
): Promise<number> {
  const deployDir = path.join(DEPLOY_BASE_DIR, projectId);
  const isWindows = process.platform === "win32";
  const npxCmd = isWindows ? "npx.cmd" : "npx";

  await freePort(port);

  let pid: number;
  if (isWindows) {
    const { stdout } = await execAsync(
      `powershell -Command "Start-Process -FilePath '${npxCmd}' -ArgumentList 'next','start','-p','${port}' -WorkingDirectory '${deployDir}' -WindowStyle Hidden -PassThru | Select-Object -ExpandProperty Id"`,
      { env: { ...process.env, NODE_ENV: "production" } }
    );
    pid = parseInt(stdout.trim(), 10);
  } else {
    const child = spawn(npxCmd, ["next", "start", "-p", String(port)], {
      cwd: deployDir,
      detached: true,
      stdio: "ignore",
      env: { ...process.env, NODE_ENV: "production" },
    });
    child.unref();
    pid = child.pid!;
  }

  // Poll until the server is ready (up to 30s)
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://localhost:${port}`, {
        signal: AbortSignal.timeout(1000),
      });
      if (res.status < 500) break;
    } catch {
      // Not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return pid;
}
