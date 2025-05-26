---
title: "Optimize your bundle size by eliminating dead code / tree-shaking in Webpack"
slug: optimize-your-bundle-size-by-eliminating-dead-code-tree-shaking-in-webpack
date: 2022-07-05
url: https://mfyz.com/?p=755
tags: ["Front-End","optimization","reactjs","webpack"]
category: Front-End
migration: {"wpId":755,"wpPostDate":"2022-07-05T09:50:09.000Z"}
---

![](/images/archive/en/2022/07/Webpack-Tree-Shaking.jpg)

When building modern javascript apps (regardless of browser or server-side use), it’s important to know what your dependencies are and what you utilize from those dependencies. If no care is given to this, your bundle size may end up being very large and result in a non-performant user experience. Especially if this is a browser-based application that every byte matters.

Today, I want to talk about a very effective method to optimize your bundle size called [Tree Shaking](https://webpack.js.org/guides/tree-shaking/).

Traditionally, we install a module and import the methods we use from a module. In many modules, the methods in them are not separately exported and are part of a single default export that we object deconstruct from the default import. The most common example of this is:

```js
import { Box } from "@material-ui/core"

```

This results webpack to bundle all module methods. Even if we don’t use any of them.

There are a couple of ways to avoid this. Some libraries like lodash allow you to install only what you need. Instead of installing the entire lodash library, you can install only the module you need like lodash.get or lodash.trottle.

Another method is the tree shaking where we still install the full library but when we package our bundle, we tell webpack that we are only importing a portion of the larger library.

[https://material-ui.com/guides/minimizing-bundle-size/#option-1](https://material-ui.com/guides/minimizing-bundle-size/#option-1)

Instead of:

```js
import { Box } from "@material-ui/core"

```

Do this:

```js
import Box from "@material-ui/core/Box";

```

Similarly, a lodash example: instead of:

```js
import { groupBy } from "lodash";

```

Do this:

```js
import groupBy from "lodash/groupBy";

```

### Alternative method

There is also a babel plugin that can do this for you: **[babel-plugin-tree-shaking-import](https://www.npmjs.com/package/babel-plugin-tree-shaking-import)**

### Consistent import convention

Another key point to pay attention to about tree shaking is the consistency throughout your code. Make sure every instance of a module’s imports should be done consistently to point module paths. A single instance of a traditional way of importing the module and then deconstructing the parts needed will result in bundling the whole module in your bundle again.

Another reason to look into using the babel plugin is to achieve this automatically.