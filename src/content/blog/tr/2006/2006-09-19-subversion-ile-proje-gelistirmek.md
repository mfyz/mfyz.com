---
title: "Subversion (SVN) ile Proje Geliştirmek ve Sürüm Kontrolü"
slug: subversion-ile-proje-gelistirmek
date: 2006-09-19
description: "Subversion (SVN) nedir, neden kullanılır ve proje geliştirmede nasıl faydalar sağlar? SVN kurulumu, temel komutları (depo oluşturma, proje ekleme, checkout) ve sürüm kontrol sistemi olarak kullanımı."
url: http://mfyz.com/tr/subversion-ile-proje-gelistirmek/
tags: ["Subversion", "SVN", "versiyon kontrol", "sürüm yönetimi", "proje yönetimi", "yazılım geliştirme", "svnadmin", "svn import", "svn checkout", "Linux"]
category: OS
migration: {"wpId":96,"wpPostDate":"2006-09-19T20:52:36.000Z"}
lang: tr
---

#### Subversion nedir?

Subversion, adından da anlayabileceğiniz gibi sürüm yönetim sistemidir. Dosyaları ortak bir depoda tutup sürüm yönetimi sağlar. Subversion'u (genel kısaltması “SVN”) ile proje geliştirirken projenizin sürümlendirilmesini, global bir geliştirme ortamı sunmak amacı ile kullanırız.

#### Neden Subversion kullanayım?

Subversion'un proje geliştirirken birçok artısı var. Öncelikle her dosyanızın sürümlerini takip edebiliyorsunuz. En güzeli de subversion size o kadar güzel bir inceleme ortamı sunuyor ki, subversion ile eski sürüm dosyalarınızı, yeni sürümlerde neler değişmiş birebir görebiliyorsunuz. Diff görüntüleyici programlar kullanarak (ki çoğu GUI bazlı subversion clientlarında diff görüntüleyici vardır) son sürümde hangi satırlar eklenmiş hangileri değişmiş. hangi satırlar silinmiş kolaylıkla görebilirsiniz. Bir diğer güzelliği de editör bazlı görebilmektir. Yani subversion'a atadığınız kullanıcılar veya sisteme ait kullanıcıların subversion'u kullanması iznini vererek. Bu sürümlerdeki değişimlerin kimler tarafında yapıldığını görebilmektir. Mesela bir düzenleme yapıldı ve ya hatalar oluştu ya da kodlar kayboldu, ya da gerçekten güzel bir düzenleme yapıldı, bunu kimin tarafından yapıldığını görebilirsiniz.

Ayrıca kendi dosya transfer protokolü sayesinde herhangi bir ftp gibi bir sunucu kurmanıza gerek kalmayacaktır.

#### SVN kurulumu

http://subversion.tigris.org/ adresinden işletim sisteminize uygun paketi inidirip kurabilirsiniz.

Debian ve debian tabanlı (mesela ubuntu) sistemlerde kolayca;
```sh
apt-get install subversion
```
komutu ile kurabilirsiniz.

Ben ubuntu'da;
```sh
apt-get install subversion subversion-helper-scripts subversion-tools
```
komutu ile subversion ve subversion araçlarını kolayca kuruyoruz.

#### SVN kullanımı/komutları

###### Depo oluşturmak

Yeni bir SVN deposu oluşturmak için svnadmin komutunu kullanırız.
```sh
svnadmin create /home/deneme/
```
Bu komut ile /home/deneme klasörümüzü svn repo'su olarak ayarlayabiliriz. Bu komutu uyguladıktan sonra aşağıdaki ağaç yapısına benzer bir dosya/dizin yapısı oluşacaktır.
```sh
/home/deneme/
|-- README.txt
|-- conf
| |-- authz
| |-- passwd
| \`-- svnserve.conf
|-- dav
|-- db
| |-- current
| |-- format
| |-- fs-type
| |-- revprops
| | \`-- 0
| |-- revs
| | \`-- 0
| |-- transactions
| |-- uuid
| \`-- write-lock
|-- format
|-- hooks
| |-- post-commit.tmpl
| |-- post-lock.tmpl
| |-- post-revprop-change.tmpl
| |-- post-unlock.tmpl
| |-- pre-commit.tmpl
| |-- pre-lock.tmpl
| |-- pre-revprop-change.tmpl
| |-- pre-unlock.tmpl
| \`-- start-commit.tmpl
\`-- locks
|-- db-logs.lock
\`-- db.lock

8 directories, 23 files

```
Eğer komut hatasız işletilmiş ve bu dosya/dizinler oluşmuşsa svn repomuz oluşmuştur. Buradaki dosya ve dizinlere dokunmamanızı öneririm. Şimdi Herhangi bir dille yazdığımız projemizi bu depoya ekleyelim. Varolan projemizin **/tmp/projem** dizininin altında olduğunu varsayarsak;
```sh
mfyz@tux:~$ cd /tmp/projem/
mfyz@tux:/tmp/projem$ mkdir trunk branches tags

```
proje dizinimizde “trunk”, “branches”, “tags” adlı 3 dizin oluşturuyoruz. Şimdi proje ana (root) dizinimizi trunk dizininin içine taşıyoruz. Projeniz trunk dizini içerisinde yer almalı.

###### Depoya yeni bir proje eklemek

Dizin/dosyalarımızı yukarıdaki gibi düzenledikten sonra;
```sh
mfyz@tux:/tmp/projem$ svn import /tmp/projem file:///home/deneme/ -m "Proje Adı"
Adding /tmp/projem/trunk
Adding /tmp/projem/trunk/dizinim
Adding /tmp/projem/trunk/dizinim/veri.txt
Adding /tmp/projem/trunk/dizinim/indeks.txt
Adding /tmp/projem/trunk/deneme.php
Adding /tmp/projem/trunk/info.txt
Adding /tmp/projem/trunk/index.php
Adding /tmp/projem/branches
Adding /tmp/projem/tags

Committed revision 1.

```
yani;
```sh
svn import /tmp/projem file:///home/deneme/ -m "Proje Adı"
```
komutu ile projemizi depomuza ekliyoruz.

Bu işlem sonucunda artık SVN üzerinden çalışabiliriz. Bu komut /tmp/projem dizinini çalışma dizini haline getirmez!

Bu noktadan itibaren geliştirici grubu svn üzerinden sürüm yönetimi ile çalışabilecektir.

###### SVN'deki bir proje ile çalışmak (geliştirici komutları)

SVN'de yayında olan bir proje ile çalışmanız için öncelikle o projenin son sürüm kopyasını bilgisayarınıza çekmeniz gerekir.
```sh
svn checkout file:///home/deneme/trunk proje_calisma_dizinim

```
komutu ile snv projemizi bulunduğumuz dizinde "proje_calisma_dizinim" adlı dizine (yoksa oluşturulacaktır) kopyalamış oluyoruz. Bu komutun çıktısını şuna benzeyecektir :
```sh
mfyz@tux:~$ svn checkout file:///home/deneme/trunk proje_calisma_dizinim
A proje_calisma_dizinim/deneme.php
A proje_calisma_dizinim/dizinim
A proje_calisma_dizinim/dizinim/veri.txt
A proje_calisma_dizinim/dizinim/indeks.txt
A proje_calisma_dizinim/info.txt
A proje_calisma_dizinim/index.php
Checked out revision 1.

```
Şimdi bilgisayarımızdaki proje_calisma_dizinim içerisinde olan projemizde istediğimiz değişikliği yapabiliriz. Yaptıktan sonra yeni sürüm dosyalarımızı sunucuya yüklemek için;
```sh
mfyz@tux:~/proje_calisma_dizinim$ svn commit --message "hatalar düzeltildi"
Sending index.php
Sending info.txt
Transmitting file data ..
Committed revision 2.

```
yani;
```sh
svn commit --message "hatalar düzeltildi"
```
komutu bize düzenlediğimiz dosyaları otomatik olarak sunucuya yükleyecek ve yeni sürümlere yükseltecektir. Burada sadece değişen dosyalar yüklenecektir. SVN bunu otomatik olarak tespit edip yapacaktır. --message ile yeni sürüme ait notları belirtiriz.

Siz projeyi geliştirirken başka bir geliştirici kod ile oynamış olabilir onun için çalışmaya başlamadan
```sh
snv update
```
komutu ile projeyi son sürüme güncellemiş oluruz. Unutmayın, svn oturum tutarak çalışır. Yani checkout ile bir svn deposuna bağlanmamışsanız update, commit gibi komutlar bir işe yaramayacaktır. Bu komutlar son bağlantı kurduğunuz SVN deposunda çalışacaktır.

Projeye dosya ekleme, çıkarma, kopyalama ve taşıma işlemlerini;
```sh
svn add dosya.txt
svn delete dosya.txt
svn copy orjinal_dosya.txt kopya.txt
svn move eski_dosya.txt yeni_dosya.txt

```
komutları ile yapabilirsiniz.

Projedeki değişimleri izlemek için;
```sh
svn log

```
komutu ile değişiklik listesini alabilirsiniz.

Subversion, commit işlemi yaparken transferin daha güvenli olması için işlemleri bir günlük (log) dosyasına atar. Sunucuya yükleme işlemi yapıldıktan sonra bu günlük dosyasındaki değişimler uygulanır ve commit işlemi sona erer. Eğer commit işlemi olurken bir aksaklık olursa (bağlantı kopması, elektirik kesilmesi gibi) bu günlük dosyası silinmez ve kalır. Bu günlükteki işlemleri tamamlatmak için;
```sh
svn cleanup

```
komutu uygulanır.

Eğer süreçlerden birisi kitli kalmışsa;
```sh
svn status

```
çıktısında "L" olarak görünen dosyalar kitli kalmıştır, bu da svn cleanup komutu ile çözülür.


**Kaynaklar :** [Belgeler.org SVN kullanım dökümanı](http://www.belgeler.org/howto/svn-nasil.html)