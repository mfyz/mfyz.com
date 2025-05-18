---
title: "HTML5 Form Özellikleri"
slug: html5-form-ozellikleri
date: 2012-10-24
url: http://mfyz.com/tr/html5-form-ozellikleri/
tags: ["Arayüz Programlama","colorpicker","datepicker","form","html","html5","input","javascript","mobile"]
category: Arayüz Programlama
migration: {"wpId":321,"wpPostDate":"2012-10-24T00:26:57.000Z"}
lang: tr
---

HTML5 git gide daha popülerleşiyor ve eski html kodlarının yerini, daha sade html5 kodlarına bıraktığını, daha önce javascript eklentileriyle yaptığımız bazı şeyleri yeni html5 tanımlamasında yeni özellikler olarak görmeye başladık.

Özellikle mobile web uyumlu sayfalar yaygınlaştıktan sonra html5 tanımlamaları sadece masaüstü bilgisayar tarayıcıları değil mobil tarayıcılar için de özel yetenekler içermeye başladı.

Eğer birkaç yıldır güncellenmeyen bir tarayıcınız varsa HTML5 formların tüm özelliklerini desteklemeyebilir fakat güncel ve modern tüm tarayıcılar birçok html5 form özelliğini destekliyor.

İşte yeni html5 form özelliklerinden bazıları...

#### Otomatik odaklanma

Bir form elementinin, sayfanın odağı olduğu sayfalarda, sayfa yüklenmesiyle o elementi aktif/odakta/seçili hale getirmek isteyebiliriz. Örneğin bir arama sayfasında, sayfa yüklendiğinde kullanıcıyı arama kutusuna odaklamak doğru bir kullanıcı deneyimi olacaktır. Bunu yapabilmek için daha önce javascript ile sayfa yüklendiğinde odaklamak istediğimiz form elementine müdahale ediyorduk. HTML5'de kullanıcı girdi elementinin "autofocus" özniteliği ile bunu sağlayabiliyoruz artık.
```
<input name="search" autofocus/>

```

#### Yer tutucu açıklamaları

İyi bir kullanıcı deneyimi için, form elementlerinin yer tutucu metinlerini kullanıcı girdisinin içinde göstermek daha kullanılabilir bir form tasarımı olacaktır. Bunu da daha önce javascript yardımı ile birden fazla hareketi dinleyerek yapıyorduk. HTML5'de bunun yerini "placeholder" özniteliği aldı.

Az önceki örnek üstünden devam edersem, arama kutunuzda "Örnek: Call of Duty MW3" yazarak örnek ile arama ipucu verebilirsiniz.
```
<input name=""search"" type="text" placeholder=""Kitap" />
```

#### Form doğrulama

HTML5 tanımında formları kullanıcı girdi türüne göre doğrulabilmesi için bazı özellikler getirildi fakat hala tüm tarayıcılarda tamamıyle uygulanmış değil. Ancak konsept olarak bir girdi türünü detaylı bir şekilde eposta, url, numara gibi farklı türlerde tanımlayıp zorunlu olduğunu belirtebiliyorsunuz ve tarayıcı, bu alanlardaki veri doğru formatta olmadığı sürece formu post etmiyor.
```
<input required="" type=""email"" />
```
Eski html tanımında, serbest metin girdisi olarak sadece 2 tür kullanıcı girdi alanı vardı. Bunlar input etiketi türü olarak "type" özniteliğiyle tanımlanıyor ve text ve password olarak iki tür olarak tanımlanmıştı. HTML5'de bu türler çoğaldı.

Ana ihtiyaç aslında mobilden doğdu çünkü mobil arayüzde dokunmatik klavyeler girdi alanlarinin türlerine göre farklı klavye türleri gösterebiliyor ekranda. Örnegin bir telefon numarası girişi isteniyorsa "tel" adında yeni bir HTML5 girdi türüyle bunu sağlayabiliyorsunuz. Ya da tarih girdisi ise tarihin türüne göre ay girdisi için "month" gibi farklı türler kullanabiliyorsunuz. İşte o yeni türlerden bazıları:

##### type="email"

Kullanıcı girdisini eposta için doğrulayabilmenize izin verir veya görünen klavyede @ ve . işaretlerini "boşluk" gibi karakterler yerine göstererek kullanıcının daha kolay eposta girmesini sağlar.

##### type="url"

Eposta türüne benzer şekilde url girdisini kolaylaştıracak klavye görüntülemesini sağlayabilir ve veri doğrulama için tanımlanabilir.

##### type="search"

Fonksiyonalite olarak text girdisiyle aynıdır fakat bazı tarayıcılar arama simgesi gibi görünüm farklılıkları ile o kullanıcı girdi alanının arama girdisi olduğunu gösterir.

##### type="number"

Nümerik kullanıcı girdisi sağlamaya yarayan özel bir seçici gösterebilir, alt ve üst sınırları, sayı aralıklarını belirleyebilirsiniz.
```
<input max=""10"" min=""0"" step=""2"" type=""number"" value=""4"/" />

```
Ek olarak bu tür alanlarda değişimleri yakalayabileceğiniz veya değişiklikleri dikte edebileceginiz ek javascript olayları ve methodları vardır.
```
elInput.stepUp(n);
elInput.stepDown(n);
elInput.valueAsNumber();

```

##### type="range"

Sayısal kullanıcı girdisine benzer ancak görsel olarak farklı sunuma sahip bir kullanıcı girdisidir.

#### Tarih seçicileri

Tarih girdisi için birçok ağır javascript kütüphanesi kullanmanıza da gerek kalmadı. Hem doğrulama hem de daha kolay kullanıcı girdisi için artık tarih seçici türlerini kullanabilirsiniz. Hızlıca:
```
type="date" sadece tarih girdisi
type="datetime" tarih ve saat girdisi
type="month" ay ve yıl girdisi
type="week" sadece hafta girdisi
type="time" sadece saat girdisi

```

#### Renk Seçicisi: type="color"

Şu an tüm tarayıcılar desteklemese de bazı tarayıcılar özel seçiciler ile renk seçimi yapılmasına da olanak sağlıyorlar.