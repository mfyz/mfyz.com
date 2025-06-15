---
title: "Importance of changelogs"
description: "The significance of maintaining a changelog for projects is discussed, referencing guidelines from keepachangelog.com. An example changelog is provided to illustrate best practices for documenting changes."
slug: importance-of-changelogs
date: 2019-11-19
url: https://mfyz.com/?p=387
tags:
  [
    "changelog",
    "version control",
    "documentation",
    "open source",
    "project management",
  ]
category: Other
migration: { "wpId": 387, "wpPostDate": "2019-11-19T19:21:44.000Z" }
---

![](/images/archive/en/2019/11/ross-findon-mG28olYFgHI-unsplash.jpg)

It’s very important to keep a changelog and be disciplined about maintaining it as your product progresses. This applies to both product management and software development/management processes.

I want to mention a great source that talks, describe and almost accepted as a standard in open source community for changelogs:

[https://keepachangelog.com](https://keepachangelog.com)

### What is a changelog?

A changelog is a file that contains a curated, chronologically ordered list of notable changes for each version of a project.

### Why keep a changelog?

To make it easier for users and contributors to see precisely what notable changes have been made between each release (or version) of the project.

### Who needs a changelog?

People do. Whether consumers or developers, the end-users of software are human beings who care about what's in the software. When the software changes, people want to know why and how.

### An example Changelog (from Stretchly)

```markdown
## [Unreleased]

### Changed

- tray menu link for update to website, instead of github
- Chinese (Taiwan) translations updated
- German translations updated
- no notification is shown after system resume/unlock
- no notification is shown after manual resume of pause from tray menu

### Added

- pause breaks when screen is locked (Windows, macOS)

## [0.20.1] - 2019-07-14

### Added

- clicking on settings file location will open it
- ability to copy debug info to clipboard
- Added Lithuanian language

### Fixed

- auto hide menu bar in app's windows
- break window not always shown on top of other windows (for Windows OS)

## [0.20.0] - 2019-07-02

### Fixed

- workaround multiple screens and fullscreen (macOS)
- tray icon size on Linux
- problem with Window missing when resetting settings to defaults

### Changed

- update icons and graphic materials
- Turkish translations updated
- Hindi translations updated

### Added

- Korean translations
- more break and microbreak ideas
- more settings in Contributor's settings
- Polish translation
- start a break/microbreak with a sound (set via config file or Contributor's settings)
```

Github renders this markdown changelog beautifully: [https://github.com/hovancik/stretchly/blob/master/CHANGELOG.md](https://github.com/hovancik/stretchly/blob/master/CHANGELOG.md)
