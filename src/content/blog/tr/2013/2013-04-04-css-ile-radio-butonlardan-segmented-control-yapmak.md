---
title: "CSS ile radio butonlardan segmented control yapmak"
description: "HTML radio butonları ve CSS kullanarak, JavaScript'e ihtiyaç duymadan, iOS benzeri 'segmented control' (bölümlenmiş kontrol) form elemanları oluşturma tekniği ve teorisi."
slug: css-ile-radio-butonlardan-segmented-control-yapmak
date: 2013-04-04
url: http://mfyz.com/tr/css-ile-radio-butonlardan-segmented-control-yapmak/
tags: ["css", "html", "form elemanları", "segmented control", "radio buton"]
category: Arayüz Programlama
migration: {"wpId":353,"wpPostDate":"2013-04-04T05:00:00.000Z"}
lang: tr
---

Bu form elementinin diğer ortamlardaki adını bilmiyorum ama cocoa'daki (macosx işletim sistemini doğal arayüz kütüphanesi) adı segmented control. Bu yüzden, yazının devamında segmented control olarak kullanmaya devam edeceğim.

iOS arayüzlerindeki on/off swtich'lerini biliyorsunuzdur, geçtiğimiz 2 yılda web'deki implementasyonları o kadar artti ki, artık her yerde basit bir javascript kütüphanesi olarak bu form elementini bulmak mümkün. Sadece javascript değil css implementasyonları da var. Bu yazıda, bu elementin teorisine biraz değineceğim. Ayrıca benim kullandığım method, javascriptin çalışmadığı tarayıcılarda da sorunsuz çalışacak (fallback) hatta css desteklemeyen taryıcılarda dahi fonksiyonalitesini bozulmadan koruyacak standart input, label elementleri ile bunu nasıl yapabileceğinizi anlatacağım.

Ama görsel olarak neyden bahsettiğimi göstermem gerekirse:

![](/images/archive/tr/2013/04/segmented_controls.png)

Gördüğünüz gibi aslında standart bir çoktan seçmeli tek cevap sorularından bahsediyorum. Bunun için standart form elementlerinden radio butonu kullanarak cevapları tek grup altında label ve input elementleriyle bir formda toplayalım.
```html
<label for="radio11">
	<input type="radio" id="radio11" name="answer" checked="checked" />
	Yes
</label>
<label for="radio12">
	<input type="radio" id="radio12" name="answer" />
	Maybe
</label>
<label for="radio13">
	<input type="radio" id="radio13" name="answer" />
	NO
</label>

```
Bu standart html form yapısını kullanarak javascript kullanmadan segmented control'a çevireceğiz. Ama önce yapacağimiz değişikliğin teorisini anlatmak istiyorum.

Bahsettiğimiz gruplanmış seçim nesnesi aslında görsel olarak seçili görünmek zorunda. Radio input'unu görsel olarak gizleyeceğimiz bu noktada gayet açık. Standart form etkilesiminde, bir radio elemanı seçili olduğunda input elementinin görsel durumu yeterli oluyor kullanıcılar için. Biz bu görünümü özelleştireceğiz hatta tamamen başka bir nesne kullanarak yapacağiz.

Bu etkileşimi, yani bir radio elemanının seçili durumda olup olmadığını css ile yakalayabildiğimiz bir sözde özellik var (pseudo) ":checked". Ancak input:checked elemanı bize hala input elemanini kendisini verecektir. Başka bir elemanı bu seçiciyle yakalayabilmemizin tek yolu bu gerçek elemanı takip eden bir sonraki eleman seçicisi. Bunu da "+" seçicisiyle yapabiliyoruz biliyorsunuz.

Yani "a + span" css seçicisi
```html
<a href="#">Link</a>
<span class="description">Link description</span>

```
şeklindeki bir html yapısında, a elementini takip eden span elementini ifade eder. Yani aslında bu seçiciyle span elementini seçebilirsiniz; a elementi bir koşul oluşturacaktır bu seçici için.

Şimdi bu teoriyi bizim asıl örneğimize yani input'larin seçili olduğu durumda görünür başka bir elemanı seçmek için kullanırken inputu takip eden bir span elementini seçtirerek sağlayabiliriz. Böylece span elementini radio butonun seçili durumunda istediğimiz şekilde özelleştirerek herhangi bir görünüme sokabiliriz.

Şimdi bu yapıyı uygun gruplama ve isimlendirme ile html kodunda yapmak gerekirse:
```html
<label for="radio11" class="option">
	<input type="radio" id="radio11" name="answer" checked="checked" />
	<span>Yes</span>
</label>
<label for="radio12" class="option">
	<input type="radio" id="radio12" name="answer" />
	<span>Maybe</span>
</label>
<label for="radio13" class="option">
	<input type="radio" id="radio13" name="answer" />
	<span>NO</span>
</label>

```
şeklinde bir html yapısı işimizi görecektir. Bu yapı, standart html görünümünü değiştirmeyecektir. Şimdi css ile bu görünümü segmented control görüntüsüne sokalım:
```css
.segmented_control .option span {
    display: inline-block;
    background-color: #efefef;
    padding: 8px 15px;
    border-left: 1px solid #fff;
    cursor: pointer;
    text-shadow: #fff 0 1px 0;
}

.segmented_control .option span:hover {
    background-color: #ccc;
}

.segmented_control .option input {
    display: none;
}

.segmented_control .option input:checked + span {
    background-color: #7abcff;
}

```
Gördüğünüz gibi input elemanlarını gizledik ve span elemanlarını gri artalan rengi ile basitçe şekillendirdik. Seçili eleman stilini de kodun sonunda bulunan ".segmented_control .option input:checked + span" seçicisiyle yakalayarak artalan rengini açık mavi rengi yapıyoruz. Böylece yan yana bulunan label elemanları içindeki span elemanları segmented control görüntüsüne kavuştu.

Fakat ufak bir problem var, elemanlar arasında boşluklar oluşuyor. Malesef inline-block level elemanlar float edilmedikleri sürece html kodundaki her satır ve boşluk karakteri bu elemanlar arasında kalacaktır. Bunu engellemenin yolu, label elemanları ve içindeki elemanlar arasında hiç boşluk karakteri kalmayacak şekilde tek satıra indirgemektir. Sonuçtaki kod çirkin görünecek fakat boşlukları kaldıracaktır.

Demo'nun kodunda görebileceğiniz gibi ilk ve son elemanları ayrıca seçerek border radius ekleyerek bu elemanları daha gruplanmış bir görüntüye sokabilirsiniz. Ya da tamamen tasarlanmış bir dizayni artalan resimleri olarak bu elemanlara yerleştirebilir böylece istediğiniz görüntüyü elde edebilirsiniz.

Doğru sınıflama ile özel elemanları yakalayıp onların seçili durumlarında onlara özel stilleme yapabilirsiniz.