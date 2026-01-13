# Eclipse Minecraft Server Website - Deployment Guide

## 🚀 Quick Deployment Instructions

### Prerequisites
- Node.js 18+ 
- PM2 (for production)
- Nginx (recommended for reverse proxy)
- SSL certificate (for HTTPS)

### Environment Setup

#### 1. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm ci --only=production

# Copy environment file
cp .env.example .env

# Update .env with your actual values:
NODE_ENV=production
PORT=4000
GLOBAL_PREFIX=api
CORS_ORIGIN=https://yourdomain.com
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
MINECRAFT_HOST=your_minecraft_server_host
MINECRAFT_PORT=25565
```

#### 2. Frontend Setup
```bash
# Install dependencies
npm ci --only=production

# Update .env with your actual values:
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (or pk_test_... for testing)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Production Deployment

#### Option 1: PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start backend with PM2
cd server
pm2 start ecosystem.config.js --env production

# Serve frontend with Nginx (see nginx.conf below)
```

#### Option 2: Docker
```bash
# Build Docker images
docker build -t eclipse-frontend .
cd server
docker build -t eclipse-backend .

# Run with Docker Compose
docker-compose up -d
```

#### Option 3: Manual
```bash
# Start backend
cd server
npm run start:prod

# Serve frontend files with Nginx or Apache
# Frontend files are in the 'dist' folder
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Frontend
    location / {
        root /path/to/eclipse-minecraft/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Database Setup
The project uses Supabase as the database. Make sure:
1. Your Supabase project is set up
2. All necessary tables are created
3. Row Level Security (RLS) policies are configured

### Stripe Configuration
1. Create a Stripe account
2. Get your API keys (test keys for development, live keys for production)
3. Configure webhooks in Stripe dashboard
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

### Environment Variables Checklist

#### Backend (.env)
- [ ] `NODE_ENV=production`
- [ ] `PORT=4000`
- [ ] `GLOBAL_PREFIX=api`
- [ ] `CORS_ORIGIN=https://yourdomain.com`
- [ ] `STRIPE_SECRET_KEY=sk_live_...`
- [ ] `SUPABASE_URL=https://your-project.supabase.co`
- [ ] `SUPABASE_ANON_KEY=eyJ...`
- [ ] `SUPABASE_SERVICE_ROLE_KEY=eyJ...`
- [ ] `MINECRAFT_HOST=your-minecraft-server.com`
- [ ] `MINECRAFT_PORT=25565`

#### Frontend (.env)
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...`
- [ ] `VITE_SUPABASE_URL=https://your-project.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY=eyJ...`

### Testing After Deployment
1. Check frontend loads: `https://yourdomain.com`
2. Check API health: `https://yourdomain.com/api/health`
3. Test server status: `https://yourdomain.com/api/minecraft/status`
4. Test payment flow with Stripe test card: `4242 4242 4242 4242`

### Monitoring & Logs
```bash
# PM2 logs
pm2 logs

# PM2 monitoring
pm2 monit

# Restart services
pm2 restart all

# Check status
pm2 status
```

### Troubleshooting
- **CORS errors**: Check CORS_ORIGIN in backend .env
- **Stripe errors**: Verify API keys and webhook setup
- **Database errors**: Check Supabase connection and RLS policies
- **Payment failures**: Check Stripe logs and webhook configuration

### Support
For deployment issues, contact support with:
- Server logs
- Environment variables (redacted)
- Error messages
- Steps to reproduce

---

## 📁 Project Structure
```
eclipse-minecraft/
├── dist/                    # Built frontend files
├── server/
│   ├── dist/               # Built backend files
│   ├── src/                # Backend source code
│   └── ecosystem.config.js # PM2 configuration
├── src/                    # Frontend source code
├── .env                    # Frontend environment variables
├── server/.env            # Backend environment variables
└── DEPLOYMENT.md          # This file
```

## 🔧 PM2 Configuration (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'eclipse-backend',
    script: 'dist/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

## 🐳 Docker Configuration
```dockerfile
# Dockerfile (backend)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 4000
CMD ["node", "dist/main.js"]
```

```dockerfile
# Dockerfile (frontend)
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

**Deployment Status**: ✅ Ready for production deployment
**Last Updated**: $(date)
**Version**: 1.0.0
