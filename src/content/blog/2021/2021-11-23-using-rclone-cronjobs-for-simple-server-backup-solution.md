---
title: "Using rclone &amp; cronjobs for simple server backup solution"
slug: using-rclone-cronjobs-for-simple-server-backup-solution
date: 2021-11-23
url: https://mfyz.com/?p=707
tags: ["Other"]
category: Other
migration: {"wpId":707,"wpPostDate":"2021-11-23T13:38:24.000Z"}
---

![](/images/archive/en/2021/11/img_6029.jpg)

[https://rclone.org/](https://rclone.org/) is a command-line file/folder sync tool that connects with many cloud storage providers like AWS s3, FTP, google drive, dropbox...

It’s easily configured once then with simple commands, allowing two-way syncing between different cloud providers or local file systems.

This makes it the perfect and simplest backup solution on your personal server to take backups and sync them to multiple cloud providers.

I do have the following cron runs once a day along with a few other scripts that prepare the backups.

```
rclone sync -v /data/backups mfyz-gdrive:mfyz-server-backups-rclone
```

This command syncs my backups folder (contents) to a folder in my google drive. 

### Backups

The way you take your backups will be up to you. You could even directly sync your application folders like apache httpdocs folder but that’s too many files that may update too frequently. Instead, you can tar, gzip your folders or take database backups before running rclone for your backup solution.

I have the following, simple backup script on my server takes my wordpress site’s snapshot daily, then rclone syncs it up to my google drive.

```
cd /data/backups
now=$(date +"%Y%m%d")
echo "--> backing up mfyz.com"
echo "files backup..."
tar cpf backup-mfyz-$now-files.tar --exclude=Files --exclude=wp-content/uploads --exclude=wp-content/cache --exclude=tr/wp-content/uploads --exclude=tr/wp-content/cache --exclude=.git ../www/mfyz
echo "database backup..."
sudo mysqldump mfyz\_wp | gzip > backup-mfyz-$now-db.sql.gz
echo "done"
```

### Monitoring

In my daily cron tasks, after running rclone, I also have a health check to make sure my backups are taken correctly. So a ping service monitors my daily tasks run successfully. I’ve written about open-source health check/ping service you can use or self-host yourself here: [https://mfyz.com/monitoring-your-microservice-stack-with-simple-ping-health-checks-using-helathchecks-io-for-free/](https://mfyz.com/monitoring-your-microservice-stack-with-simple-ping-health-checks-using-helathchecks-io-for-free/)