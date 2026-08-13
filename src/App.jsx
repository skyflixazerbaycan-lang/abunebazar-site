import React, { useEffect, useRef, useState } from "react";
import { Shield, Clock, MessageCircle, Ticket, ChevronRight, Star, Menu, X, User, ShoppingCart, Minus, Plus, Play, Pause, VolumeX, Wallet, Ban, Send, CheckCircle2, LayoutGrid, Tv, Music2, Bot, Zap, BadgeCheck, Headset, Gamepad2, MessageSquare, Sun, Moon, Film, Book, Dumbbell, Palette, Camera, Briefcase, Copy, Gift, CreditCard, RotateCw, Tag } from "lucide-react";
import { supabase } from "./supabaseClient";

const ICON_MAP = {
  LayoutGrid, Tv, Music2, Bot, Gamepad2, Zap, Star, Shield, Headset, BadgeCheck,
  Wallet, MessageCircle, Ticket, Clock, Film, Book, Dumbbell, Palette, Camera, Briefcase,
};
const ICON_NAMES = Object.keys(ICON_MAP);

const NAV_ITEMS = [
  { key: "home", labelKey: "navHome" },
  { key: "paketler", labelKey: "navPackages" },
  { key: "reylerall", labelKey: "navReviews" },
  { key: "necehisleyir", labelKey: "navHow" },
  { key: "etibar", labelKey: "navTrust" },
  { key: "qaydalar", labelKey: "navRules" },
  { key: "elaqe", labelKey: "navContact" },
];

const ALL_PAGES = [...NAV_ITEMS.map((n) => n.key), "admin", "hesab", "sebet"];

const ADMIN_EMAIL = "skyflixazerbaycan@gmail.com";

const I18N = {
  az: {
    eyebrow: "Ən qısa müddətdə təhvil",
    megaSlogan: "QAFQAZIN ƏN BÖYÜK VƏ ƏN KEYFİYYƏTLİ, GÜVƏNİLİR DİJİTAL MAĞAZASI — SKYFLİX AZƏRBAYCAN",
    heroLine1: "Bir bilet.",
    heroLine2Pre: "Bütün ",
    heroLine2Em: "ekranlar",
    heroSub: "Netflix, Spotify, YouTube Premium və daha çoxu — orijinal qiymətin bir hissəsinə, rəsmi hesablarla, dəqiqələr içində sənin.",
    seePackages: "Paketlərə bax",
    writeWhatsapp: "WhatsApp ilə yaz",
    trustAccounts: "Zəmanətli hesablar",
    trustSupport: "7/24 dəstək",
    trustCustomers: "1200+ məmnun müştəri",
    popularKicker: "POPULYAR",
    popularTitle: "Ən çox seçilən paketlər",
    popularSub: "Tam siyahı üçün Paketlər səhifəsinə keç.",
    seeAllPackages: "Bütün paketlərə bax",
    ctaTitle: "Paketini seç, bu gün izləməyə başla",
    ctaSub: "Sifariş üçün WhatsApp vasitəsilə yaz — cavab dəqiqələr içindədir.",

    packagesKicker: "PAKETLƏR",
    packagesTitle: "Populyar abunəliklər",
    packagesSub: "Hər bilet bir hesaba giriş deməkdir — seç, ödə, izləməyə başla.",
    noProductsInCategory: "Bu kateqoriyada hələ paket yoxdur.",
    faqTitle: "Tez-tez verilən suallar",
    faqQ1: "Sifariş necə verilir?",
    faqA1: "İstədiyiniz paketi seçib \"Səbətə əlavə et\" düyməsinə basın, sonra səbətdən \"WhatsApp ilə tamamla\" ilə sifarişi göndərin.",
    faqQ2: "Ödəniş necə aparılır?",
    faqA2: "Ödəniş WhatsApp üzərindən razılaşdırılır — bank kartı və digər üsullarla ödəyə bilərsiniz.",
    faqQ3: "Hesab nə qədər müddətə çatdırılır?",
    faqA3: "Ödəniş təsdiqləndikdən sonra hesabınız ən qısa müddət ərzində təqdim olunur.",
    faqQ4: "Problem yaranarsa nə etməliyəm?",
    faqA4: "WhatsApp üzərindən bizə yazın — komandamız məsələni operativ həll edəcək.",
    addToCart: "Səbətə əlavə et",

    howKicker: "NECƏ İŞLƏYİR",
    howTitle: "Üç addımda hesabın hazırdır",
    howSub: "Sifarişdən təhvilə qədər bütün proses sadə və sürətlidir.",
    step1Title: "Seç",
    step1Text: "İstədiyin platforma və paketi seç.",
    step2Title: "Ödə",
    step2Text: "Kart və ya Kapital Bank/M10 ilə ödəniş et.",
    step3Title: "Al",
    step3Text: "Hesab detalların ən qısa müddət ərzində çatır.",

    trustKicker: "ETİBARLILIQ",
    trustTitleWhy: "Niyə SkyFlix Azerbaycan?",
    trust1Title: "Zəmanət daxildir",
    trust1Text: "Hər hesaba fəaliyyət müddəti ərzində əvəzetmə zəmanəti verilir.",
    trust2Title: "Sürətli təhvil",
    trust2Text: "Ödəniş təsdiqindən sonra hesab məlumatları ən qısa müddət ərzində çatdırılır.",
    trust3Title: "Canlı dəstək",
    trust3Text: "Sualların olarsa WhatsApp üzərindən həftənin 7 günü cavab veririk.",

    contactKicker: "ƏLAQƏ",
    contactTitle: "Sifariş üçün yaz",
    contactSub: "WhatsApp üzərindən yaz — cavab adətən bir neçə dəqiqə çəkir.",
    contactCardText: "Sifariş və dəstək üçün birbaşa yaz.",

    cartKicker: "SƏBƏT",
    cartEmptyTitle: "Səbətiniz boşdur",
    cartEmptySub: "Paketlər səhifəsindən məhsul əlavə edin.",
    cartTitle: "Səbətim",
    cartSub: "Miqdarı tənzimlə və sifarişi WhatsApp ilə tamamla.",
    cartTotal: "Cəmi",
    completeOrder: "Sifarişi WhatsApp ilə tamamla",

    accountKicker: "HESAB",
    accountKickerMine: "HESABIM",
    login: "Daxil ol",
    register: "Qeydiyyat",
    registerBtn: "Qeydiyyatdan keç",
    email: "Email",
    password: "Şifrə",
    repeatPassword: "Şifrəni təkrarla",
    fullName: "Ad Soyad",
    agreeRules: "Xidmət Şərtləri və Qaydaları",
    agreeSuffix: "qəbul edirəm",
    loginErrorMsg: "Email və ya şifrə yanlışdır.",
    agreeError: "Davam etmək üçün Xidmət Şərtləri və Qaydaları qəbul etməlisiniz.",
    passwordMismatch: "Şifrələr uyğun gəlmir.",
    passwordShort: "Şifrə ən azı 6 simvol olmalıdır.",
    registerGenericError: "Qeydiyyat zamanı xəta baş verdi.",
    registerSuccess: "Qeydiyyat uğurludur! Zəhmət olmasa emailinizi yoxlayıb hesabı təsdiqləyin.",
    otpTitle: "Emailinizi təsdiqləyin",
    otpSub: "Gmailinizə göndərdiyimiz təsdiq kodunu daxil edin.",
    otpPlaceholder: "Təsdiq kodu",
    otpButton: "Təsdiqlə",
    otpError: "Kod yanlışdır və ya vaxtı keçib. Yenidən cəhd edin.",
    otpResend: "Kodu yenidən göndər",
    balanceLabel: "Balansınız",
    balanceTopUp: "Balansı artır",
    balanceMaintenance: "Hazırda texniki iş gedir.",
    balanceWhatsappNote: "Sifariş vermək üçün WhatsApp-a yazın. Sabah biz əlavə edərik.",
    balanceWhatsappBtn: "WhatsApp-a yaz",
    bannedTitle: "Hesabınız bloklanıb",
    bannedText: "Hesabınız administrator tərəfindən bloklanıb. Ətraflı məlumat üçün dəstək ilə əlaqə saxlayın.",
    reviewsWord: "rəy",
    noReviewsYet: "Bu məhsula hələ rəy yazılmayıb.",
    noReviewsShort: "Rəy yoxdur",
    verifiedPurchase: "Satın aldı",
    commentPlaceholder: "Rəyinizi yazın...",
    submitReview: "Rəyi göndər",
    reviewCommentRequired: "Rəy mətnini yazın.",
    reviewGenericError: "Xəta baş verdi, yenidən cəhd edin.",
    alreadyReviewed: "Bu məhsula artıq rəy yazmısınız.",
    notEligibleReview: "Yalnız bu məhsulu satın almış müştərilər rəy yaza bilər.",
    loginToReview: "Rəy yazmaq üçün hesabınıza daxil olun.",
    loading: "Yüklənir...",
    hello: "Salam!",
    ordersNote: "Sifarişləriniz haqqında WhatsApp üzərindən məlumat alacaqsınız.",
    logout: "Çıxış",
    cartLoginAlert: "Səbətə əlavə etmək üçün əvvəlcə qeydiyyatdan keçməli və ya daxil olmalısınız.",

    orderNow: "Sifariş et",
    myAccount: "Hesabım",
    myCart: "Səbətim",
    allRightsReserved: "Bütün hüquqlar qorunur.",

    catAll: "Hamısı",
    catStreaming: "Streaming",
    catMusic: "Musiqi",
    catAi: "AI Alətləri",
    catGames: "Oyun",

    navHome: "Ana səhifə",
    navPackages: "Paketlər",
    navHow: "Necə işləyir",
    navTrust: "Etibarlılıq",
    navRules: "Qaydalar",
    navReviews: "Rəylər",
    navContact: "Əlaqə",

    rulesIntro: "SkyFlix Azerbaycan olaraq bütün müştərilərimiz üçün eyni şəkildə tətbiq olunan qaydalar aşağıda qeyd edilib.",
  },
  en: {
    eyebrow: "Delivered in the shortest time",
    megaSlogan: "THE CAUCASUS' LARGEST AND MOST TRUSTED DIGITAL STORE — SKYFLIX AZERBAIJAN",
    heroLine1: "One ticket.",
    heroLine2Pre: "Every ",
    heroLine2Em: "screen",
    heroSub: "Netflix, Spotify, YouTube Premium and more — a fraction of the original price, official accounts, delivered in minutes.",
    seePackages: "View packages",
    writeWhatsapp: "Message on WhatsApp",
    trustAccounts: "Guaranteed accounts",
    trustSupport: "24/7 support",
    trustCustomers: "1200+ happy customers",
    popularKicker: "POPULAR",
    popularTitle: "Most popular packages",
    popularSub: "See the full list on the Packages page.",
    seeAllPackages: "View all packages",
    ctaTitle: "Pick your package, start watching today",
    ctaSub: "Message us on WhatsApp to order — replies within minutes.",

    packagesKicker: "PACKAGES",
    packagesTitle: "Popular subscriptions",
    packagesSub: "Every ticket is access to an account — choose, pay, start watching.",
    noProductsInCategory: "No packages in this category yet.",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "How do I place an order?",
    faqA1: "Choose the package you want, click \"Add to cart\", then complete your order via WhatsApp from the cart.",
    faqQ2: "How do I pay?",
    faqA2: "Payment is arranged via WhatsApp — you can pay by card or other methods.",
    faqQ3: "How long does delivery take?",
    faqA3: "Once payment is confirmed, your account is delivered in the shortest possible time.",
    faqQ4: "What if I have a problem?",
    faqA4: "Message us on WhatsApp — our team will resolve it promptly.",
    addToCart: "Add to cart",

    howKicker: "HOW IT WORKS",
    howTitle: "Your account, ready in three steps",
    howSub: "From order to delivery, the whole process is simple and fast.",
    step1Title: "Choose",
    step1Text: "Pick the platform and package you want.",
    step2Title: "Pay",
    step2Text: "Pay by card or via Kapital Bank/M10.",
    step3Title: "Get it",
    step3Text: "Account details arrive in the shortest possible time.",

    trustKicker: "TRUST",
    trustTitleWhy: "Why SkyFlix Azerbaycan?",
    trust1Title: "Guarantee included",
    trust1Text: "Every account comes with a replacement guarantee for its active period.",
    trust2Title: "Fast delivery",
    trust2Text: "Account details are delivered in the shortest possible time after payment confirmation.",
    trust3Title: "Live support",
    trust3Text: "Questions? We reply on WhatsApp, 7 days a week.",

    contactKicker: "CONTACT",
    contactTitle: "Message us to order",
    contactSub: "Reach us on WhatsApp — replies usually take a few minutes.",
    contactCardText: "Message us directly for orders and support.",

    cartKicker: "CART",
    cartEmptyTitle: "Your cart is empty",
    cartEmptySub: "Add a package from the Packages page.",
    cartTitle: "My Cart",
    cartSub: "Adjust the quantity and complete your order on WhatsApp.",
    cartTotal: "Total",
    completeOrder: "Complete order on WhatsApp",

    accountKicker: "ACCOUNT",
    accountKickerMine: "MY ACCOUNT",
    login: "Log in",
    register: "Register",
    registerBtn: "Create account",
    email: "Email",
    password: "Password",
    repeatPassword: "Repeat password",
    fullName: "Full name",
    agreeRules: "Terms of Service and Rules",
    agreeSuffix: "I accept",
    loginErrorMsg: "Incorrect email or password.",
    agreeError: "You must accept the Terms of Service and Rules to continue.",
    passwordMismatch: "Passwords do not match.",
    passwordShort: "Password must be at least 6 characters.",
    registerGenericError: "An error occurred during registration.",
    registerSuccess: "Registration successful! Please check your email to confirm your account.",
    otpTitle: "Confirm your email",
    otpSub: "Enter the verification code we sent to your Gmail.",
    otpPlaceholder: "Verification code",
    otpButton: "Confirm",
    otpError: "The code is incorrect or has expired. Please try again.",
    otpResend: "Resend code",
    balanceLabel: "Your balance",
    balanceTopUp: "Top up balance",
    balanceMaintenance: "Currently under maintenance.",
    balanceWhatsappNote: "Message us on WhatsApp to place an order. We'll add this feature tomorrow.",
    balanceWhatsappBtn: "Message on WhatsApp",
    bannedTitle: "Your account is blocked",
    bannedText: "Your account has been blocked by an administrator. Contact support for details.",
    reviewsWord: "reviews",
    noReviewsYet: "No reviews yet for this product.",
    noReviewsShort: "No reviews",
    verifiedPurchase: "Verified purchase",
    commentPlaceholder: "Write your review...",
    submitReview: "Submit review",
    reviewCommentRequired: "Please write your review.",
    reviewGenericError: "Something went wrong, please try again.",
    alreadyReviewed: "You have already reviewed this product.",
    notEligibleReview: "Only customers who purchased this product can leave a review.",
    loginToReview: "Log in to your account to leave a review.",
    loading: "Loading...",
    hello: "Hello!",
    ordersNote: "You'll receive updates about your orders on WhatsApp.",
    logout: "Log out",
    cartLoginAlert: "Please register or log in before adding items to your cart.",

    orderNow: "Order now",
    myAccount: "My Account",
    myCart: "My Cart",
    allRightsReserved: "All rights reserved.",

    catAll: "All",
    catStreaming: "Streaming",
    catMusic: "Music",
    catAi: "AI Tools",
    catGames: "Games",

    navHome: "Home",
    navPackages: "Packages",
    navHow: "How it works",
    navTrust: "Trust",
    navRules: "Rules",
    navReviews: "Reviews",
    navContact: "Contact",

    rulesIntro: "The rules below apply equally to all SkyFlix Azerbaycan customers. Full details are currently available in Azerbaijani.",
  },
  ka: {
    eyebrow: "მიწოდება უმოკლეს დროში",
    megaSlogan: "კავკასიის ყველაზე დიდი და საიმედო ციფრული მაღაზია — SKYFLIX AZERBAIJAN",
    heroLine1: "ერთი ბილეთი.",
    heroLine2Pre: "ყველა ",
    heroLine2Em: "ეკრანი",
    heroSub: "Netflix, Spotify, YouTube Premium და კიდევ მეტი — ორიგინალური ფასის მცირე ნაწილად, ოფიციალური ანგარიშებით, რამდენიმე წუთში შენია.",
    seePackages: "პაკეტების ნახვა",
    writeWhatsapp: "მოგვწერე WhatsApp-ზე",
    trustAccounts: "გარანტირებული ანგარიშები",
    trustSupport: "24/7 მხარდაჭერა",
    trustCustomers: "1200+ კმაყოფილი მომხმარებელი",
    popularKicker: "პოპულარული",
    popularTitle: "ყველაზე პოპულარული პაკეტები",
    popularSub: "სრული ჩამონათვალისთვის იხილეთ პაკეტების გვერდი.",
    seeAllPackages: "ყველა პაკეტის ნახვა",
    ctaTitle: "აირჩიე პაკეტი, დაიწყე ყურება დღესვე",
    ctaSub: "შეკვეთისთვის მოგვწერე WhatsApp-ზე — პასუხი რამდენიმე წუთშია.",

    packagesKicker: "პაკეტები",
    packagesTitle: "პოპულარული გამოწერები",
    packagesSub: "თითოეული ბილეთი წვდომაა ერთ ანგარიშზე — აირჩიე, გადაიხადე, დაიწყე ყურება.",
    noProductsInCategory: "ამ კატეგორიაში ჯერ არ არის პაკეტები.",
    faqTitle: "ხშირად დასმული კითხვები",
    faqQ1: "როგორ გავაკეთო შეკვეთა?",
    faqA1: "აირჩიეთ სასურველი პაკეტი, დააჭირეთ „კალათაში დამატებას“, შემდეგ კალათიდან დაასრულეთ შეკვეთა WhatsApp-ის საშუალებით.",
    faqQ2: "როგორ ხდება გადახდა?",
    faqA2: "გადახდა ეთანხმება WhatsApp-ის საშუალებით — შეგიძლიათ გადაიხადოთ ბარათით ან სხვა მეთოდით.",
    faqQ3: "რამდენ ხანში მოხდება მიწოდება?",
    faqA3: "გადახდის დადასტურების შემდეგ თქვენი ანგარიში მიეწოდება უმოკლეს შესაძლო დროში.",
    faqQ4: "რა ვქნა, თუ პრობლემა წარმოიშვა?",
    faqA4: "მოგვწერეთ WhatsApp-ზე — ჩვენი გუნდი სწრაფად მოაგვარებს საკითხს.",
    addToCart: "კალათაში დამატება",

    howKicker: "როგორ მუშაობს",
    howTitle: "შენი ანგარიში მზადაა სამ ნაბიჯში",
    howSub: "შეკვეთიდან მიწოდებამდე მთელი პროცესი მარტივი და სწრაფია.",
    step1Title: "აირჩიე",
    step1Text: "აირჩიე სასურველი პლატფორმა და პაკეტი.",
    step2Title: "გადაიხადე",
    step2Text: "გადაიხადე ბარათით ან Kapital Bank/M10-ის საშუალებით.",
    step3Title: "მიიღე",
    step3Text: "ანგარიშის დეტალები ჩამოვა უმოკლეს შესაძლო დროში.",

    trustKicker: "სანდოობა",
    trustTitleWhy: "რატომ SkyFlix Azerbaycan?",
    trust1Title: "გარანტია შედის",
    trust1Text: "ყველა ანგარიშს ახლავს ჩანაცვლების გარანტია აქტიური პერიოდის განმავლობაში.",
    trust2Title: "სწრაფი მიწოდება",
    trust2Text: "ანგარიშის მონაცემები, გადახდის დადასტურების შემდეგ, მიეწოდება უმოკლეს შესაძლო დროში.",
    trust3Title: "ცოცხალი მხარდაჭერა",
    trust3Text: "კითხვები გაქვს? ვპასუხობთ WhatsApp-ზე, კვირაში 7 დღე.",

    contactKicker: "კონტაქტი",
    contactTitle: "მოგვწერე შეკვეთისთვის",
    contactSub: "დაგვიკავშირდი WhatsApp-ზე — პასუხი ჩვეულებრივ რამდენიმე წუთს იღებს.",
    contactCardText: "მოგვწერე პირდაპირ შეკვეთისა და მხარდაჭერისთვის.",

    cartKicker: "კალათა",
    cartEmptyTitle: "თქვენი კალათა ცარიელია",
    cartEmptySub: "დაამატე პროდუქტი პაკეტების გვერდიდან.",
    cartTitle: "ჩემი კალათა",
    cartSub: "დაარეგულირე რაოდენობა და დაასრულე შეკვეთა WhatsApp-ზე.",
    cartTotal: "სულ",
    completeOrder: "შეკვეთის დასრულება WhatsApp-ზე",

    accountKicker: "ანგარიში",
    accountKickerMine: "ჩემი ანგარიში",
    login: "შესვლა",
    register: "რეგისტრაცია",
    registerBtn: "ანგარიშის შექმნა",
    email: "ელფოსტა",
    password: "პაროლი",
    repeatPassword: "გაიმეორე პაროლი",
    fullName: "სახელი და გვარი",
    agreeRules: "მომსახურების პირობები და წესები",
    agreeSuffix: "ვეთანხმები",
    loginErrorMsg: "არასწორი ელფოსტა ან პაროლი.",
    agreeError: "გასაგრძელებლად უნდა დაეთანხმოთ მომსახურების პირობებსა და წესებს.",
    passwordMismatch: "პაროლები არ ემთხვევა.",
    passwordShort: "პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან.",
    registerGenericError: "რეგისტრაციისას დაფიქსირდა შეცდომა.",
    registerSuccess: "რეგისტრაცია წარმატებულია! გთხოვთ, შეამოწმოთ ელფოსტა ანგარიშის დასადასტურებლად.",
    otpTitle: "დაადასტურეთ თქვენი ელფოსტა",
    otpSub: "შეიყვანეთ დადასტურების კოდი, რომელიც გამოგზავნეთ თქვენს Gmail-ზე.",
    otpPlaceholder: "დადასტურების კოდი",
    otpButton: "დადასტურება",
    otpError: "კოდი არასწორია ან ვადა გაუვიდა. ცადეთ ხელახლა.",
    otpResend: "კოდის ხელახლა გაგზავნა",
    balanceLabel: "თქვენი ბალანსი",
    balanceTopUp: "ბალანსის შევსება",
    balanceMaintenance: "ამჟამად მიმდინარეობს ტექნიკური სამუშაოები.",
    balanceWhatsappNote: "შეკვეთისთვის მოგვწერეთ WhatsApp-ზე. ხვალ დავამატებთ ამ ფუნქციას.",
    balanceWhatsappBtn: "მოწერა WhatsApp-ზე",
    bannedTitle: "თქვენი ანგარიში დაბლოკილია",
    bannedText: "თქვენი ანგარიში დაბლოკილია ადმინისტრატორის მიერ. დეტალებისთვის დაუკავშირდით მხარდაჭერას.",
    reviewsWord: "შეფასება",
    noReviewsYet: "ამ პროდუქტს ჯერ არ აქვს შეფასება.",
    noReviewsShort: "შეფასება არ არის",
    verifiedPurchase: "შეძენილია",
    commentPlaceholder: "დაწერეთ თქვენი შეფასება...",
    submitReview: "გაგზავნა",
    reviewCommentRequired: "გთხოვთ დაწეროთ შეფასება.",
    reviewGenericError: "დაფიქსირდა შეცდომა, სცადეთ ხელახლა.",
    alreadyReviewed: "თქვენ უკვე დატოვეთ შეფასება ამ პროდუქტზე.",
    notEligibleReview: "შეფასების დატოვება შეუძლიათ მხოლოდ იმ მომხმარებლებს, ვინც შეიძინა ეს პროდუქტი.",
    loginToReview: "შეფასების დასატოვებლად შედით თქვენს ანგარიშში.",
    loading: "იტვირთება...",
    hello: "გამარჯობა!",
    ordersNote: "თქვენი შეკვეთების შესახებ ინფორმაციას მიიღებთ WhatsApp-ის საშუალებით.",
    logout: "გასვლა",
    cartLoginAlert: "კალათაში დასამატებლად ჯერ უნდა დარეგისტრირდეთ ან შეხვიდეთ სისტემაში.",

    orderNow: "შეკვეთა",
    myAccount: "ჩემი ანგარიში",
    myCart: "ჩემი კალათა",
    allRightsReserved: "ყველა უფლება დაცულია.",

    catAll: "ყველა",
    catStreaming: "სტრიმინგი",
    catMusic: "მუსიკა",
    catAi: "AI ხელსაწყოები",
    catGames: "თამაშები",

    navHome: "მთავარი",
    navPackages: "პაკეტები",
    navHow: "როგორ მუშაობს",
    navTrust: "სანდოობა",
    navRules: "წესები",
    navReviews: "შეფასებები",
    navContact: "კონტაქტი",

    rulesIntro: "ქვემოთ მოცემული წესები თანაბრად ვრცელდება SkyFlix Azerbaycan-ის ყველა მომხმარებელზე.",
  },
  ru: {
    eyebrow: "Доставка в кратчайшие сроки",
    megaSlogan: "САМЫЙ КРУПНЫЙ И НАДЁЖНЫЙ ЦИФРОВОЙ МАГАЗИН НА КАВКАЗЕ — SKYFLIX AZERBAIJAN",
    heroLine1: "Один билет.",
    heroLine2Pre: "Все ",
    heroLine2Em: "экраны",
    heroSub: "Netflix, Spotify, YouTube Premium и многое другое — по цене в разы ниже оригинальной, с официальными аккаунтами, за считанные минуты.",
    seePackages: "Смотреть пакеты",
    writeWhatsapp: "Написать в WhatsApp",
    trustAccounts: "Гарантированные аккаунты",
    trustSupport: "Поддержка 24/7",
    trustCustomers: "1200+ довольных клиентов",
    popularKicker: "ПОПУЛЯРНОЕ",
    popularTitle: "Самые популярные пакеты",
    popularSub: "Полный список смотрите на странице «Пакеты».",
    seeAllPackages: "Смотреть все пакеты",
    ctaTitle: "Выбери пакет, начни смотреть уже сегодня",
    ctaSub: "Напишите нам в WhatsApp, чтобы оформить заказ — ответим в течение нескольких минут.",

    packagesKicker: "ПАКЕТЫ",
    packagesTitle: "Популярные подписки",
    packagesSub: "Каждый билет — это доступ к аккаунту: выбери, оплати, начни смотреть.",
    noProductsInCategory: "В этой категории пока нет пакетов.",
    faqTitle: "Часто задаваемые вопросы",
    faqQ1: "Как сделать заказ?",
    faqA1: "Выберите нужный пакет, нажмите «Добавить в корзину», затем завершите заказ через WhatsApp из корзины.",
    faqQ2: "Как происходит оплата?",
    faqA2: "Оплата согласовывается через WhatsApp — можно оплатить картой или другим способом.",
    faqQ3: "Сколько времени занимает доставка?",
    faqA3: "После подтверждения оплаты аккаунт предоставляется в кратчайшие сроки.",
    faqQ4: "Что делать при проблеме?",
    faqA4: "Напишите нам в WhatsApp — наша команда оперативно решит вопрос.",
    addToCart: "Добавить в корзину",

    howKicker: "КАК ЭТО РАБОТАЕТ",
    howTitle: "Ваш аккаунт готов за три шага",
    howSub: "От заказа до получения — весь процесс прост и быстр.",
    step1Title: "Выберите",
    step1Text: "Выберите нужную платформу и пакет.",
    step2Title: "Оплатите",
    step2Text: "Оплатите картой или через Kapital Bank/M10.",
    step3Title: "Получите",
    step3Text: "Данные аккаунта приходят в кратчайшие сроки.",

    trustKicker: "НАДЁЖНОСТЬ",
    trustTitleWhy: "Почему SkyFlix Azerbaycan?",
    trust1Title: "Гарантия включена",
    trust1Text: "Каждый аккаунт сопровождается гарантией замены на весь срок действия подписки.",
    trust2Title: "Быстрая доставка",
    trust2Text: "После подтверждения оплаты данные аккаунта доставляются в кратчайшие сроки.",
    trust3Title: "Онлайн-поддержка",
    trust3Text: "Есть вопросы? Отвечаем в WhatsApp 7 дней в неделю.",

    contactKicker: "КОНТАКТЫ",
    contactTitle: "Напишите, чтобы оформить заказ",
    contactSub: "Свяжитесь с нами в WhatsApp — ответ обычно занимает несколько минут.",
    contactCardText: "Пишите напрямую по вопросам заказа и поддержки.",

    cartKicker: "КОРЗИНА",
    cartEmptyTitle: "Ваша корзина пуста",
    cartEmptySub: "Добавьте товар со страницы «Пакеты».",
    cartTitle: "Моя корзина",
    cartSub: "Настройте количество и завершите заказ в WhatsApp.",
    cartTotal: "Итого",
    completeOrder: "Завершить заказ в WhatsApp",

    accountKicker: "АККАУНТ",
    accountKickerMine: "МОЙ АККАУНТ",
    login: "Войти",
    register: "Регистрация",
    registerBtn: "Создать аккаунт",
    email: "Email",
    password: "Пароль",
    repeatPassword: "Повторите пароль",
    fullName: "Имя и фамилия",
    agreeRules: "Условия обслуживания и правила",
    agreeSuffix: "принимаю",
    loginErrorMsg: "Неверный email или пароль.",
    agreeError: "Для продолжения необходимо принять Условия обслуживания и правила.",
    passwordMismatch: "Пароли не совпадают.",
    passwordShort: "Пароль должен содержать не менее 6 символов.",
    registerGenericError: "При регистрации произошла ошибка.",
    registerSuccess: "Регистрация успешна! Пожалуйста, проверьте почту для подтверждения аккаунта.",
    otpTitle: "Подтвердите ваш email",
    otpSub: "Введите код подтверждения, отправленный на ваш Gmail.",
    otpPlaceholder: "Код подтверждения",
    otpButton: "Подтвердить",
    otpError: "Код неверен или срок его действия истёк. Попробуйте снова.",
    otpResend: "Отправить код повторно",
    balanceLabel: "Ваш баланс",
    balanceTopUp: "Пополнить баланс",
    balanceMaintenance: "Ведутся технические работы.",
    balanceWhatsappNote: "Напишите нам в WhatsApp, чтобы сделать заказ. Добавим эту функцию завтра.",
    balanceWhatsappBtn: "Написать в WhatsApp",
    bannedTitle: "Ваш аккаунт заблокирован",
    bannedText: "Ваш аккаунт заблокирован администратором. Свяжитесь с поддержкой для уточнения деталей.",
    reviewsWord: "отзывов",
    noReviewsYet: "У этого товара пока нет отзывов.",
    noReviewsShort: "Нет отзывов",
    verifiedPurchase: "Купил(а)",
    commentPlaceholder: "Напишите ваш отзыв...",
    submitReview: "Отправить отзыв",
    reviewCommentRequired: "Пожалуйста, напишите отзыв.",
    reviewGenericError: "Произошла ошибка, попробуйте снова.",
    alreadyReviewed: "Вы уже оставили отзыв на этот товар.",
    notEligibleReview: "Оставлять отзывы могут только клиенты, купившие этот товар.",
    loginToReview: "Войдите в аккаунт, чтобы оставить отзыв.",
    loading: "Загрузка...",
    hello: "Привет!",
    ordersNote: "Информацию о ваших заказах вы будете получать через WhatsApp.",
    logout: "Выйти",
    cartLoginAlert: "Чтобы добавить товар в корзину, сначала зарегистрируйтесь или войдите в аккаунт.",

    orderNow: "Заказать",
    myAccount: "Мой аккаунт",
    myCart: "Моя корзина",
    allRightsReserved: "Все права защищены.",

    catAll: "Все",
    catStreaming: "Стриминг",
    catMusic: "Музыка",
    catAi: "AI-инструменты",
    catGames: "Игры",

    navHome: "Главная",
    navPackages: "Пакеты",
    navHow: "Как это работает",
    navTrust: "Надёжность",
    navRules: "Правила",
    navReviews: "Отзывы",
    navContact: "Контакты",

    rulesIntro: "Правила ниже одинаково применяются ко всем клиентам SkyFlix Azerbaycan.",
  },
};

function useGoogleFonts() {
  useEffect(() => {
    const id = "ab-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useHashRoute() {
  const getPage = () => {
    const h = window.location.hash.replace("#", "");
    if (h.startsWith("mehsul-")) return h;
    return ALL_PAGES.includes(h) ? h : "home";
  };
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHash = () => {
      setPage(getPage());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (key) => {
    window.location.hash = key;
    setPage(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [page, go];
}

function useAppData() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({});
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wheelPrizes, setWheelPrizes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function reload() {
    const { data: prod } = await supabase.from("products").select("*").order("sort_order");
    if (prod) setProducts(prod);
    const { data: sett } = await supabase.from("settings").select("*");
    if (sett) {
      const obj = {};
      sett.forEach((s) => (obj[s.key] = s.value));
      setSettings(obj);
    }
    const { data: revs } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (revs) setReviews(revs);
    const { data: cats } = await supabase.from("categories").select("*").order("sort_order");
    if (cats) setCategories(cats);
    const { data: prizes } = await supabase.from("wheel_prizes").select("*").order("sort_order");
    if (prizes) setWheelPrizes(prizes);
    setLoaded(true);
  }

  useEffect(() => {
    reload();
  }, []);

  return { products, settings, reviews, categories, wheelPrizes, reload, loaded };
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ab-reveal ${visible ? "ab-reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Notch({ side }) {
  return <span className={`ab-notch ${side}`} aria-hidden="true" />;
}

function TicketCard({ p, onAdd, t, reviews, onOpenReviews, go }) {
  const productReviews = (reviews || []).filter((r) => r.product_id === p.id);
  const avg = productReviews.length
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;
  const showStock = !p.has_duration_options && p.stock !== null && p.stock !== undefined;
  const outOfStock = showStock && p.stock <= 0;
  return (
    <div className="ab-ticket">
      <div
        className="ab-ticket-clickzone"
        onClick={() => go && go("mehsul-" + p.id)}
        style={{ cursor: go ? "pointer" : "default" }}
      >
        {p.image_url && <div className="ab-ticket-img" style={{ backgroundImage: `url(${p.image_url})` }} />}
        {p.discount_percent > 0 && <div className="ab-discount-badge">-{p.discount_percent}%</div>}
        <div className="ab-ticket-top">
          <div>
            <div className="ab-ticket-eyebrow">ABUNƏLİK</div>
            <div className="ab-ticket-name">{p.name}</div>
            <div className="ab-ticket-plan">{p.plan}</div>
          </div>
          </div>
        <div className="ab-ticket-perf">
          <Notch side="left" />
          <Notch side="right" />
        </div>
        <div className="ab-ticket-bottom">
          <div className="ab-ticket-code">{p.code}</div>
          <div className="ab-ticket-price">
            <span className="ab-price-num">{p.price}</span>
            <span className="ab-price-cur">₼</span>
            {p.show_period !== false && <span className="ab-price-per">/{p.period}</span>}
          </div>
        </div>
        {showStock && (
          <div className={`ab-stock-badge ${outOfStock ? "out" : ""}`}>
            {outOfStock ? "Stokda yoxdur" : `Stokda: ${p.stock} ədəd`}
          </div>
        )}
      </div>
      {onOpenReviews && (
        <button className="ab-ticket-reviews" onClick={() => onOpenReviews(p)}>
          <Star size={13} fill={productReviews.length ? "#E1122A" : "none"} strokeWidth={1.5} />
          {productReviews.length ? avg.toFixed(1) : t("noReviewsShort")}
          <span className="ab-ticket-reviews-count">({productReviews.length})</span>
          <MessageSquare size={13} style={{ marginLeft: "auto" }} />
        </button>
      )}
      {onAdd && (
        <button
          className="ab-ticket-addbtn"
          onClick={() => (p.has_duration_options ? go && go("mehsul-" + p.id) : onAdd(p))}
          disabled={outOfStock}
        >
          <ShoppingCart size={15} /> {outOfStock ? "Stokda yoxdur" : t("addToCart")}
        </button>
      )}
    </div>
  );
}

function PageHead({ kicker, title, sub }) {
  return (
    <Reveal className="ab-section-head">
      <div className="ab-kicker">{kicker}</div>
      <h2 className="ab-h2">{title}</h2>
      {sub && <p className="ab-section-sub">{sub}</p>}
    </Reveal>
  );
}

function HeroSlideshow({ products }) {
  const [active, setActive] = useState(0);
  const slides = products.slice(0, 6);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setActive((v) => (v + 1) % slides.length), 3200);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) {
    return <div className="ab-slideshow" />;
  }

  return (
    <div className="ab-slideshow">
      <div className="ab-slideshow-track">
        {slides.map((p, idx) => {
          let offset = idx - active;
          if (offset > slides.length / 2) offset -= slides.length;
          if (offset < -slides.length / 2) offset += slides.length;
          const abs = Math.abs(offset);
          const cardStyle = {
            transform: `translate(-50%,-50%) translateX(${offset * 128}px) rotateY(${offset * -30}deg) scale(${1 - abs * 0.16})`,
            zIndex: 10 - abs,
            opacity: abs > 2 ? 0 : 1 - abs * 0.28,
            pointerEvents: abs > 2 ? "none" : "auto",
          };
          return (
            <div key={p.id} className="ab-slide-3d" style={cardStyle} onClick={() => setActive(idx)}>
              {p.image_url ? (
                <div className="ab-slide-3d-img" style={{ backgroundImage: `url(${p.image_url})` }} />
              ) : (
                <div className="ab-slide-3d-icon">
                  <img src="/skyflix-icon.png" alt="" style={{ width: 28, height: 28 }} />
                </div>
              )}
              <div className="ab-slide-3d-name">{p.name}</div>
              <div className="ab-slide-3d-price">{p.price} ₼</div>
            </div>
          );
        })}
      </div>
      <div className="ab-slide-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`ab-dot ${idx === active ? "active" : ""}`}
            onClick={() => setActive(idx)}
            aria-label={`Slayd ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomePage({ go, products, onAdd, lang, t, reviews, onOpenReviews }) {
  return (
    <>
      <div className="ab-screen">
        <div className="ab-screen-blob b1" />
        <div className="ab-screen-blob b2" />
        <div className="ab-screen-sweep" />
        <div className="ab-screen-grain" />
        <div className="ab-mega-banner">
          {t("megaSlogan")}
        </div>
        <div className="ab-hero">
          <div>
            {lang === "ka" && (
              <div className="ab-ge-strip">
                <svg className="ab-ge-flag" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="40" fill="#FFFFFF" />
                  <rect x="24" y="0" width="12" height="40" fill="#FF0000" />
                  <rect x="0" y="14" width="60" height="12" fill="#FF0000" />
                  {[
                    [12, 7],
                    [48, 7],
                    [12, 33],
                    [48, 33],
                  ].map(([cx, cy], i) => (
                    <g key={i}>
                      <rect x={cx - 4} y={cy - 1.3} width="8" height="2.6" fill="#FF0000" />
                      <rect x={cx - 1.3} y={cy - 4} width="2.6" height="8" fill="#FF0000" />
                    </g>
                  ))}
                </svg>
                <div className="ab-ge-avatars">
                  {["#E1122A", "#8C1620", "#E1122A", "#8C1620", "#E1122A"].map((c, i) => (
                    <span key={i} className="ab-ge-avatar" style={{ background: c, zIndex: 5 - i, marginLeft: i === 0 ? 0 : -10 }}>
                      <User size={13} color="#FFFFFF" strokeWidth={2.2} />
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="ab-eyebrow">
              <span className="dot" /> {t("eyebrow")}
            </div>
            <h1 className="ab-h1">
              {t("heroLine1")}<br />{t("heroLine2Pre")}<em>{t("heroLine2Em")}</em>.
            </h1>
            <p className="ab-sub">{t("heroSub")}</p>
            <div className="ab-hero-ctas">
              <button className="ab-btn ab-btn-onscreen" onClick={() => go("paketler")}>
                {t("seePackages")}
              </button>
              <button className="ab-btn ab-btn-onscreen-ghost" onClick={() => go("elaqe")}>
                <MessageCircle size={16} /> {t("writeWhatsapp")}
              </button>
            </div>
            <div className="ab-trustrow">
              <span><Shield size={14} /> {t("trustAccounts")}</span>
              <span><Clock size={14} /> {t("trustSupport")}</span>
              <span><Star size={14} /> {t("trustCustomers")}</span>
            </div>
          </div>

          <HeroSlideshow products={products} />
        </div>
      </div>

      <Reveal className="ab-trustbadges">
        <div className="ab-trustbadge">
          <BadgeCheck size={20} strokeWidth={1.75} />
          <div>
            <h4>{t("trustAccounts")}</h4>
            <p>{t("trust1Text")}</p>
          </div>
        </div>
        <div className="ab-trustbadge">
          <Zap size={20} strokeWidth={1.75} />
          <div>
            <h4>{t("step3Title")}</h4>
            <p>{t("trust2Text")}</p>
          </div>
        </div>
        <div className="ab-trustbadge">
          <Headset size={20} strokeWidth={1.75} />
          <div>
            <h4>{t("trustSupport")}</h4>
            <p>{t("trust3Text")}</p>
          </div>
        </div>
        <div className="ab-trustbadge">
          <Star size={20} strokeWidth={1.75} />
          <div>
            <h4>{t("trustCustomers")}</h4>
            <p>{t("trustTitleWhy")}</p>
          </div>
        </div>
      </Reveal>

      <section className="ab-section" style={{ paddingTop: 60 }}>
        <PageHead kicker={t("popularKicker")} title={t("popularTitle")} sub={t("popularSub")} />
        <div className="ab-grid">
          {products.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <TicketCard p={p} onAdd={onAdd} t={t} reviews={reviews} onOpenReviews={onOpenReviews} go={go} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <button className="ab-btn ab-btn-ghost" style={{ marginTop: 30 }} onClick={() => go("paketler")}>
            {t("seeAllPackages")} <ChevronRight size={15} />
          </button>
        </Reveal>
      </section>

      <AdSlot label="Ana səhifə" />
      <CtaBanner go={go} t={t} />
    </>
  );
}

function FaqAccordion({ t }) {
  const [open, setOpen] = useState(null);
  const items = [
    { q: t("faqQ1"), a: t("faqA1") },
    { q: t("faqQ2"), a: t("faqA2") },
    { q: t("faqQ3"), a: t("faqA3") },
    { q: t("faqQ4"), a: t("faqA4") },
  ];
  return (
    <div className="ab-faq">
      <h3 className="ab-faq-title">{t("faqTitle")}</h3>
      {items.map((item, i) => (
        <div className="ab-faq-item" key={i}>
          <button className="ab-faq-q" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <ChevronRight size={16} className={`ab-faq-chevron ${open === i ? "open" : ""}`} />
          </button>
          {open === i && <p className="ab-faq-a">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

function ProductDetailPage({ productId, products, onAdd, t, lang, reviews, onOpenReviews, go }) {
  const p = products.find((prod) => prod.id === productId);
  const [selectedMonths, setSelectedMonths] = useState(null);

  useEffect(() => {
    if (p?.has_duration_options && p.duration_options?.length > 0) {
      setSelectedMonths(p.duration_options[0].months);
    }
  }, [p?.id]);

  if (!p) {
    return (
      <section className="ab-section ab-page-pad">
        <PageHead kicker="" title={t("noReviewsShort")} />
        <button className="ab-btn ab-btn-ghost" onClick={() => go("paketler")}>
          <ChevronRight size={15} style={{ transform: "rotate(180deg)" }} /> {t("seeAllPackages")}
        </button>
      </section>
    );
  }

  const productReviews = (reviews || []).filter((r) => r.product_id === p.id);
  const avg = productReviews.length
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;

  const hasDurations = p.has_duration_options && p.duration_options && p.duration_options.length > 0;
  const activeVariant = hasDurations ? p.duration_options.find((d) => d.months === selectedMonths) : null;
  const displayPrice = activeVariant ? activeVariant.price : p.price;
  const variantStock = activeVariant && activeVariant.stock !== undefined && activeVariant.stock !== null ? activeVariant.stock : null;
  const overallStock = !hasDurations && p.stock !== null && p.stock !== undefined ? p.stock : null;
  const currentStock = hasDurations ? variantStock : overallStock;
  const outOfStock = currentStock !== null && currentStock <= 0;

  function handleAdd() {
    if (outOfStock) return;
    if (hasDurations && activeVariant) {
      onAdd({
        id: p.id,
        name: `${p.name} (${activeVariant.months} ay)`,
        price: activeVariant.price,
        period: `${activeVariant.months} ay`,
        variantMonths: activeVariant.months,
      });
    } else {
      onAdd(p);
    }
  }

  return (
    <section className="ab-section ab-page-pad">
      <button className="ab-btn ab-btn-ghost" onClick={() => go("paketler")} style={{ marginBottom: 24 }}>
        <ChevronRight size={15} style={{ transform: "rotate(180deg)" }} /> {t("seeAllPackages")}
      </button>
      <div className="ab-detail-grid">
        <div className="ab-detail-media">
          {p.image_url ? (
            <div className="ab-detail-img" style={{ backgroundImage: `url(${p.image_url})` }} />
          ) : (
            <div className="ab-detail-img ab-detail-img-fallback">
              <img src="/skyflix-icon.png" alt="" style={{ width: 60, height: 60 }} />
            </div>
          )}
        </div>
        <div>
          <div className="ab-ticket-eyebrow">ABUNƏLİK</div>
          <h1 className="ab-detail-name">{p.name}</h1>
          <p className="ab-detail-plan">{p.plan}</p>

          <button className="ab-ticket-reviews" style={{ borderTop: "none", padding: "0 0 14px" }} onClick={() => onOpenReviews(p)}>
            <Star size={14} fill={productReviews.length ? "#E1122A" : "none"} strokeWidth={1.5} />
            {productReviews.length ? avg.toFixed(1) : t("noReviewsShort")}
            <span className="ab-ticket-reviews-count">({productReviews.length} {t("reviewsWord")})</span>
          </button>

          {(() => {
            const desc = lang !== "az" && p["description_" + lang] ? p["description_" + lang] : p.description;
            return desc && <p className="ab-detail-description">{desc}</p>;
          })()}

          {hasDurations && (
            <div className="ab-duration-picker">
              <div className="ab-duration-label">Neçə aylıq?</div>
              <div className="ab-duration-options">
                {p.duration_options.map((d) => {
                  const dStock = d.stock !== undefined && d.stock !== null ? d.stock : null;
                  const dOut = dStock !== null && dStock <= 0;
                  return (
                    <button
                      key={d.months}
                      className={`ab-duration-pill ${selectedMonths === d.months ? "active" : ""} ${dOut ? "out" : ""}`}
                      onClick={() => setSelectedMonths(d.months)}
                      disabled={dOut}
                    >
                      {d.months} ay
                      <span>{d.price} ₼</span>
                      {dStock !== null && <em>{dOut ? "Bitib" : `${dStock} ədəd`}</em>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="ab-detail-price">
            <span className="ab-price-num">{displayPrice}</span>
            <span className="ab-price-cur">₼</span>
            {!hasDurations && p.show_period !== false && <span className="ab-price-per">/{p.period}</span>}
          </div>
          {p.discount_percent > 0 && (
            <div className="ab-detail-discount">
              <Zap size={14} /> Rəsmi qiymətdən <strong>{p.discount_percent}%</strong> ucuz
            </div>
          )}
          {overallStock !== null && (
            <div className={`ab-detail-stock ${outOfStock ? "out" : ""}`}>
              {outOfStock ? "Stokda yoxdur" : `Stokda: ${overallStock} ədəd`}
            </div>
          )}

          <button className="ab-btn ab-btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={handleAdd} disabled={outOfStock}>
            <ShoppingCart size={16} /> {outOfStock ? "Stokda yoxdur" : t("addToCart")}
          </button>
        </div>
      </div>
    </section>
  );
}

function PaketlerPage({ products, onAdd, t, reviews, onOpenReviews, categories, go }) {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker={t("packagesKicker")} title={t("packagesTitle")} sub={t("packagesSub")} />
      <Reveal className="ab-cat-pills">
        <button className={`ab-pill ${cat === "all" ? "active" : ""}`} onClick={() => setCat("all")}>
          <LayoutGrid size={14} strokeWidth={2.1} />
          {t("catAll")}
        </button>
        {categories.map((c) => {
          const Icon = ICON_MAP[c.icon] || LayoutGrid;
          return (
            <button
              key={c.slug}
              className={`ab-pill ${cat === c.slug ? "active" : ""}`}
              onClick={() => setCat(c.slug)}
            >
              <Icon size={14} strokeWidth={2.1} />
              {c.label}
            </button>
          );
        })}
      </Reveal>
      <div className="ab-grid">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <TicketCard p={p} onAdd={onAdd} t={t} reviews={reviews} onOpenReviews={onOpenReviews} go={go} />
          </Reveal>
        ))}
        {filtered.length === 0 && <p style={{ color: "var(--muted)" }}>{t("noProductsInCategory")}</p>}
      </div>
      <AdSlot label="Paketlər" />
      <Reveal>
        <FaqAccordion t={t} />
      </Reveal>
    </section>
  );
}

function NeceIsleyirPage({ t }) {
  const steps = [
    { n: "01", title: t("step1Title"), text: t("step1Text") },
    { n: "02", title: t("step2Title"), text: t("step2Text") },
    { n: "03", title: t("step3Title"), text: t("step3Text") },
  ];
  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker={t("howKicker")} title={t("howTitle")} sub={t("howSub")} />
      <div className="ab-steps">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div className="ab-step">
              <span className="ab-step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function EtibarPage({ t }) {
  const items = [
    { icon: Shield, title: t("trust1Title"), text: t("trust1Text") },
    { icon: Clock, title: t("trust2Title"), text: t("trust2Text") },
    { icon: MessageCircle, title: t("trust3Title"), text: t("trust3Text") },
  ];
  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker={t("trustKicker")} title={t("trustTitleWhy")} />
      <div className="ab-trust">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 90}>
            <div className="ab-trust-item">
              <it.icon size={22} strokeWidth={1.75} />
              <div>
                <h4>{it.title}</h4>
                <p>{it.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ElaqePage({ settings, t }) {
  const rawNumber = settings.contact_whatsapp || "517873090";
  const digits = rawNumber.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${digits}`;

  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker={t("contactKicker")} title={t("contactTitle")} sub={t("contactSub")} />
      <div className="ab-contact-grid">
        <Reveal>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="ab-contact-card">
            <MessageCircle size={22} strokeWidth={1.75} />
            <div>
              <h4>WhatsApp</h4>
              <p>{t("contactCardText")}</p>
            </div>
            <ChevronRight size={16} className="ab-contact-arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function AdSlot({ label }) {
  return (
    <Reveal className="ab-ad-slot">
      <div className="ab-ad-slot-tag">REKLAM YERİ{label ? ` · ${label}` : ""}</div>
      <div className="ab-ad-slot-text">Burada sizin reklamınız ola bilər</div>
      <div className="ab-ad-slot-sub">Reklam sifarişi üçün bizimlə əlaqə saxlayın</div>
    </Reveal>
  );
}

function CtaBanner({ go, t }) {
  return (
    <Reveal className="ab-cta">
      <div>
        <h3>{t("ctaTitle")}</h3>
        <p>{t("ctaSub")}</p>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="ab-btn ab-btn-gold" onClick={() => go("elaqe")}>
          <MessageCircle size={16} /> WhatsApp
        </button>
      </div>
    </Reveal>
  );
}

function recommendationMessage(p) {
  const name = (p.name || "").toLowerCase();
  if (name.includes("youtube")) return "Bəlkə YouTube-da reklamlardan azad olarsınız?";
  if (name.includes("spotify") || name.includes("music") || name.includes("musiqi")) return "Musiqini də reklamsız dinləməyə nə deyirsiniz?";
  if (name.includes("netflix") || name.includes("disney") || name.includes("apple tv")) return "Bunu da izləmə siyahınıza əlavə edin?";
  if (name.includes("chatgpt") || name.includes("ai")) return "İşinizi asanlaşdıra biləcək başqa bir alət də var:";
  return "Bunu da sınamaq istərdinizmi?";
}

function CartRecommendationCard({ p, onAdd, go }) {
  const [months, setMonths] = useState(p.has_duration_options && p.duration_options?.length ? p.duration_options[0].months : null);
  const activeVariant = p.has_duration_options ? (p.duration_options || []).find((d) => d.months === months) : null;
  const price = activeVariant ? activeVariant.price : p.price;

  function handleAdd() {
    if (p.has_duration_options) {
      go && go("mehsul-" + p.id);
      return;
    }
    onAdd(p);
  }

  return (
    <div className="ab-cross-card">
      <div className="ab-cross-msg">{recommendationMessage(p)}</div>
      <div className="ab-cross-body">
        {p.image_url && <div className="ab-cross-img" style={{ backgroundImage: `url(${p.image_url})` }} />}
        <div className="ab-cross-info">
          <div className="ab-cross-name">{p.name}</div>
          {p.has_duration_options && p.duration_options?.length > 0 ? (
            <div className="ab-cross-durations">
              {p.duration_options.map((d) => (
                <button
                  key={d.months}
                  className={`ab-duration-pill ${months === d.months ? "active" : ""}`}
                  onClick={() => setMonths(d.months)}
                  style={{ padding: "5px 10px", fontSize: 12 }}
                >
                  {d.months} ay <span>{d.price} ₼</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="ab-cross-price">{price} ₼</div>
          )}
        </div>
        <button className="ab-btn ab-btn-ghost" onClick={handleAdd}>
          <Plus size={14} /> Əlavə et
        </button>
      </div>
    </div>
  );
}

const PROMO_CODE = "sky2manat";
const PROMO_MIN = 10;
const PROMO_DISCOUNT = 2;
const PAY_CARD_NAME = "Elbrus Allahverdiyev";
const PAY_CARD_BANK = "Kapital Bank";
const PAY_CARD_NUMBER = "4169742323992731";

function formatCardNumber(num) {
  return num.replace(/(.{4})/g, "$1 ").trim();
}

function SebetPage({ cart, updateQty, removeFromCart, settings, t, products, onAdd, go }) {
  const [session, setSession] = useState(null);
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [promoApplying, setPromoApplying] = useState(false);
  const [promoUses, setPromoUses] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  function localPromoKey(uid) {
    return `skyflix_promo_uses_${uid}`;
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        let localCount = 0;
        try {
          localCount = parseInt(localStorage.getItem(localPromoKey(data.session.user.id)) || "0", 10) || 0;
        } catch {}
        supabase
          .from("profiles")
          .select("promo_uses")
          .eq("id", data.session.user.id)
          .maybeSingle()
          .then(({ data: prof }) => {
            const dbCount = prof?.promo_uses || 0;
            setPromoUses(Math.max(dbCount, localCount));
          });
      }
    });
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.qty, 0);
  const discount = promoApplied && subtotal >= PROMO_MIN ? PROMO_DISCOUNT : 0;
  const total = Math.max(subtotal - discount, 0);
  const remainingForPromo = Math.max(PROMO_MIN - subtotal, 0);

  async function applyPromo() {
    setPromoError("");
    if (!session) {
      setPromoError("Promokod tətbiq etmək üçün hesabınıza daxil olun.");
      return;
    }
    if (promoInput.trim().toLowerCase() !== PROMO_CODE) {
      setPromoError("Promokod düzgün deyil.");
      return;
    }
    if (subtotal < PROMO_MIN) {
      setPromoError(`Endirim üçün minimum ${PROMO_MIN} ₼-lıq məhsul seçməlisiniz. Daha ${remainingForPromo.toFixed(2)} ₼ qaldı!`);
      return;
    }
    if (promoUses >= 3) {
      setPromoError("Bu promokoddan artıq 3 dəfə istifadə etmisiniz. Daha çox istifadə edə bilməzsiniz.");
      return;
    }
    setPromoApplying(true);
    const { data: newCount, error } = await supabase.rpc("use_promo_code");
    setPromoApplying(false);
    if (error) {
      setPromoError("Bu promokoddan artıq 3 dəfə istifadə etmisiniz. Daha çox istifadə edə bilməzsiniz.");
      setPromoUses(3);
      try {
        localStorage.setItem(localPromoKey(session.user.id), "3");
      } catch {}
      return;
    }
    const finalCount = typeof newCount === "number" ? newCount : promoUses + 1;
    setPromoUses(finalCount);
    try {
      localStorage.setItem(localPromoKey(session.user.id), String(finalCount));
    } catch {}
    setPromoApplied(true);
  }

  const rawNumber = settings.contact_whatsapp || "517873090";
  const digits = rawNumber.replace(/[^0-9]/g, "");
  const lines = cart.map(
    (item) => `- ${item.name} x${item.qty} — ${(parseFloat(item.price) * item.qty).toFixed(2)} ₼`
  );
  const orderSummary = lines.join("\n") + (discount > 0 ? `\n\nEndirim (${PROMO_CODE.toUpperCase()}): -${discount.toFixed(2)} ₼` : "") + `\n\nCəmi: ${total.toFixed(2)} ₼`;

  const orderMessage = `Salam! Sifariş etmək istəyirəm:\n${orderSummary}`;
  const orderWaLink = `https://wa.me/${digits}?text=${encodeURIComponent(orderMessage)}`;

  const paidMessage = `Salam! Mən aşağıdakı sifariş üçün ${total.toFixed(2)} ₼ məbləğini bu karta (${PAY_CARD_BANK}, ${PAY_CARD_NAME}) saytınız vasitəsilə ödədim. Qəbzi göndərirəm. Sifarişimi təsdiq edin:\n${orderSummary}`;
  const paidWaLink = `https://wa.me/${digits}?text=${encodeURIComponent(paidMessage)}`;

  function logOrder() {
    supabase.from("orders").insert({ user_id: session?.user?.id || null, customer_email: session?.user?.email || null, items: cart, total: total }).then(() => {});
  }

  function copyCard() {
    navigator.clipboard.writeText(PAY_CARD_NUMBER).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (cart.length === 0) {
    return (
      <section className="ab-section ab-page-pad">
        <PageHead kicker={t("cartKicker")} title={t("cartEmptyTitle")} sub={t("cartEmptySub")} />
      </section>
    );
  }

  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker={t("cartKicker")} title={t("cartTitle")} sub={t("cartSub")} />

      {!promoApplied && subtotal < PROMO_MIN && (
        <div className="ab-promo-progress">
          <Tag size={15} />
          Endirimi əldə etməyə son <strong>{remainingForPromo.toFixed(2)} ₼</strong> qaldı!
        </div>
      )}
      {promoApplied && (
        <div className="ab-promo-progress ab-promo-progress-active">
          <CheckCircle2 size={15} />
          <strong>{PROMO_CODE.toUpperCase()}</strong> promokodu tətbiq olundu — {PROMO_DISCOUNT} ₼ endirim qazandınız!
        </div>
      )}

      <div className="ab-cart-list">
        {cart.map((item) => (
          <div className="ab-cart-row" key={item.cartKey || item.id}>
            <div className="ab-cart-info">
              <div className="ab-cart-name">{item.name}</div>
              <div className="ab-cart-unit">
                {item.price} ₼ /{item.period}
              </div>
            </div>
            <div className="ab-cart-qty">
              <button onClick={() => updateQty(item.cartKey || item.id, item.qty - 1)} aria-label="Azalt">
                <Minus size={13} />
              </button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.cartKey || item.id, item.qty + 1)} aria-label="Artır">
                <Plus size={13} />
              </button>
            </div>
            <div className="ab-cart-linetotal">{(parseFloat(item.price) * item.qty).toFixed(2)} ₼</div>
            <button className="ab-cart-remove" onClick={() => removeFromCart(item.cartKey || item.id)} aria-label="Sil">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {!promoApplied && (
        <div className="ab-promo-box">
          <input
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Promokod daxil edin"
            disabled={promoUses >= 3}
          />
          <button className="ab-btn ab-btn-ghost" onClick={applyPromo} disabled={promoApplying || promoUses >= 3}>
            {promoApplying ? "Yoxlanılır..." : "Tətbiq et"}
          </button>
        </div>
      )}
      {!promoApplied && promoUses > 0 && promoUses < 3 && (
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>Qalan istifadə haqqınız: {3 - promoUses} / 3</p>
      )}
      {promoError && <p className="ad-error" style={{ marginTop: 8 }}>{promoError}</p>}

      <div className="ab-cart-summary">
        <div className="ab-cart-total-row">
          <span>Ara cəmi</span>
          <span>{subtotal.toFixed(2)} ₼</span>
        </div>
        {discount > 0 && (
          <div className="ab-cart-total-row ab-cart-discount-row">
            <span>Endirim</span>
            <span>-{discount.toFixed(2)} ₼</span>
          </div>
        )}
        <div className="ab-cart-total-row">
          <span>{t("cartTotal")}</span>
          <span className="ab-cart-total">{total.toFixed(2)} ₼</span>
        </div>

        {!showPayment ? (
          <button className="ab-btn ab-btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={() => setShowPayment(true)}>
            <CreditCard size={16} /> Ödəniş et
          </button>
        ) : (
          <div className="ab-pay-card">
            <div className="ab-pay-card-head">
              <CreditCard size={18} /> Kart məlumatları
            </div>
            <div className="ab-pay-card-row">
              <span>Kart sahibi</span>
              <strong>{PAY_CARD_NAME}</strong>
            </div>
            <div className="ab-pay-card-row">
              <span>Bank</span>
              <strong>{PAY_CARD_BANK}</strong>
            </div>
            <div className="ab-pay-card-row">
              <span>Kart nömrəsi</span>
              <div className="ab-pay-card-number">
                <strong>{formatCardNumber(PAY_CARD_NUMBER)}</strong>
                <button onClick={copyCard} aria-label="Kopyala">
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            <div className="ab-pay-card-row ab-pay-card-total">
              <span>Ödəniləcək məbləğ</span>
              <strong>{total.toFixed(2)} ₼</strong>
            </div>
            <p className="ab-pay-instructions">
              Yuxarıdakı kart nömrəsinə göstərilən məbləği köçürün. Ödənişi etdikdən sonra aşağıdakı düyməyə basaraq qəbzi WhatsApp üzərindən bizə göndərin — sifarişiniz təsdiqləndikdən sonra hesablarınız hazırlanıb göndəriləcək.
            </p>
            <a
              href={paidWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ab-btn ab-btn-gold"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={logOrder}
            >
              <MessageCircle size={16} /> Ödədim, qəbzi göndər
            </a>
          </div>
        )}
      </div>

      {products && products.length > 0 && (() => {
        const cartIds = new Set(cart.map((i) => i.id));
        const recs = products.filter((p) => !cartIds.has(p.id)).slice(0, 2);
        if (recs.length === 0) return null;
        return (
          <div className="ab-cross-sell">
            <h3 className="ad-section-title" style={{ marginTop: 40 }}>Bunlar da xoşunuza gələ bilər</h3>
            <div className="ab-cross-list">
              {recs.map((p) => (
                <CartRecommendationCard key={p.id} p={p} onAdd={onAdd} go={go} />
              ))}
            </div>
          </div>
        );
      })()}
    </section>
  );
}

const RULE_GROUPS_AZ = [
  {
    heading: "Sifariş, Məhsul və Geri Ödəniş Qaydaları",
    items: [
      { n: "1.0", text: "Sifariş, satıcı ödənişi təsdiq etdikdən sonra 24 saat ərzində müştəriyə çatdırılır." },
      { n: "1.1", text: "Sifarişlərin sıx olduğu zamanlar çatdırılmada gecikmələr yaşana bilər. Gecikmə maksimum 3 iş günü təşkil edə bilər. Bu müddətdən sonra müştəri ödənişi geri tələb edə bilər." },
      { n: "1.2", text: "Sifarişlər sıra ilə çatdırılır. Müştəri sifariş verdikdən dərhal sonra hesabın gec çatdırılması ilə bağlı narazılıq bildirib ödənişi geri tələb edə bilməz. Yalnız 1.0 və 1.1 bəndlərində qeyd edilən müddət keçdikdən sonra ödənişi geri tələb edə bilər." },
      { n: "1.3", text: "18 yaşından aşağı şəxslərin bizdən alış-veriş etməsi qadağandır. Ailə üzvünün kart məlumatlarından icazəsiz istifadə edərək bizə aid hesablara ödəniş etməsinə görə məsuliyyət daşımırıq." },
      { n: "1.4", text: "Satılan məhsullar rəqəmsal olduğuna görə, istisna hallar xaricində geri ödəniş edilmir. Abunəlik aktiv olduğu halda, müştərinin cihazı və ya digər xarici səbəblərlə əlaqədar hesabdan istifadə edə bilmədiyi hallarda ödəniş geri qaytarılmır. Belə hallarda müştəriyə hesabla bağlı sübut göndərilir. İstisna hallarda, qeyd edilən abunəlik müddəti təmin edilə bilmirsə, istifadə olunan hissə çıxılmaqla qalan məbləğ geri qaytarılır." },
      { n: "1.5", text: "Bəzi məhsullar ortaq hesab şəklində olduğuna görə, onlar üzrə ödənişin geri qaytarılması həyata keçirilmir." },
      { n: "1.6", text: "Məhsullarımız qlobal xarakter daşıyır, lakin bəzi ölkələrdə müxtəlif səbəblərdən bəzi məhsullardan istifadə mümkün olmur. Müştəri bundan xəbərsiz olsa belə, ya da yalnız yoxlamaq məqsədilə alıb sonra geri ödəniş tələb edə bilməz." },
      { n: "1.7", text: "Müştəri, sifarişindən öncə əlavə ödəniş (2.99 AZN) edərək sifarişini VIP sıraya çəkib tezləşdirə bilər." },
      { n: "1.8", text: "1.7-ci bənddə qeyd olunan VIP sıra imkanı Netflix, BluTv, Disney+, Amazon Prime Video və Duolingo Plus məhsullarına şamil edilir." },
      { n: "1.9", text: "Bizə aid bank kartlarına səhvən ödəniş göndərildikdə, məbləğdən asılı olmayaraq geri ödəniş tələb olunarsa, 2 AZN komissiya çıxılaraq qalan məbləğ geri göndərilir." },
    ],
  },
  {
    heading: "Ödəniş Qaydaları",
    items: [
      { n: "2.0", text: "Sizə göstərilən kart hesabından fərqli bir hesaba ödəniş edilərsə, ödəniş qəbul olunmayacaq. Köhnə bank hesablarına edilən ödənişlər qəbul edilmir. Göstərilən hesaba ödəniş edilənə qədər sifariş çatdırılmır." },
      { n: "2.1", text: "Ödənişdən sonra 24 saat ərzində qəbzin şəkli bizə göndərilməlidir. Bu müddət keçərsə, ödəniş təsdiqlənməyəcək və sifariş çatdırılmayacaq." },
      { n: "2.2", text: "Terminal vasitəsilə ödəniş zamanı qəbz verilmirsə, müvafiq terminal şirkəti ilə əlaqə saxlayıb qəbzin elektron nüsxəsini 24 saat ərzində tələb edib bizə göndərməlisiniz. Bu vəziyyətlə qarşılaşan müştəri 3 gün ərzində qəbz təqdim etmirsə, sifariş qeydə alınmır və ödəniş təsdiqlənmir." },
    ],
  },
  {
    heading: "Məhsul Qaydaları",
    items: [
      { n: "2.3", text: "FaceApp yalnız iOS cihazları (məsələn, iPhone) ilə uyğundur. Bu məhsul üçün öz iCloud hesabınızdan çıxıb bizim hesabımıza daxil olmalı, sonra öz hesabınıza geri qayıtmalısınız. iCloud dəyişimi zamanı itirilən şəkil və ya digər məlumatlara görə məsuliyyət daşımırıq. Ödənişdən sonra yaranan yaddaş dolması, ehtiyat nüsxənin alınmaması və bənzər problemlərə görə də məsuliyyət daşınmır, buna görə geri ödəniş edilmir. FaceApp Android cihazları ilə uyğun deyil; Android istifadəçisi ödənişdən sonra geri ödəniş tələb edə bilməz. Ortaq istifadə olunan digər məhsullarımıza ChatGPT, Prime Video, BluTv, Exxen, Disney+, Netflix, PC oyunları və MUBI daxildir. Disney+ abunəliyi Azərbaycanda aktiv olmadığından, yalnız VPN vasitəsilə istifadə oluna bilər." },
      { n: "2.4", text: "Ortaq istifadə olunan məhsullardakı otaq (room) formatı fərdi şəkildə təqdim olunmur. YouTube Premium-un hədiyyə şəklində verilən paylaşımlı hesabında baş verən əməliyyatlara görə məsuliyyət daşınmır, eləcə də cihaz sıfırlanması və digər xarici proseslərə görə heç bir məsuliyyət qəbul edilmir. Müştəri, ödənişdən əvvəl mağaza qaydalarının təqdim edilməsi əsasında bütün qaydaları qəbul edərək hesaba daxil olur." },
      { n: "2.5", text: "2.3-cü bəndə əsasən, təqdim olunan hesabların e-poçtunu, şifrəsini, otaq adını, otaq şifrəsini və otaq dilini dəyişdirmək qadağandır." },
      { n: "2.6", text: "Spotify, Canva və Duolingo Plus hesabları müştəriyə fərdi məxsus olur. 33 AZN dəyərində olan YouTube Premium hesabı tərəfimizdən təqdim olunur və hər ay, ya da hər iki aydan bir yenilənir." },
      { n: "2.7", text: "Bizdən alınan məhsullar 1 nəfərlik istifadə üçün nəzərdə tutulub. İkinci şəxsə verilməsi qadağandır. Netflix, BluTv, Prime Video, Storytel, YouTube Premium və digər bütün streaming abunəliklərinə yalnız 1 nəfər daxil ola bilər. Dosta, tanışa və ya ailə üzvünə vermək qəti qadağandır. Sifariş qəbul edilib hesab təhvil verildikdən sonra bu qaydaya əsasən ödənilən məbləğ geri qaytarılmır." },
    ],
  },
  {
    heading: "Mağaza Qaydaları",
    items: [
      { n: "2.8", text: "Səbəbindən asılı olmayaraq, satıcı ilə ünsiyyət zamanı qeyri-etik ifadələr işlədilməsi halında abunəlik dayandırılır, ödənilmiş məbləğ bloklanır və müştəri mağazadan ömürlük uzaqlaşdırılır. Alınan məhsulda problem yaranarsa, iş saatları çərçivəsində (hər gün 12:00–00:00) 7 iş günü ərzində problem həll olunmadığı halda, istifadə edilən müddət çıxılmaqla qalan məbləğ geri qaytarılır." },
      { n: "2.9", text: "Saxta qəbz təqdim edərək fırıldaqçılıq fəaliyyəti ilə məşğul olan müştərilər mağazadan ömürlük uzaqlaşdırılır." },
      { n: "3.0", text: "Ödənişini vaxtında etməyən müştərilərin abunəliyi əvvəlcədən xəbərdarlıq edilmədən dayandırılır." },
      { n: "3.1", text: "Satın alınmış hesabları oğurlayan şəxslər mağazadan uzaqlaşdırılır və onlara aid bütün məlumatlar (ad, soyad, bank hesabı) müvafiq dövlət qurumlarına təqdim olunaraq hüquqi tədbir görülür." },
      { n: "3.2", text: "Ortaq hesablarda digər müştəriləri narahat edəcək davranışa yol verən müştəri mağazadan ömürlük uzaqlaşdırılır və ödənişi bloklanır." },
    ],
  },
  {
    heading: "Netflix Otaq Qaydaları",
    items: [
      { n: "N.1", text: "Otağın adını, şifrəsini və ya şəklini dəyişdirmək qadağandır. Sizə verilən otaq daxil olmaqla, heç bir otağın məlumatı dəyişdirilməməlidir." },
      { n: "N.2", text: "Aldığınız hesab 1 nəfərlik istifadə üçündür. Onun ailə üzvünüzə, dostunuza və ya digər hər hansı şəxsə verilməsi qadağandır. Bu, sistem tərəfindən izlənilir və aşkarlandığı an hesabdan çıxarılırsınız." },
      { n: "N.3", text: "Yalnız özünüzə aid cihazlardan qoşularaq, eyni anda birdən çox cihazda baxmamaq şərtilə izləyə bilərsiniz. Televizorda film açıqdırsa, eyni zamanda telefondan da daxil olub baxmaq qadağandır — yalnız 1 cihaz eyni anda aktiv ola bilər." },
      { n: "N.4", text: "Otağın menyu dili yalnız Türk dilində olmalıdır. Menyu dilini Rus, İngilis və ya başqa bir dilə dəyişdirmək qadağandır." },
    ],
  },
];

const RULE_GROUPS_EN = [
  {
    heading: "Order, Product and Refund Rules",
    items: [
      { n: "1.0", text: "Orders are delivered to the customer within 24 hours after the seller confirms payment." },
      { n: "1.1", text: "During high-demand periods, delivery may be delayed. The delay may reach a maximum of 3 business days. Only after this period has passed may the customer request a refund." },
      { n: "1.2", text: "Orders are delivered in sequence. A customer may not complain about delivery being slow and demand a refund immediately after placing an order. A refund may only be requested once the periods stated in items 1.0 and 1.1 have passed." },
      { n: "1.3", text: "Purchases by individuals under 18 years of age are prohibited. We are not responsible if a family member uses card details without authorization to make payments to our accounts." },
      { n: "1.4", text: "As the products sold are digital, refunds are not issued except in explicitly stated cases. If a subscription is active and the customer is unable to use the account due to their own device or other external causes, the payment is not refunded. In such cases, proof related to the account is sent to the customer. In exceptional cases where the stated subscription period cannot be honored, the remaining amount is refunded after deducting the portion already used." },
      { n: "1.5", text: "Because some products are shared-account products, refunds are not issued for them." },
      { n: "1.6", text: "Our products are global in nature, but in some countries certain products may be unavailable for various reasons. Even if the customer was unaware of this, or purchased solely to test it, they may not subsequently demand a refund." },
      { n: "1.7", text: "Before placing an order, a customer may pay an additional fee (2.99 AZN) to move their order into the VIP queue and have it expedited." },
      { n: "1.8", text: "The VIP queue option referred to in item 1.7 applies to Netflix, BluTv, Disney+, Amazon Prime Video and Duolingo Plus." },
      { n: "1.9", text: "If a payment is mistakenly sent to one of our bank cards, and a refund is requested regardless of the amount, a 2 AZN commission is deducted and the remaining amount is returned." },
    ],
  },
  {
    heading: "Payment Rules",
    items: [
      { n: "2.0", text: "Payments made to an account other than the one shown to you will not be accepted. Payments to old bank accounts are not accepted. The order will not be delivered until payment is made to the account shown." },
      { n: "2.1", text: "A photo of the receipt must be sent to us within 24 hours of payment. If this period passes, the payment will not be confirmed and the order will not be delivered." },
      { n: "2.2", text: "If a terminal does not issue a receipt at the time of payment, you must contact the relevant terminal company and request an electronic copy of the receipt, then send it to us within 24 hours. If a customer in this situation does not provide a receipt within 3 days, the order will not be registered and the payment will not be confirmed." },
    ],
  },
  {
    heading: "Product Rules",
    items: [
      { n: "2.3", text: "FaceApp is only compatible with iOS devices (e.g., iPhone). For this product you must sign out of your own iCloud account, sign in to ours, and afterward sign back in to your own account. We are not responsible for photos or other data lost during the iCloud switch. We are also not responsible for issues arising after payment such as storage becoming full or a backup not being taken, and no refund is issued for such issues. FaceApp is not compatible with Android devices; an Android user may not request a refund after payment. Our other shared-use products include ChatGPT, Prime Video, BluTv, Exxen, Disney+, Netflix, PC games, and MUBI. Because Disney+ is not officially active in Azerbaijan, it can only be used via VPN." },
      { n: "2.4", text: "The \"room\" format found in our shared-use products is not provided individually. We bear no responsibility for actions taken within a shared YouTube Premium account provided as a gift, nor for device resets or other external processes. By agreeing to the store rules provided before payment, the customer accepts all rules upon logging into the account." },
      { n: "2.5", text: "Per item 2.3, changing the email, password, room name, room password, or room language of the accounts provided is prohibited." },
      { n: "2.6", text: "Spotify, Canva, and Duolingo Plus accounts are provided to the customer individually. The YouTube Premium account, valued at 33 AZN, is provided by us and is renewed either monthly or every two months." },
      { n: "2.7", text: "Products purchased from us are intended for use by one person. Passing them on to a second person is prohibited. Only one person may access Netflix, BluTv, Prime Video, Storytel, YouTube Premium, and all other streaming subscriptions. Giving access to a friend, acquaintance, or family member is strictly prohibited. Once an order has been accepted and the account handed over, amounts paid under this rule are not refunded." },
    ],
  },
  {
    heading: "Store Rules",
    items: [
      { n: "2.8", text: "Regardless of the reason, using unethical language when communicating with the seller results in the subscription being suspended, the amount paid being blocked, and the customer being permanently removed from the store. If a purchased product has an issue, and it is not resolved within 7 business days (business hours: daily 12:00–00:00), the remaining amount is refunded after deducting the portion of the period already used." },
      { n: "2.9", text: "Customers who engage in fraudulent activity by submitting a fake receipt are permanently removed from the store." },
      { n: "3.0", text: "The subscriptions of customers who do not make their payments on time are suspended without prior warning." },
      { n: "3.1", text: "Individuals who steal purchased accounts are removed from the store, and all information related to them (name, surname, bank account) is submitted to the relevant government authorities and legal action is pursued." },
      { n: "3.2", text: "A customer who engages in behavior on shared accounts that disturbs other customers is permanently removed from the store and their payment is blocked." },
    ],
  },
  {
    heading: "Netflix Room Rules",
    items: [
      { n: "N.1", text: "Changing the room's name, password, or picture is prohibited. No information for any room, including the one assigned to you, should be changed." },
      { n: "N.2", text: "The account you purchase is for use by one person. Giving it to a family member, friend, or any other person is prohibited. This is monitored by the system, and you will be removed from the account the moment it is detected." },
      { n: "N.3", text: "You may watch only from devices belonging to you, provided you do not watch on more than one device at the same time. If a film is playing on the TV, logging in and watching from a phone at the same time is prohibited — only 1 device may be active at a time." },
      { n: "N.4", text: "The room's menu language must be Turkish only. Changing the menu language to Russian, English, or any other language is prohibited." },
    ],
  },
];

const RULE_GROUPS_KA = [
  {
    heading: "შეკვეთის, პროდუქტისა და თანხის დაბრუნების წესები",
    items: [
      { n: "1.0", text: "შეკვეთა მომხმარებელს ბარდება გამყიდველის მიერ გადახდის დადასტურებიდან 24 საათის განმავლობაში." },
      { n: "1.1", text: "დატვირთვის პერიოდში მიწოდება შეიძლება დაგვიანდეს. დაგვიანება შეიძლება იყოს მაქსიმუმ 3 სამუშაო დღე. მხოლოდ ამ ვადის გასვლის შემდეგ შეუძლია მომხმარებელს მოითხოვოს თანხის დაბრუნება." },
      { n: "1.2", text: "შეკვეთები სრულდება რიგითობის მიხედვით. მომხმარებელს არ შეუძლია, შეკვეთის განთავსებისთანავე, გამოთქვას უკმაყოფილება ანგარიშის დაგვიანებით მიწოდებაზე და მოითხოვოს თანხის დაბრუნება. თანხის დაბრუნება შესაძლებელია მხოლოდ 1.0 და 1.1 პუნქტებში მითითებული ვადის გასვლის შემდეგ." },
      { n: "1.3", text: "18 წლამდე პირების მიერ ჩვენგან შეძენა აკრძალულია. პასუხისმგებლობას არ ვიღებთ, თუ ოჯახის წევრი ბარათის მონაცემებით ნებართვის გარეშე განახორციელებს გადახდას ჩვენს ანგარიშებზე." },
      { n: "1.4", text: "ვინაიდან გაყიდული პროდუქტები ციფრულია, თანხის დაბრუნება არ ხდება, გარდა პირდაპირ მითითებული გამონაკლისი შემთხვევებისა. თუ გამოწერა აქტიურია, მაგრამ მომხმარებელს არ შეუძლია ანგარიშის გამოყენება საკუთარი მოწყობილობის ან სხვა გარეშე მიზეზის გამო, თანხა არ ბრუნდება. ასეთ შემთხვევებში მომხმარებელს ეგზავნება ანგარიშთან დაკავშირებული მტკიცებულება. გამონაკლის შემთხვევებში, თუ მითითებული გამოწერის ვადის უზრუნველყოფა შეუძლებელია, გამოყენებული ნაწილის გამოკლებით დარჩენილი თანხა ბრუნდება." },
      { n: "1.5", text: "ვინაიდან ზოგიერთი პროდუქტი საერთო ანგარიშის ფორმატშია, მათზე თანხის დაბრუნება არ ხორციელდება." },
      { n: "1.6", text: "ჩვენი პროდუქტები გლობალური ხასიათისაა, თუმცა ზოგიერთ ქვეყანაში სხვადასხვა მიზეზით ზოგიერთი პროდუქტის გამოყენება შეუძლებელია. მომხმარებელს, მიუხედავად ამის უცოდინრობისა ან მხოლოდ შემოწმების მიზნით შეძენისა, არ შეუძლია შემდგომში მოითხოვოს თანხის დაბრუნება." },
      { n: "1.7", text: "მომხმარებელს შეუძლია, შეკვეთამდე დამატებითი გადახდით (2.99 AZN), თავისი შეკვეთა გადაიტანოს VIP რიგში და დააჩქაროს." },
      { n: "1.8", text: "1.7 პუნქტში მითითებული VIP რიგის შესაძლებლობა ვრცელდება Netflix, BluTv, Disney+, Amazon Prime Video და Duolingo Plus პროდუქტებზე." },
      { n: "1.9", text: "თუ ჩვენს საბანკო ბარათებზე შეცდომით მოხდა გადარიცხვა და მოთხოვნილია თანხის დაბრუნება, თანხის ოდენობის მიუხედავად, გამოიქვითება 2 AZN საკომისიო და დარჩენილი თანხა ბრუნდება." },
    ],
  },
  {
    heading: "გადახდის წესები",
    items: [
      { n: "2.0", text: "თუ გადახდა მოხდება თქვენთვის მითითებულისგან განსხვავებულ ანგარიშზე, გადახდა არ იქნება მიღებული. ძველ საბანკო ანგარიშებზე გადახდები არ მიიღება. შეკვეთა არ ჩაბარდება, სანამ გადახდა არ განხორციელდება მითითებულ ანგარიშზე." },
      { n: "2.1", text: "გადახდიდან 24 საათის განმავლობაში უნდა გამოგვიგზავნოთ ქვითრის ფოტო. ამ ვადის გასვლის შემდეგ გადახდა არ დადასტურდება და შეკვეთა არ ჩაბარდება." },
      { n: "2.2", text: "თუ ტერმინალით გადახდისას ქვითარი არ გაიცემა, უნდა დაუკავშირდეთ შესაბამის ტერმინალის კომპანიას და 24 საათის განმავლობაში მოითხოვოთ ქვითრის ელექტრონული ასლი, შემდეგ გამოგვიგზავნოთ. თუ მომხმარებელი ასეთ სიტუაციაში 3 დღის განმავლობაში არ წარმოადგენს ქვითარს, შეკვეთა არ დარეგისტრირდება და გადახდა არ დადასტურდება." },
    ],
  },
  {
    heading: "პროდუქტის წესები",
    items: [
      { n: "2.3", text: "FaceApp თავსებადია მხოლოდ iOS მოწყობილობებთან (მაგალითად, iPhone). ამ პროდუქტისთვის საჭიროა გამოხვიდეთ საკუთარი iCloud ანგარიშიდან, შეხვიდეთ ჩვენს ანგარიშზე, შემდეგ კი დაუბრუნდეთ საკუთარ ანგარიშს. პასუხისმგებლობას არ ვიღებთ iCloud-ის შეცვლისას დაკარგულ ფოტოებზე ან სხვა მონაცემებზე. ასევე პასუხისმგებლობას არ ვიღებთ გადახდის შემდეგ წარმოქმნილ პრობლემებზე, როგორიცაა მეხსიერების გავსება ან სარეზერვო ასლის არარსებობა, რის გამოც თანხა არ ბრუნდება. FaceApp არ არის თავსებადი Android მოწყობილობებთან; Android-ის მომხმარებელს გადახდის შემდეგ არ შეუძლია მოითხოვოს თანხის დაბრუნება. ჩვენს სხვა საერთო გამოყენების პროდუქტებში შედის ChatGPT, Prime Video, BluTv, Exxen, Disney+, Netflix, კომპიუტერული თამაშები და MUBI. ვინაიდან Disney+ ოფიციალურად აქტიური არ არის აზერბაიჯანში, მისი გამოყენება შესაძლებელია მხოლოდ VPN-ის საშუალებით." },
      { n: "2.4", text: "საერთო გამოყენების პროდუქტებში არსებული ოთახის ფორმატი ინდივიდუალურად არ გაიცემა. პასუხისმგებლობას არ ვიღებთ საჩუქრად მიღებულ საერთო YouTube Premium ანგარიშში მომხდარ ქმედებებზე, ასევე მოწყობილობის გადატვირთვაზე ან სხვა გარეშე პროცესებზე. მომხმარებელი, გადახდამდე მაღაზიის წესების გაცნობის საფუძველზე, ეთანხმება ყველა წესს ანგარიშზე შესვლისას." },
      { n: "2.5", text: "2.3 პუნქტის შესაბამისად, აკრძალულია მოწოდებული ანგარიშების ელფოსტის, პაროლის, ოთახის სახელის, ოთახის პაროლისა და ოთახის ენის შეცვლა." },
      { n: "2.6", text: "Spotify, Canva და Duolingo Plus ანგარიშები მომხმარებელს ეძლევა ინდივიდუალურად. 33 AZN ღირებულების YouTube Premium ანგარიშს ვაწვდით ჩვენ და განახლდება ყოველთვიურად ან ორ თვეში ერთხელ." },
      { n: "2.7", text: "ჩვენგან შეძენილი პროდუქტები განკუთვნილია ერთი ადამიანის გამოსაყენებლად. მეორე პირზე გადაცემა აკრძალულია. Netflix, BluTv, Prime Video, Storytel, YouTube Premium და ყველა სხვა სტრიმინგ გამოწერაზე წვდომა შეუძლია მხოლოდ ერთ ადამიანს. მეგობრისთვის, ნაცნობისთვის ან ოჯახის წევრისთვის გადაცემა მკაცრად აკრძალულია. შეკვეთის მიღებისა და ანგარიშის გადაცემის შემდეგ, ამ წესის საფუძველზე გადახდილი თანხა არ ბრუნდება." },
    ],
  },
  {
    heading: "მაღაზიის წესები",
    items: [
      { n: "2.8", text: "მიზეზის მიუხედავად, გამყიდველთან კომუნიკაციისას არაეთიკური გამონათქვამების გამოყენების შემთხვევაში გამოწერა შეჩერდება, გადახდილი თანხა დაიბლოკება და მომხმარებელი სამუდამოდ მოიხსნება მაღაზიიდან. თუ შეძენილ პროდუქტს პრობლემა ექმნება და არ მოგვარდება სამუშაო საათებში (ყოველდღე 12:00–00:00) 7 სამუშაო დღის განმავლობაში, გამოყენებული პერიოდის გამოკლებით დარჩენილი თანხა ბრუნდება." },
      { n: "2.9", text: "მომხმარებლები, რომლებიც ყალბი ქვითრის წარდგენით თაღლითურ საქმიანობას ეწევიან, სამუდამოდ მოიხსნებიან მაღაზიიდან." },
      { n: "3.0", text: "მომხმარებელთა გამოწერები, რომლებიც დროულად არ ახორციელებენ გადახდას, წყდება წინასწარი გაფრთხილების გარეშე." },
      { n: "3.1", text: "შეძენილი ანგარიშების მომპარავი პირები მოიხსნებიან მაღაზიიდან და მათთან დაკავშირებული ყველა ინფორმაცია (სახელი, გვარი, საბანკო ანგარიში) გადაეცემა შესაბამის სახელმწიფო ორგანოებს სამართლებრივი ზომების მისაღებად." },
      { n: "3.2", text: "მომხმარებელი, რომელიც საერთო ანგარიშებზე სხვა მომხმარებლების შემაწუხებელ ქცევას გამოავლენს, სამუდამოდ მოიხსნება მაღაზიიდან და მისი გადახდა დაიბლოკება." },
    ],
  },
  {
    heading: "Netflix ოთახის წესები",
    items: [
      { n: "N.1", text: "აკრძალულია ოთახის სახელის, პაროლის ან სურათის შეცვლა. თქვენთვის მინიჭებული ოთახის ჩათვლით, არცერთი ოთახის ინფორმაცია არ უნდა შეიცვალოს." },
      { n: "N.2", text: "თქვენ მიერ შეძენილი ანგარიში განკუთვნილია ერთი ადამიანისთვის. მისი გადაცემა ოჯახის წევრზე, მეგობარზე ან ნებისმიერ სხვა პირზე აკრძალულია. ეს კონტროლდება სისტემის მიერ და გამოვლენის მომენტში ანგარიშიდან ამოგირიცხავენ." },
      { n: "N.3", text: "ყურება შეგიძლიათ მხოლოდ თქვენი საკუთარი მოწყობილობებიდან, იმ პირობით, რომ ერთდროულად ერთზე მეტ მოწყობილობაზე არ უყურებთ. თუ ტელევიზორზე ფილმი მიმდინარეობს, ერთდროულად ტელეფონიდან შესვლა და ყურება აკრძალულია — ერთდროულად აქტიური შეიძლება იყოს მხოლოდ 1 მოწყობილობა." },
      { n: "N.4", text: "ოთახის მენიუს ენა უნდა იყოს მხოლოდ თურქული. მენიუს ენის რუსულზე, ინგლისურზე ან სხვა ენაზე შეცვლა აკრძალულია." },
    ],
  },
];

const RULE_GROUPS_RU = [
  {
    heading: "Правила заказа, товара и возврата средств",
    items: [
      { n: "1.0", text: "Заказ доставляется покупателю в течение 24 часов после подтверждения оплаты продавцом." },
      { n: "1.1", text: "В периоды высокой загруженности доставка может задерживаться. Задержка может составлять максимум 3 рабочих дня. Только по истечении этого срока покупатель может потребовать возврат средств." },
      { n: "1.2", text: "Заказы выполняются по очереди. Покупатель не может, сразу после оформления заказа, выразить недовольство задержкой доставки аккаунта и потребовать возврат средств. Возврат средств возможен только после истечения срока, указанного в пунктах 1.0 и 1.1." },
      { n: "1.3", text: "Покупки лицами младше 18 лет запрещены. Мы не несём ответственности, если член семьи без разрешения использует данные карты для оплаты на наши счета." },
      { n: "1.4", text: "Поскольку продаваемые товары являются цифровыми, возврат средств не производится, за исключением прямо указанных случаев. Если подписка активна, но покупатель не может пользоваться аккаунтом по причине собственного устройства или иных внешних причин, оплата не возвращается. В таких случаях покупателю направляется подтверждение, связанное с аккаунтом. В исключительных случаях, если указанный срок подписки не может быть обеспечен, оставшаяся сумма возвращается за вычетом использованной части." },
      { n: "1.5", text: "Поскольку некоторые товары представляют собой общие аккаунты, возврат средств по ним не производится." },
      { n: "1.6", text: "Наши товары имеют глобальный характер, однако в некоторых странах по разным причинам использование отдельных товаров может быть невозможно. Даже если покупатель не знал об этом, либо приобрёл товар исключительно для проверки, он не может впоследствии требовать возврат средств." },
      { n: "1.7", text: "Покупатель может, до оформления заказа, произвести дополнительную оплату (2.99 AZN), чтобы перевести свой заказ в VIP-очередь и ускорить его выполнение." },
      { n: "1.8", text: "Возможность VIP-очереди, указанная в пункте 1.7, распространяется на Netflix, BluTv, Disney+, Amazon Prime Video и Duolingo Plus." },
      { n: "1.9", text: "Если платёж был ошибочно отправлен на одну из наших банковских карт и запрашивается возврат средств, независимо от суммы, удерживается комиссия в размере 2 AZN, а оставшаяся сумма возвращается." },
    ],
  },
  {
    heading: "Правила оплаты",
    items: [
      { n: "2.0", text: "Если оплата произведена на счёт, отличный от указанного вам, платёж принят не будет. Платежи на старые банковские счета не принимаются. Заказ не будет доставлен до тех пор, пока оплата не поступит на указанный счёт." },
      { n: "2.1", text: "В течение 24 часов после оплаты необходимо прислать нам фото чека. Если этот срок истечёт, оплата не будет подтверждена, и заказ не будет доставлен." },
      { n: "2.2", text: "Если при оплате через терминал чек не выдаётся, необходимо связаться с соответствующей компанией-владельцем терминала и в течение 24 часов запросить электронную копию чека, после чего прислать её нам. Если покупатель в такой ситуации не предоставит чек в течение 3 дней, заказ не будет зарегистрирован, а оплата не будет подтверждена." },
    ],
  },
  {
    heading: "Правила по товарам",
    items: [
      { n: "2.3", text: "FaceApp совместим только с устройствами iOS (например, iPhone). Для использования этого товара необходимо выйти из своего аккаунта iCloud, войти в наш аккаунт, а затем вернуться в свой собственный аккаунт. Мы не несём ответственности за фотографии или иные данные, утерянные при смене iCloud. Мы также не несём ответственности за проблемы, возникшие после оплаты, такие как переполнение памяти или отсутствие резервной копии, в связи с чем возврат средств не производится. FaceApp несовместим с устройствами Android; пользователь Android не может требовать возврат средств после оплаты. К другим товарам совместного использования относятся ChatGPT, Prime Video, BluTv, Exxen, Disney+, Netflix, компьютерные игры и MUBI. Поскольку подписка Disney+ официально не активна в Азербайджане, её можно использовать только через VPN." },
      { n: "2.4", text: "Формат «комнаты», используемый в товарах совместного пользования, не предоставляется индивидуально. Мы не несём ответственности за действия, совершённые в общем аккаунте YouTube Premium, предоставленном в качестве подарка, а также за сброс устройства и иные внешние процессы. Покупатель, ознакомившись с правилами магазина перед оплатой, принимает все правила при входе в аккаунт." },
      { n: "2.5", text: "Согласно пункту 2.3, запрещено изменять электронную почту, пароль, название комнаты, пароль комнаты и язык комнаты предоставленных аккаунтов." },
      { n: "2.6", text: "Аккаунты Spotify, Canva и Duolingo Plus предоставляются покупателю индивидуально. Аккаунт YouTube Premium стоимостью 33 AZN предоставляется нами и обновляется ежемесячно либо раз в два месяца." },
      { n: "2.7", text: "Товары, приобретённые у нас, предназначены для использования одним человеком. Передача второму лицу запрещена. Доступ к Netflix, BluTv, Prime Video, Storytel, YouTube Premium и всем другим стриминговым подпискам может иметь только один человек. Передача другу, знакомому или члену семьи строго запрещена. После принятия заказа и передачи аккаунта сумма, уплаченная согласно этому правилу, не возвращается." },
    ],
  },
  {
    heading: "Правила магазина",
    items: [
      { n: "2.8", text: "Независимо от причины, использование неэтичных выражений при общении с продавцом приводит к приостановке подписки, блокировке уплаченной суммы и постоянному удалению покупателя из магазина. Если с приобретённым товаром возникла проблема и она не была решена в течение 7 рабочих дней (рабочие часы: ежедневно 12:00–00:00), оставшаяся сумма возвращается за вычетом использованного периода." },
      { n: "2.9", text: "Покупатели, занимающиеся мошенничеством путём предоставления поддельного чека, навсегда удаляются из магазина." },
      { n: "3.0", text: "Подписки покупателей, не производящих оплату вовремя, приостанавливаются без предварительного предупреждения." },
      { n: "3.1", text: "Лица, похитившие приобретённые аккаунты, удаляются из магазина, а вся информация о них (имя, фамилия, банковский счёт) передаётся в соответствующие государственные органы для принятия правовых мер." },
      { n: "3.2", text: "Покупатель, допускающий на общих аккаунтах поведение, беспокоящее других покупателей, навсегда удаляется из магазина, а его оплата блокируется." },
    ],
  },
  {
    heading: "Правила комнаты Netflix",
    items: [
      { n: "N.1", text: "Изменение названия, пароля или изображения комнаты запрещено. Информация ни одной комнаты, включая назначенную вам, не должна изменяться." },
      { n: "N.2", text: "Приобретённый вами аккаунт предназначен для использования одним человеком. Передача его члену семьи, другу или любому другому лицу запрещена. Это отслеживается системой, и в момент обнаружения вы будете исключены из аккаунта." },
      { n: "N.3", text: "Вы можете смотреть только со своих собственных устройств, при условии, что не смотрите одновременно более чем на одном устройстве. Если на телевизоре идёт фильм, одновременный вход и просмотр с телефона запрещены — одновременно может быть активно только 1 устройство." },
      { n: "N.4", text: "Язык меню комнаты должен быть только турецким. Изменение языка меню на русский, английский или любой другой язык запрещено." },
    ],
  },
];

function getRuleGroups(lang) {
  if (lang === "en") return RULE_GROUPS_EN;
  if (lang === "ka") return RULE_GROUPS_KA;
  if (lang === "ru") return RULE_GROUPS_RU;
  return RULE_GROUPS_AZ;
}

function ReviewsPage({ reviews, products, t }) {
  const sorted = [...(reviews || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const avg = sorted.length ? sorted.reduce((s, r) => s + r.rating, 0) / sorted.length : 0;

  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker={t("navReviews")} title={t("navReviews")} sub={t("noReviewsYet")} />
      {sorted.length > 0 && (
        <div className="ab-review-summary" style={{ marginBottom: 30 }}>
          <div className="ab-review-avg">{avg.toFixed(1)}</div>
          <div>
            <div className="ab-review-stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={16} fill={n <= Math.round(avg) ? "#E1122A" : "none"} color="#E1122A" strokeWidth={1.5} />
              ))}
            </div>
            <div className="ab-review-count">{sorted.length} {t("reviewsWord")}</div>
          </div>
        </div>
      )}
      <AdSlot label="Rəylər" />
      <div className="ab-reviews-grid">
        {sorted.map((r, i) => {
          const prod = products.find((p) => p.id === r.product_id);
          return (
            <Reveal key={r.id} delay={(i % 6) * 60}>
              <div className="ab-review-card">
                <div className="ab-review-item-head">
                  <span className="ab-review-name">{r.customer_name}</span>
                  <span className="ab-review-verified">
                    <CheckCircle2 size={12} /> {t("verifiedPurchase")}
                  </span>
                </div>
                {prod && <div className="ab-review-product">{prod.name}</div>}
                <div className="ab-review-stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={13} fill={n <= r.rating ? "#E1122A" : "none"} color="#E1122A" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="ab-review-comment">{r.comment}</p>
                {r.admin_reply && (
                  <div className="ab-review-reply">
                    <strong>SkyFlix Azerbaycan:</strong> {r.admin_reply}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
      {sorted.length === 0 && <p style={{ color: "var(--muted)" }}>{t("noReviewsYet")}</p>}
    </section>
  );
}

function QaydalarPage({ t, lang }) {
  const groups = getRuleGroups(lang);
  return (
    <section className="ab-section ab-page-pad">
      <PageHead
        kicker={lang === "en" ? "RULES" : lang === "ka" ? "წესები" : lang === "ru" ? "ПРАВИЛА" : "QAYDALAR"}
        title={lang === "en" ? "Terms of Service and Rules" : lang === "ka" ? "მომსახურების პირობები და წესები" : lang === "ru" ? "Условия обслуживания и правила" : "Xidmət Şərtləri və Qaydalar"}
        sub={t("rulesIntro")}
      />
      <div className="ab-rules-page">
        {groups.map((group, gi) => (
          <Reveal key={gi} delay={gi * 60} className="ab-rule-group">
            <h4 className="ab-rule-group-title">{group.heading}</h4>
            {group.items.map((r, i) => (
              <div className="ab-rule-item" key={i}>
                <span className="ab-rule-num">{r.n}</span>
                <p>{r.text}</p>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RulesModal({ onClose, t, lang }) {
  const groups = getRuleGroups(lang);
  return (
    <div className="ab-modal-overlay" onClick={onClose}>
      <div className="ab-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ab-modal-head">
          <h3>{lang === "en" ? "Terms of Service and Rules" : lang === "ka" ? "მომსახურების პირობები და წესები" : lang === "ru" ? "Условия обслуживания и правила" : "Xidmət Şərtləri və Qaydalar"}</h3>
          <button className="ab-modal-close" onClick={onClose} aria-label="Bağla">
            <X size={18} />
          </button>
        </div>
        <p className="ab-modal-intro">{t ? t("rulesIntro") : "SkyFlix Azerbaycan olaraq bütün müştərilərimiz üçün eyni şəkildə tətbiq olunan qaydalar aşağıda qeyd edilib."}</p>
        <div className="ab-modal-body">
          {groups.map((group, gi) => (
            <div key={gi} className="ab-rule-group">
              <h4 className="ab-rule-group-title">{group.heading}</h4>
              {group.items.map((r, i) => (
                <div className="ab-rule-item" key={i}>
                  <span className="ab-rule-num">{r.n}</span>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="ab-btn ab-btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 18 }} onClick={onClose}>
          {lang === "en" ? "Close" : lang === "ka" ? "დახურვა" : lang === "ru" ? "Закрыть" : "Bağla"}
        </button>
      </div>
    </div>
  );
}

function CustomerAuthPage({ t, lang, settings }) {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showTopUp, setShowTopUp] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }
    supabase
      .from("profiles")
      .select("balance, banned")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => {
        if (data) setProfile(data);
      });
  }, [session]);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(t("loginErrorMsg"));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!agreed) {
      setError(t("agreeError"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }
    if (password.length < 6) {
      setError(t("passwordShort"));
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
      setError(error.message || t("registerGenericError"));
      return;
    }
    if (!data.session) {
      setAwaitingOtp(true);
      setNotice("");
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setOtpError("");
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "signup",
    });
    if (error) {
      setOtpError(t("otpError"));
    } else {
      setAwaitingOtp(false);
    }
  }

  async function handleResendOtp() {
    setOtpSending(true);
    setOtpError("");
    await supabase.auth.resend({ type: "signup", email });
    setOtpSending(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (checking) {
    return (
      <section className="ab-section ab-page-pad">
        <p>{t("loading")}</p>
      </section>
    );
  }

  if (awaitingOtp) {
    return (
      <section className="ab-section ab-page-pad">
        <div className="ad-login-wrap">
          <PageHead kicker={t("accountKicker")} title={t("otpTitle")} sub={t("otpSub")} />
          <form onSubmit={handleVerifyOtp} className="ad-login">
            <input
              type="text"
              inputMode="numeric"
              maxLength={12}
              placeholder={t("otpPlaceholder")}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              required
              style={{ textAlign: "center", fontSize: 22, letterSpacing: 4, fontFamily: "'JetBrains Mono',monospace" }}
            />
            {otpError && <p className="ad-error">{otpError}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>
              {t("otpButton")}
            </button>
            <button type="button" className="ab-rules-link" onClick={handleResendOtp} disabled={otpSending} style={{ alignSelf: "center", marginTop: 6 }}>
              {t("otpResend")}
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (session) {
    const u = session.user;
    if (profile?.banned) {
      return (
        <section className="ab-section ab-page-pad">
          <div className="ad-login-wrap">
            <PageHead kicker={t("accountKickerMine")} title={t("bannedTitle")} sub={t("bannedText")} />
            <button className="ab-btn ab-btn-ghost" onClick={handleLogout} style={{ marginTop: 18 }}>
              {t("logout")}
            </button>
          </div>
        </section>
      );
    }
    const rawNumber = settings?.contact_whatsapp || "517873090";
    const digits = rawNumber.replace(/[^0-9]/g, "");
    const waLink = `https://wa.me/${digits}`;
    return (
      <section className="ab-section ab-page-pad">
        <div className="ad-login-wrap">
          <PageHead kicker={t("accountKickerMine")} title={t("hello")} sub={u.user_metadata?.full_name || u.email} />
          <div className="ad-settings">
            <label>
              {t("email")}
              <input value={u.email} disabled />
            </label>
            {u.user_metadata?.full_name && (
              <label>
                {t("fullName")}
                <input value={u.user_metadata.full_name} disabled />
              </label>
            )}
          </div>

          <div className="ab-balance-card">
            <div>
              <div className="ab-balance-label">{t("balanceLabel")}</div>
              <div className="ab-balance-amount">{Number(profile?.balance || 0).toFixed(2)} ₼</div>
            </div>
            <button className="ab-btn ab-btn-gold" onClick={() => setShowTopUp((v) => !v)}>
              <Wallet size={16} /> {t("balanceTopUp")}
            </button>
          </div>
          {showTopUp && (
            <div className="ab-topup-note">
              <p>{t("balanceMaintenance")}</p>
              <p>{t("balanceWhatsappNote")}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn-ghost" style={{ marginTop: 10 }}>
                <MessageCircle size={16} /> {t("balanceWhatsappBtn")}
              </a>
            </div>
          )}

          <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 18 }}>{t("ordersNote")}</p>
          <button className="ab-btn ab-btn-ghost" onClick={handleLogout} style={{ marginTop: 18 }}>
            {t("logout")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="ab-section ab-page-pad">
      <div className="ad-login-wrap">
        <PageHead kicker={t("accountKicker")} title={mode === "login" ? t("login") : t("registerBtn")} />
        <div className="ab-cat-pills" style={{ marginBottom: 22 }}>
          <button
            className={`ab-pill ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
              setNotice("");
            }}
          >
            {t("login")}
          </button>
          <button
            className={`ab-pill ${mode === "register" ? "active" : ""}`}
            onClick={() => {
              setMode("register");
              setError("");
              setNotice("");
            }}
          >
            {t("register")}
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="ad-login">
            <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="ad-error">{error}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>
              {t("login")}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="ad-login">
            <input type="text" placeholder={t("fullName")} value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder={t("repeatPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className="ab-agree-row">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>
                <button type="button" className="ab-rules-link" onClick={() => setShowRules(true)}>
                  {t("agreeRules")}
                </button>{" "}
                {t("agreeSuffix")}
              </span>
            </label>
            {error && <p className="ad-error">{error}</p>}
            {notice && <p style={{ color: "var(--teal)", fontSize: 13, margin: 0 }}>{notice}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>
              {t("registerBtn")}
            </button>
          </form>
        )}
      </div>
      {showRules && <RulesModal onClose={() => setShowRules(false)} t={t} lang={lang} />}
    </section>
  );
}

const FAKE_FIRST_NAMES = [
  "Anar", "Rəşad", "Aysel", "Nərmin", "Tural", "Günel", "Elvin", "Ləman",
  "Kamran", "Sevinc", "Orxan", "Aygün", "Murad", "Zeynəb", "Fərid", "Xəyalə",
  "Vüqar", "Nigar", "Elşən", "Səbinə", "Cavid", "Ülviyyə", "Rövşən", "Türkan",
  "Samir", "Aytac", "Kənan", "Gülnar", "İlkin", "Röya", "Vüsal", "Şəbnəm",
  "Emin", "Nazrin", "Ruslan", "Fidan", "Rauf", "Kəmalə", "Nicat", "Aynur",
  "Farid", "Lalə", "Ceyhun", "Vəfa", "Şahin", "Mələk", "Namiq", "Günay",
  "Elnur", "Sona", "Toğrul", "Zöhrə", "Ramin", "Pərviz", "Aydan", "Ayla",
  "Bəxtiyar", "Nərgiz", "Fuad", "İlahə", "Elgün", "Şəms", "Aslan", "Zülfiyyə",
  "Sənan", "Konul", "Mehdi", "Sədaqət", "Xəyal", "Aygerim", "Ravan", "Yeganə",
  "Emil", "Rəna", "Fərrux", "Sadə", "İntiqam", "Diana", "Nihat", "Kifayət",
  "Fərman", "Ayxan", "Zaur", "Nurlan", "Cəmil", "Fatimə", "İsmayıl", "Xatirə",
  "Vahid", "Solmaz", "Rasim", "Sevil", "Elmar", "Nərmin", "Tahir", "Aqşin",
  "Etibar", "Könül", "Hüseyn", "Şəlalə",
];

const FAKE_LAST_NAMES = [
  "Əliyev", "Məmmədov", "Həsənov", "Quliyev", "İbrahimov", "Rəhimov", "Cəfərov", "Vəliyev",
  "Nəbiyev", "Abbasov", "Kərimov", "Süleymanov", "Şirinov", "Novruzov", "Hüseynov", "Bağırov",
  "Mustafayev", "Tağıyev", "Salahov", "Zeynalov", "İsmayılov", "Xəlilov", "Əkbərov", "Sadıqov",
  "Rüstəmov", "Fətullayev", "Orucov", "Babayev", "Dadaşov", "Camalov", "Əhmədov", "Yusifov",
  "Rzayev", "Şükürov", "Piriyev", "Mirzəyev", "Hacıyev", "Talıbov", "Qasımov", "Nağıyev",
  "Əzizov", "Sadıqov", "Cəbrayılov", "İskəndərov", "Vəkilov", "Feyzullayev", "Hümbətov", "Zülfüqarov",
  "Balayev", "Şahbazov", "Qurbanov", "Nəsirov", "Fərəcov", "Xanlarov", "Muradov", "Ramazanov",
  "Cavadov", "Bədəlov", "Şıxəliyev", "Musayev",
];

function maskName(first, last) {
  const maskedLast = last.length <= 2 ? last[0] + "***" : last[0] + "***" + last[last.length - 1] + ".";
  return first + " " + maskedLast;
}

function FakePurchaseWidget({ products }) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!products || products.length === 0) return;
    function showOne() {
      const product = products[Math.floor(Math.random() * products.length)];
      const first = FAKE_FIRST_NAMES[Math.floor(Math.random() * FAKE_FIRST_NAMES.length)];
      const last = FAKE_LAST_NAMES[Math.floor(Math.random() * FAKE_LAST_NAMES.length)];
      setCurrent({ name: maskName(first, last), product: product.name, price: product.price });
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }
    const first = setTimeout(showOne, 4000);
    const interval = setInterval(showOne, 9000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [products]);

  if (!current) return null;

  return (
    <div className={`ab-fake-purchase ${visible ? "show" : ""}`}>
      <div className="ab-fake-purchase-icon">
        <ShoppingCart size={16} />
      </div>
      <div>
        <div className="ab-fake-purchase-name">{current.name}</div>
        <div className="ab-fake-purchase-detail">
          {current.product} — {current.price} ₼
        </div>
      </div>
    </div>
  );
}

function OnlineCounter({ count }) {
  return (
    <div className="ab-online-counter">
      <span className="ab-online-dot" />
      {count} online
    </div>
  );
}

function MessageBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="ab-msg-overlay">
      <div className="ab-msg-box">
        <button className="ab-msg-close" onClick={onDismiss} aria-label="Bağla">
          <X size={20} />
        </button>
        <p>{message.message}</p>
        <button className="ab-btn ab-btn-gold" onClick={onDismiss} style={{ marginTop: 16 }}>
          Anladım
        </button>
      </div>
    </div>
  );
}

function ReviewsModal({ product, reviews, session, t, onClose, onSubmitted }) {
  const [eligible, setEligible] = useState(null);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const productReviews = (reviews || []).filter((r) => r.product_id === product.id);
  const avg = productReviews.length
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;

  useEffect(() => {
    if (!session) {
      setEligible(false);
      return;
    }
    if (productReviews.some((r) => r.user_id === session.user.id)) {
      setAlreadyReviewed(true);
      setEligible(false);
      return;
    }
    supabase
      .from("orders")
      .select("items")
      .eq("user_id", session.user.id)
      .then(({ data }) => {
        const purchased = (data || []).some((o) => (o.items || []).some((it) => it.id === product.id));
        setEligible(purchased);
      });
  }, [session, product.id]);

  async function submitReview() {
    if (!comment.trim()) {
      setError(t("reviewCommentRequired"));
      return;
    }
    setSubmitting(true);
    setError("");
    const name = session.user.user_metadata?.full_name || session.user.email.split("@")[0];
    const { error: err } = await supabase.from("reviews").insert({
      product_id: product.id,
      user_id: session.user.id,
      customer_name: name,
      rating,
      comment: comment.trim(),
    });
    setSubmitting(false);
    if (err) {
      setError(t("reviewGenericError"));
    } else {
      setComment("");
      onSubmitted();
    }
  }

  return (
    <div className="ab-modal-overlay" onClick={onClose}>
      <div className="ab-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ab-modal-head">
          <h3>{product.name}</h3>
          <button className="ab-modal-close" onClick={onClose} aria-label="Bağla">
            <X size={18} />
          </button>
        </div>
        <div className="ab-review-summary">
          <div className="ab-review-avg">{productReviews.length ? avg.toFixed(1) : "—"}</div>
          <div>
            <div className="ab-review-stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={15} fill={n <= Math.round(avg) ? "#E1122A" : "none"} color="#E1122A" strokeWidth={1.5} />
              ))}
            </div>
            <div className="ab-review-count">{productReviews.length} {t("reviewsWord")}</div>
          </div>
        </div>

        <div className="ab-review-list">
          {productReviews.length === 0 && <p className="ab-review-empty">{t("noReviewsYet")}</p>}
          {productReviews.map((r) => (
            <div className="ab-review-item" key={r.id}>
              <div className="ab-review-item-head">
                <span className="ab-review-name">{r.customer_name}</span>
                <span className="ab-review-verified">
                  <CheckCircle2 size={12} /> {t("verifiedPurchase")}
                </span>
              </div>
              <div className="ab-review-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={12} fill={n <= r.rating ? "#E1122A" : "none"} color="#E1122A" strokeWidth={1.5} />
                ))}
              </div>
              <p className="ab-review-comment">{r.comment}</p>
              {r.admin_reply && (
                <div className="ab-review-reply">
                  <strong>SkyFlix Azerbaycan:</strong> {r.admin_reply}
                </div>
              )}
            </div>
          ))}
        </div>

        {eligible === true && (
          <div className="ab-review-form">
            <div className="ab-review-stars ab-review-stars-input">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className="ab-star-btn">
                  <Star size={22} fill={n <= rating ? "#E1122A" : "none"} color="#E1122A" strokeWidth={1.5} />
                </button>
              ))}
            </div>
            <textarea
              placeholder={t("commentPlaceholder")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            {error && <p className="ad-error">{error}</p>}
            <button className="ab-btn ab-btn-gold" onClick={submitReview} disabled={submitting} style={{ justifyContent: "center" }}>
              {t("submitReview")}
            </button>
          </div>
        )}
        {eligible === false && alreadyReviewed && <p className="ab-review-note">{t("alreadyReviewed")}</p>}
        {eligible === false && !alreadyReviewed && session && <p className="ab-review-note">{t("notEligibleReview")}</p>}
        {eligible === false && !session && <p className="ab-review-note">{t("loginToReview")}</p>}
      </div>
    </div>
  );
}

function RunnerGame({ onClose }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem("skyflix_game_best") || "0", 10) || 0;
    } catch {
      return 0;
    }
  });
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  function startGame() {
    setGameOver(false);
    setScore(0);
    setStarted(true);
    stateRef.current = {
      playerY: 0,
      velocity: 0,
      jumping: false,
      obstacles: [],
      coins: [],
      speed: 4.2,
      frame: 0,
      score: 0,
      dead: false,
    };
  }

  function jump() {
    const s = stateRef.current;
    if (!s || s.dead) return;
    if (!s.jumping) {
      s.jumping = true;
      s.velocity = -11;
    }
  }

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const groundY = H - 34;
    let raf;

    function loop() {
      const s = stateRef.current;
      if (!s) return;
      if (!s.dead) {
        s.frame++;
        s.velocity += 0.6;
        s.playerY += s.velocity;
        if (s.playerY > 0) {
          s.playerY = 0;
          s.velocity = 0;
          s.jumping = false;
        }
        if (s.frame % Math.max(28, 60 - Math.floor(s.speed * 3)) === 0) {
          s.obstacles.push({ x: W, w: 16 + Math.random() * 10, h: 24 + Math.random() * 20 });
        }
        if (s.frame % 45 === 0 && Math.random() > 0.4) {
          s.coins.push({ x: W, y: groundY - 60 - Math.random() * 50 });
        }
        s.obstacles.forEach((o) => (o.x -= s.speed));
        s.coins.forEach((c) => (c.x -= s.speed));
        s.obstacles = s.obstacles.filter((o) => o.x > -30);
        s.coins = s.coins.filter((c) => c.x > -30);
        s.speed += 0.0025;
        s.score += 1;

        const playerX = 60;
        const playerSize = 26;
        const playerBottom = groundY + s.playerY;
        s.obstacles.forEach((o) => {
          const ox = o.x;
          if (
            playerX + playerSize > ox &&
            playerX < ox + o.w &&
            playerBottom + playerSize > groundY - o.h + 2
          ) {
            s.dead = true;
          }
        });
        s.coins = s.coins.filter((c) => {
          const hit = Math.abs(c.x - (playerX + playerSize / 2)) < 18 && Math.abs(c.y - (playerBottom + playerSize / 2)) < 22;
          if (hit) s.score += 25;
          return !hit;
        });

        setScore(s.score);
        if (s.dead) {
          setGameOver(true);
          setStarted(false);
          const finalScore = s.score;
          setBest((prevBest) => {
            const nb = Math.max(prevBest, finalScore);
            try {
              localStorage.setItem("skyflix_game_best", String(nb));
            } catch {}
            return nb;
          });
        }
      }

      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#1D0D0E");
      grad.addColorStop(1, "#150708");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 26);
      ctx.lineTo(W, groundY + 26);
      ctx.stroke();

      ctx.fillStyle = "#FFD84D";
      s.coins.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = "#E1122A";
      s.obstacles.forEach((o) => {
        ctx.fillRect(o.x, groundY - o.h + 26, o.w, o.h);
      });

      const px = 60;
      const py = groundY + s.playerY;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(px, py, 26, 26, 6) : ctx.rect(px, py, 26, 26);
      ctx.fill();

      if (!s.dead) {
        raf = requestAnimationFrame(loop);
      }
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  useEffect(() => {
    function onKey(e) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="ab-modal-overlay" onClick={onClose}>
      <div className="ab-game-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ab-modal-close" onClick={onClose} aria-label="Bağla">
          <X size={18} />
        </button>
        <h3 className="ab-game-title">
          <Gamepad2 size={18} /> SkyFlix Qaç-Tullan
        </h3>
        <div className="ab-game-canvas-wrap" onClick={jump} onTouchStart={(e) => { e.preventDefault(); jump(); }}>
          <canvas ref={canvasRef} width={520} height={200} className="ab-game-canvas" />
          {!started && !gameOver && (
            <div className="ab-game-overlay">
              <p>Boşluq (Space) və ya toxunub tullanın</p>
              <button className="ab-btn ab-btn-gold" onClick={startGame}>
                <Play size={15} /> Başla
              </button>
            </div>
          )}
          {gameOver && (
            <div className="ab-game-overlay">
              <p>Oyun bitdi! Xal: {score}</p>
              <button className="ab-btn ab-btn-gold" onClick={startGame}>
                <RotateCw size={15} /> Yenidən başla
              </button>
            </div>
          )}
        </div>
        <div className="ab-game-scores">
          <span>Xal: {score}</span>
          <span>Ən yaxşı: {best}</span>
        </div>
      </div>
    </div>
  );
}

function SpinWheel({ prizes, session, go, onClose }) {
  const [spinsUsed, setSpinsUsed] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  function localSpinKey(uid) {
    return `skyflix_wheel_spins_${uid}`;
  }

  useEffect(() => {
    if (!session) {
      setLoaded(true);
      return;
    }
    let localCount = 0;
    try {
      localCount = parseInt(localStorage.getItem(localSpinKey(session.user.id)) || "0", 10) || 0;
    } catch {}
    supabase
      .from("profiles")
      .select("wheel_spins_used")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        const dbCount = data?.wheel_spins_used || 0;
        const effective = Math.max(dbCount, localCount);
        setSpinsUsed(effective);
        setLoaded(true);
      });
  }, [session]);

  const list = prizes && prizes.length > 0 ? prizes : [];
  const segAngle = list.length > 0 ? 360 / list.length : 0;
  const colors = ["#E1122A", "#8C1620", "#FFD84D", "#E1122A", "#8C1620", "#FFD84D"];

  function handleSpin() {
    if (!session) {
      onClose();
      go("hesab");
      return;
    }
    if (spinning || spinsUsed >= 3 || list.length === 0) return;

    let targetPrize;
    if (spinsUsed < 2) {
      targetPrize = list.find((p) => p.type === "try_again") || list[list.length - 1];
    } else {
      targetPrize = list.find((p) => p.type === "discount" && Number(p.amount) === 2) || list.find((p) => p.type === "discount") || list[0];
    }

    const idx = list.findIndex((p) => p.id === targetPrize.id);
    const targetCenter = idx * segAngle + segAngle / 2;
    const currentMod = ((rotation % 360) + 360) % 360;
    const desiredMod = (360 - targetCenter) % 360;
    let delta = (desiredMod - currentMod + 360) % 360;
    delta += 360 * 5;

    setSpinning(true);
    setResult(null);
    setRotation((prev) => prev + delta);

    setTimeout(async () => {
      setSpinning(false);
      setResult(targetPrize);
      const optimisticCount = spinsUsed + 1;
      setSpinsUsed(optimisticCount);
      try {
        localStorage.setItem(localSpinKey(session.user.id), String(optimisticCount));
      } catch {}
      const { data: newCount, error } = await supabase.rpc("increment_wheel_spin");
      if (!error && typeof newCount === "number" && newCount > optimisticCount) {
        setSpinsUsed(newCount);
        try {
          localStorage.setItem(localSpinKey(session.user.id), String(newCount));
        } catch {}
      }
    }, 4200);
  }

  function copyPromo() {
    navigator.clipboard.writeText(PROMO_CODE.toUpperCase()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="ab-modal-overlay" onClick={onClose}>
      <div className="ab-wheel-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ab-modal-close" onClick={onClose} aria-label="Bağla">
          <X size={18} />
        </button>
        <h3 className="ab-wheel-title">
          <Gift size={18} /> Bəxtini sına!
        </h3>
        <p className="ab-wheel-sub">Çarxı fırlat, endirim promokodu qazan</p>

        <div className="ab-wheel-wrap">
          <div className="ab-wheel-pointer" />
          <div
            className="ab-wheel-disc"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${list
                .map((p, i) => `${colors[i % colors.length]} ${i * segAngle}deg ${(i + 1) * segAngle}deg`)
                .join(", ")})`,
            }}
          >
            {list.map((p, i) => {
              const center = i * segAngle + segAngle / 2;
              return (
                <div key={p.id} className="ab-wheel-label-wrap" style={{ transform: `rotate(${center}deg)` }}>
                  <div className="ab-wheel-label" style={{ transform: `translateX(-50%) rotate(${-center}deg)` }}>
                    {p.image_url && <img src={p.image_url} alt="" />}
                    <span>{p.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {loaded && spinsUsed >= 3 ? (
          <p className="ab-wheel-used-up">Fırlatma haqqınız bitib — hər istifadəçi cəmi 3 dəfə fırlada bilər.</p>
        ) : (
          <button className="ab-btn ab-btn-gold" onClick={handleSpin} disabled={spinning || !loaded} style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
            <RotateCw size={16} /> {spinning ? "Fırlanır..." : "Fırlat"}
          </button>
        )}
        {loaded && spinsUsed < 3 && (
          <p className="ab-wheel-count">Qalan fırlatma haqqınız: {3 - spinsUsed}</p>
        )}

        {result && (
          <div className="ab-wheel-result">
            {result.type === "discount" ? (
              <>
                <p>
                  🎉 Təbriklər! <strong>{result.amount} ₼ endirim</strong> qazandınız!
                </p>
                <div className="ab-wheel-promo-box">
                  <strong>{PROMO_CODE.toUpperCase()}</strong>
                  <button onClick={copyPromo}>{copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}</button>
                </div>
                <p className="ab-wheel-note">Bu kodu səbətdə (minimum {PROMO_MIN} ₼-lıq sifarişdə) tətbiq edin.</p>
              </>
            ) : (
              <p>Bu dəfə uğursuz oldu 😔 Yenidən cəhd edin!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LiveChatButton({ settings }) {
  const rawNumber = settings?.contact_whatsapp || "517873090";
  const digits = rawNumber.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${digits}`;
  return (
    <a href={waLink} target="_blank" rel="noopener noreferrer" className="ab-livechat-btn" title="Canlı Dəstək">
      <MessageCircle size={22} />
      <span className="ab-livechat-pulse" />
    </a>
  );
}

function VideoWidget({ videoId }) {
  const wrapperRef = useRef(null);
  const playerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    function startPlayer() {
      if (startedRef.current) return;
      startedRef.current = true;

      const target = document.createElement("div");
      wrapperRef.current.appendChild(target);

      function createPlayer() {
        playerRef.current = new window.YT.Player(target, {
          videoId,
          playerVars: {
            autoplay: 1,
            mute: 0,
            loop: 1,
            playlist: videoId,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (e) => {
              e.target.playVideo();
            },
          },
        });
      }
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = createPlayer;
      }
    }

    window.addEventListener("click", startPlayer);
    window.addEventListener("touchstart", startPlayer);
    window.addEventListener("keydown", startPlayer);
    window.addEventListener("scroll", startPlayer, { passive: true });

    return () => {
      window.removeEventListener("click", startPlayer);
      window.removeEventListener("touchstart", startPlayer);
      window.removeEventListener("keydown", startPlayer);
      window.removeEventListener("scroll", startPlayer);
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [videoId]);

  return <div ref={wrapperRef} className="ab-video-widget-hidden" />;
}

function AdminPage({ onDataChanged }) {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({
    contact_whatsapp: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    plan: "",
    price: "",
    period: "AY",
    code: "",
    category: "streaming",
    image_url: "",
    description: "",
    discount_percent: "",
  });
  const [status, setStatus] = useState("");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const [balanceInput, setBalanceInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [newCategory, setNewCategory] = useState({ label: "", icon: "LayoutGrid" });
  const [wheelPrizes, setWheelPrizes] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [bulkSubject, setBulkSubject] = useState("");
  const [bulkMessage, setBulkMessage] = useState("");
  const [bulkSending, setBulkSending] = useState(false);
  const [bulkResult, setBulkResult] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadData();
  }, [session]);

  async function loadData() {
    const { data: prod } = await supabase.from("products").select("*").order("sort_order");
    if (prod) setProducts(prod);
    const { data: sett } = await supabase.from("settings").select("*");
    if (sett) {
      const obj = {};
      sett.forEach((s) => (obj[s.key] = s.value));
      setSettings((prev) => ({ ...prev, ...obj }));
    }
    const { data: profs } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (profs) setCustomers(profs);
    const { data: ords } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (ords) setOrders(ords);
    const { data: revs } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (revs) setReviews(revs);
    const { data: cats } = await supabase.from("categories").select("*").order("sort_order");
    if (cats) setCategories(cats);
    const { data: prizes } = await supabase.from("wheel_prizes").select("*").order("sort_order");
    if (prizes) setWheelPrizes(prizes);
    const { count } = await supabase.from("visitor_ips").select("*", { count: "exact", head: true });
    if (typeof count === "number") setVisitorCount(count);
  }

  async function uploadImage(file) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file, { upsert: true });
    if (error) {
      flash("Şəkil yüklənmədi: " + error.message);
      return null;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleExistingImageFile(id, file) {
    if (!file) return;
    flash("Şəkil yüklənir...");
    const url = await uploadImage(file);
    if (url) {
      updateField(id, "image_url", url);
      await supabase.from("products").update({ image_url: url }).eq("id", id);
      flash("Şəkil yükləndi ✓");
    }
  }

  async function handleNewImageFile(file) {
    if (!file) return;
    flash("Şəkil yüklənir...");
    const url = await uploadImage(file);
    if (url) {
      setNewProduct((n) => ({ ...n, image_url: url }));
      flash("Şəkil yükləndi ✓");
    }
  }

  function flash(msg) {
    setStatus(msg);
    setTimeout(() => setStatus(""), 2200);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError("Email və ya şifrə yanlışdır.");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function updateField(id, field, value) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  async function autoTranslate(text) {
    if (!text || !text.trim()) return { en: "", ka: "", ru: "" };
    async function translateOne(target) {
      try {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=az|${target}`
        );
        const data = await res.json();
        return data?.responseData?.translatedText || "";
      } catch {
        return "";
      }
    }
    const [en, ka, ru] = await Promise.all([translateOne("en"), translateOne("ka"), translateOne("ru")]);
    return { en, ka, ru };
  }

  async function saveProduct(p) {
    flash("Yadda saxlanılır və tərcümə edilir...");
    const tr = await autoTranslate(p.description);
    const { error } = await supabase
      .from("products")
      .update({
        name: p.name,
        plan: p.plan,
        price: p.price,
        period: p.period,
        code: p.code,
        category: p.category,
        image_url: p.image_url,
        description: p.description,
        description_en: tr.en,
        description_ka: tr.ka,
        description_ru: tr.ru,
        has_duration_options: p.has_duration_options,
        duration_options: p.duration_options,
        discount_percent: p.discount_percent,
        stock: p.stock,
        show_period: p.show_period,
      })
      .eq("id", p.id);
    flash(error ? "Xəta baş verdi." : "Yadda saxlanıldı və tərcümə olundu ✓");
    if (!error) onDataChanged();
  }

  function toggleDurationOptions(id, enabled) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, has_duration_options: enabled, duration_options: enabled ? p.duration_options || [{ months: 1, price: p.price }] : p.duration_options }
          : p
      )
    );
  }

  function updateDurationRow(id, index, field, value) {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const opts = [...(p.duration_options || [])];
        opts[index] = { ...opts[index], [field]: field === "months" ? parseInt(value) || 0 : parseFloat(value) || 0 };
        return { ...p, duration_options: opts };
      })
    );
  }

  function addDurationRow(id) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, duration_options: [...(p.duration_options || []), { months: 1, price: 0 }] } : p))
    );
  }

  function removeDurationRow(id, index) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, duration_options: (p.duration_options || []).filter((_, i) => i !== index) } : p))
    );
  }

  async function deleteProduct(id) {
    if (!window.confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    onDataChanged();
  }

  async function addProduct() {
    if (!newProduct.name || !newProduct.price) {
      flash("Ad və qiymət mütləqdir.");
      return;
    }
    flash("Əlavə edilir və tərcümə olunur...");
    const tr = await autoTranslate(newProduct.description);
    const { data, error } = await supabase
      .from("products")
      .insert({ ...newProduct, description_en: tr.en, description_ka: tr.ka, description_ru: tr.ru, sort_order: products.length + 1 })
      .select();
    if (!error && data) {
      setProducts((prev) => [...prev, ...data]);
      setNewProduct({ name: "", plan: "", price: "", period: "AY", code: "", category: "streaming", image_url: "", description: "", discount_percent: "" });
      flash("Məhsul əlavə olundu və tərcümə edildi ✓");
      onDataChanged();
    } else {
      flash("Xəta baş verdi.");
    }
  }

  async function saveSettings() {
    flash("Yadda saxlanılır...");
    const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("settings").upsert(rows);
    flash(error ? "Xəta baş verdi." : "Yadda saxlanıldı ✓");
    if (!error) onDataChanged();
  }

  async function sendBulkEmail() {
    if (!bulkSubject.trim() || !bulkMessage.trim()) {
      setBulkResult("Mövzu və mətn mütləqdir.");
      return;
    }
    setBulkSending(true);
    setBulkResult("");
    const { data, error } = await supabase.functions.invoke("send-bulk-email", {
      body: { subject: bulkSubject, message: bulkMessage },
    });
    setBulkSending(false);
    if (error) {
      setBulkResult("Xəta baş verdi: " + error.message);
    } else {
      setBulkResult(`Göndərildi: ${data.sent} / ${data.total}`);
      setBulkSubject("");
      setBulkMessage("");
    }
  }

  async function addBalance(customerId) {
    const amount = parseFloat(balanceInput);
    if (!amount || amount <= 0) {
      flash("Düzgün məbləğ daxil edin.");
      return;
    }
    const cust = customers.find((c) => c.id === customerId);
    const newBalance = Number(cust?.balance || 0) + amount;
    const { data, error } = await supabase
      .from("profiles")
      .update({ balance: newBalance })
      .eq("id", customerId)
      .select();
    if (!error && data && data.length > 0) {
      setCustomers((prev) => prev.map((c) => (c.id === customerId ? { ...c, balance: newBalance } : c)));
      setBalanceInput("");
      flash("Balans əlavə olundu ✓");
    } else {
      flash("Xəta: dəyişiklik saxlanmadı. Supabase-də admin update icazəsini yoxlayın.");
    }
  }

  async function toggleBan(customerId, currentlyBanned) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ banned: !currentlyBanned })
      .eq("id", customerId)
      .select();
    if (!error && data && data.length > 0) {
      setCustomers((prev) => prev.map((c) => (c.id === customerId ? { ...c, banned: !currentlyBanned } : c)));
      flash(!currentlyBanned ? "Müştəri bloklandı ✓" : "Blok ləğv edildi ✓");
    } else {
      flash("Xəta: dəyişiklik saxlanmadı. Supabase-də admin update icazəsini yoxlayın.");
    }
  }

  async function sendMessage(customerId) {
    if (!messageInput.trim()) {
      flash("Mesaj mətnini yazın.");
      return;
    }
    const { error } = await supabase.from("user_messages").insert({ user_id: customerId, message: messageInput.trim() });
    if (!error) {
      setMessageInput("");
      flash("Mesaj göndərildi ✓");
    } else {
      flash("Xəta baş verdi.");
    }
  }

  async function replyToReview(reviewId) {
    const text = (replyInputs[reviewId] || "").trim();
    if (!text) {
      flash("Cavab mətnini yazın.");
      return;
    }
    const { error } = await supabase.from("reviews").update({ admin_reply: text }).eq("id", reviewId);
    if (!error) {
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, admin_reply: text } : r)));
      setReplyInputs((prev) => ({ ...prev, [reviewId]: "" }));
      flash("Cavab yadda saxlanıldı ✓");
    } else {
      flash("Xəta baş verdi.");
    }
  }

  async function deleteReview(reviewId) {
    if (!window.confirm("Bu rəyi silmək istədiyinizə əminsiniz?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
    if (!error) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      flash("Rəy silindi ✓");
    } else {
      flash("Xəta baş verdi.");
    }
  }

  function slugify(text) {
    return (
      text
        .toLowerCase()
        .replace(/[əƏ]/g, "e")
        .replace(/[üÜ]/g, "u")
        .replace(/[öÖ]/g, "o")
        .replace(/[çÇ]/g, "c")
        .replace(/[şŞ]/g, "s")
        .replace(/[ğĞ]/g, "g")
        .replace(/[ıİ]/g, "i")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "kateqoriya-" + Date.now()
    );
  }

  async function updateCategoryField(id, field, value) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  async function saveCategory(cat) {
    flash("Yadda saxlanılır...");
    const { error } = await supabase
      .from("categories")
      .update({ label: cat.label, icon: cat.icon })
      .eq("id", cat.id);
    flash(error ? "Xəta baş verdi." : "Yadda saxlanıldı ✓");
    if (!error) onDataChanged();
  }

  async function deleteCategory(id) {
    if (!window.confirm("Bu kateqoriyanı silmək istədiyinizə əminsiniz? (bu kateqoriyadakı məhsullar 'kateqoriyasız' qalacaq)")) return;
    await supabase.from("categories").delete().eq("id", id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    onDataChanged();
  }

  async function addCategory() {
    if (!newCategory.label.trim()) {
      flash("Kateqoriya adını yazın.");
      return;
    }
    const slug = slugify(newCategory.label.trim());
    const { data, error } = await supabase
      .from("categories")
      .insert({ slug, label: newCategory.label.trim(), icon: newCategory.icon, sort_order: categories.length + 1 })
      .select();
    if (!error && data) {
      setCategories((prev) => [...prev, ...data]);
      setNewCategory({ label: "", icon: "LayoutGrid" });
      flash("Kateqoriya əlavə olundu ✓");
      onDataChanged();
    } else {
      flash("Xəta baş verdi.");
    }
  }

  function updateWheelPrizeField(id, field, value) {
    setWheelPrizes((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  async function saveWheelPrize(p) {
    flash("Yadda saxlanılır...");
    const { error } = await supabase
      .from("wheel_prizes")
      .update({ label: p.label, type: p.type, amount: p.amount, image_url: p.image_url })
      .eq("id", p.id);
    flash(error ? "Xəta baş verdi." : "Yadda saxlanıldı ✓");
    if (!error) onDataChanged();
  }

  async function handleWheelImageFile(id, file) {
    if (!file) return;
    flash("Şəkil yüklənir...");
    const url = await uploadImage(file);
    if (url) {
      updateWheelPrizeField(id, "image_url", url);
      await supabase.from("wheel_prizes").update({ image_url: url }).eq("id", id);
      flash("Şəkil yükləndi ✓");
    }
  }

  async function addWheelPrize() {
    const { data, error } = await supabase
      .from("wheel_prizes")
      .insert({ label: "Yeni seçim", type: "try_again", amount: 0, sort_order: wheelPrizes.length + 1 })
      .select();
    if (!error && data) {
      setWheelPrizes((prev) => [...prev, ...data]);
      flash("Seçim əlavə olundu ✓");
      onDataChanged();
    } else {
      flash("Xəta baş verdi.");
    }
  }

  async function deleteWheelPrize(id) {
    if (!window.confirm("Bu çarx seçimini silmək istədiyinizə əminsiniz?")) return;
    await supabase.from("wheel_prizes").delete().eq("id", id);
    setWheelPrizes((prev) => prev.filter((p) => p.id !== id));
    onDataChanged();
  }

  const filteredCustomers = customers.filter((c) => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return true;
    return (c.email || "").toLowerCase().includes(q) || (c.full_name || "").toLowerCase().includes(q);
  });


  if (checkingSession) {
    return (
      <section className="ab-section ab-page-pad">
        <p>Yüklənir...</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="ab-section ab-page-pad">
        <div className="ad-login-wrap">
          <PageHead kicker="ADMIN" title="Admin panelinə giriş" />
          <form onSubmit={handleLogin} className="ad-login">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loginError && <p className="ad-error">{loginError}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>
              Daxil ol
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (session.user.email !== ADMIN_EMAIL) {
    return (
      <section className="ab-section ab-page-pad">
        <PageHead kicker="ADMIN" title="İcazə yoxdur" sub="Bu hesabın admin panelinə girişi yoxdur." />
        <button className="ab-btn ab-btn-ghost" onClick={handleLogout}>
          Çıxış
        </button>
      </section>
    );
  }

  return (
    <section className="ab-section ab-page-pad">
      <div className="ad-header">
        <PageHead kicker="ADMIN" title="İdarəetmə paneli" />
        <button className="ab-btn ab-btn-ghost" onClick={handleLogout}>
          Çıxış
        </button>
      </div>

      {status && <div className="ad-status">{status}</div>}

      <div className="ad-stat-card">
        <span className="ad-stat-dot" />
        <div>
          <div className="ad-stat-number">{visitorCount}</div>
          <div className="ad-stat-label">Saytı ziyarət edən unikal IP sayı</div>
        </div>
      </div>

      <h3 className="ad-section-title">Kütləvi email göndər (bütün qeydiyyatlı müştərilərə)</h3>
      <div className="ad-settings">
        <label>
          Mövzu
          <input value={bulkSubject} onChange={(e) => setBulkSubject(e.target.value)} placeholder="Məs. Bu həftə xüsusi endirim!" />
        </label>
        <label>
          Mətn
          <textarea
            className="ad-desc-textarea"
            value={bulkMessage}
            onChange={(e) => setBulkMessage(e.target.value)}
            placeholder="Müştərilərə göndəriləcək mətni yazın..."
            rows={5}
          />
        </label>
        {bulkResult && <p style={{ fontSize: 13, color: "var(--muted)" }}>{bulkResult}</p>}
        <button className="ab-btn ab-btn-gold" onClick={sendBulkEmail} disabled={bulkSending} style={{ alignSelf: "flex-start" }}>
          <Send size={15} /> {bulkSending ? "Göndərilir..." : "Hamısına göndər"}
        </button>
      </div>

      <h3 className="ad-section-title">Əlaqə keçidi</h3>
      <div className="ad-settings">
        <label>
          WhatsApp nömrəsi (yalnız rəqəmlər, ölkə kodu ilə — məs. 994517873090)
          <input
            value={settings.contact_whatsapp || ""}
            onChange={(e) => setSettings((s) => ({ ...s, contact_whatsapp: e.target.value }))}
          />
        </label>
        <button className="ab-btn ab-btn-gold" onClick={saveSettings} style={{ alignSelf: "flex-start" }}>
          Əlaqə məlumatını yadda saxla
        </button>
      </div>

      <h3 className="ad-section-title">Məhsullar</h3>
      <div className="ad-products">
        {products.map((p) => (
          <div className="ad-product-block" key={p.id}>
            <div className="ad-product-row">
              <input value={p.name} onChange={(e) => updateField(p.id, "name", e.target.value)} placeholder="Ad" />
              <input value={p.plan} onChange={(e) => updateField(p.id, "plan", e.target.value)} placeholder="Plan" />
              <input value={p.price} onChange={(e) => updateField(p.id, "price", e.target.value)} placeholder="Qiymət" />
              <input
                type="number"
                value={p.discount_percent || ""}
                onChange={(e) => updateField(p.id, "discount_percent", e.target.value)}
                placeholder="Endirim %"
                style={{ maxWidth: 100 }}
              />
              <input value={p.image_url || ""} onChange={(e) => updateField(p.id, "image_url", e.target.value)} placeholder="Şəkil linki (URL)" />
              <input
                type="file"
                accept="image/*"
                id={`img-${p.id}`}
                style={{ display: "none" }}
                onChange={(e) => handleExistingImageFile(p.id, e.target.files[0])}
              />
              <button className="ab-btn ab-btn-ghost" onClick={() => document.getElementById(`img-${p.id}`).click()}>
                Şəkil seç
              </button>
              <select value={p.category} onChange={(e) => updateField(p.id, "category", e.target.value)}>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
              <button
                className="ab-btn ab-btn-ghost"
                onClick={() => setExpandedProduct(expandedProduct === p.id ? null : p.id)}
              >
                {expandedProduct === p.id ? "Bağla" : "Ətraflı"}
              </button>
              <button className="ab-btn ab-btn-ghost" onClick={() => saveProduct(p)}>
                Saxla
              </button>
              <button className="ad-delete" onClick={() => deleteProduct(p.id)}>
                Sil
              </button>
            </div>

            {expandedProduct === p.id && (
              <div className="ad-customer-actions">
                <label style={{ fontSize: 13, color: "var(--muted)" }}>
                  Açıqlama
                  <textarea
                    className="ad-desc-textarea"
                    value={p.description || ""}
                    onChange={(e) => updateField(p.id, "description", e.target.value)}
                    placeholder="Məhsul haqqında açıqlama..."
                    rows={3}
                  />
                </label>

                <label className="ab-agree-row" style={{ cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={!!p.has_duration_options}
                    onChange={(e) => toggleDurationOptions(p.id, e.target.checked)}
                  />
                  <span>Aylıq seçim düyməsi göstərilsin (yalnız müddətli abunəliklər üçün)</span>
                </label>

                <label className="ab-agree-row" style={{ cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={p.show_period !== false}
                    onChange={(e) => updateField(p.id, "show_period", e.target.checked)}
                  />
                  <span>Qiymətin yanında "/ay" kimi müddət yazısı göstərilsin (oyun kimi birdəfəlik məhsullarda söndürün)</span>
                </label>

                {!p.has_duration_options && (
                  <label style={{ fontSize: 13, color: "var(--muted)" }}>
                    Stokda qalan miqdar (boş buraxsanız limitsiz sayılır)
                    <input
                      type="number"
                      value={p.stock === null || p.stock === undefined ? "" : p.stock}
                      onChange={(e) => updateField(p.id, "stock", e.target.value === "" ? null : parseInt(e.target.value) || 0)}
                      placeholder="Məs. 25"
                      style={{
                        marginTop: 6, width: "100%", maxWidth: 160, padding: "9px 12px", borderRadius: 9,
                        border: "1px solid var(--line)", fontFamily: "'Inter',sans-serif", fontSize: 13.5,
                        background: "var(--surface)", color: "var(--text)",
                      }}
                    />
                  </label>
                )}

                {p.has_duration_options && (
                  <div className="ad-duration-editor">
                    {(p.duration_options || []).map((d, i) => (
                      <div className="ad-customer-action-row" key={i}>
                        <input
                          type="number"
                          placeholder="Ay"
                          value={d.months}
                          onChange={(e) => updateDurationRow(p.id, i, "months", e.target.value)}
                          style={{ maxWidth: 90 }}
                        />
                        <span style={{ color: "var(--muted)", fontSize: 13 }}>ay —</span>
                        <input
                          type="number"
                          placeholder="Qiymət"
                          value={d.price}
                          onChange={(e) => updateDurationRow(p.id, i, "price", e.target.value)}
                          style={{ maxWidth: 110 }}
                        />
                        <span style={{ color: "var(--muted)", fontSize: 13 }}>₼ —</span>
                        <input
                          type="number"
                          placeholder="Stok"
                          value={d.stock === null || d.stock === undefined ? "" : d.stock}
                          onChange={(e) => updateDurationRow(p.id, i, "stock", e.target.value)}
                          style={{ maxWidth: 90 }}
                        />
                        <span style={{ color: "var(--muted)", fontSize: 13 }}>ədəd</span>
                        <button className="ad-delete" onClick={() => removeDurationRow(p.id, i)}>
                          Sil
                        </button>
                      </div>
                    ))}
                    <button className="ab-btn ab-btn-ghost" onClick={() => addDurationRow(p.id)} style={{ alignSelf: "flex-start" }}>
                      + Ay əlavə et
                    </button>
                  </div>
                )}
                <button className="ab-btn ab-btn-gold" onClick={() => saveProduct(p)} style={{ alignSelf: "flex-start" }}>
                  Dəyişiklikləri saxla
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 className="ad-section-title">Yeni məhsul əlavə et</h3>
      <div className="ad-product-row">
        <input
          value={newProduct.name}
          onChange={(e) => setNewProduct((n) => ({ ...n, name: e.target.value }))}
          placeholder="Ad"
        />
        <input
          value={newProduct.plan}
          onChange={(e) => setNewProduct((n) => ({ ...n, plan: e.target.value }))}
          placeholder="Plan"
        />
        <input
          value={newProduct.price}
          onChange={(e) => setNewProduct((n) => ({ ...n, price: e.target.value }))}
          placeholder="Qiymət"
        />
        <input
          type="number"
          value={newProduct.discount_percent}
          onChange={(e) => setNewProduct((n) => ({ ...n, discount_percent: e.target.value }))}
          placeholder="Endirim %"
          style={{ maxWidth: 100 }}
        />
        <input
          value={newProduct.code}
          onChange={(e) => setNewProduct((n) => ({ ...n, code: e.target.value }))}
          placeholder="Kod"
        />
        <input
          value={newProduct.image_url}
          onChange={(e) => setNewProduct((n) => ({ ...n, image_url: e.target.value }))}
          placeholder="Şəkil linki (URL)"
        />
        <input
          type="file"
          accept="image/*"
          id="img-new"
          style={{ display: "none" }}
          onChange={(e) => handleNewImageFile(e.target.files[0])}
        />
        <button className="ab-btn ab-btn-ghost" onClick={() => document.getElementById("img-new").click()}>
          Şəkil seç
        </button>
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct((n) => ({ ...n, category: e.target.value }))}
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        <button className="ab-btn ab-btn-gold" onClick={addProduct}>
          Əlavə et
        </button>
      </div>
      <textarea
        className="ad-desc-textarea"
        style={{ marginTop: 10, maxWidth: 500 }}
        value={newProduct.description}
        onChange={(e) => setNewProduct((n) => ({ ...n, description: e.target.value }))}
        placeholder="Açıqlama (istəyə bağlı)"
        rows={2}
      />

      <h3 className="ad-section-title">Kateqoriyalar</h3>
      <div className="ad-products">
        {categories.map((c) => (
          <div className="ad-product-row" key={c.id} style={{ gridTemplateColumns: "1.4fr 1fr auto auto" }}>
            <input value={c.label} onChange={(e) => updateCategoryField(c.id, "label", e.target.value)} placeholder="Ad" />
            <select value={c.icon} onChange={(e) => updateCategoryField(c.id, "icon", e.target.value)}>
              {ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <button className="ab-btn ab-btn-ghost" onClick={() => saveCategory(c)}>
              Saxla
            </button>
            <button className="ad-delete" onClick={() => deleteCategory(c.id)}>
              Sil
            </button>
          </div>
        ))}
      </div>
      <h3 className="ad-section-title">Yeni kateqoriya əlavə et</h3>
      <div className="ad-product-row" style={{ gridTemplateColumns: "1.4fr 1fr auto" }}>
        <input
          value={newCategory.label}
          onChange={(e) => setNewCategory((n) => ({ ...n, label: e.target.value }))}
          placeholder="Kateqoriya adı"
        />
        <select value={newCategory.icon} onChange={(e) => setNewCategory((n) => ({ ...n, icon: e.target.value }))}>
          {ICON_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button className="ab-btn ab-btn-gold" onClick={addCategory}>
          Əlavə et
        </button>
      </div>

      <h3 className="ad-section-title">Bəxt Çarxı — seçimlər</h3>
      <div className="ad-products">
        {wheelPrizes.map((p) => (
          <div className="ad-product-row" key={p.id} style={{ gridTemplateColumns: "1.2fr 0.9fr 0.7fr auto auto auto" }}>
            <input value={p.label} onChange={(e) => updateWheelPrizeField(p.id, "label", e.target.value)} placeholder="Yazı (məs. 2 ₼ endirim)" />
            <select value={p.type} onChange={(e) => updateWheelPrizeField(p.id, "type", e.target.value)}>
              <option value="discount">Endirim</option>
              <option value="try_again">Bəxtini bir daha sına</option>
            </select>
            <input
              type="number"
              value={p.amount || ""}
              onChange={(e) => updateWheelPrizeField(p.id, "amount", e.target.value)}
              placeholder="Məbləğ ₼"
            />
            <input
              type="file"
              accept="image/*"
              id={`wheel-img-${p.id}`}
              style={{ display: "none" }}
              onChange={(e) => handleWheelImageFile(p.id, e.target.files[0])}
            />
            <button className="ab-btn ab-btn-ghost" onClick={() => document.getElementById(`wheel-img-${p.id}`).click()}>
              Şəkil seç
            </button>
            <button className="ab-btn ab-btn-ghost" onClick={() => saveWheelPrize(p)}>
              Saxla
            </button>
            <button className="ad-delete" onClick={() => deleteWheelPrize(p.id)}>
              Sil
            </button>
          </div>
        ))}
        {wheelPrizes.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Hələ çarx seçimi yoxdur.</p>}
      </div>
      <button className="ab-btn ab-btn-gold" onClick={addWheelPrize} style={{ marginTop: 10 }}>
        + Yeni seçim əlavə et
      </button>

      <h3 className="ad-section-title">Müştərilər ({filteredCustomers.length})</h3>
      <input
        className="ad-customer-search"
        placeholder="Email və ya ad üzrə axtar..."
        value={customerSearch}
        onChange={(e) => setCustomerSearch(e.target.value)}
      />
      <div className="ad-products">
        {filteredCustomers.map((c) => (
          <div className="ad-customer-block" key={c.id}>
            <div
              className="ad-customer-row"
              onClick={() => setExpandedCustomer(expandedCustomer === c.id ? null : c.id)}
              style={{ cursor: "pointer" }}
            >
              <span className="ad-customer-email">{c.email}</span>
              <span className="ad-customer-name">{c.full_name || "—"}</span>
              <span className="ad-customer-balance">{Number(c.balance || 0).toFixed(2)} ₼</span>
              {c.banned && <span className="ad-banned-tag">Bloklu</span>}
              <span className="ad-customer-date">{new Date(c.created_at).toLocaleDateString("az-AZ")}</span>
            </div>
            {expandedCustomer === c.id && (
              <div className="ad-customer-actions">
                <div className="ad-customer-action-row">
                  <input
                    type="number"
                    placeholder="Məbləğ (₼)"
                    value={balanceInput}
                    onChange={(e) => setBalanceInput(e.target.value)}
                  />
                  <button className="ab-btn ab-btn-gold" onClick={() => addBalance(c.id)}>
                    <Wallet size={15} /> Balans əlavə et
                  </button>
                  <button
                    className={c.banned ? "ab-btn ab-btn-ghost" : "ad-delete"}
                    onClick={() => toggleBan(c.id, c.banned)}
                  >
                    <Ban size={15} /> {c.banned ? "Blokdan çıxar" : "Ban et"}
                  </button>
                </div>
                <div className="ad-customer-action-row">
                  <input
                    type="text"
                    placeholder="Mesaj yaz..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button className="ab-btn ab-btn-gold" onClick={() => sendMessage(c.id)}>
                    <Send size={15} /> Mesaj əlavə et
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredCustomers.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Nəticə tapılmadı.</p>}
      </div>

      <h3 className="ad-section-title">Sifarişlər ({orders.length})</h3>
      <div className="ad-products">
        {orders.map((o) => (
          <div className="ad-order-row" key={o.id}>
            <div className="ad-order-head">
              <span className="ad-customer-email">{o.customer_email || "Qonaq"}</span>
              <span className="ad-order-total">{Number(o.total).toFixed(2)} ₼</span>
              <span className="ad-customer-date">{new Date(o.created_at).toLocaleString("az-AZ")}</span>
            </div>
            <div className="ad-order-items">
              {(o.items || []).map((it, i) => (
                <span key={i} className="ad-order-item">
                  {it.name} x{it.qty}
                </span>
              ))}
            </div>
          </div>
        ))}
        {orders.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Hələ sifariş yoxdur.</p>}
      </div>

      <h3 className="ad-section-title">Rəylər ({reviews.length})</h3>
      <div className="ad-products">
        {reviews.map((r) => {
          const prod = products.find((p) => p.id === r.product_id);
          return (
            <div className="ad-review-row" key={r.id}>
              <div className="ad-order-head">
                <span className="ad-customer-email">{r.customer_name}</span>
                <span style={{ color: "var(--muted)", fontSize: 12.5 }}>{prod ? prod.name : "—"}</span>
                <span className="ad-customer-balance">{"★".repeat(r.rating)}</span>
                <span className="ad-customer-date">{new Date(r.created_at).toLocaleDateString("az-AZ")}</span>
                <button className="ad-delete" onClick={() => deleteReview(r.id)}>
                  Sil
                </button>
              </div>
              <p style={{ fontSize: 13.5, margin: "6px 0" }}>{r.comment}</p>
              {r.admin_reply ? (
                <div className="ab-review-reply">
                  <strong>Cavabınız:</strong> {r.admin_reply}
                </div>
              ) : (
                <div className="ad-customer-action-row">
                  <input
                    type="text"
                    placeholder="Cavab yaz..."
                    value={replyInputs[r.id] || ""}
                    onChange={(e) => setReplyInputs((prev) => ({ ...prev, [r.id]: e.target.value }))}
                    style={{ flex: 1 }}
                  />
                  <button className="ab-btn ab-btn-gold" onClick={() => replyToReview(r.id)}>
                    <Send size={15} /> Cavab yaz
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {reviews.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Hələ rəy yoxdur.</p>}
      </div>
    </section>
  );
}

const ProductTicker = React.memo(function ProductTicker({ products }) {
  if (!products || products.length === 0) return null;
  const items = [...products, ...products, ...products];
  return (
    <div className="ab-ticker">
      <div className="ab-ticker-track">
        {items.map((p, i) => (
          <span className="ab-ticker-item" key={i}>
            {p.name} <b>{p.price} ₼</b>
          </span>
        ))}
      </div>
    </div>
  );
});

export default function App() {
  useGoogleFonts();
  const [page, go] = useHashRoute();
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const LANG_NAMES = { az: "AZ", en: "EN", ka: "GE", ru: "RU" };
  const { products, settings, reviews, categories, wheelPrizes, reload, loaded } = useAppData();

  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => listener.subscription.unsubscribe();
  }, []);

  const [showWheel, setShowWheel] = useState(false);
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem("skyflix_wheel_seen") === "1";
    } catch {}
    if (!seen) {
      const timer = setTimeout(() => {
        setShowWheel(true);
        try {
          localStorage.setItem("skyflix_wheel_seen", "1");
        } catch {}
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Admin -> customer message banner
  const [activeMessage, setActiveMessage] = useState(null);
  const [reviewsModalProduct, setReviewsModalProduct] = useState(null);
  useEffect(() => {
    if (!session) {
      setActiveMessage(null);
      return;
    }
    async function checkBanAndMessages() {
      const { data: prof } = await supabase.from("profiles").select("banned").eq("id", session.user.id).single();
      if (prof?.banned) {
        window.alert(t("bannedText"));
        await supabase.auth.signOut();
        return;
      }
      const { data } = await supabase
        .from("user_messages")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("dismissed", false)
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) setActiveMessage(data[0]);
    }
    checkBanAndMessages();
    const interval = setInterval(checkBanAndMessages, 30000);
    return () => clearInterval(interval);
  }, [session]);

  async function dismissMessage() {
    if (!activeMessage) return;
    await supabase.from("user_messages").update({ dismissed: true }).eq("id", activeMessage.id);
    setActiveMessage(null);
  }

  // Cosmetic "online now" counter that gently drifts between 20-70
  const [onlineCount, setOnlineCount] = useState(() => 20 + Math.floor(Math.random() * 50));
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        let next = prev + delta;
        if (next < 20) next = 20 + Math.floor(Math.random() * 5);
        if (next > 70) next = 70 - Math.floor(Math.random() * 5);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Log visitor IP for admin stats
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then(async ({ ip }) => {
        if (!ip) return;
        const { data: existing } = await supabase.from("visitor_ips").select("ip, visits").eq("ip", ip).maybeSingle();
        if (existing) {
          await supabase
            .from("visitor_ips")
            .update({ last_seen: new Date().toISOString(), visits: existing.visits + 1 })
            .eq("ip", ip);
        } else {
          await supabase.from("visitor_ips").insert({ ip });
        }
      })
      .catch(() => {});
  }, []);

  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("skyflix_lang") || "az";
    } catch {
      return "az";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("skyflix_lang", lang);
    } catch {}
  }, [lang]);
  const t = (key) => I18N[lang][key] || I18N.az[key] || key;

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("skyflix_theme") || "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("skyflix_theme", theme);
    } catch {}
  }, [theme]);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("skyflix_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("skyflix_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  function addToCart(product) {
    if (!session) {
      window.alert(t("cartLoginAlert"));
      go("hesab");
      return;
    }
    const cartKey = product.id + (product.variantMonths ? "-" + product.variantMonths : "");
    setCart((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) => (i.cartKey === cartKey ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          cartKey,
          id: product.id,
          name: product.name,
          price: product.price,
          period: product.period,
          variantMonths: product.variantMonths || null,
          qty: 1,
        },
      ];
    });
  }

  function updateQty(cartKey, qty) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.cartKey !== cartKey));
    } else {
      setCart((prev) => prev.map((i) => (i.cartKey === cartKey ? { ...i, qty } : i)));
    }
  }

  function removeFromCart(cartKey) {
    setCart((prev) => prev.filter((i) => i.cartKey !== cartKey));
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (key) => {
    go(key);
    setMenuOpen(false);
  };

  return (
    <div className={`ab-root ${theme === "dark" ? "dark" : ""}`}>
      <VideoWidget videoId="jhgJV0Pg54Y" />
      <LiveChatButton settings={settings} />
      <FakePurchaseWidget products={products} />
      <OnlineCounter count={onlineCount} />
      <MessageBanner message={activeMessage} onDismiss={dismissMessage} />
      <button className="ab-wheel-fab" onClick={() => setShowWheel(true)} title="Bəxtini sına">
        <Gift size={22} />
      </button>
      <button className="ab-game-fab" onClick={() => setShowGame(true)} title="Oyun oyna">
        <Gamepad2 size={22} />
      </button>
      {showWheel && (
        <SpinWheel prizes={wheelPrizes} session={session} go={go} onClose={() => setShowWheel(false)} />
      )}
      {showGame && <RunnerGame onClose={() => setShowGame(false)} />}
      {reviewsModalProduct && (
        <ReviewsModal
          product={reviewsModalProduct}
          reviews={reviews}
          session={session}
          t={t}
          onClose={() => setReviewsModalProduct(null)}
          onSubmitted={() => {
            reload();
            setReviewsModalProduct(null);
          }}
        />
      )}
      <style>{`
        :root{
          --bg:#FFFFFF;
          --surface:#FDF7F7;
          --surface2:#F7E8E9;
          --gold:#E1122A;
          --teal:#8C1620;
          --text:#1A1210;
          --muted:#7A6C6A;
          --line: rgba(26,18,16,0.12);
        }
        .ab-root.dark{
          --bg:#150708;
          --surface:#1D0D0E;
          --surface2:#2A1315;
          --gold:#FF3B4E;
          --teal:#E1122A;
          --text:#F5EBEA;
          --muted:#A98D8B;
          --line: rgba(255,255,255,0.1);
        }
        .ab-root.dark .ab-notch{ background:var(--bg); }
        .ab-root.dark .ab-btn-onscreen{ background:#1D0D0E; color:#FFFFFF; }
        *{box-sizing:border-box;}
        .ab-root{
          background:var(--bg);
          color:var(--text);
          font-family:'Inter',sans-serif;
          min-height:100vh;
          overflow-x:hidden;
          transition:background .3s ease, color .3s ease;
        }
        .ab-root h1,.ab-root h2,.ab-root h3{
          font-family:'Space Grotesk',sans-serif;
          letter-spacing:-0.01em;
        }
        .ab-mono{ font-family:'JetBrains Mono',monospace; }

        .ab-reveal{
          opacity:0;
          transform:translateY(-26px);
          transition:opacity .7s cubic-bezier(.16,.8,.24,1), transform .7s cubic-bezier(.16,.8,.24,1);
        }
        .ab-reveal-in{ opacity:1; transform:translateY(0); }

        .ab-trustbadges{
          display:grid; grid-template-columns:repeat(2,1fr); gap:1px;
          background:var(--line); margin:0 4vw; border-radius:16px; overflow:hidden;
          border:1px solid var(--line); transform:translateY(-26px);
        }
        @media(min-width:900px){ .ab-trustbadges{ grid-template-columns:repeat(4,1fr); } }
        .ab-trustbadge{
          background:var(--bg); padding:22px 20px; display:flex; gap:12px; align-items:flex-start;
        }
        .ab-trustbadge svg{ color:var(--gold); flex-shrink:0; margin-top:2px; }
        .ab-trustbadge h4{ font-size:13.5px; margin:0 0 3px; font-family:'Space Grotesk',sans-serif; }
        .ab-trustbadge p{ font-size:11.5px; color:var(--muted); margin:0; line-height:1.45; }

        .ab-ticker{
          overflow:hidden; background:#170405; border-bottom:1px solid rgba(255,255,255,0.08);
          height:32px; display:flex; align-items:center;
        }
        .ab-ticker-track{
          display:flex; align-items:center; gap:36px; white-space:nowrap;
          animation:ab-ticker-scroll 38s linear infinite;
          padding-left:36px;
        }
        .ab-ticker-item{
          display:inline-flex; align-items:center; gap:7px;
          font-family:'JetBrains Mono',monospace; font-size:11.5px; letter-spacing:.02em;
          color:rgba(255,255,255,0.68);
        }
        .ab-ticker-item svg{ color:#FF6B6B; flex-shrink:0; }
        .ab-ticker-item b{ color:#FFFFFF; font-weight:600; margin-left:2px; }
        @keyframes ab-ticker-scroll{
          from{ transform:translateX(0); }
          to{ transform:translateX(-33.3333%); }
        }

        .ab-nav{
          position:sticky; top:0; z-index:40;
          display:flex; align-items:center; justify-content:space-between;
          padding:20px 6vw;
          transition:background .3s ease, border-color .3s ease, backdrop-filter .3s ease, box-shadow .3s ease, padding .3s ease;
          border-bottom:1px solid transparent;
        }
        .ab-nav::before{
          content:""; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg, transparent, var(--gold), #FFD84D, var(--gold), transparent);
          opacity:0.9;
        }
        .ab-nav.solid{
          background:var(--bg);
          opacity:0.98;
          backdrop-filter:blur(16px) saturate(1.4);
          -webkit-backdrop-filter:blur(16px) saturate(1.4);
          border-bottom:1px solid var(--line);
          box-shadow:0 8px 30px -18px rgba(0,0,0,0.35);
          padding:14px 6vw;
        }
        .ab-brand{
          display:flex; align-items:center; gap:10px; font-weight:700; font-size:19px;
          background:none; border:none; color:inherit; cursor:pointer; padding:0;
          font-family:'Space Grotesk',sans-serif; letter-spacing:.01em;
          transition:transform .2s ease;
        }
        .ab-brand:hover{ transform:translateY(-1px); }
        .ab-brand-mark{
          width:32px;height:32px;
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0; filter:drop-shadow(0 4px 10px rgba(225,18,42,0.35));
          transition:transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .ab-brand:hover .ab-brand-mark{ transform:scale(1.08) rotate(-4deg); }
        .ab-brand-mark img{ width:100%; height:100%; object-fit:contain; }
        .ab-navlinks{ display:none; gap:4px; padding:5px; background:var(--surface); border-radius:100px; border:1px solid var(--line); }
        @media(min-width:800px){ .ab-navlinks{ display:flex; } }
        .ab-navlink{
          background:none; border:none; cursor:pointer; position:relative;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:500; color:var(--muted);
          padding:9px 15px; border-radius:100px; transition:color .2s ease, background .25s ease, box-shadow .25s ease;
        }
        .ab-navlink::after{ display:none; }
        .ab-navlink:hover{ color:var(--text); background:var(--surface2); }
        .ab-navlink.active{
          color:#FFFFFF; font-weight:600;
          background:linear-gradient(135deg,var(--gold),var(--teal));
          box-shadow:0 6px 16px -6px rgba(225,18,42,0.55);
        }

        .ab-navright{ display:flex; align-items:center; gap:8px; }
        .ab-menubtn{
          display:flex; background:var(--surface); border:1px solid var(--line); border-radius:10px; padding:9px;
          color:var(--text); cursor:pointer; transition:all .2s ease;
        }
        .ab-menubtn:hover{ border-color:var(--gold); color:var(--gold); }
        @media(min-width:800px){ .ab-menubtn{ display:none; } }
        .ab-accountbtn{
          display:flex; background:var(--surface); border:1px solid var(--line); border-radius:10px; padding:9px;
          color:var(--text); cursor:pointer; transition:all .2s ease, transform .2s ease;
        }
        .ab-accountbtn:hover{ border-color:var(--gold); color:var(--gold); transform:translateY(-1px); box-shadow:0 6px 14px -8px rgba(225,18,42,0.4); }
        .ab-langbtn{
          display:flex; align-items:center; justify-content:center;
          background:var(--surface); border:1px solid var(--line); border-radius:10px;
          padding:9px 11px; color:var(--text); cursor:pointer; transition:all .2s ease, transform .2s ease;
          font-family:'JetBrains Mono',monospace; font-size:12.5px; font-weight:700;
        }
        .ab-langbtn:hover{ border-color:var(--gold); color:var(--gold); transform:translateY(-1px); }
        .ab-langwrap{ position:relative; }
        .ab-langmenu{
          position:absolute; top:calc(100% + 8px); right:0; z-index:50;
          background:var(--bg); border:1px solid var(--line); border-radius:12px;
          box-shadow:0 16px 34px -12px rgba(0,0,0,0.3); overflow:hidden; min-width:68px;
        }
        .ab-langoption{
          display:block; width:100%; padding:10px 15px; background:none; border:none; cursor:pointer;
          font-family:'JetBrains Mono',monospace; font-size:12.5px; font-weight:600; color:var(--muted); text-align:left;
          transition:background .15s ease;
        }
        .ab-langoption:hover{ background:var(--surface2); color:var(--text); }
        .ab-langoption.active{ color:var(--gold); }
        .ab-mobile-langrow{ display:flex; gap:8px; margin-top:20px; }
        .ab-mobile-langrow .ab-pill{ flex:1; justify-content:center; }

        .ab-ge-strip{ display:flex; align-items:center; gap:14px; margin-bottom:20px; }
        .ab-ge-flag{ width:36px; height:auto; border-radius:4px; box-shadow:0 3px 8px rgba(0,0,0,0.3); flex-shrink:0; }
        .ab-ge-avatars{ display:flex; align-items:center; }
        .ab-ge-avatar{
          width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center;
          border:2px solid #1A0607;
        }
        .ab-cartbtn{ position:relative; }
        .ab-cart-badge{
          position:absolute; top:-6px; right:-6px;
          background:var(--gold); color:#FFFFFF; font-size:10.5px; font-weight:700;
          min-width:18px; height:18px; border-radius:9px; line-height:1;
          display:flex; align-items:center; justify-content:center; padding:0 4px;
          box-shadow:0 0 0 3px var(--bg);
          animation:ab-cart-pop .3s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes ab-cart-pop{
          0%{ transform:scale(0); }
          70%{ transform:scale(1.2); }
          100%{ transform:scale(1); }
        }

        .ab-ticket-reviews{
          width:100%; border:none; border-top:1px solid var(--line);
          background:var(--bg); color:var(--muted);
          padding:9px 14px; font-size:12px; font-weight:600; cursor:pointer;
          display:flex; align-items:center; gap:5px;
          font-family:'Inter',sans-serif;
        }
        .ab-ticket-reviews:hover{ color:var(--text); }
        .ab-ticket-reviews-count{ color:var(--muted); font-weight:400; }

        .ab-review-summary{ display:flex; align-items:center; gap:14px; margin-bottom:18px; }
        .ab-review-avg{ font-family:'JetBrains Mono',monospace; font-size:32px; font-weight:700; color:var(--gold); }
        .ab-review-stars{ display:flex; gap:2px; }
        .ab-review-count{ font-size:12px; color:var(--muted); margin-top:3px; }
        .ab-review-list{ display:flex; flex-direction:column; gap:16px; max-height:320px; overflow-y:auto; margin-bottom:16px; }
        .ab-review-empty{ color:var(--muted); font-size:13.5px; }
        .ab-review-item{ border-bottom:1px solid var(--line); padding-bottom:14px; }
        .ab-review-item-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; }
        .ab-review-name{ font-weight:600; font-size:13.5px; font-family:'Space Grotesk',sans-serif; }
        .ab-review-verified{
          display:flex; align-items:center; gap:4px; font-size:10.5px; color:var(--teal);
          background:rgba(140,22,32,0.08); padding:3px 8px; border-radius:100px; font-weight:600;
        }
        .ab-review-comment{ font-size:13.5px; color:var(--text); margin:6px 0 0; line-height:1.5; }
        .ab-review-reply{
          margin-top:8px; padding:10px 12px; background:var(--surface2); border-radius:10px; font-size:12.5px; color:var(--text);
        }
        .ab-review-form{ border-top:1px solid var(--line); padding-top:16px; display:flex; flex-direction:column; gap:10px; }
        .ab-review-stars-input{ gap:4px; }
        .ab-star-btn{ background:none; border:none; cursor:pointer; padding:2px; }
        .ab-review-form textarea{
          padding:10px 12px; border-radius:10px; border:1px solid var(--line);
          font-family:'Inter',sans-serif; font-size:13.5px; background:var(--surface); color:var(--text); resize:vertical;
        }
        .ab-review-note{ color:var(--muted); font-size:13px; border-top:1px solid var(--line); padding-top:14px; margin:0; }

        .ab-reviews-grid{ display:grid; gap:18px; grid-template-columns:1fr; }
        @media(min-width:700px){ .ab-reviews-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1080px){ .ab-reviews-grid{ grid-template-columns:repeat(3,1fr); } }
        .ab-review-card{
          border:1px solid var(--line); border-radius:16px; padding:20px; background:var(--surface);
        }
        .ab-review-product{ font-size:11.5px; color:var(--gold); font-weight:600; margin:2px 0 8px; }

        .ab-ticket-addbtn{
          width:100%; border:none; border-top:1px solid var(--line);
          background:var(--surface2); color:var(--text);
          padding:12px; font-size:13.5px; font-weight:600; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:7px;
          font-family:'Inter',sans-serif;
          transition:background .2s ease, color .2s ease;
        }
        .ab-ticket-addbtn:hover{ background:var(--gold); color:#FFFFFF; }

        .ab-cart-list{ display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
        .ab-cart-row{
          display:flex; flex-wrap:wrap; align-items:center; gap:16px;
          border:1px solid var(--line); border-radius:12px; padding:16px;
          background:var(--surface);
        }
        .ab-cart-info{ flex:1 1 160px; }
        .ab-cart-name{ font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:15px; }
        .ab-cart-unit{ color:var(--muted); font-size:12.5px; margin-top:3px; }
        .ab-cart-qty{ display:flex; align-items:center; gap:10px; }
        .ab-cart-qty button{
          width:28px; height:28px; border-radius:7px; border:1px solid var(--line);
          background:var(--bg); cursor:pointer; color:var(--text);
          display:flex; align-items:center; justify-content:center;
        }
        .ab-cart-qty button:hover{ border-color:var(--gold); }
        .ab-cart-qty span{ font-family:'JetBrains Mono',monospace; font-size:14px; min-width:16px; text-align:center; }
        .ab-cart-linetotal{
          font-family:'JetBrains Mono',monospace; font-weight:700; color:var(--gold);
          font-size:14.5px; white-space:nowrap; min-width:80px; text-align:right;
        }
        .ab-cart-remove{ background:none; border:none; color:var(--muted); cursor:pointer; padding:4px; }
        .ab-cart-remove:hover{ color:var(--gold); }
        .ab-cart-summary{ border-top:1px solid var(--line); padding-top:22px; max-width:440px; }
        .ab-cart-total-row{ display:flex; justify-content:space-between; align-items:center; font-size:16px; font-weight:600; font-family:'Space Grotesk',sans-serif; margin-bottom:6px; }
        .ab-cart-discount-row{ color:var(--gold); font-size:14px; font-weight:600; }

        .ab-promo-progress{
          display:flex; align-items:center; gap:8px;
          background:var(--surface2); border-radius:12px; padding:12px 16px;
          font-size:13.5px; color:var(--text); margin-bottom:18px;
        }
        .ab-promo-progress svg{ color:var(--gold); flex-shrink:0; }
        .ab-promo-progress-active{ background:rgba(46,204,113,0.12); }
        .ab-promo-progress-active svg{ color:#2ecc71; }

        .ab-promo-box{ display:flex; gap:10px; margin:18px 0 4px; max-width:420px; }
        .ab-promo-box input{
          flex:1; padding:11px 14px; border-radius:10px; border:1px solid var(--line);
          font-family:'JetBrains Mono',monospace; font-size:13.5px; background:var(--surface); color:var(--text);
          text-transform:uppercase;
        }

        .ab-pay-card{
          margin-top:16px; padding:20px; border-radius:16px;
          border:1px solid var(--line); background:var(--surface);
        }
        .ab-pay-card-head{
          display:flex; align-items:center; gap:8px; font-weight:600; font-family:'Space Grotesk',sans-serif;
          margin-bottom:14px; font-size:15px;
        }
        .ab-pay-card-row{
          display:flex; justify-content:space-between; align-items:center;
          padding:9px 0; border-bottom:1px solid var(--line); font-size:13.5px; color:var(--muted);
        }
        .ab-pay-card-row strong{ color:var(--text); font-family:'JetBrains Mono',monospace; font-size:14px; }
        .ab-pay-card-number{ display:flex; align-items:center; gap:10px; }
        .ab-pay-card-number button{
          background:var(--surface2); border:none; border-radius:8px; padding:6px; cursor:pointer; color:var(--gold);
          display:flex; align-items:center; justify-content:center;
        }
        .ab-pay-card-total{ border-bottom:none; padding-top:14px; }
        .ab-pay-card-total strong{ color:var(--gold); font-size:18px; }
        .ab-pay-instructions{ font-size:12.5px; color:var(--muted); line-height:1.6; margin:14px 0; }
        .ab-cart-total{ font-family:'JetBrains Mono',monospace; color:var(--gold); font-size:22px; }

        .ab-mobilemenu{
          position:fixed; inset:0; z-index:50;
          background:var(--bg); opacity:0.98;
          display:flex; flex-direction:column;
          padding:20px 6vw;
          animation:ab-fadein .2s ease both;
        }
        .ab-mobilemenu-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:36px; }
        .ab-mobilemenu a, .ab-mobilemenu button.ab-navlink{
          font-size:22px; padding:14px 4px; text-align:left; color:var(--text);
          border-bottom:1px solid var(--line);
          font-family:'Space Grotesk',sans-serif;
        }

        .ab-btn{
          font-family:'Inter',sans-serif;
          font-weight:600; font-size:14px;
          padding:11px 20px; border-radius:9px;
          border:1px solid transparent;
          cursor:pointer;
          display:inline-flex; align-items:center; gap:6px;
          transition:transform .15s ease, background .2s ease, border-color .2s ease, box-shadow .25s ease;
        }
        .ab-btn:focus-visible{ outline:2px solid var(--teal); outline-offset:2px; }
        .ab-btn-gold{ background:var(--gold); color:#FFFFFF; position:relative; overflow:hidden; }
        .ab-btn-gold::before{
          content:""; position:absolute; top:0; left:-60%; width:40%; height:100%;
          background:linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
          transform:skewX(-20deg);
        }
        .ab-btn-gold:hover{ transform:translateY(-1px); box-shadow:0 10px 24px -10px rgba(225,18,42,0.55); }
        .ab-btn-gold:hover::before{ left:130%; transition:left .65s ease; }
        .ab-btn-ghost{ background:transparent; color:var(--text); border-color:var(--line); }
        .ab-btn-ghost:hover{ border-color:var(--muted); }
        .ab-btn-onscreen{ background:#FFFFFF; color:var(--gold); }
        .ab-btn-onscreen:hover{ transform:translateY(-1px); }
        .ab-btn-onscreen-ghost{ background:rgba(255,255,255,0.08); color:#FFFFFF; border-color:rgba(255,255,255,0.35); }
        .ab-btn-onscreen-ghost:hover{ border-color:rgba(255,255,255,0.6); }

        @keyframes ab-fadein{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }
        .ab-page{ animation:ab-fadein .32s ease both; }
        .ab-page-pad{ padding-top:70px; }

        .ab-screen{
          position:relative;
          margin:20px 4vw 0;
          border-radius:26px;
          overflow:hidden;
          background:linear-gradient(160deg,#1A0607,#2B0A0C 55%,#170405);
          color:#FFFFFF;
        }
        .ab-screen .ab-eyebrow{
          border-color:rgba(255,255,255,0.25);
          background:rgba(255,255,255,0.08);
          color:#FFFFFF;
        }
        .ab-screen .ab-eyebrow .dot{ background:#FF6B6B; }
        .ab-screen .ab-h1 em{ color:#FF6B6B; }
        .ab-screen .ab-sub{ color:rgba(255,255,255,0.78); }
        .ab-screen .ab-trustrow{ color:rgba(255,255,255,0.68); }

        .ab-screen-blob{
          position:absolute; border-radius:50%;
          filter:blur(70px); opacity:.5; mix-blend-mode:screen;
          pointer-events:none;
        }
        .ab-screen-blob.b1{
          width:420px; height:420px;
          background:radial-gradient(circle, var(--gold), transparent 70%);
          top:-140px; left:-100px;
          animation: ab-float1 15s ease-in-out infinite;
        }
        .ab-screen-blob.b2{
          width:380px; height:380px;
          background:radial-gradient(circle, var(--teal), transparent 70%);
          bottom:-160px; right:-80px;
          animation: ab-float2 19s ease-in-out infinite;
        }
        @keyframes ab-float1{ 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(50px,30px) scale(1.15);} }
        @keyframes ab-float2{ 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-40px,-40px) scale(1.12);} }

        .ab-screen-sweep{
          position:absolute; top:0; bottom:0; width:160px; left:-220px;
          background:linear-gradient(100deg, transparent, rgba(255,255,255,0.14), transparent);
          transform:skewX(-18deg);
          animation: ab-sweep 7s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes ab-sweep{ 0%{left:-220px;} 42%{left:115%;} 100%{left:115%;} }

        .ab-screen-grain{
          position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.05; mix-blend-mode:overlay; pointer-events:none;
        }

        .ab-mega-banner{
          position:relative; z-index:1;
          padding:22px 6vw 0;
          font-family:'Space Grotesk',sans-serif;
          font-weight:700; text-transform:uppercase;
          font-size:clamp(14px,2.1vw,20px);
          line-height:1.4; letter-spacing:.01em;
          text-align:center;
          background:linear-gradient(90deg, #FFD84D, #FF6B6B, #FFD84D);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text; color:transparent;
          animation:ab-shine 5s linear infinite;
        }
        @keyframes ab-shine{
          0%{ background-position:0% center; }
          100%{ background-position:200% center; }
        }

        .ab-hero{
          position:relative; z-index:1;
          padding:76px 6vw 60px;
          display:grid; gap:48px;
          align-items:center;
        }
        @media(min-width:960px){ .ab-hero{ grid-template-columns:1.05fr 0.95fr; padding-top:96px; } }

        .ab-eyebrow{
          display:inline-flex; align-items:center; gap:8px;
          font-family:'JetBrains Mono',monospace;
          font-size:12.5px; color:var(--teal);
          border:1px solid rgba(140,22,32,0.35);
          background:rgba(140,22,32,0.08);
          padding:6px 12px; border-radius:100px;
          margin-bottom:22px;
        }
        .ab-eyebrow .dot{ width:6px;height:6px;border-radius:50%;background:var(--teal); }

        .ab-h1{
          font-size:clamp(34px,5.4vw,58px);
          line-height:1.04;
          font-weight:700;
          margin:0 0 20px;
        }
        .ab-h1 em{ font-style:normal; color:var(--gold); }
        .ab-sub{
          font-size:17px; color:var(--muted); line-height:1.6;
          max-width:46ch; margin:0 0 30px;
        }
        .ab-hero-ctas{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:34px; }
        .ab-trustrow{ display:flex; gap:22px; flex-wrap:wrap; font-size:13px; color:var(--muted); }
        .ab-trustrow span{ display:inline-flex; align-items:center; gap:7px; }

        .ab-slideshow{ position:relative; height:290px; }
        .ab-slideshow-track{ position:relative; height:230px; perspective:1000px; }
        .ab-slide-3d{
          position:absolute; top:46%; left:50%;
          width:148px; padding:14px;
          background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.18); border-radius:16px;
          backdrop-filter:blur(6px);
          text-align:center; cursor:pointer;
          transition:transform .5s ease, opacity .5s ease;
        }
        .ab-slide-3d-img{ width:100%; height:70px; border-radius:10px; background-size:cover; background-position:center; margin-bottom:10px; }
        .ab-slide-3d-icon{
          width:100%; height:70px; border-radius:10px; background:rgba(255,255,255,0.1);
          display:flex; align-items:center; justify-content:center; margin-bottom:10px; color:#FF6B6B;
        }
        .ab-slide-3d-name{ font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:13.5px; color:#FFFFFF; }
        .ab-slide-3d-price{ font-family:'JetBrains Mono',monospace; color:#FF6B6B; font-size:13px; margin-top:5px; }
        .ab-slide-dots{ position:absolute; bottom:16px; left:0; right:0; display:flex; justify-content:center; gap:8px; }
        .ab-dot{ width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.3); border:none; cursor:pointer; transition:all .25s ease; padding:0; }
        .ab-dot.active{ background:#FFFFFF; width:22px; border-radius:5px; }

        .ab-ticket-img{ width:100%; height:130px; background-size:cover; background-position:center; }

        .ab-video-widget-hidden{ position:fixed; width:0; height:0; overflow:hidden; opacity:0; pointer-events:none; }

        .ab-detail-grid{ display:grid; gap:36px; grid-template-columns:1fr; max-width:900px; }
        @media(min-width:800px){ .ab-detail-grid{ grid-template-columns:0.9fr 1.1fr; } }
        .ab-detail-media{ position:sticky; top:100px; align-self:start; }
        .ab-detail-img{
          width:100%; aspect-ratio:4/3; border-radius:20px; background-size:cover; background-position:center;
          border:1px solid var(--line);
        }
        .ab-detail-img-fallback{ display:flex; align-items:center; justify-content:center; background:var(--surface2); color:var(--gold); }
        .ab-detail-name{ font-size:clamp(24px,3vw,32px); margin:8px 0 4px; font-family:'Space Grotesk',sans-serif; }
        .ab-detail-plan{ color:var(--muted); font-size:14.5px; margin:0 0 6px; }
        .ab-detail-description{ font-size:14.5px; color:var(--text); line-height:1.7; margin:16px 0; }
        .ab-duration-picker{ margin:20px 0; }
        .ab-duration-label{ font-size:13px; font-weight:600; color:var(--muted); margin-bottom:10px; }
        .ab-duration-options{ display:flex; flex-wrap:wrap; gap:10px; }
        .ab-duration-pill{
          display:flex; flex-direction:column; align-items:center; gap:3px;
          padding:10px 18px; border-radius:12px; border:1px solid var(--line);
          background:var(--surface); color:var(--text); cursor:pointer; font-family:'Inter',sans-serif; font-weight:600; font-size:13.5px;
          transition:all .2s ease;
        }
        .ab-duration-pill span{ font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--muted); font-weight:400; }
        .ab-duration-pill.active{ background:var(--gold); border-color:var(--gold); color:#FFFFFF; }
        .ab-duration-pill.active span{ color:rgba(255,255,255,0.85); }
        .ab-duration-pill em{ font-style:normal; font-size:10px; color:var(--muted); margin-top:1px; }
        .ab-duration-pill.active em{ color:rgba(255,255,255,0.75); }
        .ab-duration-pill.out{ opacity:0.45; cursor:not-allowed; text-decoration:line-through; }
        .ab-duration-pill:disabled{ cursor:not-allowed; }

        .ab-stock-badge{
          font-size:11px; font-weight:600; color:var(--teal); padding:8px 20px 4px;
        }
        .ab-stock-badge.out{ color:var(--gold); }
        .ab-detail-stock{ font-size:12.5px; font-weight:600; color:var(--teal); margin-top:8px; }
        .ab-detail-stock.out{ color:var(--gold); }

        .ab-cross-list{ display:flex; flex-direction:column; gap:14px; max-width:560px; }
        .ab-cross-card{ border:1px solid var(--line); border-radius:14px; padding:16px; background:var(--surface); }
        .ab-cross-msg{ font-size:13px; color:var(--gold); font-weight:600; margin-bottom:10px; }
        .ab-cross-body{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .ab-cross-img{ width:44px; height:44px; border-radius:10px; background-size:cover; background-position:center; flex-shrink:0; }
        .ab-cross-info{ flex:1; min-width:120px; }
        .ab-cross-name{ font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:14px; }
        .ab-cross-price{ font-family:'JetBrains Mono',monospace; color:var(--gold); font-size:13px; margin-top:2px; }
        .ab-cross-durations{ display:flex; gap:6px; flex-wrap:wrap; margin-top:6px; }
        .ab-detail-price{ margin-top:18px; font-family:'JetBrains Mono',monospace; }
        .ab-detail-price .ab-price-num{ font-size:32px; }
        .ab-detail-discount{
          display:inline-flex; align-items:center; gap:6px; margin-top:8px;
          color:var(--gold); font-size:13px; font-weight:600;
        }

        .ab-ticket-clickzone{ display:contents; }

        .ab-ad-slot{
          margin:44px 0; padding:30px 24px; border-radius:16px;
          border:2px dashed var(--line); background:var(--surface);
          text-align:center;
        }
        .ab-ad-slot-tag{
          font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.08em;
          color:var(--muted); margin-bottom:8px;
        }
        .ab-ad-slot-text{ font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:16px; color:var(--text); }
        .ab-ad-slot-sub{ font-size:12.5px; color:var(--muted); margin-top:4px; }

        .ab-faq{ margin-top:60px; max-width:760px; }
        .ab-faq-title{ font-size:22px; margin:0 0 20px; font-family:'Space Grotesk',sans-serif; }
        .ab-faq-item{ border-bottom:1px solid var(--line); }
        .ab-faq-q{
          width:100%; display:flex; align-items:center; justify-content:space-between;
          background:none; border:none; text-align:left; cursor:pointer;
          padding:16px 0; font-size:14.5px; font-weight:600; color:var(--text);
          font-family:'Inter',sans-serif;
        }
        .ab-faq-chevron{ transition:transform .25s ease; color:var(--muted); flex-shrink:0; }
        .ab-faq-chevron.open{ transform:rotate(90deg); }
        .ab-faq-a{ color:var(--muted); font-size:13.5px; line-height:1.6; margin:0 0 18px; }

        .ab-livechat-btn{
          position:fixed; bottom:22px; right:22px; z-index:56;
          width:56px; height:56px; border-radius:50%;
          background:#25D366; color:#FFFFFF;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 12px 28px -10px rgba(37,211,102,0.6);
          text-decoration:none;
        }
        .ab-livechat-pulse{
          position:absolute; inset:0; border-radius:50%; background:#25D366;
          animation:ab-livechat-ping 2.2s cubic-bezier(0,0,.2,1) infinite; z-index:-1;
        }
        @keyframes ab-livechat-ping{
          0%{ transform:scale(1); opacity:.6; }
          100%{ transform:scale(1.9); opacity:0; }
        }

        .ab-fake-purchase{
          position:fixed; bottom:22px; left:22px; z-index:55;
          display:flex; align-items:center; gap:12px;
          background:var(--bg); border:1px solid var(--line); border-radius:14px;
          padding:12px 16px; max-width:280px;
          box-shadow:0 16px 32px -12px rgba(0,0,0,0.25);
          transform:translateY(20px); opacity:0; pointer-events:none;
          transition:transform .4s ease, opacity .4s ease;
        }
        .ab-fake-purchase.show{ transform:translateY(0); opacity:1; }
        .ab-fake-purchase-icon{
          width:34px; height:34px; border-radius:50%; background:var(--surface2); color:var(--gold);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .ab-fake-purchase-name{ font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:13px; }
        .ab-fake-purchase-detail{ font-size:12px; color:var(--muted); margin-top:2px; }

        .ab-online-counter{
          position:fixed; bottom:22px; left:50%; transform:translateX(-50%); z-index:54;
          display:flex; align-items:center; gap:7px;
          background:var(--bg); border:1px solid var(--line); border-radius:100px;
          padding:7px 14px; font-size:12px; color:var(--muted);
          box-shadow:0 8px 20px -10px rgba(0,0,0,0.2);
        }
        .ab-online-dot{
          width:8px; height:8px; border-radius:50%; background:#2ecc71;
          box-shadow:0 0 0 0 rgba(46,204,113,0.6);
          animation:ab-pulse 1.8s infinite;
        }
        @keyframes ab-pulse{
          0%{ box-shadow:0 0 0 0 rgba(46,204,113,0.55); }
          70%{ box-shadow:0 0 0 8px rgba(46,204,113,0); }
          100%{ box-shadow:0 0 0 0 rgba(46,204,113,0); }
        }

        .ab-msg-overlay{
          position:fixed; inset:0; z-index:90; background:rgba(26,18,16,0.6);
          display:flex; align-items:center; justify-content:center; padding:20px;
        }
        .ab-msg-box{
          position:relative; background:var(--bg); border-radius:20px; max-width:440px; width:100%;
          padding:32px 28px; text-align:center; box-shadow:0 30px 60px -20px rgba(0,0,0,0.4);
        }
        .ab-msg-box p{ font-size:16px; line-height:1.6; margin:10px 0 0; }
        .ab-msg-close{ position:absolute; top:14px; right:14px; background:none; border:none; color:var(--muted); cursor:pointer; padding:4px; }

        .ab-wheel-modal{
          position:relative; background:var(--bg); border-radius:24px; max-width:380px; width:100%;
          padding:30px 24px; text-align:center; box-shadow:0 30px 60px -20px rgba(0,0,0,0.4);
        }
        .ab-wheel-title{
          display:flex; align-items:center; justify-content:center; gap:8px;
          font-size:20px; margin:0 0 4px; font-family:'Space Grotesk',sans-serif; color:var(--gold);
        }
        .ab-wheel-sub{ color:var(--muted); font-size:13px; margin:0 0 20px; }
        .ab-wheel-wrap{ position:relative; width:240px; height:240px; margin:0 auto; }
        .ab-wheel-pointer{
          position:absolute; top:-6px; left:50%; transform:translateX(-50%);
          width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent;
          border-top:20px solid var(--text); z-index:3;
        }
        .ab-wheel-disc{
          width:100%; height:100%; border-radius:50%; position:relative; overflow:hidden;
          border:5px solid var(--surface2); box-shadow:0 10px 30px -10px rgba(0,0,0,0.4);
          transition:transform 4.2s cubic-bezier(.17,.67,.16,.99);
        }
        .ab-wheel-label-wrap{ position:absolute; inset:0; }
        .ab-wheel-label{
          position:absolute; top:18px; left:50%; width:80px;
          display:flex; flex-direction:column; align-items:center; gap:3px;
          font-size:10.5px; font-weight:700; color:#FFFFFF; text-align:center; line-height:1.2;
          text-shadow:0 1px 3px rgba(0,0,0,0.4);
        }
        .ab-wheel-label img{ width:22px; height:22px; border-radius:6px; object-fit:cover; }
        .ab-wheel-used-up{ color:var(--muted); font-size:13px; margin-top:18px; }
        .ab-wheel-count{ color:var(--muted); font-size:12px; margin-top:10px; }
        .ab-wheel-result{
          margin-top:18px; padding-top:16px; border-top:1px solid var(--line);
          font-size:14px;
        }
        .ab-wheel-promo-box{
          display:inline-flex; align-items:center; gap:10px; margin:10px 0;
          background:var(--surface2); border-radius:10px; padding:10px 16px;
          font-family:'JetBrains Mono',monospace; font-weight:700; font-size:15px; color:var(--gold);
        }
        .ab-wheel-promo-box button{ background:none; border:none; color:var(--gold); cursor:pointer; display:flex; }
        .ab-wheel-note{ color:var(--muted); font-size:12px; margin:0; }

        .ab-wheel-fab{
          position:fixed; bottom:90px; left:22px; z-index:53;
          width:52px; height:52px; border-radius:50%;
          background:linear-gradient(135deg,#FFD84D,var(--gold)); color:#FFFFFF;
          border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
          box-shadow:0 12px 26px -10px rgba(225,18,42,0.55);
        }
        .ab-game-fab{
          position:fixed; bottom:158px; left:22px; z-index:53;
          width:52px; height:52px; border-radius:50%;
          background:linear-gradient(135deg,var(--teal),#1D0D0E); color:#FFFFFF;
          border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
          box-shadow:0 12px 26px -10px rgba(0,0,0,0.5);
        }

        .ab-game-modal{
          position:relative; background:var(--bg); border-radius:22px; max-width:580px; width:100%;
          padding:26px; text-align:center; box-shadow:0 30px 60px -20px rgba(0,0,0,0.4);
        }
        .ab-game-title{
          display:flex; align-items:center; justify-content:center; gap:8px;
          font-size:18px; margin:0 0 16px; font-family:'Space Grotesk',sans-serif; color:var(--gold);
        }
        .ab-game-canvas-wrap{ position:relative; border-radius:14px; overflow:hidden; cursor:pointer; touch-action:none; }
        .ab-game-canvas{ width:100%; height:auto; display:block; }
        .ab-game-overlay{
          position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px;
          background:rgba(0,0,0,0.55); color:#FFFFFF; font-size:13.5px; text-align:center; padding:20px;
        }
        .ab-game-scores{
          display:flex; justify-content:center; gap:24px; margin-top:14px;
          font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--muted);
        }

        .ab-section{ padding:90px 6vw; }
        .ab-section-head{ margin-bottom:44px; max-width:60ch; }
        .ab-kicker{ font-family:'JetBrains Mono',monospace; font-size:12.5px; color:var(--gold); letter-spacing:.08em; margin-bottom:10px; }
        .ab-h2{ font-size:clamp(24px,3.4vw,34px); font-weight:700; margin:0 0 12px; }
        .ab-section-sub{ color:var(--muted); font-size:15.5px; line-height:1.6; }

        .ab-cat-pills{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:32px; }
        .ab-pill{
          display:inline-flex; align-items:center; gap:7px;
          padding:9px 18px; border-radius:100px; border:1px solid var(--line);
          background:var(--surface); color:var(--muted); font-size:13.5px; font-weight:600;
          cursor:pointer; transition:all .2s ease; font-family:'Inter',sans-serif;
        }
        .ab-pill:hover{ border-color:var(--gold); color:var(--text); }
        .ab-pill.active{ background:var(--gold); border-color:var(--gold); color:#FFFFFF; }

        .ab-steps{ display:grid; gap:28px; }
        @media(min-width:800px){ .ab-steps{ grid-template-columns:repeat(3,1fr); } }
        .ab-step{ border:1px solid var(--line); border-radius:16px; padding:26px 24px; background:var(--surface); position:relative; }
        .ab-step-n{ font-family:'JetBrains Mono',monospace; color:var(--teal); font-size:13px; margin-bottom:14px; display:block; }
        .ab-step h3{ font-size:19px; margin:0 0 8px; }
        .ab-step p{ color:var(--muted); font-size:14.5px; margin:0; line-height:1.55; }

        .ab-grid{ display:grid; gap:22px; }
        @media(min-width:640px){ .ab-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1040px){ .ab-grid{ grid-template-columns:repeat(3,1fr); } }

        .ab-ticket{
          background:var(--surface); border:1px solid var(--line); border-radius:16px; overflow:hidden;
          transition:border-color .2s ease, transform .2s ease, box-shadow .2s ease;
          position:relative;
        }
        .ab-ticket:hover{
          border-color:rgba(225,18,42,0.5); transform:translateY(-4px);
          box-shadow:0 20px 38px -18px rgba(225,18,42,0.28), 0 8px 16px -10px rgba(26,18,16,0.25);
        }
        .ab-discount-badge{
          position:absolute; top:14px; right:-8px; z-index:2;
          background:linear-gradient(135deg,#FFD84D,#E1122A);
          color:#FFFFFF; font-family:'JetBrains Mono',monospace; font-weight:700; font-size:12.5px;
          padding:5px 14px 5px 12px; border-radius:6px 0 0 6px;
          box-shadow:0 6px 14px -4px rgba(0,0,0,0.35);
          letter-spacing:.02em;
        }
        .ab-discount-badge::after{
          content:""; position:absolute; top:100%; right:0; border-style:solid;
          border-width:4px 8px 0 0; border-color:#8a0d1c transparent transparent transparent;
        }

        .ab-ticket-top{ display:flex; justify-content:space-between; align-items:flex-start; padding:20px 20px 22px; }
        .ab-ticket-eyebrow{ font-family:'JetBrains Mono',monospace; font-size:10.5px; color:var(--muted); letter-spacing:.08em; margin-bottom:6px; }
        .ab-ticket-name{ font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:18px; }
        .ab-ticket-plan{ color:var(--muted); font-size:13.5px; margin-top:3px; }
        .ab-ticket-icon{ color:var(--teal); flex-shrink:0; margin-top:2px; }

        .ab-ticket-perf{ position:relative; border-top:1px dashed var(--line); margin:0; }
        .ab-notch{ position:absolute; top:-9px; width:18px; height:18px; border-radius:50%; background:var(--bg); }
        .ab-notch.left{ left:-9px; }
        .ab-notch.right{ right:-9px; }

        .ab-ticket-bottom{ display:flex; justify-content:space-between; align-items:center; padding:16px 20px 20px; }
        .ab-ticket-code{ font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--muted); }
        .ab-ticket-price{ font-family:'JetBrains Mono',monospace; }
        .ab-price-num{ font-size:20px; font-weight:700; color:var(--gold); }
        .ab-price-cur{ font-size:13px; color:var(--gold); margin-right:2px; }
        .ab-price-per{ font-size:12px; color:var(--muted); }

        .ab-trust{ display:grid; gap:20px; }
        @media(min-width:800px){ .ab-trust{ grid-template-columns:repeat(3,1fr); } }
        .ab-trust-item{ display:flex; gap:14px; padding:22px; border:1px solid var(--line); border-radius:14px; }
        .ab-trust-item svg{ color:var(--teal); flex-shrink:0; margin-top:2px; }
        .ab-trust-item h4{ margin:0 0 5px; font-size:15.5px; font-family:'Space Grotesk',sans-serif; }
        .ab-trust-item p{ margin:0; color:var(--muted); font-size:13.5px; line-height:1.5; }

        .ab-contact-grid{ display:grid; gap:16px; }
        @media(min-width:700px){ .ab-contact-grid{ grid-template-columns:repeat(3,1fr); } }
        .ab-contact-card{
          display:flex; gap:14px; align-items:flex-start; text-decoration:none; color:var(--text);
          border:1px solid var(--line); border-radius:14px; padding:22px;
          background:var(--surface); transition:border-color .2s ease, transform .2s ease;
          position:relative;
        }
        .ab-contact-card:hover{ border-color:rgba(225,18,42,0.45); transform:translateY(-2px); }
        .ab-contact-card svg:first-child{ color:var(--teal); flex-shrink:0; margin-top:2px; }
        .ab-contact-card h4{ margin:0 0 5px; font-family:'Space Grotesk',sans-serif; font-size:15.5px; }
        .ab-contact-card p{ margin:0; color:var(--muted); font-size:13.5px; line-height:1.5; }
        .ab-contact-arrow{ position:absolute; top:20px; right:18px; color:var(--muted); }

        .ab-cta{
          margin:0 6vw 90px; padding:46px 6vw; border-radius:22px;
          background:linear-gradient(120deg, rgba(225,18,42,0.14), rgba(140,22,32,0.10));
          border:1px solid var(--line);
          display:flex; flex-wrap:wrap; gap:24px; align-items:center; justify-content:space-between;
        }
        .ab-cta h3{ font-size:24px; margin:0 0 6px; }
        .ab-cta p{ color:var(--muted); margin:0; font-size:14.5px; }

        .ab-footer{
          border-top:1px solid var(--line); padding:36px 6vw; display:flex; flex-wrap:wrap;
          gap:16px; justify-content:space-between; align-items:center; color:var(--muted); font-size:13px;
        }
        .ab-footer button{ background:none; border:none; cursor:pointer; font-family:'Inter',sans-serif; }
        .ab-footer a, .ab-footer button{ color:var(--muted); text-decoration:none; }
        .ab-footer a:hover, .ab-footer button:hover{ color:var(--text); }

        .ad-login-wrap{ max-width:420px; margin:0 auto; }
        .ad-login{ display:flex; flex-direction:column; gap:12px; }
        .ad-login input{
          padding:12px 14px; border-radius:10px; border:1px solid var(--line);
          font-family:'Inter',sans-serif; font-size:14px; background:var(--surface); color:var(--text);
        }
        .ad-error{ color:var(--gold); font-size:13px; margin:0; }
        .ad-header{ display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap; }
        .ad-status{
          display:inline-block; background:var(--surface2); color:var(--text);
          padding:8px 14px; border-radius:8px; font-size:13.5px; margin-bottom:20px;
        }
        .ad-stat-card{
          display:flex; align-items:center; gap:12px;
          border:1px solid var(--line); border-radius:14px; padding:16px 20px; margin-bottom:24px;
          background:var(--surface); max-width:360px;
        }
        .ad-stat-dot{ width:10px; height:10px; border-radius:50%; background:var(--gold); flex-shrink:0; }
        .ad-stat-number{ font-family:'JetBrains Mono',monospace; font-size:24px; font-weight:700; color:var(--gold); }
        .ad-stat-label{ font-size:12px; color:var(--muted); }
        .ad-section-title{ font-size:19px; margin:36px 0 16px; font-family:'Space Grotesk',sans-serif; }
        .ad-settings{ display:flex; flex-direction:column; gap:14px; max-width:420px; }
        .ad-settings label{ display:flex; flex-direction:column; gap:6px; font-size:13.5px; color:var(--muted); }
        .ad-settings input{
          padding:11px 13px; border-radius:9px; border:1px solid var(--line);
          font-family:'Inter',sans-serif; font-size:14px; background:var(--surface); color:var(--text);
        }
        .ad-products{ display:flex; flex-direction:column; gap:12px; }
        .ad-product-row{
          display:grid; gap:8px; align-items:center;
          grid-template-columns:1fr;
          border:1px solid var(--line); border-radius:12px; padding:12px; background:var(--surface);
        }
        @media(min-width:900px){
          .ad-product-row{ grid-template-columns:1.4fr 1.4fr 0.8fr 1fr auto auto; }
        }
        .ad-product-block .ad-product-row{ border-radius:12px 12px 0 0; }
        .ad-product-block:has(.ad-customer-actions) .ad-product-row{ border-bottom:none; }
        .ad-desc-textarea{
          width:100%; padding:10px 12px; border-radius:9px; border:1px solid var(--line);
          font-family:'Inter',sans-serif; font-size:13.5px; background:var(--surface); color:var(--text); resize:vertical;
          margin-top:6px;
        }
        .ad-duration-editor{ display:flex; flex-direction:column; gap:8px; }
        .ad-product-row input, .ad-product-row select{
          padding:9px 10px; border-radius:8px; border:1px solid var(--line);
          font-family:'Inter',sans-serif; font-size:13.5px; background:var(--bg); color:var(--text);
        }
        .ad-delete{
          background:transparent; border:1px solid rgba(225,18,42,0.4); color:var(--gold);
          border-radius:8px; padding:9px 14px; cursor:pointer; font-size:13px; font-weight:600;
        }
        .ad-delete:hover{ background:rgba(225,18,42,0.08); }

        .ad-customer-row{
          display:flex; flex-wrap:wrap; gap:14px; align-items:center;
          border:1px solid var(--line); border-radius:12px; padding:12px 16px; background:var(--surface);
          font-size:13.5px;
        }
        .ad-customer-search{
          width:100%; max-width:360px; padding:10px 14px; border-radius:9px; border:1px solid var(--line);
          font-family:'Inter',sans-serif; font-size:13.5px; background:var(--surface); color:var(--text);
          margin-bottom:14px;
        }
        .ad-customer-block{ display:flex; flex-direction:column; gap:0; }
        .ad-customer-balance{ font-family:'JetBrains Mono',monospace; color:var(--gold); font-weight:700; }
        .ad-banned-tag{
          background:rgba(225,18,42,0.12); color:var(--gold); border-radius:100px; padding:3px 10px; font-size:11.5px; font-weight:700;
        }
        .ad-customer-actions{
          border:1px solid var(--line); border-top:none; border-radius:0 0 12px 12px; padding:14px 16px; background:var(--bg);
          display:flex; flex-direction:column; gap:10px;
        }
        .ad-customer-action-row{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .ad-customer-action-row input{
          padding:9px 12px; border-radius:8px; border:1px solid var(--line);
          font-family:'Inter',sans-serif; font-size:13.5px; background:var(--surface); color:var(--text);
        }
        .ad-customer-email{ font-weight:600; color:var(--text); }
        .ad-customer-name{ color:var(--muted); }
        .ad-customer-date{ color:var(--muted); font-family:'JetBrains Mono',monospace; font-size:12px; margin-left:auto; }

        .ad-order-row, .ad-review-row{
          border:1px solid var(--line); border-radius:12px; padding:14px 16px; background:var(--surface);
        }
        .ad-order-head{ display:flex; flex-wrap:wrap; gap:14px; align-items:center; font-size:13.5px; }
        .ad-order-total{ font-family:'JetBrains Mono',monospace; color:var(--gold); font-weight:700; }
        .ad-order-items{ display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
        .ad-order-item{
          background:var(--surface2); border-radius:100px; padding:5px 12px; font-size:12px; color:var(--text);
        }

        .ab-agree-row{ display:flex; align-items:flex-start; gap:9px; font-size:13px; color:var(--muted); cursor:pointer; }

        .ab-balance-card{
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px;
          border:1px solid var(--line); border-radius:14px; padding:18px 20px; margin-top:20px;
          background:linear-gradient(120deg, rgba(225,18,42,0.08), rgba(140,22,32,0.05));
        }
        .ab-balance-label{ font-size:12.5px; color:var(--muted); }
        .ab-balance-amount{ font-family:'JetBrains Mono',monospace; font-size:26px; font-weight:700; color:var(--gold); margin-top:2px; }
        .ab-topup-note{
          border:1px dashed var(--line); border-radius:12px; padding:16px 18px; margin-top:12px;
          font-size:13.5px; color:var(--muted); line-height:1.6;
        }
        .ab-topup-note p{ margin:0 0 6px; }
        .ab-agree-row input{ margin-top:3px; accent-color:var(--gold); width:15px; height:15px; flex-shrink:0; }
        .ab-rules-link{
          background:none; border:none; padding:0; color:var(--gold); font-weight:600; cursor:pointer;
          text-decoration:underline; font-size:13px; font-family:'Inter',sans-serif;
        }

        .ab-modal-overlay{
          position:fixed; inset:0; z-index:80; background:rgba(26,18,16,0.55);
          display:flex; align-items:center; justify-content:center; padding:20px;
          animation:ab-fadein .2s ease both;
        }
        .ab-modal{
          background:var(--bg); border-radius:20px; max-width:560px; width:100%;
          max-height:85vh; overflow-y:auto; padding:28px;
          box-shadow:0 30px 60px -20px rgba(0,0,0,0.4);
        }
        .ab-modal-head{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; }
        .ab-modal-head h3{ font-size:20px; margin:0; font-family:'Space Grotesk',sans-serif; }
        .ab-modal-close{ background:none; border:none; color:var(--muted); cursor:pointer; padding:4px; }
        .ab-modal-intro{ color:var(--muted); font-size:14px; margin:0 0 22px; }
        .ab-modal-body{ display:flex; flex-direction:column; gap:22px; }
        .ab-rule-group-title{
          font-size:14px; font-weight:700; color:var(--gold); text-transform:uppercase; letter-spacing:.04em;
          margin:0 0 12px; font-family:'Space Grotesk',sans-serif;
          border-bottom:1px solid var(--line); padding-bottom:8px;
        }
        .ab-rule-item{ display:flex; gap:10px; margin-bottom:10px; }
        .ab-rule-num{ font-family:'JetBrains Mono',monospace; color:var(--gold); font-size:12px; flex-shrink:0; margin-top:2px; min-width:26px; }
        .ab-rule-item p{ font-size:13px; color:var(--muted); margin:0; line-height:1.6; }

        .ab-rules-page{ display:flex; flex-direction:column; gap:38px; max-width:760px; }
        .ab-rules-page .ab-rule-group-title{ font-size:15px; }
        .ab-rules-page .ab-rule-item p{ font-size:14px; }
      `}</style>

      <ProductTicker products={products} />
      <nav className={`ab-nav ${navSolid ? "solid" : ""}`}>
        <button className="ab-brand" onClick={() => navigate("home")}>
          <span className="ab-brand-mark">
            <img src="/skyflix-icon.png" alt="SkyFlix" />
          </span>
          SkyFlix Azerbaycan
        </button>
        <div className="ab-navlinks">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`ab-navlink ${page === item.key ? "active" : ""}`}
              onClick={() => navigate(item.key)}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>
        <div className="ab-navright">
          <button
            className="ab-langbtn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Tema / Theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="ab-langwrap">
            <button className="ab-langbtn" onClick={() => setLangMenuOpen((v) => !v)} title="Dil / Language / ენა">
              {LANG_NAMES[lang]}
            </button>
            {langMenuOpen && (
              <div className="ab-langmenu">
                {["az", "en", "ka", "ru"].map((l) => (
                  <button
                    key={l}
                    className={`ab-langoption ${lang === l ? "active" : ""}`}
                    onClick={() => {
                      setLang(l);
                      setLangMenuOpen(false);
                    }}
                  >
                    {LANG_NAMES[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="ab-accountbtn ab-cartbtn" onClick={() => navigate("sebet")} aria-label={t("myCart")} title={t("myCart")}>
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="ab-cart-badge">{cartCount}</span>}
          </button>
          <button className="ab-accountbtn" onClick={() => navigate("hesab")} aria-label={t("myAccount")} title={t("myAccount")}>
            <User size={18} />
          </button>
          <button className="ab-btn ab-btn-gold" onClick={() => navigate("elaqe")}>
            {t("orderNow")} <ChevronRight size={15} />
          </button>
          <button className="ab-menubtn" onClick={() => setMenuOpen(true)} aria-label="Menyunu aç">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="ab-mobilemenu">
          <div className="ab-mobilemenu-head">
            <div className="ab-brand">
              <span className="ab-brand-mark">
                <img src="/skyflix-icon.png" alt="SkyFlix" />
              </span>
              SkyFlix Azerbaycan
            </div>
            <button className="ab-menubtn" onClick={() => setMenuOpen(false)} aria-label="Menyunu bağla">
              <X size={20} />
            </button>
          </div>
          {NAV_ITEMS.map((item) => (
            <button key={item.key} className="ab-navlink" onClick={() => navigate(item.key)}>
              {t(item.labelKey)}
            </button>
          ))}
          <button className="ab-navlink" onClick={() => navigate("hesab")}>
            {t("myAccount")}
          </button>
          <button className="ab-navlink" onClick={() => navigate("sebet")}>
            {t("myCart")} {cartCount > 0 ? `(${cartCount})` : ""}
          </button>
          <div className="ab-mobile-langrow">
            {["az", "en", "ka", "ru"].map((l) => (
              <button
                key={l}
                className={`ab-pill ${lang === l ? "active" : ""}`}
                onClick={() => {
                  setLang(l);
                  setMenuOpen(false);
                }}
              >
                {LANG_NAMES[l]}
              </button>
            ))}
          </div>
          <button
            className="ab-navlink"
            style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setMenuOpen(false);
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      )}

      <main className="ab-page" key={page}>
        {page === "home" && <HomePage go={go} products={products} onAdd={addToCart} lang={lang} t={t} reviews={reviews} onOpenReviews={setReviewsModalProduct} />}
        {page === "paketler" && <PaketlerPage products={products} onAdd={addToCart} t={t} reviews={reviews} onOpenReviews={setReviewsModalProduct} categories={categories} go={go} />}
        {page.startsWith("mehsul-") && (
          <ProductDetailPage
            productId={page.replace("mehsul-", "")}
            products={products}
            onAdd={addToCart}
            t={t}
            lang={lang}
            reviews={reviews}
            onOpenReviews={setReviewsModalProduct}
            go={go}
          />
        )}
        {page === "necehisleyir" && <NeceIsleyirPage t={t} />}
        {page === "etibar" && <EtibarPage t={t} />}
        {page === "qaydalar" && <QaydalarPage t={t} lang={lang} />}
        {page === "reylerall" && <ReviewsPage reviews={reviews} products={products} t={t} />}
        {page === "elaqe" && <ElaqePage settings={settings} t={t} />}
        {page === "admin" && <AdminPage onDataChanged={reload} />}
        {page === "hesab" && <CustomerAuthPage t={t} lang={lang} settings={settings} />}
        {page === "sebet" && (
          <SebetPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} settings={settings} t={t} products={products} onAdd={addToCart} go={go} />
        )}
      </main>

      <footer className="ab-footer">
        <button className="ab-brand" style={{ fontSize: 15 }} onClick={() => navigate("home")}>
          <span className="ab-brand-mark" style={{ width: 20, height: 20 }}>
            <img src="/skyflix-icon.png" alt="SkyFlix" />
          </span>
          SkyFlix Azerbaycan
        </button>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV_ITEMS.slice(1).map((item) => (
            <button key={item.key} onClick={() => navigate(item.key)}>
              {t(item.labelKey)}
            </button>
          ))}
        </div>
        <div>© 2026 SkyFlix Azerbaycan. {t("allRightsReserved")}</div>
      </footer>
    </div>
  );
}
