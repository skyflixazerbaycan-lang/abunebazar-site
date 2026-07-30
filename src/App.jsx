import React, { useEffect, useRef, useState } from "react";
import { Shield, Clock, MessageCircle, Ticket, ChevronRight, Star, Menu, X, User } from "lucide-react";
import { supabase } from "./supabaseClient";

const CATEGORIES = [
  { id: "all", label: "Hamısı" },
  { id: "streaming", label: "Film" },
  { id: "music", label: "Musiqi" },
  { id: "ai", label: "AI Alətləri" },
];

const STEPS = [
  { n: "01", title: "Seç", text: "İstədiyin platforma və paketi seç." },
  { n: "02", title: "Ödə", text: "Kart və ya Kapital Bank/M10 ilə ödəniş et." },
  { n: "03", title: "Al", text: "24 saat ərzində hesab detalların çatır." },
];

const NAV_ITEMS = [
  { key: "home", label: "Ana səhifə" },
  { key: "paketler", label: "Paketlər" },
  { key: "necehisleyir", label: "Necə işləyir" },
  { key: "etibar", label: "Etibarlılıq" },
  { key: "elaqe", label: "Əlaqə" },
];

const ALL_PAGES = [...NAV_ITEMS.map((n) => n.key), "admin", "hesab"];

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

function HeroSlideshow({ products }) {
  const [i, setI] = useState(0);
  const slides = products.slice(0, 4);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 3600);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) {
    return <div className="ab-slideshow" />;
  }

  return (
    <div className="ab-slideshow">
      {slides.map((p, idx) => (
        <div key={p.id} className={`ab-slide ${idx === i ? "active" : ""}`}>
          <div className="ab-slide-eyebrow">PREMIUM ABUNƏLİK</div>
          <div className="ab-slide-name">{p.name}</div>
          <div className="ab-slide-plan">{p.plan}</div>
          <div className="ab-slide-price">
            {p.price} ₼ <span>/AY</span>
          </div>
        </div>
      ))}
      <div className="ab-slide-dots">
        {slides.map((_, idx) => (
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

function HomePage({ go, products }) {
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

function PaketlerPage({ products }) {
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
            <TicketCard p={p} />
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
    { icon: Clock, title: "Sürətli təhvil", text: "Ödəniş təsdiqindən sonra hesab məlumatları adətən 5 dəqiqəyə çatır." },
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
            {error && <p className="ad-error">{error}</p>}
            {notice && <p style={{ color: "var(--teal)", fontSize: 13, margin: 0 }}>{notice}</p>}
            <button type="submit" className="ab-btn ab-btn-gold" style={{ justifyContent: "center" }}>
              Qeydiyyatdan keç
            </button>
          </form>
        )}
      </div>
    </section>
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
  });
  const [status, setStatus] = useState("");

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
    </section>
  );
}

export default function App() {
  useGoogleFonts();
  const [page, go] = useHashRoute();
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { products, settings, reload, loaded } = useAppData();

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
        </div>
      )}

      <main className="ab-page" key={page}>
        {page === "home" && <HomePage go={go} products={products} />}
        {page === "paketler" && <PaketlerPage products={products} />}
        {page === "necehisleyir" && <NeceIsleyirPage />}
        {page === "etibar" && <EtibarPage />}
        {page === "elaqe" && <ElaqePage settings={settings} />}
        {page === "admin" && <AdminPage onDataChanged={reload} />}
        {page === "hesab" && <CustomerAuthPage />}
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
