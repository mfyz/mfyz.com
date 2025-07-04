---
title: "Screen ile Taşınabilir Konsollar"
slug: screen-ile-tasinabilir-konsollar
date: 2005-06-03
description: "Linux'ta screen komutu ile sanal konsollar oluşturmayı ve yönetmeyi öğrenin. Bu rehber, screen'in ne olduğunu, oturumları ayırma (detach), yeniden bağlama (reattach) ve paylaşma gibi faydalarını ve temel kullanım komutlarını açıklıyor."
url: http://mfyz.com/tr/screen-ile-tasinabilir-konsollar/
tags: ["Linux", "screen", "terminal", "konsol", "tty", "SSH", "sanal konsol", "komut satırı", "işletim sistemi", "OS", "detach", "reattach"]
category: OS
migration: {"wpId":67,"wpPostDate":"2005-06-03T15:55:48.000Z"}
lang: tr
---

#### Screen nedir ki?

Screen, linux üzerinde bir konsol aracıdır. Screen sayesinde sanal konsollar açabilir ve bunları yönetebiliriz. Mantık olarak pencere gibi düşünün, her pencerenin bir id'si var ve bu pencereleri masaüstlerinde gezdirebiliyorsunuz. Screen ise bu işin konsol versiyonu. Screen ile konsol üzerinde yeni konsollar açıp kapayıp açık olanların listesini görüp, onlara spesifik id'ler atayıp veya o id'lerdeki konsollara geri dönüş yapabilirsiniz.

#### Ne işime yarar?

Screen paketi ilk bakışta çok fonksiyona yarayacak bişey gibi görünmüyor. İş uygulamasına geldiğinde güzelleşiyor. Birkaç örnek ile açıklayayım. Diyelim ki tty1'de bir uygulama açtınız, içerisinde bir url çıktı, o siteye girmek için o url'i kağıt kalem ile kaydedebilir, bir dosyaya paste edip onu X üzerinde açıp işinizi görebilir veya programın o konumunu ezberleyip X'de bir konsolda açıp görebilirsiniz. Eğer scren programı üzerindeki bir konsolda iseniz, **CTRL + A + D**'ye bastığınızda o konsoldan çıkmış olur, X'de bir konsolda screen ile o konsola dönebilir, konsolunuzun kaldığı yerinden devam edebilirsiniz. Screen sayesinde konsollarınızı, çıktı, içerisindeki işlemler bozulmadan rahatlıkla taşıyabilirsiniz. Başka ve daha güzel bir örnek vermek gerekirse, X'te bir konsol açıp wget ile 30 tane 100'er mb'lik dosya download açtınız. Yada bir iso çekmeye başladınız. Oldu ki X'i restart etmeniz gerekti, screen konsolu içerisinde iseniz ctrl+a+d ile çıkıp ttyX'lerden birinde bu konsolu geri çağırabilir hatta hiç çağırmayabilirsiniz bile. Başka bir uygulama konusu da, geliştirdiğiniz bash programlarında, diğer programları kullanırken bash'de screen ile açtırdığınız konsolları yönterek onların içindeki çıktıları kullanabilir, kullanıcıya bunu yansıtmadan işlem yaptırabilirsiniz. En güzel uygulamalarından biri de, ssh ile tatildeyken bağlandığınız masaüstü bilgisayarınıza zibilyon görevi verdikten sonra detach edip acil çıkış bile yapabilmenizdir.

Screen programını kullanabilmek için screen paketi kurulu olması gerekmektedir. Bunun kurulması size kalmış artık :)

Basit olarak bir konsolda screen komutunu verdiğimizde karşımızda temiz yeni bir bash gelecektir. Burada istediğimiz her türlü maymunluğu yapabiliriz.

İstediğiniz an **CTRL + A + D** tuş kombinasyonu ile rahatlıkla dışarıdaki konsola düşebilir, açmış olduğunuz screen konsolunu askıya almış olursunuz. Eğer askıda tek konsol var ise **screen -r** parametresi ile doğrudan dönüş yapabilirsiniz. Eğer birden fazla askıda konsol mevcut ise aynı komut size bir liste verecektir. Bu listedeki id'leri **screen -r** şeklinde uygularsak o konsola düşeriz. Konsoldaki oturum sona erdiğinde askıdan alınıp screen konsolu öldürülecektir.

Ayrıca -x parametresi ile daha önce açık olan oturumu birden fazla konsolda açabilirsiniz. Böylece screen oturumunuz, açılan her konsolda yeni bir girdi mekanizmasına sahip olmuş olacaktır.

Basit bir uygulama ile;

_Linux konusunda deneyimsiz birisi konsolda yapılması gereken bir işte tıkanmıştır, size ssh girişlerini verir, arkadaşın bilgisayarına girer ve bir screen oturumu açarsınız. Arkadaşınıza da bir konsol açıp screen -x komutu vermesini istersiniz. Evreka, sizin oturumunuz onun konsolunda da açılır. Her iki taraftanda bilgi girişi yapılabilir. Konuşamk (chat) için bile bu yöntemi kullanabilirsiniz :)_

Küçük bir uygulama ile kolaylıkla programı öğrenebilirsiniz. Screen komutunun man sayfasında veya help sayfasında ilgili ayrıntıları bulabilirsiniz.

**Not:** Bu döküman 2 Ocak 2008 tarihinde yeniden düzenlenmiştir.