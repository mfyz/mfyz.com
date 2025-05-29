---
title: "Docker ile kolayca graylog kurulumu ve ornek nodejs uygulamasindan loglama"
slug: docker-ile-kolayca-graylog-kurulumu-ve-ornek-nodejs-uygulamasindan-loglama
date: 2019-04-09
url: https://mfyz.com/tr/?p=1455
tags: ["docker","nodejs","Programlama"]
category: Programlama
migration: {"wpId":1455,"wpPostDate":"2019-04-09T06:44:36.000Z"}
lang: tr
---

Docker, acik kaynak kodlu bir uygulamayi deneme ve gelistirme icin gelistirme bilgisayariniza kurulum surecini inanilmaz kolaylastirdi. Bu kisa yazida size docker kullanarak bir graylog kurulumu yapip basit bir nodejs uygulamasindan mantiksal log gonderme ornegi verecegim.

1) Asagida kaynagi verilen docker-compose.yml dosyasini kopyalayip kaydedin ve asagidaki komutla docker instance kurulumu yapin:
```sh
docker-compose -f docker-compose.yml up
```
2) Kurulan graylog'a http://127.0.0.1:9000/ adresini kullanarak giris yapin Kullanici: admin Sifre: admin

3) "Input" ayarlamasi yapmak icin, graylog arayuzunde: System > Inputs'a gidin ve "GELF UDP" kaynagi secerek "global" tanimlama yapin. Bu konfigurasyonu yaparken de 12201 portunu belirleyin. Bu noktada graylog kullanima hazir.

4) Asagidaki uygulama ornegini kopyalayip kaydedin ve calistirin. Bunu yapmadan once de tek bagimli paketi, "npm init" ve "npm install graylog2" komutlariyla kurun.

 

docker-compose.yml
```yml
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
```js
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