# 📁 Project Structure

Understanding the organization of your Job Application Tracker.

---

## 🌳 File Tree

```
job-application-tracker/
├── 📄 index.html                      # Entry HTML file
├── 📄 package.json                    # Dependencies and scripts
├── 📄 vite.config.ts                  # Vite configuration for deployment
├── 📄 .gitignore                      # Git ignore rules
│
├── 📂 src/
│   └── 📄 main.tsx                    # React app entry point
│
├── 📂 components/                     # React components
│   ├── 📄 AddApplicationDialog.tsx    # Add new application modal
│   ├── 📄 Analytics.tsx               # Analytics dashboard with charts
│   ├── 📄 ApplicationDetail.tsx       # Application detail panel
│   ├── 📄 ApplicationsList.tsx        # List view of applications
│   ├── 📄 Dashboard.tsx               # Main dashboard stats
│   ├── 📄 EditApplicationDialog.tsx   # Edit application modal
│   ├── 📄 EmailTemplates.tsx          # Email template generator
│   ├── 📄 ExportData.tsx              # Export to JSON/CSV
│   ├── 📄 InterviewPrep.tsx           # Interview preparation tools
│   ├── 📄 Timeline.tsx                # Timeline view
│   │
│   ├── 📂 ui/                         # Reusable UI components (shadcn)
│   │   ├── 📄 button.tsx              # Button component
│   │   ├── 📄 card.tsx                # Card component
│   │   ├── 📄 dialog.tsx              # Dialog/Modal component
│   │   ├── 📄 input.tsx               # Input component
│   │   ├── 📄 select.tsx              # Select dropdown
│   │   ├── 📄 tabs.tsx                # Tabs component
│   │   └── ... (30+ other UI components)
│   │
│   └── 📂 figma/
│       └── 📄 ImageWithFallback.tsx   # Image component with fallback
│
├── 📂 styles/
│   └── 📄 globals.css                 # Global styles and Tailwind config
│
├── 📂 lib/
│   └── 📄 utils.ts                    # Utility functions
│
├── 📂 .github/
│   └── 📂 workflows/
│       └── 📄 deploy.yml              # GitHub Actions deployment workflow
│
├── 📂 public/                         # Static assets (if needed)
│
├── 📄 App.tsx                         # Main application component
│
└── 📂 Documentation/
    ├── 📄 README.md                   # Project overview
    ├── 📄 QUICK_START.md              # 5-minute deployment guide
    ├── 📄 DEPLOYMENT_GUIDE.md         # Detailed deployment instructions
    ├── 📄 DEPLOYMENT_CHECKLIST.md     # Verification checklist
    ├── 📄 COMMANDS.md                 # Git and npm commands reference
    ├── 📄 GITHUB_DEPLOYMENT_SUMMARY.md # Complete deployment overview
    └── 📄 PROJECT_STRUCTURE.md        # This file
```

---

## 📋 File Descriptions

### Core Application Files

| File | Purpose | Edit? |
|------|---------|-------|
| `App.tsx` | Main app component, routing, state management | ✅ Yes |
| `index.html` | HTML entry point, meta tags | ✅ Yes |
| `src/main.tsx` | React root, renders App | ⚠️ Rarely |
| `package.json` | Dependencies, scripts, metadata | ✅ Yes |
| `vite.config.ts` | Build configuration | ⚠️ Only if needed |

### Component Files

| Component | What It Does |
|-----------|--------------|
| `AddApplicationDialog.tsx` | Form to add new job applications |
| `Analytics.tsx` | Charts and statistics visualization |
| `ApplicationDetail.tsx` | Detailed view with edit/delete |
| `ApplicationsList.tsx` | Searchable, filterable list |
| `Dashboard.tsx` | Overview statistics cards |
| `EditApplicationDialog.tsx` | Form to edit existing applications |
| `EmailTemplates.tsx` | Pre-written email templates |
| `ExportData.tsx` | Export to JSON or CSV |
| `InterviewPrep.tsx` | Interview questions and prep |
| `Timeline.tsx` | Chronological timeline view |

### UI Components (`components/ui/`)

These are reusable shadcn/ui components:
- Form controls: `button`, `input`, `select`, `textarea`, `checkbox`
- Layout: `card`, `dialog`, `sheet`, `tabs`, `accordion`
- Feedback: `alert`, `toast`, `progress`, `skeleton`
- Data: `table`, `calendar`, `chart`

**Note:** Don't edit these unless you need custom styling!

### Style Files

| File | Purpose |
|------|---------|
| `styles/globals.css` | Global styles, Tailwind config, CSS variables |

### Configuration Files

| File | Purpose |
|------|---------|
| `.gitignore` | Files to exclude from git |
| `vite.config.ts` | Vite build settings |
| `.github/workflows/deploy.yml` | Auto-deployment config |

### Documentation Files

| File | When to Use |
|------|-------------|
| `README.md` | Project overview, share with others |
| `QUICK_START.md` | Fast deployment (5 min) |
| `DEPLOYMENT_GUIDE.md` | Detailed step-by-step |
| `DEPLOYMENT_CHECKLIST.md` | After deployment verification |
| `COMMANDS.md` | Quick command reference |
| `GITHUB_DEPLOYMENT_SUMMARY.md` | Complete overview |
| `PROJECT_STRUCTURE.md` | Understanding file organization |

---

## 🔄 Data Flow

```
User Interaction
       ↓
   Component (e.g., AddApplicationDialog)
       ↓
   App.tsx (State Management)
       ↓
   LocalStorage (Browser)
       ↓
   Persistence across sessions
```

---

## 📦 Key Dependencies

### Production Dependencies
```json
{
  "react": "UI Framework",
  "react-dom": "React DOM rendering",
  "lucide-react": "Icon library",
  "recharts": "Chart library",
  "sonner": "Toast notifications",
  "react-hook-form": "Form management"
}
```

### Development Dependencies
```json
{
  "vite": "Build tool",
  "typescript": "Type safety",
  "@vitejs/plugin-react": "React plugin for Vite"
}
```

---

## 🎨 Styling Architecture

```
Tailwind CSS v4
    ↓
Custom CSS Variables (styles/globals.css)
    ↓
Component Classes
    ↓
Inline Tailwind Classes
```

**Color Scheme:**
- Primary: Blue/Indigo gradients
- Secondary: Purple accents
- Background: Slate/Blue gradient
- Cards: White with backdrop blur

---

## 🗂️ Component Hierarchy

```
App.tsx (Root)
├── Header
│   ├── Logo
│   ├── ExportData
│   └── Add Button → AddApplicationDialog
│
├── Tabs
│   ├── Dashboard Tab
│   │   ├── Dashboard (Stats Cards)
│   │   └── Recent ApplicationsList
│   │
│   ├── Applications Tab
│   │   ├── ApplicationsList (with search/filter)
│   │   └── ApplicationDetail (selected item)
│   │       ├── InterviewPrep
│   │       ├── EmailTemplates
│   │       └── EditApplicationDialog
│   │
│   ├── Timeline Tab
│   │   └── Timeline
│   │
│   └── Analytics Tab
│       └── Analytics (Charts)
│
└── Toast Notifications (Sonner)
```

---

## 💾 Data Structure

### JobApplication Interface

```typescript
{
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted' | 'withdrawn';
  location: string;
  salary?: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'working-student';
  applicationDate: string;
  interviewDate?: string;
  notes?: string;
  contactPerson?: string;
  contactEmail?: string;
  jobUrl?: string;
  priority: 'low' | 'medium' | 'high';
  cv?: { name, data, type };
  coverLetter?: { name, data, type };
  activities?: Activity[];
  interviewQuestions?: string[];
  followUpDate?: string;
  offerDeadline?: string;
}
```

---

## 🚀 Build Process

```
Development:
npm run dev → Vite Dev Server → http://localhost:5173

Production Build:
npm run build → Vite Build → /dist folder

Preview Build:
npm run preview → Serve /dist → http://localhost:4173

Deployment:
git push → GitHub Actions → Build → Deploy to GitHub Pages
```

---

## 📁 Where to Find Things

### Want to change colors?
→ `styles/globals.css` (CSS variables)

### Want to add a new feature?
→ Create new component in `components/`
→ Import and use in `App.tsx`

### Want to modify UI components?
→ `components/ui/` (but be careful!)

### Want to change the layout?
→ `App.tsx` (main structure)

### Want to add new dependencies?
→ `npm install package-name`
→ Update `package.json`

### Want to modify deployment?
→ `.github/workflows/deploy.yml`
→ `vite.config.ts`

---

## 🔍 Finding Specific Features

| Feature | Location |
|---------|----------|
| Add Application | `AddApplicationDialog.tsx` |
| Edit Application | `EditApplicationDialog.tsx` |
| Delete Application | `ApplicationDetail.tsx` |
| Search/Filter | `ApplicationsList.tsx` |
| Statistics | `Dashboard.tsx` |
| Charts | `Analytics.tsx` |
| Timeline | `Timeline.tsx` |
| Export | `ExportData.tsx` |
| Email Templates | `EmailTemplates.tsx` |
| Interview Prep | `InterviewPrep.tsx` |
| Status Changes | `App.tsx` (updateApplication function) |
| localStorage | `App.tsx` (useEffect hooks) |

---

## 📝 Adding New Features - Where to Start?

### 1. New UI Feature
- Create component in `components/YourFeature.tsx`
- Import in `App.tsx`
- Add to appropriate tab or section

### 2. New Data Field
- Update `JobApplication` interface in `App.tsx`
- Update `AddApplicationDialog.tsx` (form)
- Update `EditApplicationDialog.tsx` (form)
- Update `ApplicationDetail.tsx` (display)

### 3. New Statistics
- Add calculation in `Dashboard.tsx` or `Analytics.tsx`
- Create new chart component if needed

### 4. New Export Format
- Modify `ExportData.tsx`
- Add new export function

---

## 🎯 Best Practices

### ✅ Do:
- Keep components focused and small
- Use TypeScript interfaces
- Follow existing naming conventions
- Test locally before pushing
- Write clear commit messages

### ❌ Don't:
- Modify protected files without understanding
- Delete configuration files
- Change `components/ui/` components unnecessarily
- Commit `node_modules/` or `dist/`
- Push without testing

---

## 🔐 Protected Files

**DO NOT DELETE:**
- `index.html` - App won't load
- `src/main.tsx` - App won't render
- `vite.config.ts` - Build will fail
- `.github/workflows/deploy.yml` - Deployment breaks
- `components/figma/ImageWithFallback.tsx` - System file

---

## 📊 File Sizes (Approximate)

```
Total Project: ~15-20 MB (with node_modules)
Build Output: ~500 KB - 1 MB (optimized)
Components: ~50 KB total
Styles: ~10 KB
Dependencies: ~15 MB (not deployed)
```

---

## 🎓 Learning the Codebase

**Recommended Reading Order:**

1. Start: `README.md` - Understand what it does
2. Look: `App.tsx` - See the structure
3. Explore: `components/Dashboard.tsx` - Simple component
4. Study: `components/ApplicationsList.tsx` - Complex component
5. Review: `styles/globals.css` - Styling approach
6. Understand: `vite.config.ts` - Build process

---

## 🛠️ Customization Guide

### Change App Name
→ `index.html` (title)
→ `package.json` (name)
→ `App.tsx` (header text)

### Change Colors
→ `styles/globals.css` (CSS variables)

### Add New Tab
→ `App.tsx` (add new TabsTrigger and TabsContent)

### Modify Forms
→ `AddApplicationDialog.tsx`
→ `EditApplicationDialog.tsx`

---

## 📞 Need Help?

If you can't find something:
1. Use your editor's search (Ctrl+Shift+F)
2. Check this file's component descriptions
3. Look at `App.tsx` for overall structure
4. Review individual component files

---

**This structure is designed for easy navigation and customization!**

*Last Updated: November 2025*
