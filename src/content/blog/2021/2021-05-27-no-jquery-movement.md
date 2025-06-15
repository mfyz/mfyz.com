---
title: "No-jQuery Movement"
description: "The historical utility of jQuery and the contemporary shift towards vanilla JavaScript for enhanced web performance and optimization are examined. Resources for developers transitioning away from jQuery are also highlighted."
slug: no-jquery-movement
date: 2021-05-27
url: https://mfyz.com/?p=671
tags:
  [
    "javascript",
    "jquery",
    "vanilla js",
    "web performance",
    "front-end development",
  ]
category: Front-End
migration: { "wpId": 671, "wpPostDate": "2021-05-27T17:35:35.000Z" }
---

### Why jQuery?

jQuery is one of the most useful javascript frameworks makes things a lot easier for a lot of developers.

jQuery also standardizes ways of doing things between different browsers, otherwise, certain implementations would require per-browser treatment.

But as much as jQuery makes things easier for developers, the end result may not be the best. Especially in this day and age, every byte counts towards many different aspects of your website/app’s performance. Page load times, SEO, crawling performance...

A big mistake most web developers do when they start learning web technologies is to learn jQuery very quickly (because the content is abundant about jQuery tutorials and libraries) without knowing underlying technologies and what/how jQuery is helping them to do things quicker.

### Why NOT jQuery?

Essentially jQuery is a layer on top of standard Javascript and Web APIs that each browser may or may not support certain aspects or requires separate implementations. So what you are doing at the end of the day is to use Web APIs to interact with DOM on your HTML document and create magic. As much as most of the magic can be created with libraries. Their dependencies and bundled asset size can add up. In some cases - like a WordPress blog and plugins, these assets can add up to a megabyte or more total download size for your web page. 

It’s better to be extra paranoid and conservative about what you need and what you can do with vanilla javascript and existing web APIs. Unless you are working with brand new web technology, the majority of what you will need is already very mature and standardized between browsers. 

With enough knowledge of the underlying technologies, you can actually see how much you can do without needing jQuery when writing a javascript for a web page you are building.

Here are two great resources compiles the non-jQuery ways of doing things:

- [http://youmightnotneedjquery.com](http://youmightnotneedjquery.com/)
- [https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/](https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/)

### No jQuery Movement

Recently, the no jQuery approach became a bigger trend within the web developers communities because everybody is doing an amazing job to optimize their rich web pages and applications to score better on performance, speed. 

Looking from a generalist's eyes, jQuery probably comes very quickly in various types of web frameworks, CMSes, themes to these CMSes. So when it comes to optimizing the speed, one of the biggest questions comes down to cleaning up unused code that is loaded on the web page. In most cases, when using jQuery, you are not utilizing a good chunk of what you create on your web page. It’s not very easy to unbundle and make sure your final page only contains what you make use of on your jQuery-based javascript code.

There is a great article: [https://catchjs.com/Blog/PerformanceInTheWild](https://catchjs.com/Blog/PerformanceInTheWild) that analyzes a large sample set of web pages and finds jQuery being the most common dependency at half of all websites they analyzed. 

![img_0494.png](/images/archive/en/2021/05/image-13.png)

With enough engineering effort and care, almost all of these pages can do what they do without jQuery and supporting libraries.

That’s why we are seeing more and more libraries that are written in vanilla JS and have no dependencies on other libraries. Most javascript framework/library developers are also proud to advertise their library is X kb in production. And it’s definitely one of the most important factors of a developer making the smart choice of these solutions when creating a web page.
