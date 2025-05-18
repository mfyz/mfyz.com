---
title: "Ucuz tablet ile Bebek Monitoru yapmak"
slug: ucuz-tablet-ile-bebek-monitoru-yapmak
date: 2017-10-05
url: http://mfyz.com/tr/?p=1401
tags: ["Hayat"]
category: Hayat
migration: {"wpId":1401,"wpPostDate":"2017-10-05T06:14:16.000Z"}
lang: tr
---

Anne-baba'liga adim attiginizda, ilk adapte etmek zorunda olacaginiz sey, bebegin yemek yeme, uyuma ve alt degistirme sureci olacak. Yorucu ama optimize edilebilecek bir surec, ozellilkle de baslarda her bebek icin gayet standard.

![](/images/archive/tr/2017/10/Screen-Shot-2017-09-20-at-10.41.06-PM.png)

Ilk haftalarda da en onemli sey bebeginizin yedigi, altina ne siklikta yaptigi oluyor. Bunun da takibini yapmaniz gerekiyor bebeginize alisip yeterli buyumeyi gosterdiklerinden emin olana kadar. Bunun takibini en iyi yapabileceginiz sey de her ogun ne kadar yedi, bugun kac kere altina isedi veya sictigini bilmek olacak. Biliyorum, garip bir sey ama bebekler icin her sey dogal ve baslangic seviyesinde. Dusundugunuzde bebeginiz hakkinda edinebileceginiz bilgi acisindan tek yol da bu zaten.

Muhtemelen birden fazla kisi bebege bakiyor olacak ve vardiya sistemine gecmeniz kacinilmaz olacak. Bunu yaptiginizda da her ogun ne kadar yemek yediler, ne siklikta altlarina yapiyorlar, bunun takibi zorlasacak. Cogu anne-baba basit not usuluyle bu takibi yapiyor. Teknolojik anne babalar icin ise yuzlerce mobil uygulama zaten var. Ben de bu surece deneysel bakiyorum ve ne kadar kolaylastirabilirim diye dusunuyorum.

Gecen sene, Amazon'un dash butonlarini hacklemeye calismistim ve bunun arastirmasini yaparken de, muhendis bir babanin, [tam olarak da bu amac icin Amazon dash butonlarini hack'ledigi hakkinda bir yazi](https://blog.cloudstitch.com/how-i-hacked-amazon-s-5-wifi-button-to-track-baby-data-794214b0bdd8) okumustum. 2 butonu hackleyip, bebegi altina yaptiginda veya isediginde, IFTTT araciligiyla bir google spreadheet tablosuna kaydediyordu. Bu servisleri birbirine baglamak aslinda cok kolay. Neredeyse hic kod yazmaya bile gerek yok. IFTTT de, ortak bir servis rolu oynuyor tetikleyebilmek icin.

Benim karsimdaki en buyuk engel, 2 bebegimin olmasi ve benim kayit altinda tutmak istedigim seyin alta yapma degil, yedikleri yemek miktarlarini takip etmek oldu. Pediyatrisyen tarafindan bize verilen ilk gorev bu oldu. Her yemek verecegimiz de de son 3-4 seferdir ne kadar yediklerini gorup ona gore miktar degisikligi yapmak veya endiselenme sinirina ne kadar yakin oldugumuzu anlamak icin son 3-4 seferki yediklerini de gormemiz gerekiyordu. Yani sadece butonlarla cozemezdim bu problemi. Bir diger problem de, vardiya seklinde paylastigimiz icin, genellikle geceleri ben sorumlu oluyorum, sabah erken beslenmelerini esim aliyordu. Ikimizde ne kadar mama yediklerini birbirimize soramayacagimiz icin kayit altinda tutmamiz gerekiyordu.

Eski, kullanmadigimiz bir tableti duvarda, son kayitlari gosterip, yeni kayit ekleyebilecegimiz bir sekilde cozum urettim ben. Yani her beslenme saatinde tablete bakip anliyorduk en son ne yediler, ne zaman yediler diye.

Duz google spreadsheet uygulamasindan daha pratik birsey istedim ve react native ile bir uygulama hazirlamayi planladim. Ancak kendimi, navigasyon, arayuz parcalama konularinda ideal methodlari planlarken buldugum icin basit bir web uygulamasi yazmayi tercih ettim ve yarim saatimi aldi baslayip bitirmem. Bu arayuzde basitce son 4-5 seferki kayitlari, ve basit bir arayuzde her bebegin kac ml ictigini secebilecegimiz bir arayuz hazirladim. Tamamen arayuz programlama ile sunucu kodu olmayan basit bir web uygulamasi hazirladim ve bazi arayuz parcalarini internetteki acik API'lerden alarak, diger parcalari da proxy yaptigim IFTTT hook'lari ile hallettim. Arka planda da flickr'dan siyah beyaz fotolari cekerek gosterdigim bir statik slideshow var. Tabii ki bu web uygulamasini da tam ekran web view ile cevreleyen bir uygulamayla sunup kiosk gibi gosteriyorum.

![](/images/archive/tr/2017/10/Slice.jpg)

Tum hosting tarafini da bitbucket'da statik site host ederek yapiyorum. Boylece sunucu vs icin de dusunmeme gerek kalmiyor.

#### Kimin ekstra tableti var ki?

Eskisinden cok daha hizli ve fazla teknoloji cope atiyoruz artik. Eski ve kullanilmayan bir tabletiniz olabilir veya olmayabilir. Ama bu is icin alabileceginiz cok ucuz tabletler de var.

Amazon kindle fire tablet'ler artik cin'den alma tabletler seviyesine kadar ucuzlamis durumda. Hatta son model kindle fire tablet 7'yi amazon'un sik yaptigi indirimlerle bazen $35'a kadar alma sansiniz var. Acikcasi, bundan daha ucuza tablet alma ihtimaliniz de yok...

Baska bir yol da, ebay'den eski bir tablet alabilir veya aliexpress'den ucuz cin mali tabletler bakabilirsiniz.

#### Duvarda tablet mi asili olacak yani?

Duvara tablet yapistirmak, benim icin kotu goruntu ve katlanabilecegim birsey degil. Ben de bir ikea cercevesini hackleyip tableti sabitleyerek siyah bir karton on yuzu ile tableti gizledim. Hem ucuz hem basit eglenceli bir kendin-yap projesi oldu benim icin.

![](/images/archive/tr/2017/10/IMG_2710.jpg)

Simdi cok daha goze hitap ediyor...