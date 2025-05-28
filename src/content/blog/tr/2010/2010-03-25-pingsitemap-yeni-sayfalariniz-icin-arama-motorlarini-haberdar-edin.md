---
title: "PingSitemap: Yeni sayfalarınız için arama motorlarını haberdar edin"
slug: pingsitemap-yeni-sayfalariniz-icin-arama-motorlarini-haberdar-edin
date: 2010-03-25
url: http://mfyz.com/tr/pingsitemap-yeni-sayfalariniz-icin-arama-motorlarini-haberdar-edin/
tags: ["google","ping","seo","sitemap","sitemap.xml","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":154,"wpPostDate":"2010-03-25T15:22:16.000Z"}
lang: tr
---

Sitemap'ın öneminden ve nasıl üreteceğinizden daha önce bahsetmiştim ([Dinamik sitemap.xml oluşturmak](/dinamik-sitemapxml-olusturmak)).

### Sitemap.xml dosyanızı oluşturdunuz peki sonra?

Tabiki arama motorları servislerinin botları sitenize geldiğinde ilk olarak sitemap.xml'inizi bulmaya çalışacak, bulduğu zaman da site indeksini hızlıca çıkaracaktır. Fakat botlar sık sık sayfalarınızı gezse de sitemap.xml'inizi her zaman anlık olarak kontrol etmezler.

Arama motorlarının ping servisleri vardır ve bu servisleri kullanarak sitemap.xml'inizin güncellendiğini, hemen kuyruğa alınmasını istediğinizi belirtebilirsiniz. Bu uygulamayı birçok büyük web servisi, wordpress, blogger gibi blog hizmeti veren servisler, hatta kendi sunucunuza kuracağınız wordpress de bunu yapmaktadır.

Yeni bir içerik girildiği zaman sitenize yeni sayfalar eklenmiş, bazı varolan sayfaların da güncellenmiş olması anlamına gelmektedir. Arama motorlarının bu değişiklikleri hemen tarafamasını isterseniz az sonra anlatacağım ufak teknikle bunu yapabilirsiniz.

### Ping servisleri

Arama motorlarının birçoğu ping servisini bir URL üstünden sitemap.xml dosyanızın adresini alarak yapar. Aslında bir çeşit kayıt olma işlemidir ama çok daha basit hali. Örneğin google'ın ping servisi

```
http://www.google.com/webmasters/sitemaps/ping?sitemap=
```

şeklindedir. Tabiki bu url'in sonuna sitenizin sitemap.xml dosyasının url'ini vererek bu adresi çağırmanız gerekir.

Şimdi kod üzerinde bir dizide popüler arama motorlarının ping servisleri ve yapılarını göreceksiniz. Zaten kodun yaptığı işi hemen anlayabilirsiniz. Basitçe sitemap.xml dosyanızı belirten urlleri "file" fonksiyonu ile almaya çalışıyoruz. Zaten bu url'ler ziyaret edildiği ve cevapları geldiği için bu servisler pinglenmiş olacak.

```php
$services = array(
	'http://www.google.com/webmasters/sitemaps/ping?sitemap=###',
	'http://search.yahooapis.com/SiteExplorerService/V1/ping?sitemap=###',
	'http://webmaster.live.com/ping.aspx?siteMap=###',
	'http://www.bing.com/webmaster/ping.aspx?siteMap=###',
	'http://submissions.ask.com/ping?sitemap=###'
);

$mysitemapfile = 'http://mysite.com/sitemap.xml';

foreach($services as $service){
	$url = str_replace('###', $mysitemapfile, $service);
	@file($url);
}

```