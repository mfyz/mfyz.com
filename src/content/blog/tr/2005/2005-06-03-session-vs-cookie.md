---
title: "&quot;Session&quot; v.s. &quot;Cookie&quot;"
slug: session-vs-cookie
date: 2005-06-03
url: http://mfyz.com/tr/session-vs-cookie/
tags: ["cookie","PHP","session"]
category: PHP
migration: {"wpId":77,"wpPostDate":"2005-06-03T06:45:26.000Z"}
lang: tr
---

#### Bunlar nedir ne işe yarar?

PHP'de aslında dinamizmi getiren çoğu şeye karşılık kullanıcının hareketlerini izlerken veya kullanıcının hareketlerine karşı kodumuzun vermesini istediğimiz tepkileri belirlerken kullanıcı taraflı bilgi saklamaya ihtiyaç duyuyoruz. Sonuçta bütün olay sunucuda veya kullanıcıda bitmiyor. İkisinin iyi senkronu ile iyi koda dayanıyor. Cookie de session da aynı yapıdadır. Basit olarak olay session'u cookie'ye benzeterek anlatmakla daha rahat anlaşılacaktır. Cookie'ler kullanıcının bilgisayarında bir meta ve değer olarak tutulan, domainlere göre süzgeçlenen dosyalardır. Yani; 1. Dosya adı vardır ve bellidir. 2. İçeriği o dosyaya ait bilgiyi içerir. (Normal veriden farklı yani) 3. bu dosyaların ve buna ait bilgilerin silineceği tarih bellidir. Son kullanma tarihi gibi. Cookie dosyaları zamanı geldiğinde silinen değişkene benzer veri taşıma methodudur. Kullanıcı tarafında taşındığı için günevli olmayıp, kodlarda içeriği zararlı veriler taşınmamalıdır. Mesela bir üye sisteminde cookie içinde kullanıcının şifresi taşınmaz. Ancak oturum id'si kullanıcı id'si gibi bilgiler taşınmalıdır. Session ise cookie'ler gibi çalışır, ancak bu bilgilerin silineceği zaman kullanıcının oturumu sonlandırdığı andır. Yani bu verilerin yönetimini zamanla sağlamayız. Oturum dedğimiz şey ise tarayıcı programa göre değişir. Bazı programlar bulunduğu pencereye ait oturumu taban alır. bu tarayıcılarda bir oturuma ait sitedeki pencerelerin hepsi kapanınca oturum kapanmış olur. Bazı tarayıcılarda ise tarayıcı program ve onunla ilişkili process kalamyana kadar ortak bir oturum çerçevesinde gider.

#### Peki bunları nerelerde kullanırız?

Cookie'ler belirli bir tarihe göre silinirler.. Uzun vadeli kullanıcı taraflı veri saklarken cookie'ler biçilmiş kaftandır. Ancak kısa vadeli (3-5 dakikalık veriler için, mesela oturum yönetimi için) pek güvenilir olamayabilir. Bunun için session (adı üstünde zaten "oturum") kullanılır. Bir üye sistemi için cookie kullanılırsa, örneğin internet cafe'deki acil çıkışlarda masaya oturan diğer kişi bulduğu tarayıcı pencerelerini kurcalarken yanlış şeyler yapabilir.. Anket veya ziyaret kontrollerinde cookie'ler gayet güzel çalışabilirler. Şu an dökümanlar bölümünde listelere dikkat ettiyseniz, listelerdeki dökümanların başındaki turuncu oklar renk değişimi gösterecektir. Okuduğunuz dökümanlar cookieler sayesinde orada daha flu bir renge dönüşecek ve okumadığınız, yeni dökümanları daha rahat seçebileceksiniz. Bu cookie sayesinde oluyor. Ama kullanıcı girişi çıkışı session + cookie karışımı ile. Beni hatırla seçeneği ile bilgisayarınız bir kod yazılıyor. bu kod veritabanındaki hatırlama kodunuzla karşılaştırılıp eşlenmesi halinde otomatik giriş sağlanıyor. Tabiki bu kod yeterince güvenli. Çözebilen var ise artık girip istediğini yapsın. Zaten kodu kırmakla haketmiş :)

#### Bu alanda yapılan yanlışlar ve güvenlik sorunları!!

\- Çoğu php'ye yeni başlayan cookie'leri önce öğrenip, ilk giriştikleri üye sisteminde cookie ile yazıyor. Burası yanlışın başlangıcı. - Yine çoğu yeni başlayan php programcıları üye sistemlerinde cookie veya session değişkenlerinin içine tek kontrol ile kullanıcı adı veya kullanıcı adı + şifre saklıyor.. Yanlışın 1 numaralısıdır bu.. Exploitler ile bu açıklar kolaylıkla aşılabilir.

#### "Hangisi" değil "Nasıl"?

Ne kullandığınız değil, nasıl kullandığınız önemlidir. Belki üye sistemi session yerine cookie ile daha sağlıklıdır. Nerede kullandığınız da çok önemli bir unsurdur. Mesela bir banka sitesini yapıyorsanız Session kontrollü cookie tabanlı bir yapı çok daha sağlam olur. vs vs..