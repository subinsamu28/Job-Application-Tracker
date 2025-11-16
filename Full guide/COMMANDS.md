# 🎯 Essential Commands Reference

Quick copy-paste commands for deploying your Job Application Tracker to GitHub Pages.

---

## 📦 Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Locally
```bash
# Start development server
npm run dev

# In another terminal, test the build
npm run build
npm run preview
```

---

## 🚀 First-Time Deployment

### Create and Push to GitHub

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Job Application Tracker v10"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username!
git remote add origin https://github.com/YOUR_USERNAME/job-application-tracker.git

# Push to GitHub
git push -u origin main
```

---

## 🔄 Making Updates

### After Making Changes

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Your update description here"

# Push to GitHub (triggers automatic deployment)
git push
```

### Example Update Workflow

```bash
# Made UI improvements
git add .
git commit -m "Updated UI colors and animations"
git push

# Fixed a bug
git add .
git commit -m "Fixed export CSV functionality"
git push

# Added new feature
git add .
git commit -m "Added new filter option for job types"
git push
```

---

## 🔍 Checking Status

### View Current Status
```bash
# Check which files are changed
git status

# View commit history
git log --oneline

# See what changed in files
git diff
```

### Check Remote
```bash
# View remote repository URL
git remote -v

# Check current branch
git branch
```

---

## 🛠️ Useful Git Commands

### Undo Changes (Before Commit)
```bash
# Undo all uncommitted changes
git reset --hard

# Undo changes to a specific file
git checkout -- filename.tsx
```

### Fix Last Commit Message
```bash
# Change the last commit message
git commit --amend -m "New commit message"

# Push the corrected commit
git push --force
```

### View Deployment Status
```bash
# Open GitHub Actions in browser
# Go to: https://github.com/YOUR_USERNAME/job-application-tracker/actions
```

---

## 📱 One-Line Deployment Commands

### Quick Deploy
```bash
git add . && git commit -m "Quick update" && git push
```

### Deploy with Custom Message
```bash
git add . && git commit -m "Added new analytics feature" && git push
```

---

## 🔧 Configuration Commands

### Update Remote URL
```bash
# If you need to change the repository URL
git remote set-url origin https://github.com/YOUR_USERNAME/new-repo-name.git
```

### Clone Repository (On Another Computer)
```bash
git clone https://github.com/YOUR_USERNAME/job-application-tracker.git
cd job-application-tracker
npm install
npm run dev
```

---

## 📊 Build Commands

### Production Build
```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

### Clean Build
```bash
# Remove old build
rm -rf dist

# Build fresh
npm run build
```

---

## 🌐 Testing Different Scenarios

### Test Locally
```bash
# Development mode (hot reload)
npm run dev
# Visit: http://localhost:5173
```

### Test Production Build Locally
```bash
npm run build
npm run preview
# Visit: http://localhost:4173
```

---

## 📝 Common Workflows

### Adding New Features
```bash
# 1. Create feature locally
npm run dev
# (make your changes)

# 2. Test
npm run build
npm run preview

# 3. Commit and deploy
git add .
git commit -m "Added new feature: [description]"
git push
```

### Bug Fix Workflow
```bash
# 1. Fix the bug
# (make your changes)

# 2. Test locally
npm run dev

# 3. Deploy fix
git add .
git commit -m "Fixed: [bug description]"
git push
```

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages
npm update

# Commit updates
git add package.json package-lock.json
git commit -m "Updated dependencies"
git push
```

---

## 🆘 Emergency Commands

### Revert Last Commit (Not Pushed)
```bash
git reset --soft HEAD~1
# Your changes remain, just uncommitted
```

### Revert Last Commit (Already Pushed)
```bash
git revert HEAD
git push
```

### Start Fresh (Nuclear Option)
```bash
# ⚠️ WARNING: This deletes all local changes!
git reset --hard origin/main
```

---

## 📦 Package Management

### Install New Package
```bash
npm install package-name
git add package.json package-lock.json
git commit -m "Added package-name dependency"
git push
```

### Remove Package
```bash
npm uninstall package-name
git add package.json package-lock.json
git commit -m "Removed package-name dependency"
git push
```

---

## 🔐 SSH vs HTTPS

### Using HTTPS (Default)
```bash
git remote add origin https://github.com/YOUR_USERNAME/job-application-tracker.git
```

### Using SSH (Alternative)
```bash
git remote add origin git@github.com:YOUR_USERNAME/job-application-tracker.git
```

### Switch from HTTPS to SSH
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/job-application-tracker.git
```

---

## 📋 Quick Reference

| Command | What It Does |
|---------|--------------|
| `git status` | Show changed files |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit with message |
| `git push` | Push to GitHub (triggers deploy) |
| `git pull` | Get latest changes |
| `git log` | View commit history |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🎯 Daily Workflow

```bash
# Morning: Start working
git pull                          # Get latest changes
npm run dev                       # Start dev server

# During work: Save progress
git add .
git commit -m "Work in progress: [what you're doing]"

# End of day: Deploy
git add .
git commit -m "Completed: [what you finished]"
git push                          # Auto-deploys to GitHub Pages
```

---

## 🚀 First Time Complete Setup

**Copy and run these commands** (replace YOUR_USERNAME):

```bash
# 1. Install dependencies
npm install

# 2. Test locally
npm run dev
# Check http://localhost:5173 - should work!
# Press Ctrl+C to stop

# 3. Test build
npm run build
npm run preview
# Check http://localhost:4173 - should work!
# Press Ctrl+C to stop

# 4. Initialize git and push
git init
git add .
git commit -m "Initial commit - Job Application Tracker v10"
git remote add origin https://github.com/YOUR_USERNAME/job-application-tracker.git
git push -u origin main

# 5. Enable GitHub Pages
# Go to: https://github.com/YOUR_USERNAME/job-application-tracker/settings/pages
# Set Source to: GitHub Actions
# Wait 2-3 minutes

# 6. Visit your app!
# https://YOUR_USERNAME.github.io/job-application-tracker/
```

---

## ✅ Checklist Format

Use this for your first deployment:

```bash
□ npm install
□ npm run dev (test locally)
□ npm run build (verify build works)
□ git init
□ git add .
□ git commit -m "Initial commit"
□ git remote add origin [URL]
□ git push -u origin main
□ Enable GitHub Pages (Settings → Pages → GitHub Actions)
□ Wait for deployment
□ Visit live site
□ Test all features
□ 🎉 Success!
```

---

## 💡 Pro Tips

1. **Commit Often**: Small, frequent commits are better than large ones
2. **Descriptive Messages**: Write clear commit messages
3. **Test Before Push**: Always test locally before pushing
4. **Check Actions**: Monitor GitHub Actions for build status
5. **Branch Protection**: Use branches for major changes

---

## 📞 Need Help?

If a command fails:
1. Read the error message carefully
2. Check if you replaced `YOUR_USERNAME`
3. Verify you're in the correct directory
4. Ensure you have internet connection
5. Check GitHub status: https://www.githubstatus.com

---

**Pro Tip:** Bookmark this file for quick command reference!

---

*Keep this file open while deploying for easy copy-paste access!*
