---
title: "İçerik Yönetim Sistemleri"
slug: icerik-yonetim-sistemleri
date: 2006-04-03
url: http://mfyz.com/tr/icerik-yonetim-sistemleri/
tags: ["cms","içerik yönetim sistemi","PHP"]
category: PHP
migration: {"wpId":89,"wpPostDate":"2006-04-03T03:51:50.000Z"}
lang: tr
---

#### İçerik Yönetim Sistemi (Content Management System) nedir?

İçerik yönetim sistemleri aslında bir kodda olmazsa olmaz olan yönetim panelleri, yönetim sayfalarının belirli bir modül şekline getirilip, tek bir sistem altında güçlü yönetim PANEL'leri, kontrol mekanizmaları oluşturmayı ifade eder. Bizim anlayabileceğimiz şekli ile bir elektrik şebekesi için elektrik panosudur.

Şu an internette çok fazla ünlü/duyulmamış içerik yönetim sistemleri mevcut. Bunlardan en çok kullanılanlar, PHPNuke, Mambo, Durpal gibi artık stabilitesini ortaya koymuş kodlardır. Takibi çoğu açık kaynak kodlu olup kullanıcıları tarafından geliştirilmektedir. Ancak bu gelişim bildiğimiz yazılımlardaki kadar yavaş değildir, çünkü geliştirme ortamları oldukça esnektir.

İçerik yönetim sistemlerinin bazı temel özellikleri : Birkaç bağımsız kod yazdınız ve bunları birleştirip bir içerik yönetim sistemi elde etmek istiyorsunuz diyelim. Yapacağınız içerik yönetim sisteminin esnekliği yine sizin yazdığınız koda bağlıdır. Şu an yukarıda bahsettiğim bazı projeler template tasarımlar üzerine, eklenip/çıkarılıp aktif/deaktif edilebilir kodlar yani modül sistemini uygulamaktadır.

#### Nedir bu modül sistemi?

Modüller, kütüphaneleri, altyapısı hazır olan CORE dediğimiz sistem üzerine işini yapan kodlar olarak düşünülebilir. Yani anket modülü demek, var olan kütüphanelerdeki fonksiyonları/kod gruplarını aksiyonları kullanarak sadece anket oylama ve yönetimi işini yapan kod grubudur.

Burası mantıksal yapı idi, bu kısımdan sonra her yiğidin yoğurt yemesinin farklı olduğu gibi benim de kendime has kod/modül yapım var. Modül sistemimizi, genel klasör yapımızı buna göre oluşturduğumuzu varsayarsak, yapmamız gereken şey şu andan itibaren sitede görüntülenecek olan bölümlere ait modülleri moduller dizinine, bu modüllere ait işlem sayfalarını da islem dizine koymamız gerekiyor.

Şu anda işe yarayan bir modül sistemimiz, çalışan kodlarımız ve bu verileri taşıyan iyi dizayn edilmiş bir veritabanımız var. Yapmamız gereken kısım yönetim panelini tasarlayıp, yönetim modüllerini hazırlamak. İçerik yönetim sistemlerinin asıl kalbi burasıdır. Çünkü sistemimizi kod veya veritabanına dokunmaya gerek duymadan oldukça opsiyonel yönetmeyi sağlarlar.

Site dizinimizde admin adı ile bir dizin açıyoruz. Burada bir kullanıcı griş kontrolü yaptırmamız gerek. Bunu tek kullanıcı ile sınırlayabilir, ilkel bir kullanıcı girişi hazırlayabilir, var olan bir kullanıcı veritabanınızda kullanıcılara izinler vererek admin izin haklarını birden fazla kullanıcıya verebilirsiniz, daha da kasarak mfyz.com'da da uyguladığım bir teknik olan, işleme göre izinleri ifade eden bir kod sistemi ile kullanıcılara izinler verebilirsiniz. Bu giriş kontrolünü sağladıktan sonra site düzenimize uygun bir tasarımla bir panel hazırlıyoruz. Aynen site kısmında kullandığımız modül mantığını yönetim panelimiz için kullanıyoruz. Yani admin dizin yapımız içinde moduller, islem adlı klasörlerimiz mevcut.

Ben genel olarak anasayfa modülümde site hakkındaki bazı istatistikleri ve özet bilgileri veririm. İşlemler menüden seçilen özel modüller ile yapılır.

Örnek olarak bir modlü beraber hazırlayalım; Dökümanları yönetem modülümüz mesela, dökümanlar hem dökümanlar hem de döküman kategorileri olarak 2 parçada yönetiliyor, bunu ben 2 modül dosyasında yöneteceğim. Tabiki birbirlerinin üstlerinde birbirine geçiş için alt menü niteliğinde bir link olacak. Şuna benziyor işte :)

![](/images/archive/tr/2006/04/cms.gif)

Bu yapıyı 2 dakkada css destekli hazırlamak mümkün.. Şimdi burada yapılacak şeyler yukarıda göründüğü gibi basitçe düzenleme, silme işlemleri, bunları anlatmama gerek yok sanırım. Bunlarla ilgili diğer dökümanlara bakmalısınız.

Döküman yönetimi de bundan farklı olmayacak. basitçe bir tabloya kategori kategori dökümanları basıp düzenleme koyacaksınız. Ayrıca döküman yönetimi ve kategori yönetimide yeni kategori/döküman eklem sayfaları hazırlamak da gerekiyor.

Diğer modüllerinizi de buna göre hazırlıyorsunuz.

Şimdi tanınmış cms projelerinde var olan bir şeyden bahsedelim, modülleri sistemden ayırarak yüklenip kaldırılabilir hale getirmek. Bir modülün kullandığı dosyalar bellidir.

*   moduller,
*   islem,
*   admin/moduller ve
*   admin/islem

Klasörlerinde sayısı belli olan dosyalar ve bunun dışında mysql'de kayıtlı olan o module ait tablolar veya sistemde varolan ek YENİ klasörler olabilir (mesela galeri modülü için ek bir galeriler klasörü gibi).

Şimdi bunları bir liste haline getirirsek ve modülü bir paket şeklindebir zip içerisinde düşünün. bunlara ek olarak sadece bir islemler.txt koyalım. Ve kendi kuralımıza göre işlemlere bir kod verelim. Bu dosyadaki her satır yapılması gerekenleri kodlar ve parametrelerle sıralasın.

Meslea bizim yüklemede kullanacağımız işlemler nelerdir?

1.  taşıma ya da kopyalama diyebiliriz,
2.  sql çalıştırma,
3.  klasör yaratma
4.  dosya silme

bunların işlemler ve kodları olduğunu düşünürsek şöyle bir betik dosyamız olduğunu kurgulayalım.

```
1&admin_dokuman_kategorileri.php&admin/moduller/dokuman_kategorileri.php
1&admin_dokumanlar.php&admin/moduller/dokumanlar.php
1&dokumanlar.php&moduller/dokumanlar.php
1&dokuman_oku.php&moduller/dokuman_oku.php
1&dokuman_sil.php&admin/islem/dokuman_sil.php
1&dokuman_duzenle.php&admin/islem/dokuman_duzenle.php
.
.
.
2&tablolar.sql
4&tablolar.sql

```

betik dosyamız yani islemler.txt dosyamız bu olsun. Her satırı sırayla işleteceğiz değil mi sırayla işlemleri yorumlarsak şöyle bir işlem sırası çıkar;

1\. işlem : admin_dokuman_kategorileri.php dosyasını admin klasöründeki modüller klasörüne dokuman_kategorileri.php olarka kopyala, 2. işlem : admin_dokumanlar.php dosyasını admin klasöründeki modüller klasörüne dokumanlar.php olarka kopyala, ... 5. işlem : dokuman_sil.php dosyasını admin klasöründeki islem klasörüne dokuman_sil.php dosyası olarak kopyala ... Son 2 işlem ise tablolar.sql dosyasını sql olarak çalıştır ve ardından bu dosyayı sil olarak tanımlanıyor.

İçerik yönetim sistemine CORE modül olarka yazacağımız bir modülümüz var, bu da modül yükleme modülü. adı biraz garip oldu, :) ama yaptığı iş, indirdiğimiz modülleri hiç dosya kopyalama, sql çalıştırma gibi işlemlerle uğraşmadan modülleri tek tık ile kurmamızı sağlıyor. Var olan CMS sistemlerde bunu yapan her modülün kendi install.php'si var, ben bunu kurallaştırdım sadece, tabiki siz de install.php'ler ile de halledebilirsiniz.

İçerik yönetim sistemleri, "hadi içerik yönetim sistemi yazalım" diye geliştirilmez. Ortaya salt iş yapan kod çıkarılır, mfyz v0.5'e kadar olan kısım gibi, bu kod sadece ziyaretçilere hizmet verir. Yani yönetim panelleri, yönetime dair hiçbirşeyin olmadığını düşünürsek ortaya çıkan koddur. CMS'leri diğer projelerden ayıran kısım ise toplu bir yönetim panelidir. Ama unutmayın ki yönetim bir site için acil olan kısım değildir. Sitenin ana birimleri bittikten sonra kolayca geliştirilebilir birşeydir bu.

Çünkü genellikle kullandığımız yapılarda veriler mysql gibi bir veritabanı yönetmi yazılım tarafından saklanır, kodlar ise verileri işleyip kullanıcıya sunar. Verileri yöneten kodcukları yazmak çok zaman istemez çünkü kullanıcıya yönelik aşırı arabirim ve özellik içermesine gerek olmadığından hızlıca yazılabilir.

Onun için size önerim, öncelikle işini yapan kısmını bitirin sitenizin, ardından içerik yönetimine ait kısımları, panellerinizi yazarsınız. Veri sistemi yerine oturmadan yönetim kısmı ile uğraşırsanız, ilgilenmeniz gereken kod da, uğraşacağınız hata sayısı ve açık da artacaktır.