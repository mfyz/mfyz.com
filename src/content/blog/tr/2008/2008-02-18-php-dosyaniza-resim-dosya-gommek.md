---
title: "PHP dosyanıza resim (dosya) gömmek"
slug: php-dosyaniza-resim-dosya-gommek
date: 2008-02-18
url: http://mfyz.com/tr/php-dosyaniza-resim-dosya-gommek/
tags: ["base64","decode","dosya","embed","encode","php"]
category: PHP
migration: {"wpId":136,"wpPostDate":"2008-02-18T21:44:08.000Z"}
lang: tr
---

#### Böyle birşeye neden ihtiyaç duyarsınız?

En büyük nedeni, tek dosyadan oluşan bir script yazıyor olabilirsiniz (konuyla ilgili olarak [PHP ile tek dosyadan oluşan proje üretmek](https://tr.mfyz.com/tek-dosyali-projeler-siteler-uretmek/) dökümanını okuyabilirsiniz). Ya da yazdığınız projede kullandığınız ufacık ikonların bir sürü dosya şeklinde durmasını istemiyor olabilirsiniz. Başka bir tercih de dosyalarınızı bir veritabanında tutuyormuşcasına tek dosyada depolamak isteyebilirsiniz. Çok küçük boyutlu resimler için bahsettiğim konu daha yaygın kullanılır. Yani yazdığınız betik kendi içindeki css kuralları ile şekillendirilmiş, ikonlarla da güçlendilirmişse ve ikonlar için ek dosyalar koymak istemiyorsanız bu yöntemi kullanabilirsiniz.

#### Teknik

Aslında yapılan iş oldukça basit. Öncelikle dosyalarımızı php dosyamızın içine nasıl gömeceğiz? PHP dosyalarımız ascii dosyalar, binary içeriği alabilmek ve saklayabilmek için base64 ile şifreleyeceğiz. Sonuçta ortaya çıkacak olan şey bir ascii şifre olacaktır. Dosya boyutuna göre bu şifrenin uzunluğu artacaktır. Unutmayın ki bu anlattığım yöntem tamamen ufak dosyaları gömmek içindir 100kb üzeri dosyaları php dosyanıza gömerseniz, ya da php dosyanızın boyutu megabyte'ları aştığı zaman işlenmesi zorlaşacaktır. Birkaç ufak dosya için kullandığınız sürece verimli olacaktır. Dosyalarımız encode etmek için bir kod kullanacağız. Bu işlemi başka bir php dosyası oluşturarak yapın.
```
<?php
$dosya = 'resim.gif';
// dosya icerigini okuyalim
$dosya\_binary = fopen($dosya, "r");
$icerik\_binary = fread($dosya\_binary, filesize($dosya));
fclose($dosya\_binary);
// binary icerigi ascii'ye base64 ile cevirelim
$icerik\_ascii = base64\_encode($icerik\_binary);
print $icerik\_ascii;
?>

```
Bu kod resim.gif dosyasını ekrana ascii karakterlerle şifrelenmiş şekilde uzun bir metin şeklinde basacaktır. Bu metini kopyalayarak kullanacağız ve orjinal proje dosyamız şöyle olacak
```
// dosyalar
$dosyalar\["resim.gif"\] = "R0lGODlhEAAQAMQAAGZmZsbGxaSko4OEgxl4ueT//3G59ejo6Lu7u9zd3".
                         "DOMxXp6eqjU/5mZmX+RmdPU1LKzsfb29v///3u75a2tpY6OjczMzDqPz6".
                         "ysq////wAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABkALAAAAAAQABAAAAW".
                         "JYIaNJDlNWZpiUuu2U4GqrHPd+MTItHQZEoPQoNvNWISkkjBROBUpgQQT".
                         "qVojj6wgOg0IAAEAQBBgbTMNiSCRALDDCWkjlRYcDoBD+C5PVSQNCAgAg".
                         "wKCaRV+gBZfYWIWiCkDEhVslpZ/AykLlBCen55/C5sSAw2nqKeToxmcL6".
                         "8trAuztLW1GSEAOw==";

```
Yukarıda gördüğünüz şey aslında çok uzun bir string. Yani o satırlar yan yana bitişik fakat ben bu dökümanda açıkca görülebilmesi için bu hale getirdim. Bu gördüğünüz string 258 byte'lık 16x16'lık bir ikonun base64 şifresidir. 258 byte'ın bu kadar sürdüğünü düşünürseniz 10-20kb'lık bir dosyanın ne kadar uzun süreceğini tahmin edebilirsiniz. Onun için büyük dosyalarınızı php dosyanıza gömmeyin. Yukarıdaki şekilde tüm dosyalarınızı base64\_encode'dan geçirip $dosyalar dizisine dosyanın adını taşıyan indiste yazın. Unutmayın bu dizi proje dosyanızın en üstünde tanımlanmalı. Yani proje dosyanızın içinde her türlü işlemi yapıyor olabilirsiniz ama bu teknikteki kodlar dosyanın en üstünde durmalı. Neyse, dosyalarınızı $dosyalar dizisine kendi adları indis olacak şekilde kaydettiniz. php dosyanızın boyutu kabardı farkındaysanız (kontrol ediniz). Şimdi bu tanımların ardına ufak bir kod ile işlemi bitireceğiz.
```
if( $\_GET\["islem"\] == 'dosya' ){
  if( array\_key\_exists($\_GET\["dosya"\], $dosyalar) ){
    die( base64\_decode( $dosyalar\[ $\_GET\["dosya"\] \] ) );
  }else{
    die("Dosya bulunamadı!");
  }
}
// projenizin normal işlemlerini bu satırdan sonra
// yapabilirsiniz.

```
Eğer get methodu ile islem değişkeni dosya olarak gelmişse ve get methodu ile dosya değişkeninin içeriği bizim $dosyalar dizisinde indis olarak varsa $dosyalar dizisindeki o elemanın içeriğini base64\_decode edip ekrana basıyoruz. Yoksa dosya bulunamadı hatası verip duruyoruz.

#### Nasıl kullanacaksınız?

Projenin devamındaki bir kısımda
```
<img src="index.php?islem=dosya&dosya=resim.gif" ...>

```
şeklinde kullandığınızda dosyanız resim olarak görüntülenecektir. Aynı şeyi bir arşiv dosyası için de yapabilirsiniz.
```
<a href="index.php?islem=dosya&dosya=kurulum\_dokumani.pdf">Dosyayı indirmek için tıklayın</a>

```
gibi.

#### Dosya deposu

Yukarıdaki kodları ayrı bir dosya olarak kaydedip dosyalarınızı tek parça hale getirdiğiniz bir veritabanı gibi düşünebiliriz. Yani
```
<?php
// dosyalar
$dosyalar\["..."\] = "....";
$dosyalar\["..."\] = "....";
// gosterelim
if( array\_key\_exists($\_GET\["dosya"\], $dosyalar) ){
  die( base64\_decode( $dosyalar\[ $\_GET\["dosya"\] \] ) );
}else{
  die("Dosya bulunamadı!");
}
?>

```
Bu dosyaya goster.php, resimler.php veya indir.php diyebilirsiniz. Kullanırken yukarıda index.php olarak gösterdiğimiz yola dosyanızın adını yazın. Ayrıca islem=dosya parametresine de gerek kalmadı çünkü bu dosya zaten sadece bu işi yapıyor :) Çok fazla işinize yarar mı bilmiyorum ama yine de bazı yerlerde kullanılan bir teknik olduğu için paylaşma gereği duydum. Umarım faydası dokunur.