---
title: "CSS çatısı kullanmanın faydaları"
slug: css-catisi-kullanmanin-faydalari
date: 2012-07-12
description: "CSS çatılarının (framework) web geliştirme süreçlerindeki faydaları, özellikle Twitter Bootstrap örneği üzerinden anlatılıyor. Zaman tasarrufu, tutarlılık ve tarayıcı uyumluluğu gibi avantajlarına değiniliyor."
url: http://mfyz.com/tr/css-catisi-kullanmanin-faydalari/
tags: ["CSS framework", "Twitter Bootstrap", "LESS", "SASS", "web geliştirme", "arayüz programlama", "CSS3", "HTML5", "verimlilik"]
category: Arayüz Programlama
migration: {"wpId":307,"wpPostDate":"2012-07-12T02:14:26.000Z"}
lang: tr
---

Uzun bir süre bütün arayüzlerimi hiç bir framework veya arayüz kütüphanesi kullanmadan kendim yazdım. Özellikle mobil cihazların kullanımının yaygınlaşmasından dolayı, aynı html içeriğini farklı ekran çözünürlüklerine uygun arayüzlerde gösterme ihtiyacı çoğaldı. Hala mfyz.com'daki arayüzü tamamen sıfırdan yazılmış bir css ile çizdiriyorum. Evet herşeyi sıfırdan yapmanın avantajları var fakat avantajları kadar belki daha fazla dezavantajları ve daha derin bilgi birikimi gerektirmesi gibi yanları da var.

Her kodu tamamen elde hazırlamanın en büyük dezavantajı, kararlılıgını korumak ve çok popüler olan, bilinen hataları gidermek için zaman harcamak zorunda olmanızdır. Yani çok basit bir IE hatasını düzeltmek için gereksiz zaman kaybeder daha da tehlikelisi bu küçük şeyler için ayırdığınız zaman sizin genel motivasyonunuzu kırması gibi tehlikeleri göze almış olursunuz. Özellikle tek geliştiricinin bulunduğu projelerde (ki bir freelancer'in elinin altında her zaman tek başına yürürttüğü proje olur) büyük bir motivasyon bozukluğuna neden olabilir. Dolayısıyla hazır yapılar, kütüphaneler sadece zaman kazanmak şeklinde görülmekten çok, birçok geliştiricinin katkıda bulunduğu ve aslında birçok hammallık işini yapmak zorunda kalmamanız olarak algılanmalıdır. CSS veya başka bir dil farketmeksizin bu geçerli diyebiliriz.

Şimdi gelelim arayüz dillerindeki çatılara. Birkaç yıl öncesine kadar CSS için çok yaygın kullanılan veya birçok geliştiricinin ürettiği bir arayüz çatısı yoktu. Nedeni ise hem css3'den önceki versiyonlarda bir çatı gerektirecek genel ihtiyaçlar yoktu bir diğer nedeni de farklı çözünürlüklerdeki ekranlar bu kadar farklı varyasyonlara sahip değildi.

Bir CSS çatısına ihtiyaç duymanızı gerektirecek en büyük bir başka neden ise özellikle standartlara kabul edilmemiş css3 özelliklerinin (animasyonlar vs) hala tarayıcı spesifik on ekler istemesi olabilir. Örneğin, standartlara kabul edilmesi çok eskilere dayanmayan border-radius özelliğini kullanmak ve bütün tarayıcılarda çalışmasını sağlamak için aynı satırı -moz -webkit -o ve -ms gibi on eklerde kullanmak zorunda kalıyorduk. border-radius çok basit bir özellik ve tek parametre gerektirdiği için bunu örneklemem, bu problemin gözünüzde çok canlanmasını sağlamayabilir ama başka bir örnek olarak, bir elemanınızın arka plan rengini doğrusal geçiş (linear gradient) ile şekillendirmek isterseniz uzun bir satır yazmanız ve bunu 4-5 tekrarda css dosyanızın içine koymanız gerekecektir.
```css
background-image: linear-gradient(top, rgba(0, 0, 0, 1.00), rgba(0, 0, 0, 0.00));
background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1.00)), to(rgba(0, 0, 0, 0.00)));
background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 1.00), rgba(0, 0, 0, 0.00));
background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 1.00), rgba(0, 0, 0, 0.00));
background-image: -o-linear-gradient(top, rgba(0, 0, 0, 1.00), rgba(0, 0, 0, 0.00));
background-image: -ms-linear-gradient(top, rgba(0, 0, 0, 1.00), rgba(0, 0, 0, 0.00));
filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#000000', EndColorStr='#000000');

```
Malesef, bu özellik, standartlara geçene kadar bu şekilde kullanılmak zorunda. Yukarıdaki kodda aslında standartlara başvurulan model ilk satırdaki linear-gradient ile başlayan modelidir. Ancak daha standartlara kabul edilmediği için tarayıcılar kendi on eklerini diretmektedir. Çok basit bir geçiş için bu kodları ezberlemek veya tekrar tekrar kodlamak çok anlamsız. Aynı durum birkaç css3 özelliği için de söz konusu.

Peki bir css çatısı kullanmak bunu önleyecek mi? Eğer bir yorumlanan özel bir dil değilse hayır önlemeyecek ama muhtemelen buna benzer hazır geçişleri veya on tanımlı bazı kolay yollar sunacaktır. Eğer yorumlanan bir yapı kullanıyorsanız evet kesinlikle bu kodu çok kısaltmanın yolu var. Bunun için LESS veya SASS'i inceleyebilirsiniz.

Bir çatı kullanmadaki bir diğer fayda da on tanımlı bir çok uygulama eklentisi sunmasıdır. Yani bir web uygulamasında muhtemel olarak kullanacağınız her element için düzgün bir kozmetik hazırlık bulabilirsiniz. Size bunu bir css çatısı önererek anlatmaya çalışacağım.

#### Twitter bootstrap

Twitter deyince hemen bunun arayüzle ne ilgisi var diyebilirsiniz. Twitter ekibi, twitter'da kullandıkları arayüz kozmetiği ve bazı jquery eklentilerini paketleyerek açık kaynak kodlu bir çatıya dönüştürmüşler. Su an 2+ sürümüne sahip twitter bootstrap aslında bir web uygulaması için başlangıç arayüzleri oluşturmak için tasarlanmış. Yani ufak bir web uygulamanız var ise bunu twitter bootstrap kullanarak çok kolay şekilde şekillendirebilir, eklentilerini kullanarak zenginleştirebilir ve html yapınızı biraz oynayarak arayüzünüzü farklı cihazlarda ve ekran çözünürlüklerinde düzgün görüntülenebilir bir şekle getirebiliyorsunuz.

Örnegin bir RSS kaynağından aldığınız müzik dosyalarını işleyerek bir web arayüzü hazırlamak istiyorsunuz. Sunucu tarafını php ile yazdığınızı düşünürsek, php ile yazacağınız şeyleri yazdıktan sonra, sunucu tarafına ayırdığınızdan belki katlarca daha fazla zamanı arayüzü kodlamakla harcama ihtimaliniz var. Twitter bootstrap kullanarak formlarınızı, butonlarınızı, gridlerinizi, tab veya fare imlecine göre görünüp kaybolan ipuclari ile uygulamanızı zenginleştirebilirsiniz. Farklı tarayıcı uyumlulukları, farklı çözünürlükler gibi şeylere kafa yormanıza genel konular dahilinde gerek kalmıyor.

İstediğiniz özel stilleri, varolan stillere eklemeler yapacağınız gibi varolan stilleri de değiştirebiliyorsunuz. Hatta kaynak koda girip tüm yapıyı da oynama seçemediğiniz var. Ancak twitter bootstrap size sadece önceden kodlanmış bir arayüz sunuyor, yaptığınız eklentilerde veya değişikliklerde yine css3'un hammal yanını göreceksiniz.

#### CSS Çatıları (framework) tek seçenek mi?

Hayır, çatılar birçok işinizi kolaylaştırsa da temeldeki css dilinin getirdiği yapıyı değiştiremeyeceği için tekrar eden kodlardan kurtulamayacaksınız ayrıca matematiksel çarpanlı yani mimari arayüzler hazırlamanızda size daha önce tanımlı olduklari değerler kadar esneklik sağlayacaktır.

CSS'i dil olarak daha öteye taşıyan ve birbirine benzeyen birkaç yapıdan bir tanesini kısaca anlatarak bahsedeceğim.

Ben, kişisel olarak projelerimde LESS kullanıyorum. Less, css dökümanlarınızda iç içe tanımlamalar yapabilmenizi, fonksiyonlar tanımlayıp fonksiyonları kullanarak renk değişimleri, matematiksel işlemler yapabilmeyi ve benzer programatik şeyler yapabilmenizi sağlıyor, yabnı kısaca css'e bazı programsal özellikler ekliyor. Birkaç farklı method ile kullanılabiliyor. En yaygın kullanımı bir javascript dosyası ile css'inizi tarayıcıda derleyebiliyorsunuz. En pratik kullanımı bu. Fakat tarayıcıdaki ön bellek, geliştirme esnasında baş ağrısı yapabildiği için kodunuzu yazdığınız gibi css dosyalarına derleyerek kullanmanızı tavsiye ediyorum. LESS hakkında biraz daha detaylı yazdığım su yazıyı inceleyebilirsiniz: [http://mfyz.com/less-ile-hiyerarsik-ve-fonksiyonel-css-yazmak](/less-ile-hiyerarsik-ve-fonksiyonel-css-yazmak)

Benzer şeyleri yapan ve çok derinlerine inmediğim SASS'i da deneyebilirisiniz. [http://sass-lang.com/](http://sass-lang.com/)

#### Neden sadece twitter bootstrap ve less'den bahsettim?

Çünkü twitter bootstrap kaynak kodlarında less ile yazılmış. Yani kaynak kodunu indirip less kodlarındaki kuralları değiştirerek esnek bir grid'i isteğinize göre üretebilirsiniz, renk kurallarını veya kenar boşlukları, gibi bir çok şeyi less ile çok daha kolay şekilde değiştirebilirsiniz.

İster bir çatı kullanın ister sadece LESS, SASS gibi diller kullanın, yazdığınız css'lerinizi daha hızlı üretmenizi sağlayacak çok güzel araçlar var.