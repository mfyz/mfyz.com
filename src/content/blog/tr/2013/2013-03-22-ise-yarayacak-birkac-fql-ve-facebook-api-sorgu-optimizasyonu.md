---
title: "İşe yarayacak birkaç FQL ve Facebook API sorgu optimizasyonu"
slug: ise-yarayacak-birkac-fql-ve-facebook-api-sorgu-optimizasyonu
date: 2013-03-22
url: http://mfyz.com/tr/ise-yarayacak-birkac-fql-ve-facebook-api-sorgu-optimizasyonu/
tags: ["api","batch","facebook","fql","opengraph","optimization"]
category: 
migration: {"wpId":346,"wpPostDate":"2013-03-22T05:02:50.000Z"}
lang: tr
---

Facebook uygulaması geliştirmek veya varolan uygulamanıza facebook güzelliklerini entegre etmek bir çok dilde (javascript, php vs) sdk'lar yardımı ile çok kolaylaştı. Fakat standart dışı işler yapmaya başladığınızda veya uygulama zekanızda birden fazla facebook methodunu zincirleme kullandığınızda, standart methodların yapamayacağı şeylere ihtiyaç duyabilir veya uygulamanız ile facebook API arasındaki iletişimini optimize etme ihtiyacı duyabilirsiniz.

Örnegin facebook'u üye kayıdı için kullandınız ve üye kaydında üye bilgilerini, üyenin fotografının orijinal versiyonunu (yüksek çözünürlüklü versiyonunu) ve arkadaş listesini uygulamanızda kullanacaksınız. Bunlardan ikisini (kullanıcı bilgilerini isteme ve arkadaş listesini istemeyi) neredeyse tüm facebook sdk'lerindeki standart methodlarla yapabilirsiniz. Ancak profil fotografının orijinal boyutunu almak için birden fazla şey yapmanız gerekebilir, ayrıca ortada düzgün bir method yok bunun için. Biraz hack gibi de olsa bilinen bir yöntemle bunu elde etmeye çalışacağızö dökümanın iletleyen kısımlarında buna değineceğim.

Biliyorsunuz facebook FQL (Facebook Query Language) denilen bir çeşit SQL dili kullanıyor. Geliştirici dökümantasyonunda tablo listesini ve her tabloya ait veri yapısını bulabilirsiniz. Ayrıca hangi veri türüne erişebilmek için hangi izinlere sahip olmanız gerektiği de dökümantasyonda veriliyor: http://developers.facebook.com/docs/reference/fql/

FQL'in güzel kısmı, birkaç basit SQL yapısını destekliyor olması. Çok gelişmiş şeyler yapılamasa da basit sub querying ile birçok işi kolayca halletmeniz mümkün.

En basit iki örnek olan kullanıcı bilgisi ve arkadaş listesi elde etmek için şu iki FQL'i kullanabilirsiniz.

\[code=sql\]SELECT uid, username, email, name, sex, birthday\_date, verified FROM user WHERE uid = me()\[/code\]

FQL'de \* şeklinde tüm kolonları seçme veya herhangi bir alanı seçici olarak kullanama seçeneğiniz yok. İstediğiniz tüm alanları belirlemeniz gerek. Ayrıca "WHERE birthday\_date < '1980'" gibi bir seçici yazamazsınız. Dökümantasyonda da belirtilen ve sadece taranabilir (indexable) olarak tanımlanmış alanları kullabilirsiniz. Bunlar id, username gibi genel seçiciler.

Bu FQL size tek satırlık bir sonuç dizisinde, kullanıcı bilgisini istenen alanları verecektir. Gördüğünüz gibi secicide me() fonksiyonunu kullanarak giriş yapmış olan kullanıcıyı id'sini elde etmeye çalışmadan FQL'de kulanabiliyoruz. Ya da idsini bildiğiniz bir kullanıcı için bir veri isteginde bulunabilirsiniz. Ancak eğer istek yaptığınız kullanıcı, istenen tüm alanlara erişim için uygulamanıza izin vermediyse hata alacaksınız. Yani istek yaptığınız kullanıcının özel bilgilerini sorguluyorsanız, o facebook kullanıcısının, uygulamanızı kurarak gerekli izinleri vermiş olması şart.

Arkadaş listesini almak için kullanacağımız FQL:

\[code=sql\]SELECT uid, name, pic\_square FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())\[/code\]

Bu FQL aynı zamanda nasıl sub query kullanabileceğinizi gösteren bir örnek. İç sorguda giriş yapmış kullanıcının arkadaşlarının id listesini alıyoruz, sonra genel kullanıcı bilgisi sorgulayabildiğimiz tabloda (users) bu listeyi sorguluyoruz. Arkadaş listesinden alabileceğiniz veriler de sınırlı. Yani her bilgiyi sorgulayamıyoruz.

Az önce bahsettiğim profil fotografının orijinal yanı büyük versiyonunu elde etme işi bir parça hack sayılabilir. Yani kabul edilen bir method değil, fakat işe yarayan ve kullanılan bir method. Kullanıcınızdan user\_photos iznini aldığınızda kullanıcınızın tüm albümlerini ve fotograflarını okuma hakkina sahip oluyorsunuz. Aşağıdaki FQL'i kullanarak profil fotografının orijinal boyutuna ulaşabilirsiniz:

\[code=sql\]SELECT src\_big FROM photo WHERE pid IN (SELECT cover\_pid FROM albüm WHERE owner = me() AND type = 'profile')\[/code\]

İç sorguda albüm tablosundan "profile" türündeki tekil ve özel olan albümün (bu albüm, profil fotografları albümü) cover\_pid yani cover fotografının id'sini sorguluyoruz. Bu bize son yüklenen profil fotografının idsini veriyor. Sonra da fotograflar tablosundan src\_big yani büyük boyut (genelde orijinal boyutu saklıyor facebook bu alanda) adresini istiyoruz.

\## Optimizasyon demiştik

Kodunuzu FQL ile çalışır hale getirmek, 3 farklı isteği ayrı ayrı çağırmanızı değiştirmeyecektir. Yani işimiz burada bitmiyor eğer optimizasyon yapmaya çalışıyorsak.

Eski API'de tek istekte birden fazla FQL sorgusu yapmanızı sağlayan bir method vardı, başka şekillerde aynı method halen facebook tarafından sağlanıyor. Bu method ile dizi şeklinde tüm sorgularınızı isteyebilir ve büyük bir nense şeklinde tüm sonuçları tek seferde alabilmenizi sağlıyor. Böylece, zincir istekleri tek isteğe indirip aynı zinciri facebook sunucularına delege etmiş olursunuz. Facebook genelde sizin 3 ayrı istek yapmanızdan çok daha hızlı şekilde istekleri sorgulayıp dönecektir.

Facebook aynı methodu farklı şekillerde sunmaya devam ediyor. Fakat ben size en genel olan methodu önerecegim. İstekleriniz FQL olsun olmasın, birden fazla opengraph isteğini tek seferde isteyip cevap alabildiğiniz method batch requests olarak adlandırılıyor. Bu yazı daha çok FQL'ler üstüne olduğu için batch requests üstüne başka bir yazıda değineceğim. Batch Requests hakkında detaylı bilgiyi facebook dökümantasyonundaki ilgili sayfadan edinebilirsiniz: https://developers.facebook.com/docs/reference/api/batch/