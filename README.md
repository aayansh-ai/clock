# ChronoView - A Next.js Clock App

This is a beautiful and customizable digital clock application built with Next.js, React, and Tailwind CSS. It is configured to be deployed as a static site to GitHub Pages.

## Deploying to GitHub Pages

This project is configured to be deployed to your repository `aayansh-ai/clock`.

### 1. GitHub Pages Settings

1.  **Navigate to Settings**: In your GitHub repository, go to `Settings` > `Pages`.
2.  **Set Build Source**: Under the "Build and deployment" section, change the source from "Deploy from a branch" to "**GitHub Actions**". GitHub will automatically detect the `deploy.yml` workflow file in your project.

### 2. Push and Deploy

1.  **Commit and Push Changes**: Commit any changes you have and push them to your `main` branch.
    ```bash
    git add .
    git commit -m "Configure for GitHub Pages"
    git push origin main
    ```
2.  **Check Workflow Status**: Go to the `Actions` tab in your GitHub repository. You should see a new workflow named "Deploy to GitHub Pages" running.
3.  **View Your Site**: Once the workflow completes successfully, your site will be live! You can find the URL in the `Settings` > `Pages` section of your repository. It will be `https://aayansh-ai.github.io/clock`.

That's it! Every time you push a change to your `main` branch, GitHub Actions will automatically rebuild and redeploy your site.
