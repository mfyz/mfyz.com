---
title: "htaccess ile özelleştirilmiş url yapılarıyla karşılaşacagınız medya ve çerez problemleri ve çözümü"
slug: htaccess-ile-ozellestirilmis-url-yapilariyla-karsilasacaginiz-medya-ve-cerez-problemleri-ve-cozumu
date: 2012-07-27
url: http://mfyz.com/tr/htaccess-ile-ozellestirilmis-url-yapilariyla-karsilasacaginiz-medya-ve-cerez-problemleri-ve-cozumu/
tags: ["Arayüz Programlama","assets","cookie","fix","htaccess","html","javascript","mod_rewrite","php","schema","url"]
category: Arayüz Programlama
migration: {"wpId":310,"wpPostDate":"2012-07-27T04:11:56.000Z"}
lang: tr
---

mod\_rewrite sayesinde sayfalarımızın adreslerini istediğimiz formda gösterebiliyoruz (İlgili makale için: [https://tr.mfyz.com/htaccess-yardimiyla-tum-trafigi-tek-merkezden-yonetmek](https://tr.mfyz.com/htaccess-yardimiyla-tum-trafigi-tek-merkezden-yonetmek)). Kullanımı çok yaygınlaşsa da bu kullanımın bazı ufak problemleri beraberinde getirdiği göz önünde bulundurulmalı. Bu yazıda iki çok açık problemden ve basit çözümlerinden bahsedeceğim. İlk problemlerden birisi sayfanızda kullandığınız tüm medya veya eklentilerin yollarını domain seviyesinden belirtmek durumunda olmanızdır. Eğer htmlinizi yazarken sayfanızdaki görselleri, stilleri, scriptleri bu şekilde tanımlamadıysanız tüm sayfalarınızdaki yolları güncellemeniz gerekiyor. Basit bir örnekle, ana dizinde duran bir index.php veya html dosyanızın olduğunuz varsayalım ve images, css ve js olarak 3 medya dizininiz olsun. html'inizi kodlarken yolları su şekilde belirtmeniz dogal:
```
<html>
    <head>
        <title>Blah blah</title>
        <link rel="stylesheet" href="css/style.css" />
        <script src="js/myscript.js"></script>
    </head>
    <body>
        <div>
            <h1>Test page</h1>
            
            <img src="images/cat.jpg" alt="Cat" />
        </div>
    </body>
</html>

```
Eğer bu uygulmanızda bu sayfayı sunan kodu domain.com/about/license gibi, birden fazla derinlikte bir url ile sunduğunuz zaman, tarayıcınız o sayfa kodunun /about/ dizininde çalıştığını varsayarak medya dosyalarınızı /about/js/, /about/images/ gibi dizinlerde arayacaktır. Çözümü ise basit. İki seçeneğiniz var bu noktada. Her medya yolunu belirtirken http://domain/images/cat.jpg şeklinde tam yolu belirtebilirsiniz veya dosya/dizin yollarını belirtirken "/" işareti ile başlayarak domain seviyesinden itibaren işaret edeceksiniz yollarınızı yani yukarıdaki html kodunda her yol tanımlamasını "/" işareti ile başlayarak (ekleyerek) düzeltebilirsiniz. Başında bir protokol ile belirtilmemiş her url domain üstündeki bir yolu ifade eder. "/" işareti ile başlayan yollar ise domain seviyesini işaret eder. Yani sadece "/" şeklinde tanımlanmış bir link aslında domain ana dizinini işaret eder. Ama bizim amacımız domain seviyesinden itibaren bir dizini işaretlemek, dolayısıyla /images/icons/plus.png gibi bir yol sızı nerede olursanız olur her zaman http://domain.com/images/icons/plus.png'yi işaret ederek istediğiniz dosyaya ulaştıracaktır.

#### Cookie Problemi

Bir diğer problem ise çerez (cookie) problemidir. Çerezlerin tarayıcıda kaydedildiğini hatırlamakta fayda var. Sunucu tarafında dahi çerez kaydetmek isteseniz o çerez aslında o isteğin cevabında gelen headerlar'da olacak ve tarayıcı istek cevabındaki değerlere göre çerezleri kaydedecek, silecek veya güncelleyecektir. Yani tarayıcının çerezleri yönettiğini bilmeniz gerekiyor, ayrıca çerezlerin dizin bağımlı olduklarını da belirtmek gerek. Yani bir çerezi /A/B/C dizininde iken ayarlarsanız bu çerez sadece C dizini ve alt dizinlerinden erişilebilir olacaktır. C dizinindeyken aryıca ana dizin, A ve B dizininde kaydedilmiş çerezlere de erişebilirsiniz. Tarayıcı, alt dizinlerdeki bir çereze erişimi bir üst dizinden veya paraleldeki bir dizinden vermez. Bu durumda url'lerinizi klasör şeklinde ayarladıktan sonra uygulamanızda nerelerde çerez kaydediyor, siliyor veya güncelliyor olduğunuzu hatırlamanız ve güncellemeniz gerekiyor. Bu güncellemeyi hem javascript'deki cookie kullanımınız için hem de sunucu tarafındaki çerez kullanımınız için güncellemeniz gerekiyor. Sunucu tarafında bütün dillerde çok bilinen bir problem olduğu için yazdığınız sunucu taraflı dile ilişkin çerez methodlarını inceleyin. Ben kısaca php'de nasıl yapacağınızı anlatacağım. Önce javascript ile çerez işlemlerinizi güncellemek için, normalde kullandığınız:
```
document.cookie = "";
```
koduna ek olarak "path=/" eklemeniz gerekecektir (tabi ki ; ayracını kullanarak diğer çerez cümlenize ekleyebilirsiniz. Bu size karışık gelmiş olabilir çünkü javascript ile çerez yönetimini herhangi bir kütüphane kullanmadan yapmanın yolu bu. Ancak muhtemelen jquery veya en azından çerezlerinizi okumak, silmek veya kaydetmek için bir kütüpahne kullanıyor iseniz kullandığınız kütüpahenin "path" yani çerez dizinini belirtebileceğiniz bir yöntemi vardır, bu yöntemi uygulayarak tüm çerezlerinizi ana dizininizde ayarlamalısınız, böylece çerezleriniz her yerden erişilebilir hale geleceklerdir. PHP'de bu problemi çözmek için tüm "setcookie" fonksiyonunun (name, value, expire) standart kullanımına 4. parametre olarak "/" yani dizin parametresi eklemeniz yeterli olacaktır. Bu noktadan sonra kaydettiğiniz tüm çerezler ana dizine kaydedilecek, böylece her yerden erişilebilir hale geleceklerdir. Bu konu, daha teknik noktalarda başka problemleri de beraberinde getiriyor fakat url'lerinizi klasör şeklinde ayarladıktan sonra ilk karşılaşacağınız iki büyük problemden ve çözümünden kısaca bahsetmiş oldum.