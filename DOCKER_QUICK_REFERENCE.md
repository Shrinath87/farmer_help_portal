# Docker Quick Reference Guide

## 🚀 Quick Start (Copy & Paste)

### Initialize Project
```bash
# Clone repository
git clone <your-github-classroom-link>
cd farmer-help-portal

# Build and run
docker-compose up --build
```

Access at: http://localhost:3000

---

## 📦 Essential Docker Commands

### Build & Run
```bash
# Build all services
docker-compose build

# Run all services
docker-compose up

# Run in background
docker-compose up -d

# Build and run with no cache
docker-compose up --build --no-cache
```

### View Status
```bash
# List running containers
docker-compose ps

# View logs
docker-compose logs

# Follow logs (real-time)
docker-compose logs -f

# Specific service logs
docker-compose logs backend
docker-compose logs frontend
```

### Stop & Clean
```bash
# Stop services
docker-compose stop

# Remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Remove all Docker artifacts
docker system prune

# Remove with images
docker system prune -a
```

### Execute Commands
```bash
# Run command in container
docker-compose exec backend npm test

# Access bash shell
docker-compose exec backend sh

# Run frontend build
docker-compose exec frontend npm run build
```

### Troubleshooting
```bash
# Rebuild specific service
docker-compose build backend --no-cache

# Restart service
docker-compose restart backend

# Remove and recreate
docker-compose up -d --force-recreate backend

# Check service health
docker-compose ps

# View detailed container info
docker inspect farmer-help-backend
```

---

## 📋 Service Information

### Services Running
| Service | Port | Status |
|---------|------|--------|
| Frontend | 3000 | Running (Nginx) |
| Backend | 5000 | Running (Node.js) |
| MongoDB | 27017 | Running |

### Health Checks
```bash
# Backend health
curl http://localhost:5000/api/health

# Frontend health  
curl http://localhost:3000 -I

# MongoDB (if exposed)
mongosh mongodb://localhost:27017
```

---

## 🔧 Configuration

### Change Ports
Edit `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "8080:3000"  # External:Internal
  
  backend:
    ports:
      - "8000:5000"  # External:Internal
```

### Change Environment Variables
Edit `docker-compose.yml`:
```yaml
environment:
  - NODE_ENV=production
  - JWT_SECRET=your_secret_here
  - MONGODB_URI=mongodb://mongodb:27017/farmer-help-portal
```

### Add New Service (e.g., Redis)
```yaml
redis:
  image: redis:7-alpine
  container_name: farmer-help-redis
  ports:
    - "6379:6379"
  networks:
    - farmer-network
```

---

## 📁 File Structure for Submission

```
farmer-help-portal/
├── backend/
│   ├── Dockerfile              ✅ Required
│   ├── .dockerignore           ✅ Required
│   ├── package.json
│   ├── server.js
│   ├── src/
│   ├── .env.example
│   └── .env                    ⚠️ Don't commit
├── frontend/
│   ├── Dockerfile              ✅ Required
│   ├── .dockerignore           ✅ Required
│   ├── nginx.conf              ✅ Required
│   ├── package.json
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── .env                    ⚠️ Don't commit
├── docker-compose.yml          ✅ Required
├── README.md                   ✅ Required
├── .gitignore                  ✅ Required
└── GITHUB_SUBMISSION_GUIDE.md
```

**Files that MUST NOT be committed:**
- `node_modules/`
- `build/`
- `dist/`
- `.env` (only .env.example)
- `*.log`

---

## 🎯 Common Tasks

### Build Fresh Images
```bash
# Remove old images
docker rmi farmer-help-backend farmer-help-frontend

# Rebuild
docker-compose build --no-cache
```

### View Application Logs
```bash
# All services
docker-compose logs --tail=100

# Backend only
docker-compose logs backend --tail=50

# Follow in real-time
docker-compose logs -f frontend
```

### Debug Container
```bash
# Enter container shell
docker-compose exec backend sh

# Inside container:
# ls -la
# npm list
# env
# exit
```

### Reset Everything
```bash
# Stop all and clean
docker-compose down -v

# Remove images
docker-compose down -v --rmi all

# Rebuild fresh
docker-compose up --build
```

---

## ✅ Verification Checklist

Before submission, verify:

```bash
# 1. Docker is running
docker ps  # Should list containers or be empty

# 2. Files exist
ls docker-compose.yml
ls backend/Dockerfile
ls frontend/Dockerfile

# 3. Build succeeds
docker-compose build

# 4. Services start
docker-compose up -d

# 5. All running
docker-compose ps  # All should show "healthy" or "UP"

# 6. Endpoints responding
curl http://localhost:5000/api/health
curl http://localhost:3000

# 7. Logs clean
docker-compose logs | grep -i error  # Should be none or expected

# 8. Clean up
docker-compose down
```

---

## 🚨 Emergency Commands

```bash
# Kill all Docker containers
docker kill $(docker ps -q)

# Remove all stopped containers
docker container prune -f

# Stop consuming too much disk
docker system prune -a

# Reset Docker completely
docker system prune -a --volumes
```

---

## 📚 Reference Links

- [Docker Documentation](https://docs.docker.com/)
- [docker-compose Reference](https://docs.docker.com/compose/compose-file/)
- [Docker Cheat Sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

---

**Happy Submitting!** 🚀
