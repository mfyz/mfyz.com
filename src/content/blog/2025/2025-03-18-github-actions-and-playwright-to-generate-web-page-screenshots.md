---
title: "GitHub Actions and Playwright to Generate Web Page Screenshots"
slug: github-actions-and-playwright-to-generate-web-page-screenshots
date: 2025-03-18
url: https://mfyz.com/?p=950
tags: ["automation","Geekin'","github","playwright","screenshots"]
category: Geekin'
migration: {"wpId":950,"wpPostDate":"2025-03-18T12:30:00.000Z"}
---

![](/images/archive/en/2025/03/image.png)

### Automating Web Page Screenshots with GitHub Actions and Playwright

You just wrapped up your web project, and now it's time to make sure it looks great across devices and browsers. You could manually check every page, but let’s be real—who has time for that? Instead, let’s automate the process using **GitHub Actions** and **Playwright** to generate web page screenshots automatically. This setup will give you instant feedback on your website’s appearance and help you catch issues before they go live.

In this guide, I’ll walk you through the entire setup, from installing Playwright to configuring GitHub Actions. By the end, you'll have a fully automated system that runs on every code push. Grab your coffee, and let’s dive in!

## What Are GitHub Actions?

GitHub Actions is a built-in CI/CD (Continuous Integration and Continuous Deployment) tool that automates your development workflows. It allows you to run scripts in response to events like code pushes, pull requests, or scheduled triggers.

### Why Use GitHub Actions?

*   **Seamless Integration**: It’s built into GitHub, so you don’t need any external setup.

*   **Flexible Workflows**: You can create custom automation with YAML.

*   **Pre-Built Actions**: A marketplace full of ready-to-use workflows.

[Read more on GitHub Actions](https://docs.github.com/en/actions).

## What Is Playwright?

Playwright, developed by Microsoft, is an automation framework for browser testing. It allows you to write scripts that simulate real-user interactions, and best of all, it works across multiple browsers.

### Why Playwright?

*   **Multi-Browser Support**: Works with Chromium, Firefox, and WebKit.

*   **Headless Mode**: Run tests in the background without opening a browser.

*   **Powerful API**: Automate clicks, form fills, and even screenshots effortlessly.

[Check out Playwright on GitHub](https://github.com/microsoft/playwright).

## Setting Up Your Project

Let’s get started by setting up a GitHub repository and configuring Playwright for screenshot generation.

### Step 1: Create a New GitHub Repository

1.  Head to [GitHub](https://github.com/) and create a new repository.

3.  Name it something like `webpage-screenshot-automation`.

5.  Clone the repo to your local machine.

### Step 2: Install Playwright

Initialize a new Node.js project and install Playwright.

```
mkdir webpage-screenshot-automation && cd webpage-screenshot-automation
npm init -y
npm install playwright

```

### Step 3: Write the Screenshot Script

Create a new file called `screenshot.js` and add the following code:

```
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the desired page
  await page.goto('<https://example.com>');

  // Capture a screenshot
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();

```

Run the script to test it locally:

```
node screenshot.js

```

If everything is set up correctly, you should see `screenshot.png` in your project directory.

## Automating with GitHub Actions

Now, let’s set up a GitHub Actions workflow that will run automatically whenever you push changes to your repo.

### Step 1: Create a Workflow File

Inside your project, create `.github/workflows/screenshot.yml` and add the following:

```
name: Generate Screenshot

on:
  push:
    branches:
      - main

jobs:
  screenshot-job:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Set Up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install Dependencies
        run: npm install

      - name: Generate Screenshot
        run: node screenshot.js

      - name: Upload Screenshot Artifact
        uses: actions/upload-artifact@v2
        with:
          name: screenshot
          path: screenshot.png

```

### Step 2: Push Your Changes

Commit and push everything to GitHub:

```
git add .
git commit -m "Set up Playwright screenshot automation"
git push origin main

```

### Step 3: Check GitHub Actions

Go to the **Actions** tab in your GitHub repo. You should see the workflow running. Once completed, the screenshot will be available as an artifact.

## ⚠️ Playwright browser installation step can take long

Installing Playwright in GitHub Actions can take a significant amount of time because it downloads all supported browsers by default. If you only need a specific browser (e.g., Chromium), you can install it with:

```
npx playwright install chromium

```

Then, modify your script to use only the installed browser.

## 🏎️ Speeding Up Workflow with Caching

Since downloading and installing Playwright browsers happens on every workflow run, caching them can significantly speed up execution. Modify your workflow to cache the Playwright binaries:

```
      - name: Cache Playwright Browsers
        uses: actions/cache@v2
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}
          restore-keys: |
            playwright-${{ runner.os }}

```

This ensures that Playwright's browser binaries are reused across runs, reducing setup time.

## Wrapping Up

That’s it! You’ve successfully set up an automated workflow that generates web page screenshots every time you push your code. This can save you time and help catch layout issues before they reach production.

### Next Steps

*   Modify the script to capture multiple pages.

*   Add email or Slack notifications.

*   Extend it to handle different screen sizes.

If you found this guide useful, share it with your fellow developers! Got questions? Drop them in the comments. 🚀