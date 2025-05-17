---
title: "Google Search API ile ajax arama"
slug: google-search-api-ile-ajax-arama
date: 2012-08-14
url: http://mfyz.com/tr/google-search-api-ile-ajax-arama/
tags: ["ajax","api","Diğer","google","jquery","json","search"]
category: Diğer
migration: {"wpId":315,"wpPostDate":"2012-08-14T04:16:11.000Z"}
lang: tr
---

Eğer bir kaynak arıyorsanız, indexlerin güncelliği, genişliği gibi nedenlerden dolayı, diğer arama motorları yerine Google'ı tercih etmek, iyi bir karar olarak düşünülebilir. Yaptığınız Google aramalarını programatik olarak yapmak ve sonuçları herhangi bir şekilde kullanmanın sayısız örneği verilebilir. Örneğin, sayfanıza site içi arama eklemek istiyorsunuz. Sayfanıza ait içeriği eğer Google zaten tarıyorsa, site içi aramanız aslında basit bir Google araması ile yapılabilir. Biliyorsunuz Google'da "site:mfyz.com" şeklinde arama yapılacak domaini filtreleyebiliyorsunuz. Dolayısıyla site içi aramanızı, herhangi bir algoritma yazmaya gerek kalmadan, hatta sadece tarayıcıda javascript ile yapabilirsiniz. Google'un istemci altyapıları için sunduğu JSON tabanlı bir arama APIsi var. Bu api sayesinde normal bir Google araması yapabiliyorsunuz. Bu API'yi basit bir HTTP isteği ile kullanabiliyorsunuz. Herhangi bir Google araması yapıyormuş gibi bir sorgu gönderip cevabını json olarak alıp işleyebiliyorsunuz. http://ajax.googleapis.com/ajax/services/search/web?v=1.0 Aramanızı bu URL'e gerekli parametreleri ekleyerek yaptığınızda Google en fazla 8 sonuç verecek şekilde dönüyor. Cevap olarak dönen JSON içeriği uzun olduğu için burada göstermeyeceğim. Ama birkaç parametreyle gelen sonuç kümesini kullanabilir, sayfalama ve sonuç boyutu gibi parametreler ile sayfalama yapabilirsiniz. Asıl kullanacağınız sonuç değeri, arama sonuçlarının bulunduğu \*\*response.responseData.results\*\* sonuç kümesi olacaktır. Basit bir nesne dizisi olan bu değeri javascript ile ekrana doğrudan basabilir veya sunucu taraflı bir kod ile işleyebilirsiniz. Google bu API ile tek istekte en fazla 8 sonuç döndürüyor. Nedenini kesin bir şekilde bilmiyorum fakat güvenlik nedeniyle olduğunu tahmin ediyorum. Eğer 8'den fazla sonuç göstermek istiyorsanız birden fazla api çağrısı yapmak zorundasınız veya istemci tarafında sayfalama yaparak sonuçları sayfalama ile gösterebilirsiniz. Sayfalama için API çağırısında göndereceğiniz \*\*start\*\* parametresi, arama sonuçlarının başlangıç sırasını belirtiyor. Eğer belirtilmezse geçerli değeri 0 olacaktır. Bundan sonra 8, 16, 24... şeklinde ikinci, üçüncü sayfaya ait sonuçları, ek çağrı yaparak yükleyebilirsiniz. Burada kontrol etmeniz gereken tek şey, toplam bulunan sonuç kümenizde yeterli sonuç olup olmamasıdır. Yani eğer kullanıcı son sayfada ise "Sonraki Sayfa" linkini göstermemeniz gerekir. Basit bir sayfalama için; toplam sayfa sayısı = toplam sonuç sayısı / sayfa başına düşen sonuç sayısı bölümünün üste yuvarlanması ile bulunur. Bunu Google size toplam bulunan sonuç sayısını tahmini şekilde söylüyor. Sonuç kümesindeki \*\*response.responseData.cursor.estimatedResultCount\*\* parametresi size sayısal olarak tahmini sonuç sayısını söyleyecektir. Sayfa sayısını hesaplayarak gerekli sayfalama navigasyonunu oluşturabilirsiniz.

### Örneği kodlayalım

Yazının başlarında verdiğim site içi arama örneğini javascript ile kodlayalım. Doğrudan tüm kodu verip açıklayacağım.
```
<title>Page</title>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>

<input type="text" placeholder="Search" id="searchInput">
<input type="button" value="Search" id="searchButton">
<ul id="searchResultsList"></ul>

```
HTML tarafında ihtiyacınız olan iki ana parça, arama formu ve sonuçları listeleyeceğiniz bir tablo veya liste. Javascript tarafını jQuery kullanarak yazarak HTTP çağrısını, JSON sonucunu işleme, html elemanlarını yönetme gibi birçok kısmı kolayca halledebilirsiniz. İlk yapmamız gereken şey arama formundan arama sorgusunu yakalamak ve arama butonundaki tıklama hareketini yakalamak olacak. Bunun için butonun tıklama olayını yakalayıp text alanının içeriğini alıyoruz.
```
$(function(){
  $('#searchButton').click(function(){
    search();
  });
});

function search(){
  query = $('#searchInput').val();

  $('#searchResultsList').html('





 	*   Aranıyor... (Google Search)

  ');

  loadResults(query, 0);
}

```
Google'un arama APIsini basit bir HTTP isteği ile kullanacağımızı söylemiştim, sonuç bir json nesnesi olduğu için jQuery'nin http istek yardımcı methodlarından \*\*getJSON\*\* methodunu kullanarak hem isteği yönetebilir hem de cevabı işleyebiliriz.
```
function loadResults(query, start){
  var apiURL = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=?';
  $.getJSON(apiURL, {
    q: query + ' site:mfyz.com',
    rsz: 8,
    start: start
  }, function(response){
    var results = response.responseData.results;
  
    $('#searchResultsList .nextPage, #searchResultsList .loading').remove();
    resultsHTML = '';
  
    if(results.length){
      for(var i=0; i < results.length; i++){
        r = results\[i\];
  
        resultsHTML += '

 	*   [' + r.title +
                '' + r.content +
                '](' + r.unescapedurl + ')

          ';
      }
  
      if (response.responseData.cursor.estimatedResultCount > 8) {
        resultsHTML += '

 	*   [Daha fazla sonuç göster](#)

        ';
      }
    }
    else {
      resultsHTML = '

 	*   Aradığınız kriterde içerik bulunamadı.

      ';
    }
  
    $('#searchResultsList').append(resultsHTML);
  });
}

```
Yukarıdaki javascript methodu basit bir HTTP çağrısı yapıp gelen json cevabını işliyor. Basitçe bir liste elemanı (ul) içeriği oluşturuyoruz. Gelen sonuç dizisini bir HTML koduna dönüştürüyoruz. Methodun sonunda ise oluşturulan HTML kodunu liste elemanınımıza ekliyoruz. Bu methodda gördüğünüzü ilk parametre, arama formundan gelen arama sorgusu, ikinci parametre ise, sayfalama için Google APIsine gönderilecek olan sonuç başlangıç indeksi. Bu sayede bu fonksiyonu tekrar çağırarak ikinci, üçüncü ve diğer sayfalardaki arama sonuçlarını yükletebiliyoruz. İlk arama yapılırken yani yukarıda ilk verdiğim javascript kodunda çağırılan arama methodu "0" başlangıç parametresi ile çağrılıyor. Bu methodda dikkatinizi çekmiş olan bir nokta da arama parametresin sonuna "site:mfyz.com" eklemiş olmam. Sorguya eklenen bu kısım, yapılan aramanın sonuçlarında sadece o domain'deki sayfaları döndürmesini sağlayacaktır. Yukarıdaki HTML çıktısını CSS ile işleyebilirsiniz veya arama formunu "ara" butonu ile değil eş zamanlı arama gibi her tuşa basıldığında belirli bir zaman aşımı ile girilen kelimeyi yakalayıp arama yapabilirsiniz.