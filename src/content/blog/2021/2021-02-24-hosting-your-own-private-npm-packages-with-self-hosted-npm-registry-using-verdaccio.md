---
title: "Hosting your own private npm packages with self-hosted npm registry using Verdaccio"
slug: hosting-your-own-private-npm-packages-with-self-hosted-npm-registry-using-verdaccio
date: 2021-02-24
url: https://mfyz.com/?p=641
tags: ["Other"]
category: Other
migration: {"wpId":641,"wpPostDate":"2021-02-24T18:47:07.000Z"}
---

![](/images/archive/en/2021/02/verdaccio-tiny@3x.png)

At Nomad Interactive, we are relatively new to contributing to npm with our own packages. Our initial designs of how we packaged certain things that are common throughout our projects, like eslint configurations, or some generators we created for ourselves... We initially packaged them as private repositories without thinking too much about its versioning, supporting multiple versions of (let’s say eslint, or react.js). Then it became clear that we had to version our packages properly. So we started our research to see how we can easily spin a private registry of our own and distribute our packages privately to authenticated users which are not. 

We found verdaccio as an open source and lightweight npm registry. We were able to spin an instance very easily on our docker swarm in minutes and start pushing private packages with our initial versions.

[https://verdaccio.org/](https://verdaccio.org/)

If you need private registry for your team/company verdaccio is definitely a great quick and easy solution to get started.

Although we switched our mindset from, “why private packages anyway?” to let’s share everything we do with the world. So we questioned do we even need a private package at all? And the answer was no. Nothing we do is government secret or any secret at all. So we converted them to public packages and start pushing them to npm directly. The issue is, we definitely don’t have any real open source software management thought put behind any of those packages at all. So if we receive a pull request, we’ll most likely to neglect it (even though I’ll be very appreciative about it).

One thing I gotta say is, a private npm registry occasionally became painful to get it working properly on our CI/CD pipelines due to authentication. And Verdaccio doesn’t have support for registry tokens, or tokenized access separate from the users. So you have to create a user for your registry and that will probably need to be a git user. And if you are in a licensed environment like gitlab.com or GitHub, you may be forced to pay for a user that only CI/CD will use. Not a big deal but a side note that we had to deal with...