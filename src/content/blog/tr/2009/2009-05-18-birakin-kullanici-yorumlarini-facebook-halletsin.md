---
title: "Bırakın kullanıcı yorumlarını facebook halletsin"
slug: birakin-kullanici-yorumlarini-facebook-halletsin
date: 2009-05-18
url: http://mfyz.com/tr/birakin-kullanici-yorumlarini-facebook-halletsin/
tags: ["api","Arayüz Programlama","box","comment","connect","facebook"]
category: Arayüz Programlama
migration: {"wpId":142,"wpPostDate":"2009-05-18T22:35:33.000Z"}
lang: tr
---

#### Kullanıcı yorumlarının kullanım alanları

Şu an neredeyse her şeyi internette paylaşmaya başladık. En basit kullanıcı bile birkaç saatte çeşitli araçlarla veya kendi yazarak bir web sayfası üretebiliyor. Bu sayfalarda tecrübelerini, fotograflarını paylaşıyorlar. Bu paylaşımın bir yanı da, aslında interaktif yanı diğer ziyaretçilerin içerik hakkında yorum yapması, tartışabilmesi. Bu iletişim o kadar önemli ve detaylı olmaya başladı ki, çok basit bir ruh halinizi paylaştığınız Facebook status'de bile kullanıcılar yorum yazıyorlar. Facebook yorumları ve yönetimini bu noktada oldukça başarılı şekilde yapıyor.

Son dönemde connect aracılığı ile bazı kaynaklarını dış sitelere de açmaya başladığından bu yorumlama mekanizmasını paylaştığı bir yapı var: Facebook Connect Comment Box. Bu dökümanda facebook connect ile commentbox uygulamasını herhangi bir web sayfasına nasıl entegre edeceğimizi göstereceğim.

#### Facebook Connect'e giriş

Facebook connect ile ilgili ana sistematiği [Facebook connect ile kullanıcı giriş çıkış](/facebook-connect-ile-kullanici-giris-cikis) dökümanında anlatmıştım. Comment box kullanabilmek için facebook connect kurulumunu sayfanıza yapmanız gerekiyor. Tabiki bunun için de bir uygulama oluşturmak zorundasınız. Basitçe özetlersem :

*   "Developers" uygulamasını ekleyin
*   Kendinize yeni bir uygulama oluşturun ve bir api anahtarı edinmiş olun
*   Uygulama ayarlarında facebook connect URL olarak comment box kullanacağınız sayfanın adresini girin
*   Site ayarlarını yapmaya html etiketinize fbml sözlüğü yolunu girin
*   Facebook JS Api'nin javascript kütüphanesini include edin
*   Facebook connect init fonksiyonu ile api key'inizi belirterek facebook connect'i etkinleştirin

Bu adımlardan sonra yaptığımız şey FBML yardımı facebook connect butonu eklemek, login ise kendi fonksiyonumuzu çağırarak giriş yapmış kullanıcı aksiyonlarını belirlemek idi. Fakat şimdi bunları kullanmayacağız ve çok basit bir yolla sayfamıza yine FBML yardımı ile yorum kutusu ekleyeceğiz.

#### Uygulayalım

Şimdi basit bir fotograf sayfasına yorum kutusu eklemeyi örnekleyeceğim. Sayfamız şu şekilde olsun :
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html ot;/>
<title>Facebook Connect</title>
<script src="http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php" type="text/javascript"></script>
</head>
<body>
<div>
<h2>Sevimli Kedi</h2>

<img src="http://www.fulyavet.com/images/cat17.jpg" alt="Cat" />
<br>
<br>

</div>

<script type="text/javascript">
// facebook init
FB.init("--API-KEY--", "xd_receiver.htm");
</script>
</body>
</html>

```
Bu sayfanın görünümü :

![](/images/archive/tr/2009/05/commentbox_1.jpg)

Gördüğünüz gibi klasik bir fotograf sergilenen sayfa. Kodda gördüğünüz gibi html etiketinde fbml sözlük adresi tanımlı, facebook javascript api import edilmiş ve en sonda da facebook connect init edilmiş durumda. Yani facebook connect çalışır durumda. Fakat sayfada henüz facebook esintisi yok.

Şimdi fotografın hemen altına yorum kutusu eklemek istersek img etiketinin hemen altına `<fb:comments></fb:comments>` fbml etiket grubunu eklememiz yeterli olacak.

Evet sadece bu kadar. İnanması zor ama bu şekilde :) Şimdi bu fbml etiketlerini eklediğimizde ortaya çıkacak sonuç şu şekilde olacak :

![](/images/archive/tr/2009/05/commentbox_2.jpg)

Oldukça basit bir şekilde sayfamıza yorum özelliği eklemiş olduk. Burada işin güzel yanı, insanlar facebook hesapları ile connect olup misafir yerine gerçek bir kişi olarak hareket edebilecekler. Eğer connect tuşuna basarlarsa iki durum söz konusu : eğer facebook'a giriş yapmışlarsa sadece bu siteye bağlanıp bağlanmamasını soran bir kutu, eğer giriş yapılmamışsa facebook giriş ekranı gelecek.

![](/images/archive/tr/2009/05/commentbox_3.jpg)

Kullanıcı bilgileri ile giriş yapınca misafir yerine kullanıcı bilgileri, fotografı gelecek.

![](/images/archive/tr/2009/05/commentbox_4.jpg)

Burada işin güzel yanı, kullanıcı oraya yorum yaparken varsayılan olarak seçili olan "Post comment to my Facebook profile" seçeneğini seçerse burada yazdığı yazı, uygulama adınız ile birlikte facebook profilindeki duvarında görünecek. İnsanlar duvardan da cevap yazabilecekler ve duvardan yani facebook üzerinde iken yazdıkları yorum da sitenizde görünecek.

Bunun yanı sıra uygulamanızda admin/moderator olan kişiler giriş yaptıkları zaman yukarıda gördüğünüz gibi "Administer Comments" bağlantısı ile o sayfadaki yorum kutusuna ait ayarlar yapabilecekler. Yani misafirlerin yazıp yazamaması gibi özellikleri. Aynı zamanda yapılan yorumları da kaldırma seçenekleri olacak. İsterseniz o sayfadaki yorumları yönetmesi için insanları davet edebileceksiniz.

![](/images/archive/tr/2009/05/commentbox_5.jpg)

Şimdi bu uygulamayı her türlü sayfada yapabileceğinizi düşünürsek, bunun için herhangi bir veritabanı, javascript yazmanıza da gerek kalmadığı düşünülürse statik sitelerde oldukça kullanışlı bir uygulama halini alıyor.

Keyifli kullanımlar...

**Kaynak Video :** [http://www.vimeo.com/3289354](http://www.vimeo.com/3289354)