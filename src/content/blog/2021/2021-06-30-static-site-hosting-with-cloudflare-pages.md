---
title: "Static Site hosting with Cloudflare Pages"
description: "Cloudflare Pages is presented as a static site hosting solution, emphasizing its fast network performance, Git-integrated deployment process, and suitability for JAMStack applications. Key features such as custom domain support and pricing are also covered."
slug: static-site-hosting-with-cloudflare-pages
date: 2021-06-30
url: https://mfyz.com/?p=681
tags:
  [
    "cloudflare pages",
    "static site hosting",
    "jamstack",
    "cdn",
    "web hosting",
    "cloudflare",
  ]
category: Geekin'
migration: { "wpId": 681, "wpPostDate": "2021-06-30T18:17:57.000Z" }
---

![Cloudflare Pages](/images/archive/en/2021/06/A1F44916-C24F-4B29-BD84-8A799EE8C2BB.jpeg)

I wrote about my fascination and falling in love more with other [Cloudflare services](/intro-to-cloudflare-workers/) recently. Cloudflare started as a DNS proxy service with caching and security features but then expanded into more capabilities like workers, domains and static website hosting with the Cloudflare Pages service.

There are thousands of hosting solutions out there, some free as well. But I really liked playing with Cloudflare Pages because of a few key features. Non of these features are unique or exclusive to Cloudflare but combination of them makes perfect candidate if you are already using other cloudflare services or if you currently don’t have a go-to solution when you want to bootstrap something and put it out there quickly.

It makes perfect candidate for developers to use it as experimenting tool. Don’t get me wrong, this service is production-ready and probably one of the best ones out there. But ease of making deployments makes it great for using it as playground.

## Probably fastest (network) load times you can get

![Cloudflare Network](/images/archive/en/2021/06/1B1152D8-8416-41C2-A7E6-A96247E9DB00-1600x944.jpeg)

Cloudflare edge network and CDN may be the widest distributed network of servers get your content and app closest possible to your users throughout the globe. When it comes down to the speed, they are great at doing what they do. And we’re speaking static hosting which goes well with the high quality CDN that your users will get the lowest latency and highest download speeds to your website’s resources. And you get snappy website.

## Git integrated deployments

Cloudflare Pages are exclusively deployed by git/github integration. You have to put your assets (or pre-build app) in a repo and connect to cloudflare pages when you create a new project.

Cloudflare listens pushes to certain branches where you can directly push changes or restrict your git workflow to work with merge/pull-requests. Eventually commits trigger the deployment builds.

These builds are not required. If you have index.html in your repo, it gets deployed served right away. But if you are using a build process, cloudflare pages will work with that easily.

## Perfect for JAMStack apps

The build process makes cloudflare pages perfect for JAMStack apps. My go to stack is next.js to create plain/simple react.js based apps. Cloudflare pages plays well with next.js among with many other popular frameworks. 

Keep in mind that your JAMStack app, build process has to export static html/js/css assets that can’t be served by running a web server process. So your static output runs on CDN network and loads instantaneously.

## Custom Domains

Cloudflare provides free subdomains with SSL by default when you set up a project and deploy a site. But you can configure your custom domains without much work for free with Cloudflare Pages. It also comes with managed flexible SSL out of the box.

## Pricing

Cloudflare Pages is free to start. And their free tier ie pretty generous until you need to scale a lot. And even with the paid version is dirt cheap compared to the effort you have to put to scale and/or alternative services.

### Conclusion

All-in-all, I loved playing with Cloudflare Pages. Again, it never cease to amaze me how much you can do for free with Cloudflare services including Pages. I highly recommend every developer to at least play with it and do a static site deployment to see how easy is to do it.

[https://pages.cloudflare.com](https://pages.cloudflare.com)
