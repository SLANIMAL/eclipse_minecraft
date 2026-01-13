# Eclipse Minecraft Server Website

A modern, feature-rich Minecraft server website with integrated payment system, user authentication, and server management capabilities.

## 🚀 Features

### 🎮 **Core Features**
- **Multi-Gamemode Support**: Survival, PVP Arena, Bedwars, Lifesteal, Battle Royale
- **Rank System**: Tiered ranking with unique permissions and benefits
- **Virtual Store**: Crate keys, cosmetics, economy boosters, seasonal passes
- **Real-time Server Status**: Live player count, server ping, online status
- **User Authentication**: Secure login/registration system

### 💳 **Payment System**
- **Stripe Integration**: Secure payment processing
- **Multiple Payment Methods**: Credit cards, debit cards, digital wallets
- **Instant Delivery**: Automatic rank and item delivery after payment
- **Payment History**: User transaction tracking

### 🎨 **Design & UX**
- **Modern UI/UX**: Clean, responsive design with TailwindCSS
- **Minecraft Theme**: Custom styling matching Minecraft aesthetics
- **Mobile Responsive**: Works perfectly on all devices
- **Smooth Animations**: Interactive elements and transitions

### ⚡ **Technical Features**
- **TypeScript**: Full type safety and better development experience
- **React 18**: Modern frontend framework with hooks
- **NestJS**: Scalable backend architecture
- **Supabase**: Real-time database and authentication
- **PM2 Support**: Production-ready process management
- **Docker Ready**: Containerized deployment options

## 📋 **Requirements**

- Node.js 18+
- NPM or Yarn
- Stripe account (for payments)
- Supabase account (for database)
- Minecraft server (for status integration)

## 🛠️ **Quick Start**

### 1. Clone and Install
```bash
git clone <repository-url>
cd eclipse-minecraft

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### 2. Environment Setup
```bash
# Frontend .env
cp .env.example .env
# Update with your Stripe and Supabase keys

# Backend .env
cd server
cp .env.example .env
# Update with your API keys and server details
```

### 3. Development
```bash
# Start frontend (in root directory)
npm run dev

# Start backend (in server directory)
npm run dev
```

### 4. Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🏗️ **Project Structure**

```
eclipse-minecraft/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── services/          # API services
│   └── assets/            # Static assets
├── server/
│   ├── src/               # Backend source code
│   │   ├── modules/       # NestJS modules
│   │   ├── stripe/        # Stripe integration
│   │   └── minecraft/     # Minecraft server integration
│   ├── dist/              # Built backend files
│   └── prisma/            # Database schema
├── dist/                  # Built frontend files
├── public/                # Public assets
└── docs/                  # Documentation
```

## 💰 **Pricing Structure**

### Ranks (Survival)
- Hunter: $9.99
- Champion: $19.99
- Gladiator: $34.99
- Warlord: $49.99
- Titan: $79.99
- Hyper: $124.99
- Hyper+: $199.99

### Virtual Items
- Crate Key: $4.99
- Cosmetic Bundle: $7.99
- Economy Booster (24h): $3.99
- Seasonal Pass: $14.99

## 🔧 **Configuration**

### Environment Variables

#### Frontend (.env)
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=4000
STRIPE_SECRET_KEY=sk_test_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
MINECRAFT_HOST=your-server.com
MINECRAFT_PORT=25565
```

## 🎯 **API Endpoints**

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Store & Payments
- `GET /api/store/ranks` - Get available ranks
- `GET /api/store/items` - Get virtual items
- `POST /api/create-payment-intent` - Create Stripe payment
- `POST /api/confirm-payment` - Confirm payment completion

### Server Status
- `GET /api/minecraft/status` - Get server status
- `GET /api/minecraft/players` - Get online players
- `POST /api/minecraft/command` - Execute server command

### Voting System
- `GET /api/votes/platforms` - Get voting platforms
- `POST /api/votes` - Submit vote
- `POST /api/votes/claim` - Claim vote rewards

## 🐳 **Docker Deployment**

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 **Monitoring & Logs**

### PM2 Commands
```bash
# View process status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart eclipse-backend

# Monitor performance
pm2 monit
```

## 🔒 **Security Features**

- **Environment Variables**: Sensitive data properly secured
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Comprehensive data validation
- **SQL Injection Prevention**: Parameterized queries
- **Rate Limiting**: API endpoint protection
- **HTTPS Ready**: SSL/TLS configuration

## 🤝 **Support & Maintenance**

### Included Support
- 30-day technical support
- Bug fixes and updates
- Performance optimization
- Security patches

### Additional Services
- Custom feature development
- Server migration assistance
- Performance monitoring setup
- SEO optimization

## 📝 **License**

This project is proprietary software. All rights reserved.

## 📞 **Contact**

For support, customization, or licensing inquiries:
- Email: support@eclipse-minecraft.com
- Discord: [Discord Server Link]
- Website: https://eclipse-minecraft.com

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Framework**: React 18 + NestJS  
**Database**: Supabase (PostgreSQL)  
**Payment**: Stripe  
**License**: Proprietary
