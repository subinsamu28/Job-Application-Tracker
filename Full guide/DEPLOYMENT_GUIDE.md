# 🚀 Deployment Guide - GitHub Pages

This guide will help you deploy your Job Application Tracker to GitHub Pages in minutes!

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- Your project code ready

---

## 🎯 Step-by-Step Deployment

### 1️⃣ Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `job-application-tracker` (or any name you prefer)
   - **Description**: "A modern web app to track job applications with analytics"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - ✅ Do **NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

---

### 2️⃣ Push Your Code to GitHub

Open your terminal in the project folder and run these commands:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - Job Application Tracker v10"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/job-application-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your GitHub username and `job-application-tracker` with your repository name.

---

### 3️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu)
3. In the left sidebar, click **"Pages"** (under "Code and automation")
4. Under **"Build and deployment"**:
   - **Source**: Select "GitHub Actions"
5. That's it! The deployment will start automatically

---

### 4️⃣ Wait for Deployment

1. Go to the **"Actions"** tab in your repository
2. You'll see a workflow running called **"Deploy to GitHub Pages"**
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, you'll see a green checkmark ✅

---

### 5️⃣ Access Your Live App

Your app will be live at:

```
https://YOUR_USERNAME.github.io/job-application-tracker/
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## 🔄 Making Updates

Whenever you make changes to your app:

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Updated UI design"

# Push to GitHub
git push
```

GitHub Actions will automatically rebuild and redeploy your app!

---

## 🎨 Custom Domain (Optional)

Want a custom domain like `jobtracker.yourdomain.com`?

1. Go to **Settings → Pages**
2. Under **"Custom domain"**, enter your domain
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (can take up to 24 hours)

---

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] Workflow completed successfully
- [ ] App is accessible at the GitHub Pages URL
- [ ] localStorage works (add a test application)
- [ ] All features work (dashboard, analytics, timeline, export)

---

## 🐛 Troubleshooting

### Issue: "404 - Not Found"
**Solution**: 
- Check that GitHub Pages is enabled
- Verify the workflow completed successfully
- Make sure the base URL in `vite.config.ts` is correct

### Issue: "Blank page after deployment"
**Solution**:
- Check browser console for errors (F12)
- Ensure `vite.config.ts` has `base: './'`
- Clear browser cache and reload

### Issue: "Workflow failed"
**Solution**:
- Go to Actions tab and check the error logs
- Usually it's a dependency issue - make sure `package.json` is correct
- Try re-running the workflow

### Issue: "localStorage not working"
**Solution**:
- Make sure you're accessing via HTTPS (GitHub Pages uses HTTPS)
- Check browser privacy settings
- Some browsers block localStorage in incognito mode

---

## 📊 Monitoring

- **Usage Stats**: Go to repository → Insights → Traffic
- **Build Status**: Check the Actions tab
- **Issues**: Monitor the Issues tab for user feedback

---

## 🎉 You're Live!

Your Job Application Tracker is now live on the internet! Share it on:

- LinkedIn (showcase it in your projects)
- Your portfolio website
- GitHub profile README
- Your resume

---

## 📝 Example Repository URLs

```
Repository: https://github.com/YOUR_USERNAME/job-application-tracker
Live Site:  https://YOUR_USERNAME.github.io/job-application-tracker/
Actions:    https://github.com/YOUR_USERNAME/job-application-tracker/actions
```

---

## 🔗 Quick Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 💡 Tips for Your Portfolio

1. **Add screenshots** to your repository README
2. **Write a detailed project description** explaining the features
3. **Include this project** in your LinkedIn featured section
4. **Add a "View Live Demo" badge** to your README:

```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://YOUR_USERNAME.github.io/job-application-tracker/)
[![GitHub](https://img.shields.io/badge/github-repo-blue.svg)](https://github.com/YOUR_USERNAME/job-application-tracker)
```

---

**Need help?** Open an issue in the repository or check the troubleshooting section above!
