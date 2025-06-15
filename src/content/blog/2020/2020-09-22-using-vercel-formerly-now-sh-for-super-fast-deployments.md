---
title: "Using Vercel (formerly Zeit/now.sh) for super-fast deployments"
description: "The benefits of using Vercel (formerly Zeit/now.sh) for rapid web application deployments are discussed, covering its command-line interface, Git integration for automatic deployments, and serverless API features."
slug: using-vercel-formerly-now-sh-for-super-fast-deployments
date: 2020-09-22
url: https://mfyz.com/?p=543
tags:
  [
    "vercel",
    "now.sh",
    "deployment",
    "serverless",
    "ci/cd",
    "web development",
    "static hosting",
  ]
category: Other
migration: { "wpId": 543, "wpPostDate": "2020-09-22T20:00:10.000Z" }
---

![](/images/archive/en/2020/09/git-push.png)

I always love services allowing developers to quicken the time from zero code to a live URL for a web application. Large majority or web applications I write - mostly for hobby topics - are very simple, not too complicated or crowded applications. So by my experimental nature, I create a lot of small apps. Most from scratch or using plain boilerplate codes I created in the past for myself for these experimental ideas.

Generally, when my code is ready to show to someone, I waste a lot of time on doing boring steps to prepare the app to make it visible somewhere. Thanks to services like heroku, this is way much less of a headache now. Readers follow me, knows I showed my love to heroku with multiple articles previously :)

I want to another service that brings me joy when I see I’m cutting a lot of annoying time that I want to teleport myself using these services when I bootstrap an idea and make it live and ready to prime time. Now.sh is a delightful service I discovered when I needed a static hosting for a react.js web app I wrote that I wanted to put up very quickly. There are some apps that I don’t even want to create a heroku git repository or want even faster turnaround on my steps to write and publish an app.

Now.sh allows single command line to be live on my web apps. Now.sh is actually name of the CLI tool for the parent service “Vercel”. To install their comamdn line tool, simply install “now” package globally from npm:

```sh
npm i -g vercel
```

Then first create your account on vercel and run 

```sh
vercel login
```

to login to your account. Now you are good to go.

### One command deployments for non-git projects - or automatic deployments for every commit

In your project folder. Simply run

```sh
vercel
```

command that will automatically deploy your code (the files in the current folder) to vercel with an automatically generated subdomain under “.now.sh”. If you want, you can attach your application to a custom domain of your own for free: [https://vercel.com/docs/custom-domains](https://vercel.com/docs/custom-domains)

### Instant API

Vercel/Now.sh also provides AWS-Lambda style “serverless” architecture. What I love about this model is that Vercel allows you to write an API endpoint in javascript in very very very simple way. You just create a javascript module file, exporting a function with 2 arguments req, res, very similar mimicking express req and res objects. So it’s familiar and even simpler than creating an express application and link it to a router. You simply create “api” folder and create “hello.js” which gives you ...deployment-url.../api/hello endpoint.

Here is an “echo” endpoint that returns what’s sent to it:

```js
module.exports = (req, res) => {
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
};
```

save this as echo.js under api folder in your project and you have yourself an endpoint :)

As simple as it looks, there are more advanced topics on this in vercel’s documentation: [https://vercel.com/docs/serverless-functions/introduction](https://vercel.com/docs/serverless-functions/introduction)

### Github integration

Another great feature I really like is direct and seamless integration to github repositories. I experimented with very portable development environments such as coding on iPad and such in the past. I find zero configuration and zero dependency development models/environments very attractive. There was an occasion in recent months that I had to live on my iPad for 10 days and needed some quick way to deploy and code up some web based application with few back-end capabilities. Nothing complex. It was very hard and time consuming to construct a remote development environment and continuously work on ssh-based remote platforms instead of native platform I was using.

Thankfully I used now.sh’s github integration that removed the “deployment” and build steps off of my local environment. I still had to do very frequent pushes to a remote git repository (github) in order to make sure I am continuously not breaking my working app and moving along on the feature I was working on. But still, it had zero dependency on my local environment that I was using my favorite editor and was able to push code to github and rest was taken care by now.sh. I really enjoyed it’s github bot that was very responsively posting updates to commit and PR logs as comments. I was also getting deployment changes on my slack channels. So it was pretty instantaneous to make changes and make it live somewhere that I can share with my team. More on their github integration here: [https://vercel.com/github](https://vercel.com/github)

### Final note

Vercel (formerly Now.sh or Zeit) is a great service for both bootstrapping and making your app scale. They are also very transparent and open on their tooling that makes moving out easy. So there is no fear of “locking in” to a degree.

There are also half dozen other beautiful features that I’m not talking on this article, worth checking out: [https://vercel.com/](https://vercel.com/)
