---
layout: post
title:  کنترل دسترسی به اینترنت با فیلتر کردن مک آدرس
name:  کنترل دسترسی به اینترنت با فیلتر کردن مک آدرس
date: 2017-09-24
---
وقتی رمز عبور (password) پیچیده‌ای برای روتر (router) خود انتخاب کردید، معمولاً خیالتان راحت است که کسی بدون اجازه از اینترنت Wi-Fi شما استفاده نخواهد کرد. 
به‌منظور جلوگیری از نفوذ، توصیه می‌شود رمز عبور پیچیده‌ای شامل حروف و رقم انتخاب کنید؛ به‌طوری که حدس زدن آن دشوار باشد. به‌علاوه، توصیه می‌شود در تنظیمات رمز وایرلس روتر، از پروتکل WPA و الگوریتم AES استفاده کنید.

اما به چند دلیل ممکن است رمز عبور کافی نباشد:
* ضعف‌های امنیتی روتر (router) و نفوذپذیری
* ضعف بعضی از الگوریتم‌های رمزنگاری
* در دسترس بودن ابزارهای حمله‌ی brute force  و آسانی استفاده از آن‌ها

بنابراین حتی در صورت انتخاب رمزی پیچیده، امکان این‌که کسی بتواند از بیرون از خانه به شبکه‌ی اینترنت خانگی شما متصل شود وجود دارد. در این صورت، فرد نفوذگر علاوه بر این‌که می‌تواند حجم یا ترافیک اینترنت شما را استفاده کند، ممکن است بتواند بخشی از داده‌های رد و بدل شده از طریق دستگاه‌های شما را ببیند. به بیانی دیگر، می‌تواند ببیند به کدام سایت‌ها سر زده‌اید.
علاوه بر رمز عبور، یک راه دیگر برای جلوگیری از اتصال دستگاه‌های غیرمجاز به روتر، محدود کردن دسترسی آن‌ها با فیلتر کردن مک آدرس است.

## فیلتر کردن مک آدرس
مک آدرس (MAC Address) شناسه‌ی انحصاری کارت شبکه‌ی دستگاه است. هر دستگاهی که به شبکه متصل می‌شود، شناسه‌ی مخصوص به خود را دارد. بنابراین اگر بخواهید دسترسی دستگاهی که از طریق روتر (router) به اینترنت وصل می‌شوند را محدود کنید، می‌توانید مک آدرس آن‌ها را فیلتر کنید. برای این کار دو رویکرد وجود دارد که بسته به نوع روتر متفاوت است:
1. لیست سفید بسازید و دستگاه‌های مجاز را به آن بیافزایید. دستگاه‌های دیگر، امکان اتصال نخواهند داشت.
1. لیست سیاه بسازید و دستگاه مشکوکی که روی شبکه‌ی شما قرار داشته را به آن بیافزایید. 

با فرض این‌که تصمیم به ساختن لیست سفید دارید، در اولین مرحله لازم است مک آدرس دستگاه‌های مجاز (گوشی موبایل، لپ‌تاپ و غیره) را پیدا کنید. این آدرس ۱۲ کاراکتر (عدد یا حرف) دارد و به‌شکل AA:AA:AA:AA:AA:AA است.

برای پیدا کردن این آدرس در گوشی‌های اندروید جدید، این مسیر را دنبال کنید:

![post-mac-address-screenshot-android-new]({{ "/assets/img/content/post-mac-address-screenshot-android-new.png" | prepend: site.baseurl }})

در گوشی‌های اندروید قدیمی‌تر هم این مسیر:

![post-mac-address-screenshot-android-old]({{ "/assets/img/content/post-mac-address-screenshot-android-old.png" | prepend: site.baseurl }})


در آیفون:

![post-mac-address-screenshot-ios]({{ "/assets/img/content/post-mac-address-screenshot-ios.png" | prepend: site.baseurl }})

در ویندوز ابتدا پنجره‌ی Run را با فشردن دکمه‌ی ویندوز + R باز کنید. سپس cmd را نوشته و enter را بزنید:

![post-mac-address-screenshot-win-run]({{ "/assets/img/content/post-mac-address-screenshot-win-run.png" | prepend: site.baseurl }})

در خط فرمان، عبارت getmac را نوشته و enter بزنید:

![post-mac-address-screenshot-win-cmd]({{ "/assets/img/content/post-mac-address-screenshot-win-cmd.png" | prepend: site.baseurl }})

مک آدرس موردی که Media disconnected نیست (به شبکه متصل است) را یادداشت کنید.

سپس با وارد کردن آیپی 192.168.1.1 در مرورگر، وارد تنظیمات روتر شوید. بسته به نوع روتر، تنظیمات MAC filtering ممکن است متفاوت باشد. در روترهای D-Link این تنظیمات معمولاً در این بخش قرار دارد:

![post-mac-address-screenshot-router-mac-fllter]({{ "/assets/img/content/post-mac-address-screenshot-router-mac-fllter.png" | prepend: site.baseurl }})

سپس مک آدرس را مطابق تصویر وارد کرده و apply کنید.

![post-mac-address-screenshot-router-add-mac]({{ "/assets/img/content/post-mac-address-screenshot-router-add-mac.png" | prepend: site.baseurl }})

ازین پس، تنها مک آدرس‌های وارد شده (دستگاه‌هایی که شما مجاز دانستید) قادر خواهند بود به روتر متصل شده و از اینترنت استفاده کنند.