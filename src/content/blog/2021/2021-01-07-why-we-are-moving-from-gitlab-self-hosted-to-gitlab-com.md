---
title: "Why we are moving from GitLab self-hosted to gitlab.com"
description: "This post outlines the rationale behind migrating from a self-hosted GitLab instance to the gitlab.com cloud service. It covers the benefits of reduced maintenance and the smooth transition experience."
slug: why-we-are-moving-from-gitlab-self-hosted-to-gitlab-com
date: 2021-01-07
url: https://mfyz.com/?p=616
tags: ["gitlab", "self-hosting", "cloud services", "ci-cd", "devops"]
category: Programming
migration: { "wpId": 616, "wpPostDate": "2021-01-07T22:09:45.000Z" }
---

![gitlab ci-cd test deploy illustration](/images/archive/en/2021/01/image.png)

Working without a code versioning system is unthinkable. And we progressed from the days of svn to git. Despite having a big competitor like the most popular git service is github.com, gitlab.com is for me a more appealing git hosting (and much more) service compared to github.com.

Gitlab is a fantastic platform that is ahead of github.com in certain aspects. We use GitLab as our primary code management, quality control, continuous integration, and deployment platform in our team. Although Microsoft is pushing hard to catch up on the parts (i.e GitHub actions to catch up GitLab CI/CD pipelines) that they follow, and obviously, much more ahead of gitlab.com on other features.

One of the biggest separating factors for gitlab.com is its self-hosted nature of it. IT's open source license and software that you can install and host on your own infrasture. In some projects or clients, you may want to host your own isolated code revisioning and build platform.

With this nature of it's licensing model, we first choose to use GitLab self-hosted to run and maintain GitLab versions over years until last year that we migrated to gitlab.com cloud service.

The biggest underlying reason was to not want to maintain gitlab.com hosted versions and be responsible for the server management, updates/upgrades, and stuff. To be honest, in one of the instances, we spent too much time figuring out upgrade details and making sure we didn't cause any downtime while we performed upgrades. We also rigorously wanted everything running on the docker swarm pool of servers we manage. And Gitlab itself is not the easiest service to get it running with our current toolset of docker/traefik...

Gitlab.com has the exact same licensing structure between the cloud and the self-hosted versions. This is why it doesn't make any sense to self-host and maintain infrastructure if you don't have other reasons not using the cloud version of the service. That's exactly what we were doing and we quickly experimented on few repos to be migrated and see we could have almost no change needed on our CI/CD pipelines settings that were 100% compatible to continue running on the cloud version. It really was seamless to migrate to the cloud version from the hosted version.

Another beauty of using gitlab.com is how easy to set up hosted "runners" and set them up to be used in the cloud repos for CI/CD pipelines. We often have extra build steps that are generally just optional but just because we could run them on our own runners without worrying about build minutes.

I suggest gitlab.com and its cloud version for both basic git hosting use cases as well as more advanced use cases like ci/cd pipelines or even adding 3rd party services on your code quality process.

[https://about.gitlab.com/pricing/](https://about.gitlab.com/pricing/)
