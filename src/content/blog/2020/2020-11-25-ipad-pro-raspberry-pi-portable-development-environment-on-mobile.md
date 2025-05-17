---
title: "iPad Pro + Raspberry Pi = Portable development environment on mobile"
slug: ipad-pro-raspberry-pi-portable-development-environment-on-mobile
date: 2020-11-25
url: https://mfyz.com/?p=583
tags: ["Geekin'","Life"]
category: Geekin'
migration: {"wpId":583,"wpPostDate":"2020-11-25T16:17:01.000Z"}
---

When the first iPad pro 12“ came out, I was one of the first to buy (not in the line though). I owned pretty much all the previous generations of iPads and a big fan of the iPad to be a perfect replacement for the everyday stuff you do on a computer - quick google, watch stuff, check mail, listen, read…

I actually attempted to get my mom to learn computers back in the 2000s and had struggles for her to adapt. But the iPad I got for her was a perfect device for her to learn stuff with super intuitive OS and apps - also touch is such a natural behavior even though the idea of us keep touching and dragging out finders on glass is weird.

Back to my iPad pro experience. I really loved the device and within a month or two, I started to do my work primarily on iPad pro and ran an experiment of exclusive use of iPad pro as my “only” device - it lasted 7 months. I can say it was pretty successful as far as the stuff that I was doing in that period. I was mostly managing our projects, process, team. So my work was heavily on emails, Slack, Trello, quip, google docs, excel/word… Almost all of them had pretty damn good writing, editing experience on iPad (on iOS apps). So I was flapping my iPad pro cover keyboard in weird places with perfect mobility. To this day, I still seek that portability (with occasionally peeking surface pros :) ).

But there were few deal-breakers. On top of the list was (and still is) to not have a low-level runtime environment for nodejs/npm, PHP, python. I also had some challenges on my product management tasks like being able to do low-level wireframes/mockups, sometimes touch the designs (it was mostly sketch back then). But for the sake of this article, let’s stay on the “development” part. It’s not all bad. There are isolated packaged environments for PHP and python and do their job to a certain level.

### PHP

“Draftcode” (app) is emulating most PHP capabilities, so you can do some scripting work but not a fully-fledged development environment. But it can run a SQLite version of WordPress and other PHP apps with either remote database and API connections or simpler, file-based database systems like SQLite. Most popular frameworks use an ORM or database layer that can work with these databases along with My/PgSql.

![](/images/archive/en/2020/11/IMG_0407-1024x768.png)

### Python

“Pythonista” is actually pretty well done. It’s almost full python runtime that you can run a lot of things, including package manager pip and well-known frameworks like Django (SQLite only though). But it’s still an isolated environment under the app’s own container. So no talking to other apps - yet iOS won’t let apps run daemons for long. You can run basic HTTP server like stuff but when it’s decided to kill or freeze the app, your deamon is gone too. So you have to rely on multitasking (split-screen keeping your server’s app running).  

![](/images/archive/en/2020/11/33198527-e0b02724-d0eb-11e7-8041-018213351bba-2-1600x1200.png)

### Nodejs :(

I code a lot of my stuff on nodejs. Writing JS (for any interface) is one of the most versatile ways to learn a method/library and re-use the same approach in almost all sides of digital programming (maybe not super low, hardware and OS level stuff). In my computer, when I set up my stuff for the first time, it’s one of the first things to make sure nodejs/npm/nvm is set up aside from the OS’ own package manager (or homebrew for OS). So I have a skeleton of what I use every day (on command line and UI) from these package managers.

But there is also a very thin line between being able to run a nodejs script with having nodejs ecosystem available. So we are not just talking about being able to run a nodejs application on its runtime. There are some initiatives on alternative javascript engines that can run on iOS. But again we will not have all the other goodies nodejs platform brings. Kinda similar to Pythonista and being able to run Python apps. But I don’t know the underlying differences why getting Python runtime with its other components was easier compared to Nodejs environment.

### Long story short

From my go-to/favorite 3 development ecosystems, I failed to create a comfortable place within iOS (still same today). And there is the (no) filesystem. Today, there are files app and some convenience covered to access, read/write files in a commonplace within the OS. But not as convenient as a computer. So you can’t just open your favorite coding editor and start typing then switch to another app (let’s say git client) and push a button. It’s close, but not there yet.

### A weird solution to the weird problem

When I first did the 7 months iPad Pro-only lifestyle. I had 2 remote machines I set up for myself. One of them was generic ubuntu from digitalocean ($5/mo) I had all of my real development happening here. I was using Coda for its great SSH client (recently moved to Blink). And I set up all the remote ssh tools and replicated my desktop command-line tools zsh, tmux, vim - first time created my dotfiles repo and still I use that with few helper scripts that basically syncs my command line configurations within multiple machines.

I also set up a mac instance from macstadium for Mac-only weird work like opening sketch files and trying to export stuff. This was pricy and not sustainable - I was paying $60/mo for that instance. I wouldn’t mind paying but the way to work on remote VNC/RDP is not fun. It requires a lot of bandwidth and trying to work with a mouse cursor on a touch screen is definitely bad. And iOS didn’t have cursor support back then. Maybe it can be different today with the cursor and I’m “guessing”, some RDP/VNC clients to support hardware mouse to be emulated on the remote machine. But long story short, I have already adapted the “iOS” and “touch” behaviors. Adding mouse interactions only for one app or task was inconsistent. I prefer to adapt, calibrate, and stick with whatever physical tools I use on computers.

### One (big) caveat: You have to always-connected (and may require good connectivity)

I love working in flights, in completely disconnected places like mountains (I’m currently writing this article, fully unplugged in 1000m altitude in the mountains in a mini-treehouse :) ). So you basically can’t work if you are not connected.

![](/images/archive/en/2020/11/Screen-Shot-2020-11-25-at-9.01.03-AM-1024x490.jpg)

## Solution

### What if you have portable hardware that’s job is to host the development environment - like raspberry pi

On another track, I also played with Raspberry PI’s from its first version in a variety of hobby and nerdy projects. Raspberry PIs were not powerful when it first came out. Now the most powerful Raspberry PI maybe a nice portable computer you can carry and connect to TVs, monitors, etc. There are also tons of nerdy projects to create portable devices with mini-screens and mini controllers that caters to gamers or other use cases. Regardless, what you want from raspberry pi is its capabilities with hardware, OS. Not it’s visual form. As long as it’s somewhat networked with another device - like an iPad that has a comfortable screen size and keyboard or controls, you can do all Unix stuff you want on raspberry.

That’s what I did recently with “raspberry pi zero w“ which is the cheapest ($5 - ridiculous right?) and the smallest raspberry pi. It is powered with micro usb, has mini HDMI and most importantly wifi and bluetooth. So if you want to connect peripherals, you can use wireless devices like bluetooth keyboard. But that’s not even what we’re after. What we’re after is connecting raspberry pi zero w to our iPad pro over its usb-c port and have a way to have an internal network to be established between the two and find a way to access to our raspberry pi. Fortunately, there is a way and people have done it.

There are few other more detailed ways of doing this, but here is the shortest way to do it (at least it worked for me pretty easily):

Add `modules-load=dwc2,g_ether` to cmdline.txt after `rootwait`  
append `dtoverlay=dwc2` to config.txt, or run following that does it for you (on a mac after connecting the SD card):

```
sed -i '' 's/rootwait/rootwait modules-load=dwc2,g\_ether/' /Volumes/boot/cmdline.txt<br>echo 'dtoverlay=dwc2' >> /Volumes/boot/config.txt
```

It’s not the fastest but it’s the most comfortable solution that fills the gap that iOS can’t. With having your development environment on raspberry pi and run your applications, servers, use your favorite command-line tools on raspbian which is a debian based OS that pretty much opens its doors to ridiculous sizes packages of pretty much everything you need.

The physical form factor can be improved like a usb stick (maybe some nerdy group of people will do this) but for now, I found my raspberry pi zero w a plain black case and a short micro-usb cable that is connected to a minimal usb-a to usb-c adapter that I connect it to my iPad. Raspberry pi zero w is using low enough power that powers itself from iPad pro as well as creates its network with iPad pro over the same usb cable - perfect.

Here is a minimal setup with iPad and Raspberry Pi looks like:

![](/images/archive/en/2020/11/1_u_gtS4JhjExtIIRxZYKQ4g.jpg)

  
This is not my set-up but mine is also very similar. I use raspberry pi zero w with a single cable to the usb-c directly to the iPad.

For further reading, this [medium article](https://medium.com/sausheong/setting-up-a-raspberry-pi-4-as-an-development-machine-for-your-ipad-pro-3813f872fccc) covers pretty much everything aside from my experience and more on this topic.