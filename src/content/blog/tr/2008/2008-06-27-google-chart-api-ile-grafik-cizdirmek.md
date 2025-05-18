---
title: "Google Chart API ile grafik çizdirmek"
slug: google-chart-api-ile-grafik-cizdirmek
date: 2008-06-27
url: http://mfyz.com/tr/google-chart-api-ile-grafik-cizdirmek/
tags: ["api","chart","google","grafik","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":138,"wpPostDate":"2008-06-27T06:19:47.000Z"}
lang: tr
---

Yakın zamanda (gerçi 3-5 ay oldu) google chart api'sini sunarak GET mothodu ile gönderdiğiniz çağrılar sonucu oldukça hızlı biçimde yumuşatılmış (antialiased) grafikler çizdirebiliyor. API'nin kullanımı aslında oldukça basit. Verileriniz ve grafik detaylarınız (etiketler, renkler vs) ile bir URL oluşturuyor ve çağırıyorsunuz. Google size PNG formatında istediğiniz boyutta ve renklerde grafik veriyor. Dökümantasyonu güzel hazırlanmış ve neredeyse tüm popüler grafik türlerini çizdirebiliyor. [http://code.google.com/apis/chart/](http://code.google.com/apis/chart/) adresinden gerekli bilgiyi alabilirsiniz.

Doğrudan kullanıma yönelik parametreleri ele alacağım ve en çok kullanılan 3-4 grafik türünü nasıl çizdirebileceğimizden bahsedeceğim. Geri kalan daha detaylı bilgiyi kendi sitesinden alabileceksiniz zaten.

#### chs (Chart Size)

Bu parametre ile çizdirilecek grafiğin boyutlarını piksel olarak vermeniz gerekiyor width + x + height yani klasik formatta 200x100 şeklinde belirteceğiniz bir parametre 200px genişlik, 100px yükseklikte bir resim çizdirecektir.

#### cht (Chart Type)

Çizdirilecek graifk türünü belirtmek için bu parametreyi kullanıyoruz. Aşağıda google chart api ile çizdirebileceğiniz grafikler türleri ve veri seti boyutları verilmiştir :

### **lc** : Çizgi Grafiği (Line Chart)

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=400x300&chd=s:fooZaroo)

### **lxy** : X,Y Grafiği

![Grafik](http://chart.apis.google.com/chart?cht=lxy&chs=400x300&chd=t:0,30,60,70,90,95,100|20,30,40,50,60,70,80|10,30,40,45,52|100,90,40,20,10|-1|5,33,50,55,7&chco=3072F3,ff0000,00aaaa&chls=2,4,1&chm=s,FF0000,0,-1,5|s,0000ff,1,-1,5|s,00aa00,2,-1,5)

### **bhs** : Yatay Bar Grafiği

![Grafik](http://chart.apis.google.com/chart?cht=bhs&chs=400x150&chd=s:ello&chco=4d89f9)

### **bvs** : Diket Bar Grafiği

![Grafik](http://chart.apis.google.com/chart?cht=bvs&chs=200x300&chd=t:10,50,60,80,40|50,60,100,40,20&chco=4d89f9,c6d9fd&chbh=20&chds=0,160)

Bu iki bar grafiğinde 2 boyutlu veri setine kadar bar grafikleri çizdirebilirsiniz. Tek boyutlu çizdirirseniz histogram grafiği elde edersiniz.

### **p** : Pasta grafiği

![Grafik](http://chart.apis.google.com/chart?cht=p&chd=s:Uf9a&chs=400x300&chl=Ocak|Şubat|Mart|Nisan)

### **p3** : 3 Boyutlu Pasta Grafiği

![Grafik](http://chart.apis.google.com/chart?cht=p3&chd=s:Uf9a&chs=500x250&chl=Ocak|Şubat|Mart|Nisan)

### **s** : Saçılım (Scatter) Grafiği

![Grafik](http://chart.apis.google.com/chart?cht=s&chd=s:984sttvuvkQIBLKNCAIi,DEJPgq0uov17zwopQODS,AFLPTXaflptx159gsDrn&chxt=x,y&chxl=0:|0|2|3|4|5|6|7|8|9|10|1:|0|25|50|75|100&chs=400x300)

#### chd (Chart Data)

Bu parametre ile çizdireceğiniz grafik türüne göre tek veya çok boyutlu verinizi şekillendirip belirliyorsunuz. 2 şekilde çalışıyor. Bu parametre ile gönderdiğiniz string'in başında "t" harfini koyarsanız text türü veri şeklinde şifrelenmemiş ve virgülle ayrılmış düz sayısal değerler belirtiyorsunuz:

![Grafik](http://chart.apis.google.com/chart?chs=200x100&cht=lc&chd=t:60,40,20,15,50,70,20)
```
http://chart.apis.google.com/chart?
chs=200x100
&cht=lc
&chd=t:60,40,20,15,50,70,20

```
Şekilden görülebileecği gibi veriler ilerleyiş sırasına göre çizgi grafiğine dökülmüştür. chd parametresi "t:" ile başlayıp virgüllerle ayrılmış ham verilerle belirtilmiştir.

Veriyi kodlayarak belirterek daha kısa urller oluşturabilirsiniz. Ayrıca verinizi tam olarak url'de vermek istemeyebilirsiniz. Google bu verileri işlerken yüzde (%) üzerinden değerlendirme yaptığından siz doğrudan yüzdelerle ifade edilen birk kodlamada verilerinizi belirtebilirsiniz. Önce örneği vereyim. Yukarıdaki verilerin kodlanmış şekilde belirtilmesi :

![Grafik](http://chart.apis.google.com/chart?chs=200x100&cht=lc&chd=s:lYMJfrM)
```
http://chart.apis.google.com/chart?
chs=200x100
&cht=lc
&chd=s:lYMJfrM

```
Gördüğünüz gibi "t:" yerine "s:" ile belirttikten sonra verilerimizin kodlanmış halini giriyoruz. Sonuçta çok daha kısa bir string oluşturmuş oluyoruz.

Bu kodlama için google dökümantasyonda bir javascript fonksiyonu veriyor. Yaptığı iş verilerinizi belirttiğiniz maksimum değerine göre yüzde üzerinden değerlendirip, `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789` kümesine ölçeklendirip her değere karşılık gelen harfleri yan yana koymak.

Bu işi yapan javascript fonksiyonu ve kısaca kullanımı :
```
var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function simpleEncode(valueArray, maxValue) {

    var chartData = \['s:'\];

    for (var i = 0; i < valueArray.length; i++) { var currentValue = valueArray\[i\]; if (!isNaN(currentValue) && currentValue >= 0) {
            chartData.push(simpleEncoding.charAt(Math.round((simpleEncoding.length - 1) \* currentValue / maxValue)));
        } else {
            chartData.push('\_');
        }
    }

    return chartData.join('');
}

// Örnek sifreleme
var veri\_dizisi = new Array(0, 1, 4, 4, 6, 11, 14, 17, 23, 28, 33, 36, 43, 59, 65);
var max\_deger = 70;
alert(simpleEncode(veri\_dizisi, max\_deger));

```
Alt kısımda kullanımını görüyorsunuz, oldukça basit.

Bu kod javascript kodu ve biliyorsunuz ki web uygulamalarında verileri genelde böyle açıkca vermek istemeyiz. Ayrıca bu kadar basit kullanımlı bir api için verilerin kullanıcıda url'ye dönüştürülüp grafiğin api aracılığıyla istenmesi gibi karışık bir yol izlemek tercih edilmez. PHP için bu javascript kodunda yapılan işleri php ile yaptıran ufak bir fonksiyon yazdım :
```
function encodeData($data, $max\_value) {

    $simpleEncoding = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    $data\_string = "s:";
    foreach($data as $currentValue) {
        if (is\_numeric($currentValue) & amp; & amp; $currentValue & gt; = 0) {
            $data\_string. = substr($simpleEncoding, round((strlen($simpleEncoding) - 1) \* $currentValue / $max\_value), 1);
        } else {
            $data\_string. = '\_';
        }
    }

    return $data\_string;
}

print encodeData(array(60, 40, 20, 15, 50, 70, 20), 100);

```
Kullanımı aynı, verilerinizi ilk parametrede dizi olarak veriyor, ikinci parametrede de grafiğin üst sınırını veriyorsunuz. Size veriyi encode edilmiş ve chd parametresine yapıştırabileceğiniz formatta veriyor. Mesela yukarıdaki verinin kodlanmış hali : `s:lYMJfrM` Bu veriyi kodlamadan vermek isteseydik : `t:60,40,20,15,50,70,20` parametresi belirtecektik. Veri seti büyüdüğünde bu dönüşüm sayesinde urldeki karakter sayısı tasarrufu artacaktır.

Sonuç olarak yukarıdaki kodlama tekniği ile verilerimizi kodlayıp parametrede belirtiyoruz.

* * *

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=200x105&chd=s:FOETHECat,KATYPSNXJ)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=200x125
&chd=s:FOETHECat,KATYPSNXJ

```
Şimdi bu grafikte iki veri setiyle belirtilen zaman çizelgesindeki çizgiler renk ayrımı yapılmadığından fark edilemiyor. Grafiklerimizdeki renkleri ayarlamak için :

#### chco (Chart Colors)

Bu parametreyle "#" işareti belirtmeden hex kodlarıyla renkleri virgül işaretiyle ayırarak belirtmemiz gerek. Veri setinde kaç tane farklı set varsa o kadar renk belirtmek gerekir. Aksi halde kafasına göre yerleştirebiliyor. Örneğin az önceki grafikte iki veri setini seçilebilir hale getirelim :

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=200x115&chd=s:FOETHECat,KATYPSNXJ&chco=ff0000,00ff00)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=200x125
&chd=s:FOETHECat,KATYPSNXJ
&chco=ff0000,00ff00

```
Renkleri belirttiğimiz sırada veri setlerine uygulandı. Başka bir örnek olarak da pasta grafiği için renkleri uygulamak istersek :

![Grafik](http://chart.apis.google.com/chart?cht=p3&chd=s:Uf9&chs=200x110&chco=EAA012,93BC1C,1C47BA)
```
http://chart.apis.google.com/chart?
cht=p3
&chd=s:Uf9
&chs=500x250
&chco=EAA012,93BC1C,1C47BA

```
Burada 3 dilimli bir pasta grafiği çizdirdiğimizi bilgiğimiz için 3 renk verdik. İstersek 100 tane renk verelim, bu pasta 3 dilimli olduğundan ilk 3 rengi uygulayacaktır. Geri kalanlar kullanılmayacaktır.

#### chtt (Chart Title)

Grafiğin başlığını belirmek için kullanılır. Bu parametre ile grafiğin üst kısmına istediğiniz açıklamayı tek satır olacak biçimde ekleyebilirsiniz. Uzun metinler grafikten taşacaktır ve görüntülenmeyecektir.

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=230x135&chd=s:FOETHECat,KATYPSNXJ&chco=ff0000,00ff00&chtt=A+ve+B+Firması+Karşılaştırması)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=230x135
&chd=s:FOETHECat,KATYPSNXJ
&chco=ff0000,00ff00
&chtt=A+ve+B+Firması+Karşılaştırması

```

#### Açıklama Kutusu (Legend)

Bu özellik 2 parametre ile kullanılır. Birincisi veri setlerini tanımladığınız chdl parametresi, ikincisi ise açıklama kutusunun grafiğin neresinde bulunacağını belirten parametredir, bu da chdlp parametresidir. Pozisyon ile ilgili parametre zorunlu değildir. Örneklerle açıklamaya çalışacağım :

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=300x155&chd=s:FOETHECat,KATYPSNXJ&chco=ff0000,00ff00&chtt=A+ve+B+Firması+Karşılaştırması&chdl=A+Firması|B+Firması&chdlp=r)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=300x155
&chd=s:FOETHECat,KATYPSNXJ
&chco=ff0000,00ff00
&chtt=A+ve+B+Firması+Karşılaştırması
&chdl=A+Firması|B+Firması
&chdlp=r

```
chdlp parametresini kullanmazsanız açıklama kutusu grafiğin sağında çıkar. Yukarıdaki grafikte de sağ taraf ayarlanmıştır t, l, b, r ile yönü belirleyebiliriniz. Ayrıca chdl parametresine değer verirken | (pipe) işareti ile ayırarak veri seti kadar değer girin.

#### chf (Chart Fill)

Bu parametre aslında oldukça karışık ve geçiş efektlerinden zebra-lines tarzı arka-alan dolgusuna kadar çok değişik artalanlar oluşturabiliyorsunuz. Ben burada basitçe grafiğin arka rengini değiştirmeyi göstereceğim. Detaylı bilgiyi dökümantasyonunda bulabilirsiniz.

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=250x135&chd=s:FOETHECat,KATYPSNXJ&chco=ff0000,00ff00&chf=bg,s,92BFFB)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=250x135
&chd=s:FOETHECat,KATYPSNXJ
&chco=ff0000,00ff00
&chf=bg,s,92BFFB

```

#### chg (Chart Grid Lines)

Karşılaştırmayı kolaylaştırmak için grafiğin arkasına ızgara koymak isteyebilirsiniz, bu parametre ile ızgara hücre boyutunu girip ayarlayabiliyorsunuz.

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=250x135&chd=s:FOETHECat,KATYPSNXJ&chco=ff0000,00ff00&chg=10,20)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=250x135
&chd=s:FOETHECat,KATYPSNXJ
&chco=ff0000,00ff00
&chg=10,20

```

#### Grafik Boyut/Değer başlıkları

Çok saçma bir başlık oldu ama Türkçe nasıl denir bilmiyorum. Axis Labels desem kim anlar onu da bilmem :) Kısaca şu oluyor, koordinat çizgileri üzerinde grafikteki değerlerin ifade ettiği etiketleri ayarlamak için birkaç parametre dizisi kullanacağız.

#### chxt (Chart Axis Type)

x, y, r, t değerleri alıyor. x ve y adı üzerinde eksenleri r ve t de üst ve sağ tarafta başlıkların çıkmasını sağlıyor. chxt parametresine virgül ile ayırarak görüntülenecek etiketler için pozisyon bilgisi veriyor. Burada iki kere aynı değeri verirseniz (mesela chxt=x,y,x) o eksende belirttiğiniz kadar AYNI başlıklardan çıkar.

Tabiki chxt parametresi tek başına kullanılmıyor. Eğer tek başına kullanırsanız ölçeklendirmedeki otomatik değerler görünecektir. Mesela az önce çizdirdiğimiz grafiğe X ve Y eksenine başlıklar eklemek isteyelim :

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=250x135&chd=s:FOETHECat,KATYPSNXJ&chco=ff0000,00ff00&chxt=x,y)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=250x135
&chd=s:FOETHECat,KATYPSNXJ
&chco=ff0000,00ff00
&chxt=x,y

```
Bu etiketleri değiştirmek istersek :

#### chxl (Chart Axis Labels)

Başlık belirtmemize yarar. Hemen örnekle devam edelim :

![Grafik](http://chart.apis.google.com/chart?cht=lc&chs=350x215&chd=s:FOETHECat,KATYPSNXJ&chco=ff0000,00ff00&chxt=x,y,r,x&chxl=0:|Ock|Tem|Ock|Tem|Ock|1:|0|100|2:|Düşük|Orta|Yüksek|3:|2005|2006|2007)
```
http://chart.apis.google.com/chart?
cht=lc
&chs=250x135
&chd=s:FOETHECat,KATYPSNXJ
&chco=ff0000,00ff00
&chxt=x,y,r,x
&chxl=
0:|Ock|Tem|Ock|Tem|Ock|
1:|0|100|
2:|Düşük|Orta|Yüksek|
3:|2005|2006|2007

```
Yukarıda gördüğünüz gibi x eksenini 2 kere kullandık fakat farklı etiket atadık. Bunu da chxl parametresinde sırayla gösterilecek eksenlerdeki başlıkları girdik. Aslında oldukça basit.

Şimdilik google chart api ile ilgili anlatmak istediklerim bu kadar. Basitçe api'nin nasıl kullanıldığını aktarmaya çalıştım, daha detaylı bilgi ve fantastik grafikler üretmek için api'nin kendi dökümantasyonunu deşin derim. Zira oldukça basit ve örneklerle dolu bir dökümantasyon, Türkçe kaynak olması için özetledim.

API Dökümantasyonu : [http://code.google.com/apis/chart/](http://code.google.com/apis/chart/)

[http://24ways.org/2007/tracking-christmas-cheer-with-google-charts](http://24ways.org/2007/tracking-christmas-cheer-with-google-charts) adresinde bazı ilginç örneklerler açıklamalar var. Ayrıca kolayca php ile bu grafik urllerini oluşturabilmek için de bazı projeler geliştirilmiş. Bunlardan ikisi : [http://code.google.com/p/gchartphp/wiki/Examples](http://code.google.com/p/gchartphp/wiki/Examples) ve [http://www.malaiac.com/GphpChart/](http://www.malaiac.com/GphpChart/)