---
title: "How to display AppStore banner in your web page"
description: "Learn how to easily display an App Store banner on your website for iOS users by adding a simple meta tag. This helps promote your app directly from your web page."
slug: how-to-display-appstore-banner-in-your-web-page
date: 2012-11-20
url: http://mfyz.com/how-to-display-appstore-banner-in-your-web-page/
tags: ["ios", "appstore", "smart app banner", "mobile web", "meta tag"]
category: Programming
migration: { "wpId": 47, "wpPostDate": "2012-11-20T02:38:39.000Z" }
---

If you have an app and you might want to show an app banner when you user visit your page from their mobile safari. For iOS devices, displaying appstore banner is as easy as adding a meta tag to your html page. ![](/images/archive/en/2020/05/appstorebar_tzexos.png?fit=640%2C470&ssl=1)

#### How To Implement To Your Website

Add this meta tag to your web page:

```html
<meta name="apple-itunes-app" content="app-id=your_app_id" />
```

You need your app's id (a numeric identifier) which you can get it from iTunesConnect interface.

When you add this meta tag to you page, safari handles the rest and shows the banner. In iPad, it also shows some of the screenshots of your app.
