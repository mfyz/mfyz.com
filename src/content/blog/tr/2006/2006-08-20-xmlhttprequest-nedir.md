---
title: "XMLHttpRequest Nedir? (AJAX'ın Temeli)"
slug: xmlhttprequest-nedir
date: 2006-08-20
description: "XMLHttpRequest (XHR) nesnesi nedir ve AJAX teknolojisinin temelini nasıl oluşturur? Sayfa yenilemeden sunucuyla iletişim kurma, avantajları, dezavantajları ve pratik kullanım alanları."
url: http://mfyz.com/tr/xmlhttprequest-nedir/
tags: ["XMLHttpRequest", "XHR", "AJAX", "JavaScript", "web geliştirme", "asenkron iletişim", "arayüz programlama"]
category: Arayüz Programlama
migration: {"wpId":115,"wpPostDate":"2006-08-20T14:48:17.000Z"}
lang: tr
---

#### XMLHttpRequest Nedir?

XMLHttpRequest Microsoft'un bize kazandırdığı ender nimetlerden birisidir. Eskiden bi zamanlar ypaılmış tarih zırvalıklarına gerek olduğunu düşünmüyorum.

İlk önce Internet Explorer'ın bir ActiveX denetimi mi obje si midir nedir öyle çalışıyormuş ve XML ile tarayıcı yenilemeden url bazlı iletişim saplıyormuş. Tam yapılış amacını da bilmiyorum. Fakat daha sonra geliştirilmiş ve bazı web uygulamalarında kullanılmaya başlanmış. Ardından da Mozilla ve KHTML (Konqueror, Safari) gibi browser'lar da xmlhttprequest desteği sağlamaya başlamışlar. Tabi biz XMLHttpRequest olarak tanımadık bunu, birkaç (ne kadar bilmiyorum ama hatırladığım kadarıyla 5-6) sene kadar kullanıldıktan sonra AJAX denilen bir kod adıyla xmlhttprequest objesini kullanan bir kütüphane geliştirildi. Evet biz bu nesneyi ajax, sajax gibi adlarla tanıdık. Geliştiriciler için kolay (bence daha zor) javascript kütüphaneleri geliştirildikten sonra çok kısa sürede popüler kullanılan şeyler oldular.

Benim XMLHttpRequest ile maceram ise çook yeni, herhalde 5-6 ay olmuştur bununla tanışalı. Ajax kütüphanesi ilk çıktığında aşırı antipatik karşılamıştım. Duyduğum şeyler de zaten bu şeyin yeni olmadığı konusuydu, sonraki araştırmamda zaten bunu öğrendim. Sayfa yenilenmeden işlem yapmayı ben iframe'ler ile hallediyordum daha önceleri fakat xmlhttprequest sayesinde daha kompleks kodlar yazabiliyorum.

#### Tam olarak ne işe yapar?

Bu nesne söylediğim gibi ilk başta XML kodları şeklinde haberleştiriyormuş tarayıcı ile sunucuyu. Ama daha sonra plain text aktarımı da katılmış ve günümüzde biz genellikle sade metin transferi kullanıyoruz. Tabiki sade metin ile yapamadığımız bazı şeyleri XML transferi ile daha rahat çözebiliyoruz.

Tam olarak, sayfa yenilenmeden içerik alımı veya veri gönderimi yapmamızı sağlar. Şu an en yaygın bilinen proje olarak gmail'in arabirimini örnek verebilirim. Gmail'de mesaj kutularınız arasında veya mesaj formlarında sayfanız yenilenmez bildiğiniz gibi. Sadece gerekli içerik alınıp gerekli forma sokulup ekrana yerleştirilir. Aynı şekilde bir mesaj gönderdiğinizde de sonuç, sayfa yenilenmeden ekrana gelir “Mesaj gönderildi” veya hata mesajları.

#### Neden kullanmalıyız?

En önemli artısı, sayfa yenilenmediği için değişken olmayan diğer kısımların hem sunucuda yeniden işlenip sunucuyu yorması engellenir; hem de kullanıcıda tekrar yüklenmediğinden bant genişliği boşa harcanmaz, aynı zamanda kullanıcı tarafında sayfalarda daha hızlı işlem yapılır. Sayfayı yenilenmeden içeriğimizi alıyor olmamız, web uygulamamıza bir masaüstü uygulama görünümü katar. Kurumsal projelerde bu tarz artılar her zaman iyidir. Çünkü web uygulamalarının tek sıkıntısı, hızlı ve pratik çalışamıyor olmanızdır. Yani kurumsal amaçla çalışan bir yazılım masaüstündeki yazılımlar gibi pratik kullanılan şeyler olmalıdır.

#### Sorunlar neler? (Eksiler/Dezavantajlar)

Böyle bir nesneyle yazılmış kütüphane kullanmak çyle çok daha rahat bişey değil. Tabiki bazı sorunlar var. Türkçe karakter sorunu, eğer içerik aldığınız sayfa içinde hangi karakter seti ayarlıysa ona göre gelir. Bunun çözümü için içeriği aldığınız sayfa'ya ya HTML etiketi ile karakter seti ayarlaması belirtmeniz gerek. Ya da herhangi bir web programlama dili kullanıyorsanız onun sayfa başlık bilgisi fonksiyonlarını/methodlarını kullanarak karakter seti ayarlamanız gerekecektir. Mesela php için;
```php
<?php header("Content-Type:text-html;charset:utf-8"); ?>

```
ile sayfa başlık bilgisini (header) ayarlayabilirsiniz. Böylece Türkçe karakter problemini çözmüş olursunuz. (Eğer iso kullanıyorsanız ona göre ayarlayın)

İkinci sorun ise iç sayfalara koyduğunuz javascript kod bloklarıdır.
```html
-- İÇERİK --

<script>
  document.write('Selam');
  alert('Merhaba');
  // ...
</script>

-- İÇERİK --

```
şeklinde tanımladığınız tüm kodlar ignore edilmiş olacaktır.

> Bu sorunların hepsini kolayca çözmek ve daha pratik ajax kullanmak istiyorsanız mootools kullanmanızı öneririm.