import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminUser extends Document {
  email: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'editor'],
      default: 'editor',
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
AdminUserSchema.index({ email: 1 });
AdminUserSchema.index({ role: 1 });

export default mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
