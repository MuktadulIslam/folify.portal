import { create } from "zustand";
import { Route, ComponentInstance, Project } from "@/types/builder";

interface BuilderState {
  // Project
  projectId: string | null;
  projectName: string;
  routes: Route[];
  activeRoutePath: string;

  // Canvas
  canvasComponents: ComponentInstance[];

  // UI state
  selectedDevice: "laptop" | "tablet" | "mobile";
  editingComponentId: string | null;
  isEditPanelOpen: boolean;

  // Deploy
  deployedPort: number | null;
  isDeploying: boolean;

  // Actions
  setProject: (project: Project) => void;
  setActiveRoute: (path: string) => void;
  addRoute: (path: string, tag: "protected" | "unprotected") => void;
  updateRoute: (oldPath: string, newPath: string, tag: "protected" | "unprotected") => void;
  deleteRoute: (path: string) => void;
  addComponentToCanvas: (component: ComponentInstance) => void;
  removeComponentFromCanvas: (instanceId: string) => void;
  reorderComponents: (fromIndex: number, toIndex: number) => void;
  updateComponentProps: (instanceId: string, props: Record<string, unknown>) => void;
  openEditPanel: (instanceId: string) => void;
  closeEditPanel: () => void;
  setDevice: (device: "laptop" | "tablet" | "mobile") => void;
  setDeployedPort: (port: number | null) => void;
  setIsDeploying: (val: boolean) => void;
  saveCurrentRouteComponents: () => Route[];
  loadRouteComponents: (path: string) => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  projectId: null,
  projectName: "My LMS Site",
  routes: [],
  activeRoutePath: "/",
  canvasComponents: [],
  selectedDevice: "laptop",
  editingComponentId: null,
  isEditPanelOpen: false,
  deployedPort: null,
  isDeploying: false,

  setProject: (project) => {
    const activeRoute = project.routes[0]?.path || "/";
    set({
      projectId: project._id,
      projectName: project.name,
      routes: project.routes,
      activeRoutePath: activeRoute,
      canvasComponents: project.routes.find((r) => r.path === activeRoute)?.components || [],
      deployedPort: project.deployedPort,
    });
  },

  setActiveRoute: (path) => {
    const state = get();
    // Save current route's components first
    const updatedRoutes = state.saveCurrentRouteComponents();
    // Load new route's components
    const route = updatedRoutes.find((r) => r.path === path);
    set({
      activeRoutePath: path,
      routes: updatedRoutes,
      canvasComponents: route?.components || [],
      editingComponentId: null,
      isEditPanelOpen: false,
    });
  },

  addRoute: (path, tag) => {
    set((state) => ({
      routes: [...state.routes, { path, tag, components: [] }],
    }));
  },

  updateRoute: (oldPath, newPath, tag) => {
    set((state) => ({
      routes: state.routes.map((r) =>
        r.path === oldPath ? { ...r, path: newPath, tag } : r
      ),
      activeRoutePath: state.activeRoutePath === oldPath ? newPath : state.activeRoutePath,
    }));
  },

  deleteRoute: (path) => {
    set((state) => {
      const newRoutes = state.routes.filter((r) => r.path !== path);
      const newActive =
        state.activeRoutePath === path
          ? newRoutes[0]?.path || "/"
          : state.activeRoutePath;
      return {
        routes: newRoutes,
        activeRoutePath: newActive,
        canvasComponents:
          state.activeRoutePath === path
            ? newRoutes.find((r) => r.path === newActive)?.components || []
            : state.canvasComponents,
      };
    });
  },

  addComponentToCanvas: (component) => {
    set((state) => ({
      canvasComponents: [...state.canvasComponents, component],
    }));
  },

  removeComponentFromCanvas: (instanceId) => {
    set((state) => ({
      canvasComponents: state.canvasComponents.filter((c) => c.instanceId !== instanceId),
      editingComponentId:
        state.editingComponentId === instanceId ? null : state.editingComponentId,
      isEditPanelOpen:
        state.editingComponentId === instanceId ? false : state.isEditPanelOpen,
    }));
  },

  reorderComponents: (fromIndex, toIndex) => {
    set((state) => {
      const items = [...state.canvasComponents];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { canvasComponents: items.map((c, i) => ({ ...c, order: i })) };
    });
  },

  updateComponentProps: (instanceId, props) => {
    set((state) => ({
      canvasComponents: state.canvasComponents.map((c) =>
        c.instanceId === instanceId ? { ...c, props: { ...c.props, ...props } } : c
      ),
    }));
  },

  openEditPanel: (instanceId) => {
    set({ editingComponentId: instanceId, isEditPanelOpen: true });
  },

  closeEditPanel: () => {
    set({ editingComponentId: null, isEditPanelOpen: false });
  },

  setDevice: (device) => set({ selectedDevice: device }),

  setDeployedPort: (port) => set({ deployedPort: port }),

  setIsDeploying: (val) => set({ isDeploying: val }),

  saveCurrentRouteComponents: () => {
    const state = get();
    return state.routes.map((r) =>
      r.path === state.activeRoutePath
        ? { ...r, components: state.canvasComponents }
        : r
    );
  },

  loadRouteComponents: (path) => {
    const state = get();
    const route = state.routes.find((r) => r.path === path);
    set({ canvasComponents: route?.components || [] });
  },
}));
