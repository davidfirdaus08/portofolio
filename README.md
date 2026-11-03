# 👋 David Firdaus — Portfolio

Personal portfolio website of **David Firdaus**, a Web Developer & UI Designer and Informatics Engineering student from Indonesia. Built with pure HTML, CSS, and JavaScript, with a minimalist editorial design, smooth animations, and a multilingual interface.

🔗 **Live:** [dflinks.pages.dev](https://dflinks.pages.dev/)

## ✨ Features

- **Light/dark theme** with a "light switch" lever, follows system preference and remembers your choice
- **9 languages**: Indonesian, English, Spanish, German, French, Arabic (RTL), Chinese, Japanese, Korean
- **3D works carousel** with autoplay, touch swipe, and dot navigation
- **Editorial animations**: preloader, text-reveal hero, scroll progress bar, fade-up sections, animated counters, infinite marquee
- **Custom cursor** with hover states and magnetic CTA buttons (desktop only)
- **Visual mosaic gallery** with hover-focus effect
- **Embedded YouTube videos** in a cinematic frame
- **Downloadable CV** button
- **Fully responsive** and respects `prefers-reduced-motion`
- **SEO ready**: meta description, Open Graph, and Twitter Card tags

## 🧰 Tech Stack

| Category | Technology |
|----------|-----------|
| Markup & Style | HTML5, CSS3 (custom properties, grid, flexbox) |
| Scripting | Vanilla JavaScript (ES6+) |
| Animation | [GSAP](https://gsap.com/) 3.12.5 + ScrollTrigger |
| Fonts | Oswald, Roboto (Google Fonts) |
| Hosting | Cloudflare Pages |

## 🗂️ Sections

| No. | Section | Description |
|-----|---------|-------------|
| 01 | About | Profile, biography, and philosophy |
| 02 | Expertise | Web development, PHP & MySQL, JavaScript, UI/UX, REST API & bots, Cloudflare |
| 03 | Works | DF Komik, DF Bank, DF Links, DF University |
| 04 | Visual Mosaic | Project gallery |
| 05 | Watch | Video demos |
| 06 | Contact | Email, GitHub, and collaboration status |
| 07 | Preferences | Light/dark mode switch |

## 📁 Project Structure

```
.
├── index.html              # Main page (HTML + CSS + JS)
├── favicon.png
├── 4_5Anime.png            # Hero portrait
├── 4_5Animeabout.png       # About portrait
├── dfkomik.png             # Project thumbnails
├── dfbank.png
├── dflinks.png
├── dfuniversity.png
└── cv-david-firdaus.pdf    # Downloadable CV
```

## 🚀 Run Locally

```bash
git clone https://github.com/davidfirdaus08/about_me.git
cd portofolio
```

Then either open `index.html` directly in your browser, or serve it locally:

```bash
python -m http.server 8000
# open http://localhost:8000
```

No build step or dependencies to install.

## 🛠️ Customization

- **Colors & theme:** edit the CSS variables in `:root` and `[data-theme="dark"]`
- **Translations:** edit the `r` object in the language script (keys are tied to `data-i18n` attributes)
- **Projects:** add or edit `<article class="work-card">` inside `#works-carousel`
- **Gallery photos:** replace the `.photo-placeholder` blocks with `<img>` tags
- **Videos:** change the YouTube ID in the `iframe` `src` attributes

## ☁️ Deployment

This is a static site, so it can be deployed anywhere. For Cloudflare Pages: connect the repository, leave the build command empty, and set the output directory to `/`.

## 📬 Contact

- 🌐 Website: [dflinks.pages.dev](https://dflinks.pages.dev/)
- 💻 GitHub: [@davidfirdaus08](https://github.com/davidfirdaus08)
- 📸 Instagram: [@davidfirdaus_08](https://instagram.com/davidfirdaus_08)
- ▶️ YouTube: [@virlanhakuto](https://youtube.com/@virlanhakuto)

---

<p align="center">Designed & Developed by David Firdaus · 2026</p>
