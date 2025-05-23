---
title: "RSS'lerden Lifestream"
slug: rsslerden-lifestream
date: 2009-09-06
url: http://mfyz.com/tr/rsslerden-lifestream/
tags: ["lifestream","parse","PHP","rss","xml"]
category: PHP
migration: {"wpId":148,"wpPostDate":"2009-09-06T18:47:15.000Z"}
lang: tr
---

#### Lifestream da nesi?

Kelime açılımından anlyabileceğiniz birşey ama bilmeyenler için özetliyim. Şu an sağda solda bir sürü web servisinde, hayatınıza dair bilgisayarda yaptığınız herşeyi paylaştığınız servisler var ve bunları kullanıyorsunuzdur illaki. Örneğin :

*   last.fm ile müziğinizi,
*   delicious ile linklerinizi,
*   tumblr, wordpress vs ile yazılarınızı,
*   flickr ile fotograflarınızı
*   ...

Bu servislerin neredeyse hepsi RSS ile içeriklerinizi paylaşıyorlar. Bu dökümanda bunun gibi çeşitli servislere ait içerikleri RSS aracılığı ile süzgeçleyip kronolojik bir sıraya sokup sosyal geçmişinizi listelemeye yönelik bir uygulama yazacağım. Nasıl birşey olduğunu merak ediyorsanız [http://mfyz.org](http://mfyz.org) adresinden benim sosyal servislerdeki akışımı görüntüleyebilirsiniz.

#### Tamamiyle dinamik

Bu işin güzel yanı, hazırladığınız sayfa tamamen organik bir yapıda sürekli sizin farkında olmadan kaydettiğiniz sosyal verilerinizi derleyecektir. Mesela müzik dinlerken beğendiğim bir şarkı veya bookmarklarıma eklediğim bir link bu servislere herhangi bir çabama gerek kalmadan ekleniyor. Bu eklenen içerikler yine hiçbir müdahale olmadan benim lifestream sayfamda görüntüleniyor.

#### Simple pie

Bunu yapmak için bu sosyal medya servislerindeki rss kaynaklarınızı işleyerek yapacağız. Bunun için php'de simple pie kütüphanesini kullanacağız ve bu kütüphanenin kullanımı ve rss okumak için yardımcı fonksiyon açılımı için önce [Simplepie ile rss işlemek (okumak)](/simplepie-ile-rss-islemek-okumak) dökümanını inceleyin.

Simple pie ile rss okuma konusunda bilgi sahibi olduğunuzu varsayarak dökümana devam ediyorum (eğer yoksa öncelikle verdiğim dökümanı uygulayın).

#### Hazırlık ve Başlangıç

Öncelikle içerik kaynaklarınızı (rss) bir dosyada çıkartın. Bu kaynakları bir dizi şeklinde tanımları tutacağımız dosyaya yazalım. Bunun için config.php diye bir dosyada $feeds adında bir dizi içerisinde kaynak url'i ve adı olarak saklayacağım. Örnek kaynak dizisi şöyle olacaktır :
```
$feeds = array(
    'zamazing' => array(
        'name'    => 'Zamazing.org',
        'url'     => 'http://www.zamazing.org/rss.xml'
    ),
    'sabah' => array(
        'name'    => 'Sabah Teknoloji Haberleri',
        'url'     => 'http://www.sabah.com.tr/rss/teknoloji.xml'
    )
);

```
Bu şekilde istediğiniz kadar rss kaynağı tanımlayabilirsiniz. Az sonra simplepie kullanarak bu kaynakları okuyacak, kronolojik sıralayıp çıktısı sayfalar halinde oluşturacağız.

Şimdi index.php dosyasında kaynakları okumaya başlayalım.
```
require_once('config.php');
// libs
require_once('lib/mypie.php');
// getting feed contents
foreach ($feeds as $feedKey => $feed){
    // getting contents
    $results = @readRSS($feed[url]);
    foreach ($results[items] as $item){
        // adding item array to feed type
        $itemArray = $item;
        $itemArray[type] = $feedKey;
        // adding all items
        $allItems[] = $itemArray;
    }
}

```
Yukarıda config ve mypie dosyalarını include ettik. Config'de rss kaynakları tanımları var, mypie'de ise simplepie kullanarak rss kaynağı okuyan fonksiyonumuz var. Bu fonksiyon hakkında daha detaylı bilgi almak için [Simplepie ile rss işlemek (okumak)]("http://mfyz.com/?/dokuman/114/simplepie-ile-rss-islemek-okumak/") dökümanını inceleyin.

$feeds dizisini dönerek feed bilgilerini ve anahtar kelimesini alıyoruz. Döngü içinde ise feed url'deki kaynağı okuyoruz. Eğer hata olursa o feed ingore edilip bir sonrakine geçiliyor. Eğer okundu ise $allItems adlı bir diziye okunan veri ekleniyor. Tabi haber eklenirken tür olarak da o feed'in anahtar kelimesi ekleniyor. Bu sayede ekrana basarken, farklı haber kaynakları için farklı çıktı verebileceğiz.

Şimdi elimizde tüm kaynaklardaki tüm haberler $allItems adlı dizide tutulmakta. Bu dizideki veri yapısın daha iyi anlamanız için dizideki ilk elemanı verelim :
```
Array
(
    [title] => Mario geldi
    [date] => 2009-09-04 17:07:51
    [url] => http://mfyz.tumblr.com/post/179630132
    [description] => Mario geldi (HTML Content)
    [type] => tumblr
)

```
Gördüğünüz gibi tarih, başlık, url, kaynağı ve içerik olarak basit anahtarlarla ihtiyacımız olan tüm bilgiler mevcut. Şimdi bu diziyi tarihsel sıraya sokalım. Bunun için multi-dimmension dizilerde kolona göre sıralama yapan yardımcı bir fonksiyon kullanacağız.
```
// sorting all entries
$allItems = @arrayMultiSort($allItems, 'date');

```
Bu fonksiyonu çağıdrıktan sonra $allItems dizisindeki haberler artık kronolojik sıraya girmiş oldu. Tam istediğimiz kıvama geldi fakat elimizdeki dizide yüzlerce haber olabilir isterseniz bu diziyi belirli bir tarihe kadar kırpabilirsiniz. Mesela son 2 haftaki haberleri listelemek isterseniz $allItems'i dönerek date alanını timestamp'a çevirip 2 haftadan eski haberleri tespit edebilirsiniz. Doğal olarak onları temizleme şansınız da olur.

Ben herhangi bir kırpma işlemi yapmadan tüm haberleri sayfalayarak göstereceğim.
```
// pagination
$itemCount = count($allItems);
if( $itemCount > $limit ){
    // calculating page count
    $pageCount = ceil( $itemCount / $limit );
    // current page control
    $page = intVal($_GET[page]);
    if( $page < 1 or $page > $pageCount ) $page = 1;
    // paged item array
    $pagedItems = array_slice($allItems, ($page-1) * $limit, $limit);
} else{
    $page       = 1;
    $pageCount  = 1;
    $pagedItems = $allItems;
}

```
config.php dosyasında $limit adında bir değişkende her sayfada kaç girdi gösterileceğini belirleyin. Bunu bu sayfa içinde de yapabilirsiniz ama config.php'de tüm tanımların durması daha mantıklı olacaktır. Yukarıda bilinen sayfalama algoritması kullanarak sayfa sayısı ve şu anki sayfa hesabı yapılıyor. array_slice ile de o sayfada gösterilecek haberler $pagedItems dizisine parçalanıyor. Artık sayfada:

*   $page
*   $pageCount
*   $pagedItems

değişkenlerini kullanarak sayfalamayı ve haber içeriklerini basabiliriz. Gerekli basit html yapısını da kullanarak haberleri ekrana basacak html kodu da şöyle olacak (yani index.php dosyasının devamı)
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Teknolojik Organizma</title>
    <link rel="stylesheet" type="text/css" media="screen" href="style.css" />
</head>
<body>
    <div class="container">
        <h1 class="head"><a href="./"><b>Teknolojik Organizma</b></a></h1>
        Kendi Kendine Yaşayan, Büyüyen Derlemasyon Blog-umsu
        <br><br>
        <div id="stream">
            <?php
            foreach ($pagedItems as $item){
                // item's feed-service info
                $feedinfo = $feeds[ $item[type] ];
                // content
                $content = $item[description];
                // adding to content
                print '
                <div class="item '. $display .' '. $item[type] .'">
                    <h3 class="title"><a class="permalink" href="'. $item[url] .'" target="_blank">'. $item[title] .'</a> '. ($item[date] ? '<span class="time">('. substr($item[date], 0, 16) .')</span>':'') .'</h3>
                    '. ($content ? '<div class="content-text">'. $content .'</div>':'') .'
                </div>
                ';
            }
            ?>
        </div>
        <div class="clear"></div>
        <div class="pagination">
            <br clear="all">
            <?php
            if( $pageCount > 1 ){
                print 'Sayfa : ';
                for ($i=1; $i <= $pageCount; $i++){ 
                    print '<a href="?page='.$i.'"'. ($i==$page ? ' class="current"':'') .'>'.$i.'</a> ';
                }
            }
            ?>
        </div>
    </div>
</body>
</html>

```
Bu dökümanda anlatılan kod, proje olarak http://projects.mfyz.com/lifestream/ adresinde Lifestream olarak bulunabilir. Buradaki kodun çıktısını merak ediyorsanız : http://projects.mfyz.com/lifestream/demo/ adresinde biraz şekillendirilmiş şekilde bulabilirsiniz.

Bu kodu biraz daha özelleştirerek [http://mfyz.org](http://mfyz.org)'daki gibi bir lifestream elde edebilirsiniz.