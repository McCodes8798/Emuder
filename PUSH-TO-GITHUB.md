# Push Your Family Tree to GitHub

Your files are ready! Now do these steps:

## 1. Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `muderhwa-family-tree`
3. Make it **Public** 
4. DO NOT initialize with README (we already have files)
5. Click "Create repository"

## 2. Push Your Code

After creating the repository, GitHub will show you commands. OR run these:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/muderhwa-family-tree.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username!

## 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source" select: `Deploy from a branch`
5. Branch: `main` | Folder: `/ (root)`
6. Click **Save**

## 4. Get Your URL!

Wait 2-3 minutes, then your site will be live at:
```
https://YOUR-USERNAME.github.io/muderhwa-family-tree
```

Share that URL with your family! 🎉

## 5. Update Later

When you make changes:
```bash
git add .
git commit -m "Updated family tree"
git push
```

Changes appear on your site in 1-2 minutes!

