# ChronoView - A Next.js Clock App

This is a beautiful and customizable digital clock application built with Next.js, React, and Tailwind CSS.

## Deploying to GitHub Pages

This project is configured to be deployed as a static site to GitHub Pages. Follow these steps to publish your own version.

### 1. Repository Configuration

1.  **Create a GitHub Repository**: If you haven't already, push this project to a new repository on your GitHub account.

2.  **Set Repository Name in `next.config.ts`**:
    *   Open the `next.config.ts` file.
    *   Find the `basePath` property.
    *   Replace `"/your-repo-name"` with the actual name of your GitHub repository (e.g., `"/chronoview-app"`). This is a crucial step!

    ```javascript
    // next.config.ts
    const nextConfig: NextConfig = {
      basePath: "/your-repo-name", // <-- CHANGE THIS
      // ... other settings
    };
    ```

### 2. GitHub Pages Settings

1.  **Navigate to Settings**: In your GitHub repository, go to `Settings` > `Pages`.
2.  **Set Build Source**: Under the "Build and deployment" section, change the source from "Deploy from a branch" to "**GitHub Actions**". GitHub will automatically detect the `deploy.yml` workflow file you have in this project.

### 3. Push and Deploy

1.  **Commit and Push Changes**: Commit the changes you made to `next.config.ts` and push them to your `main` branch.
    ```bash
    git add .
    git commit -m "Configure for GitHub Pages"
    git push origin main
    ```
2.  **Check Workflow Status**: Go to the `Actions` tab in your GitHub repository. You should see a new workflow named "Deploy to GitHub Pages" running.
3.  **View Your Site**: Once the workflow completes successfully, your site will be live! You can find the URL in the `Settings` > `Pages` section of your repository. It will be something like `https://your-username.github.io/your-repo-name`.

That's it! Every time you push a change to your `main` branch, GitHub Actions will automatically rebuild and redeploy your site.
