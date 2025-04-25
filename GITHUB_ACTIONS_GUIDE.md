# GitHub Actions CI/CD Guide

This guide explains how to use GitHub Actions for testing and deployment of this project.

## Setup Steps

1. **Push Your Code to GitHub**
   - If you haven't already, create a GitHub repository
   - Push your code to the repository

2. **GitHub Actions Configuration**
   - The `.github/workflows/ci.yml` file is already configured in your project
   - It sets up a workflow with install, lint, test, build, and deploy jobs

## Workflow Overview

The CI/CD workflow includes the following jobs:

1. **Install**: Installs all dependencies and caches node modules
2. **Lint**: Runs ESLint to check code quality
3. **Test**: Runs Jest tests
4. **Build**: Builds the Next.js application (only on push to main or staging)
5. **Deploy**: Deploys to staging or production environments based on branch

## Setting Up Environment Variables

For sensitive information, add GitHub Secrets:
1. Go to your GitHub repository
2. Click Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add secrets like:
   - `NEXT_PUBLIC_API_URL`
   - Database credentials
   - Deployment tokens

## Running Tests Locally

Before pushing to GitHub, you can run tests locally:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint
```

## Branch Strategy

The workflow is configured for the following branches:
- **main**: Production branch, automatic testing, building, and manual deployment
- **staging**: Staging environment, automatic testing, building, and deployment
- **develop**: Development branch, automatic testing only
- Feature branches should be created from and merged into develop

## Customizing the Workflow

You can modify the `.github/workflows/ci.yml` file to:
- Add more test jobs
- Configure different deployment targets
- Add custom steps or actions

## Deployment Configuration

The workflow is set up with placeholder deployment steps. To implement actual deployments:
1. Uncomment and configure the deployment actions in the workflow file
2. Add any required environment variables or secrets
3. Set up your deployment environments in GitHub (Settings > Environments)

## Monitoring Workflows

To monitor your workflows:
1. Go to your GitHub repository
2. Click Actions tab
3. You'll see all workflow runs with their status
4. Click on any run to see detailed logs and troubleshoot issues 