---
title: "Development sürecinde css ve js dosyalarının cachlenmesini engelleyin"
slug: development-surecinde-css-ve-js-dosyalarinin-cachlenmesini-engelleyin
date: 2010-09-26
url: http://mfyz.com/tr/development-surecinde-css-ve-js-dosyalarinin-cachlenmesini-engelleyin/
tags: ["apache","cache","css","htaccess","javascript","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":260,"wpPostDate":"2010-09-26T03:41:50.000Z"}
lang: tr
---

Projenizi geliştirirken en büyük problemlerden biri olan cache sorununu apache sunucularda kolayca çözebilirsiniz. Tüm geliştirme süresince projenizin root'undaki htaccess dosyanıza css ve js dosyalarının cachelenmemesi için gerekli header'ları tarayıcıya gönderebilirsiniz.

Bu sayede tarayıcı bu dosyaları her aldığında expire olduklarını anlayacak ve her sayfa yenilendiğinde sunucudan tekrar isteyecektir.

Bunun için proje root klasörünüzdeki htaccess dosyanıza (yoksa oluşturun)

```
Header set Cache-Control "max-age=0, public"
Header set Expires "Thu, 15 Jan 2000 20:00:00 GMT"

```

satırlarını ekleyin.