---
title: "Subversion sunucu yayını yapmak ve sunucu erişimi"
slug: subversion-sunucu-yayini-yapmak-ve-sunucu-erisimi
date: 2006-09-20
url: http://mfyz.com/tr/subversion-sunucu-yayini-yapmak-ve-sunucu-erisimi/
tags: ["OS","subversion","sunucu","svn"]
category: OS
migration: {"wpId":97,"wpPostDate":"2006-09-20T21:05:49.000Z"}
lang: tr
---

Bu dökümanda sunucumuza svn kurup yayına açmak ve geliştirici grubumuzun erişimine açmayı göstereceğim. (SVN kullanımı ile ilgili bilgiyi [https://tr.mfyz.com/subversion-ile-proje-gelistirmek/](https://tr.mfyz.com/subversion-ile-proje-gelistirmek/) dökümanından edinebilirsiniz)

#### SNV yayını yapmak (snvserve)

SVN'i dışarı açmak için subversion-tools paketindeki "svnserve" mini server'ini kullanacağız. Öncelikle istediğiniz portu firewall'ınızdan forward edin. Ben 1234 nolu portu bunun için kullanacağım örnek olarak. Eğer parametre vermeden (yani özellikle istediğiniz porttan yayın yapmaya çalışmazsanız) svnserve varsayılan olarak **3690** portundan yayın yapacaktır. svnserve ile istediğimiz porttan yayın açmak için :
```
svnserve -d --listen-port 1234

```
komutunu verin, -d parametresi ile deamon olarak çalışmaya başlayacaktır. Yani siz logout olsanız bile çalışacaktır. --listen-port parametresi ise anlayacağınız gibi port belirtmek için kullanılır. Eğer belirlemezsek bahsettiğim gibi 3690 portundan çıkacaktır yayın. Sunucunuzun init scriptlerine başlangıçta çalışması için svnserve'i eklemenizi öneririm. Unutmayın svnserve'i init'de çalıştırıyorsanız -d parametresi yerine -i parametresi vererek kullanın. -i init modudur.

#### SVN yayını yapan sunucuya erişim

SVN ile sunucuya erişmenin 2 farklı yolu var, ilki bir giriş denetim dosyası oluşturmaktır. Apache, Ssh veya \*NIX sistemlerin giriş denetim mekanizmasını az çok bilenler, bir şifre dosyasının varlığından haberdarlırlar. Zaten hepsi birbirine benzer, burada da aynı mantık ile bir şifre dosyası oluşturuyorsunuz. \*NIX crypt ile şifrelenmiş "kullanıcı:parola" satırlarından oluşan dosyadaki kullanıcılar giriş yapabilirler. Daha detaylı bilgiyi SVNBOOK'tan edinebilirsiniz (SVNBOOK'u bilgisayarınıza indirmek için [http://www.mfyz.com/Files/Dokumanlar/svn-book-html.tar.bz2](http://www.mfyz.com/Files/Dokumanlar/svn-book-html.tar.bz2) tıklayın). Ben pratik olmadığından geçiyorum. Size önereceğim ve benim de kullandığım tekniği, yani ssh üzerinden giriş denetimi yaptırarak erişimi sağlamaktır. SSH, sistemde varolan gerçek kullanıcıları baz alarak denetim yaptığından ssh ile svn erişimi yaptırmak aynı zamanda bize sistemde (yani sunucuda) varolan GERÇEK kullanıcıların kendi giriş bilgileri ile erişmesini sağlar. Zaten proje geliştirmek için kullanılacak bir sunucuda ssh, ftp, http, gibi servisler çalıştığından ssh'ı yüklemek veya aktif olarak çalıştırmak çok da ters birşey değildir. Eğer güvenlik konusunda ssh izni vermiyorsanız ssh portunuzu kapatıp ssh servisini svn erişimi için kullanabilirsiniz. SVN kullanım komutlarımızı aynen burada da kullanacağız. Tek fark proje adreslemesi olacaktır.
```
svn checkout file:///home/deneme/calisma\_dizini

```
şeklinde bağlantı kurmak yerine;
```
svn checkout svn+ssh://127.0.0.1/home/deneme/proje\_calisma\_dizinim/
mfyz@127.0.0.1's password:

```
şeklinde kullanıyoruz. Burada localhost'a göre gösterdim fakat işe yarayacaktır. Sunucunuzun ip'sini girerek sunucu ile bağlantı kurabilirsiniz. Burada sizin local'deki kullanıcı adınızla giriş yapılmaya çalışılacaktır. Eğer sunucudaki kullanıcı adınız farklı ise;
```
svn checkout svn+ssh://mfyz@127.0.0.1/home/deneme/proje\_calisma\_dizinim/

```
şeklinde kullanıcı belirterek giriş yapabilirsiniz. Eğer 2-3 kez şifre istenmesi ile karşılaşırsanız şaşırmayın benden 3 kez şifre istiyor, bazen 2 kez fln istediği de olabiliyor, ilginç :) Bu noktadan itibaren zaten svn kullanımı için kullandığımız komutları uygulayarak projemizi svn üstünden geliştirebiliriz. SVN kullanımı ile ilgili bilgiyi [https://tr.mfyz.com/subversion-ile-proje-gelistirmek/](https://tr.mfyz.com/subversion-ile-proje-gelistirmek/) dökümanından edinebilirsiniz. SVN hakkında çok geniş bilgi edinmek için Dosyalar bölümündeki dökümanlar klasöründeki [http://www.mfyz.com/Files/Dokumanlar/svn-book-html.tar.bz2](http://www.mfyz.com/Files/Dokumanlar/svn-book-html.tar.bz2) dosyasını indirerek edinebilirsiniz. (SVNBOOK, İngilizce)