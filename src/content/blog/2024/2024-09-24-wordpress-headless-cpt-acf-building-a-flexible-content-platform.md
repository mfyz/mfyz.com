---
title: "WordPress Headless + CPT + ACF: Building a Flexible Content Platform"
slug: wordpress-headless-cpt-acf-building-a-flexible-content-platform
date: 2024-09-24
url: https://mfyz.com/?p=861
tags: ["api","headless","nextjs","postman","Programming","wordpress"]
category: Programming
migration: {"wpId":861,"wpPostDate":"2024-09-24T13:30:00.000Z"}
---

This article will guide you through creating a flexible and dynamic content platform using WordPress as a headless CMS, Custom Post Types (CPTs), and Advanced Custom Fields (ACF). Whether you're a seasoned developer or just starting out, this combination offers a powerful foundation for your projects.

### Why Go Headless with WordPress?

Think of WordPress as the brains behind your content, and a headless setup as giving it the freedom to power any front-end you want. This means you can use your favorite framework (React, Vue.js, etc.) to create a beautiful and performant user interface.

![](/images/archive/en/2024/09/image-1-1.jpg)

One of the big benefits of using wordpress headless is to remove concerns of any front-end from the actual Wordpress. This is one of the things I struggled a lot in the past working with wordpress that there is a plugin for everything. And you can easily end up in a place with 20+ plugins bloating your wordpress installation. Most of them are about front-end website experience. This way, you can also separate your editorial needs from your developer teams’ needs, making your developer team more independently optimize and deploy your website, without worrying about risking editorial mishaps.

### Setting Up Your Local Test Environment

Before we dive into the fun stuff, let's set up a playground. Here's what you'll need:

*   **WordPress Installation / Local Server:** Use **Docker** for a streamlined setup. Check out this docker compose I wrote a few years back, it should still be a good place to start: [https://github.com/mfyz/wordpress-docker-compose](https://github.com/mfyz/wordpress-docker-compose) or I’m sure you can find a valid/recent example quickly.
*   **Headless Framework:** Consider **Next.js** for a React-based frontend. You can find a sample project I played with it here: [https://github.com/mfyz/next-wp](https://github.com/mfyz/next-wp)

### Unleashing the Power of WP-JSON

WordPress's REST API, accessible through `wp-json`, is your gateway to interacting with your content programmatically. Let's explore it using Postman.

### Exploring the WP-JSON Endpoint with Postman

![](/images/archive/en/2024/09/Screenshot-2024-09-02-14.48.30.jpg)

Postman is a fantastic tool for testing APIs. Here's how to utilize it for exploring the WordPress REST API:

*   **Import a Postman Collection:** Import the pre-built [WordPress Postman Collection](https://www.postman.com/avionics-specialist-27554543/workspace/work-2-0/documentation/15086392-e8a0648d-b23b-4eb8-af97-93a2af65e0c0) to get started quickly. This collection provides pre-configured requests for interacting with various WordPress resources.
*   **Test Requests:** Send GET requests to retrieve various post types, pages, and custom fields. Explore the available endpoints and data structures.

### Customizing Your Content types with Custom Post Types (CPT)

WordPress offers you the flexibility to create custom post types beyond the standard posts and pages. Think of these as building blocks for your unique content structure (Imagine unique content types, like: recipes, books, hardware, people, places…).

[**Custom Post Type UI**](https://wordpress.org/plugins/custom-post-type-ui/) is a user-friendly plugin allows you to easily create, manage, and customize custom post types directly within your WordPress admin panel. It eliminates the need for manual coding, making CPT creation accessible to users of all skill levels.

![](/images/archive/en/2024/09/Screenshot-2024-09-02-14.40.48.jpg)

### Advanced Custom Fields with ACF

![](/images/archive/en/2024/09/image-2-1-1600x1007.jpg)

[**Advanced Custom Fields (ACF)**](https://www.advancedcustomfields.com/) is a game-changer for content management. It lets you create custom fields for your custom post types, making them more flexible and dynamic. Think of it like building blocks for your content.

Here's what you can achieve with ACF:

*   **Create Flexible Layouts:** Design complex page layouts with varied content formats using ACF fields.
*   **Simplify Content Creation:** Provide editors with user-friendly interfaces for adding and managing content, even for complex data structures.
*   **Enhanced Data Management:** Store complex data structures efficiently with custom field groups.

Here is how your custom fields will look like in your pages, or posts:

![](/images/archive/en/2024/09/acf-home-hero.jpg)

I find this very intuitive.

When combining it with the CPT UI plugin, it becomes really customization. CPT UI has additional controls to make the “editing” experience simpler for custom types (like disable Guttenberg, disable the body of the post altogether, and other customizations).

ACF will promote its PRO plan a lot, but you don’t need its pro version in most cases.

## Front-end freedom

![](/images/archive/en/2024/09/image-3.jpg)

Using Wordpress empowers your front-end team to choose their favorite front-end framework, push the boundaries of customization and performance for your front-end of your experiences.

It can also centralize your content platform for multi-channel digital experiences like website, mobile apps, OTT apps (TV apps).

In the summary at the top, I mentioned the next.js sample I played with a few years back to use simple wordpress + CPT UI + ACF combination. You can browse the source code here: [https://github.com/mfyz/next-wp](https://github.com/mfyz/next-wp)

I hope this article provides a solid foundation for your headless WordPress journey.

Now go ahead and build something amazing!