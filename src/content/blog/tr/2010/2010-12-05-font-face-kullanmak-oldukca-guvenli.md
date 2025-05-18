---
title: "@font-face kullanmak oldukça güvenli"
slug: font-face-kullanmak-oldukca-guvenli
date: 2010-12-05
url: http://mfyz.com/tr/font-face-kullanmak-oldukca-guvenli/
tags: ["Arayüz Programlama","browsers","css3","font-face","support"]
category: Arayüz Programlama
migration: {"wpId":263,"wpPostDate":"2010-12-05T04:50:12.000Z"}
lang: tr
---

Bu aralar cufon, flir gibi web syfalarında kendi fontunuzu kullanabilmenizi sağlayan araçların kullanılabilirliği konusunda yeni nesil css çözümüne alternatif olarak kullanılabilirliğini test ediyordum. Aslında biraz sevindirici bir sonuç aldım. Çünkü css2 ile gelen font-face'in css3 ile tekrar gündeme gelmesinin yanı sıra aslında birçok tarayıcıda sorunsuz kullanılabildiğini gördüm.

Aşağıda @font-face attribute'u ve hangi tarayıcıların hangi sürümden beri desteklediğini görebilirsiniz.

![](/images/archive/tr/2010/12/Screen-Shot-2017-09-16-at-10.26.19-PM.png)

Kaynak: http://is.gd/id6se

Aslında bu bu tercih edilebiliriği sağlayan bir etken de Microsoft'un herkesten önce bunu implemente etmiş olması. Çünkü IE cephesinin birçok yeni feature'u desteklememesinin yanı sıra XmlHttpRequest gibi birçok tarayıcıdan önce davranmış olduğu konular var. Doğal olarak bu, geliştiricilerin önünü tıkamadığı için webde örnekleri çoğaldıkça kullanımı hızlı yayılıyor. Çünkü her zaman karşımıza çıkan ie problemleri olmuyor.

Tabi bir sorunumuz var, kullanmak istediğiniz fontun her tarayıcının render edebileceği formatlarda sunuyor olmanız gerek. Bu öyle kolay bir iş değil. Zira zaten font kullanımının birçok lisans bağlantısı ve kullanımının açık olmaması gibi bir durum yaygın. Tabi ki SVG gibi formatlar bunu kırıyor fakat yine de bu crossbrowser destek verebilmenizi sağlamıyor. En azından fontunuzun, EOT, SVG, TTF ve OTF formatlarında sunuyor olmanız gerek.

Tabi ücretsiz ve non-commercial kullanımı ücretsiz olan fontları size kit olarak sunan siteler var. Aralarından en sevdiğim olan Fonts Squirrel'i kullanabilirsiniz. Hatta bu ücretsiz font-face kitlerini inceleyip indirebileceğiniz bir sayfaları da var: http://www.fontsquirrel.com/fontface

Sonuç olarak cufon, flir gibi alternatifleri kullanmayı düşünmeden önce fontunuzu bu şekilde çok formatlı sunabiliyor musunuz bunu test etmelisiniz.