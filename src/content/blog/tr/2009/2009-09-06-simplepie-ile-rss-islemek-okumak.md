---
title: "Simplepie ile rss işlemek (okumak)"
slug: simplepie-ile-rss-islemek-okumak
date: 2009-09-06
url: http://mfyz.com/tr/simplepie-ile-rss-islemek-okumak/
tags: ["parse","rss","simple pie","simplepie","Sunucu Programlama","xml"]
category: Sunucu Programlama
migration: {"wpId":147,"wpPostDate":"2009-09-06T18:44:55.000Z"}
lang: tr
---

#### Nerede kullanacağız?

Rss şu anda nerdeyse veri kaynağı oluşturma/kullanma konusunda standartlaşmaya başladı. Artık her sitede, başka sitelerden alınana içerikleri görebiliyorsunuz. Bunun en büyük nedeni, her sitenin (aslında hazır bloglardaki rss kaynakları sayesinde) bir rss kaynağı var ve verilen bilgileri bu kanallarla belirli standartlarda internette yayıyoruz. Bu kaynakları alıp/derleyip çeşitli alanlarda kullanabilirsiniz. Bu konuda hayal gücünüze ne geliyorsa uygulamak mümkün.

Bu dökümanda kısaca bir rss kaynağını php ile yazılmış simple pie kütüphanesi ile basitçe nasıl diziye çevirebileceğimizi, geçici olarak belleğe alabileceğinizi (cache) göstereceğim.

Bu konu ile ilgili Türkçe kaynak var aslında, bu yazıyı yazarak aynı şeylerden bahsetmek pek içimden gelmiyor fakat mfyz.com'daki diğer dökümanlarda sık sık rss işleme ile ilgili konulardan bahsedeceğim için bu dökümanı iç bir kaynak olarak özet de olsa yazmak zorundayım. Olabildiğince farklı bir açıdan ele almaya çalışacağım.

#### Simple Pie Nedir?

Php ile yazılmış bir xml parser sınıfıdır. Spesifik olarak da RSS tipi xml dosyalarını okumak için tasarlanmış, cache gibi güzellikleri bulunan bir sınıftır. Bu sınıfı kullanarak bir rss dosyasını nasıl parse edeceğimizi basitçe göstereceğim.

Öncelikle sitesinden simplepie kütüphanesini indirin. http://simplepie.org/ adresinden download bölümünde son sürüme ait indirme bağlantısı bulabilirsiniz.

İndirdiğiniz paket içerisinde demo bir uygulama, dökümantasyon ve api test dosyaları bulacaksınız. Bizim burada kullanacağımız aslında tek dosya simplepie.inc dosyasıdır. Bu dosyanın uzantısını .php olarak kullanmanızı tavsiye ederim (simplepie.inc.php).

Simplepie otomatik olarak okuduğu feedleri 1 saatlik belleklemektedir. Bunu kaldırabilirsiniz fakat 1 saatlik belleğe almak oldukça iyi bir performans kazandıracaktır. Bu noktada uygulama dizininizde "cache" adında bir dizin oluşturup yazma haklarını ayarlamanız gerekmektedir (755 veya 777).

#### Basitçe kullanımı

Bir örnek uygulama ile anlatacağım. İnidirdiğiniz simplepie paketi içindeki simplepie.inc dosyasını uygulamanızın içine koyun. index.php içerisinde include ederek kullanacağız. Cache dizinini de oluşturup izinlerini ayarlayın.

Örnek olarak bir uygulama yapsak da ben burada yardımcı bir fonksiyon kullanacağım. Bu fonksiyon ile basitçe url'sini verdiğimiz feed'i geniş bir dizi olarak döndürecek.

```
handle\_content\_type();
    // params
    if($params\[expire\]) $feed->set\_cache\_duration($params\[expire\]);
    // feed info
    $result\[feed\]\[title\]       = $feed->get\_title();
    $result\[feed\]\[url\]         = $feed->get\_permalink();
    $result\[feed\]\[description\] = $feed->get\_description();
    // items
    $i = 1;
    foreach ($feed->get\_items() as $item){
        $items\[\] = array(
            'title'       => $item->get\_title(),
            'date'        => $item->get\_date('Y-m-d H:i:s'),
            'url'         => $item->get\_permalink(),
            'description' => $item->get\_description(),
        );
        $i++;
        if( $size and $i > $size ) break;
    }
    // adding items to result
    $result\[items\] = $items;
    // result
    return $result;
}
?>

```

Koddan simplepie kullanımını özetleyeceğim.

readRSS fonksiyonunun parametreleri: - url - expire

Bu parametreleri dizi olarak vermelisiniz. Ya da doğrudan tek parametre ile string verirseniz sadece url parametresi ayarlanacaktır.

expire, bellekte ne kadar sürede çürüyeceğini ifade eder. Oraya 300 saniye olarak belirtirseniz kullanıcılar sürekli sayfanızı derlese bile 5 dakikada (300sn) bir rss kaynağı okunacaktır. Bu süreyi belirtmezseniz 1 saat olarak ayarlanacaktır.

Neyse, şimdi sırayla simplepie kullanarak bir rss feed'i nasıl parse ettiğimi anlatayım :

```
$feed = new SimplePie($url);

```

ile yeni bir nesne oluşturup feed adresini ayarlıyoruz.

```
$feed->handle\_content\_type();

```

ile de rss kaynağını alıp okuma işlemini yapıyoruz.

```
$feed->set\_cache\_duration(3600); // 1 saat = 3600 saniye

```

ile de method adından anlayacağınız gibi bellek süresini belirtebiliyoruz. Belirtmezsek 1 saat olarak ayarlanacaktır. Bu sayede bu rss kaynağı sürekli okunmak yerine internetten saate 1 kere alınıp işlenip belleklenecektir.

Ben her fonksiyonda genel olarak sonuç dizisi oluşturur ve onu dönerim. Burada bir feed için : - feed'e ait meta data - feed içindeki konulara ait bir multiarray söz konusudur.

Bunun için sonuç dizimi "feed" ve "items" olarak 2 alt diziye ayırıyorum ve "feed" dizisine o rss kaynağı için xml içinde belirtilen feed adı, adresi, açıklamasını kaydediyorum. Bunu da sırayla :

```
$feed->get\_title();       // feed başlığı/adı
$feed->get\_permalink();   // feed ana içerik bağlantısı
$feed->get\_description(); // kaynak açıklaması

```

methodları ile alabiliyoruz. Bu konuda daha derin açıklama yazmaya gerek yok.

feed içindeki konuları da $feed->get\_items() methodu ile aslında dizi olarak alabiliyoruz. Ben de bu diziyi foreach ile dönerek içindeki nesnelerin alt methodlarını kullanarak her konu için gerekli bilgileri alıp sonuç dizisine "items" alt dizisi içine ekliyorum. Bu foreach içinde bazı methodlarla sıradaki konuya ait bilgileri alıyorum. Bu methodlar :

```
$item->get\_title();                 // konu başlığı

$item->get\_date('Y-m-d H:i:s') ;    // konunun tarihi, burada php'nin date
                                    // parametreleri ile istediğiniz
                                    // formatta alabilirsiniz.

$item->get\_permalink();             // konuya ait bağlantı

$item->get\_description();           // konu açıklaması
                                    // hatta bu kısım genelde html olarak
                                    // konu içeriğini ifade eder.

```

Bu methodlarla konu içeriklerini alıp sonuç dizisine yazıyorum.

Fonksiyon sonunda da sonuç dizisini dönüyorum.

Bu fonksiyonun kullanımı için bir örnek vermek gerekirse :

```
print\_r( readRSS('http://mfyz.tumblr.com/rss') );

```

Çıktısı şöyle olacaktır :

```
Array
(
    \[feed\] => Array
        (
            \[title\] => mfyznin sosyal akışı
            \[url\] => http://mfyz.tumblr.com/
            \[description\] => Bu günlük özellikle, izlediğim filmler...
        )
    \[items\] => Array
        (
            \[0\] => Array
                (
                    \[title\] => Daha yavaşı varsa gelsin…
                    \[date\] => 2009-07-29 18:43:23
                    \[url\] => http://mfyz.tumblr.com/post/151632394
                    \[description\] => <img src="http://17.media.tumblr.com/3YGTMGQuLqhrtmy6gdzjebuNo1\_500.png" /><br/><br/>Daha yavaşı varsa gelsin…
                )
            \[1\] => Array
                (
                    \[title\] => Photo
                    \[date\] => 2009-07-21 11:48:00
                    \[url\] => http://mfyz.tumblr.com/post/145949772
                    \[description\] => <img src="http://23.media.tumblr.com/3YGTMGQuLq5xgnk8LjdWyEcxo1\_500.jpg" />
                )
            \[2\] => Array
                (
                    \[title\] => Photo
                    \[date\] => 2009-07-19 19:54:48
                    \[url\] => http://mfyz.tumblr.com/post/144797738
                    \[description\] => <img src="http://4.media.tumblr.com/3YGTMGQuLq3jz02mZYNk5E5Eo1\_500.jpg" />
                )
        )
)

```

Bu noktadan sonra bu diziyi ekrana basma konusunda gerisi sizin hayal gücünüze kalmış. Bununla ilgili örnek uygulama için benim sosyal medya akışımı (lifestream) inceleyebilirsiniz : http://mfyz.org

İşin görsel kısmını da başka bir dökümanda özetleyeceğim.