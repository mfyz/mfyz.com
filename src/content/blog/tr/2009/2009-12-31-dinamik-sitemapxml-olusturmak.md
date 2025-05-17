---
title: "Dinamik sitemap.xml oluşturmak"
slug: dinamik-sitemapxml-olusturmak
date: 2009-12-31
url: http://mfyz.com/tr/dinamik-sitemapxml-olusturmak/
tags: ["generator","google","php","sitemap","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":153,"wpPostDate":"2009-12-31T18:45:30.000Z"}
lang: tr
---

"Sitemap nedir? Önemi nedir?" diyenler [şuradan (Vikipedi: Site haritası)](http://tr.wikipedia.org/wiki/Site_haritası) başlasınlar. Şimdi gelelim öneminden çok üretilmesine. Basit bir xml aslında. Fakat eğer sürekli güncellenen yapıda bir siteniz var ise bu xml'i periyodik olarak yenilemeniz gerekir. Tabi ki yüzlerce sayfası olan bir sitede (örneğin blog) bu linklerin envanterini bir xml'de tutmak oldukça zor olacaktır. Çoğu web uygulamasında sayfaların içerikleri veritabanında tutulan bilgilerin listelenmesi ve detay sayfalarından oluşmaktadır. Yazılar, Arşiv sayfaları, Fotograf sayfaları, Forumlar, forum konularının bulunduğu sayfalar vs. Bu sayfaları listeleyen/gösteren php dosyaları olduğunu düşünürsek sitemap.xml'i oluşturacak kodun bu içerikleri sadece adresleyerek listelemesini yapacak bir kod olduğunu söyleyebiliriz. Bu içerikleri listeleyerek sadece o içeriklere ait sayfaların URL'lerini oluşturan bir php dosyası düşünün. Basitçe örnekleyeceğim. Mesela forum adında bir tablonuz var ve bu forum'un site haritası için sadece URL'leri gerekli ve bunu oluşturan ufak bir kod vermek gerekirse :
```
// forum konularini veritabanindan alalim
$sorgu = mysql\_query("select id from forum\_konular order by tarih asc");
$forum\_konu\_adresleri = array();
while( $konu = mysql\_fetch\_assoc($sorgu) ){
    $forum\_konu\_adresleri\[\] = 'http://mfyz.com/?/konu/'. $konu\[id\] .'/';
}

```
bu kod, forum konularının sayfalarını URL dizisi olarak oluşturur. Yani 156 nolu forum konusuna erişilecek URL http://mfyz.com/?/konu/156/ şeklindeyse bu URL'i veritabanının yapısına göre oluşturduğunuzu düşünün. Şimdi sitenizin diğer bölümlerini de bu URL listenize ekleyin. Bu liste 50.000 URL'e kadar olabilir, çünkü sitemap.xml dosyalarında en fazla 50.000 url indeksleyebilirsiniz. Bütün url listenizi oluşturduğunuzda aşağıdaki yapıda bir XML oluşturmak için gerekli ufak php kodunu vereceğim. Önce örnek bir sitemap.xml dosyasına bakacak olursak:
```
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.fem14.tr.gg/schemas/sitemap/0.9 
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>http://www.mfyz.com/adres1</loc>
        <lastmod>2007-10-10</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>http://www.mfyz.com/adres2</loc>
        <lastmod>2007-10-10</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
</urlset>

```
Burada urlset nodu içinde url elementini ve loc, lastmod, changefreq, priority alt elementlerini görebilirsiniz. Şimdi basitçe elinizde olan sitedeki tüm sayfaları belirten URL dizisini dönüp bu XML'i oluşturabiliriz. Eğer veritabanınınzda bu sayfaların oluşturulma tarihleri gibi bir bilgi saklıyorsanız XML'de bunu belirtmeniz iyi olacaktır. Bundan önemlisi changefreq ve priority'dir. changefreq belirttiğiniz url'deki sayfanızın değişme sıklığını arama motoruna söyler. Arama motoru da o değişiklik sürecine göre o sayfayı o periyodda tarayacaktır. Priority de o sayfanın sitenizdeki içerik etkisini ifade edebilir. Mesela forum sitenizin asıl içeriği olmayabilir, ya da fotograflar sitenizin içeriğine çok etkisi olabilir ve 0-1 arasında yüzdelik belirtir gibi öncelik belirtebilirsiniz. Şimdi bir URL dizisini sitemap.xml dosyasına çevirecek php koduna bakarsak:
```
// begin xml content
$XML\_Content = '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.fem14.tr.gg/schemas/sitemap/0.9 '."\\\\n".
'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\\\\n";
foreach ($urllist as $url){
    // defaults
    $date     = date('Y-m-d');
    $freq     = 'monthly';
    $priority = '0.5';
    // setting values
    if( is\_array($url) ){
        // custom params
        if( $url\[date\] )     $date     = $url\[date\];
        if( $url\[freq\] )     $freq     = $url\[freq\];
        if( $url\[priority\] ) $priority = $url\[priority\];
        $url = $url\[url\];
    }else{
        $url = $url;
    }
    // adding to xml content
    $XML\_Content .= "\\\\t<url>\\\\n".
    "\\\\t\\\\t<loc>$url</loc>\\\\n".
    "\\\\t\\\\t<lastmod>$date</lastmod>\\\\n".
    "\\\\t\\\\t<changefreq>$freq</changefreq>\\\\n".
    "\\\\t\\\\t<priority>$priority</priority>\\\\n".
    "\\\\t</url>\\n";
}
$XML\_Content .= "</urlset>";

```
en son XML\_Content değişkeninde sakladığınız içeriği
```
$file = fopen('sitemap.xml', 'w') ){
fwrite($file, $XML\_Content);
fclose($file);

```
ile sitemap.xml dosyası olarak kaydedebilirsiniz. Bu işleri yaptırdığınız php dosyasını da sunucunuzun cron'una haftada veya ayda bir çalışacak şekilde ayarlarsanız site içeriğinizi düzenli olarak bu dosyada toplayabilirsiniz. Siteye yeni bir içerik eklendiği zaman da bu betiğinizi tekrar çalıştırarak eklenen içeriği doğrudan sitemap.xml'inize ekleyebilirsiniz. Google Webmaster Tools kullanarak bu sitemap.xml dosyanızı google botlarına düzenli kontrol etmesi için gönderebilir, google'ı pingleyerek bu dosyayı taramasını söyleyebilirsiniz. Arama motoru servislerini pinglemek ile ilgili konuyu başka bir yazıda anlatacağım.