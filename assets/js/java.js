/* ==========================================================================
   Portofolio David Firdaus — 2026
   File   : assets/js/java.js
   Catatan: Seluruh interaksi halaman (preloader, tema, navigasi, kursor,
            carousel, gallery, magnetic button, dan terjemahan i18n).
   ========================================================================== */

/* Preloader: sembunyikan setelah halaman selesai dimuat */
!function(){
  const e = document.getElementById("preloader");
  if(!e) return;
  window.addEventListener("load", () => setTimeout(() => e.classList.add("is-loaded"), 600));
  setTimeout(() => e.classList.add("is-loaded"), 3e3);
}();

/* Toggle tema terang/gelap (lewat tombol biasa maupun saklar lampu) */
!function(){
  const e = document.documentElement,
        t = document.getElementById("lamp-switch"),
        a = document.getElementById("theme-toggle"),
        o = document.getElementById("lamp-label-light"),
        r = document.getElementById("lamp-label-dark"),
        n = document.getElementById("lamp-status"),
        i = document.getElementById("lamp-watermark");
  let s = localStorage.getItem("theme");

  function l(s){
    e.setAttribute("data-theme", s);
    const l = "dark" === s;
    t && t.setAttribute("aria-pressed", l);
    o && o.classList.toggle("is-active", !l);
    r && r.classList.toggle("is-active", l);
    n && (n.textContent = l ? "Mode aktif: Gelap" : "Mode aktif: Terang");
    i && (i.textContent = l ? "GELAP" : "TERANG");
    a && a.setAttribute("aria-pressed", l);
  }

  function d(){
    const t = "dark" === e.getAttribute("data-theme") ? "light" : "dark";
    l(t);
    localStorage.setItem("theme", t);
  }

  if(!s){
    s = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  l(s);
  a && a.addEventListener("click", d);
  if(t){
    t.addEventListener("click", d);
    t.addEventListener("keydown", e => {
      if("Enter" === e.key || " " === e.key){
        e.preventDefault();
        d();
      }
    });
  }
}();

/* Navigasi: toggle menu mobile, scroll-spy, smooth scroll */
!function(){
  const e = document.getElementById("nav-toggle"),
        t = document.getElementById("nav-overlay");

  if(e && t){
    function a(){
      e.classList.remove("is-open");
      t.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    e.addEventListener("click", () => {
      const a = e.classList.toggle("is-open");
      t.classList.toggle("is-open", a);
      document.body.style.overflow = a ? "hidden" : "";
    });
    t.querySelectorAll("a").forEach(e => e.addEventListener("click", a));
  }

  /* Tandai link navigasi yang sedang aktif sesuai posisi scroll */
  const o = document.querySelectorAll("[data-nav-link]"),
        r = document.querySelectorAll("section[id], section[data-nav-parent]");

  if(o.length && r.length){
    let i = false;
    function n(){
      const e = .4 * window.innerHeight;
      let t = null, a = -1 / 0;
      r.forEach(o => {
        const r = o.getBoundingClientRect();
        if(r.top <= e && r.top > a){
          t = o.getAttribute("data-nav-parent") || o.getAttribute("id");
          a = r.top;
        }
      });
      o.forEach(e => e.classList.toggle("is-active", e.getAttribute("href") === "#" + t));
      i = false;
    }
    window.addEventListener("scroll", () => {
      if(!i){
        requestAnimationFrame(n);
        i = true;
      }
    }, {passive: true});
    window.addEventListener("resize", n);
    n();
    window.addEventListener("load", () => setTimeout(n, 700));
  }

  /* Smooth scroll saat klik anchor */
  document.querySelectorAll('a[href^="#"]').forEach(e => {
    e.addEventListener("click", t => {
      const a = e.getAttribute("href");
      if("#" === a || a.length <= 1) return;
      const o = document.querySelector(a);
      if(o){
        t.preventDefault();
        o.scrollIntoView({behavior: "smooth", block: "start"});
      }
    });
  });
}();

/* Kursor kustom (dot + ring yang mengikuti pointer) — desktop saja */
!function(){
  if(window.matchMedia("(pointer: coarse)").matches) return;
  const e = document.querySelector(".cursor-dot"),
        t = document.querySelector(".cursor-ring");
  if(!e || !t) return;
  let a = 0, o = 0, r = 0, n = 0;

  window.addEventListener("mousemove", r => {
    a = r.clientX;
    o = r.clientY;
    e.classList.add("is-visible");
    t.classList.add("is-visible");
    e.style.transform = `translate(${a - 3}px, ${o - 3}px)`;
  });
  window.addEventListener("mouseout", a => {
    if(!a.relatedTarget){
      e.classList.remove("is-visible");
      t.classList.remove("is-visible");
    }
  });
  /* Ring mengikuti dengan sedikit lag (interpolasi) */
  !function e(){
    r += .15 * (a - r);
    n += .15 * (o - n);
    t.style.transform = `translate(${r - 18}px, ${n - 18}px)`;
    requestAnimationFrame(e);
  }();

  /* Perbesar ring saat hover elemen interaktif */
  document.querySelectorAll("a, button, .work-card, .gallery-tile, .video-frame, .video-card, .expertise-item, .photo-placeholder, .lamp-switch, .theme-toggle, .back-to-top")
    .forEach(e => {
      e.addEventListener("mouseenter", () => {
        t.style.width = "60px";
        t.style.height = "60px";
      });
      e.addEventListener("mouseleave", () => {
        t.style.width = "36px";
        t.style.height = "36px";
      });
    });
}();

/* Indikator progress scroll + tombol back-to-top */
!function(){
  const e = document.getElementById("scroll-progress"),
        t = document.getElementById("back-to-top"),
        a = document.getElementById("scroll-thumb");
  if(!e) return;
  let o = false;

  function r(){
    const r = window.scrollY,
          n = document.documentElement.scrollHeight,
          i = window.innerHeight,
          s = n - i,
          l = s > 0 ? r / s * 100 : 0;
    e.style.width = l + "%";
    if(a && n > i){
      const e = Math.max(40, i / n * i),
            t = i - e,
            o = s > 0 ? r / s * t : 0;
      a.style.height = e + "px";
      a.style.transform = `translateY(${o}px)`;
    }
    t && t.classList.toggle("is-visible", r > .8 * window.innerHeight);
    o = false;
  }

  window.addEventListener("scroll", () => {
    if(!o){
      requestAnimationFrame(r);
      o = true;
    }
  }, {passive: true});

  t && t.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
  setTimeout(r, 500);
  window.addEventListener("load", r);
  window.addEventListener("resize", r);
}();

/* Animasi hero: line-mask naik ke posisi (pakai GSAP bila tersedia) */
window.addEventListener("load", () => {
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.querySelectorAll(".line").forEach(e => e.style.transform = "translateY(0)");
  } else if("undefined" != typeof gsap){
    gsap.to("[data-line1]", {yPercent: 0, duration: 1.2, ease: "power4.out", delay: .8});
    gsap.to("[data-line2]", {yPercent: 0, duration: 1.2, ease: "power4.out", delay: .95});
  } else {
    /* Fallback tanpa GSAP */
    document.querySelectorAll(".line").forEach((e, t) => {
      setTimeout(() => {
        e.style.transition = "transform 1.2s cubic-bezier(.22,1,.36,1)";
        e.style.transform = "translateY(0)";
      }, 800 + 150 * t);
    });
  }
});

/* Fade-up: tambah kelas is-in saat elemen masuk viewport */
!function(){
  const e = new IntersectionObserver(t => {
    t.forEach(t => {
      if(t.isIntersecting){
        t.target.classList.add("is-in");
        e.unobserve(t.target);
      }
    });
  }, {threshold: .12, rootMargin: "0px 0px -50px 0px"});
  document.querySelectorAll(".fade-up").forEach(t => e.observe(t));
}();

/* Animasi angka counter pada section index */
!function(){
  const e = document.querySelectorAll("[data-count]");
  if(!e.length) return;
  const t = new IntersectionObserver(e => {
    e.forEach(e => {
      if(e.isIntersecting){
        a(e.target);
        t.unobserve(e.target);
      }
    });
  }, {threshold: .15, rootMargin: "0px 0px -20px 0px"});

  function a(e){
    if("true" === e.dataset.animated) return;
    e.dataset.animated = "true";
    const t = parseInt(e.dataset.count, 10),
          a = e.dataset.suffix || "",
          o = performance.now();
    requestAnimationFrame(function r(n){
      const i = n - o,
            s = Math.min(i / 1800, 1),
            l = 1 - Math.pow(1 - s, 4),
            d = Math.floor(l * t);
      e.textContent = d + a;
      s < 1 ? requestAnimationFrame(r) : e.textContent = t + a;
    });
  }

  e.forEach(e => t.observe(e));
  /* Safety: langsung animasikan kalau elemen sudah terlihat saat load */
  window.addEventListener("load", () => {
    setTimeout(() => {
      e.forEach(e => {
        if("true" === e.dataset.animated) return;
        const t = e.getBoundingClientRect();
        if(t.top < window.innerHeight && t.bottom > 0) a(e);
      });
    }, 900);
  });
}();

/* Carousel karya: geser otomatis + kontrol manual + swipe */
!function(){
  const e = document.getElementById("works-carousel");
  if(!e) return;
  const t = Array.from(e.querySelectorAll(".work-card")),
        a = document.getElementById("works-prev"),
        o = document.getElementById("works-next"),
        r = document.getElementById("works-dots");
  if(0 === t.length) return;
  let n = 0, i = null;

  /* Buat dot indikator */
  t.forEach((e, t) => {
    const a = document.createElement("button");
    a.classList.add("work-dot");
    a.setAttribute("aria-label", "Ke karya " + (t + 1));
    a.addEventListener("click", () => {
      d(t);
      m();
    });
    r.appendChild(a);
  });

  const s = Array.from(r.querySelectorAll(".work-dot"));

  /* Atur posisi setiap kartu: active / prev / next */
  function l(){
    t.forEach((e, a) => {
      e.classList.remove("is-active", "is-prev", "is-next");
      if(a === n) e.classList.add("is-active");
      else if(a === (n - 1 + t.length) % t.length) e.classList.add("is-prev");
      else if(a === (n + 1) % t.length) e.classList.add("is-next");
    });
    s.forEach((e, t) => e.classList.toggle("is-active", t === n));
  }
  function d(e){
    n = (e + t.length) % t.length;
    l();
  }
  function c(){ d(n + 1); }
  function u(){ d(n - 1); }
  function _(){
    if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      i = setInterval(c, 4e3);
    }
  }
  function m(){ clearInterval(i); _(); }

  o.addEventListener("click", () => { c(); m(); });
  a.addEventListener("click", () => { u(); m(); });

  /* Swipe gesture untuk mobile */
  let h = 0, g = 0;
  e.addEventListener("touchstart", e => { h = e.changedTouches[0].screenX; }, {passive: true});
  e.addEventListener("touchend", e => {
    g = e.changedTouches[0].screenX;
    if(g < h - 50){ c(); m(); }
    if(g > h + 50){ u(); m(); }
  }, {passive: true});

  e.addEventListener("mouseenter", () => clearInterval(i));
  e.addEventListener("mouseleave", _);
  l();
  _();
}();

/* Efek hover gallery: redupkan tile yang tidak di-hover (desktop saja) */
!function(){
  if(window.matchMedia("(max-width: 900px)").matches) return;
  const e = document.getElementById("gallery-grid");
  if(!e) return;
  e.querySelectorAll(".gallery-tile").forEach(t => {
    t.addEventListener("mouseenter", () => e.classList.add("has-hover"));
    t.addEventListener("mouseleave", () => e.classList.remove("has-hover"));
  });
}();

/* Efek magnetic button: tombol mengikuti kursor */
!function(){
  if(window.matchMedia("(pointer: coarse)").matches) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const e = document.querySelectorAll("[data-magnetic]");
  e.forEach(e => {
    let t = null;
    e.addEventListener("mouseenter", () => e.classList.add("is-magnetic"));
    e.addEventListener("mousemove", a => {
      const o = e.getBoundingClientRect(),
            r = a.clientX - o.left - o.width / 2,
            n = a.clientY - o.top - o.height / 2;
      t && cancelAnimationFrame(t);
      t = requestAnimationFrame(() => {
        e.style.transform = `translate(${.3 * r}px, ${.3 * n}px)`;
      });
    });
    e.addEventListener("mouseleave", () => {
      t && cancelAnimationFrame(t);
      e.style.transform = "";
      e.classList.remove("is-magnetic");
    });
  });
}();

/* Penerjemah i18n: ganti teks elemen [data-i18n] sesuai bahasa dipilih */
!function(){
  const e = document.getElementById("lang-btn"),
        t = document.getElementById("lang-dropdown"),
        a = document.querySelectorAll(".lang-option"),
        o = document.getElementById("current-lang");

  if(!e || !t || !a) return;

  /* Kamus terjemahan untuk 9 bahasa */
  const r = {
    id: {
      nav_about:"Tentang", nav_expertise:"Keahlian", nav_works:"Karya",
      nav_watch:"Tontonan", nav_contact:"Kontak",
      hero_eyebrow:"Portofolio Personal — David Firdaus",
      hero_title_1:"Membangun pengalaman", hero_title_2:"digital yang berkesan.",
      hero_subtitle:"Saya adalah seorang Web Developer dan UI Designer yang berfokus pada pengembangan website modern, aplikasi berbasis web, serta otomasi menggunakan API. Saya menikmati proses mengubah ide menjadi produk digital yang cepat, responsif, dan mudah digunakan.",
      hero_meta_role:"Peran", hero_meta_role_val:"Web Developer & UI Designer",
      hero_meta_loc:"Lokasi", hero_meta_loc_val:"Indonesia",
      hero_meta_year:"Tahun", hero_meta_year_val:"2026",
      hero_cta_kicker:"Untuk karya lengkap", hero_cta_text:"Kunjungi website",
      hero_cta_cv:"Download CV", hero_scroll:"Gulirkan",
      about_p1:"Halo, saya <strong>David Firdaus</strong>, seorang mahasiswa Teknik Informatika sekaligus pengembang web yang memiliki ketertarikan besar pada teknologi, desain antarmuka, dan pengalaman pengguna.",
      about_p2:"Saya terbiasa membangun website menggunakan HTML, CSS, JavaScript, PHP, MySQL, dan Cloudflare. Selain mengembangkan aplikasi web, saya juga mengeksplorasi integrasi API, Telegram Bot, optimasi performa website, hingga deployment ke hosting.",
      about_quote:'"Teknologi terbaik adalah teknologi yang terasa sederhana bagi penggunanya."',
      about_p3:"Bagi saya, sebuah produk digital bukan hanya harus terlihat menarik, tetapi juga memiliki performa yang cepat, struktur kode yang rapi, serta mudah dikembangkan di masa depan.",
      about_sig1:"— David Firdaus", about_sig2:"Mahasiswa Teknik Informatika"
    },
    en: {
      nav_about:"About", nav_expertise:"Expertise", nav_works:"Works",
      nav_watch:"Watch", nav_contact:"Contact",
      hero_eyebrow:"Personal Portfolio — David Firdaus",
      hero_title_1:"Building memorable", hero_title_2:"digital experiences.",
      hero_subtitle:"I am a Web Developer and UI Designer focused on modern website development, web-based applications, and API automation. I enjoy the process of turning ideas into digital products that are fast, responsive, and easy to use.",
      hero_meta_role:"Role", hero_meta_role_val:"Web Developer & UI Designer",
      hero_meta_loc:"Location", hero_meta_loc_val:"Indonesia",
      hero_meta_year:"Year", hero_meta_year_val:"2026",
      hero_cta_kicker:"For full portfolio", hero_cta_text:"Visit website",
      hero_cta_cv:"Download CV", hero_scroll:"Scroll",
      about_p1:"Hello, I am <strong>David Firdaus</strong>, an Informatics Engineering student and web developer with a strong interest in technology, interface design, and user experience.",
      about_p2:"I am accustomed to building websites using HTML, CSS, JavaScript, PHP, MySQL, and Cloudflare. Besides developing web applications, I also explore API integration, Telegram Bots, website performance optimization, and hosting deployment.",
      about_quote:'"The best technology is technology that feels simple to its users."',
      about_p3:"For me, a digital product must not only look attractive but also have fast performance, clean code structure, and be easy to develop in the future.",
      about_sig1:"— David Firdaus", about_sig2:"Informatics Engineering Student"
    },
    es: {
      nav_about:"Acerca de", nav_expertise:"Experiencia", nav_works:"Proyectos",
      nav_watch:"Ver", nav_contact:"Contacto",
      hero_eyebrow:"Portafolio Personal — David Firdaus",
      hero_title_1:"Creando experiencias", hero_title_2:"digitales memorables.",
      hero_subtitle:"Soy un Desarrollador Web y Diseñador de UI enfocado en el desarrollo de sitios web modernos, aplicaciones basadas en web y automatización mediante API. Disfruto el proceso de convertir ideas en productos digitales rápidos, receptivos y fáciles de usar.",
      hero_meta_role:"Rol", hero_meta_role_val:"Desarrollador Web & Diseñador UI",
      hero_meta_loc:"Ubicación", hero_meta_loc_val:"Indonesia",
      hero_meta_year:"Año", hero_meta_year_val:"2026",
      hero_cta_kicker:"Para el portafolio completo", hero_cta_text:"Visitar sitio web",
      hero_cta_cv:"Descargar CV", hero_scroll:"Desplázate",
      about_p1:"Hola, soy <strong>David Firdaus</strong>, estudiante de Ingeniería Informática y desarrollador web con un gran interés en la tecnología, el diseño de interfaces y la experiencia del usuario.",
      about_p2:"Estoy acostumbrado a crear sitios web utilizando HTML, CSS, JavaScript, PHP, MySQL y Cloudflare. Además de desarrollar aplicaciones web, también exploro la integración de API, Telegram Bots, la optimización del rendimiento y el despliegue en hosting.",
      about_quote:'"La mejor tecnología es la que parece simple para sus usuarios."',
      about_p3:"Para mí, un producto digital no solo debe verse atractivo, sino también tener un rendimiento rápido, una estructura de código limpia y ser fácil de desarrollar en el futuro.",
      about_sig1:"— David Firdaus", about_sig2:"Estudiante de Ingeniería Informática"
    },
    de: {
      nav_about:"Über mich", nav_expertise:"Fachwissen", nav_works:"Werke",
      nav_watch:"Ansehen", nav_contact:"Kontakt",
      hero_eyebrow:"Persönliches Portfolio — David Firdaus",
      hero_title_1:"Einprägsame digitale", hero_title_2:"Erlebnisse schaffen.",
      hero_subtitle:"Ich bin Webentwickler und UI-Designer mit Schwerpunkt auf moderner Webentwicklung, webbasierten Anwendungen und API-Automatisierung. Ich genieße den Prozess, Ideen in schnelle, reaktionsschnelle und benutzerfreundliche digitale Produkte umzuwandeln.",
      hero_meta_role:"Rolle", hero_meta_role_val:"Webentwickler & UI-Designer",
      hero_meta_loc:"Standort", hero_meta_loc_val:"Indonesien",
      hero_meta_year:"Jahr", hero_meta_year_val:"2026",
      hero_cta_kicker:"Für das vollständige Portfolio", hero_cta_text:"Website besuchen",
      hero_cta_cv:"CV herunterladen", hero_scroll:"Scrollen",
      about_p1:"Hallo, ich bin <strong>David Firdaus</strong>, Student der Informatik und Webentwickler mit großem Interesse an Technologie, Interface-Design und Benutzererfahrung.",
      about_p2:"Ich bin es gewohnt, Websites mit HTML, CSS, JavaScript, PHP, MySQL und Cloudflare zu erstellen. Neben der Entwicklung von Webanwendungen erkunde ich auch API-Integration, Telegram-Bots, Leistungsoptimierung und Hosting-Bereitstellung.",
      about_quote:'"Die beste Technologie ist Technologie, die sich für den Benutzer einfach anfühlt."',
      about_p3:"Für mich muss ein digitales Produkt nicht nur attraktiv aussehen, sondern auch eine hohe Leistung, eine saubere Code-Struktur und eine zukunftsorientierte Entwicklung ermöglichen.",
      about_sig1:"— David Firdaus", about_sig2:"Informatik-Student"
    },
    fr: {
      nav_about:"À propos", nav_expertise:"Expertise", nav_works:"Projets",
      nav_watch:"Regarder", nav_contact:"Contact",
      hero_eyebrow:"Portfolio Personnel — David Firdaus",
      hero_title_1:"Créer des expériences", hero_title_2:"numériques mémorables.",
      hero_subtitle:"Je suis un Développeur Web et Designer UI axé sur le développement de sites web modernes, d'applications web et l'automatisation via API. J'apprécie le processus de transformation des idées en produits numériques rapides, réactifs et faciles à utiliser.",
      hero_meta_role:"Rôle", hero_meta_role_val:"Développeur Web & Designer UI",
      hero_meta_loc:"Emplacement", hero_meta_loc_val:"Indonésie",
      hero_meta_year:"Année", hero_meta_year_val:"2026",
      hero_cta_kicker:"Pour le portfolio complet", hero_cta_text:"Visiter le site web",
      hero_cta_cv:"Télécharger le CV", hero_scroll:"Faire défiler",
      about_p1:"Bonjour, je suis <strong>David Firdaus</strong>, étudiant en génie informatique et développeur web avec un grand intérêt pour la technologie, le design d'interface et l'expérience utilisateur.",
      about_p2:"J'ai l'habitude de créer des sites Web utilisant HTML, CSS, JavaScript, PHP, MySQL et Cloudflare. En plus de développer des applications Web, j'explore l'intégration d'API, les bots Telegram, l'optimisation des performances et le déploiement.",
      about_quote:'"La meilleure technologie est celle qui semble simple à ses utilisateurs."',
      about_p3:"Pour moi, un produit numérique ne doit pas seulement être attrayant, mais aussi offrir des performances rapides, une structure de code propre et être facile à développer à l'avenir.",
      about_sig1:"— David Firdaus", about_sig2:"Étudiant en Génie Informatique"
    },
    ar: {
      nav_about:"نبذة", nav_expertise:"الخبرة", nav_works:"الأعمال",
      nav_watch:"مشاهدة", nav_contact:"اتصال",
      hero_eyebrow:"الملف الشخصي — ديفيد فردوس",
      hero_title_1:"بناء تجارب", hero_title_2:"رقمية لا تُنسى.",
      hero_subtitle:"أنا مطور ويب ومصمم واجهات يركز على تطوير مواقع الويب الحديثة والتطبيقات القائمة على الويب والأتمتة باستخدام واجهات برمجة التطبيقات. أستمتع بعملية تحويل الأفكار إلى منتجات رقمية سريعة الاستجابة وسهلة الاستخدام.",
      hero_meta_role:"الدور", hero_meta_role_val:"مطور ويب ومصمم واجهات",
      hero_meta_loc:"الموقع", hero_meta_loc_val:"إندونيسيا",
      hero_meta_year:"السنة", hero_meta_year_val:"2026",
      hero_cta_kicker:"للمحفظة الكاملة", hero_cta_text:"زيارة الموقع",
      hero_cta_cv:"تحميل السيرة الذاتية", hero_scroll:"مرر",
      about_p1:"مرحبا، أنا <strong>ديفيد فردوس</strong>، طالب في هندسة المعلوماتية ومطور ويب مهتم جدا بالتكنولوجيا وتصميم الواجهات وتجربة المستخدم.",
      about_p2:"معتاد على بناء مواقع الويب باستخدام HTML و CSS و JavaScript و PHP و MySQL و Cloudflare. إلى جانب تطوير تطبيقات الويب، أستكشف أيضًا تكامل API وروبوتات Telegram وتحسين الأداء والنشر على الاستضافة.",
      about_quote:'"أفضل تقنية هي التقنية التي تبدو بسيطة لمستخدميها."',
      about_p3:"بالنسبة لي، يجب أن لا يكون المنتج الرقمي جذاباً فحسب، بل يجب أن يكون سريع الأداء، نظيف الكود، وسهل التطوير في المستقبل.",
      about_sig1:"— ديفيد فردوس", about_sig2:"طالب هندسة معلوماتية"
    },
    zh: {
      nav_about:"关于", nav_expertise:"专长", nav_works:"作品",
      nav_watch:"观看", nav_contact:"联系",
      hero_eyebrow:"个人作品集 — David Firdaus",
      hero_title_1:"构建令人难忘的", hero_title_2:"数字体验。",
      hero_subtitle:"我是一名网页开发者和UI设计师，专注于现代网站开发、基于网页的应用程序以及API自动化。我享受将想法转化为快速、响应迅速且易于使用的数字产品的过程。",
      hero_meta_role:"角色", hero_meta_role_val:"网页开发者 & UI设计师",
      hero_meta_loc:"位置", hero_meta_loc_val:"印度尼西亚",
      hero_meta_year:"年份", hero_meta_year_val:"2026",
      hero_cta_kicker:"查看完整作品集", hero_cta_text:"访问网站",
      hero_cta_cv:"下载简历", hero_scroll:"滚动",
      about_p1:"你好，我是<strong>David Firdaus</strong>，一名信息工程学生兼网页开发者，对技术、界面设计和用户体验有浓厚的兴趣。",
      about_p2:"我习惯使用 HTML、CSS、JavaScript、PHP、MySQL 和 Cloudflare 构建网站。除了开发网页应用程序，我还探索 API 集成、Telegram 机器人、性能优化和主机部署。",
      about_quote:'"最好的技术是让用户感觉简单的技术。"',
      about_p3:"对我来说，数字产品不仅要外观吸引人，还要有快速的性能、整洁的代码结构，并且在未来易于开发。",
      about_sig1:"— David Firdaus", about_sig2:"信息工程学生"
    },
    ja: {
      nav_about:"について", nav_expertise:"専門知識", nav_works:"作品",
      nav_watch:"見る", nav_contact:"連絡先",
      hero_eyebrow:"個人ポートフォリオ — David Firdaus",
      hero_title_1:"記憶に残る", hero_title_2:"デジタル体験の構築。",
      hero_subtitle:"私は、モダンなウェブサイト開発、ウェブベースのアプリケーション、API自動化に焦点を当てているウェブ開発者およびUIデザイナーです。アイデアを速く、応答性が高く、使いやすいデジタル製品に変えるプロセスを楽しんでいます。",
      hero_meta_role:"役割", hero_meta_role_val:"ウェブ開発者 & UIデザイナー",
      hero_meta_loc:"場所", hero_meta_loc_val:"インドネシア",
      hero_meta_year:"年", hero_meta_year_val:"2026",
      hero_cta_kicker:"完全なポートフォリオについて", hero_cta_text:"ウェブサイトにアクセス",
      hero_cta_cv:"履歴書をダウンロード", hero_scroll:"スクロール",
      about_p1:"こんにちは、私は<strong>David Firdaus</strong>です。情報工学の学生であり、テクノロジー、インターフェースデザイン、ユーザー体験に強い関心を持つウェブ開発者です。",
      about_p2:"HTML、CSS、JavaScript、PHP、MySQL、Cloudflareを使用してウェブサイトを構築することに慣れています。ウェブアプリケーションの開発だけでなく、API統合、Telegramボット、パフォーマンスの最適化、ホスティングへのデプロイも探求しています。",
      about_quote:'"最高のテクノロジーは、ユーザーにとってシンプルに感じられるテクノロジーです。"',
      about_p3:"私にとって、デジタル製品は魅力的に見えるだけでなく、パフォーマンスが高く、コード構造が整理されており、将来開発しやすいものでなければなりません。",
      about_sig1:"— David Firdaus", about_sig2:"情報工学学生"
    },
    ko: {
      nav_about:"소개", nav_expertise:"전문성", nav_works:"작업",
      nav_watch:"시청", nav_contact:"연락처",
      hero_eyebrow:"개인 포트폴리오 — David Firdaus",
      hero_title_1:"기억에 남는", hero_title_2:"디지털 경험 구축.",
      hero_subtitle:"저는 모던 웹사이트 개발, 웹 기반 애플리케이션 및 API 자동화에 중점을 둔 웹 개발자이자 UI 디자이너입니다. 아이디어를 빠르고 반응이 빠르며 사용하기 쉬운 디지털 제품으로 전환하는 과정을 즐깁니다.",
      hero_meta_role:"역할", hero_meta_role_val:"웹 개발자 & UI 디자이너",
      hero_meta_loc:"위치", hero_meta_loc_val:"인도네시아",
      hero_meta_year:"연도", hero_meta_year_val:"2026",
      hero_cta_kicker:"전체 포트폴리오 보기", hero_cta_text:"웹사이트 방문",
      hero_cta_cv:"이력서 다운로드", hero_scroll:"스크롤",
      about_p1:"안녕하세요, 저는 <strong>David Firdaus</strong>입니다. 정보 공학 학생이자 기술, 인터페이스 디자인 및 사용자 경험에 큰 관심을 가진 웹 개발자입니다.",
      about_p2:"HTML, CSS, JavaScript, PHP, MySQL 및 Cloudflare를 사용하여 웹사이트를 구축하는 데 익숙합니다. 웹 응용 프로그램을 개발하는 것 외에도 API 통합, Telegram 봇, 성능 최적화 및 호스팅 배포를 탐구합니다.",
      about_quote:'"최고의 기술은 사용자에게 단순하게 느껴지는 기술입니다."',
      about_p3:"저에게 디지털 제품은 매력적으로 보일 뿐만 아니라 빠른 성능, 깔끔한 코드 구조, 미래의 개발 용이성을 갖춰야 합니다.",
      about_sig1:"— David Firdaus", about_sig2:"정보 공학 학생"
    }
  };

  /* Buka/tutup dropdown bahasa */
  e.addEventListener("click", e => {
    e.stopPropagation();
    t.classList.toggle("is-open");
  });
  document.addEventListener("click", () => t.classList.remove("is-open"));

  /* Terapkan bahasa yang dipilih */
  a.forEach(e => {
    e.addEventListener("click", n => {
      n.stopPropagation();
      (function(e){
        const t = document.querySelectorAll("[data-i18n]");
        /* Beri kelas 'translating' dulu untuk efek fade */
        t.forEach(e => e.classList.add("translating"));
        setTimeout(() => {
          t.forEach(t => {
            const a = t.getAttribute("data-i18n");
            if(r[e] && r[e][a]) t.innerHTML = r[e][a];
          });
          /* Atur arah teks: RTL untuk Arab, LTR untuk lainnya */
          "ar" === e
            ? document.documentElement.setAttribute("dir", "rtl")
            : document.documentElement.setAttribute("dir", "ltr");
          t.forEach(e => e.classList.remove("translating"));
        }, 200);
        o.textContent = e.toUpperCase();
        a.forEach(t => t.classList.toggle("is-active", t.getAttribute("data-lang") === e));
      })(e.getAttribute("data-lang"));
      t.classList.remove("is-open");
    });
  });
}();
