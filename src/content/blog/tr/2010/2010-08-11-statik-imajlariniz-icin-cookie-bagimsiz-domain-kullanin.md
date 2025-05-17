---
title: "Statik imajlarınız için cookie bağımsız domain kullanın"
slug: statik-imajlariniz-icin-cookie-bagimsiz-domain-kullanin
date: 2010-08-11
url: http://mfyz.com/tr/statik-imajlariniz-icin-cookie-bagimsiz-domain-kullanin/
tags: ["Arayüz Programlama","cookie","optimization","subdomain","Sunucu Programlama"]
category: Arayüz Programlama
migration: {"wpId":254,"wpPostDate":"2010-08-11T13:58:54.000Z"}
lang: tr
---

Website optimizasyonu konusu büyüyen startupların artık başta düşünmeye ve endişe duymaya başladığı bir konu. Bir web sayfasının optimizasyonu konusunda birçok detaycı yaklaşım var, bunlardan birisinden bahsedeceğim şimdi. Web sayfanızda sayfa dışında yüklediğiniz bir çok dosya var. Bunlar genellikle imajlar, css ve javascript dosyaları. Tabi bunun dışında flash nesneleri, activex nesneleri, java nesneleri gibi başka dosyalar da olabilir. Bu dosyaları tarayıcı sunucudan isterken eğer domain cookie açık bir domain ise her istekte sunucunuza, istemcinizdeki cookie içerikleriniz gönderilir. Aynı şekilde sunucu da size gönderir. Eğer o domainde çalıştırdığınız uygulamanız çok cookie set etmemişse bu konunun çok önemi olmaz ancak uygulama geliştiricinin ne yaptığını bilemezsiniz ve uygulama geliştirici de bu konuyu düşünerek "daha az cookie set etmeliyim" yaklaşımı ile uygulama geliştirmez. Yani eğer çok cookie barındırıyorsanız veya cookie içerikleriniz büyükse (mesela bir formun state'inin encode edip büyük bir text olarak saklıyor olabilirsiniz) bu imaj (js, css) transerlerinde bir de bu cookieler gönderilip alınacağından belli sayıda dosyadan kayda değer bir yavaşlama hissedilecektir. Özellikle .NET'deki authentication cookie'leri gibi büyük boyutlu cookie saklayan uygulamalarda, eğer http request sayınız çok ise bu yavaşlama hissedilir derecede olabilir. Bunu engellemek için uygulamanızı sunduğunuz domain ile bu statik dosyaları sunduğunuz sunucuyu ayırmalısınız. Sunucuyu ayırmaktan kastım fiziksel olarak ayırmak değil. Mesela mfyz.com domaini için konuşursam, uygulama mfyz.com üzerinde çalışıyor ve kullanıcı bu domainden girip burada kalıyor. Ama bununla beraber gelen birçok statik dosya cookie disabled bir subdomainden sunulabilir. Mesela statik.mfyz.com gibi bir subdomainden sunulurken, uygulamada header'da include ettiğim bir js dosyası için
```
<script type="text/javascript" src="http://mfyz.com/js/main.js"></script>

```
yerine
```
<script type="text/javascript" src="http://statik.mfyz.com/js/main.js"></script>

```
kullanmam yeterli olacaktır. Gelen giden trafikte cookie'ler gönderilmeyeceğinden ve alınmayacağından transfer boyutları azalacaktır. Bu değişim birkaç dosyada bir anlam taşımayacaktır ama çok dosyada anlamlı olabilir. Dediğim gibi çok detay bir konu ama yapmasanız da böyle bir faktör olduğunu bilmelisiniz.