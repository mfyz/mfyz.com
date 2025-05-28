---
title: "Örneklerle php'de düzenli ifadeler"
slug: orneklerle-phpde-duzenli-ifadeler
date: 2006-01-26
url: http://mfyz.com/tr/orneklerle-phpde-duzenli-ifadeler/
tags: ["düzenli ifadeler","PHP","regex","regular expressions"]
category: PHP
migration: {"wpId":84,"wpPostDate":"2006-01-26T05:36:58.000Z"}
lang: tr
---

Bu dökümanda php'deki regular expressions yani düzenli ifadeler hakkında örnek, cevap şeklinde uygulama üzerine bilgiler edineceksiniz. İşte php'nin eregi komutu ile sorulan RegEx cümleciklerine verdiği cevaplar;

## 1\. `^` Metin başlangıcı

```php
eregi("^o","okul");  // DOGRU 
eregi("^o","kul");   // YANLIS

```

## 2\. `$` Metinin sonu

```php
eregi("ul$","okul");  // DOGRU 
eregi("ul$","oku");   // YANLIS

```

## 3\. `.` Herhangi bir karakter

```php
eregi("^o.ul$","okul");   // DOGRU 
eregi("^.kul$","okul");   // DOGRU 
eregi("^.kul$","9kul");   // DOGRU 
eregi("^oku.$","okul");   // DOGRU 
eregi("^oku.$","okuz");   // DOGRU 
eregi("^oku.$","okuzu");  // YANLIS

```

## 4\. `k*` k'dan sıfır veya daha fazla

```php
// k'dan 1 tane 
eregi("k*","okul");      // DOGRU 
eregi("^ok*ul","okul");  // DOGRU 

// k'dan 0 tane 
eregi("k*","oul");        // DOGRU 
eregi("^okk*ul","okul");  // DOGRU 
eregi("^ok*ul","oul");    // DOGRU 

// k'dan 2 tane 
eregi("k*","okkul");        // DOGRU 
eregi("k*","koku");         // DOGRU 
eregi("^ok*ul","okkul");    // DOGRU 
eregi("^okk*ul","okkkul");  // DOGRU 

// k'dan cok sayida 
eregi("^ok*ul","okkkul");     // DOGRU 
eregi("^okk*ul","okkkkul");   // DOGRU 
eregi("^ok*ul","okkkkkkul");  // DOGRU

```

## 5\. `k+` k'dan bir yada daha fazla

```php
// k'dan 1 tane 
eregi("k+","okul");      // DOGRU 
eregi("^ok+ul","okul");  // DOGRU 

// k'dan 0 tane 
eregi("k+","oul");        // YANLIS 
eregi("^okk+ul","okul");  // YANLIS 
eregi("^ok+ul","oul");    // YANLIS 

// k'dan 2 tane 
eregi("k+","okkul");       // DOGRU 
eregi("k+","koku");        // DOGRU 
eregi("^ok+ul","okkul");   // DOGRU 
eregi("okk+ul","okkkul");  // DOGRU 

// k'dan cok sayida 
eregi("^ok+ul","okkkul");    // DOGRU 
eregi("^okk+ul","okkkkul");  // DOGRU 
eregi("ok+ul","okkkkkkul");  // DOGRU

```

## 6\. `k?` k'dan sıfır yada daha bir tane

```php
eregi("k?","okul");         // DOGRU 
eregi("ok?ul","okul");      // DOGRU 
eregi("ok?ul","okkul");     // YANLIS 
eregi("^ok?ul","okul");     // DOGRU 
eregi("^ok?ul","oul");      // DOGRU 
eregi("^ok?ul","okkkul");   // YANLIS 
eregi("^ko?l","kol");       // DOGRU 
eregi("^ko?l","kl");        // DOGRU 
eregi("^ko?l","koool");     // YANLIS 
eregi("^ko?l","kel");       // YANLIS

```

## 7\. `ak | kara` ak ya da kara, en az biri

```php
eregi("ak|kara","kara");         // DOGRU 
eregi("^(ak|kara)","kara");      // DOGRU 
eregi("ak|kara","ankara");       // DOGRU 
eregi("^(ak|kara)","ankara");    // YANLIS 
eregi("^(ak|kara)$","ankara");   // YANLIS 
eregi("(ak|kara)$","ankara");    // DOGRU 
eregi("ak|kara","ak");           // DOGRU 
eregi("ak|kara","aek");          // YANLIS 
eregi("ak|kara","akara");        // DOGRU 
eregi("ak|kara","akara");        // DOGRU 
eregi("ak|kara","akkara");       // DOGRU 
eregi("^(ak|kara)$","akkara");   // YANLIS 

eregi("^(ak|kara)(ak|kara)$","akkara");      // DOGRU 
eregi("^(ak|kara)(ak|kara)$","akvekara");    // YANLIS 
eregi("^(ak|kara)ve(ak|kara)$","akvekara");  // DOGRU 
eregi("^(ak|kara)..(ak|kara)$","akvekara");  // DOGRU 
eregi("^(ak|kara).(ak|kara)$","akvekara");   // YANLIS 

eregi("ak|kara","ak_kara");      // DOGRU 
eregi("^(ak|kara)","akk_ara");   // DOGRU 
eregi("ak|kara","ak_k_ara");     // YANLIS

```

## 8\. `(oku)*` oku'dan sıfır yada daha fazla

```php
eregi("^(oku)*$","oku");   // DOGRU 
eregi("^(oku)*$","okul");  // YANLIS 
eregi("^(oku)","okul");    // DOGRU 

// oku 'dan en başta sıfır tane 
eregi("^(oku)","doku");  // DOGRU 
eregi("(agir)*","cikacaksinagiragirbumerdivenlerden");      // DOGRU 
eregi("(ağır)*","Ağır ağır çıkacaksın bu merdivelerden");   // DOGRU

```

## 9\. `k{a}` -> k'dan a tane `k{5}` -> k'dan 5 tane `k{2,6}` -> k'dan 2,3,4,5 yada 6 tane

```php
eregi("(agir){1}","agiragircikacaksinbumerdivenlerden");      // DOGRU 
eregi("(agir){2}","agiragircikacaksinbumerdivenlerden");      // DOGRU 
eregi("(agir){3}","agiragircikacaksinbumerdivenlerden");      // YANLIS 
eregi("(agir){0,2}","agiragircikacaksinbumerdivenlerden");    // DOGRU 
eregi("(agir){0,2}","agiragircikacaksinbumerdivenlerden");    // DOGRU 
eregi("(agir){0,3}","agiragircikacaksinbumerdivenlerden");    // DOGRU 
eregi("^(agir){0,3}","agiragircikacaksinbumerdivenlerden");   // DOGRU 
eregi("^(agir){0,3}$","agiragircikacaksinbumerdivenlerden");  // YANLIS

```
Daha önce gösterdiğimiz bazı diğer ifadelerin bu yapıya benzemesi şu şekildedir; k* = k{0,} k+ = k{1,} k? = k{0,1}

## 10\. `[a-eKLM]` -> a' dan e' ye kadar veya K veya L veya M varsa `[^a-eKLM]` -> a' dan e' ye kadar veya K veya L veya M yoksa

```php
eregi("[a-eKLM]","Kalem");       // DOGRU 
eregi("[^a-eKLM]","Kalem");      // YANLIS 
ereg("[a-eKLM]","kAlEm");        // YANLIS 
eregi("[a-eKLM]","kAlEm");       // DOGRU 
ereg("[a-eKLM]","KAlEm");        // DOGRU 
eregi("[a-eKLM]","kalem");       // DOGRU 
eregi("[a-eKLM]","kalemlik");    // DOGRU 
eregi("[^a-eKLM]","kalemlik");   // YANLIS 
eregi("[^a-eKLM]","uzun");       // DOGRU 
eregi("[a-eKLM]","uzun");        // YANLIS 
eregi("^[^a-eKLM]$","uzun");     // YANLIS 
eregi("^[^a-eKLM]+$","uzun");    // DOGRU 
eregi("^[a-eKLM]+$","uzunincebiryoldayim");             // YANLIS 
eregi("^[a-eiKLMnoruyz]+$","uzunincebiryoldayim");      // DOGRU 
eregi("^[a-eiKLMnoruyz]+$","uzun incebiryoldayim");     // YANLIS 
eregi("^[ a-eiKLMnoruyz]+$","uzun incebiryoldayim");    // DOGRU 
eregi("^[_a-eiKLMnoruyz]+$","uzun_ince_bir_yoldayim");  // DOGRU 
eregi("^[^a-eKLM]+$","uzunincebiryoldayim");            // YANLIS

```

## 11\. `[[. .]]` karakterleri

- `d -> [0-9]`
- `D -> [^0-9]`
- `t,f = s s S w -> [a-zA-Z0-9]`
- bütün harfler ve rakamlar `W -> [^a-zA-Z0-9]`

Not: Bu dökümanı hazırlayan kim idi bilmiyorum. Fi tarihinde bilgisayarıma txt olarak geçirmişim. Yazan arkadaştan çok özür diliyorum/teşekkür ediyorum, eğer farkeder ve bildirirse hemen burada adını belirtmek isterim. Zira Hiper-faydalı bir yazı/kaynak olduğunu düşündüğüm için yayınlıyorum.