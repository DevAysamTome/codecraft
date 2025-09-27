import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  summary: string;
  description: string;
  categories: string[];
  tags: string[];
  startingPrice?: number;
  deliverables: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
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
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    startingPrice: {
      type: Number,
      min: 0,
    },
    deliverables: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes
ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ categories: 1 });
ServiceSchema.index({ tags: 1 });
ServiceSchema.index({ title: 'text', description: 'text', summary: 'text' });

export default mongoose.models.Service ||
  mongoose.model<IService>('Service', ServiceSchema);
