---
title: "Sosyal siteler"
description: "Sosyal ağların ve API'lerinin web uygulamaları arasındaki iletişimi nasıl kolaylaştırdığını, bu durumun avantajlarını, dezavantajlarını ve mfyz.com'un gelecekteki entegrasyon planlarını inceliyoruz."
slug: sosyal-siteler
date: 2011-01-20
url: http://mfyz.com/tr/sosyal-siteler/
tags: ["sosyal ağlar", "API", "entegrasyon", "web geliştirme", "veri paylaşımı"]
category: Diğer
migration: {"wpId":265,"wpPostDate":"2011-01-20T07:06:54.000Z"}
lang: tr
---

Son 5 yil icinde sosyal networkler fcok hizli bir sekilde populerlesti, hatta facebook deve donusup google gibi bir lideri sallayacak konuma geldi. Bu detaylari yazmama gerek yok piyasada bunlari takip ettiginiz milyon tane blog var zaten. Ben isin web gelistiricileri tarafindaki gidisatini sizlerle paylasmak istiyorum.

Bu sosyallesen ve web 2.0 kavraminin gercekten oturdugunu hissetmemizi saglayan tek sey sitelerin yani web uygulamalarinin birbirleri ile cok guzel haberlesmeye baslamalaridir. Bunu bu kadar iyi anlamamizi saglayan orneklerden biri yine aslinda facebook. Tabi ki google veya yahoo servislerinde de bircok yontemle haberlesiyorduk fakat ortak bir dil/standart yoktu. Simdi ise her yer API doldu. Yani uygulamalar artik aralarinda en azindan bazi standartlara uyarak haberlesmeye basladilar. Bunun en buyuk ornegi oauth apileridir. Su an elinizi nereye atsaniz yakalayacaginiz sitelerin cogunun apisi var. Aslinda bu gelismeye cok olumlu bakiyorum ben. Cunku artik sitelerin verilerini kendilerine saklama gibi bir tavri yok.

Cok basit bir ornek vermem gerekirse, yillardir kullandigim delicious servisi yahoo tarafindan alindiktan sonra servisin yayin hayatini sonlandiracagi yazildi her yerde. Bir parca gercek de olabilir, onemli degil, olagan seyler bunlar. Ancak kullanici olarak ben yillarca tagledigim bookmarklarimi kaybetme tehlikesi sezdim. Bu gelisme bundan 10 sene once olsa oturup giden bookmarklarima dua etmekten baska secenegim olmazdi. Ya da tek tek oturup bookmarklarimi kopyalamaya calisirdim. Ama butun icerigi koruyacagim tartisma konusu olurdu.

Simdi ise, aninda birileri bir arac gelistirip, kullaniciya api erisim izni sorarak sizin bookmarklarinizi evernote veya baska formatlarda okunabilecek sekilde export etmenizi saglayabiliyor veya boyle bir araca gerek duymadan bir uygulama gelistiricisi olarak siz de apiye kendi uygulamanizla baglanip istediginiz sekilde verinizi kullanabilirsiniz.

### Tehlike ve avantaj

Bu isin tek tehlikeli olmaya basladigi bir konu var, o da internette her yer kopya iceriklerle dolmaya baslamasi. Bunun rahatsiz edici yanini orneklemem gerekirse, her gun takip ettigim yuzlerce twitter hesabinin binlerce tweetini cok hizli sekilde okumam gerekiyor ve okudugum icerigin yarisindan fazlasi otomatik uretilen veya kopya icerik. Eger icerigi kaliteli ise bunun kotu bir yani yok. Yani mesela mashable'da post edilen bir haberi tweet'den okuyarak ulasiyorsam problem degil ama insanlarin foursquare check-inlerini gormek beni rahatsiz ediyor. Eger bu sayi okudugunuz 10 tweetin 1-2 tanesini kapsiyorsa dayanilmaz olabiliyor. Bu acidan dusunuldugunde api kullanimi her yere uymuyor. Yani bunu gereksiz kullanacak insanlar her zaman oluyor.

Fakat bunun cok guzel bir yani var, mesela cok spesifik bir konuda bir web sayfasi yapiyorsunuz ve bu sayfanin icinde twitter'da konusulan tweetleri hashtage gore sayfanizda gostermek istiyorsunuz. Cunku kullanicinin bu akisi o sayfada gormesi oldukca anlamli veya degerli olabiliyor. Insanlarin aliskin oldugu servisleri uygulamaniza entegre ederseniz sadece uygulamanizin kullanilabilirligini kolaylastirmis olmuyor ayni zamanda hazir olan icerige de ulasabiliyor oluyorsunuz. Yani konu sadece yeni icerigin dis kaynaklarda toplanmasi degil. Hatta o, isin onemsiz kismi. Mesela arkadaslik uzerine kurulu bir uygulama yapiniz var ise insanlarin facebook hesaplarina ve arkadas listesine api araciligiyla erisip kullanicinin karsisina cikarmaniz hem kullanicinin saniyeler icinde, bazen 1-2 click ile sizin ana fonksiyonunuza erismesini saglayabiliyorsunuz.

### mfyz.com?

Artik neredeyse hic yazi yazmadigim mfyz.com hakkinda tabi ki planlarim var. mfyz.com'um su an gezdiginiz (v0.7) surumunu kodlarken sadece flickr apisini kullanarak tum galeri bolumunu flickra devretmistim. Bu konuda cok rahatim. Hem cok daha az kod yaziyor hem de bu bolumun yonetimi icin zaten surekli kullaniyor oldugum flickr hesabima masaustu araclarimi kullanarak cok hizli fotograf yukleyebiliyorum. Sitede gorunmesi icin o fotografa mfyz.com etiketi eklemem yetiyor. Sanirim bu ornek isin kolayligini ve avantajini iyi ornekliyor.

Ne zaman olacagini bilmiyorum ama bir sure sonra codeigniter kullanarak, test edilebilir bir kod ile, bircok dis kayanak kullanilmis bir mfyz.com hazirlamayi planliyorum. Ornek veriyorum butun yorum ve forum cevaplarini disqus ile yonetmeyi, butun resimleri yine flickr ile, dokuman iceriklerini belki bir wiki motoru ile, kullanici yonetimini codeigniter'in bir kullanici yonetimi kutuphanesi ile ya da tamamen facebook connect ve twitter oauth ile, belki arayuzdeki bazi kisimlari jquery pluginleri ile sunacagim.

Eskiden bu tarz servisleri esnek kullanabilme sansiniz yoktu. Kim ne kod verirse onu kullanmak zorunda idiniz. Ancak wordpress, thumblr gibi servisler arayuz konusunda bir motor ustunde herseyin yapilabilecegini herkese ispatladiktan sonra isler degisti. Zaten bu isin kolay kismi. Eger biraz daha zaman harcayip apileri kullanarak kendi arayuzlerinizi cizmeyi tercih ederseniz zaten bu noktada ozgun bir is cikarmamak icin tek engel kendiniz kaliyorsunuz.