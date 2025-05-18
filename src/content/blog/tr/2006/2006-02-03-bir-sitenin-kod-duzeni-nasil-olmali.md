---
title: "Bir sitenin kod düzeni nasıl olmalı?"
slug: bir-sitenin-kod-duzeni-nasil-olmali
date: 2006-02-03
url: http://mfyz.com/tr/bir-sitenin-kod-duzeni-nasil-olmali/
tags: ["NULL","PHP"]
category: PHP
migration: {"wpId":87,"wpPostDate":"2006-02-03T06:15:40.000Z"}
lang: tr
---

_Öncelikle şunu belirteyim, genel uyguladığım bir sistematiğim var ve bunu sizinle paylaşmak istiyorum. Çoğu template yapısına benzer bişey. Zaten çoğu arkadaşımın aşikar olduğu bir konudur bu._

#### Bir php site projesinin üretim sırası

Öncelikle sitedeki herşeyimiz bir php dosyası olarak kodlanmalı. Statik sayfalar için bile bir genelleme yaparak daha az kod daha az efor ile daha rahat bir çalışma çıkarabiliriz. Öncelikli düşünmemiz gereken şey dizin yapımızdır.Verilerimizle kodlarımızı kesinlikle ayırmamız gerekir. Mesela sitemizde dosyalar ve fotograflar diye iki bölümümüz olacak. Bunlara ait dosyaları kesinlikle kod ile karmaşık dizinlere koymayız. Veri adlı bir dizinimizin alt dizinlerine yerleştirebiliriz mesela.

#### Bu neden gereklidir?

Çünkü kodlardaki değişimleri HIZLI yükleyip yedeklerini alabilmek için tüm site dizinimizi upload edip download etmemize gerek kalmaz. Toplam 1mb olan kodu güncellemek için 30mb olan tüm site dosyalarının transferi için zaman kaybetmemiş oluruz.

İkinci düşüneceğimiz şey ise tasarımı nasıl şekillendireceğimizdir. Yani, her sayfada sabit olan kısımlarımız vardır. Ve değişken kısımlarımız. Mesela bu site için düşünürsek, üstteki menü, sol sütun ve alt kısım her sayfada mevcuttur.

Ben ilk başladığımda sabit şu dizinleri oluştururum;
```
Site
 |
 |- <dir> resimler
 |- <dir> moduller
 |- <dir> islem
 |
 '--- index.php
   |- stil.css
   '- ayar.php

```
Bu yapının önemini dökümanın sonuna doğru anlayacaksınız. Şimdi ön açıklamaları yapayım; Sitenizdeki bütün resimleri yani materyal olan resimleri resim adlı dizinde alt dizinler içerisinde tutmanızı öneririm. Mesela bölümlerdeki farklı resimleri resim dizininde o bölümle ilgili dizin içerisinde saklayın. Böylece resimlerinizi ileriki sürümlerinizde daha rahat takip eder/yönetebilirsiniz.

#### Ayar dosyasının önemi!

Bir php projesi için ayar dosyasında her türlü site detayları mevcuttur. Hanig sayfada ne kadar limitle listeleme yapılacağıi mysql ayarlarınız, izin ayarlarınız, veri dizin yollarınız. Çok genişletilebilecek ayarlar mevcuttur. Daha önce bu konuda bir döküman yazdım, php dökümanları bölümünde var.

#### Modül mantığı nedir?

Sitemizde farklı bölümlerde farklı php görevlerimiz olacaktır değil mi?, şimdi şöyle düşünün, bütün sayfalar sitenin değişken bir noktasına uygun HTML kod üretir. Bütün projelerde sistem böyle çalışır. Genellikle benim anlattığım sistemin tersi uygulanır ve her php sayfasında menu.php footer.php'ler yüklenir. Boylece değişken kısım farklılığa göre yüklenmez, her sayfa kendi işini yapar ve statik kısımları çağırır. Benim bahsettiğim sistemde ise şöyledir. Bütün site index.php üzerinde oynar. get methodu ile module adlı bir değişken alalım her linkte. bu değişkenin içeriğine ait modulu seçen bir dosyamız vardır. Ya da bu kısım index.php'nin içinde de mevcut olabilir. Örneğime göre dosyalar, galeri, dokumanlar diye 3 bölümümüz olsun. Bir de anasayfaya ait kodu üreten bir modülümüz olacak tabiki. index.php'de şu kısım olmalı mesela;
```
$modul = $_GET["modul"];
# modul secme mekanizmasi
  if( $modul == 'dosyalar' ){
    $modul_dosyasi = 'dosyalar.php';
  }else if( $modul == 'galeri' ){
    $modul_dosyasi = 'galeri.php';
  }else if( $modul == 'dokumanlar' ){
    $modul_dosyasi = 'dokumanlar.php';
  }else{
    // eger modul belirtilmemisse veya
    // gecersizse anasayfa modulu yuklensin.
    $modul_dosyasi = 'anasayfa.php';
  }

```
Şimdi menüdeki linkleri buna göre düzenlemeliyiz.

Dosyalar: index.php?modul=dosyalar Galeri: index.php?modul=galeri Dökümanlar: index.php?modul=dokumanlar

Artık modul_dosyasi değişkeni seçili modülü belirlemektedir. Şimdi şöyle düşünelim. mfyz.com'da sadece şu anda okuduğunuz yazının bulunduğu orta kısım değişmektedir. Diğer kısımlardaki küçük değişimlere geleceğim. Bu orta kısımda sadece 1 adet değişken print ettiriliyor. $icerik diye bir değişken. Bu değişkeni ise modul dosyaları oluşturuyor. Diyelim ki BASİT bir tablo içeriyor bir bölümünüz. Mesela örneğe göre olan dosyalar bölümünde basit bir liste var. Şimdi burada dosyalar.php modülü sadece bu basit olan tabloyu print ettiriyor. biz index.php'de print ettirilen bu tabloyu ortaya yerleştiriyoruz. Sistem bu şekilde işliyor. Siz statik bir sayfa yapmışsanız bile bunu modül dosyası olarak tanıtıyorsunuz ve modül seçildiğinde basılması gereken yere statik içerik basılıyor.

#### Bunun avantajları neler?

Modül dosyaları asıl dosyalardan bağımsız yazıldığı için kod kalabalığı olmuyor. Yani 1000 satırlık tek dosyada çalışmakla 10'ar satırlık 100 dosyada çalışmak gibi.. Siz dosyalar modülünü yazarken dosyalar modülü dosyasında sadece o işi yapan kod bulunuyor. Ekrana basarken çok fazla şey düşünerek basmıyorsunuz. İş basitleşiyor. Sitenizin statik kısımlarında yapacağınız değişimler sizin için çocuk oyuncağı olmuş oluyor. Yaptığınız yeni bir eklentiyi, mesela footer'ınıza yerleştireceğiniz bir banner exchange kodunu index.php'nizde oynayarak rahatlıkla işin içinden sıyrılabiliyorsunuz. Bölümler $module değişkeni ile kolaylıkla da seçilebiliyor.

Bölümleriniz çoğaldıkça bu sistemin artılarını daha rahat görebiliyorsunuz :) Ben şu an mfyz.com'da mükemmel rahat ediyorum. Çok rahat siteye entegre şeyler yazıp bölümleri değiştirebiliyorum. Mesela yeni bir kod buldunuz ve dosyalar bölümünü bu şekilde yapmak istiyorsunuz, yapacağınız şey css'leri ile oynayıp modul olarak tanıtmanız, bu kadar.

Uygulamalı bir örnek olmadı özür dilerim ama yine de size yol gösterici bir döküman olduğundan eminim :)