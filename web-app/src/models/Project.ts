import mongoose, { Schema, Document } from "mongoose";

export interface IComponentInstance {
  instanceId: string;
  componentId: string;
  category: string;
  props: Record<string, unknown>;
  order: number;
}

export interface IRoute {
  path: string;
  tag: "protected" | "unprotected";
  components: IComponentInstance[];
}

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  routes: IRoute[];
  deployedPort: number | null;
  deployedPid: number | null;
  lastDeployedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ComponentInstanceSchema = new Schema(
  {
    instanceId: { type: String, required: true },
    componentId: { type: String, required: true },
    category: { type: String, required: true },
    props: { type: Schema.Types.Mixed, default: {} },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const RouteSchema = new Schema(
  {
    path: { type: String, required: true },
    tag: { type: String, enum: ["protected", "unprotected"], default: "unprotected" },
    components: { type: [ComponentInstanceSchema], default: [] },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: "My LMS Site" },
    routes: {
      type: [RouteSchema],
      default: [{ path: "/", tag: "unprotected", components: [] }],
    },
    deployedPort: { type: Number, default: null },
    deployedPid: { type: Number, default: null },
    lastDeployedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
