---
title: "Using Axe & React-axe to audit your web application’s accessibility"
description: "The importance of web accessibility and tools like Axe and react-axe for auditing and improving the accessibility of web applications are discussed. These tools help identify and resolve common accessibility issues, aligning with standards like WCAG."
slug: using-axe-react-axe-to-audit-your-web-applications-accessibility
date: 2021-10-07
url: https://mfyz.com/?p=699
tags: ["accessibility", "a11y", "axe", "react-axe", "wcag", "web development"]
category: Other
migration: { "wpId": 699, "wpPostDate": "2021-10-07T12:48:46.000Z" }
---

Web accessibility is one of the keys and often missed parts of web development. If you are building a website for a larger, general audience, you have to make sure your page complies with web accessibility standards (most known [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)). 

Making sure your website is accessible is no small task. There are obvious steps you have to take but the real accessibility issues are not easy to understand and pinpoint before a real user with a disability visits your site using tools like screen readers or other accessibility aiding tools. To do it right, most companies work with audit companies that are experienced in testing your site using variations of these tools to cover as many real accessibility scenarios as they can. But getting your site audited for accessibility is also going to cost you.

Web accessibility compliance also becomes a mandate for websites serving to certain industries (like government, insurance, banking...) that you are obliged to make your site accessible at all times. But most consumer sites this is not a requirement but a work to make your site/brand more inclusive of all users. 

I want to talk about a browser extension (and a react library) that helps you to detect the obvious, programmatically, and easy to detect issues that you can address quickly to cover the majority of the basic accessibility issues on your pages as a quick win.

## Axe

Axe is a software and service that both have professional solutions as well as free browser extensions (Chrome, Firefox, and MS Edge) that are very easy to install, activate and start seeing your page’s accessibility compatibility and issues. 

Visit [https://www.deque.com/axe/](https://www.deque.com/axe/) to learn more and install the browser extension. The extension is pretty straightforward to use that runs on a page you open and shows issues, explanations of what the issue is, how to solve it to make your page more accessible.

![](/images/archive/en/2021/10/image.png)

## React-axe

There is also react npm package that you can activate in your development environments that helps you to audit the final rendered DOM tree similarly to the chrome extension.

[https://www.npmjs.com/package/@axe-core/react](https://www.npmjs.com/package/@axe-core/react)

![](/images/archive/en/2021/10/image-1-1600x858.png)
