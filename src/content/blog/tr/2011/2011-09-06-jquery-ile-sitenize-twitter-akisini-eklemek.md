---
title: "jQuery ile sitenize Twitter akışını eklemek"
description: "Twitter'ın kendi widget'larını kullanmadan, jQuery ve Twitter API'si ile sitenize nasıl özel bir Twitter akışı ekleyebileceğinizi adım adım anlatan bir rehber. Kod örnekleri ve açıklamalarla."
slug: jquery-ile-sitenize-twitter-akisini-eklemek
date: 2011-09-06
url: http://mfyz.com/tr/jquery-ile-sitenize-twitter-akisini-eklemek/
tags: ["jquery", "twitter api", "javascript", "önyüz geliştirme", "widget", "sosyal medya entegrasyonu"]
category: Arayüz Programlama
migration: {"wpId":156,"wpPostDate":"2011-09-06T09:50:48.000Z"}
lang: tr
---

Twitter'in kendi widgetları sayesinde twitter hesabınızın public timeline yani akışını sitenize ekleyebiliyorsunuz fakat o widgetı kullanmak zorunda değilsiniz. Twitter api ile akışınızı jquery ile alıp kendiniz çizebilirsiniz. Aslında çok basit. Twitter apisi zaten size public timeline'ınızı json nesnesi olarak veriyor herhangi bir api key kayıdı yapmaya gerek kalmadan.

Bu json nesnesinin adresi

```
http://api.twitter.com/1/statuses/user_timeline.json?screen_name=mfyz&count=10&callback=?

```

Adresteki mfyz benim twitter kullanıcı adım. count parametresiyle de en son pos edilen içeriklerin listesinin boyutunu belirleyebiliyorsunuz, sanırım bu parametrede bir üst limit var.

Yukaridaki adresi tarayıcınıza yapıştırırsanız json nesnesi alırsınız. jQuery ile bu json nesnesini işleyecegiz. Bunun için jquery'deki getJSON() fonksiyonunu kullanacağız. jQuery, normal .ajax() fonksiyonu gibi bu json nesnesini xmlhttprequest yani ajax ile alıp sonucunda işleyebileceğimiz bir javascript objesi olarak bize sunuyor.

Size bu işi yapan tüm kodu verip sonra kod üstünden açıklayacağım:

```js
var $tweetList;
var $tweetUrl = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=mfyz&&count=10&callback=?';
$.getJSON($tweetUrl, function (data) {
    $.each(data, function (i, item) {
        if (i == 0) {
            $tweetList = $('<ul class="tweetList">');
        }
        // handle @reply filtering
        if (item.in_reply_to_status_id === null) {
            $tweetList.append('<li class="tweet_content_' + i + '">' +
                '<p class="tweet_link_' + i + '">' +
                item.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>')
                    .replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="var $tweetList;
var $tweetUrl = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=mfyz&&count=10&callback=?';
$.getJSON($tweetUrl, function (data) {
    $.each(data, function (i, item) {
        if (i == 0) {
            $tweetList = $('<ul class="tweetList">');
        }
        // handle @reply filtering
        if (item.in_reply_to_status_id === null) {
            $tweetList.append('<li class="tweet_content_' + i + '">' +
                '<p class="tweet_link_' + i + '">' +
                item.text.replace(/#(.*?)(\\s|$)/g, '<span class="hash">#$1 </span>')
                    .replace(/(\\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ')
                    .replace(/@(.*?)(\\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') +
                '</p></li>');
        }
    });
    $('#tweetStream').html($tweetList);
});
">var $tweetList;
var $tweetUrl = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=mfyz&&count=10&callback=?';
$.getJSON($tweetUrl, function (data) {
    $.each(data, function (i, item) {
        if (i == 0) {
            $tweetList = $('<ul class="tweetList">');
        }
        // handle @reply filtering
        if (item.in_reply_to_status_id === null) {
            $tweetList.append('<li class="tweet_content_' + i + '">' +
                '<p class="tweet_link_' + i + '">' +
                item.text.replace(/#(.*?)(\\s|$)/g, '<span class="hash">#$1 </span>')
                    .replace(/(\\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ')
                    .replace(/@(.*?)(\\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') +
                '</p></li>');
        }
    });
    $('#tweetStream').html($tweetList);
});
</a> ')
                    .replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') +
                '</p></li>');
        }
    });
    $('#tweetStream').html($tweetList);
});

```

Yukaridaki kod 2 tane değişken tanımlaması ile başlıyor. Birisi api url'i diğeri de html kodunu üreteceğimiz taşıyıcı değişken. Gördüğünüz gibi getJSON fonksiyonu ile url'i belirtip ikinci parametre olarak callback fonksiyonunu tanımladık. Callback fonksiyonu, dönen json nesnesini içerir, bu örnekte "data" adındaki değişken olarak geçiyor. data dizisini dönerek tüm elemanları html kodu üreterek ekleyecegiz listeye.

Döngü içindeki ilk kontrolde eğer taşıyıcı değişken daha üretilmediyse html listesi olarak üretiliyor. Sonrasında bu liste içine satır olarak ekleyecegiz tüm twitter girdilerini.

Bir diğer kontrol ise sadece doğrudan yazılan tweet'leri işleyecegiz, bunu da yazılan tweet'in cevap olmamasını kontrol ederek yapıyoruz. Sonra da taşıyıcı listeye ekliyoruz tweet edilen yazıyı işleyerek. Bu aşamada ise regular expressions ile @username, #hashtag veya url gibi özel yazıları linklere dönüştürüyoruz.

Döngü bittiğinde de html'inizdeki herhangi bir elemanın içine bu üretilen listeyi basabilirsiniz, bu örnekte tweetStream kimliğine sahip nesnenin içine basılıyor.

Bu kodun calışan örneğini anasayfadaki sağdaki kolonda görebilirsiniz. Home.js dosyasında yukarıdaki örnegi görebilirsiniz.