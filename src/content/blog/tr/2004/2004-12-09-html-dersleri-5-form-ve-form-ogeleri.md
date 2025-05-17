---
title: "HTML Dersleri (5) : Form ve form öğeleri"
slug: html-dersleri-5-form-ve-form-ogeleri
date: 2004-12-09
url: http://mfyz.com/tr/html-dersleri-5-form-ve-form-ogeleri/
tags: ["Arayüz Programlama","form","html","input","select","textarea"]
category: Arayüz Programlama
migration: {"wpId":107,"wpPostDate":"2004-12-09T20:02:46.000Z"}
lang: tr
---

## form

Form öğerleri kullanabilmek için öncelikle bir form belirlemeniz gerekir. Form öğerlerini bu etiketler arasına yazmalısınız. name ile formun adını, method ile gönderi metodunu (get veya post), action ile formun belirtilen metodla gönderileceği sayfayı belirleriz.
```
<form name="iletisim\_formu" method="post" action="iletisim\_formu\_isle.php">
  <!-- FORM ELEMANLARI -->
</form>

```
**name** formun ismidir, javascript ile dom ağaç yapısından forma ve form elemanlarına ulaşmırken kullanırız. **method** formun postalama metodudur. GET ile url'den verileri açıkca gönderir, POST ile göstermeden postalar. Genelde POST metodunu kullanırız. **action** ise formun postalanacağı adrestir ve genellikle bir sunucu tabanlı dilin betik dosyası olur.

## input

Her türlü bilgiyi input'lar sayesinde girdi aldırırız. **name** ile, formun action parametresinde belirtilen sayfaya postalanırken değişken adlarını, girilen değer belirler. **value** parametresi ise o öğe için geçerli değeri taşır. Bu geçerli değerler çıktısı verilecek input türüne göre değişkenlik gösterir. **type** parametresi ile de çıktısı verilecek form öğesinin türünü belirleriz. Bu öğeleri, türlerine göre ayrı ayrı inceleyelim ; **button** : Çıktı olarak bir buton basılır. value değeri butonun üzerinde görüntülecek yazıyı belirler. Butonun geçerli olarak hiçbir fonksiyonu yoktur. onClick olayına atanan javascript ile bir fonksiyon kazandırılır.
```
<input type="button" value="Buraya Basabilirsiniz">

```
Çıktı:  **submit** : Çıktı olarak buton basılır. Ancak bu buton formu gönderme işine yarar. Geçerli olarak tarayıcının diline göre formu göndermeyi ifade eden bir kelime ile görüntülenir. value parametresi ile bunu Gönder, Devam gibi bir anlatım belirleyebilirsiniz.
```
<input type="submit" value="Gönder" />

```
**reset** : Çıktı olarak yine buton basılır. Buton formdaki bütün öğelerin değerlerini, ilk değerlerine döndürür. Yani geçerli value değerlerine döner.
```
<input type="reset" value="Formu Sıfırla">

```
**text** : Tek satırlık bilgi giriş alanı basar.
```
<input type="text" name="bilgi\_giris\_alani" value="varsayılan değer">

```
Çıktı:  **password** : text ile aynıdır. Tek farkı yazılan bütün karakterlerin değerleri korunurken, gösterimde işletim sistemine göre bir şifreleme gösterimi basılır. Windows'da büyük nokta, bazı tarayıcılarda hala \*, bazılarında ise hiçbirşey görüntülenmez.
```
<input type="password" name="sifre\_giris\_alani">

```
Çıktı:  **checkbox** : Seçim kutusu basılır. Eğer seçilmişse gönderilen sayfaya değeri on olarak, seçili değilse off olarak gider.
```
<input type="checkbox" name="onay"> Bisikletin var mı?

```
Çıktı:  Bisikletin var mı? Eğer "checked" argümanı verilirse ekrana varsayılan olarak seçili basılır. Örneğin: `Bisikletin var mı?` Çıktı:  Bisikletin var mı? **radio** : Seçim butonları koyar. Kullanıcıya birden çok seçenek ve bunlardan birinin seçilmesi istenirse bunları kullanırız. Bir seçim gurubunda her seçenek için bir tane radio türünde input öğesi eklenir, name yani isim parametrelerine aynı değer verilir ve value parametresine verilen değerlerden, form gönderilirken seçilmiş olanının değeri o isim yani değişken ile gönderilecek sayfaya gönderilir.
```
Kaç tane bilgisayarın var?
<input type="radio" name="bilgisayar\_sayisi" value="1"> 1 tane
<input type="radio" name="bilgisayar\_sayisi" value="2" checked> 2 tane
<input type="radio" name="bilgisayar\_sayisi" value="3"> 3 tane
<input type="radio" name="bilgisayar\_sayisi" value="+"> 3'den fazla

```
Çıktı: Kaç tane bilgisayarın var?  1 tane  2 tane  3 tane  3'den fazla Mesela "2 tane" seçeneğinin inputunda "checked" argümanı var. Onun için form ilk yüklendiğinde 2 seçeneği seçili oluyor.

## label

label'dan hemen bahsetmek istiyorum çünkü genellikle checkbox ve radiobuttonlar için kullanılırlar. label adı üzerinde etikettir. Yani bir inputun aslında başlığıdır. Yani siz formda bir text input veya başka bir input basarken onun hemen öncesine bir açıklama ile o bilginin ne olduğunu girersiniz. Mesela; E-Posta Adresiniz:  Buarda başlığa tıklamaya ihtiyaç yoktur. Yani kimse "E-Posta Adresiniz : " yazısına tıklayıp birşey yapmak istemez. Fakat checkbox ve radiobutton'larda böyle bir ihtiyaç hissedilir. Mesela:
```
<input type="checkbox"> Web standartlarını seviyor musun?

```
 Web standartlarını seviyor musun? Burada ise çıkan ufacık tik atma kutusuna tıklamaktansa yazıya tıklamayı tercih eder çoğu kullanıcı. Ve doğal olarak yazıya tıklanınca hiçbirşey olmaz :) label aslında burada işimize yarıyor.
```
<input type="checkbox" id="wss">
<label for="wss">Web standartlarını seviyor musun?</label>

```
Web standartlarını seviyor musun? Gördüğünüz gibi yazıya tıklayınca da input tıklanmış oluyor. Unutmamanız gereken şey şu: label'a **for** argümanı ile hangi input'un label'i olduğunu belirtmek. Tabiki bunu da input'a verdiğiniz id ile yapıyoruz. Aynı durum radiobuttonlarda da söz konusudur, "Kaç bilgisayarın var?" sorusuna cevap verirken yazılara tıklayarak seçim yaptırmak için her radiobutton'a bir id verilir, yazılar label ile işaretlenip for ile de her label'a kendi inputunun id'si verilir. label etiketi aynı zamanda bir formu css ile şekillendirirken de işinize yarayacaktır.

## textarea

Çok satırlık yazı alanı basar. rows parametresi ile kaç satırlık bir alan görüntüleneceği, cols parametresi ile de kaç satır genişliğinde görüntüleneceği ayarlanabilir. Ancak bu ayarlar sadece görünümü ayarlar. içine girilebilecek metin teorik olarak sonsuzdur. Metnin uzunluğu makinenizin limitlerine göre belirlenir. Geçerli değer açılış ve kapanış etiketleri arasına girilir.
```
<textarea rows="5" cols="50">5 satır, 50 karakter genişlikli metin girdi alanı</textarea>

```
5 satır, 50 karakter genişlikli metin girdi alanı

## select ve option

Seçim listesi basar. Geçerli olarak boş liste basılır. Açılış ve kapanış etiketleri arasındaki option etiketleri bu listeyi oluşturur. option etiketleri arasına yazılan şekilde görüntülenir ve seçilen seçenek, select'in name parametresinde belirlenen değişkene seçilen option etiketindeki value parametresinin değerini atar. option etiketleri selectsiz kullanıldığında bir işe yaramazlar.
```
Hangi ildesiniz?:
<select name="secilen\_il">
  <option value="ankara">Ankara</option>
  <option value="istanbul">İstanbul</option>
  <option value="izmir">İzmir</option>
  <option value="diger">Diğer</option>
</select>

```
Hangi ildesiniz?: Ankara İstanbul İzmir Diğer