---
title: "Our git workflow at Nomad Interactive (branching, tagging)"
slug: our-git-workflow-at-nomad-interactive-branching-tagging
date: 2021-02-09
url: https://mfyz.com/?p=634
tags: ["Programming"]
category: Programming
migration: {"wpId":634,"wpPostDate":"2021-02-09T16:20:15.000Z"}
---

Here is an adjusted version of our internal documentation at Nomad Interactive about our git workflow explained. We almost exclusively write javascript on all platforms (node.js back-end, react.js web front-end, and desktop, react native for mobile with minimal swift and android java for mobile apps). There are a lot of biased opinions and structures in this article that may be too javascript focused but it can be applied to other languages with equivalent solutions. 

We want to have a code base and development process with best practices that reflect ideal workflow and produce clean, understandable, testable. This article outlines few key goals we want to achieve with this ideal workflow. 

## Continuous Integration Requirements (Pipelines)

**Clean Code, Unified Developer Language  
**  
Development shouldn't be built around a lot of rules or “musts”. Allowing developers to define their own style is important, but understandable code is one of the most important elements of an effective development team. It's famously known that big teams (Google, Facebook, Airbnb...) utilizes a large set of rules under a good practice definition that allows every developer to speak the same language and be able to adapt to each other's code and process very easily.

In order to do that, we will follow similar practices to have our javascript code to be unified in a single style. Few tools we will start utilizing to achieve this.

### REQUIREMENT #1: WRITE JS in ES6

We will have a good practice of writing modern ES6 and in this case, we have to, use transpilers (babel, webpack) to compile our code to VanillaJS for plain javascript rendering.

### REQUIREMENT #2: Clean code enforced using ESLINT

We inherit Airbnb's javascript guidelines and write javascript/JSX in the same style. We have built our own eslintrc and maintain that in a separate repository. Our eslint configuration is packaged in an npm package and our project eslint configurations are generally just a few lines and inherit all rules from this package: [https://www.npmjs.com/package/@nomadinteractive/eslint-config](https://www.npmjs.com/package/@nomadinteractive/eslint-config)

We will set up our continuous integration server to only accept error/warning-less code commits.

### REQUIREMENT #3: 100% Test passing

We don't want to worry about breaking stuff, spend time on unnecessary human energy to make sure we cover all regression tests within our development iterations. For this, we need to embrace some form of test-driven development. For each environment and often per-project specific test approach. But we generally do unit testing via jest on our express back-end apps (mostly APIs), some unit testing on web apps but mostly e2e test with puppeteer, and some unit + e2e using detox on iOS and Android apps.

We don’t have any code coverage requirements yet.

## Branching and Tagging Practices

*   We always lock the master branch for all users except the CI server, locked for pushes and merge requests as well.
*   Dev branch is also locked for direct commit/pushes. Only pull request and merge requests are going to be allowed.
*   Development code is pulled or merged to the “dev” branch when the CI pipeline succeeds.
*   Every developer works on their own local development branches per feature, fix, or other categorized with uniform branch naming strategy.
*   We should avoid having long-living remote branches other than the protected branches that are specific to a developer - at all costs.
*   When it's time to push your changes to a build or the latest development branch where all developers push their branch remote, then merge their code. You can create merge requests to the dev branch from your branch easily on GitLab or GitHub UI or from the command line. Then, the CI server picks up your commit, makes sure your code is clean and acceptable, then it approves and finishes merge to the dev branch. You continue working on your local branch and repeat this process.

Diagram below demonstrates the branching and development workflow.

![Image.jpg](/images/archive/en/2021/02/image.png)

## Automated deliveries

Shipment of the code has to be automated in all cases from development to production submissions. We need to utilize all code distribution methods to automate this workflow.

We currently use Test Flight for iOS apps, Firebase Beta for Android apps.  
Obviously, web-based apps (both front-end and back-ends) deploy to their respective environments via CD automatically.

For mobile apps (react native), we also utilize **Microsoft Code Push** for over the air updates for react native apps aside from the bundled native builds to be distributed in the traditional ways mentioned above. This allows us to ship smaller builds faster.

## Merge Request Approvals - Code Reviews

We conduct code reviews, every merge request to be assigned to another developer for them to review and approve the changes, then CI will proceed with deployment.

Example 

1.  Ethan makes some changes,
2.  Ethan sends merge request to the dev branch,
3.  CI server runs tests and prerequisites for the project, if succeeds,
4.  CI server assigns a random developer (from the approvers' list) for code review (Let's say Fatih)
5.  Fatih reviews code on GitLab UI and approve the merge request
6.  CI server finishes CI and CD pipeline (finish merge to dev and if its release, merge it to master and deploy as well).

Based on the team size, we will only enable code review for releases. Making code review part of our regular builds will be an extra step for a remote development team and may cause delays.

## CI /CD Pipeline Types

### **A) Development Merges**

Regular code check-ins when finishing sprints, screens, bugfixes, etc. The primary reason to do this as often as possible to sync clean and stable codebase between developers when working on larger/longer builds.

![Regular dev merges (no build).png](/images/archive/en/2021/02/image-2-1600x856.png)

1.  Matt commits and pushes all his changes to his local branch “matt-dev” and created a “merge request” from the matt-dev → dev branch.
2.  Gitlab CI picks up the requests and starts the CI pipeline to check the code.
3.  With successful CI pipeline result, merge request will be approved by the CI server and code will be merged to the dev branch.

With successful build and code change notifications on slack channels, all developers will be able to see any change on the dev branch. Everybody will pull the latest code to their local development branch.

### **B) Development Builds**

Same as Dev CI but triggered with a final build to be pushed for distribution for testing

![Image.jpg](/images/archive/en/2021/02/image-1.png)

1.  Deployments (builds) will be triggered either:
    1.  Manually over GitLab UI, slack commands, or a potential mobile app, we will build for deployments.
    2.  Every morning with a scheduler, if there are merges that are not built yet. This will allow our development pipeline to be always shipping the changes to testable code. This process effectively eliminates the “deployment queue” concept.
2.  Deployments will start with CI pipeline re-run including code quality checks.
    1.  CD steps are actually steps in the CI pipeline that are only enabled for deployments. These steps will package and deliver the app bundles to various distribution platforms TF, Fabric/Firebase, OTA based on the platform.

### **C) Releases (production)**

When the development builds are stable and it's time to package the code for production. 

![Releases.png](/images/archive/en/2021/02/image-3-1600x502.png)

1.  One of the developers of the project takes the lead and manually triggers a release build by creating a merge request from the dev branch to the master branch. CI server picks up this merge request and fires up a CI pipeline.
2.  When the CI pipeline successfully passes, it notifies all “reviewers” defined in the project to review the code. We will have multiple developers and team leads review the code and approve the release.
3.  Once all reviewers approve the merge request and pushed the code to the master branch, the CI pipeline also tags the master branch with the version number of the release,
4.  Gitlab merges the code to master and continues on CI pipeline for the release.
5.  After packaging the app, CD pipelines distribute the app to existing internal distribution services TF + Fabric/Firebase + OTA. On top of this, CD prepares the build on App Store and Google Play for final release operation. Since the App Store uses TF builds as the way to push builds to the app store, we don't need anything extra on that but we need to implement a way to upload the release build to Google Play as a “Timed Publishing” model.

### **D) Hotfix releases**

This is a special branch that mimics the “dev” branch and has the same release workflow. Hotfix releases have an extra step on the “merge to master” step, it also runs pull operation to the “dev” branch after hotfix changes are merged to master. This makes hotfix changes to become available in the “dev” branch.