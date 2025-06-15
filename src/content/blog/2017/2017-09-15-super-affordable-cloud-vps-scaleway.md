---
title: "Super Affordable Cloud VPS: Scaleway"
description: "A review of Scaleway, an ARM-based VPS provider, as a cost-effective alternative to Digital Ocean for hosting personal websites and small projects, detailing the migration experience and initial performance."
slug: super-affordable-cloud-vps-scaleway
date: 2017-09-15
url: http://mfyz.com/?p=146
tags:
  [
    "vps",
    "scaleway",
    "cloud hosting",
    "digital ocean",
    "arm server",
    "web hosting",
    "server migration",
  ]
category: OS
migration: { "wpId": 146, "wpPostDate": "2017-09-15T13:55:28.000Z" }
---

![](/images/archive/en/2020/05/C9sskUYW0AA6hPj_zswyjo.jpg?fit=278%2C300&ssl=1&cld_params=w_278)

Recently I have been having performance issues with few personal sites that I was hosting on my small Digital Ocean instance. I was using 2vCpu, 2gig ram instance costing me $10/month + 30gb disk for extra $3/month. To be honest this is a very very cheap personal server to have and host few sites as well as doing minimal software tests and playing a good proxy/vpn when I need it.

I have installed New Relic, Datadog, Pingdom and linked them to my personal slack account to have everything monitored and reported seamlessly. I've been getting CPU and occasional memory alerts mostly because of my wife's blogs that is getting much higher traffic than my sites. Even with that traffic, it was making me feel the performance that I supposed to get from that server wasn't as consistent as I wanted.

#### A new kid in the block

A few weeks ago I started going into cheap ssd vps hunt again and I saw many more players in the game including Amazon Web Services' Digital Ocean killer. I compared many services and wanted to find something more stable and reliable. But I found a very very new and smaller company utilizing raspberry pi like ARM based hardware in greater scale for this small to medium size VPS services called Scaleway. Although the CPU architecture as “server” is foreign to me, I was getting curious. One of the differentiator factors for Scaleway is because of the initial and maintenance cost of the hardware, the costs of equivalent instances to be ~5 times cheaper. This means I can get 3-4 times more powerful machines with the same minimal monthly cost I'm spending for Digital Ocean or similar services. Scaleway is definitely pushing hard on the $5/mo SSD VPS game.

The main question was and remains “how reliable this new French startup for a permanent VPS need?”. This is obviously a risk but for me, it's an easy risk to take because I mastered to set up and migrate web and database servers in many years with bare minimum servers as well as with cloud services like AWS or Azure.

So I took the risk and moved to Scaleway in 2 hours with 2x size instance with pretty much half of what I pay which is ~$5/month. It's been 2,5 weeks and I'm seeing no hickups or any issues so far.

You can explore the machine options and pricing for each architecture here: [https://www.scaleway.com/pricing/](https://www.scaleway.com/pricing/)
