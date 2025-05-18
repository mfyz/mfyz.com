---
title: "Quick and dirty set up Graylog in 5 minutes with docker"
slug: quick-and-dirty-set-up-graylog-in-5-minutes-with-docker
date: 2019-04-09
url: https://mfyz.com/?p=254
tags: ["docker","log","nodejs","Programming"]
category: Programming
migration: {"wpId":254,"wpPostDate":"2019-04-09T15:29:18.000Z"}
---

Docker made things super easy if you are curious about a new open source tool to try and even use it with isolated installations on your machine. In this article, I'll show quick steps to install and give graylog a try with a simple nodejs application to send logical errors to graylog instance.

1) Copy the docker-compose.yml file content below to a file then run:
```
docker-compose -f docker-compose.yml up
```
2) Login to graylog with opening http://127.0.0.1:9000/ in the browser Username: admin Password: admin

3) Configure inputs: Go to System > Inputs Add new "GELF UDP" configuration as global input using port 12201

4) Run the simple nodejs application below to send logs to graylog. First init npm and install graylog2 package from npm with:
```
npm install -s graylog2
```
docker-compose.yml
```
version: '2'
services:
  mongodb:
    image: mongo:3
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch-oss:6.6.1
    environment:
      - http.host=0.0.0.0
      - transport.host=localhost
      - network.host=0.0.0.0
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    mem_limit: 1g
  graylog:
    image: graylog/graylog:3.0
    environment:
      - GRAYLOG_PASSWORD_SECRET=mfyz11sanane22banane
      # Password: admin
      - GRAYLOG_ROOT_PASSWORD_SHA2=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      - GRAYLOG_HTTP_EXTERNAL_URI=http://127.0.0.1:9000/
    links:
      - mongodb:mongo
      - elasticsearch
    depends_on:
      - mongodb
      - elasticsearch
    ports:
      - 9000:9000 # Graylog web interface and REST API
      - 5555:5555 # Raw/Plaintext TCP
      - 1514:1514 # Syslog TCP
      - 1514:1514/udp # Syslog UDP
      - 12201:12201 # GELF TCP
      - 12201:12201/udp # GELF UDP
```
app.js
```
var graylog2 = require("graylog2");

var logger = new graylog2.graylog({
    servers: [
        { host: "127.0.0.1", port: 12201 },
    ],
    facility: "Test.js",
});

logger.on("error", function(error) {
    console.error("Error while trying to write to graylog2:", error);
});

setTimeout(() => {
    // logger.log("What we've got here is...failure to communicate");
    logger.log("With some data coming...", {
        cool: 'beans',
        test: { 
           yoo: 123,
        }
    });
    // logger.notice("What we've got here is...failure to communicate");

    console.log('logged?');
    // process.exit();
}, 2000);
```