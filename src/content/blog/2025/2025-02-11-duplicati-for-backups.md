---
title: "duplicati for backups"
slug: duplicati-for-backups
date: 2025-02-11
url: https://mfyz.com/?p=932
tags: ["Other"]
category: Other
migration: {"wpId":932,"wpPostDate":"2025-02-11T13:29:12.000Z"}
---

I use a few different methods to backup my stuff on my server (and my mac). Duplicati is one of them. It’s probably the easiest to set up backup tool I’ve used.

Duplicati is a versatile, open-source backup solution that’s packed with features. It’s easy to use, supports a wide variety of backup destinations, and has a friendly web interface that makes backup management straightforward for most.

## Host anywhere

Duplicati is open source and it can be deployed almost anywhere. I run it as a docker container that does NOT require much resources to run. They also have hosted version that centralizes multiple machine backups, but I never used it.

I use a pretty simple single-container compose file that I deploy using portainer and its gitops integration (related article: [Portainer + gitops ❤️: A simple way to deploy and manage your self-hosted applications](/portainer-gitops-a-simple-way-to-deploy-and-manage-your-self-hosted-applications/)). I mount my sources (they are all in the same machine, stuff running in different containers) into duplicati’s container. Then duplicati treats it as simple folders to monitor, take incremental backups and send backups to whatever remote I set up.

Here is my `docker-compose.yml` for my duplicati setup:

```yml
version: '3.9'
services:
  duplicati:
    image: lscr.io/linuxserver/duplicati:latest
    container_name: duplicati
    restart: unless-stopped
    environment:
      - TZ=America/New_York
      # - PUID=1000 #the user
      # - PGID=1000 #the group
      # - CLI_ARGS= #optional
    volumes:
      - config:/config
      - ${BACKUP_FOLDER}:/backups
      - ${SOURCE_ROOT_FOLDER}:/source/data
    ports:
      - 8200:8200
volumes:
  config:

```

## Simple Web UI to manage backups

![](/images/archive/en/2025/02/1-1600x1052.jpg)

![](/images/archive/en/2025/02/2-1600x1052.jpg)

### Setting Up a Backup Job

Setting up a job is pretty easy using the web UI. A few steps include selecting source, setting up target and finally schedule.

![](/images/archive/en/2025/02/4-1600x1052.jpg)

![](/images/archive/en/2025/02/5-1600x1052.jpg)

## Duplicati supports tons of target/destinations

![](/images/archive/en/2025/02/3-1600x1061.jpg)

I use google drive as the target.

## Monitoring

While duplicati has some ways to check jobs statuses, and logs. I don’t trust one single system.

I have a separate healthcheck script that checks the duplicati backup folders if duplicati failed to write. It’s a simple node.js script that reads the google drive folder contents and queries files create timestamps then checks if there is at least one in the last X hours. If it find any file, it pings my healthcheck system.

I’ve covered this recently: [Monitor everything with Healthchecks.io](/monitor-everything-with-healthchecks-io/). Healthchecks takes care of sending slack and email alerts to me.

Check duplicati out from their website: [](https://duplicati.com/)[https://duplicati.com](https://duplicati.com)