# IntakeFlow - Deployment & Hosting Strategy

## Overview

This document outlines cost-effective self-hosting strategies for IntakeFlow, focusing on keeping monthly costs under $200 while maintaining reliability, security, and scalability. The strategies are designed for solo developers and small teams who want full control over their infrastructure.

## Hosting Options Comparison

### Option 1: VPS Self-Hosting (Recommended for Cost)

**Monthly Cost: $25-50**

- **Providers**: Hetzner, DigitalOcean, Linode, Vultr
- **Specs**: 2-4 CPU cores, 4-8GB RAM, 80-160GB SSD
- **Pros**: Full control, lowest cost, predictable pricing
- **Cons**: Requires DevOps knowledge, manual scaling

### Option 2: Serverless Hybrid

**Monthly Cost: $30-80**

- **Frontend**: Vercel/Netlify
- **Backend**: Serverless functions
- **Database**: Managed service
- **Pros**: Auto-scaling, minimal maintenance
- **Cons**: Cold starts, vendor lock-in

### Option 3: Container Platform

**Monthly Cost: $50-100**

- **Providers**: Railway, Render, Fly.io
- **Pros**: Easy deployment, managed infrastructure
- **Cons**: Higher cost, less control

## Recommended Architecture: VPS Self-Hosting

### Infrastructure Stack

```mermaid
graph TB
    subgraph "Load Balancer"
        A[Nginx/Caddy]
    end

    subgraph "Application Layer"
        B[Next.js App]
        C[Redis Cache]
        D[Background Jobs]
    end

    subgraph "Data Layer"
        E[MySQL Database]
        F[File Storage]
    end

    subgraph "Monitoring"
        G[Prometheus]
        H[Grafana]
        I[Logs]
    end

    A --> B
    B --> C
    B --> D
    B --> E
    B --> F

    B --> G
    G --> H
    B --> I
```

### Server Specifications

#### Development/MVP Server

- **Provider**: Hetzner Cloud CX21 or DigitalOcean Basic
- **Specs**: 2 vCPU, 4GB RAM, 40GB SSD
- **Cost**: ~$25/month
- **Capacity**: 100-500 users, 10k requests/day

#### Production Server

- **Provider**: Hetzner Cloud CX31 or DigitalOcean Professional
- **Specs**: 2 vCPU, 8GB RAM, 160GB SSD
- **Cost**: ~$50/month
- **Capacity**: 1000-5000 users, 100k requests/day

#### High-Traffic Server

- **Provider**: Hetzner Cloud CX41 or DigitalOcean Business
- **Specs**: 4 vCPU, 16GB RAM, 240GB SSD
- **Cost**: ~$100/month
- **Capacity**: 5000+ users, 500k+ requests/day

## Docker Configuration

### Multi-Stage Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
```

### Docker Compose Configuration

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://intakeflow:${DB_PASSWORD}@db:3306/intakeflow
      - REDIS_URL=redis://redis:6379
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db
      - redis
    restart: unless-stopped
    volumes:
      - ./uploads:/app/uploads
    networks:
      - intakeflow

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
      - MYSQL_DATABASE=intakeflow
      - MYSQL_USER=intakeflow
      - MYSQL_PASSWORD=${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql/init:/docker-entrypoint-initdb.d
    ports:
      - "3306:3306"
    restart: unless-stopped
    command: --default-authentication-plugin=mysql_native_password
    networks:
      - intakeflow

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    restart: unless-stopped
    command: redis-server --appendonly yes
    networks:
      - intakeflow

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - certbot_data:/var/www/certbot
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - intakeflow

  certbot:
    image: certbot/certbot
    volumes:
      - certbot_data:/var/www/certbot
      - ./nginx/ssl:/etc/letsencrypt
    command: certonly --webroot --webroot-path=/var/www/certbot --email ${SSL_EMAIL} --agree-tos --no-eff-email -d ${DOMAIN}

volumes:
  mysql_data:
  redis_data:
  certbot_data:

networks:
  intakeflow:
    driver: bridge
```

### Nginx Configuration

```nginx
# nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    server {
        listen 80;
        server_name your-domain.com;

        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/live/your-domain.com/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/live/your-domain.com/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;

        # Security Headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

        # Gzip Compression
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

        # API Rate Limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Auth Rate Limiting
        location /api/auth/ {
            limit_req zone=login burst=5 nodelay;
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static Files
        location /_next/static/ {
            proxy_pass http://app;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # All other requests
        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Let's Encrypt
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
    }
}
```

## Deployment Scripts

### Automated Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Starting IntakeFlow deployment..."

# Configuration
DOMAIN="your-domain.com"
DB_PASSWORD=$(openssl rand -base64 32)
DB_ROOT_PASSWORD=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Create environment file
cat > .env.production << EOF
NODE_ENV=production
DOMAIN=${DOMAIN}
NEXTAUTH_URL=https://${DOMAIN}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
DB_PASSWORD=${DB_PASSWORD}
DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
SSL_EMAIL=admin@${DOMAIN}

# Database
DATABASE_URL=mysql://intakeflow:${DB_PASSWORD}@localhost:3306/intakeflow

# Redis
REDIS_URL=redis://localhost:6379

# External Services
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RESEND_API_KEY=your_resend_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_s3_bucket
EOF

echo "✅ Environment configuration created"

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create directories
mkdir -p nginx/ssl uploads mysql/init

# Build and start services
echo "🏗️ Building and starting services..."
docker-compose -f docker-compose.yml --env-file .env.production up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec app npx prisma migrate deploy

# Generate SSL certificate
echo "🔒 Generating SSL certificate..."
docker-compose run --rm certbot

# Reload Nginx
docker-compose restart nginx

echo "✅ Deployment completed!"
echo "🌐 Your application is available at: https://${DOMAIN}"
echo "📊 Database password: ${DB_PASSWORD}"
echo "🔑 NextAuth secret: ${NEXTAUTH_SECRET}"
echo ""
echo "⚠️  Please save these credentials securely!"
```

### Update Script

```bash
#!/bin/bash
# update.sh

set -e

echo "🔄 Updating IntakeFlow..."

# Pull latest changes
git pull origin main

# Backup database
echo "💾 Creating database backup..."
docker-compose exec db mysqldump -u root -p${DB_ROOT_PASSWORD} intakeflow > backup_$(date +%Y%m%d_%H%M%S).sql

# Build new image
echo "🏗️ Building new application image..."
docker-compose build app

# Update services
echo "🚀 Updating services..."
docker-compose up -d

# Run migrations
echo "🗄️ Running database migrations..."
docker-compose exec app npx prisma migrate deploy

# Clean up old images
docker image prune -f

echo "✅ Update completed!"
```

## Monitoring and Logging

### Prometheus Configuration

```yaml
# prometheus/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "intakeflow"
    static_configs:
      - targets: ["app:3000"]
    metrics_path: "/api/metrics"

  - job_name: "node-exporter"
    static_configs:
      - targets: ["node-exporter:9100"]

  - job_name: "mysql"
    static_configs:
      - targets: ["mysql-exporter:9104"]
```

### Grafana Dashboard

```json
{
  "dashboard": {
    "title": "IntakeFlow Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Database Connections",
        "type": "singlestat",
        "targets": [
          {
            "expr": "mysql_global_status_threads_connected",
            "legendFormat": "Active Connections"
          }
        ]
      }
    ]
  }
}
```

### Logging Configuration

```javascript
// lib/logger.ts
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "intakeflow" },
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
```

## Backup Strategy

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh

set -e

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

mkdir -p $BACKUP_DIR

echo "📦 Creating backup for $DATE..."

# Database backup
docker-compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} intakeflow | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# File uploads backup
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz uploads/

# Configuration backup
tar -czf $BACKUP_DIR/config_$DATE.tar.gz .env.production docker-compose.yml nginx/

# Upload to S3 (optional)
if [ ! -z "$AWS_ACCESS_KEY_ID" ]; then
    aws s3 cp $BACKUP_DIR/db_$DATE.sql.gz s3://your-backup-bucket/intakeflow/
    aws s3 cp $BACKUP_DIR/uploads_$DATE.tar.gz s3://your-backup-bucket/intakeflow/
    aws s3 cp $BACKUP_DIR/config_$DATE.tar.gz s3://your-backup-bucket/intakeflow/
fi

# Clean old backups
find $BACKUP_DIR -name "*.gz" -mtime +$RETENTION_DAYS -delete

echo "✅ Backup completed: $DATE"
```

### Cron Job Setup

```bash
# Add to crontab (crontab -e)
# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1

# Weekly system update (Sunday 3 AM)
0 3 * * 0 /path/to/update.sh >> /var/log/update.log 2>&1
```

## Security Hardening

### Server Security

```bash
#!/bin/bash
# security-setup.sh

# Update system
sudo apt update && sudo apt upgrade -y

# Install fail2ban
sudo apt install fail2ban -y

# Configure fail2ban
sudo tee /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
EOF

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Set up automatic security updates
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades

echo "✅ Security hardening completed"
```

## Cost Breakdown

### Monthly Costs (VPS Hosting)

#### MVP Setup (~$52/month)

- **VPS**: Hetzner CX21 - $25
- **Domain**: $12/year (~$1/month)
- **SSL**: Let's Encrypt - Free
- **Email**: Resend - $20
- **Storage**: AWS S3 - $5
- **Monitoring**: Self-hosted - Free

#### Production Setup (~$105/month)

- **VPS**: Hetzner CX31 - $50
- **Domain**: $12/year (~$1/month)
- **SSL**: Let's Encrypt - Free
- **Email**: Resend Pro - $20
- **Storage**: AWS S3 - $15
- **CDN**: CloudFlare - $20
- **Monitoring**: Self-hosted - Free

#### High-Traffic Setup (~$185/month)

- **VPS**: Hetzner CX41 - $100
- **Load Balancer**: $20
- **Domain**: $12/year (~$1/month)
- **Email**: Resend Pro+ - $35
- **Storage**: AWS S3 - $25
- **CDN**: CloudFlare Pro - $20
- **Backup Storage**: $5

## Scaling Strategy

### Horizontal Scaling

1. **Load Balancer**: Add Nginx load balancer
2. **Multiple App Instances**: Scale Next.js containers
3. **Database Read Replicas**: MySQL read replicas
4. **Redis Cluster**: Redis clustering for sessions

### Vertical Scaling

1. **Upgrade VPS**: Increase CPU/RAM as needed
2. **Database Optimization**: Query optimization, indexing
3. **Caching**: Implement Redis caching layers
4. **CDN**: Use CloudFlare for static assets

This deployment strategy provides a robust, cost-effective foundation for hosting IntakeFlow while maintaining the flexibility to scale as your user base grows.
