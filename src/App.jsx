import React, { useEffect, useRef, useState } from "react";
import { Shield, Clock, MessageCircle, Ticket, ChevronRight, Star, Menu, X, User, ShoppingCart, Minus, Plus, Play, Pause, VolumeX } from "lucide-react";
import { supabase } from "./supabaseClient";

const CATEGORIES = [
  { id: "all", labelKey: "catAll" },
  { id: "streaming", labelKey: "catStreaming" },
  { id: "music", labelKey: "catMusic" },
  { id: "ai", labelKey: "catAi" },
];

const NAV_ITEMS = [
  { key: "home", labelKey: "navHome" },
  { key: "paketler", labelKey: "navPackages" },
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

    navHome: "Ana səhifə",
    navPackages: "Paketlər",
    navHow: "Necə işləyir",
    navTrust: "Etibarlılıq",
    navRules: "Qaydalar",
    navContact: "Əlaqə",

    rulesIntro: "SkyFlix Azerbaycan olaraq bütün müştərilərimiz üçün eyni şəkildə tətbiq olunan qaydalar aşağıda qeyd edilib.",
  },
  en: {
    eyebrow: "Delivered in the shortest time",
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

    navHome: "Home",
    navPackages: "Packages",
    navHow: "How it works",
    navTrust: "Trust",
    navRules: "Rules",
    navContact: "Contact",

    rulesIntro: "The rules below apply equally to all SkyFlix Azerbaycan customers. Full details are currently available in Azerbaijani.",
  },
  ka: {
    eyebrow: "მიწოდება უმოკლეს დროში",
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

    navHome: "მთავარი",
    navPackages: "პაკეტები",
    navHow: "როგორ მუშაობს",
    navTrust: "სანდოობა",
    navRules: "წესები",
    navContact: "კონტაქტი",

    rulesIntro: "ქვემოთ მოცემული წესები თანაბრად ვრცელდება SkyFlix Azerbaycan-ის ყველა მომხმარებელზე.",
  },
  ru: {
    eyebrow: "Доставка в кратчайшие сроки",
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

    navHome: "Главная",
    navPackages: "Пакеты",
    navHow: "Как это работает",
    navTrust: "Надёжность",
    navRules: "Правила",
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
    setLoaded(true);
  }

  useEffect(() => {
    reload();
  }, []);

  return { products, settings, reload, loaded };
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

function TicketCard({ p, onAdd, t }) {
  return (
    <div className="ab-ticket">
      {p.image_url && <div className="ab-ticket-img" style={{ backgroundImage: `url(${p.image_url})` }} />}
      <div className="ab-ticket-top">
        <div>
          <div className="ab-ticket-eyebrow">ABUNƏLİK</div>
          <div className="ab-ticket-name">{p.name}</div>
          <div className="ab-ticket-plan">{p.plan}</div>
        </div>
        <Ticket size={20} strokeWidth={1.75} className="ab-ticket-icon" />
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
          <span className="ab-price-per">/{p.period}</span>
        </div>
      </div>
      {onAdd && (
        <button className="ab-ticket-addbtn" onClick={() => onAdd(p)}>
          <ShoppingCart size={15} /> {t("addToCart")}
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
                  <Ticket size={24} strokeWidth={1.75} />
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

function HomePage({ go, products, onAdd, lang, t }) {
  return (
    <>
      <div className="ab-screen">
        <div className="ab-screen-blob b1" />
        <div className="ab-screen-blob b2" />
        <div className="ab-screen-sweep" />
        <div className="ab-screen-grain" />
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

      <section className="ab-section" style={{ paddingTop: 60 }}>
        <PageHead kicker={t("popularKicker")} title={t("popularTitle")} sub={t("popularSub")} />
        <div className="ab-grid">
          {products.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <TicketCard p={p} onAdd={onAdd} t={t} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <button className="ab-btn ab-btn-ghost" style={{ marginTop: 30 }} onClick={() => go("paketler")}>
            {t("seeAllPackages")} <ChevronRight size={15} />
          </button>
        </Reveal>
      </section>

      <CtaBanner go={go} t={t} />
    </>
  );
}

function PaketlerPage({ products, onAdd, t }) {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker={t("packagesKicker")} title={t("packagesTitle")} sub={t("packagesSub")} />
      <Reveal className="ab-cat-pills">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`ab-pill ${cat === c.id ? "active" : ""}`}
            onClick={() => setCat(c.id)}
          >
            {t(c.labelKey)}
          </button>
        ))}
      </Reveal>
      <div className="ab-grid">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <TicketCard p={p} onAdd={onAdd} t={t} />
          </Reveal>
        ))}
        {filtered.length === 0 && <p style={{ color: "var(--muted)" }}>{t("noProductsInCategory")}</p>}
      </div>
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

function SebetPage({ cart, updateQty, removeFromCart, settings, t }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.qty, 0);

  const rawNumber = settings.contact_whatsapp || "517873090";
  const digits = rawNumber.replace(/[^0-9]/g, "");
  const lines = cart.map(
    (item) => `- ${item.name} x${item.qty} — ${(parseFloat(item.price) * item.qty).toFixed(2)} ₼`
  );
  const message = `Salam! Sifariş etmək istəyirəm:\n${lines.join("\n")}\n\nCəmi: ${total.toFixed(2)} ₼`;
  const waLink = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

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

      <div className="ab-cart-list">
        {cart.map((item) => (
          <div className="ab-cart-row" key={item.id}>
            <div className="ab-cart-info">
              <div className="ab-cart-name">{item.name}</div>
              <div className="ab-cart-unit">
                {item.price} ₼ /{item.period}
              </div>
            </div>
            <div className="ab-cart-qty">
              <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Azalt">
                <Minus size={13} />
              </button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Artır">
                <Plus size={13} />
              </button>
            </div>
            <div className="ab-cart-linetotal">{(parseFloat(item.price) * item.qty).toFixed(2)} ₼</div>
            <button className="ab-cart-remove" onClick={() => removeFromCart(item.id)} aria-label="Sil">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="ab-cart-summary">
        <div className="ab-cart-total-row">
          <span>{t("cartTotal")}</span>
          <span className="ab-cart-total">{total.toFixed(2)} ₼</span>
        </div>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={() => { supabase.from("orders").insert({ user_id: session?.user?.id || null, customer_email: session?.user?.email || null, items: cart, total: total }).then(() => {}); }}>
          <MessageCircle size={16} /> {t("completeOrder")}
        </a>
      </div>
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

function CustomerAuthPage({ t, lang }) {
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

function VideoWidget({ videoId }) {
  const wrapperRef = useRef(null);
  const playerRef = useRef(null);
  const unmutedRef = useRef(false);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const target = document.createElement("div");
    wrapperRef.current.appendChild(target);

    function createPlayer() {
      playerRef.current = new window.YT.Player(target, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
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

    function unmuteOnInteract() {
      if (unmutedRef.current) return;
      const p = playerRef.current;
      if (p && p.unMute) {
        p.unMute();
        p.playVideo();
        unmutedRef.current = true;
      }
    }
    window.addEventListener("click", unmuteOnInteract);
    window.addEventListener("touchstart", unmuteOnInteract);
    window.addEventListener("keydown", unmuteOnInteract);
    window.addEventListener("scroll", unmuteOnInteract, { passive: true });

    return () => {
      window.removeEventListener("click", unmuteOnInteract);
      window.removeEventListener("touchstart", unmuteOnInteract);
      window.removeEventListener("keydown", unmuteOnInteract);
      window.removeEventListener("scroll", unmuteOnInteract);
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
      if (wrapperRef.current && target.parentNode === wrapperRef.current) {
        wrapperRef.current.removeChild(target);
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
  });
  const [status, setStatus] = useState("");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

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

  async function saveProduct(p) {
    flash("Yadda saxlanılır...");
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
      })
      .eq("id", p.id);
    flash(error ? "Xəta baş verdi." : "Yadda saxlanıldı ✓");
    if (!error) onDataChanged();
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
    const { data, error } = await supabase
      .from("products")
      .insert({ ...newProduct, sort_order: products.length + 1 })
      .select();
    if (!error && data) {
      setProducts((prev) => [...prev, ...data]);
      setNewProduct({ name: "", plan: "", price: "", period: "AY", code: "", category: "streaming" });
      flash("Məhsul əlavə olundu ✓");
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
          <div className="ad-product-row" key={p.id}>
            <input value={p.name} onChange={(e) => updateField(p.id, "name", e.target.value)} placeholder="Ad" />
            <input value={p.plan} onChange={(e) => updateField(p.id, "plan", e.target.value)} placeholder="Plan" />
            <input value={p.price} onChange={(e) => updateField(p.id, "price", e.target.value)} placeholder="Qiymət" />
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
              <option value="streaming">Streaming</option>
              <option value="music">Musiqi</option>
              <option value="ai">AI Alətləri</option>
            </select>
            <button className="ab-btn ab-btn-ghost" onClick={() => saveProduct(p)}>
              Saxla
            </button>
            <button className="ad-delete" onClick={() => deleteProduct(p.id)}>
              Sil
            </button>
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
          <option value="streaming">Streaming</option>
          <option value="music">Musiqi</option>
          <option value="ai">AI Alətləri</option>
        </select>
        <button className="ab-btn ab-btn-gold" onClick={addProduct}>
          Əlavə et
        </button>
      </div>

      <h3 className="ad-section-title">Müştərilər ({customers.length})</h3>
      <div className="ad-products">
        {customers.map((c) => (
          <div className="ad-customer-row" key={c.id}>
            <span className="ad-customer-email">{c.email}</span>
            <span className="ad-customer-name">{c.full_name || "—"}</span>
            <span className="ad-customer-date">{new Date(c.created_at).toLocaleDateString("az-AZ")}</span>
          </div>
        ))}
        {customers.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Hələ qeydiyyatdan keçən yoxdur.</p>}
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
    </section>
  );
}

export default function App() {
  useGoogleFonts();
  const [page, go] = useHashRoute();
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const LANG_NAMES = { az: "AZ", en: "EN", ka: "GE", ru: "RU" };
  const { products, settings, reload, loaded } = useAppData();

  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => listener.subscription.unsubscribe();
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
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, period: product.period, qty: 1 }];
    });
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (key) => {
    go(key);
    setMenuOpen(false);
  };

  return (
    <div className="ab-root">
      <VideoWidget videoId="jhgJV0Pg54Y" />
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
        *{box-sizing:border-box;}
        .ab-root{
          background:var(--bg);
          color:var(--text);
          font-family:'Inter',sans-serif;
          min-height:100vh;
          overflow-x:hidden;
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

        .ab-nav{
          position:sticky; top:0; z-index:40;
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 6vw;
          transition:background .25s ease, border-color .25s ease, backdrop-filter .25s ease;
          border-bottom:1px solid transparent;
        }
        .ab-nav.solid{
          background:rgba(255,255,255,0.85);
          backdrop-filter:blur(10px);
          border-bottom:1px solid var(--line);
        }
        .ab-brand{ display:flex; align-items:center; gap:9px; font-weight:700; font-size:19px; background:none; border:none; color:inherit; cursor:pointer; padding:0; font-family:'Space Grotesk',sans-serif; }
        .ab-brand-mark{
          width:26px;height:26px;border-radius:7px;
          background:linear-gradient(135deg,var(--gold),var(--teal));
          display:flex;align-items:center;justify-content:center;
          transform:rotate(-8deg);
          flex-shrink:0;
        }
        .ab-navlinks{ display:none; gap:6px; }
        @media(min-width:800px){ .ab-navlinks{ display:flex; } }
        .ab-navlink{
          background:none; border:none; cursor:pointer;
          font-family:'Inter',sans-serif; font-size:14.5px; color:var(--muted);
          padding:8px 13px; border-radius:8px; transition:color .2s ease, background .2s ease;
        }
        .ab-navlink:hover{ color:var(--text); }
        .ab-navlink.active{ color:var(--text); background:var(--surface2); }

        .ab-navright{ display:flex; align-items:center; gap:10px; }
        .ab-menubtn{ display:flex; background:none; border:1px solid var(--line); border-radius:8px; padding:8px; color:var(--text); cursor:pointer; }
        @media(min-width:800px){ .ab-menubtn{ display:none; } }
        .ab-accountbtn{ display:flex; background:none; border:1px solid var(--line); border-radius:8px; padding:8px; color:var(--text); cursor:pointer; }
        .ab-accountbtn:hover{ border-color:var(--muted); }
        .ab-langbtn{
          display:flex; align-items:center; justify-content:center;
          background:none; border:1px solid var(--line); border-radius:8px;
          padding:8px 10px; color:var(--text); cursor:pointer;
          font-family:'JetBrains Mono',monospace; font-size:12.5px; font-weight:700;
        }
        .ab-langbtn:hover{ border-color:var(--gold); color:var(--gold); }
        .ab-langwrap{ position:relative; }
        .ab-langmenu{
          position:absolute; top:calc(100% + 6px); right:0; z-index:50;
          background:var(--bg); border:1px solid var(--line); border-radius:10px;
          box-shadow:0 12px 28px -10px rgba(0,0,0,0.25); overflow:hidden; min-width:64px;
        }
        .ab-langoption{
          display:block; width:100%; padding:9px 14px; background:none; border:none; cursor:pointer;
          font-family:'JetBrains Mono',monospace; font-size:12.5px; font-weight:600; color:var(--muted); text-align:left;
        }
        .ab-langoption:hover{ background:var(--surface2); color:var(--text); }
        .ab-langoption.active{ color:var(--gold); }
        .ab-mobile-langrow{ display:flex; gap:8px; margin-top:20px; }
        .ab-mobile-langrow .ab-pill{ flex:1; text-align:center; }

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
        }

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
        .ab-cart-total-row{ display:flex; justify-content:space-between; align-items:center; font-size:16px; font-weight:600; font-family:'Space Grotesk',sans-serif; }
        .ab-cart-total{ font-family:'JetBrains Mono',monospace; color:var(--gold); font-size:22px; }

        .ab-mobilemenu{
          position:fixed; inset:0; z-index:50;
          background:rgba(255,255,255,0.97);
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
          transition:transform .15s ease, background .2s ease, border-color .2s ease;
        }
        .ab-btn:focus-visible{ outline:2px solid var(--teal); outline-offset:2px; }
        .ab-btn-gold{ background:var(--gold); color:#FFFFFF; }
        .ab-btn-gold:hover{ transform:translateY(-1px); }
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

        .ab-section{ padding:90px 6vw; }
        .ab-section-head{ margin-bottom:44px; max-width:60ch; }
        .ab-kicker{ font-family:'JetBrains Mono',monospace; font-size:12.5px; color:var(--gold); letter-spacing:.08em; margin-bottom:10px; }
        .ab-h2{ font-size:clamp(24px,3.4vw,34px); font-weight:700; margin:0 0 12px; }
        .ab-section-sub{ color:var(--muted); font-size:15.5px; line-height:1.6; }

        .ab-cat-pills{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:32px; }
        .ab-pill{
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
        }
        .ab-ticket:hover{ border-color:rgba(225,18,42,0.45); transform:translateY(-3px); box-shadow:0 16px 30px -18px rgba(26,18,16,0.35); }

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
        .ad-customer-email{ font-weight:600; color:var(--text); }
        .ad-customer-name{ color:var(--muted); }
        .ad-customer-date{ color:var(--muted); font-family:'JetBrains Mono',monospace; font-size:12px; margin-left:auto; }

        .ad-order-row{
          border:1px solid var(--line); border-radius:12px; padding:14px 16px; background:var(--surface);
        }
        .ad-order-head{ display:flex; flex-wrap:wrap; gap:14px; align-items:center; font-size:13.5px; }
        .ad-order-total{ font-family:'JetBrains Mono',monospace; color:var(--gold); font-weight:700; }
        .ad-order-items{ display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
        .ad-order-item{
          background:var(--surface2); border-radius:100px; padding:5px 12px; font-size:12px; color:var(--text);
        }

        .ab-agree-row{ display:flex; align-items:flex-start; gap:9px; font-size:13px; color:var(--muted); cursor:pointer; }
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

      <nav className={`ab-nav ${navSolid ? "solid" : ""}`}>
        <button className="ab-brand" onClick={() => navigate("home")}>
          <span className="ab-brand-mark">
            <Ticket size={14} color="#FFFFFF" strokeWidth={2.4} />
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
                <Ticket size={14} color="#FFFFFF" strokeWidth={2.4} />
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
        </div>
      )}

      <main className="ab-page" key={page}>
        {page === "home" && <HomePage go={go} products={products} onAdd={addToCart} lang={lang} t={t} />}
        {page === "paketler" && <PaketlerPage products={products} onAdd={addToCart} t={t} />}
        {page === "necehisleyir" && <NeceIsleyirPage t={t} />}
        {page === "etibar" && <EtibarPage t={t} />}
        {page === "qaydalar" && <QaydalarPage t={t} lang={lang} />}
        {page === "elaqe" && <ElaqePage settings={settings} t={t} />}
        {page === "admin" && <AdminPage onDataChanged={reload} />}
        {page === "hesab" && <CustomerAuthPage t={t} lang={lang} />}
        {page === "sebet" && (
          <SebetPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} settings={settings} t={t} />
        )}
      </main>

      <footer className="ab-footer">
        <button className="ab-brand" style={{ fontSize: 15 }} onClick={() => navigate("home")}>
          <span className="ab-brand-mark" style={{ width: 20, height: 20 }}>
            <Ticket size={11} color="#FFFFFF" strokeWidth={2.4} />
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
