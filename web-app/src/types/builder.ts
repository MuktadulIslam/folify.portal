export interface ComponentInstance {
  instanceId: string;
  componentId: string;
  category: string;
  props: Record<string, unknown>;
  order: number;
}

export interface Route {
  path: string;
  tag: "protected" | "unprotected";
  components: ComponentInstance[];
}

export interface Project {
  _id: string;
  userId: string;
  name: string;
  routes: Route[];
  deployedPort: number | null;
  deployedPid: number | null;
  lastDeployedAt: string | null;
}
