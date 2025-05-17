---
title: "MySQL'de optimizasyon analizi"
slug: mysqlde-optimizasyon-analizi
date: 2009-09-09
url: http://mfyz.com/tr/mysqlde-optimizasyon-analizi/
tags: ["analyse","mysql","optimizasyon","procedure","sql","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":227,"wpPostDate":"2009-09-09T04:41:19.000Z"}
lang: tr
---

MySQL'de Procedure Analyse fonksiyonu ile tablo yapınıza ait betimsel istatistikler ve alanlara ait veri türü önerisi elde edebilirsiniz. Bu sayede içi dolu olan bir tablonuzun yapısını optimize ederken kaydedilen veri hakkında fikir sahibi olabilirsiniz. Procedure Analyse, çıktı olarak tablonuzdaki her alana ait minimum, maksimum, içindeki veri boyutlarının alt ve üst sınırlarını, ortalama standart sapma ve en önemlisi, o ana kadar kaydedilmiş verilerin profiline göre o alanın en ideal hangi türde olması gerektiğine dair öneri veriyor. Sonuçta nümerik alanlarda ortalama, standart sapma, minimum maksimim değerleri düşünerek veri boyutunuzu saptayabilirsiniz. Aynı durum varchar alanlarda da geçerli. Çoğu zaman select sorguları gereksiz yere büyük açılmış alan türlerinden ve indeks oluşturulmamış basit alanlardan dolayı oldukça uzun sürelerde sonuç veriyor. Hatta bazen zaman aşımına uğruyor. MySQL'de Procedure Analyse hakkında bilgi almak için taze yazdığım şu dökümanı inceleyebilirsiniz : [MySQL'de Procedure Analyse ile optimizasyon analizi](https://tr.mfyz.com/mysqlde-procedure-analyse-ile-optimizasyon-analizi/)