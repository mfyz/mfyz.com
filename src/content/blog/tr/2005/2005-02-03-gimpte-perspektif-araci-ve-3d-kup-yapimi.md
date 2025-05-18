---
title: "Gimp'te Perspektif aracı ve 3d küp yapımı"
slug: gimpte-perspektif-araci-ve-3d-kup-yapimi
date: 2005-02-03
url: http://mfyz.com/tr/gimpte-perspektif-araci-ve-3d-kup-yapimi/
tags: ["3d","gimp","howto","küp","perspektif","Tasarım"]
category: Tasarım
migration: {"wpId":58,"wpPostDate":"2005-02-03T08:41:27.000Z"}
lang: tr
---

#### Perspektif aracı nedir, ne işe yarar?

Gimp ana penceresindeki ![](/images/archive/tr/2005/02/gmp_pp_icon.gif) ikonuna tıkladığınızda çıkan araç perspektif aracıdır. Bu araç sayesinde yaptığımız yüzeyleri, çalıştığımız fotografları perspektif açıdan oynayabiliyoruz. Yani, bir yüzeyi gerçekte nasılsa öyle görünüm kazandırıp düzeltebiliyoruz. Bu dökümanda perspektif aracını kullanarak 3 boyutlu bir küp yapacağız.

#### 3 boyutlu küp nasıl görünür?

Bir küp bilindiği gibi 6 kare yüzeyden oluşan bir cisimdir. Biz gerçekte bu cisimlerin en fazla 3 yüzeyini görebiliriz. Bir küp'e köşesinden baktığımızda ne görürüz? 3 tane perspektif görünümlü kare görürüz. Gimp'te yapacağımız tek şey kare ve dikdörtgenleri perspektif aracı ile kenarları eşleşecek biçimde ayarlamak olacaktır.

Öncelikle kendimize küpün yüzeyinde kullanacağımız bir efekt seçmemiz gerek. Bu bir desen, sade bir renk veya geçiş efekti verilmiş bir yüzey olabilir. Gölgelendirmenin gerçekliği açısından geçiş efekti verilmiş yüzey daha çarpıcı olacaktır. Şimdi geçiş efekti verilmiş bir yüzey'e sahip küp'ü yapmaya başlayalım.

Öncelikle beyaz artalanlı boş bir çalışma belgesi açalım. Ardından kare bir seçim yaparak buraya geçiş efekti uygulayalım.

![](/images/archive/tr/2005/02/gmp_pp_1.jpg)

Geçiş efektini uyguladıktan sonra hemen seçimi sıfırlamıyoruz; perspektif aracını seçiyoruz ve seçili alana tıkladığımızda klavuz ızgarası çıkacak. Bu ızgarayı küp'ün görünen yan parçası şekline sokuyoruz. Aşağıdaki gibi yani..

![](/images/archive/tr/2005/02/gmp_pp_2.jpg)

Perspektif aracının penceresinde Transform butonu var, ona tıkladığımızda eskiden seçili alana bu perspektif görünüm uygulanacaktır. Daha önce seçili olan alan Background katmanına ait olduğu için Background katmanının o kısmı silinmiş gibi olacaktır.

![](/images/archive/tr/2005/02/gmp_pp_3.jpg)

Şu an perspektif hale getirdiğimiz alan seçili durumda, bunun nedeni transform edilmiş bu katman daha bir katmana oturtulmadı. Biz bunu yeni bir katmana oturtacağız. Bunun için katman (layer) panelindeki Transformation yazan katmana çift tıklayıp istediğimiz ismi gireceğiz. Bu katmana yan adını verelim.

![](/images/archive/tr/2005/02/gmp_pp_4.jpg)

Şimdi Background katmanını tekrar tamamen beyaz ile dolduralım ve yan katmanını biraz sola taşıyalım.

![](/images/archive/tr/2005/02/gmp_pp_5.jpg)

Gelelim önde görünecek yüzeye. Aslında aynı işlemleri yapacağız.. Öncelikle yan katmanının sağındaki boş alana tekrar bi kare seçimi yapıyoruz.

![](/images/archive/tr/2005/02/gmp_pp_6.jpg)

Seçtiğimiz alana geçiş efekti veriyoruz.

![](/images/archive/tr/2005/02/gmp_pp_7.jpg)

Seçimi sıfırlamadan perspektif aracı ile daha önce yaptığımız yan yüzeye yapıştırarak uygun görünümü ve perspektifi veriyoruz.

![](/images/archive/tr/2005/02/gmp_pp_8.jpg)

Perspektif aracının penceresinden transform ile perspektifliği uygulatıyoruz. İşlem Background katmanı üzerinde yapıldığı için o kısım silinmiş gibi oluyor,

![](/images/archive/tr/2005/02/gmp_pp_9.jpg)

Katman penceresinden Transformation'u çift tıklayıp ön adını veriyoruz. Background katmanını tamamen beyaz ile dolduruyoruz.

![](/images/archive/tr/2005/02/gmp_pp_10.jpg)

Tekrar aynı işlemlerle de üst yüzeyi yapacağız. Bu katmanları kitleyip biraz alta taşıdık böylece daha rahat çalışabileceğiz. Üstteki boşluğa dikdörtgen seçim yapıp geçiş efekti veriyoruz.

![](/images/archive/tr/2005/02/gmp_pp_11.jpg)

Seçimi perspektif aracı ile daha önce yaptığımız iki yüzeye uyduruyoruz.

![](/images/archive/tr/2005/02/gmp_pp_12.jpg)

Uygulayıp katman adını verip Background'u beyazla kalayıp işlemimizi bitirmiş oluyoruz. Sonuç :

![](/images/archive/tr/2005/02/gmp_pp_13.jpg)

İşte mükemmel bir küp, artalanı transparan yapıp png export edildiğinde çok güzel bir ikon olabilir :) Kenarlardaki küçük hataları hangi yüzeyler arasında ise o yüzeylerden birini tekrar perspektif düzenleyerek birbirine daha uyumlu hale getirebilir, bu küp şeklinin maskesinin izdüşüm gölgesini alıp yerde duruyormuş efekti verebilirsiniz...