---
title: "Easy WordPress backups using Updraft"
slug: easy-wordpress-backups-using-updraft
date: 2022-05-04
url: https://mfyz.com/?p=732
tags: ["Other"]
category: Other
migration: {"wpId":732,"wpPostDate":"2022-05-04T12:59:03.000Z"}
---

![](/images/archive/en/2022/05/banner-772x250-1.png)

### Why backups?

If you are running WordPress to host anything serious, you probably are asked, talked about, or want to have a backup solution. Regardless of a serious site or a hobby project, you will be putting some time and effort into building it and continue creating content. In this day and age, it's unthinkable to not have a backup of your site.

There are much more complex backup solutions out there, but most likely, you are using a somewhat managed hosting solution. Most hosting companies have their own out-of-the-box backup solutions. You can explore these options. But if you want to find a cost-free or low-cost or more flexible option, keep reading :)

I'm going to dive into my recommendation of the Updraft plugin first, then talk about a few key points I pay attention to and how updraft is handling these.

### Updraft makes it easy

Updraft is a full backup solution for WordPress sites. It has a lot of controls you can configure your backups in different windows, what to backup, where to store, how to notify admins, and more.

[Learn more about Updraft](https://updraftplus.com/?afref=2335&campaign=UpdraftBlogPost)

![](/images/archive/en/2022/05/UpdraftPlus-WordPress-Backup-Plugin-1.15.2-1.jpg.png)

Aside from these generic topics, there are three larger, key topics I want to talk about, that it's most important to me when I consider backup solutions.

### What and when to backup?

The most common topic to think about when designing backup strategies is what you want to back up and with what frequency. Updraft comes with a 2 tier schedule we really like. We set one of them to take full backups every week and retain the last 2 copies of this "full backup" these backups are basically our full "restore" points.

![](/images/archive/en/2022/05/screenshot-2.png)

Then we set the second tier schedule to run every day, take database, and /uploads folder backup. On some sites where we don't have many new uploads happen and if we have a huge historical media library, we skip the uploads and only take database backups daily and we retain daily backups for 14 days. This means we can restore a full backup from the beginning of the week (that includes plugins and all other stuff) and then cherry-pick a specific day in the last 14 days if we want to roll back to a particular date.

### Back up, restore, and migrate easily

The reason you are wanting to have backups is at the end of the day, to be able to restore it easily in case you lose your server. Stuff happens right?

When that happens, it matters how easily/quickly restore your backup to a fully functional state. In WordPress site terms, it means everything including your posts, assets (media library), plugins to be installed, and plugin configurations as well. We're basically looking for a full site restore.

One of the reasons I really like Updraft is because it handles full backup restore with a few clicks.

As part of the "restoration" process, Updraft doesn't care if you are restoring the backup files to the exact same domain or a new one. This actually makes Updraft a great "migration" or "cloning" tool. We have utilized Updraft in my team to clone production sites to create staging or test copies easily. There are more specialized solutions for this but Updraft already handles these needs, so one plugin does many things for us.

When migrating to a new domain, updraft detects if the target WordPress URL is different than the source where the backup it has taken from, and it asks if you want to update the URL references (there are tons, in WordPress DB) with the new URL. This is also another pain point when moving sites between different domains.

A usual workflow is to work on the dev or staging version of a website then when ready, clone this to the production version. Updraft makes this process really easy for us.

### On the server - off-site?

Another key topic is where the backups will be stored. By default, any backup solution will create backup files in the same server. It's helpful to have backups on the same server, because it's less configuration, faster...But that's not why we're taking backups in the first place. The "worst-case" scenario we're preparing ourselves for is if we lose access to our server altogether. That's why it's very important for a backup strategy to include the backups storage to be off-site (out of the server), or even complete a separate region or even further to keep them in a different cloud provider. What if a whole AWS region goes out? (unlikely but it happens).

Updraft supports many cloud storage providers and protocols. I used AWS 3, Google Drive, Dropbox, (S)FTP targets with Updraft plus, and their configurations are really easy.

Beware most of these integrations will require the paid version "Plus" which is an annual subscription but you pay for plugin updates. In my opinion, it's very affordable given the amount of manual work it removes from the engineer's hands. We happily pay for an agency license and use it on all of our WordPress sites.

### Bonus: Automatic backups before updates

For a regular, not tech-savvy user, there is a feature of updraft that I really like that shows a pop-up every time the WordPress admin tries to perform an update in the WordPress dashboard.

The pop-up basically reminds us that if the user wants to take a backup before proceeding with updates. One of the most common reasons your WordPress site will break is when you update your plugins. Your plugins may not be careful with backward support and/or they may miss a buggy use case that you are using their plugin with. When the update happens, your site reading behavior may be impacted, or even page rendering that will basically break your pages which is more serious. When this happens, Updraft’s notice that takes a backup before performing updates which will be a reference point for you to restore in case needed.

![](/images/archive/en/2022/05/2-1.png)

Of course, this option is configurable and Updraft makes it prominent for WordPress admin to change this behavior:

![](/images/archive/en/2022/05/autobackup2.png)

[Learn more about Updraft](https://updraftplus.com/?afref=2335&campaign=UpdraftBlogPost)

_Disclaimer: This post contains affiliate links that will help support this site. Even though it looks like a promoted post, I genuinely love, use and recommend Updraft free or paid plugins/services. I would have published exact same post even if I wasn’t using affiliate links._