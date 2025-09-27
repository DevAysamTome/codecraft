// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require('mongoose');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcryptjs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });

// Define models directly in the seed script
const AdminUserSchema = new mongoose.Schema(
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

const ServiceSchema = new mongoose.Schema(
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

const ProjectSchema = new mongoose.Schema(
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

const SettingsSchema = new mongoose.Schema(
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

// Create models
const AdminUser =
  mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
const Service =
  mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Settings =
  mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedAdminUser = async () => {
  try {
    const existingAdmin = await AdminUser.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    const adminUser = new AdminUser({
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME,
      passwordHash: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

const seedServices = async () => {
  try {
    const services = [
      {
        title: 'Web Development',
        slug: 'web-development',
        summary: 'Custom web applications built with modern technologies',
        description:
          'We create responsive, scalable web applications using the latest frameworks and technologies. Our solutions are optimized for performance, security, and user experience.',
        categories: ['Development', 'Web'],
        tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
        startingPrice: 5000,
        deliverables: [
          'Responsive web application',
          'Admin dashboard',
          'API integration',
          'SEO optimization',
          'Performance optimization',
        ],
        images: [],
      },
      {
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        summary: 'Native and cross-platform mobile applications',
        description:
          'We develop mobile applications for iOS and Android using native technologies or cross-platform frameworks like React Native and Flutter.',
        categories: ['Development', 'Mobile'],
        tags: ['React Native', 'Flutter', 'iOS', 'Android'],
        startingPrice: 8000,
        deliverables: [
          'Native mobile app',
          'App store deployment',
          'Push notifications',
          'Offline functionality',
          'App store optimization',
        ],
        images: [],
      },
      {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        summary: 'User-centered design solutions',
        description:
          'We create beautiful, intuitive user interfaces and user experiences that engage users and drive business results.',
        categories: ['Design', 'UI/UX'],
        tags: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
        startingPrice: 3000,
        deliverables: [
          'User research',
          'Wireframes',
          'High-fidelity designs',
          'Prototypes',
          'Design system',
        ],
        images: [],
      },
      {
        title: 'Technology Consulting',
        slug: 'technology-consulting',
        summary: 'Strategic technology planning and guidance',
        description:
          'We help businesses make informed technology decisions and develop strategies for digital transformation.',
        categories: ['Consulting', 'Strategy'],
        tags: ['Architecture', 'Cloud', 'DevOps', 'Security'],
        startingPrice: 2000,
        deliverables: [
          'Technology assessment',
          'Architecture recommendations',
          'Implementation roadmap',
          'Team training',
          'Ongoing support',
        ],
        images: [],
      },
    ];

    for (const serviceData of services) {
      const existingService = await Service.findOne({ slug: serviceData.slug });
      if (!existingService) {
        const service = new Service(serviceData);
        await service.save();
        console.log(`Service created: ${serviceData.title}`);
      }
    }
  } catch (error) {
    console.error('Error seeding services:', error);
  }
};

const seedProjects = async () => {
  try {
    const projects = [
      {
        title: 'E-commerce Platform',
        slug: 'ecommerce-platform',
        client: 'TechStore Inc.',
        summary: 'Modern e-commerce platform with advanced features',
        description:
          'A comprehensive e-commerce solution with inventory management, payment processing, and analytics dashboard.',
        techStack: [
          'Next.js',
          'TypeScript',
          'MongoDB',
          'Stripe',
          'Tailwind CSS',
        ],
        role: 'Full-stack Developer',
        images: [],
        projectUrl: 'https://example-ecommerce.com',
        categories: ['Web Development', 'E-commerce'],
        published: true,
      },
      {
        title: 'Mobile Banking App',
        slug: 'mobile-banking-app',
        client: 'FinanceCorp',
        summary: 'Secure mobile banking application',
        description:
          'A secure mobile banking app with biometric authentication, transaction management, and real-time notifications.',
        techStack: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
        role: 'Mobile Developer',
        images: [],
        projectUrl: 'https://apps.apple.com/banking-app',
        categories: ['Mobile Development', 'Fintech'],
        published: true,
      },
      {
        title: 'Healthcare Management System',
        slug: 'healthcare-management-system',
        client: 'MediCare Solutions',
        summary: 'Comprehensive healthcare management platform',
        description:
          'A complete healthcare management system with patient records, appointment scheduling, and billing integration.',
        techStack: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
        role: 'Full-stack Developer',
        images: [],
        projectUrl: 'https://healthcare.example.com',
        categories: ['Web Development', 'Healthcare'],
        published: true,
      },
    ];

    for (const projectData of projects) {
      const existingProject = await Project.findOne({ slug: projectData.slug });
      if (!existingProject) {
        const project = new Project(projectData);
        await project.save();
        console.log(`Project created: ${projectData.title}`);
      }
    }
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

const seedSettings = async () => {
  try {
    const existingSettings = await Settings.findOne();
    if (existingSettings) {
      console.log('Settings already exist');
      return;
    }

    const settings = new Settings({
      siteTitle: 'Code Craft Technology',
      defaultLocale: 'en',
      seoDefaults: {
        title: 'Code Craft Technology - Digital Solutions for Tomorrow',
        description:
          'We create innovative web applications, mobile apps, and digital solutions that drive business growth and enhance user experiences.',
        keywords: [
          'web development',
          'mobile development',
          'UI/UX design',
          'technology consulting',
        ],
      },
      contactEmail: process.env.CONTACT_EMAIL || 'contact@codecraft.com',
      socialLinks: {
        facebook: 'https://facebook.com/codecraft',
        twitter: 'https://twitter.com/codecraft',
        linkedin: 'https://linkedin.com/company/codecraft',
        instagram: 'https://instagram.com/codecraft',
      },
      cloudinaryConfig: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
      },
    });

    await settings.save();
    console.log('Settings created successfully');
  } catch (error) {
    console.error('Error seeding settings:', error);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Starting database seeding...');

    await seedAdminUser();
    await seedServices();
    await seedProjects();
    await seedSettings();

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
