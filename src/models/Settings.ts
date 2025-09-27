import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  siteTitle: string;
  defaultLocale: string;
  seoDefaults: {
    title: string;
    description: string;
    keywords: string[];
  };
  contactEmail: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  analyticsId?: string;
  cloudinaryConfig: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteTitle: {
      type: String,
      required: [true, 'Site title is required'],
      trim: true,
    },
    defaultLocale: {
      type: String,
      default: 'en',
      enum: ['en', 'ar'],
    },
    seoDefaults: {
      title: {
        type: String,
        required: [true, 'SEO title is required'],
        trim: true,
      },
      description: {
        type: String,
        required: [true, 'SEO description is required'],
        trim: true,
      },
      keywords: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
    },
    socialLinks: {
      facebook: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
    },
    analyticsId: {
      type: String,
      trim: true,
    },
    cloudinaryConfig: {
      cloudName: {
        type: String,
        required: [true, 'Cloudinary cloud name is required'],
        trim: true,
      },
      apiKey: {
        type: String,
        required: [true, 'Cloudinary API key is required'],
        trim: true,
      },
      apiSecret: {
        type: String,
        required: [true, 'Cloudinary API secret is required'],
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
SettingsSchema.index({}, { unique: true });

export default mongoose.models.Settings ||
  mongoose.model<ISettings>('Settings', SettingsSchema);
