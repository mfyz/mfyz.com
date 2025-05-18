---
title: "Radio butonları CSS ile makyajlamak"
slug: radio-butonlari-css-ile-makyajlamak
date: 2013-01-04
url: http://mfyz.com/tr/radio-butonlari-css-ile-makyajlamak/
tags: ["Arayüz Programlama","css","css3","form","html","radio","style","styling"]
category: Arayüz Programlama
migration: {"wpId":341,"wpPostDate":"2013-01-04T06:00:00.000Z"}
lang: tr
---

Bildiğiniz gibi bazı form elementlerine (radio butonlar, check butonlar ve birkaç diğer element) kozmetik olarak müdahale edemiyoruz veya kısıtlı şekilde müdahale edebiliyoruz. Sonuç olarak bu elementlerin görüntüsü ve çizilmesi tamamen tarayıcı kontrolünde, çoğu işletim sisteminin arabirim elementleriyle uyumlu şekilde görünecek şekilde ayarlanmış. Web arayüzünde standart elementlere dokunmamak genellikle farklı tarayıcı, farklı cihaz ve farklı işletim sistemlerinde sorunsuz çalışmasını sağlaycaktır.

Fakat bazen bir sayfayı sadece bir cihaz için veya belirli bir tarayıcıda görünecek şekilde tasarlarsınız ve bu noktada kullandığınız tüm elementlere istediğiniz tasarımı giydirmek isteyebilirsiniz. Örnegin mobil bir tarayıcıda görüntülenecek bir oyun arayüzü tasarlıyor olabilirsiniz.

Bunun için javascript çözümleri mevcut fakat birkaç css3 özelliği kullanarak sadece css ile çözebilirsiniz. Bu yazıda size radio butonları istediğiniz şekilde şekillendirmeyi anlatacağım. Radio butonları standart kullanımda, yani çoklu secenekten yapılan seçimler için bir örnek üzerinde göstereceğim.

![](/images/archive/tr/2013/01/style_radios.png)
```
<h3>Which one do you prefer?</h3>
<ul>
    <li>
        <label for="radio1">
            <input type="radio" id="radio1" name="my\_options" class="tick\_or\_x" checked="checked" />
            <span>Strawberry Mojito</span>
        </label>
    </li>
    <li>
        <label for="radio2">
            <input type="radio" id="radio2" name="my\_options" class="tick\_or\_x" />
            <span>Pina Colada</span>
        </label>
    </li>
    <li>
        <label for="radio3">
            <input type="radio" id="radio3" name="my\_options" class="tick\_or\_x" />
            <span>Mint Liquor</span>
        </label>
    </li>
</ul>

```
Kod oldukça açık, basit bir liste içinde label elementlerinin içinde radio inputlar ve span ile çevrelenmiş açıklama metinleri içeriyor. Gayet standard bir css ile bu görüntüyü yukarıdaki görselde solda olan temiz bir şekle sokalım:
```
body {
    padding: 10px 30px;
    font: 18px Helvetica;
}
ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
}

```
HTML kodunda farkettiğiniz gibi tüm radio elementleri tick\_or\_x sınıfıyla tanımlanmışlar, şimdi bu sınıfı hazırlayacağız.

Aslında yaptığımız işlem radio elementini gizleyip onun yerine x veya tık işareti koymak. Yerine yerleştirdiğimiz elementi css ile oluşturacağız. Bunun için bir css özelliği olan ":before" pesudo elementi ile html kodunda gördüğünüz span elementlerini kullanacağız. Onun için input elementlerini hemen gizleyebiliriz (veya görünür bir şekilde bırakıp gerçekten görsel değişiklikleri form elementleri üstünde uygulanıp uygulanmadığını görebilirsiniz).

Şimdi list elementlerin içinde sadece span'ler var, bunu da input elementini belirlediğimiz sınıf adını "+" operatörüyle kullanarak seçtirebiliriz, yani ".tick\_or\_x + span" css seçicisi tick\_or\_x sınıflı elementin hemen ardından gelen span'leri seçmemizi sağlayacaktır.

Aşağıda tick\_or\_x sınıfına ait kodu veriyorum, hemen ardından açıklamaya çalışacağım:
```
.tick\_or\_x {
    display: none;
}
.tick\_or\_x + span {
    display: inline-block;
    position: relative;
    padding-left: 40px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-bottom: 15px;
}
.tick\_or\_x + span:before {
    content: '✗';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background: silver;
    width: 30px;
    margin-right: 10px;
    text-align: center;
    border-radius: 15px;
}
.tick\_or\_x:checked + span:before {
    content: '✔';
    background: green;
    color: white;
}

```
".tick\_or\_x + span" seçicisiyle seçtiğimiz elementleri block level elementlere çevirelim, sonrasında ".tick\_or\_x + span:before" seçicisiyle span elementimizin önüne bir element oluşturacağız. Bu kısım biraz kafa karıştırıcı gelebilir, css before ve after pesudo elementleri hakkında daha önce yazdığım "[CSS before ve after sözde elementleri]("http://mfyz.com/css3-before-ve-after-sozde-elementleri")" yazısını inceleyebilirsiniz.

".tick\_or\_x + span:before" ile seçtiğimiz sözde elementi bir block level elemente çeviriyoruz ve position absolute ile havada asılı hale getirelim (floating element). Bu elementin ailesi (parent) olan ".tick\_or\_x + span" elementi daha önce block level ve relative duruma getirilip bulunduğu noktada asılı hale getirilmişti. Şimdi before sözde elementini istediğimiz noktaya pozisyonlayabiliriz. Bu sözde element ile görsel olarak, tick veya x işaretini oluşturacağız. Bir radio butonun doğal durumunun seçili olmadığı (unchecked) durumu olduğunu düşünürsek bu sözde elementin doğal görünümü "X" işaretçisi olacaktır. Bunu bir imajla da tasarlayıp tamamen özelleştirebilirsiniz. Ben basit bir örnekleme ile ascii karakterlerini doğrudan css içine yazdım, aslında bunu yapmamak gerek, çünkü IE gibi tarayıcılarda bu karakterler çalışmayacaktır.

Elementimizi radio butonlarımızın bulunduğu konuma gelecek şekilde (örnekte solda etiketin yanında) pozisyonladıktan sonra seçim durumunu yakalamaya çalışacağız. Burada bir css3 seçicisi olan ":checked" seçicisini kullanacağız. Bu seçici sadece seçilmiş checkbox, radio gibi elementleri işaret eder. Seçili olan radio butonumuzu bu şekilde yakalayabiliriz. Görsel olarak ilgili elementleri yakalamak için bu seçici ile "+" operatörünü beraber kullanıyoruz ve ".tick\_or\_x:checked + span" seçicisi bize seçili olan radio butona ait etiket span'ini yakalamamızı sağlıyor. Bu elemente ait before sözde elementi de seçili olan elementin görsel olarak yerleştirdiğimiz işaretçisini adresleyecektir.

Doğal olarak seçimi ifade eden check ascii işareti ve bir artalan rengi farklılığı ile görsel olarak seçimi gösterebiliyorum. Bunun yerine bir imaj tasarlayarak istediğiniz şekilde özelleştirebilirsiniz.

Ben başta gizlediğimiz radio input elementini bu noktaya kadar görünür halde tutup, hazırladığım kodun, yaptığım tıklamaları doğru yakalayıp yakalamadığını form elementi üstünde görecek şekilde geliştiriyorum. Bu noktada input'lari css'den gizliyoruz ve kodumuz hazır duruma geliyor. Şimdi aşağıdaki butonla çalışan örneğin inceleyin.

[Çalışan Örnek Kod](http://mfyz.com/Files/Article_Examples/tick_or_x.html)

Nihai kodu da çalışan demo'dan inceleyebilirsiniz.