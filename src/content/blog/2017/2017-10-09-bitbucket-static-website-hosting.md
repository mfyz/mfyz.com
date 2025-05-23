---
title: "Bitbucket static website hosting"
slug: bitbucket-static-website-hosting
date: 2017-10-09
url: http://mfyz.com/?p=185
tags: ["Front-End"]
category: Front-End
migration: {"wpId":185,"wpPostDate":"2017-10-09T15:07:27.000Z"}
---

![](/images/archive/en/2020/05/bitbucket-product-features-illustration-git-large-file-storage-_mgo4cy.jpg?resize=150%2C150&ssl=1&cld_params=h_200,w_200,x_0,y_6/h_150,w_150)This is a short explanation of a feature I really like about github and now it's imitated in bitbucket. Essentially allows you to host a static site under your account.

It doesn't support anything back-end but you can use grunt, gulp like automators to create a content management system that compiles whole site to static files then serve it up with this trick.

Very simple steps to do this. My username is “mfyz” in bitbucket and bitbucket allows 1 static website hosting per account. If you create a new repository called: “mfyz.bitbucket.io” and throw an index.html file, you can access the static website from http://mfyz.bitbucket.io address. Bitbucket will serve anything static including css, javascript files as well as binaries like images.