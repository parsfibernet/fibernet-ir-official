---
permalink: /shahkar/
layout: page
title: فرم ثبت مشخصات فردی
date: 2019-01-16
isHome: false
sitemap: false
---
<div id="submitWrapper" class="hidden" >
    <h4 class="text-center">در حال ارسال اطلاعات...</h4>
    <h3 class="text-center">لطفا چند لحظه صبر کنید.</h3>
</div>
<div id="resultWrapper" class="hidden" >
    <div data-closable class="row callout alert-callout-border success">
        <strong>تبریک.</strong> مشترک عزیز اطلاعات شما جهت بروزرسانی و احراز هویت   توسط اپراتورهای ما تا ساعاتی دیگر در سامانه مخابرات ثبت خواهد شد. پس از آن و در صورت صحیح بودن اطلاعات، امکان خريد ترافيک و تمديد سرويس از فایبرنت در دسترس شما خواهد بود.
        از صبوری و همراهی شما سپاسگزاریم.
    </div>
    <h3><a class="button" href="/">« بازگشت به صفحه اصلی</a></h3>
</div>
<div id="formWrapper">
<h3>قابل توجه مشترکين محترم اینترنت مخابرات</h3>
<p> از آنجایی که سامانه مخابرات به سامانه شاهکار (سازمان ثبت احوال) متصل شده است ،لذا مشترکینی که اطلاعات شناسنامه‌ای آن‌ها در سامانه کامل نیست، در خريد ترافيک و تمديد سرويس دچار مشکل می‌شوند.
به همین دلیل اطلاعات زیر جهت احراز هویت شما در سامانه مخابرات دریافت می‌شود.</p>
<p>لطفاً مشخصات فردی خود را در فرم زیر <strong  >دقیقا</strong>ً مطابق با مدارک هویتی (کارت ملی , شناسنامه) تکمیل نمایید. توجه فرمایید که لازم است مشترک در قید حیات باشد.</p>
<form id="shahkar" data-abide novalidate >
<div data-abide-error class="row callout alert-callout-border alert" style="display: none;">
        <strong>توجه</strong> - امکان ثبت اطلاعات وجود ندارد. لطفا به خطاهای ذکر شده توجه کنید.
</div>
<div class="row">
    <div class="small-12 medium-3 columns">
        <label>نام
            <input name="firstName" type="text" aria-describedby="firstNameHint" aria-errormessage="firstNameError" required pattern="farsiAlpha" >
            <span class="form-error" id="firstNameError" >
                نام را با حروف فارسی وارد کنید.
            </span>
        </label>
        <p class="help-text">کاملا مطابق با اسناد هویتی و بدون کم و کاست</p>
    </div>
    <div class="small-12 medium-3 columns">
        <label>نام خانوادگی
            <input name="lastName" type="text" aria-describedby="lastNameHint" aria-errormessage="lastNameError" required pattern="farsiAlpha" >
            <span class="form-error" id="lastNameError">
                نام خانوادگی را با حروف فارسی وارد کنید.
            </span>
        </label>
        <p class="help-text">کاملا مطابق با اسناد هویتی و بدون کم و کاست</p>
    </div>
    <div class="small-12 medium-3 columns">
        <fieldset>
            <legend>جنسیت</legend>
            <input type="radio" name="gender" value="m" id="male" required><label for="male">مرد</label>
            <input type="radio" name="gender" value="f" id="female"><label for="female">زن</label>
            <span class="form-error" id="nameError">
                مشخص کردن جنسیت الزامی است.
            </span>
        </fieldset>
    </div>
    <div class="small-12 medium-3 columns">
        <label>نام پدر
            <input name="fatherName" type="text" aria-describedby="fatherNameHint" aria-errormessage="fatherNameError" required pattern="farsiAlpha" >
            <span class="form-error" id="fatherNameError">
                نام پدر را با حروف فارسی وارد کنید.
            </span>
        </label>
        <p class="help-text">کاملا مطابق با اسناد هویتی و بدون کم و کاست</p>
    </div>
    <div class="small-12 medium-3 columns">
        <label>ملیت
            <select id="nationality" name="nationality" aria-describedby="nationalityHint" aria-errormessage="nationalityError" required >
                <option></option>
                <option value="ایران">ایران</option>
                <option value="غیر ایران">غیر ایران</option>
            </select>
            <span class="form-error" id="nationalityError">
                مشخص کردن ملیت الزامی است.
            </span>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>کدملی
            <input name="nationalCode" type="text" aria-describedby="nationalCodeHint" aria-errormessage="nationalCodeError" required pattern="tenDigits" >
            <span class="form-error" id="nationalCodeError">
                کد ملی باید با اعداد انگلیسی و ۱۰ رقم وارد شود.
            </span>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>شماره شناسنامه
            <input name="idNumber" type="text" aria-describedby="idNumberHint" aria-errormessage="idNumberError" required pattern="number" >
            <span class="form-error" id="idNumberError">
                شماره شناسنامه باید با اعداد انگلیسی و نهایتا ۱۰ رقم باشد.
            </span>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>زادروز
            <input name="dateOfBirth" type="text" aria-describedby="dateOfBirthHint" aria-errormessage="dateOfBirthError" required pattern="jalaliDate" placeholder="1360-01-01" >
            <span class="form-error" id="dateOfBirthError">
                زادروز را با ارقام انگلیسی و با فرمت ۰۱-۰۱-۱۳۶۰ وارد کنید.
            </span>
        <p class="help-text" id="passwordHelpText">لازم است مشترک دارای سن ۱۸ سال  به بالا باشد.</p>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>شماره همراه
            <input name="mobile" type="text" placeholder="برای مثال : 09112223344" aria-describedby="mobileHint" aria-errormessage="mobileError" required pattern="mobileNumber" >
            <span class="form-error" id="mobileError">
                شماره همراه را با ارقام انگلیسی و با فرمت صحیح وارد کنید.
            </span>
        </label>
        <p class="help-text" id="passwordHelpText">پيام هاي اطلاع رساني سازمان به اين موبايل ارسال خواهد شد</p>
    </div>
    <div class="small-12 medium-3 columns">
        <label>نشانی ایمیل
            <input name="email" type="text" placeholder="برای مثال : name@example.com" aria-describedby="emailHint" aria-errormessage="emailError" pattern="email" >
            <span class="form-error" id="emailError">
                ایمیل معتبر وارد کنید.
            </span>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>مدرک تحصیلی
            <select id="education" name="education" >
                <option></option>
                <option value="زیر دیپلم">زیر دیپلم</option>
                <option value="دیپلم">دیپلم</option>
                <option value="کاردانی">کاردانی</option>
                <option value="کارشناسی">کارشناسی</option>
                <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                <option value="دکتری">دکتری</option>
            </select>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>نام مالک خط
            <input name="landlineOwner" type="text" aria-describedby="landlineOwnerHint" aria-errormessage="landlineOwnerError" pattern="farsiAlphaMinFive" >
            <span class="form-error" id="landlineOwnerError">
                نام و نام خانوادگی مالک خط را با حروف فارسی و حداقل در ۵ کاراکتر وارد کنید.
            </span>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>کد پستی
            <input name="postalCode" type="text" aria-describedby="postalCodeHint" aria-errormessage="postalCodeError" pattern="tenDigits" >
            <span class="form-error" id="postalCodeError">
                 کد پستی را با ارقام انگلیسی و در ۱۰ رقم وارد کنید.
            </span>
        </label>
    </div>
    <div class="small-12 medium-6 columns">
        <label>نشانی منزل
            <input name="address" type="text" aria-describedby="addressHint" aria-errormessage="addressError" minlength="10" pattern="any3-10" >
            <span class="form-error" id="addressError">
                 نشانی منزل باید حداقل ۱۰ و حداکثر ۱۰۰ کاراکتر باشد.
            </span>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <label>شماره خط اینترنت
            <input name="adslNumber" placeholder="برای مثال : 1122233344" type="text" aria-describedby="adslNumberHint" aria-errormessage="adslNumberError" required pattern="adslNumber" >
            <span class="form-error" id="adslNumberError">
                شماره خط اینترنت را با ارقام انگلیسی و با پیش شماره استان بدون صفر وارد کنید.
            </span>
        </label>
    </div>
    <div class="small-12 medium-3 columns">
        <button class="success button" value="Submit">ارسال</button>
    </div>
</div>
</form>
</div>