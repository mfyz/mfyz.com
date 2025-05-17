---
title: "Why every developer needs to know google sheets & excel programming"
slug: why-every-developer-needs-to-know-google-sheets-excel-programming
date: 2020-06-15
url: https://mfyz.com/?p=499
tags: ["Other"]
category: Other
migration: {"wpId":499,"wpPostDate":"2020-06-15T12:00:00.000Z"}
---

I’ve recently talked about different cloud documentation services [Smart(Er) Documents – Quip, Notion, Airtable, Coda Or Good Old GDocs & GSheets](https://mfyz.com/smarter-documents-quip-notion-airtable-coda-or-good-old-gdocsgsheets/) and the my take on [Smarting up Google Docs](https://mfyz.com/smarting-up-google-docs-and-sheets/).

Let’s dive right in the few key reasons why every developer should know google apps script and get familiar to work with GAS in google sheets and docs.

### 1) Provide your technical output (data) in common ground (a tool that is known by pretty much any computer user or intuitive to learn if they don’t know)

I highly believe any tool allow developers and non-dev role in a team to effectively communicate complicated information. Generally data sets to be eventually used for a form of story tellin g (a website/blog content, an internal or external product performance report, financial or behavioral analysis etc.). When it comes to developer crew only, we always find 100 different ways to express what we want to show to the world in form of scripts utilizing whatever library, tools comes to our hands. But when it comes to handing over our output (whether it’s a SQL output in CSV format, or a dynamic data set in a service), we are as developers are constrained as well as the party we’re handing over our work to start their work with a lot of constraints. They also have to learn whatever data format we give them. This also makes the collaboration one direction, starting from developer then ending up in the non-dev role working with that data (marketing people, product management or executive roles).

Real trouble starts when we have to repeat same work over and over. Because we can export the desired data model from whatever tool we’re using, generally as static CSV/Excel exports if it’s a tabular data. If you are doing same or similar work multiple times, it’s only beneficial to think ways to automate the process. Let’s think a simple family expenses management on excel/google sheets (because everybody knows or learn to work with sheet tools easily). In this hypothetical scenario, let’s say there is a database or API provides your credit card statements (there are actually services for extracting this information from your bank - but for security reasons, it gets very complicated on the authentication layer). As developer you can start the story from “extracting the data” and your output will almost always will store the extracted data in some place - most likely a database. 

You may or may not be the “analyzing” person in the family or even if you are, you may need to review your analysis with rest of the family members and may get their own take in the dataset for a real collaborative understanding and iteration. 

Google Apps Script has many ways to connect to 3rd party APIs to pull data and if done well, do these operations automatically refreshing data set or manually with UI interactions but essentially a developer’s role to be completely automated in a “smart google sheet” or doc.

Once this is set up right, it can be copied and extended easily. It goes back to the traditional “macro enabled excel templates” approach, but it really works out well for everybody. And google docs products are true real-time collaborative tools that you can literally open computers on a conference call, collaboratively edit and work on same information to bring it to an understandable level with simpler aggregate analysis or breakdowns or even charts without having to reinvent the wheel to code all these up from scratch.

### 2) Mockup / Bootstrap a lot of ideas in simpler form without needing to code a lot. Perhaps these can be used even long term use cases

As developers, more than half of what we do is automation. We code to not repeat ourselves. This is just a human desire to invest in our brain to not to do time consuming less intellectual work. Our brains are wired that way form the time we born. It always seeks for shortcuts. Developers are the hackers gets these shortcuts discovered and implemented in digital realm.

Whether you are working alone or working with others (team), you will always have things that you have to do multiple steps to produce an output while you work. To not repeat yourself, you will want to create tools to yourself that helps you achieve same output with less steps. The shortest way we always use the buzz word “one-click” to reflect the magical robotic process when we refer to an “easy” tool. Regardless the steps become one or multiple, there is always area for improvement in a work we do every day.

Developers tend to jump in their own comfort environment to create scripts to do things for themselves. I don’t know any developer who doesn’t have scripts that helps resizing images, or orchestrates their common tasks, so whenever we need to do the same operation, we just want to push the “one-click” button and see the output. Most of the time we invest a lot of time to build these scripts regardless of we are super proficient on the languages we know and the environment. Also we will always have issues with sharing this work with others in the team or invest more time to convert these scripts to be utilized by others in the team or publicly by anyone in internet.

Google gdocs products give a great canvas and a lot of limitations that positively shape and give us limits to make sure what we create in google docs or sheets or slides have to be in familiar format that can be used by other developers or non-dev team members.

Just to acknowledge that google apps script has real limitations, generally if you are doing resource heavy task on the cloud servers or the browser. But it is also super easy to start in a very basic form factor so you don’t have to worry about a lot of cosmetics or look and feel.

### 3) Spreadsheet tools are essentially databases

Every developer has to know relational database modeling and working with any size and structure of the data. At the core of relational databases, you have to work with tables and the relationships between them. 

Google spreadsheet and Excel are great tools that can be extensively used by both developer and non-developer people together because its both visual tool and a structured data by its nature.

The reason both tools have programming interfaces because its one of the core use cases for these tools. I also think the companies behind them are forced to have this programing features that because it’s probably one of the most requested features.

Al in all, utilizing a spreadsheet file as database, where you read the structured information from it as well as inject new rows or query and update the rows becomes one of the most common use cases from its programming perspective. So whether you like it or not, you will eventually come to a work that the “users” of your product is already or will be using spreadsheet files aside of your product. So you will at least have to learn how to process these files (import, ingest) and be able to expose your product’s details (data) in these formats (export features).

The best way to see this is being a very common need to look at the most popular automation tools on internet like IFTTT, Zapier. One of the first integrations they did was google sheets.

I personally have many google sheets files that is fed by IFTTT or workers I run on my servers that exports activities daily/weekly/monthly or by trigger. Anytime I want to see what’s going on and want to analyze my activities (both personal activities like my driving history, or leaving/entering NYC area, or my expenses on my credit cards) I can easily do a pivot table to see the trend, or group them by categories or other angles to look at the same data with different questions. I can’t even describe how many different ways similar scenario can be for a business purpose. Analytics by itself will cover a long list of things you (or a non-dev team member) can and will want to do with data sets like these.

## Wrapping Up

The last reason in the list is probably is the strongest from a professional skill perspective, so you kinda have to know your way around in both static excel/csv files as well as knowing how to work with google APIs for google sheets from it’s authentication steps to the actual endpoints/methods in the google sheets api to work with the spreadsheets.

But #1 and #2 are more important if you are (or want to) a resourceful problem solver. Every developer is at the end of the day non-stop problem solver and having Google sheets in developer’s toolbox is a must.