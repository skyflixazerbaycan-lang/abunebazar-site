import React, { useEffect, useRef, useState } from "react";
import { Shield, Clock, MessageCircle, Ticket, ChevronRight, Star, Menu, X, User, ShoppingCart, Minus, Plus, Play, Pause, VolumeX, Wallet, Ban, Send, CheckCircle2, LayoutGrid, Tv, Music2, Bot, Zap, BadgeCheck, Headset, Gamepad2, MessageSquare, Sun, Moon, Film, Book, Dumbbell, Palette, Camera, Briefcase, Copy, Gift, CreditCard, RotateCw, Tag, Search, KeyRound, Trash2, Eye, EyeOff, Upload } from "lucide-react";
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

const GREETING_TEXT =
  "Salam, mən SkyFlix-in səsli botuyam. Birazdan sənin üçün saytda gəzib sifariş verərkən ürəyin sıxılmasın deyə, Bella Ciao mahnısını qoşacam. Mahnını istəsən dayandıra və ya davam etdirə bilərsən. Xoş alışverişlər!";

function VideoWidget({ videoId }) {
  const wrapperRef = useRef(null);
  const playerRef = useRef(null);
  const startedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    function createPlayer() {
      const target = document.createElement("div");
      wrapperRef.current.appendChild(target);
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
            setIsPlaying(true);
            setShowControl(true);
          },
          onStateChange: (e) => {
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2) setIsPlaying(false);
          },
        },
      });
    }

    function loadPlayer() {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = createPlayer;
      }
    }

    function startPlayer() {
      if (startedRef.current) return;
      startedRef.current = true;

      try {
        if (window.speechSynthesis) {
          const utter = new SpeechSynthesisUtterance(GREETING_TEXT);
          utter.lang = "az-AZ";
          utter.rate = 1;
          utter.onend = loadPlayer;
          utter.onerror = loadPlayer;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
          const fallback = setTimeout(loadPlayer, 12000);
          utter.onend = () => {
            clearTimeout(fallback);
            loadPlayer();
          };
        } else {
          loadPlayer();
        }
      } catch (e) {
        loadPlayer();
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

  function toggle() {
    const p = playerRef.current;
    if (!p) return;
    if (isPlaying) {
      p.pauseVideo();
      setIsPlaying(false);
    } else {
      p.playVideo();
      setIsPlaying(true);
    }
  }

  return (
    <>
      <div ref={wrapperRef} className="ab-video-widget-hidden" />
      {showControl && (
        <button className="ab-music-btn" onClick={toggle} title={isPlaying ? "Mahnını dayandır" : "Mahnını davam etdir"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      )}
    </>
  );
}

// =====================================================
// HESAB ŞİFRƏLƏRİ SİSTEMİ (müştəri linki + admin bölməsi)
// =====================================================

const SKY_SITE_URL = "https://skyflixazerbaycan.com";

const SKY_RULES_TITLE = "Hesabdan xaric olunub, pulunuzun geri qaytarılmaması baş verməməsi üçün aşağıdakı qaydalara əməl edin";
const SKY_GUIDE_1 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAO6AbgDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAEFAwQGAgcI/8QAVRAAAQMDAQMHBQwFCgQFBAMAAQACAwQFEQYSITETFBVBUVORByJhcYEyMzRSYnJzkpOhsdEWQrLB4SM1VFVjdYKUorMXJENWCCY2N/AlRHTxg8LS/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EACoRAQACAgIBAgUDBQAAAAAAAAABEQISAyExBFETIkFhcRQygZGhsdHh/9oADAMBAAIRAxEAPwD5OpUKVh6kooClBKIiKlSoQIJUqFKhApUIivSleVKKlAiIJUrypUVKlQiolFClATKIoCIiApUIgIiICIiAiIgIoRUERRlQFCIqgiKEBQihEEREEIigqoKFKhAUKVCIKEKFBCIiAihSiJUqAiKlSoUoM9JR1Va5zKOmnqHNGXCGNzyB2nAWFwLXEOBaQcEEYIK+gXC41mmfJ5poWOpko5rk6Wpqp4Th0jmkBoJ7ADw9C2NaXRlpu9p1JFb6WW4XGzsmPLMyyOfd/K7PAnHDPrSk2fO5YZYHBk8UkbiMhsjC047cFTBBNUythpoZJpXcGRsLnH2BfRPKPcIqfW9mr7lRsuMYtsD5aeQ4EpO32ek54LmrNqWtt/SVNYKNtPU3OUNikgLjNC3ayI4z6c47UImZi1DUQTUsphqoZIZW8WSsLXD2FZZqCtggZUT0dTFC/wBzJJC5rXeokYXfazu7razTFPdxBc7/AGzalreVO0ACcsie4e6I3E+r0rZteoLrUWDUF71XVPktVfC+Cjo5TlssxO7kmng1vb+SUbTVvmAWerpKmim5Gsp5YJdkO2JWFrsEZBwe0Ls/Iva6W46xa6sa1/NKd08bHDILwQAfZknwXvyy2ito9YVFwlikNJWNY6KbGW5DQ0tz1EY4elK6Xb5qcGpUbxjsPBFG0oiIJBUrymUHpFGVKiilQiolFCZQSihEEooTKCUUIgIiKAijKjKoklQiIgitdK0lur9Q0VLeKjm9BI8iaXbDNkbJI848N+Bld5pa3aKpNXX+kraihqLbFFHzSSrma5pyMv2XcCQd2RvVpmcqfLsHGcHHbhe5YJYmsdI3Afw3rc5WIWuWNr252jstzvIzu+5eblLG+npwx7XEDeAeG4KLbQKhdJoCmgqr++Ophjmj5jUu2ZGhwyIiQcHrBW75L6tsl9pbXU0Nvqaao5R7zU0rZHgticRhx3gZaNyJMuNyO1F9D0rUSXe2ahuIobAytiFKyI1VNFFTsBc8O3O80Ejx3LjtROmdeJzUi3iUbId0eGchwHudnd68deVUu5pp01NPVSGOnjdI4DJx1DtK2Ohq7rib9oFdaQA5lXOxv2gM+jBXd6Hmp3SVNG6igfI6nmkdPINp2A0YaAdwGcnPWs45XMx7OvNx/Dwwy9/9vlRs1cOMTftAsc1qrYYy98B2RvOyQcL67pGue2liD6ajp7VS5dcKiaMPM+eDckceoALlah0T6mV0DNiF0hLGH9VpO4eC1ThtL5+i2K2FkL2bDs7bS4j4vnEY+5ayNChSoQCihEQUhQiCVKhEV6QKFKDrrXqO0VGnaex6poKupp6OV0lJNRyhkjA73TDn9U//ADgq3WGoHakuYqGwCmpoYW09LTg55KNvAZ6yqREIiLdbetaPqdSWy92yn5GahpY4WtqAJA5zQ4E4HV53rWTR2q7bZa+4XK6W2apuFSXGKencxnIbWdotB3A5O49QXHKUtNYdNW3DSktbSzwWq6loqOUrBUVgeZ2b8gHqJOMnsyrfUWqtK36US1Vnu7XRRclTxMq2NihaBgBrRuAXBBSi6rPTd8rNO3enudAW8tEcFrvcvaeLT6CvsA8s1hloCai2V3OCN8GyxzCfnE8PYvhilLJxjLyutWaiqNTXd1dURMgYGiOGCP3MTBvA9J3kkqmUKVGo6SihSipRQpQEyiIJypXlEHpF5ypyipRRlMqCUUZTKCVCjKKicqMoiIIiIChEQWmmKu3UN+oqq803OqCN5M0OyHbQwQNx3Hfg49C6m26i0ZDqi81tXYjJbKiNoo4ObtPJkDzvNzhuTv3cFwKIzMW6mC76dZoOrtklsJvkkpdFV8k07I2gR5+cjDcjGE1fd9OXG02iCxWw0lVTsxVSck1m2dkDiD52/JyVyqJZrC20xeW2G7CufSiqZyMkTojIWbQe0tO8A44rdodRW61X2iudoshphTMka+F9a6XlC5paDkt3Yz7VzaKpML7T1+pbZbblb6+2c/pq8xF7RUmEtMZJG8A9ZVTcpqSorHyW+jNHTnGzAZjLs7t/nEAnetYlEKWljuwtvLRyML4pRv2eLT2q7tur47bO6el5QPdG6M7UYPmu49a49FIiIm2sspyxjGfo7+j8oj6O3RUEcUL6aIktbNRtfv7d54+lU1bqSGZ8s0cTuVkcXYDAxoJ9A4D0LmEVY1gcSSSeJOSoRQiiIoRBERACKApQFKhSglFClFSpUIglERFSpBUIglECIJRQpUUUqEQekUIglSoRFSihEEoiICIiAiIgIoRBKKEQERQglQihEEREBQiIghKEqFQUKVCAiKEQUKVCAoREEIiIgUUFEEKQoUoJREQSpUNBJAAJJ3ADrXW3LTtDpzTxdfjIb/Wta6loo345qzPu5fSeGz/EgW5NSoRFSpUKUGU08wgE5idyR4PxuQU8xhMwjcYhxfjcuhoIRUWNkJ/XYQPXk4WpEC3TkwcMEOcCP8QXn+NPj70+nPoIiIyvqcb/AJVkVFVSsD4oHuaeBA3FTJSVEZaJIXtLzhuRxKt6eaSnsLJIfdg7t2f1lWVNwqpXRmbAMbttvmY3rWOeeUz7OfLwcHHhjMzNzET9u0dH1n9Gk8F45pU8ryXIv5TG1s4347Vd0VbPNbKioeW8ozOyQ3dwWraamSqunKTEF3JEbhjcs/Ez7uPDrPpeC8Ixmfm/Hho9H1n9Gk8FjFPMYTMI3ckOL8blZVdxr4ppQ1uI2uIBMXV616i/9OSes/tBXfKIiZZn03DllljhM9RM9/ZTLNJTzxOa2SJzXP8AcgjisQ4j1q31Fukp8fFP4hbyymMoj3efj4oy4s85+lf3Vk0EsDg2aNzCd4DhxUzU80ABmjcza4bQ4q/jjZcoKSodjLDlw7e0eICqbzUcvWuAOWx+aPX1rGHJOWVf1ejn9Jhxcc8l9TVNFSoRdnz0ooRFSihEEooRBKKEREqEUIJUIiAiIgKERVBChKhARFCAiIghEUIgiKEBQpKhEFBUqEEIiIARQpREgqV5XoIrpfJ9d7ZZdSwVl3p+UhDS1k2Nrmzzwl2f1sfdnIXjW9oudsvUk10qDWiszNDXtOWVTTwcD6sbur1YXOq7p9S1cem6iwVEUVVRvcHwcsCXUr873Rnqzv3cN/rVT62pVKhFGnpAoUoOlop+b2elkPudoA+ouIWS5xCK2VQbwcdr2khV0s8X6PRw8ozlN3mZ3+6K91FzgmtBic88u5gBbsniD2+xePSdrj3foP1GEcU4ZTH7Ir814/wz0tS6ksTJmNDi04wfS5U9dWOrZhK9rWkN2cArfo7nSRUDKeeJ8hGcjZBHHPWta41lNUxsbT0/JbLsk4Az4LphjMZzNfy8nqeTHPgxiOTqIjr7ty2/zJV/4vwCwaf+H/8A8Z/csNNXiChmpuTLuUz521wyMLHb6vmVRyuxt+aRjOFZwmsvuxjz8cZ8M3+3y3bjdJnmelLGbG0W535wCskX/puT1n9oKpml5WeSTGNtxdjsVhQXRlNSiB8BkGSc5G/PoTLCsYjGF4vUxnzZTy5dTExEq1vuh61caj98p/mn9y1rhWwVMbBFT8k5rsk4G8exerlWQVs0BG21jdz8jfjPUrNzljNe7EfDw4uTjjKJuqWdkhdFQguJBkJcB2Bc/PG6KeSN/umuIPpVnWXSM1FMaYnkojkjGM9WPBYb2YZJ2zwSMeHjDtk8CP4LHHtGdz9Xf1U8efDGOE3p1+b/AOq5EReh8oUqEQTlMqEQTlQiICIiAiIgIoRAREVQQlRlEBEUICIiAoREQUIoQERQiCIhQQVCIgIoRVBSoRBKkKEUV6RQFKCUUKUEooUoqUUKUEooUoClQiKlFClBOUUJlBKJlEBSoRC0ooRC0ooRQtKKEQtKhEQsREVBEyoygnKhEQFCIgIiIChERBQiIChEQFCIiCgoVCAiKEQREVEKVClAUqFIUBel5UhFSiIglFClBKKFKKlFClBKKFKAiIipRQiCUyiIGVOVCIJRQmUEooymUEooyiCUyoRAyiIgIihBKhEQEREQUIiAoREBQiIChERBEUFBCIiCERFUQiIgIFClBKKFKCUUKVBIUrypCKlERBKIiKlFClBKKFKApUIglERARERRSoRBKKMoglFCIJRQiCUUIgIiICIiAiKEQREQFCIgKERAUIiIIigoBUIiAoREQUFEVBFCIgpUIglSoRFSpUIglERRXoIoUoClQiCUUKUVKKFKApUIglERBKKEQSihSgIiICIiAiIgIiICKEQSoREBEUICIiAoREBQiIgiIUArypUICIoRBEUKgiKEBFCIClQERHpd3ovyZVurLKbpTXKnp2cq+MRyRucct9IXBr9AeRynkrPJjVUsMnJSTS1MbJN/mEjAO7sykJlNQ5X/AIHXr+t7f9nIvnF7tslnvFZbZpGySUszonPYCA4jrGV9ZHkl1SAP/NzvrTf/AOlX+S7S1vuWp9R0GoqeO5SUTgzlJdo5cHuaXcc78DiqkZPlK37Ha6i93altlIWCepfsMMhw0HBO8+xfaNP0Xk2rbxVaVpLSJquLlA6eeMnlHNPnBr85GPZw3Km0ZbbHpfyn11lr4X1FSJ4xa5S3aMeWl285GDskDOOpSl2fPdXaaq9KXRlurpoZZnQtlJhzsgEkY3gdipV9n8tktkqauK2xUTnajm5ART7BxyZcQG7We3PUtiusOktAW6iguNgnvtwnaTJI2DlOHE79zRk4A4pRGXT4imF9L8qWkbVRWSh1Np2B9LR1WyJKZwLdguaS0hp3tO4gj1Ls73o/QdotdDd7vSRUtNE0bbI9r/mHuaMNIByes4HtSjeHwFdTpnQtz1HZ6u60s9LFS0peH8q520S1u0cADsI61S3+ShmvVfLaY+ToXzONMzZ2dlnUMdS+/wDk5q9PTaGmfbKN0VNFGW17CwjlJBEOUI378hIMspiHxryd6Tj1jdp6GSsfSCKn5YPbGHk+cBjBI7VUahtos99r7a2UytpJ3RCQtwXY68L6p5LamzVflJus2nKZ1NbXW5vJROZskHLNrdk9eVcN/wCH9XrWusU9sFVdaqd7pqieLaaZMbRYHZ3YHYOrjlKTabfAlK+hV3k9id5Tv0cpJXx0D2ip2+Lo4cZIz1nO4E9oXYVMGhLZfI9NHSc07S5sUlbzdz2te7hl5848Rkjh7EpreHw1F1vlN0rFpTUXNqRzjRVEfLQBxyWDJBaT14PX2ELb8lOjYNWXWeS4F/R9G1pkYw4MrnZ2W56huJKlLtFW4hF9qFT5K7pVVVldQ09EIQ5raws5FriDg7Emc59fHHWuX0LoGjvurLjTS1gqrRbnjM0DvhG17gZHDcDnHZhWjd89RfcKF3kzvl3fpqltETJsujinbFsCRzc52Xg7WdxxnjhcpR+Tba8o79PTzSOt8UfOjKNznw9Q9Bz5pPoJSiM/dwFFBzmtp6cuLRNKyPaxnG04DP3rqvKNouPRtRQxRVz6vnTHuJfGGbOyQOontX0Cvf5NaS/xacNtEFXFOxrauGPAilyC0F+ck5wDkEb961fLbb5rrqPTVupsCaq5SJhPAEuZvPq4pSbdw+Movt11tui9DilttRpupvFRJHtTVAp+VIGcZJO4HccNC5PysaPoLC6hutkY6OgrtxhOcRuxtDGd4BHUeBCUsZxL56i7LyUUtouOqm2690UNVFVQuEQlz5sjfOGPWAV1em9A29/lIv1HcKNklqomCSKJxOyBJgs356gHeClE5RD5Ei+u02gaH/i1Pbn0TXWdlNztsBzs7JGyG/Xz4LVsujbRqnyh3iKmp201itjxGYoCRyrhuxniASHEnsAVo3h8sRfcLfT6F1BdpdPRaUnpm4e2Gt5uYw8t4kO4jhkZ4r5Jqqyv09qGutUjy/m8mGPIxtMIBafAhSiMrVShfWPJbpCz1WmavUV1oH3SVj5GxUbBtbmdQbnznE9voWnrN2iq6xSTQWup0/e2ZMVPJSPjEmP1TgbJyOB4hKNu6fM0X1zSmk7FY9GR6n1Lb5bnPUNa+GlZGX7LXHzQGjcSRvJO4BZL5pnT+qtGVl+0/aJbRXUQe58Do+T2w0ZILeB3bwQrSbxb48i+y6N0vpSp8mcd5v1CzLGyyT1TNoSFrZDuGO0AD2reprDonXOlayXT1sbQ1FMHMY/kuTkY8NyNrBO0D6c9fWlG75novRFy1gak26amhZTFokdO5w91nGAAc8CualYY5XxneWuLT7DhffvIfU2ebTskVtpjFcImxi4SFmBI87Wyc534GexfItfVdhrL7ymmaR1LSiPZkY5mzmUOdtHGT6EpIymZpr6R0tX6suMlDbXwRyRxcq507iBs5A6gd+8LQvVtks93rLbO9kklLM6Jz2Z2XEdYyvrXkEqbMW1NMymcL2GPfJPsbjBtNw3Oe3G7Cp9fUdn1Lruls2nqY01ykrJYrhM6MgOduJdx34AcepKNu6fMFC+43aHybaHmp7Pc7XzuofGHSzPh5ZzWndtPJO7ODuaPYuV8rOiKCwMpLxYstt1W7YMW0XNjcRtNLSd+yRnd1Y9KURlb5uiKFGxERVEIiIChFCIIoKIClQiD0vv/AJHaaSs8mFXSwycnJPLUxsfv80uGAd3rX5/W1TXKvpY+Tpa6qhjznYimc0Z7cApCTFw+sDyQaoAH/meP7Sb81u+Ri2zWfV2qLdUzCeamETHytzh52nHO/f1r5B01dv60r/8ANP8AzWKK410M0k0VbUsll98kZM4Of6yDk+1Eqap9B8m3/vHN9PWf/wBlt6jq4aDy8xVNVII4WVEG29xwGgxAZPo3hfL4amohn5eGeWObJPKMeQ7fx3jfvUTzS1ErpaiWSWR3F8ji4n1kpa69vs/listVRXyh1kySJ9JSup2Oh37Zc15O7qIOe1djqGt1LdbfQXLQFbQTU8zSZGTtB2geBB6iN4IK/NklfWy0wppaypfTjGInTOLBjh5pOFlt92uVtDhbrhV0od7oQTOYD6wClpq+leVio1PR2CGi1JebVUGpeHClpqctkGzv2snqB3enKuPLmSNI2Ib8cu3/AGivi1RUTVUzpqqaSaV3unyvLnH1kr3UV1XVMaypq6iZjN7WyyucG+oE7ktdfDCvtnkPkhrtJXu0Nma2pdK8lp4hr4w0Ox2ZBXxFZaeeamlEtPNJDIOD43lrh7QkLMXFPr/kmsNVpryiXS01r4pJ4LcC50JJaQ5zCOIHaqW3f++z/wC9Zf2XLgRca4VDqkVtUJ3jZdKJnbbh2F2ckLEKmcVHORPKJ9ra5UPO3nt2uOUtNZfb7zeaayeWummrntip6i3tp3SO3BhcTgnsGQBn0q/vkPlBdfXCxVtrFpkw5kk0eXRDG8EcXb+BHavzjUVE9VJylTNLM/GNqV5ccdmStyC+3inpuawXWvjp8Y5JlS8Nx2Yylpo6Pyp1d0lvsVHeblQ19TSRFrnUcRY2MuOdk9p3A+jK6LyDXyko7hcLTVSNjfW7D4C4423NyC314OR6ivlWSSSTknrQHBBG4jgo3ONxT69B5Fp+lKt9xuscVsbtPikiGZCM5G0HDAwOJyvfkgu1otGp7zYqes5WmqZG8zqJcN5YsyCN27fnI7QF8tqL3dqml5rU3Stlp8Y5KSoe5vgStDryraazMdy+3aa8lVZZtZsutRXU7rdSyumh2c8o7jshwIwMZ3nPUpoNa22bywTObPHzKWjFBHUZ810gdtZz2E5aD6l8gnvl3qKXms90rpKfGOSfUPLcerKr0s1mfL7Xe/JZVVOtZry64U0VqlqhVSmQkSM3gubwxx4HPWs/lZuUdn1ppK5TgmKme98mBv2dpoP3Er43NeLpPStpZ7lWSU7MbMT6h5aMcNxKwVNZU1ZaaupnnLfcmWRz8erJSyMZvt+kNTS6wq5KOr0TWW2a3zRja5YA4Odzw7rBHV6F8z8rdTf4IaK2agu9trJC/lhDSQFjo8AgFxPUcnA61wdDebpbozFQXKspozxZDO5jfAFacssk0jpZpHySOOXPe4uLj6SeKWRjTas9wktN2o7jD7ulmbKPTg5I9oyF+gPKXcqa36GuNzocNnukUUDJm7i8O9z4NLl+c1mlrKqaFkM1TPJCz3Eb5XFrfUCcBS1yxubfpFt/pW6G/TAsbzo2wZf1lwzhv1yV888hF9p6S7XG21szWTV+xJE95xtyNzlue07WR6ivmPPKrm3Necz837nlXbHHPuc44rCCQQQcEcCFbSMOph+h3U3lNdcaiMXKzRUTSTFUPgztNzuy0bwccV8S1pXVNw1NWz1tZT1s4cI3VFMzZjk2QBlo7N2M9eFqTX28VFNzWe618lPjHJPqXluOzGVXpMmONPq/kno78+x1lTpi/wBIydrzytsqoNpu1+q7Oct2h1gdWOpdpqd9TN5Nbm/XVPQwVXJv5NtO7aG3/wBMtzwdns/Nfnqkq6mimE9HUTU8o4SQvLHD2hZa+6XC5Oa6411TVFvuTPM5+PVkpZONzb73pS8XC+eTekbparpY7xRRMhkjnbkAsGCCOraG8FVWoqnXtt0vV1uoLxZaaN0bmOphT7T37QwGtI3ZP3L4pR1tVQzCahqZqeUDG3DIWO8Qvdfcq65SCS4VtTVPb7l08rn49WTuS007fYbUMf8Ah9qRv+Dz/wC6VHkG/mG//TN/218cbW1baY0zaqoFORgwiV2wev3OcKaetq6Vrm0tVUQtfvcIpXNDvXg70s18vrH/AIe62COe8UT5GiolEUkbCd7mt2gcerI8V8/1xpqq0tfH0VZLDK6VpnY6LONhznYzkcdyoYpJIZGyRPfG9py17HFpHqIXuqq6irkElXUTTvA2Q6WQvOOzJRYipt9A8hNbBS6ylinkax1TRuji2jjacHNdj14B8FZ6hopND+VSj1FcZon0NwrJZAWZ2o2EBrtoY6tvO7sXyYEtILSQQcgg4IWeqraus2Od1dRPse45aVz9n1ZO5LNe7fbfKD5N6vV99hvNmr6Tm9RCxkrnuJAA4OaQCHAg8PQq7y2XOiobBatLUswlngMb5BnJYxjNlu12E5zj0L5VR3q60EBgobnW08J4xw1Dmt8AVove6R7nyOc57jlznHJJ9JS0jGXlERGhQiIChERBQihAREQEREEooXU1Og73T6YGoyKWS3GJsu1FNtODXEDOMdRO/s3oW5hSuh0nou86sZUvtMcJZTFrZHTS7AyckAbt/BRprRl61LWTwWmCORlO8slqXPxE05+N19uAOCFw59F2epfJjqTT1E+tnigqqWMZlfSvLjGO0tIBx6Qq/T2irxqG11Vytzac09K5zZDJLsnIbtHAx2FC4c6ivNJ6UumrJ54bQ2AvgY17+Wk2NxOBjcexZ7Boq8X+5V9vt7acz0DtmflJdkZ2i3ccb94KFw5xSuhu2ir5Z7ILxcqdkFK6YRNDn+e4knB2ezd1qghiknlZDAx0ksjg1jGDJcTwAHWUWJeUX0Gm8juq5qMTvbRQvIyIJJzt+o4BAPtXL02l7tPqRunnU4huRcW8nM7ZAIaXcd+7AyD1qFxKnCld9TeR/Vc0szHso4RFjD5JzsyEjOG4H3nCw2ryUaquEtQx9NDRiB5YX1MmA8j4uAcj08FaTaHDorK92K5WO7OtdxpiyrBGy1nnCQHgWkcQV19H5HtVVNGJ3iip3kZEMsx2/bgEA+1RbhwEcb5ZGxxMc+R5DWtaMlxPAAda2Ku3V1FWczq6Oohqt38jJEQ/fw3cVe2O33rTuvLfR8zjbdYaloZDO7zHkg484dRGcELur3VXep8sGmheqOmpJGbPJRwTcr5hL97nYG/IO7CqTk+RTQzQP2J4pInYzsyMLTj1FeF9F8vH/rSH/wDBj/aevnKixNwlFCIqUREUREQEREBEUIiUUIgIiICIiAiZUIBKhEQERQiCIioKERARFCIKERAUIiAiIiIUqEQSvt3kWr4r9pK7aUrnbQja7YB3/wAlICDj1Oz4hfEV3HkYkrWa/oRQjLXskbUAnA5LZ3k+3Zx6VUy8O7jil8nfkfqWzjkrpWyPZv4iR5LQfYxuVlttRPYvIMytsRMdSYOUfLH7ppdJh7vWB19WPQua8vl+55qCls0T8xUEe3KB3r/ybj6xVX5PvKTNpajktdfR8/tb3FwjDgHRk+6AzuLT2FEqat23kKvN0vFPd6S61E1bSxcmWPqHF+yXbW03J4ggA4/NZvJVDHFpXVlPS+dEyuqWRAb8tDMD7sLnr15XKSK0TW/SFmFt5YEGYtYzYzuJa1v63pK5zyba+k0ZPUxz0zqqhqSHSMY4B7HjdtDO47uIPoQqXTf+HYE3S7uA3CmhBPYdoq18j3/rfV/0x/3XrVg8slooKyQWzTRhpJBtP5MsjfJJniQN2MZ7SuW0Vr+n01fr1cpbfNO24vLmxskaDH57nbyePukKmbaPlA1deL7eLhSVdW/mEVU9sVK3AY3YcWg+k+n0re8ilPBPr6mM4BMUEskQPxwAM+wErjLlUisuNXVNaWNnnfKGk5IDnE4+9ZbJdaux3WmuVveGVFO/aaSMg9RB7QRkFRuuqh9v1PLp6HWhrrjrmtoK2kezFG3IjiAAOzjGCCOPblatXebJffK3pitsdbDVERTRzujBGMMcW5yB2lVb/KlpavliuN30nyt1iaA2QCN4yOxx349Y3Llm6+MmvKPUk9ujjp6QObFR02G7LS1w443nLskqsREu81Lf7rT+We02+GunZRHkY3U7XkMcHh21kcCeHgF68pN+utv8pGnKSirp4aY8iXwseQ2TalLXbQ6927euAvGtoLj5QaPVDaGWOKndETTmQFztjPXw35U6v1vBqHVtsvcVDLAyiEQdE+QEv2JC7cRw7ENXdeVihrq7X+l4bPIIbhIx4imP/T2XZ2j6hkrcmobXbdU22O+66utRfI3xiOFvmtdtHc0ta0gB3pOcFcNqjylG6ans18ttA+nltocOTmeHCQOO8buAxke1Xtf5V9PzVEV1h0sH3lgDWzz7B5Mehw3ndnG4JcFSt9fsa3yuaPeGgOcWgntw84/ErHrP/wB7NMfRR/tSLj9R+UOnvOsLJfY7dNFHbTl0LpGkyednceAWO+eUCnumu7TqRlvmjjoWNa6B0jS5+C47jwHuvuRYiW35eP8A1pD/APgx/tPXzldN5QdURatvjLjBSyUzW07YdiR4ccgk5yPWuZWZbx8CIiKIiICIiAiIgIiICIiAiKMoJUKEQEREBEUIgiIqChEQERQgKFKhEFCIgIihEEREEKVCIPSuNM6muml6qaps8sUU0rOTe58TX+bnOBnhvVMpQbNyrqm519RXVsnKVNRIZJH4xlx9HUtZERUqVCIJUqEQSiIipRQpQEREEooUqAiIiilQiCUyoRB6ReVKCUUIglFCIJUKEQSihEBERARFCIlQiKgiIgKERARFCAiKEQUKVCAiIgKEUIgiIgIoUoJRQt2G3TSxh+WtBGQDxQaiLf6Km7yP706Km7yP70LaClb3RU3eR/enRU3eR/ehbRUre6Km7yP706Km7yP70W2ipW90VN3kf3p0XN3kf3oW0UW90XL3kf3p0XN3kf3oW0VK3uiZ+p7PvXoWioPW3wP5IXCvRWIstUeGPqn8lIsdYf1f9LvyQuFaitBYa08GH6jvyUiwV54Rn6jvyQuFWiuBpm5kZFO/HbsO/JaxtU7SQ57ARxByi3DQRb3RcveR/enRc3eR/epRcNFFvdFzd5H96dFy95H96Fw0UW/0ZL3jPvToyXvI/vQuGgi3+jJe8j+9R0XL8eP70Lhoot7oubvI/vToubvI/vSi4aKLe6Lm7yP706Ll7yP70LaKhb/RcveR/eo6Lm7yP71Utoot7ouXvI/vTouXvI/vQuGii3ui5e8j+9Oi5u8j+9C4aCLf6Km7yP71HRcveR/ehcNFFvdFy95H96dFzd5H96FtBFv9Fzd5H96joqbvI/vQuGgi3+i5u8j+9R0XN3kf3oW0EW/0VN3kf3p0VN3kf3oltBQt/oqbvI/vWOe3zQxl+WuA3nCFtRQiICKEQFKhEEnguli96Z80fgua6l1FGzlTDHnG1shElCyQxPnlbFGMvccALs4NH0kkLXcpISRv3rft+iDFURzxQ1Ltk5BwSPwVZ2hzsGj66RodJJGwHs3rbj0Yf+pO4+oBfQobPWhgApJd3aMLO2yV7v8A7fHrcB+9GdpfPWaOpx7p0p9oWZuk6McY3n1vX0AWCvP/AE2D/GF7bpytPEwj/F/BC5cC3TFE3/7bPrcsrdP0beFGz2rujpyqHGWAetx/JS3TdQf+tB7CfyRLlxDbNTN4Ukf1QsgtsbeFMwf4Qu1/Rmo65ofArZh0xCMGaoe70MACUW4MUIHCBvgF65oRwhHgF9DFjpIx/J0zHntlkcsQgmY7Zjt9KzfgHk8oW4MUrzwjH3L22id1gD2L6EaRzqd7amGF5c3AbHEBj05VcyxY4xOPrKFuTbRsHut6zR04HuI/ALrG2gt4QjxCyC3SjhF94RLco6lnewhsR4LhLppe5VFyneyONrXH9Z6+0cxm7v7wtSosTp37WyWnrwQixNPhdzs1ZbGh1QGFp3Zacqtyvudz0HFdouTqKiSIZzkYJVe3yS2ho/lK2vefk7I/cjcZPjqL7OzyVWH9aW4n1yNH7ll/4VaeIxt14Pbyw/JKNofE0X2OTyR2g55KvrWnq2tk/uCr5vJFk/yNyAHymkobQ+WIvp//AAinz/OUWO3ZP5J/whn/AKzj+qUXaHzBQvqH/CKf+s4/qn8lV1Pk4q6eR7Ty72tONtjMg+kIXDg0XYO0XsnDppGnsIAXqHQ0lRII4JZHvPUG5UNocai+hu8n1BaozUagur2MaMmnpmh0jvRnqVU6/wClqTzbdpNk+OEtdUFxPrAyFS3I5Rdd+m0Ld0elbAB1A05K2qqppNR6Ou1wltFvoam3ywiGSjj2NsOOC09qFuHRFCiiIiAiLJJBNGxr5IZGMf7lzmEB3qJ4ojGmV6kjki2eUjezbaHN2mkbTTwI7R6VjVBERAREQFjqPg8vzD+CyLHUe8S/MP4KDnERQjQiIgIoUoHUuysLQ+4UTXDILm5C408F2VgcWXCjcOot/BVmX2W3U0c241EUGyAQX9fqXX08glpo21FVG9ztwfE7Y2vVvXCwytdGDw3LdiujYhDmKF8kO6N7s5AznGM4RydcynpJo2gSOlaHHB5Zx39fWs7IYYW+bG0enC4Z1aZo2xjZGy9zwW8cu4rbdd6smUtkc3lCODj5uOz1pY68zND2tDm5cNwK9N5TZG1s568ZXJMvlc1zDygIaACCPdekrct96q5C5suw/sOzjHglluidnHmgZ9Kja2R5xaFWivn69k+xSK+bjhngllrMEEZCh8jGDz3Aesqu6QlxwZn1KOfS7tzPBLLbzqiNocTnzeOFHOm4J2XDAzvwtI10nU1g9izwSzTDaBhaOBJ4oM0NS2XOAWgdbisoc0ni3xXgnZb+q8+wBYXOqSfNETR68qq20WmxlS5xJnYR1gb1la5rRgF7nDrAJQZiQOJA9a8uljbnL2jHHfwWExNeMujc/fnz3YwsjYxkktjGeOBlBImjLtkPG12L0Dtbw449Shzgzi5oHpOFqvqIt3KVQGOpg4oNvhxcfam03gHAnsytFtVRbRDdp7ncRsk5WyJdppPJuY3rLsNQZSSN7i0NA3rHHMx5OzNHJjqaR+a15Z7fLulnhd5pbh0nUeK1BJDA8mgNsjyMZL958EG+aid0zWMpXhufOe8gAD0YO9YJ6xrNp76prDERykcQD8ZOBvwtaSquLjllRbmj0PytWshnqdoyVFBEHODnlshO0Rwz+Sg333mNktVFybyadpJJI87Bx+9as13rZRTmip2kzNJ2S0uIIODv7FrOlt8EtRLUVPOHzgh0cIwOIPH2LVnvMroxDSNbTQjcGx8fFBaT1D2RkXiWnBc3HIxM2n+Odyqpro9sZht8baWH5Pu3esqvLskknJPEkrw+RrGkuO4IKy/EmhmLiSS059K+XnivodbUz3sS0NkpZ6ufOy7YZ5rPW47gqz9FbTZsP1Ve42SjeaGg/lJT6CeA/wDm9G46cxbqCrudWykt9PJPO/gxg+89g9JXT6lMGn9OQ6ZhnjnrpJ+c3F8Ry1jgMNjz143eHpWGu1gKekfb9LULbTSP3SStdtTy/Of1ezxXKHeclFERFFERERfaLhiku8s00TJjSUc1THE8ZD3sbloI69+/HoXlmq7xO2pir6iS4wVUbmvgqCXNBPBzQPckcRha+m5W09ybV9LR22WDDo5HwPlDzwLcN6scc8crppK6ytiqG265WW3zVLDHLUU9DVF5afdBodkMB9CqJmprPcJ9MW64Q1jqmstsELJ4pg1sOS4NOzjzt/HeNy0dPadpamFgrLdWT8pUugdUisjp42AO2csDt8h6yOHUsjZrc24WmtGpKDlLZHFHE3mNRhwjJI2vHqWzDX2lkVKJ7tZ6mWklfJSzTUFTmHaftkYG5w2t4zwQVnQ9qtlvuVVdI6qrfR3M0TI4ZREJAGk5JwccM7vUssunrZTV9dUyuqpLXTUMNYyFrwJX8rgMYXYwME73Y4BZK+S211LWU8upKFraquNa8toajIeQRgejepZcYOmI+TvFtmhkt7aSQT0srYJGsADWSZ3gnGdocCEGOn09bLzFZ5LUKmldX176aVk0gkELWsDjsnA2t2Tk9uOpL3p2jhs9XWU9LNQyUr2bDZ66KfnLCcE4bva4bjjhhbdbc6WJloo4LlbaGajqZKoS0MT5YIMhoazPF7jgknfxwtK9usM9DPzGps0E7jyjubUNQHyuH6rS/IYCeobkHJLHUe8S/MP4L2vFR8Hl+YfwQc2iIo2IoRAREQT1Lp6Z7o2xPYcOaAQfYuXV3T3CnMLA9+w4AAghVJdL+kty2Q0yNwPkqP0iuHxmfVVBz6l75vgU59S983wKM07rSV4qaqulZUPbjYyABjrXVS1ZDsMXyOivMVFOJoZ27Q7Qd6t/033cYs+sok4voBqZPjLbtdcI5jy0uyD1kr5bLrGV/uaiJnqaVqSaikk91Xu9mR+5DV90dd6No86qjH+Jas2p7XB7uvhH+JfDX3SKT3dWXeslY+fUvfN8Cho+zT67tEXuanbPyWkrRm8otGPe2vd/hXyfn1L3zfApz6l75vgUNIfTx5RWukALC1pO87PBbjtZUzxkVQ8cL5Jz6l75vgVPPqbvm+BRdYfVhqukLwXVLcZ63rq7PebdXytiFfTNy3aOZAPD0r8/c+pe+b4FOe0p/wCq3wKiaP0lVXi3wEN6Yt9NG3gBMHOPpK0J9aWGnzt3Z1QR8R2yF+f4aiGaVkUDtuR7g1jGMJLieoADeuwZpKG2wsqtXXams8TxtNgJ26h49DBw+9U1d1V+U61w55u3a9OC4+JWGl13cLw7YtdquNT6Y2ANHt4feuLGrtHWg4sljZWSt4VVycXZ9Oxj8lp3HylXmubyYugpIeAipGcmAOzI3/ei6vqTzWRRcvfayltTMZ2Z52l59gP71U1WtNL284ilrbpIOtg2I/E4/evj8tyhmkMk1SZJDxc8lxPtK88+pu+b4FDR9Vl8qgA2KK382Z8nBPiq6XygundmaOd5+U7K+d8+pe+b4FOfUvfN8Ci6voTdb0x91TyBe260ojxZKP8ACvnXPqXvm+BTn1L3zfAqGr6SNYW48TIP8C9DVtsPGRw/wFfNOfU3fN8CrOy22uvsvJ2iknqz1ujYdlvrcdw8UTWHdfpXa++P1CpGqbWXBrZnEncAGEkqqfpC22Nol1lf6Wh6+aU7uUmd6N3DwKxu1/Y7K0xaQtcED+HPqxpkmPpA6vH2Kpq7qgpKmsg5y+I0lMBkzVf8kMduDvWlXak0pbWPaah11qG/qRAiLPZnr+9fLLrqepvEvKXO5y1J4gPcdkepvAeC0OfU3fN8Ci6OuvGuLxcYjTU72W6i34p6MbAx6SN5+5cz2+nitfn1L3zfApz6m75vgVGqbCLX59S983wKc+pe+b4FBsItbn1L3zfApz6m75vgURsZRa3PqXvm+BTn1L3zfAqjYRa/PqXvm+BTn1L3zfAoNhFr8+pe+b4FOfUvfN8Cg2EWvz6l75vgU5/S983wKg2EWtz6l75vgU59S983wKo2F4qPg8vzD+Cxc+pe+b4FYaqvg5B7Y37bnAgABBTdShEUaEREEAqVCAoiVKhEVKIiCUUKUBERBKKFKCUUKUBERAWSnhlqZ46enjdJNK8MYxo3ucTgAe1Y11nkpZE/yhWUT42RM4jPxgxxH3oTK8rayj8msPR1qbDU6pfGOeV7gHNo8j3uMfGxxPj2D57V1VRW1MlTVzyTzyHL5ZHFznH0kre1DTXBt5rpLhTVLJn1EjnmWJwyS4794VXw4oQlFGVPsRTKLeobNdLg8MobbWVDj3UDnfuXT0Hkt1XVs5WeiioIeuSsnazHsGShcOLRfQP0M0naDnUWs6eSRvGntkfKOPo2t/4Kf0p0TZD/AOXtKGunb7mpusm17dnf+5E2cfaLDd708MtVtqqr5UUZLR63cB4rrofJfWUkQn1ReLZZIOJbLMHyEehoIH3rQu3lM1TcmcjHXNoKfgIaFgiAHZnj965GaWSeUyzyPlkPF8ji5x9pQ7fQOe+TvTnwGiq9SVjeEtV/JwA9objf4FVt68pOo7nFzanqI7ZRAYbTW9vJADs2uP4LjkSyoenuc97nvcXPcclzjkn1leURFMoiICKEQSoREBERARFCIlQiIChEQERQglQiICIoQERQSgIiIgiIgkFFCkFFFKhEEoiIClQiCVLWue4NY0uc44AAySewKFeaQLo7lU1Ebi2Wmt9VNE8cWPbGcOHpGcgoSR6P1NI0OZYbiQe2Aj8V7/QzU/8AUFw+xVG5znElziSeJJJJUKs7Svf0M1P/AFBcPsU/QzU/9QXD7FUSIbSvf0M1P/UFw+xXuHSOq4JWTQWS5xyxuDmPZGQ5pHAgg7iqDKJSbS+gT628o1hhaLlLVxxuOy11bRtcCezaI4+1YB5WNTfrttj/AJ1E381RaZc+SO8UrnuMElsne6PPmlzAHNOO0EbiqqhaH10DXDIMgyPaixUu7Z5S9XvaHMobfg8CKAfmvX/ErWY9zSUTT2igH5r549zpHl7yXOcckneowidO5rtf69rG7JrqiFvZTwMj+8DK5mvkvlyeX3CSvqnHrnkc/wDEqswmEW2wLfWAYFLL9VT0fWf0WX6q1sBMKUbMstLUQt2pYJGN7S3csS2bbnnsTQfNedlw7QRwWq0ZwO1Gom2eKkqZWh0UEjmngQ3cV76PrP6LL9VRcSTXTgnIa8tA7ANwC18BKZ2bHR9Z/RZfqp0fWf0WX6q18JhKNmx0fWf0WX6qdH1n9Fl+qtfCYVo2Zn0VVG0ufTyho4ktO5YFkhe6OZj2EtcHAgj1r1WNEdXOxowGyOAHtKLE2iKmnmGYYZHjta3IWTo+s/osv1Urch0TM+a2FmB1DLQT95WvgJSbNjo+s/osv1U6PrP6LL9Va25MBDaWz0fW/wBFl+qo6PrP6LL9Va+EwENmd1BWAZNLNj5i1l6G7eNx7Qs9x31RceL2McT2ktBKLE21kRQooiIgIihAREJQCVCIiCIiAihSgIiIJCKFKApUIipREQFeaT+FXL+6av8A2yqNXmk/hVy/uqr/ANsok+FMiIqwIiICIiC70r79dP7pq/2FWW7+cKf6QKz0r79dP7pq/wBhVlu/nCn+kCNR4YEUBSqyIiICIiDZtv8AOFP88LVbxb7FtW3+cKf54Wqzi31hSWsWzcPh9T9K78VrrYuHw+p+ld+K11WRERAREQSz3bfWFluHw+p+lf8AiVhb7pvrCzXD4fU/Sv8AxKktYvVd78z6GP8AYC1lsV/vzPoY/wBgLXRBEREEREBZ7j8Ib9FH+wFgWe4/CG/RR/sBFx8tVERRsRFCAiISgFQiIgiIgIoRAREQSihSgIiIJCKFIRRSoRBKvNJ/Crl/dVX/ALZVEr3SXwq5f3VV/wC2VUnwpkREYEREBERBd6V9+uv901f7Cq7b/OFP9IFaaV9+un901f7Cq7b/ADjT/SBGsfDAiIjIiIgIiINm2/zhT/PC1m8W+sLZtv8AOFP88LVbxb7EaxbNw+H1P0rvxWuti4fD6n6V34rXRkREQEREEt9231j8VluHw+p+lf8AiViZ7tvrCy3D4fU/Sv8AxKNYvVd78z6GP9gLXWxXe/R/Qx/sBa6MiIiAiIgLPcfhDfoo/wBgLAs1x+EN+ij/AGAi4tZEUKNiIhKASoREQREQFCIgIiIgiIgIiIqUUKUBERBIKKEBQSr3SXwq5f3VV/7ZVErzSXwq5f3TV/7ZVJ8KdERVgREUBERBdaW9+un901f7CrLb/ONP9IFZ6W9+un901f7CrLb/ADjTfSBGsfDAiIjIiIgIiINm2/zhT/PC1WcW+xbVt/nCn+eFqs4t9YSWsWzcPh9T9K78VrrYuHw+p+ld+K10ZEREBERBLPdt9YWS4fD6n6V/4lY2e7b6wslw+H1P0r/xKS1i913vrPoY/wBgLXWxXe+s+hj/AGAtdGRERAREVBZrj8Jb9FH+wFhKzXH4Q36KP9gKSuLVRFBKjaSVCIiCIiAoREBEREEUIgKVCIJREQEREVKKFKAiIgBXukvhVy/umr/2yqJXejyHXSamBaJKuiqKaLacADI+Mhoye04HrKE+FQpW86y3dri11puAI4g0km77lHQ11/quv/ysn5LTDSRbvQ11/quv/wArJ+Snoa6/1XX/AOVk/JBoot7oa6/1XX/5WT8k6Guv9V1/+Vk/JBuaW9+un901f7CrLb/ONP8ASBXdloay3U12ra6knpoBbpoA+eMx7UkgDWtbkDJ4nA6gSqGhkbHWwPccNbICT2DKiwxosz6WoY4tMEmR2MJC883n7iX7MojGiyc3n7iX7MpzefuJfsygxosnN5+4l+zKc3n7iX7MoMtt/nCn+eFqN4t9YW9QwyxVUc0kb2Rxnac5zSAAB6VoNOMHsRrFt3D4fU/Su/Fa6266GV9XLIyJ7mSOL2ua0kEHfxCwc3n7iX7MoyxosnN5+4l+zKc3n7iX7MoMaLJzefuJfsynN5+4l+zKDwz3bfWFkuHw+p+lf+JXqKlndI0CGQbxklpAHpJWKre2WqnkactdI4j1EouLNXe+s+hj/YC11t1MUk3JSxRvex0TBlrSd4GCN3qWDm8/cS/ZlEY0WTm8/cS/UKc3n7iX7M/kqMaLJzefuJfsz+Sjm8/cS/ZlBjWa4/CG/RR/sBQKaoJwIJST8gpcSDVEAg7DWMODneGgH7wpKx5ayIijQiIgKERARERBEUICIiAiIgKVCIJREQEREVKKFKAiIg3GXa5RtDY7jWtaOAbUvAH3r10zdf6zrv8AMv8AzWiiDf6Zun9Z13+af+adMXT+s67/ADT/AM1oJlBv9MXT+s67/NSfmnTF0/rOu/zUn5rRyiozVFVU1Tg6qqJpyOBlkc/HiVhRFBkbNKwYZLI0dgeQp5xP38v2h/NYkQZecT9/L9ofzTnE/fy/aH81iRBl5xP38v2h/NOcT9/L9ofzWJEGR8kj/dyPd85xK8IiK9slkYMMke0djXEL1zifv5ftD+axIiMnOJ+/l+0P5pzifv5ftD+axIgy84n7+X7Q/mnOJ+/l+0P5rEiDI6aV4w+WRw7HOJWNERXpj3s9w9zfmuIXvnE/fy/aH81iREZecT9/L9ofzTnE/fy/aH81iUZQZecT9/L9ofzUc4n7+X7Q/msaIPZnmcMOmkI7C8rwiICIiAoREBEREERQgIiICIiCApXlelQXQWynslTbK2omo67laKFj37NW0CQueG7hsbuOetc+rC310dLb7pTPa8vq4WRsIxgFsgcc+wILKGy01xtHPKJ0dJtVzoWmsqQAG7DS1ucDJyTvwtdlhq3wcgKR/PufmlOZQACGZLdn79rOMLVNdGbFFQbL+VZWOnLt2Nksa3Hr3K4q9SUs9TJIxlZGH3Q1gdE8Me1mxs7jvw7O/sRO1HcKB9DyZNRS1EcmdmSmmD25HEHrB9YWy+wVrKPnD3UzXiHlzTGYCbkuO3s9mN+OON+Fl1FdKW5R0zYRJLNHt8rVSwsifIDjDSGbjjfvO/evVzr7VcmPrKiKr6QdTtiMTS0RbbWhoftccYAOzjj14Q7Ynaerm0xlJp+VbDy7qXlhywjxnaLOzG/HHG/C3rLpmSerp+fugDJIXTGnE4EwZsOLXbPZkA9uOrCl98t7qiS68lVdJyUxhMXm8iHmPky/aznGzv2ccevCyU99tIuEN1qIa01rafkXxM2eT2hHyYeDnPDHm449aHaro7BW1dLDMx1M187C6CCSYNlmA4lrevgcZxnG7K0qekmqKeqniDSymYJJATvDS4NyB17yM+tdDR6oZHbqON89dTz0cPJNbTMiLZMElp2nDLDvwdx4blU6fuMNuuYmrYnT0sjHR1ETTvexw3ge3B9iL2mosNwpZpo6mJrDBTsqZMvGNhxAGD2kuAx257FdRaeoufNgmglj/wDrLKNzDPtERlmSNoAAnPWtK4aj59aTTyROFXJUl8s2dzotpz2s9jnO+5bb9T0jrkaoQT7Bu7a7G7OwG4xx4/cidueo6CavrHU1KG5G04ue4Naxjd5c4ngAOtbb9P1u1iF9PUNdA+eJ8Eu0JWt90G9rh1t4pYLuLVcZZ3NeYp4nwv5PG20O6xncSCAcHcVYv1FDHWQVTZq2rlo43OpDUMjY1szj7otbwAG/GTkgcAi9q+LTte+WWImnjdBAyeblJg3kmOIxtdh3gkcd69tsksE8rKmNs8fMpKmGWnnGw4NHug7G8Ag5buPqVnTVturmX2rmjnjbU0kTqljCMtlMrdpzMneM+dg46x6VqOvdFCxtLSx1BpYqCemjfIAHvkl3lxAOAM9QJ4Idtc6cuDX07Hc2DqiPlmgztGzHs7W274rQOs9a07jbpaAROfJDNDM0uimgk22PwcHB7QeIKtafUUUF6bWNjmELqBlHJjZ224jDS5ucjcRkA8Vp3+5i4chHHVVc8cLXedUMYzzjx2Ws4DcOJOUXtnl0/NLLIacRU0MNNBLM+pqRhokaPOzjgT1cRw3qtuVBPbao09SGF+y17XMdtNe1wy1wPWCFaV19p6mkrYWRSh09NSRNJxgGIDaJ38D1Kvu9dHXPpHRtc3kaOKB211uYMEj0IkW2q2it7bBBX0bqp0pqTBKZtkDcwO80D0nrKsqywRU1tZMy0XGc80ZM+pbO0Ma5zA4nY2clozv3+1UhrozYW2/ZdyorDPtbtnZLA3HryFY266WyhliuDBXvr44DGIXua6IuLS3Jfna2cH3OPRlRVZbLZPcuXMD4WMp4xJK+aQMa1uQM59ZW7UaZr6eOV7n0jnRxcuI46gOfJFx5Ro62/fx3blp26tjpaG5U72uLqqBkbCMYBD2u3+wKwbeqcVcU3Jy7LLUaIjdnb5Mtz6slBj6CmqeTNKyOFjaGOqmfUVDdnZccbWcbhnG7efWsFVZKymdUbXIvZDTtqTJHIHNfG5waHNPXvP4rblvdO+hlpxFLtPtkFIDuxtseHE+rAXuC9UToYqWqjqBA62ijlfGAXNcJC8OaCcEZwMHHWqdvFn086scedVEEDH0L6qEumDc42gM7uGWnPYFr02n6yohjeySlD5g4wQunAknDSQSxvWNxxwzjct7pu3MraQRxVfM4rc+hkJ2eUw7a88DOP1gcez0rNS6miioaWPnFfBLRxmKMQRxYlAJLSXOyWHfvxnhuRO1Oyy1LqFlUZaWPlI3SxQyTBskjBkFzWnjwPXk4OFWro6C+UkNp5tVmqqMRyNNJJHG+FznZw5rj5zMEg4HWPSqKq5ttR80MxbybdvlsZ28edjHVnh1qKwomUyiiKMoiJyoyiICIiAiIgIihBKhEQEREQRFCAiIgIiFBBRQioIiIj0i8hXkdkpBRUU9XeIaV9ZGZI2SQPIA2i3znDON4RVKisa20zUDKttWSyenmZEY2sLmuDgSHB43YwBjtyvfQVZFb6urrIZ6bkGRvY2WIt5UOds7s9nFBVqVuSWqvhYyWpoqmGF0gj5WSJzWg54ZK3K/TlXS0tZWRh81LTVbqflGxnDgM+fnhs5GOPEoKdFsUlDWVokNHSzz8mNp/JRl2yPThTBbq6oqXUsFHUSVDRl0TYyXAdpHVxCg1kVnS2K4VNFXVTKeYCiLWyMMTskk7xw3bI3nPUtOioauvkMdDSzVDwMlsTC4gdu5C2BSj2PY8se1zXtOC0jBB7MLYqrdXUbom1dHUQOl97EkRaX+rPFFa6LYrKCsoXsZW0k9O94y1ssZaXD0ZW4+x1cFuqquthmpjByWzHLEW8oHkjIz2YQVaLcfaq6I0/OaWWnZUODY5J2mNhz17R3Y6/Utuss0EdDUVVBc4q1tK9jKgNiczZ2iQC0n3QyPQgqEV/atPUlVYzd7jeI6CA1RpWNNK+UucGB2fN4DBWK4aZuFPdIqCiYbk6ogbU00lGxzhNE4bnAYyOByCNxCqWpUW/BZLtU10tDT2yskq4ffYGQOL2esYyF5orPc6+olp6G3VdRPD77FFC5zo9+POGN2/tUW2ki3qGy3W4OcyhtlZUua8scIoHO2XDeQcDcR2LzR2m5V8s0VDb6qplgBMrIoXOczHaANyFtNMqx1BajZbjzMy8qeQhmLi3ZxtxtfjHo2sexYqu03KipYaqst9XT08/vUssLmtfuzuJG/cg08plblfaLlbYopbhb6uljmGYnzwuYH+okKwZpe4stdwr7hTVVE2mp2TxCeBzROHSNZuJxw2soKPKZW5NaLlBQR189vq46KTGxUPhcI3Z4YdjG9aaAiIgIiICIiAiIgIiICKEQEREBEREFCIgIiICIiAvKIqgiIiiKFKAulnp6K5WqzbV4oabm1K6KZkpeXtPKOO5oac7iFzSIjtBqC2mZ0xy6nhr6Lk4njz5IYWOaXEcM8Dj0gLXqpoae0XqKS+QV0lZLFJEyN7nF2JMlxyNzsdXHiuTXrKFOsul3gqblqdxrRJBUwBtPlxLXkPYWgD0AH71V09RFJpeqozVNimjqmztieSOUZsFpDerOSDgqnRCnQUDmVOnGUouDbe+CsdK58geGy5a3GHNBy9uDhvp3K/udbSC7agoah9Py088EgdVyPibIGs3tc5hyDkg4O7j1hcZb7rcLbtigrJoA/BcGO3EjgccM+laskj5ZHSSvc+R5LnOcclxPEkoU6qqukVb03A+tpYnzQwCKRjpBHKYsZALskkjdk8cLR086iFBWNnngbOXsLYqqeSOJzADl3mb3OBxgek4VCpyhTpa26ULde9Jh4no21TJC9gJyA0ZIB3nB37+xZaGqitVxp5qq/MrIn1L5MQF0mwSxzRMc8HAuBxx3LlUQp1tFXUlmjoYq2vhuLmXJlSTA4yNiYGkE5IG8kg4+TvXqCqprZQ1bau8QXIyV1PUCGN7n8o1ryXOO0NziOI8VyCItOt1Fcad9HXinmt0ra6obJ/JSzPldhxIcQ44Yd+D68Dcqa5VjjbLfRQzQc3bFykkUBO+UuOTJkb34x2gDGFVohTtLLeYbfomOA22juUxuzpXU1VTukHJ8k0bQxjGSCMroTdaKprr3HykEsNzpaY0QqmywR08bCSaV5iALNnq/VOyM8VwFBqi/26lZS2+9XCmp2Z2IoahzWtycnAHpK2P011V/3Hdv8ANv8AzRKdh0kaytrqOd1nfTGmpYjG91VHFNyW1gtn91tN2seducOHBe21drmhu9tpZGTB1zFVHPdp6mMTs5MN98Zhzi12cbXEHPFcZ+muqv8AuS6/5t/5qf011V/3Jdv82/8ANCl9qW9T1tluPN5i2rqL2KgtpI5WCRjYQ0SDa87G0M79+d6sL9UQXpt6pLfdI6GWS6itE8okjjqWck1u5zWk7TXBxweO0cb1yP6a6q/7kuv+bf8Amn6a6q/7kuv+bf8AmhSx1jVR1WtWXCLlrlSsbSGSTkXDl9hjA/II4kg5yrarqBSagnvcl8dcKCpucVUbfFHK980Yk28SNcAGFg3Ab8ncNy5j9NdVf9yXb/Nv/NP011V/3Jdf82/80KdTFVQ2cV01wuQvjK25U9THDCySR2yyXbdI8OaNhxb5uzxOT1Bea8inteqzLfm3I3QxyU0EYlc6TE7XZeC3zHBu7Z48eoLmP011V/3Jdv8ANv8AzT9NdVf9yXb/ADb/AM0Kdjqq7QVNPea23Mt5judO2ERF1U6p2fNIYYj5jCzZ3Hhu3cV86ulG2grpKZtTFVBmziaEODXZAO7aAO7OOHUrT9NdVf8Acl1/zb/zVTX11Zcqp1VcKqaqqHgB0szy5xwMDJPoRYimuiIooiIgIihBKKEQEREBEREERQglQiICIiAiKCgleURVBERFEUIgIiIiUUKUUREREgqV5UgoqURFAREQFKhEEooUoCIiAiIgIiIomURAREQFKhEEqERAREQEREBERARERBERARQiAiIgIiICIoJQCVCIqgiIiihEQEREQRQpQEREEooUooiIiJBUryiK9IoypUBERAREQFKhEEooRBKIiAiIgIiICIiAiIgIiICIiAiKEEooRAREQEREBERARRlQqJyoREQRERRQiIgiIgIoRAREQSihSgIiIJRQpRRERAU5UIiPSLypyipREUBERAREQEREBERAyiIgKVCICIiAiIgIiICIiAiIgIiICIoyglRlQioIiIgiIiihERBERAUIiAiIghSoUoC6iisNoorRSXPVFfVwNrg51JS0ULXyujBwZHFxAa3IIA4lcuCu9Ywaktun6q1VluZdbRTilmoq+VkbXtY8uZI3lPNe0hxBHo4IS5u62mlZXUsWn643WKsaDCxkRbO1xONh7BnDvVkHitmPRd/beaC2VlsqqeWtfsxl0ecgHziMHB2RvIyu3g1DaKPUVkgrZbQa2Glqo6uuoYmw07JpW4jbtxgZDQMF44bRwdyrLnXMstFbaKSls1HTi6xVbo6K4vq5Bsbi/wB04NaR6QTjgqluP1RY6nTl7q7bVMkaYXuET5GbJljyQ14HYcZXvWFmj07f6i2R1BnbEyNwe8BpO1G13D/FhZ9eRBurLpNHU09TDVVElRDLTzCRrmPcS3eOB9B3hdPrrXV2ptSVENlukDqJkMIjMcMMozyTc+cWknfnrUHO3vSdVSaqksNoZUXGZsUcjdiPziHRtecgbgBtcV7suk6iXUws18gqaJ/Npp9kgBx2I3PaRnIIJbxC7irvFrrNU6qpjLQVUtzoaRtO6aqMMMxY1hfGZWkbJPrAJbgrTpLpDS6js9FV9EUUNDbq1jW0tc6cRcpG/DHyOJGc8ACcbXsQuXD2/SWorlTsqKGzVk8T4hK17I9zm7xu7d4O4b9ypnNLHOa8FrmkggjBBX0iutVZc7Fot1HdqOkFNQ8o5tRWCEw/yzv5UZIzwx5uT5o7QuR1tX0l01bdq6376Wepc+N2MbY+Nj0nJ9qLE2q6yjqqCbka2nlp5S1r9iVpadlwyDv6iEZR1T6OStZTyupYntjfMGnYa48AT2nC6a0Xq2Xa3RWXV8szIaYf8lcomcpLTDiYiP1mHq+KfQtDUuoBc2w0FtgNFZaTIpaQHJJ65JD+s89Z6uAQUKnKhEHpF5U5RUooypUBERAREQEREBERAREQEREBERAREQEUZTKolRlQiAiIiCIiKIihBKhERBEUIJUIiAiIghEREEREBTx4qERUp6kRAUhQiCUREG7X3OpuFPQwVJYY6GDkIAG4IZtF2/tOSVpqEQSihSiiLr5vJrqcVVLDR0TK+KrjEkNXSyB0Bbjfl5wG49Psyt+PRNksf8vrPUlI3Z39H2x/LTvPYTwb6/vRLhxVut9ZdKxlHbqaWpqJD5sUTdon8h6V250dp7TTWnXF7cK3AJtdsAklb6Hv4N/+b1guHlCdSUklt0XbYrFROGHzRnaqZh8qTq9niuHe5z3ue9xc5xy5zjkk9pKHa+1PW6bqm08em7PVUPJl3Ky1FTyjpQcY3cBjf4qgREE5TKhEE5UryiK9IvKIPSLyiD0i8og9IvKIJymVCIJyoREQREQEREUREQFCIiCIiAiKEBERARFCAiIiCIiAiIgIiIClQiCUREUREQSihSgK107YKzUNVUU1A6ISwU0lQRI7G01g3gbt53qqV/oW/DTeqaC5yDagY8snb2xOGy77jn2ILezeUy8WOzUNrs9NQ09NAHcs18XKc6c7iX54eofwWceUWkq/5O9aM0/Uwk+dyEBgf7HDKpNfWAac1PVUcR26STE9JIOD4X7249W8exc6iU7/AKJ0HqLfaLvUafrHf/bXIbcJPYJBwHrPsVPqHQmoLDHzioo+cURGW1lG7lYnDtyOHtAXMK609qu+ack2rPcZoGE5dDnajd62HciqZF9AbqjSup8xatskdtqn8LpaW7JB7Xx9Y8VpXjye10NC66aeq4L9ahvM9FvkjHy4+I9mULcYiIiiIiAiIgIiIgiIgIiIoiIgIiICJlQglFCIgiIgIiIChEQEREBEUICIiIIiICIiAihSgIiICIiApUIglFClFEREBSoRB9CriNVeS+Ct91ctNvFPMet9K/3B9h3ewr58u48kNTG7Us1lqj/yl6pJKOQHhktJafXkHxXGVdPJR1c9LMMSQyOjf62nB/BEhiRERRb9lvNysVa2ttFZLS1Df1ozucOxw4EegrQRB9DGoNLay/k9WUQs90duF2oGfybz2yx/v+8Ki1Rom76dYKqRjKy2P3xXCkO3C8HgSR7n2+JXMq/0xq+86ZkcLdUB1K/32jnG3DKOvLT+IwUFCi+hNi0XrMhsGNL3l/BjjtUczvQf1M+z2rk9R6au2mqzm14pHQk+9yDfHKO1ruB/FC1SihEVKKEQSihEEooRBKKERBERAREQEREBFCICIiAiIgIoRARERBERAREQEUIgIiIJRQpQEREBERAREQFKhEVKIiCz0zXG2ajtdc3jT1cT/YHDP3ZVx5U6EW/ygXqFoAa+o5YAdjwHfvK5UHByDg9q6LWupItUVtHX80dBWtpGRVb9vIme3cHAdW5D6ucREQSihEEooUoC63TuvrraKQW2tZBdrQdzqGubttA+STvb949C5JEH0Kr0hatVU77joCbE7RtT2SoeBNF28mT7tv8A8z1LgaiCalnkgqYnwzRu2XxyNLXNPYQeCmmqJqWojqKWaSGaM7TJI3FrmntBHBd9S6ns2s4I7frpoprgAGU99gYA4dgmbwI9P4cUTw+eIrvVel7lpev5tcIw6N/nQVMe+KdvU5p/dxCpEUREQEREBERARQiCUUIgIiICIiAiKEEqEREEREBERAREQFCIgIiICIiAiIglFCIJREQEREBERAREQSihEVKKFKAiIgIiICIiAiIg7DSutn0FH0JqGnF10/JufSy73wfKidxBHZ4YWPWWj3WaKO7WefpDT1Vvp6xm/Yz+pJ2OHD0+g7lya6LSWr7hpmWWOJsdXbqjdVUFQNqKYde7qPp8cojnUXf3fR1Ff6KS+6ALp6cDaqrS45qKQ9eyP1m9n3Z6uBc1zHFrgWuacEEYIKLaEREBERAREQEREBFCIJUIiIIiICIiAiIgIihAREQEREBERBClQiolERQEREBSoRBKKFKAiIgIiICIiAiJlAREQSihEVOUUIglFCIJRQiDbtlxrbTWx1ltqpaapj9zJE7BHo9I9C7lmqtPav2YNb0DaOvcNlt6oGbLs9srOBHp3+xfO0RHS6t0bcdNOZO8srLZPvp7hTedFKDw3/qn0H2ZXNro9K60uummvpoTHV22bdPb6pu3DIDx3dR9I+9X9XpS0avpZLnoJ3JVbBtVNjmeOUj7TET7pvo/Dghb57lFkqaeeknfBVQyQzMOHRyNLXNPpBWJFSoREQREQEREBERAREQEREBFCICIiAiIgIihAREVBACSAAST1Beo2GR4a3j+C3WNbE3Zj3drusojXbSyn3Wyz5x3+C9ikHXM32NKzIhbFzRnXP8A6D+anmkffn7P+KyIgx80j78/Z/xTmkffn7P+KyohbFzSPvz9n/FOaR9+fs/4rKiDHzSPvz9n/FOaR9+fs/4rIiFsfNI+/P2f8U5pH35+z/isiIWx80j78/Z/xTmkffn7P+KyIhbHzSPvz9n/ABTmkffn7P8AisiIWx80j78/Z/xTmkffn7P+KyIhbHzWPvz9n/FOax9+fs/4rIiFsfNY+/P2f8U5rH35+z/isiIWx81j78/Z/wAU5rH35+z/AIrIiFsfNY+/P2f8U5rH35+z/isiIWx81j78/Z/xTmsffn7P+KyIhbHzWPvz9n/FZaUPo6iOopK2WCeM7TJI2lrmntBBUIhbfv10r9Q1UVVebk6pniiETXuhAOyCTvxjPE71Wc1j78/Z/wAVkRBj5rH35+z/AIpzSPvz9n/FZEQtj5pH35+z/inNI+/P2f8AFZEQtj5pH35+z/inNI+/P2f8VkRC2Pmkffn7P+Kc0j78/Z/xWRELY+aR9+fs/wCKc0j78/Z/xWRELY+aR9+fs/4qOaR9+fs/4rKiDFzSPvz9n/FOaR9+fs/4rKiDFzSPvz9n/FOaR9+fs/4rKoQYjSM6p/8AQVBpB1TN9rSFmRBrOpZR7nZf807/AAWAgg4IwR1FWCiRrZRiTj1O6x+aFtBF6kY6N5a7iEUVs0zdmLPW/wDBZVDRhrR2ABbUdDPI0HAaD8YqstZFu9GzfHZ4lOjJvjx+JQaaLc6Mm+PH4lT0bN8dniUVpIt3o2b47PEp0bN8dniUGki3ejZvjs8SnRs3x2eJQaSLd6Nm+OzxKdGzfHZ4lBpIt3o2b47PEp0bN8dniUGki3ejZvjs8SnRs3x2eJQaSLcNtm6nMPtK1poZIXYkbjPA9RQeERbENHNK0ODQGngXHGUGui3OjZvjs8Sp6Nm+OzxKDSRbvRs3x2eJTo2b47PEoNJFu9GzfHZ4lOjZvjs8Sg0kW70bN8dniU6Nm+OzxKDSRbvRs3x2eJTo2b47PEoNJFu9GzfHZ4lOjZvjs8Sg0kW70bN8dniU6Nm+OzxKDSRbnRs3xmeJWCemlg3yN3do3hBiRFmgpZZxljfN7ScBBhRbnRs3xmeJU9GzfHZ4lBpIt3o2b47PEp0bN8dniUGki3ejZvjs8SnRs3x2eJQaSLd6Nm+OzxKdGzfHZ4lBpIt3o2b47PEp0bN8dniUGki3ejZvjs8SnRs3x2eJQaShbvRk3x4/Ep0ZN8ePxKI0kW70bN8dniVhnpJoRtPblvaDlBp1LdqPa62/gi9vGWOHa0oosNy2xiSpG0MhoyrhVVp9/f8AN/erVVBERAREQEREUUrJSthfUxMqZDFC54EkjW7Ra3O8gde5dffqWwv0RDX2SgfCW3E03Lzv2pZWhhOXdQycbh2IOLREQEREBERAWKrjEtO9p6hketZVEnvbvmn8EFLRxiWpY1wy3iVdqntnwpvzT+CuEBERAREQEREBSrDT8dsku8AvczoqAEulLASXYGQ0Y37zgZXU2iS0apFxonWCjtzYKSSogqqYuDotnhtknDgUHCogOQD2hEBERAREQFD2CRhY4ZDhgqVPWgoGx5mEfa7Z+9XzWhrQ1owBuAVLH8Pb9L+9XSAiIgIiICIiApWahbTPrYG10j46UyDlnsblzWZ34HbhdxZKixagvwskGm6aO3ybbY6qPaFRGACRI52fRwPb1oOARZJ2NjnkjY8Pa15aHj9YA4ysaAiIgIiIgoIBBBGQeIUqEFDUM5OWRg4AkBFkrfhcvzkRWa0+/v8Am/vVqqq0+/v+b+9WqIIiICIiAiIgLrZP/ayH++nf7a5JZzWVJohRGok5qJOVEO15m3jG1jtwisCIiAiIgIiICiT3t3zT+ClRJ7275p/BBUWz4U35p/BXCp7Z8Kb80/grhAREQEREBERBsUFFU3Gsho6KJ0tRM7ZYxvWf3D0rrL7BNZLa/T1npamV78G51rIH4meP+m049w37z7VydFW1VvqW1NDUSU87QQ2SJ2HDPHerI6t1GRg324fblBSoiICIiAiIgKRxUKRxQUkfw8fS/vV0qWP4ePpf3q6QEREBERAREQbVroZLlcaehhkijkneGMdK7DQTwyV2mlKvUEF1h0pWUXK28yGCpgdT7OIySXO5QAHHWDlcEDg5G4hW82qr/PSGkmvFY6At2SwycR2E8T4oNK7QQU10rIKSTlKeKd7In5ztNDiAfBaiIiCIiAiIgKFKhBS1vwyX5yJW/DJfnIis1p9/f8396tVRU0xgmD8ZHAj0K6jljlbtMeCPWiPaIiAiIgIiICIiAiIgIiIoiIgLzJujf80/gvS0q+rY2N0Ubg57txx1BBqW0/8ANN9R/BXCoYZDFK2RvFpyrqGeOZuWOHqPEIMiIiAiIgL3DFJPMyGFpdJI4MY0dbicAeK8L3FLJDKyWF7o5GEOa9pwWkdYKDoNYWWmtbqWShaOQdtwPImEm1LGcF2QTjaBDsdS29X2i3UdLVSW2CNrqWuED+TfIdlpYSA/b4uJB3t3bt/UuV5aXkTDyjuSL9sszu2sYzjtx1rNV3GurmtbWVlRUNYctEspcAfRlBcXmipKSnfSwWuV7oqSnnNe2Rx3vDSS4e52DtbIxg5A3neudWy+vrJKNlHJVzupWHLITISxvqHBayAiIgIiICnrULXqqtkLCA4GQ8AEFbGf+eaf7X96ulzwJBBB3g5yrqmqo52DzgH9bSUGdERAREQEREHV1FroHUEzGUJhfBaIa7ngkedqRwblrgTs4dtEDGDla1RR0EGlqKo5Gm53URyuL5HTcoS2QtGyG+ZwH6ypprjXT0rKWasqJKZmAyF0pLG44YHDcpbcq5tGaJtZUClIIMAkOwQTk7uCIt5KOgh0pSVRipOd1Am86WWUSHZeGjYa3zdw+MueXt80j4443yPdHHnYaTkNycnA6sleEBERAREQFCLDUVMcDSXOBd1NB3lBV1pzVy/ORYXOL3lzuJOSiKhZI4JZBmONxHaAslDCJqgNdvaBkjtVyBgYHBEU3NKnu3eITmlT3bvEK6RFUvM6nu3eKczqe7d4q6REUvM6nu3eKczqe7d4q6RBS8zqe7d4pzOp7t3irpEFLzOp7t3inM6nu3eKukQUvM6nu3eKczqe7d4q6RBS8zqe7d4pzOp7p3iFdIgpDR1ON8TvFYXNcw7LgQR1ELoVr10LZoHHHnNGWlBSrJHDJLvjY53pAU00QmnYw8Cd/qV41oa0NaAAOACKp+Z1Pdu8U5nU927xVyiCm5nU927xTmdT3bvFXKIKbmdT3bvFOZ1Pdu8VcogpuZ1Pdu8U5nU927xVyiCm5nU927xTmdT3bvFXKIKbmdT3bvFOZ1Pdu8VcogpuZ1Pdu8U5nU927xVyiCl5pU927xWF7HxnD2lp7CF0C8TxNnjLHDjwPYUFBleo43yHEbHOPoCNYXSBnWThXsUbYWBjBgD70RUczqe6d4pzOp7p3iFdIgpeZ1Pdu8U5nU927xV0iCl5nU927xTmdT3bvFXSIKXmdT3bvFOZ1Pdu8VdIgpeZ1Pdu8U5nU927xV0iCl5nU927xTmdT3bvFXSIKXmdT3bvFOaVPdu8QrpEFLzSp7t3isMkUkR/lGObntC6BeZGNkYWPGWlBz6L1KwxyuYf1ThEVt2n39/zf3q1VVaff3/N/erVAREQEREBEREQu1i0jQwaXrKq4SztvEdHz1tOwgNijJwwPGOJ3nCrdB22luN+a6vkhEFKwzmOaQMEzh7lmTu3nGfQF11BZbvWQ6qqbhV22SpuFKADHWtc1h2twJ/VaBgD1IPl6L1NGYpnxuLS5ji0lpyMg43HrXlAREQEREBeZPe3fNP4L0vMnvbvmn8EFTbPhTfmn8FcKmtnwpvzT+CuUDKIiAiIgIiILbSlsivOoqC3Tl4inkw8sOHBoBJwfYt+qk0Y1kzKemvfLAOEbnTxFu0M4J3Zxla2iaupodR09VRW99fPEyQtp2OwXZYQT7AcrodJ3+p1JeorHdaSjmttU17eRipms5uA0kOYQMjGOtBwSL3MwRzSRtdtNY8tDu0A4yvCKIiIgiIgZREQUkfw5v0v71dqlj+Hj6X96ukBERAREQEREGegpJq+up6OmbtTTyNjYD2k4XVT27RtNcnWWoq7gKhhMUly22ciyUcfM47IO7P/AO1XeT+SOLWlodKQG84xv7S0gfeQr6LUUv6Vmxm00LrY+tNM+jdTgvcC7ZLi8+cX/rZQcJPGIp5IxIyQMcWh7DlrsHiPQV4VhqKiit1+uFFTuLoaeofGwk5OAd35KvQEREUREQFClQgpa34XL85ErfhcvzkRGa0+/v8Am/vVqqq0+/v+b+9WqKIiICIiAiKDuBKAQDxAPrW7QXKooKWupqcRiOuiEM20zJLc53ditLzYYKCmqjCa2SWjlZFPKY28i5xAyAQdpuCQBnj6Fli0q+SCKp5U83fa3Vhdts2g8NcdnZznHmjfjrQc0i3ZKFjLJT3APcXy1UkJZjcA1rXZ/wBS0kQREQEREBeZPe3fNP4L0vMnvbvmn8EFRbPhTfmn8FcqmtnwpvzT+CuUBERAREQEREGegram3VkNZRSuiqIXbTHt6ir6q1vdJoJo4Ke30UlQ0tnqKSlEcsgPHLurPoVPLRMZYobiJHF8lVJCWbsANY1wP+pWWqNPMsAAfNLI+aQmnGyMcmAMlxH6xJ3NHAbzxCDn1K3rzQst9VFCx7nh9NDMS4YwXsDiPZlaKAiIgIiICIiClj+Hj6X96ulSR/Dm/S/vV2gIiICIiAiLbs9Iyvu1HRyvcxk87I3PaMloJwSEGq1zmODmOLXNOQQcEHtXT/p3d8cpyNv59s7PP+aN5fGMe67cdeFrVunOZ2y41ctRk09QyOnDRumjJ989WC3HrPYs0GmGTUVFVtqXOZNRSVEzQ0ZhcGvcwfNdyZGe0H0IObe5z3ue9xc5xJLickk9ahXtns9DU0lFLX1FTG6vqzSwCBjSGEbOXPzxGXtGBv4qlnidBPLC/G1G9zDjhkHB/BFeEREBERAUKVCClrfhcvzkSt+Fy/OREKKYQThzvcncVdAggEHIPAhc8vccsrN0b3j0AoL9FS84qu8l8E5xVd5L4ILpFS84qu8l8E5xVd5L4ILpQqbnFV3kvgnOKrvJfBB1dZfK6tpnQTuiIfscrI2FrZJtjc3bcBl2FjbdatsjJA9m2ykNG07A96IIx68OO9cxziq7yXwTnFV3kvgg6B1XM6hjoi4chHK6Vrcbw5wAJz6mhYVS84qu8l8E5xVd5L4ILpFS84qu8l8E5xVd5L4ILpFS84qu8l8E5xVd5L4ILpa1fO2KFzc+e4YAVaaipxvkkWAkuOSST2lBkppORnZJ1A7/AFK8Y5r2hzCC08CFz69RySMP8m9zT8koOgRUnOKrvJfBTziq7yXwQXSKl5xVd5L4Jziq7yXwQXSKl5xVd5L4Jziq7yXwQdRcrvV3OKOKpMQZGXODYomxhznAAuOBvcQBv9CmtvFbXR1EdVI17J5hO8bA3PDdnLezIwDjjgLlucVXeS+Cc4qu8l8EHU113qa+nihqY6Y8k1jGytga2QtaMNBcN5GFoKl5xVd5L4Jziq7yXwQXSKl5xVd5L4Jziq7yXwQXSKl5xVd5L4Jziq7yXwQXSxVEzYIy9x39Q7Sqk1FV1ySrC5znnL3Fx7SUBri14f1g5V7DK2aMPYcg8R2KhUse5hyxxafQUHQoqQVFV3kqnnFV3kvggukVLziq7yXwTnFV3kvggullo6mWiq4aqncGzQvD2EjOCDkblQc4qu8l8E5xVd5L4IOmkutbLSOpZZ3PhLGRhrt+y1ji5oHYAXFZae+XGnDRDPsgUjqPAaMGE5Jae3eTv4rlOcVXeS+Cc4qu8l8EHV22+V1thEVM6EtZJysXKwteYpMY22E+5OAN/oHYq5xLnFziSSckniSqXnFV3kvgnOKrvJfBBdIqXnFV3kvgnOKrvJfBBdIqXnFV3kvgnOKrvJfBBdLxLI2Jhe84A+9U/OKrvJVie97zmRznH0lAkeZJHPPFxyi8oistLDy84ZwHE+pXcbGRtDWNDQOxVlp9/f8AM/erVEEyiIGUREBERFEW7Z6SirKsxXG4tt8OwTyzonSDO7AwN/8A+l0UGkrRWU1bLb9UQ1BpKd08jeZSMAaPSTgZO5ByCKBwUoCIiAiIgLSr6Vj4nSMAD2jJx1hbq8Sb43/NP4IKOGMyytjH6x4q7iiZC0NjaAO3rKqrZ8Kb80/grlEMplEQMplEQMplEQMplbtltdTerpT26jDeWmdgFxwGgDJJ9AAJV8NKW6tbUQ2PUEddX08bpHU7qZ0YlDfdcm4nBwg5TKZUcVKBlMoiBlMoiAteqpmTsO4B/U5bCIrngCXBoG8nCu6anZAwBoBd1u6yqqMf880f2v71dogiIiiIiAiIgIs1DST19ZBSUrDJPO8Mjb2krqRpC2yVZtdPqWmkvAJYKfkHCJ0g/UEnDPVwQcgi9SxPhlfFK0skjcWvaeIIOCF5QEREBMoiILFPBHOwteBnqd1hZVCDn3tLHlruLTgostb8Ll+ciDPaff3/ADP3q1VVaff3/M/erVAREQEREBERFF1lyBsGjKW3e5rrwRVVQ62wD3tp9Z3+K5ilfFFVQyVEXLRMeHPi2tnbAO8Z6src1Dd5b7d6i4TtDDKQGRg5EbAMNaPUEFciIgIiICIiAvMnvbvmn8F6XmT3t3zT+CCptnwpvzT+CuFT2z4U35p/BXCAiIgIiICIiDodAxVj9TU81DPFAaZj5pZZWlzWxAefkDjkHGPSujsFRp2qutXBpaGqorrVRSMo5qw7cQyCSGgHLSRnBOcLi7BeKixXNldStY8hpY+OQZbIw7i0+gq7g1RaLZI+rsOnhSXAtIZNNVOlbBkYJY0jj60RyrmGNxY4Yc07JHYRuUISXElxJJOST1oiiIiAiIgIiIKWP4e36X96ulSx/D2/S/vV0gIiICIiAiIgsdN3Loe/UNxMZkbTyhzmDi4cDj04JXV2y36ebquluFLfRUxyVjZKeiZA4Tl7n5DXE7gATvPYFxVBWTW+ugrKVwbNBIJGEjIyO0di6j9L7ZBVPulBpyGC8Py4Tmoc+KN54vbHjGd5QVOtCx2rrwYsbPPJOHr3/flUyl73SPc+Rxc9xLnOPEk8SoQEREQREQFClQgpa34XL85ErfhcvzkQZrT7+/5n71aqmt0gjqRtHAcNnKuUBERAREQFc23T8lwo4Zo6yBktQ+WOCB7XZkdG0OdvAwNx61TKzjvlbDZmWumlkghEkj5DG8jlQ8NGD6Bs/eg9WqyG4U8U8lbT0rZ5+b0/LBx5WTAONwOyPObvPavFBaHVPPjUVMdI2i2RMZGOfvL9jGGgnitmxX2C3MgirrbHXQwVBniDpCwscQAeHH3LSPSPWsVu1BWW2WumpHubUVb2OM2cOaWybfAbjngQg9Q6eqn3aut0kjGPoWufM5jXSbmkDzWtGXcRux68YVZWQNpqmSFk0c7WHAkizsu9WQD7Ct5l1iF3qq99GcTuc4MjqHxuhc45yx43g8eOdxWC83F91uU1bLG2N0uMtaSeAA3k7yd28nid6K00REBERAXmT3t3zT+C9LBWSiKneSd5GB60FdbPhTfmn8FcKjpJBFUMe7hnBV2iJRERRERAXqJrHysbJIImEgOeQSGjtwN5XlR1ILa52VtDW0tIyvhqJagRnzI3tDA8NLSdodYcOCw1dqlpaetmfIxzaSr5o8NzlzsO3j0eYfFea65SVddDVhjY5IYoWNAOR/Jta0H/AEgrau17bX08sMFCylFRU86qCJXP25MEbs+5b5zt2/jxQeayxT0jK2SSeIxUzIXiRucTcqAWBvsyd/YVVKzrb1NV2aitj4mNbTHfKCdqUDIYD80OcB61WICIiAiIgIi8yPbGwvccBu9BTR/D2/S/vV2ufa8tlEnWHbX3q+Y4PaHNOQRkFEekREUREQFb2jT1TdmUzqeaFonmkiO2SOTLGB+/1g4HpVQrK3Xqe326so4WNPOXRuEh91EWnOW+sbigjohzau3U89TDC6tiZIHSZAiDyQ0P7OA9WQvVVZpaGtpKOvmipp58coyTP/LguwC/HDPHd1YK9Vt6FbqDpWoooXN22uFLk8mA0ANb243cOtYbzdJbxLHUVbGmr5PYmnHGbfucRwBA3ekAIPVxs89sfTx18jIZZnODoyCXRtDtnbOOokEjHEDPWFN3tTLdFSSMroqkVTDIwMjexwZnAcQ4Dcd+O3C8XC5dIXJlZVQBzWsiY6LbOHtY1rcZ4jIb969325w3arNVHRGmlecv/lzICMANaAQNkADAA6kRWoiICIiAoUqHENBLjgDeSgpa34XL85Fjmfykz3/GdlEHhbEVbPG0ND8gfGGVrog3OkZ/kfVTpGf5H1Vpog3OkZ/kfVTpGf5H1Vpog3OkZ/kfVTpGf5H1Vpog3OkZ/kfVTpGf5H1Vpog3OkZ/kfVUdIz/ACPqrURBt9Iz/I+qnSM/yPqrURBt9Iz/ACPqp0jP8j6q1EQbZuM/yB/hWvLLJK7akcXFeEQFnhq5oW7LX+b2EZWKNhke1jeLjgK3hooY2jLQ93WXINHpGf5H1U6Rn+R9VWfIQ90z6oTkIe6Z9UIKzpGf5H1U6Rn+R9VWfIQ90z6oTkIe6Z9UIKzpGf5H1U6Rn+R9VWfIQ90z6oTkIe6Z9UIKzpGf5H1U6Rn+R9VWfIQ90z6oTkIe6Z9UIKzpGf5H1U6Rn+R9VWfIQ90z6oTkIe6Z9UIKzpGf5H1U6Rn+R9VWfIQ90z6oTkIe6Z9UIKzpGf5H1U6Rn+R9VWfIQ90z6oTkIe6Z9UIKzpGf5H1VgmqJZvfHZA4DgFdchD3TPqha1VQxuYXQt2XjfgcCgqllhqJYd0b8DsO8LEiDb6Rn+R9VOkZ/kfVWoiDb6Rn+R9VOkZ/kfVWoiDb6Rn+R9VT0jP8AI+qtNEG50jP8j6qdIz/I+qtNEG50jP8AI+qnSM/yPqrTRBudIz/I+qnSM/yPqrTRBudIz/I+qnSM/wAj6q00QbfSM/yPqrFNUzTDD3+b2DcFhRAREQEREBERAREQEREBERAREQEREBERAREQbNuGatvoB/BXKp7b8Lb6j+CuEBERARERRERBlo6WetqoqWkidLPK4NYxo3uKvbhou7UNHPUl1HUCmGamOlqRJJAPlNC2vJr5l5rqlvv1NbKiWI9jgAMjxK8+S+Rx1nRxnLmVLJY5h8dpYSc9u8AojlUXqVoZK9jeDXED1AryiiIiAiIgIiIjn5RiV47HH8V5Xub36T5x/FeEBERAREQEREBemxvcMtY9w7Q0kLo7Pa6O20Ed91FHtwPyaG35w6tI/Wd8WIHif1uAW7cNUa1go6W5G6VFPQVmebikc1sLMHHJhrfckfFO/CDjzHI0EujeAOJLSF5XfUuoNZ2/UNno71dqsirlhc+lnka/MT3gbMjOrIzuO/BXI6igipdQ3SngYGRRVkzGNHBrQ8gDwQV6IiAiIgIiICIioIiICIiAiIoCIiAiIgIiICIiAiIgIiINq2/C2+o/grhU9t+Ft9R/BXCAiIgIiICIiC10xeXWG8w13JCaMB0c0ROOUjcMOH/zsV7R3XTOnpKm4WF9wqK+SN0dLHUxhjKbaGCSR7ogbguNRAREQEREBERAREQUE3v0nzj+K8L3N79J84/ivCAiIgIiIClpw4EgHBzg8D6FCIOw1lEdQNfqq2SPmo3BkdTTH3VucBgMIH/TP6rhu34O9bOkr3RaRtbaqrkbcpa97Hi2xuaWU7WO99fkECXd5o6uJXK2O8Vlkr21dC9u1slkkcg2o5mHix7f1mnsVw+bRFS8zPpb/Ruecmnp3wyRxnsa53nY7MoJfBFHre11FPdBc4aysgqG1Dnfyp2pRkSj9V4PEe0blV6r/wDVN5//AD5/9xyuKGs0Vbq2nroYdRVEtNK2VkUroGMe5pyA4jeBkDguauFW+vr6mslAElRM+VwbwBc4k48UGBERAREVBERAREQEREBERAREQEREBERQEREBERAREQEREGeheGVTCdwO7xV2udW5DcJI2hr2h4HWTgoLZFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFQSGguJwBvKr+lP7H/UteprJJ27O5rewdaDXedpxd2klQiICIiAiIgIiICIiAiIgIiKgiIgIiICIiAigcApQEREBERAREQEREBERAREUBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERUEREBERAREQEREBFDvcn1IgN9yPUpXmI5jafQF6QEREBERAREQEREBERAREQEREBERQEREBERAREQEREBERAREQEREBERAREQEREBERUEREBERAREQEREBERAREQEREHl/uHeooomOIn+pFB5pjmFvo3LKtSjfglh694W2qCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgw1RxCfScIsVY/LgwdXFFBrtcWuDhxCsY3iRgcFWrJDKYnZ4g8QgsEXlj2vblpyF6VBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBeJHiNhcfYO1S97WNy47loyyGV2Tw6gg8OJcSTxKKEUBERB6Y90Zy04W1HVNO54we1aaILJr2u9y4H2r0qtemvcDucfFBZItRj3Y90fFZWuPafFUZkXkFekBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBF5JWNzj2nxQZkWo97vjHxWBz3E73HxUFg57W+6cB7VhkqmjcwZPaVqKEHp73POXHJXlEQEREH//Z";
const SKY_GUIDE_2 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAO6AbgDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAEFAwQGAgcI/8QAVhAAAQMDAQMFCQwHBQYEBwEAAQACAwQFERIGITETFEFRkQcVIlJTYXGS0RYyMzQ1QmJyc4GTsSNUY6GyweEkVnWUojZDVYKz0hd0lfAIJTdERYPx4v/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAA6EQEAAgEBAwgHBgYDAQAAAAAAARECAxIhMQQTQVFhkaHRFDJScYGxwQUiQlPh8BUjJDOi8WJywkP/2gAMAwEAAhEDEQA/APk6lQgWHqekCgKUEoiIqVKhAglSoRQhKlQiK9IoUoqUUKUEgqV5UgoqVKhFBKKFKoIiKAiIgIiICIiAiIgIiIChEVBEUEqASoRFUFCIgKEUIgiKEBCigqoKFKhAUFSoRBQhUFAREQAihSiJUryFKKkKVCkIM9JR1Va5zKOmnqHNGXCGNzyB1nAWFwLSWuBBBwQRggr6BcLjWbM9z3ZoWOpko5rk6apqp4Th0jmkBoJ6gDw8y2NtLoy03a07SR2+lluFxs7JjyzMsjn3fpdPAnHDPpSk2nzuWGWBwZPFJG4jIbIwtOOvBU08E1TK2GmhkmldwZGwucfuC+id0e4RU+29mr7lRsuMYtsD5aeQ4EpOvq85zwXNWXaWtt/fKmsFG2nqbnKGxyQFxmhbqyI4z58460ImZi1DUU89LKYqqGSGRvFkrC1w+4rLNQVsEDKiejqYoX+9kkhc1rvQSMLvds7u62s2Yp7uILnfrZqlreVOoAE5ZE9w98RuJ9HnWza9oLrUWDaC97V1T5LVXwvgo6OU5bLMTu5Jp4Nb1+xKNqat8xCz1dJU0U3I1lPLBLpDtErC12CMg4PWuz7i9rpbjti11Y1r+aU7p42O3gvBAB+7Oexe+7LaK2j2wqLhLFIaSsax0U2MtyGhpbnoIxw86VuXa+9Tg0TeMHoPBFG0ooUoGVKhEHpFGUUVKIiCUUIqJRRlMoJRRlEEqERARFCglRlCVCoZRERBQrbZWkt1ftDRUt5qOb0EjyJpdYZpGkkeEeG/Ayu82Wt2xVJtbf6StqKCotsUUfNJKuVrmnIy/S7gSDu3b1aZnKny3BxnBx14WSWCWJrHSNwHcN63OUiFrlja9udR0tzvxncvNyljfT04Y9riBvAPDcFFtXlF0mwFNBVX98dTDHNGKGpdpkaHDIiJBwekFbncvq2yX6ltdTQ2+ppqjlHvNRStkeC2JxGHHeBlo3KpMuOyOtF9E2UqJLvbNobjzGwMrYuasiNVTRRU7AXPDtzvBBI7dy4zaJ8zrvPzkW8SjSD3v0chwHvdO7046col206amnq5DHTxukcBk46B1lbPeav6Ym+uFdbHgcyrnY36gM/cV3ew81O6Spo3UUD5HU80jp5BqdgNGGgHcBxOelZxyuZjqddbT5vDDLr83yo2auHGJv4gWOa1VsMZe+A6RvOlwOF9d2RrniliD6ajp7VS5dcKiaMPM+eDckcegALlah0T6mV0DNETpCWMPzWk7h2LVOG1L5+i2K2FkL2Fjs62lxHi+ERj9y1kaFCFEEFEREEREEqVCIr0ihSg6617R2io2dp7HtTQVdTBRSukpJqOUMkYHe+Yc7tJ/wDfBVu2G0DtpLmKhsApqaGFtPS04OeSjbwGekqjUokRF2629baPqdpLZe7ZT8jNQ0scLW1AEgc5ocCcDo8L0r3sdtXbbLX3C5XS2zVNwqS7kp6dzGchqzqLQdwOTuPQFx6lLKinTVtw2UmraWeC1XUtFRylYKisDzOzfkA9BJxk9WVb7RbVbK36US1Vnu7XRRclTxMq2NihaBgBrQMALggpQpZ7N3us2du9Pc6Et5aI4LXe9e08WnzFfYB3ZrDLQE1FsrucEb4NLHMJ+sTw+5fDFKXSzjGXFdbWbRVG013dXVETIWBojhgj97EwcB5zvJJVMoRRqNz0ihSipRQiCUREDKnKhEEqV5RFekXnKZQekXnKIJTKhEDKIiIIihBKhEQWmzFXbqG/UVTeabnVBG8maHSHahggbjuO/Bx5l1Nt2i2Mh2ovNbV2IyWyojaKODm7TyZA8Lwc4bk793BcCoRmYt1UF32dbsHV2yS2E3ySUuiq+SadI1Ajw85GG5GMJtfd9nLjabRBYrYaSqp2YqpDE1ms6QOIPhbwTkrlUVs2VtsxeW2G7CufSiqZyMkTojIWag9pad4BxxW7QbRW61X2iudoshphTMka+F9a6XlC5paDkt3Yz965tESYX2z9+pbZbblb6+2c/pq8xF7RUmEtMZJGCAekqpuU1JUVj5LfRmjpyBpgMxl07t/hEAnJWsUQpaWO7C28tHIwvilG/TxaetXdt2vjts7pqXWHujdGdUYI0u49K49FIiptvLKcsYxnhDv6Puhvo7dFQRxQvpoiS1s1G1+/r3nj51S1u0sMz5Zo4ncrI4uwGBjQT5hwHmXMorbnswEkkk8SclQihFFClQiCIiAEUKUBSoUoJRQpRUqVCIJRERUoCoUoJRQFKCUUKVFFKhEEqVCIJRQpRUooRBKKEQSihEEooyiCUUIglQiICIoQERQiCIiAoREQUEoUVBQiICIoRBQURAUIiCERERBREQQpChSglERBKI0EkAAkncAOldbc9naHZzZ0uvxkN/rWtdS0Ub8c1Zn38vnPDT/UgW5NSoRFSpUKUGU08wgE5idyR4PxuQU8xhMwjcYhxfjcuhoIRUWNkJ+ewj78nC1IQW7OTBwwQ5wI/wCYLz890dtPpzyCIiJvdON/FWRUVVKwPige5p4EBJKSpiLRJA9pedLcjiepXFPNJT2FkkHvwd27PzlWVNwqpXRmbAMbtbfAxvWsc88plz1dDQ08MZmZuYiezejvfWfq0nYvHNKjleS5F/KY1acb8dau6KunmtlRUPLeUZnSQ3dwWraamSqunKTEF3JEbhjcs85nvuODrPJNC8Ixmfve7g0e99Z+rSdixinmMJmEbuSHF+Nysqu418U8oa3EbXEAmLo9K9Q/7OSH6R/iCu3lERMs+jaOWWWOEzuiZ39imWWSmnic1skTmuf70EcVjHEelW+0XwlPjxT+YW8spjKI63n09KMtLPOeivFWTQSwODZo3MJ3gOHFTNTzQAGaJzNXDUOKv2RsuUFJO7GWOy4dfWO0BVN5qOXrXAHLY/BHp6VjDUnLKq970a/JMNLTnUvdNU0VKhF2fPSihEEooRFSihEEooTKIImVCCVCIgIihBKhEVQQlQSiAiKEBEUIgiKEBQVKhAUIiIKCpUIIREQEUKURIUryvQRXS9z672yy7SwVl3p+UhDS1k2NXNnnhLp+dj92cheNt7Rc7ZepJrpUGtFZ+mhr2nLKpp4OB9GN3R6MLnVd0+0tXHs3UWCoiiqqN7g+DlgS6lfne6M9Gd+7hv8ASqlb7UqlQijSVKhSg6Win5vZ6WQ+91AO9BcQslziEVsqg3g46vvJCrpZ4vc9HDyjOU3eBnf74r3UXOCa0GJzzy7mAEYPEHr+5ePYnauOt+g9IwjSnDKfwRXvrh8melqXUliZMxocWngfO5U9dWOrZhK9rWkN04BW/R3OkioGU88T5CM5GkEccrWuNZTVMbG09PyWl2ScAZ7F0wxmM5mvi8nKdTHPQxiNSKiI3drctvyHWf8AN+QWDZ/4/wD/AK3fyWGmrxBQzU3Jl3KZ8LVwyMLHb6vmVRyujX4JGM4V2JrLtYx19OM9Gb9Xj3t243SZ5qKUsZo1Fud+cArJF/s3J6T/ABBVE8nKzySYxrcXY6sqxoLoympRA+AyDJJORg58yZYVjGzC6XKYz1sp1ct0xMRKtB3j0q42j+Ep/qn8wta4VsFVGwRU/JOa7JOBvH3L1cqyCtmgI1tY3c/I34z0KztTljNdbEc3hpamnGV3VLOyQuioQXEjlCXAdQ/971z88bop5I3++a4g+dWdZdGGppjTE8lEckYxnox2LDezDJO2eCRjw8YdpPAj+ixp7UZXPS78qnTz0Yxwm9jd77/VXIiL0PlCIiAiIgIiICIiAiIgIoREERFQUEoiAiKEBERAUIiIhEUICIoRBEQoIKhEQCihFUFKhAglSoVjQ2S5V8PLUlJLLHnGpo3ZUGgitvc1eB/+Pn9VVs8MlPK6KZhZI04c08QUGNSoXuGN80gjiY573bg1oySioRZaqlnpHhlTE+NxGQHjBwsSKlFClBKKFs09DVVMbpIIJHsbxc1pIH3oNdFu2u1VV0ndDRx63tbqIzjcsFXTSUlTJTzDTJG7S4dRQYkUKUVOUUIglFGVKAiIhaUXqGN00rY2DLnEADzrdutnrLSYxWx6DICW7wcoW0MplQihaUUIhaVCIhYiIqCKMogEoiIChEQEWxS0VTV55tBJLjjoaThYHNLXFrhgjcURChZqamnqn6KeJ8juOGNJK8TRPgldHK0te04LTxBQeFCIgKERBCIiIKChUICIVBRBFCKgpUKUBfYO5xHMdiJpqVmudskvJtxnLgBgL4+vt/crE7e51US0bNdS2WpMTcZ1PAGkY6d+EhnLg57vlt8f/wAKf8t/VUuzuzk2115uYr5nUtRCQ6VrY+DiSCMdHBdCL93TsA943/5D+q2u4+ysk2n2i75QmKsOh08bm6S15e4kY6OKF1DQpe5jSSCSnfeGmuYMujj0nR1ZHFaOxGzPJbV1MFdUsiqLfIMR5H6UnPDPm3qdgS5/dWny4kulqw454++49i3rk1re7lTh2B/aIhv6zEhcndUscDB3zFW0Tjk4xTZGogk7+OVp0vc/pKO3w1W0d1ZQOm97GSBg9RJ4lb3dPopabbm23OopZO9zRTh9RoywYecgnr8y6ruiyWmkNHUXfZyou8Tg5scsJyIiSDg+njnzIl7ofLtsNkZdnTBOyYVFFOcMlA4HGcH7t+V0X/hc57KaRlfiJ7NcrnsA0DAO7eve3t4M+xsVANmLla6ZskfN5akAMaADho6eGVb91+WWn2RtUUb3NZPKwSAHGoCPIB82UW53PlN4pGUF0qqSOTlGwyFgf42OlfXtjrBTwbLvYyrbK2pZre8Efoy5oyDv6POvii+w9yWA1Ow94iibqkdNK0NHSTEMdqQ1nwVmxNqhoNta6hgqW1LI6bUJGkEHOOr0rbre5/R3G71jqi6NZVSvdI2CPSS1p4ZB3qu7jdFUUm1dbTVdPJBMyhOqORha5vhN6CsNvLj3aX5cc98ZG5z0aSMdiM9MubqtmK+DabvExofUlwDCNwLSM6vRhdZ/4e2qGaOgqr4xlxkA0wjSMnzA7100phi7skUcuA6W16Y89LsE9uAVrbRVFmo9rHxz7GV1bcXSNkjqYcnljgEObv6MfdhKXamXy7aOy1Nguj6GqwXABzHjg9p4ELLsvs9VbR3DmtKQ1rG6pZHcGNV53UbpLdLpRPqLTWW2WOAgsqsanguyCMdHFdB3DXwuN3gyBUHknjr0DUP3EjtTpamZ2ba8nc0opRLT0V3D62IeFGdJwfOBvC5GzbK3C532a1BnJS05Inc7hGAcf/xb9DsltdJfqyKip6qnq2OeZKlzzE1wLuh/TnjuXa9yiGalvO0NvuczZLpG+Myu5XlCQMg+F04JGUSZmI4qp3c1oJDJTU14Dq6MZdGdJx6QN4XHU+zFxl2jNiMYbVNcdRPAN46vRhdJsds3f6buhxPqaOpjEFRI+oqHtIY5hzk6uDtWQu1p56N3dZqqdpby4tTYz9cO1EenSQlJtTDm2dzuipaqCOO7tNe1zXiF+kawDncOK1u6zSu59aoYmlz5Wua1oG8nIA/Na182b2gl7pEj4aOpcZK1ssVSGHQI8gg6uAAAxjzLqtv3Q023WyElQQIRM7JPAeGAP3kIXvhzTO5/QUMEPf68x0lRN72PLQM9W/iuc2v2XqNmquNkjxLTzAmKUDGccQfOvpvdAks9Hcqc3jZaqujpYtMdRFkgbz4HHj0+fK5fumXiWts1vpZtn7haxFNmJ9Vpw4BmNI6epDGZlzGx1ih2hub6KWpdA/ky9hDc6scQt607GS121FdZnzGMUgJdIG53bsbvPlU+ytz7z7RW+vJwyKYcp52Hc79xK+17Ush2at9+2jp3DnVRBFGw4+eMtb25B+5IXKZiXyuLY2V+2MlgMzg1jS8y6d+jGQcfeoZsdLV7VVFlt8/KNpsctO5uAzr3Dz7l9gjioG6tsMjS+1tJ+qMv/p9y4zuMVba6vvr53Dnk72TnPEgl2ewkJSbU1au/8PrXUSS0VDfGSXCIHVEdJwR1gbwvn9wo5rfWzUlS3RNC8se3qIX1WhuNqob9K23bB3MXOnc/U6LeRncTknBBz9+VwO3dYa/aqtqX0U9DI7QH08+NbHBoBzjtRcZlv7I7Gm90M1yrKoUtBESDIcb8cTv3ABbN+2Jp4LO+62S4sraaMZfvBOBxII6upW/c9uVzoNl6htTs9PcrK5z3crAWOI6HtLCfCCsbps5s5f8AY2svNnt0tslhjke0uYYslgyQW5wQesIkzNuS2Z2J75Ws3a51baKg3lrzjLgDjO/cBlZNoNiIqazuu9lr211HHvkIwcDpII6uld6x9uk7mVtqZrVJdaOOniL6aE+EC3cTjp0nOVUQX6lg2Yr47VsXdaa3TRS65QByYJbguOTwG7sSjalzmz2wPfrZ+K5sreSc8u8FzfBADsE59AW3ce5zB3olrbRceduiaXEDSWvxxAI6VcWprm9w+pe0kHkJhkfaYTuLNL7Fe2/NbMMDoGYylJMzvl77mllgjspqo6lsr6prXPjGMx8Rg4/mvnm2Vpgs92MFPVtqWvbyhe0g4JJ3biu77hbWvjvI3Z1Qn9zl8zu1BVW2vmgrqaWnl1uOiRhaSNR3jrHnToWPWl9C7k9ngkiluPOWmVwdGYMjIAI8LrVLt7s8ynvsTaKoFTUV0zhyLCMsdkYG4+fpW73Ew1209YDjJonY8/htWWGkktndjbNcqd8EFRXyGCSRuGv1NIaQeB3kdqdBwyZIe5rR08ULbtd2w1M25rGloBPUM8Vym2GytVszUxtlcJaebPJSgYyRxBHQV1PdZ2evVZtTFNSUNTVQTQMjhMTC4NcM5ace9379/WrfuuAUmxlopax4dXGWPO/JJbGQ89pG/wA6JEzufHlCIo2IigoIREQQiKFUEREBFClBK6rZvb++bN20W+2805ASOk/TQa3Zdx35HUuUUoTFu/8A/F3ak/8ADv8AK/8A+lU2vby9Wu83G7UvNOdXBwdPrhy3IOdwzuXLKUtNmFvadoa+03516pOR54XSOOuPUzL86t2fOvN3v1fdr2681EjY61zmOD4G6A0tAAIHRwCqlIUWnVX/AG+vm0Fm713M0skRe15kZDpe4t4ZwcfuW3YO6dtFZKJlG19PVwxt0x85YS5g6BqBBI9K4tFbKhebU7VXbamZj7rM0xx55OGJuljM8SB0nzlZto9srttHQ01HcubcjTO1R8lFpOdOnecnO5c8ii1CVd7MbV3bZiaV9qmYGTY5SKVmtj8cDjr84VGpQdTDt7eodo6q/RCkFbUwiGQGElmkYxgZ4+COlVsW0NfDtKdoGcjz4zun3x+BqOc+Dnhv61UKUKhcXvaW53q8R3aqkZFWRNY1j6dujTp4Eb+O9dRB3XdpYqUQvZQTSAY5Z8JDj5yAQD2L5+iWbMNy7XOtvFfLXXKd09RJ7553bhwAHQB1KbRdK2zV8ddbah0FRHwc3fkdII4EHqK00RXe1Xda2lnpDAwUUDyMcvFCdY84ySAfuXH227V9ruTbjQ1UkVW1xdyucl2eOc8QenK0kQiIh30/db2llpeRY2hhkIxyzITqHnAJIB+5cZDca2C5NuUVVK2tbJyon1Zdr6ST0rURCIiODu6rur7TT0XN2upIXnGqeKEh5/fgfcFQ7UbVXPaiWnkunN9VO1zWcjFo3EgnO89SosolkYxDubT3VNpLdRspnGmqwxoa2SoYS8AcMkEZ+/euc2j2iue0laKq6ziRzBpjYxulkY6mj/2VUohGMQHeMLo7ztpeb1ZYLTXSQmlhLCCyLS92kYGo53rnERadF7tLz7mPc7ykHMNHJ55L9Jp1asas8Pu4KqtN0rbPXx11tqHQVEfB7d+QeII4EHqWkiJUO/n7ru0stKYWMoInkY5ZkJ1DzgFxAP3LhJ5paiaSeeR0ksji573nJcTxJKxohERHB0Gy22N42XMjbbLG6CQ6nwTM1MJ6xwIPnBW9tL3RL9tFROoqh0FPSv8AhI6dhHKDqJJJx5lyKIVF26PZbba9bLsfFb5Y30z3ajTzt1MDusbwQfQVsbT90G+7SUho6p8MFK7GuKnYRrxw1EkkjzcFyihEqLt0MO2N2g2Yfs4zm3MHtc05i8PDnaj4WevzKNmtsbts1TVVPbObcnUuDpOWi1nOMbt4xuXPohULTZ3aG5bN1pq7VOI3uboe17dTHt6iF72o2jrtp7gyuuLYWysiEQELC0YBJ4ZPWVTohUcW7Z7rW2S4RV9tnMNRHnDsAgg8QQeIPUrLana+6bUmkNzFO11Lq5MwMLPfYzneeoLn0Qrpd3be6xtLRUjaeQ0lWWjAlqIyX485BGfvXK3++3HaGuNZdagzS40tAGlrG9TQOAVcoVSogRFBUUKhEQFCIiChEVBFCIgpUIglZ30dVHEJpKWdkRweUdE4N38N+MLAvuuwE4207ldds/O7VVUsbqduTvxjVE77iAP+VCZp8QgpqioJFPBNNp48nGXY9OAkVPPLOIIoZZJiccmxhLs+gb19n7nuNje5dc9oahmiqqXOexp4kt/Rxt9bJ+9Z9j3U2xncvl2rNO2qudYzlnyP4vLn4a0niG78n70pNp8XrbdXW8tFfRVNMXe95eJzM+jIWOGlqZmOfDTzSMb75zI3OA9JAX3nYbaVndMtN1tO0VDT6ow3JiB0lrsgEZJLXAjjnqWn3J6Z1HsdtRSudqMFXUREjp0xgZ/clG0+JU9PPUkinglmI3kRxl2OwL1FS1Mz3Mhp5pHs981kbnFvpAG5fUP/AIePlW7f+Vi/iKtu4/8A7bbX/bH/AKr0onKrfFzBMInSmGTkmu0F+g6Q7qJ4Z8yxr6L3S9toLjFUbM2y2xU9vpKrdKHeE9zCQTp4AEk+fpVP3LLJTX7bKkpq5gkpomOnkjPB+ngD5skZ9CLe65c/DablPTGpht1ZJABnlWU7y3tAwtWKOSWQRxRvkeeDWNLifuC/TFxk22j2iibaqK2d4o3MaWvkxI9m7UR4uN+B5lzV4stNbO7Rs/V0kQiFeyV8rWjAMjWOBP3gjKUkZvi0FruNQ+RkFvrJHxjL2sp3ktHnGNy80lvra572UVHU1D2e/bDE55b6cDcvv9324qLb3SaHZyGipzTVXJieY55QveDgg8N2AN6x7U7YP2W2ztdmt9upBBcZGS1cgbpe5z36MjHTuzk5ylG3PU/Pr2Oje5kjXNe04c1wwQeohbdPaLnU0/OKa3Vk0HlY6d7m9oC+m92Kgp6fbqy1UNuFZLVMHK0rcjnLmvAAOOsED0BdvQz7fTV1DI+3Wa320FrZqQzl8mnpwQMAgcAOpKXb3W+BbNOoYtoaA3emkqKJs45eFjS5zh1aRvO/GR04K7m7w7M3junWWltNu0UExaypjMDoWSnwt4aQDjAG/dnCvNtLdTUfdi2aqKeNsbqx7HzaRjU8OI1ekjHYsu2f/wBa9mPso/4pEpLtxHdcs1use1EVJaaVlNAaRjyxhONRc7J3nzBcUvond2/2zh/8jH/E9fOlJbx4JRQpRRERAREQEREBERARQiCVCIgIihAREQFCIgKFKhEERCgFeVKhARFCIKFKhUERQg36prRbKUgAEk5OESr+S6T0+1ERXqVARB6XfdxS8SW3bWGkw50NwYYHtAzhwGprvuwR964BdT3PdpqLZO9SXOroJayQQmOEMkDdBPvjv8277yiTwd53fLzHDHbtnaTSxg/tUzGAADiGDt1HsWv3PtsLBW7IybIbWyiCDSWRTPJDXsJyBq+a5p4E7uC+c7V3yXaPaGtu0zSznD8sjJzoYBhrc+YBVSWRjup9ypb1sT3N7PWDZ+4C6XCpwQ1sokc4gHSHFow1oz6fSqLuP7Y2ygF0te0NQyFldKZ2zS7mOc4Ye1x6M8R96+VIlmy++7KVnc72LuFXDbr4x8lQwOfNLMHsY0HcwOAxneT0ndvXN9zLaSzWrazaaquNyp6eCqlJgkkdgSDlHnd9xHavk4KlLNlu3qWOe83CaF4fHJVSvY5vBzS8kHsVlsRtAdmNpaS6GMyRMyyZjeLo3DBx5xuI9CoFKjT7fdqfYbaO59/TtjLSRSAOnpWVXJ6iBj3p8Jp4ZwuVtd42bou6bbKm21dSy0Uutrqqunc/U4scMjVva3eAOvivnSK2kYvpe0d+tNV3X7bd6evgkt8T6cvqGu8BukHOT5l67ot/tNz7oVjuFBXwT0kAg5WZhy1mJSTn0DevmSnKWbL7FtptpY/d7s1d6OsiraSjbIJzB4RYHbs+kZz9ysr/AFGxFZtBSbU1W1LpRFyZZRQTagXNPg+DxaOkjcvhaJZsPr22e01kru6NsvcaS508tHSkcvMx2Wx+HnesW1O0llq+6tYLrTXKnkoKeNgmqGu8FhBfxP3jtXyfKZSzZdx3X7vb71tTFVWqriqoBSMYZIjkBwc7I/eFxChFGoiopKKERUoiICIiAiIgIihBKKEQEREBFCICIiAoREQREQFCKEBEUICIiqIREQFCKERYVfyVSen2olZ8lUnp9qIK5SoRB6RQpQSihSipRQpQFKhFBKlQiK9IvKkIJREQFKhEEoiIopUIglFCIJRRlSgIiICIiAijKIJRQiAiIgIihEEREBEUIJUKEQERQgIiKoKERAUIiIKEUILCr+SqT0+1Eq/kqk9PtREV6IiKlZGQyvGWRvcOsBYl0kADYYwNwDR+SJM0oubT+Rk9VTzafyMnqq/RC1BzafyMnqpzafyMnqq/UoWoObT+Rk9VObT+Rk9VX6IWoebT+Rk9VObT+Rk9VXylDaUHNp/Iyeqp5tP5GT1VfIhtKHm8/kZPVU83n8jJ6qvkRbUPNp/Iv9VObz+Rf6qvkSi1DzafyMnqpzefyMnqq+RC1DzefyMnqqebz+Rk9VXqJRtKLm8/kZPVTm8/kZPVV6iUu0oubzeSf6qc3n8jJ6qvkWdrHrb2NT2ZUPN5/IyeqnN5/JP9VXyJtY9aThnEXOKh5vP5GT1U5vP5GT1VeorTG0oubT+Rf6qc3n8jJ6qvUSjaUXN5/Iv9VObz+Rf6qvUVo2lDzefyL/VTm8/kZPVV8iUbSh5tP5GT1U5vP5F/qq+RC1DzafyL/VTm8/kZPVV8iUWoObz+Rk9VObT+Rk9VX6hC1BzafyMnqpzafyMnqq/RKNpQc2n8jJ6qjm0/kZPVV+iJag5tP5GT1VHNp/IyequgRC3P82n8jJ6qc2n8jJ6qv0Qtz/Np/IyeqvEkUkYy+N7R1kLo1iqgDTSg7xoKFudRERVhV/JVJ6faiVfyVSen2oiK5SoRBJ4LpIvg2fVH5LmzwXRxfBM+qPyVSWRFAV3abC24xwAXWghqqlxbT0sjnF7znAzgEMyeGripNwuMRM1M0pUV/TWy3VNsp2TVsFvrWTzNnfUNkIcPBDANII3HVnq6Vr0tl5aasZPcaKmZSOaHyyFxa8EnezSDn+eQsRqQ7zyfKN1T3KlFZ11qhpA/F0o53ahybYdZ1tIzqyQA0eY78rFSUME0DpJrjTU7skNjeHue77mtOB6VidfGJp1x5Bq5RfR7p8mii3RDGKCXU2MTCQeG5xDmjB8HHA548F7dDTVMztEkFHGyAOOouOtwAyAN5Lifu9CnpGLf8O1KtoIrJlspjb+cvu9EyctLhSkPLz5i4N0g+bK1XQxCBrxURl5bnkw12Qc4wTjHDf8Aek68R/uEx+z8sunwlros7aeR8UssbdTIgDIR80E4BP37l6ZSyyF7Ymukexhe9rG6tLQMkkjoCzPKI6IdI+zZ6cv33tdFuW9kc9THAYQ8POCS8tx5/NheKZsQqmsc0SgyBrTvwRnxdxPoyE9I7Go+zonhlfuayLbgDWVEsj44n8llwheDpcc4xgHP3Z6FjmIkzJpZG4u94xuB93UszyquhvH7Lv8AEwJhWL46BrIo4WzTz6cyue8MjB6m4BJ9Jx6F6q4rY63iSmM0FbG8Nkp5Hco17T85rgBjHAg/cVqNa44xDllyOMJrZmfhPkrEW4KSAxRuNdEJXHwo+TedA+tjB9AWHkW8k15eAXZw3SePpTbw6Z+S+j63DHGvhMeTCizOhZyIeyXU/wCezQRoHp6V6FOwwamTaphkui0HcOvVwWo1cOtieSa0Tvx8GuitYGUGZuXppG//AC8mPk3F2Zt2HHPAceC0aOn51UNiMsULT76WXOlg6zgE/uVjUw6Pm55cn1aqYnu8mBFYVtuhgqIY6a50VVHL/vmamiP6wcMj96iut0UADqSup62PIa98bXMDXHhucASPOFrnYYjk2c9E90tBF0jdkZHicMu9rdLSgPqmNlcRDH45djDgOkNyd4VZeLU62Op3NqYaqmqY+UgqIchrwDg7iAQQRggrpE3FvPlGzlSuRERBERAREQFCIiCIiAoVrs1bYbncyyrc9tJBDJU1BZ74sYMkDzncPvW2652OuingnskNvHJk01RSPe97XjgHhxw4HgTuwiOfRdhVbNQV0dlZSVdBSVVVbojHTvLg+ol8LJyBgZ3AE8Sqe2WNla1gmutDRzSymKGCZzi9zgcbw0HQM7slUtTqFeUuzkr6aqqa6tpaCGlqjSzGfUS1+M7g0HPDo9Ke5irbdKijlqKWOGmhFRLWOeeSERALXg4yc5GBjOULUaK+n2XqQyhkoKqlr2V9QaenMBI1OABOQ4DTx6erqWKvsIp6Karo7nRXBlM9rKkUxdmIuOAfCA1NJGMjpQtTLFUfAS/UP5LIVjqPgJPqH8kHOoiKNLCr+SqT0+1FFX8lUnp9qIK5SoRBPQuki+CZ9Ufkub6F0kXwTPqj8lSXsZ6l1to2pFrjtIpDNBHSYNVTxNa3nT9ROouwTjGBg9W5clqPWmVz+/PY6xOhj0TPh5rG4VkdUzDYi15nllc4uyCHnIGMdHXnsU1FcZDVhj5tFQ5hILg0O08NTWjB83Uq4HzouGWhM8cnuw5fhjUYabYY9rZGOD3jA3kDeD5k5V5YGF7tA+bncsHb9ykE9S4Zcm9mXu0vtK/Xx7t7IDuIycccIcdBOMLHlyZPWFn0bLrh1j7TwvfjPd+rIoPQvOSen9yb+srM6Fbpl0jl21FxjNfDzel6aQ0HD3NJBBAH9Vj+8pqTHQy6DPl2nEfe3PeG8CTj0JwduJ9K8akz6VqOS59Lll9qaMervZGvc12prnA9YO9S6R7z+ke49ZJysX3lPvWvRZ6/CWI+1cfZ8YZDpwd5zndu6FlmbTMhjMEz5JXDw2ui0hnoOTnsC1w4gEBxAPFM+dZ9HmP9S3/EMMuz4x9VzSQWGVsDqquroJHn9K1tK0sj3cQdWSPNjO9aBNKIKRzXSmYOdy7S3AaMjGk537s9S1tWcZJ3cFGQrOGUfh+Zjrac/wD0nvj6Q2HzRF1UWsOmQ/o9Wct8LPX1deVLebEkukIBacNLCcHG7getaydiRhc74M9ecY3ZV+/esSbZk/paj4kMfom/GOr6v0uKiF9ugLdbX1Qlpy2QObyZp5DwLCCdWPOMHKr0yu2xvqMXjnXqLy1PHyuVjylugdSGnNU92HCqe8NAwd2GNB6B0k7/ADKZJaOkhmp6V4rBM5hM0kJjcwNOcAZ4np4qs+5M+Za5rLq/fex6Xh0zfxn51a6dc6M1V7ljingirIXMp4mP96S5pAec724B/ctOtrecW23UpeXGlEoA0Y0hztWM9PSVo5RddPGY4vFr6mGUfd+v1ERQurzJRQiIIiICIoQEREF9saK8XZ0lBbpbhGInR1UEXF0TxpO/o83nCvTscykinlp7Re7hK+NzYIKilETYieDnuDvCI6hxK4RMnrPaqjv22q8tvOzlZ3juXJW2Cnjn/QjJLHEu0jO/irG2Ul0pKemMdvvVC+KpklqIqajY41gMmpuXk+Dhvg4P3L5fk9Z7VH3ntQp3t4tF6rbfc6eGx3IPqru6sj1QgDky1w379x3jcvc8dU6ukt9dabkynqrPBDKGRDlmGHH6Rjc+EA7o4kFfP/vPavcUskMrZYZHxyMOWvY4gtPmI4IU+h0kclrpdnm2ahr6qeK4T1IhqIhHLMzQ1rnhmfBbvwM9WVi2npL2LNVgPv08DiHyMqKOOGOOMHPhkElxG7hgbsrg6mqqKqUy1U8s0hGNcshc7tKw/ee1EpC8VHwEn1D+S9rxUfASfUP5IrnERFGlhV/JVJ6faiVfyVSen2ogrkUKUBdHTvEkDHNORpHBc4vQJHAkegoOmRc1rd4zu1NTvGd2qpTpd6kZXM6neM7tTU7xndqkrFxNw6ff51C5rW7xndqa3eM7tUiIhZmZ4y6XHmRc3rd4zu1NbvGd2qpTpVI+9c1qd4zu1NTvGd2qTES1jM4zcOlx6exMensXNaneM7tTW7xndqldrW1HVDpcensTtXN6neM7tTU7xndqV2m1HVDpO1PuK5vU7xndqa3eM7tSja7IdJ9yfcub1u8Z3ap1O8Z3amzBt5fuIdHvTeuc1O8Z3amt3jO7U2Y6knLOeMuj3qd65vW7xj2prd4zu1aZp0n3J9y5vW7xndqa3eM7tUKdJ9yb1zet3jO7U1u8Z3aqU6Pei5zW7xj2prd4zu1CnRouc1O8Z3amp3jO7UTZdGi5vW7xndqa3eM7tQp0ib+pc3qd4zu1NTvGd2oU6NFzmp3jO7U1u8Z3ahTo0XN6neM7tTU7xndqFOkULnNbvGd2qNbvGd2oU6RFzet3jO7VGt3jO7UKdLhCua1u8Z3ao1O8Z3ahTpd6LmtTvGd2pqd4zu1VKdKsNW8MppC448EhUGt3jO7V5JJ4kn0lChQiKKsaz5JpPT7UUVfyVSen2ogrlKhEEoiIJRQpQSihSgKVCIqVK8qUEooyOkjtTI6x2oPSLzqHWO1TkdY7UVKKMjrHamR1jtQekUA9SIJRQiCUUIglFCIJRQpQEUIglFCIJRQiCUUIglQihBKKEyglQmU3daIIoyiAihEBERAUIiIKERARFCCxq/kqk9PtRRV/JVJ6faiIr0UKUUUqEQSiIglSvKlBKIiArXZqmhqLk91VEJoaammqXQuJAk5NhcGnG/BOM+ZVSu9lPjVy/wAKq/8AplCeANqLi3dHFbWN6GttsGB2sU+6q6dVv/8ATaf/ALFSIqwvPdVdOq3/APptP/2J7qrp1W//ANNp/wDsVGiC891V06rf/wCm0/8A2J7qrp1W/wD9Np/+xUiIOjpKx1+p7jBXU1GZYaOSphnhpmQvY6PBx4AALSMggjqIVFSxiWpiiPB7wDjqVpsr8PdP8Jqv4FXW/wCP0/2gUax4INbICeTZCxvQ0RNOB6SMpz2f9l+Cz2LXRVlsc9n/AGX4LPYnPZ/2X4LPYtdEGxz2f9l+Cz2Jz2f9l+Cz2LXRBu00zqqdkEzIi2Q6ciMNLT0EEBag3486z234/T/XC128W/cpLWLbqJ3U9RJDCyJrY3Fu+NricdJJCx89n/Zfgs9ii4fH6n7V35rAqzbY57P+y/BZ7E57P+y/BZ7Frog2Oez/ALL8FnsTns/7L8FnsWuiDZZVvc9oljhewkAjkmjd6QMrFUR8lPLGDnQ8t7CvDffN9IWev+PVH2rvzKktYvcshpuTjiZHnk2uc5zA4kkZ6fSvHPZuqL8FnsSv+GZ9jH/CFrqsy2OezdUX4LPYnPZuqL8FnsWuoQbPPZuqL8FnsTns3VF+Cz2LWRBsGtl6WwuHUYWexeaxjY5yGDS0ta4DqyAcfvWFbFf8Yb9lH/AElceLWREUbFCIiChEQERQgIiILCr+SqT0+1Eq/kqk9PtREVyIiKlERAUqFKAiIglFClBKu9lPjVx/wqr/AOmVRq82U+NXH/Cqv/plUngpUREcxdTtnbKK32nZeajp2xSVlsE1Q5pP6R+eJXLLte6D8h7Gf4OP4kHFIiILvZX4e6f4TV/wKtt3yhT/AGgVlsr8PdP8Jq/4FW24/wDzCn+0CN48GuigKUYEREBERBs234/T/XC12cW/cti2/H6f64Wu3i37lJbxZrh8fqftXfmsCz3D4/U/au/NYFWBERAREQS337fSFmr/AI9Ufau/MrC337fSFlr/AI9U/au/MpLeL1XfDM+xj/hC1lsV/wAMz7GP+ELXRkRERBERAWxX/GG/ZR/wBa62Lh8Yb9lH/AEax4tZQiKNChEQERQgIiICIiCwq/kqk9PtRRV/JVJ6faiIrgVKhAUEqVCIqUREEooUoCIiCVd7J/Grl/hVX/0yqNXmyfxm5f4TV/8ATKpPBTIoUquYu17oPyHsZ/g4/iXFLte6D8h7Gf4OP4kHFIiKC72V+Hun+E1f8Crbd8oU/wBoFY7K/DXT/Cav+BVtu+UKf7QKS3jwa6IirAiIglFCINq2/KFP9cLWbxb9y2Lb8oU/1wtZnFvpCkt4ti4fH6n7V35rAs9w+P1P2rvzWuqwlQiIGUREEt9830hZq/49U/au/MrC33zfSFlr/j1T9q78ypLeL1X/AAzPsY/4QtdbFd8Mz7GP+ELXVZEREQREVBZ7h8Yb9lH/AABa5WxcPjDfso/4ApLWPFrKERRoRFCCVCIgIihAREJQWFZ8k0np9qJV/JNH6faiIrkREEgooUgoopUIglERAUqEQSrzZP4zcv8ACqv/AKZVGrzZP41cv8Kq/wDplCeClREVc0hdr3QfkPYz/Bx/EuJVjdLzWXWmt9PWOjMdvp+bwaWaSGZzv6z50FeiIqLrZX4a6f4TV/wKtt3yhT/aBWWyvw10/wAJq/4FW275Qp/tAo1jwa6IiMiIiAiIg2bb8oU/1wtZnFvpC2bb8oU/1wtZnFv3KS3i2Lh8fqftXfmtdbFw+P1P2rvzWuqwIiICIiCW++b6Qstf8eqftXfmVib75vpCy1/x6p+1f+ZRrF6rvhmfYx/wha62K74Vn2Mf8IWuqyIihAREUBZ7h8Yb9lH/AABYFnuHxhv2Uf8AAEax4tZEUKNCIiAiKEBEQlAJUIiIsav5Jo/T7UUVfyTR+n2ogr0UKUBERBIRQpQFKhEVKIiArzZM/wBruDel1rqwB1nkif5KjWehrKigq4qujlMU8TtTHjoPoO4joweKJLHhMHqVyNoWfPsFhe48XGjIz9wcB+5T7oYv7u2H/Kv/AO9VmpUuD1Jg9SuvdDF/d2w/5V//AHp7oYv7u2H/ACr/APvQqVLg9SnB6lc+6GL+7th/yr/+9PdDF/d2w/5V/wD3oVKdlzplurjuAtNVk+loH5kKstxxcKf7QLcq77PPSy0tPSUFDBNjlW0dPoMgByA5xJJGd+M4yFVgkEEHBG8EI1EJwizmsLiXSQU73Hi50e89hTnQ/VKX1D7UtnZlgRZ+dj9UpfUPtTnbf1Sl9Q+1DZlgRZ+dN/VKX1D7U5039UpfUPtQ2Zerbur4D1PWq3i0+hbBq3YIjihi1DBMbMHHpWujURTZuHx+p+1d+a11n524gcrFDKQMapGZPaOKc6b+qUvqH2ozsywIs/Om/qlL6h9qc7H6pS+ofahsywIs/Ox+qUvqH2pzsfqlL+GfalmzLEwHW36w/Ne685rqgjgZXfmV6FY5pDo4KeNw4ObHvHoyVrcUaiKbVccyx/Yx/wAIWsszKpzWNY+OKVrdzeUZkgdWVPOx+qUv4Z9qJsywIs/Ox+qUv4Z9qc7H6pS/hn2obMsCLPzsfqlL+GfanOx+qUv4Z9qWlSwHgs9wP9oA6oowfUCjnnS2mpQevk8/mVgke6R7nyOLnOOST0osRTyiIo0IihAREJQCoREQREQWFX8lUnp9qJV/JVJ6faiCuREQSihXVHYY6ujkqm3igY2GNskzXiTMQJAGcM6yBuygpkVlLZ5RSc5pZW1bOcOgHN2OOrS0OLhuzjf1LT5vmj5wJWZ5Xk+SwdXDOeGMdHHKFsQRepoZad+ieKSJ+M6ZGFpx6CvXIy8jy/JScjnTymg6c9WeGUGNSvfITcjy/JSciTjlNB056s8FtWu11FxqIomB0bJNQEzmHRlrS7Gevcg0kXtkM0kLpmQyOiZ754YS1vpPALyGuLS4NJDeJA3D0oIRexG/ONDgQMnwTuHX6FbwbPSTysZHVwOD69tEHhrsFxbnVvAOP3oKZFOh3KaGgudq0gAZJK9yQTRPeySGVjmDL2uYQWjz54ItsaL22GVxAbFIS4AjDCc5OBj71lipHOlmimcKd8UbnlsrXAkgZ04xkE+fcg10XvkZd36KTwiAPBO8ngAk0UkDzHNG+N44te0tI+4oPKLZmopGTNihPOC5jHZhY44LhnTwzno/Jaz2ujc5r2ua5pwWuGCD6EBFYVlompLbDXPnpnxyycnoil1uYdOrwsbhuPDKyz2ZlNTskqLpRRzPgbM2nPKa8OGQNzcZI86FqpF6jjkldpije927cxpJ/cvTqedrXvdBKGsdpe4sIDT1E9B8yDGi2JaR7DEInCcyRNkxE1x06vmndx9G5YnxSMc9r43tcz37XNILfT1IPCLcoLbVXB8jaeNxMcLpjlp3taM7t28ngOta7YJnRvkbDIY49z3hhIb6T0IMaL2IZnQumbFIYmnDpAw6QeongsaCUUIglQiICIiAiKEEqERAREQERQgIiEoBKhERBERAUIiCwq/kqk9PtRKv5KpPT7URFeiIgK3tE0UdnvkckjGvlp4hG0nBeRK0kDr3b1UIir+muk1FsvDFR1r4JzcnSObFJpdpEbcE434zlXdRcqaCulko6miyL86ZnKP/AEekxY1HTvAyffDgVwqlVKdFta6N0FFipeZ/0mqndWiqEQOMOEg69/gknhnpW1daieenfUUF3p4bYaBkLaUzDIIaAY+S46i7J1Y8+VyaIU7eWtY6Was75Qd5X28wsouXGQ7ktIj5LiHB+/Vjz5WxQ1v/AMypayO700NpFDyQpnVAGlwiILDH0HXk6sdOcrgEyhTu7VdIIrVa5KU0+ilpi2oimuBhaH5dq1RYOvUCN4znhuwue2Zkp31k9BWzNp6SvhML5HnwYyCHMcfQR+9UyItOxvF4o6u2z10MjG1dU4URiG5zIGPLg70FvJt/5St2W40Tr06TnkBZ7oWTauUGOT0Y1Z6vOuBREpf7KVdNS3mZ9Q5rDJBKyCR0nJhkh4HX83O8aujKuXXGOKspXVklM2CkpZRURtrecvqI3ndCXcCSeGCdI37sLiERadzFNJPPfJ6C5QxsnoIeaycpoELOUaBEfEI3t/fnfla81ZFGGw1ddDPWx2ephmmbKHgudnRHr+c4Dd09XQuUiqZoYZ4Ynlsc7Q2VuB4QBBA7QFhRKdvDe4u/lNHNWNNPHa2RU55bQyKcxAZ1D3ruLdXEKn2qquVZRU72w8pAx+XMrTUvAJyGufjG7eQMnGVQIotOyrLqyGjuTqOuDJpKGgjaYpcOOkDWARv3dPUqXaWpbV1dJOJWzSOoYOWeDkmQNwdR69wyqdShELZ00R2Tjg5RvK98XP5PPhaeSAzjqyr2krHywxy3OstMlp5pokiY1glJDNLWhpGvWCG7+H3LjERaXNgrXUVvvLo6nkJ5KRjIy1+lzjyjcgefGeCuZL06oqWR1Fw1wSWMsla6XLXTcmffDpfqA8+cLjUSynXi5sp7fM6mrWxz946aFpZJh2sSDU0ecDKkVcVwh5F9bCaursrIjJNKBqlbLnS9x4O0tHHzLj0RKdpT1baOsoaSG6QscbM+mMsVRiNsxLy0Fw3DBPHz5We3XOKK3258L6dwpYXtqmTXExNMmp2rVGAeUDgRvGc8OhcIiFOxttVHNYYo56qOmhhppWCSCu0ubnUQx8BHhkkgZHEEb9y5SppzTOja6WGTXG2TMT9QbkZweojpCwoi0IiZQEUIglQiICIiAiKEEqERARFBKCSVCIiCIiAoREBEREWFX8lUnp9qJV/JVJ6faiCuUqEQSrOm2fvFXSsqaa3VEsMgJY5jQdQBxuHE8CqwLpa+3XGstuzrrdSVMrhRuDXwxuOHcs/5w4Kig5rUc3lqORfyUUgjkeRjS45wD59x7EipppoJ542F0UAaZXZHg6jgfvXa1tNb7hXzurHRPzcKGCqqWEb3GNwlw7qLhvPmytesFYbFfxV2iGhbFJDHGY6fktwl959LG46t58+9C3HNaXODWjJJAAWepoaqlM3LwPYIZjBIeIbIPm569xXV3gU7qvaOhjt9JBHb4xNTuihDXseHsBJdxIOo7ju4YWka6qrNjq5z4Ypnm4B08vIAvGphOskDcc7s/chbmUXR2mGVtgFRbbZDX1UlU6Ko5SDljGzSCwAfNDsu8LzcQruW3UNPcb8+GmjZPTywMjiZRipELHMy4iPODvwNW/j50LcLHDK+KWVkbnRxY5R4G5uTgZ9JXhdtLIyGk2jp7dbmtxHTyOhlpAHtJIDyGnJDR74D5uVU7L0x5pV1vJRyNZJHEP7FzqQEgncwkAA43uPoChbn0XS1ttoY9vjbpGCGiNWxrmZ0gAgHT5hk482VtUtNLXXKlju9jp6WIVL42FsXIa3Bji2E8NQJA8Ljv471VtyCzR000lNNUMYTDCWiR2R4JcSB24K6uno4rgy3yX2ghoJH3JkADIeb8rGWkuaW7uB0jV9Lis0cc9Raq9l3tkVuhNdSxOfHByOGcoct8+kfO47+JQtxQBcQACSTgAdK3q+y3O3wtmraKaGMnTqcBgHqOOB8xXSbRR09JTVZipJaealqmCklit/NxDhx3GTUdeQMg7zkZVLWVHM7NHSxRTcrcWtqaqecEcphztIZniM7y7fk+hC2O1bOXm8U7qi2W6epha/k3SMxgOxnG88cELRraOpt9VJS11PLT1EZw+KVpa5vpBXXWllpf3PIhfJa2KA3twa+kjY8g8i3JIcRux1b10s9HSyXS7OmpjJJarfSQ2x76YVxlpsn+0aMgPyCN/BueG5Et8lRfTo6a2R3O4vgs1TBMaalLp5LKJmU8jtWs82LjobJhpB343gYyvdPZaW2NvMjqWlfcYrm2B7aa1mtjhiMYc0Nic7LA4kgk5II07kNp8uQnAyV9CuslvsdsuVdarLTBwvfIRsuNIHuhZyAc6PS4nA1ZGCSQPOti7WqO0i+S7P2SCtqWXUU7oZKbnPNoHRB7Q1hzgOcXN1cfBAyELfPa+iqbfUchWRGKXQyTSSD4L2hzTu6wQVrrsdvoIzt4ynrGCjhMdEyZrTkQt5KMOAJ6hnsVpcaB0t8ktty2cpaCx09zhgbWxw8i6KEyaR+k/3utu8k5xx3Itvnaz09FUVNPVVEEZfFSMa+d2R4DS4NB7SAvoD7cyvZWx7S2Wms1PS3Kngp5oabm50ul0vj1f7wcnl2o5IxnO9e6+OubY9sYqywU9sp6ZsUMMkNLyWG84bhuf8AebgHajk+felJb5qoX1Day3WmjoLvSQ2+Q0lNTtdRTw2nSGO8HTI6p1fpGvyc5453AYXzaspKmhqX01bTy087MaopWFrm5GRkHzEFRYm2BERFEREBERAREQEUIgIiICJlQiCIiAiIgKERARERBEUILGr+SqT0+1Eq/kqk9PtRBXIiICztq6lsPItqZxFjHJiRwb2ZwsCIPQc4MLA46CcludxPoWSWqqZmhstRNI0NDQHyEgAcBvPBYkQezLIXPcZHkvGHkuOXenrRkj2Nc1j3NDxhwa4gOHUeteERVla7lDRRyxz0LKhr/nCZ8T8dLSWne09RWKrudXU3Ka4cq6GeV2cwuLNIxgAY34AAH3LSUoPbZpWyOkbLI17s6nB5BOeOT05UwzzU+rkJpItTdLuTeW6h1HHELGiCXuc9xc9xc48S45JWSapnnLOXnll0DDeUeXaR1DPBYkQZZ6iapcHVE0szgMAyPLiB1b16lqqiYYmqJpBgNw+Qu3DgN5WBMoM0tRPMxkcs8sjIxhjXvJDfQDwXhz3vDQ97nBo0tBOdI6h1BecogvrbfqCkt0dJVbOUFcWOLjLNPO0uJ6S1rw3ON24cAt6La+ghlilh2Vt8ckQ0xvZW1QLB1AiTcN/ALk0VKh10O2VHBVOqodl6GOpdnVMytqg92eOXCTJXmn2woaWZ01LstQQyuyHSR1tU1zs8ckSZK5NEKh1B2ntRYWHY+1lhdqLTVVOC7rxr4+dZodsaKCV80Gy9BHLI3S97K2qa5w6iRJkrkUQqHTv2ltMjtUmx1qe7AGXVNSTgbgPfrLNtdQTwxQT7KW+WGEYjjkrKpzWegGTA+5cmiFQ6yo2uoKpkTKnZW3zMiGmNstZVODB1AGTcpm2xop42xz7L0EkbWaGsfW1TgG5zgAycNw3eZcmiFQ6t+11BJSspZNlbe6mYcthdWVRY09YbymAqG8VzLlcJKuOlZSteGjko5HvAwMcXkno61pIhQihFFSihEEqERAREQERRlETlQiICIiAiIgKERARERBEUICIiCxq/kqk9PtRKv5KpPT7UQVoUryvSoIiKApUIglERARERUooRBKIiAiIgJlEQTlFCIJRRlTlARMoiiIiAiIgIiICIiAiZTKAijKIicqMoiAiIgIiICIoQSoREBEREERQgIiICIiCwrPkmk9PtRRWfJNH6faiqK5ERB6ReV6RRERQFKhEEooUoCIiApUIipRQpQEREBERAREQEREDKZREDKZREDKZREDKIiAiIgIiICIiAiIgIoRAREQEREQUIiAiIgIiIC8oiqLGs+SaP0+1Eq/kmj9PtRFVyKFKAiK7s2y1zu9I6thFNT0TX8nzqtqWQRuf4oLjvPoRFMi3r1ZrhY6sU1zg5J7mCSNwcHMkYeDmuG5w84WpTRPqp4oIBrlleGMaCN7icAdpRXhFmrqWagrKikqm6J6eR0Urcg6XNOCMjzhZrxa6uy18lDcIxHURta5zWuDgA5ocN48xCg00W5eLXV2avfQ3BjY6hjWuc0PDgA5ocN48xC9WW1VN6rhRURj5UxySeG7Awxpcd/oBQaSLyCMA5G/zqUEovUUckzxHEx8jzwaxpJP3BeUBERFFKhEEooRBKIiAiIgIiICIiAiIgIiICIiAiKEEooRAREQEREQRFCCVCIgIiICIoKCV5RFUEREVY1fyTR+n2olZ8k0fp9qIitREQSF220UTaiwbHVnIzz2SGjME7aY4LJxI4yjOCGucC0gkb1xCsrPfrtZHPdaLlVUfKe/EMhaHekcCg+i23Z6xuu2zYdHcW8tR1dTHbbm8TloYMxYjaG7nEOdp+dp86xG7UTjaK2ORtZcYrtHE2sNkbTRiJ258bvmuI3EbsjevnE1xrp6/vhPWVElbqD+cOlJk1DgdXFZ7tfrvenRm7XKqq+S+D5aUuDesgdB86JSz7otVUVO2d550xjHRVUsTQyER5aHuwTgDJx847yun7olx2dg2qqo7js9UVdS2GDXMy5OiDv0LMeDpON27ivn1wuNbc5mzXGrmqpWsEYkmeXODRwGT0b15rKypr6h1RWzyVEzgA6SV2pxAGBv8AMAAivrtypqB+2G1dylLI6iioKN9MX0vOuRDmMDpOT+cWjAydwzladslt9VtRZ6qkD31clsrhU1Pe/mkdTiJ+l7W8CcZBI6l83jvd1iuYucdxqm14AAqRKdeAMAZ6sADC9T3671Nw74T3OrkrNBj5d0p1BhBBaD0DBIwOtEp2s9bW2ix7H96bNRS8+o8TPfQMlNU7lXDkySD0Howd/HcFym21DSWza27UVuAFLBUubG0HOkdLc+Y5H3Lcm2zuUNutVJZq2toOaUPNp+Sm0iU63O1DHmdjrXMuJcS5xJJOSSckosQ6+K9UuyVBFHs3UsnvVQxr6m5sbkQNODyMWR6zseZae0c9ovNE280Ziobk6QMrbe0EMe47+Vi6mnpb0HhxXNohSUUKVFEREBERARERRMoiAiIgKVCIJUIiAiIgIiICIiAiIiCIiAihEBERAREQERQSgEqERVBERFEUIgsav5Jo/T7USr+SaP0+1ERXIoUoCIiCUUKUUREREgqV5RFekUZUqAiIgIiIClQiCUUIglERAREQEREBERAREQEREBERARFCCUUIgIiICIiAiIgIoyoVE5UIiIIiIooREQREQWNZ8k0fp9qKKz5Jo/T7UQVyIiCQry9WenoNn9nrhC+QzXKCaSYOI0gslLRp+5US6u/yCr2W2WpaZksk9HTztqGNhfmMulLm53dI37kJadp2Qvd3omVdFTR8lK4sg5WoZE6ocOIja4gvI83TuUWnZG9XaJ0tNTxxtEpgbzmdkBklHFjQ8gucOoLoH0NLtBbNn3y3Vtqfa6UU1TFPBLrAa9zhJEGtOskO4ZByFuWBlqp7bTTsNBzplZK+ulvFFLLO6PUDGYmgEZIznp1dOES3KW/ZG93COolipWRRU1QaeokqZ2QthkA964uIx1enctiPZ5lLDerdd2tpr7A+nZRwyzhgcXv8I596RpIOc4xvV5tnXQXC032GjMkslTtG+riY2F/hwmNwD944ZOFTbbuNyuVJNRRzTMZbKWF7hC/c9sQDgcjoKFse3ey52WvApWSCSB8bHRuMzHvzoaXZDTu3k4zxHWsVJsdfKy3NroKWMskiM0UJnYJpYxnL2Rk6nDcd4HQt/b9jbneI7rbnOnjqqaEOibDIJIHMjawteC3rBwQSuv2VnslpqrNWQm2QUsdM0VLp6OWSu5wWEO36SGtydxG7CD59Ztk7xeqQVVDBEIHSclG+eoZDyz/FZqI1HzBTbNkr3cecGKlZA2nm5CR1ZMyBol8nl5GXeYK+FHT7QbPWKlkuLLXNahLFOyqhlGpjpNYkj0tOp2/BbuOQF7mpaW/bP01rbczSS2+uqJBLc4ZWc6ikLSJMtDvDGne09B3FC3O0Wyt5q6usphSCB9E7TVPqpWwshJOAHOcQMnoHSvUeyV7fdai2mkbFUU0fKzOlmYyKNhxh5kJ06TkYOd+V1tmq6VtrutkZJT1DjXsqaarvtFIY6loZoOcZLHDiM9BxuKltzqpr5UQ8/tXIC3x0jWy2qUUNQ1jtXJnI1N0k+C/G/HQlFuTZsfe3XGWhNNEx8UInfM+ojbCIjua/lc6dJO4HO8qvulprbVX8yr4RHMQ1zcPa5r2u965rgcFp6wV34fRU92nhtEtrp21FBGysp56OaS3VEweSWtLhqYAMEHhnK5nbWkonXSHvJS+DzZnOhSRSmnE+/VyWsZ08PvzhFiV3HsBFR7TbM0Ve8S0lzjjNQI6qNzhIWuLg3Qc6dww7getc5cNk7ra2wVNdTNNLJUiB3IVEb3MeT7x2CdDsdBXWW6qo2bQ7F3l9TycdFTRUtXC6CQSQOjDwXHwcFpyMEFUlgnbTbP3umqGzMlqK6jliYYX5e1kjy9w3dAIRLas+yFfU3i6wW6l5tS0VQYXGvq4mCN3QwvJDXO3HgqGvoaq3Vs1FWwPhqYX6JIncQfu4/cvpD67nt62jEFTa5KOquRqI6a80UpglG8CRkgGWuAOMbsgrlrw2jo9szWWOhqJbZBUxSxs5KTDtOkuDdQzpyDjO/GEWJa1x2PvltoJayrpY2sha108TZ2PlgB4GSMHU0bxxHStn3AbSmPUy3te8sbK2FlRG6VzHYw8M1ZLd4yejf1Lq9orkNF8r7ZLZAy5RSsYyC2Tc9kbIcubJkYaR0uyRkbuK1XXOn93M9wa+XmjrIaZsohkwZOahmnhn3+70oly5G47LXi31FFBLStldXO00rqWZkzZXA4LQ5pIyCd4WxU7JXO2zUT7hTsmpZqplO91HVRy4eSMxlzSQ1+M4yrjZ99tdY9nrffGVHIwXeaWqjbDJlkTo2AE4GdJcN+N+Mq6nq6Sls4pHvtAn77UlRotFDKxgiY52XOcW+EQDw4jz5Qtyl1sVHSWG8VbIKiGopL2KJjJpQ4sj0PJa7TuLstG8Kttezd2utBNX0NKH0kDyyWV0rWNYQ3VvyRjd2ndxXS7SVkNXaNooKblZJKraPncDRC/w4dMg1jdw8Idqq2SPb3PprYGTiqfd2TmDkX5dGISNXDGNSKxTbM1NZX0FJaKCobJNbYquU1M8ekNIy6TVuDGcNzt4W3a9i66K/wBkgvdOBb7hXNpxLDUNe2UbiSxzScjB4jpyOhXklyoKuB9qmqH00dVs7SUz6x0EhbTyxODi1+BkNJ3EjIGQs9tFDZrbsa5tyZWU9PfppZZ4o38m0BsZdoyMuaN2TjjlEtyF02NvNAOVkp4RC6p5vkVUbjC9xOlsuHfoyfpY869bc7MO2XuzKZsjZIZImOY7lmPdksaXZDTuGXHGeI371noZCywbW08rZhNXGA07DC/MpbMXE8OgHO9Tt3Gy43WC6W9zp2VNNC18LYJBJA6ONjC14LccQcEEottah2I2grqWnqaekiMdVFytMH1MbXTjfuY0nLju4Dzda1rPsvdrzBJPSQRMgZJyRlqZ2QNdJ4gLyMu8wXQtrIxe9hZ8yiK209M2qdyL8QubO5zs7ugEHcstygpdprZFRNr4rdLQ19W8c8ilbHPFLJqD2kNPhDGMEZIwhbkKqx3Ojp6ueqpHxMo6htNUBxAdHI4EgFvHeAd/BZp9mbxT3CpoJ6Mx1NNSmrma57QGRBodqznHAjdxzu4ruqe922s2tuUVwZVd5Kmlp4ucSUzw6WSm0FjyMZ8LQ4ehy07ztB3z2SqaiSKp7/1pNFOzkX5FMJnTB2cedrPQ1C5fOkRFFEREBERARFGUEqMqEVBEREEREUUIiIIiIChEQWNX8k0fp9qJWfJNH6faiCtUqxtFtZWCaoqpuQo6cAyyYyd/ADzlbZvFvozptlqiJHCaq8Nx8+OhcstTfs4xcvRhyeNmM9TKMYnh1z7o/wBKRrXO960u9Ayukp9pNtNDY6e73zQ0BrWsmkwAOAC0ztRdfmTRxjqjiaMLDJf7tJ76vnH1SB+SXqz0R3/o1s8lj8WU/CPNdtve37jgXS//AH1EntWyyv7oLhk3q6sHW+vI/muUddLg4YdXVJH2pWs+WR58OR7vrOJStaemO6fMvksfhyn4xH0l2/fLbFnxrbKeD61yeT+4qO/16Z8N3Qaz/kqJHfzXD7upE2NSeOXhH6nO6EcNLvmfpTufdNXDcdvb0T5nye1T7p63+/l79eT2rhUU5rL258PI9I0/ysf8vN3Xunrf7+Xv15Pao91FYOO3d8PofJ7Vw6JzeXtz4eS+kaf5WP8Al5u491tT/fTaI/8A7X+1PdbU/wB89o/xX+1cOic1PtT4eSekY/l4+Pm7j3W1P989o/xX+1PdbU/3z2i/Ff7Vw6K81PtT4eR6Rj+Xj4+bufdbU/3z2i/Ff7U91tV/fPaL8V/tXDKcqc1PtT4eR6Tj+Xj4+buPdbVf3z2i/Ff7U91tT/fPaL8V/tXD5UpzU+1Ph5HpGP5ePj5u391tV/fPaL8V/tT3U1jve7cX5n1pH+1cQic1PtT4eS+kY/l4+Pm7f3R3J3vNv7qPrySj+aC8bRyfF9vKh/mdWyMP7yuIRObz6M58PI57RnjpR8Jnzl2r6/b0DVFfrlO3rhuDnfzWhU7Tba0p/tN6vkXndUyY7crm2PfGcxvcw/RJCsKa/XOmGGVcjm+LJ4Y/en82OmJ8PM/pcuice6fL5s7drdoRXRVzr1Wy1MTHMZJLKZMNPFpDsgtOBkHduSp2rv1TXw1zrpUR1EDDHC+AiLkmniGhgAGenHFSLzR1RxdLXA/PGWn8B48/nWC52yOCnZW0E/L0UjtIcRhzHeK4Kxq76yiky5NGzOenlGURx6Jj4eVtv3a7Vf3ku3+bf7U92u1X95Lt/m3+1UKLq8y+92u1X95Lt/m3+1PdrtV/eS7f5t/tVCiC+92m1X95Lt/m3+1QdtNqiMe6O7f5t/tVEiASSSSckoiKAijKZVEqMqEQEREQRERREUIJUIiIIihBKhEQEREFjWfJNH6faiVnyTR+n2oiNml/2Rrv/Nx/kqRXliArrZX2ppAnkxNAD85zeI7FSOBY4tcCHA4IPEFcdPdllHb9Hr5RF6enlHCq+MTKFKBdVtY3GzGxzg3GbfLvxxPLvXZ5HKovpUVjpb5R7HUdXK+Md56iURROa2Soc2VxEbS7cHO6z1LRj2Hhrdp6e2w0t4t7DSyVNTT1kTXTNazoidubJq3AHAwTvQtwaldltfsjDarJDdqaluFC01PN5KW4SMe/e0ua9rmgZG4gjG4rXt1osEGylLfL0+4yyT1stM2lpHMZqDWtOrU4HGNXUc5HDei25VF3Eex9EL+YImXW5UM1DHXUbKSNrZXsfwEjz4MeN4JwckbuK3n9z+ij2iZSPdXCGW18/hoDJEKmR+rSYQ/3pOQTkDh0ZRLfOUXdUux9vqNqH258V2pAyidU976oMjqZZAcclG8+C4HiHY4AjGVin2UoX3art0cF2oavvbJVQUtcxodyrPCLNQGHtLQ4ggDfuRbcWi7yLYKnMmzxlrJRFVRufdCMZpdMQnIG7yTgd+d602WXZy3UtrF9lufOLrEJ4zTFgbSwucWsc4EeGd2SBjclFuPXpjHSPDGNc5zjgNaMkn0LtJ9krZZrZeKm/wBVVma33I0LI6QNxMSwuBy73vDPo3cVbbNWaw2PbawWyqmuDr02anmkmZo5uyRwDxFpxqIwQNWeJ4YQt80wc4wc5xjChdJsxHJN3QrfFDPJTyPuYa2aMAuYS87xkEZ9IVk+z7P0lqhu9+luk0lXcKmnLKV0bdzHDLySOPhcMb/MhbiUyvoNJsHSsu9/opTWXOW2TMjho6J7IppmPBPKHVncBjIAO89Sz2mgsNvs22lPU093Igig1CaOOKaNpkbhuCDhwdxPAjgAiW+cZTK+i2XufQT220yV1Ldp5LnG2XnFGYxDRscSGlwdvefnEbsArR2f2Pp6iSthraG8V0tNWOpXvoDHHDGGnGrW/c9x46RjdxO9FtxGV6cxzA0va5uoam5GMjrHmXZ1Wylr2fbdKm/zVlTBTXJ1vpoqMtjfM5rdTnuc4ENAaW7sHJKw90ZtOwbNNopJJKYWWLknSN0uLdcmMjr6PuQtyKLyiK9K5pf9lK7P6zHjsVJlXdcOY7N0dK/dLVSGocDxDQMNXHV37MdseG96uS7tvLojGfHd9VMi8584RdnlekXlEE5TKhEE5UIiIIiICIiKIiIChERBERARFCAiIgIihAUqERFjWfJNH6faiVnyTR+n2og0IZZIJWSxPLJGHLXDiCr24iO82x11ijaysgIbVsZwcOh+FQKy2frhRXKMyb4Jv0UzTwLTuXLVxmtvHjH7p6uTakXzWfq5eE9E/D5K1fSbR3lFjpbbfbxs7cqanLpKZsk1VDLTl+9zdTGb2k9HWuBu1GbfcqilPCN/gnrbxH7lqZPWumOUTETDz54ThlOOXGH0urNrrrvFV1192UmooabmkNuLakRxRDgGO0ag4HJ1cckrbdX0MVRbhb9o9nIKChimhbRyvqphMyX4Rr3GMEg+bGOhfKsnrTJ61pinfXi07N1kEUFsvGzVtYx5e54lqppHkjGC50e5o6gFtW6axQbNUVjuNVaK6AXOpe6aSeWINAjj0uaWDWAfCbvbg482V83yUUWn1Y19vqJrgy43/Zqot1bBDBzKN9VEIWQ/BhjxGTu35znOViq5rJW1VI6rueyb6OmouZMpQ6qAawPLg5r9GprxnjvzvzxXy/J60yetUp9Qq5bLV1VIJ7vsvLbaSldSxUcslU9zWl2ouEujUH54EbgN2MJPVUIulkqqHabZ6mp7NkU1O6Sql1AuLnh73R5OrJHUBwC+X5PWmShT6lJcWSQ7Qxe63ZwC9PDnECo/sw4EM/R8CzwPQFjoJLJHR0EN1u+zFzmtw00c8slWwsbq1Bjw1mHtBOQDjq4L5lk9aZPWoU+hXFlPcrXWUVZtjs/I+suPfCWfFQDr0lukDk8Y3q3ornaIK6gulTddlqq8UbY2NrXy1bdbWDALmBmNendq+/G5fJsnrTJ60Kdzardb7btBTXmPa7Z98kFUKgRHnABIdnGeT4LLc6WguNpprc/azZ9jIKqepD284JJlIyMcnwGlcDlMnrQp9PqpLFcbvca+7XXZiqFa9j9LZaqOSBzWhvgSCPOCBvBBWSS4UNRcLnPWbQbMz0lwpY6WSjL6oBrI8cmQ/RqLhpG88V8symfOhT6ZTd4nUNFT3i7bMXSagj5Klmllq48R5JDHtazD2gk44dSUhsjLTT0FwvGzFaKSokqKQukqo2xOeQSHMazD25A3burOF8zyetMpZT6pPXWqunuYu982araOvq+ec25WqjME2MamPEed43EHiua7oFTTVxt09PcbPMKanbSMp7byuGMaXEE8o0deOJ61yGUS1oUta57g1jS5xOAAMkq1orHLJCKmvlbRUnlJffO+q3pWZ14pbeDHZKUMdjBqphqkPoHQuM6tzWEXPh3vVjybZja1Z2Y8Z90edQ90tpp7c1lTfCc++ZSM3vcOt3UFluO0sL6l0tFQRF+NImqG6jgcABwAVRRXSqpK41bX8pI7Ik5TwuUB4grer7fT11K642hpDG756bi6I9Y62rjlhG3E6u/5e568NaeanHk26t8x+Ke2/pFV3oG0cz91TRUM7ep0OP3hTzmwVW+eiqKR/XTv1N7CqRF25jCPV3e55fTNWfXrL3xE/quu99kk3xXl0fmmgP8AJO9Vq/49D+C5UqJzeXtz4eRz+n06Uf5ea5da7WGki+wkgbhyLt6pkRbxxnHjNuWrnjnWzjGPuv6zIiItuQiZUIJRQiIIiICIiAoREBERARFCAiIiCIiCxrPkmj9PtRKz5Jo/T7UQVyKFKC9uZZdrVDcWyMFVTMEVSwnBcODXDrVEi3660VVDbbdXz8nyFxY98Gl2ThjtJyOjesYYbEV0O2tq87ltTG/p7e1pRM5SRjNTW6nAanHAHnKuTYYG/CXu3D0PJVIoTLHKeE0aWenje3jfxmPkvO8dJ/x2g7Sp9zpk+K3O3znqEuk/vVHlNx6lnY1Pa8Idee0OnT8Z/VcSbM3dm8UvKDrje1381gdZLqzjb6j7mZWlHPLF8FLIz6ryFnZdK9g8CuqAPtSla3XHdPmbXJZ6Mo+MT9IZO89z/UKn8Mp3nuf6hU/hlO/Fy/X6n8Qp34uX6/U/iFP53Z4n9L/y8DvPc/1Cp/DKkWe5n/8AH1P4ZUd+Ll/xCo/FKd97lw5/U/iFP53Z4n9L/wAvBk7w3bHyfP6qd4bt/wAPn9Va3fCt3nnlR5/0rvarGSnucdgp7ya+QwT1T6ZrBK7UHMa1xPVjwgla3XHiXyXqy748mv3hu3/D5/VTvDdv+Hz+qtfvhWfrk/4rvanfCs/XKj8V3tStbrjx8y+S9WXfHk2O8N2/4fP6qd4bt/w+f1Vrm4Vg/wDvKj8V3tW7eYrtZrjJQV1VK2ojaxzgycuADmhw356iErW648fMvkvVl3x5MfeG7f8AD5/VXuPZ67yHAoZB53YA/NaffCs/XKj8V3tWxdGVVKKYS3KOpFRA2bENSZOT1Z8F/U4Y3hK1uuO6fM2uS9WXfHk2+8cFJ4V2uUEH7KI8o8qe+1voN1pt7TIOFRVeE70gcAqLcinNbXrzfhC+lRh/axjHt4z3z9IhsVlbUV0xlq5nSv63HcPQOhYFC27rQm218lI6ppakx4/S0sokjdkA7ndPHB866xERFQ82WU5TeU3LxQCndWwNrNXNy8CTScHC3J+c2C8SNp5C10bvBPQ9h3jPWMKrV3eHc5slqrJPhsPhcfGDeBXLP1oieE7np0d+nlOO7LGpifCfoyy0dLfGOqLW1sNaBmWjJwHdZZ7FQva5j3Me0tc04IIwQUjkfFI2SNzmPactc04IKvBc6G6NEd6hMc+MCshG/wD5h0qVlp9seMefzavT5Rvmsc/CfKfD3KJFZ3CyVNLHy8JbVUh3tnh3jHnHQqtdccsc4vGXm1NLPSnZzikooRacxERAREQEREBFCICIiAiIgIoRARERBERAREQWNZ8k0fp9qKKz5Jo/T7UQVyIiCV3N+tdxuGxGxrqCgq6lrKapDjBA54B5c8cBcKu1oNuaWhpIqansT42RtxiK8VbGk9J0teAMnJ3daErvZCHvPsdUVMZulFdRceRq30VvbNURR6AY2ua8gsaSScjiRhbLI9F/v15oI6+1Cngpm1LI7Wx1Zysg8JzI84iDsZJz046VzkG3NDT1klbT7OmKrlGJJ2XirD3jzu15P3rzSbaW2iqn1dHs02Cpkzrmiu1W17s8cuD8lVHaXIMoLzcblzMPqX7JtqpBW0rA503KgB8kY8EO3NJHWN/SuaG012tuw1FdKOeOO4VV3qjNVcgwvOGRnAONwJO8DqVa/a+0v1a9lo3ao+SdqutUcsznSfD3jO/HDKxO2msToGwO2PpjC1xc2M3Kp0hx4kDVjJwEHjuk08NLtxcY6aFkMbjFJybG4aHPjY52B0b3Er6DX3usG1m11sMdK6ht9ukq6WnfSsLYp42RubJjHvsknJ4rgZ9p7FUSmWo2QppZTjL5LlUuccDA3l3UAsh2ttDppZnbKxGWZpZK83Sq1SNPEOOveNw3FB1drc2/nZO63aKGruk0NwZG6aNoFTNFvga8bg4gn79wVeZrpdtmn1e10L+eU91pY6CaopxFI7U48rGNwy0AA46CqI7UWQxxRnZGn5OEl0Te+dVhhO8lo1bju6FmrttLdcJI5a/ZptVJEMRunu1W8s9BL9yDro6uO4d0raCnqY2N71RVZtcFNRxvc2UOGXNYcCSTGp2HHjw4Lmtv6uOustsmqIrtNXCeRouFwoWU5miwPA8Fx1aXdJ4ZwtH3VWXnXO/cnBznXr5bvnVa9XXq1Zz517r9sLVcphPcdl46uUDSJKi61T3AdWS9B1OwMNXQ27Z9nL1hhuk7nc3oLbHIyRok0uFRI479wO75rV5qH3azbI1Z2Yp3sdT7R1cXKQQCR8MeGgBuQSAcAE+YDpXN0+2tupaR1JTbNiGme7U6GO71bWE9ZAfjK9U229DSy8rS7O8jJqc/XHd6tp1O98ch/E4GT0oOnqaZ9PcLpX0NHC3atlkpql1NHCC6GdzsTPbHjAeGaXYxu1FTZ+VrbnsbX7QwsZeqqoqYnGWIMfUQ6CI3PbgZOoloJG9chHtZZ4qwVkeykLKoO1idt0qhJq69WrOVNVtbaayqNVWbKxT1JIPLS3Sqc/dw3l2UKbNFRXGydz66Vs1JNSVMd3peQkmhwQ5jX5xqHQceZT3X6u4VW1Gax0jqXm8TqRxjAa5romFxaQPCGrPWsVbtrb6/UK7ZsVIdpyJrvVvzpzji/oycekrBNtVZp4oYp9k4JY4QWxMfc6pwjB6Ggu3D0IrsJRU3OwOt1M2rtjYrOJHW+rtzH0bw2PUZGTDeHO98HHfk4ysdNC6MU1Ra6Zkl6h2Sppbezkg5xfrIe9rfnPDMkbiVzPu1t/e/vf7mxzH9W77VfJ+rrwtX3TWt1ypak7P8lFBEYtMNxn5Ro3aXRvcToLd+Bw3nIRKdvQm51dNsZUbRUuitm2iw58tOI5Jo8MALxgZPEbxvACoq261d92e2up7iIpIra+KWhY2FrBTHl9BDMAYBacEKtrdsqWSWgip7bUy0VJNJUuFZXvdPPM5obrdKzSRpDW4A6liG09ka2Vo2Rpw2b4UC5VOJN+fC8Lfv370KVtw9zXew97xeO+Glvw5i5LPzve+F14X0O8VMlpuW3tZRRwxz08FvMLjC13JE6BqAIwDvO/rXFd/9nf7l0X/qFT/3LPJtZaJeW5TZWJ/Lhol1XSqPKaeGrwt+OjPBFRtxO+42zZq71Qa6uraGTnMrWBplLJnMa444nAG9Vlx/2YtH2kv5pfLzQXKlp4KKyx2/kCdLmVc0vgnJLQHkgDJzu6UuP+zFo+0l/NcdX1sPf9Jevk39vV/6/wDqFKiIurytqguNXb5NdJO6PPFvFrvSFZ98LVct1zo+bTH/AO4peGfO1USLnlpY5TfCet6NPlOphGzxx6p3x+nwXNRs9UGMz26WOug8aE+EPS1U7mlri1wLXDcQRghe4KiamkElPK+N44OY7BVwy909cBHfKRk27HOYhpkb5/Os3qYcd8eLdcn1eH3J7d8d/GPH3qNFb1tje2E1dtlFbSeNH75n1mqnXTDPHOLhx1dHPSms4/fYlFCLTkIiICIiAiKEEqEREEREBERAREQFCIgsaz5Jo/T7USs+SaP0+1EFciIgIiIJRQiCUREBERAREQEREEooRFSihSgIiICIiAiIgIiICu7j/sxaPtJfzVIruv8AC2WtZHBssrT6crlq+th7/pL18n9TV/6/+oUiIi6vIIiICIiDYoq2poZhNSTOjf5uB9I6Vbiutl38C5wNo6k8KqAeCT9JqoEXPPSxym+E9bvpcoz042eOPVPD9PgsblZqugaJXBstOfezxHUw+xVy3bbdau2uPN5Mxu99E8ZY70hWXNbdfN9AW0Vcf/tnn9HIfono9Czt5Yevw6/N15nT1v7M1Psz9J6fdx96gRZKmnmpZnQ1Ebo5G8WuCxLtExO+HkmJialKhERkREQEREBERARFCAiIgIiINiaq5Skhp9GOT+dnii10QQpUIqJREUBERAUqEQSihSgIiICIiAiIgIiZQEREEooRFTlFCIJRQiCVtc+l728wIaYeV5UEjeDjG7zLURSYieLWOc43U8UooRVlKKEQTlFCIJUIiIKQSDkHBChEVfUl2guETaK+jW3hFVj38R856Qq2626e2VJhmGWnfHI33r29YWmrm1XOGSnFsuwL6Nx/RyfOgPWD1LhOM6c7WHDpjyezHUx5RGxqz97on6T59HuUyLduttmtlTyUvhMdvjlb72RvWFpLtjlGUXDy54ZaeU45RUwIiKsCIiAihEBERAREQERQgIiKggBJAAJJ6AvUbDI8Nbx/JbrGtibpj3dbukojXbSyn32ln1jv7F7FIOmZv3NKzIhbFzRnTP8A6D7VPNI/Ln8P+qyIgx80j8ufw/6pzSPy5/D/AKrKiFsXNI/Ln8P+qc0j8ufw/wCqyogx80j8ufw/6pzSPy5/D/qsiIWx80j8ufw/6pzSPy5/D/qsiIWx80j8ufw/6pzSPy5/D/qsiIWx80j8ufw/6pzSPy5/D/qsiIWx80j8ufw/6pzSPy5/D/qsiIWx81j8ufw/6pzWPy5/D/qsiIWx81j8ufw/6pzWPy5/D/qsiIWx81j8ufw/6pzWPy5/D/qsiIWx81j8ufw/6pzWPy5/D/qsiIWx81j8ufw/6pzWPy5/D/qsiIWx81j8ufw/6pzWPy5/D/qsiIWx81j8ufw/6pzWPy5/D/qsiIWx81j8ufw/6pzSPy5/D/qsiIWx80j8ufw/6pzSPy5/D/qsiIWx80j8ufw/6pzSPy5/D/qsiIWsrbWwspuYXJ5qKI8AWeFEetpz+5a1ysfMi2RtRylNJvimazII6jv4rWW/bbnJRh0MjBPSP+EgfwPnHUVxywnCdrD4x++l7MNbHVxjT1ujhPV2T1x8ujqVnNI/Ln8P+qc0j8ufw/6q4rrW0wmttjzPSfOb8+LzOH81VreGeOcXDhq6WellWX6T7mPmkflz+H/VRzSPy5/D/qsqLbkxc0j8ufw/6pzSPy5/D/qsqIMXNI/Ln8P+qc0j8ufw/wCqyqEGI0jOif8A0FQaQdEzfvaQsyINZ1LKPe6X/VO/sWAgg4IwR0FWCiRrZRiTj0O6R7ULaCL1Ix0by13EIorZpm6Ys9L/AMllUNGGtHUAFtR0M8jQcBoPjFVlrIt3vbN47O0p3sm8ePtKDTRbneybx4+0qe9s3js7SitJFu97ZvHZ2lO9s3js7Sg0kW73tm8dnaU72zeOztKDSRbve2bx2dpTvbN47O0oNJFu97ZvHZ2lO9s3js7Sg0kW73tm8dnaU72zeOztKDSRbhts3Q5h+8rWmhkhdiRuM8D0FB4RFsQ0c0rQ4NAaeBccZQa6Lc72zeOztKnvbN47O0oNJFu97ZvHZ2lO9s3js7Sg0kW73tm8dnaU72zeOztKDSRbve2bx2dpTvbN47O0oNJFu97ZvHZ2lO9s3js7Sg0kW73tm8dnaU72zeOztKDSRbve2bx2dpTvbN47O0oNJFud7ZvGZ2lYJ6aWDfI3d1jeEGJEWaCllnGWN8HrJwEGFFud7ZvGZ2lT3tm8dnaUGki3e9s3js7Sne2bx2dpQYaKsnoZhLTSFjunqcOojpVoGUN6zyQZRV5+Zn9HKfN1FaPe2bx2dpTvbN47O0rnnpxlO1G6et6NLlE4RsZRePVP06pa9TTTUkxiqI3RvHQ4f+8rEuhp56gxCnuLIqynHAPJ1t9Dl5lsMFQc22rAJ/3M+4j0HpWOdnHdqRXb0fo6ejY6m/QyvsndPlPw7lAis5rFWwfCsDR17yO1Ye9s3js7Su2OUZRcTby54ZYTWcVPa0kW73tm8dnaU72zeOztKrLSULd72TePH2lO9k3jx9pRGki3e9s3js7SsM9JNCNT25b1g5QadS3VHq6W/ki9vGWOHW0oosNy2xiSpGoZDRlXCqrT8O/6v81aqoIiICIiAiIiilZKVsL6mJlTIYoXPAkka3UWtzvIHTuXX36lsL9iIa+yUD4S24mm5ed+qWVoYTl3QMnG4dSDi0REBERAREQFiq4xLTvaegZHpWVRJ8G76p/JBS0cYlqWNcMt4lXap7Z8ab9U/krhAREQEREBERAUqw2fjtkl3gF7mdFQAl0pYCS7AyGjG/ecDK6m0SWjakXGidYKO3NgpJKiCqpi4Oi08NZJw4FBwqIDkA9YRAREQEREBQ9gkYWOGQ4YKlT0oKBseZhH1u0/vV81oa0NaMAbgFSx/H2/a/zV0gIiICIiAiIgKVmoW0z62BtdI+OlMg5Z7G5c1md+B14XcWSosW0F+Fkg2bpo7fJrbHVR6hURgAkSOdnzcD19KDiIK2og+DldjxTvCxzyCWV0gY1mr5reASdjY55I2PD2teWh4+cAcZWNZjDGJ2oje6Za2plhsZTcCIi05iIiIKCAQQRkHiFKhBQ1DOTlkYOAJARZK343L9ZEVmtPw7/q/wA1aqqtPw7/AKv81aogiIgIiICIiAutk/8ApZD/AI07/prklnNZUmiFEaiTmok5UQ6vA14xqx14RWBERAREQEREBRJ8G76p/JSok+Dd9U/kgqLZ8ab9U/krhU9s+NN+qfyVwgIiICIiAiIg2KCiqbjWQ0dFE6WomdpYxvSf5DzrrL7BNZLa/Z6z0tTK9+Dc61kD8TPH+7ace8b+8/euToq2qt9S2poaiSnnaCGyROw4Z471ZHa3aMjBvtw/HKClREQEREBERAUjioUjigpI/j4+1/mrpUsfx8fa/wA1dICIiAiIgIiINq10MlyuNPQwyRRyTvDGOldhoJ4ZK7TZSr2ggusOylZRcrbzIYKmB1PpxGSS53KAA46QcrggcHI3EK3m2qv89IaSa8VjoC3SWGTiOonie1BpXaCCmulZBSScpTxTvZE/OdTQ4gHsWoiIgiIgIiIChSoQUtb8cl+siVvxyX6yIrNafh3/AFf5q1VFTTGCYPxkcCPMrqOWOVupjwR6UR7REQEREBERAREQEREBERFEREBeZN0b/qn8l6WlX1bGxuijcHPduOOgINS2n+1N9B/JXCoYZDFK2RvFpyrqGeOZuWOHoPEIMiIiAiIgL3DFJPMyGFpdJI4MY0dLicAdq8L3FLJDKyWF7o5GEOa9pwWkdIKDoNsLLTWt1LJQtHIO1wPImEmqWM4LsgnGoEOx0Lb2vtFuo6WqktsEbXUtcIH8m+Q6WlhID9fFxIO9u7dv6FyvLS8iYeUdyRfrLM7tWMZx146Vmq7jXVzWtrKyoqGsOWiWUuAPmyguLzRUlJTvpYLXK90VJTzmvbI473hpJcPe6Dq0jGDkDed651bL6+sko2UclXO6lYcshMhLG+gcFrICIiAiIgKelQteqq2QsIDgZDwAQVsZ/tzT+1/mrpc8CQQQd4Ocq6pqqOdg8IB/S0lBnREQEREBERB1dRa6B1BMxlCYXwWiGu54JHnVI4Ny1wJ04dqIGMHK1qijoINlqKo5Gm53URyuL5HTcoS2QtGkN8DgPnKmmuNdPSspZqyokpmYDIXSksbjhgcNyltyrm0Zom1lQKUggwCQ6CCcndwRFvJR0EOylJVGKk53UCbwpZZRIdLw0aGt8HcPGXPL2+aR8ccb5HujjzoaTkNycnA6MleEBERAREQFCLDUVMcDSXOBd0NB3lBV1pzVy/WRYXOL3lzuJOSiKhZI4JZBmONxHWAslDCJqgNdvaBkjrVyBgYHBEU3NKnybu0JzSp8m7tCukRVLzOp8m7tTmdT5N3arpERS8zqfJu7U5nU+Td2q6RBS8zqfJu7U5nU+Td2q6RBS8zqfJu7U5nU+Td2q6RBS8zqfJu7U5nU+Td2q6RBS8zqfJu7U5nU+Sd2hXSIKQ0dTjfE7tWFzXMOlwII6CF0K166Fs0DjjwmjLSgpVkjhkl3xsc7zgKaaITTsYeBO/0K8a0NaGtAAHABFU/M6nybu1OZ1Pk3dquUQU3M6nybu1OZ1Pk3dquUQU3M6nybu1OZ1Pk3dquUQU3M6nybu1OZ1Pk3dquUQU3M6nybu1OZ1Pk3dquUQU3M6nybu1OZ1Pk3dquUQU3M6nybu1OZ1Pk3dquUQUvNKnybu1YXsfGcPaWnqIXQLxPE2eMscOPA9RQUGV6jjfIcRsc4+YI1hdIGdJOFexRthYGMGAP3oio5nU+Sd2pzOp8k7tCukQUvM6nybu1OZ1Pk3dqukQUvM6nybu1OZ1Pk3dqukQUvM6nybu1OZ1Pk3dqukQUvM6nybu1OZ1Pk3dqukQUvM6nybu1OZ1Pk3dqukQUvM6nybu1OaVPk3doV0iCl5pU+Td2rDJFJEf0jHNz1hdAvMjGyMLHjLSg59F6lYY5XMPzThEVt2n4d/wBX+atVVWn4d/1f5q1QEREBERARERELtYtkaGDZesqrhLO28R0fPW07CA2KMnDA8Y4necKt2DttLcb811fJCIKVhnMc0gYJnD3rMndvOM+YLrqCy3esh2qqbhV22SpuFKADHWtc1h1bgT81oGAPQg+XovU0ZimfG4tLmOLSWnIyDjceleUBERAREQF5k+Dd9U/kvS8yfBu+qfyQVNs+NN+qfyVwqa2fGm/VP5K5QMoiICIiAiIgttlLZFedoqC3Tl4inkw8sOHBoBJwfuW/VSbGNZMynpr3ywDhG508RbqGcE7s4ytbYmrqaHaOnqqK3vr54mSFtOx2C7LCCfuByuh2Tv8AU7SXqKx3Wko5rbVNe3kYqZrObgNJDmEDIxjpQcEi9zMEc0kbXamseWh3WAcZXhFEREQREQMoiIKSP4837X+au1Sx/Hx9r/NXSAiIgIiICIiDPQUk1fXU9HTN1TTyNjYD1k4XVT27Y2muTrLUVdwFQwmKS5a2ciyUcfA46Qd2f/6q7ufyRxbaWh0pAbzjG/rLSB+8hX0W0UvurNjNpoXWx9aaZ9G6nBe4F2kuLz4Rf87KDhJ4xFPJGJGSBji0PYctdg8R5ivCsNoqKK3X64UVO4uhp6h8bCTk4B3exV6AiIiiIiAoUqEFLW/G5frIlb8bl+siIzWn4d/1f5q1VVafh3/V/mrVFEREBERARFB3AlAIB4gH0rdoLlUUFLXU1OIxHXRCGbUzJLc53dStLzYYKCmqjCa2SWjlZFPKY28i5xAyAQdTcEgDPHzLLFsq+SCKp5U83fa3VhdrZqDw1x06c5x4I346UHNIt2ShYyyU9wD3F8tVJCWY3ANa12f9S0kQREQEREBeZPg3fVP5L0vMnwbvqn8kFRbPjTfqn8lcqmtnxpv1T+SuUBERAREQEREGegram3VkNZRSuiqIXamPb0FX1VtvdJoJo4Ke30UlQ0tnqKSlEcsgPHLujPmVPLRMZYobiJHF8lVJCWbsANY1wP8AqVltRs8ywAB80sj5pCacaRjkwBkuI+cSdzRwG88Qg59St680LLfVRQse54fTQzEuGMF7A4j7srRQEREBERAREQUsfx8fa/zV0qSP4837X+au0BERAREQERbdnpGV92o6OV7mMnnZG57RktBOCQg1Wucxwcxxa5pyCDgg9a6f3d3fHKcjb+fadPP+aN5fGMe+68dOFrVuznM7ZcauWoyaeoZHTho3TRk/CejBbj0nqWaDZhk1FRVbalzmTUUlRM0NGYXBr3MH1XcmRnrB8yDm3uc97nvcXOcSS4nJJPSoV7Z7PQ1NJRS19RUxur6s0sAgY0hhGnLn54jL2jA38VSzxOgnlhfjVG9zDjhkHB/JFeEREBERAUKVCClrfjcv1kSt+Ny/WREKKYQThzvencVdAggEHIPAhc8vccsrN0b3jzAoL9FS84qvKS9ic4qvKS9iC6RUvOKrykvYnOKrykvYgulCpucVXlJexOcVXlJexB1dZfK6tpnQTuiIfo5WRsLWyTaNzdbgMuwsbbrVtkZIHs1spDRtOgfBEEY9OHHeuY5xVeUl7E5xVeUl7EHQOq5nUMdEXDkI5XStbjeHOABOfQ0LCqXnFV5SXsTnFV5SXsQXSKl5xVeUl7E5xVeUl7EF0ipecVXlJexOcVXlJexBdLWr52xQubnw3DACrTUVON8kiwElxySSesoMlNJyM7JOgHf6FeMc17Q5hBaeBC59eo5JGH9G9zT9EoOgRUnOKrykvYp5xVeUl7EF0ipecVXlJexOcVXlJexBdIqXnFV5SXsTnFV5SXsQdRcrvV3OKOKpMQZGXODYomxhznAAuOBvcQBv8ymtvFbXR1EdVI17J5hO8aBueG6ct6sjAOOOAuW5xVeUl7E5xVeUl7EHU113qa+nihqY6Y8k1jGytga2QtaMNBcN5GFoKl5xVeUl7E5xVeUl7EF0ipecVXlJexOcVXlJexBdIqXnFV5SXsTnFV5SXsQXSxVEzYIy9x39A6yqk1FV0ySrC5znnL3Fx6yUBri14f0g5V7DK2aMPYcg8R1KhUse5hyxxafMUHQoqQVFV5SVTziq8pL2ILpFS84qvKS9ic4qvKS9iC6WWjqZaKrhqqdwbNC8PYSM4IORuVBziq8pL2Jziq8pL2IOmkutbLSOpZZ3PhLGRhrt+lrHFzQOoAuKy098uNOGiGfSBSOo8BowYTklp695O/iuU5xVeUl7E5xVeUl7EHV22+V1thEVM6EtZJysXKwteYpMY1sJ96cAb/MOpVziXOLnEkk5JPElUvOKrykvYnOKrykvYgukVLziq8pL2Jziq8pL2ILpFS84qvKS9ic4qvKS9iC6XiWRsTC95wB+9U/OKrykqxPe95zI5zj5ygSPMkjnni45ReURWWlh5ecM4DifQruNjI2hrGhoHUqy0/Dv+p/NWqIJlEQMoiICIiKIt2z0lFWVZiuNxbb4dBPLOidIM7sDA3//AMXRQbJWispq2W37UQ1BpKd08jeZSMAaPOTgZO5ByCKBwUoCIiAiIgLSr6Vj4nSMAD2jJx0hbq8Sb43/AFT+SCjhjMsrYx848VdxRMhaGxtAHX0lVVs+NN+qfyVyiGUyiIGUyiIGUyiIGUyt2y2upvV0p7dRhvLTOwC44DQBkk+YAEq+GylurW1ENj2gjrq+njdI6ndTOjEob77k3E4OEHKZTKjipQMplEQMplEQFr1VMydh3AP6HLYRFc8AS4NA3k4V3TU7IGANALul3SVVRj+3NH7X+au0QRERRERAREQEWahpJ6+sgpKVhknneGRt6yV1I2QtslWbXT7S00l4BLBT8g4ROkHzBJwz0cEHIIvUsT4ZXxStLJI3Fr2niCDgheUBERATKIiCxTwRzsLXgZ6HdIWVQg597Sx5a7i04KLLW/G5frIgz2n4d/1P5q1VVafh3/U/mrVAREQEREBERFF1lyBsGxlLbve114IqqodLYB8G0+k7+1cxSviiqoZKiLlomPDnxatOsA7xnoytzaG7y3271FwnaGGUgMjByI2AYa0egIK5ERAREQEREBeZPg3fVP5L0vMnwbvqn8kFTbPjTfqn8lcKntnxpv1T+SuEBERAREQEREHQ7AxVj9pqeahnigNMx80ssrS5rYgPDyBxyDjHnXR2Co2dqrrVwbLQ1VFdaqKRlHNWHXEMgkhoBy0kZwTnC4uwXiosVzZXUrWPIaWPjkGWyMO4tPmKu4NqLRbJH1dh2eFJcC0hk01U6VsGRgljSOPpRHKuYY3FjhhzTpI6iNyhCS4kuJJJySelEUREQEREBERBSx/H2/a/zV0qWP4+37X+aukBERAREQEREFjs3cu89+obiYzI2nlDnMHFw4HHnwSurtlv2ebtXS3ClvoqY5KxslPRMgcJy9z8hridwAJ3nqC4qgrJrfXQVlK4NmgkEjCRkZHWOpdR7r7ZBVPulBs5DBeH5cJzUOfFG88XtjxjO8oKnbQsdtdeDFjTzyTh6d/78qmUve6R7nyOLnuJc5x4kniVCAiIiCIiAoUqEFLW/G5frIlb8bl+siDNafh3/U/mrVU1ukEdSNRwHDTlXKAiIgIiICubbs/JcKOGaOsgZLUPljgge12ZHRtDnbwMDcelUys475Ww2ZlrppZIIRJI+QxvI5UPDRg+Yaf3oPVqshuFPFPJW09K2efm9PywceVkwDjcDpHhN3nrXigtDqnnxqKmOkbRaRMZGOfvL9GMNBPFbNivsFuZBFXW2OuhgqDPEHSFhY4gA8OPvWkecelYrdtBWW2WumpHubUVb2OM2cOaWya+A3HPAhB6h2eqn3aut0kjGPoWufM5jXSbmkDwWtGXcRux6cYVZWQNpqmSFk0c7WHAkizpd6MgH7it5l1iF3qq99GcTuc4MjqHxuhc45yx43g8eOdxWC83F91uU1bLG2N0uMtaSeAA3k7yd28nid6K00REBERAXmT4N31T+S9LBWSiKneSd5GB6UFdbPjTfqn8lcKjpJBFUMe7hnBV2iJRERRERAXqJrHysbJIImEgOeQSGjrwN5XlR0ILa52VtDW0tIyvhqJagRnwI3tDA8NLSdQ6Q4cFhq7VLS09bM+Rjm0lXzR4bnLnYdvHm8A9q811ykq66GrDGxyQxQsaAcj9G1rQf9IK2rte219PLDBQspRUVPOqgiVz9cmCN2fet8J27fx4oPNZYp6RlbJJPEYqZkLxI3OJuVALA37snf1FVSs629TVdmorY+JjW0x3ygnVKBkMB+qHOA9KrEBERAREQEReZHtjYXuOA3egpo/j7ftf5q7XPteWyiTpDtX71fMcHtDmnIIyCiPSIiKIiICt7Rs9U3ZlM6nmhaJ5pIjrJHJljA/f6QcDzqoVlbr1Pb7dWUcLGnnLo3CQ++iLTnLfSNxQR3oc2rt1PPUwwurYmSB0mQIg8kND+rgPRkL1VWaWhraSjr5oqaefHKMkz/ZwXYBfjhnju6MFeq29Ct2g761FFC5utrhS5PJgNADW9eN3DpWG83SW8Sx1FWxpq+T0TTjjNv3OI4AgbvOAEHq42ee2Pp46+RkMsznB0ZBLo2h2nWcdBIJGOIGekKbvamW6KkkZXRVIqmGRgZG9jgzOA4hwG478deF4uFy74XJlZVQBzWsiY6LWcPaxrW4zxGQ3969325w3arNVHRGmlecv/TmQEYAa0AgaQAMADoRFaiIgIiIChSocQ0EuOAN5KClrfjcv1kWOZ/KTPf4zsog8LYirZ42hofkDxhla6INzvjP9D1U74z/Q9VaaINzvjP8AQ9VO+M/0PVWmiDc74z/Q9VO+M/0PVWmiDc74z/Q9VO+M/wBD1Vpog3O+M/0PVUd8Z/oeqtREG33xn+h6qd8Z/oeqtREG33xn+h6qd8Z/oeqtREG2bjP9Af8AKteWWSV2qRxcV4RAWeGrmhbpa/weojKxRsMj2sbxccBW8NFDG0ZaHu6S5Bo98Z/oeqnfGf6Hqqz5CHyTPVCchD5JnqhBWd8Z/oeqnfGf6Hqqz5CHyTPVCchD5JnqhBWd8Z/oeqnfGf6Hqqz5CHyTPVCchD5JnqhBWd8Z/oeqnfGf6Hqqz5CHyTPVCchD5JnqhBWd8Z/oeqnfGf6Hqqz5CHyTPVCchD5JnqhBWd8Z/oeqnfGf6Hqqz5CHyTPVCchD5JnqhBWd8Z/oeqnfGf6Hqqz5CHyTPVCchD5JnqhBWd8Z/oeqsE1RLN8I7IHAcArrkIfJM9ULWqqGNzC6Ful434HAoKpZYaiWHdG/A6jvCxIg2++M/wBD1U74z/Q9VaiINvvjP9D1U74z/Q9VaiINvvjP9D1VPfGf6HqrTRBud8Z/oeqnfGf6HqrTRBud8Z/oeqnfGf6HqrTRBud8Z/oeqnfGf6HqrTRBud8Z/oeqnfGf6HqrTRBt98Z/oeqsU1TNMMPf4PUNwWFEBERAREQEREBERAREQEREBERAREQEREBERBs24Zq2+YH8lcqntvxtvoP5K4QEREBERFEREGWjpZ62qipaSJ0s8rg1jGje4q9uGxd2oaOepLqOoFMM1MdLUiSSAfSaFtdzXwLzXVLfhqa2VEsR6nAAZHaV57l8jjtnRxnLmVLJY5h47Swk5694BRHKovUrQyV7G8GuIHoBXlFEREBERARERHPyjErx1OP5ryvc3w0n1j+a8ICIiAiIgIiIC9Nje4Zax7h1hpIXR2e10dtoI77tFHrgfk0Nvzh1aR853ixA8T87gFu3DajbWCjpbkbpUU9BWZ5uKRzWwswccmGt96R4p34QceY5Ggl0bwBxJaQvK76l2g2zt+0Nno71dqsirlhc+lnka/MT3gaZGdGRncd+CuR2igipdobpTwMDIoqyZjGjg1oeQB2IK9ERAREQEREBERUEREBERAREUBERAREQEREBERAREQEREG1bfjbfQfyVwqe2/G2+g/krhAREQEREBERBa7MXl1hvMNdyQmjAdHNETjlI3DDh/wC+pXtHddmdnpKm4WF9wqK+SN0dLHUxhjKbUMEkj3xA3BcaiAiIgIiICIiAiIgoJvhpPrH814Xub4aT6x/NeEBERAREQFLThwJAODnB4HzKEQdhtlEdoGv2qtkj5qNwZHU0x99bnAYDCB/uz81w3b8HetnZK90WyNrbVVcjblLXvY8W2NzSynax3wr8ggS7vBHRxK5Wx3issle2roXt1aSySOQao5mHix7fnNPUrh82xFS8zPpb/Ruecmnp3wyRxnqa53hY6soJfBFHtva6inugucNZWQVDahzv0p1SjIlHzXg8R943Kr2r/wBqbz/5+f8A6jlcUNZsVbq2nroYdoqiWmlbKyKV0DGPc05AcRvAyBwXNXCrfX19TWSgCSomfK4N4AucScdqDAiIgIiKgiIgIiICIiAiIgIiICIiAiIoCIiAiIgIiICIiDPQvDKphO4Hd2q7XOrchuEkbQ17Q8DpJwUFsiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFioJDQXE4A3lV/fT9j/qWvU1kk7dO5reodKDXedTi7rJKhEQEREBERAREQEREBERAREVBERAREQEREBFA4BSgIiICIiAiIgIiICIiAiIoCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIioIiICIiAiIgIiICKHe9PoRAb70ehSvMRzG0+YL0gIiICIiAiIgIiICIiAiIgIiICIigIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIioIiICIiAiIgIiICIiAiIgIiIPL/eO9BRRMcRP9CKDzTHMLfNuWValG/BLD07wttUEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERBhqjiE+c4RYqx+XBg6OKKDXa4tcHDiFYxvEjA4KtWSGUxOzxB4hBYIvLHte3LTkL0qCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIC8SPEbC4/cOtS97WNy47loyyGV2Tw6Ag8OJcSTxKKEUBERB6Y90Zy04W1HVNO54wetaaILJr2u964H716VWvTXuB3OPagskWox7se+PasrXHrPaqMyLyCvSAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAi8krG5x6z2oMyLUe93jHtWBz3E73HtUFg57W++cB96wyVTRuYMnrK1FCD097nnLjkryiICIiD//Z";
const SKY_GUIDE_3 = "data:image/jpeg;base64,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AoILgUEAFAAAAAAAAAIBQQXAoIAAAAAAAAAABCikAAAAgAAAAAgQAoAAKAAiAAKqggIigAKAAAAAAAAoICigAAACAAAAAAAAAAAAAAAAAAAAAAAAAAQopAAAAIAAAAAAAQIpACgACAAAAAAAAAACgUgAoIUgAAKAAAAAAAAXKQAUEBRQQAUEAFAAAAgFBABQQAUEAAAEAAAAAAAAAABAEAAAFUABEAAAAAAAFAAEAAAAAAABVUEARQAQAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEACAUgBQAAAAEAAAAAAABQBCgAAAABAAAAAAAAAABVCkARQQpAAAAABQAAAAAAAAAAAAAAAAABAAgFBAUAAAAAUABEAAAAAAAFAAAAQAAABQQAUAAAAAABAAAAAAAAAABVAAAAARQQAUEAFBABQQAUEAFIAAAAAABQAEQAAAAAAAAAAAAFAAgFIAAAAAAAAAAKQAUEKAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAABAAAAAAAAAABCgAAAAAAAAUEAFAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAIBSAAAAAAAAAAAQBAAAUEAFAAUAAAAAAABQQAUEKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABSAAAAAAAAAAACAUgAQAAAAAAAAKQAUEKFAAAAAAAAAAAAAFBABQQAUAAAAAAAAAAAAAAIBQQAUgAAAAAAAAAAAAAAABAEAAAAAAAAAAAAAAAAAAAKQAUEKFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAEAAAAAAAAAAAAAAEKAAAAAAAAAAAAAACkAFBAFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBQQBAAAAAAAAAAAAAAAAAEAAAACkAFAAAAAAAAAAAAAAAAAAAtyACggAoIAKCAKoIW4AEAFBABQQBFFyAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAACggAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEApAAAAAAAAAAAAAAAAAAAAAAACggAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUgAoIAKAAAAAAAAAAAAAAAAAAAAAAAAAQCggApAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSACggAoIAKCACggApAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=";

const SKY_RULES = [
  "Sizə verilən və hesabda sizdən başqa otaqların adını, şifrəsini, şəkillərini dəyişmək qadağandır.",
  "Aldığınız hesab 1 nəfərlik olduğunu unutmayın. Yəni ikinci bir şəxsə (ailə üzvünüzə, dostunuza və s.) vermək qadağandır. \"Mən baxım, başqa vaxtı dostum və ya ailə üzvüm baxacaq\" söhbəti yoxdur. Sistemdən izlənilir, təsbit edildiyi an hesabdan xaric olunacaqsınız.",
  "Özünüzə aid cihazlardan eyni anda baxmamaq şərtilə izləyə bilərsiniz. Yəni TV-də Netflix-də film açılıbsa, telefondan girib filmə baxmaq qadağandır. Eyni anda yalnız 1 cihaz işləməlidir.",
  "Otağın menyu dili yalnız Türk dilində olmalıdır. Menyu dilini Rus, İngilis və ya başqa dilə çevirmək qadağandır.",
  "Otağın menyu dilini dəyişmədən səsləndirmə və altyazıya rus və digər dilləri əlavə etmək sərbəstdir. Onsuz da bütün hesablarımızda avtomatik əlavə olunur. Filmi başlatdıqdan sonra alt hissədən səsləndirmə yerindən filmin dilini rus və ya ingilis dilinə dəyişə bilərsiniz.",
];

function skyNormPhone(p) {
  let d = String(p || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.length === 10 && d[0] === "0") d = "994" + d.slice(1);
  else if (d.length === 9) d = "994" + d;
  return d;
}

function skyFmtDate(v, withTime = true) {
  if (!v) return "—";
  const d = new Date(v);
  const p = (n) => String(n).padStart(2, "0");
  const date = `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
  return withTime ? `${date} ${p(d.getHours())}:${p(d.getMinutes())}` : date;
}

function skyDaysLeft(v) {
  return Math.ceil((new Date(v).getTime() - Date.now()) / 86400000);
}

function skyAddMonths(base, months) {
  const start = Math.max(Date.now(), base ? new Date(base).getTime() : 0);
  const d = new Date(start);
  d.setMonth(d.getMonth() + months);
  return d.toISOString();
}

function skyAddDays(base, days) {
  const start = Math.max(Date.now(), base ? new Date(base).getTime() : 0);
  return new Date(start + days * 86400000).toISOString();
}

function skyAddDuration(base, months, days) {
  return days > 0 ? skyAddDays(base, days) : skyAddMonths(base, months || 1);
}

function skyRandomPin() {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(1000 + (arr[0] % 9000));
}

function skyMakeSlug(email) {
  const base =
    String(email || "hesab")
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 16) || "hesab";
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  const arr = new Uint8Array(6);
  crypto.getRandomValues(arr);
  return base + "-" + Array.from(arr, (b) => chars[b % chars.length]).join("");
}

function skyAccountLink(slug) {
  return `${SKY_SITE_URL}/#h-${slug}`;
}

function skyParseDate(s) {
  s = String(s || "").trim();
  let m, y, mo, d;
  if ((m = s.match(/^(\d{4})[-./](\d{1,2})[-./](\d{1,2})/))) {
    y = +m[1]; mo = +m[2]; d = +m[3];
  } else if ((m = s.match(/^(\d{1,2})[-./](\d{1,2})[-./](\d{2,4})/))) {
    d = +m[1]; mo = +m[2]; y = +m[3];
    if (y < 100) y += 2000;
  } else if (/^\d{5}$/.test(s)) {
    const dt = new Date(Date.UTC(1899, 11, 30) + Number(s) * 86400000);
    y = dt.getUTCFullYear(); mo = dt.getUTCMonth() + 1; d = dt.getUTCDate();
  } else return null;
  const dt = new Date(y, mo - 1, d, 23, 59, 0);
  if (isNaN(dt.getTime()) || dt.getMonth() !== mo - 1) return null;
  return dt.toISOString();
}

function skyParseRows(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.includes("\t") ? "\t" : line.includes(";") ? ";" : ",";
      return line.split(sep).map((c) => c.trim().replace(/^"|"$/g, ""));
    });
}

async function skyCopy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

function skyWaUrl(phone, text) {
  return `https://wa.me/${skyNormPhone(phone)}?text=${encodeURIComponent(text)}`;
}

async function skyFetchAll(table, orderCol, ascending = true) {
  let all = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderCol, { ascending })
      .range(from, from + 999);
    if (error) throw error;
    all = all.concat(data || []);
    if (!data || data.length < 1000) break;
  }
  return all;
}

// -----------------------------------------------------
// MÜŞTƏRİ SƏHİFƏSİ: skyflixazerbaycan.com/#h-<kod>
// -----------------------------------------------------
function SharedAccountPage({ slug }) {
  useGoogleFonts();
  const storageKey = "skyacc:" + slug;
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "null");
    } catch {
      return null;
    }
  })();

  const [phone, setPhone] = useState(saved?.phone || "");
  const [pin, setPin] = useState(saved?.pin || "");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const [whatsapp, setWhatsapp] = useState("517873090");
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    document.title = "Hesab məlumatları — SkyFlix";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    supabase
      .from("settings")
      .select("*")
      .eq("key", "contact_whatsapp")
      .then(({ data }) => {
        if (data && data[0]?.value) setWhatsapp(data[0].value);
      });
    if (saved?.phone && saved?.pin) check(saved.phone, saved.pin);
    return () => document.head.removeChild(meta);
  }, []);

  // Giriş edilibsə, hər 20 saniyədə yeni kodu yoxla
  useEffect(() => {
    if (result?.status !== "ok") return;
    const id = setInterval(() => check(phone, pin), 20000);
    return () => clearInterval(id);
  }, [result?.status, phone, pin]);

  async function check(ph = phone, pn = pin) {
    setError("");
    if (skyNormPhone(ph).length < 9) return setError("WhatsApp nömrənizi tam yazın.");
    if (!/^\d{4}$/.test(String(pn).trim())) return setError("PIN 4 rəqəmdən ibarətdir.");
    setLoading(true);
    const { data, error: err } = await supabase.rpc("get_shared_account", {
      p_slug: slug,
      p_phone: ph,
      p_pin: String(pn).trim(),
    });
    setLoading(false);
    if (err) return setError("Bağlantı xətası. Bir az sonra yenidən yoxlayın.");
    const st = data?.status;
    if (st === "ok" || st === "expired") {
      localStorage.setItem(storageKey, JSON.stringify({ phone: ph, pin: String(pn).trim() }));
      setResult(data);
    } else {
      setResult(null);
      if (st === "wrong") {
        localStorage.removeItem(storageKey);
        setError("Nömrə və ya PIN səhvdir. Linki sizə göndərdiyimiz mesajdakı PIN-i yazın.");
      } else if (st === "blocked") {
        setError("Çox səhv cəhd edildi. 15 dəqiqə sonra yenidən yoxlayın.");
      } else {
        setError("Bu link aktiv deyil. Yeni link üçün bizə yazın.");
      }
    }
  }

  function logout() {
    localStorage.removeItem(storageKey);
    setResult(null);
    setPhone("");
    setPin("");
  }

  async function copy(label, text) {
    if (await skyCopy(text)) {
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    }
  }

  const waDigits = skyNormPhone(whatsapp);
  const renewText = result
    ? `Salam! ${result.service || ""} abunəliyimi artırmaq istəyirəm. Nömrəm: +${skyNormPhone(phone)}`
    : "Salam! Hesab linki ilə bağlı kömək lazımdır.";
  const days = result?.expires_at ? skyDaysLeft(result.expires_at) : null;

  return (
    <div className="sa-root">
      <style>{`
        .sa-root{min-height:100vh;background:#150708;color:#F5EBEA;font-family:Inter,system-ui,sans-serif;
          display:flex;flex-direction:column;align-items:center;padding:28px 18px 40px;}
        .sa-brand{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;
          font-size:17px;margin-bottom:34px;color:#F5EBEA;text-decoration:none;}
        .sa-brand img{width:28px;height:28px;border-radius:7px;}
        .sa-card{width:100%;max-width:400px;background:#1D0D0E;border:1px solid rgba(255,255,255,0.1);
          border-radius:20px;padding:26px 22px;}
        .sa-title{font-family:'Space Grotesk',sans-serif;font-size:24px;line-height:1.2;margin:0 0 6px;}
        .sa-sub{color:#A98D8B;font-size:14px;line-height:1.5;margin:0 0 22px;}
        .sa-label{display:block;font-size:13px;color:#A98D8B;margin:0 0 6px;}
        .sa-input{width:100%;background:#150708;border:1px solid rgba(255,255,255,0.14);color:#F5EBEA;
          border-radius:12px;padding:13px 14px;font-size:16px;margin-bottom:14px;outline:none;}
        .sa-input:focus{border-color:#FF3B4E;}
        .sa-btn{width:100%;border:0;border-radius:12px;padding:14px;font-size:15px;font-weight:600;cursor:pointer;
          background:#E1122A;color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;}
        .sa-btn:disabled{opacity:.6;}
        .sa-btn:focus-visible,.sa-copy:focus-visible,.sa-link:focus-visible{outline:2px solid #FF3B4E;outline-offset:2px;}
        .sa-btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.16);color:#F5EBEA;margin-top:10px;}
        .sa-error{background:rgba(225,18,42,0.12);border:1px solid rgba(255,59,78,0.35);color:#FFB3BA;
          border-radius:12px;padding:11px 13px;font-size:14px;margin-bottom:14px;line-height:1.45;}
        .sa-field{background:#150708;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:12px 14px;margin-bottom:10px;}
        .sa-field-top{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#A98D8B;margin-bottom:4px;}
        .sa-value{font-family:'JetBrains Mono',monospace;font-size:17px;word-break:break-all;letter-spacing:.2px;}
        .sa-pass{font-size:24px;font-weight:700;color:#fff;}
        .sa-actions{display:flex;gap:6px;}
        .sa-copy{background:rgba(255,255,255,0.07);border:0;color:#F5EBEA;border-radius:8px;padding:6px 9px;
          font-size:12px;cursor:pointer;display:flex;align-items:center;gap:4px;}
        .sa-copy.done{background:#1f6f43;}
        .sa-expiry{display:flex;justify-content:space-between;align-items:baseline;margin:18px 0 4px;padding-top:16px;
          border-top:1px dashed rgba(255,255,255,0.14);font-size:14px;color:#A98D8B;}
        .sa-days{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:#F5EBEA;}
        .sa-days.soon{color:#FF3B4E;}
        .sa-small{font-size:12px;color:#A98D8B;margin-top:10px;line-height:1.5;}
        .sa-expired-icon{width:54px;height:54px;border-radius:50%;background:rgba(225,18,42,0.14);color:#FF3B4E;
          display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
        .sa-link{background:none;border:0;color:#A98D8B;font-size:13px;text-decoration:underline;cursor:pointer;margin-top:16px;width:100%;}
        .sa-rules{margin-top:16px;border-top:1px dashed rgba(255,255,255,0.14);padding-top:14px;}
        .sa-rules-head{display:flex;gap:8px;align-items:flex-start;color:#FFB3BA;font-size:13px;font-weight:600;line-height:1.45;margin-bottom:10px;}
        .sa-rules-toggle{background:none;border:0;color:#A98D8B;font-size:13px;cursor:pointer;padding:0;text-decoration:underline;}
        .sa-rules ol{margin:6px 0 0;padding-left:20px;}
        .sa-rules li{font-size:13px;color:#C9BAB8;line-height:1.5;margin-bottom:9px;}
        .sa-rules li::marker{color:#FF3B4E;font-weight:700;}
        .sa-guide{margin:14px 0 6px;background:#150708;border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:14px;}
        .sa-guide-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:#FF3B4E;letter-spacing:.5px;margin-bottom:8px;}
        .sa-guide-text{font-size:13px;line-height:1.6;color:#EBD9D8;text-transform:uppercase;margin:0 0 12px;font-weight:600;}
        .sa-guide-text b{color:#fff;}
        .sa-guide-imgs{display:flex;gap:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
        .sa-guide-imgs img{height:300px;width:auto;border-radius:10px;border:1px solid rgba(255,255,255,0.14);flex-shrink:0;}
        .sa-code{background:linear-gradient(135deg,#E1122A,#8C1620);border-radius:14px;padding:14px 16px;margin-bottom:10px;}
        .sa-code-label{font-size:12px;color:rgba(255,255,255,0.85);margin-bottom:4px;display:flex;justify-content:space-between;}
        .sa-code-val{font-family:'JetBrains Mono',monospace;font-size:30px;font-weight:700;color:#fff;letter-spacing:4px;}
        .sa-code-btn{display:inline-flex;align-items:center;gap:6px;margin-top:8px;background:#fff;color:#8C1620;border:0;border-radius:9px;padding:9px 13px;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;}
        @media (prefers-reduced-motion: no-preference){.sa-card{animation:saIn .35s ease-out;}.sa-code{animation:saIn .3s ease-out;}}
        @keyframes saIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      `}</style>

      <a className="sa-brand" href={SKY_SITE_URL}>
        <img src="/skyflix-icon.png" alt="" />
        SkyFlix Azerbaycan
      </a>

      <div className="sa-card" key={result ? result.status : "form"}>
        {!result && (
          <>
            <h1 className="sa-title">Hesab məlumatlarınız</h1>
            <p className="sa-sub">WhatsApp nömrənizi və sizə göndərilən 4 rəqəmli PIN-i yazın.</p>
            {error && <div className="sa-error">{error}</div>}
            <label className="sa-label" htmlFor="sa-phone">WhatsApp nömrəsi</label>
            <input
              id="sa-phone"
              className="sa-input"
              type="tel"
              inputMode="tel"
              placeholder="050 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="sa-label" htmlFor="sa-pin">PIN</label>
            <input
              id="sa-pin"
              className="sa-input"
              type="tel"
              inputMode="numeric"
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && check()}
            />
            <button className="sa-btn" onClick={() => check()} disabled={loading}>
              {loading ? "Yoxlanılır..." : "Məlumatları göstər"}
            </button>
            <a className="sa-btn sa-btn-ghost" href={`https://wa.me/${waDigits}?text=${encodeURIComponent(renewText)}`} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> PIN-i unutmusunuz? Bizə yazın
            </a>
          </>
        )}

        {result?.status === "ok" && (
          <>
            <h1 className="sa-title">{result.service || "Hesab"}</h1>
            <p className="sa-sub">
              {result.name ? `${result.name}, ` : ""}şifrə dəyişəndə bu səhifədə avtomatik yenilənir.
            </p>

            <div className="sa-field">
              <div className="sa-field-top">
                <span>Email / login</span>
                <button className={`sa-copy ${copied === "email" ? "done" : ""}`} onClick={() => copy("email", result.login_email)}>
                  <Copy size={12} /> {copied === "email" ? "Kopyalandı" : "Kopyala"}
                </button>
              </div>
              <div className="sa-value">{result.login_email}</div>
            </div>

            <div className="sa-field">
              <div className="sa-field-top">
                <span>Şifrə</span>
                <button className={`sa-copy ${copied === "pass" ? "done" : ""}`} onClick={() => copy("pass", result.login_password)}>
                  <Copy size={12} /> {copied === "pass" ? "Kopyalandı" : "Kopyala"}
                </button>
              </div>
              <div className="sa-value sa-pass">
                {result.login_password ? (
                  result.login_password
                ) : (
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#A98D8B", fontFamily: "Inter,sans-serif" }}>Şifrə tezliklə əlavə olunacaq. Bir az sonra "Yenilə" basın.</span>
                )}
              </div>
            </div>

            {(result.room_name || result.room_password) && (
              <>
                {result.room_name && (
                  <div className="sa-field">
                    <div className="sa-field-top"><span>Otağınız (profil)</span></div>
                    <div className="sa-value">{result.room_name}</div>
                  </div>
                )}
                {result.room_password && (
                  <div className="sa-field">
                    <div className="sa-field-top">
                      <span>Otaq şifrəsi</span>
                      <button className={`sa-copy ${copied === "room" ? "done" : ""}`} onClick={() => copy("room", result.room_password)}>
                        <Copy size={12} /> {copied === "room" ? "Kopyalandı" : "Kopyala"}
                      </button>
                    </div>
                    <div className="sa-value sa-pass">{result.room_password}</div>
                  </div>
                )}
              </>
            )}

            {result.note && <p className="sa-small" style={{ marginTop: 4 }}>{result.note}</p>}

            {result.last_code && (result.last_code.code || result.last_code.link) && (
              <div className="sa-code">
                <div className="sa-code-label">
                  <span>Netflix təsdiq {result.last_code.code ? "kodu" : "linki"}</span>
                  <span>yeni · {skyFmtDate(result.last_code.received_at).split(" ")[1]}</span>
                </div>
                {result.last_code.code && <div className="sa-code-val">{result.last_code.code}</div>}
                {result.last_code.code && (
                  <button className="sa-code-btn" onClick={async () => { if (await skyCopy(result.last_code.code)) { setCodeCopied(true); setTimeout(() => setCodeCopied(false), 1500); } }}>
                    <Copy size={13} /> {codeCopied ? "Kopyalandı" : "Kodu kopyala"}
                  </button>
                )}
                {result.last_code.link && (
                  <a className="sa-code-btn" href={result.last_code.link} target="_blank" rel="noreferrer">
                    <CheckCircle2 size={13} /> Təsdiq linkini aç
                  </a>
                )}
              </div>
            )}
            <div className="sa-guide">
              <div className="sa-guide-title">HESABA GİRİŞ QAYDASI</div>
              <p className="sa-guide-text">
                HESAB MAİLİNİ YAZANDAN SONRA 4 RƏQƏMLİ KOD İSTƏNİLƏN HİSSƏDƏ AŞAĞIDA <b>“GET HELP”</b> BASIN, SONRA <b>“USE PASSWORD INSTEAD”</b> SEÇİN. AÇILAN SƏHİFƏDƏ SİZƏ VERİLƏN <b>ŞİFRƏNİ</b> YAZIB <b>“SIGN IN”</b> BASIN.
              </p>
              <div className="sa-guide-imgs">
                <img src={SKY_GUIDE_1} alt="Addım 1: Get Help" loading="lazy" />
                <img src={SKY_GUIDE_2} alt="Addım 2: Use password instead" loading="lazy" />
                <img src={SKY_GUIDE_3} alt="Addım 3: Şifrəni yazın" loading="lazy" />
              </div>
            </div>
            <p className="sa-small" style={{ marginTop: 0, marginBottom: 4 }}>
              Cihaz təsdiqi lazımdırsa, yuxarıdakı qayda ilə şifrə ilə giriş edin. İstəsəniz Netflix-ə kod göndərin, kod bir neçə saniyəyə burada görünəcək (səhifə avtomatik yenilənir).
            </p>

            <div className="sa-expiry">
              <span>Abunəlik bitir: {skyFmtDate(result.expires_at, false)}</span>
              <span className={`sa-days ${days <= 3 ? "soon" : ""}`}>{days <= 0 ? "Bu gün" : `${days} gün`}</span>
            </div>
            <p className="sa-small">Şifrə son dəfə {skyFmtDate(result.password_updated_at)} tarixində yenilənib.</p>

            <button className="sa-btn sa-btn-ghost" onClick={() => check()} disabled={loading}>
              <RotateCw size={15} /> {loading ? "Yenilənir..." : "Yenilə"}
            </button>
            {days <= 3 && (
              <a className="sa-btn" style={{ marginTop: 10 }} href={`https://wa.me/${waDigits}?text=${encodeURIComponent(renewText)}`} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Abunəliyi artır
              </a>
            )}
            <div className="sa-rules">
              <div className="sa-rules-head">
                <Shield size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>{SKY_RULES_TITLE}</span>
              </div>
              <ol>
                {SKY_RULES.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
            </div>

            <button className="sa-link" onClick={logout}>Başqa nömrə ilə gir</button>
          </>
        )}

        {result?.status === "expired" && (
          <>
            <div className="sa-expired-icon"><Clock size={26} /></div>
            <h1 className="sa-title">Abunəliyinizin vaxtı bitib</h1>
            <p className="sa-sub">
              {result.service ? `${result.service} abunəliyiniz` : "Abunəliyiniz"} {skyFmtDate(result.expires_at, false)} tarixində bitib.
              Artırandan sonra bu link dərhal yenidən açılacaq.
            </p>
            <a className="sa-btn" href={`https://wa.me/${waDigits}?text=${encodeURIComponent(renewText)}`} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Artırmaq üçün yazın
            </a>
            <button className="sa-btn sa-btn-ghost" onClick={() => check()} disabled={loading}>
              <RotateCw size={15} /> {loading ? "Yoxlanılır..." : "Artırdım, yenidən yoxla"}
            </button>
            <button className="sa-link" onClick={logout}>Başqa nömrə ilə gir</button>
          </>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// AYRICA İDARƏ SƏHİFƏSİ: skyflixazerbaycan.com/#abunelikidare
// -----------------------------------------------------
function SubscriptionManagerPage() {
  useGoogleFonts();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("sai-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.title = "Abunəlik idarəsi — SkyFlix";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess));
    return () => {
      listener.subscription.unsubscribe();
      document.head.removeChild(meta);
    };
  }, []);

  async function login(e) {
    e.preventDefault();
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError("Mail və ya şifrə səhvdir.");
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("sai-theme", next);
    } catch {}
  }

  return (
    <div className={`sai-root ${theme}`}>
      <style>{`
        .sai-root{--bg:#FFFFFF;--surface:#FDF7F7;--surface2:#F7E8E9;--gold:#E1122A;--text:#1A1210;--muted:#7A6C6A;--line:rgba(26,18,16,0.12);
          min-height:100vh;background:var(--bg);color:var(--text);font-family:Inter,system-ui,sans-serif;}
        .sai-root.dark{--bg:#150708;--surface:#1D0D0E;--surface2:#2A1315;--gold:#FF3B4E;--text:#F5EBEA;--muted:#A98D8B;--line:rgba(255,255,255,0.1);}
        .sai-root *{box-sizing:border-box;}
        .sai-wrap{max-width:760px;margin:0 auto;padding:18px 16px 60px;}
        .sai-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:22px;}
        .sai-brand{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;}
        .sai-brand img{width:28px;height:28px;border-radius:7px;}
        .sai-root .ab-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border-radius:10px;padding:10px 15px;font-size:14px;
          font-weight:600;cursor:pointer;border:1px solid transparent;font-family:inherit;}
        .sai-root .ab-btn:disabled{opacity:.6;}
        .sai-root .ab-btn-gold{background:var(--gold);color:#fff;}
        .sai-root .ab-btn-ghost{background:transparent;color:var(--text);border-color:var(--line);}
        .sai-root .ad-status{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:50;background:#1f6f43;color:#fff;
          padding:10px 16px;border-radius:10px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.3);max-width:90vw;}
        .sai-root button:focus-visible,.sai-root a:focus-visible,.sai-root input:focus-visible,.sai-root textarea:focus-visible{outline:2px solid var(--gold);outline-offset:2px;}
        .sai-login{max-width:380px;margin:60px auto 0;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:24px 20px;}
        .sai-login h1{font-family:'Space Grotesk',sans-serif;font-size:22px;margin:0 0 16px;}
        .sai-login input{width:100%;background:var(--bg);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:12px;font-size:16px;margin-bottom:10px;}
        .sai-title{font-family:'Space Grotesk',sans-serif;font-size:24px;margin:0 0 16px;}
      `}</style>
      <div className="sai-wrap">
        <div className="sai-top">
          <div className="sai-brand">
            <img src="/skyflix-icon.png" alt="" /> Abunəlik idarəsi
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="ab-btn ab-btn-ghost" onClick={toggleTheme} aria-label="Tema dəyiş">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {session && (
              <button className="ab-btn ab-btn-ghost" onClick={() => supabase.auth.signOut()}>
                Çıxış
              </button>
            )}
          </div>
        </div>

        {checking && <p style={{ color: "var(--muted)" }}>Yüklənir...</p>}

        {!checking && !session && (
          <form className="sai-login" onSubmit={login}>
            <h1>Giriş</h1>
            {error && <p style={{ color: "var(--gold)", fontSize: 14, marginTop: 0 }}>{error}</p>}
            <input type="email" placeholder="Admin mail" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="ab-btn ab-btn-gold" style={{ width: "100%" }} type="submit">
              Daxil ol
            </button>
          </form>
        )}

        {!checking && session && session.user.email !== ADMIN_EMAIL && (
          <div className="sai-login">
            <h1>İcazə yoxdur</h1>
            <p style={{ color: "var(--muted)" }}>Bu səhifəyə yalnız admin hesabı ilə girmək olar.</p>
          </div>
        )}

        {!checking && session && session.user.email === ADMIN_EMAIL && <SharedAccountsAdmin />}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// ADMIN: HESAB ŞİFRƏLƏRİ BÖLMƏSİ
// -----------------------------------------------------
function SharedAccountsAdmin() {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("accounts");
  const [accounts, setAccounts] = useState([]);
  const [members, setMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [msg, setMsg] = useState("");

  const [search, setSearch] = useState("");
  const [noPassOnly, setNoPassOnly] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState({});
  const [bulkDelText, setBulkDelText] = useState("");
  const [bulkService, setBulkService] = useState("");
  const [showCount, setShowCount] = useState(40);
  const [expanded, setExpanded] = useState(null);
  const [newAcc, setNewAcc] = useState({ service: "", login_email: "", login_password: "", note: "" });
  const [passDrafts, setPassDrafts] = useState({});
  const [noteDrafts, setNoteDrafts] = useState({});
  const [memberForm, setMemberForm] = useState({ name: "", phone: "", pin: "", months: 1, days: "", room_name: "", room_password: "" });
  const [lastAdded, setLastAdded] = useState(null);

  const [phoneSearch, setPhoneSearch] = useState("");
  const [expFilter, setExpFilter] = useState("soon");
  const [bulkAccText, setBulkAccText] = useState("");
  const [bulkMemText, setBulkMemText] = useState("");
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkReport, setBulkReport] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  function flashMsg(t) {
    setMsg(t);
    setTimeout(() => setMsg(""), 2600);
  }

  async function loadAll() {
    setLoading(true);
    setLoadError("");
    try {
      const [accs, mems] = await Promise.all([
        skyFetchAll("shared_accounts", "created_at", false),
        skyFetchAll("account_members", "expires_at", true),
      ]);
      setAccounts(accs);
      setMembers(mems);
    } catch (e) {
      setLoadError("Məlumat yüklənmədi: " + (e.message || e) + " — SQL faylını Supabase-də işə salmısınız?");
    }
    setLoading(false);
  }

  async function loadCodes() {
    const { data } = await supabase
      .from("account_codes")
      .select("*")
      .order("received_at", { ascending: false })
      .limit(100);
    setCodes(data || []);
  }

  async function loadLogs() {
    const { data } = await supabase
      .from("account_access_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(150);
    setLogs(data || []);
  }

  const accById = React.useMemo(() => {
    const m = {};
    accounts.forEach((a) => (m[a.id] = a));
    return m;
  }, [accounts]);

  const membersByAcc = React.useMemo(() => {
    const m = {};
    members.forEach((x) => {
      (m[x.account_id] = m[x.account_id] || []).push(x);
    });
    return m;
  }, [members]);

  const pinByPhone = React.useMemo(() => {
    const m = {};
    members.forEach((x) => {
      if (!m[x.phone]) m[x.phone] = x.pin;
    });
    return m;
  }, [members]);

  const now = Date.now();
  const stats = React.useMemo(() => {
    let active = 0, soon = 0, expired = 0;
    members.forEach((m) => {
      const t = new Date(m.expires_at).getTime();
      if (t < now) expired++;
      else {
        active++;
        if (t - now <= 3 * 86400000) soon++;
      }
    });
    return { active, soon, expired };
  }, [members]);

  const filteredAccounts = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = noPassOnly ? accounts.filter((a) => !a.login_password) : accounts;
    if (!q) return base;
    return base.filter(
      (a) => a.login_email.toLowerCase().includes(q) || (a.service || "").toLowerCase().includes(q) || (a.note || "").toLowerCase().includes(q)
    );
  }, [accounts, search, noPassOnly]);

  const noPassCount = React.useMemo(() => accounts.filter((a) => !a.login_password).length, [accounts]);

  // ---------- Toplu silmə ----------
  async function deleteAccountsByIds(ids) {
    if (!ids.length) return 0;
    let deleted = 0;
    for (let i = 0; i < ids.length; i += 200) {
      const chunk = ids.slice(i, i + 200);
      const { error } = await supabase.from("shared_accounts").delete().in("id", chunk);
      if (error) {
        flashMsg("Xəta: " + error.message);
        break;
      }
      deleted += chunk.length;
    }
    const gone = new Set(ids);
    setAccounts((l) => l.filter((a) => !gone.has(a.id)));
    setMembers((l) => l.filter((m) => !gone.has(m.account_id)));
    return deleted;
  }

  async function deleteSelected() {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (!ids.length) return flashMsg("Heç bir hesab seçilməyib.");
    const memberCount = members.filter((m) => selected[m.account_id]).length;
    if (!window.confirm(`${ids.length} hesab və onlara bağlı ${memberCount} müştəri silinsin? Bu geri qaytarılmır.`)) return;
    const n = await deleteAccountsByIds(ids);
    setSelected({});
    setSelectMode(false);
    flashMsg(`${n} hesab silindi`);
  }

  async function bulkDeleteByEmails() {
    const emails = new Set((bulkDelText.match(/[^\s,;]+@[^\s,;]+\.[^\s,;]+/g) || []).map((e) => e.toLowerCase()));
    if (!emails.size) return setBulkReport("Silmək üçün heç bir mail tapılmadı.");
    const svc = bulkService.trim().toLowerCase();
    const targets = accounts.filter((a) => emails.has(a.login_email.toLowerCase()) && (!svc || (a.service || "").toLowerCase() === svc));
    const found = new Set(targets.map((a) => a.login_email.toLowerCase()));
    const missing = [...emails].filter((e) => !found.has(e));
    if (!targets.length) return setBulkReport("Bu maillərdən heç biri sistemdə tapılmadı.");
    const memberCount = members.filter((m) => targets.some((t) => t.id === m.account_id)).length;
    if (!window.confirm(`${targets.length} hesab və onlara bağlı ${memberCount} müştəri silinsin? Bu geri qaytarılmır.`)) return;
    setBulkBusy(true);
    const n = await deleteAccountsByIds(targets.map((a) => a.id));
    setBulkBusy(false);
    setBulkDelText("");
    setBulkReport(`Silinən hesab: ${n}.` + (missing.length ? ` Tapılmayan mail: ${missing.length}\n` + missing.slice(0, 30).join("\n") : ""));
  }

  // ---------- Hesab əməliyyatları ----------
  async function addAccount() {
    const service = newAcc.service.trim();
    const email = newAcc.login_email.trim();
    if (!email) return flashMsg("Mail yazın.");
    const dup = accounts.find((a) => a.login_email.toLowerCase() === email.toLowerCase() && (a.service || "").toLowerCase() === service.toLowerCase());
    if (dup) return flashMsg("Bu hesab artıq var.");
    const { data, error } = await supabase
      .from("shared_accounts")
      .insert({ service, login_email: email, login_password: newAcc.login_password, note: newAcc.note.trim(), slug: skyMakeSlug(email) })
      .select()
      .single();
    if (error) return flashMsg("Xəta: " + error.message);
    setAccounts((a) => [data, ...a]);
    setNewAcc({ service: "", login_email: "", login_password: "", note: "" });
    setExpanded(data.id);
    flashMsg("Hesab əlavə edildi ✓");
  }

  async function updateAccount(id, patch, okText) {
    const { data, error } = await supabase.from("shared_accounts").update(patch).eq("id", id).select().single();
    if (error) return flashMsg("Xəta: " + error.message);
    setAccounts((list) => list.map((a) => (a.id === id ? data : a)));
    if (okText) flashMsg(okText);
  }

  async function savePassword(acc) {
    const pass = passDrafts[acc.id];
    if (pass === undefined || pass === acc.login_password) return flashMsg("Şifrə dəyişməyib.");
    await updateAccount(acc.id, { login_password: pass, password_updated_at: new Date().toISOString() }, "Yeni şifrə yadda saxlandı ✓");
    setPassDrafts((d) => {
      const n = { ...d };
      delete n[acc.id];
      return n;
    });
  }

  async function deleteAccount(acc) {
    const count = (membersByAcc[acc.id] || []).length;
    if (!window.confirm(`${acc.login_email} hesabı və ona bağlı ${count} müştəri silinsin?`)) return;
    const { error } = await supabase.from("shared_accounts").delete().eq("id", acc.id);
    if (error) return flashMsg("Xəta: " + error.message);
    setAccounts((l) => l.filter((a) => a.id !== acc.id));
    setMembers((l) => l.filter((m) => m.account_id !== acc.id));
    flashMsg("Hesab silindi");
  }

  // ---------- Müştəri əməliyyatları ----------
  async function addMember(acc) {
    const phone = skyNormPhone(memberForm.phone);
    if (phone.length < 11) return flashMsg("Nömrəni düzgün yazın.");
    const months = Number(memberForm.months) || 0;
    const days = parseInt(memberForm.days, 10) || 0;
    if (!months && !days) return flashMsg("Müddət seçin: ay və ya gün.");
    const existing = members.find((m) => m.account_id === acc.id && m.phone === phone);
    let data, error;
    if (existing) {
      ({ data, error } = await supabase
        .from("account_members")
        .update({ expires_at: skyAddDuration(existing.expires_at, months, days), name: memberForm.name.trim() || existing.name, room_name: memberForm.room_name.trim(), room_password: memberForm.room_password.trim() })
        .eq("id", existing.id)
        .select()
        .single());
    } else {
      const pin = /^\d{4}$/.test(memberForm.pin) ? memberForm.pin : pinByPhone[phone] || skyRandomPin();
      ({ data, error } = await supabase
        .from("account_members")
        .insert({ account_id: acc.id, phone, pin, name: memberForm.name.trim(), room_name: memberForm.room_name.trim(), room_password: memberForm.room_password.trim(), expires_at: skyAddDuration(null, months, days) })
        .select()
        .single());
    }
    if (error) return flashMsg("Xəta: " + error.message);
    setMembers((l) => (existing ? l.map((m) => (m.id === data.id ? data : m)) : [...l, data]));
    setLastAdded(data.id);
    setMemberForm({ name: "", phone: "", pin: "", months: 1, days: "", room_name: "", room_password: "" });
    flashMsg(existing ? "Müddət uzadıldı ✓" : "Müştəri əlavə edildi ✓");
  }

  async function updateMember(m, patch, okText) {
    const { data, error } = await supabase.from("account_members").update(patch).eq("id", m.id).select().single();
    if (error) return flashMsg("Xəta: " + error.message);
    setMembers((l) => l.map((x) => (x.id === m.id ? data : x)));
    if (okText) flashMsg(okText);
  }

  async function deleteMember(m) {
    if (!window.confirm(`+${m.phone} bu hesabdan silinsin?`)) return;
    const { error } = await supabase.from("account_members").delete().eq("id", m.id);
    if (error) return flashMsg("Xəta: " + error.message);
    setMembers((l) => l.filter((x) => x.id !== m.id));
  }

  function inviteText(m, acc) {
    return (
      `Salam${m.name ? " " + m.name : ""}! ${acc.service || "Hesab"} məlumatlarınız bu linkdədir:\n` +
      `${skyAccountLink(acc.slug)}\n\n` +
      `Nömrə: +${m.phone}\nPIN: ${m.pin}\n\n` +
      `Şifrə dəyişəndə linkdə avtomatik yenilənir. Abunəlik bitmə tarixi: ${skyFmtDate(m.expires_at, false)}`
    );
  }

  function reminderText(m, acc) {
    const expired = new Date(m.expires_at).getTime() < Date.now();
    return expired
      ? `Salam${m.name ? " " + m.name : ""}! ${acc.service || ""} abunəliyinizin vaxtı ${skyFmtDate(m.expires_at, false)} tarixində bitib. Artırmaq üçün bu mesaja cavab yazın.`
      : `Salam${m.name ? " " + m.name : ""}! ${acc.service || ""} abunəliyinizin vaxtı ${skyFmtDate(m.expires_at, false)} tarixində bitir. Artırmaq üçün bu mesaja cavab yazın.`;
  }

  // ---------- Toplu yükləmə ----------
  async function bulkAccounts() {
    const rows = [];
    skyParseRows(bulkAccText).forEach((cells) => {
      const idx = cells.findIndex((c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c));
      if (idx === -1) {
        (cells.join(" ").match(/[^\s,;]+@[^\s,;]+\.[^\s,;]+/g) || []).forEach((em) => rows.push([bulkService.trim(), em, "", ""]));
        return;
      }
      const service = idx > 0 ? cells[idx - 1] : bulkService.trim();
      rows.push([service || bulkService.trim(), cells[idx], cells[idx + 1] || "", cells[idx + 2] || ""]);
    });
    if (!rows.length) return setBulkReport("Heç bir mail tapılmadı. Hər sətirə bir mail yazın.");
    setBulkBusy(true);
    const keyOf = (s, e) => s.toLowerCase() + "|" + e.toLowerCase();
    const existing = {};
    accounts.forEach((a) => (existing[keyOf(a.service || "", a.login_email)] = a));
    const toInsert = new Map();
    const toUpdate = [];
    rows.forEach(([service = "", email, password = "", note = ""]) => {
      const k = keyOf(service, email);
      if (existing[k]) {
        if (password && password !== existing[k].login_password) toUpdate.push({ id: existing[k].id, password });
      } else {
        toInsert.set(k, { service, login_email: email, login_password: password, note, slug: skyMakeSlug(email) });
      }
    });
    let errors = 0;
    const ins = [...toInsert.values()];
    for (let i = 0; i < ins.length; i += 200) {
      const { error } = await supabase.from("shared_accounts").insert(ins.slice(i, i + 200));
      if (error) errors++;
    }
    for (const u of toUpdate) {
      const { error } = await supabase
        .from("shared_accounts")
        .update({ login_password: u.password, password_updated_at: new Date().toISOString() })
        .eq("id", u.id);
      if (error) errors++;
    }
    await loadAll();
    setBulkBusy(false);
    setBulkReport(`Yeni hesab: ${ins.length}. Şifrəsi yenilənən: ${toUpdate.length}.${errors ? ` Xəta: ${errors}.` : ""}`);
    setBulkAccText("");
  }

  async function bulkMembers() {
    const rows = skyParseRows(bulkMemText).filter((r) => r[0] && r[0].includes("@"));
    if (!rows.length) return setBulkReport("Heç bir düzgün sətir tapılmadı. Format: mail | nömrə | bitmə tarixi | ad");
    setBulkBusy(true);
    const accsByEmail = {};
    accounts.forEach((a) => {
      const k = a.login_email.toLowerCase();
      (accsByEmail[k] = accsByEmail[k] || []).push(a);
    });
    const existingByKey = {};
    members.forEach((m) => (existingByKey[m.account_id + "|" + m.phone] = m));
    const pins = { ...pinByPhone };
    const out = new Map();
    const problems = [];
    rows.forEach((r, i) => {
      const [email, rawPhone, rawDate, name = ""] = r;
      const list = accsByEmail[email.toLowerCase()] || [];
      const phone = skyNormPhone(rawPhone);
      const exp = skyParseDate(rawDate);
      if (!list.length) return problems.push(`${email}: hesab tapılmadı`);
      if (list.length > 1) return problems.push(`${email}: bu mail bir neçə servisdə var`);
      if (phone.length < 11) return problems.push(`${email}: nömrə səhvdir (${rawPhone || "boş"})`);
      if (!exp) return problems.push(`${email}: tarix səhvdir (${rawDate || "boş"})`);
      const key = list[0].id + "|" + phone;
      const pin = existingByKey[key]?.pin || pins[phone] || skyRandomPin();
      pins[phone] = pin;
      out.set(key, { account_id: list[0].id, phone, pin, expires_at: exp, name: name || existingByKey[key]?.name || "" });
    });
    const rowsOut = [...out.values()];
    let errors = 0;
    for (let i = 0; i < rowsOut.length; i += 500) {
      const { error } = await supabase.from("account_members").upsert(rowsOut.slice(i, i + 500), { onConflict: "account_id,phone" });
      if (error) {
        errors++;
        problems.push("Yükləmə xətası: " + error.message);
      }
    }
    await loadAll();
    setBulkBusy(false);
    setBulkReport(
      `Yüklənən müştəri: ${rowsOut.length}.` +
        (problems.length ? ` Problemli sətir: ${problems.length}\n` + problems.slice(0, 30).join("\n") + (problems.length > 30 ? "\n..." : "") : "")
    );
    if (!errors) setBulkMemText("");
  }

  function readFile(file, setter) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(String(reader.result || ""));
    reader.readAsText(file);
  }

  // ---------- Kiçik komponentlər ----------
  const S = {
    box: { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: 16, marginBottom: 12 },
    input: { width: "100%", background: "var(--bg)", color: "var(--text)", border: "1px solid var(--line)", borderRadius: 10, padding: "10px 12px", fontSize: 15 },
    row: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
    small: { fontSize: 12, color: "var(--muted)" },
    chip: (active) => ({
      padding: "8px 13px", borderRadius: 999, fontSize: 13, cursor: "pointer",
      border: "1px solid " + (active ? "var(--gold)" : "var(--line)"),
      background: active ? "var(--gold)" : "transparent", color: active ? "#fff" : "var(--text)",
    }),
    mini: { padding: "7px 10px", borderRadius: 8, fontSize: 12, border: "1px solid var(--line)", background: "var(--bg)", color: "var(--text)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 },
  };

  function DaysBadge({ date }) {
    const d = skyDaysLeft(date);
    const expired = new Date(date).getTime() < Date.now();
    const color = expired ? "#9a9a9a" : d <= 3 ? "var(--gold)" : "#1f9d55";
    return (
      <span style={{ fontSize: 12, fontWeight: 600, color, whiteSpace: "nowrap" }}>
        {expired ? "Bitib" : d <= 1 ? "Bu gün/sabah" : `${d} gün`}
      </span>
    );
  }

  function MemberRow({ m, showAccount }) {
    const acc = accById[m.account_id];
    if (!acc) return null;
    const highlight = lastAdded === m.id;
    return (
      <div style={{ borderTop: "1px solid var(--line)", padding: "10px 0", background: highlight ? "rgba(31,157,85,0.08)" : "transparent" }}>
        {showAccount && (
          <div style={{ ...S.small, marginBottom: 2 }}>
            {acc.service} — {acc.login_email}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>
              +{m.phone} {m.name && <span style={{ fontWeight: 400, color: "var(--muted)" }}>· {m.name}</span>}
            </div>
            <div style={S.small}>PIN {m.pin} · bitir {skyFmtDate(m.expires_at)}</div>
            {(m.room_name || m.room_password) && (
              <div style={S.small}>Otaq: {m.room_name || "—"}{m.room_password ? " · şifrə " + m.room_password : ""}</div>
            )}
          </div>
          <DaysBadge date={m.expires_at} />
        </div>
        <div style={{ ...S.row, marginTop: 8 }}>
          <button style={S.mini} onClick={() => updateMember(m, { expires_at: skyAddMonths(m.expires_at, 1) }, "+1 ay əlavə edildi ✓")}>
            <Plus size={12} /> 1 ay
          </button>
          <button
            style={S.mini}
            onClick={() => {
              const v = parseInt(window.prompt("Neçə gün əlavə edilsin?", "7") || "", 10);
              if (v > 0) updateMember(m, { expires_at: skyAddDays(m.expires_at, v) }, `+${v} gün əlavə edildi ✓`);
            }}
          >
            <Plus size={12} /> Gün
          </button>
          <a style={S.mini} href={skyWaUrl(m.phone, inviteText(m, acc))} target="_blank" rel="noreferrer">
            <Send size={12} /> Link göndər
          </a>
          <a style={S.mini} href={skyWaUrl(m.phone, reminderText(m, acc))} target="_blank" rel="noreferrer">
            <Clock size={12} /> Xatırlat
          </a>
          {new Date(m.expires_at).getTime() > Date.now() && (
            <button style={S.mini} onClick={() => updateMember(m, { expires_at: new Date(Date.now() - 1000).toISOString() }, "Giriş bağlandı")}>
              <Ban size={12} /> Bağla
            </button>
          )}
          <button
            style={S.mini}
            onClick={() => {
              const rn = window.prompt("Otaq / profil adı:", m.room_name || "");
              if (rn === null) return;
              const rp = window.prompt("Otaq şifrəsi (yoxdursa boş buraxın):", m.room_password || "");
              if (rp === null) return;
              updateMember(m, { room_name: rn.trim(), room_password: rp.trim() }, "Otaq məlumatı yeniləndi ✓");
            }}
          >
            <KeyRound size={12} /> Otaq
          </button>
          <button style={{ ...S.mini, color: "var(--gold)" }} onClick={() => deleteMember(m)}>
            <Trash2 size={12} /> Sil
          </button>
        </div>
      </div>
    );
  }

  const phoneResults = React.useMemo(() => {
    const q = phoneSearch.replace(/\D/g, "");
    if (q.length < 4) return [];
    const norm = skyNormPhone(phoneSearch);
    return members.filter((m) => m.phone.includes(q) || m.phone === norm);
  }, [members, phoneSearch]);

  const expiringList = React.useMemo(() => {
    const t = Date.now();
    return members
      .filter((m) => {
        const e = new Date(m.expires_at).getTime();
        if (expFilter === "soon") return e >= t && e - t <= 3 * 86400000;
        return e < t && t - e <= 7 * 86400000;
      })
      .sort((a, b) => new Date(a.expires_at) - new Date(b.expires_at));
  }, [members, expFilter]);

  const RESULT_LABELS = { ok: ["Baxdı", "#1f9d55"], expired: ["Vaxtı bitib", "#b7791f"], wrong: ["Səhv PIN/nömrə", "var(--gold)"], blocked: ["Bloklandı", "var(--gold)"] };

  return (
    <div style={{ marginTop: 28 }}>

      {open && (
        <div>
          {msg && <div className="ad-status">{msg}</div>}
          {loadError && <div style={{ ...S.box, color: "var(--gold)" }}>{loadError}</div>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, marginBottom: 14 }}>
            {[
              ["Hesab", accounts.length, () => { setTab("accounts"); setNoPassOnly(false); }],
              ["Şifrəsiz hesab", noPassCount, () => { setTab("accounts"); setNoPassOnly(true); }],
              ["Aktiv müştəri", stats.active, () => setTab("accounts")],
              ["3 günə bitən", stats.soon, () => { setTab("expiring"); setExpFilter("soon"); }],
              ["Vaxtı bitən", stats.expired, () => { setTab("expiring"); setExpFilter("expired"); }],
            ].map(([label, value, onClick]) => (
              <button key={label} onClick={onClick} style={{ ...S.box, marginBottom: 0, textAlign: "left", cursor: "pointer", color: "var(--text)" }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700 }}>{loading ? "…" : value}</div>
                <div style={S.small}>{label}</div>
              </button>
            ))}
          </div>

          <div style={{ ...S.row, marginBottom: 14 }}>
            {[
              ["accounts", "Hesablar"],
              ["phone", "Nömrə ilə axtar"],
              ["expiring", "Bitənlər"],
              ["bulk", "Toplu yükləmə"],
              ["codes", "Netflix kodları"],
              ["logs", "Giriş tarixçəsi"],
            ].map(([key, label]) => (
              <button
                key={key}
                style={S.chip(tab === key)}
                onClick={() => {
                  setTab(key);
                  if (key === "logs") loadLogs();
                  if (key === "codes") loadCodes();
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "accounts" && (
            <>
              <div style={S.box}>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Yeni hesab</div>
                <div style={{ display: "grid", gap: 8 }}>
                  <input style={S.input} placeholder="Servis (məs. Netflix)" value={newAcc.service} onChange={(e) => setNewAcc({ ...newAcc, service: e.target.value })} />
                  <input style={S.input} placeholder="Mail / login" autoCapitalize="none" value={newAcc.login_email} onChange={(e) => setNewAcc({ ...newAcc, login_email: e.target.value })} />
                  <input style={S.input} placeholder="Şifrə (sonra da yazmaq olar)" autoCapitalize="none" value={newAcc.login_password} onChange={(e) => setNewAcc({ ...newAcc, login_password: e.target.value })} />
                  <input style={S.input} placeholder="Müştəriyə qeyd (istəyə bağlı, məs. Profil 3)" value={newAcc.note} onChange={(e) => setNewAcc({ ...newAcc, note: e.target.value })} />
                  <button className="ab-btn ab-btn-gold" style={{ alignSelf: "flex-start" }} onClick={addAccount}>
                    <Plus size={15} /> Hesab əlavə et
                  </button>
                </div>
              </div>

              <div style={{ position: "relative", marginBottom: 12 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "var(--muted)" }} />
                <input style={{ ...S.input, paddingLeft: 36 }} placeholder="Mail və ya servis axtar..." value={search} onChange={(e) => { setSearch(e.target.value); setShowCount(40); }} />
              </div>

              <div style={{ ...S.row, marginBottom: 12 }}>
                <button style={S.chip(!noPassOnly)} onClick={() => setNoPassOnly(false)}>Hamısı</button>
                <button style={S.chip(noPassOnly)} onClick={() => setNoPassOnly(true)}>Şifrəsizlər ({noPassCount})</button>
                <button
                  style={{ ...S.chip(selectMode), marginLeft: "auto" }}
                  onClick={() => {
                    setSelectMode((v) => !v);
                    setSelected({});
                  }}
                >
                  {selectMode ? "Seçimi bağla" : "Toplu sil"}
                </button>
              </div>

              {selectMode && (
                <div style={{ ...S.box, ...S.row, position: "sticky", top: 8, zIndex: 5 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{Object.values(selected).filter(Boolean).length} seçilib</span>
                  <button
                    style={S.mini}
                    onClick={() => {
                      const all = {};
                      filteredAccounts.forEach((a) => (all[a.id] = true));
                      setSelected(all);
                    }}
                  >
                    Görünənlərin hamısı ({filteredAccounts.length})
                  </button>
                  <button style={S.mini} onClick={() => setSelected({})}>Təmizlə</button>
                  <button className="ab-btn ab-btn-gold" style={{ marginLeft: "auto" }} onClick={deleteSelected}>
                    <Trash2 size={15} /> Seçilənləri sil
                  </button>
                </div>
              )}

              {loading && <p style={S.small}>Yüklənir...</p>}
              {!loading && !filteredAccounts.length && <p style={S.small}>Hesab tapılmadı. Yuxarıdan əlavə edin və ya "Toplu yükləmə"dan istifadə edin.</p>}

              {filteredAccounts.slice(0, showCount).map((acc) => {
                const list = (membersByAcc[acc.id] || []).slice().sort((a, b) => new Date(a.expires_at) - new Date(b.expires_at));
                const activeCount = list.filter((m) => new Date(m.expires_at).getTime() >= now).length;
                const isOpen = expanded === acc.id;
                return (
                  <div key={acc.id} style={{ ...S.box, opacity: acc.is_active ? 1 : 0.6, display: selectMode ? "flex" : "block", gap: 12, alignItems: "center" }}>
                    {selectMode && (
                      <input
                        type="checkbox"
                        aria-label={"Seç: " + acc.login_email}
                        checked={!!selected[acc.id]}
                        onChange={(e) => setSelected((sel) => ({ ...sel, [acc.id]: e.target.checked }))}
                        style={{ width: 22, height: 22, accentColor: "var(--gold)", flexShrink: 0 }}
                      />
                    )}
                    <button
                      onClick={() => { if (selectMode) return setSelected((sel) => ({ ...sel, [acc.id]: !sel[acc.id] })); setExpanded(isOpen ? null : acc.id); setLastAdded(null); setMemberForm({ name: "", phone: "", pin: "", months: 1, days: "", room_name: "", room_password: "" }); }}
                      style={{ background: "none", border: 0, color: "var(--text)", width: "100%", textAlign: "left", cursor: "pointer", padding: 0 }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{acc.login_email}</div>
                          <div style={S.small}>
                            {acc.service || "Servis yazılmayıb"}
                            {!acc.is_active && " · deaktiv"}
                            {!acc.login_password && <span style={{ color: "var(--gold)", fontWeight: 600 }}> · şifrə yoxdur</span>}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 12, whiteSpace: "nowrap" }}>
                          <div style={{ color: "#1f9d55", fontWeight: 600 }}>{activeCount} aktiv</div>
                          <div style={S.small}>{list.length - activeCount} bitib</div>
                        </div>
                      </div>
                    </button>

                    {isOpen && !selectMode && (
                      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                        <div>
                          <div style={S.small}>Müştəri linki</div>
                          <div style={{ ...S.row, marginTop: 4 }}>
                            <code style={{ fontSize: 12, wordBreak: "break-all", flex: 1 }}>{skyAccountLink(acc.slug)}</code>
                            <button style={S.mini} onClick={async () => (await skyCopy(skyAccountLink(acc.slug))) && flashMsg("Link kopyalandı ✓")}>
                              <Copy size={12} /> Kopyala
                            </button>
                          </div>
                        </div>

                        <div>
                          <div style={S.small}>Şifrə (son dəyişmə: {skyFmtDate(acc.password_updated_at)})</div>
                          <div style={{ ...S.row, marginTop: 4, flexWrap: "nowrap" }}>
                            <input
                              style={S.input}
                              autoCapitalize="none"
                              value={passDrafts[acc.id] ?? acc.login_password}
                              onChange={(e) => setPassDrafts({ ...passDrafts, [acc.id]: e.target.value })}
                            />
                            <button className="ab-btn ab-btn-gold" style={{ whiteSpace: "nowrap" }} onClick={() => savePassword(acc)}>
                              Yadda saxla
                            </button>
                          </div>
                        </div>

                        <div>
                          <div style={S.small}>Müştəriyə görünən qeyd</div>
                          <div style={{ ...S.row, marginTop: 4, flexWrap: "nowrap" }}>
                            <input style={S.input} value={noteDrafts[acc.id] ?? acc.note ?? ""} onChange={(e) => setNoteDrafts({ ...noteDrafts, [acc.id]: e.target.value })} />
                            <button style={S.mini} onClick={() => updateAccount(acc.id, { note: noteDrafts[acc.id] ?? acc.note ?? "" }, "Qeyd saxlandı ✓")}>Saxla</button>
                          </div>
                        </div>

                        <div style={S.row}>
                          <button
                            style={S.mini}
                            onClick={() =>
                              window.confirm("Köhnə link işləməyəcək. Aktiv müştərilərə yeni linki göndərməli olacaqsınız. Davam edilsin?") &&
                              updateAccount(acc.id, { slug: skyMakeSlug(acc.login_email) }, "Yeni link yaradıldı ✓")
                            }
                          >
                            <RotateCw size={12} /> Yeni link yarat
                          </button>
                          <button style={S.mini} onClick={() => updateAccount(acc.id, { is_active: !acc.is_active }, acc.is_active ? "Hesab deaktiv edildi" : "Hesab aktiv edildi ✓")}>
                            <Ban size={12} /> {acc.is_active ? "Deaktiv et" : "Aktiv et"}
                          </button>
                          <button style={{ ...S.mini, color: "var(--gold)" }} onClick={() => deleteAccount(acc)}>
                            <Trash2 size={12} /> Hesabı sil
                          </button>
                        </div>

                        <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, padding: 12 }}>
                          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Müştəri əlavə et / uzat</div>
                          <div style={{ display: "grid", gap: 8 }}>
                            <input style={S.input} type="tel" placeholder="WhatsApp nömrəsi (050 123 45 67)" value={memberForm.phone} onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })} />
                            <div style={{ ...S.row, flexWrap: "nowrap" }}>
                              <input style={S.input} placeholder="Ad (istəyə bağlı)" value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} />
                              <input
                                style={{ ...S.input, maxWidth: 110 }}
                                inputMode="numeric"
                                maxLength={4}
                                placeholder="PIN (avto)"
                                value={memberForm.pin}
                                onChange={(e) => setMemberForm({ ...memberForm, pin: e.target.value.replace(/\D/g, "") })}
                              />
                            </div>
                            <div style={{ ...S.row, flexWrap: "nowrap" }}>
                              <input style={S.input} placeholder="Otaq / profil adı (məs. Otaq 1)" value={memberForm.room_name} onChange={(e) => setMemberForm({ ...memberForm, room_name: e.target.value })} />
                              <input style={{ ...S.input, maxWidth: 130 }} placeholder="Otaq şifrəsi" value={memberForm.room_password} onChange={(e) => setMemberForm({ ...memberForm, room_password: e.target.value })} />
                            </div>
                            <div style={S.row}>
                              {[1, 2, 3, 6, 12].map((mo) => (
                                <button key={mo} style={S.chip(memberForm.months === mo && !memberForm.days)} onClick={() => setMemberForm({ ...memberForm, months: mo, days: "" })}>
                                  {mo} ay
                                </button>
                              ))}
                              <input
                                style={{ ...S.input, width: 110, padding: "8px 10px", borderColor: memberForm.days ? "var(--gold)" : "var(--line)" }}
                                inputMode="numeric"
                                placeholder="və ya gün"
                                value={memberForm.days}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                  setMemberForm({ ...memberForm, days: v, months: v ? 0 : 1 });
                                }}
                              />
                            </div>
                            <button className="ab-btn ab-btn-gold" style={{ alignSelf: "flex-start" }} onClick={() => addMember(acc)}>
                              <CheckCircle2 size={15} /> Təsdiqlə
                            </button>
                            <div style={S.small}>Ay seçin və ya gün sayını yazın. Nömrə bu hesabda artıq varsa, müddət üstünə gəlir. PIN boş qalsa avtomatik yaranır.</div>
                          </div>
                        </div>

                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>Müştərilər ({list.length})</div>
                          {!list.length && <p style={S.small}>Hələ müştəri yoxdur.</p>}
                          {list.map((m) => (
                            <MemberRow key={m.id} m={m} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredAccounts.length > showCount && (
                <button className="ab-btn ab-btn-ghost" onClick={() => setShowCount((c) => c + 40)}>
                  Daha çox göstər ({filteredAccounts.length - showCount})
                </button>
              )}
            </>
          )}

          {tab === "phone" && (
            <div style={S.box}>
              <input style={S.input} type="tel" placeholder="Nömrə yazın (ən az 4 rəqəm)" value={phoneSearch} onChange={(e) => setPhoneSearch(e.target.value)} />
              {phoneSearch.replace(/\D/g, "").length >= 4 && !phoneResults.length && <p style={S.small}>Bu nömrə heç bir hesabda yoxdur.</p>}
              {phoneResults.slice(0, 50).map((m) => (
                <MemberRow key={m.id} m={m} showAccount />
              ))}
            </div>
          )}

          {tab === "expiring" && (
            <div style={S.box}>
              <div style={{ ...S.row, marginBottom: 8 }}>
                <button style={S.chip(expFilter === "soon")} onClick={() => setExpFilter("soon")}>3 gün ərzində bitənlər</button>
                <button style={S.chip(expFilter === "expired")} onClick={() => setExpFilter("expired")}>Son 7 gündə bitənlər</button>
              </div>
              {!expiringList.length && <p style={S.small}>Siyahı boşdur.</p>}
              {expiringList.slice(0, 200).map((m) => (
                <MemberRow key={m.id} m={m} showAccount />
              ))}
            </div>
          )}

          {tab === "bulk" && (
            <>
              {bulkReport && <div style={{ ...S.box, whiteSpace: "pre-wrap", fontSize: 13 }}>{bulkReport}</div>}
              <div style={S.box}>
                <div style={{ fontWeight: 600 }}>1. Mailləri toplu əlavə et</div>
                <p style={S.small}>
                  Hər sətirə bir mail yazın və ya siyahını yapışdırın. Şifrəni sonra "Hesablar" bölməsindən əlavə edərsiniz. İstəsəniz Excel-dən{" "}
                  <b>servis | mail | şifrə</b> sütunlarını da yapışdıra bilərsiniz.
                </p>
                <input style={{ ...S.input, marginBottom: 8 }} placeholder="Servis (hamısı üçün, məs. Netflix) — istəyə bağlı" value={bulkService} onChange={(e) => setBulkService(e.target.value)} />
                <textarea style={{ ...S.input, minHeight: 110, fontFamily: "monospace", fontSize: 12 }} value={bulkAccText} onChange={(e) => setBulkAccText(e.target.value)} placeholder={"turgut@gmail.com\nali@gmail.com\nnigar@gmail.com"} />
                <div style={{ ...S.row, marginTop: 8 }}>
                  <input type="file" accept=".csv,.txt,.tsv" onChange={(e) => readFile(e.target.files[0], setBulkAccText)} />
                  <button className="ab-btn ab-btn-gold" disabled={bulkBusy} onClick={bulkAccounts}>
                    <Upload size={15} /> {bulkBusy ? "Yüklənir..." : "Mailləri əlavə et"}
                  </button>
                </div>
              </div>
              <div style={{ ...S.box, borderColor: "var(--gold)" }}>
                <div style={{ fontWeight: 600 }}>Mailləri toplu sil</div>
                <p style={S.small}>
                  Silinəcək mailləri yapışdırın. Hesablarla birlikdə onlara bağlı müştərilər də silinir. Yuxarıda servis yazılıbsa, yalnız həmin servisdəki hesablar silinir.
                </p>
                <textarea style={{ ...S.input, minHeight: 90, fontFamily: "monospace", fontSize: 12 }} value={bulkDelText} onChange={(e) => setBulkDelText(e.target.value)} placeholder={"turgut@gmail.com\nali@gmail.com"} />
                <button className="ab-btn ab-btn-ghost" style={{ marginTop: 8, color: "var(--gold)", borderColor: "var(--gold)" }} disabled={bulkBusy} onClick={bulkDeleteByEmails}>
                  <Trash2 size={15} /> {bulkBusy ? "Silinir..." : "Mailləri sil"}
                </button>
              </div>
              <div style={S.box}>
                <div style={{ fontWeight: 600 }}>2. Müştəriləri yüklə</div>
                <p style={S.small}>
                  Sütunlar: <b>mail | nömrə | bitmə tarixi | ad</b>. Tarix: 15.10.2026. Əvvəlcə hesablar yüklənmiş olmalıdır. Eyni nömrəyə hər hesabda eyni PIN
                  verilir; mövcud müştərinin tarixi yenisi ilə əvəzlənir.
                </p>
                <textarea style={{ ...S.input, minHeight: 110, fontFamily: "monospace", fontSize: 12 }} value={bulkMemText} onChange={(e) => setBulkMemText(e.target.value)} placeholder={"turgut@gmail.com\t0501234567\t15.10.2026\tƏli"} />
                <div style={{ ...S.row, marginTop: 8 }}>
                  <input type="file" accept=".csv,.txt,.tsv" onChange={(e) => readFile(e.target.files[0], setBulkMemText)} />
                  <button className="ab-btn ab-btn-gold" disabled={bulkBusy} onClick={bulkMembers}>
                    <Upload size={15} /> {bulkBusy ? "Yüklənir..." : "Müştəriləri yüklə"}
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === "codes" && (
            <div style={S.box}>
              <div style={{ ...S.row, justifyContent: "space-between", marginBottom: 6 }}>
                <span style={S.small}>Son 100 gələn kod (hər hesabda son 10 saxlanılır)</span>
                <button style={S.mini} onClick={loadCodes}><RotateCw size={12} /> Yenilə</button>
              </div>
              {!codes.length && <p style={S.small}>Hələ kod gəlməyib. Yönləndirmə və script qurulandan sonra buraya düşəcək.</p>}
              {codes.map((c) => {
                const acc = accById[c.account_id];
                const fresh = Date.now() - new Date(c.received_at).getTime() < 15 * 60000;
                return (
                  <div key={c.id} style={{ borderTop: "1px solid var(--line)", padding: "9px 0", display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: 16 }}>
                        {c.code || (c.link ? "🔗 təsdiq linki" : "—")}
                      </div>
                      <div style={{ ...S.small, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {c.to_email}{!c.account_id && <span style={{ color: "var(--gold)" }}> · tanınmayan mail</span>} · {skyFmtDate(c.received_at)}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: fresh ? "#1f9d55" : "var(--muted)", whiteSpace: "nowrap" }}>{fresh ? "aktiv" : "köhnə"}</span>
                      {c.code && <button style={S.mini} onClick={async () => (await skyCopy(c.code)) && flashMsg("Kod kopyalandı ✓")}><Copy size={12} /></button>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "logs" && (
            <div style={S.box}>
              <div style={{ ...S.row, justifyContent: "space-between", marginBottom: 6 }}>
                <span style={S.small}>Son 150 giriş cəhdi</span>
                <div style={S.row}>
                  <button style={S.mini} onClick={loadLogs}><RotateCw size={12} /> Yenilə</button>
                  <button
                    style={S.mini}
                    onClick={async () => {
                      await supabase.rpc("cleanup_account_logs");
                      loadLogs();
                      flashMsg("60 gündən köhnə qeydlər silindi");
                    }}
                  >
                    <Trash2 size={12} /> Köhnəni sil
                  </button>
                </div>
              </div>
              {!logs.length && <p style={S.small}>Hələ giriş yoxdur.</p>}
              {logs.map((l) => {
                const [label, color] = RESULT_LABELS[l.result] || [l.result, "var(--muted)"];
                return (
                  <div key={l.id} style={{ borderTop: "1px solid var(--line)", padding: "8px 0", display: "flex", justifyContent: "space-between", gap: 8, fontSize: 13 }}>
                    <div style={{ minWidth: 0 }}>
                      <div>+{l.phone || "—"}</div>
                      <div style={{ ...S.small, overflow: "hidden", textOverflow: "ellipsis" }}>{accById[l.account_id]?.login_email || "silinmiş hesab"} · {skyFmtDate(l.created_at)}</div>
                    </div>
                    <span style={{ color, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
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

function MainApp() {
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
      <VideoWidget videoId="PSxCaYZpl1o" />
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
        .ab-music-btn{
          position:fixed; bottom:158px; right:22px; z-index:56;
          width:52px; height:52px; border-radius:50%;
          background:var(--surface); color:var(--gold); border:1px solid var(--line);
          display:flex; align-items:center; justify-content:center; cursor:pointer;
          box-shadow:0 12px 26px -10px rgba(0,0,0,0.3);
        }

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

// Hesab linki (#h-...) açılanda yalnız hesab səhifəsi göstərilir
function getSharedSlug() {
  const h = window.location.hash.replace("#", "");
  if (h === "abunelikidare" || window.location.pathname.replace(/\/+$/, "") === "/abunelikidare") return "__manager__";
  return h.startsWith("h-") ? h.slice(2) : null;
}

export default function App() {
  const [slug, setSlug] = useState(getSharedSlug);
  useEffect(() => {
    const onHash = () => setSlug(getSharedSlug());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  if (slug === "__manager__") return <SubscriptionManagerPage />;
  if (slug) return <SharedAccountPage key={slug} slug={slug} />;
  return <MainApp />;
}
