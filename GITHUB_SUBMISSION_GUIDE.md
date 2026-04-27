# GitHub Classroom Submission Guide

Complete step-by-step instructions for submitting your Farmer Help Portal DevOps project.

## 📋 Pre-Submission Checklist

Before pushing to GitHub, verify:

### Project Files
- [ ] All source code present and working
- [ ] `docker-compose.yml` in root directory
- [ ] `backend/Dockerfile` exists
- [ ] `backend/.dockerignore` exists
- [ ] `frontend/Dockerfile` exists
- [ ] `frontend/.dockerignore` exists
- [ ] `frontend/nginx.conf` exists
- [ ] `README.md` complete with Docker section
- [ ] `backend/.env.example` configured
- [ ] `frontend/.env.example` configured
- [ ] `.gitignore` properly configured

### Docker Files Verification
```bash
# Run this from project root to verify all files exist
ls -la docker-compose.yml
ls -la backend/Dockerfile
ls -la backend/.dockerignore
ls -la frontend/Dockerfile
ls -la frontend/.dockerignore
ls -la frontend/nginx.conf
```

### Local Testing (Before Submission)
```bash
# Test Docker build and run
docker-compose up --build

# Verify services are running
docker-compose ps

# Check endpoints
curl http://localhost:5000/api/health
curl http://localhost:3000

# View logs
docker-compose logs

# Clean up
docker-compose down
```

## 🚀 Step-by-Step Submission Process

### Step 1: Clone Your GitHub Classroom Repository

```bash
# GitHub Classroom will provide this link
git clone https://github.com/DevOps-Class-519/project-submission-devops-[YOUR_USERNAME].git
cd project-submission-devops-[YOUR_USERNAME]
```

### Step 2: Copy Your Project Files

Copy your Farmer Help Portal project files into the cloned repository:

```bash
# From your project directory, copy files
cp -r farmer-help-portal/* project-submission-devops-[YOUR_USERNAME]/
```

Or manually copy:
- `backend/` folder
- `frontend/` folder
- `docker-compose.yml`
- `README.md`
- `.gitignore`
- Other documentation files

### Step 3: Verify All Files Are Present

```bash
# Check the directory structure
ls -la

# Should see:
# ✅ backend/
# ✅ frontend/
# ✅ docker-compose.yml
# ✅ README.md
# ✅ .gitignore
```

### Step 4: Check Git Status

```bash
# Show all changes
git status

# Should show:
# On branch main
# Untracked files:
#   backend/
#   frontend/
#   docker-compose.yml
#   README.md
#   (etc.)
```

### Step 5: Add Files to Staging Area

```bash
# Stage all files
git add .

# Verify files are staged
git status
```

### Step 6: Create Meaningful Commit Message

```bash
git commit -m "feat: Add Farmer Help Portal with Docker support

- Initialize MERN stack agricultural application
- Add Docker containerization for frontend and backend
- Add docker-compose.yml for multi-service orchestration
- Add MySQL database container configuration
- Add comprehensive README with setup and deployment instructions
- Fix authentication context for proper JSON parsing
- Implement health checks for all microservices
- Configure Nginx reverse proxy for frontend
- Add .dockerignore for optimized builds
- Add .env.example files for configuration

Project Features:
- Real-time crop price tracking
- AI-powered fertilizer recommendations
- Weather forecasting integration
- Government schemes information
- AI disease detection for crops
- User authentication with JWT
- Responsive design with Tailwind CSS
- Production-ready Docker deployment

DevOps Implementation:
- Multi-stage Docker builds
- Service health monitoring
- Environment-based configuration
- Volume management for persistence
- Network bridging for service communication"
```

### Step 7: Push to GitHub

```bash
# Push to main branch
git push origin main

# Or if you want to create a separate branch
git checkout -b devops-submission
git push origin devops-submission
```

### Step 8: Verify on GitHub

1. Go to your repository on GitHub: `https://github.com/DevOps-Class-519/project-submission-devops-[YOUR_USERNAME]`
2. Verify files are visible:
   - [ ] backend/ folder visible
   - [ ] frontend/ folder visible
   - [ ] docker-compose.yml visible
   - [ ] README.md displays correctly
   - [ ] .gitignore is applied (no node_modules visible)
3. Check commit history is preserved
4. View raw docker-compose.yml to verify content

### Step 9: Create Pull Request (if required)

Some instructors may require a Pull Request:

```bash
# On GitHub, go to Pull Requests tab
# Click "New Pull Request"
# Select base: main, compare: devops-submission
# Add description:
```

**PR Description Template:**
```
# DevOps Project Submission: Farmer Help Portal

## Overview
AI-powered agricultural application with containerized deployment.

## Deliverables
- ✅ Project source code (frontend + backend)
- ✅ Docker containerization (Dockerfile + docker-compose.yml)
- ✅ Comprehensive README with setup instructions
- ✅ Production-ready configuration
- ✅ Health checks and monitoring

## How to Run
```bash
docker-compose up --build
```

## Endpoints
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health
```

## 📋 Submission Requirements Checklist

Before submitting, ensure:

### Project Structure
- [ ] `backend/` folder with Node.js/Express application
- [ ] `frontend/` folder with React application
- [ ] `docker-compose.yml` in root directory
- [ ] Dockerfiles for both services
- [ ] .dockerignore files present

### Docker Configuration
- [ ] Backend Dockerfile builds successfully
- [ ] Frontend Dockerfile builds successfully
- [ ] docker-compose.yml orchestrates both services
- [ ] MongoDB/database service in docker-compose
- [ ] Health checks configured
- [ ] Ports properly exposed (3000, 5000, 27017)
- [ ] Environment variables configured
- [ ] Volumes mounted for persistence

### Documentation
- [ ] README.md includes:
  - [ ] Project description
  - [ ] Technology stack
  - [ ] Prerequisites
  - [ ] Local setup instructions
  - [ ] Docker setup instructions
  - [ ] How to build: `docker-compose build`
  - [ ] How to run: `docker-compose up`
  - [ ] API documentation
  - [ ] Troubleshooting section
  - [ ] File structure

### Code Quality
- [ ] No `node_modules/` directories in repo
- [ ] No `.env` files (only `.env.example`)
- [ ] No build artifacts (build/, dist/)
- [ ] `.gitignore` properly configured
- [ ] Source code without errors
- [ ] Proper error handling
- [ ] Environment configuration ready

### Functionality
- [ ] Application runs without errors
- [ ] Docker build completes successfully
- [ ] All containers start and stay running
- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend accessible at http://localhost:5000
- [ ] Health check endpoint responds: /api/health
- [ ] Database connectivity working
- [ ] Logs are readable: `docker-compose logs`

## 🔍 Final Verification

### Test Your Submission Locally

Before final push, simulate fresh clone:

```bash
# Create test directory
mkdir test-submission
cd test-submission

# Clone your repo (use your username)
git clone https://github.com/DevOps-Class-519/project-submission-devops-[YOUR_USERNAME].git
cd project-submission-devops-[YOUR_USERNAME]

# Verify structure
ls -la  # Should show all required files

# Test Docker build
docker-compose build

# Test Docker run
docker-compose up -d

# Check services
docker-compose ps

# Verify endpoints
curl http://localhost:5000/api/health
curl http://localhost:3000 -I

# View logs
docker-compose logs

# Cleanup
docker-compose down
docker system prune -f
```

### Check GitHub Classroom Submission

1. **Repository Link**: Verify you have correct link
2. **Visibility**: Repository is visible and public
3. **Branch**: Code is on main branch (or assigned branch)
4. **Files**: All submitted files visible
5. **README**: Renders correctly on GitHub
6. **Dockerfiles**: Text displays correctly
7. **History**: Commit history visible

## ✅ Final Submission Checklist

- [ ] All files pushed to GitHub
- [ ] docker-compose.yml at root level
- [ ] Backend and frontend Dockerfiles present
- [ ] README.md complete and comprehensive
- [ ] No uncommitted changes locally
- [ ] Repository is public/accessible
- [ ] All Docker files have correct content
- [ ] .env.example files present
- [ ] .gitignore excludes node_modules
- [ ] No sensitive data in code
- [ ] Project tested locally with Docker
- [ ] Commit messages are descriptive
- [ ] README includes Docker commands
- [ ] Health check implemented
- [ ] All dependencies listed

## 📞 If Submission Fails

### Issue: Files Not Showing on GitHub
**Solution**: 
```bash
# Force push (use carefully)
git push -u origin main -f

# Or check git status
git status
git log
```

### Issue: Large Files Rejected
**Solution**: Check .gitignore
```bash
# View what's being tracked
git ls-files

# Should NOT include node_modules, build/, dist/
```

### Issue: Docker Files Not Readable
**Solution**: Check file encoding
```bash
# Verify file format
file docker-compose.yml
file backend/Dockerfile

# Should be text/plain, UTF-8
```

### Issue: Dockerfile CRLF vs LF
**Solution**: Convert line endings
```bash
# For Windows (convert CRLF to LF)
git config core.safecrlf false
dos2unix backend/Dockerfile
dos2unix frontend/Dockerfile
dos2unix docker-compose.yml
```

---

**Submission Ready!** ✅

Once complete, verify on GitHub and submit link to your instructor.

Need help? Check README.md or Docker troubleshooting section.
