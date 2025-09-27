import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  client?: string;
  summary: string;
  description: string;
  techStack: string[];
  role: string;
  images: string[];
  projectUrl?: string;
  categories: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    projectUrl: {
      type: String,
      trim: true,
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ categories: 1 });
ProjectSchema.index({ published: 1 });
ProjectSchema.index({ title: 'text', description: 'text', summary: 'text' });

export default mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema);
