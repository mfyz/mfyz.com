---
title: "Developing and Deploying Nodejs (Express) apps on Heroku"
description: "Key considerations for developing and deploying Node.js and Express applications on Heroku are discussed. Topics include using environment variables, specifying Node.js versions, utilizing prebuild/postbuild scripts, and leveraging Heroku add-ons."
slug: developing-and-deploying-nodejs-express-apps-on-heroku
date: 2019-12-09
url: https://mfyz.com/?p=396
tags:
  ["heroku", "nodejs", "express", "deployment", "PaaS", "environment variables"]
category: Other
migration: { "wpId": 396, "wpPostDate": "2019-12-09T14:00:08.000Z" }
---

![](/images/archive/en/2019/12/spacex-OHOU-5UVIYQ-unsplash.jpg)

Heroku is an amazing platform for getting quick development up and running in a smart virtual instances. There is no hussle to get additional services you may need for a quick and dirty app to ground up. I’ve already wrote about how to use heroku for quick development environment before: [using-heroku-for-a-quick-development-environment](/using-heroku-for-a-quick-development-environment/)

This short article will be about specifically developing and deploying node.js and express apps on heroku. There is actually not much difference for deploying a node.js app than a php application or in another language. Heroku CLI tool automatically detects the application type from the package.json file for a node.js application and it’s entry point from there.

For the express related parts, just go ahead and see the very simple example I put up in github the past:  
[http://github.com/mfyz/heroku-nodejs-express-helloworld](http://github.com/mfyz/heroku-nodejs-express-helloworld)

Another more detailed express example that uses pug template engine for it’s layouts and views:  
[https://github.com/mfyz/express-pug-boilerplate](https://github.com/mfyz/express-pug-boilerplate)

Aside of the application itself, there are few key points I found helpful when creating and deploying node.js apps. 

### Use environment variables

Using environment variables is the best way to set configuration details for your application.

### Setting which node.js version your app will use

As simple as adding “engines” object in package.json and having your node.js version defined in “node” property inside engines object like:

```json
"engines": {"node": "12.13.0"}
```

Same applies for npm and yarn versions to be defined within engines object as well.

### Use prebuild and postbuild steps to prepare additional steps needed for your application build

By default, heroku will build your application on every deployment. This is not very meaningful for pure node.js applications but you app may need build. Like gulp, grunt, webpack builds. For this, heroku will read “build” npm script if exists in package.json. Aside of this, heroku will always install dependencies with npm install as a minimum build step. If you need additional steps before or after the build, you can define these in npm scripts as heroku-prebuild and heroku-postbuild named scripts.

### Utilize heroku add-ons

Remember, Heroku comes with tons of 3rd party services which a lot of them have free packages that will be enough to try things out and start coding stuff up quickly. One of my favorite is heroku’s internal database service providing postgresql database with single command line command:

```sh
heroku addons:create heroku-postgresql
```

### Wrapping up

All in all, heroku is a great cloud platform allow developers to kick off ideas, starting with simple code to grow into complex distributed applications very easily. In my opinion, it should be in the go-to tools for every engineer’s arsenal.
