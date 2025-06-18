---
title: "Editing and previewing Mermaid diagrams on your docs (markdown, github, notion, confluence)"
description: "Methods for editing and previewing Mermaid.js diagrams within various documentation tools like Markdown editors, GitHub, Notion, and Confluence are explored. The utility of Mermaid.js for creating diagrams from plain text is highlighted."
slug: editing-and-previewing-mermaid-diagrams-on-your-docs-markdown-github-notion-confluence
date: 2022-12-20
url: https://mfyz.com/?p=811
tags:
  [
    "mermaidjs",
    "diagramming",
    "markdown",
    "github",
    "notion",
    "confluence",
    "documentation tools",
    "vscode",
  ]
category: Product Design
migration: { "wpId": 811, "wpPostDate": "2022-12-20T13:37:20.000Z" }
---

![](https://cdn-images-1.medium.com/max/1600/1*9m1nk8aZXUja7u43XLVyng.png)

Mermaid.js is one of my recent favorite tools I’ve added to my toolbox. Mermaid.js is an open-source diagramming tool that converts plain structured text and renders diagrams as SVG or PNG images. You can use the following tools to render and save mermaid diagrams on your documents but there are better ways to create, edit and maintain your mermaid diagrams in your favorite documentation tools. Because of its popularity, a lot of documentation tool supports the mermaid either out of the box or with add-ons.

### Mermaid Live Editor

Let’s start with the obvious option. Mermaid.js has an online editor that is free to use and does not require anything. You can quickly start creating diagrams, and share or embed them in your favorite places.

Try: [https://mermaid.live](https://mermaid.live)

### Markdown editors mermaid support

I personally use Visual Studio Code as my markdown editor and I use the Markdown Enhanced Preview extension to preview additional markdown features that include mermaid syntax to be rendered as diagrams.

[https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

![](https://cdn-images-1.medium.com/max/1600/1*PtunBteT6mDVD6dALZG6QQ.png)

I’ve seen most of the text editors that have markdown support to have mermaid support included by default or with add-ons/extensions.

### Documentation tools mermaid support

Most tools work with markdown or support markdown features, recognize mermaid.js, and provide out-of-the-box mermaid diagrams support.

### [Github.com](http://Github.com) markdown mermaid support

Github started to support mermaid diagrams rendered instead of code blocks if the code block is marked as mermaid syntax.

https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/

It works out of the box and when a markdown file is rendered in the preview mode in your repo, it will show the diagram as SVG rendering inline instead of the code block.

### Confluence mermaid Plugin

There is a free confluence add-on that adds a page macro that you can insert a mermaid diagram by adding the source diagram text once you insert it to the page, it renders it as an SVG image. It can be easily edited on the page so there is no need to render, export, and insert as an image manually.

[https://marketplace.atlassian.com/apps/1222792/mermaid-integration-for-confluence?tab=overview&hosting=cloud](https://marketplace.atlassian.com/apps/1222792/mermaid-integration-for-confluence?tab=overview&hosting=cloud)

![](https://cdn-images-1.medium.com/max/1600/1*mjbqZFOjqW_PbcWpz8pXeA.jpeg)

### Notion mermaid support

Any code block that is selected as mermaid syntax, gets a mermaid diagram rendered in the code block. It has diagram size limited to the code block width which makes it hard to see large diagrams, but it does render small-size diagrams or things like pie charts powered by mermaid syntax well.

![](https://cdn-images-1.medium.com/max/1600/1*aRu3IBV8JbLFV6_DOHrfGA.jpeg)
