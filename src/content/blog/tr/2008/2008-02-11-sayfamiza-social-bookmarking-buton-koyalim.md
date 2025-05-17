---
title: "Sayfamıza “Social Bookmarking Buton” koyalım"
slug: sayfamiza-social-bookmarking-buton-koyalim
date: 2008-02-11
url: http://mfyz.com/tr/sayfamiza-social-bookmarking-buton-koyalim/
tags: ["addthis","boomark","del.icio.us","Diğer","digg","eklebunu","furl","reddit","social","technorati"]
category: Diğer
migration: {"wpId":131,"wpPostDate":"2008-02-11T02:19:39.000Z"}
lang: tr
---

Soyal link sitelerini çoğumuz kullanır olduk. Delicious, google bookmarks, digg, technorati vs. v0.7'de gördüğünüz gibi her sayfanın altında bu sitelerin ikonları var ve bu butonlar sayesinde gezindiğiniz sayfayı doğrudan o servise eklemek için istek gönderebiliyorsunuz. Bu butonları da çoğu sitede görmeye başladık. Bu dökümanda kısaca bu butonları koymanızı sağlayacak işlemlerden bahsedeceğim. Neredeyse bütün sosyal link siteleri url kaydetme formlarını GET methodu ile gelen verilerle otomatik doldurabiliyor. Böylece hiçbir API veya benzeri zorlukla uğraşmadan dışarıdan istek kabul edebiliyorlar. Bu sayede buton haline dönüştürmek çok kolay. Ben bu servislerin bağlantılarını
```
Bu sayfayı "Sosyal Bağlantı" (Social Bookmarking) sitelerine kaydedin
<ul>
	<li><a href="#">del.icio.us</a></li>
	<li><a href="#">Furl</a></li>
	<li><a href="#">Digg</a></li>
	<li><a href="#">Technorati</a></li>
	<li><a href="#">Reddit</a></li>
	<li><a href="#">Google Bookmarks</a></li>
	<li><a href="#">Simpy</a></li>
</ul>

```
htlm kodu ile sayfamın altına yerleştirdim. Gördüğünüz gibi sadece kendi kimlikleri ile **sayfayiImle** fonksiyonunu cagiriyorlar. Javascript kodum da şu:
```
function sayfayiImle(servis){
	var servis, url;
	// sosyal link imleme url'leri (dinamik)
	if( servis == 'delicious' )
		url = 'http://del.icio.us/post?v=4;url=$URL;title=$TITLE';
	else if( servis == 'furl' )
		url = 'http://www.furl.net/savedialog.jsp?p=1&v=1&u=$URL&t=$TITLE';
	else if( servis == 'digg' )
		url = 'http://digg.com/submit?phase=2&url=$URL';
	else if( servis == 'technorati' )
		url = 'http://www.technorati.com/cosmos/search.html?url=$URL';
	else if( servis == 'reddit' )
		url = 'http://reddit.com/submit?url=$URL&title=$TITLE';
	else if( servis == 'google' )
		url = 'http://www.google.com/bookmarks/mark?op=add&bkmk=$URL&title=$TITLE';
	else if( servis == 'simpy' )
		url = 'http://www.simpy.com/simpy/LinkAdd.do?href=$URL&title=$TITLE';
	else return false;

	// sayfa basligi ve url'sinin entity'sini duzeltelim
	url = url.replace( '$TITLE', encodeURIComponent(document.title) );
	url = url.replace( '$URL', encodeURIComponent(location.href) );

	// olusturulmus url'ye gidelim
	location.href = url;
}


```
Burada her servisin bir url'si var ve her servis 2 parametre istiyor. Bunlar kaydetmek istediginiz sayfanın URL'si ve Başlığı URL'lerde dinamik olarak **$URL** ve **$TITLE** stringlerini sonradan değiştirmek üzere dinamik url cümleleri oluşturdum. Fonksiyonun ilk parametresine göre, yani hangi servise kaydedilecekse o servisin cümlesini alıp, $URL ve $TITLE stringlerini document.title ve document.url ile değiştirip oluşan son URL'ye yönlendirdim sayfaları. Aslında yapılan iş çok basit, bunu dinamik olarak php'ye de yaptırıp statik linkler basabilirsiniz. Ama bu yöntem en pratik olanı :) Burada kullanmadığım diğer servislerin de url kurallarını öğrenip bu listeye ekleyebilirsiniz. Zira sosyal link sitelerini sayısı oldukça fazla.

#### AddThis hizmetini kullanmak

Başka bir tercihiniz de var, AddThis ([http://addthis.com/](http://addthis.com/)) hizmetini kullanmak. Bu servisde bulunan html kodunu ekleyerek sayfanıza bir buton koyuyorsunuz ve bu buton sayesinde tüm sosyal link sitelerine sayfanızı kaydedebilir hale geliyorsunuz. Buton opsiyonları: ![](/images/archive/tr/2008/02/addthis-social-sharing-buttons.png) şeklinde görünüyor sitenizde.