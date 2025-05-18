---
title: "PHP'de kontrol yapıları (if,else if,switch/case)"
slug: phpde-kontrol-yapilari-ifelse-if-switch-case
date: 2004-12-04
url: http://mfyz.com/tr/phpde-kontrol-yapilari-ifelse-if-switch-case/
tags: ["else","elseif","if","kontrol yapıları","PHP","switch","switch case"]
category: PHP
migration: {"wpId":69,"wpPostDate":"2004-12-04T05:43:23.000Z"}
lang: tr
---

#### Kontrol Yapıları

Kontrol yapıları programların neredeyse her 5 kodundan birinde vardır. Çünkü kontroller şartlar değiştiğinde sonuçları değiştiren yapılardır. Eğer böyle bişey olmasa idi program diye birşey olmaz statik yapılar olurdu. Kontrol yapıları çok çeşitlidir. Ancak sık kullanılan 2-3 tanesini ele alacağım.

#### if Kontrolü

Basit bir yapıdır. Basitçe kullanımı:

```
if( koşullar ){
  print 'koşul sağlandı';
}

```

şeklindedir. Koşullar gerçeklendiği sürece işlemler yapılacaktır.

#### if else Kontrolü

if kontrolüne koşulun olmadığı zaman da görev verilenidir.

```
if( koşullar ){
  print 'koşul sağlanıyor';
}
else{
  print 'koşul sağlanmıyor';
}

```

#### if else if kontrolü

Bir if else kontrolünde else yani ilk koşulun sağlanmaması halindeki duruma bir if eklenirse yani üsttekilerin sağlanmaması ve burada tanımlanan koşulun sağlanması halidir.

```
if( ilk koşullar ){
  // ilk koşular sağlanıyorsa yapılacaklar
  print 'bir';
}
else if( ikinci koşullar ){
  // ilk koşullar sağlanmıyor ve ikinci koşullar sağlanıyorsa yapılacaklar
  print 'iki';
}
else if( üçüncü koşullar ){
  print 'üç';
  // ilk ve ikinci koşullar sağlanmıyor ve üçüncü koşullar sağlanıyorsa yapılacaklar
}
else{
  // hiçbiri sağlanmıyorsa yapılacaklar
  print 'bir, iki ve üç DEĞİL!';
}

```

#### switch / case Yapısı

switch / case yapısını çok sonuçlu olayları kontrol ederken kullanırız. Mesela bir olay sonucu $deg değişkeni 3 değer alabilsin ("1x","2x","3x"). Burada if'leri kullanmaktansa switch / case yapılarını kullanmak daha kısadır.

```
switch($deg){
  case '1x': 
    print "deg'in içi 1x"; 
    break;
  case '2x': 
    print "deg'in içi 2x";
    break;
  case '3x': 
    print "deg'in içi 3x";
    break;
  default: 
    print "deg'in içi 1x,2x,3x değil";
}

```

Kontrol yapıları aslında programlamada en sık kullanılan yapılardır. Farkında olmadan çok kez bu yapıları defalarca defalarca yazarız. Kullanımlarını, esnekliklerini iyi bilmek gerektiğini düşünüyorum.