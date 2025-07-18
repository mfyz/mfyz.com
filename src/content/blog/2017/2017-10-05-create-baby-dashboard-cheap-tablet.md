---
title: "Create Baby Dashboard with cheap Tablet"
description: "Learn how to create a DIY baby dashboard using a cheap tablet to track feedings and diaper changes for newborns, complete with software, hardware, and mounting tips."
slug: create-baby-dashboard-cheap-tablet
date: 2017-10-05
url: http://mfyz.com/?p=175
tags:
  [
    "baby dashboard",
    "diy",
    "parenting tech",
    "iot",
    "cheap tablet",
    "data logging",
    "newborn care",
  ]
category: Geekin'
migration: { "wpId": 175, "wpPostDate": "2017-10-05T15:00:13.000Z" }
---

When becoming parent, first thing you get into is the feeding and changing cycle of the baby(ies). It's tiring but optimizable cycle since the whole thing is pretty standard in the beginning.

![](/images/archive/en/2020/05/Screen-Shot-2017-09-20-at-10.40.56-PM_drev2b.png?fit=1377%2C1146&ssl=1)

 

And keeping track of feeding and pooping activities becomes very important especially in early days. You need to feel comfortable that your baby is growing. Best way to know how they are doing well is to track how much they eat around the clock and how many times they pee and poop. It's a weird thing to track when you think about it but it's actually very natural and best way to think the only sensors you have about your baby in early days.

You'll most likely to have multiple people looking after your babies and it's inevitable to do shifts on feeding and changing duty and it gets really easy to lose track of how much they are consistently eating or pooping. Most parents take notes on paper, or keep track of it in some ways. The tech parents :) will obviously use some form of digital tracking and there are many many apps does this. I'm looking this in an experimental mind and thinking, how this becomes a seamless process.

Last year, when I was trying to hack amazon “dash” buttons, I found this engineer dad, [hacked dash buttons for exactly this purpose](https://blog.cloudstitch.com/how-i-hacked-amazon-s-5-wifi-button-to-track-baby-data-794214b0bdd8?gi=e3836dfc1474). Basically, he had 2 buttons for his baby that when the baby poops, tapping to one when the baby pees, he taps to the other one which is pinged to an IFTTT hook to log the timestamp of the activity in a google spreadsheet. Connecting the dots between these services literally takes 5 minutes if you guys are familiar with them.

My challenge was having 2 babies and my early “monitoring” task that I was assigned from the pediatrician was to track of how much babies ate in every 3hr cycle. So I had to log how many milliliters babies ate. I also needed to see last 3-4 times to make sure I balance out if one baby ate less last time, so she gets more attention this time. Having 2 babies at home definitely, requires 3 people's attention. We also share the day to take some of the feeding hours to be done by one person. I usually take nights and when it's my turn, I don't have anybody up to ask what they ate last time. Same thing for my wife and my mother in law when they wake up and I go to bed and it's time to feed the babies.

I created a solution to stick one of the old tablets to the wall and create a mini-app to log and see the last 4-5 feed logs. So everytime someone feeds the babies, they simply click 2-3 times to log exact amount for each baby.

I wanted to write a react js app to practice react a native little bit more and also have native animations but I found myself losing in “perfect” routing and modulation of the UI which I dropped and wrote a web app in half an hour. I pretty much created a front-end only app that triggers webhooks and implements some proxy APIs to public services to pull some more helpful information for our home life (like clock, weather, brief forecast, a background slideshow of black/white photos from Flickr). Here is how the tablet screens look like. Of course, I'm using a full-screen web view wrapper app to display these in a more kiosk-like way.

![](/images/archive/en/2020/05/Slice_olsd4c.jpg?fit=1719%2C987&ssl=1)

Then I let bitbucket to host it without worrying about deployment, hosting etc...

#### Who has a spare tablet?

Well, we're trashing more tech gadgets than ever. You may have an old android tablet or iPad or you may not. There are 2 super cheap ways to do this.

Amazon kindle fire tablets are getting bought-from-china level of low costs and Amazon keeps having sales to boost to uses of kindle fire tablets. Having Kindle fire tablet 7 is often as low as $35 to own one. To be honest, it can't get cheaper than this.

Another way is to look on eBay to get a used one for a low cost but I can't imagine if it will be cheaper than getting brand new kindle fire tablet. Maybe the last option can be looking at cheap android tablets that go cheaper (on aliexpress).

#### Tablet on the wall, Ough?

Sticking a tablet on the wall is not my way of doing this. So I hacked an IKEA frame to embed tablet screen with a black canvas cardboard and hide the tablet.

![](/images/archive/en/2020/05/IMG_2710_f93ofx.jpg?fit=1200%2C1600&ssl=1)

Now it is much more appealing... :)
