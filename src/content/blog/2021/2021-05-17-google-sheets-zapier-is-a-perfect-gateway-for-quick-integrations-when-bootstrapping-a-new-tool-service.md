---
title: "Google Sheets + Zapier is a perfect gateway for quick integrations when bootstrapping a new tool/service"
description: "Google Sheets and Zapier are explored as a powerful combination for streamlining third-party integrations when launching new products. The advantages of this method for quick bootstrapping are detailed, alongside an example of a Zapier automation."
slug: google-sheets-zapier-is-a-perfect-gateway-for-quick-integrations-when-bootstrapping-a-new-tool-service
date: 2021-05-17
url: https://mfyz.com/?p=662
tags:
  [
    "google sheets",
    "zapier",
    "automation",
    "integration",
    "bootstrapping",
    "no-code tools",
  ]
category: Geekin'
migration: { "wpId": 662, "wpPostDate": "2021-05-17T18:59:11.000Z" }
---

When bootstrapping a new product, regardless of platform and solution is used in back-end and front-end, the time comes very quickly that you will need to integrate with 3rd party platforms to create continuity of the product’s user experience between different solutions.

As a good example of this, let’s say you bootstrapped a small SaaS product that helps users calculate their taxes. Your product is not going to be only the software solution you created but the whole experience from customer support to documentation or educational materials, perhaps some marketing experience when acquiring and onboarding your new users. So right off the bat, we will need a customer support solution, marketing tool. Perhaps a CRM-ish tool to use as our “customer master” database. And will want to channel everything there as much as we can.

But when someone signs up, your back-end only creates their user account, and their customer support record, CRM record, or marketing track is not connected. Most likely, these will be separate services like Intercom, Zendesk, Mailchimp, etc. And obviously, your own backend/database where your user’s initial records are created and their engagement with your core product happen.

I have planned and done these integrations many times over in different products and worked with many 3rd party services to integrate. Some niche solutions that I had to integrate don’t have proper APIs or capabilities. Setting some of these exceptions aside, most tools have integrations with well-known platforms like Salesforce, Facebook Ads, IFTTT, Slack. And as a common and growing theme, most tools also have integration with Zapier which is the main event I want to come to.

Eventually, I find myself evaluating Zapier Integrations between these platforms to cover most of the use cases we often spend days doing single integration. If the triggers and actions cover what we are trying to do, I started to suggest my clients and the rest of my team create Zapier focused integrations.

There is an easier way. A big majority of people working in the process/product/team management space use spreadsheets daily. Either Excel or Google Sheet covers that big majority of the use cases. I evangelize Google Sheets just because of its real-time collaboration and ease-of-access capabilities. It’s a free and large majority of people having google accounts making it very universal.

I have done direct google sheet integrations in the past many times. But recently I like the concept of using google sheet as a source that can be commonly used by other services for integration purposes. Since it’s a living document, it’s very easy to make changes on a document or listen to changes happening on documents (by human or APIs). This makes it an amazing candidate for using it with Zapier to use it as a “source” of data. It makes Zapier the magic glue here to serve as a universal adapter to anything else we want to connect to. Having thousands of services available in Zapier makes it a meeting ground for moving the data we provide through google sheet to anywhere else.

I need to say this will be limited based on each service’s capability and the available actions/triggers in the Zapier platform. But most SaaS solutions invest enough effort and time to make their Zapier integrations rich enough to serve the most common use cases. It won’t cover 100% of needs but it will certainly eliminate a lot of basic integrations like slack, email notifications, marketing tools triggers (i.e: follow-up campaigns).

### This is not a code-less solution

When going down this route, the biggest work and challenge will be integrating Google Sheet APIs to connect your account (through the oAuth process), and store your credentials in your server and create the server → gsheet integration to send your back-end changes to a google sheet document. It’s not the easiest API to integrate with, but it’s well documented, mature, and has endless examples in the community (Github). And best of all, this one integration opens up so many without needing to do further integration. Even in the most basic products, we find ourselves doing slack, email deliveries in MVP versions. Investing the same effort in google sheet will easily justify itself later.

### Trade offs

One big trade-off is to have your user’s PII data to be transported, stored in a google sheet (which will be private), and then sent to Zapier. If you are super paranoid or have to comply with certain privacy regulations, managing this traffic may need to be done more sensitively or completely unfeasible for your product. But the majority of products I built do not need that rigorous audit and compliance. So this solution has worked for me many times.

### Example

I want to show a sample integration to set up a google sheet as a trigger and put a Slack notification as an action. Hopefully, this showcases some imagination and helps you understand where this can go.

### Set up Google Sheet changes as “trigger”

Create a new zap or edit the existing one to change the “trigger” service. Select Google Sheets.  
In the first step, you will be asked to select the google account linked to your zapier account. If you haven’t done it yet, or want to connect to another account than you currently have, you can do it in this step.

![Group 1.jpg](/images/archive/en/2021/05/image-7.png)

 After selecting the account, Zapier will ask you to select what event you want to set this zap to listen to. Generally, we will inject a new row into a sheet in one of the documents. So we select “New Spreadsheet Row” as the event to listen to, but as you can see, you can select other events like updating a spreadsheet row or new worksheet creation in a document.

![Screen Shot 2021-04-28 at 6.11.jpg](/images/archive/en/2021/05/image-12.png)

 Now you will need to select which document and which worksheet to listen to. Zapier will show document and sheet selection dropdowns here.

![Screen Shot 2021-04-28 at 6.11-1.jpg](/images/archive/en/2021/05/image-9.png)

 As the final step, you will be able (and kinda have to) to test your trigger that will pull a sample row from your sheet. Make sure you enter values into your columns to use this sample data to set up your further actions in zapier. Zapier will show these sample values when you create actions using these values.

![Group 3.jpg](/images/archive/en/2021/05/image-11.png)

### Set up Slack as “action” to send a message to a channel

Now, we’ll use this trigger in any service we want. We can also create multiple actions where you can send an email and slack notification and create a new Intercom customer record at the same time in one zap.

For this example, in the “action” section we will select Slack service when asked.

First, we will select the type of “action” we want to perform. We will select “Send Channel Message”. You can select other actions like send a direct message or others.

![Screen Shot 2021-04-28 at 6.09.jpg](/images/archive/en/2021/05/image-8.png)

Then, similar to Google sheet initial steps, we will first select the slack account we want to use.

![Group 5.jpg](/images/archive/en/2021/05/image-6.png)

And finally, with seeing a lot of options, we will set up the sender name, avatar and other details, but most importantly, the channel we want the message to be sent to and the message content itself:

![Group 4.jpg](/images/archive/en/2021/05/image-10.png)

 Zapier is pretty intuitive and simple to construct the smart content areas like this one. You will be able to both type a static message as well as insert the actual data (variables) from your source. In this example, our source is the google sheet document. So you will see a dropdown with search capabilities to search and find the actual column value you want to insert when you want to construct a message with dynamic parts.

Once everything is done, you will be able to finish this step and be forced to test the action you just set up. And all done! Don’t forget to turn the zap “on”.

This is just the most simple example I can use. There are many use cases you can allow this integration to push changes/data into thousands of services available in Zapier.

Happy Zaps!
