---
title: "Better code history with gitlinter / commitlinter"
description: "The significance of maintaining consistent and informative commit messages for improved code history readability and team collaboration is discussed. Tools like commitlinter and conventions such as Conventional Commits are presented as methods to enforce these standards."
slug: better-code-history-with-gitlinter-commitlinter
date: 2020-10-27
url: https://mfyz.com/?p=570
tags:
  [
    "git",
    "commit messages",
    "conventional commits",
    "commitlint",
    "version control",
    "developer productivity",
    "team collaboration",
  ]
category: Programming
migration: { "wpId": 570, "wpPostDate": "2020-10-27T21:00:23.000Z" }
---

Working with git (or a similar version control system) is not an essential part of coding. We do frequent code commits as part of our workflow. Every developer has their own way of committing their code and labeling the changes made in the commit with commit messages. We often do this without putting enough thought into our commit messages that essentially define our change log in a more readable way when we look in the history of changes.

![](/images/archive/en/2020/10/0_qOZINFzFrBEhJsx_.jpg)

_Photo by [Yancy Min](https://unsplash.com/@yancymin) on [Unsplash](https://unsplash.com)_

### We need better commit messages

This brings us why having consistent, concise, and easier to follow commit messages very important. Better commit messages will make your code history, easy to follow, and navigate in the event to understand what happened when. In some cases, we want to use these changelogs more formally for internal purposes or external use like public changelogs or release notes. There are even tools that help to automate / to generate changelogs from commit messages.

![](/images/archive/en/2020/10/0_zt7A4T4UjBGNlUHo.jpg)

_Source: [xkcd](https://xkcd.com/1296/)_

### Better teamwork

Working with multiple developers even as little as two developers on a project will require clear communication on the version control system. The commit messages do not only appear in the code history, but also in blame logs as well as in-IDE helper tools like git lens for Visual Studio Code when the last change was done on the particular line under the cursor, by who, and with which commit message. Features like these make the code writing experience much richer and passively collaborative between team members. So commit messages actually appear in different places in different ways.

![](/images/archive/en/2020/10/hovers-annotations.png)

### How

Team should define clear set of commit message rules starting from their git flow. What I mean by that is how they do their branching, tagging strategy. This generally allows certain rules to be inherited to commit messages.

Regardless of the rules, people will forget. Easiest and best way to implement these rules to make sure there is a automated control mechanism that rejects/alerts if the commit message written is abiding these rules. “commitlinter” is a nicely designed npm package that is, when registered as a git pre-commit hook, checks the commit message and based on the commitlinter configuration, allows or rejects the commit if the commit message follows all the requirements or tell what’s going wrong with the commit message.

commitlinter comes with pre-defined conventions that are adapted by big companies/teams that are different in approach and have different focuses. 

[https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

I suggest you to review these different conventions and pick a convention that speaks closer to what you want to follow. And you can extend and customize its rules with your own approach.

At a high level, defining "scope" for your commit messages is the most critical categorization of the change content when commiting. An approach like the below is a good start:

- **feat**: Add a new feature to the codebase (MINOR in semantic versioning).
- **fix**: Fix a bug (equivalent to a PATCH in Semantic Versioning).
- **docs**: Documentation changes.
- **style**: Code style change (semicolon, indentation...).
- **refactor**: Refactor code without changing public API.
- **perf**: Update code performances.
- **test**: Add a test to an existing feature.
- **chore**: Update something without impacting the user (ex: bump a dependency in package.json).

We use a simplified version of this scope set. A sample commitlinter config file:

```js
module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "cont", "chore"]],
  },
};
```

See all rules in its official documentation: [https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md](https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md)

commitlinter also can be configured with husky which is another npm package that handles git hook registration in npm install commands.

The combination of both projects in a NodeJS project will allow setting and configuring the hooks easily.

### Change logs from commit messages

Conventional commit and commitlinter gets juicer when combined with an auto-generated changelog in a technical project - even for internal use cases. There are changelog generators from git-log that gives you conventional changelog which will be much more consistent throughout the team members who are making commits to a single repo as well as having well consistent updates in the commit messages.

Conventional changelog generators can translate each conventional commit spec to nicely categorized changelog in a simple configuration file like:

```json
{
  "types": [
    { "type": "feat", "section": "Features" },
    { "type": "fix", "section": "Bug Fixes" },
    { "type": "chore", "hidden": true },
    { "type": "docs", "hidden": true },
    { "type": "style", "hidden": true },
    { "type": "refactor", "hidden": true },
    { "type": "perf", "hidden": true },
    { "type": "test", "hidden": true }
  ],
  "commitUrlFormat": "https://github.com/mokkapps/changelog-generator-demo/commits/{{hash}}",
  "compareUrlFormat": "https://github.com/mokkapps/changelog-generator-demo/compare/{{previousTag}}...{{currentTag}}"
}
```

That generates a nicely organized markdown or HTML document. AngularJS is one of the known project utilized conventional commit messages and conventional changelog. See their changelog for an example of this; [https://github.com/angular/angular/blob/master/CHANGELOG.md](https://github.com/angular/angular/blob/master/CHANGELOG.md)

Happy conventional commits...
