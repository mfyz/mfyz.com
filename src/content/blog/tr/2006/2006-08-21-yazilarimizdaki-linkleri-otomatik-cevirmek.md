---
title: "Yazılarımızdaki Linkleri Otomatik Olarak HTML'e Çevirmek"
slug: yazilarimizdaki-linkleri-otomatik-cevirmek
date: 2006-08-21
description: "PHP'de düzenli ifadeler (regex) kullanarak metin içerisindeki URL'leri ve e-posta adreslerini otomatik olarak tıklanabilir HTML linklerine nasıl dönüştürebilirsiniz? Pratik `preg_replace` örnekleri."
url: http://mfyz.com/tr/yazilarimizdaki-linkleri-otomatik-cevirmek/
tags: ["PHP", "regex", "düzenli ifadeler", "preg_replace", "otomatik linkleme", "metin işleme"]
category: PHP
migration: {"wpId":91,"wpPostDate":"2006-08-21T04:36:09.000Z"}
lang: tr
---

Yazıya dalmadan önce kısa bir terim açıklaması yapmayı yanlış görmüyorum;

#### Regex (Regular Expressions : Düzenli İfadeler) Nedir?

Bütün programlama dillerinde kullanabileceğiniz çok iyi düşünülmüş bir kural mekanizmasıdır. İlk baktığınızda "bunun neresi düzenli, tam tersine bu şey oldukça düzensiz görünüyor" diyebilirsiniz. Çünkü gerçekten düzensiz görünen karakter grubudur. Regex (Regular Expressions'un genel olarak kısaltması regex olarak kullanılır) bizim metinlerimiz içerisinden belirlediğimiz kurallara benzeyen metin parçalarını seçmemizi; kullandığınız dile göre değiştirmemizi de sağlayabilir. Mesela bir e-posta'nın doğru olabilirlik kuralları vardır. Sitenizde girilen epostaları bu şekilde doğru veya yanlış formatta olup olmadıklarını kontrol edebilirsiniz. Bu dökümanda otomatik olarak linkleri nasıl çevireceğimizden bahsedeceğim.

Metinlerde girilen şeylerin link olup olmadıklarını bazı mantıksal kurallara göre bölelim mesela bir link önce protokolü ile başlar "http://" "ftp://" "ssh://" "file://" vb gibi. Bu başlangıçlar bize girilen şeyin link olduğunu gösterebilir. Aynı şekilde hızlı yazımla birlikte "www." ile başlayan şeyler ".com" ile biten şeyler de bize link olarak seçmemizi sağlayacak kriterler.

PHP'de regex fonksiyonları olarak erege_replace fln kullanabilirsiniz fakat preg_replace daha yetenekli olduğundan preg_replace'e özel bir düzenli ifade kuralı kullanacağız. Şimdi doğrudan düzenli ifade kuralını verip sonra açıklamaya çalışacağım :

http:// ftp:// gibi protokolü ile yazılmış linkler için :

```
([n ])([a-z]+?)://([a-z0-9-.,?!%*_#:;~\&$@/=+]+)

```

seçim kurallarını kullanıyoruz.

En baştaki [n] link eğer satır başında ise seçebilmemizi sağlıyor. Eğer bu ibareyi belirtmezsek yüksek ihtimal sadece satır içindeki linkler dönüşecektir. Bunu belirten kural 1. grup parantez olduğundan 1 ile kullanılabilecek.

Genel bir kural koymadık protokol belirtecimz için çünkü tonlarca farklı protokol var. İstersek ikinci grup parantez'e sadece http sadece ftp gibi belirteçler kullanarak istediğimiz protokole istediğimiz link değişimini uygulayabiliriz. Mesela smb:// için bir windows paylaşım işareti koyabiliriz otomatik çevirdiğimiz link'in yanına, ya da ftp:// için dosya transfer'i anlatan küçük bir ikon. Neyse ikinci grup parantez bizim protokol adımızı ifade ediyor. Bunu 2 ile otomatik link çevirmede kullanacağız.

Statik olarak "://" ibaresi arandıktan sonra 2. grup parantezde tüm linkimizi tarayabilecek kural bulunuyor. Burada dikkat etmemiz gereken şeyler, bir link'te kullanılabilecek özel karakterler olacaktır. Mesela bir linkte # & % = : ; gibi çok karakter vardır. Eğer bunları belirtmezsek. Kullanıcının burada belirtmediğimiz karakterleri içeren bir link girişinde otomatik link çevirilirken o belirtmediğimiz karakterden sonrası link'e dahil edilmeyecektir. Eski sitemde böyleydi :) Bu üçüncü grup parantez'le seçilen "www.deneme.com.tr/deneme.php?asd=1&qwe=2$%_*#git" gibi kısım 3 değişkenine atanacaktır.

Sonuç olarak biz metinimizi şu aşağıdaki kod ile otomatk link haline çevirebileceğiz :

```php
$yazi = preg_replace("#([\n ])([a-z]+?)://([a-z0-9\-\.,\?!%*_\#:;~\\&$@\/=\+]+)#ie",
  "'\\1<a href=\"\\2://\\3\">\\2://\\3</a>'", $yazi);

```
Bu sitede kullandığım otomatik link dönüşüm fonksiyonu ise şu şekilde:

```php
function linkler( $yazi ) {
    // http seklindekiler
    $yazi = preg_replace("#([\n ])([a-z]+?)://([a-z0-9\-\.,\?!%*_\#:;~\\&$@\/=\+]+)#ie",
      "'\\1<a href=\"\\2://\\3\" >\\2://\\3</a>'", $yazi);
    // www seklindekiler
    $yazi = preg_replace("#([\n ])www\.([a-z0-9\-]+)\.([a-z0-9\-.\~]+)((?:/[a-z0-9\-\.,\?!%*_\#:;~\\&$@\/=\+]*)?)#i",
      "\\1<a href=\"http://www.\\2.\\3\\4\">www.\\2.\\3\\4</a>", $yazi);
    // epostalar
    $yazi = preg_replace("#([\n ])([a-z0-9\-_.]+?)@([\w\-]+\.([\w\-\.]+\.)?[\w]+)#i",
      "\\1<a href=\"mailto:\\2@\\3\">\\2@\\3</a>", $yazi);
    
    return($yazi); 
}

```

Bu fonksiyon ile linklerinizi ve epostalarınızı otomatik dönüştirebilirsiniz.