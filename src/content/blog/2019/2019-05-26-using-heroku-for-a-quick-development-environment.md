---
title: "Using Heroku for a quick development environment"
slug: using-heroku-for-a-quick-development-environment
date: 2019-05-26
url: https://mfyz.com/?p=318
tags: ["cli","deployment","heroku","nodejs","php","Programming"]
category: Programming
migration: {"wpId":318,"wpPostDate":"2019-05-26T13:00:47.000Z"}
---

Heroku is an industry-changing service that is established in 2007. It transformed how developers create and deploy apps today. With its add-ons marketplace, Heroku became the development hub that you can easily enable 3rd party cloud services. These services can be in many different categories that a web application may require. From database services, caching, image processing to mail delivery and so on...

Heroku supports many modern development languages that are actively used with big communities like PHP, nodejs, ruby, python, go, java... The beauty of the Heroku applications is that, managed by Heroku and very very easy to understand. They are also very easy to scale, deploy apps in Heroku infrastructure... All Heroku apps are deployed to given app name's subdomain under herokuapp.com or can be easily set to have a custom domain for free.

Essentially, Heroku runs on a command line interface and an internal git repository to manage versions of your code. When you set up a new project folder, Heroku CLI tool registers your app and assigns a git repository. Heroku CLI doesn't initiate git repository on your folder, so if it's a non-git folder, you need to git init on your project folder first.

```
$ mkdir hello-world && cd hello-world
$ echo "{}" > composer.json
$ echo "<!--? print 'hello';" --> index.php
$ git init

$ heroku create
Creating sharp-rain-871... done, stack is heroku-18
http://sharp-rain-871.herokuapp.com/ | https://git.heroku.com/sharp-rain-871.git
Git remote heroku added

$ git add . && git commit -m "first commit"
$ git push heroku master
Counting objects: 488, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (367/367), done.
Writing objects: 100% (488/488), 231.85 KiB | 115.92 MiB/s, done.
Total 488 (delta 86), reused 488 (delta 86)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:
remote: NPM\_CONFIG\_LOGLEVEL=error
remote: NODE\_VERBOSE=false
remote: NODE\_ENV=production
remote: NODE\_MODULES\_CACHE=true
remote:
remote: -----> Installing binaries
remote: engines.node (package.json): 10.13.0
remote: engines.npm (package.json): unspecified (use default)
remote:
remote: Resolving node version 10.13.0...
remote: Downloading and installing node 10.13.0...
remote: Using default npm version: 6.4.1
....
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote: Procfile declares types → web
remote:
remote: -----> Compressing...
remote: Done: 19M
remote: -----> Launching...
remote: Released v3
remote: http://sharp-rain-871.herokuapp.com (http://sharp-rain-871.herokuapp.com/) deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/nameless-savannah-4829.git
\* \[new branch\] master → master
```

I highly suggest all developers adapt Heroku in their workflow, at least for the sandbox & playground purposes.

I have created some boilerplate repositories in the past:

*   [https://github.com/mfyz/heroku-php-helloworld](https://github.com/mfyz/heroku-php-helloworld)
*   [https://github.com/mfyz/heroku-nodejs-express-helloworld](https://github.com/mfyz/heroku-nodejs-express-helloworld)
*   [https://github.com/mfyz/heroku-cloudinary-uploads-example](https://github.com/mfyz/heroku-cloudinary-uploads-example)
*   [https://github.com/mfyz/heroku-memcachier-example](https://github.com/mfyz/heroku-memcachier-example)
*   [https://github.com/mfyz/heroku-queue-worker-example](https://github.com/mfyz/heroku-queue-worker-example)