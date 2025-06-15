---
title: "Creating sequence diagrams using mermaidjs to map out your user journey"
description: "An effective product planning process using sequence diagrams created with Mermaid.js to map out user journeys is detailed. This visualization aids in understanding interactions between various user personas and system components."
slug: creating-sequence-diagrams-using-mermaidjs-to-map-out-your-user-journey
date: 2023-01-23
url: https://mfyz.com/?p=816
tags:
  [
    "sequence diagrams",
    "mermaidjs",
    "user journey mapping",
    "product planning",
    "ux design",
    "diagramming",
  ]
category: Product Design
migration: { "wpId": 816, "wpPostDate": "2023-01-23T13:31:20.000Z" }
---

![](https://cdn-images-1.medium.com/max/1600/1*0s1dZ31s07AjgQvdpCT-gw.png)

I want to talk about an effective product planning process I’ve been following recently.

### Why to do user journey thinking?

In your product, single most important thing is to put your users first. Nothing matters other than how your users perceive your product. “Users” is a very general and broad definition and often used without much nuance of different user personas. Anybody who interacts with your product is your user, including you as “admin” or “owner”. There are many other user personas you may need to consider when designing a feature. It’s also important to think maturity of your users adoption of your product. A user who is new to your overall product may take your new feature in a different way than a power user. Similarly, your small biz client’s users may need different things than your enterprise client.

User journeys can easily highlight differences between these users and how they interact with your product or each other. Your feature may require a tech lead to configure things first in your product, then tell their editors to do other things while editors may need to work with their development team to accomplish other goals. So a simple looking feature may require couple different team members to collaborate and communicate.

### Sequence Diagrams

Sequence diagram is a type of diagram that does great job telling 2 things:

- How many participants in a journey

- The order of things between which participants happen.

And example to this would be, order a food at a restaurant.

Participants:

- Guest

- Host

- Waiter

- Kitchen

And maybe steps would be:

- Guest asks Host can I have a table for 2?

- Host shows and sits the Guests to a table.

- Waiter comes to the table and asks for order from Guests.

- Guests places their order.

- Waiter tells Kitchen about the order

- Kitchen prepares the order

- Kitchen tells Waiter that order is ready.

- Waiter brings food to the table to the Guests

A journey like this can be visualized in a sequence diagram like this:

![](https://cdn-images-1.medium.com/max/1600/1*nY4gWl3AjBylwPLqmKuRgA.png)

```
sequenceDiagram

Guests ->> Host: Can I have a table for 2?
Host ->> Guests: Shows and sits the Guests to a table.
Waiter ->> Geusts: Comes to the table and asks for order.
Guests ->> Waiter: Places their order.
Waiter ->> Kitcken: Tells about the order
Kitchen ->> Kitchen: Prepares the order
Kitchen ->> Waiter: Order is ready.
Waiter ->> Guests: Brings food to the table.
```

As you see, if we were to design a food ordering feature, we may want to visualize traditional way of ordering food and also visualize our better food ordering experience with our new product feature.

### How about user stories?

User stories are key when developing a product. Written user stories are best to summarize a capability, a feature or a user goal. A traditional story would look like:

> ```
> **As a < persona >, I want to < action >, so that I can get < benefit>**
> ```

User stories written in this traditional sense brings clear, structured, short and written form to your product features. They are essential when the engineering team is planning their implementation in project management tools. Often a user story is planned as a story and engineering team can break it down to sub-tasks about the implementation steps. If user story is describing a bigger goal, it can be planned as an epic and sub stories and tasks can be planned under it.

Let’s roll back to our user journey mapping with sequence diagrams. As you see here, this process does not replace but complements user stories. It makes sense to make the user journey mapping practice before finalizing user stories when planning a product.

### Using Mermaid.js for quick Diagramming Tool

Mermaid is an open source software that draws different types of diagrams using simple structured text. One of the diagram types mermaid support is sequence diagrams.

Mermaid draws a sequence diagram using a text formatted like this:

```
sequenceDiagram

Fatih ->> John: Hi, how are you?
John -->> Fatih: Thanks, I'm good.
John -->> Fatih: How are you?
Fatih ->> John: All good, thanks.
```

Renders to a nice sequence diagram:

![](https://cdn-images-1.medium.com/max/1600/1*oVkWpGBA30xyVsTHnvlMlg.jpeg)

### Mermaid Tooling

I’ve covered how to edit and manage mermaid diagrams in your favorite tools in [a past article](/editing-and-previewing-mermaid-diagrams-on-your-docs-markdown-github-notion-confluence/).

You can also alternatively create similar diagrams in free-form mode with excalidraw which I also like. I’ve talked about excalidraw in [my previous posts](/create-quick-diagrams-and-wireframes-using-excalidraw-vscode/). It will give you way more control to make your diagrams look exactly like you want but obviously it will take much more time to create one compared to mermaid.js diagrams.
