---
title: "Using Ant Design as our primary react.js UI framework"
description: "An overview of Ant Design as the primary React.js UI framework used at Nomad Interactive. The post highlights its benefits, such as a rich component library, customization options, and improved consistency in application development."
slug: using-ant-design-as-our-primary-react-js-ui-framework
date: 2021-02-01
url: https://mfyz.com/?p=629
tags: ["ant design", "reactjs", "ui framework", "front-end", "web development"]
category: Front-End
migration: { "wpId": 629, "wpPostDate": "2021-02-01T13:15:00.000Z" }
---

![A_zx7LTI_ECSAAAAAAAAAAAABkARQnAQ.png](/images/archive/en/2021/01/image-2-1600x791.png)

I want to talk about a UI framework we have been using at Nomad Interactive for quite some time now on our react.js applications. We have been separating front-end and back-end parts of our apps for many years and for front-end solutions, we have experimented with angular, vue, and some simpler alternatives but eventually we ended up in react.js world and have been exclusively working with react.js on both web, mobile and desktop products we are creating.

And obviously, we are in need of a powerful, rich UI framework to not bog down on basic stuff like form handling, UI elements for user input, or data representations like data tables, charts... And until the frameworks like angular, react, we have used Twitter bootstrap for years and probably used many different versions of the same thing over and over again...

With React, it’s been more stable for us to pick a solution on, let’s say date, time entries on the forms that we use and support the libraries we love. And in the last year and a half, we have started using Ant Design as our primary UI framework which is built on top of bootstrap. Ant Design framework is built by Alibaba team obviously to empower Alibaba products which may not be at the ant design level when you use alibaba.com or its other network sites, but I’m sure at some point they will be at that level. Regardless, the framework has huge designer, developer talent behind it. Occasionally you see just Chinese parts in the documentation but don’t make that scare you, there is also a huge English-speaking developer community behind it as well.

[https://ant.design/](https://ant.design/)

Ant Design is super react.js friendly and everything is very well simplified and streamlined for developers to only worry about the data flow on the app from the back-end APIs through the presenter/controller controllers/classes. We use redux extensively for that.

Eventually, in most cases, we want the same clean and simple representations of UI widgets/elements in a consistent manner. So we find Ant Design’s default state as well as its customization features through simple SCSS or even inherited from package.json through webpack build, which makes things much more atomic designed and configured on our applications.

Ant Design has a huge library of components and well-designed and flexible scaffolding for your layouts.

![Screen Shot 2020-12-27 at 8.35.48 PM.jpg](/images/archive/en/2021/01/image-3.png)

We benefited so much as far as the consistency of the application layouts we build and common language between our designer and our developer to stick with ant component’s general interactions and obviously layout and other details. Not that we are not customizing ant components, it’s just much easier for our designer to work with since it’s well designed and documented and it’s also easier for our developers to customize it for the same reasons.

Here is the official documentation starting with basics: [https://ant.design/docs/react/introduce](https://ant.design/docs/react/introduce). You can also dive into the components library and start playing with some of its more complex examples in the demonstration embedded in the documentation.
