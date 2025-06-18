---
title: "Hosting my hobby projects from cheap HP mini desktop from my closet (Verizon Fios)"
description: "A setup for self-hosting hobby projects using an HP mini desktop, Verizon Fios, and a software stack including Docker and Cloudflare Tunnels is detailed. Motivations, hardware choices, and the home lab configuration are explored."
slug: hosting-my-hobby-projects-from-cheap-hp-mini-desktop-from-my-closet-verizon-fios
date: 2024-10-29
url: https://mfyz.com/?p=909
tags:
  [
    "self-hosting",
    "home lab",
    "hp mini pc",
    "verizon fios",
    "docker",
    "portainer",
    "cloudflare tunnels",
  ]
category: OS
migration: { "wpId": 909, "wpPostDate": "2024-10-29T13:00:00.000Z" }
---

## Why?

For me, self-hosting is like having my own personal playground where I can experiment, tinker, and learn. It's a great way to explore new technologies, try out different setups, and have fun with my projects.

![](/images/archive/en/2024/09/1-1600x914.webp)

As part of my job, I need to have a deep understanding of developer experience. The best way to build this understanding is to be the developer, both initial experience with any development tool, as well as day-to-day work with these systems. Self-hosting is in a way, building empathy with the developer community. Understanding differences, and good/bad versions. My main reason is “learning”.

There are a bunch of other reasons one may choose to do this:

- **Privacy**: your data

- **Full control**: You own it (well, both good and bad)

- **Cost-effective**: (may not be always true, but mostly true)

## You shouldn’t do this… But if you really want to…

I don’t suggest this route for the majority of the people. It’s hard, you’ll hit walls way more frequently than you want. You have to be a warrior. If your reason is similar to mine, go for it. There is a strong determining factor though, your connectivity.

Let’s get started. I’ll start the connectivity, then the hardware and software.

## Sounds common but not so common: It’s a privilege to be on Fios

While high-speed internet has become more commonplace, it's still a privilege, especially in the United States. We’re (I’m) definitely taking it for granted. I use Verizon Fios is a fiber internet service. If it wasn’t for this, I wouldn’t self-host my stuff.

![](/images/archive/en/2024/09/2-1600x914.webp)

The big practical separation for Fios is how stable it is, regardless of the “mpbs/gbps” package you have. I used Fios in residential and office setups in New York City for years. I got off as I moved to different neighborhoods and I really really missed it when I didn’t have it, even though I got 1gbps service packages from other providers.

Back in the day when we used dial-ups and tried to play Half-Life (or Counter-Strike) online, your connection speed mattered but “lag” mattered even more. I lived in Turkey back then and we had a cable internet provider vs ADSL services the difference was, that you were getting super low lag/ping in cable network even though you were 1/4, 1/3th of the connection speed you had compared to other services that bragged how fast they were. Didn’t matter when playing online.

I have 300/300mbps, what’s called a “symmetrical” connection. 300mbps is already way higher than average internet connectivity worldwide (although certain countries/cities regions have way faster networks, overall world citizen gets access to the internet at lower speeds). But it would be ok even if it was slower because it’s a Fiber network and it's symmetrical which means download and upload speeds are the same. Often you see traditional ISPs advertise something ridiculous with high speeds like 500mbps, but it’s often only referred to as download speeds. And in the majority of consumer scenarios, this is fine. But you need the upload speed to be high and consistent/stable when you want to serve upstream.

## Hardware

Since it’s hobby purposes, I initially searched some “old” servers (like servers sitting on racks) on eBay. Then I realized it had a million combinations of hardware components, like CPU architectures, and network interfaces. I quickly went down the rabbit hole of Reddit threads both fun and scary stories. These “serious” server hardware were electric eating, heating sources that are also giant, require space kinda machines turned me off and I backed out quickly.

Then I explored mini PCs, which are more common computers that could handle my applications really easily. Think like you’re looking for a computer that you could use, but instead, you just host stuff and it sits somewhere in your home in a closet, without being a fire risk or a thing that you need to worry about how to keep it cool.

![](/images/archive/en/2024/09/3-1-1600x654.jpg)

I bought an “HP Elite Desk Mini” which is a decent computer if I were to use it as my desktop. It has 16GB memory, an i7 quad-core CPU, and 510 GB SSD. I think I bought it under $150 on Amazon. You can go fancier with a much beefier machine with a few hundred dollars if you’re being much more serious about this. I’m thinking of buying another (same machine) and stacking them.

The footprint of this machine is super small. It snuck under my Verizon router in a closet, has almost zero noise, and barely heats. I’m sure if I find an ARM version of this thing (or a Raspberry Pi) I can go smaller and have almost no heat but I've never seen overheating on these.

Whether this machine is a good or bad hardware decision, it’s debatable, but I’m really happy a few years in.

## Software: Ubuntu & Docker

The first thing I did was to clean it up and install Ubuntu (LTS). Almost bare bones Ubuntu then right away docker installed.

![](/images/archive/en/2024/09/4.png)

I have Nginx and PHP on it for some early play of a WordPress blog (not this one) but then abandoned it.

I run almost everything exclusively in Docker (more on this below).

I try to update & upgrade Ubuntu once a year. Nothing else.

## Access: Cloudflare Zero Trust

The machine itself is completely closed to direct internet access. Its IP Tables don’t allow connections even from the local network (except SSH port accepts local network IP range).

Traditionally, the machine needs to open ports outside, then have a router port forwarding and set up all public IP sort things. More than 2 decades ago I did that with static IP from my ISP. Man, all the hustle…

![](/images/archive/en/2024/09/5.svg)

None of that is necessary anymore. I use Cloudflare Access, Tunnels which has an agent always running in the server, and from remote configuration, I can listen to any internal port (without opening it up) and forward the port directly to a subdomain of my domains. This shortcut the DNS works for me too. On top of that, most of my private apps run on subdomains that are protected by Cloudflare Zero Trust access (only me). I love Cloudflare’s feature that solves 2 to 3 problems at once.

One might wonder, what happens if Cloudflare has an outage, and their Zero Trust tools stop working, does it open my apps to the public all of a sudden? No, because my apps are not open to the public in the first place. Zero Trust tunnel has to work in order to open it up to the public, and if Zero Trust authentication is down, the subdomain will also not be accessible (because it’s proxied through Zero Trust “application” record.

Worst case scenario, I lose access to my private apps from outside. Even with that, I can SSH to my server and create a tunnel, port forwarding to the specific port the app is running.

On a normal day, I simply join to Zero Trust network using Cloudflare’s desktop app WARP, which replaces VPN for me.

All things considered, I’m sure there are still holes and paranoia in this plan. You can go through a more traditional route that is not any different than hosting this instance in Digital Ocean or AWS and replicate what you think is “more secure”, but I’m pretty happy with the baseline Cloudflare brings, and solves a few unnecessary things I have to take care (like no need to do reverse proxy for all apps I’m running).

## Deploy apps: Portainer + Gitops

I use Portainer to both setup deployments and manage my containers. Portainer is essentially a nice UI version of your docker command line tools. But where it shines is the gitops integration that integrates with github via webhooks, so when I push any change to any of my app repos (which all have docker-compose.yml that includes their infra and application configurations), my apps get re-deployed by portainer. This makes spinning up a new app, or an open-source tool in my server, a breeze.

I covered portainer and its gitops integration in this article: [Portainer + gitops ❤️: A simple way to deploy and manage your self-hosted applications](/portainer-gitops-a-simple-way-to-deploy-and-manage-your-self-hosted-applications/)
