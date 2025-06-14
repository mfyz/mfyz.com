---
title: "HTML Dersleri (2) : Başlıklar, paragraflar, metin biçimlendirme ve köprüler"
slug: html-dersleri-2-basliklar-paragraflar-metin-bicimlendirme-ve-kopruler
date: 2004-12-12
description: "HTML dersleri serisinin ikinci bölümü. Bu rehber, `<h1>`-`<h6>` başlıkları, `<p>` paragrafları, `<b>`, `<i>` gibi metin biçimlendirme etiketleri ve `<a>` etiketiyle köprü (link) oluşturma gibi temel konuları ele alıyor."
url: http://mfyz.com/tr/html-dersleri-2-basliklar-paragraflar-metin-bicimlendirme-ve-kopruler/
tags: ["Arayüz Programlama", "headings", "html", "link", "metin", "p", "a", "köprü", "paragraf", "başlık", "web geliştirme", "html dersleri", "metin biçimlendirme"]
category: Arayüz Programlama
migration: {"wpId":104,"wpPostDate":"2004-12-12T21:50:41.000Z"}
lang: tr
---

## Başlıklar

**p Paragraf Etiketi** Seçilen metini paragrafa dönüştürür, biraz içeri, alt ve üste de biraz boşluk ekler. Kapanış etiketi zorunludur.

**h* (Headings : Başlıklar)** H etiketi başlıkları belirler. h1, h2, ... h6 başlıklarından sayı büyüdükçe yazı küçülür.

**div ve span** Stil uygulamak için kullandığımız metin bloğudur. class, id, style parametrelerini kullanarak stil tanımlayabilirsiniz.

**br ve nobr** Yeni satırla ilgili etiketler; **br** etiketi yeni etikete geçişi sağlar. HTML yazarken yazdığınız metinde satır sonlarında br etiketi yoksa, yeni satırlar kelime ayracı yani boşluk olarak algılanır. Eğer yazdığınız metin bloğunu tek bir satırda görüntülemek istiyorsanız **nobr** kullanırsınız. Normalde metinler tarayıcı penceresine sığdırılır. nobr etiketini kullanarak bunu engelleyebilirsiniz.

Örnekler:

```html
<!-- BAŞLIKLAR -->
<h1>En büyük başlık bu başlık</h1>
<h2>2. numara</h2>
<h3>3. numara</h3>
<h4>4. numara</h4>
<h5>5. numara</h5>
<h6>6. numara</h6>

<!-- BLOKLAR -->
<div id="kimliksiz" class="kutu koyu">Bu blok tüm satıra yayılır.</div>
yazı yazı yazı <span class="bilgi">Bilgilendirme yazısı</span> yazı deveam eder.

<!-- BR ve NOBR -->
yazı yazı<br>
yeni satır<br>
3. satır<br>
...

<nobr>
bu
kelimeler
yan
yana
bitisik
cikacaktir
</nobr>
```

## Metin biçimlendirmek

**font** : Metin bloğunu ifade eder. size parametresine, web font boyutu standartlarında verilen boyuta göre metin bloğundaki yazıların boyutunu, face ile de metin bloğundaki yazıların yazı karakterini ayarlar. size geçerli olarak 3'tür ve 1 ile 7 arasında değerler alır.

**b ve strong** : İçindeki metni kalın yazı stilinde görüntüler. **i ve em** : İçindeki metni yatık stilde görüntüler. **u** : İçindeki metni altı çizgili stilde görüntüler.

**pre** (preformatted : formatlanmamış) : Eşaralıklı (daktilo) metin biçimini ifade eder. Genellikle kod çıktılarını verirken, konsol, komut çıktısı veya ascii çalışmaları görüntülerken kullanırız. Bu etiketler arasına yazılan metinlerde, boşluk sayıları, yeni satırlar olduğu gibi korunur.

Örnekler:

```html
<!-- METİN STİLLERİ -->
<b>Koyu yazı</b>
<strong>Bu da koyu</strong>

<i>Yana yatık yazı</i>
<em>Ben de ben de :)</em>

<u>Altı çizgili</u>
<s>Üstü çizgili</s>

<big>Normalden biraz daha büyük yazı</big>
<small>Bu da küçük</small>

<!-- PRE -->
<pre>
Formatlanmamış metin, Eş aralıklı
Mesela ASCII art bastığınızda
veya kod bastığınızda çok iyi gider :)

.--- İsim ---- Yaş ---- Şehir ----.
|    Ece    |  20   |   Ankara    |
| Jonathan  |  26   |  New York   |
| Muhammed  |  23   |   Cairo     |
'---------------------------------'

Gibi bir ascii tablo. (Şu anda kod bölümünde
gördüğünüz bir preformatted text örneğin.)
</pre>
```

## Köprüler

Başka bir sayfa, sayfa konumu veya dosyaya köprü kurmak için **a** etiketi kullanılır.

Sayfa konumu belirlemek için sadece name parametresi belirleyin. Çağırırken **href**\="#konum_adi" şeklinde kullanın.

Dosya veya başka bir sayfaya köprü için href="sayfa_dosyasi_adresi" şeklindeki parametreyi belirleyin. Başka sitedeki linkler için kesin protokolü belirlemeniz gerekir. ("www..." yerine "http://www..." şeklinde)

Köprülerin farklı çerçevelerde veya yeni bir pencerede açılmasını sağlamak için **target**\="cerceve_adi" parametresini ayarlayın. Eğer belirtilen çerçeve mevcut değilse sayfa, yeni pencerede açılır. Yeni pencere de açmanın bir diğer (ve en genel) yolu parametreye _blank değeri vermektir.

Epostalara doğrudan köprü vermek için href parametresine "**mailto:**gonderilecek@adres.com" şeklinde değer verin. İşletim sisteminizin geçerli eposta programına, belirtilen eposta adresine yeni ileti açmasını emreder.

Örnekler:

```html
<a href="http://www.mfyz.com/">Normal link</a>

<a href="http://www.mfyz.com/#sayfanin_sonu">Sayfa içi link (http://www.mfyz.com/ sayfasındaki "sayfanin_sonu" ile isimlendirilmis nenseye gider. Eğer isim yoksa id'ye de bakılır.)</a>

<a href="http://www.mfyz.com/" target="_blank">yeni pencerede açılan link</a>

<a href="mailto:billgates@hotmail.com">Şikayet etmek için tıklayın.</a>
```