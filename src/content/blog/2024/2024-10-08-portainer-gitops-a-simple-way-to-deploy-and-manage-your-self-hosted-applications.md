---
title: "Portainer + gitops ❤️: A simple way to deploy and manage your self-hosted applications"
slug: portainer-gitops-a-simple-way-to-deploy-and-manage-your-self-hosted-applications
date: 2024-10-08
url: https://mfyz.com/?p=885
tags: ["container","deployment","OS","portainer","selfhost"]
category: OS
migration: {"wpId":885,"wpPostDate":"2024-10-08T12:47:30.000Z"}
---

Self-hosting became a much easier and more viable option using docker. You don’t need to understand the source code or have no intent to customize stuff. Setting things that you are not familiar with made open source applications require their own experts.

Docker made all of this almost like installing an app on your computer from a binary. In fact, I never installed Redis directly on my computer before, yet, I have half a dozen apps that have their own Redis instances humming happily on my server and I have zero concerns about how to set it up in case I need it directly on my projects.

I’m going to give you my personal go-to way of how I host my applications like simple nodejs, php applications, WordPress sites, and many open source tools (that are also saas, but I choose to host my own instance).

## Portainer: My Container Management Maestro

Portainer acts as my central command center for all things containerized. This handy tool lets me build, deploy, and manage both individual containers and entire stacks. Did I mention it runs as a lightweight container itself? Here's a peek at my streamlined docker-compose.yml for Portainer:

```
version: "3"
services:
  portainer:
    image: portainer/portainer-ce:latest
    restart: unless-stopped
    ports:
      - 9000:9443
    volumes:
      - data:/data
      - /var/run/docker.sock:/var/run/docker.sock
volumes:
  data:

```

## Web UI

Portainer’s web UI has pretty much everything you need to see and “do” for your stacks and containers.

![](/images/archive/en/2024/09/p1-1600x1000.jpg)

Screenshot

![](/images/archive/en/2024/09/p2-1600x1000.jpg)

Screenshot

## Secure Access

![](/images/archive/en/2024/09/image1-40-1600x900.png)

I use Cloudflare zero trust to expose my portainer (and other private apps). As simple as pointing a subdomain to a port using a tunnel, then saying Zero trust that any network request to that subdomain requires Zero trust authenticated session.

## Portainer Gitops

Let’s get to the juicy part, the magic factor for portainer: gitops integration. It’s not rocket science, but it’s the most important “need” when hosting your own apps.

Certainly, if you are managing code, like templates, extensions, plugins, or basic stuff like your configuration files for an app’s server environments (like *sql, redis, node, php, nginx).

This makes your simple projects also closer to “Infrastructure as Code” practices, without going through complex AWS, Azure, IaC models.

Assuming you are keeping them in a VCS, favorably github, you treat your git flows (i.e: merge of a PR to a certain branch) as the main triggers for your deployments.

Portainer comes with native gitops integration through both webhooks and polling (not recommended but can be used as a backup method). When there is a push to a branch you define, portainer re-runs your stack, builds your images if needed then restarts your containers with the changes. 🎩

![](/images/archive/en/2024/09/p3-1600x1000.jpg)

Screenshot

Portainer is open source (zlib license) and free with Community Edition. It also has more advanced features in its Business license. I found a few areas that I wished had those advanced features but so far none of them became “blockers” in my use cases. I imagine using portainer for more team-wide/company-wide use cases may require Business license.

At some point, I wanted to find a truly open-source and non-profit version of portainer and there are a few, but portainer (and its gitops integration) makes it a good enough combination that I didn’t want to bother replacing it.

Check it out [https://www.portainer.io/](https://www.portainer.io/)