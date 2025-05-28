---
title: "jQuery ile otomatik boyutlanan textarea"
slug: jquery-ile-otomatik-boyutlanan-textarea
date: 2012-06-13
url: http://mfyz.com/tr/jquery-ile-otomatik-boyutlanan-textarea/
tags: ["Arayüz Programlama","auto","autoresize","autosize","javascript","jquery","otomatik","textarea"]
category: Arayüz Programlama
migration: {"wpId":164,"wpPostDate":"2012-06-13T00:33:16.000Z"}
lang: tr
---

Textarea her yerde kullandığımız bir form elementi ve sınırlandırılmış bir metin girdisini düşünmüyorsak textarea içine girilecek yazı teknik olarak oldukça uzun veya kısa olabilir. Genellikle bu boyut (o metin kutusuna girilebilecek ortalama tahmini uzunlugu), o textarea'nin yükseklik değerini belirler görsel olarak.

Örnek veriyorum ortalama olarak 3 cümlelik bir metin girildiğini tahmini olarak belirliyorsak 3 satır sığacak şekilde bir textarea hazırlarız ekrana. Ama uzun bir metin giriliyorsa görsel olarak ve sayfadaki kullanıcı deneyimi açısında iç içe kaydırılabilir elementler olması güzel bir deneyim değildir. Sonuçta textarea'yi uzun da olsa bir metinin girildiği bir kutu olarak düşünürsek, o kutunun metinin uzunluğuna göre değişiyor olması güzel bir kullanıcı deneyimi sunacaktır.

Birkaç farklı jquery plugini bulabilirsiniz bunun için, ben şu an mfyz.com'un ön yüzünde değil ama admin panel'de uzun süredir kullanıyorum kendi yazdığım bir jquery kodunu. Birkaç ay önce bir plugin ile değiştirmiştim kendi kodumu fakat kısa zaman önce başka bir plugin ile tekrar değiştirdim. Size son kullandığım plugin üzerindne bunu nasıl yapabileceğinizi göstereceğim. Açıkcası çok derin açıklama yapmama da gerek yok, plugin sayfasına gidip indirip tek satırlık bir tanımlama ile varolan bir textarea'nizi otomatik genişleyen bir textarea'ya dönüştürebilirsiniz.

[http://www.jacklmoore.com/autosize](http://www.jacklmoore.com/autosize) adresinden jquery autosize plugin'ini test edebilirsiniz, sayfayı ziyaret edin ve güncel sürümü indirin.

**jquery.autosize-min.js** dosyasını projenizin assetlerine kopyaladıktan sonra sayfanıza include edin. Örnegin sayfanızda "comment" kimliğine sahip bir textarea olduğunu varsayalım.
```html
<textarea id="comment"></textarea>
<script type="text/javascript">
$(function(){
    $('#comment').autosize();
});
</script>

```
Bu kod comment kimlikli textarea'nizi otomatik genişleyen bir textarea'ya dönüştürecektir. Hepsi bu kadar...

Daha pratik ve genelleştirerek bir sınıf tanımlayıp o sınıftaki tüm textarea'lari otomatik olarak bu plugin ile otomatik-yukseklik-ayarlanan textarea'lara dönüştürebilirsiniz:
```html
<textarea id="txt1" class="autosize"></textarea>
<textarea id="txt2" class="autosize"></textarea>
<script type="text/javascript">
$(function(){
    $('textarea.autosize').each(function(){
        $(this).autosize();
    });
});
</script>

```
Plugin adresi: [http://www.jacklmoore.com/autosize](http://www.jacklmoore.com/autosize)