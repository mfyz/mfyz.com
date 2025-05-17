---
title: "Smarting up google docs and sheets"
slug: smarting-up-google-docs-and-sheets
date: 2020-03-24
url: https://mfyz.com/?p=438
tags: ["Other"]
category: Other
migration: {"wpId":438,"wpPostDate":"2020-03-24T19:16:09.000Z"}
---

![](/images/archive/en/2020/03/5c42e1e5ff0f50a76d2bfb03_Google-Docs-Sheets-Slides_33e379a21b2cf992ea3c65149d682427.jpg)

I’d like to talk about the growing experience with Google Docs and Google Sheets to use them for more complex needs and functions in this post.  
  
It’s been a recent theme of the topic that I’ve been talking about ways to use collaborative cloud services for documentation purposes. Whether for personal or business/team communication. I’ve also talked about going beyond the need to have plain written form of documents to the smarter, more complex form of information forms in [Smart(Er) Documents – Quip, Notion, Airtable, Coda Or Good Old GDocs & GSheets](https://mfyz.com/smarter-documents-quip-notion-airtable-coda-or-good-old-gdocsgsheets/) post.  
  
I like Google docs from the availability perspective that it’s available without needing a complicated pricing structure and Google allowing google docs to be open for public google accounts that most people can access google docs with their personal Google accounts even if they don’t have company accounts (not using GSuite). I also like google docs is very familiar in the visual form that all of use are used to from Microsoft Office or other office software suites (Open, Libre). This also may look google docs products outdated compared to more modern collaborative editing tools like Notion, Quip.  
  
All of these services have equally powerful APIs but probably not as robust as Google Docs. Google Docs also has a secret weapon that I’d like to introduce lightly in this post called Google Apps Script aside from their powerful API. This is a very wide and under-discussed topic online that gives Google Docs tools a huge edge. I may want to focus on this by talking sub-topics about the Google Apps Scripts down the road.

## Google Apps Script

Google Apps script is a scripting/automation feature of google larger Google products including Gmail, google calendar, google drive and few other important google products you may be already using.  
  
Google apps script runs on your browser (or mobile device) within the google tool you’re using. Scripts can register additional UI elements in the tools you use (register a new menu item), or watch/listen changes on the documents you create (events like, when a row is updated in google sheets) or you can even map your script parts to elements in the document content you are creating (such as buttons, dropdowns, checkboxes, etc...).  
  
So far nothing new that other tools won’t do. Microsoft Excel and Word have its famous Macros available around ~20 years or more. Almost all other alternative software also have some form of automation that allows similar capabilities. The real power of Google Apps Script comes when you combine some of its online/cloud tools like google drive or google maps or Gmail with its documents. This makes the documents interactive with other services. Similar in the sense of using the other services APIs. One of the big things that makes me feel warmer to google docs tools are having real-time collaboration in your docs. This makes collaborative writing/editing experience superb. We often real-time write content with my team and I find the conversational aspect of the collaborative work priceless.  
  
Google Apps Script is based on JavaScript. So you write Javascript snippets to define your custom functionality along with a large list of available google services APIs ready to use.

## My favorite use cases of using Google Apps Script

### Pull a dataset from our internal services or public sources dynamically to google sheets

We use this more often with our analytics services internally we use. These sheets are generally reports we create but often update with the latest version of the data.  
  
Google sheets already have IMPORTDATA and IMPORTXML functions that pull a CSV or XML formatted data easily. But often we use a service that we haven’t built that doesn’t have CSV or XML exposure of its data. Often it’s a REST API returns JSON. You can use a helper function like [https://github.com/bradjasper/ImportJSON](https://github.com/bradjasper/ImportJSON) or create your custom processor to pull the data and shape it to the way you want in google apps script. We often do the latter.

### Add custom functions to google sheets

We use this a lot to create custom functions (generally pull data from other cloud tools we use), like getting Trello card details (title, status, assignee) i.e: `=TRELLO(“eio3u48d”)` or you can do other public services like getting weather forecast for a zip code `=WEATHER(“11222”)`

### Send mails from google docs or sheets using your Gmail account

This goes into the automation of your workflow. As I mentioned above, with google apps script, you can map UI elements (menus or a button like an element in the document content) to a custom trigger in your script that does something for you. We sometimes create sheets or docs containing form-like formats or in the google sheet scenario, an action to be taken by the user for each row there is data. For this examples sake, think like a contact list with name, email and thank-you-note columns. We use google apps script to create a button-like action item in a column we define (let’s say it’s the next column to the thank you note) with label say “Send Thank You Note”. With google apps script, we can register this column to accept clicks and trigger a google apps script function. The google apps script function then can pull the clicked row number and the values in that row for the name, email and thank you note. Then with few lines of code, we can utilize gmail service api (without needing to do complicated SDK installations and -more importantly- deal with authentication) to send an email to the recipient with the content we want (in this case use the thank you note column as the email content. This is a huge convenience compared to building out this capability in a service or custom code from scratch.

### Put a google sheet data to your calendar and update accordingly

Another great use case is to have timeline-based planning to be pushed to google calendar and update accordingly. We do this in a similar fashion as the previous scenario, but utilizing the google calendar service in the google apps script.

## Wrapping up

There are many more interesting use cases for google apps script. There are also many communities created/maintained lists, directories for great google apps script examples and resources.

[https://github.com/contributorpw/google-apps-script-awesome-list](https://github.com/contributorpw/google-apps-script-awesome-list) is a good start. Also checking GitHub tag search is worth looking [https://github.com/search?q=topic%3Agoogle-apps-script](https://github.com/search?q=topic%3Agoogle-apps-script)  
  
The official documentation of google apps script is here: [https://developers.google.com/apps-script](https://developers.google.com/apps-script)