import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISystem extends Document {
    name: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const systemSchema = new Schema<ISystem>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export const System = mongoose.model<ISystem>('System', systemSchema);
