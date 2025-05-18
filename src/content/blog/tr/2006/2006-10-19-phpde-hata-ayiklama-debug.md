---
title: "PHP'de Hata Ayıklama (Debug)"
slug: phpde-hata-ayiklama-debug
date: 2006-10-19
url: http://mfyz.com/tr/phpde-hata-ayiklama-debug/
tags: ["debug","error","hata","PHP"]
category: PHP
migration: {"wpId":112,"wpPostDate":"2006-10-19T03:50:53.000Z"}
lang: tr
---

#### Debug Nedir?

Debug'un Türkçe karşılığı hata ayıklama'dır. Hata ayıklamak program/betiğimizde bulunana hataları hızlıca tespit edebilmektir. Bunun çalışmamızdaki hızımızı doğrudan etkileyen sebeplerden olduğunu bilmemiz gerekir.

#### Neden Debug yapmaya ihtiyacımız var?

Bir problemle karşılaştığımızda çözümünü hızlı bulamazsak projemiz bilemeyebileceğimiz süre kadar uzar. Problemi bir dakkada da çözebilir günler/haftalar da harcayabiliriz. Bazen de kafamızda karmaşıklaştırdığımız hatalar bazen gözden kaçan çok küçük hatalar, hatta yazım hataları bile olabilir. Kodumuzda debug teknikleri ile yanlış olan kısımı veya hatalı kodu hızlıca tespit edebilir, sorunun çözümünde oldukça hızlı davranabiliriz.

Bu dökümanda size web pogramlama üzerinde php ve mysql ile oluşan örneklerle anlatacağım, ancak bunlar bir teknik olduğundan her türlü dilde uygulamanız oldukça koalydır.

#### Peki nasıl yapacağız? Nereden başlayacağız?

Genelde sorunların yarısına yakını fonksiyonlarımıza gönderdiğimiz, veya kullandığımız birleşik yapılardaki değişkenlerin bir şekilde boş gelmesi ile oluşan sorunlardır. Bunları birkaç farklı yöntemle tespit edebiliriz. Mesela bir SQL sorgusu hata veriyor veya boş dönüyorsa bunun nedenlerinden ilk bakmamız gereken SQL'e soktuğumuz değişkenlerin değerlerinin doğru iletiliyor olmasıdır. Genellikle değişken adlarında (o programlama dili küçük büyük harf duyarlılığına sahip ise) büyük - küçük harflerin yanlış yazımı ile ortaya çıkan sorunlar teşkil ediyor. Örneğin:

```
<?php
  $kategori = $_GET["kategori"];
  $sorgu = mysql_query("select * from tablo where kategori=" . $kategori);
  // diğer mysql işlemleri
?>

```

Burada SQL hata veriyorsa veya boş dönüyorsa ilk olarak $kategori değişkeninin düzgün iletilip iletilmediğini kontrol etmemiz gerekir. Eğer $kategori değişkeni boş ise SQL doğal olarak parse hatasi verecektir.

```
<?php
  $kategori = $_GET["kategori"];
  print $kategori;
  exit;
  $sorgu = mysql_query("select * from tablo where kategori=" . $kategori);
  // diğer mysql işlemleri
?>

```

Burada basitçe $kategori değişkeninin içeriğini bastırıp exit ile kodu durdurabilir, deneyerek içeriğinin doğruluğunu/yanlışlığını görebiliriz. Diyelim ki birden çok değişkeni kontrol etmemiz gerek, hızlı debug edebilmek için tüm değişkenleri tek tek print ettirmektense;

```
<?php
  $kategori = $_GET["kategori"];
  print_r($GLOBALS);
  exit;
  $sorgu = mysql_query("select * from tablo where kategori=" . $kategori);
  // diğer mysql işlemleri
?>

```

Dizi olarak tüm değişkenlerin listesini alarak hızlıca kontrol edebiliriz. Tabiki hatalarınızı kendinize uyarlayarak kullanıcının altyapısal olarak hata görmesini engelleyebilirsiniz. Hataları fonksiyonların başına @ işareti koyarak gizleyebilirsiniz. Mesela bir bölme işlemi ve

```
$deger = $d1 / $d2;

```

iken $d2 eğer 0 ise "devision by zero" hatası alırsınız. Bunu koalyca gizlemek için;

```
$değer = @($d1 / $d2 );

```

şeklinde kullanıyor olmamız yeterli olacaktır.

Eğer değişkenlerimizde bir sorun yoksa diğer bir aşamaya geçeriz, Fonksiyonlara özel hatalar, fonksiyonlar bazı değerleri TAM ister. Örneğin explode fonksiyonu ilk 2 parametre olmadan çalışmaz; ve burada asıl dikkat edilmesi gereken nokta ilk parametrenin string ikincisinin de string olmasıdır. Eğer 2. değişken dizi ise fonksiyon hata verecektir. Değişken tiplerinin de düzgünlüğüne dikkat edilmesi gerekir.

Eğer bunu da aştıysak gelelim çıktı problemlerimize. Mesela karmaşık bir tablo yapısının ortasına daha da karmaşık bir tablo bastırıyorsunuz. Çıktıyı basan php kodunuzda hiçbir sorun yok ama kodu yavaş yavaş geliştirdiniz ve en son kısımlarda bi noktada HTML yapısı sapıttı; tabiki siz de sapıtırsınız :D Burada kolayca son değişikliklerinizi yaptığınız satırları koddan uzaklaştırarak kolayca sorunu görebilirsiniz. Ya da; HTML'inizi bozan bir kodu büyük bir kodda hızlıca bulmak için, Bozabilecek kısımlardan bağımsız olan kodları geçici olarak multi-line comment yaparak o kısımların basılması veya basılmaması HTML yapınızı etkiliyor mu? Bunu ölçerek yapıyı bozan kodu bulana kadar deneme aralığınızı değiştirebilir veya daraltıp genişletebilirsiniz.

#### Hazır debug araçlarını kullanın!

Genellikle modern dillerin hepsinde debug'a yönelik kolaylıklar vardır, bunlardan bazıları kullandığınız dilin debug için ayarlamaları vardır. Hata çıktılarını düzenleme, hataları kodlara dönüştürme gibi. Bu ayarlardan faydalanabilirsiniz.

**PHP'de debug için yapabileceğimiz ayarlamalardan:**

**display_errors = On** ile hataları gösterimini açıp kapayabilirsiniz. Açık tutmanız önerilir. **log_errors = On** ile hataları günlüklere kaydettirebilir ve oradan inceleyebilirsiniz.

Gelelim en önemli kısıma, hangi hataların çıktı verileceğini belirlemeye. error_reporting = E_ALL & ~E_NOTICE E_ALL : Tüm hata ve uyarılar. E_ERROR : Sadece çalışma hataları. E_WARNING : Sadece uyarılar. E_PARSE : Yazım hataları. E_NOTICE : Notlar, Bu uyarılar çalışmayı engelleyen sorunlar değildir. Sadece programsal yanlışları içerir. & işareti ayraç, ~ işareti de tersi anlamına gelir. Yukarıdaki "E_ALL & ~E_NOTICE" örneğe göre notlar dışındaki tüm hatalar görüntülenir.

Ayrıca hata çıktılarını kendi stilinizde yapabilirsiniz : error_prepend_string = "<font color=ff0000>" ile hata başlangcına belirtilen kodu, error_append_string = "</font>" ile de çıktının sonuna belirttiğiniz kodu ekleyebilirsiniz. Bu örnekte hata çıktısı kırmızıya boyanacaktır.

Buna benzer çoğu dilin hata çıktıları ile oynayabilme, hata loglama gibi debug'a yardımcı özellikleri vardır.

#### Çıktıları iyi anlamak

Çoğu arkadaş çıktıları okumakta zorlanıyor. Çoğu dilde hata çıktıları neredeyse bütün sorunu size yansıtır. Çözümü de aslında o hatalardadır. Eğer anlamadığınız sorunlar var ise.. Çalıştığınız dosya, hata satırı gibi özel kısımları kesip, sadece çıktıyı google'da aratarak çözüme oldukça yüksek oranda ulaşabilirsiniz.

#### Baştan Düşünmek?!

Önünüze çıkacak hataları düşünerek kod yazmak her zaman en hızlı çözüme ulaşmaya çook yardımcı olur. Mesela çalıştığınız kod fazlasıyla uzun ise daha bol açıklama koyun. Kesinlikle auto ident'a dikkat edin. Kodunuzda boşluklara ve boş satırlara çok yer verin. Sık kod yerine birbirinden ayrıştırılmış gruplu kod yazmaya çalışın. Sadece 2 örnek vereceğim size ve aradaki okunabilirlik farkını görün :

```
<?php
# bilgiler
  $ad       = $_GET["ad"];
  $eposta   = $_GET["eposta"];
  $fotograf = $_FILES["resim"];
# tanimlar
  $kaynak   = array('ad'   , 'eposta'   , 'fotograf');
  $bilgiler = array(' ... ', ' ...@... ', ' ... '   );
# kayit
  mysql_query("update bilmemne falan fe$mekan ... ")
       or die("Hata!");
# son
  if( ... bilmemne ... ){
    if( ... baska ... ){
      // basarisiz
      print '<script>alert("Hata!");bitti();son();</script>';
      exit;
    }else{
      // bitti
      print '<script>alert("Okey");window.top.location="vs vs..";</script>';
      exit;
    }
  }
?>

```

Diğeri ise şöyle:

```
<?php
$ad = $_GET["ad"];
$eposta = $_GET["eposta"];
$fotograf = $_FILES["resim"];
$kaynak= array('ad','eposta','fotograf');
$bilgiler = array(' ... ',' ...@... ',' ... ');
mysql_query("update bilmemne falan fe$mekan ... ") or die("Hata!");
if( ... bilmemne ... ){
  if( ... baska ... ){
    print '<script>alert("Hata!");bitti();son();</script>';exit;
  }else{
    print '<script>alert("Okey");window.top.location="vs vs..";</script>';exit;
  }
}
?>

```

Hangisinin daha hızlı görüleceğini şu an daha rahat görebilirsiniz. Çıktılarda satırı konumu herşeyi yazabilir ancak yeterli grulama, ident, açıklama kullanmadıysanız görmeniz güçleşecektir. Kesinlikle dosya boyutu paranoyasına kapılmayın çünkü bir 10K'lık kodunuza 2 kat boşluk koysanız bile yani her 10 boş satırda bi dolu satır şeklinde, anca dosyayı 2 katına çıkarırsınız. Okunma hızında milyonda 1 degerinde bir süre farkı olacak ve yorumlamada hız farkı olmayacaktır :) onun için yazabildiğiniz kadar açıklama ve rahat görünümlü kod yazın.