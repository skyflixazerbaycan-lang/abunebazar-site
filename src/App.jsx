import React, { useEffect, useRef, useState } from "react";
import { Check, Shield, Clock, MessageCircle, Ticket, ChevronRight, Star, Menu, X } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Hamısı" },
  { id: "streaming", label: "Streaming" },
  { id: "music", label: "Musiqi" },
  { id: "ai", label: "AI Alətləri" },
];

const PRODUCTS = [
  { name: "Netflix Premium", plan: "4K · 4 ekran", price: "9.90", period: "AY", code: "NFX-4K-04", category: "streaming" },
  { name: "Disney+", plan: "4K · 4 ekran", price: "7.90", period: "AY", code: "DNP-4K-04", category: "streaming" },
  { name: "Apple TV+", plan: "4K · Ailə paylaşımı", price: "6.90", period: "AY", code: "ATV-4K-01", category: "streaming" },
  { name: "Spotify Premium", plan: "Fərdi hesab", price: "4.90", period: "AY", code: "SPT-IND-01", category: "music" },
  { name: "YouTube Premium", plan: "Reklamsız + Music", price: "5.90", period: "AY", code: "YTB-PRM-01", category: "music" },
  { name: "Apple Music", plan: "Fərdi hesab", price: "4.50", period: "AY", code: "APL-MUS-01", category: "music" },
  { name: "ChatGPT Plus", plan: "GPT-5 · Prioritet", price: "24.90", period: "AY", code: "OAI-PLS-01", category: "ai" },
];

const FEATURED = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[1], PRODUCTS[6]];

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
    return NAV_ITEMS.some((n) => n.key === h) ? h : "home";
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

function TicketCard({ p }) {
  return (
    <div className="ab-ticket">
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

function HeroSlideshow() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % FEATURED.length), 3600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ab-slideshow">
      {FEATURED.map((p, idx) => (
        <div key={p.code} className={`ab-slide ${idx === i ? "active" : ""}`}>
          <div className="ab-slide-eyebrow">PREMIUM ABUNƏLİK</div>
          <div className="ab-slide-name">{p.name}</div>
          <div className="ab-slide-plan">{p.plan}</div>
          <div className="ab-slide-price">
            {p.price} ₼ <span>/AY</span>
          </div>
        </div>
      ))}
      <div className="ab-slide-dots">
        {FEATURED.map((_, idx) => (
          <button
            key={idx}
            className={`ab-dot ${idx === i ? "active" : ""}`}
            onClick={() => setI(idx)}
            aria-label={`Slayd ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomePage({ go }) {
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
                <MessageCircle size={16} /> Telegram ilə yaz
              </button>
            </div>
            <div className="ab-trustrow">
              <span><Shield size={14} /> Zəmanətli hesablar</span>
              <span><Clock size={14} /> 7/24 dəstək</span>
              <span><Star size={14} /> 1200+ məmnun müştəri</span>
            </div>
          </div>

          <HeroSlideshow />
        </div>
      </div>

      <section className="ab-section" style={{ paddingTop: 60 }}>
        <PageHead kicker="POPULYAR" title="Ən çox seçilən paketlər" sub="Tam siyahı üçün Paketlər səhifəsinə keç." />
        <div className="ab-grid">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.code} delay={i * 70}>
              <TicketCard p={p} />
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

function PaketlerPage() {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

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
          <Reveal key={p.code} delay={i * 60}>
            <TicketCard p={p} />
          </Reveal>
        ))}
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
    { icon: Clock, title: "Sürətli təhvil", text: "Ödəniş təsdiqindən sonra hesab məlumatları adətən 5 dəqiqəyə çatır." },
    { icon: MessageCircle, title: "Canlı dəstək", text: "Sualların olarsa Telegram üzərindən həftənin 7 günü cavab veririk." },
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

function ElaqePage() {
  const items = [
    { icon: MessageCircle, title: "Telegram", text: "@skyflixazerbaycan_bot — ən sürətli cavab kanalı." },
    { icon: MessageCircle, title: "WhatsApp", text: "+994 XX XXX XX XX — sifariş və dəstək üçün." },
    { icon: Star, title: "Instagram", text: "@skyflixazerbaycan — yeniliklər və kampaniyalar." },
  ];
  return (
    <section className="ab-section ab-page-pad">
      <PageHead
        kicker="ƏLAQƏ"
        title="Sifariş üçün yaz"
        sub="Aşağıdakı kanallardan biri ilə əlaqə saxla, cavab adətən bir neçə dəqiqə çəkir."
      />
      <div className="ab-contact-grid">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 90}>
            <a href="#" className="ab-contact-card">
              <it.icon size={22} strokeWidth={1.75} />
              <div>
                <h4>{it.title}</h4>
                <p>{it.text}</p>
              </div>
              <ChevronRight size={16} className="ab-contact-arrow" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaBanner({ go }) {
  return (
    <Reveal className="ab-cta">
      <div>
        <h3>Paketini seç, bu gün izləməyə başla</h3>
        <p>Sifariş üçün Telegram və ya WhatsApp vasitəsilə yaz — cavab dəqiqələr içindədir.</p>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="ab-btn ab-btn-gold" onClick={() => go("elaqe")}>
          <MessageCircle size={16} /> Telegram
        </button>
        <button className="ab-btn ab-btn-ghost" onClick={() => go("elaqe")}>
          Bütün kanallar
        </button>
      </div>
    </Reveal>
  );
}

export default function App() {
  useGoogleFonts();
  const [page, go] = useHashRoute();
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

        /* SCROLL REVEAL */
        .ab-reveal{
          opacity:0;
          transform:translateY(-26px);
          transition:opacity .7s cubic-bezier(.16,.8,.24,1), transform .7s cubic-bezier(.16,.8,.24,1);
        }
        .ab-reveal-in{ opacity:1; transform:translateY(0); }

        /* NAV */
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

        /* VIDEO-LIKE SCREEN HERO */
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

        /* HERO (inside screen) */
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

        /* SLIDESHOW */
        .ab-slideshow{ position:relative; height:290px; }
        .ab-slide{
          position:absolute; inset:0;
          display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.16);
          border-radius:20px;
          backdrop-filter:blur(8px);
          opacity:0; transform:translateY(18px) scale(.97);
          transition:opacity .6s ease, transform .6s ease;
          pointer-events:none;
        }
        .ab-slide.active{ opacity:1; transform:translateY(0) scale(1); pointer-events:auto; }
        .ab-slide-eyebrow{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.1em; color:rgba(255,255,255,0.55); margin-bottom:12px; }
        .ab-slide-name{ font-family:'Space Grotesk',sans-serif; font-size:27px; font-weight:700; }
        .ab-slide-plan{ color:rgba(255,255,255,0.72); font-size:14px; margin-top:7px; }
        .ab-slide-price{ font-family:'JetBrains Mono',monospace; font-size:30px; font-weight:700; color:#FF6B6B; margin-top:18px; }
        .ab-slide-price span{ font-size:13px; color:rgba(255,255,255,0.6); font-weight:400; }
        .ab-slide-dots{ position:absolute; bottom:16px; left:0; right:0; display:flex; justify-content:center; gap:8px; }
        .ab-dot{ width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.3); border:none; cursor:pointer; transition:all .25s ease; padding:0; }
        .ab-dot.active{ background:#FFFFFF; width:22px; border-radius:5px; }

        /* SECTIONS */
        .ab-section{ padding:90px 6vw; }
        .ab-section-head{ margin-bottom:44px; max-width:60ch; }
        .ab-kicker{ font-family:'JetBrains Mono',monospace; font-size:12.5px; color:var(--gold); letter-spacing:.08em; margin-bottom:10px; }
        .ab-h2{ font-size:clamp(24px,3.4vw,34px); font-weight:700; margin:0 0 12px; }
        .ab-section-sub{ color:var(--muted); font-size:15.5px; line-height:1.6; }

        /* CATEGORY PILLS */
        .ab-cat-pills{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:32px; }
        .ab-pill{
          padding:9px 18px; border-radius:100px; border:1px solid var(--line);
          background:var(--surface); color:var(--muted); font-size:13.5px; font-weight:600;
          cursor:pointer; transition:all .2s ease; font-family:'Inter',sans-serif;
        }
        .ab-pill:hover{ border-color:var(--gold); color:var(--text); }
        .ab-pill.active{ background:var(--gold); border-color:var(--gold); color:#FFFFFF; }

        /* STEPS */
        .ab-steps{ display:grid; gap:28px; }
        @media(min-width:800px){ .ab-steps{ grid-template-columns:repeat(3,1fr); } }
        .ab-step{ border:1px solid var(--line); border-radius:16px; padding:26px 24px; background:var(--surface); position:relative; }
        .ab-step-n{ font-family:'JetBrains Mono',monospace; color:var(--teal); font-size:13px; margin-bottom:14px; display:block; }
        .ab-step h3{ font-size:19px; margin:0 0 8px; }
        .ab-step p{ color:var(--muted); font-size:14.5px; margin:0; line-height:1.55; }

        /* TICKET GRID */
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

        /* TRUST */
        .ab-trust{ display:grid; gap:20px; }
        @media(min-width:800px){ .ab-trust{ grid-template-columns:repeat(3,1fr); } }
        .ab-trust-item{ display:flex; gap:14px; padding:22px; border:1px solid var(--line); border-radius:14px; }
        .ab-trust-item svg{ color:var(--teal); flex-shrink:0; margin-top:2px; }
        .ab-trust-item h4{ margin:0 0 5px; font-size:15.5px; font-family:'Space Grotesk',sans-serif; }
        .ab-trust-item p{ margin:0; color:var(--muted); font-size:13.5px; line-height:1.5; }

        /* CONTACT PAGE */
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

        /* CTA BANNER */
        .ab-cta{
          margin:0 6vw 90px; padding:46px 6vw; border-radius:22px;
          background:linear-gradient(120deg, rgba(225,18,42,0.14), rgba(140,22,32,0.10));
          border:1px solid var(--line);
          display:flex; flex-wrap:wrap; gap:24px; align-items:center; justify-content:space-between;
        }
        .ab-cta h3{ font-size:24px; margin:0 0 6px; }
        .ab-cta p{ color:var(--muted); margin:0; font-size:14.5px; }

        /* FOOTER */
        .ab-footer{
          border-top:1px solid var(--line); padding:36px 6vw; display:flex; flex-wrap:wrap;
          gap:16px; justify-content:space-between; align-items:center; color:var(--muted); font-size:13px;
        }
        .ab-footer button{ background:none; border:none; cursor:pointer; font-family:'Inter',sans-serif; }
        .ab-footer a, .ab-footer button{ color:var(--muted); text-decoration:none; }
        .ab-footer a:hover, .ab-footer button:hover{ color:var(--text); }
      `}</style>

      {/* NAV */}
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
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className="ab-page" key={page}>
        {page === "home" && <HomePage go={go} />}
        {page === "paketler" && <PaketlerPage />}
        {page === "necehisleyir" && <NeceIsleyirPage />}
        {page === "etibar" && <EtibarPage />}
        {page === "elaqe" && <ElaqePage />}
      </main>

      {/* FOOTER */}
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
