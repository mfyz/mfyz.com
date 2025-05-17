---
title: "Mobile simulators on cloud"
slug: mobile-simulators-on-cloud
date: 2017-04-04
url: http://mfyz.com/mobile-simulators-on-cloud/
tags: ["android","ios","mobile","Other","simulator"]
category: Other
migration: {"wpId":59,"wpPostDate":"2017-04-04T03:47:45.000Z"}
---

I had a radical switch to iPad Pro as my primary workspace and I used that set up exclusively for 6 months. As part of my day to day work, I test a lot of features and new developments on our mobile development cycle. I uninstall and re-install and replicate a lot of weird conditions on mobile environments. It's great to do these and relatively easy to simulate these cases with real devices but when it comes to testing Android, it gets a pretty wide range of devices and hardware/software differences. Often I test the same user behavior on 5-6 devices which is very annoying. ![](/images/archive/en/2020/05/batstand_xtehen.jpg?fit=680%2C507&ssl=1) This could be easily me doing testing :) Anyway, I was in search of doing this on the actual mobile device but replicate the other hardware and software variations but in the very cloud, remote-desktop fashion. Why there is no strong service doing this more professionally? Other than testing purposes, I really want to open and want to play with a new android OS on a real device with any resolution I want to and stream that to my existing mobile device? I would love to check out some android apps on my ios device, vice versa... I gave a try to:

*   AWS Device Farm - their browser experience is very lagging, starting up a device takes at least 4-5 minutes (why?) and there are most of the time device initialization errors.
*   appetize.io - so far, the best experience, mobile browser friendly as well, but limited virtual device variations and there is just one real device type.
*   Genymotion cloud - I haven't got a chance to play with it since they are in their private beta.
*   Other option is to build it manually with VPN or RDP but required rooting or jailbreaking the device which is not ideal and painful to go through.

Hopefully, we'll get there and we'll have the option to stream apps or OSes as we do movies tv shows today...