---
title: "Remove unused CSS with PurgeCSS"
slug: remove-unused-css-with-purgecss
date: 2022-07-15
url: https://mfyz.com/?p=760
tags: ["css","Front-End","Other","Programming","purge"]
category: Front-End
migration: {"wpId":760,"wpPostDate":"2022-07-15T19:36:18.000Z"}
---

![](/images/archive/en/2022/07/D94DDA08-12B3-4CE0-91FD-C5F3AD7612B5.png)

When building a web app, we often use our go-to CSS framework (bootstrap, tailwindcss…) that comes with a lot of useful stuff that normalizes and speeds up our UI building process. Frameworks also come with a lot of baggage, a lot of it. Most of our UIs are not super complex and we don’t use the majority of the CSS frameworks we use. Even when we build and implement your own Design System from scratch, you always will have unused CSS in any given project or application.

PurgeCSS is a great way to optimize your final output to only contain the CSS you need and used. In my simple apps, I’ve implemented PurgeCSS, and I’ve seen between 70-90% final CSS size decrease and a significant render time decrease.

PurgeCSS works with most javascript bundlers and web build tools. It also comes with its own CLI tool. My go-to use case is their seamless integration with TailwindCSS in NextJS builds. Here is a nice [guide](https://betterprogramming.pub/8-simple-steps-set-up-a-project-with-tailwind-css-next-js-10-and-purgecss-c44e1104bdf0) and the example [github repo](https://github.com/mfyz/tailwind-next-playground) I put when I was playing with this.

[Check out PrugeCSS](https://purgecss.com/)