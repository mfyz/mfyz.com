---
title: "Mootools ile Ajax"
slug: mootools-ile-ajax
date: 2008-02-06
url: http://mfyz.com/tr/mootools-ile-ajax/
tags: ["ajax","Arayüz Programlama","mootools","xmlhttprequest"]
category: Arayüz Programlama
migration: {"wpId":128,"wpPostDate":"2008-02-06T06:07:17.000Z"}
lang: tr
---

#### Ajax Nedir?

Ajax aslında modern tarayıcıların desteklediği XMLHttpRequest özelliğini kullanarak sayfa yenilemeden istek yapıp cevap almamızı sağlayan birşeydir.

XMLHttpRequest hakkında bilgi için [buraya tıklayın](https://tr.mfyz.com/xmlhttprequest-nedir/).

Çoğu sitede görmeye alışık olduğumuz birşey haline gelmeye başladı aslında ajax. Çünkü web 2.0 uygulamalarının neredeyse ana çatısını oluşturuyor. Web 2.0 yazılımları 2.0 yapan şey aslında kullanıcı etkileşimi ve bu etkileşimden kastımız aslında bir web uygulamasının sanki masaüstü uygulaması gibi çalışması. Bu da aslında Sunucu-Kullanıcı istek-cevap ilişkisini sayfa yenilemeden yani kullanıcı için hazırladığınız ARAYÜZü yenilemeden birçok işi yapmaktan geçiyor. Tabiki bunu da XMLHttpRequest'i kolay hale getirip kullanmamızı sağlayan ajax kütüphaneleri yapıyor.

İnternette çok sayıda ajax kütüphanesine rastlayabilirsiniz, genellikle 3-5 satır kod ile istek ve cevabı işleyebiliyor. Fakat bu sitede mootools odaklı gittiğim için bu dökümanda mootools ile ajax eklentisini kullanmayı göreceğiz. Diğer kütüphaneleri de kullanarak farkı görebilirsiniz.

#### Mootools ve ajax

http://mootools.net/ adresinden mootools'u ajax seçeneği ile derleyerek indirmelisiniz. Sayfa başında mootools.js dosyasını include edin. Basitçe ajax isteği için kod bloğu şöyle :

```
new Ajax('icerik_alinacak_dosya.php', {
  method: 'get',
  update: $('icerik_basilacak_element_id')
}).request();

```

Çoğu mootools eklentisi, nesnesindeki gibi zorunlu kısımlar nesneye ilk parametrelerde veriliyor. Sonra da bir ayar dizesi (nesne olarak) şeklinde 2. parametre belirleniyor.

Burada ilk parametre string olarak istek yapılacak url, yani istek yapılacak dosya adı. Bir php dosyası veya html dosyası veya dışarıda bir web sayfası urlsi olabilir. Ayar dizesindeki parametrelerden önemli olanların açıklamaları da şöyle :

```
data            Gönderilecek url parametreleri. Aşağıda açıklamasını yapacağım.
method          İstek methodu, get veya post olabilir.
update          Cevap geldiği zaman içeriğin yerleştirileceği html nesnesi adresi
onComplete      Cevap geldiği zaman işletilecek javascript kodu, fonksiyon olarak
                belirtilmesi gerekiyor ve fonksiyonun ilk parametresi cevap dönen
                içeriği string olarak fonksiyona sokar.
evalScripts     XMLHttpRequest ve çoğu diğer ajax kütüphanelerindeki ana sorun,
                cevap gelen içerik içerisinde eğer bir javascript kod bloğu veya
                dosya include varsa Normalde bu kısımlar çalıştırılmaz.
                Bu popüler bir sorundur, bu parametreye true değeri vererek
                bu sorunu aşabilirsiniz (Mootools'u seviyorum).

```

Şimdi bu parametreleri örneklerle açıklama çalışacağım. Önce bir bağlantıyı (link) ajax ile çağırıp dönen içeriği ekranda bir bölüme yazdıralım.

```
...
<a href="#" onClick="ajax_istek('hakkinda.html');">Hakkında</a>
<a href="#" onClick="ajax_istek('iletisim.html');">iletişim</a>
...
<div id="icerik"></div>
...

```

Bu sayfamız olsun. Linke tıklantığında ajax_istek fonksiyonunu url parametresiyle çağırıyor görüldüğü gibi. Ayrıca icerik kimlikli bir div var. İçeriği buraya basacağız.

```
function ajax_istek(hedef){
  new Ajax(hedef, {
    update: $('icerik')
  }).request();
}

```

Basit bir ajax isteği gördüğünüz gibi. Şimdi bunu biraz geliştirelim ve linke tıklandığında sayfa içeriği "Yükleniyor" olsun, içerik geldiğinde de zaten yükleniyor kalkacak.

```
function ajax_istek(hedef){
  $('icerik').setHTML('Yükleniyor');
  new Ajax(hedef, {
    update: $('icerik')
  }).request();
}

```

Biraz daha geliştirip yüklenme işlemi bittiğinde birşeyler yaptıralım.

```
function ajax_istek(hedef){
  $('icerik').setHTML('Yükleniyor');
  new Ajax(hedef, {
    update: $('icerik'),
    onComplete: function(){
      alert("Sayfa Yüklendi");
    }
  }).request();
}

```

Örneğin burada alert yerine sayfanın bir köşesinde bu uyarıyı gösterip gizletebilirsiniz, Ya da içeriği basmayıp bir işlem yaptırabilirsiniz. Bunu örneklemek için işe biraz form katacağım. mfyz.com'da üye kayıt sayfasında kullanıcı adı kontrol mekanizmasını anlatacağım. Kayıt formuna girdiğinizde kullanıcı adı seçip yazdıktan sonra bilgi giriş kutusundan çıktığınızda (yani başka bir nesenye odaklandığınızda) otomatik olarak kullanıcı adının veritabanında olup olmadığını sorgulayıp cevabı geliyor ve ona göre kutu yeşil veya kırmızı oluyor farkında iseniz.

```
<input id=""kadi"" type=""text"" />

```

şeklinde bir inputum var ve onBlur olayına yani kutudan odak gittiğinde bir fonksiyon çağırıyorum.

```
function kullanici_adi_kontrol_et(kadi){
  // kullanici adini veritabanindan kontrol
  // edecek php dosyasina sorgulatiyorum
  new Ajax('kullanici_adi_kontrol.php', {
    method : 'get',
    data: 'kadi = ' + kadi,
    onComplete: function(cevap){
      if(cevap == 'OK'){
        // kullanici adi giris kutusunun kenrlığını yeşil yapalım
        $('kadi').setStyles({
          'border' : '1px solid green'
        });
      }else{
        // kullanici adi giris kutusunun kenrlığını kırmızı yapalım
        $('kadi').setStyles({
          'border' : '1px solid red'
        });
        // ve gelen hatayi basalim
        alert(cevap);
      }
    }
  }).request();
}

```

Bakın burada 2 parametreyi örnekledim. Birisi data parametresi diğeri de update kullanmak zorunda olmadığımız. Ayrıca onComplete'de tanımladığımız fonksiyonun ilk parametresi yani cevap değişkeni ajax ile dönen içeriği alıyor.

Yukarıda yaptırdığım işlem özetle şöyle: kullanici_adi_kontrol.php dosyası get methodu ile gelen kadi değişkenindeki string'i veritabanında aratıyor. Eğer yoksa ekrana sadece "OK" basıyor. Eğer başka bir hata varsa hatayı basıyor. Mesela kullanıcı adında geçersiz karakterler var veya veritabanında o kullanıcı mevcut. Yani hata varsa "OK" dışında birşeyler oluyor. PHP hatası da olabilir.

onComplete'da cevap değişkenini kontrol ettiriyorum. Eğer "OK" string'i ise kullanıcı adı yok yani ekrana başarı sinyali vermem gerek. Ben de etkileşimli olması için bilgi giriş kutusunun çerçevesini yeşil yapıyorum. Mootools ile css özniteliklerini değiştiriyorum. Eğer OK değilse bir hata vardır. Çerçeveyi kırmızı yapıp cevap değişkenini yani dönen hatayı ekrana yazdırıyorum alert ile.

Bu istekleri ve cevap işleme tekniklerini uygulamanıza göre geliştireceksiniz, Zaten burada o istek-cevap ilişkisinin boyutu önemli değil. Yani çok büyük istekler de yapabilirsiniz çok küçük de.

#### Formları otomatik ajax ile post etmek

Mootools'da çok güzel bir özellik daha var. Formunuzu çok pratik bir şekilde ajax ile göndermek.

```
<form id="bilgi_formu" action="kayit.php" method="post">
  Ad : <input type="text" name="ad"><br>
  Soyad : <input type="text" name="soyad"><br>
  <input type="submit" value="Gönder">
</form>

```

böyle bir formunuz olduğunu varsayalım. Oldukça basit yani. Gönder butonuna basıldığında normal şekilde kayit.php dosyasina post methodu ile 2 değişken gidiyor biliyorsunuz. kayit.php'de de bu değişkenleri işliyorsunuz.

```
$('bilgi_formu').send();

```

kodu sayesinde formu ajax ile gönderebilirsiniz. Gideceği url, methodu ve datası otomatik olarak bulunup gönderiliyor. Örnek kullanımını da şu kodlar özetleyebilirim :

```
<form id="bilgi_formu" action="kayit.php" method="post">
  Ad : <input type="text" name="ad"><br>
  Soyad : <input type="text" name="soyad"><br>
  <input type="button" onClick="gonder()" value="Gönder">
</form>
<script>
function gonder(){
  $('bilgi_formu').send({
    onComplete: function(){
      alert("Başarıyla gönderildi");
    }
  });
}
</script>

```

Gördüğünüz gibi submit yerine buton kullanarak bir fonksiyon çağırıyorum. ajax için kullandığımız send fonksiyonunun ilk parametresi ajax için kullandığımız ayar dizesi oluyor. Yani update ile gelen içeriği biryere yazdırabilir veya ajax için uyguladığımız taklaları burada da attırabilirsiniz.

Mootools ajax dökümantasyonu : [http://docs.mootools.net/Remote/Ajax.js](http://docs.mootools.net/Remote/Ajax.js) Ajax Demoları : [http://demos.mootools.net/Ajax](http://demos.mootools.net/Ajax) [http://demos.mootools.net/Ajax.Form](http://demos.mootools.net/Ajax.Form)

> Not : Nesnelere olay ekleyip bu işleri yaptırmak daha kolaydır. Mesela form ajax ile post etmek için submiti butona çevirmek ilkel bir mantıktır. Forma doğrudan onSubmit olayı ile kural belirleyerek yaparız aslında bu işlemleri. Fakat dökümanda daha fazla kafa karışıklığı yaratmaması için doğrudan fonksiyon çağırtıp işlem yaptırdım.