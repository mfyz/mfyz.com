---
title: "Htaccess ile adresinizdeki www'yu kaldirin"
slug: htaccess-ile-adresinizdeki-wwwyu-kaldirin
date: 2011-07-31
url: http://mfyz.com/tr/htaccess-ile-adresinizdeki-wwwyu-kaldirin/
tags: ["htaccess","non-www","Sunucu Programlama","url"]
category: Sunucu Programlama
migration: {"wpId":277,"wpPostDate":"2011-07-31T13:02:52.000Z"}
lang: tr
---

Herhalde milyon tane baslik acilmis ve bu soru cevaplanmistir fakat su an duzenleme yaparken daha dogru bir cozum buldum bu konuya ve sizinle paylasmak istedim. Web sitenizin adresindeki www'dan kurtulmak icin htaccess'da mod\_rewrite'i kullanabilirsiniz. Bircok farkli cozum var fakat icinde domain, hostname degisikligi yapmadan her yerde kullanabileceginiz ve bence en dogru cozum olarak su kodu kullanabilirsiniz:
```
RewriteEngine On
RewriteBase /
RewriteCond %{HTTP\_HOST} ^www.(.+) \[NC\]
RewriteRule ^.\*$ http://%1%{REQUEST\_URI} \[R=301,L\]
```
Not: otomatik link olustugu icin kod icindeki link ve ikona takilmayin, kodu kopyaladiginizda dogru kopyalanacaktir.