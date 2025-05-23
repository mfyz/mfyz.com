---
title: "Working with Memcache on your NodeJS app on Heroku"
slug: working-with-memcache-on-your-nodejs-app-on-heroku
date: 2020-02-10
url: https://mfyz.com/?p=423
tags: ["Other"]
category: Other
migration: {"wpId":423,"wpPostDate":"2020-02-10T13:45:20.000Z"}
---

![](/images/archive/en/2020/02/o6gepqxnqmy.jpg)

I wrote about Heroku in the past by showing my love for this amazing service. Heroku helps developers to start writing and deploying apps much easier than any other service. This allows developers to try things out and bootstrap their ideas in a matter of minutes. More about Heroku I talked in this article: https://mfyz.com/using-heroku-for-a-quick-development-environment/

### Heroku Marketplace

I also mentioned before that Heroku has a 3rd party add-on marketplace. There are all types of application infrastructure, cloud services from fully hosted database services or CDNs to transactional email delivery services. Its marketplace is filled with countless gems that are worth a weekend to just explore these great services. That also works with Heroku within a few clicks/commands.

### Why cache? Why Memcache?

One of them which is almost every distributed cloud application’s primary need is memory-based fast caching. There are different ways and models to store and use data from memory based caches but most common is for key-value based storage with TTL (time to live) which makes the data stored short-lived and cleaned up regularly.  
  
The primary reason to use a memory-based cache is to optimize the performance of an application. In general terms, you cache frequently used data to cut time on queries to the database, reads to disks as long as you have a certain confidence that the data you are caching is not frequently changing within a short time while it lives in the cache. Even with the scenario that the data can be changed, there are simple ways to refresh the cache on the “update” events to make sure cached data is always valid and it cuts expensive operation time in the code flow.  
  
As I mentioned, there are many different memory-based storage engines, protocols, services. One of the most simple yet effective and widely used engine is “Memcache”. It is an open-source tool that can be easily installed and hosted on any server that will run as a deamon and simply using an open port on a server to accept storage requests and queries. Memcache is designed to store and serve all of its data from the physical memory of the server. Therefore it’s very very fast and responsive when it’s combined with a high throughput network between the Memcache and application servers.  
  
Heroku also supports multiple providers for Memcache and other memory-based storage engines. One particular service is very seamless to create an instance and set it up on a Heroku application, called Memcachier.

### Memcachier

The memcachier instance free and can be added without any further account details from an external site. But it comes with very limited resources. It is only 25mb total cache size and 10 concurrent connection limit. Even though this number is small, for a node.js application, it will be mostly long-living. It will be more than enough if you are not planning to have many environments connecting to it at once. It is certainly enough to have a quick Memcache server to build stuff up and running. For more details about Memcachier service and its pricing model here is the Heroku elements page explaining all that: [https://elements.heroku.com/addons/memcachier](https://elements.heroku.com/addons/memcachier)  
  
To add this add-on to your application, in your project folder, run following command:  

```sh
$ heroku addons:create memcachier:dev
```

This will add memcachier to Heroku config as an environment variable. Copy the variable to your local .env file to be able to connect from your local development application.  

```sh
$ heroku config...
MEMCACHIER_SERVERS    => mcX.ec2.memcachier.com
MEMCACHIER_USERNAME   => bobslob
MEMCACHIER_PASSWORD   => l0nGr4ndoMstr1Ngo5strang3CHaR4cteRS...
```

To use memcache, on a node.js app, we will use a npm package called “memjs”. To install, run:  

```sh
npm install memjs
```

The usage of the package is pretty straightforward, here is the short example it’s quoted from memcachier’s Heroku get started guide:  

```js
var memjs = require('memjs')

var mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,  // default: false
  timeout: 1,      // default: 0.5 (seconds)
  keepAlive: true  // default: false
})

mc.set('hello', 'memcachier', {expires:0}, function(err, val) {
  if(err != null) {
    console.log('Error setting value: ' + err)
  }
})

mc.get('hello', function(err, val) {
  if(err != null) {
    console.log('Error getting value: ' + err)
  }
  else {
    console.log(val.toString('utf8'))
  }
})
```

Usage is as simple as using get and set async functions to set and get a value with a key.  
  
I created a more visible version of this example with a relatively long, time-consuming mathematical calculation, so caching an expensive calculation (or data retrieval like a slow database query) to be cached in Memcache, so it’s calculated first, then when requested consecutively, it is served from Memcache instead of re-calculating. In my example, I used a calculation of a “primal” number which takes time.  
  
[https://github.com/mfyz/heroku-memcachier-example](https://github.com/mfyz/heroku-memcachier-example)