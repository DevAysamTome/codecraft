# Deployment Guide

## Overview

This guide covers deploying the Code Craft Technology application to various platforms with proper configuration and best practices.

## Prerequisites

- Node.js 18.x or higher
- MongoDB database (MongoDB Atlas or self-hosted)
- Cloudinary account for file storage
- SMTP email service (Gmail, SendGrid, etc.)
- Domain name (optional)

## Environment Variables

### Required Variables

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codecraft

# NextAuth.js
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key-here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Site Configuration
SITE_URL=https://your-domain.com
CONTACT_EMAIL=contact@codecraft.com
```

### Optional Variables

```env
# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Monitoring
SENTRY_DSN=https://your-sentry-dsn

# Admin User (for initial setup)
ADMIN_EMAIL=admin@codecraft.com
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin User
```

## Vercel Deployment (Recommended)

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2. Environment Variables

Add all required environment variables in the Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate values
3. Set environment scope (Production, Preview, Development)

### 3. Domain Configuration

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### 4. Automatic Deployments

- **Production**: Deploys on push to `main` branch
- **Preview**: Deploys on pull requests
- **Development**: Deploys on push to other branches

## Netlify Deployment

### 1. Build Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Environment Variables

Add environment variables in Netlify dashboard:

1. Go to Site Settings → Environment Variables
2. Add all required variables

### 3. Functions

For API routes, you may need to use Netlify Functions or deploy to a separate server.

## Railway Deployment

### 1. Connect Repository

1. Go to [Railway](https://railway.app)
2. Create new project from GitHub
3. Select your repository

### 2. Environment Variables

Add environment variables in Railway dashboard:

1. Go to Variables tab
2. Add all required variables

### 3. Database

Railway provides MongoDB as a service:

1. Add MongoDB service
2. Use the connection string as `MONGODB_URI`

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - MONGODB_URI=mongodb://mongo:27017/codecraft
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret-key
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### 3. Build and Run

```bash
docker-compose up -d
```

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster
3. Create database user
4. Whitelist your IP addresses
5. Get connection string

### Self-hosted MongoDB

1. Install MongoDB on your server
2. Configure authentication
3. Set up SSL/TLS
4. Configure firewall rules

## Email Configuration

### Gmail SMTP

1. Enable 2-factor authentication
2. Generate app password
3. Use app password in `SMTP_PASS`

### SendGrid

1. Create SendGrid account
2. Generate API key
3. Use API key as `SMTP_PASS`
4. Set `SMTP_HOST=smtp.sendgrid.net`

### Mailgun

1. Create Mailgun account
2. Get SMTP credentials
3. Use provided credentials

## File Storage

### Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get API credentials
3. Configure upload presets
4. Set up transformations

### Alternative: AWS S3

If not using Cloudinary, you can configure AWS S3:

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

## SSL/TLS Configuration

### Vercel

SSL is automatically configured and managed by Vercel.

### Custom Domain

1. Obtain SSL certificate (Let's Encrypt recommended)
2. Configure web server (Nginx/Apache)
3. Set up automatic renewal

## Monitoring and Logging

### Vercel Analytics

Enable Vercel Analytics in project settings for performance monitoring.

### Sentry Integration

Add Sentry for error tracking:

```env
SENTRY_DSN=https://your-sentry-dsn
```

### Logging

Configure logging for production:

```javascript
// lib/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
```

## Performance Optimization

### Image Optimization

- Use Next.js Image component
- Configure Cloudinary transformations
- Implement lazy loading

### Caching

- Configure Redis for session storage
- Use CDN for static assets
- Implement API response caching

### Database Optimization

- Create appropriate indexes
- Use connection pooling
- Monitor query performance

## Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong, unique passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities

## Backup Strategy

### Database Backups

- MongoDB Atlas: Automatic backups
- Self-hosted: Set up automated backups

### Code Backups

- Git repository with multiple remotes
- Regular backups of environment variables

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Verify all dependencies
   - Check environment variables

2. **Database Connection Issues**
   - Verify connection string
   - Check network access
   - Verify credentials

3. **Email Not Sending**
   - Check SMTP credentials
   - Verify email service limits
   - Check spam folders

4. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits
   - Verify CORS settings

### Debug Mode

Enable debug mode for development:

```env
DEBUG=*
NODE_ENV=development
```

## Maintenance

### Regular Tasks

- Update dependencies
- Monitor performance
- Check error logs
- Backup data
- Security updates

### Monitoring

- Set up uptime monitoring
- Configure error alerts
- Monitor performance metrics
- Track user analytics

## Scaling

### Horizontal Scaling

- Use load balancers
- Implement session storage
- Configure CDN
- Database sharding

### Vertical Scaling

- Increase server resources
- Optimize database queries
- Implement caching
- Use database indexes

## Support

For deployment issues:

1. Check logs and error messages
2. Verify environment variables
3. Test locally first
4. Contact support team

---

This deployment guide covers the most common deployment scenarios. For specific platform requirements, refer to the platform's official documentation.
