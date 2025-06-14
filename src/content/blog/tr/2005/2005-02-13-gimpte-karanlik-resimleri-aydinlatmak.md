---
title: "GIMP'te Karanlık Resimleri Aydınlatmak"
slug: gimpte-karanlik-resimleri-aydinlatmak
date: 2005-02-13
description: "GIMP kullanarak karanlık çıkmış fotoğraflardaki bölgeleri nasıl aydınlatacağınızı öğrenin. Bu rehber, Threshold, katman maskeleri ve Brightness-Contrast araçlarıyla fotoğraflarınızı iyileştirme adımlarını gösterir."
url: http://mfyz.com/tr/gimpte-karanlik-resimleri-aydinlatmak/
tags: ["GIMP", "fotoğraf düzenleme", "resim aydınlatma", "karanlık fotoğraf", "Threshold", "katman maskesi", "Brightness-Contrast", "görüntü işleme", "Tasarım", "eğitim"]
category: Tasarım
migration: {"wpId":60,"wpPostDate":"2005-02-13T08:59:40.000Z"}
lang: tr
---

Bazen fotoğraf makinenizin lensine doğrudan güneş gelebilir veya ışığın gelme açısına göre çektiğiniz konum yanlış olabilir. Bu resimler genellikle ışık saçan objelerin belirgin, diğer kısımların karanlık kaldığı resimlerdir. Aslında sadece tonlardan dolayı biz öyle görürüz. Küçük bir çalışma ile ne kadar değişeceğini göreceksiniz.

Resmimizi açtıktan sonra bulunduğu katmanı hemen kopyalıyoruz, orjinal olan en altta kalacak şekilde çalışacağız.

![](/images/archive/tr/2005/02/gmp_kra_1.jpg)

Kopyaladığımız katmana **Layers > Color > Treshold**'dan aşağıdaki ayarlara yakın veya resime göre ışık veren objelerin rahat seçilebilmesi için siyah beyaz dengesini oluşturuyoruz.

![](/images/archive/tr/2005/02/gmp_kra_2.jpg)

Ardından ![](/images/archive/tr/2005/02/gmp_ykk_icon.png) (renge göre seçme) aracı ile beyaz alanralı seçiyoruz ve seçimi çevirip siğer alanları seçmiş oluyoruz.

![](/images/archive/tr/2005/02/gmp_kra_3.jpg)

Orjinal katmanımızdaki seçili alanı kopyalayıp üst seviyede bir katmana yapıştırıyoruz.

![](/images/archive/tr/2005/02/gmp_kra_4.jpg)

Bu treshold yaptığımız katmanı artık silebiliriz veya gizliyoruz.

![](/images/archive/tr/2005/02/gmp_kra_5.jpg)

Şimdi bu koyu olan bölgeleri yapıştırdığımız katmanı maskelleme methodu ile resimin yapısına göre geçiş efekti vererek değişimin tüm resimde daha yumuşak olmasını sağlıyacağız.

![](/images/archive/tr/2005/02/gmp_kra_6.jpg)

Maskelemeyi uyguladıktan sonra yine aynı katmana **Layers > Colors > Brightness-Contrast** panelini açıp değerleri daha sertleştirerek resimdeki koyu bölyelerin rengini açmış oluyoruz.

![](/images/archive/tr/2005/02/gmp_kra_7.jpg)

Ne kadar çok sertleştiriseniz o kadar çok açılır. Resme uygun değerleri verip uyguluyoruz. Sonuç aşağıdaki gibi oldu.

![](/images/archive/tr/2005/02/gmp_kra_8.jpg)

Orjinal resim de şöyle idi

![](/images/archive/tr/2005/02/gmp_kra_1.jpg)

Gördüğünüz gibi, resim oldukça canlandı.. Birkaç uygulama ile kolayca kavrayabilirsiniz. Unutmayın bu kadar çok panel ve ayar kurcalamak için var :)