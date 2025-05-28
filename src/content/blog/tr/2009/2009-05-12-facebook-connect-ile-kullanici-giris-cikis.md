---
title: "Facebook connect ile kullanıcı giriş çıkış"
slug: facebook-connect-ile-kullanici-giris-cikis
date: 2009-05-12
url: http://mfyz.com/tr/facebook-connect-ile-kullanici-giris-cikis/
tags: ["api","Arayüz Programlama","connect","facebook"]
category: Arayüz Programlama
migration: {"wpId":140,"wpPostDate":"2009-05-12T07:44:04.000Z"}
lang: tr
---

#### Facebook Connect Nedir?

Facebook, uzun süredir api'si dışında connect ile javascript ve fbml tabanlı bir yapı ile web sitelerinde kullanıcı yetkilendirmesi (user authentication) işlemlerini facebook hesapları ile yapabilmelerini sağlıyor.

Bu servis ile facebook connect butonu gördüğünüz sitelerde üyelik yerine facebook hesabınız ile kolayca giriş yapıp sitelerdeki üye işlemlerini yapabiliyorsunuz. Şimdi facebook connect kullanarak sitenizdeki basit işlemler için (yorum yazma, üyelere özel bölümler) facebook entegrasyonu yapmayı anlatacağım. (Facebook connect videosunun yazılı ve Türkçe versiyonudur)

#### İhtiyaçlarınız

Facebook connect entegre edebilmek için :

*   Giriş seviyesinde XHTML bilgisi
*   Giriş seviyesinde javascript bilgisi

gerekiyor.

#### Terminoloji

Facebook connect aslında javascript üzerinden haberleşiyor fakat facebook, görüntülemede kendi xhtml sözlüğünü kullanıyor : FBML (Facebook Markup Language). Görüntülemede facebook'tan gelecek bilgilerde bu etiketleri kullanarak ekrana çıktı vereceğiz. Bağlantıyı yapabilmek için ise facebook'tan yükleyeceğimiz bir javascript var. Ardından da yazacağımız bir javascript fonksiyonu ile giriş yapıldıktan sonra yapılacak aksiyonları yaptıracağız.

#### Başlayalım

Normalde kullandığımız xhtml yorum formu kalıbı üzerinden başlayacağım.
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Facebook Connect</title>
<link rel="stylesheet" type="text/css" media="screen" href="form.css" />
</head>
<body>
<div class="comment Form">
<div id="user_box">
<label for="name">Name</label><br />
<input type="text" name="name">
</div>
<br />
<div>
<label for="message">Message</label><br />
<textarea name="message"></textarea>
</div>
</div>
</body>
</html>

```
Bu kodun çıktısı :

![](/images/archive/tr/2009/05/fbconnect_1.gif)

şeklinde olacaktır.

Facebook connect'i kullanabilmek için 3 işlem yapacağız. Birincisi FBML için XML sözlüğü belirtmek, ikincisi javascipt api'sini yükletmek, üçüncü adımda da facebook uygulama anahtarlarınız ile facebook connect'i başlatmak.

Facebook nesneleri çizdirmek için FBML etiketleri kullanacağız. FBML etiketlerini tarayıcılar yorumlayabilmesi için html etiketine FBML sözlüğünü belirtmemiz gerekecek. Bunun için
```html
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
```
satırını
```html
<html xmlns="http://www.w3.org/1999/xhtml"
xmlns:fb="http://www.facebook.com/2008/fbml" xml:lang="en" lang="en">
```
olarak değiştireceğiz

Böylece az sonra ekleyeceğimiz facebook etiketlerini tarayıcınız yorumlayabilecek.

Şimdi facebook connect javascript'ini yükleyelim. HTML'de meta etiketleri içerisine
```html
<script src="http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php" type="text/javascript"></script>
```
Şimdi yapacağınız işlem facebook üzerinde kendinize ait bir uygulama oluşturmak olacak. Facebook Connect kullanabilmek için bir uygulamanızın olması gerekiyor. Bunun için de önce Developers uygulamasını yüklemelisiniz. Sırayla aşağıdaki adımları izleyin:

[http://www.facebook.com/developers/createapp.php](http://www.facebook.com/developers/createapp.php) adresinden uygulama oluşturacağız fakat eğer "Developers" uygulamasını kullanmıyorsanız bu bağlantıya gittiğinizde önce Developers uygulamasını eklemenizi isteyen bir sayfaya ulaşırsınız.

![](/images/archive/tr/2009/05/fbconnect_2.gif)

Uygulamayı eklediğinizde Developers uygulaması içinden kendinize yeni uygulama oluşturabileceksiniz. Sağ üst köşedeki "Set up New Application" butonuna tıklayın.

![](/images/archive/tr/2009/05/fbconnect_3.gif)

Yeni uygulama oluşturma sihirbazında:

![](/images/archive/tr/2009/05/fbconnect_4.gif)

uygulama adını belirleyip facebook uygulama kurallarını onayladığınızı belirttikten sonra değişiklikleri kaydet tuşuyla uygulamanızı oluşturabilirisiniz. Sonra detaylı bilgileri girebileceğiniz uygulama düzenleyicisinde soldaki menüde Connect seçeneğini göreceksiniz.

![](/images/archive/tr/2009/05/fbconnect_5.gif)

Connect ile ilgili bilgilerden Connect URL'i belirtmek zorundasınız. Bu url, facebook connect'i kullanacağınız sayfanın adresi olmak zorunda. Mesela siz http://www.deneme.com/giris/ sayfasında facebook connect kullanacaksanız buraya bu adresi girmek zorundasınız. Facebook connect'i zaten sadece giriş sayfanızda kullanacaksınız. URL'leri ayarladıktan sonra değişiklikleri kaydetmeyi unutmayın. Son durum olarak uygulama özet ekranınız aşağıdaki gibi olacaktır:

![](/images/archive/tr/2009/05/fbconnect_6.gif)

Burada kırmızı ile işaretlediğim, uygulamanızın API Anahtarını facebook connect javascript başlatıcısında kullanacağız. Bunun için de html'inizin sonuna body etiketinizin içine
```html
<script type="text/javascript">
// facebook init
FB.init("80ee1ac2834c79cde1b567afdd13bbb1", "xd_receiver.html");
</script>

```
kodunu eklemelisiniz. Burada ikinci parametrede belirtilen xd_receiver.html dosyası facebook ile haberleşmek için kullanılacak olan aracı dosya. Bu dosyayı da aşağıdaki kodu az önce eklediğiniz javascript fonksiyonunda ikinci parametrede belirttiğiniz isimle (xd_receiver.html) kaydedin.
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<body>
<script src="http://static.ak.connect.facebook.com/js/api_lib/v0.4/XdCommReceiver.js" type="text/javascript"></script>
</body>
</html>

```

Son olarak formumuza facebook connect butonu ekleyelim. Bunun için formda ilk div içinde yer alan input'un altına

```html
<br />
veya facebook ile baglanabilirsiniz <fb:login-button></fb:login-button>

```
kodunu ekleyeceğiz. Facebook connecti başarıyla sisteminize tanıtmış olduk ve sayfamız şu şekilde görünmeye başladı:

![](/images/archive/tr/2009/05/fbconnect_7.gif)

Eğer facebook connect butonuna basarsanız facebook'un lightbox'ı içerisinde giriş formu ekrana gelecektir.

![](/images/archive/tr/2009/05/fbconnect_8.gif)

Eğer facebook'a o oturumda zaten giriş yapmış iseniz sadece facebook connect ile bu siteye bağlanmak istediğinizi onaylamanızı isteyen bir kutu ekrana gelecektir:

![](/images/archive/tr/2009/05/fbconnect_9.gif)

Bu adımları geçince sayfada şimdilik bir değişiklik olmayacaktır, fakat facebook connect ile sitenize bağlanmış oldunuz. Şimdi isim kutusunu kaldırıp facebook'tan kullanıcı adını ve resmini alalım. Bunun için giriş yapıldığında bir javascript fonksiyonu çağırmamız gerekecek. Fonksiyonu yazmadan önce çağrıyı yapmak için, eklediğimiz facebook buton koduna onLogin özelliği ekleyelim.
```
<br />
veya facebook ile baglanabilirsiniz <fb:login-button></fb:login-button>

```
kodunu
```html
<br />
veya facebook ile baglanabilirsiniz <fb:login-button onlogin="updateUserBox();"></fb:login-button>

```
olarak değiştirelim.

Şimdi sayfanın sonundaki script içine fonksiyonumuzu tanımlayalım.
```html
function updateUserBox(){
userBox = document.getElementById('user_box');
userBox.innerHTML = '<fb:profile-pic uid="loggedinuser"></fb:profile-pic><br />'
+ '<fb:name uid="loggedinuser" useyou="false"></fb:name><br />'
+ '<a href="#logout" onclick="FB.Connect.logoutAndRedirect(\'./\');">Logout</a>';
FB.XFBML.Host.parseDomTree();
}

```
fonksiyonunu ekleyelim. Fonksiyon basitçe user_box kimlikli nesne içine 3 element ekliyor. Elementler adından da anlaşılacağı gibi ilki prfil fotosu, ikincisi facebook'daki görünen adı, diğer element de çıkış bağlantısı.

Bu koddan sonra facebook connect butonuna basıp giriş yaptığınızda sayfa aşağıdaki gibi şekilleniyor:

![](/images/archive/tr/2009/05/fbconnect_10.gif)

Çıkış bağlantısına bastığınızda facebook'tan giriş yaptığınız kullanıcı bilgileri silinecektir.

Sonuçta facebook connect butonu ile giriş yapılınca kullanıcı bilgilerini alabilir olduk. Fakat sayfa her yenilendiğinde facebook connect butonuna basılması gerekecek. Her sayfa yüklendiğinde eğer giriş yapılmışsa updateUserBox fonksiyonunun yaptığı işi yaptırmak için facebook connect init fonksiyonuna bir parametre daha vereceğiz:
```
FB.init("80ee1ac2834c79cde1b567afdd13bbb1", "xd_receiver.html", {"ifUserConnected" : updateUserBox});

```
Son eklediğimiz parametrede login durumunda çalışacak fonksiyonu belirttik.

Sonuç olarak html dosyamız şu şekilde şekillendi :
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Facebook Connect</title>
<link rel="stylesheet" type="text/css" media="screen" href="form.css" />
<script src="http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php" type="text/javascript"></script>
</head>
<body style="padding: 40px; font-family: Arial;">
<div class="comment Form">
<div id="user_box">
<label for="name">Name</label><br />
<input type="text" name="name" /><br />
<br />
veya facebook ile baglanabilirsiniz <fb:login-button onlogin="updateUserBox();"></fb:login-button>
</div>
<br />
<div>
<label for="message">Message</label><br />
<textarea name="message"></textarea>
</div>
</div>
<script type="text/javascript">
FB.init("80ee1ac2834c79cde1b567afdd13bbb1", "xd_receiver.html", {"ifUserConnected" : updateUserBox});

function updateUserBox(){
userBox = document.getElementById('user_box');
userBox.innerHTML = '<fb:profile-pic uid="loggedinuser"></fb:profile-pic><br />'
+ '<fb:name uid="loggedinuser" useyou="false"></fb:name><br />'
+ '<a href="#logout" onclick="FB.Connect.logoutAndRedirect(\'./\');">Logout</a>';
FB.XFBML.Host.parseDomTree();
}
</script>
</body>
</html>

```

#### Sonuç

Bu dökümanda anlatılanlar gerçekte çok fazla işinize yaramayacaktır. Çünkü burada facebook connect'i html'de önyüze entegre etmeyi gördük fakat çoğu üyelikle ilgili sistemde işinize yarayacak olan profil fotosunun büyük hali, kullanıcının ismi dışındaki bilgileri de aslında API aracılığı ile php, javascript gibi ortamlarda kullanarak birşeyler çıkarmak durumunda kalacaksınız. PHP api yardımı ile facebook özelliklerinin kullanımına başka dökümanda yer vereceğim.

Yine de api ile kullanacağınız sayfalarda facebook connect ile giriş-çıkış ve oturum işlemlerini bu dökümanda anlatılan methodlarla yapmanız gerekecek.

**Kaynak:** [http://www.facebook.com/video/video.php?v=630563174283](http://www.facebook.com/video/video.php?v=630563174283)