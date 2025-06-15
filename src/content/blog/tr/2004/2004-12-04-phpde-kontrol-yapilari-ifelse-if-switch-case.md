---
title: "PHP'de kontrol yapıları (if,else if,switch/case)"
slug: phpde-kontrol-yapilari-ifelse-if-switch-case
date: 2004-12-04
description: "PHP'de program akışını yönetmek için kullanılan `if`, `else`, `elseif` ve `switch/case` gibi temel kontrol yapılarının nasıl çalıştığını ve kullanıldığını anlatan bir rehber. Koşullu ifadelerle dinamik betikler oluşturmayı öğrenin."
url: http://mfyz.com/tr/phpde-kontrol-yapilari-ifelse-if-switch-case/
tags: ["else", "elseif", "if", "kontrol yapıları", "PHP", "switch", "switch case", "programlama", "web geliştirme", "koşullu ifadeler", "algoritma"]
category: PHP
migration: {"wpId":69,"wpPostDate":"2004-12-04T05:43:23.000Z"}
lang: tr
---

#### Kontrol Yapıları

Kontrol yapıları programların neredeyse her 5 kodundan birinde vardır. Çünkü kontroller şartlar değiştiğinde sonuçları değiştiren yapılardır. Eğer böyle bişey olmasa idi program diye birşey olmaz statik yapılar olurdu. Kontrol yapıları çok çeşitlidir. Ancak sık kullanılan 2-3 tanesini ele alacağım.

#### if Kontrolü

Basit bir yapıdır. Basitçe kullanımı:

```php
if ( koşullar ) {
  print 'koşul sağlandı';
}

```

şeklindedir. Koşullar gerçeklendiği sürece işlemler yapılacaktır.

#### if else Kontrolü

if kontrolüne koşulun olmadığı zaman da görev verilenidir.

```php
if ( koşullar ) {
  print 'koşul sağlanıyor';
}
else {
  print 'koşul sağlanmıyor';
}

```

#### if else if kontrolü

Bir if else kontrolünde else yani ilk koşulun sağlanmaması halindeki duruma bir if eklenirse yani üsttekilerin sağlanmaması ve burada tanımlanan koşulun sağlanması halidir.

```php
if ( ilk koşullar ) {
  // ilk koşular sağlanıyorsa yapılacaklar
  print 'bir';
}
else if ( ikinci koşullar ) {
  // ilk koşullar sağlanmıyor ve ikinci koşullar sağlanıyorsa yapılacaklar
  print 'iki';
}
else if ( üçüncü koşullar ) {
  print 'üç';
  // ilk ve ikinci koşullar sağlanmıyor ve üçüncü koşullar sağlanıyorsa yapılacaklar
}
else {
  // hiçbiri sağlanmıyorsa yapılacaklar
  print 'bir, iki ve üç DEĞİL!';
}

```

#### switch / case Yapısı

switch / case yapısını çok sonuçlu olayları kontrol ederken kullanırız. Mesela bir olay sonucu $deg değişkeni 3 değer alabilsin ("1x","2x","3x"). Burada if'leri kullanmaktansa switch / case yapılarını kullanmak daha kısadır.

```php
switch ( $deg ) {
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