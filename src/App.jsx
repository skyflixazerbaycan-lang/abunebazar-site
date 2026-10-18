import React, { useEffect, useRef, useState } from "react";
import { Shield, Clock, MessageCircle, Ticket, ChevronRight, Star, Menu, X, User, ShoppingCart, Minus, Plus, Play, Pause, VolumeX, Wallet, Ban, Send, CheckCircle2, LayoutGrid, Tv, Music2, Bot, Zap, BadgeCheck, Headset, Gamepad2, MessageSquare, Sun, Moon, Film, Book, Dumbbell, Palette, Camera, Briefcase, Copy, Gift, CreditCard, RotateCw, Tag, Search, KeyRound, Trash2, Eye, EyeOff, Upload, FileText, ChevronDown, Bell } from "lucide-react";
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

function TicketCard({ p, onAdd, t, reviews, onOpenReviews, go, fav, onFav }) {
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
        {onFav && (
          <button className="ab-fav-btn" onClick={(e) => { e.stopPropagation(); onFav(p.id); }} aria-label="Favori" title="Favorilərə əlavə et">
            <Star size={18} fill={fav ? "#E1122A" : "none"} color={fav ? "#E1122A" : "#fff"} strokeWidth={2} />
          </button>
        )}
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

function HomePage({ go, products, onAdd, lang, t, reviews, onOpenReviews, favorites, onFav }) {
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
              <TicketCard p={p} onAdd={onAdd} t={t} reviews={reviews} onOpenReviews={onOpenReviews} go={go} fav={(favorites||[]).includes(p.id)} onFav={onFav} />
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

function PaketlerPage({ products, onAdd, t, reviews, onOpenReviews, categories, go, favorites, onFav }) {
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
            <TicketCard p={p} onAdd={onAdd} t={t} reviews={reviews} onOpenReviews={onOpenReviews} go={go} fav={(favorites||[]).includes(p.id)} onFav={onFav} />
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
const PAY_CARD_NAME = "Əzizov Turqut";
const PAY_CARD_BANK = "ABB";
const PAY_CARD_NUMBER = "5583902131752496";

// Balans artırma cashback pillələri
const CASHBACK_TIERS = [
  { amount: 10, cashback: 1 },
  { amount: 15, cashback: 2 },
  { amount: 20, cashback: 3 },
  { amount: 40, cashback: 5 },
  { amount: 50, cashback: 7 },
];
function cashbackFor(amount) {
  let cb = 0;
  for (const t of CASHBACK_TIERS) if (amount >= t.amount) cb = t.cashback;
  return cb;
}

function BalanceTopUp({ user, profile, whatsapp, onClose, onDone }) {
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [showRules, setShowRules] = useState(false);

  const amt = Math.max(0, parseFloat(String(amount).replace(",", ".")) || 0);
  const cb = cashbackFor(amt);
  const waDigits = String(whatsapp || "517873090").replace(/[^0-9]/g, "");

  async function copyCard() {
    try { await navigator.clipboard.writeText(PAY_CARD_NUMBER); setMsg("Kart nömrəsi kopyalandı ✓"); setTimeout(() => setMsg(""), 1500); } catch {}
  }

  async function submit() {
    setMsg("");
    if (amt < 1) return setMsg("Minimum balans artırma 1 ₼-dır.");
    if (!file) return setMsg("Ödəniş qəbzini (şəkil) yükləyin.");
    if (!agree) return setMsg("Ödəniş şərtlərini qəbul edin.");
    setBusy(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = user.id + "/" + Date.now() + "." + ext;
      const up = await supabase.storage.from("receipts").upload(path, file, { upsert: false });
      if (up.error) throw up.error;
      const { data: pub } = supabase.storage.from("receipts").getPublicUrl(path);
      const { error } = await supabase.from("balance_requests").insert({
        user_id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || "",
        amount: amt,
        cashback: cb,
        receipt_url: pub.publicUrl,
        method: "card",
        status: "pending",
      });
      if (error) throw error;
      // WhatsApp-a bildiriş
      const txt = `Salam! Balans artırma sorğusu göndərdim.\nAd: ${user.user_metadata?.full_name || "-"}\nMail: ${user.email}\nMəbləğ: ${amt.toFixed(2)} ₼${cb ? " (+" + cb + " ₼ cashback)" : ""}\nQəbzi yüklədim. Təsdiqləyəndə balansıma köçürün.`;
      window.open(`https://wa.me/${waDigits}?text=${encodeURIComponent(txt)}`, "_blank");
      onDone && onDone();
      setMsg("Sorğu göndərildi ✓ İş saatları (12:00–23:59) daxilində operator təsdiqləyəcək.");
      setAmount(""); setFile(null); setAgree(false);
    } catch (e) {
      setMsg("Xəta: " + (e.message || e));
    }
    setBusy(false);
  }

  return (
    <div className="ab-topup">
      {msg && <div className="ab-topup-msg">{msg}</div>}

      <label className="ab-topup-field">
        <span>Balans məbləği (₼) — minimum 1 ₼</span>
        <input type="number" min="1" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="məs. 10" />
      </label>

      <div className="ab-topup-tiers">
        {CASHBACK_TIERS.map((t) => (
          <button key={t.amount} className={"ab-tier" + (amt === t.amount ? " active" : "")} onClick={() => setAmount(String(t.amount))}>
            <b>{t.amount} ₼ artır</b>
            <span>+{t.cashback} ₼ cashback</span>
          </button>
        ))}
      </div>
      {amt >= 1 && (
        <div className="ab-topup-sum">
          Ödəniləcək: <b>{amt.toFixed(2)} ₼</b>{cb > 0 && <> · Cashback: <b style={{ color: "var(--gold)" }}>+{cb} ₼</b></>}
        </div>
      )}

      <div className="ab-topup-card">
        <div className="ab-topup-card-row"><span>Ad</span><strong>{PAY_CARD_NAME}</strong></div>
        <div className="ab-topup-card-row"><span>Bank</span><strong>{PAY_CARD_BANK}</strong></div>
        <div className="ab-topup-card-row">
          <span>Kart</span>
          <strong style={{ letterSpacing: 1 }}>{formatCardNumber(PAY_CARD_NUMBER)}</strong>
        </div>
        <button className="ab-btn ab-btn-ghost" style={{ marginTop: 8 }} onClick={copyCard}><Copy size={14} /> Kartı kopyala</button>
      </div>

      <label className="ab-topup-file">
        <Upload size={16} /> {file ? file.name : "Ödəniş qəbzini yüklə (şəkil)"}
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
      </label>

      <button className="ab-topup-ruleslink" onClick={() => setShowRules((v) => !v)}>
        {showRules ? "Ödəniş şərtlərini gizlət" : "Ödəniş şərtlərini oxu"}
      </button>
      {showRules && (
        <div className="ab-topup-rules">
          <p>• Balans artırma işləmi iş saatları (12:00–23:59) daxilində operator tərəfindən yoxlanılıb təsdiqləndikdən sonra balansınıza köçürülür, daha sonra istifadə edə biləcəksiniz.</p>
          <p>• Yalnız göstərilən karta ({PAY_CARD_NAME}, {PAY_CARD_BANK}) ödəniş edin. Fərqli hesaba edilən ödənişlər qəbul olunmur.</p>
          <p>• Cashback minimum 10 ₼ toplandıqdan sonra balansa köçürülə bilər və yalnız sayt daxilində seçilmiş məhsullardan istifadə edilə bilər.</p>
          <p>• Qəbzi düzgün və oxunaqlı yükləyin. Saxta qəbz göndərilməsi hesabın bloklanmasına səbəb olur.</p>
        </div>
      )}

      <label className="ab-topup-agree">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>Ödəniş ilə bağlı şərtləri qəbul edirəm</span>
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <button className="ab-btn ab-btn-gold" disabled={busy} onClick={submit} style={{ flex: 1 }}>
          {busy ? "Göndərilir..." : "Ödədim, qəbzi göndər"}
        </button>
        <button className="ab-btn ab-btn-ghost" onClick={onClose}>Bağla</button>
      </div>
    </div>
  );
}


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
  const [balance, setBalance] = useState(0);
  const [payAgree, setPayAgree] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const [payMsg, setPayMsg] = useState("");
  const [payBusy, setPayBusy] = useState(false);

  function localPromoKey(uid) {
    return `skyflix_promo_uses_${uid}`;
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        supabase.from("profiles").select("balance").eq("id", data.session.user.id).single().then(({ data: pr }) => { if (pr) setBalance(Number(pr.balance || 0)); });
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

  const balancePaidMessage = `Salam! Balansımla ödəniş etdim.\nAd: ${session?.user?.user_metadata?.full_name || "-"}\nMail: ${session?.user?.email || "-"}\nSifariş:\n${orderSummary}\n\nBalansdan ${total.toFixed(2)} ₼ çıxıldı. Sifarişimi hazırlayın.`;
  const balanceWaLink = `https://wa.me/${digits}?text=${encodeURIComponent(balancePaidMessage)}`;

  async function payWithBalance() {
    setPayMsg("");
    if (!session) return setPayMsg("Ödəniş üçün hesabınıza daxil olun.");
    if (balance < total) return setPayMsg("Balansınız kifayət etmir. Balansı artırın və ya kartdan karta ödəyin.");
    setPayBusy(true);
    try {
      // balansdan təhlükəsiz çıx (server RPC)
      const { data, error } = await supabase.rpc("pay_with_balance", { p_amount: total });
      if (error) throw error;
      if (data?.status === "insufficient") { setPayBusy(false); return setPayMsg("Balansınız kifayət etmir."); }
      if (data?.status !== "ok") { setPayBusy(false); return setPayMsg("Ödəniş alınmadı. Yenidən yoxlayın."); }
      logOrder();
      setBalance(Number(data.new_balance));
      // Faktura emaili (uğursuz olsa ödənişi pozmaz)
      try {
        await supabase.functions.invoke("send-receipt", { body: {
          customerName: session.user.user_metadata?.full_name || "",
          customerEmail: session.user.email,
          items: cart.map((i) => ({ name: i.name + (i.variantMonths ? " — " + i.variantMonths + " ay" : ""), qty: i.qty, price: i.price })),
          total: total,
          method: "Balans (nağdsız)",
        }});
      } catch (e) {}
      window.open(balanceWaLink, "_blank");
      setPayMsg("Ödəniş edildi ✓ Qəbz email ünvanınıza göndərildi. Sifarişiniz WhatsApp-a göndərildi.");
    } catch (e) {
      setPayMsg("Xəta: " + (e.message || e));
    }
    setPayBusy(false);
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
        ) : !payAgree ? (
          <div className="ab-pay-card">
            <div className="ab-pay-card-head"><Shield size={18} /> Sayt daxili qaydalar</div>
            <div className="ab-topup-rules" style={{ marginTop: 6 }}>
              <p>• Sifariş təsdiqləndikdən sonra hesablar hazırlanıb WhatsApp üzərindən göndərilir.</p>
              <p>• Balansla ödənişdə məbləğ dərhal balansdan çıxılır və sifariş operatora düşür.</p>
              <p>• Kartdan karta ödənişdə göstərilən karta ({PAY_CARD_NAME}) ödəyib qəbzi göndərməlisiniz.</p>
              <p>• Rəqəmsal məhsul olduğu üçün təhvil verildikdən sonra geri qaytarılma yoxdur.</p>
            </div>
            {payMsg && <p className="ad-error" style={{ marginTop: 8 }}>{payMsg}</p>}
            <label className="ab-topup-agree" style={{ marginTop: 10 }}>
              <input type="checkbox" checked={payAgree} onChange={(e) => setPayAgree(e.target.checked)} />
              <span>Sayt daxili qaydaları qəbul edirəm</span>
            </label>
          </div>
        ) : !payMethod ? (
          <div className="ab-pay-card">
            <div className="ab-pay-card-head"><CreditCard size={18} /> Ödəniş üsulu</div>
            {payMsg && <p className="ad-error" style={{ marginTop: 8 }}>{payMsg}</p>}
            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              <button className="ab-btn ab-btn-gold" style={{ justifyContent: "space-between" }} onClick={() => { if (!session) { setPayMsg("Balansla ödəmək üçün hesabınıza daxil olun."); return; } setPayMethod("balance"); }}>
                <span><Wallet size={16} style={{ verticalAlign: "middle", marginRight: 6 }} /> Balansla ödə</span>
                <span>Balans: {balance.toFixed(2)} ₼</span>
              </button>
              <button className="ab-btn ab-btn-ghost" style={{ justifyContent: "center" }} onClick={() => setPayMethod("card")}>
                <CreditCard size={16} /> Kartdan karta ödə
              </button>
            </div>
          </div>
        ) : payMethod === "balance" ? (
          <div className="ab-pay-card">
            <div className="ab-pay-card-head"><Wallet size={18} /> Balansla ödəniş</div>
            <div className="ab-pay-card-row"><span>Balansınız</span><strong>{balance.toFixed(2)} ₼</strong></div>
            <div className="ab-pay-card-row ab-pay-card-total"><span>Ödəniləcək</span><strong>{total.toFixed(2)} ₼</strong></div>
            {balance < total && <p className="ad-error" style={{ marginTop: 6 }}>Balansınız kifayət etmir. Balansı artırın və ya kartdan karta ödəyin.</p>}
            {payMsg && <p style={{ marginTop: 8, color: "var(--gold)", fontSize: 13.5 }}>{payMsg}</p>}
            <button className="ab-btn ab-btn-gold" disabled={payBusy || balance < total} style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={payWithBalance}>
              {payBusy ? "Ödənilir..." : "Balansla ödə və qəbzi göndər"}
            </button>
            <button className="ab-btn ab-btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => setPayMethod("")}>Geri</button>
          </div>
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
            <button className="ab-btn ab-btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => setPayMethod("")}>Geri</button>
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
        {(!lang || lang === "az") && CONTRACT_EXTRA_GROUPS.map((group, gi) => (
          <Reveal key={"x" + gi} delay={(groups.length + gi) * 60} className="ab-rule-group">
            <h4 className="ab-rule-group-title">{group.heading}</h4>
            {group.items.map((txt, i) => (
              <div className="ab-rule-item" key={i}>
                <span className="ab-rule-num">•</span>
                <p>{txt}</p>
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
          {(!lang || lang === "az") && CONTRACT_EXTRA_GROUPS.map((group, gi) => (
            <div key={"x" + gi} className="ab-rule-group">
              <h4 className="ab-rule-group-title">{group.heading}</h4>
              {group.items.map((txt, i) => (
                <div className="ab-rule-item" key={i}>
                  <span className="ab-rule-num">•</span>
                  <p>{txt}</p>
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

function CustomerAuthPage({ t, lang, settings, products, favorites, onFav, go }) {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState("login");
  const [resetSent, setResetSent] = useState(false);
  const [forgotMode, setForgotMode] = useState(false); // email → kod ekranı
  const [resetCode, setResetCode] = useState("");
  const [recovery, setRecovery] = useState(false); // email linkindən gələndə yeni şifrə rejimi
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [showChangePw, setShowChangePw] = useState(false);
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
  const [myReqs, setMyReqs] = useState([]);
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileMsg, setProfileMsg] = useState("");

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
      .select("balance, banned, cashback, phone, full_name")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          setPhone(data.phone || "");
          setFullName(data.full_name || session.user.user_metadata?.full_name || "");
        }
      });
    supabase
      .from("balance_requests")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => setMyReqs(data || []));
  }, [session]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    // səhifə hash-ında recovery varsa da aç
    if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) setRecovery(true);
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(t("loginErrorMsg"));
  }

  async function handleForgotPassword() {
    setError(""); setPwMsg("");
    if (!email || !email.includes("@")) { setError("Əvvəlcə email ünvanınızı yazın."); return; }
    // Link YOX — 6 rəqəmli kod göndər (recovery OTP). shouldCreateUser:false = yeni hesab yaratma.
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
    if (error) setError(error.message);
    else { setResetSent(true); setForgotMode(true); }
  }

  async function handleResetWithCode(e) {
    e.preventDefault();
    setPwMsg("");
    if (!/^\d{4,8}$/.test(resetCode.trim())) { setPwMsg("Email-ə gələn kodu tam yazın."); return; }
    if (newPass1.length < 6) { setPwMsg("Yeni şifrə ən az 6 simvol olmalıdır."); return; }
    if (newPass1 !== newPass2) { setPwMsg("Şifrələr eyni deyil."); return; }
    // kodu yoxla (giriş et)
    const { error: vErr } = await supabase.auth.verifyOtp({ email, token: resetCode.trim(), type: "email" });
    if (vErr) { setPwMsg("Kod səhv və ya vaxtı bitib. Yenidən cəhd edin."); return; }
    // indi daxil olduq — yeni şifrəni təyin et
    const { error: uErr } = await supabase.auth.updateUser({ password: newPass1 });
    if (uErr) { setPwMsg("Xəta: " + uErr.message); return; }
    setPwMsg("Şifrəniz dəyişdirildi ✓ Daxil oldunuz.");
    setForgotMode(false); setResetSent(false); setResetCode(""); setNewPass1(""); setNewPass2("");
  }

  async function handleSetNewPassword(e) {
    e.preventDefault();
    setPwMsg("");
    if (newPass1.length < 6) { setPwMsg("Şifrə ən az 6 simvol olmalıdır."); return; }
    if (newPass1 !== newPass2) { setPwMsg("Şifrələr eyni deyil."); return; }
    const { error } = await supabase.auth.updateUser({ password: newPass1 });
    if (error) { setPwMsg("Xəta: " + error.message); return; }
    setPwMsg("Şifrəniz dəyişdirildi ✓");
    setNewPass1(""); setNewPass2("");
    setTimeout(() => { setRecovery(false); setShowChangePw(false); try { window.location.hash = "#hesab"; } catch {} }, 1500);
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

  async function saveProfile() {
    setProfileMsg("");
    const { error } = await supabase.from("profiles").update({ phone: phone.trim(), full_name: fullName.trim() }).eq("id", session.user.id);
    if (error) setProfileMsg("Xəta: " + error.message);
    else setProfileMsg("Profil yadda saxlanıldı ✓");
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

  if (recovery) {
    return (
      <section className="ab-section ab-page-pad">
        <div className="ad-login-wrap">
          <PageHead kicker="ŞİFRƏ" title="Yeni şifrə təyin edin" sub="Email linki ilə daxil oldunuz. İndi yeni şifrənizi yazın." />
          <form onSubmit={handleSetNewPassword} className="ad-login">
            <input type="password" placeholder="Yeni şifrə (ən az 6 simvol)" value={newPass1} onChange={(e) => setNewPass1(e.target.value)} required />
            <input type="password" placeholder="Yeni şifrə (təkrar)" value={newPass2} onChange={(e) => setNewPass2(e.target.value)} required />
            {pwMsg && <p style={{ color: pwMsg.includes("✓") ? "#1f9d55" : "var(--gold)", fontSize: 13.5 }}>{pwMsg}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>Şifrəni dəyiş</button>
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
            <label>
              Ad Soyad
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Adınızı yazın" />
            </label>
            <label>
              Telefon (WhatsApp)
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="050 123 45 67" type="tel" />
            </label>
            {profileMsg && <p style={{ color: profileMsg.includes("✓") ? "#1f9d55" : "var(--gold)", fontSize: 13.5, margin: 0 }}>{profileMsg}</p>}
            <button className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }} onClick={saveProfile}>Profili yadda saxla</button>
          </div>

          <div className="ab-balance-card">
            <div>
              <div className="ab-balance-label">{t("balanceLabel")}</div>
              <div className="ab-balance-amount">{Number(profile?.balance || 0).toFixed(2)} ₼</div>
              {Number(profile?.cashback || 0) > 0 && (
                <div className="ab-cashback-label">Cashback: <b>{Number(profile.cashback).toFixed(2)} ₼</b></div>
              )}
            </div>
            <button className="ab-btn ab-btn-gold" onClick={() => setShowTopUp((v) => !v)}>
              <Wallet size={16} /> {t("balanceTopUp")}
            </button>
          </div>
          {Number(profile?.cashback || 0) >= 10 && (
            <button className="ab-btn ab-btn-ghost" style={{ marginBottom: 12 }} onClick={async () => {
              const { data } = await supabase.rpc("convert_cashback");
              if (data?.status === "ok") {
                const { data: pr } = await supabase.from("profiles").select("balance, banned, cashback").eq("id", u.id).single();
                if (pr) setProfile(pr);
                alert(data.moved + " ₼ cashback balansa köçürüldü ✓");
              } else {
                alert("Cashback köçürmək üçün minimum 10 ₼ olmalıdır.");
              }
            }}>
              Cashback-i balansa köçür ({Number(profile.cashback).toFixed(2)} ₼)
            </button>
          )}
          {showTopUp && (
            <BalanceTopUp
              user={u}
              profile={profile}
              whatsapp={settings?.contact_whatsapp}
              onClose={() => setShowTopUp(false)}
              onDone={() => {}}
            />
          )}

          {myReqs.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Ödəniş tarixçəsi</div>
              {myReqs.map((r) => {
                const st = r.status === "approved" ? { t: "Təsdiqləndi ✓", c: "#1f9d55" } : r.status === "rejected" ? { t: "Geri çevrildi", c: "var(--gold)" } : { t: "Gözləyir…", c: "var(--muted)" };
                return (
                  <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{Number(r.amount).toFixed(2)} ₼ {r.cashback > 0 && <span style={{ color: "var(--gold)", fontSize: 12 }}>(+{r.cashback} cashback)</span>}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{new Date(r.created_at).toLocaleString()}</div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: st.c, whiteSpace: "nowrap" }}>{st.t}</span>
                  </div>
                );
              })}
            </div>
          )}

          {(() => {
            const favProducts = (products || []).filter((p) => (favorites || []).includes(p.id));
            if (!favProducts.length) return null;
            return (
              <div style={{ marginTop: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Favorilərim ({favProducts.length})</div>
                {favProducts.map((p) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      {p.image_url && <div style={{ width: 42, height: 42, borderRadius: 8, backgroundImage: `url(${p.image_url})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                        <div style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}>{p.price} ₼</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button className="ab-btn ab-btn-ghost" style={{ padding: "7px 12px" }} onClick={() => go && go("mehsul-" + p.id)}>Bax</button>
                      <button className="ab-btn ab-btn-ghost" style={{ padding: "7px 10px" }} onClick={() => onFav && onFav(p.id)} title="Favoridən çıxar">
                        <Star size={15} fill="#E1122A" color="#E1122A" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <div style={{ marginTop: 24, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
            <button className="ab-btn ab-btn-ghost" onClick={() => { setShowChangePw((v) => !v); setPwMsg(""); }} style={{ justifyContent: "center" }}>
              Şifrəni dəyiş
            </button>
            {showChangePw && (
              <form onSubmit={handleSetNewPassword} className="ad-login" style={{ marginTop: 12 }}>
                <input type="password" placeholder="Yeni şifrə (ən az 6 simvol)" value={newPass1} onChange={(e) => setNewPass1(e.target.value)} required />
                <input type="password" placeholder="Yeni şifrə (təkrar)" value={newPass2} onChange={(e) => setNewPass2(e.target.value)} required />
                {pwMsg && <p style={{ color: pwMsg.includes("✓") ? "#1f9d55" : "var(--gold)", fontSize: 13.5 }}>{pwMsg}</p>}
                <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>Təsdiqlə</button>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>Köhnə şifrəni bilməyə ehtiyac yoxdur — hesabınıza daxil olmusunuz.</p>
              </form>
            )}
          </div>

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

        {forgotMode ? (
          <form onSubmit={handleResetWithCode} className="ad-login">
            <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "0 0 4px" }}>
              <b>{email}</b> ünvanına təsdiq kodu göndərdik. Kodu və yeni şifrənizi yazın.
            </p>
            <input type="tel" inputMode="numeric" maxLength={8} placeholder="Təsdiq kodu" value={resetCode} onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))} required />
            <input type="password" placeholder="Yeni şifrə (ən az 6 simvol)" value={newPass1} onChange={(e) => setNewPass1(e.target.value)} required />
            <input type="password" placeholder="Yeni şifrə (təkrar)" value={newPass2} onChange={(e) => setNewPass2(e.target.value)} required />
            {pwMsg && <p style={{ color: pwMsg.includes("✓") ? "#1f9d55" : "var(--gold)", fontSize: 13.5 }}>{pwMsg}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>Şifrəni dəyiş və daxil ol</button>
            <button type="button" onClick={() => { setForgotMode(false); setResetSent(false); setPwMsg(""); }} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, textDecoration: "underline", cursor: "pointer", marginTop: 4 }}>
              Geri
            </button>
            <button type="button" onClick={handleForgotPassword} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12.5, cursor: "pointer" }}>
              Kod gəlmədi? Yenidən göndər
            </button>
          </form>
        ) : mode === "login" ? (
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
            <button type="button" onClick={handleForgotPassword} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, textDecoration: "underline", cursor: "pointer", marginTop: 4 }}>
              Şifrəni unutdum?
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

// Saytın arxa fon musiqi playlisti — YouTube video ID-ləri (sırayla çalınır, təkrarlanır).
// Mahnıları dəyişmək üçün bu siyahını yenilə.
const SITE_PLAYLIST = ["PSxCaYZpl1o"];

function VideoWidget({ videoIds }) {
  const ids = Array.isArray(videoIds) ? videoIds.filter(Boolean) : [videoIds].filter(Boolean);
  const firstId = ids[0];
  const wrapperRef = useRef(null);
  const playerRef = useRef(null);
  const startedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    function createPlayer() {
      if (!firstId) return;
      const target = document.createElement("div");
      wrapperRef.current.appendChild(target);
      playerRef.current = new window.YT.Player(target, {
        videoId: firstId,
        playerVars: {
          autoplay: 1,
          mute: 0,
          loop: 1,
          // bir neçə mahnı → ardıcıl çalınıb təkrarlanır
          playlist: ids.join(","),
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
      // Səsli bot söndürüldü — birbaşa musiqi başlayır
      try {
        loadPlayer();
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
  }, [ids.join(",")]);

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
const SKY_GUIDE_0 = "data:image/jpeg;base64,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AgAAAAAAACBACgAAAAAAAAAAAAAFIAKAAAAIoAAAAAAAAACgAAGRkAAAAAAAAAAMgAAAAAAAAEAAAAAAAAAABAAhQAAAAAAAAAAEKQAUAAAAAAAAAAUEAFAAAAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAIUUgAAAAAAAAAAAgAAAAAAAAFBCgAAAAAAAAAABQQAUEKAABAAAUAAAAAAAAAAAAAAAAAAQABQBMgCkAAAAAAAAAAAAAQAAAAAAAhSACgAAAAKCACgAAAAAAAAAAAAAAAFIAKCACggAoJkZAoIAKCACggAAAAAAAAAAAAAAAAAAEAAAAAAABAAAAAAAUgAoIUAAAAAAoIAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCkAAAAAAAAIAAAAAAAAAAAAAACggAoAAAAAAAKCACghQAAAAAAAAAAAAAAAAAAAAAAAAAAAAgApAAAAAAAAAQCkAAAAAAAAAAAAAAAAAAAAAAAKCACgAAAAAAAAABkpABQQAUEAFBABQQAUEAFBAAyAAAAAAAAAAABAKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggAoIUAAAAAAAAAAAAAAAAAAAAAAAAAAMgAQAUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALkgAoIAKCACggAoIAKCACjJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAEKAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAAAAApABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEACAAAAAAAAAAAAKQAUEKAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAABAAAAAAAAAAAAAAAAAAAAApABQQoAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcggAoIUAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACjJABQQAUEAFBABQQAUEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9PY5jla9qtc1cKi80U+T3nTXXhr7f3214Y4kcjXuRjUblyoiqq471PBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH0xjnvRjGq5zlwiJzVQe66FK8Njb+g2xDHKjUc9qPajsORFVFTPegA//Z";
const SKY_GUIDE_1 = "data:image/jpeg;base64,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ECXd5o6uJXK2O8Vlkr21dC9u1slkkcg2o5mHix7f1mnsVw+bRFS8zPpb/Ruecmnp3wyRxnsa53nY7MoJfBFHre11FPdBc4aysgqG1Dnfyp2pRkSj9V4PEe0blV6r/wDVN5//AD5/9xyuKGs0Vbq2nroYdRVEtNK2VkUroGMe5pyA4jeBkDguauFW+vr6mslAElRM+VwbwBc4k48UGBERAREVBERAREQEREBERAREQEREBERQEREBERAREQEREGeheGVTCdwO7xV2udW5DcJI2hr2h4HWTgoLZFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFFXdKf2P+pOlP7H/AFILFQSGguJwBvKr+lP7H/UteprJJ27O5rewdaDXedpxd2klQiICIiAiIgIiICIiAiIgIiKgiIgIiICIiAigcApQEREBERAREQEREBERAREUBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERUEREBERAREQEREBFDvcn1IgN9yPUpXmI5jafQF6QEREBERAREQEREBERAREQEREBERQEREBERAREQEREBERAREQEREBERAREQEREBERUEREBERAREQEREBERAREQEREHl/uHeooomOIn+pFB5pjmFvo3LKtSjfglh694W2qCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgw1RxCfScIsVY/LgwdXFFBrtcWuDhxCsY3iRgcFWrJDKYnZ4g8QgsEXlj2vblpyF6VBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBeJHiNhcfYO1S97WNy47loyyGV2Tw6gg8OJcSTxKKEUBERB6Y90Zy04W1HVNO54we1aaILJr2u9y4H2r0qtemvcDucfFBZItRj3Y90fFZWuPafFUZkXkFekBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBF5JWNzj2nxQZkWo97vjHxWBz3E73HxUFg57W+6cB7VhkqmjcwZPaVqKEHp73POXHJXlEQEREH//Z";
const SKY_GUIDE_2 = "data:image/jpeg;base64,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ucNZWQVDahzv0p1SjIlHzXg8R943Kr2r/wBqbz/5+f8A6jlcUNZsVbq2nroYdoqiWmlbKyKV0DGPc05AcRvAyBwXNXCrfX19TWSgCSomfK4N4AucScdqDAiIgIiKgiIgIiICIiAiIgIiICIiAiIoCIiAiIgIiICIiDPQvDKphO4Hd2q7XOrchuEkbQ17Q8DpJwUFsiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFiiru+n7H/UnfT9j/AKkFioJDQXE4A3lV/fT9j/qWvU1kk7dO5reodKDXedTi7rJKhEQEREBERAREQEREBERAREVBERAREQEREBFA4BSgIiICIiAiIgIiICIiAiIoCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIioIiICIiAiIgIiICKHe9PoRAb70ehSvMRzG0+YL0gIiICIiAiIgIiICIiAiIgIiICIigIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIioIiICIiAiIgIiICIiAiIgIiIPL/eO9BRRMcRP9CKDzTHMLfNuWValG/BLD07wttUEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERBhqjiE+c4RYqx+XBg6OKKDXa4tcHDiFYxvEjA4KtWSGUxOzxB4hBYIvLHte3LTkL0qCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIC8SPEbC4/cOtS97WNy47loyyGV2Tw6Ag8OJcSTxKKEUBERB6Y90Zy04W1HVNO54wetaaILJr2u964H716VWvTXuB3OPagskWox7se+PasrXHrPaqMyLyCvSAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAi8krG5x6z2oMyLUe93jHtWBz3E73HtUFg57W++cB96wyVTRuYMnrK1FCD097nnLjkryiICIiD//Z";
const SKY_GUIDE_3 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAO5AbgDASIAAhEBAxEB/8QAHAABAQACAwEBAAAAAAAAAAAAAAEDBQIEBgcI/8QAThAAAQMCAgUIBwUGAwUHBQAAAAECAwQRBRIGEyExkhQVQVFSU1SRByIyYXGT0TNygaKxFiM0QoKhssHSJDVDlMIXJjdidLPwNkRVw+H/xAAbAQEBAQEBAQEBAAAAAAAAAAAAAQIDBAUGB//EADERAQABAgQDBgYCAwEBAAAAAAABAhEDBBJRFCHRFRYxUpGhBRMyQWGBInEGscEz4f/aAAwDAQACEQMRAD8A+TlIDD2ORTiUiqAAKUhQoUhQKU4lCqUgIKAAqghQKCFCqCACgAAAAAACgAAAAIAEApAABAABAAgQpAABCoEAAgACIQpABCkCIAQqAAAAhQighQqlIUis9JR1Va9zKOlnqHNS7mwxOeqJ1rZDE5Fa5WuRWuatlRUsqKe/r8RrNGfR3o0mB1MlHNiT5qmqnhXK96tWzWqvUiLu9xn0zxVmF4pg2ksdBSzYhiODtmdrmXayfZ+9y7ldbdctmdUvnssMsDkbPFJE5UujZGK1VTrsop4JqmVsNNDJNK72WRsVzl+CJtPofpHxCODTPA6/EqNmIxphkD5aeVbJKq599vet9x5vB9Ja3DnYnBgFGymqMUlRsT4MyywNzXSONffe3WFiqZi7Q1FPPSzLDVQSwypvZKxWuT8FLHTzyRvljglfGz23tYqtb8VTYh77TlKytpNG9HauTl+k8auSoeio5zM6+pG53SqbFXqtfpN1Q1dPR4RpNoxhb2vpMMwaXXzNT+IqV2SP+CeynwFk18nyMz1VHU0b2Mq6eWBz2JIxsrFarmruWy9CnqvRLhtLiem9JHWsa+OGN86Ru3Oc21r/AAVb/gbb03YPWwaUc6Oie6iqYWNbKiKrWOallaq9HX77i3JrX/LS+clJ0IvQu5esGWlBChVBABSkAFBChQAAUEAFBAAAAAEAAAgRSAAAbLRqmoK3HqGmxafUUMsuWaXOjMrbL09G2209/o1huhVHpxjNJU1FDU4VHTRrTSVkzXsVy2V9nLsVULEM1VWfLrLa9lt12OcsEkTGPe2zX7lud5ZIW0FVGx7bLI/I2+9L7P7HCvljfSU7WPa5U3oi7tgLteRVPTejumgq9K4IaqGOaJYKhVZI1HNVUicqbF6lS52fRfUsfpLQYXUUVBU01ZL+95TStkclmKvquXduQJNVrvH3TrB9E0VqX4xSaRVy0OAR1lPDTtgWopYoqdl5HIqqi+qiqmy/TsPH6SOndi8vKkw7Wo1qLzbk1G7oybL9fvBFXOzoU9PNUyaunjV7rXsnQh2lwauttianxkQ2miKJqqx1tvqpf8FPoOgU0C4gtG+igkfLHK508iZnI1GbGtRdibdqqZpm9Uxs7Y+H8vCor81/abPlK4NXJ/wm/MQ4S4TXRMV7oLtRLrlcin1vRCtlSCJjaejp8OpnLJiNXNGj9a1dzFVU39CIh5mtfDLWzyUsergfK50TOy1V2J5G7PNqm754Q7eIwshkarHXzq5Vb2bOVDqBoIAAUEAQQqHEoFCABVQqEKB63CtJMJn0dgwLSigq6mno5XS0k1JKjJI0d7TFvsVqr/8ANhrtMNIHaSYkk7adKWlhgbT0tOjr6qNu5L9KmkAIiL3esxnTOSp0hwrGcNp9RNh9JHA1s6JIjnNRyKtupUd8TLofpXh+DYliGKYphs1ViFSrlinp3NZqM18ytRdiKqrsXoQ8cUlzTFrPT1mO4VSVlPiOjFLiNHicUyyOqKupbPmuiouxU3rfepuMJ9KmO00Ne3EJ1qJJqdWUz2QxM1MnQ9fV9ZPceBAuaYnxbLCcbrcKxuLGKWREq45VkVVTY5XXzIqJ0LdfM+wU/powWShvW4ZWtqcvrRMRj2Kv3lVNnxQ+GlLexVRFXi3+mWk9RpTiqVcsLKeCJurp6dm6Nt77+lVXepoiAjURERaFABFUEAVQABQQAUXIUAAAAuAABABSAAACAUgAGx0dqqGixyiqcVpuU0MUqOmhyo7O2y9C7F22W3uPW0GkehsOl+KV9TgSvwqeFjaan5MxdW9ETMuS9kvt3HgSFZmm71VHjGjsehWJYdPhSuxiaVzqaq1TV1bVVMvr3ulkRdiE0pxjR2vwHB6XBsLWlrqZiJVzaprdYuVEXai3dd226nliBNMNtovjP7P41DiXJkqUjZIxYlerMyParV2oi23ndodIsNwrHsNxXCMD5MtG5znxPrXypLdtk2qnq2uvxPNgExDe6PY9T4XR4nR1uGpX02INjSRnKHRKmRyuSyoi9P6GsxOekqKt0mH0S0VOqIiQLMstl6VzKiLtOqQFvu2WC4pzc+VHsV8Uqesib0VOk3uG6Xx4ZVpVUiSNlRrm3dGjksqWXZc8eCRERN2q66q6Ypq8I8P299Q+kN9FhzKCKKJ9MxyuRstIx+1elbrtU1FbpNDPLLO2F2tkcrsrWIxiKvuTcnuPMENOemB7le5znb3LdTipSBQKCBBQQACoRABSkKAKQoVSnEpFUAAUpAFUAAUpxKBSnEoVQQoAAEFBAFUEKAAAAAAAQAUgAAABAEBQBAAIAEACACFIEACACAFRAABAoIEAABCkKBQQoFAaiuVEaiqqrZERLqp67E9HqDRvR5eflkdpBWsa6moo325Iy988vvXdl/8A6qC7yRTiUKpSFIrJqZEi1qsdq+10BIZFjWVGKrE3u6DbUkaS4Y2Nf5mqn91MESKmESoqWVFVF8zh87xj82fZn4XTFNNV5tNE1fuIjl/XN0mU08jUcyJzmruVEK+nmZlzxubmWyX6VNhDI+LCkfF7SLs2X6TpTVU8is1tkVq5k9Wxaa66pnws5Y2Wy2DhUzVNWqqIn7W5pySp7l/kceTzazV6t2e18tttjZU1TLJRzSuVM7b22e4wUEz561HyKirkVNiWJ8yvneI5O1WSyszhRRVV/P8Arw6uvySo7l/kcEikWNZEYuRN7ug7lRV1UcsiNSzGqtlVnQWL/dEnxX9S/MqiImbMTk8vVXVRRNX8Yqnnb7eDXnN8MkatR7HNV26/SYzY4vvh+C/5G6qpiqI3eTBwKa8DExZn6be8ulJHJEqJIxWqu65ZIpIkRZGK1F3XNoxrayGCR29q3X/NDo4jLralURfVZsT49JijEmqrTb+3rzWQw8DCnFiq8TbT+bxebusCFOz5QAAAAAAAgAAoAgApAQCkAAEACABAABAAACIAQoEACBCqQIKQACAAIAhQKCFCvS+j7GMNwPSWCtxan1kKNVrJbZlpnrulRv8ANb/O6bTjpvg+JYXjD58RqVrmVt5oMQat21TV/mReu1tnR0bLHnUN1S6S1kWjlTgM0cVTRSuR8KTIqrSvvtdGvRfbs3bfjclud2mKQBpSkAG7ppdTh0L13IqIvwVTnWsRlFPb+a7vNUOk6WPmhsedufs327znJWxSYfq3OXWq2ypbpPFonVeN36uM3hRgzhVVR/5xb+7TEx/fhyZaeZYMKbI1EVUXcvxNfVVDqmRHuREVEtsO1TVsEdK2GWNz7XulktvMNZUwzMa2KHJZb3sm06UUzFczb9vBm8anEy1FNOLFopj+P5h2KH/dtR+P6GLCf4v+lTHBV6qmkhyXz3233bDhST8nl1iNzbFS17GpoqtV+XOnNYUV5eb/AE+P45u1WVsjllgVrct1bfpOcX+55Piv6oa+V+sle+1sy3sdulrmwQap0WZLqt7kqw7UxphrBzkYmYrqxq+U01RE/wB+Dp9JscX3w/Bf8jBV1Uc7GoyHIqLe+wtZUxVL4rI5rW7HXQv8pqpmY3c6flYeBjYVNcTfTb7X58/HZ3sMjVlMiuVfXW6J1GpmY6OV7Hb0VTuVNc1ZIdRfIxbqlre63kcMSWJ8jZYntdmSy2Uzh6orvP3ejPTg4mWijCqv8u0ePjExzmP26lwQHofEUEAFBCgAQAUEAFIAABAEAAAAIAAIAAAQICAACFQAIAIUgQIAABAECkQAUqEAVSkAHIEKAKQBVKQoFBCkUKQAUEKFUEKAAAAAAUXIAKCACggApAAAAAAAAQAACAIAAAQAAQECAAKBAQIAEAAECAAAhSFAFIUCghQqghQKCFChSADkCADkCFIoAAKCACgAKoIAKCACgAAAQCggAoIAABAKQAIAAAQAAQEKgAABAAgQBQBAAiAACAAACFCKAAqghQKCFCqCFAoIUKFIAKUgApSAiqAAAAAFIAKCACggAoILgUEAFIAAAAAAgAAhQAIEAAAIAECAACAACABAhSAAQBApAUUpARVKQAUAAUABVBCgUEKFCkAFBCkFBClVQQEFBCgAAAAAAAAAAABABSAhRSABAEBAABQBAECAACFIAAIEACAACKEAAUAQoA99oT6MqrS3BFxODFIaZutfEkb4XOW7bbboqdZ4E+/+humfW+jKspI5NU+eapjbJ2VciIi/hcQzVMxDzX/Ybin/AObo/kP+p82x3DH4NjNbhksjZX0kyxOe1FRHKnSiH1ZPQ5jtk/72O4Zf9Z0PRboth1bpTpHh2PU0OJOoXJGkkzVW7ke5qu2rfbbpFkir73fKjvYHhc+N4vS4ZSOjbPUyZGOkVUai2VdtvgfatHovRxW43VaKUmCNlqI1kRZ54UXWuavrI198yW223Js2Gk0Qw/A9FfSjXYLW0z6iZZ40wuVW5lhu1XbVultiol7Lewsut8/0w0ZqtE8VZh1bPDNK6BsyuhRcqXVUtt+Boz7P6bajBairiwqKgc7SKbUaqp1aW1avVEbmv136Ok7dbgWjGgGG0UFRo3PpBiE6LrZG0+t3b127GpddiJt/UWIr5Phpdp9O9KmiWFUuAUWk+j9K+igqMqTUrmq3JmRVauVfZVFSypu3Hscb0V0DwfB6HGMZoYaeCJrc0cTV/wBoe5qWRUTa7pW3mLLrh8ALtO9j81DUY3XTYVFqqCSdzqePLlys6Et0H1DD9G8D0m9FEuIYbhdNDjNPAqPkibZyyxbV4mpf+ojU1WfIQfVfRzo5gkWguJ6TaR0ENVG1XugSZt/UYltn3nXT8EM2hGiuj+H6IyaY6W07Jo5EWWKny3ZGxXWaiN/mcq7r7ES3vUWTXEPkgPuFPgmhnpHwSsfo/h7cMxGm9VFbEkatcqLlzI1crmrb47zT+ibRnCcUwDG5MYwyCoqaadzGulbdWWZtRPxuLGuLPlCA+g+hXBMMx3Gq+HF6KGrjjpGvY2VLojsyJc3no70ZwTEtMNLKSvwynnp6Soy08b23SNNY9LJ+CJ5CyzXEXfIgfQvSHFoZhWGrguAR6zF6eqTlFTkVdiZszc27Yqolk2bDS+jHD6PFdNsOosRp46imkSTPFIl0daNyp/dEC6uV3mAfcMcl9G+h+PuoqzBGy1EyNdLaBJI6ZqpZNirs3Zlsirtv1Iea9LOheGYJNQYphFqfDq2RI5WNu5sS2ujmp1Kl1t7tm8WSK7vmgPseF1ehFLTUlPhOh+IYzBJZs1a/D1eqdGa7k29dm2Q1vpE0Cw6g0twOmwv/AGSkxeZIXsRbpE5HNRVbfoVHbutBYivnZ8uB9+xjCdF9Fn0uHu0JnrqOVl5q6Ol1+r6PWXa5V2XW34HgcM0d0Z0g9I8OH4PPOuDvjdNJC9rmPY5u+NFdttuW+9EunQLEVxL5+D7vjcGiGF1s+E4noRUQ4fEzZiUNEr2uWyLscy7vxvvQ8/6MsG0UxrEsdwp1NHXxRqktFUzRqkmqXYqdG1q287iya+V7PlAPsXoq0Fw6opsWk0ioIal0NatJEkyblj2OVPiq/wBjBoDoRhseNaUO0gpIqijwyVYY0mbdtku9XcGXzFlnEjm+SA+m+jTRDCtJJ8T0hxeBseEwTP1VK1VaztLe23K1qps6T0eDL6OtOZqjB6HBkpJ2Rq+KVsDYXuamzMxWr0XRbO8hZJrs+HbwfVPR3obQt05x3BMdpIa5tFEmRZW7Fu5LOROi7VQ46ZYTofTKui+j8LZNIJ66NizatVSJXP2szbkREW1k6E27RZdcXs+Wnt6/QSCl9HdPpUmISullZG7k6xplTM7Lv3nvMbo9APR/Q0mH4phCYhU1DFVz1hbJK5E2K9VcqZUvuRDNp+zDWeh1qYI5XYdaBadXKqqjFkRUTbt2XttLZia72s+CgAjqEACBAAABAABAgAAIAAgQAoAgAFOJQin370OUr630Y1lJG/VvnlqYmvsvqq5ERF2fE+AmaKrqYWZIameNt75WSuankihKovD60noXx1ET/vLHu7Mv+o7voawuXBdMdJ8NnmSeSmbEx0qIqI9czlvt29J8b5wrvG1Xz3/U4MqqlkjpGVEzXv8Aac2VyK74rfaDTMxaZfRPRz/4yS/+orf+s7elNZBh/p3hq6uRI4I6inzvdsRqLEiXX3bT5cyaWOTWRyyMk2+u16o7bv27xJI+V6vle+R673PcrlX8VF10832n0x4JUUmLUOmcM0T6alWnY6Hbmc5JFVFRdyotz12O1mkWOYZQYn6PsToXQSousZO1FzXtZb2WyptRUU/NjqqpdAkDqiZ0KbolkcrU/C9jJRYjXUCuWhrammze1qJnMv8AGyi6aOT6Z6WJtJKHAYqDSLSDDqt9S5Hcjp6XI9Mu3Nm6kWye+/xNx6cL/sbgO/7dv/tKfFZppZ5XSzyPlkd7T5HK5y/FVOUtRPM1GzTyyNbuR8iuRPwVRdYp8GM+o+gbHEpccqsFnd+6ro9ZGi7tYxNqfi2/CfLT2vooqsEw3SbnPH66KljpYlWBJEVc8jtl9iLuS/mhIWrnD2npkqqXR7RfC9FML/dxSLrHsvtSJi3RF+L1v/SdrRPkenXos/ZuOrZBiFLG2NWu2q1WOux1t6tVERFX4nzH0h4+3STSytr4X5qVFSKmXb9m3Yi/it1/E8/BNLTytlp5ZIpG+y+NytcnwVNpbpFP8X3vQzR+L0YYJimKaQ18DpJcvqwqtrNvla29lc5VXqNV6DcTgro8foJ5Gx1VVMtSjL7Va5FR1uuy/qh8erK6srno+tq6ipc3cs0rnqnwupihlkglbLBI+ORq3a9jla5q+5U3C5ovE3foD0ZaBVOh2K101dX00754kjhjhvdWI66uVF+LU2X37zo+iu/7d6bbF/iv/wBsh8UlxGumnWeauqnzKmXWOncrrdV73t7jHHU1Eb3PjqJmOftc5sjkV3xVF2i5omb3l2Mbvz1iN9/K5v8AG49N6H//ABDwr4S/+248aqqqqqqqqu1VXpPTejTE6LB9NcPr8SqG09LEkmeRyKqJeNyJu96oRqr6X03T30ZVOlGlMmJYfiVLHHK1jKtkl1fGqNRLoib7ttsWxx9KGJ4NBW6M6NVUrJKaCshkrEVb6uJqZUR3xRVVfch4D0i6RtrNNK3ENHsTmSnmiibraaR8eezbKi7jxr3Oe9z3uVznLdznLdVX3qW7NNMza79L6U0+lj6+hXRnEcPoMGZGi1D5GtVWIi3VUuiply7rWPMenBsM9Zos2esWkhfUSI6qRt9Unqev0btinxhcRrlpORrW1S0vcLM7Jw3sYZaieZGpNNLIjd2d6ut8LqLkUWl+j6Cm05oq+hYzFcMxjCn5ddUSxaqVG9KplVUctty9e88hptFh1Z6WKCLDcYjwmvSD97VxsRyJPdcrXbUS6t2Lf3Ip8np8VxKlgWCmxGshhX/hx1D2t8kWx01W6qq7VXffpFyKLS/T2Bx6aU2NOhxmpwyswlrFVKmONYpnLbZ6qbE27z5ZT4zh2E+ml9ThTo0w6ap5PIsa+oqvajXKlujPt/A8C7F8TdTcmdiVatPa2qWoflt1WvY6SbLW2W3WFyKLPvvpZxyPRiLBWUTUjdJiXLZkbszNYt3X+KuO76VsTp8J0Hr5aLK2XF3tjzt/nzNRFdwNsfnmaeadUWeaSVU2Isj1dbzEk80rWslmle1vste9VRPgi7hcjD8H170K4tQ1mB4norWTNimqHPfEirZZGPYjXI3rVLXt7zZaCejmbQ3Gp8bxjE6Vaemhe2JzFVqWXe56u2Js6Nu/efDGqrXI5qqiot0VFsqKdmqxPEKyJsVZX1dRG3cyadz2p+CqLrNE87S+zejjGIsf9J2k2J019RLTsSJVTexrkai/ja/4nzfEcQTCfSZVYi9quSlxh8rm9Kokq3/tc83FNLC5XQyyRqqWVY3q1V8jg5znOVz3K5yrdVVbqqkuRTaX3z0haEv09dhuM4DiNKrdRkvIq5HsVboqKiLtS67DFp5hsOD+hxMOpqhKmOm1Meubue5JEzL53PiFPiNdSwvhpa2qhif7UcUzmtd8URbGFaidYUhWaVYk3RrIuXyvYt0iieXNjAIRtSAAACAACBAAACAACAFQAIABAEAABSkAVSncjw2V7Ecr2tul7Khz5rk71nkoS8OgDv8ANb+9Z5KOa3963yUhqh0Qd/mt/es8lHNj+9Z5KLGqHQKd7mx/es8lHNj+9Z5KF1Q6JTvc2P71vko5sf3rPJQaodEHe5sf3rfJRza/vW+Sg1Q6JTu82v71vko5tf3jfJQaodIHd5tf3rfJS82v7xvkoXVDolO7za/vG+Sjm1/eN8lBqh0gd3m5/eN8lHNz+9b5KLGqHSB3ebn963yUc3P71vkoNUOkDu83P71vko5uf3rfJQaodIHd5uf3rfJTr1EDoHo11lvtRU6QRVEsQFyBVBAAAAAEAAAACAAACBAAACAAACBAAhQIUgQAAEKQoAdAN9TU0LIWJq2qqtRVVUvcF7M7PYb8E/QoO3Gyhc1ueeZi22ojLoi2+oc3UB20ZQq5bzzImyy5L9BgnSJHpqHOc223MltoGMAAAAAAAAAAAAAAAAAAAAAAAAAADXYr7cfwU2JcjHe01rvilwtM2l58XPQamLu2cKDUxd2zhQlnTU89cXPQ6mLu2cKDUxd2zhQWNTzwPQ6mLumcKDUxd0zhQtjU88LnodTF3TOFCamLumcKENTz1weh1MXdM4UGpi7pnCgTU89clz0Wpi7pnCg1MXdM4ULZdTzoPQ6mLumcKDUxd0zhQWTU89clz0Wpi7pnCg1MXdM4UFjU84D0Wpi7pnCg1MXdM4UFjU86D0Wpi7pnCg1MXdR8KBNTzlwei1MXdM4UMVTTQvhemraio1VRUS1gamhAAVAAAAAReg9JF9kz7qfoea6D0sX2TPup+gSXIABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk04mRkb1jWRGOyZkbmtszb7X6wsANrJo1jkbEfJhFa1rpEjT9yu1y7ESx08Qw6swyo5PiFLLTS5UcjJG2VU6060CusAQCggAAAAAAABAAO5g+GzYtiMNDTqxr5FW73rZrGol3OX3IiKptUwrAats0OGYxUOq42OexauBsUU+XaqNdmu1VTdm3lR54h6Co0Xrn0GH1eGUlXVRz0SVEzmx3Rjlc5LJb3NvbaprsOwTFMUjfJh2H1FSyNbOdGy6IvV719ybSF3QB3qHB8SxFXJQ0FRPkfkdq2KuV1lWy9W5d5x5rxBcR5uSiqOW3y8n1a572vu+G0Dpg7tfg+JYcl6+hqKdM+RFkZZFda9kXp2dRyr8ExXDYGT1+H1NPC9bNfLHZFXfb3L7lA15xl+yf91f0ORxl+yf8AdX9APN9BB0ANgACIUgAq7j0sX2TPup+h5roPSxfZM+6n6BJcjZ0mB1VXSNqopqFsTnZby1kbFat7WVqrdPI1gsm+yBlnnpZIIUle6JWrI+OzJWuW7d62To6l3L0GSbD5oeU55KZeT5M+SoY7Nm3ZbL63vtu6TqADtsw+Z9RTQJJTo6pYj2Ks7Ua1Fv7S3s1dm5fcZsNwaqxKF8tNLRtbGtnpNVxxK332cqbPehrxZF3oB2qeglqWVLo5aa1O1XOR87Wq5E7CL7W7oKzDZ31LadslLrHRJKl6hiNVFS9s17Zrfy777DqALZtIMArJqaKpbPh7YpfZV9dG1b9Soq3Rfih0H0z2R073PiyzoqttIiq1L29ZP5fx6NpisnUgBZs63AauihfLPNQKjW58sdbG9zm3RLojVVV3/r1FkwCsjpkqHT4fq3RrI21dGquREutkve/u332GssnUgsnUhSzcQ6M100LJW1OFo17UciPxGFqoi9aK66L7jWckk5byTNFrNZq82tbkve18263v3GKydSAhZ2KehlnreSNkp2yZlbmkma1iqn/nXZ8F6TLiGE1GH1EcFTJSrJJ0RVLJEbtt6ytVUQ6YsiJZESwLNm3R3EOU1dNItLBNSOyzMnqmRqnvTMvrJ70udeuwuehhhmlmpHtm2sSGpZIqpa91Rq3RPjY7sWkla2nigqoKGubC1GxOraVsro2puRHLtt7lVTV1MzqmeWZ7Y2ukcrnJGxGNT4ImxEBZsKHR2txBlO6kloZHVDskcXLGJIrupW3um5d50FpJEigkzQ5Z3K1qa1t0VFRPWT+VNu9d5to9KMRihRrI6NKhsWpbWcmbyhGWtZH/AA2X3+80lgWZ3UMrX1TVfAq0vt2maqO229Tb6+3q6Np23aP1jaZtQs+H6t7Fez/bo7uREuqIl732buvYa0WTqBZ2Uw6ZVT95T7aflH27fZ6t/tf+XeVuGzOfSN1tK3lTc0auqGojej11v6i/E6oBZ3K/CajD6iKCplpNZJ3dSyRGpf8AmVqqiG8bSrgmjmJ02IVFI+Wtkg5NDBUMmVFY66yKrVXKmXZ77nl02btgsibkBZ7utxVv7T6YzR17ck1DKyF7Ztj/AGEajVvt2Xtb3mgxmeOXRvR6NJWPlibUte1HIrmJrEVqL1bL2NGAWAAFAAAAIBSAAAABt9FcQpcPxlr696x0s8MtPLIiXWNsjVbmt7timf8AZuKkZLPieL4cyjjYqxyU1SyV9Q7+VGMRb7V67WNZheKVmFTPmoZWxve3K5XRMfdL33ORUNl+2OO3vyqH/k4P9BUbBuJxMxLQrLXRpHTQwa20yZYnLM7Nfbs9W179B3aRmHKxtTFJQ1OTEp3y8qxJYWUbUk9VzGNcma6bbpe+xDRftjjvi4f+Tg/0D9scd8XD/wAnB/oCWbPSHEKZaLSeOnrIVSoxtjmtjlT97HZ63Sy7W3t7tx2ExClnnbAmIwRVNbo7BTNqnSojWSot1Y9yeyqomVVU0n7Y474uH/k4P9BhdpPir6uOqllglfGxzMr6aPI5rrZmuajURyLZN4LPTUjo8DwTAn4nVwVENLjueRIZUlbC3VotrpsW3tWTr6zrY7UNpMMxVrIcIazEHtTWxYo+okqPXzI9rFVbL0qrrWvY0Uuk2IrNTPp0paRlNm1MNPTMbG1XJZy5VRUVV61ucp9K8anhkhlqYljlarXolJCiqipZdqMuCzSHGX7J/wB1f0ORxl+yf91f0IrzSbgOggaAABCkAFPSwreJip2U/Q80diKtqImIxknqpuRURbBJh6AGj5xqu2nCg5xqu8ThQFm8Bo+cartpwoOcartpwoCzeFNFzjVdtOFC841XbThQFm8Bo+cartpwoXnCp7xOFAWluwaTnCq7acKDnCp7acKBbN2U0fOFT204UHOFT204UBZvAaTnCp7acKDnCp7acKA0t2DSc4VPbThQc4VPbThQXNMt4DR84VPbThQvOFT204UBpluwaTnGp7acKDnCp7acKC5aW7BpOcKnvE4UHOFT3icKC5aW7BpOcKntpwoOcKntpwoLlpbsGk5wqe2nCg5wqe2nCguWluwaTnCp7xOFBzhU9tOFBctLdg0nOFT204UHOFT204UBpluyGk5wqe2nCg5wqe2nCgNMt2DSc41PbThQc4VPbThQXNMt2DSc4VXbThQnOFT204UBZuwaTnGp7acKDnCp7acKAs3YNJzhVdtOFBzhVd4nCgLN2DR841XbThQc41PbThQJZuwaPnGq7acKDnGq7acKAs3gNHzjVdtOFBzjVd4nCgLN4cJltE9V7K/oabnGq7acKGOWtqJWKx8nqrvRERLgs64BAoAAAIUAUgA5AhQBSAKoAAoIAOQIAqgAAUgAoIUgAAAAAqggAoIAKCACkAAAAIAAACAAACgAQCkBAAACABAAACBAQAAAAIAgAAKCGaKmnmbmihkenW1iqgGIp2OQVnhZ/lqOQVnhZ/lqFuwAz8hrPCz/AC1LyGs8LP8ALUF3XKZ+Q1fhZ/lqOQ1nhZvlqC7ADPyGs8LN8tS8hq/CzfLULd1ymfkNX4WbgUchq/CzcCguwFM3Iavws3y1LyGr8LNwKC7ADPyKr8LNwKORVfhZuBQXhgBn5FV+Fm4FHIqvws3AoLsAM/Iavws3Ao5DV+Fm4FBdhBm5DV+Fm4FLyKr8LNwKC8MAM/Iqvw03Ao5FV+Fm4FC3YAZ+RVfhZuBRyKr8LNwKC7ADPyKr8LNwKORVfhZuBQXYAZ+RVfhpuBRyKr8LNwKC7AQz8hq/CzcCjkNX4WbgUJeGAGfkNX4WbgUciq/CzcCguwAz8iq/CzcCjkVX4WbgUF4YAZ+RVfhZuBRyGr8LNwKC7rgz8hq/CzfLUchq/CzcCgu64OxyGr8LNwKOQ1fhZvlqC7rgz8hrPCzfLUchrPCzfLUF3XB2OQ1fhZ/lqOQ1nhZvlqEu65DschrPCz/LUcgrPCz/AC1Bd1gdnkFZ4Wf5amOWmnhS8sMjE63MVEBdiIAEAAAAABdynexBXNqFjRy5I2ta1L7ETKh0XeyvwO7iX8bJ/T/hQrNTr3XrXzF1618yAMrdetfMXXrXzIALdetfMXXrXzIALdetfMt1618yAC3XrXzF1618yAC3XrXzF1618yAC3XrXzF1618yAC3XrXzF1618yAC3XrXzF1618yFAXXrXzF1618wAF1618xdetfMABdetfMXXrXzAAXXrXzF1618wAF1618xdetfMABdetfMXXrXzAAXXrXzF1618yAC3XrXzF1618yAC3XrXzF1618yAC3XrXzF1618yAC3XrXzJdetfMABdetfMXXrXzBALdetfMXXrXzIALdetfMXXrXzIALdetfM7OHq51QkauXJI1zXJfYqZVOqdnDf42P+r/AAqB0k3IA32U+AI6AAAAhQIvsr8DvYl/Gyf0/wCFDoruX4HexH+Nk/p/woWGanWO1hdBLieI09DTuY2Wd+RqvWyIvvOqbzQj/wCrcK/9Qn6KVljl0fk5PPNRYhQV2oYr5Y6aVVe1qb3ZXIl0Tpsaiy2zWW17XtsN7zvhlBFV804fVMqZ4nwrNU1KPyNdsdla1qbVTZddx6unpaiOKpw6qfiFRTswxyr+5Yyi+yzNydKqi/zJtVUVSD5vZbXstk2XtsFltey23XtsPe4TyutwrD6OJK+hY6iciOSFktFMlnKr5OpV3Kq3VFsMPSrrcJo6SNK+gYuHuT7FktDM1Gqqvev8qr0qt1RbBHgh0X6D2+E1VPDhlDpJUNZItNAmHSMcl8zs6Ii/JV3kc2UlNheO4RgUiwv1KzVH7yysfM9F1KO91mx7+sK8KqKm9FS+3agPZtdis+FTO0mbPrWVtOlG6qZlekiv/eNbdL5cu9N247Dqyqq9LccZEjXVlJHUNwyFGJ6j0el8qW2vtmXruB5Dm+RMJdiKvajEqeTrGqLmvlzX+B0z1uMuxSTQyKTGWy65cR9V07bSObq19q+1dt7XPJAAAAAAAAAAAAAAAAALi4AAAAAAAAAAAAAAAAAAAgAzUdJUV1VHS0UEk9RKuVkUTVc5y+5DCfSNAJEl0VxCi0WlipdLpHKrnzKiSTwdmBy7Gu6+np6lQNW70fPoWNTSHSLBcInd/wDbTz55W/eRu7zOnjWg2K4bQuxKlkpcVw1vtVeHS61rPvJvb+h6r0VVOjuC1uLw6axw02KK5Mq4nHty2XMnrJ7V9/XsNfo5Bic+m+IYjoIvIsGbUOc+pnRW0rYelH32Km+zd6JbcEfPQeg07nwSp0nrJdGo8lA5U3JZjn/zOYnQ1V3J/kefCh2cO/jY/wCr/Cp1js4d/Gx/1f4VKOinsp8CkTcnwKZdAEAAEKAd7K/A7uJfxsn9P+FDpL7K/A7uJfxsn9P+FCs1OuVrnMcjmOVrk3K1bKhxKVkMq1M6xsjWebIy+VmsWzb77JfYYgQZG1E7IXQsmlbC72o0eqNX4puDaidsLoGzSpC5bujR6o1fim4xgC5nZcmZct75b7L9dg5znrd7lcvW5bqQAZJaieZWrNNLIrEs1XvV2VPdfccUkfrNZndnvfNdb3679ZxAGWWeaZVWaaSRXLdVe9XXXr2mMhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAHKN743tkjc5j2rdrmrZWr1ovQcQB7Cm9JOkDIGQ1/IMUbGlmOxCkbK9v9WxV/E12kGmOO6QQtpsQrLUjfZpIGJFEn9Kb/xuaAAAAUDsYb/Gx/1f4VOsdnDf42P+r/CpB0m+ynwAT2U+AI6AIAAACC7lNlVwzVE2vhifJHI1qo5jVVNyIqbOm6GtOTXOb7LlT4LYpMXdrkdV4ab5a/QcjqvDTfLX6HX1kneP4lGsk7x/EoTS7HJKrw03y1+g5JU+Gm+Wv0OvrJO8fxKNbJ3j+JRc0uxySp8NN8t30HJKrw0/y3fQwayTvH8SjWSd4/iUGln5JVeGm+W76DkdV4ab5a/QwayTvH8SjWyd4/iUGln5HVeGm+Wv0HI6rw03y1+hh1kneP4lGsk7x/EoNLNyOq8NN8tfoOR1Xhpvlr9DDrJO8fxKNZJ3j+JRc0s/JKrw03y1+g5JU+Gm+Wv0MGsk7x/EpdZJ3j+JRddLNySp8NN8tfoOSVPhpvlr9DDrJO8fxKNbJ3j+JRc0s3JKnw03y1+g5JU+Gm+Wv0MOsf3j+JRrJO8fxKS5pZuSVPhpvlr9BySp8NN8tfoYdZJ3j+JRrJO8fxKLmlm5JU+Gm+Wv0HJKnw03y1+hh1kneP4lGsk7x/EouaWbklT4ab5a/QckqfDTfLX6GHWSd4/iUayTvH8Si5pZuSVPhpvlr9BySp8NN8tfoYdZJ3j+JRrJO8fxKLmlm5JU+Gm+Wv0HJKnw03y1+hh1kneP4lGsk7x/EouaWbklT4ab5a/QckqfDTfLX6GHWSd4/iUayTvH8Si5pZuSVPhpvlr9BySp8NN8tfoYdY/vH8SjWyd4/iUtzSzckqfDTfLX6DklT4ab5a/Qw6yTvH8Sk1kneP4lFzSz8kqvDTfLX6E5HVeGm+Wv0MOsk7x/Eo1kneP4lJdNLNyOq8NN8tfoOR1Xhpvlr9DDrJO8fxKNZJ3j+JS3NLNyOq8NN8tfoOR1Xhpvlr9DDrJO8fxKTWyd4/iUXNLPySq8NN8tfoOSVXhp/lu+hg1kneP4lGsk7x/EoNLPySp8NN8t30HJKnw03y1+hg1kneP4lJrZO8fxKLml2OSVXhpvlr9ByOq8NN8tfodfWSd4/iUayTvH8Si5pdjkdV4ab5a/QzUkM1PNr5onxxxtcque1U6FRE29N1OjrJO8fxKcXOc72nKvxW4NLim5AARoAAQBCgDZ02C1E8LZFkZGjkuiLdVsatdyntYPsIvuN/Q4Y+JVREWfa+C5HBzddfzfCLe7ScwTeIj4VHME3iI+FTfg8vEYm79D2HkfL7z1aDmCbxEfCo5gm8RHwqb8DiMTc7DyXl956tBzDN4iPhUcwzd/Hwqb8DiMTc7DyXl956tBzDN38fCpeYZe/j4VN8BxGJudh5Ly+89Wh5hl7+PhUcwy9/Hwqb4DiMTc7DyXl956tDzDL38fCo5hl7+PhU3wHEYm52HkvL7y0PMMvfx8KjmGbv4+FTfAcRibr2HkvL7y0PMU3fx8KjmKbv4+FTfAcRibnYeS8vvLQ8xTd/HwqXmKXv4/JTegcRibnYeS8vvLRcxS9/HwqOYpe/j4VN6BxGJudh5Ly+8tFzFL38fCo5il7+PhU3oHEYm52HkvL7y0XMUvfx8KjmKXv4+FTegcRibnYeS8vvLRcxS9/HwqOYpe/j4VN6BxGJudh5Ly+8tFzFL38fCo5il7+PhU3oHEYm52HkvL7y0XMUvfx8KjmKXv4+FTegcRibnYeS8vvLQ8xTd/HwqOYpu/j4VN8BxGJudh5Ly+8tDzFN38fCo5hl7+PhU3wHEYm52HkvL7y0PMMvfx8KjmGXv4+FTfAcRibp2HkvL7z1aHmGXv4+FRzDL38fCpvgOIxNzsPJeX3loeYZfER8KjmGXv4+FTfAcRibnYeS8vvPVoeYZu/j4VJzDN38fCpvwOIxNzsPJeX3nq0HMM3iI+FRzBN4iPhU34HEYm52HkvL7z1aDmCbxEfCo5gm8RHwqb8DiMTc7DyXl956tBzBN4iPhUw1OCzwQukSRkiNS6ol0Wx6Uxz/YS/cd+hYzGJdjE+B5PRNqZif7l4sETchT6D8OAgAFIAC7lPawfYRfcb+h4pdyntYPsIvuN/Q8mb8Ifpv8AGvrxP1/1kAB4n6wAAAAAAAAAAAAAAAAAAAAAADlE5rJWOe3O1rkVzetL7UA7kWC4rNScriw2sfTWvrWwuVtuu9jFHQVctDNXR08jqWFyNkmRPVaq7kVfxTzQ+my4imO4tT1mjelraSRWtbHhtS1WMRUS2W25b/Bfceenw+qXR/SR9dnhrWYhEx8MMithVznJtyJsXfdDvOFEeD5OF8Qrq5VxETeOXO8Xm33iPWOTxQPoMmCaL0OP0mjdXS1ktW5Y2y1jZsqK9yXy5eyvXvS5148CwKmptIquvp6mSLDa5IYY4plarm3sjVX9V3mflTu6x8Sw5i+medrco53m0W5/7eGMvJajkvKtRLyfPk1uRcmbqvuv7j0Gl+F4dTUmE4nhEcsNNiELnaiR+ZY3NVEWy/j/AGO6xL+itEXpxf8A6SaOcxLrOciaKK6Y+qq3P7c5ifSzxoPpU2j2irNKP2cSjrUnniRzajX3SJ2XMiInTuvt6z5xPGsM8kSrdWPVqr12WwromnxXLZyjMfTExyiee0+E+zgADm9YAAAAAAAAAAAAAAAAAAAAAGOf7CX7jv0Mhjn+wl+479Cx4s1/TLxSbkATcnwB9d/LwAAAQoEXcp7aD7CL7jf0PEruU9tB9hF9xv6HkzfhD9N/jX14n6/6yAA8T9YAAAAAAAAAAAAAAAAAAAAAByje6KRska2exyOavUqbjiAPYt0xwySojxCs0ZppcUjyqk7JlYxXJucrLWua2o0pqKrDcWpamFHS4jUMndM11sitVNiJ+HWaAHScSqXkpyOBTN4jb7zNrTeLc+UX+3g+uYW+rqqrDcWrKLBajVsbrcYbU+yxE23YtvXt09B4fFNI2SRY/RQQZ4cRrteybNbKiOumy229jzYLVizMWhxwPhtGHXNVU38LeMWtN4+8/fa0fhtcUxpcQwfCsOWnSNMPY9qSZ76zMqLuts3HNuOq3RdMD5Olkq+U67P7rZbW/vc04Mapevh8LTFNuUTf93v/ANenl0udJpjFpFyJEWNqJqNbvsxW+1b333HnKiXXVEstrax7nW6rrcxgTVM+Jh5fDwraItyiP1Hh/sABl2AAAAAAAAAAAAAAAAAAAAAAxz/YS/cd+hkMc/2Ev3HfoWPFmv6ZeKTcgIm5Cn138uAQAAQpRT0VJjVMlPG2fO17Woi2bdFsecKc8TDpri0vbks9jZOqasO3Pd6jnuh7b/lqOeqHtv8AlqeXBy4Wh9HvDm9qfSer1HPVD238Cjnqh7b+BTzAHC0HeHN7U+k9Xp+eqHtv4FHPVD238CnmAOFoO8Ob2p9J6vT89UPbfwKOeqLtv4FPMAcLQd4c3tT6T1en56ou2/gUc9UXbfwKeZA4Wg7w5van0nq9Nz1Rdt/Ao56ou2/gU8yUcLQd4c3tT6T1em55ou2/gUc80XbfwKeZA4Whe8Ob2p9J6vTc80XbfwKOeaLtv4FPMgcLQd4c3tT6T1em55ou2/gUc80XbfwKeZA4ag7w5van0nq9NzzRdt/Ao55ou2/gU8yBw1B3hze1PpPV6bnmi7b+BRzzRdt/Ap5kDhaDvBm9qfSer03PNF238Cjnmi7b+BTzIHC0HeDN7U+k9XpueaLtv4FHPNF238CnmQOFoO8Gb2p9J6vTc80XbfwKOeaLtv4FPMgcNQd4c3tT6T1em55ou2/gUc80XbfwKeZA4ag7w5van0nq9NzzRdt/Ao55ou2/gU8yBwtB3hze1PpPV6bnmi7b+BRzzRdt/Ap5kDhaDvDm9qfSer03PNF238Ck56ou2/gU80BwtCd4c3tT6T1el56ou2/gUc9UXbfwKeZA4Wg7w5van0nq9Nz1Rdt/Ao56ou2/gU8yQcLQd4c3tT6T1en56oe2/gUc9UPbfwKeYA4Wg7w5van0nq9Pz1Q9t/Ao56oe2/gU8wBwtB3hze1PpPV6fnqh7b+BRz1Q9t/y1PMEHC0HeHN7U+k9XqOe6Htv+Wphq8aplp5GwZ3Pc1US7bIlzzoLGWoibs1/H83VTNPKL/j/AOm4gB3fDAQFAAAUEKBQQpFAABQQoAAAAAFUEKAKQAUEuAKAAAAAAAAAiKqoiJdV3IhllpaiGZIZqeaOV1rRvjVrlvusipcDECuY5tlc1zbpdLpa5AAAAAAAAQCggAAAAQAAAAgAABAAAAAEACBACgAAAAAGVJWIn2ES8X1MQAza5nh4vzfUa5nh4vzfUwlAza1nh4vzfUa1nh4vzfUwlIMutZ4eL831GuZ4eL831MQCs2uZ4eL831GtZ4eL831MIAza1nh4vzfUa1ncRfm+piAGXXM7iL831GtZ3EX5vqYgBl1zO4i/N9S65nh4vzfUwgDNrWeHi/N9RrmdxF+b6mEXAza5ncRfm+o1zPDxfm+phKFZdazuIvzfUa1ncRfm+piAHN70da0bWfdvt81OJAB6n0cua3H5tW6NmIOoZ24a6RUREqlb6llXYi+1a/TY9dgzcXiTR+PS5annJdIadaBtc5VqEi/4q7fWyXy2vsvuPlBydI97sz3uc7tOcqr5lSYbXSnFK3Fsbqpq+d0rmSvjiavsxsRy2a1NyNTqQ1JAQc2ORt7sa/719nkctazuIvzfUxAKy61ncRfm+o1zPDxfm+piAGXXM7iL831GuZ3EX5vqYQEZtazuIvzfUa5nh4vzfUwgDLrmeHi/N9RrWdxF+b6mIAZdczuIvzfUa5ncRfm+piAGXWs8PF+b6jWs8PF+b6mIgGbWs8PF+b6k1zPDxfm+piAGXWs8PF+b6jWs8PF+b6mIAZdazw8X5vqTXM8PF+b6mIBGXXM8PF+b6kWVip9hEnF9TECgAAAAAhSACgHJsb3pdjHOT3JcDiDJqJu6k4VGom7qThUDgDnqJu6k4VLqJu6k4VAxlOeom7qThUaibupOFSDgDnqJu6k4VLqJu6k4VCsYMmom7qThUaibupOFQOAOepm7qThUamXupOFQOAOepl7qThUaibupOFQOAOeom7qThUaibupOFQOAOeom7qThUaibupOFQOAuc9RN3UnCo1E3dScKhXAHPUTd1JwqNRN3UnCoHAHPUTd1JwqNRN3UnCoHAHPUTd1JwqNRN3UnCoHAHPUTd1JwqNRN3UnCoHAHPUTd1JwqNRN3UnCoRwBz1E3dScKjUTd1JwqBwBz1E3dScKjUTd1JwqBwBz1MvdScKjUy91JwqBwIZNTN3UnCo1E3dScKgYwZNRN3UnCo1E3dScKgYwZNRN3UnCpNRN3UnCoGMGTUTd1JwqNRN3UnCoRjIZNRN3UnCo1E3dScKlGMGTUTd1JwqcXRvYl3sc1PeioBxAIAAAAABA9NTtRkEbWpZEan6HmV3Keni+yZ91P0BLICFCAAAXLcgAoIUAAAAAAAAALgBS4uABQQAUEAFBABQQAUEAFJcABcXAAAAAAAgAAAAAC5AAuAAAAAGKoaj4JGuS6K1f0Mhwl+yf8AdX9APMAJuQBoAARCkAFXcp6eL7Jn3U/Q8v0Keoh+yZ91P0A5gAIoIAKAAAAAFIAKCFAAAD1GN4ZRU2g2juIQU7WVdVJMk8qKt3oirb3GRuC00/o/oq2npUdic+KcmbIirmci3s3fbfY7mHTYVpFobR4JW4pBhlfh073wvqU/dysddVS/Qu3+wxvEcLwvBMH0fwvFFqXU9Zyuqrqdl0Y662yIu9Uvf8E6wNXi2h1XhlLUzLiGGVEtIiLVU0FReWC/Wiol/wADLSaC4jUQUyvrcOpqyrj1lNQzz5ZpW9Coltl/eek0hr8Jq8ExN+L4jgWJTyRf7BPRwLHVLJ0K9OhN1/xO7PpFR4k+jxWjxbR+iSOBiTNrqLPUwyN7HS5OqygfMKOj1uLQUNW5afNUNhlc7Ysd3ZVv8Np9GxvC8GwWuloKvQqrdhUbbc5wve+Vdnt3TZv6FX6Hzyqq4q3HJauvV8kM9SskywtRjnNV21Wot7LbbbafRsEq6XB8QhrabTxkmBx+tyKoc58qtt7GVem/SiJ8APIrRNdoRPUU1DTSxc6aqKsddKlUtsblRLWVLdPTu6TuR+jjFnzQ0vLsLbXvRHPo3VH72Jq9Kpb9LnZk0gw5NGah1IsbZl0hSthor2dqkVFTZ1dBv8LhwLEPSNTY3S40509S7WNw9YHJM1+rsqOvuaiIq/2A8ThmhlfiFFUVqVdBT01NVOpppambIjFbvdu3bk69p0NJMAq9Ha5tLWuiekkaSxTQuzMkYvSim9xHEKP9isUw/lMfK344+VIb+srO1bqGP4+yBNF6rCaqCSqosNSKT1Uekb7WVHIuy9rgef0Zi5RpDh0KQQVKvqGN1M62Y+67nKiLs/BTdv0RrsWxHGp6fm6hgoqxYpmumVscO3oVU9lPw+BxoNK6zEtJcEnxuop2wUlW2RXthbGjE2XVVRPcbDEcXw+TBtMoY6yF0lbibZadqO2ysR6LdOtAPOaSaO1ej01O2plgqIamPWQVFO/NHInTZfxTzNzgmG4RhWi37R45RrXvqJ1go6NXqxi2vdzlT4L5e862kdfSVOiOi9LBURyVFLFMk8bV9aO7ktc7eC1mF43ok3RzFa9mHVNLULPR1MqXjci3u13VvX+wHSxyfRrE8HZV4ZSc14qyVGPomK58czV/matrIvu2dPuOyno8xdYkZynD0xBYtamGrUfv8u/da1/cY8RpNH9H6OlWmr24tjDalkrn07lSCNjVRcvvVbW/H3HpHT6Pv0wbpj+0MCU2yZaNWryjPky5MvV/894Hj8D0TrMWopq+Spo8Po4ZNUs9bJq2q/sps3m60p0WlY/RjC8PooecKmkVJdSqWkeipdyuTelrrfqOcdZhulGjD8OqMSpsKrIMQlq2JVKqRyMkVy2unSmZU/D3mzbpHgeE45os6DEG1lJR0MlLPO1q3ZeyI5W703buoDyOLaJVWH4fNXQ1+H4hBTvSOpWimzrA5diZktuvsueePoOkOJpS4HXU8WMaPStq0RjYMMobPlZfe9yKiMt+J8+AAAACAAAAAAAAEApAABwl+yf91f0OZwm+xf8AdX9APMJuQE6EAUAAAAAF3HqIfsmfdT9Dy56ame2SCNzFumVNwJZQNoCAAAFIAKAAAAAAAAUgAoJtKAAAAAAEVUW6KqKnUeo/b/SHk+r5TDrtXq+V6huvy9Wf/M8uAAAAAAAAAAAAAD8AAJtG0AAAAAAAAAATaAAAAAADhN9k/wC6v6HP8DFUvbHBI562TKu8DzKbgAFAABCkAFKiqm5VT4KQAcs7u07zGd3ad5nEAcs7u07zLnd2neZwKByzu7TvMZ3dp3mcQByzu7TvMZ3dp3mcQFc87u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zGd3ad5nEAcs7u07zUZ3dp3mcQByzu7TvMZ3dp3mcQByzu7TvMZ3dp3mcQByzu7TvMZ3dp3mcQByzu7TvMZ3dp3mcQQcs7u07zJnd2neZCFHLO7tO8xnd2neZxAHLO7tO8xnd2neZxARc7u07zGd3ad5nEAcs7u07zIqqu9VX4qQAACAAAEAAAKQBVAAAAAUEAFAAAABVBABQQoAAEAAFAAAAAAAAAAAAAAAAAAAAAQAQFFIAAAAQAIBSAAAAAAIAAAQAAAAAAAAKQBVAAAAACkAFBCgAAAAAUKQAUEAFBABQQoAAXAAAAAQCggAoIAAAAAAIAAACAAAAAAAAEAAAIAAAAAAIUAVrXOWzUVy9SJdSIfQJK+t0bwjRvDtH6yPDZMVpUq6vELoxXudI5qNdJZVaxiN3J1qqgfPwfSq3RjEtJsawZ+J1eF1DaqGdZK/CVzvqGwpmcrksjVk9ZGouy99u4r9EMOwyfCsVmoMVo4ExGOnlo6qoifI/NtY9rkba10s5qp07FBd80LuPQ+kPkX7ZYymHxTxsbVzJIkrmr+8zuzK2yJZvUm9D0/pAwLDavSmpnn0mwuhkfBT5qaaKZXs/cMTblYqbd+xekF3zfdvOUbHyOyxsc91lWzUVV2bz6nj2irMd06xuV7aiopcOoqNyw0WVslQ50UbWo1XbGou1yqqbETdc4YTozHgOlmE1NPHU08ddh9eq0lXIx8sD2QPRUVzdiot0VFsgLvloPYrhOi2GYVgdTjD8WlmxOl1sjaV8bUgRJHNz7Wrm9n2dm5du00OkmEPwHHa7CpJEldSyqxJES2dN7XW6LoqLYLdrAeixPR6FcEhxvAZ5KuhRGx1jHtTW0cypueifyOX2XJ8F2jGtH4cCwiHnSokZjlQrZG0DET/AGeFU3yr0PdsVGpuTfvBd50pABQQAUAAAAAAAAABQAAAAAAAQAAAAAALkAoIAAAAAAAAABAAAACAAAAAACAAAAKeiwzSeKPCocLxvCYMWo6ZznUqSSvikgzLdyNe1fZVdtl6TzhQPTP00rW4tRVdJSUlPSUMToIMPY1VgSJ90e111u7Ndcyqt1/A6mI43Qv5PzNgdLhawzJPrGyvmkc5NyZnrsanV5qaQAs2ekmLMxzFpsRbQw0clQqvnZC9zmvkVVVz0zKtrqu7cXSXGZdIMYmxKaJkL5WRsVjFVUTIxrE3+5tzVgD1Ummk9RjFdWVmH089JiFNFT1dC57kZI2NrUaqOTajkViKi9G0w0+k8FDjMFfhWC0lHFBTywNga97lfrGOarnvVbuX1tm5Nh5sAe7rNIsJp8E0ZgqcJocWfS0Cr68z2Ohk1z1yvyr6zbZVyr/mp5DFsRqcXxOpxGuej6mpkWSRUSyXXqToToOmANngGPYlo7XctwipWCfKrHeqjmuavQ5q7FTp29KXOlVVE1XUS1NVK+aeVyvkke67nOXeqr1mEoUAAAAAAAAKQAW4IAKCACggAoIAKCAC3BAAAAAAAAAAAAAEAAABAAAAAAAAAgAAAAAAAAAFBCgAAAAAAAAAAAKQBVBABQAAAAAAAAAAAAAAAAAAAAAAAACAUEAAABAAAAAAAAAAgFIAAAAAAFEABBQQpQABAKQAUAAAAAAAAAAAAAAAAABVBABQQAUEAFBABQQAUEAAABAAAAAAAAAAAAAAAIAAAAAACAFAAEAAADZ02FxT0j6jnKmY2NGrIjmSXZmWyJsbt29RrDvUdRFHheIQvfaSXVZG232ddQhLhkyUsdRBmnjdnu6ONyo1Gra69SKYko5X6hIGumfKxXoyNjlVLKqdW3d0GzoMTjgTBmcocxkE73ztS9kRXJv69lzJTV8GrghSeBG8ldFI2ZHo1f3rnImZu1uyy3TZ0FGi1Umt1WrfrL5cmVb36rHOSmqIsmtglZrPYzMVM3w6zbU0kMmltJJTSPkjWpjs57lcqrsvZV2ql919trHYhq6SH93V4k+oSWsbMjo86LEiI7aq2uiqqoi26E+BFaKSlqYpmwy08rJXWyscxUcvwQSU1RFIkcsErHquVGuYqKq9VvxQ9HHXU7n0cEMjVmayoYr6Vsj9VnalnJm9Zbbb295Y6mLD4cJdUVKzNTlLUlVr7NzIiIqXs6yL0pbptuA8zPDNTvWOeJ8T0S+V7VavkpmfQz8olhgY+o1XtOjjdsS2+ypdPxOzjVSyWOmgjfTvbC11lg1iol1vbM/avX7rm1biVLLXVWaqhSndUMlTPrGO2Ntma5m26dSoB5qOOSV2WJj3u32a1VU5upqhkqwvglbKiXVisXMifA2uCPYlZibo55Io1pZcszkVXIiuSyrb+9jOzEoaVkcbKzWTw0U0aVDM1szlu1rVVL7Nu33gaPktTq5JOTzZI1s92rWzV6lXoMtTh1VTR00kkT7VDczPUXrVLbt+y9upUNvR4hAi0FTJWrGyliVk1MqOVZVu5Vt0Lmul7nGixKnjkwuaWe+phkhex2ZVjcuaz9nR6yblvsA0z6SpZOkD6eZszt0axqjl/DeZoMMrJkqcsEiOpmZpGqx196Ja1t+2/wAEU2/OMDUSl5TTx3p5I454Na5IlcrVsrnbbLZU2JszL7zrRVLI1qqd+JrJrKRImzKj8iORyOyp0qlkVL26eoDVcnn1HKNTJqb21mRct/juM8GHVEsMszmPjiZC6Vr3sWz0S2xF/E20uKU7qFroX07XJRJTrE/Wq+9rKiIi5LX23/zOVTX0z1xKduIZmVdNkipsrrsX1bNVLWS1lRLAaanw+appHzwNdI5sqR6tjFc5boq32fA67opGJd0b2pmVt1aqbU3p8TZ4fNEuEVNItclLLJOx6K7Nlc1GuvdUTZtVDZRV1NV1Va+VXS09KkdU2RzbayRjUYt+rOtvIDQUtFNU1S07URj2oqvWT1UjRNqq7qsc6qijih11PWwVLEdldku1zV+65EVU96GTDq1iVVSta9yNq4nxyyol1arlRc1unaifgdzlNHR0bIZH0lbIksatWGCytY1brd6oiqq7rAaiWnnhYx80EsbXpdjnsVEd8L7xNTTwZdfBLFnS7c7FbmT3XPQc5UtPPNPLWLXMnq45mxZXXYjXXVVR2xFtssn6HGnrYaaSJH1a4i99cyZqMa5VaiXuvrJ7S3TYnUBqafDKqWsgppYpIFme1iOkjVETNuMDKaeSOSSOGR8cftvaxVRvxXoPS08jaGmjkqa587G4pE9z3MemWyOv7SXv1om7YYKHFKeKjo1bJTxy0uszNm1t3KrlW6I1bOui2W/V1Aeeiikmdlije9epjVX3dBy5NPqFn1EupRbLJkXKi9V9x28MrOSU+IZZVillgRkatvdVztVURejYimzlxOndQo6J9O13Ikp1ifrVfe1lRERclr7b/wCYGviwhXJEyWspoamZqOjgkzXVF9m62s2/RcxUeGVFXHVPZlbyZt3Ncu1y7fVTrWyKv4HbqeQYlUMrZq9kCOYxJ4VY5XorWoi5NllvbZdU37TJS4rR4dBRshp1qHMkWd6rKrLOXYjV2bbNRPdtUDoUuHtno3VUtXDTxpJq01jXLdbX/lRegzRYM59a2jkrKeKZ6s1V0c5JUcl2qiom742OxJW0VJR1EFK2CqatZrI2zRuVEZl2L0bU3HVo8QWTHaStrXta1kzFcrW2RjW2siInQidAEbhbXvfq66ndDE3NNNlejY9tkSypdVXoRC80vdLG2CpgmilZI9krVVE9RFVyKipdF2f3FDNA+nrKKeZIWzvbJHKqKrUc1VsjrbbKjl2megfRYZXwyMrElkbFLrJGsXVo5WKjUS6XXbvultoGtgpnTU1RO1zUbA1quRd65nW2eZlkw6ZmGR16qzVPflyovrIm2zlTqVUVE+B3I8VfU4bW01ZPG10iRpHaJrdqPRV9lOhDtSYphs0s9GkKx0z4OTsqFkctkZtY7JbtJf8AqUDTUtBUVcFRNBG5zIGo59mqt7qiWS3xv8EMS087YEndDKkLlskisXKv47juYZUMZTV9PJPqVnhRGOW9syORbLbrRFQ2FRX0z0qqlKzNHPSJCyjs67HZUREVLZURqpdFRQNHBTz1LlbTwySuRLqkbFcqJ+BYaWpnvqKeaS175I1W1t+42uD1lOzD5aWR8MciztlR0zpGtciJbezbdF27es5VOL5480c+SR2IunckSOaits2zrfFF94GnZTzyRPljhkdGz2ntYqtb8V6DjqpL21b75c9sq+zvv8PeekTEKKVZ0lqo2wNmndHk1jJWo9Vtlt6rkXZsXduOulTRqx1StYxHuw3k2pyuzZ0Zl6rW2b7gaZKaoVWIkEqq9bMsxfWW19nXsOMkMsc2pkie2W9sjmqjr/A30WLw8uakk14eb208bn58sb8rb+ztRLoqKqdZrsZqkmngSKSF2oiRjXw57JtVbXftW194HR1cnr/u3+otneqvqru29RzkpKmKRsctPMx7ku1ro1RVTrRD0U+IwUlTQVDmKi1cjKyqRG7WrbKlk6duZ6fFDFSV1NR6iKoxDlSrUOesrEcqRNcxWqvrIi3VVRVROoI0lHSPqZEbfVtVj3I9ybFytVyp/wDOs4NpahysRKeVVetmIjF9ZbX2dexTuYitPHhlHSQ1UdRJFJK56xo5Gpmy2sqol9xsY8XhWuVJJkdCtAynjc/Pljdlbf2dqIqoqKqdfUVXn5YpIZFjmjdG9u9r2qip+CnA2GNVLaieFrHwvSGJI0dDntvVbXftW195rwAAIAAAAAIAG4ZhNK6KFnKZeVT0q1DG6tMiWRy5VW99qNXoA04NuuFU+2n5TJy1KfXq3Vpktlz5b3vfL02tfYY8ehpIKiBtGkiItPG5yOaib2ot9irtXevvA1zHuY9HscrXNW6OatlRSG4rcFbT4a6qa6dHRqzO2aNG5s3Ul1VPxQsVPQvwigdVyvifJNKxHRRI5V2t2uuqbEvu95Rp2PdG9Hxuc17VujmrZUX4nOeomqZNZUTSSvtbNI5XLb8Ta8zQwSx09dUvZPNK6KPVxo5rcrst3Kq3sq9XQcMUpKamwuiyo9KpXSNlXKllVrrLtv0dBFakAAcmPczNlc5uZMrrLa6dSkIAKCACgAAAABUe9rXMa5yNdbMiLsW265AAAAAAAZaiqqKnLymollypZuserrfC5iAAAAAAAAAAAAAAAABAKCABcAAAABXvfIt3uc5UREu5b7E3IQEKAAIAAAAAAAAiAAop224jUNlhkRWZoYVhZ6v8qoqf9SnTKQd/nep5NqbRZli1KzatNYse7Lm6rbOu2w69TVyVLYUlRmaFiMR6Ns5UTddemybDAANhVYxU1UM0b2QN16tdM5kSI6RyLe6r1kpcWqKaCKBI6eRkT1fGksSOyuW21PJPcdAAbGDGauJEVdVK9r3SRySxo50bl2qrV+O34mJmIzJFDE9sUrYpdazWsRy3Xei9aL0odMBVVbqq2RLrfYCAooAIAAAAAAUgAoILgUEAFAAAAAAAAAIBQQXAoIAAAAAAAAAABCikAAAAgAAAAAgQAoAAKAAiAAKqggIigAKAAAAAAAAoICigAAACAAAAAAAAAAAAAAAAAAAAAAAAAAQopAAAAIAAAAAAAQIpACgACAAAAAAAAAACgUgAoIUgAAKAAAAAAAAXKQAUEBRQQAUEAFAAAAgFBABQQAUEAAAEAAAAAAAAAABAEAAAFUABEAAAAAAAFAAEAAAAAAABVUEARQAQAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEACAUgBQAAAAEAAAAAAABQBCgAAAABAAAAAAAAAABVCkARQQpAAAAABQAAAAAAAAAAAAAAAAABAAgFBAUAAAAAUABEAAAAAAAFAAAAQAAABQQAUAAAAAABAAAAAAAAAABVAAAAARQQAUEAFBABQQAUEAFIAAAAAABQAEQAAAAAAAAAAAAFAAgFIAAAAAAAAAAKQAUEKAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAABAAAAAAAAAABCgAAAAAAAAUEAFAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAIBSAAAAAAAAAAAQBAAAUEAFAAUAAAAAAABQQAUEKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABSAAAAAAAAAAACAUgAQAAAAAAAAKQAUEKFAAAAAAAAAAAAAFBABQQAUAAAAAAAAAAAAAAIBQQAUgAAAAAAAAAAAAAAABAEAAAAAAAAAAAAAAAAAAAKQAUEKFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAEAAAAAAAAAAAAAAEKAAAAAAAAAAAAAACkAFBAFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBQQBAAAAAAAAAAAAAAAAAEAAAACkAFAAAAAAAAAAAAAAAAAAAtyACggAoIAKCAKoIW4AEAFBABQQBFFyAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAACggAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEApAAAAAAAAAAAAAAAAAAAAAAACggAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUgAoIAKAAAAAAAAAAAAAAAAAAAAAAAAAQCggApAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSACggAoIAKCACggApAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=";

const SKY_RULES = [
  "Sizə verilən və hesabda sizdən başqa otaqların adını, şifrəsini, şəkillərini dəyişmək qadağandır.",
  "Aldığınız hesab 1 nəfərlik olduğunu unutmayın. Yəni ikinci bir şəxsə (ailə üzvünüzə, dostunuza və s.) vermək qadağandır. \"Mən baxım, başqa vaxtı dostum və ya ailə üzvüm baxacaq\" söhbəti yoxdur. Sistemdən izlənilir, təsbit edildiyi an hesabdan xaric olunacaqsınız.",
  "Özünüzə aid cihazlardan eyni anda baxmamaq şərtilə izləyə bilərsiniz. Yəni TV-də Netflix-də film açılıbsa, telefondan girib filmə baxmaq qadağandır. Eyni anda yalnız 1 cihaz işləməlidir.",
  "Otağın menyu dili yalnız Türk dilində olmalıdır. Menyu dilini Rus, İngilis və ya başqa dilə çevirmək qadağandır.",
  "Otağın menyu dilini dəyişmədən səsləndirmə və altyazıya rus və digər dilləri əlavə etmək sərbəstdir. Onsuz da bütün hesablarımızda avtomatik əlavə olunur. Filmi başlatdıqdan sonra alt hissədən səsləndirmə yerindən filmin dilini rus və ya ingilis dilinə dəyişə bilərsiniz.",
];

// ---- Müqavilə / İstifadəçi Şərtləri (kabinetdə qəbul üçün) ----
// Versiya dəyişsə, bütün müştərilər yenidən qəbul etməli olur.
const CONTRACT_VERSION = "v1-2026-10-14";

// SkyFlix — La Casa de Papel posteri (istifadəçinin öz brendli şəkli, koda yerləşdirilib)
const HEIST_IMG = "data:image/jpeg;base64,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";
const HEIST_ART = (
  <img src={HEIST_IMG} alt="SkyFlix" className="sa-heist-img" loading="eager" />
);
const CONTRACT_EXTRA_GROUPS = [
  {
    heading: "Geri ödənişin mümkün olmadığı hallar",
    items: [
      "Dərhal təqdim olunan elektron xidmətlər, rəqəmsal məzmun və promokodlar Azərbaycan Respublikasının “İstehlakçıların Hüquqlarının Müdafiəsi Haqqında” Qanununa əsasən geri qaytarılmır.",
      "Hesabın və ya abunəliyin aktivləşdirilməsi məhsulun təhvil verilməsi (təqdim edilməsi) sayılır və geri ödəniş üçün əsas deyil.",
      "Netflix, Spotify, YouTube, OpenAI, Adobe və digər platformalar öz daxili siyasətlərinə əsasən istənilən vaxt hesabı və ya abunəliyi ləğv edə, deaktiv edə, bloklaya və ya əlavə yoxlama tətbiq edə bilər.",
      "Platformaların daxili siyasətində baş verən dəyişikliyə görə hesabın bağlanmasına, deaktiv edilməsinə və ya xidmətin təmin edilə bilməməsinə görə SkyFlix Azerbaycan heç bir məsuliyyət daşımır və geri ödəniş etmir.",
      "Geri ödəniş zamanı məhsulun təmin olunması və sifarişin icrası üçün çəkilmiş xərclər nəzərə alınır və bu xərclər geri qaytarılmır.",
      "İstifadəçinin öz səhvlərinə görə geri ödəniş edilmir: yanlış platforma seçimi; yanlış e-mail və ya telefon məlumatının daxil edilməsi; şəxsi cihaz problemi ucbatından hesaba giriş edə bilməmək; VPN, region və ya cihaz uyğunluğu ilə bağlı istifadəçi xətaları.",
      "İstifadəçiyə təqdim edilən hazır hesab, qoşulma dəvəti, family paketi və ya aktivləşdirilmiş xidmətdə görünən e-poçt adı, profil adı, istifadəçi adı, hesab adı, qrup/family adı və oxşar identifikasiya elementləri əvvəlcədən yaradılmış və ya texniki olaraq formalaşdırılmış ola bilər. Bu məlumatlar xidmətin funksionallığına təsir etmədiyi halda qüsur hesab olunmur. İstifadəçinin bu məlumatları subyektiv olaraq bəyənməməsi, estetik səbəblərlə narazı qalması və ya adlandırma ilə bağlı etirazları geri ödəniş, əvəzləmə, dəyişdirilmə və ya sifarişin ləğvi üçün əsas yaratmır.",
      "Dərhal təqdim olunan rəqəmsal məzmun, elektron xidmət, aktiv kod və abunəliklər üzrə geri çəkilmə (imtina) hüququ, qanunvericiliklə başqa hal tələb olunmadıqda, tətbiq edilmir.",
    ],
  },
  {
    heading: "Geri ödəniş forması və müddəti",
    items: [
      "Geri ödənişlər yalnız istifadəçinin SkyflixAzerbaycan.com hesabına balans şəklində əlavə olunur. Bank kartına və ya birbaşa hesaba geri ödəniş edilmir. Balans yalnız SkyFlix Azerbaycan daxilində istifadə edilə bilər və nağdlaşdırılmır.",
      "Geri ödəniş sorğusunun icra müddəti maksimum 5 iş günüdür. Bank/ödəniş sistemindən asılı olaraq bu müddət 1 ayadək uzana bilər.",
      "Geri ödəniş həyata keçirilən hallarda sifarişin icrası ilə bağlı yaranan ödəniş əməliyyatları (bank komissiyası, vergi) və digər zəruri xidmət xərcləri nəzərə alınaraq ümumi məbləğdən 5%-dək xidmət haqqı tutulur və bu məbləğ yekun balansdan çıxılır. (Qeyd: saytda edilən ödənişlər zamanı SkyFlix Azerbaycan tərəfindən heç bir ödəniş tutulmur, tam faizsiz mədaxil edilir.)",
      "Vaxtla məhdud rəqəmsal məhsullarda geri ödəniş hesablanarkən yalnız istifadə olunmamış müddət nəzərə alınır. Məhsulun ümumi qiyməti təqdim edilən müddətə bölünür, qalan istifadə müddətinə uyğun məbləğ müəyyən edilir. Həmin məbləğdən bank komissiyası, vergi və əməliyyat xərcləri nəzərə alınaraq 5%-dək xidmət haqqı tutulur. Yekun məbləğ istifadəçinin balansına əlavə edilir.",
      "İstifadə müddətinin 90%-i və ya daha çoxu keçdikdə geri ödəniş hesablanmır və balans əlavə edilmir.",
      "Əgər məhsul üzrə platforma, tədarükçü və ya texniki aktivləşdirmə xərci artıq çəkilibsə, bu xərc geri ödəniş məbləğindən çıxıla bilər.",
    ],
  },
  {
    heading: "Platformaların məsuliyyəti və məhdudiyyətlər",
    items: [
      "SkyFlix Azerbaycan yalnız xidmətin aktivləşdirilməsinə görə məsuliyyət daşıyır və platformaların daxili siyasətinə qarışa bilməz.",
      "Abunəlik təqdim edildikdən sonra məhsulun işləməsi, ləğvi, deaktiv olunması və ya texniki problemlər müvafiq platformanın (Netflix, YouTube, Spotify, OpenAI və s.) məsuliyyət sahəsinə daxildir.",
      "Bu kimi üçüncü tərəf müdaxilələrinə görə SkyFlix Azerbaycan tərəfindən geri ödəniş və ya əvəzləmə həyata keçirilmir.",
    ],
  },
  {
    heading: "Fırıldaqçılıq və təhlükəsizlik",
    items: [
      "Ağır qayda pozuntusu (saxta qəbz, kart fırıldaqçılığı, hesab oğurluğu və s.) aşkarlandıqda istifadəçi müddətsiz bloklanır.",
      "SkyFlix Azerbaycan zəruri hallarda məlumatları hüquq-mühafizə orqanları ilə paylaşa bilər.",
    ],
  },
  {
    heading: "Əlavə xidmət haqqı",
    items: [
      "Sayt və ya platformalarda əlavə xərclər yarandıqda, abunəliyinizin fasiləsiz davam etdirilməsi üçün satıcı müştəridən minimum 0.10 AZN-dən 1 AZN-ə qədər əlavə ödəniş tələb edə bilər. Bu məbləğ xidmətin gücləndirilməsi, saytın texniki xərcləri və serverlərin saxlanması üçündür.",
    ],
  },
  {
    heading: "Şərtlərin qəbul edilməsi",
    items: [
      "Bu qaydaları qəbul etməklə istifadəçi SkyFlix Azerbaycan-ın bütün şərtlərini tam qəbul etdiyini və bütün məsuliyyəti anladığını təsdiq edir. Sifariş vermək, ödəniş etmək və ya hesaba daxil olmaq bu qaydaların qəbulu deməkdir.",
      "Bu müqaviləni qəbul etdikdən sonra müqavilənin ləğvi tələbi və ödənişin geri istənməsi qəbul edilmir.",
    ],
  },
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
  const start = Math.max(Date.now(), base ? new Date(base).getTime() : 0);
  const d = new Date(start);
  if (months) d.setMonth(d.getMonth() + months);
  if (days) d.setDate(d.getDate() + days);
  return d.toISOString();
}

function skyRemaining(dateStr) {
  const end = new Date(dateStr).getTime();
  const now = Date.now();
  if (end <= now) return { expired: true, months: 0, days: 0, totalDays: 0 };
  let months = 0;
  let t = new Date(now);
  while (true) {
    const nt = new Date(t);
    nt.setMonth(nt.getMonth() + 1);
    if (nt.getTime() <= end) { months++; t = nt; } else break;
  }
  const days = Math.round((end - t.getTime()) / 86400000);
  return { expired: false, months, days, totalDays: Math.ceil((end - now) / 86400000) };
}

function skyFmtRemaining(dateStr) {
  const r = skyRemaining(dateStr);
  if (r.expired) return "Bitib";
  const parts = [];
  if (r.months) parts.push(r.months + " ay");
  if (r.days) parts.push(r.days + " gün");
  if (!parts.length) return "Bu gün";
  return parts.join(" ");
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
  const lines = String(text || "").split(/\r?\n/).filter((l) => l.trim() !== "");
  if (!lines.length) return [];
  // Ayırıcını BİR DƏFƏ başlıq sətrindən seç (sahə içindəki ; və , işi pozmasın)
  const head = lines[0];
  const sep = head.includes("\t") ? "\t" : (head.split(";").length > head.split(",").length ? ";" : ",");
  const parseLine = (line) => {
    const out = []; let cur = ""; let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; }
        else cur += ch;
      } else {
        if (ch === '"') q = true;
        else if (ch === sep) { out.push(cur); cur = ""; }
        else cur += ch;
      }
    }
    out.push(cur);
    return out.map((c) => c.trim());
  };
  return lines.map(parseLine);
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

// Google biznes rəy linki (Skyflix Azərbaycan)
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJu3Kic8R9MEARY5ZKtf1zRKY";

// ---- Abunəlik yeniləmə planları və hədiyyələr ----
const RENEW_WA = "994517873090";
const RENEW_PLANS = [
  { months: 1, amount: "3.22", label: "1 ay" },
  { months: 3, amount: "8.55", label: "3 ay" },
  { months: 6, amount: "16.39", label: "6 ay" },
  { months: 12, amount: "21.77", label: "12 ay" },
];
const GIFT_12 = "12 aylıq YouTube Premium · 3 aylıq Exxen · 3 aylıq BluTv · 3 aylıq Amazon Prime Video · 3 aylıq HBO Max — hamısı PULSUZ";
const GIFT_1_OFFER = "1 aylıq HBO Max və ya Exxen — PULSUZ";
// Seçilən plan üçün hansı hədiyyə göstərilsin (path: 'direct' = birbaşa artır, 'offer' = Artırmıram sonrası)
function giftFor(months, path) {
  if (months === 12) return GIFT_12;
  if (months === 1 && path === "offer") return GIFT_1_OFFER;
  return "";
}

// -----------------------------------------------------
// MÜŞTƏRİ SƏHİFƏSİ: skyflixazerbaycan.com/#h-<kod>
// -----------------------------------------------------
function SharedAccountPage({ slug, embedPhone, embedPin, onExit }) {
  useGoogleFonts();
  const storageKey = "skyacc:" + slug;
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "null");
    } catch {
      return null;
    }
  })();

  // Çatdırılma linkindən gələn nömrə + PIN (QEYD kimi göstərmək üçün)
  const dlvParams = (() => {
    try { const q = new URLSearchParams(window.location.search); return { nf: q.get("nf") || "", pin: q.get("pin") || "" }; } catch { return { nf: "", pin: "" }; }
  })();
  const [phone, setPhone] = useState(saved?.phone || embedPhone || dlvParams.nf || "");
  const [pin, setPin] = useState(saved?.pin || embedPin || dlvParams.pin || "");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const [whatsapp, setWhatsapp] = useState("517873090");
  const [codeCopied, setCodeCopied] = useState(-1);
  const [nowTick, setNowTick] = useState(Date.now());
  const [contractAccepted, setContractAccepted] = useState(null); // null=bilinmir, true/false
  const [contractChecking, setContractChecking] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  // Bildirişlər (kabinet zəng)
  const [cabNotifs, setCabNotifs] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifReadAt, setNotifReadAt] = useState(() => {
    try { return Number(localStorage.getItem("skycab_notif_read") || 0); } catch { return 0; }
  });
  // Yeniləmə axını
  const [renewOpen, setRenewOpen] = useState(false);
  const [renewStep, setRenewStep] = useState("intro"); // intro | offer | plans | pay | done
  const [renewPath, setRenewPath] = useState("direct"); // direct | offer
  const [renewPlan, setRenewPlan] = useState(null);
  const [renewBusy, setRenewBusy] = useState(false);
  const [receiptName, setReceiptName] = useState("");
  const receiptFileRef = useRef(null);
  const [reviewHidden, setReviewHidden] = useState(() => {
    try { return sessionStorage.getItem("skyreview_" + slug) === "1"; } catch { return false; }
  });
  function hideReview() {
    setReviewHidden(true);
    try { sessionStorage.setItem("skyreview_" + slug, "1"); } catch {}
  }

  function openNotifs() {
    setNotifOpen((v) => !v);
    const now = Date.now();
    setNotifReadAt(now);
    try { localStorage.setItem("skycab_notif_read", String(now)); } catch {}
  }

  async function checkContract(ph = phone) {
    setContractChecking(true);
    // 2 cəhd — şəbəkə anlıq xəta versə belə təkrar yoxlasın
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const { data, error: err } = await supabase.rpc("contract_status", { p_phone: ph, p_version: CONTRACT_VERSION });
        if (!err) {
          setContractAccepted(!!(data && data.accepted));
          setContractChecking(false);
          return;
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 800));
    }
    // Yoxlanıla bilmirsə: TƏHLÜKƏSİZ tərəf — qəbul edilməmiş sayılır, məlumat göstərilmir
    setContractAccepted(false);
    setContractChecking(false);
  }
  async function acceptContract() {
    if (!agreeChecked || accepting) return;
    setAccepting(true);
    try {
      await supabase.rpc("accept_contract", { p_phone: phone, p_name: result?.name || "", p_version: CONTRACT_VERSION });
      setContractAccepted(true);
    } catch (e) {
      setError("Qəbul qeydə alınmadı, bir daha yoxlayın.");
    } finally { setAccepting(false); }
  }

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
    else if (embedPhone && embedPin) check(embedPhone, embedPin);
    return () => document.head.removeChild(meta);
  }, []);

  // Giriş edilibsə, hər 15 saniyədə yeni kodları yoxla
  useEffect(() => {
    if (result?.status !== "ok") return;
    const id = setInterval(() => check(phone, pin), 15000);
    return () => clearInterval(id);
  }, [result?.status, phone, pin]);

  // Sayğac üçün hər saniyə saatı yenilə
  useEffect(() => {
    if (result?.status !== "ok") return;
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [result?.status]);

  // Giriş uğurlu olanda müqavilə qəbulunu yoxla
  useEffect(() => {
    if (result?.status === "ok" && contractAccepted === null && !contractChecking) {
      checkContract(phone);
    }
  }, [result?.status]);

  // Bildirişləri yüklə (giriş olanda, hamıya olan bildirişlər)
  useEffect(() => {
    if (result?.status !== "ok" && result?.status !== "expired") return;
    const load = () => supabase
      .from("notifications")
      .select("*")
      .is("user_id", null)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => setCabNotifs(data || []));
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [result?.status]);

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
    setContractAccepted(null);
    setAgreeChecked(false);
    setRulesOpen(false);
    if (onExit) onExit();   // portal içindədirsə → #hesabgiris giriş səhifəsinə qayıt
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

  // ORTAQ təyini: otaq adı "otaq..." və ya sadəcə rəqəm (1,2,3) → ortaq;
  // adlı profil (Mehdi, Bella...) → şəxsi. Spotify/YouTube həmişə şəxsi.
  const svcL = String(result?.service || "").toLowerCase();
  const roomClean = String(result?.room_name || "").toLowerCase().replace(/\s/g, "");
  const noteL = String(result?.note || "").toLowerCase();
  const isSpotifyYt = svcL.includes("spotify") || svcL.includes("youtube");
  const isOrtaq = !isSpotifyYt && (noteL.includes("ortaq") || /otaq/.test(roomClean) || /^\d+$/.test(roomClean));

  const unreadNotifs = cabNotifs.filter((n) => new Date(n.created_at).getTime() > notifReadAt).length;

  // ORTAQ üçün avtomatik tam ekran: ok-da 1–10 gün qalanda; vaxtı bitəndə həmişə
  useEffect(() => {
    const okWindow = result?.status === "ok" && contractAccepted === true && days !== null && days >= 1 && days <= 10;
    const expiredWindow = result?.status === "expired";
    if (isOrtaq && (okWindow || expiredWindow)) {
      if (!renewOpen && renewStep !== "done") {
        setRenewStep("intro"); setRenewPath("direct"); setRenewOpen(true);
      }
    }
  }, [result?.status, contractAccepted, isOrtaq, days]);

  function closeRenew() {
    setRenewOpen(false);
  }
  function pickPlan(p) { setRenewPlan(p); setRenewStep("pay"); }
  async function onReceiptPick(e) {
    const f = e.target.files && e.target.files[0];
    receiptFileRef.current = f || null;
    setReceiptName(f ? f.name : "");
  }
  async function submitRenewal() {
    if (!renewPlan || renewBusy) return;
    const f = receiptFileRef.current;
    if (!f) { setError("Davam etmək üçün ödəniş qəbzini yükləyin."); return; }
    setError("");
    setRenewBusy(true);
    const gifts = giftFor(renewPlan.months, renewPath);
    // Qəbz MƏCBURİ — yüklənməlidir
    let receiptUrl = "";
    try {
      const path = skyNormPhone(phone) + "-" + Date.now() + "-" + (f.name || "qebz").replace(/[^\w.\-]/g, "_");
      const up = await supabase.storage.from("receipts").upload(path, f, { upsert: false });
      if (up.error) throw up.error;
      const { data: pub } = supabase.storage.from("receipts").getPublicUrl(path);
      receiptUrl = pub?.publicUrl || "";
    } catch (e) {
      setRenewBusy(false);
      setError("Qəbz yüklənmədi. İnternetinizi yoxlayıb bir daha cəhd edin.");
      return;
    }
    // Sorğunu yarat (admin görsün)
    try {
      await supabase.rpc("create_renewal_request", {
        p_slug: slug, p_phone: phone, p_months: renewPlan.months,
        p_amount: Number(renewPlan.amount), p_gifts: gifts, p_receipt_url: receiptUrl,
      });
    } catch {}
    setRenewBusy(false);
    // WhatsApp-a yönləndir
    let msg = "Salam! Mən müştəri kabinetim vasitəsilə abunəliyimi artırmaq üçün " + renewPlan.amount +
      " AZN ödəniş etdim (" + renewPlan.label + "). Zəhmət olmasa abunəliyimin müddətini artırın.\nNömrəm: +" + skyNormPhone(phone);
    if (gifts) msg += "\nAbunəliyim yenilənsin və qeyd edilən hədiyyələr təqdim edilsin: " + gifts;
    window.open("https://wa.me/" + RENEW_WA + "?text=" + encodeURIComponent(msg), "_blank");
    setRenewStep("done");
  }

  return (
    <div className="sa-root">
      <style>{`
        .sa-root{min-height:100vh;background:#150708;color:#F5EBEA;font-family:Inter,system-ui,sans-serif;
          display:flex;flex-direction:column;align-items:center;padding:28px 18px 40px;}
        .sa-brand{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;
          font-size:17px;margin-bottom:34px;color:#F5EBEA;text-decoration:none;}
        .sa-brand img{width:28px;height:28px;border-radius:7px;}
        .sa-card{position:relative;width:100%;max-width:400px;background:#1D0D0E;border:1px solid rgba(255,255,255,0.1);
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
        .sa-vpn{position:relative;overflow:hidden;background:linear-gradient(145deg,#2a0e2a 0%,#241019 55%,#0f1a2e 100%);
          border:1px solid rgba(255,255,255,0.14);border-radius:18px;padding:20px 18px 18px;margin:0 0 20px;text-align:center;
          box-shadow:0 10px 30px rgba(214,36,159,0.18);animation:saVpnIn .5s cubic-bezier(.2,.8,.2,1) both;}
        @keyframes saVpnIn{from{opacity:0;transform:translateY(10px) scale(.98);}to{opacity:1;transform:none;}}
        .sa-vpn-glow{position:absolute;top:-55px;left:50%;transform:translateX(-50%);width:240px;height:150px;
          background:radial-gradient(ellipse at center,rgba(254,44,85,0.35),rgba(37,244,238,0.12) 55%,transparent 72%);
          filter:blur(14px);pointer-events:none;z-index:0;}
        .sa-vpn>*{position:relative;z-index:1;}
        .sa-vpn-logos{display:flex;justify-content:center;gap:14px;margin-bottom:12px;}
        .sa-vpn-logo{width:48px;height:48px;display:block;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.4));
          animation:saFloat 3.4s ease-in-out infinite;}
        .sa-vpn-logo:last-child{animation-delay:.5s;}
        @keyframes saFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}
        .sa-vpn-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#fff;margin:0 0 6px;letter-spacing:.2px;}
        .sa-vpn-text{color:#E9D9E6;font-size:13.5px;line-height:1.55;margin:0 auto 16px;max-width:300px;}
        .sa-vpn-text b{color:#fff;font-weight:700;}
        .sa-vpn-btns{display:flex;flex-direction:column;gap:9px;}
        .sa-vpn-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;
          border:0;border-radius:12px;padding:13px 14px;font-size:14.5px;font-weight:700;cursor:pointer;text-decoration:none;
          color:#fff;background:linear-gradient(135deg,#FE2C55,#D6249F 55%,#833AB4);
          box-shadow:0 6px 18px rgba(254,44,85,0.4);transition:transform .15s ease,box-shadow .15s ease;}
        .sa-vpn-cta:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(254,44,85,0.5);}
        .sa-vpn-cta:active{transform:translateY(0);}
        .sa-vpn-skip{width:100%;border:1px solid rgba(255,255,255,0.18);background:transparent;color:#B9A7B6;
          border-radius:12px;padding:11px 14px;font-size:13.5px;font-weight:500;cursor:pointer;transition:background .15s ease,color .15s ease;}
        .sa-vpn-skip:hover{background:rgba(255,255,255,0.06);color:#F5EBEA;}
        @media(min-width:520px){
          .sa-vpn{padding:24px 24px 20px;}
          .sa-vpn-logos{gap:18px;margin-bottom:14px;}
          .sa-vpn-logo{width:56px;height:56px;}
          .sa-vpn-title{font-size:20px;}
          .sa-vpn-text{font-size:14.5px;max-width:340px;}
          .sa-vpn-btns{flex-direction:row;}
          .sa-vpn-cta{flex:2;}
          .sa-vpn-skip{flex:1;}
        }
        .sa-cmodal{position:fixed;inset:0;z-index:9999;background:rgba(8,3,4,0.92);backdrop-filter:blur(6px);
          display:flex;align-items:center;justify-content:center;padding:14px;animation:saCIn .25s ease both;}
        @keyframes saCIn{from{opacity:0;}to{opacity:1;}}
        .sa-cmodal-box{width:100%;max-width:560px;max-height:92vh;display:flex;flex-direction:column;
          background:#1A0C0D;border:1px solid rgba(255,255,255,0.14);border-radius:20px;overflow:hidden;
          box-shadow:0 24px 60px rgba(0,0,0,0.6);animation:saCUp .3s cubic-bezier(.2,.8,.2,1) both;}
        @keyframes saCUp{from{transform:translateY(16px) scale(.98);opacity:0;}to{transform:none;opacity:1;}}
        .sa-cmodal-head{padding:22px 20px 14px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);
          background:linear-gradient(180deg,rgba(225,18,42,0.12),transparent);}
        .sa-cmodal-badge{width:48px;height:48px;border-radius:14px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;
          background:linear-gradient(135deg,#FF3B4E,#B00C20);color:#fff;box-shadow:0 8px 20px rgba(225,18,42,0.4);}
        .sa-cmodal-art{margin:0 0 12px;display:block;animation:saArtIn .5s cubic-bezier(.2,.8,.2,1) both;}
        .sa-heist-img{display:block;width:100%;max-height:230px;object-fit:cover;object-position:center;border-radius:14px;
          box-shadow:0 10px 26px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);}
        @keyframes saArtIn{from{opacity:0;transform:translateY(8px) scale(.94);}to{opacity:1;transform:none;}}
        .sa-spin{animation:saSpin 1s linear infinite;}
        @keyframes saSpin{to{transform:rotate(360deg);}}
        .sa-cmodal-title{font-family:'Space Grotesk',sans-serif;font-size:20px;color:#fff;margin:0 0 8px;}
        .sa-cmodal-note{color:#CBB7B5;font-size:13.5px;line-height:1.55;margin:0;}
        .sa-cmodal-body{flex:1;overflow-y:auto;display:flex;flex-direction:column;min-height:0;}
        .sa-crules-toggle{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;
          background:#150708;border:0;border-bottom:1px solid rgba(255,255,255,0.08);color:#F5EBEA;
          padding:16px 20px;font-size:14.5px;font-weight:600;cursor:pointer;font-family:inherit;text-align:left;}
        .sa-crules-toggle span{display:inline-flex;align-items:center;gap:9px;}
        .sa-crules-toggle:hover{background:#1d0d0e;}
        .sa-crules-chev{transition:transform .2s ease;flex-shrink:0;color:#A98D8B;}
        .sa-crules-toggle.open .sa-crules-chev{transform:rotate(180deg);}
        .sa-cmodal-scroll{overflow-y:auto;padding:16px 20px;-webkit-overflow-scrolling:touch;}
        .sa-cgroup{margin-bottom:18px;}
        .sa-cgroup-h{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14.5px;color:#FF8A95;
          margin:0 0 8px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.08);}
        .sa-cline{display:flex;gap:8px;color:#D8C7C5;font-size:12.8px;line-height:1.55;margin:0 0 8px;}
        .sa-cnum{flex-shrink:0;min-width:28px;color:#8f7a79;font-weight:700;font-family:'JetBrains Mono',monospace;font-size:12px;}
        .sa-cdot{flex-shrink:0;color:#FF3B4E;font-weight:700;}
        .sa-cmodal-foot{padding:14px 20px 18px;border-top:1px solid rgba(255,255,255,0.1);background:#150708;}
        .sa-cagree{display:flex;gap:10px;align-items:flex-start;cursor:pointer;margin-bottom:12px;color:#F5EBEA;font-size:13px;line-height:1.5;}
        .sa-cagree input{width:20px;height:20px;flex-shrink:0;margin-top:1px;accent-color:#FF3B4E;cursor:pointer;}
        .sa-cbtn{width:100%;border:0;border-radius:12px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;color:#fff;
          background:linear-gradient(135deg,#FF3B4E,#B00C20);box-shadow:0 8px 22px rgba(225,18,42,0.4);
          transition:transform .15s ease,opacity .15s ease;}
        .sa-cbtn:hover:not(:disabled){transform:translateY(-2px);}
        .sa-cbtn:disabled{opacity:.45;cursor:not-allowed;}
        @media(min-width:520px){
          .sa-cmodal-title{font-size:23px;}
          .sa-cmodal-note{font-size:14.5px;}
          .sa-cline{font-size:13.5px;}
        }
        .sa-bell-wrap{position:absolute;top:14px;right:14px;z-index:20;}
        .sa-bell{position:relative;width:40px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,0.14);
          background:#150708;color:#F5EBEA;display:flex;align-items:center;justify-content:center;cursor:pointer;}
        .sa-bell:hover{background:#1d0d0e;}
        .sa-bell-dot{position:absolute;top:-5px;right:-5px;min-width:18px;height:18px;padding:0 4px;border-radius:999px;
          background:#FF3B4E;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;}
        .sa-notif-panel{position:absolute;top:48px;right:0;width:290px;max-height:360px;overflow-y:auto;background:#1D0D0E;
          border:1px solid rgba(255,255,255,0.14);border-radius:14px;box-shadow:0 18px 44px rgba(0,0,0,0.55);padding:6px;}
        .sa-notif-head{font-weight:700;font-size:13px;padding:8px 10px;color:#A98D8B;}
        .sa-notif-empty{padding:14px 10px;color:#A98D8B;font-size:13px;}
        .sa-notif-item{padding:10px;border-top:1px solid rgba(255,255,255,0.07);}
        .sa-notif-title{font-weight:700;font-size:13.5px;color:#fff;margin-bottom:3px;}
        .sa-notif-body{font-size:12.5px;color:#D8C7C5;line-height:1.5;}
        .sa-notif-link{display:inline-block;margin-top:5px;color:#FF8A95;font-size:12.5px;font-weight:600;text-decoration:none;}
        .sa-notif-time{font-size:11px;color:#8f7a79;margin-top:5px;}
        /* Yeniləmə modalı */
        .sa-rnw{position:fixed;inset:0;z-index:9998;background:rgba(8,3,4,0.94);backdrop-filter:blur(6px);
          display:flex;align-items:center;justify-content:center;padding:14px;animation:saCIn .25s ease both;}
        .sa-rnw-box{width:100%;max-width:440px;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;
          background:#1A0C0D;border:1px solid rgba(255,255,255,0.14);border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,0.6);
          animation:saCUp .3s cubic-bezier(.2,.8,.2,1) both;}
        .sa-rnw-pad{padding:28px 22px;text-align:center;}
        .sa-rnw-scrollpad{padding:22px 20px;overflow-y:auto;}
        .sa-rnw-emoji{font-size:44px;margin-bottom:10px;}
        .sa-rnw-title{font-family:'Space Grotesk',sans-serif;font-size:21px;color:#fff;margin:0 0 10px;}
        .sa-rnw-text{color:#CBB7B5;font-size:14px;line-height:1.6;margin:0 0 20px;}
        .sa-rnw-cta{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;border-radius:13px;padding:15px;
          font-size:15.5px;font-weight:700;cursor:pointer;color:#fff;text-decoration:none;
          background:linear-gradient(135deg,#FF3B4E,#B00C20);box-shadow:0 8px 22px rgba(225,18,42,0.4);
          transition:transform .15s ease;}
        .sa-rnw-cta:hover:not(:disabled){transform:translateY(-2px);}
        .sa-rnw-cta:disabled{opacity:.5;cursor:not-allowed;}
        .sa-rnw-ghost{width:100%;margin-top:10px;border:1px solid rgba(255,255,255,0.16);background:transparent;color:#B9A7B6;
          border-radius:13px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;}
        .sa-rnw-ghost:hover{background:rgba(255,255,255,0.05);color:#F5EBEA;}
        .sa-rnw-plans{display:flex;flex-direction:column;gap:10px;margin:16px 0;}
        .sa-rnw-plan{position:relative;text-align:left;border:1px solid rgba(255,255,255,0.14);background:#150708;border-radius:14px;
          padding:14px 16px;cursor:pointer;transition:border-color .15s ease,transform .15s ease;}
        .sa-rnw-plan:hover{border-color:#FF3B4E;transform:translateY(-1px);}
        .sa-rnw-plan.best{border-color:#F5B301;background:linear-gradient(145deg,#211405,#150708);}
        .sa-rnw-plan-top{display:flex;justify-content:space-between;align-items:baseline;}
        .sa-rnw-plan-label{font-weight:700;font-size:16px;color:#fff;}
        .sa-rnw-plan-price{font-weight:800;font-size:18px;color:#FF8A95;font-family:'Space Grotesk',sans-serif;}
        .sa-rnw-plan.best .sa-rnw-plan-price{color:#F5B301;}
        .sa-rnw-badge{display:inline-block;margin-top:8px;background:#F5B301;color:#1A1210;font-size:10.5px;font-weight:800;
          padding:3px 9px;border-radius:999px;letter-spacing:.3px;}
        .sa-rnw-gift{display:flex;gap:6px;align-items:flex-start;margin-top:9px;color:#E9D9C0;font-size:12px;line-height:1.5;
          background:rgba(245,179,1,0.1);border:1px solid rgba(245,179,1,0.25);border-radius:9px;padding:7px 9px;}
        .sa-rnw-sum{background:#150708;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:12px 14px;margin:14px 0;}
        .sa-rnw-sum-row{display:flex;justify-content:space-between;font-size:14px;padding:4px 0;color:#CBB7B5;}
        .sa-rnw-sum-row strong{color:#fff;}
        .sa-rnw-sum-gift{display:flex;gap:6px;align-items:flex-start;margin-top:8px;color:#E9D9C0;font-size:12.5px;line-height:1.5;
          background:rgba(245,179,1,0.1);border:1px solid rgba(245,179,1,0.25);border-radius:9px;padding:8px 10px;}
        .sa-rnw-card{background:#150708;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:14px;margin-bottom:12px;}
        .sa-rnw-card-h{font-weight:700;font-size:14px;color:#fff;margin-bottom:8px;}
        .sa-rnw-card-row{display:flex;justify-content:space-between;font-size:14px;padding:4px 0;color:#CBB7B5;}
        .sa-rnw-card-row b{color:#fff;font-family:'JetBrains Mono',monospace;}
        .sa-rnw-copy{margin-top:10px;width:100%;border:1px solid rgba(255,255,255,0.16);background:transparent;color:#F5EBEA;
          border-radius:10px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;}
        .sa-rnw-upload{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:1px dashed rgba(255,255,255,0.25);
          background:#150708;color:#B9A7B6;border-radius:12px;padding:13px;font-size:13.5px;cursor:pointer;margin-bottom:10px;}
        .sa-rnw-upload.has{border-style:solid;border-color:#1f9d55;color:#8fe0b0;background:rgba(31,157,85,0.08);}
        .sa-rnw-warn{background:rgba(225,18,42,0.1);border:1px solid rgba(255,59,78,0.35);color:#FFB3BA;border-radius:11px;
          padding:11px 12px;font-size:12px;line-height:1.55;margin-bottom:12px;}
        .sa-rnw-note2{font-size:12px;color:#8f7a79;line-height:1.5;margin:0 0 14px;text-align:center;}
        .sa-qeyd{background:linear-gradient(145deg,#1f1405,#150708);border:1px solid rgba(245,179,1,0.35);border-radius:14px;padding:14px;margin:0 0 16px;}
        .sa-qeyd-h{font-weight:700;font-size:13.5px;color:#F5B301;margin-bottom:10px;}
        .sa-qeyd-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:13.5px;color:#A98D8B;}
        .sa-qeyd-row b{color:#fff;font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.5px;}
        .sa-qeyd-t{font-size:11.8px;color:#CBB7B5;line-height:1.55;margin:9px 0 0;}
        .sa-review{background:linear-gradient(145deg,#12203a,#0f1626);border:1px solid rgba(127,179,255,0.3);border-radius:16px;
          padding:16px 16px 14px;margin:0 0 16px;text-align:center;}
        .sa-review-stars{color:#FFC83D;font-size:20px;letter-spacing:3px;margin-bottom:8px;}
        .sa-review-text{color:#D5E3F5;font-size:13.5px;line-height:1.55;margin:0 0 14px;}
        .sa-review-btn{display:block;width:100%;border:0;border-radius:11px;padding:13px;font-size:14.5px;font-weight:700;cursor:pointer;
          text-decoration:none;color:#1A1210;background:linear-gradient(135deg,#FFD24B,#F5A623);box-shadow:0 6px 16px rgba(245,166,35,0.35);}
        .sa-review-skip{margin-top:8px;background:transparent;border:0;color:#8aa0bd;font-size:12.5px;cursor:pointer;}
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
        .sa-guide-text{font-size:13px;line-height:1.6;color:#EBD9D8;margin:0 0 12px;font-weight:500;}
        .sa-guide-text b{color:#fff;}
        .sa-guide-imgs{display:flex;gap:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
        .sa-guide-imgs img{height:300px;width:auto;border-radius:10px;border:1px solid rgba(255,255,255,0.14);flex-shrink:0;}
        .sa-code{background:linear-gradient(135deg,#E1122A,#8C1620);border-radius:14px;padding:14px 16px;margin-bottom:10px;}
        .sa-code-label{font-size:12px;color:rgba(255,255,255,0.85);margin-bottom:4px;display:flex;justify-content:space-between;}
        .sa-code-val{font-family:'JetBrains Mono',monospace;font-size:30px;font-weight:700;color:#fff;letter-spacing:4px;}
        .sa-codes-head{font-size:13px;color:#A98D8B;margin:14px 0 8px;font-weight:600;}
        .sa-code-btn{display:inline-flex;align-items:center;gap:6px;margin-top:8px;background:#fff;color:#8C1620;border:0;border-radius:9px;padding:9px 13px;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;}
        @media (prefers-reduced-motion: no-preference){.sa-card{animation:saIn .35s ease-out;}.sa-code{animation:saIn .3s ease-out;}}
        @keyframes saIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      `}</style>

      <a className="sa-brand" href={SKY_SITE_URL}>
        <img src="/skyflix-icon.png" alt="" />
        SkyFlix Azerbaycan
      </a>

      <div className="sa-card" key={result ? result.status : "form"}>
        {(result?.status === "ok" || result?.status === "expired") && (
          <div className="sa-bell-wrap">
            <button className="sa-bell" onClick={openNotifs} aria-label="Bildirişlər">
              <Bell size={18} />
              {unreadNotifs > 0 && <span className="sa-bell-dot">{unreadNotifs > 9 ? "9+" : unreadNotifs}</span>}
            </button>
            {notifOpen && (
              <div className="sa-notif-panel">
                <div className="sa-notif-head">Bildirişlər</div>
                {!cabNotifs.length && <div className="sa-notif-empty">Hələ bildiriş yoxdur.</div>}
                {cabNotifs.map((n) => (
                  <div className="sa-notif-item" key={n.id}>
                    <div className="sa-notif-title">{n.title}</div>
                    {n.body && <div className="sa-notif-body">{n.body}</div>}
                    {n.link && <a className="sa-notif-link" href={n.link} target="_blank" rel="noreferrer">Ətraflı →</a>}
                    <div className="sa-notif-time">{skyFmtDate(n.created_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!result && (
          <>
            <h1 className="sa-title">Hesab məlumatlarınız</h1>
            <p className="sa-sub">WhatsApp nömrənizi və sizə göndərilən 4 rəqəmli PIN-i yazın.</p>

            {(dlvParams.nf || dlvParams.pin) && (
              <div className="sa-qeyd">
                <div className="sa-qeyd-h">📌 QEYD — giriş məlumatlarınız</div>
                <div className="sa-qeyd-row"><span>Nömrə</span><b>+{skyNormPhone(dlvParams.nf)}</b></div>
                <div className="sa-qeyd-row"><span>PIN kod</span><b>{dlvParams.pin}</b></div>
                <p className="sa-qeyd-t">
                  Netflix hesabının məlumatlarını görmək üçün burada yazılan <b>nömrənizi</b> və <b>PIN kodu</b> aşağıdakı xanalara uyğun olaraq daxil edin.
                </p>
                <p className="sa-qeyd-t" style={{ color: "#FFB3BA" }}>
                  ⚠️ Bu nömrə və PIN yalnız <b>müştəri kabinetinizə</b> giriş üçündür — Netflix-ə giriş üçün deyil.
                </p>
                <p className="sa-qeyd-t">
                  Bu müştəri kabinetinə giriş linkini, sizə verilən nömrənizi və PIN kodu <b>itirməyin</b>. Əks halda hesab məlumatlarına girişi itirə bilərsiniz.
                </p>
              </div>
            )}

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

        {result?.status === "ok" && contractAccepted === false && (
          <div className="sa-cmodal" role="dialog" aria-modal="true">
            <div className="sa-cmodal-box">
              <div className="sa-cmodal-head">
                <div className="sa-cmodal-art">{HEIST_ART}</div>
                <h2 className="sa-cmodal-title">İstifadəçi Şərtləri Yeniləndi</h2>
                <p className="sa-cmodal-note">
                  14 oktyabr 2026-cı il tarixindən istifadəçi şərtləri ilə bağlı yeni qərarlar qəbul edilmişdir.
                  Abunəliyinizi davam etdirmək və hesab məlumatlarına giriş əldə etmək üçün yeni istifadəçi şərtlərini qəbul etməlisiniz.
                </p>
              </div>
              <div className="sa-cmodal-body">
                <button className={`sa-crules-toggle ${rulesOpen ? "open" : ""}`} onClick={() => setRulesOpen((v) => !v)}>
                  <span><FileText size={16} /> İstifadəçi şərtləri</span>
                  <ChevronDown size={18} className="sa-crules-chev" />
                </button>
                {rulesOpen && (
                  <div className="sa-cmodal-scroll">
                    {RULE_GROUPS_AZ.map((g, gi) => (
                      <div className="sa-cgroup" key={"old" + gi}>
                        <div className="sa-cgroup-h">{g.heading}</div>
                        {g.items.map((it, ii) => (
                          <p className="sa-cline" key={ii}><span className="sa-cnum">{it.n}</span>{it.text}</p>
                        ))}
                      </div>
                    ))}
                    {CONTRACT_EXTRA_GROUPS.map((g, gi) => (
                      <div className="sa-cgroup" key={"new" + gi}>
                        <div className="sa-cgroup-h">{g.heading}</div>
                        {g.items.map((it, ii) => (
                          <p className="sa-cline" key={ii}><span className="sa-cdot">•</span>{it}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="sa-cmodal-foot">
                {error && <div className="sa-error" style={{ marginBottom: 10 }}>{error}</div>}
                <label className="sa-cagree">
                  <input type="checkbox" checked={agreeChecked} onChange={(e) => setAgreeChecked(e.target.checked)} />
                  <span>Xidmət şərtlərini qəbul edirəm.</span>
                </label>
                <button className="sa-cbtn" disabled={!agreeChecked || accepting} onClick={acceptContract}>
                  {accepting ? "Qeydə alınır..." : "Yeni istifadəçi şərtlərini qəbul et"}
                </button>
              </div>
            </div>
          </div>
        )}

        {result?.status === "ok" && contractAccepted === null && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#A98D8B" }}>
            <RotateCw size={22} className="sa-spin" style={{ marginBottom: 10 }} />
            <p className="sa-sub" style={{ margin: 0 }}>Yoxlanılır...</p>
          </div>
        )}

        {renewOpen && (
          <div className="sa-rnw" role="dialog" aria-modal="true">
            <div className="sa-rnw-box">
              {renewStep === "intro" && (
                <div className="sa-rnw-pad">
                  <div className="sa-rnw-emoji">⏳</div>
                  <h2 className="sa-rnw-title">{result?.status === "expired" ? "Abunəliyinizin vaxtı bitib" : "Abunəliyinizin vaxtı bitmək üzrədir"}</h2>
                  <p className="sa-rnw-text">
                    {result?.status === "expired"
                      ? <>Salam! Abunəliyinizin vaxtı bitib. Yenidən aktivləşdirmək üçün indi ödəniş edin — təsdiqdən sonra müddətiniz <b>avtomatik</b> artırılacaq və hesabınız açılacaq.</>
                      : <>Salam! Abunəliyinizin bitməsinə <b>{days} gün</b> qalıb. Fasiləsiz davam etmək üçün indi ödəniş edin — təsdiqdən sonra müddətiniz <b>avtomatik</b> artırılacaq.</>}
                  </p>
                  <button className="sa-rnw-cta" onClick={() => { setRenewPath("direct"); setRenewStep("plans"); }}>Abunəliyi artır</button>
                  <button className="sa-rnw-ghost" onClick={() => setRenewStep("offer")}>Hələlik yox</button>
                </div>
              )}

              {renewStep === "offer" && (
                <div className="sa-rnw-pad">
                  <div className="sa-rnw-emoji">🎁</div>
                  <h2 className="sa-rnw-title">Əminsiniz?</h2>
                  <p className="sa-rnw-text">
                    Əgər indi <b>1 aylıq</b> artırsanız, əlavə olaraq <b>1 aylıq HBO Max və ya Exxen</b> hədiyyə qazanacaqsınız!
                  </p>
                  <button className="sa-rnw-cta" onClick={() => { setRenewPath("offer"); setRenewStep("plans"); }}>Artırıram</button>
                  <button className="sa-rnw-ghost" onClick={closeRenew}>Artırmıram</button>
                </div>
              )}

              {renewStep === "plans" && (
                <div className="sa-rnw-scrollpad">
                  <h2 className="sa-rnw-title" style={{ textAlign: "center" }}>Müddət seçin</h2>
                  <div className="sa-rnw-plans">
                    {RENEW_PLANS.map((p) => {
                      const g = giftFor(p.months, renewPath);
                      return (
                        <button key={p.months} className={`sa-rnw-plan ${p.months === 12 ? "best" : ""}`} onClick={() => pickPlan(p)}>
                          <div className="sa-rnw-plan-top">
                            <span className="sa-rnw-plan-label">{p.label}</span>
                            <span className="sa-rnw-plan-price">{p.amount} ₼</span>
                          </div>
                          {p.months === 12 && <span className="sa-rnw-badge">ƏN SƏRFƏLİ + HƏDİYYƏLƏR</span>}
                          {g && <div className="sa-rnw-gift"><Gift size={13} /> {g}</div>}
                        </button>
                      );
                    })}
                  </div>
                  <button className="sa-rnw-ghost" onClick={closeRenew}>Bağla</button>
                </div>
              )}

              {renewStep === "pay" && renewPlan && (
                <div className="sa-rnw-scrollpad">
                  <h2 className="sa-rnw-title" style={{ textAlign: "center" }}>Ödəniş</h2>
                  <div className="sa-rnw-sum">
                    <div className="sa-rnw-sum-row"><span>Seçim</span><strong>{renewPlan.label}</strong></div>
                    <div className="sa-rnw-sum-row"><span>Ödəniləcək məbləğ</span><strong>{renewPlan.amount} ₼</strong></div>
                    {giftFor(renewPlan.months, renewPath) && (
                      <div className="sa-rnw-sum-gift"><Gift size={14} /> {giftFor(renewPlan.months, renewPath)}</div>
                    )}
                  </div>
                  <div className="sa-rnw-card">
                    <div className="sa-rnw-card-h">Kartdan karta ödəniş</div>
                    <div className="sa-rnw-card-row"><span>Ad</span><b>{PAY_CARD_NAME}</b></div>
                    <div className="sa-rnw-card-row"><span>Bank</span><b>{PAY_CARD_BANK}</b></div>
                    <div className="sa-rnw-card-row">
                      <span>Kart</span>
                      <b style={{ letterSpacing: 1 }}>{formatCardNumber(PAY_CARD_NUMBER)}</b>
                    </div>
                    <button className="sa-rnw-copy" onClick={async () => { if (await skyCopy(PAY_CARD_NUMBER)) { setCopied("rnwcard"); setTimeout(() => setCopied(""), 1500); } }}>
                      <Copy size={13} /> {copied === "rnwcard" ? "Kopyalandı ✓" : "Kart nömrəsini kopyala"}
                    </button>
                  </div>
                  <label className={`sa-rnw-upload ${receiptName ? "has" : ""}`}>
                    <Upload size={15} /> {receiptName ? "✓ " + receiptName : "Ödəniş qəbzini yüklə (MƏCBURİ)"}
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={onReceiptPick} />
                  </label>
                  <div className="sa-rnw-warn">
                    ⚠️ Diqqət: saxta qəbz yükləmək və ya hər hansı dələduzluq cəhdi aşkarlanarsa, bu, qanunvericiliyə əsasən
                    barənizdə cinayət işinin başlanmasına səbəb ola bilər. Yalnız real ödəniş qəbzini yükləyin.
                  </div>
                  {error && <div className="sa-error" style={{ marginBottom: 10 }}>{error}</div>}
                  <p className="sa-rnw-note2">Göstərilən karta ödəyin, qəbzi yükləyin, sonra “Ödəniş etdim” basın. Təsdiqdən sonra müddətiniz avtomatik artırılacaq.</p>
                  <button className="sa-rnw-cta" disabled={renewBusy || !receiptName} onClick={submitRenewal}>{renewBusy ? "Göndərilir..." : "Ödəniş etdim"}</button>
                  <button className="sa-rnw-ghost" onClick={() => { setError(""); setRenewStep("plans"); }}>Geri</button>
                </div>
              )}

              {renewStep === "done" && (
                <div className="sa-rnw-pad">
                  <div className="sa-rnw-emoji">✅</div>
                  <h2 className="sa-rnw-title">Ödəniş qeydə alındı</h2>
                  <p className="sa-rnw-text">
                    Təşəkkürlər! Ödənişiniz yoxlanıldıqdan sonra abunəliyiniz avtomatik artırılacaq. WhatsApp pəncərəsi açılmadısa,
                    bizə birbaşa yazın.
                  </p>
                  <a className="sa-rnw-cta" href={`https://wa.me/${RENEW_WA}`} target="_blank" rel="noreferrer">WhatsApp-a yaz</a>
                  <button className="sa-rnw-ghost" onClick={closeRenew}>Bağla</button>
                </div>
              )}
            </div>
          </div>
        )}

        {result?.status === "ok" && contractAccepted === true && (
          <>
            <h1 className="sa-title">{result.service || "Hesab"}</h1>
            <p className="sa-sub">
              {result.name ? `${result.name}, ` : ""}şifrə dəyişəndə bu səhifədə avtomatik yenilənir.
            </p>

            {!reviewHidden && (
              <div className="sa-review">
                <div className="sa-review-stars">★★★★★</div>
                <p className="sa-review-text">
                  Xidmətimizi tam şəffaf şəkildə dəyərləndirərək rəyinizi bildirin, zəhmət olmasa. Digər müştərilərə kömək olsun.
                </p>
                <a className="sa-review-btn" href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" onClick={hideReview}>
                  Google-da rəy yaz
                </a>
                <button className="sa-review-skip" onClick={hideReview}>Bağla</button>
              </div>
            )}

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

            {Array.isArray(result.last_codes) && result.last_codes.length > 0 && (
              <>
                <div className="sa-codes-head">
                  Son gələn təsdiqlər ({result.last_codes.length}) — kodunuzu/linkinizi seçin
                </div>
                {result.last_codes.map((c, i) => {
                  const secsLeft = Math.max(0, Math.round((new Date(c.received_at).getTime() + 15 * 60000 - nowTick) / 1000));
                  const mm = String(Math.floor(secsLeft / 60)).padStart(2, "0");
                  const ss = String(secsLeft % 60).padStart(2, "0");
                  if (secsLeft <= 0) return null;
                  if (c.kind === "confirmed") {
                    return (
                      <div key={i} className="sa-code" style={{ background: "linear-gradient(135deg,#1f9d55,#146c3a)" }}>
                        <div className="sa-code-label"><span>Cihaz təsdiqi</span><span>{mm}:{ss}</span></div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>✓ Cihaz avtomatik təsdiqləndi. Netflix-də yenidən yoxlayın.</div>
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="sa-code">
                      <div className="sa-code-label">
                        <span>{c.code ? "Təsdiq kodu" : "Təsdiq linki"} #{result.last_codes.length - i}</span>
                        <span>⏳ {mm}:{ss}</span>
                      </div>
                      {c.code && <div className="sa-code-val">{c.code}</div>}
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {c.code && (
                          <button className="sa-code-btn" onClick={async () => { if (await skyCopy(c.code)) { setCodeCopied(i); setTimeout(() => setCodeCopied(-1), 1500); } }}>
                            <Copy size={13} /> {codeCopied === i ? "Kopyalandı" : "Kopyala"}
                          </button>
                        )}
                        {c.link && (
                          <a className="sa-code-btn" href={c.link} target="_blank" rel="noreferrer">
                            <CheckCircle2 size={13} /> Təsdiq linkini aç
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
                <p className="sa-small" style={{ marginTop: 2 }}>
                  Eyni anda bir neçə nəfər kod istəyibsə, hamısı burada görünür. Öz cihazınıza uyğun olanı seçin. Hər biri 15 dəqiqə keçərlidir.
                </p>
              </>
            )}
            <div className="sa-guide">
              <div className="sa-guide-title">HESABA GİRİŞ QAYDASI</div>
              <p className="sa-guide-text">
                Netflix-ə giriş bölməsində maili yazandan sonra aşağıdakı <b>Continue</b> düyməsinə basın. Daha sonra mailə 4 rəqəmli kod göndərəcək. Həmin hissədə sol aşağıda <b>“Get Help”</b> düyməsinə basın, sonra <b>“Use password instead”</b> seçin. Daha sonra sizə verilən mailin şifrəsini yazın. Hesaba giriş etdikdən sonra sizə verilən otağa daxil olun — otaq adı və şifrəsi yuxarıda qeyd olunub. Şəkilli izahat aşağıdadır.
              </p>
              <div className="sa-guide-imgs">
                <img src={SKY_GUIDE_0} alt="Addım 1: Continue" loading="lazy" />
                <img src={SKY_GUIDE_1} alt="Addım 2: Get Help" loading="lazy" />
                <img src={SKY_GUIDE_2} alt="Addım 3: Use password instead" loading="lazy" />
                <img src={SKY_GUIDE_3} alt="Addım 4: Şifrəni yazın" loading="lazy" />
              </div>
            </div>
            <p className="sa-small" style={{ marginTop: 0, marginBottom: 4 }}>
              Cihaz təsdiqi (Netflix Household) tələb olunarsa, təsdiq kodu bir neçə saniyəyə avtomatik burada görünəcək — səhifə özü yenilənir. Adi giriş üçün yuxarıdakı qayda ilə şifrə ilə daxil olun.
            </p>

            <div className="sa-expiry">
              <span>Abunəlik bitir: {skyFmtDate(result.expires_at, false)}</span>
              <span className={`sa-days ${days <= 3 ? "soon" : ""}`}>{days <= 0 ? "Bu gün" : `${days} gün`}</span>
            </div>
            <p className="sa-small">Şifrə son dəfə {skyFmtDate(result.password_updated_at)} tarixində yenilənib.</p>

            <button className="sa-btn sa-btn-ghost" onClick={() => check()} disabled={loading}>
              <RotateCw size={15} /> {loading ? "Yenilənir..." : "Yenilə"}
            </button>
            {isOrtaq ? (
              <button className="sa-btn" style={{ marginTop: 10 }} onClick={() => { setRenewPath("direct"); setRenewStep("plans"); setRenewOpen(true); }}>
                <RotateCw size={16} /> Abunəliyi artır
              </button>
            ) : days <= 3 ? (
              <a className="sa-btn" style={{ marginTop: 10 }} href={`https://wa.me/${waDigits}?text=${encodeURIComponent(renewText)}`} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Abunəliyi artır
              </a>
            ) : null}
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
            {isOrtaq ? (
              <button className="sa-btn" onClick={() => { setRenewPath("direct"); setRenewStep("intro"); setRenewOpen(true); }}>
                <RotateCw size={16} /> Abunəliyi artır
              </button>
            ) : (
              <a className="sa-btn" href={`https://wa.me/${waDigits}?text=${encodeURIComponent(renewText)}`} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Artırmaq üçün yazın
              </a>
            )}
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
// -----------------------------------------------------
// MÜŞTƏRİ: skyflixazerbaycan.com/#artir — nömrə + kod ilə vaxt uzatma
// -----------------------------------------------------
function ListExtendPage() {
  useGoogleFonts();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Abunəliyi uzat — SkyFlix";
    const meta = document.createElement("meta");
    meta.name = "robots"; meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  function fmt(d) {
    if (!d) return "";
    const x = new Date(d); const p = (n) => String(n).padStart(2, "0");
    return p(x.getDate()) + "." + p(x.getMonth() + 1) + "." + x.getFullYear();
  }

  async function submit() {
    setError("");
    if (skyNormPhone(phone).length < 9) return setError("WhatsApp nömrənizi tam yazın.");
    if (code.trim().length < 4) return setError("Kodu yazın.");
    setBusy(true);
    const { data, error: err } = await supabase.rpc("redeem_list_code", { p_phone: phone, p_code: code });
    setBusy(false);
    if (err) return setError("Bağlantı xətası. Yenidən yoxlayın.");
    const st = data?.status;
    if (st === "ok") { setResult(data); return; }
    const map = {
      badcode: "Kod səhvdir.",
      used: "Bu kod artıq istifadə olunub.",
      expired: "Kodun vaxtı bitib. Yeni kod üçün bizə yazın.",
      wrongphone: "Bu kod bu nömrə üçün deyil. Düzgün nömrəni yazın.",
      notfound: "Hesab tapılmadı. Bizə yazın.",
    };
    setError(map[st] || "Uzatma alınmadı. Yenidən cəhd edin.");
  }

  return (
    <div className="sa-root">
      <style>{`
        .sa-root{min-height:100vh;background:#150708;color:#F5EBEA;font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;padding:28px 18px 40px;}
        .sa-brand{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;margin-bottom:34px;color:#F5EBEA;text-decoration:none;}
        .sa-brand img{width:28px;height:28px;border-radius:7px;}
        .sa-card{width:100%;max-width:400px;background:#1D0D0E;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:26px 22px;}
        .sa-title{font-family:'Space Grotesk',sans-serif;font-size:24px;line-height:1.2;margin:0 0 6px;}
        .sa-sub{color:#A98D8B;font-size:14px;line-height:1.5;margin:0 0 22px;}
        .sa-label{display:block;font-size:13px;color:#A98D8B;margin:0 0 6px;}
        .sa-input{width:100%;background:#150708;border:1px solid rgba(255,255,255,0.14);color:#F5EBEA;border-radius:12px;padding:13px 14px;font-size:16px;margin-bottom:14px;outline:none;}
        .sa-input:focus{border-color:#FF3B4E;}
        .sa-btn{width:100%;border:0;border-radius:12px;padding:14px;font-size:15px;font-weight:600;cursor:pointer;background:#E1122A;color:#fff;}
        .sa-btn:disabled{opacity:.6;}
        .sa-error{background:rgba(225,18,42,0.12);border:1px solid rgba(255,59,78,0.35);color:#FFB3BA;border-radius:12px;padding:11px 13px;font-size:14px;margin-bottom:14px;line-height:1.45;}
        .sa-ok-icon{width:54px;height:54px;border-radius:50%;background:rgba(31,157,85,0.15);color:#1f9d55;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
      `}</style>
      <a className="sa-brand" href="https://skyflixazerbaycan.com"><img src="/skyflix-icon.png" alt="" /> SkyFlix Azerbaycan</a>
      <div className="sa-card">
        {!result ? (
          <>
            <h1 className="sa-title">Abunəliyi uzat</h1>
            <p className="sa-sub">Ödənişdən sonra sizə göndərilən kodu və WhatsApp nömrənizi yazın.</p>
            {error && <div className="sa-error">{error}</div>}
            <label className="sa-label">WhatsApp nömrəsi</label>
            <input className="sa-input" type="tel" inputMode="tel" placeholder="050 123 45 67" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label className="sa-label">Kod</label>
            <input className="sa-input" placeholder="Kodu yazın" autoCapitalize="characters" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === "Enter" && submit()} />
            <button className="sa-btn" onClick={submit} disabled={busy}>{busy ? "Yoxlanılır..." : "Vaxtı artır"}</button>
          </>
        ) : (
          <>
            <div className="sa-ok-icon"><CheckCircle2 size={28} /></div>
            <h1 className="sa-title">Uzadıldı ✓</h1>
            <p className="sa-sub">Abunəliyiniz {result.months} ay uzadıldı. Yeni bitmə tarixi: <b style={{ color: "#F5EBEA" }}>{fmt(result.new_expires)}</b></p>
          </>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// AYRICA SİSTEM: skyflixazerbaycan.com/#siyahi — Netflix müştəri siyahısı (yalnız admin)
// -----------------------------------------------------
function NetflixListPage() {
  useGoogleFonts();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [dateQ, setDateQ] = useState("");
  const [showCount, setShowCount] = useState(60);
  const [tab, setTab] = useState("list"); // list | add | bulk
  const [sortBy, setSortBy] = useState("exp"); // exp | none
  const [form, setForm] = useState({ phone: "", room_name: "", room_pass: "", account_email: "", note: "", expires_at: "" });
  const [edit, setEdit] = useState(null); // redaktə olunan sətir
  const [bulkText, setBulkText] = useState("");
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkReport, setBulkReport] = useState("");
  const [service, setService] = useState("netflix"); // netflix | spotify | youtube
  const [typeFilter, setTypeFilter] = useState("all"); // all | sexsi | ortaq
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | expired
  const [warnOpen, setWarnOpen] = useState(false);
  const [monthPick, setMonthPick] = useState(null); // {mode:"extend"|"code", row}
  const [codeOut, setCodeOut] = useState(null); // {code, text, phone, months}
  const [codeBusy, setCodeBusy] = useState(false);
  const [histFilter, setHistFilter] = useState("all"); // all | used | pending
  const [history, setHistory] = useState([]);
  const [histLoading, setHistLoading] = useState(false);

  const SERVICES = {
    netflix: { label: "Netflix", color: "#E50914", grad: "linear-gradient(135deg,#FF2436,#B20710)", icon: "N" },
    spotify: { label: "Spotify", color: "#1DB954", grad: "linear-gradient(135deg,#1ED760,#128a3c)", icon: "S" },
    youtube: { label: "YouTube", color: "#FF2742", grad: "linear-gradient(135deg,#FF4D67,#C4001F)", icon: "Y" },
  };
  const ALL_SVC = { label: "Bütün servislər", color: "#9B6DFF", grad: "linear-gradient(135deg,#B18CFF,#6D4BD8)", icon: "∞" };
  const MULTI_SVC = { label: "Çox servisli", color: "#F59E0B", grad: "linear-gradient(135deg,#FFC24B,#E0820A)", icon: "⇄" };
  const svc = service === "all" ? ALL_SVC : service === "multi" ? MULTI_SVC : SERVICES[service];
  const mixedView = service === "all" || service === "multi"; // servis qarışıqdır

  useEffect(() => {
    document.title = "SkyFlix — Siyahı";
    const meta = document.createElement("meta");
    meta.name = "robots"; meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess));
    return () => { listener.subscription.unsubscribe(); document.head.removeChild(meta); };
  }, []);

  useEffect(() => {
    if (session && session.user.email === ADMIN_EMAIL) {
      loadAll();
      let seen = false;
      try { seen = sessionStorage.getItem("sky_siyahi_warned") === "1"; } catch {}
      if (!seen) setWarnOpen(true);
    }
  }, [session]);

  function ackWarn() {
    try { sessionStorage.setItem("sky_siyahi_warned", "1"); } catch {}
    setWarnOpen(false);
  }

  function flash(t) { setMsg(t); setTimeout(() => setMsg(""), 2600); }

  async function loadHistory() {
    setHistLoading(true);
    try {
      let all = [];
      for (let from = 0; ; from += 1000) {
        const { data, error } = await supabase.from("list_codes").select("*").order("created_at", { ascending: false }).range(from, from + 999);
        if (error) throw error;
        all = all.concat(data || []);
        if (!data || data.length < 1000 || all.length >= 3000) break;
      }
      setHistory(all);
    } catch (e) { flash("Tarixçə yüklənmədi: " + (e.message || e)); }
    setHistLoading(false);
  }

  async function login(e) {
    e.preventDefault(); setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError("Mail və ya şifrə səhvdir.");
  }

  async function loadAll() {
    setLoading(true); setLoadError("");
    try {
      let all = [];
      // Səhifələmə UNİKAL id üzrə — expires_at unikal olmadığı üçün say dəyişirdi (gah 270 gah 269)
      for (let from = 0; ; from += 1000) {
        const { data, error } = await supabase.from("netflix_list").select("*").order("id", { ascending: true }).range(from, from + 999);
        if (error) throw error;
        all = all.concat(data || []);
        if (!data || data.length < 1000) break;
      }
      // təhlükəsizlik üçün id-yə görə təkrarları təmizlə
      const seen = new Set();
      all = all.filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)));
      setRows(all);
    } catch (e) {
      setLoadError("Yüklənmədi: " + (e.message || e) + " — SQL faylını işə salmısınız?");
    }
    setLoading(false);
  }

  function fmtDT(d) {
    if (!d) return "—";
    const x = new Date(d); const p = (n) => String(n).padStart(2, "0");
    return p(x.getDate()) + "." + p(x.getMonth() + 1) + "." + x.getFullYear() + " " + p(x.getHours()) + ":" + p(x.getMinutes());
  }

  function daysLeft(d) {
    if (!d) return null;
    return Math.ceil((new Date(d + "T23:59:59").getTime() - Date.now()) / 86400000);
  }
  function fmtDate(d) {
    if (!d) return "—";
    const x = new Date(d); const p = (n) => String(n).padStart(2, "0");
    return p(x.getDate()) + "." + p(x.getMonth() + 1) + "." + x.getFullYear();
  }
  function addMonthsToDate(baseISO, months) {
    const base = baseISO ? new Date(baseISO + "T00:00:00") : new Date();
    const start = base.getTime() > Date.now() ? base : new Date();
    const d = new Date(start); d.setMonth(d.getMonth() + months);
    return d.toISOString().slice(0, 10);
  }

  // Tarix sorğusunu oxu: "11 oktyabr" / "oktyabr" / "11.10" / "11.10.2026" / "2026-10-11"
  function parseDateQuery(raw) {
    const q = (raw || "").trim().toLowerCase();
    if (!q) return null;
    const iso = q.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (iso) return { year: +iso[1], month: +iso[2], day: +iso[3] };
    const months = { yanvar: 1, fevral: 2, mart: 3, aprel: 4, may: 5, iyun: 6, iyul: 7, avqust: 8, sentyabr: 9, oktyabr: 10, noyabr: 11, dekabr: 12 };
    let month = null, day = null, year = null;
    for (const w of q.split(/[^a-zçəğıöşüı]+/i)) {
      if (w.length >= 3) {
        for (const name in months) { if (name.startsWith(w) || w.startsWith(name)) { month = months[name]; break; } }
        if (month) break;
      }
    }
    const nums = (q.match(/\d+/g) || []).map(Number);
    for (const n of nums) { if (n >= 1900) year = n; }
    const dm = nums.filter((n) => n < 1900);
    if (month) {
      for (const n of dm) { if (n >= 1 && n <= 31) { day = n; break; } }
    } else if (dm.length >= 2) { day = dm[0]; month = dm[1]; }
    else if (dm.length === 1) { day = dm[0]; }
    if (!month && !day && !year) return null;
    return { year, month, day };
  }
  function dateMatches(expISO, f) {
    if (!expISO) return false;
    const d = new Date(expISO + "T00:00:00");
    if (f.year && d.getFullYear() !== f.year) return false;
    if (f.month && d.getMonth() + 1 !== f.month) return false;
    if (f.day && d.getDate() !== f.day) return false;
    return true;
  }

  const svcOf = (r) => r.service || "netflix";
  // Hesab növü. Spotify/YouTube → hamısı şəxsi. Netflix → ad=şəxsi, Otaq/ortaq=ortaq
  function acctType(r) {
    if (svcOf(r) !== "netflix") return "sexsi";
    const rn = (r.room_name || "").toLowerCase().trim();
    const note = (r.note || "").toLowerCase();
    if (note.includes("ortaq")) return "ortaq";
    if (!rn) return "ortaq";
    if (/^(otaq|otaqq|otaaq|otag|oyaq|oraq|otq|ota|o)\s*\.?\s*\d+/.test(rn)) return "ortaq";
    return "sexsi";
  }
  const TYPE_LABEL = { sexsi: "Şəxsi", ortaq: "Ortaq" };
  const hasTypes = service === "netflix"; // şəxsi/ortaq ayırması yalnız Netflix-də
  const svcCounts = React.useMemo(() => {
    const c = { all: rows.length, netflix: 0, spotify: 0, youtube: 0 };
    rows.forEach((r) => { const s = svcOf(r); if (c[s] !== undefined) c[s]++; });
    return c;
  }, [rows]);

  // Eyni nömrə fərqli servislərdə → çox servisli müştəri
  const phoneServices = React.useMemo(() => {
    const m = new Map();
    rows.forEach((r) => {
      if (!r.phone) return;
      if (!m.has(r.phone)) m.set(r.phone, new Set());
      m.get(r.phone).add(svcOf(r));
    });
    return m;
  }, [rows]);
  const multiCount = React.useMemo(() => {
    let n = 0; phoneServices.forEach((s) => { if (s.size >= 2) n++; }); return n;
  }, [phoneServices]);

  const serviceRows = React.useMemo(() => {
    if (service === "all") return rows;
    if (service === "multi") return rows.filter((r) => r.phone && (phoneServices.get(r.phone) || new Set()).size >= 2)
      .slice().sort((a, b) => (a.phone || "").localeCompare(b.phone || ""));
    return rows.filter((r) => svcOf(r) === service);
  }, [rows, service, phoneServices]);

  const typeCounts = React.useMemo(() => {
    const c = { sexsi: 0, ortaq: 0 };
    serviceRows.forEach((r) => { c[acctType(r)]++; });
    return c;
  }, [serviceRows]);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = serviceRows;
    if (statusFilter !== "all") list = list.filter((r) => {
      const dl = daysLeft(r.expires_at);
      if (statusFilter === "expired") return dl !== null && dl < 0;
      if (statusFilter === "undated") return dl === null;
      return dl !== null && dl >= 0; // active
    });
    if (typeFilter !== "all") list = list.filter((r) => acctType(r) === typeFilter);
    if (q) list = list.filter((r) =>
      (r.phone || "").toLowerCase().includes(q) ||
      (r.account_email || "").toLowerCase().includes(q) ||
      (r.room_name || "").toLowerCase().includes(q) ||
      (r.note || "").toLowerCase().includes(q));
    const f = parseDateQuery(dateQ);
    if (f) list = list.filter((r) => dateMatches(r.expires_at, f));
    if (service !== "multi") {
      // tarixə görə sırala (ən tez bitən öncə, tarixsizlər sonda)
      list = [...list].sort((a, b) => (a.expires_at || "9999-99-99").localeCompare(b.expires_at || "9999-99-99"));
    }
    return list;
  }, [serviceRows, search, dateQ, typeFilter, statusFilter, service]);

  const stats = React.useMemo(() => {
    let active = 0, soon = 0, expired = 0, undated = 0;
    serviceRows.forEach((r) => {
      const dl = daysLeft(r.expires_at);
      if (dl === null) { undated++; return; }
      if (dl < 0) { expired++; return; }
      active++; if (dl <= 3) soon++;
    });
    // Hamısı = Aktiv + Vaxtı bitən + Tarixsiz
    return { total: serviceRows.length, active, soon, expired, undated };
  }, [serviceRows]);

  async function copyAllPhones() {
    const list = filtered.filter((r) => r.phone);
    if (!list.length) return flash("Nömrə yoxdur.");
    const lineOf = (r) => "+" + r.phone + (r.room_name ? " — " + r.room_name : "") + (r.room_pass ? " (" + r.room_pass + ")" : "");
    const blocks = [];
    for (const s of ["netflix", "spotify", "youtube"]) {
      const rs = list.filter((r) => svcOf(r) === s);
      if (!rs.length) continue;
      const head = "═══ " + SERVICES[s].label.toUpperCase() + " (" + rs.length + ") ═══";
      if (s === "netflix") {
        const or = rs.filter((r) => acctType(r) === "ortaq").map(lineOf);
        const sx = rs.filter((r) => acctType(r) === "sexsi").map(lineOf);
        let body = "";
        if (or.length) body += "— Ortaq (" + or.length + ") —\n" + or.join("\n");
        if (sx.length) body += (body ? "\n\n" : "") + "— Şəxsi (" + sx.length + ") —\n" + sx.join("\n");
        blocks.push(head + "\n" + body);
      } else {
        blocks.push(head + "\n" + rs.map(lineOf).join("\n"));
      }
    }
    const txt = blocks.join("\n\n");
    const ok = await skyCopy(txt);
    flash(ok ? list.length + " nömrə kopyalandı ✓" : "Kopyalanmadı");
  }

  async function saveNew() {
    if (!form.phone.trim() && !form.account_email.trim()) return flash("Nömrə və ya mail yazın.");
    const { data, error } = await supabase.from("netflix_list").insert({
      phone: skyNormPhone(form.phone), room_name: form.room_name.trim(), room_pass: form.room_pass.trim(),
      account_email: form.account_email.trim(), note: form.note.trim(), expires_at: form.expires_at || null,
      service,
    }).select().single();
    if (error) return flash("Xəta: " + error.message);
    setRows((l) => [data, ...l]);
    setForm({ phone: "", room_name: "", room_pass: "", account_email: "", note: "", expires_at: "" });
    flash(svc.label + " siyahısına əlavə edildi ✓");
  }

  async function saveEdit() {
    const r = edit;
    const { data, error } = await supabase.from("netflix_list").update({
      phone: skyNormPhone(r.phone), room_name: r.room_name, room_pass: r.room_pass,
      account_email: r.account_email, note: r.note, expires_at: r.expires_at || null,
    }).eq("id", r.id).select().single();
    if (error) return flash("Xəta: " + error.message);
    setRows((l) => l.map((x) => (x.id === r.id ? data : x)));
    setEdit(null); flash("Yadda saxlanıldı ✓");
  }

  async function extend(r, months) {
    const newExp = addMonthsToDate(r.expires_at, months);
    const { data, error } = await supabase.from("netflix_list").update({ expires_at: newExp }).eq("id", r.id).select().single();
    if (error) return flash("Xəta: " + error.message);
    setRows((l) => l.map((x) => (x.id === r.id ? data : x)));
    flash("+" + months + " ay → " + fmtDate(newExp));
  }

  async function makeCode(r, months) {
    if (!r.phone) return flash("Bu sətirdə nömrə yoxdur.");
    setCodeBusy(true);
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const arr = new Uint8Array(6); crypto.getRandomValues(arr);
    const code = Array.from(arr, (b) => chars[b % chars.length]).join("");
    const svcLabel = (SERVICES[svcOf(r)] || SERVICES.netflix).label;
    // əvvəl service ilə, xəta olsa (sütun yoxdursa) servicesiz yenidən cəhd et
    let { error } = await supabase.from("list_codes").insert({ code, row_id: r.id, phone: skyNormPhone(r.phone), months, service: svcOf(r) });
    if (error && /service/i.test(error.message || "")) {
      ({ error } = await supabase.from("list_codes").insert({ code, row_id: r.id, phone: skyNormPhone(r.phone), months }));
    }
    setCodeBusy(false);
    if (error) { flash("Xəta: " + error.message); return; }
    const link = "https://skyflixazerbaycan.com/#artir";
    const txt =
      "Salam! " + svcLabel + " abunəliyinizin qeydiyyata düşməsi üçün aşağıdakı linkə daxil olub nömrənizi və sizə verilən PIN kodu qeyd edin:\n\n" +
      link + "\n\n" +
      "📱 Nömrə: +" + skyNormPhone(r.phone) + "\n" +
      "🔑 PIN kod: " + code + "\n\n" +
      "⚠️ Bunu etməsəniz abunəliyiniz yenilənməyəcək.\n" +
      "(" + (months === 12 ? "1 il" : months + " ay") + " · kod 24 saat etibarlıdır · yalnız bir dəfə işləyir)";
    setCodeOut({ code, text: txt, phone: skyNormPhone(r.phone), months });
  }

  async function removeRow(r) {
    if (!window.confirm("Bu sətir silinsin?\n" + (r.account_email || r.phone))) return;
    const { error } = await supabase.from("netflix_list").delete().eq("id", r.id);
    if (error) return flash("Xəta: " + error.message);
    setRows((l) => l.filter((x) => x.id !== r.id));
    flash("Silindi");
  }

  // Toplu yükləmə: CSV sütunları phone,room_name,room_pass,account_email,note,expires_at
  async function bulkUpload() {
    const lines = skyParseRows(bulkText);
    if (!lines.length) return setBulkReport("Məlumat tapılmadı.");
    // başlıq sətrini keç
    let start = 0;
    const head = lines[0].map((c) => c.toLowerCase().trim());
    if (head.includes("phone") || head.includes("account_email")) start = 1;
    // Açar: nömrə | mail | otaq adı | servis
    const keyOf = (ph, em, rn, s) => skyNormPhone(ph) + "|" + (em || "").trim().toLowerCase() + "|" + (rn || "").trim().toLowerCase() + "|" + (s || "netflix");
    const existing = new Map(rows.map((r) => [keyOf(r.phone, r.account_email, r.room_name, svcOf(r)), r]));
    const seen = new Set();
    const toInsert = [];
    const toUpdate = []; // mövcud nömrələrin yenilənməsi (tarix/şifrə/qeyd dəyişibsə)
    let dupFile = 0, unchanged = 0;
    for (let i = start; i < lines.length; i++) {
      const c = lines[i];
      const [phone = "", room_name = "", room_pass = "", account_email = "", note = "", expires_at = ""] = c;
      if (!phone && !account_email) continue;
      let exp = expires_at.trim();
      if (exp && !/^\d{4}-\d{2}-\d{2}$/.test(exp)) exp = ""; // yalnız YYYY-MM-DD
      const k = keyOf(phone, account_email, room_name, service);
      if (existing.has(k)) {
        const ex = existing.get(k);
        const newExp = exp || null, newPass = room_pass.trim(), newNote = note.trim();
        const curExp = ex.expires_at || null;
        // nəsə dəyişibsə YENİLƏ (xüsusən tarix)
        if (curExp !== newExp || (ex.room_pass || "") !== newPass || (ex.note || "") !== newNote) {
          toUpdate.push({ id: ex.id, expires_at: newExp, room_pass: newPass, note: newNote });
        } else unchanged++;
        continue;
      }
      if (seen.has(k)) { dupFile++; continue; } // fayl içində təkrar
      seen.add(k);
      toInsert.push({
        phone: skyNormPhone(phone), room_name: room_name.trim(), room_pass: room_pass.trim(),
        account_email: account_email.trim(), note: note.trim(), expires_at: exp || null, service,
      });
    }
    if (!toInsert.length && !toUpdate.length) return setBulkReport("Dəyişiklik yoxdur. (Dəyişməyən: " + unchanged + ", faylda təkrar: " + dupFile + ")");
    setBulkBusy(true);
    let ok = 0, err = 0, upd = 0;
    // yeni sətirlər
    for (let i = 0; i < toInsert.length; i += 500) {
      const { error } = await supabase.from("netflix_list").insert(toInsert.slice(i, i + 500));
      if (error) err++; else ok += toInsert.slice(i, i + 500).length;
    }
    // mövcudların yenilənməsi (20-lik paralel partiyalarla)
    for (let i = 0; i < toUpdate.length; i += 20) {
      const batch = toUpdate.slice(i, i + 20);
      const res = await Promise.all(batch.map((u) =>
        supabase.from("netflix_list").update({ expires_at: u.expires_at, room_pass: u.room_pass, note: u.note }).eq("id", u.id)
      ));
      res.forEach((r) => { if (r.error) err++; else upd++; });
    }
    await loadAll();
    setBulkBusy(false);
    setBulkReport("Əlavə olundu: " + ok + " yeni." + (upd ? " Yeniləndi: " + upd + "." : "") +
      (unchanged ? " Dəyişməyən: " + unchanged + "." : "") +
      (dupFile ? " Faylda təkrar: " + dupFile + "." : "") +
      (err ? " Xəta: " + err + "." : ""));
    setBulkText("");
  }

  function readFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBulkText(String(reader.result || ""));
    reader.readAsText(file);
  }

  const S = {
    box: { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: 14, marginBottom: 10 },
    input: { width: "100%", background: "var(--bg)", color: "var(--text)", border: "1px solid var(--line)", borderRadius: 10, padding: "9px 11px", fontSize: 14, marginBottom: 6 },
    row: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
    small: { fontSize: 12, color: "var(--muted)" },
    chip: (a) => ({ padding: "7px 12px", borderRadius: 999, fontSize: 13, cursor: "pointer", border: "1px solid " + (a ? "var(--gold)" : "var(--line)"), background: a ? "var(--gold)" : "transparent", color: a ? "#fff" : "var(--text)" }),
    mini: { padding: "6px 9px", borderRadius: 8, fontSize: 12, border: "1px solid var(--line)", background: "var(--bg)", color: "var(--text)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 },
  };

  return (
    <div className="sai-root dark" style={{ "--accent": svc.color }}>
      <style>{`
        .sai-root{--bg:#0A0608;--surface:rgba(255,255,255,0.045);--surface2:rgba(255,255,255,0.07);--text:#F6EFEE;--muted:#9C8E8C;--line:rgba(255,255,255,0.09);--accent:#E50914;
          min-height:100vh;color:var(--text);font-family:Inter,system-ui,sans-serif;position:relative;overflow-x:hidden;
          background:#0A0608;}
        .sai-root::before{content:"";position:fixed;inset:-20%;z-index:0;pointer-events:none;
          background:
            radial-gradient(42% 40% at 15% 8%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%),
            radial-gradient(40% 36% at 95% 4%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%),
            radial-gradient(55% 50% at 55% 118%, rgba(120,60,200,.13), transparent 70%);
          transition:background .6s ease;animation:aurora 16s ease-in-out infinite alternate;}
        @keyframes aurora{0%{transform:translate3d(-2%,-1%,0) scale(1);}50%{transform:translate3d(3%,2%,0) scale(1.08);}100%{transform:translate3d(-1%,3%,0) scale(1.03);}}
        .sai-root *{box-sizing:border-box;}
        .sai-wrap{max-width:1040px;margin:0 auto;padding:22px 16px 80px;position:relative;z-index:1;}
        .sai-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:20px;}
        .sai-brand{display:flex;align-items:center;gap:11px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:19px;letter-spacing:.3px;}
        .sai-logo{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-weight:800;color:#fff;
          background:var(--accent);box-shadow:0 6px 20px -4px color-mix(in srgb,var(--accent) 70%,transparent);transition:.4s;animation:floaty 3.4s ease-in-out infinite;}
        @keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
        .sai-sub{color:var(--accent);font-weight:700;}
        .sai-root .ab-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border-radius:12px;padding:11px 17px;font-size:14px;font-weight:600;cursor:pointer;border:1px solid transparent;font-family:inherit;transition:transform .15s,box-shadow .2s,background .2s;}
        .sai-root .ab-btn:active{transform:scale(.96);}
        .sai-root .ab-btn-gold{background:var(--accent);color:#fff;box-shadow:0 8px 22px -6px color-mix(in srgb,var(--accent) 65%,transparent);}
        .sai-root .ab-btn-gold:hover{filter:brightness(1.08);box-shadow:0 10px 28px -6px color-mix(in srgb,var(--accent) 80%,transparent);}
        .sai-root .ab-btn-ghost{background:rgba(255,255,255,.04);color:var(--text);border-color:var(--line);backdrop-filter:blur(8px);}
        .sai-root .ab-btn-ghost:hover{background:rgba(255,255,255,.09);}
        .sai-root .ad-status{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:50;background:rgba(18,24,20,.85);backdrop-filter:blur(14px);color:#fff;padding:12px 20px;border-radius:14px;font-size:14px;font-weight:600;border:1px solid var(--line);box-shadow:0 12px 40px rgba(0,0,0,.45);animation:popIn .3s cubic-bezier(.2,1.3,.4,1);}
        .sai-login{max-width:390px;margin:70px auto 0;background:var(--surface);backdrop-filter:blur(20px);border:1px solid var(--line);border-radius:22px;padding:28px 24px;box-shadow:0 30px 80px -30px rgba(0,0,0,.7);animation:fadeUp .5s both;}
        .sai-login h1{font-family:'Space Grotesk',sans-serif;font-size:23px;margin:0 0 18px;}
        .sai-login input{width:100%;background:rgba(0,0,0,.25);color:var(--text);border:1px solid var(--line);border-radius:12px;padding:13px;font-size:16px;margin-bottom:11px;transition:.2s;}
        .sai-login input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 22%,transparent);}

        /* service selector */
        .svc-bar{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:20px;}
        .svc-pill{position:relative;overflow:hidden;cursor:pointer;border:1px solid var(--line);border-radius:16px;padding:14px 12px;background:var(--surface);backdrop-filter:blur(10px);transition:transform .2s,border-color .3s,box-shadow .3s;display:flex;align-items:center;gap:11px;}
        .svc-pill:hover{transform:translateY(-2px);}
        .svc-pill .sico{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-weight:800;color:#fff;flex:0 0 auto;font-family:'Space Grotesk',sans-serif;}
        .svc-pill .snm{font-weight:700;font-size:15px;line-height:1.1;}
        .svc-pill .scnt{font-size:12px;color:var(--muted);}
        .svc-pill.on{border-color:transparent;box-shadow:0 10px 30px -10px var(--pc),0 0 0 1.5px var(--pc) inset;transform:translateY(-2px);}
        .svc-pill.on::after{content:"";position:absolute;inset:0;background:var(--pg);opacity:.14;}
        .svc-pill.on .snm{color:#fff;}

        .nl-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:11px;margin-bottom:18px;}
        .nl-stat{background:var(--surface);backdrop-filter:blur(10px);border:1px solid var(--line);border-radius:16px;padding:16px 16px 14px;position:relative;overflow:hidden;animation:fadeUp .45s both;transition:transform .2s;}
        .nl-stat:hover{transform:translateY(-2px);}
        .nl-stat .v{font-family:'Space Grotesk',sans-serif;font-size:27px;font-weight:700;line-height:1;background:linear-gradient(180deg,#fff,color-mix(in srgb,var(--accent) 60%,#fff));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
        .nl-stat .l{font-size:12.5px;color:var(--muted);margin-top:7px;}
        .nl-stat .bar{position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent);}

        .nl-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
        .nl-tab{padding:9px 16px;border-radius:999px;font-size:13.5px;font-weight:600;cursor:pointer;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);transition:.2s;}
        .nl-tab.on{background:var(--accent);border-color:transparent;color:#fff;box-shadow:0 6px 18px -6px color-mix(in srgb,var(--accent) 70%,transparent);}

        .nl-panel{background:var(--surface);backdrop-filter:blur(10px);border:1px solid var(--line);border-radius:18px;padding:16px;margin-bottom:12px;animation:fadeUp .4s both;}
        .nl-input{width:100%;background:rgba(0,0,0,.25);color:var(--text);border:1px solid var(--line);border-radius:12px;padding:11px 13px;font-size:14px;margin-bottom:8px;transition:.2s;}
        .nl-input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 20%,transparent);}
        .nl-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
        .nl-small{font-size:12px;color:var(--muted);}
        .nl-mini{padding:7px 11px;border-radius:10px;font-size:12.5px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);cursor:pointer;display:inline-flex;align-items:center;gap:4px;transition:.15s;}
        .nl-mini:hover{background:rgba(255,255,255,.1);transform:translateY(-1px);}
        .nl-mini.accent{border-color:var(--accent);color:var(--accent);}
        .nl-mini.accent:hover{background:var(--accent);color:#fff;}

        .nl-list{display:flex;flex-direction:column;gap:9px;}
        .nl-rowcard{background:var(--surface);backdrop-filter:blur(8px);border:1px solid var(--line);border-left:3px solid color-mix(in srgb,var(--accent) 55%,transparent);border-radius:14px;padding:13px 14px;animation:fadeUp .4s both;transition:transform .16s,box-shadow .2s,border-color .2s;}
        .nl-rowcard:hover{transform:translateY(-2px);box-shadow:0 14px 34px -16px rgba(0,0,0,.6);border-left-color:var(--accent);}
        .nl-rowcard.soon{border-color:var(--accent);box-shadow:0 0 0 1px color-mix(in srgb,var(--accent) 35%,transparent);animation:fadeUp .4s both,glow 2.4s ease-in-out infinite;}
        .nl-rowcard.expired{opacity:.5;}
        .nl-badge{font-size:12px;font-weight:700;white-space:nowrap;}
        .nl-copybar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:11px 14px;margin-bottom:12px;backdrop-filter:blur(8px);}
        .type-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;}
        .tchip{padding:8px 14px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);transition:.18s;}
        .tchip:hover{background:rgba(255,255,255,.09);}
        .tchip.on{background:var(--accent);border-color:transparent;color:#fff;box-shadow:0 6px 16px -6px color-mix(in srgb,var(--accent) 70%,transparent);}
        .tbadge{display:inline-block;font-size:10.5px;font-weight:800;letter-spacing:.4px;text-transform:uppercase;padding:3px 8px;border-radius:999px;margin-left:8px;vertical-align:middle;}
        .tbadge.sexsi{background:rgba(70,130,255,.16);color:#7FA8FF;border:1px solid rgba(70,130,255,.35);}
        .tbadge.ortaq{background:rgba(255,180,40,.15);color:#F2B33A;border:1px solid rgba(255,180,40,.35);}
        .st-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;}
        .stchip{display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);transition:.18s;}
        .stchip:hover{background:rgba(255,255,255,.09);transform:translateY(-1px);}
        .stchip .dot{width:8px;height:8px;border-radius:50%;}
        .stchip.on.all{background:var(--accent);border-color:transparent;color:#fff;}
        .stchip.on.active{background:#1f9d55;border-color:transparent;color:#fff;}
        .stchip.on.expired{background:#c43b3b;border-color:transparent;color:#fff;box-shadow:0 6px 18px -6px rgba(196,59,59,.7);}
        .phone-group{margin:12px 0 4px;padding:7px 12px;border-radius:10px;font-weight:700;font-size:13.5px;background:color-mix(in srgb,#F59E0B 14%,transparent);border:1px solid color-mix(in srgb,#F59E0B 35%,transparent);color:#F5B74B;display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
        .phone-group .pg-svc{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;}

        /* warning modal */
        .wn-overlay{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:18px;background:rgba(5,3,4,.72);backdrop-filter:blur(8px);animation:fadeIn .25s both;}
        .wn-card{max-width:440px;width:100%;background:linear-gradient(180deg,rgba(40,14,16,.96),rgba(18,8,10,.97));border:1px solid rgba(255,80,80,.4);border-radius:22px;padding:26px 22px 20px;text-align:center;box-shadow:0 0 0 1px rgba(255,60,60,.15),0 30px 90px -20px rgba(0,0,0,.8),0 0 60px -10px rgba(255,40,40,.35);animation:wnPop .45s cubic-bezier(.2,1.25,.4,1) both;}
        .wn-ico{width:74px;height:74px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;font-size:40px;background:radial-gradient(circle,rgba(255,70,70,.25),rgba(255,70,70,.05));border:2px solid rgba(255,80,80,.55);animation:warnPulse 1.6s ease-in-out infinite;}
        .wn-title{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:800;color:#FF5A5A;letter-spacing:.5px;margin:0 0 6px;text-shadow:0 0 18px rgba(255,60,60,.5);}
        .wn-sub{font-size:14px;color:#F3D8D8;margin:0 0 16px;line-height:1.5;}
        .wn-rules{text-align:left;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:12px 14px;margin-bottom:16px;}
        .wn-rules li{font-size:13px;color:#Ecdede;margin:7px 0;line-height:1.45;list-style:none;position:relative;padding-left:22px;}
        .wn-rules li::before{content:"⚠";position:absolute;left:0;top:0;color:#FF7A3A;font-size:13px;}
        .wn-resp{font-size:12.5px;color:#FFB27A;background:rgba(255,120,40,.1);border:1px dashed rgba(255,140,60,.4);border-radius:10px;padding:10px;margin-bottom:16px;font-weight:600;}
        .wn-btn{width:100%;border:none;border-radius:13px;padding:14px;font-size:14.5px;font-weight:700;cursor:pointer;color:#fff;font-family:inherit;background:linear-gradient(135deg,#FF3B3B,#B41020);box-shadow:0 10px 30px -8px rgba(255,40,40,.6);transition:transform .15s,filter .2s;}
        .wn-btn:hover{filter:brightness(1.08);}
        .wn-btn:active{transform:scale(.97);}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes wnPop{from{opacity:0;transform:translateY(24px) scale(.92);}to{opacity:1;transform:none;}}
        @keyframes warnPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,60,60,.45);}50%{box-shadow:0 0 0 14px rgba(255,60,60,0);}}

        /* month-picker / code modal */
        .pk-overlay{position:fixed;inset:0;z-index:110;display:grid;place-items:center;padding:18px;background:rgba(5,3,4,.7);backdrop-filter:blur(8px);animation:fadeIn .2s both;}
        .pk-card{max-width:420px;width:100%;background:var(--surface);backdrop-filter:blur(20px);border:1px solid var(--line);border-radius:20px;padding:22px 20px;box-shadow:0 30px 80px -24px rgba(0,0,0,.75);animation:wnPop .35s cubic-bezier(.2,1.25,.4,1) both;}
        .pk-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;margin:0 0 4px;}
        .pk-sub{font-size:13px;color:var(--muted);margin:0 0 16px;word-break:break-all;}
        .pk-months{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:14px;}
        .pk-mbtn{padding:14px 8px;border-radius:13px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);font-size:15px;font-weight:700;cursor:pointer;transition:.15s;font-family:inherit;}
        .pk-mbtn:hover{background:var(--accent);border-color:transparent;color:#fff;transform:translateY(-2px);}
        .pk-code{font-family:'Space Grotesk',monospace;font-size:34px;font-weight:800;letter-spacing:4px;text-align:center;color:var(--accent);background:rgba(0,0,0,.25);border:1px dashed color-mix(in srgb,var(--accent) 50%,transparent);border-radius:14px;padding:16px;margin:4px 0 14px;}
        .pk-x{background:none;border:none;color:var(--muted);font-size:22px;cursor:pointer;float:right;line-height:1;padding:0;margin:-6px -4px 0 0;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
        @keyframes popIn{from{opacity:0;transform:translate(-50%,10px) scale(.95);}to{opacity:1;transform:translate(-50%,0) scale(1);}}
        @keyframes glow{0%,100%{box-shadow:0 0 0 1px color-mix(in srgb,var(--accent) 30%,transparent);}50%{box-shadow:0 0 22px -2px color-mix(in srgb,var(--accent) 55%,transparent);}}
        @media(max-width:560px){.svc-bar{grid-template-columns:1fr;}.svc-pill{padding:11px 13px;}}
      `}</style>
      <div className="sai-wrap">
        <div className="sai-top">
          <div className="sai-brand"><span className="sai-logo">{svc.icon}</span> SkyFlix <span className="sai-sub">· {svc.label}</span></div>
          {session && <button className="ab-btn ab-btn-ghost" onClick={() => supabase.auth.signOut()}>Çıxış</button>}
        </div>
        {msg && <div className="ad-status">{msg}</div>}

        {monthPick && !codeOut && (
          <div className="pk-overlay" onClick={(e) => { if (e.target === e.currentTarget) setMonthPick(null); }}>
            <div className="pk-card">
              <button className="pk-x" onClick={() => setMonthPick(null)}>×</button>
              <h3 className="pk-title">{monthPick.mode === "code" ? "Kod yarat" : "Vaxtı artır"}</h3>
              <p className="pk-sub">+{monthPick.row.phone}{monthPick.row.room_name ? " · " + monthPick.row.room_name : ""}<br />Neçə aya?</p>
              <div className="pk-months">
                {[1, 2, 3, 6, 12].map((m) => (
                  <button key={m} className="pk-mbtn" disabled={codeBusy} onClick={async () => {
                    const row = monthPick.row, mode = monthPick.mode;
                    if (mode === "extend") { setMonthPick(null); await extend(row, m); }
                    else { await makeCode(row, m); }
                  }}>{m === 12 ? "1 il" : m + " ay"}</button>
                ))}
                <button className="pk-mbtn" disabled={codeBusy} onClick={async () => {
                  const v = parseInt(window.prompt("Neçə ay?", "1") || "", 10);
                  if (v > 0) { const row = monthPick.row, mode = monthPick.mode; if (mode === "extend") { setMonthPick(null); await extend(row, v); } else { await makeCode(row, v); } }
                }}>Başqa…</button>
              </div>
              {codeBusy && <p className="nl-small" style={{ textAlign: "center" }}>Yaradılır...</p>}
            </div>
          </div>
        )}

        {codeOut && (
          <div className="pk-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setCodeOut(null); setMonthPick(null); } }}>
            <div className="pk-card">
              <button className="pk-x" onClick={() => { setCodeOut(null); setMonthPick(null); }}>×</button>
              <h3 className="pk-title">Kod hazırdır ✓</h3>
              <p className="pk-sub">+{codeOut.phone} · {codeOut.months === 12 ? "1 il" : codeOut.months + " ay"} · 24 saat etibarlı, bir dəfəlik</p>
              <div className="pk-code">{codeOut.code}</div>
              <div className="nl-row" style={{ flexDirection: "column", gap: 8 }}>
                <button className="ab-btn ab-btn-gold" style={{ width: "100%" }} onClick={async () => { const ok = await skyCopy(codeOut.text); flash(ok ? "WhatsApp mətni kopyalandı ✓" : "Kopyalanmadı"); }}>WhatsApp mətnini kopyala</button>
                <a className="ab-btn ab-btn-gold" style={{ width: "100%", textDecoration: "none", background: "#25D366" }} href={"https://wa.me/" + codeOut.phone + "?text=" + encodeURIComponent(codeOut.text)} target="_blank" rel="noreferrer">WhatsApp-da aç</a>
                <button className="ab-btn ab-btn-ghost" style={{ width: "100%" }} onClick={async () => { const ok = await skyCopy(codeOut.code); flash(ok ? "Kod kopyalandı: " + codeOut.code : codeOut.code); }}>Yalnız kodu kopyala</button>
                <button className="nl-mini" style={{ alignSelf: "center" }} onClick={() => { setCodeOut(null); setMonthPick(null); }}>Bağla</button>
              </div>
            </div>
          </div>
        )}

        {warnOpen && session && session.user.email === ADMIN_EMAIL && (
          <div className="wn-overlay" onClick={(e) => { if (e.target === e.currentTarget) {} }}>
            <div className="wn-card">
              <div className="wn-ico">⚠️</div>
              <h2 className="wn-title">DİQQƏT!</h2>
              <p className="wn-sub">Bu saytda <b>çox diqqətli</b> davranın! Burada minlərlə müştərinin məlumatı var.</p>
              <ul className="wn-rules">
                <li>Bu panelin linkini <b>heç kimlə paylaşmayın</b> — yalnız admin üçündür.</li>
                <li>Nömrə, hesab və şifrə məlumatlarını kənar şəxslərə verməyin.</li>
                <li>Giriş mail və şifrənizi qoruyun, başqa cihazda açıq saxlamayın.</li>
                <li>Silmə və dəyişiklik əməliyyatları geri qaytarıla bilməz — ehtiyatlı olun.</li>
                <li>Məlumatları yalnız öz işiniz üçün istifadə edin.</li>
              </ul>
              <div className="wn-resp">Bu panelə daxil olmaqla bütün məsuliyyəti <b>öz üzərimə götürürəm</b>.</div>
              <button className="wn-btn" onClick={ackWarn}>Başa düşdüm, məsuliyyəti götürürəm</button>
            </div>
          </div>
        )}

        {checking && <p style={{ color: "var(--muted)" }}>Yüklənir...</p>}

        {!checking && !session && (
          <form className="sai-login" onSubmit={login}>
            <h1>Giriş</h1>
            {error && <p style={{ color: "var(--gold)", fontSize: 14, marginTop: 0 }}>{error}</p>}
            <input type="email" placeholder="Admin mail" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="ab-btn ab-btn-gold" style={{ width: "100%" }} type="submit">Daxil ol</button>
          </form>
        )}

        {!checking && session && session.user.email !== ADMIN_EMAIL && (
          <div className="sai-login"><h1>İcazə yoxdur</h1><p style={{ color: "var(--muted)" }}>Yalnız admin hesabı ilə girmək olar.</p></div>
        )}

        {!checking && session && session.user.email === ADMIN_EMAIL && (
          <>
            <div className="svc-bar">
              {[["all", ALL_SVC]].concat(Object.entries(SERVICES)).concat([["multi", MULTI_SVC]]).map(([k, s]) => (
                <div key={k} className={"svc-pill" + (service === k ? " on" : "")} style={{ "--pc": s.color, "--pg": s.grad }}
                  onClick={() => { setService(k); setShowCount(60); setEdit(null); setTypeFilter("all"); setStatusFilter("all"); }}>
                  <span className="sico" style={{ background: s.grad }}>{s.icon}</span>
                  <div><div className="snm">{s.label}</div><div className="scnt">{k === "multi" ? multiCount + " nömrə" : svcCounts[k] + " nömrə"}</div></div>
                </div>
              ))}
            </div>

            <div className="nl-stats">
              {[["Hamısı", stats.total, "all"], ["Aktiv", stats.active, "active"], ["3 günə bitən", stats.soon, "active"], ["Vaxtı bitən", stats.expired, "expired"]].map(([l, v, st], ix) => (
                <div key={l} className="nl-stat" style={{ animationDelay: ix * 0.05 + "s", cursor: "pointer" }}
                  onClick={() => { setTab("list"); setStatusFilter(st); setShowCount(60); }}>
                  <span className="bar" /><div className="v">{loading ? "…" : v}</div><div className="l">{l}</div>
                </div>
              ))}
            </div>

            <div className="nl-tabs">
              {[["list", "Siyahı"], ["add", "Əlavə et"], ["bulk", "Toplu yüklə"], ["history", "Tarixçə"]].map(([k, l]) => (
                <button key={k} className={"nl-tab" + (tab === k ? " on" : "")} onClick={() => { setTab(k); if (k === "history") loadHistory(); }}>{l}</button>
              ))}
            </div>

            {loadError && <div className="nl-panel" style={{ color: "var(--accent)" }}>{loadError}</div>}

            {tab === "add" && (
              <div className="nl-panel">
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Yeni sətir — <span style={{ color: "var(--accent)" }}>{svc.label}</span></div>
                <input className="nl-input" placeholder="Nömrə" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <div className="nl-row">
                  <input className="nl-input" style={{ flex: 1 }} placeholder="Otaq adı" value={form.room_name} onChange={(e) => setForm({ ...form, room_name: e.target.value })} />
                  <input className="nl-input" style={{ width: 120 }} placeholder="Otaq şifrəsi" value={form.room_pass} onChange={(e) => setForm({ ...form, room_pass: e.target.value })} />
                </div>
                <input className="nl-input" placeholder={svc.label + " mail"} autoCapitalize="none" value={form.account_email} onChange={(e) => setForm({ ...form, account_email: e.target.value })} />
                <div className="nl-row">
                  <input className="nl-input" style={{ flex: 1 }} placeholder="Qeyd (məs. ortaq)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
                  <input className="nl-input" style={{ width: 170 }} type="date" value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} />
                </div>
                <button className="ab-btn ab-btn-gold" onClick={saveNew}>Əlavə et</button>
              </div>
            )}

            {tab === "bulk" && (
              <div className="nl-panel">
                <div style={{ fontWeight: 600 }}>Toplu yüklə (CSV) — <span style={{ color: "var(--accent)" }}>{svc.label}</span></div>
                <p className="nl-small">Sütunlar: <b>phone, room_name, room_pass, account_email, note, expires_at</b> (tarix: YYYY-MM-DD). Seçilmiş <b>{svc.label}</b> xidmətinə yüklənir.</p>
                <p className="nl-small" style={{ color: "var(--accent)" }}>Yeni nömrələr əlavə olunur; artıq olan nömrələrin <b>tarixi/şifrəsi/qeydi dəyişibsə yenilənir</b> (dublikat yaranmır).</p>
                <div className="nl-row" style={{ margin: "6px 0" }}><input type="file" accept=".csv,.txt" onChange={(e) => readFile(e.target.files[0])} /></div>
                <textarea className="nl-input" style={{ minHeight: 120, fontFamily: "monospace", fontSize: 12 }} value={bulkText} onChange={(e) => setBulkText(e.target.value)} placeholder="phone,room_name,room_pass,account_email,note,expires_at" />
                <button className="ab-btn ab-btn-gold" disabled={bulkBusy} onClick={bulkUpload}>{bulkBusy ? "Yüklənir..." : "Yüklə"}</button>
                {bulkReport && <p className="nl-small" style={{ marginTop: 8 }}>{bulkReport}</p>}
              </div>
            )}

            {tab === "list" && (
              <>
                <div className="st-chips">
                  <button className={"stchip all" + (statusFilter === "all" ? " on" : "")} onClick={() => { setStatusFilter("all"); setShowCount(60); }}>Hamısı ({stats.total})</button>
                  <button className={"stchip active" + (statusFilter === "active" ? " on" : "")} onClick={() => { setStatusFilter("active"); setShowCount(60); }}><span className="dot" style={{ background: "#1f9d55" }} />Aktiv ({stats.active})</button>
                  <button className={"stchip expired" + (statusFilter === "expired" ? " on" : "")} onClick={() => { setStatusFilter("expired"); setShowCount(60); }}><span className="dot" style={{ background: "#ff5a5a" }} />Vaxtı bitənlər ({stats.expired})</button>
                  {stats.undated > 0 && <button className={"stchip" + (statusFilter === "undated" ? " on" : "")} style={statusFilter === "undated" ? { background: "#8a8a8a", borderColor: "transparent", color: "#fff" } : {}} onClick={() => { setStatusFilter("undated"); setShowCount(60); }}><span className="dot" style={{ background: "#9a9a9a" }} />Tarixsiz ({stats.undated})</button>}
                </div>
                {hasTypes && (
                  <div className="type-chips">
                    <button className={"tchip" + (typeFilter === "all" ? " on" : "")} onClick={() => { setTypeFilter("all"); setShowCount(60); }}>Hamısı ({typeCounts.sexsi + typeCounts.ortaq})</button>
                    <button className={"tchip" + (typeFilter === "sexsi" ? " on" : "")} onClick={() => { setTypeFilter("sexsi"); setShowCount(60); }}>Şəxsi ({typeCounts.sexsi})</button>
                    <button className={"tchip" + (typeFilter === "ortaq" ? " on" : "")} onClick={() => { setTypeFilter("ortaq"); setShowCount(60); }}>Ortaq ({typeCounts.ortaq})</button>
                  </div>
                )}
                {service === "multi" && (
                  <div className="nl-panel" style={{ padding: "10px 14px", borderColor: "color-mix(in srgb,#F59E0B 40%,transparent)" }}>
                    <span className="nl-small" style={{ color: "#F5B74B" }}>⇄ Eyni nömrə ilə <b>birdən çox servisdə</b> abunəliyi olan müştərilər. Eyni nömrələr ardıcıl düzülüb.</span>
                  </div>
                )}
                <input className="nl-input" placeholder="Axtar: nömrə / mail / otaq / qeyd" value={search} onChange={(e) => { setSearch(e.target.value); setShowCount(60); }} />
                <div className="nl-row" style={{ marginBottom: 4 }}>
                  <input className="nl-input" style={{ flex: 1, marginBottom: 0 }} placeholder="Tarixə görə bitənlər: məs. 11 oktyabr  /  oktyabr  /  11.10" value={dateQ} onChange={(e) => { setDateQ(e.target.value); setShowCount(60); }} />
                  {dateQ && <button className="nl-mini" onClick={() => setDateQ("")}>Təmizlə</button>}
                </div>
                <p className="nl-small" style={{ marginTop: 0, marginBottom: 10 }}>Gün+ay (11 oktyabr) → həmin gün; yalnız ay (oktyabr) → o ay bitənlər.</p>

                <div className="nl-copybar">
                  <div className="nl-small">
                    <b style={{ color: "var(--text)", fontSize: 15 }}>{filtered.length}</b> nəticə
                    {dateQ && (() => {
                      const f = parseDateQuery(dateQ);
                      const mN = ["", "yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
                      if (!f) return " · tarix anlaşılmadı";
                      const lbl = (f.day ? f.day + " " : "") + (f.month ? mN[f.month] : "") + (f.year ? " " + f.year : "");
                      return " · " + lbl.trim() + " bitənlər";
                    })()}
                  </div>
                  <button className="nl-mini accent" onClick={copyAllPhones}>⧉ Bütün nömrələri kopyala ({filtered.filter((r) => r.phone).length})</button>
                </div>

                {loading && <p className="nl-small">Yüklənir...</p>}
                {!loading && !filtered.length && <p className="nl-small">Nəticə yoxdur.</p>}

                <div className="nl-list" key={service + "|" + search + "|" + dateQ}>
                  {filtered.slice(0, showCount).map((r, ix) => {
                    const dl = daysLeft(r.expires_at);
                    const cls = dl === null ? "" : dl < 0 ? "expired" : dl <= 3 ? "soon" : "";
                    const color = dl === null ? "var(--muted)" : dl < 0 ? "#9a9a9a" : dl <= 3 ? "var(--accent)" : "#2ec27a";
                    const delay = { animationDelay: Math.min(ix, 25) * 0.025 + "s" };
                    const isEdit = edit && edit.id === r.id;
                    const prevPhone = ix > 0 ? filtered[ix - 1].phone : null;
                    const header = service === "multi" && r.phone && r.phone !== prevPhone ? (
                      <div className="phone-group">+{r.phone}
                        {Array.from(phoneServices.get(r.phone) || []).map((ss) => { const c = SERVICES[ss] || ALL_SVC; return <span key={ss} className="pg-svc" style={{ background: "color-mix(in srgb," + c.color + " 22%,transparent)", color: c.color }}>{c.label}</span>; })}
                      </div>
                    ) : null;
                    const card = isEdit ? (
                      <div className="nl-rowcard">
                        <input className="nl-input" value={edit.phone} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} placeholder="Nömrə" />
                        <div className="nl-row">
                          <input className="nl-input" style={{ flex: 1 }} value={edit.room_name} onChange={(e) => setEdit({ ...edit, room_name: e.target.value })} placeholder="Otaq adı" />
                          <input className="nl-input" style={{ width: 110 }} value={edit.room_pass} onChange={(e) => setEdit({ ...edit, room_pass: e.target.value })} placeholder="Şifrə" />
                        </div>
                        <input className="nl-input" value={edit.account_email} onChange={(e) => setEdit({ ...edit, account_email: e.target.value })} placeholder="Mail" autoCapitalize="none" />
                        <div className="nl-row">
                          <input className="nl-input" style={{ flex: 1 }} value={edit.note || ""} onChange={(e) => setEdit({ ...edit, note: e.target.value })} placeholder="Qeyd" />
                          <input className="nl-input" style={{ width: 160 }} type="date" value={edit.expires_at || ""} onChange={(e) => setEdit({ ...edit, expires_at: e.target.value })} />
                        </div>
                        <div className="nl-row">
                          <button className="ab-btn ab-btn-gold" onClick={saveEdit}>Yadda saxla</button>
                          <button className="nl-mini" onClick={() => setEdit(null)}>Ləğv</button>
                        </div>
                      </div>
                    ) : (
                      <div className={"nl-rowcard " + cls} style={delay}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700 }}>+{r.phone || "—"}
                              {mixedView && (() => { const s = SERVICES[svcOf(r)] || ALL_SVC; return <span className="tbadge" style={{ background: "color-mix(in srgb," + s.color + " 18%,transparent)", color: s.color, border: "1px solid color-mix(in srgb," + s.color + " 45%,transparent)" }}>{s.label}</span>; })()}
                              <span className={"tbadge " + acctType(r)}>{TYPE_LABEL[acctType(r)]}</span>{r.note && <span className="nl-small" style={{ fontWeight: 400 }}> · {r.note}</span>}</div>
                            <div className="nl-small">{r.account_email || "mail yoxdur"}</div>
                            <div className="nl-small">{acctType(r) === "sexsi" ? "Ad" : "Otaq"}: {r.room_name || "—"}{r.room_pass ? " · şifrə " + r.room_pass : ""}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div className="nl-badge" style={{ color }}>{dl === null ? "tarixsiz" : dl < 0 ? "Bitib" : dl + " gün"}</div>
                            <div className="nl-small">{fmtDate(r.expires_at)}</div>
                          </div>
                        </div>
                        <div className="nl-row" style={{ marginTop: 10 }}>
                          <button className="nl-mini" onClick={() => extend(r, 1)}>+1 ay</button>
                          <button className="nl-mini" onClick={() => setMonthPick({ mode: "extend", row: r })}>+ ay…</button>
                          <button className="nl-mini accent" onClick={() => setMonthPick({ mode: "code", row: r })}>Kod yarat</button>
                          <button className="nl-mini" onClick={() => setEdit({ ...r, expires_at: r.expires_at || "" })}>Redaktə</button>
                          <button className="nl-mini" style={{ color: "var(--accent)" }} onClick={() => removeRow(r)}>Sil</button>
                        </div>
                      </div>
                    );
                    return <React.Fragment key={r.id}>{header}{card}</React.Fragment>;
                  })}
                </div>
                {filtered.length > showCount && <button className="ab-btn ab-btn-ghost" style={{ marginTop: 12 }} onClick={() => setShowCount((c) => c + 60)}>Daha çox ({filtered.length - showCount})</button>}
              </>
            )}

            {tab === "history" && (
              <>
                <div className="nl-stats">
                  <div className="nl-stat"><span className="bar" /><div className="v">{history.length}</div><div className="l">Ümumi kod</div></div>
                  <div className="nl-stat"><span className="bar" style={{ background: "#2ec27a" }} /><div className="v">{history.filter((c) => c.used).length}</div><div className="l">Uzadıldı</div></div>
                  <div className="nl-stat"><span className="bar" style={{ background: "#F2B33A" }} /><div className="v">{history.filter((c) => !c.used).length}</div><div className="l">Uzatmayıb</div></div>
                </div>
                <div className="st-chips">
                  <button className={"stchip all" + (histFilter === "all" ? " on" : "")} onClick={() => setHistFilter("all")}>Hamısı ({history.length})</button>
                  <button className={"stchip active" + (histFilter === "used" ? " on" : "")} onClick={() => setHistFilter("used")}><span className="dot" style={{ background: "#1f9d55" }} />Uzadılanlar ({history.filter((c) => c.used).length})</button>
                  <button className={"stchip" + (histFilter === "pending" ? " on" : "")} style={histFilter === "pending" ? { background: "#F2B33A", borderColor: "transparent", color: "#1a1210" } : {}} onClick={() => setHistFilter("pending")}>Uzatmayanlar ({history.filter((c) => !c.used).length})</button>
                  <button className="nl-mini" onClick={loadHistory}>↻ Yenilə</button>
                </div>
                <p className="nl-small" style={{ marginTop: 0, marginBottom: 10 }}>Kim kod alıb vaxtını uzadıb / uzatmayıb buradan izlənir.</p>
                {histLoading && <p className="nl-small">Yüklənir...</p>}
                {!histLoading && !history.length && <p className="nl-small">Hələ kod yaradılmayıb. (list_codes SQL işə salınıbmı?)</p>}
                <div className="nl-list" key={histFilter}>
                  {history.filter((c) => histFilter === "all" ? true : histFilter === "used" ? c.used : !c.used).slice(0, 300).map((c, ix) => {
                    const svcC = SERVICES[c.service || "netflix"] || ALL_SVC;
                    const expired = !c.used && c.expires_at && new Date(c.expires_at) < new Date();
                    const stColor = c.used ? "#2ec27a" : expired ? "#9a9a9a" : "#F2B33A";
                    return (
                      <div key={c.id} className="nl-rowcard" style={{ borderLeftColor: stColor, animationDelay: Math.min(ix, 25) * 0.02 + "s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700 }}>+{c.phone}
                              <span className="tbadge" style={{ background: "color-mix(in srgb," + svcC.color + " 18%,transparent)", color: svcC.color, border: "1px solid color-mix(in srgb," + svcC.color + " 45%,transparent)" }}>{svcC.label}</span>
                            </div>
                            <div className="nl-small">Kod: {c.code} · {c.months === 12 ? "1 il" : c.months + " ay"}</div>
                            <div className="nl-small">Yaradıldı: {fmtDT(c.created_at)}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div className="nl-badge" style={{ color: stColor }}>{c.used ? "Uzadıldı ✓" : expired ? "İşlənmədi" : "Gözləyir"}</div>
                            <div className="nl-small">{c.used ? fmtDT(c.used_at) : ""}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

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
  const [contracts, setContracts] = useState([]);
  const [contractSearch, setContractSearch] = useState("");
  const [renewReqs, setRenewReqs] = useState([]);
  const [pendingRenewCount, setPendingRenewCount] = useState(0);
  const [dlvReqs, setDlvReqs] = useState([]);
  const [pendingDlvCount, setPendingDlvCount] = useState(0);
  const [videos, setVideos] = useState([]);
  const [vidTitle, setVidTitle] = useState("");
  const [vidUploading, setVidUploading] = useState(false);
  const vidFileRef = useRef(null);
  const [payReqs, setPayReqs] = useState([]);
  const [pendingPayCount, setPendingPayCount] = useState(0);
  const [notifForm, setNotifForm] = useState({ title: "", body: "", link: "" });
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
  const [memberForm, setMemberForm] = useState({ name: "", phone: "", pin: "", months: 1, days: "", room_name: "", room_password: "", exact_date: "" });
  const [lastAdded, setLastAdded] = useState(null);

  const [phoneSearch, setPhoneSearch] = useState("");
  const [expFilter, setExpFilter] = useState("soon");
  const [bulkAccText, setBulkAccText] = useState("");
  const [bulkMemText, setBulkMemText] = useState("");
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkReport, setBulkReport] = useState("");
  const [passDate, setPassDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [passDays, setPassDays] = useState(15);
  const [passType, setPassType] = useState("all"); // all | ortaq | sexsi
  const [passExpiredOnly, setPassExpiredOnly] = useState(false);

  useEffect(() => {
    loadAll();
    loadPayReqs();
    loadRenewals();
    loadDeliveries();
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

  async function loadContracts() {
    const { data } = await supabase
      .from("contract_acceptances")
      .select("*")
      .order("accepted_at", { ascending: false });
    setContracts(data || []);
  }

  async function loadRenewals() {
    const { data } = await supabase
      .from("renewal_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setRenewReqs(data || []);
    setPendingRenewCount((data || []).filter((r) => r.status === "pending").length);
  }

  async function approveRenewal(id) {
    const { data } = await supabase.rpc("approve_renewal", { p_id: id });
    if (data?.status === "ok") { flashMsg("Təsdiqləndi, müddət artırıldı ✓"); loadRenewals(); loadAll(); }
    else flashMsg("Xəta: " + (data?.status || "naməlum"));
  }

  async function loadDeliveries() {
    const { data } = await supabase.from("delivery_requests").select("*").order("created_at", { ascending: false }).limit(200);
    setDlvReqs(data || []);
    setPendingDlvCount((data || []).filter((r) => r.status === "pending").length);
  }
  async function loadVideos() {
    const { data } = await supabase.from("login_videos").select("*").order("sort", { ascending: true }).order("created_at", { ascending: false });
    setVideos(data || []);
  }
  async function uploadVideo(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 100 * 1024 * 1024) { flashMsg("Video 100 MB-dan böyük olmamalıdır"); e.target.value = ""; return; }
    setVidUploading(true);
    try {
      const path = "login-" + Date.now() + "-" + (f.name || "video").replace(/[^\w.\-]/g, "_");
      const up = await supabase.storage.from("videos").upload(path, f, { upsert: false, contentType: f.type || "video/mp4" });
      if (up.error) throw up.error;
      const url = supabase.storage.from("videos").getPublicUrl(path).data?.publicUrl || "";
      const sort = videos.length ? Math.max(...videos.map((v) => v.sort || 0)) + 1 : 0;
      const ins = await supabase.from("login_videos").insert({ url, title: vidTitle || "", sort });
      if (ins.error) throw ins.error;
      setVidTitle("");
      flashMsg("Video yükləndi ✓");
      loadVideos();
    } catch (err) { flashMsg("Video yüklənmədi: " + (err.message || err)); }
    setVidUploading(false);
    e.target.value = "";
  }
  async function toggleVideo(v) {
    await supabase.from("login_videos").update({ is_active: !v.is_active }).eq("id", v.id);
    loadVideos();
  }
  async function deleteVideo(v) {
    await supabase.from("login_videos").delete().eq("id", v.id);
    flashMsg("Video silindi");
    loadVideos();
  }
  async function syncKinds() {
    const { data } = await supabase.rpc("sync_account_kinds");
    if (data?.status === "ok") { flashMsg("Növlər eyniləşdirildi (" + data.updated + " hesab) ✓"); loadAll(); }
    else flashMsg("Xəta: " + (data?.status || "naməlum"));
  }
  async function approveDelivery(id) {
    const { data } = await supabase.rpc("approve_delivery", { p_id: id });
    if (data?.status === "ok") { flashMsg("Təsdiqləndi, hesab təyin edildi ✓"); loadDeliveries(); loadAll(); }
    else if (data?.status === "full") { flashMsg("Bütün hesablar 20 limitini doldurub — yeni hesab əlavə edin!"); }
    else flashMsg("Xəta: " + (data?.status || "naməlum"));
  }
  async function rejectDelivery(id) {
    const { data } = await supabase.rpc("reject_delivery", { p_id: id });
    if (data?.status === "ok") { flashMsg("Rədd edildi"); loadDeliveries(); }
  }
  async function rejectRenewal(id) {
    const { data } = await supabase.rpc("reject_renewal", { p_id: id });
    if (data?.status === "ok") { flashMsg("Rədd edildi"); loadRenewals(); }
  }

  async function sendNotification() {
    if (!notifForm.title.trim()) return flashMsg("Başlıq yazın.");
    const { error } = await supabase.from("notifications").insert({
      user_id: null, // hamıya
      title: notifForm.title.trim(),
      body: notifForm.body.trim(),
      link: notifForm.link.trim(),
    });
    if (error) return flashMsg("Xəta: " + error.message);
    setNotifForm({ title: "", body: "", link: "" });
    flashMsg("Bildiriş bütün müştərilərə göndərildi ✓");
  }

  async function loadPayReqs() {
    const { data } = await supabase
      .from("balance_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setPayReqs(data || []);
    setPendingPayCount((data || []).filter((r) => r.status === "pending").length);
  }

  async function approvePay(r) {
    const { data, error } = await supabase.rpc("approve_balance_request", { p_id: r.id });
    if (error) { flashMsg("Xəta: " + error.message); return; }
    if (data?.status === "ok") {
      flashMsg("Təsdiqləndi: " + r.amount + " ₼" + (r.cashback ? " (+" + r.cashback + " cashback)" : ""));
      try {
        await supabase.functions.invoke("send-receipt", { body: {
          customerName: r.full_name || "",
          customerEmail: r.email,
          items: [{ name: "Balans artırma" + (r.cashback ? " (+" + r.cashback + " ₼ cashback)" : ""), qty: 1, price: r.amount }],
          total: r.amount,
          method: "Kartdan karta",
        }});
      } catch (e) {}
      loadPayReqs();
    }
    else if (data?.status === "forbidden") { flashMsg("İcazə yoxdur — admin hesabı ilə girməlisiniz."); }
    else if (data?.status === "notfound") { flashMsg("Sorğu tapılmadı və ya artıq işlənib."); }
    else { flashMsg("Naməlum nəticə: " + JSON.stringify(data)); }
  }
  async function rejectPay(r) {
    if (!window.confirm(r.amount + " ₼ sorğusu rədd edilsin?")) return;
    const { data } = await supabase.rpc("reject_balance_request", { p_id: r.id });
    if (data?.status === "ok") { flashMsg("Rədd edildi"); loadPayReqs(); }
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
    const exact = memberForm.exact_date ? new Date(memberForm.exact_date + "T23:59:00") : null;
    if (!months && !days && !exact) return flashMsg("Müddət seçin: ay/gün və ya dəqiq tarix.");
    const existing = members.find((m) => m.account_id === acc.id && m.phone === phone);
    let data, error;
    if (existing) {
      ({ data, error } = await supabase
        .from("account_members")
        .update({ expires_at: exact ? exact.toISOString() : skyAddDuration(existing.expires_at, months, days), name: memberForm.name.trim() || existing.name, room_name: memberForm.room_name.trim(), room_password: memberForm.room_password.trim() })
        .eq("id", existing.id)
        .select()
        .single());
    } else {
      const pin = /^\d{4}$/.test(memberForm.pin) ? memberForm.pin : pinByPhone[phone] || skyRandomPin();
      ({ data, error } = await supabase
        .from("account_members")
        .insert({ account_id: acc.id, phone, pin, name: memberForm.name.trim(), room_name: memberForm.room_name.trim(), room_password: memberForm.room_password.trim(), expires_at: exact ? exact.toISOString() : skyAddDuration(null, months, days) })
        .select()
        .single());
    }
    if (error) return flashMsg("Xəta: " + error.message);
    setMembers((l) => (existing ? l.map((m) => (m.id === data.id ? data : m)) : [...l, data]));
    setLastAdded(data.id);
    setMemberForm({ name: "", phone: "", pin: "", months: 1, days: "", room_name: "", room_password: "", exact_date: "" });
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
      `Əgər Netflix şifrəsi dəyişərsə artıq bizə yazmadan burdakı linkdən yeni şifrənizi əldə edə bilərsiniz. Avtomatik şəkildə burada qeyd olunacaq.\n\n` +
      `Abunəlik bitmə tarixi: ${skyFmtDate(m.expires_at, false)}`
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
    const r = skyRemaining(date);
    const color = r.expired ? "#9a9a9a" : r.totalDays <= 3 ? "var(--gold)" : "#1f9d55";
    return (
      <span style={{ fontSize: 12, fontWeight: 600, color, whiteSpace: "nowrap" }}>
        {skyFmtRemaining(date)}
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
              ["payments", "Ödənişlər"],
              ["deliveries", "Çatdırılma ödənişləri"],
              ["renewals", "Yeniləmələr"],
              ["passmgmt", "Şifrə idarəsi"],
              ["contracts", "İstifadəçi şərtləri"],
              ["notify", "Bildiriş göndər"],
              ["videos", "Videolar"],
              ["codes", "Netflix kodları"],
              ["logs", "Giriş tarixçəsi"],
            ].map(([key, label]) => (
              <button
                key={key}
                style={{ ...S.chip(tab === key), position: "relative" }}
                onClick={() => {
                  setTab(key);
                  if (key === "logs") loadLogs();
                  if (key === "codes") loadCodes();
                  if (key === "payments") loadPayReqs();
                  if (key === "contracts") loadContracts();
                  if (key === "renewals") loadRenewals();
                  if (key === "deliveries") loadDeliveries();
                  if (key === "videos") loadVideos();
                }}
              >
                {label}
                {key === "payments" && pendingPayCount > 0 && (
                  <span style={{ marginLeft: 6, background: "#E1122A", color: "#fff", borderRadius: 999, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{pendingPayCount}</span>
                )}
                {key === "renewals" && pendingRenewCount > 0 && (
                  <span style={{ marginLeft: 6, background: "#E1122A", color: "#fff", borderRadius: 999, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{pendingRenewCount}</span>
                )}
                {key === "deliveries" && pendingDlvCount > 0 && (
                  <span style={{ marginLeft: 6, background: "#E1122A", color: "#fff", borderRadius: 999, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{pendingDlvCount}</span>
                )}
              </button>
            ))}
          </div>

          {tab === "accounts" && (
            <>
              <div style={{ ...S.box, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={S.small}>Hesab növü (şəxsi/ortaq) #siyahi-dən maillərə görə təyin olunur.</span>
                <button className="ab-btn ab-btn-gold" style={{ padding: "7px 12px", fontSize: 13 }} onClick={syncKinds}>
                  <RotateCw size={13} /> Hesab növlərini eyniləşdir
                </button>
              </div>
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
                      onClick={() => { if (selectMode) return setSelected((sel) => ({ ...sel, [acc.id]: !sel[acc.id] })); setExpanded(isOpen ? null : acc.id); setLastAdded(null); setMemberForm({ name: "", phone: "", pin: "", months: 1, days: "", room_name: "", room_password: "", exact_date: "" }); }}
                      style={{ background: "none", border: 0, color: "var(--text)", width: "100%", textAlign: "left", cursor: "pointer", padding: 0 }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>
                            {acc.login_email}
                            {acc.kind === "ortaq" && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 999, background: "rgba(245,179,1,0.18)", color: "#F5B301" }}>ortaq</span>}
                            {acc.kind === "sexsi" && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 999, background: "rgba(127,179,255,0.18)", color: "#7FB3FF" }}>şəxsi</span>}
                            {!acc.kind && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "var(--muted)" }}>naməlum</span>}
                          </div>
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
                                <button key={mo} style={S.chip(memberForm.months === mo)} onClick={() => setMemberForm({ ...memberForm, months: memberForm.months === mo ? 0 : mo })}>
                                  {mo} ay
                                </button>
                              ))}
                              <input
                                style={{ ...S.input, width: 110, padding: "8px 10px", borderColor: memberForm.days ? "var(--gold)" : "var(--line)" }}
                                inputMode="numeric"
                                placeholder="gün"
                                value={memberForm.days}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                  setMemberForm({ ...memberForm, days: v });
                                }}
                              />
                            </div>
                            {(memberForm.months || memberForm.days) && !memberForm.exact_date && (
                              <div style={{ ...S.small, color: "var(--gold)", fontWeight: 600 }}>
                                Əlavə olunacaq: {[memberForm.months ? memberForm.months + " ay" : "", (parseInt(memberForm.days, 10) || 0) ? (parseInt(memberForm.days, 10) + " gün") : ""].filter(Boolean).join(" ") || "—"}
                              </div>
                            )}
                            <div style={{ borderTop: "1px dashed var(--line)", marginTop: 4, paddingTop: 8 }}>
                              <div style={S.small}>...və ya birbaşa bitmə tarixi seç (gün.ay.il)</div>
                              <input
                                type="date"
                                style={{ ...S.input, marginTop: 4, borderColor: memberForm.exact_date ? "var(--gold)" : "var(--line)" }}
                                value={memberForm.exact_date || ""}
                                onChange={(e) => setMemberForm({ ...memberForm, exact_date: e.target.value })}
                              />
                              {memberForm.exact_date && (
                                <div style={{ ...S.small, color: "var(--gold)", fontWeight: 600, marginTop: 4 }}>
                                  Bitmə tarixi: {skyFmtDate(memberForm.exact_date + "T23:59:00", false)} (ay/gün nəzərə alınmır)
                                  <button style={{ ...S.mini, marginLeft: 8 }} onClick={() => setMemberForm({ ...memberForm, exact_date: "" })}>Ləğv et</button>
                                </div>
                              )}
                            </div>
                            <button className="ab-btn ab-btn-gold" style={{ alignSelf: "flex-start" }} onClick={() => addMember(acc)}>
                              <CheckCircle2 size={15} /> Təsdiqlə
                            </button>
                            <div style={S.small}>Ay və gün birlikdə seçilə bilər (məs. 1 ay + 3 gün) VƏ YA aşağıdan dəqiq bitmə tarixi seç. Nömrə bu hesabda artıq varsa: ay/gün üstünə gəlir, dəqiq tarix isə birbaşa təyin olunur. PIN boş qalsa avtomatik yaranır.</div>
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

          {tab === "notify" && (
            <div style={S.box}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>Bütün müştərilərə bildiriş göndər</div>
              <div style={{ display: "grid", gap: 8 }}>
                <input style={S.input} placeholder="Başlıq (məs. Yeni endirim!)" value={notifForm.title} onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })} />
                <textarea style={{ ...S.input, minHeight: 80 }} placeholder="Mətn" value={notifForm.body} onChange={(e) => setNotifForm({ ...notifForm, body: e.target.value })} />
                <input style={S.input} placeholder="Link (istəyə bağlı)" value={notifForm.link} onChange={(e) => setNotifForm({ ...notifForm, link: e.target.value })} />
                <button className="ab-btn ab-btn-gold" style={{ alignSelf: "flex-start" }} onClick={sendNotification}><Send size={15} /> Göndər</button>
                <div style={S.small}>Bildiriş hər müştərinin saytdakı zəng ikonunda görünəcək.</div>
              </div>
            </div>
          )}

          {tab === "payments" && (
            <>
              <div style={{ ...S.row, justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>
                  Balans ödəniş sorğuları
                  {pendingPayCount > 0 && <span style={{ marginLeft: 8, background: "#E1122A", color: "#fff", borderRadius: 999, padding: "2px 10px", fontSize: 13 }}>{pendingPayCount} yeni</span>}
                </span>
                <button style={S.mini} onClick={loadPayReqs}><RotateCw size={12} /> Yenilə</button>
              </div>
              {!payReqs.length && <p style={S.small}>Hələ ödəniş sorğusu yoxdur.</p>}
              {payReqs.map((r) => (
                <div key={r.id} style={{ ...S.box, borderColor: r.status === "pending" ? "#E1122A" : "var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{Number(r.amount).toFixed(2)} ₼ {r.cashback > 0 && <span style={{ color: "var(--gold)", fontSize: 13 }}>(+{r.cashback} cashback)</span>}</div>
                      <div style={S.small}>{r.full_name || "—"} · {r.email}</div>
                      <div style={S.small}>{skyFmtDate(r.created_at)} · {r.status === "pending" ? "gözləyir" : r.status === "approved" ? "təsdiqlənib ✓" : "rədd edilib"}</div>
                    </div>
                  </div>
                  {r.receipt_url && (
                    <a href={r.receipt_url} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 8 }}>
                      <img src={r.receipt_url} alt="qəbz" style={{ maxWidth: "100%", maxHeight: 260, borderRadius: 10, border: "1px solid var(--line)" }} />
                    </a>
                  )}
                  {r.status === "pending" && (
                    <div style={{ ...S.row, marginTop: 10 }}>
                      <button className="ab-btn ab-btn-gold" onClick={() => approvePay(r)}><CheckCircle2 size={15} /> Təsdiqlə (balansa yaz)</button>
                      <button style={{ ...S.mini, color: "var(--gold)" }} onClick={() => rejectPay(r)}><Ban size={12} /> Rədd et</button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {tab === "deliveries" && (
            <div style={S.box}>
              <div style={{ ...S.row, justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>
                  Çatdırılma ödənişləri
                  {pendingDlvCount > 0 && (
                    <span style={{ marginLeft: 8, background: "#E1122A", color: "#fff", borderRadius: 999, padding: "2px 12px", fontSize: 13, fontWeight: 800 }}>
                      {pendingDlvCount} nəfər ödəniş edib
                    </span>
                  )}
                </span>
                <button style={S.mini} onClick={loadDeliveries}><RotateCw size={12} /> Yenilə</button>
              </div>
              <p style={{ ...S.small, marginBottom: 10 }}>Təsdiq edəndə sistem aktiv sayı 20-dən az olan ortaq hesaba müştərini avtomatik təyin edir.</p>
              {!dlvReqs.length && <p style={S.small}>Hələ çatdırılma sorğusu yoxdur.</p>}
              {dlvReqs.map((r) => {
                const deliverAt = new Date(r.deliver_at).getTime();
                const leftH = Math.max(0, Math.round((deliverAt - Date.now()) / 3600000 * 10) / 10);
                return (
                  <div key={r.id} style={{ borderTop: "1px solid var(--line)", padding: "12px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "'JetBrains Mono',monospace" }}>+{r.phone}</div>
                        <div style={S.small}>{r.months} ay · {Number(r.amount).toFixed(2)} ₼ · {r.speed_label} · {skyFmtDate(r.created_at)}</div>
                        {r.status === "pending" && <div style={{ ...S.small, color: "var(--gold)", marginTop: 2 }}>⏱️ Çatdırılmaya ~{leftH} saat qalıb</div>}
                        {r.status === "approved" && <div style={{ ...S.small, color: "#1f9d55", marginTop: 2 }}>✓ Hesab verildi · PIN: {r.assigned_pin} · {r.assigned_room_name}</div>}
                        {r.receipt_url && <a href={r.receipt_url} target="_blank" rel="noreferrer" style={{ ...S.small, color: "#7FB3FF", display: "inline-block", marginTop: 3 }}>📎 Qəbzə bax</a>}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                          <button style={S.mini} onClick={async () => { if (await skyCopy(`${SKY_SITE_URL}/#teslim-${r.id}`)) flashMsg("Gözləmə linki kopyalandı ✓"); }}>
                            <Copy size={12} /> Gözləmə linki
                          </button>
                          {r.status === "approved" && r.assigned_slug && (
                            <button style={S.mini} onClick={async () => { if (await skyCopy(`${SKY_SITE_URL}/?nf=${r.phone}&pin=${r.assigned_pin}#h-${r.assigned_slug}`)) flashMsg("Kabinet linki kopyalandı ✓"); }}>
                              <Copy size={12} /> Kabinet linki
                            </button>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 999,
                          background: r.status === "approved" ? "rgba(31,157,85,0.2)" : r.status === "rejected" ? "rgba(225,18,42,0.2)" : "rgba(245,179,1,0.2)",
                          color: r.status === "approved" ? "#1f9d55" : r.status === "rejected" ? "#FF6B7A" : "#F5B301" }}>
                          {r.status === "approved" ? "çatdırıldı" : r.status === "rejected" ? "rədd edildi" : "gözləyir"}
                        </span>
                        {r.status === "pending" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="ab-btn ab-btn-gold" style={{ padding: "7px 12px", fontSize: 13 }} onClick={() => approveDelivery(r.id)}>Təsdiqlə və hesab ver</button>
                            <button style={S.mini} onClick={() => rejectDelivery(r.id)}><Ban size={12} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "videos" && (
            <div style={S.box}>
              <div style={{ ...S.row, justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Giriş səhifəsi videoları</span>
                <button style={S.mini} onClick={loadVideos}><RotateCw size={12} /> Yenilə</button>
              </div>
              <p style={{ ...S.small, marginBottom: 12 }}>Buraya yüklədiyiniz videolar <b>#hesabgiris</b> giriş səhifəsində avtomatik reels-feed kimi göstərilir. MP4 tövsiyə olunur (maks. 100 MB).</p>
              <div style={{ border: "1px dashed var(--line)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <input style={{ ...S.input, marginBottom: 8 }} placeholder="Video başlığı (istəyə bağlı)" value={vidTitle} onChange={(e) => setVidTitle(e.target.value)} />
                <label className="ab-btn ab-btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: vidUploading ? "wait" : "pointer", opacity: vidUploading ? 0.6 : 1 }}>
                  <Upload size={14} /> {vidUploading ? "Yüklənir..." : "Video yüklə"}
                  <input type="file" accept="video/*" style={{ display: "none" }} disabled={vidUploading} onChange={uploadVideo} ref={vidFileRef} />
                </label>
              </div>
              {!videos.length && <p style={S.small}>Hələ video yoxdur. İlk videonu yükləyin.</p>}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 }}>
                {videos.map((v) => (
                  <div key={v.id} style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", opacity: v.is_active ? 1 : 0.5 }}>
                    <video src={v.url} style={{ width: "100%", height: 180, objectFit: "cover", background: "#000", display: "block" }} controls preload="metadata" />
                    <div style={{ padding: 8 }}>
                      {v.title && <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 6 }}>{v.title}</div>}
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={S.mini} onClick={() => toggleVideo(v)}>{v.is_active ? "Gizlət" : "Göstər"}</button>
                        <button style={S.mini} onClick={() => deleteVideo(v)}><Ban size={12} /> Sil</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "renewals" && (
            <div style={S.box}>
              <div style={{ ...S.row, justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>
                  Ödəniş edib gözləyənlər
                  {pendingRenewCount > 0 && (
                    <span style={{ marginLeft: 8, background: "#E1122A", color: "#fff", borderRadius: 999, padding: "2px 12px", fontSize: 13, fontWeight: 800, animation: "pulse 1.4s infinite" }}>
                      {pendingRenewCount} nəfər ödəniş edib
                    </span>
                  )}
                </span>
                <button style={S.mini} onClick={loadRenewals}><RotateCw size={12} /> Yenilə</button>
              </div>
              {!renewReqs.length && <p style={S.small}>Hələ yeniləmə sorğusu yoxdur. Müştəri kabinetdən ödəniş etdikcə burada görünəcək.</p>}
              {renewReqs.map((r) => (
                <div key={r.id} style={{ borderTop: "1px solid var(--line)", padding: "12px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "'JetBrains Mono',monospace" }}>+{r.phone}</div>
                      <div style={S.small}>
                        {r.months} ay · {Number(r.amount).toFixed(2)} ₼ · {r.service || "Netflix"}{r.room_name ? " · " + r.room_name : ""} · {skyFmtDate(r.created_at)}
                      </div>
                      {r.gifts && <div style={{ ...S.small, color: "var(--gold)", marginTop: 3 }}>🎁 {r.gifts}</div>}
                      {r.receipt_url && <a href={r.receipt_url} target="_blank" rel="noreferrer" style={{ ...S.small, color: "#7FB3FF", display: "inline-block", marginTop: 3 }}>📎 Qəbzə bax</a>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 999,
                        background: r.status === "approved" ? "rgba(31,157,85,0.2)" : r.status === "rejected" ? "rgba(225,18,42,0.2)" : "rgba(245,179,1,0.2)",
                        color: r.status === "approved" ? "#1f9d55" : r.status === "rejected" ? "#FF6B7A" : "#F5B301" }}>
                        {r.status === "approved" ? "təsdiqləndi" : r.status === "rejected" ? "rədd edildi" : "gözləyir"}
                      </span>
                      {r.status === "pending" && (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="ab-btn ab-btn-gold" style={{ padding: "7px 12px", fontSize: 13 }} onClick={() => approveRenewal(r.id)}>Təsdiqlə və artır</button>
                          <button style={S.mini} onClick={() => rejectRenewal(r.id)}><Ban size={12} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "passmgmt" && (() => {
            // SEÇİLƏN TARİXDƏ vaxtı bitən müştərilər → onların hesablarından şifrəsi N gündən çox dəyişməyənlər
            const ref = new Date(passDate + "T23:59:59");
            const cutoff = new Date(ref.getTime() - (Number(passDays) || 15) * 86400000);
            const expiringOnDate = members.filter((m) => m.expires_at && new Date(m.expires_at).toISOString().slice(0, 10) === passDate);
            const allRows = expiringOnDate
              .map((m) => {
                const acc = accById[m.account_id];
                if (!acc) return null;
                const pu = acc.password_updated_at ? new Date(acc.password_updated_at) : null;
                const staleP = !pu || pu <= cutoff;
                if (!staleP) return null;
                // Şəxsi/Ortaq təyini: otaq/rəqəm otaq → ortaq; adlı profil → şəxsi; spotify/youtube → şəxsi
                const svcL = String(acc.service || "").toLowerCase();
                const roomClean = String(m.room_name || "").toLowerCase().replace(/\s/g, "");
                const noteL = String(acc.note || "").toLowerCase();
                const isSpotifyYt = svcL.includes("spotify") || svcL.includes("youtube");
                const ortaq = !isSpotifyYt && (noteL.includes("ortaq") || /otaq/.test(roomClean) || /^\d+$/.test(roomClean));
                return { email: acc.login_email, phone: m.phone, name: m.name, service: acc.service, pu: acc.password_updated_at, type: ortaq ? "ortaq" : "sexsi" };
              })
              .filter(Boolean)
              .sort((x, y) => new Date(x.pu || 0) - new Date(y.pu || 0));
            const ortaqCount = allRows.filter((r) => r.type === "ortaq").length;
            const sexsiCount = allRows.filter((r) => r.type === "sexsi").length;
            const rows = passType === "all" ? allRows : allRows.filter((r) => r.type === passType);
            const allPhones = [...new Set(rows.map((r) => r.phone))].filter(Boolean);
            const allMails = [...new Set(rows.map((r) => r.email))].filter(Boolean);
            const pairs = rows.map((r) => `${r.email}  —  +${r.phone}`);
            return (
              <div style={S.box}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Şifrə idarəsi</div>
                <p style={{ ...S.small, marginBottom: 12 }}>Seçilən tarixdə vaxtı bitən müştərilərdən, hesab şifrəsi çoxdan dəyişməyənləri göstərir.</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 12 }}>
                  <div>
                    <div style={S.small}>Vaxtı bitən tarix</div>
                    <input type="date" style={{ ...S.input, width: 170 }} value={passDate} onChange={(e) => setPassDate(e.target.value)} />
                  </div>
                  <div>
                    <div style={S.small}>Şifrə neçə gündən çox dəyişməyib</div>
                    <input type="number" min={1} style={{ ...S.input, width: 130 }} value={passDays} onChange={(e) => setPassDays(e.target.value)} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {[["all", "Hamısı", allRows.length], ["ortaq", "Ortaq", ortaqCount], ["sexsi", "Şəxsi", sexsiCount]].map(([k, lbl, cnt]) => (
                    <button key={k} style={S.chip(passType === k)} onClick={() => setPassType(k)}>{lbl} ({cnt})</button>
                  ))}
                </div>
                <p style={{ ...S.small, marginBottom: 12 }}>
                  <b style={{ color: "var(--gold)" }}>{skyFmtDate(passDate, false)}</b> tarixində vaxtı bitən və şifrəsi son <b>{passDays}</b> gündən çox dəyişməyən <b>{rows.length}</b> {passType === "ortaq" ? "ortaq" : passType === "sexsi" ? "şəxsi" : ""} müştəri:
                </p>

                {rows.length > 0 && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                    <button style={S.mini} onClick={async () => (await skyCopy(allPhones.join("\n"))) && flashMsg(allPhones.length + " nömrə kopyalandı ✓")}>
                      <Copy size={12} /> Bütün nömrələr ({allPhones.length})
                    </button>
                    <button style={S.mini} onClick={async () => (await skyCopy(allMails.join("\n"))) && flashMsg(allMails.length + " mail kopyalandı ✓")}>
                      <Copy size={12} /> Bütün maillər ({allMails.length})
                    </button>
                    <button style={S.mini} onClick={async () => (await skyCopy(pairs.join("\n"))) && flashMsg("Mail + nömrə kopyalandı ✓")}>
                      <Copy size={12} /> Mail + nömrə
                    </button>
                  </div>
                )}

                {!rows.length && <p style={S.small}>Bu tarixdə vaxtı bitən və şifrəsi köhnə olan müştəri yoxdur.</p>}
                {rows.map((r, i) => {
                  const pu = r.pu ? new Date(r.pu) : null;
                  const daysAgo = pu ? Math.floor((ref.getTime() - pu.getTime()) / 86400000) : null;
                  return (
                    <div key={i} style={{ borderTop: "1px solid var(--line)", padding: "10px 0", display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, wordBreak: "break-all" }}>
                          {r.email}
                          <span style={{ marginLeft: 7, fontSize: 10.5, fontWeight: 700, padding: "1px 7px", borderRadius: 999, verticalAlign: "middle",
                            background: r.type === "ortaq" ? "rgba(245,179,1,0.18)" : "rgba(127,179,255,0.18)",
                            color: r.type === "ortaq" ? "#F5B301" : "#7FB3FF" }}>{r.type === "ortaq" ? "ortaq" : "şəxsi"}</span>
                        </div>
                        <div style={S.small}>{r.service || "—"} · +{r.phone}{r.name ? " · " + r.name : ""}</div>
                      </div>
                      <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        <div style={{ ...S.small, color: daysAgo >= 30 ? "#FF6B7A" : "var(--gold)" }}>
                          {pu ? `${daysAgo} gün əvvəl` : "heç vaxt"}
                        </div>
                        <div style={{ ...S.small, fontSize: 11 }}>{pu ? skyFmtDate(r.pu, false) : "—"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {tab === "contracts" && (() => {
            const q = skyNormPhone(contractSearch);
            const list = contractSearch.trim()
              ? contracts.filter((c) => (c.phone || "").includes(q) || (c.name || "").toLowerCase().includes(contractSearch.trim().toLowerCase()))
              : contracts;
            return (
              <div style={S.box}>
                <div style={{ ...S.row, justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Şərtləri qəbul edənlər ({list.length})</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={S.mini} onClick={loadContracts}><RotateCw size={12} /> Yenilə</button>
                    <button style={S.mini} onClick={async () => {
                      const nums = list.map((c) => c.phone).filter(Boolean).join("\n");
                      if (await skyCopy(nums)) flashMsg(list.length + " nömrə kopyalandı ✓");
                    }}><Copy size={12} /> Nömrələri kopyala</button>
                  </div>
                </div>
                <input style={{ ...S.input, marginBottom: 10 }} placeholder="Nömrə və ya ad ilə axtar" value={contractSearch} onChange={(e) => setContractSearch(e.target.value)} />
                {!contracts.length && <p style={S.small}>Hələ heç kim şərtləri qəbul etməyib. Müştəri kabinetə girib şərtləri qəbul etdikcə burada görünəcək.</p>}
                {contracts.length > 0 && !list.length && <p style={S.small}>Axtarışa uyğun nəticə yoxdur.</p>}
                {list.map((c) => (
                  <div key={c.id} style={{ borderTop: "1px solid var(--line)", padding: "10px 0", display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: 15 }}>+{c.phone}</div>
                      <div style={S.small}>{c.name ? c.name + " · " : ""}{skyFmtDate(c.accepted_at)} · {c.version}</div>
                    </div>
                    <button style={S.mini} onClick={async () => (await skyCopy(c.phone)) && flashMsg("Nömrə kopyalandı ✓")}><Copy size={12} /></button>
                  </div>
                ))}
              </div>
            );
          })()}

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
                        {c.kind === "signin"
                          ? <span style={{ color: "var(--muted)" }}>giriş kodu (müştəriyə göstərilmir)</span>
                          : c.kind === "confirmed"
                          ? <span style={{ color: "#1f9d55", fontWeight: 700 }}>✓ avtomatik təsdiqləndi</span>
                          : <span style={{ color: "#1f9d55" }}>cihaz təsdiqi</span>}
                        {" · "}{c.to_email}{!c.account_id && <span style={{ color: "var(--gold)" }}> · tanınmayan mail</span>} · {skyFmtDate(c.received_at)}
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
  const [navBalance, setNavBalance] = useState(null);
  const [favorites, setFavorites] = useState([]); // product_id massivi
  const [notifs, setNotifs] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifReadAt, setNotifReadAt] = useState(() => { try { return Number(localStorage.getItem("skyflix_notif_read") || 0); } catch { return 0; } });
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session) { setNavBalance(null); return; }
    let stop = false;
    const load = () => supabase.from("profiles").select("balance").eq("id", session.user.id).single().then(({ data }) => { if (!stop && data) setNavBalance(Number(data.balance || 0)); });
    load();
    const id = setInterval(load, 15000); // balans dəyişsə (təsdiq olunsa) 15 san-a yenilənir
    return () => { stop = true; clearInterval(id); };
  }, [session]);

  // Favorilər
  useEffect(() => {
    if (!session) { setFavorites([]); return; }
    supabase.from("favorites").select("product_id").eq("user_id", session.user.id)
      .then(({ data }) => setFavorites((data || []).map((f) => f.product_id)));
  }, [session]);

  async function toggleFavorite(productId) {
    if (!session) { window.alert("Favorilərə əlavə etmək üçün hesabınıza daxil olun."); go("hesab"); return; }
    const isFav = favorites.includes(productId);
    if (isFav) {
      setFavorites((f) => f.filter((x) => x !== productId));
      await supabase.from("favorites").delete().eq("user_id", session.user.id).eq("product_id", productId);
    } else {
      setFavorites((f) => [...f, productId]);
      await supabase.from("favorites").insert({ user_id: session.user.id, product_id: productId });
    }
  }

  // Bildirişlər (özünə + hamıya)
  useEffect(() => {
    if (!session) { setNotifs([]); return; }
    const load = () => supabase.from("notifications").select("*")
      .or("user_id.is.null,user_id.eq." + session.user.id)
      .order("created_at", { ascending: false }).limit(30)
      .then(({ data }) => setNotifs(data || []));
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [session]);

  const unreadNotifs = notifs.filter((n) => new Date(n.created_at).getTime() > notifReadAt).length;
  function openNotifs() {
    setNotifOpen((v) => !v);
    const now = Date.now();
    setNotifReadAt(now);
    try { localStorage.setItem("skyflix_notif_read", String(now)); } catch {}
  }

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
      <VideoWidget videoIds={SITE_PLAYLIST} />
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
        .ab-fav-btn{ position:absolute; top:10px; right:10px; z-index:3; width:34px; height:34px; border-radius:50%; border:none; background:rgba(0,0,0,0.45); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .ab-fav-btn:hover{ background:rgba(0,0,0,0.65); }
        .ab-notif-dot{ position:absolute; top:-4px; right:-4px; background:#E1122A; color:#fff; border-radius:999px; min-width:17px; height:17px; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; padding:0 4px; }
        .ab-notif-panel{ position:absolute; top:46px; right:0; width:300px; max-height:380px; overflow-y:auto; background:var(--surface); border:1px solid var(--line); border-radius:14px; box-shadow:0 12px 30px -10px rgba(0,0,0,0.4); z-index:50; }
        .ab-notif-head{ font-weight:700; padding:12px 14px; border-bottom:1px solid var(--line); }
        .ab-notif-empty{ padding:16px 14px; color:var(--muted); font-size:13.5px; }
        .ab-notif-item{ padding:11px 14px; border-bottom:1px solid var(--line); }
        .ab-notif-title{ font-weight:600; font-size:14px; }
        .ab-notif-body{ font-size:13px; color:var(--muted); margin-top:2px; line-height:1.5; }
        .ab-notif-date{ font-size:11px; color:var(--muted); margin-top:4px; }
        .ab-navbalance{ display:inline-flex; align-items:center; gap:6px; border:1px solid var(--gold); background:linear-gradient(120deg, rgba(225,18,42,0.12), transparent); color:var(--text); border-radius:999px; padding:7px 12px; cursor:pointer; font-weight:700; font-size:13.5px; font-family:'Inter',sans-serif; }
        .ab-navbalance:hover{ box-shadow:0 6px 14px -8px rgba(225,18,42,0.5); }
        .ab-navbalance-plus{ background:var(--gold); color:#fff; width:18px; height:18px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; font-size:14px; line-height:1; }
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
        .ab-cashback-label{ font-size:12.5px; color:var(--muted); margin-top:4px; }
        .ab-topup{ border:1px solid var(--line); border-radius:14px; padding:16px; margin-top:12px; display:grid; gap:12px; background:var(--surface); }
        .ab-topup-msg{ background:rgba(31,157,85,0.12); border:1px solid rgba(31,157,85,0.35); color:#1f9d55; border-radius:10px; padding:10px 12px; font-size:13.5px; }
        .ab-topup-field{ display:grid; gap:5px; font-size:13px; color:var(--muted); }
        .ab-topup-field input{ background:var(--bg); border:1px solid var(--line); color:var(--text); border-radius:10px; padding:11px 13px; font-size:16px; }
        .ab-topup-tiers{ display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:8px; }
        .ab-tier{ display:flex; flex-direction:column; gap:2px; align-items:flex-start; text-align:left; cursor:pointer; border:1px solid var(--line); background:var(--bg); color:var(--text); border-radius:12px; padding:10px 12px; font-family:'Inter',sans-serif; }
        .ab-tier b{ font-size:13.5px; }
        .ab-tier span{ font-size:12px; color:var(--gold); }
        .ab-tier.active{ border-color:var(--gold); background:linear-gradient(120deg, rgba(225,18,42,0.10), transparent); }
        .ab-topup-sum{ font-size:14px; }
        .ab-topup-card{ border:1px solid var(--line); border-radius:12px; padding:12px 14px; background:var(--bg); }
        .ab-topup-card-row{ display:flex; justify-content:space-between; gap:10px; font-size:13.5px; padding:3px 0; }
        .ab-topup-card-row span{ color:var(--muted); }
        .ab-topup-file{ display:flex; align-items:center; gap:8px; cursor:pointer; border:1px dashed var(--line); border-radius:12px; padding:14px; font-size:13.5px; color:var(--muted); justify-content:center; }
        .ab-topup-ruleslink{ background:none; border:none; padding:0; color:var(--gold); font-weight:600; cursor:pointer; text-decoration:underline; font-size:13px; font-family:'Inter',sans-serif; justify-self:start; }
        .ab-topup-rules{ font-size:12.5px; color:var(--muted); line-height:1.6; border-left:2px solid var(--gold); padding-left:12px; }
        .ab-topup-rules p{ margin:0 0 6px; }
        .ab-topup-agree{ display:flex; align-items:flex-start; gap:8px; font-size:13px; color:var(--text); }
        .ab-topup-agree input{ margin-top:2px; accent-color:var(--gold); width:16px; height:16px; flex-shrink:0; }
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
          {session && (
            <div style={{ position: "relative" }}>
              <button className="ab-accountbtn" onClick={openNotifs} title="Bildirişlər" style={{ position: "relative" }}>
                <MessageCircle size={18} />
                {unreadNotifs > 0 && <span className="ab-notif-dot">{unreadNotifs}</span>}
              </button>
              {notifOpen && (
                <div className="ab-notif-panel">
                  <div className="ab-notif-head">Bildirişlər</div>
                  {notifs.length === 0 && <div className="ab-notif-empty">Bildiriş yoxdur.</div>}
                  {notifs.map((n) => (
                    <div key={n.id} className="ab-notif-item">
                      <div className="ab-notif-title">{n.title}</div>
                      {n.body && <div className="ab-notif-body">{n.body}</div>}
                      <div className="ab-notif-date">{new Date(n.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {session && (
            <button className="ab-navbalance" onClick={() => navigate("hesab")} title="Balansım">
              <Wallet size={15} />
              <span>{navBalance == null ? "…" : navBalance.toFixed(2) + " ₼"}</span>
              <span className="ab-navbalance-plus">+</span>
            </button>
          )}
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
        {page === "home" && <HomePage go={go} products={products} onAdd={addToCart} lang={lang} t={t} reviews={reviews} onOpenReviews={setReviewsModalProduct} favorites={favorites} onFav={toggleFavorite} />}
        {page === "paketler" && <PaketlerPage products={products} onAdd={addToCart} t={t} reviews={reviews} onOpenReviews={setReviewsModalProduct} categories={categories} go={go} favorites={favorites} onFav={toggleFavorite} />}
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
        {page === "hesab" && <CustomerAuthPage t={t} lang={lang} settings={settings} products={products} favorites={favorites} onFav={toggleFavorite} go={go} />}
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

// ============================================================
// ÖDƏNİŞ LİNKİ + ÇATDIRILMA
// ============================================================
const DLV_PLANS = [
  { months: 1, amount: 3.0, label: "1 ay" },
  { months: 3, amount: 8.0, label: "3 ay" },
  { months: 6, amount: 15.0, label: "6 ay" },
  { months: 12, amount: 20.0, label: "12 ay", best: true },
];
const DLV_SPEEDS = [
  { label: "24 saat ərzində", sub: "Standart", hours: 24, extra: 0, free: true },
  { label: "12 saat ərzində", sub: "Daha sürətli", hours: 12, extra: 0.57 },
  { label: "6 saat ərzində", sub: "Sürətli", hours: 6, extra: 0.66 },
  { label: "1 saat ərzində", sub: "Çox sürətli", hours: 1, extra: 0.82 },
  { label: "Anında çatdırılma", sub: "Dərhal", hours: 0, extra: 0.99 },
];
const DLV_CSS = `
  .dl-root{min-height:100vh;background:#150708;color:#F5EBEA;font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;padding:26px 16px 48px;}
  .dl-brand{display:flex;align-items:center;gap:9px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;margin-bottom:18px;}
  .dl-brand .ic{width:28px;height:28px;border-radius:7px;background:linear-gradient(135deg,#FF3B4E,#B00C20);display:flex;align-items:center;justify-content:center;font-size:13px;}
  .dl-card{width:100%;max-width:440px;background:#1D0D0E;border:1px solid rgba(255,255,255,0.1);border-radius:22px;overflow:hidden;}
  .dl-hd{padding:20px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg,rgba(225,18,42,.1),transparent);}
  .dl-hd h1{font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 4px;}
  .dl-hd p{margin:0;color:#A98D8B;font-size:13px;}
  .dl-sec{padding:16px 18px;border-bottom:1px solid rgba(255,255,255,0.08);}
  .dl-t{font-size:11.5px;text-transform:uppercase;letter-spacing:1px;color:#A98D8B;margin-bottom:10px;font-weight:700;}
  .dl-opt{display:flex;justify-content:space-between;align-items:center;border:1px solid rgba(255,255,255,0.12);background:#150708;border-radius:12px;padding:13px 14px;margin-bottom:8px;cursor:pointer;transition:border-color .15s,transform .12s;width:100%;text-align:left;color:inherit;font-family:inherit;}
  .dl-opt:hover{transform:translateY(-1px);}
  .dl-opt.on{border-color:#FF3B4E;background:rgba(255,59,78,0.08);}
  .dl-opt.best{border-color:#F5B301;}
  .dl-opt.best.on{background:rgba(245,179,1,0.1);}
  .dl-opt-l{font-weight:700;font-size:15px;}
  .dl-opt-sub{font-size:11.5px;color:#A98D8B;margin-top:2px;}
  .dl-opt-p{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:16px;color:#FF8A95;}
  .dl-opt.best .dl-opt-p{color:#F5B301;}
  .dl-badge{display:inline-block;background:#F5B301;color:#1A1210;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:999px;margin-left:6px;vertical-align:middle;}
  .dl-free{color:#49d17f;font-weight:800;font-size:13px;}
  .dl-input{width:100%;background:#150708;border:1px solid rgba(255,255,255,0.14);color:#F5EBEA;border-radius:11px;padding:13px;font-size:15px;outline:none;}
  .dl-input:focus{border-color:#FF3B4E;}
  .dl-pcard{background:#150708;border:1px solid rgba(255,255,255,0.1);border-radius:13px;padding:13px;margin-bottom:10px;}
  .dl-prow{display:flex;justify-content:space-between;font-size:13.5px;padding:3px 0;color:#A98D8B;}
  .dl-prow b{color:#fff;font-family:'JetBrains Mono',monospace;}
  .dl-upl{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:1px dashed rgba(255,255,255,0.25);background:#150708;color:#A98D8B;border-radius:12px;padding:14px;font-size:13.5px;cursor:pointer;}
  .dl-upl.has{border-style:solid;border-color:#1f9d55;color:#8fe0b0;background:rgba(31,157,85,0.08);}
  .dl-warn{background:rgba(225,18,42,0.1);border:1px solid rgba(255,59,78,0.35);color:#FFB3BA;border-radius:11px;padding:11px 12px;font-size:11.5px;line-height:1.5;margin-top:10px;}
  .dl-total{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;background:#120607;}
  .dl-total-v{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:26px;color:#fff;}
  .dl-pay{display:block;width:calc(100% - 36px);margin:0 18px 18px;border:0;border-radius:13px;padding:16px;font-size:16px;font-weight:800;cursor:pointer;color:#fff;background:linear-gradient(135deg,#FF3B4E,#B00C20);box-shadow:0 8px 22px rgba(225,18,42,.4);}
  .dl-pay:disabled{opacity:.45;cursor:not-allowed;}
  .dl-err{background:rgba(225,18,42,0.12);border:1px solid rgba(255,59,78,0.35);color:#FFB3BA;border-radius:11px;padding:10px 12px;font-size:13px;margin:0 18px 10px;}
  .dl-wait{text-align:center;padding:34px 24px;}
  .dl-cd{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:40px;color:#fff;letter-spacing:1px;margin:10px 0;}
  .dl-spin{display:inline-block;font-size:40px;animation:dlspin 1.4s linear infinite;}
  @keyframes dlspin{to{transform:rotate(360deg);}}
  .dl-ready-box{text-align:left;background:#150708;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:14px;margin:14px 0;}
`;

function DlvBrand() {
  return (<a className="dl-brand" href={SKY_SITE_URL} style={{ textDecoration: "none", color: "inherit" }}><span className="ic">▶</span> SkyFlix Azerbaycan</a>);
}

function PayLinkPage() {
  useGoogleFonts();
  const [plan, setPlan] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [wa, setWa] = useState("");
  const [receiptName, setReceiptName] = useState("");
  const receiptRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { document.title = "Ödəniş — SkyFlix"; }, []);
  const total = plan !== null ? DLV_PLANS[plan].amount + DLV_SPEEDS[speed].extra : null;
  const ready = plan !== null && skyNormPhone(wa).length >= 9 && !!receiptName;

  function pick(e) { const f = e.target.files && e.target.files[0]; receiptRef.current = f || null; setReceiptName(f ? f.name : ""); }

  async function submit() {
    if (!ready || busy) return;
    setErr(""); setBusy(true);
    let receiptUrl = "";
    try {
      const f = receiptRef.current;
      const path = skyNormPhone(wa) + "-" + Date.now() + "-" + (f.name || "qebz").replace(/[^\w.\-]/g, "_");
      const up = await supabase.storage.from("receipts").upload(path, f, { upsert: false });
      if (up.error) throw up.error;
      receiptUrl = supabase.storage.from("receipts").getPublicUrl(path).data?.publicUrl || "";
    } catch (e) { setBusy(false); setErr("Qəbz yüklənmədi. İnternetinizi yoxlayıb bir daha cəhd edin."); return; }
    try {
      const { data } = await supabase.rpc("create_delivery_request", {
        p_phone: wa, p_months: DLV_PLANS[plan].months, p_amount: total,
        p_speed_label: DLV_SPEEDS[speed].label, p_speed_hours: DLV_SPEEDS[speed].hours, p_receipt_url: receiptUrl,
      });
      setBusy(false);
      if (data?.status === "ok" && data.id) { window.location.hash = "teslim-" + data.id; }
      else setErr("Sorğu yaradılmadı. Bir daha cəhd edin.");
    } catch (e) { setBusy(false); setErr("Bağlantı xətası. Bir daha cəhd edin."); }
  }

  return (
    <div className="dl-root">
      <style>{DLV_CSS}</style>
      <DlvBrand />
      <div className="dl-card">
        <div className="dl-hd"><h1>Abunəlik ödənişi</h1><p>Planı seçin, ödəyin, hesabınız avtomatik çatdırılsın.</p></div>

        <div className="dl-sec">
          <div className="dl-t">1 · Abunəlik müddəti</div>
          {DLV_PLANS.map((p, i) => (
            <button key={i} className={`dl-opt ${p.best ? "best" : ""} ${plan === i ? "on" : ""}`} onClick={() => setPlan(i)}>
              <span className="dl-opt-l">{p.label}{p.best && <span className="dl-badge">ƏN SƏRFƏLİ</span>}</span>
              <span className="dl-opt-p">{p.amount.toFixed(2)} ₼</span>
            </button>
          ))}
        </div>

        <div className="dl-sec">
          <div className="dl-t">2 · Çatdırılma müddəti</div>
          {DLV_SPEEDS.map((s, i) => (
            <button key={i} className={`dl-opt ${speed === i ? "on" : ""}`} onClick={() => setSpeed(i)}>
              <span><span className="dl-opt-l">{s.label}</span><span className="dl-opt-sub">{s.sub}</span></span>
              {s.free ? <span className="dl-free">PULSUZ</span> : <span className="dl-opt-p">+{s.extra.toFixed(2)} ₼</span>}
            </button>
          ))}
        </div>

        <div className="dl-sec">
          <div className="dl-t">3 · WhatsApp nömrəniz</div>
          <input className="dl-input" type="tel" placeholder="+994 __ ___ __ __" value={wa} onChange={(e) => setWa(e.target.value)} />
          <p style={{ fontSize: 11.5, color: "#A98D8B", margin: "7px 0 0" }}>Hesab bu nömrəyə uyğun qeydə alınacaq.</p>
        </div>

        <div className="dl-sec">
          <div className="dl-t">4 · Ödəniş</div>
          <div className="dl-pcard">
            <div className="dl-prow"><span>Ad</span><b>{PAY_CARD_NAME}</b></div>
            <div className="dl-prow"><span>Bank</span><b>{PAY_CARD_BANK}</b></div>
            <div className="dl-prow"><span>Kart</span><b style={{ letterSpacing: 1 }}>{formatCardNumber(PAY_CARD_NUMBER)}</b></div>
          </div>
          <label className={`dl-upl ${receiptName ? "has" : ""}`}>
            <Upload size={15} /> {receiptName ? "✓ " + receiptName : "Ödəniş qəbzini yüklə (MƏCBURİ)"}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={pick} />
          </label>
          <div className="dl-warn">⚠️ Saxta qəbz yükləmək və ya dələduzluq cəhdi aşkarlanarsa, qanunvericiliyə əsasən barənizdə cinayət işi başlana bilər. Yalnız real qəbzi yükləyin.</div>
        </div>

        <div className="dl-total"><span style={{ fontSize: 13, color: "#A98D8B" }}>Ödəniləcək məbləğ</span><span className="dl-total-v">{total !== null ? total.toFixed(2) + " ₼" : "—"}</span></div>
        {err && <div className="dl-err">{err}</div>}
        <button className="dl-pay" disabled={!ready || busy} onClick={submit}>{busy ? "Göndərilir..." : "Ödəniş etdim"}</button>
      </div>
    </div>
  );
}

function DeliveryWaitPage({ id }) {
  useGoogleFonts();
  const [info, setInfo] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    document.title = "Çatdırılma — SkyFlix";
    let stop = false;
    const load = async () => {
      try { const { data } = await supabase.rpc("delivery_status", { p_id: id }); if (!stop && data) setInfo(data); } catch {}
    };
    load();
    const poll = setInterval(load, 5000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => { stop = true; clearInterval(poll); clearInterval(tick); };
  }, [id]);

  function fmtLeft(ms) {
    if (ms <= 0) return "00:00:00";
    const s = Math.floor(ms / 1000);
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${ss}`;
  }

  let body;
  if (!info) {
    body = <div className="dl-wait"><span className="dl-spin">⏳</span><p style={{ color: "#A98D8B", marginTop: 12 }}>Yüklənir...</p></div>;
  } else if (info.status === "notfound") {
    body = <div className="dl-wait"><div style={{ fontSize: 40 }}>❓</div><h2 style={{ fontFamily: "Space Grotesk" }}>Sorğu tapılmadı</h2><p style={{ color: "#A98D8B" }}>Link səhvdir və ya sorğu silinib.</p></div>;
  } else if (info.status === "rejected") {
    body = <div className="dl-wait"><div style={{ fontSize: 40 }}>⛔</div><h2 style={{ fontFamily: "Space Grotesk" }}>Ödəniş təsdiqlənmədi</h2><p style={{ color: "#A98D8B", lineHeight: 1.6 }}>Qəbz təsdiqlənmədi. Zəhmət olmasa bizimlə əlaqə saxlayın.</p></div>;
  } else {
    const deliverAt = new Date(info.deliver_at).getTime();
    const left = deliverAt - now;
    const timeUp = left <= 0;
    const delivered = info.ready && timeUp;
    if (delivered) {
      const link = `${SKY_SITE_URL}/?nf=${encodeURIComponent(info.phone)}&pin=${encodeURIComponent(info.pin)}#h-${info.slug}`;
      body = (
        <div className="dl-wait">
          <div style={{ fontSize: 44 }}>✅</div>
          <h2 style={{ fontFamily: "Space Grotesk", margin: "0 0 6px" }}>Hesabınız hazırdır!</h2>
          <p style={{ color: "#A98D8B", lineHeight: 1.6, margin: "0 0 14px" }}>
            Hesab məlumatları və müştəri kabinetinə giriş üçün aşağıdakı düyməyə basın.
          </p>
          <a className="dl-pay" style={{ display: "block", textDecoration: "none", width: "100%", margin: 0 }} href={link}>
            Hesab məlumatlarına keç →
          </a>
          <p style={{ color: "#8f7a79", fontSize: 11.5, marginTop: 12, lineHeight: 1.5 }}>
            Bu səhifənin linkini saxlayın — hesabınıza yenidən keçid üçün lazım ola bilər.
          </p>
        </div>
      );
    } else {
      body = (
        <div className="dl-wait">
          <span className="dl-spin">⏳</span>
          <h2 style={{ fontFamily: "Space Grotesk", margin: "8px 0 4px" }}>Hesabınız hazırlanır</h2>
          <p style={{ color: "#A98D8B", fontSize: 13, margin: "0 0 4px" }}>Seçdiyiniz çatdırılma: <b style={{ color: "#F5B301" }}>{info.speed_label}</b></p>
          <div className="dl-cd">{fmtLeft(left)}</div>
          <p style={{ color: "#A98D8B", fontSize: 12.5, lineHeight: 1.6 }}>
            Bu müddət ərzində hesabınız bu ekranda avtomatik görünəcək. Səhifəni bağlamayın.
          </p>
          {timeUp && !info.ready && <p style={{ color: "#F5B301", fontSize: 12.5, marginTop: 8 }}>Ödənişiniz son yoxlamadadır, tezliklə hazır olacaq...</p>}
        </div>
      );
    }
  }

  return (
    <div className="dl-root">
      <style>{DLV_CSS}</style>
      <DlvBrand />
      <div className="dl-card">{body}</div>
    </div>
  );
}

/* ===================== #hesabgiris — PREMIUM PORTAL ===================== */
const PORTAL_CSS = `
  .pt-root{min-height:100vh;background:
      radial-gradient(1200px 600px at 50% -10%,rgba(225,18,42,.18),transparent 60%),
      radial-gradient(900px 500px at 100% 100%,rgba(245,179,1,.08),transparent 55%),
      #0B0506;color:#F6EEED;font-family:Inter,system-ui,sans-serif;
      display:flex;flex-direction:column;align-items:center;padding:0 16px 56px;}
  .pt-top{width:100%;max-width:480px;display:flex;align-items:center;justify-content:space-between;padding:22px 2px 16px;}
  .pt-brand{display:flex;align-items:center;gap:9px;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:18px;letter-spacing:.3px;}
  .pt-brand .ic{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#FF3B4E,#B00C20);display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 6px 16px rgba(225,18,42,.45);}
  .pt-secure{font-size:11px;color:#9A8382;display:flex;align-items:center;gap:5px;}
  .pt-card{width:100%;max-width:480px;background:linear-gradient(180deg,rgba(32,16,17,.96),rgba(18,9,10,.96));
      border:1px solid rgba(255,255,255,.09);border-radius:26px;overflow:hidden;
      box-shadow:0 40px 90px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.05);backdrop-filter:blur(8px);}
  .pt-hero{position:relative;height:216px;overflow:hidden;}
  .pt-hero img{width:100%;height:100%;object-fit:cover;object-position:center 32%;filter:saturate(1.05) contrast(1.02);}
  .pt-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,5,6,.15) 0%,rgba(11,5,6,.55) 55%,#1a0d0e 100%);}
  .pt-hero-txt{position:absolute;left:22px;right:22px;bottom:16px;z-index:2;}
  .pt-hero-txt h1{font-family:'Space Grotesk',sans-serif;font-size:23px;margin:0 0 4px;letter-spacing:.3px;text-shadow:0 2px 14px rgba(0,0,0,.6);}
  .pt-hero-txt p{margin:0;font-size:12.5px;color:#E7CFCE;text-shadow:0 1px 8px rgba(0,0,0,.7);}
  .pt-hero-badge{position:absolute;top:14px;right:14px;z-index:2;background:rgba(10,5,6,.6);border:1px solid rgba(245,179,1,.4);
      color:#F5B301;font-size:10px;font-weight:800;letter-spacing:1px;padding:5px 10px;border-radius:999px;backdrop-filter:blur(6px);}
  .pt-tabs{display:flex;gap:6px;margin:16px 18px 2px;background:#140a0b;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:5px;}
  .pt-tab{flex:1;border:0;background:transparent;color:#A98D8B;font-family:inherit;font-weight:700;font-size:14px;padding:11px;border-radius:10px;cursor:pointer;transition:.18s;}
  .pt-tab.on{background:linear-gradient(135deg,#FF3B4E,#B00C20);color:#fff;box-shadow:0 8px 20px rgba(225,18,42,.4);}
  .pt-body{padding:18px;}
  .pt-lbl{font-size:11.5px;text-transform:uppercase;letter-spacing:1px;color:#A98D8B;margin:0 0 7px;font-weight:800;}
  .pt-input{width:100%;background:#120707;border:1px solid rgba(255,255,255,.14);color:#F6EEED;border-radius:13px;padding:14px;font-size:15px;outline:none;transition:.15s;box-sizing:border-box;}
  .pt-input:focus{border-color:#FF3B4E;box-shadow:0 0 0 3px rgba(225,18,42,.18);}
  .pt-pin{letter-spacing:12px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:800;padding:15px;}
  .pt-field{margin-bottom:15px;}
  .pt-hint{font-size:11.5px;color:#8f7a79;margin:7px 0 0;line-height:1.5;}
  .pt-btn{display:block;width:100%;border:0;border-radius:14px;padding:16px;font-size:16px;font-weight:800;cursor:pointer;color:#fff;
      background:linear-gradient(135deg,#FF3B4E,#B00C20);box-shadow:0 12px 28px rgba(225,18,42,.42);transition:.15s;font-family:inherit;}
  .pt-btn:hover{transform:translateY(-1px);}
  .pt-btn:disabled{opacity:.42;cursor:not-allowed;transform:none;box-shadow:none;}
  .pt-btn.gold{background:linear-gradient(135deg,#F7C948,#E0A000);color:#1a1008;box-shadow:0 12px 28px rgba(245,179,1,.38);}
  .pt-err{background:rgba(225,18,42,.12);border:1px solid rgba(255,59,78,.35);color:#FFB3BA;border-radius:12px;padding:11px 13px;font-size:13px;margin-bottom:13px;line-height:1.5;}
  .pt-opt{display:flex;justify-content:space-between;align-items:center;border:1px solid rgba(255,255,255,.12);background:#120707;border-radius:13px;padding:13px 14px;margin-bottom:8px;cursor:pointer;transition:.15s;width:100%;text-align:left;color:inherit;font-family:inherit;}
  .pt-opt:hover{transform:translateY(-1px);}
  .pt-opt.on{border-color:#FF3B4E;background:rgba(255,59,78,.08);}
  .pt-opt.best{border-color:#F5B301;}
  .pt-opt.best.on{background:rgba(245,179,1,.1);}
  .pt-opt-l{font-weight:700;font-size:15px;}
  .pt-opt-sub{font-size:11.5px;color:#A98D8B;margin-top:2px;}
  .pt-opt-p{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:16px;color:#FF8A95;}
  .pt-opt.best .pt-opt-p{color:#F5B301;}
  .pt-badge{display:inline-block;background:#F5B301;color:#1A1210;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:999px;margin-left:6px;vertical-align:middle;}
  .pt-free{color:#49d17f;font-weight:800;font-size:13px;}
  .pt-sec-t{font-size:11.5px;text-transform:uppercase;letter-spacing:1px;color:#A98D8B;margin:18px 0 10px;font-weight:800;}
  .pt-pcard{background:#120707;border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:13px;margin-bottom:11px;}
  .pt-prow{display:flex;justify-content:space-between;font-size:13.5px;padding:3px 0;color:#A98D8B;}
  .pt-prow b{color:#fff;font-family:'JetBrains Mono',monospace;}
  .pt-upl{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:1px dashed rgba(255,255,255,.25);background:#120707;color:#A98D8B;border-radius:13px;padding:14px;font-size:13.5px;cursor:pointer;}
  .pt-upl.has{border-style:solid;border-color:#1f9d55;color:#8fe0b0;background:rgba(31,157,85,.08);}
  .pt-warn{background:rgba(225,18,42,.1);border:1px solid rgba(255,59,78,.35);color:#FFB3BA;border-radius:12px;padding:11px 12px;font-size:11.5px;line-height:1.5;margin-top:10px;}
  .pt-total{display:flex;justify-content:space-between;align-items:center;padding:15px 0 4px;}
  .pt-total-v{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:27px;color:#fff;}
  .pt-rules-tg{display:flex;align-items:center;justify-content:space-between;width:100%;border:1px solid rgba(255,255,255,.14);
      background:#120707;color:#F6EEED;border-radius:13px;padding:13px 14px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;}
  .pt-rules-tg .cv{transition:.2s;}
  .pt-rules-tg.open .cv{transform:rotate(180deg);}
  .pt-rules-scroll{max-height:240px;overflow-y:auto;margin-top:10px;padding:14px;background:#0e0607;border:1px solid rgba(255,255,255,.08);border-radius:13px;}
  .pt-cgroup{margin-bottom:14px;}
  .pt-cgroup-h{font-size:12.5px;font-weight:800;color:#F5B301;margin-bottom:6px;}
  .pt-cline{font-size:11.5px;color:#C9B4B2;line-height:1.55;margin:0 0 6px;display:flex;gap:7px;}
  .pt-cnum{color:#FF8A95;font-weight:700;font-family:'JetBrains Mono',monospace;flex-shrink:0;}
  .pt-cdot{color:#FF8A95;flex-shrink:0;}
  .pt-agree{display:flex;align-items:flex-start;gap:10px;margin:14px 0;font-size:13px;color:#E7CFCE;line-height:1.5;cursor:pointer;}
  .pt-agree input{width:19px;height:19px;margin-top:1px;accent-color:#FF3B4E;flex-shrink:0;}
  .pt-wait{text-align:center;padding:30px 22px 34px;}
  .pt-cd{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:44px;color:#fff;letter-spacing:1.5px;margin:12px 0;}
  .pt-spin{display:inline-block;font-size:42px;animation:ptspin 1.4s linear infinite;}
  @keyframes ptspin{to{transform:rotate(360deg);}}
  .pt-step{display:flex;align-items:center;gap:8px;justify-content:center;margin-bottom:6px;font-size:12px;color:#8f7a79;}
  .pt-step b{color:#F5B301;}
  .pt-foot{text-align:center;font-size:11px;color:#6f5c5b;margin-top:16px;max-width:480px;line-height:1.6;}
  .pt-link{background:none;border:0;color:#FF8A95;font-size:13px;cursor:pointer;text-decoration:underline;font-family:inherit;padding:0;}
  .pt-reels-wrap{width:100%;max-width:480px;margin-top:20px;}
  .pt-reels-t{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:15px;margin:0 2px 11px;letter-spacing:.3px;}
  .pt-reels{display:flex;gap:12px;overflow-x:auto;padding:2px 2px 10px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;}
  .pt-reels::-webkit-scrollbar{height:6px;}
  .pt-reels::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:999px;}
  .pt-reel{flex:0 0 auto;width:180px;scroll-snap-align:start;border-radius:16px;overflow:hidden;position:relative;
      border:1px solid rgba(255,255,255,.1);background:#000;box-shadow:0 10px 26px rgba(0,0,0,.5);}
  .pt-reel video{width:180px;height:320px;object-fit:cover;display:block;background:#000;}
  .pt-reel-cap{position:absolute;left:0;right:0;bottom:0;padding:18px 10px 9px;font-size:12px;font-weight:600;color:#fff;
      background:linear-gradient(transparent,rgba(0,0,0,.8));pointer-events:none;}
`;

function portalFmtLeft(ms) {
  if (ms <= 0) return "00:00:00";
  const s = Math.floor(ms / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${ss}`;
}

function PortalPage() {
  useGoogleFonts();
  const [tab, setTab] = useState("login");         // login | register
  const [screen, setScreen] = useState("auth");    // auth | pay | wait
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  // ortaq sahələr
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  // qeydiyyat
  const [agree, setAgree] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  // ödəniş
  const [plan, setPlan] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [receiptName, setReceiptName] = useState("");
  const receiptRef = useRef(null);

  // gözləmə / hazır
  const [reqId, setReqId] = useState("");
  const [info, setInfo] = useState(null);
  const [ready, setReady] = useState(null);        // {slug, phone, pin}
  const [now, setNow] = useState(Date.now());
  const [vids, setVids] = useState([]);

  useEffect(() => {
    document.title = "Hesab girişi — SkyFlix";
    (async () => { try { const { data } = await supabase.rpc("list_login_videos"); if (Array.isArray(data)) setVids(data); } catch {} })();
  }, []);

  const onPin = (v) => setPin(v.replace(/\D/g, "").slice(0, 4));
  const total = plan !== null ? DLV_PLANS[plan].amount + DLV_SPEEDS[speed].extra : null;

  // gözləmə ekranı: status poll + saniyə sayğacı
  useEffect(() => {
    if (screen !== "wait" || !reqId) return;
    let stop = false;
    const load = async () => {
      try { const { data } = await supabase.rpc("delivery_status", { p_id: reqId }); if (!stop && data) setInfo(data); } catch {}
    };
    load();
    const poll = setInterval(load, 5000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => { stop = true; clearInterval(poll); clearInterval(tick); };
  }, [screen, reqId]);

  function pickReceipt(e) {
    const f = e.target.files && e.target.files[0];
    receiptRef.current = f || null;
    setReceiptName(f ? f.name : "");
  }

  // GİRİŞ: nömrə + PIN → portal_lookup
  async function doLogin() {
    if (busy) return;
    const ph = skyNormPhone(phone);
    if (ph.length < 9) { setErr("Nömrəni düzgün daxil edin."); return; }
    if (!/^\d{4}$/.test(pin)) { setErr("PIN 4 rəqəm olmalıdır."); return; }
    setErr(""); setBusy(true);
    try {
      const { data } = await supabase.rpc("portal_lookup", { p_phone: ph, p_pin: pin });
      setBusy(false);
      if (data?.status === "ready") { setReady({ slug: data.slug, phone: data.phone || ph, pin: data.pin || pin }); setScreen("wait"); setInfo({ ready: true, _login: true }); }
      else if (data?.status === "pending") { setReqId(data.id); setInfo(null); setScreen("wait"); }
      else if (data?.status === "rejected") { setErr("Ödənişiniz təsdiqlənmədi. Zəhmət olmasa bizimlə əlaqə saxlayın."); }
      else { setErr("Nömrə və ya PIN yanlışdır. Yeni müştərisinizsə Qeydiyyatdan keçin."); }
    } catch { setBusy(false); setErr("Bağlantı xətası. Bir daha cəhd edin."); }
  }

  // QEYDİYYAT → ödəniş ekranına keç
  async function doRegister() {
    const ph = skyNormPhone(phone);
    if (ph.length < 9) { setErr("Nömrəni düzgün daxil edin."); return; }
    if (!/^\d{4}$/.test(pin)) { setErr("4 rəqəmli PIN təyin edin."); return; }
    if (!agree) { setErr("Davam etmək üçün istifadəçi şərtlərini qəbul edin."); return; }
    setErr("");
    try { await supabase.rpc("accept_contract", { p_phone: ph, p_name: "", p_version: CONTRACT_VERSION }); } catch {}
    setScreen("pay");
  }

  // ÖDƏNİŞ → qəbz yüklə + sorğu yarat → gözləmə
  async function submitPay() {
    const ph = skyNormPhone(phone);
    if (plan === null || !receiptName || busy) return;
    setErr(""); setBusy(true);
    let receiptUrl = "";
    try {
      const f = receiptRef.current;
      const path = ph + "-" + Date.now() + "-" + (f.name || "qebz").replace(/[^\w.\-]/g, "_");
      const up = await supabase.storage.from("receipts").upload(path, f, { upsert: false });
      if (up.error) throw up.error;
      receiptUrl = supabase.storage.from("receipts").getPublicUrl(path).data?.publicUrl || "";
    } catch { setBusy(false); setErr("Qəbz yüklənmədi. İnternetinizi yoxlayıb bir daha cəhd edin."); return; }
    try {
      const { data } = await supabase.rpc("create_delivery_request", {
        p_phone: ph, p_months: DLV_PLANS[plan].months, p_amount: total,
        p_speed_label: DLV_SPEEDS[speed].label, p_speed_hours: DLV_SPEEDS[speed].hours,
        p_receipt_url: receiptUrl, p_pin: pin,
      });
      setBusy(false);
      if (data?.status === "ok" && data.id) { setReqId(data.id); setInfo(null); setScreen("wait"); }
      else setErr("Sorğu yaradılmadı. Bir daha cəhd edin.");
    } catch { setBusy(false); setErr("Bağlantı xətası. Bir daha cəhd edin."); }
  }

  /* ---------- EKRAN: GÖZLƏMƏ / HAZIR ---------- */
  function renderWait() {
    // login "ready" halı
    const deliveredLogin = ready && (!info || info._login);
    let cabLink = null, body;

    if (deliveredLogin) {
      cabLink = `${SKY_SITE_URL}/?nf=${encodeURIComponent(ready.phone)}&pin=${encodeURIComponent(ready.pin)}#h-${ready.slug}`;
    }

    if (!info && !deliveredLogin) {
      body = <div className="pt-wait"><span className="pt-spin">⏳</span><p style={{ color: "#A98D8B", marginTop: 12 }}>Yüklənir...</p></div>;
    } else if (info && info.status === "notfound") {
      body = <div className="pt-wait"><div style={{ fontSize: 40 }}>❓</div><h2 style={{ fontFamily: "Space Grotesk" }}>Sorğu tapılmadı</h2><p style={{ color: "#A98D8B" }}>Yenidən cəhd edin.</p></div>;
    } else if (info && info.status === "rejected") {
      body = <div className="pt-wait"><div style={{ fontSize: 40 }}>⛔</div><h2 style={{ fontFamily: "Space Grotesk" }}>Ödəniş təsdiqlənmədi</h2><p style={{ color: "#A98D8B", lineHeight: 1.6 }}>Qəbz təsdiqlənmədi. Zəhmət olmasa bizimlə əlaqə saxlayın.</p></div>;
    } else {
      const deliverAt = info && info.deliver_at ? new Date(info.deliver_at).getTime() : 0;
      const left = deliverAt - now;
      const timeUp = deliverAt ? left <= 0 : true;
      const delivered = deliveredLogin || (info && info.ready && timeUp);
      if (delivered) {
        const link = cabLink || `${SKY_SITE_URL}/?nf=${encodeURIComponent(info.phone)}&pin=${encodeURIComponent(info.pin)}#h-${info.slug}`;
        body = (
          <div className="pt-wait">
            <div style={{ fontSize: 46 }}>✅</div>
            <h2 style={{ fontFamily: "Space Grotesk", margin: "0 0 6px" }}>Hesabınız hazırdır!</h2>
            <p style={{ color: "#A98D8B", lineHeight: 1.6, margin: "0 0 16px" }}>
              Hesab məlumatlarını görmək üçün müştəri kabinetinizə keçin. Kabinetdə yeni istifadəçi şərtlərini qəbul etdikdən sonra Netflix mail/şifrəniz görünəcək.
            </p>
            <a className="pt-btn gold" style={{ textDecoration: "none" }} href={link}>Müştəri kabinetinə keç →</a>
            <p className="pt-hint" style={{ marginTop: 14 }}>
              Qeyd: kabinetə giriş üçün nömrəniz və PIN kodunuz yalnız müştəri kabineti üçündür — Netflixə giriş üçün deyil.
            </p>
          </div>
        );
      } else {
        body = (
          <div className="pt-wait">
            <span className="pt-spin">⏳</span>
            <h2 style={{ fontFamily: "Space Grotesk", margin: "10px 0 4px" }}>Hesabınız hazırlanır</h2>
            {info && info.speed_label && <div className="pt-step">Çatdırılma: <b>{info.speed_label}</b></div>}
            <div className="pt-cd">{portalFmtLeft(left)}</div>
            <p style={{ color: "#A98D8B", fontSize: 12.5, lineHeight: 1.6 }}>
              Vaxt bitdikdə hesabınız bu ekranda avtomatik görünəcək. İstəsəniz bu səhifəni bağlaya bilərsiniz —
              istənilən vaxt <b style={{ color: "#F5B301" }}>#hesabgiris</b> bölməsindən nömrə və PIN ilə yenidən daxil olub vəziyyətinizi yoxlaya bilərsiniz.
            </p>
            {info && info.deliver_at && timeUp && !info.ready && <p style={{ color: "#F5B301", fontSize: 12.5, marginTop: 8 }}>Ödənişiniz son yoxlamadadır, tezliklə hazır olacaq...</p>}
          </div>
        );
      }
    }
    return (
      <div className="pt-card">
        {body}
        <div style={{ padding: "0 18px 18px", textAlign: "center" }}>
          <button className="pt-link" onClick={() => { setScreen("auth"); setInfo(null); setReady(null); setReqId(""); }}>← Girişə qayıt</button>
        </div>
      </div>
    );
  }

  /* ---------- EKRAN: ÖDƏNİŞ ---------- */
  function renderPay() {
    const canPay = plan !== null && !!receiptName && !busy;
    return (
      <div className="pt-card">
        <div className="pt-body">
          <div className="pt-step" style={{ justifyContent: "flex-start", marginBottom: 14 }}>
            <button className="pt-link" onClick={() => setScreen("auth")}>← Geri</button>
            <span style={{ marginLeft: "auto", color: "#F5B301" }}>Qeydiyyat tamamlandı ✓</span>
          </div>
          <h2 style={{ fontFamily: "Space Grotesk", margin: "0 0 4px", fontSize: 20 }}>Abunəlik ödənişi</h2>
          <p style={{ color: "#A98D8B", fontSize: 13, margin: "0 0 4px" }}>Nömrə: <b style={{ color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>+{skyNormPhone(phone)}</b></p>

          <div className="pt-sec-t">1 · Abunəlik müddəti</div>
          {DLV_PLANS.map((p, i) => (
            <button key={i} className={`pt-opt ${p.best ? "best" : ""} ${plan === i ? "on" : ""}`} onClick={() => setPlan(i)}>
              <span className="pt-opt-l">{p.label}{p.best && <span className="pt-badge">ƏN SƏRFƏLİ</span>}</span>
              <span className="pt-opt-p">{p.amount.toFixed(2)} ₼</span>
            </button>
          ))}

          <div className="pt-sec-t">2 · Çatdırılma müddəti</div>
          {DLV_SPEEDS.map((s, i) => (
            <button key={i} className={`pt-opt ${speed === i ? "on" : ""}`} onClick={() => setSpeed(i)}>
              <span><span className="pt-opt-l">{s.label}</span><span className="pt-opt-sub">{s.sub}</span></span>
              {s.free ? <span className="pt-free">PULSUZ</span> : <span className="pt-opt-p">+{s.extra.toFixed(2)} ₼</span>}
            </button>
          ))}

          <div className="pt-sec-t">3 · Ödəniş</div>
          <div className="pt-pcard">
            <div className="pt-prow"><span>Ad</span><b>{PAY_CARD_NAME}</b></div>
            <div className="pt-prow"><span>Bank</span><b>{PAY_CARD_BANK}</b></div>
            <div className="pt-prow"><span>Kart</span><b style={{ letterSpacing: 1 }}>{formatCardNumber(PAY_CARD_NUMBER)}</b></div>
          </div>
          <label className={`pt-upl ${receiptName ? "has" : ""}`}>
            <Upload size={15} /> {receiptName ? "✓ " + receiptName : "Ödəniş qəbzini yüklə (MƏCBURİ)"}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={pickReceipt} />
          </label>
          <div className="pt-warn">⚠️ Saxta qəbz yükləmək və ya dələduzluq cəhdi aşkarlanarsa, qanunvericiliyə əsasən barənizdə cinayət işi başlana bilər. Yalnız real qəbzi yükləyin.</div>

          <div className="pt-total"><span style={{ fontSize: 13, color: "#A98D8B" }}>Ödəniləcək məbləğ</span><span className="pt-total-v">{total !== null ? total.toFixed(2) + " ₼" : "—"}</span></div>
          {err && <div className="pt-err" style={{ marginTop: 10 }}>{err}</div>}
          <button className="pt-btn" style={{ marginTop: 12 }} disabled={!canPay} onClick={submitPay}>{busy ? "Göndərilir..." : "Ödəniş etdim"}</button>
        </div>
      </div>
    );
  }

  /* ---------- EKRAN: GİRİŞ / QEYDİYYAT ---------- */
  function renderAuth() {
    return (
      <div className="pt-card">
        <div className="pt-hero">
          <span className="pt-hero-badge">SKYFLIX PREMIUM</span>
          <img src={HEIST_IMG} alt="SkyFlix" loading="eager" />
          <div className="pt-hero-txt">
            <h1>{tab === "login" ? "Hesabınıza daxil olun" : "Qeydiyyatdan keçin"}</h1>
            <p>{tab === "login" ? "Nömrə və PIN ilə hesabınızın vəziyyətini görün" : "Nömrənizi yazın, PIN təyin edin — hesabınız sizə çatdırılsın"}</p>
          </div>
        </div>

        <div className="pt-tabs">
          <button className={`pt-tab ${tab === "login" ? "on" : ""}`} onClick={() => { setTab("login"); setErr(""); }}>Giriş</button>
          <button className={`pt-tab ${tab === "register" ? "on" : ""}`} onClick={() => { setTab("register"); setErr(""); }}>Qeydiyyat</button>
        </div>

        <div className="pt-body">
          {err && <div className="pt-err">{err}</div>}

          <div className="pt-field">
            <p className="pt-lbl">WhatsApp nömrəniz</p>
            <input className="pt-input" type="tel" inputMode="tel" placeholder="+994 __ ___ __ __" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="pt-field">
            <p className="pt-lbl">{tab === "login" ? "PIN kodunuz" : "4 rəqəmli PIN təyin edin"}</p>
            <input className="pt-input pt-pin" type="tel" inputMode="numeric" placeholder="••••" value={pin} onChange={(e) => onPin(e.target.value)} maxLength={4} />
            <p className="pt-hint">{tab === "login" ? "Hesabınıza keçid üçün yalnız bu PIN lazımdır." : "Bu PIN kabinetinizə girişiniz üçün istifadə olunacaq. Yadda saxlayın."}</p>
          </div>

          {tab === "register" && (
            <>
              <button className={`pt-rules-tg ${rulesOpen ? "open" : ""}`} onClick={() => setRulesOpen((v) => !v)}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}><FileText size={16} /> İstifadəçi şərtləri</span>
                <ChevronDown size={18} className="cv" />
              </button>
              {rulesOpen && (
                <div className="pt-rules-scroll">
                  {RULE_GROUPS_AZ.map((g, gi) => (
                    <div className="pt-cgroup" key={"o" + gi}>
                      <div className="pt-cgroup-h">{g.heading}</div>
                      {g.items.map((it, ii) => (<p className="pt-cline" key={ii}><span className="pt-cnum">{it.n}</span>{it.text}</p>))}
                    </div>
                  ))}
                  {CONTRACT_EXTRA_GROUPS.map((g, gi) => (
                    <div className="pt-cgroup" key={"n" + gi}>
                      <div className="pt-cgroup-h">{g.heading}</div>
                      {g.items.map((it, ii) => (<p className="pt-cline" key={ii}><span className="pt-cdot">•</span>{it}</p>))}
                    </div>
                  ))}
                </div>
              )}
              <label className="pt-agree">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>Xidmət şərtlərini qəbul edirəm.</span>
              </label>
            </>
          )}

          {tab === "login"
            ? <button className="pt-btn" disabled={busy} onClick={doLogin}>{busy ? "Yoxlanılır..." : "Daxil ol"}</button>
            : <button className="pt-btn" onClick={doRegister}>Davam et →</button>}
        </div>
      </div>
    );
  }

  /* ---------- Giriş səhifəsi video feed ---------- */
  function renderReels() {
    if (!vids.length) return null;
    return (
      <div className="pt-reels-wrap">
        <div className="pt-reels-t">🎬 Maraqlı videolar</div>
        <div className="pt-reels">
          {vids.map((v) => (
            <div className="pt-reel" key={v.id}>
              <video src={v.url} playsInline muted loop preload="metadata" controls
                onClick={(e) => { e.currentTarget.muted = !e.currentTarget.muted; e.currentTarget.play().catch(() => {}); }} />
              {v.title && <div className="pt-reel-cap">{v.title}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // HAZIR olduqda → birbaşa müştəri kabinetini portal içində göstər (keçid yoxdur)
  let cab = null;
  if (screen === "wait") {
    if (ready && (!info || info._login) && ready.slug) {
      cab = { slug: ready.slug, phone: ready.phone, pin: ready.pin };
    } else if (info && info.ready && info.slug && info.deliver_at && now >= new Date(info.deliver_at).getTime()) {
      cab = { slug: info.slug, phone: info.phone, pin: info.pin };
    }
  }
  if (cab && cab.slug) {
    return <SharedAccountPage key={"portalcab-" + cab.slug + cab.phone} slug={cab.slug} embedPhone={cab.phone} embedPin={cab.pin}
      onExit={() => { setScreen("auth"); setTab("login"); setReady(null); setInfo(null); setReqId(""); setPhone(""); setPin(""); setErr(""); }} />;
  }

  return (
    <div className="pt-root">
      <style>{PORTAL_CSS}</style>
      <div className="pt-top">
        <div className="pt-brand"><span className="ic">▶</span> SkyFlix Azerbaycan</div>
        <div className="pt-secure">🔒 Təhlükəsiz</div>
      </div>
      {screen === "auth" && renderAuth()}
      {screen === "auth" && renderReels()}
      {screen === "pay" && renderPay()}
      {screen === "wait" && renderWait()}
      <div className="pt-foot">
        Bu bölməni yadda saxlayın: <b>skyflixazerbaycan.com/#hesabgiris</b><br />
        İstənilən vaxt nömrə və PIN ilə daxil olub hesabınızın vəziyyətini və məlumatlarını görə bilərsiniz.
      </div>
    </div>
  );
}

// Hesab linki (#h-...) açılanda yalnız hesab səhifəsi göstərilir
function getSharedSlug() {
  const h = window.location.hash.replace("#", "");
  if (h === "abunelikidare" || window.location.pathname.replace(/\/+$/, "") === "/abunelikidare") return "__manager__";
  if (h === "siyahi" || window.location.pathname.replace(/\/+$/, "") === "/siyahi") return "__netflixlist__";
  if (h === "artir" || window.location.pathname.replace(/\/+$/, "") === "/artir") return "__listextend__";
  if (h === "hesabgiris" || window.location.pathname.replace(/\/+$/, "") === "/hesabgiris") return "__portal__";
  if (h === "al" || window.location.pathname.replace(/\/+$/, "") === "/al") return "__pay__";
  if (h.startsWith("teslim-")) return "__teslim__:" + h.slice(7);
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
  if (slug === "__netflixlist__") return <NetflixListPage />;
  if (slug === "__listextend__") return <ListExtendPage />;
  if (slug === "__portal__") return <PortalPage />;
  if (slug === "__pay__") return <PayLinkPage />;
  if (slug && slug.startsWith("__teslim__:")) return <DeliveryWaitPage key={slug} id={slug.slice(11)} />;
  if (slug) return <SharedAccountPage key={slug} slug={slug} />;
  return <MainApp />;
}
