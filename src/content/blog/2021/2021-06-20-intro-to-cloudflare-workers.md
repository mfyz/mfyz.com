---
title: "Intro to Cloudflare Workers"
description: "An introduction to Cloudflare Workers is provided, highlighting its capabilities as a distributed, serverless platform for building lightweight back-end components and serving dynamic content. The benefits, free tier, and related tools like Flareact are also discussed."
slug: intro-to-cloudflare-workers
date: 2021-06-20
url: https://mfyz.com/?p=678
tags:
  [
    "cloudflare workers",
    "serverless",
    "edge computing",
    "cdn",
    "flareact",
    "web development",
  ]
category: Geekin'
migration: { "wpId": 678, "wpPostDate": "2021-06-20T14:08:51.000Z" }
---

![maxresdefault.jpg](/images/archive/en/2021/06/image-1.png)

Cloudflare is never missing to amaze me. It’s a beautiful service with a lot of free versions of almost all of their services makes cloudflare a great experiment hub. 

Cloudflare started as a DNS proxy with adding security and “routing” features on to their service offerings in recent years. I almost 100% of the time use and suggest cloudflare if we are setting up a new website or taking over an existing web property. Cloudflare works like magic most of the time with very minimal setup.

I recently started playing and experimenting more with their relatively new service offering “workers”. Workers is basically distributed, serverless service that allows us to build lightweight back-end components. With it, you can serve static and dynamic web pages, create APIs for your front-end application without even thinking about hosting part of your site.

You simply set up your domain, set up workers and configure your “routes” for your workers. For instance, you can redirect all traffic going to “mfyz.com/about” url to be handled by workerA. And workerA can create dynamic or static responses to this request. You can do almost anything with the worker responding this request.

Check out the workers service page: [https://workers.cloudflare.com/](https://workers.cloudflare.com/)

As I mentioned above, Cloudflare Workers has a free tier with generous $100k requests a day. And their first tier is $5/mo pricing which makes it extremely affordable even in larger traffic. The free tier allows you to start playing with it right now.

I only wanted to introduce and talk about my opinion of the service on this article. So I’m not going to give examples or a tutorial. 

Here is a very good article with some examples (seems like it’s sponsored article that was probably supported/created by cloudflare team as of their service launch):  
[https://www.smashingmagazine.com/2019/04/cloudflare-workers-serverless/](https://www.smashingmagazine.com/2019/04/cloudflare-workers-serverless/)

### Flareact

For react and nextjs lovers, there are ways to configure your nextjs app to run on cloudflare workers. But there is an open source project: Flareact, makes things much easier for the nextjs lovers. It’s not directly built on top of nextjs, so you wouldn’t use nextjs apis or components but they have almost all of the apis and components mirrored on this project that makes adaptation of your current nextjs app breeze.

Check out their documentation and tutorial here: [https://flareact.com/](https://flareact.com/)

Cloudflare also likes to talk about this framework, worth to try: [https://blog.cloudflare.com/rendering-react-on-the-edge-with-flareact-and-cloudflare-workers/](https://blog.cloudflare.com/rendering-react-on-the-edge-with-flareact-and-cloudflare-workers/)
