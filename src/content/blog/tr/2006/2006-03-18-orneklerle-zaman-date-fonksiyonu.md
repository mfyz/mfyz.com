---
title: "Örneklerle zaman, date() fonksiyonu"
slug: orneklerle-zaman-date-fonksiyonu
date: 2006-03-18
url: http://mfyz.com/tr/orneklerle-zaman-date-fonksiyonu/
tags: ["NULL","PHP"]
category: PHP
migration: {"wpId":88,"wpPostDate":"2006-03-18T06:21:34.000Z"}
lang: tr
---

```
<?php
  
  // bu makalede date fonksiyonu ile neler yapabilecegimizi görecegiz.
  // fonksiyon date("parametreler") seklinde çalisiyor.
  // simdi bu parametleri ve çiktilarini görecegiz.
  print(date("a"));   // "am" veya "pm"
  print"<br>";
  
  print(date("A"));   // "AM" veya "PM"
  print"<br>";
  
  print(date("d"));   // Ayin günü, 2haneli "04" veya "28" gibi
  print"<br>";
  
  print(date("D"));   // Haftanin günü, 3 harflik bir string seklinde, "Mon" veya "Sat"   gibi
  print"<br>";
  
  print(date("F"));   // Metin seklinde uzun ay bilgisi. "February" gibi
  print"<br>";
  
  print(date("g"));   // 12 saat üzerinden saat bilgisi. "2" veya "11" gibi
  print"<br>";
  
  print(date("G"));   // 24 saat üzerinden saat bilgisi. "0" veya "23" gibi
  print"<br>";
  
  print(date("h"));   // 12 saat üzerinden 2 haneli saat bilgisi. "02" veya "10" gibi
  print"<br>";
  
  print(date("H"));   // 24 saat üzerinden 2 haneli saat bilgisi. "00" veya "18" gibi
  print"<br>";
  
  print(date("i"));   // "00" ve "59" arasinda dakika bilgisi
  print"<br>";
  
  print(date("j"));   // Soldaki 0'lar olmadan ayin günü "1" ve "31" arasinda.
  print"<br>";
  
  print(date("l"));   // Uzun metin olarak haftanin günü "Monday"...
  print"<br>";
  
  print(date("m"));   // "01" ve "12" arasinda ay bilgisi
  print"<br>";
  
  print(date("M"));   // 3 harf seklinde ay bilgisi. "Jan" ...
  print"<br>";
  
  print(date("n"));   // Soldaki 0'lar olmadan ay bilgisi. "1"-"12"
  print"<br>";
  
  print(date("s"));   // "0" ile "59" arasinda saniye bilgisi
  print"<br>";
  
  print(date("S"));   // ingilizcedeki son iki ek "th", "nd"
  print"<br>";
  
  print(date("t"));   // verilen ay için gün sayisi "28" - "31" araliginda
  print"<br>";
  
  print(date("w"));   // haftanin günü 0-6 arasinda, 0 pazar, 6 dsa cumartesi
  print"<br>";
  
  print(date("Y"));   // yliin 4 haneli sekli 1998, 2003 gibi
  print"<br>";
  
  print(date("y"));   // 2 haneli yil bilgisi 02, 95 gibi
  print"<br>";
  
  print(date("z"));   // yilin günü 0-365 araliginda
  print"<br>";
  
  // bu parametreleri tek basina kullanmaktansa ayni sekilde istedigimiz 
  // gibi kullanabiliriz. örnek olarak
  print(date("j.n.y"));   
  
  // çıktısı : 15.9.03 şeklinde birşey olabilir. Burada ayraçları veya
  // aradaki zımbırtıyı istediğiniz gibi belirleyebilirsiniz.
  // ama o zımbırtının bir anlama gelip te parametre olup olmadigini 
  // da deneme yanilma ile bulabilirisiniz.
?> 

```