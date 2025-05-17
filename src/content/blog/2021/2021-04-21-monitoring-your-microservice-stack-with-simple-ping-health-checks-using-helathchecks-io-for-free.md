---
title: "Monitoring your microservice stack with simple ping health checks using Helathchecks.io for free"
slug: monitoring-your-microservice-stack-with-simple-ping-health-checks-using-helathchecks-io-for-free
date: 2021-04-21
url: https://mfyz.com/?p=644
tags: ["Other"]
category: Other
migration: {"wpId":644,"wpPostDate":"2021-04-21T14:18:14.000Z"}
---

When planning, designing and implementing the infrastructure of a product, the most common pattern we follow from the back-end perspective is to build the back-end in the distributed model using microservices. But there is a cost that comes with this model which is monitoring, alerting, and maintaining. Each microservice can be living on its own container with its own dependencies. We often build too many moving parts with the microservices approach. A very simple app can have always running services, scheduled jobs, and workers distributed in many different infrastructure elements. And the rise of containerized applications or tasks allowed us to build our products with even more micro-scale code pieces running on serverless infrastructures.  
  
There are many solutions to monitoring and alerting if a service is properly running but it’s often difficult to centralize the monitoring.  
  
There is a very simple yet effective approach I like and seed the very minimal integration to most of my microservice components from servers, pings, a script doing a cleanup, or backup. It’s very similar to ping checks but a little bit more simplified and universal. Ping checks generally require your “parts” of your code to either publicly available and/or serve a status on HTTP/TCP/UDP traffic which may not be available based on your “component” runs.  
  
In this post, I’d like to focus on open-source software that you can easily set up and run your own instance for free. They also provide a SaaS version of the software that you can get started for a free or low cost.  

![Screen Shot 2021-04-21 at 10.11.05 AM.jpg](/images/archive/en/2021/04/image-1600x1108.png)

The principle of this service is very simple. Essentially, you create a “check” and, the software expects a ping from your component in regular intervals. You can set up what these intervals can be, group/organize them, and set up alerts in case a check fails to report (ping) within the grace period you can adjust.  

![Screen Shot 2021-04-21 at 10.11.25 AM.jpg](/images/archive/en/2021/04/image-1.png)

The service can integrate with many mainstream ops-support/escalation services like pager duty, opsgenie... or simpler services like slack, email, or SMS using Twilio for the basic notifications.  
  
Check out the service, their open-source software page, and their documentation here: [helathchecks.io](http://helathchecks.io/)