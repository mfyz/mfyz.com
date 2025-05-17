---
title: "Mootools'da Nesne Seçiciler, CSS Seçicileri"
slug: mootoolsda-nesne-seciciler-css-secicileri
date: 2008-02-09
url: http://mfyz.com/tr/mootoolsda-nesne-seciciler-css-secicileri/
tags: ["Arayüz Programlama","css selectors","element","mootools"]
category: Arayüz Programlama
migration: {"wpId":129,"wpPostDate":"2008-02-09T21:14:12.000Z"}
lang: tr
---

#### Korkmayın

Döküman başlığı anlaşılmaz olsa da şimdi olayı kavrayacaksınız :) Html elemanlarımızı css ile yerleştirirken css'de nesnelerin etiket adları, kimlikleri (id) ve sınıflarına (class) göre seçici cümleler oluştururuz. Mesela tüm bağlantılar için
```
a {

}

```
kullanırız. Ya da tüm "ipucu" sınıfına ait elemanları seçmek için
```
.ipucu

```
tanımı kullanırız. Hatta tüm ipucu sınıfındaki sadece bağlantıları seçmek için
```
a.ipucu

```
veya icerik kimliği içindeki tüm ipucu sınıflı span'ları seçmek istersek de
```
#icerik span.ipucu

```
adreslemesini kullanırız. Bu adresleme aslında nesnelere erişimimizi oldukça kolaylaştırır. Gerek tek nesneye ulaşırken gerek de birden fazla nesneye ulaşırken css adreslemeleri bu konuda oldukça pratiktir.

#### JavaScript ile ne ilgisi var peki?

DOM'da seçici fonksiyonlar vardır bilirsiniz. getElementById(), getElementsByClass() gibi. Fakat son verdiğim örnekteki nesnelere ulaşmak için birkaç döngü kurmanız gerekir, daha karışık nesene seçimlerinde de bizi uğraştırabilir. Mootools'u yine seveceksiniz, çünkü mootools'da seçici fonksiyonlar var ve bunlardan bir tanesi (muhtemelen en çok kullanılan) css adreslemelerine göre elemanlar seçiyor. **$ Fonksiyonu** elemanları kimliklerine göre seçer. getElementById(); ile aynı işi yapıyor aslında
```
eleman = document.getElementById('anasayfa\_butonu');
// ile aşağıdaki tanım aynı işi görür
eleman = $('anasayfa\_butonu');

```
**$$ Fonksiyonu** az önce yazdığımız css adreslemesinde bulduğu elemanları nesne dizesi olarak verir. Örneğin ipucu sınıfındaki tüm linkleri seçtirelim
```
$$('a.ipucu')

```
icerik kimliği içindeki ipucu sınıflı tüm linker :
```
$$('#ipucu a.ipucu')

```
ya da birden fazla sınıf adreslemesine ait elemanların hepsi :
```
$$('a.ipucu, a.eposta, span.bilgi')

```
Şimdilik pek oturmadı farkındayım ama birkaç örnek yapalım eminim daha iyi anlayacaksınız : Mesela elimizde 4-5 linkten oluşan bir menü olsun. Aynı zamanda sayfamızın içeriğinde de linkler, span'lar bold metinler vs bir sürü elemanımız var. Sadece css ile yerleştirilip düzenlenmiş durumda. Örnek HTML şöyle :
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>Sayfa Basligi</title>
  </head>
<body>
  
  <h1>Canım Sitem</h1>
  
  <div id="menu">
    <a href="anasayfa.html" title="Anasayfa'ya gider">Anasayfa</a> |
    <a href="dokumanlar.html" title="Yazdığım dökümanlar">Dökümanlar</a> |
    <a href="fotolar.html" title="Fotoğraflarım">Fotoğraflar</a> |
    <a href="hakkinda.html" title="Mehmet Fatih YILDIZ hakkında">Hakkımda</a> |
    <a href="iletisim.html" title="Benimle İletişin">İletişim</a>
  </div>
  
  <div id="icerik">
    <!--
      HTML SAYFA ICERIGI BURADA
    --> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
  
  <div id="linklerim">
    <h3>Linklerim</h3>
    <a href="http://www.mfyz.com">MFYZ.Com</a> <br>
    <a href="http://www.google.com">google</a> <br>
    <!--
      YUZLERCE LINK OLDUGUNU DUSUNELIM
    -->
    <a href="http://www.yahoo.com">yahoo</a>
  </div>
  
</body>
</html>

```
Gördüğünüz gibi basit bir html dosyası. Şimdi menudeki tüm linkleri seçip bir güzellik yapalım :)
```
$$('#menu a').each(function(link){
  alert( link.getProperty('title') );
});

```
$$ ile aldığımız nesneleri **each** ile dönüyoruz. içerideki fonksiyona verdiğimiz link parametresi dizi dönerken elemanın nesnesini ifade ediyor. Böylece o elemanlar üzerinde istediğimizi yapabiliyoruz. İçeride basitçe linklerdeki title argümanına atadığım açıklama metinlerini alert ettirdim. Ama bu sayfa yüklenirken yapılır be birşey anlamazsınız. Daha güzel bir örnek vermek gerekirse :
```
$$('#menu a').each(function(link){
  link.addEvents({
    'mouseover': function(){
      window.status = link.getProperty('title');
    },
    'mouseout': function(){
      window.status = '';
    }
  });
});

```
Linklerin üzerine geldiğinizde sayfa statusbar'ında linklerin url'leri yerine açıklamaları çıkar :) Bu kısımlar dökümanla ilgili değil, onun için geçiyorum. Mesela kullanılabilir bir örnek için de sayfada içerikten sonraki linkler kısmında birşeyler yapalım. O linkler site dışı linkler ve target'ları yok gördüğünüz gibi. Yani linkler doğrudan sayfa üzerinde açılacaklar. Bu linkleri yeni pencerede açtıralım.
```
$$('#linklerim a').each(function(a){
  a.setProperty('target', '\_blank');
});

```
kodu işimizi görecektir. Bu kod işletildikten sonra o linkler yeni pencerede açılacaktır. Bu örnek css seçicileri anlamanızı sağlamıştır umarım.

#### CSS seçiciler ile tek eleman seçtirmek

CSS seçiciler ile tek eleman seçtirmek istediğinizde, mesela bir sürü eleman içinden css adresiyle bir eleman seçtiriyorsunuz :
```
#linklerim a.google

```
az önceki örnekte alttaki linklerin etiketinde hepsine sınıf eklediğimizi düşünelim. Google linkine de google sınıfı atadık. Fakat bu sınıfa tek eleman var. Sadece o link var. Ancak CSS seçiciler her zaman dizi döner.
```
$$('#linklerim a.google')

```
olarak seçmek istediğinizde tek elemanlı bir dizi dönecektir.
```
$$('#linklerim a.google')\[0\]

```
ile kolayca elemanınıza ulaşabilir, üzerinde işlemler yapabilirsiniz.