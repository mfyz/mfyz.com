---
title: "Create quick diagrams and Wireframes using Excalidraw + VSCode"
description: "The capabilities of Excalidraw, an open-source diagramming and wireframing tool, are explored, with a focus on its VSCode extension for creating quick visuals. Features like portability and collaborative editing are highlighted."
slug: create-quick-diagrams-and-wireframes-using-excalidraw-vscode
date: 2022-11-01
url: https://mfyz.com/?p=794
tags:
  [
    "excalidraw",
    "diagramming",
    "wireframing",
    "vscode",
    "open source",
    "productivity tools",
    "visual design",
  ]
category: Geekin'
migration: { "wpId": 794, "wpPostDate": "2022-11-01T13:46:20.000Z" }
---

![](/images/archive/en/2022/11/quick-diagrams-using-excalidraw-and-vscode.png)

There are probably tons of both diagramming tools as well as wireframing tools out there. And I have been using most of those throughout my profession.

I want to talk about my recent favorite “excalidraw” that I made it a quick-note style using its Visual Studio Code extension and some bash + Alfred automation on mac (that can be easily replicated in other OSes).

## Let’s start with what Excalidraw is…

Excalidraw is an open-source, react-based, web-based drawing tool. It comes with a limited set of functions in a minimal control panel but the batteries-included for all you need - for what it does in my opinion.

![](/images/archive/en/2022/11/Screenshot-2022-10-17-16.41.49-1600x1056.jpg)

It’s a diagramming app after all. But not just that.

### It's Open source

[https://github.com/excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)

### It’s portable - No app is required

Available at [](https://excalidraw.com/)[https://excalidraw.com/](https://excalidraw.com/)

It stores and auto-saves your open file in the local storage.

It also has some collaborative online real-time editing mode which is awesome.

### Saves editable copy inside share-ready PNG or SVG files

A very smart thing excalidraw does is save its editable meta in PNG or SVG exported/saved file. It definitely makes the file size larger, if you are using a lot of bitmap icons, screenshots, and all. If not, the png file you save and slap in slack, emails are actually going to be excalidraw openable and editable.

The easiest way to do this without any option is to name your file with `.excalidraw.png` or `.excalidraw.svg` extension. When opening this file with excalidraw online or VSCode, it will automatically open the editable version in less than a second. You make edits and just save…

### Embeddable

If you are developing a react-based application, you can actually embed excalidraw as part of your app and provide diagramming support.

```js
import { useState, useEffect } from "react";
export default function IndexPage() {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then(comp => setComp(comp.default));
  }, []);
  return <>{Comp && <Comp />}</>;
}
```

[https://www.npmjs.com/package/@excalidraw/excalidraw](https://www.npmjs.com/package/@excalidraw/excalidraw)

### Have a component library with everything you’ll need

[https://libraries.excalidraw.com/](https://libraries.excalidraw.com/)

## VSCode Extension

Even though I love it runs on the browser and auto-saves. I prefer to have this ready under my toolkit offline or faster open/edit/save files.

If you are a developer, good chance that you are using vscode daily - Or if you don’t, vscode is a very lightweight editor that is worth to use it only for excalidraw. For the ones who uses vscode actively, this means no extra tool is needed. Both vscode and excalidraw renders very fast and don’t use much system resources.

Another magic feature I like using excalidraw in its VSCode extension is that you just open `.excalidraw.png` (or svg) files by dragging and dropping them in vscode, making edits, and save. No export/re-export is needed. You can just use the saved PNG which includes both the final rendered PNG and the source content in the same file.

This also makes a lot of sense for teams who use their codebase to document their stuff in markdown files. Excalidraw diagrams are the perfect companion for CVS-stored documentation.

## Quick Create Digram

A final trick I do that makes my day-to-day very convenient is, having a shortcut to create an empty excalidraw.png file on my desktop and open it in VSCode, so I can start diagramming or wireframing in seconds without needing to open the wireframe app, create a new empty project or file…

The way I do this is by having a bash alias that is registered in my dotfiles/my-aliases: `ned` abbreviation of “New Excalidraw file on Desktop”.

```sh
function ned(){
  OLD_IFS="$IFS"
  IFS='-'
  NED_FILE="$HOME/Desktop/$*.excalidraw.png"
  IFS=$OLD_IFS
  echo "Created $NED_FILE"
  touch $NED_FILE
  code $NED_FILE
}

```

Then calling this alias either from the command line (if I’m already there) or by using an Alfred custom workflow that calls the same bash alias.

![](/images/archive/en/2022/11/Screenshot-2022-10-17-16.59.08.jpg)

Then viola, start dropping things from my library and quickly wireframing an idea I’m thinking:

![](/images/archive/en/2022/11/Screenshot-2022-10-17-17.01.31-1600x1045.jpg)

And finally, just save and share the png file in your favorite way…

Happy diagramming, wireframing ✍️
