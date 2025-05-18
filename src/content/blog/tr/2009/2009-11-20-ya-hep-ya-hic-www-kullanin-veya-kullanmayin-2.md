---
title: "Ya hep ya hiç : www kullanın veya kullanmayın"
slug: ya-hep-ya-hic-www-kullanin-veya-kullanmayin-2
date: 2009-11-20
url: http://mfyz.com/tr/ya-hep-ya-hic-www-kullanin-veya-kullanmayin-2/
tags: ["crossdomain","redirect","subdomain","Sunucu Programlama","www"]
category: Sunucu Programlama
migration: {"wpId":238,"wpPostDate":"2009-11-20T20:22:35.000Z"}
lang: tr
---

Sitenizde http://www.mfyz.com veya http://mfyz.com şeklinde giren kullanıcıların farkını biliyor musunuz? Ya da insanlar nasıl bir alışkanlık ile böyle giriyorlar hiç farkına vardınız mı?

PHP geliştiricileri için : ufak bir kod ile bu yönlendirmeyi yapabileceğinizi biliyor muydunuz?
```
// subdomain redirection
if( substr($_SERVER[HTTP_HOST], 0, 3) != 'www' ){
	die(' window.top.location = &quot;http://www.mfyz.com'. $_SERVER[REQUEST_URI] .'&quot;; ');
}

```
Bu kod, mfyz.com'a www'suz giren yani http://mfyz.com şeklinde giren kullanıcıları http://www.mfyz.com şeklinde gitmek istedikleri URL'e yönlendirecektir.

"Bu ayrımdan dolayı oluşan problemler ve ikisinin ayrımı" konusunda daha detaylı bilgi için [döküman'dan devam ediniz](https://tr.mfyz.com/ya-hep-ya-hic--www-kullanin-veya-kullanmayin/).