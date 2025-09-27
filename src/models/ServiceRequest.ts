import mongoose, { Document, Schema } from 'mongoose';

export interface IServiceRequest extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceId?: mongoose.Types.ObjectId;
  message: string;
  budgetRange?: string;
  deadline?: Date;
  attachments: string[];
  status: 'new' | 'in-review' | 'quoted' | 'closed';
  assignedTo?: mongoose.Types.ObjectId;
  internalNotes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceRequestSchema = new Schema<IServiceRequest>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    budgetRange: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
    },
    attachments: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['new', 'in-review', 'quoted', 'closed'],
      default: 'new',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
    internalNotes: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes
ServiceRequestSchema.index({ email: 1 });
ServiceRequestSchema.index({ status: 1 });
ServiceRequestSchema.index({ createdAt: -1 });
ServiceRequestSchema.index({ assignedTo: 1 });

export default mongoose.models.ServiceRequest ||
  mongoose.model<IServiceRequest>('ServiceRequest', ServiceRequestSchema);
