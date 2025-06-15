---
title: "I used Windows10 temporarily for my work setup for 10 days after 10+ years of being apple ecosystem user - It was better than I expected..."
description: "An account of a 10-day experiment using Windows 10 for a work setup after over a decade in the Apple ecosystem. The experience, including migrating workflows and the development environment with WSL, was surprisingly positive."
slug: i-used-windows10-temporarily-for-my-work-setup-for-10-days-after-10-years-of-being-apple-ecosystem-user-it-was-better-than-i-expected
date: 2020-10-02
url: https://mfyz.com/?p=555
tags:
  [
    "windows 10",
    "macos",
    "operating systems",
    "developer experience",
    "wsl",
    "surface pro",
    "tech experiment",
  ]
category: Geekin'
migration: { "wpId": 555, "wpPostDate": "2020-10-02T08:31:15.000Z" }
---

I used windows from it’s 3.1 version to pre-vista years - early 2000s. Then switched fully to be linux person for years in between before switching to mac around 2007. Since then have been apple fanboy, owning, using and geeking about apple hardware and software. But coming from other OSes, I’m not like people started their computer journey with easy-to-use apple devices. So I know there is more out therefor having more “control” and “customization” on your digital everyday space. I also worked as custom computer/hardware builder for years in my early years of converting my hobby to my profession. I also wasn’t too distant to “what in computer” question.

### iPad Pro experiments

Years after living comfortably in apple ecosystem, after starting to experiment with extreme portability of a powerful device like ipad pro (see [mfyz.com/digital-nomads](/digital-nomads/)). Seeing its limitations, there was always a geeky desire to own/create a super-portable work environment with me at all times. I achieved this to a degree in my experiments with various devices in last decade. Closest I got was with ipad pro with some outside help.

At the end of the day, it’s still not fully fledged operating system that responds to what I need. I talked about this in my recent articles and me trying to find alternative solutions that will work with iPad.

### Microsoft doing things right lately

I also mentioned this in my previous writings that I occassionally finding myself browsing and configuring microsoft’s Surface Pro. I really believe microsoft started to do a lot of things right in it’s recent years management as far as company strategy, it’s investments on -especially- on open source community. Now I see they are doing some good things on the hardware front. I still find the quality is not match with apple hardware but I definitely see the lack of craftsmanship on all brands producing hardware that is designed to run windows operating systems. Among them, microsoft’s own hardware definitely stands out. Of course with price. But if you are using your computer exclusively for work and if your work requires exclusively a capable computer, then money is not a problem. It’s an investment. Powerful, better, comfortable, better...

![1570471615_1510035.jpg](/images/archive/en/2020/10/image-1-edited.png)

I really like Surface family devices. Both surface book and surface pros are nicely designed, well built and some configurations are really powerful machines that has the best portability/mobility factor.

### An alternative path for me: Give Windows10 a try for 10 days

I found myself occasionally bid on pre-owned surface pro devices on ebay. But I never went too high to pay also because I still hesitated how comfortable I would be living on Windows10. I was wondering that question more than paying for pricy experiment to get a surface pro and see it myself. Instead, I bought an external SSD that I really like and got windows 10 pro license for dirt cheap and hit the road to install the windows 10 on the external SSD. Because the SSD is crazy fast through thunderbolt port I use on my macbook pro, I didn’t feel a thing in performance as if I installed windows 10 on macbook pro’s internal hdd. This gave me great comfort that I can restart on mac, unplug ssd and live my macOS life if I decided that windows 10 is not for me. So how did the experiment go?

### Migrating my work life from macOS to Windows 10 was very easy

I thought I would have to re-adapt almost all apps I use every day. Result was different, I was already spending most of my time on team coordination, meaning communication tools we use were the primary tools I had to see if I get same precision on macOS. Almost all the apps are browser or electron based apps like Slack, Trello, Jira... So almost zero difference happened on this side. Only thing was bummer is that there is no great email client as you have many on macOS. Outlook is probably “the best” email client on windows. And even with outlook, there were so many holes you have to fill. I’ve been using spark on macOS for many years now and I was super excited to see they are working on windows version. Although nothing in the horizon yet. So it may be years until that happens.

#### Development Environment

Development environment was much better and faster than I expected. I really loved the idea of subsystem. Windows Subsystem for Linux (WSL) that had almost all distributions to be installed and run within a virtual machine that is managed by windows OS itself. Brilliant. 

![0_MzyrfKl3evUM6NZP.png](/images/archive/en/2020/10/image.png)

So you have pretty much ubuntu subsystem running on windows almost without any issue. It went great to set up my zsh scripts, aliases, nodejs, python and other packages super fast. Until I realized, when running some apps like visual studio code, started from command line that runs separate nodejs threads inside WSL that may not be 100% optimized to run with the local filesystem. Windows is continuously working on to improve this as well as vscode team (Microsoft again) also has some remedies in vscode to overcome the integration painpoints. But I hit a weird high cpu usage issue that was discussed online, and looks like closed/solved in github issues but still receiving comments from people like me reporting the issue still exists. All in all, great development set up with little shortcomings that can be addressed or adapted easily.

I also found most of the tools I use that were already open source tools that were pretty much cross platform OR tools that commercial but had cross platform client apps (like TablePlus for database client).

#### Design Tools

The last and the one of the most important one was design tools topic. We exclusively use “figma” in Nomad Interactive in last few years now. It was Sketch before and that was a dealbreaker macOS only app. Figma being browser based and has so many extendability through a plain and nice “javascript” api makes the tool completely compatible on almost any OS that can run a capable browser engine like webkit. Other than that, I had few photoshop files that I rarely need to open. I can subscribe adobe to get photoshop installed on the windows machines in few hours - we worked on windows machines on our design tasks 10 years ago. Assuming Adobe still investing good deal of effort to have it’s suite running on windows platform, that shouldn’t be a problem when needed.

Continuity is a lacking big on windows platform when you use other devices - not just iOS but also Android too. There is almost no connectivity between your mobile device (phone/table) and your desktop OS. Apple started this and after last few OS versions, they kinda perfected it to a level that we don’t see it until we lose it. For example, I got used to receiving my SMSes (not iMessage, the actual SMS I get from the bank) and only need to use my computer to check the SMS and copy paste the OTP I received from paypal when I’m trying to login on my mac. It’s a very subtle but became very important micro feature between my mac and iPhone to be communicating between each other smartly. There is also other things similar to this.

### But I went back to macOS after 10 days

Why? Because I had to rewrite a lot of other things under the hood - like my keymaps, like a lot of shortcuts I learned, optimized and perfected over the years. I also don’t want to invest any time to research and re-learn new apps and new ways to do the same thing I’ve been doing in last 10+ years. Like sending email in few keyboard clicks. 

I’m feeling less adventurous and more comformist on my wok setup. I don’t want to spend my precious time to learn the basics or re-adapt. But I’m ok to spend hours on improving my efficiency for doing X. Doesn’t matter what it is.

### I can survive - I can buy a surface pro now

My primary work/life station will remain apple eco-system. But I know it’s not as difficult as I assumed to have same/very-similar tools to live life happy in windows even after spending a decade exclusively living on apple ecosystem. I know surface devices are the best portable devices designed until apple gives up the resistance of not having hybrid working OS that runs desktop-class apps on their ipads or have macbookpros to be more like 2-in-1 style devices.
