import React, { useEffect, useRef, useState } from "react";
import { Shield, Clock, MessageCircle, Ticket, ChevronRight, Star, Menu, X, User, ShoppingCart, Minus, Plus, Play, Pause, VolumeX } from "lucide-react";
import { supabase } from "./supabaseClient";

const CATEGORIES = [
  { id: "all", label: "Hamısı" },
  { id: "streaming", label: "Streaming" },
  { id: "music", label: "Musiqi" },
  { id: "ai", label: "AI Alətləri" },
];

const STEPS = [
  { n: "01", title: "Seç", text: "İstədiyin platforma və paketi seç." },
  { n: "02", title: "Ödə", text: "Kart və ya Kapital Bank/M10 ilə ödəniş et." },
  { n: "03", title: "Al", text: "5 dəqiqə ərzində hesab detalların çatır." },
];

const NAV_ITEMS = [
  { key: "home", label: "Ana səhifə" },
  { key: "paketler", label: "Paketlər" },
  { key: "necehisleyir", label: "Necə işləyir" },
  { key: "etibar", label: "Etibarlılıq" },
  { key: "elaqe", label: "Əlaqə" },
];

const ALL_PAGES = [...NAV_ITEMS.map((n) => n.key), "admin", "hesab", "sebet"];

const ADMIN_EMAIL = "skyflixazerbaycan@gmail.com";

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

function TicketCard({ p, onAdd }) {
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
          <ShoppingCart size={15} /> Səbətə əlavə et
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

function HomePage({ go, products, onAdd }) {
  return (
    <>
      <div className="ab-screen">
        <div className="ab-screen-blob b1" />
        <div className="ab-screen-blob b2" />
        <div className="ab-screen-sweep" />
        <div className="ab-screen-grain" />
        <div className="ab-hero">
          <div>
            <div className="ab-eyebrow">
              <span className="dot" /> 5 dəqiqəyə təhvil
            </div>
            <h1 className="ab-h1">
              Bir bilet.<br />Bütün <em>ekranlar</em>.
            </h1>
            <p className="ab-sub">
              Netflix, Spotify, YouTube Premium və daha çoxu — orijinal qiymətin bir hissəsinə,
              rəsmi hesablarla, dəqiqələr içində sənin.
            </p>
            <div className="ab-hero-ctas">
              <button className="ab-btn ab-btn-onscreen" onClick={() => go("paketler")}>
                Paketlərə bax
              </button>
              <button className="ab-btn ab-btn-onscreen-ghost" onClick={() => go("elaqe")}>
                <MessageCircle size={16} /> WhatsApp ilə yaz
              </button>
            </div>
            <div className="ab-trustrow">
              <span><Shield size={14} /> Zəmanətli hesablar</span>
              <span><Clock size={14} /> 7/24 dəstək</span>
              <span><Star size={14} /> 1200+ məmnun müştəri</span>
            </div>
          </div>

          <HeroSlideshow products={products} />
        </div>
      </div>

      <section className="ab-section" style={{ paddingTop: 60 }}>
        <PageHead kicker="POPULYAR" title="Ən çox seçilən paketlər" sub="Tam siyahı üçün Paketlər səhifəsinə keç." />
        <div className="ab-grid">
          {products.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <TicketCard p={p} onAdd={onAdd} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <button className="ab-btn ab-btn-ghost" style={{ marginTop: 30 }} onClick={() => go("paketler")}>
            Bütün paketlərə bax <ChevronRight size={15} />
          </button>
        </Reveal>
      </section>

      <CtaBanner go={go} />
    </>
  );
}

function PaketlerPage({ products, onAdd }) {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <section className="ab-section ab-page-pad">
      <PageHead
        kicker="PAKETLƏR"
        title="Populyar abunəliklər"
        sub="Hər bilet bir hesaba giriş deməkdir — seç, ödə, izləməyə başla."
      />
      <Reveal className="ab-cat-pills">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`ab-pill ${cat === c.id ? "active" : ""}`}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </Reveal>
      <div className="ab-grid">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <TicketCard p={p} onAdd={onAdd} />
          </Reveal>
        ))}
        {filtered.length === 0 && <p style={{ color: "var(--muted)" }}>Bu kateqoriyada hələ paket yoxdur.</p>}
      </div>
    </section>
  );
}

function NeceIsleyirPage() {
  return (
    <section className="ab-section ab-page-pad">
      <PageHead
        kicker="NECƏ İŞLƏYİR"
        title="Üç addımda hesabın hazırdır"
        sub="Sifarişdən təhvilə qədər bütün proses sadə və sürətlidir."
      />
      <div className="ab-steps">
        {STEPS.map((s, i) => (
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

function EtibarPage() {
  const items = [
    { icon: Shield, title: "Zəmanət daxildir", text: "Hər hesaba fəaliyyət müddəti ərzində əvəzetmə zəmanəti verilir." },
    { icon: Clock, title: "Sürətli təhvil", text: "Ödəniş təsdiqindən sonra hesab məlumatları adətən 24 saat ərzində çatır." },
    { icon: MessageCircle, title: "Canlı dəstək", text: "Sualların olarsa WhatsApp üzərindən həftənin 7 günü cavab veririk." },
  ];
  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker="ETİBARLILIQ" title="Niyə SkyFlix Azerbaycan?" />
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

function ElaqePage({ settings }) {
  const rawNumber = settings.contact_whatsapp || "517873090";
  const digits = rawNumber.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${digits}`;

  return (
    <section className="ab-section ab-page-pad">
      <PageHead
        kicker="ƏLAQƏ"
        title="Sifariş üçün yaz"
        sub="WhatsApp üzərindən yaz — cavab adətən bir neçə dəqiqə çəkir."
      />
      <div className="ab-contact-grid">
        <Reveal>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="ab-contact-card">
            <MessageCircle size={22} strokeWidth={1.75} />
            <div>
              <h4>WhatsApp</h4>
              <p>Sifariş və dəstək üçün birbaşa yaz.</p>
            </div>
            <ChevronRight size={16} className="ab-contact-arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function CtaBanner({ go }) {
  return (
    <Reveal className="ab-cta">
      <div>
        <h3>Paketini seç, bu gün izləməyə başla</h3>
        <p>Sifariş üçün WhatsApp vasitəsilə yaz — cavab dəqiqələr içindədir.</p>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="ab-btn ab-btn-gold" onClick={() => go("elaqe")}>
          <MessageCircle size={16} /> WhatsApp
        </button>
      </div>
    </Reveal>
  );
}

function SebetPage({ cart, updateQty, removeFromCart, settings }) {
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
        <PageHead kicker="SƏBƏT" title="Səbətiniz boşdur" sub="Paketlər səhifəsindən məhsul əlavə edin." />
      </section>
    );
  }

  return (
    <section className="ab-section ab-page-pad">
      <PageHead kicker="SƏBƏT" title="Səbətim" sub="Miqdarı tənzimlə və sifarişi WhatsApp ilə tamamla." />

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
          <span>Cəmi</span>
          <span className="ab-cart-total">{total.toFixed(2)} ₼</span>
        </div>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={() => { supabase.from("orders").insert({ user_id: session?.user?.id || null, customer_email: session?.user?.email || null, items: cart, total: total }).then(() => {}); }}>
          <MessageCircle size={16} /> Sifarişi WhatsApp ilə tamamla
        </a>
      </div>
    </section>
  );
}

const RULE_GROUPS = [
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

function RulesModal({ onClose }) {
  return (
    <div className="ab-modal-overlay" onClick={onClose}>
      <div className="ab-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ab-modal-head">
          <h3>Xidmət Şərtləri və Qaydalar</h3>
          <button className="ab-modal-close" onClick={onClose} aria-label="Bağla">
            <X size={18} />
          </button>
        </div>
        <p className="ab-modal-intro">
          SkyFlix Azerbaycan olaraq bütün müştərilərimiz üçün eyni şəkildə tətbiq olunan qaydalar aşağıda qeyd edilib.
        </p>
        <div className="ab-modal-body">
          {RULE_GROUPS.map((group, gi) => (
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
          Bağla
        </button>
      </div>
    </div>
  );
}

function CustomerAuthPage() {
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
    if (error) setError("Email və ya şifrə yanlışdır.");
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!agreed) {
      setError("Davam etmək üçün Xidmət Şərtləri və Qaydaları qəbul etməlisiniz.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Şifrələr uyğun gəlmir.");
      return;
    }
    if (password.length < 6) {
      setError("Şifrə ən azı 6 simvol olmalıdır.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
      setError(error.message || "Qeydiyyat zamanı xəta baş verdi.");
      return;
    }
    if (!data.session) {
      setNotice("Qeydiyyat uğurludur! Zəhmət olmasa emailinizi yoxlayıb hesabı təsdiqləyin.");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (checking) {
    return (
      <section className="ab-section ab-page-pad">
        <p>Yüklənir...</p>
      </section>
    );
  }

  if (session) {
    const u = session.user;
    return (
      <section className="ab-section ab-page-pad">
        <div className="ad-login-wrap">
          <PageHead kicker="HESABIM" title="Salam!" sub={u.user_metadata?.full_name || u.email} />
          <div className="ad-settings">
            <label>
              Email
              <input value={u.email} disabled />
            </label>
            {u.user_metadata?.full_name && (
              <label>
                Ad Soyad
                <input value={u.user_metadata.full_name} disabled />
              </label>
            )}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 18 }}>
            Sifarişləriniz haqqında WhatsApp üzərindən məlumat alacaqsınız.
          </p>
          <button className="ab-btn ab-btn-ghost" onClick={handleLogout} style={{ marginTop: 18 }}>
            Çıxış
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="ab-section ab-page-pad">
      <div className="ad-login-wrap">
        <PageHead kicker="HESAB" title={mode === "login" ? "Daxil ol" : "Qeydiyyatdan keç"} />
        <div className="ab-cat-pills" style={{ marginBottom: 22 }}>
          <button
            className={`ab-pill ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
              setNotice("");
            }}
          >
            Daxil ol
          </button>
          <button
            className={`ab-pill ${mode === "register" ? "active" : ""}`}
            onClick={() => {
              setMode("register");
              setError("");
              setNotice("");
            }}
          >
            Qeydiyyat
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="ad-login">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input
              type="password"
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="ad-error">{error}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>
              Daxil ol
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="ad-login">
            <input type="text" placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input
              type="password"
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Şifrəni təkrarla"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className="ab-agree-row">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>
                <button type="button" className="ab-rules-link" onClick={() => setShowRules(true)}>
                  Xidmət Şərtləri və Qaydaları
                </button>{" "}
                qəbul edirəm
              </span>
            </label>
            {error && <p className="ad-error">{error}</p>}
            {notice && <p style={{ color: "var(--teal)", fontSize: 13, margin: 0 }}>{notice}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>
              Qeydiyyatdan keç
            </button>
          </form>
        )}
      </div>
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </section>
  );
}

function VideoWidget({ videoId }) {
  const wrapperRef = useRef(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

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
            setPlaying(true);
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

    return () => {
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

  function handleClick() {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      p.playVideo();
      setMuted(false);
      setPlaying(true);
      return;
    }
    if (playing) {
      p.pauseVideo();
      setPlaying(false);
    } else {
      p.playVideo();
      setPlaying(true);
    }
  }

  return (
    <div className="ab-video-widget" onClick={handleClick}>
      <div ref={wrapperRef} className="ab-video-widget-inner" />
      <div className="ab-video-widget-overlay">
        {muted ? <VolumeX size={18} /> : playing ? <Pause size={18} /> : <Play size={18} />}
      </div>
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
  const { products, settings, reload, loaded } = useAppData();

  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => listener.subscription.unsubscribe();
  }, []);

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
      window.alert("Səbətə əlavə etmək üçün əvvəlcə qeydiyyatdan keçməli və ya daxil olmalısınız.");
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
      <VideoWidget videoId="xYRb1Cg8teU" />
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

        .ab-video-widget{
          position:fixed; bottom:22px; right:22px; z-index:60;
          width:84px; height:84px; border-radius:50%; overflow:hidden;
          border:3px solid var(--gold); box-shadow:0 10px 24px -8px rgba(225,18,42,0.5);
          cursor:pointer; background:#000;
        }
        .ab-video-widget-inner{ width:100%; height:100%; }
        .ab-video-widget-inner iframe{ width:100%; height:100%; pointer-events:none; }
        .ab-video-widget-overlay{
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,0.28); color:#FFFFFF;
        }

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
              {item.label}
            </button>
          ))}
        </div>
        <div className="ab-navright">
          <button className="ab-accountbtn ab-cartbtn" onClick={() => navigate("sebet")} aria-label="Səbət" title="Səbət">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="ab-cart-badge">{cartCount}</span>}
          </button>
          <button className="ab-accountbtn" onClick={() => navigate("hesab")} aria-label="Hesabım" title="Hesabım">
            <User size={18} />
          </button>
          <button className="ab-btn ab-btn-gold" onClick={() => navigate("elaqe")}>
            Sifariş et <ChevronRight size={15} />
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
              {item.label}
            </button>
          ))}
          <button className="ab-navlink" onClick={() => navigate("hesab")}>
            Hesabım
          </button>
          <button className="ab-navlink" onClick={() => navigate("sebet")}>
            Səbətim {cartCount > 0 ? `(${cartCount})` : ""}
          </button>
        </div>
      )}

      <main className="ab-page" key={page}>
        {page === "home" && <HomePage go={go} products={products} onAdd={addToCart} />}
        {page === "paketler" && <PaketlerPage products={products} onAdd={addToCart} />}
        {page === "necehisleyir" && <NeceIsleyirPage />}
        {page === "etibar" && <EtibarPage />}
        {page === "elaqe" && <ElaqePage settings={settings} />}
        {page === "admin" && <AdminPage onDataChanged={reload} />}
        {page === "hesab" && <CustomerAuthPage />}
        {page === "sebet" && (
          <SebetPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} settings={settings} />
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
              {item.label}
            </button>
          ))}
        </div>
        <div>© 2026 SkyFlix Azerbaycan. Bütün hüquqlar qorunur.</div>
      </footer>
    </div>
  );
}
