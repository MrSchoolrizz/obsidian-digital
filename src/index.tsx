import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()
app.use('/static/*', serveStatic({ root: './' }))

// ─── Layout ───────────────────────────────────────────────────────────────────
const Layout = ({ children, title = 'Obsidian Digital | Static Website Design, Ipswich' }: { children: any; title?: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="Obsidian Digital — affordable, modern static websites for small businesses in Ipswich and across the UK. Barbers, restaurants, tradesmen, creatives and more." />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Plus Jakarta Sans', 'sans-serif'],
          },
          colors: {
            brand: {
              50:  '#f0f4ff',
              100: '#e0eaff',
              200: '#c7d7fe',
              300: '#a5b8fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
            }
          }
        }
      }
    }
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: #ffffff; color: #111827; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }

    /* ── Hero background ── */
    .hero-bg {
      background:
        radial-gradient(ellipse 80% 60% at 70% -10%, rgba(99,102,241,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 0% 90%,  rgba(139,92,246,0.12) 0%, transparent 55%),
        #07070f;
    }

    /* ── Gradient text ── */
    .grad {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    /* Tighter two-stop for headings */
    .grad-2 {
      background: linear-gradient(120deg, #818cf8 0%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── Glowing pill / badge ── */
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border-radius: 100px;
      padding: 0.35rem 1rem;
    }
    .pill-dark {
      background: rgba(99,102,241,0.10);
      border: 1px solid rgba(99,102,241,0.25);
      color: #a5b8fc;
    }
    .pill-light {
      background: rgba(99,102,241,0.06);
      border: 1px solid rgba(99,102,241,0.18);
      color: #6366f1;
    }
    .pill-violet {
      background: rgba(168,85,247,0.08);
      border: 1px solid rgba(168,85,247,0.2);
      color: #a855f7;
    }

    /* ── Buttons ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: linear-gradient(135deg,#6366f1,#8b5cf6);
      color: #fff; font-weight: 700; font-family: 'Plus Jakarta Sans',sans-serif;
      border-radius: 10px; transition: all 0.22s ease;
      box-shadow: 0 4px 18px rgba(99,102,241,0.32);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.48); }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 0.5rem;
      border: 1.5px solid rgba(255,255,255,0.18);
      color: rgba(255,255,255,0.85); font-weight: 600; font-family: 'Plus Jakarta Sans',sans-serif;
      border-radius: 10px; transition: all 0.22s ease;
    }
    .btn-outline:hover { border-color: rgba(255,255,255,0.4); color: #fff; background: rgba(255,255,255,0.05); }
    .btn-dark {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: #111827; color: #fff; font-weight: 700; font-family: 'Plus Jakarta Sans',sans-serif;
      border-radius: 10px; transition: all 0.22s ease;
    }
    .btn-dark:hover { background: #1f2937; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    .btn-outline-light {
      display: inline-flex; align-items: center; gap: 0.5rem;
      border: 1.5px solid #e5e7eb; color: #374151; font-weight: 600;
      font-family: 'Plus Jakarta Sans',sans-serif; border-radius: 10px; transition: all 0.22s ease;
    }
    .btn-outline-light:hover { border-color: #6366f1; color: #6366f1; background: rgba(99,102,241,0.04); }

    /* ── Nav ── */
    #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: all 0.3s ease; }
    #navbar.scrolled { background: rgba(7,7,15,0.94); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,0.06); }
    .nav-link { font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.6); transition: color 0.2s; }
    .nav-link:hover { color: #fff; }

    /* ── Cards ── */
    .service-card {
      background: #fff;
      border: 1.5px solid #f3f4f6;
      border-radius: 16px;
      padding: 1.75rem;
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    }
    .service-card:hover { border-color: #c7d7fe; box-shadow: 0 12px 40px rgba(99,102,241,0.09); transform: translateY(-4px); }
    .service-card.featured { border-color: #c7d7fe; background: linear-gradient(135deg,#f0f4ff 0%,#faf5ff 100%); }

    .dark-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      transition: border-color 0.25s, background 0.25s;
    }
    .dark-card:hover { border-color: rgba(99,102,241,0.35); background: rgba(99,102,241,0.05); }

    .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .lift:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }

    /* ── Section backgrounds ── */
    .section-white { background: #ffffff; }
    .section-gray  { background: #f9fafb; }
    .section-dark  { background: #07070f; }

    /* ── Ticker ── */
    @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .ticker-track { display: flex; width: max-content; animation: ticker 30s linear infinite; }
    .ticker-track:hover { animation-play-state: paused; }
    .biz-chip {
      display: inline-flex; align-items: center; gap: 0.5rem;
      white-space: nowrap; padding: 0.45rem 1.1rem;
      border-radius: 100px; border: 1.5px solid #e5e7eb;
      background: #fff; font-size: 0.8rem; font-weight: 500; color: #374151;
      margin: 0 0.3rem;
    }

    /* ── Scroll reveal ── */
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── Step connector ── */
    .step-connector { position: absolute; top: 2rem; left: calc(12.5% + 2rem); right: calc(12.5% + 2rem); height: 1px; background: linear-gradient(90deg, transparent, #e0eaff, #c7d7fe, #e0eaff, transparent); }

    /* ── Mobile menu ── */
    #mobile-menu { display: none; }
    #mobile-menu.open { display: block; }

    /* ── Underline accent ── */
    .underline-brand {
      position: relative; display: inline-block;
    }
    .underline-brand::after {
      content: ''; position: absolute; bottom: 2px; left: 0;
      width: 100%; height: 3px;
      background: linear-gradient(90deg,#6366f1,#a855f7);
      border-radius: 2px;
    }

    /* ── Form ── */
    .form-input {
      width: 100%; background: #f9fafb; border: 1.5px solid #e5e7eb;
      border-radius: 10px; padding: 0.75rem 1rem;
      font-size: 0.875rem; font-family: 'Inter',sans-serif; color: #111827;
      transition: border-color 0.2s, box-shadow 0.2s; outline: none;
    }
    .form-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); background: #fff; }
    .form-input::placeholder { color: #9ca3af; }

    /* ── FAQ ── */
    .faq-body { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
    .faq-body.open { max-height: 500px; }

    /* ── CRO strip ── */
    .cro-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px; padding: 1.25rem;
    }

    /* ── Pricing ── */
    .pricing-card {
      background: #fff; border: 1.5px solid #f3f4f6;
      border-radius: 16px; padding: 1.75rem;
      display: flex; flex-direction: column;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    }
    .pricing-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(99,102,241,0.09); }
    .pricing-card.featured {
      border-color: #6366f1;
      background: linear-gradient(160deg, #f0f4ff 0%, #fdf4ff 100%);
      box-shadow: 0 0 0 1px #6366f1, 0 12px 36px rgba(99,102,241,0.14);
    }

    /* ── Glow orbs ── */
    .orb {
      position: absolute; border-radius: 50%;
      filter: blur(80px); pointer-events: none; opacity: 0.55;
    }
  </style>
</head>
<body class="antialiased">
  ${Navbar()}
  <main>${children}</main>
  ${Footer()}
  <script>
    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    }
    // Scroll reveal
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  </script>
</body>
</html>
`

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => `
<nav id="navbar">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-center justify-between py-4">
      <a href="/" class="flex items-center gap-2.5 group">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
            <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2.2" stroke-linecap="round" opacity="0.55"/>
          </svg>
        </div>
        <span class="font-display font-bold text-lg text-white tracking-tight">Obsidian<span class="grad"> Digital</span></span>
      </a>

      <div class="hidden md:flex items-center gap-7">
        <a href="/" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/#services" class="nav-link">Services</a>
        <a href="/#pricing" class="nav-link">Pricing</a>
        <a href="/contact" class="nav-link">Contact</a>
      </div>

      <div class="hidden md:block">
        <a href="/contact" class="btn-primary px-5 py-2.5 text-sm">Get a Free Quote <i class="fas fa-arrow-right text-xs"></i></a>
      </div>

      <button id="hamburger" class="md:hidden flex flex-col gap-[5px] p-2" aria-label="Menu">
        <span class="block w-6 h-[2px] bg-white rounded-full"></span>
        <span class="block w-6 h-[2px] bg-white rounded-full"></span>
        <span class="block w-4 h-[2px] bg-white rounded-full"></span>
      </button>
    </div>
  </div>
  <div id="mobile-menu" style="background:rgba(7,7,15,0.97);backdrop-filter:blur(18px);border-top:1px solid rgba(255,255,255,0.05);">
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
      <a href="/" class="nav-link py-1">Home</a>
      <a href="/about" class="nav-link py-1">About</a>
      <a href="/#services" class="nav-link py-1">Services</a>
      <a href="/#pricing" class="nav-link py-1">Pricing</a>
      <a href="/contact" class="nav-link py-1">Contact</a>
      <a href="/contact" class="btn-primary px-5 py-3 text-sm text-center mt-2">Get a Free Quote</a>
    </div>
  </div>
</nav>
`

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => `
<footer class="section-dark border-t border-white/5">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-16">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/6">
      <div class="md:col-span-5">
        <a href="/" class="flex items-center gap-2.5 mb-5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
              <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2.2" stroke-linecap="round" opacity="0.55"/>
            </svg>
          </div>
          <span class="font-display font-bold text-lg text-white tracking-tight">Obsidian<span class="grad"> Digital</span></span>
        </a>
        <p class="text-white/35 text-sm leading-relaxed max-w-xs mb-6">Clean, fast, affordable websites for small businesses across Ipswich and the UK. Built properly. Priced fairly.</p>
        <div class="flex gap-2">
          ${['fab fa-instagram','fab fa-linkedin-in','fab fa-twitter','fab fa-facebook-f'].map(icon => `
            <a href="#" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-white/35 hover:text-white transition-all text-xs">
              <i class="${icon}"></i>
            </a>
          `).join('')}
        </div>
      </div>

      <div class="md:col-span-3">
        <p class="text-white/30 text-xs font-semibold uppercase tracking-widest mb-5">Services</p>
        <ul class="space-y-2.5">
          ${['Static Website Design','Mobile-First Builds','Conversion Rate Optimisation','SEO Foundations','Content & Copywriting','Ongoing Support'].map(s =>
            `<li><a href="/#services" class="text-white/40 hover:text-white text-sm transition-colors">${s}</a></li>`
          ).join('')}
        </ul>
      </div>

      <div class="md:col-span-4">
        <p class="text-white/30 text-xs font-semibold uppercase tracking-widest mb-5">Company</p>
        <ul class="space-y-2.5 mb-7">
          ${[['About Us','/about'],['Our Work','/#work'],['Contact','/contact'],['Privacy Policy','#']].map(([l,h]) =>
            `<li><a href="${h}" class="text-white/40 hover:text-white text-sm transition-colors">${l}</a></li>`
          ).join('')}
        </ul>
        <div class="bg-white/4 border border-white/6 rounded-xl p-4 space-y-2">
          <p class="text-white/35 text-xs flex items-center gap-2.5"><i class="fas fa-location-dot text-brand-400 w-3"></i> Ipswich, Suffolk</p>
          <p class="text-white/35 text-xs flex items-center gap-2.5"><i class="fas fa-phone text-brand-400 w-3"></i> 07518 009604</p>
          <p class="text-white/35 text-xs flex items-center gap-2.5"><i class="fas fa-envelope text-brand-400 w-3"></i> riaz.darwinboyd@gmail.com</p>
        </div>
      </div>
    </div>
    <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-white/20 text-xs">© 2025 Obsidian Digital. All rights reserved.</p>
      <p class="text-white/20 text-xs">Proudly built in <span class="text-brand-400/60">Ipswich, Suffolk</span> 🏴󠁧󠁢󠁥󠁮󠁧󠁿</p>
    </div>
  </div>
</footer>
`

// ═══════════════════════════════════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════════════
const HomePage = () => `

<!-- ── HERO ──────────────────────────────────────────────────────────────── -->
<section class="hero-bg relative overflow-hidden" style="min-height:100svh;display:flex;align-items:center;">
  <!-- Orbs -->
  <div class="orb w-[500px] h-[500px] bg-brand-600/20 top-[-80px] right-[-60px]"></div>
  <div class="orb w-[380px] h-[380px] bg-violet-600/15 bottom-[-60px] left-[-40px]"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20 relative z-10">
    <div class="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

      <!-- Copy -->
      <div>
        <div class="pill pill-dark mb-8">
          <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          Based in Ipswich · Now taking on clients
        </div>

        <h1 class="font-display font-extrabold text-white leading-[1.06] tracking-tight mb-6"
            style="font-size:clamp(2.6rem,5.5vw,4.2rem);">
          A website that gets<br/>your business<br/><span class="grad">more customers</span>
        </h1>

        <p class="text-white/55 text-lg leading-relaxed mb-3 max-w-lg" style="font-weight:400;">
          We build clean, fast, mobile-first static websites for local businesses — and we design every page to <em class="text-white/75 not-italic">convert visitors into enquiries</em>, not just look pretty.
        </p>
        <p class="text-white/35 text-sm mb-10">Barbers · Restaurants · Tradesmen · Photographers · Freelancers · Local shops</p>

        <div class="flex flex-wrap gap-3 mb-11">
          <a href="/contact" class="btn-primary px-7 py-3.5 text-sm">
            Get a Free Quote <i class="fas fa-arrow-right text-xs"></i>
          </a>
          <a href="/#services" class="btn-outline px-7 py-3.5 text-sm">
            See What We Offer
          </a>
        </div>

        <div class="flex flex-wrap gap-x-6 gap-y-2.5">
          ${['Built from scratch — no templates','Fixed transparent pricing','Delivered in 1–2 weeks','Designed to convert'].map(t => `
            <span class="flex items-center gap-2 text-white/40 text-xs font-medium">
              <i class="fas fa-check text-brand-400 text-[10px]"></i>${t}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Right: mock browser card -->
      <div class="hidden lg:block relative">
        <div class="relative" style="animation:float 6s ease-in-out infinite;">
          <!-- Browser frame -->
          <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl" style="box-shadow:0 0 60px rgba(99,102,241,0.18);">
            <div class="bg-gray-800/70 px-4 py-3 flex items-center gap-2 border-b border-white/6">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400/60"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                <div class="w-3 h-3 rounded-full bg-green-400/60"></div>
              </div>
              <div class="flex-1 mx-3 bg-gray-700/50 rounded px-3 py-1 text-xs text-gray-400 text-center">yourbusiness.co.uk</div>
            </div>
            <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800/80 space-y-4">
              <!-- Nav mock -->
              <div class="flex items-center justify-between mb-1">
                <div class="h-3 w-20 bg-brand-500/50 rounded-full"></div>
                <div class="flex gap-2">
                  <div class="h-2 w-8 bg-white/12 rounded-full"></div>
                  <div class="h-2 w-8 bg-white/12 rounded-full"></div>
                  <div class="h-2 w-8 bg-white/12 rounded-full"></div>
                  <div class="h-7 w-20 bg-brand-500/60 rounded-lg"></div>
                </div>
              </div>
              <!-- Hero mock -->
              <div class="py-3 space-y-2">
                <div class="h-5 bg-white/22 rounded-lg w-4/5"></div>
                <div class="h-5 bg-brand-400/35 rounded-lg w-3/5"></div>
                <div class="h-3 bg-white/10 rounded w-full mt-2"></div>
                <div class="h-3 bg-white/10 rounded w-5/6"></div>
                <div class="flex gap-2 pt-1">
                  <div class="h-9 bg-brand-500/70 rounded-xl w-28"></div>
                  <div class="h-9 bg-white/8 rounded-xl w-24 border border-white/10"></div>
                </div>
              </div>
              <!-- CRO strip mock -->
              <div class="bg-brand-500/10 border border-brand-400/20 rounded-xl p-3 flex items-center justify-between">
                <div class="space-y-1">
                  <div class="h-2.5 bg-brand-300/40 rounded w-28"></div>
                  <div class="h-2 bg-white/12 rounded w-20"></div>
                </div>
                <div class="h-8 bg-brand-500/60 rounded-lg w-20"></div>
              </div>
              <!-- Cards mock -->
              <div class="grid grid-cols-3 gap-2">
                ${['bg-brand-500/20','bg-violet-500/18','bg-pink-500/15'].map(c => `
                  <div class="${c} border border-white/6 rounded-xl p-3 space-y-1.5">
                    <div class="w-5 h-5 bg-white/18 rounded-lg"></div>
                    <div class="h-1.5 bg-white/18 rounded w-full"></div>
                    <div class="h-1.5 bg-white/10 rounded w-2/3"></div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Floating badges -->
          <div class="absolute -top-4 -left-8 bg-white rounded-xl px-3.5 py-2.5 shadow-xl border border-gray-100">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-arrow-trend-up text-green-600 text-xs"></i>
              </div>
              <div>
                <p class="font-display font-bold text-gray-900 text-xs leading-none">More enquiries</p>
                <p class="text-gray-400 text-[10px] mt-0.5">CRO-built pages</p>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-4 -right-6 bg-white rounded-xl px-3.5 py-2.5 shadow-xl border border-gray-100">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-bolt text-brand-600 text-xs"></i>
              </div>
              <div>
                <p class="font-display font-bold text-gray-900 text-xs leading-none">Loads fast</p>
                <p class="text-gray-400 text-[10px] mt-0.5">Every time</p>
              </div>
            </div>
          </div>
        </div>

        <style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}</style>
      </div>
    </div>
  </div>

  <!-- Bottom wave into white -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full block">
      <path d="M0 72L60 62C120 52 240 32 360 28C480 24 600 34 720 40C840 46 960 46 1080 40C1200 34 1320 20 1380 14L1440 8V72H0Z" fill="#ffffff"/>
    </svg>
  </div>
</section>

<!-- ── TICKER — business types ─────────────────────────────────────────── -->
<section class="section-white py-12 border-b border-gray-100 overflow-hidden">
  <p class="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-7">Perfect for businesses like these</p>
  <div class="relative overflow-hidden">
    <div class="ticker-track">
      ${[
        {icon:'fa-scissors',    label:'Barbers'},
        {icon:'fa-utensils',    label:'Restaurants'},
        {icon:'fa-hard-hat',   label:'Tradesmen'},
        {icon:'fa-camera',     label:'Photographers'},
        {icon:'fa-store',      label:'Local Shops'},
        {icon:'fa-paint-roller',label:'Decorators'},
        {icon:'fa-briefcase',  label:'Freelancers'},
        {icon:'fa-music',      label:'Creatives'},
        {icon:'fa-dumbbell',   label:'Personal Trainers'},
        {icon:'fa-mug-hot',    label:'Cafés'},
      ].concat([
        {icon:'fa-scissors',    label:'Barbers'},
        {icon:'fa-utensils',    label:'Restaurants'},
        {icon:'fa-hard-hat',   label:'Tradesmen'},
        {icon:'fa-camera',     label:'Photographers'},
        {icon:'fa-store',      label:'Local Shops'},
        {icon:'fa-paint-roller',label:'Decorators'},
        {icon:'fa-briefcase',  label:'Freelancers'},
        {icon:'fa-music',      label:'Creatives'},
        {icon:'fa-dumbbell',   label:'Personal Trainers'},
        {icon:'fa-mug-hot',    label:'Cafés'},
      ]).map(b => `
        <div class="biz-chip">
          <i class="fas ${b.icon} text-brand-500 text-xs"></i>${b.label}
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ── SERVICES ────────────────────────────────────────────────────────── -->
<section id="services" class="section-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">

    <!-- Header — split layout -->
    <div class="grid lg:grid-cols-2 gap-10 items-end mb-16 reveal">
      <div>
        <span class="pill pill-light mb-5">What We Offer</span>
        <h2 class="font-display font-extrabold text-gray-900 tracking-tight leading-tight"
            style="font-size:clamp(1.9rem,3.8vw,3rem);">
          Everything you need<br/>to <span class="underline-brand">look the part</span> online
        </h2>
      </div>
      <p class="text-gray-500 leading-relaxed lg:pb-1.5">
        We keep things focused. No bloated packages, no services we can't deliver well — just exactly what a small business needs to build a strong, converting online presence.
      </p>
    </div>

    <!-- 6 cards, card 3 featured (CRO) -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${[
        {
          num:'01', icon:'fa-pen-ruler',
          title:'Custom Website Design',
          desc:'Every website is designed from scratch around your business — your colours, your voice, your goals. No generic templates that look like everyone else\'s site.',
          tags:['Bespoke layouts','On-brand visuals','Clean & modern'],
          featured:false,
        },
        {
          num:'02', icon:'fa-mobile-screen',
          title:'Mobile-First Development',
          desc:'Most of your customers will find you on their phone. Every site looks and works perfectly on all screen sizes — phones, tablets, and desktops.',
          tags:['Fully responsive','Touch-friendly','Fast on mobile'],
          featured:false,
        },
        {
          num:'03', icon:'fa-arrow-trend-up',
          title:'Conversion Rate Optimisation',
          desc:'A pretty website that doesn\'t convert is just expensive wallpaper. We design every page with a clear purpose — guiding visitors towards picking up the phone or filling in a form.',
          tags:['Clear calls-to-action','Built to convert','Enquiry-focused'],
          featured:true,
        },
        {
          num:'04', icon:'fa-bolt',
          title:'Fast & Lightweight Builds',
          desc:'Static websites have no heavy databases or slow plugins — just clean code that loads in a flash. Your visitors (and Google) will both notice the difference.',
          tags:['Quick load times','No bloat','Smooth UX'],
          featured:false,
        },
        {
          num:'05', icon:'fa-magnifying-glass',
          title:'SEO Foundations',
          desc:'Every site is set up to be found. Proper page structure, meta tags, fast loading, mobile optimisation — the groundwork so you\'re ready to rank from day one.',
          tags:['Meta & titles','Structured content','Google-ready'],
          featured:false,
        },
        {
          num:'06', icon:'fa-file-lines',
          title:'Content & Copywriting',
          desc:'Not sure what to write? We can help. Whether you need a steer or want us to write everything, we\'ll make sure your site says the right things to the right people.',
          tags:['Clear messaging','Engaging copy','Conversion-focused'],
          featured:false,
        },
      ].map(s => `
        <div class="service-card${s.featured ? ' featured' : ''} reveal">
          <div class="flex items-start justify-between mb-5">
            <div class="w-11 h-11 ${s.featured ? 'bg-brand-600' : 'bg-gray-100'} rounded-xl flex items-center justify-center">
              <i class="fas ${s.icon} text-base ${s.featured ? 'text-white' : 'text-gray-600'}"></i>
            </div>
            <span class="font-display font-extrabold text-3xl ${s.featured ? 'text-brand-200' : 'text-gray-100'}" style="line-height:1;">${s.num}</span>
          </div>
          <h3 class="font-display font-bold text-lg text-gray-900 mb-2.5">${s.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-4">${s.desc}</p>
          <div class="flex flex-wrap gap-1.5">
            ${s.tags.map(t => `<span class="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">${t}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Transparency box -->
    <div class="mt-10 flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 reveal">
      <div class="w-9 h-9 bg-brand-50 border border-brand-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
        <i class="fas fa-circle-info text-brand-500 text-sm"></i>
      </div>
      <div>
        <h4 class="font-display font-bold text-gray-900 mb-1.5">Honest about what we do</h4>
        <p class="text-gray-500 text-sm leading-relaxed">
          We specialise in <strong class="text-gray-700">static websites</strong> — which means we don't currently build complex web applications, customer login portals, or database-driven platforms. What we <em>do</em> build, we build really well. If you need a clean, professional, <strong class="text-gray-700">conversion-focused</strong> online presence that loads fast and looks great, you're in exactly the right place.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── CRO CALLOUT ────────────────────────────────────────────────────── -->
<section class="hero-bg py-24 relative overflow-hidden">
  <div class="orb w-96 h-96 bg-brand-600/20 top-[-60px] right-[-40px]"></div>
  <div class="orb w-72 h-72 bg-violet-600/15 bottom-[-40px] left-[10%]"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div class="reveal">
        <span class="pill pill-dark mb-6">Why It Matters</span>
        <h2 class="font-display font-extrabold text-white leading-tight tracking-tight mb-5"
            style="font-size:clamp(1.8rem,3.5vw,2.8rem);">
          A website that <span class="grad-2">doesn't convert</span><br/>is just expensive decoration
        </h2>
        <p class="text-white/50 leading-relaxed mb-5" style="font-size:0.95rem;">
          Most websites are built to look good in a screenshot. We build sites with conversion rate optimisation baked in from day one — clear calls-to-action, trust signals in the right places, and layouts that guide a visitor naturally towards contacting you.
        </p>
        <p class="text-white/35 text-sm leading-relaxed">
          Every layout decision, every headline, every button placement — all made with one question: <em class="text-white/55 not-italic">"Does this help the visitor take the next step?"</em>
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 reveal">
        ${[
          {icon:'fa-bullseye',       title:'Clear CTAs',         desc:'Every page has one obvious next step. No confusion, no dead ends.'},
          {icon:'fa-shield-halved',  title:'Trust Signals',      desc:'Phone numbers, location, and credibility cues placed where they have maximum impact.'},
          {icon:'fa-mobile-screen',  title:'Mobile UX',          desc:'Optimised for how real people actually browse — thumb-first on a phone.'},
          {icon:'fa-gauge-high',     title:'Speed = More Leads', desc:'Every extra second of load time costs you conversions. Static sites load instantly.'},
        ].map(c => `
          <div class="cro-card">
            <div class="w-8 h-8 bg-brand-500/15 rounded-lg flex items-center justify-center mb-3">
              <i class="fas ${c.icon} text-brand-300 text-sm"></i>
            </div>
            <p class="font-display font-bold text-white text-sm mb-1.5">${c.title}</p>
            <p class="text-white/40 text-xs leading-relaxed">${c.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── HOW IT WORKS ───────────────────────────────────────────────────── -->
<section class="section-gray py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-16 reveal">
      <span class="pill pill-light mb-5">How It Works</span>
      <h2 class="font-display font-extrabold text-gray-900 tracking-tight mb-4"
          style="font-size:clamp(1.9rem,3.8vw,3rem);">Simple process. <span class="grad">Great results.</span></h2>
      <p class="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">No confusing briefs or lengthy onboarding. We keep it simple so you can focus on running your business.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      <div class="step-connector hidden lg:block"></div>
      ${[
        {step:'01',icon:'fa-comments',  title:'Chat With Us',  desc:'Tell us about your business and what you need. No jargon, no pressure — just a real conversation.'},
        {step:'02',icon:'fa-pen-ruler', title:'We Design It',  desc:'We build a design around your brand and goals. You review it; we refine until it\'s exactly right.'},
        {step:'03',icon:'fa-code',      title:'We Build It',   desc:'Clean code, fast performance, tested on every device. CRO principles applied throughout.'},
        {step:'04',icon:'fa-rocket',    title:'It Goes Live',  desc:'Your site launches. We hand over properly and stay on hand for any follow-up questions.'},
      ].map((p,i) => `
        <div class="relative z-10 text-center reveal" style="transition-delay:${i*80}ms">
          <div class="relative inline-flex mb-5">
            <div class="w-16 h-16 bg-white border-2 border-brand-100 rounded-2xl flex items-center justify-center shadow-sm">
              <i class="fas ${p.icon} text-brand-600 text-lg"></i>
            </div>
            <span class="absolute -top-2.5 -right-2.5 w-6 h-6 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center font-display">${p.step}</span>
          </div>
          <h3 class="font-display font-bold text-gray-900 mb-2 text-base">${p.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">${p.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ── PRICING ─────────────────────────────────────────────────────────── -->
<section id="pricing" class="section-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-14 reveal">
      <span class="pill pill-light mb-5">Pricing</span>
      <h2 class="font-display font-extrabold text-gray-900 tracking-tight mb-3"
          style="font-size:clamp(1.9rem,3.8vw,3rem);">Straightforward prices.<br/><span class="grad">No surprises.</span></h2>
      <p class="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">We agree the cost before we start. What we quote is what you pay.</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${[
        {range:'£100–£300',  label:'Starter',       desc:'Single page or landing page. Great for getting something professional live quickly.',
         items:['1 page','Mobile responsive','SEO setup','Contact section','~1 week delivery'], featured:false},
        {range:'£300–£700',  label:'Small Business', desc:'A proper multi-page site for a local business. Most of our clients sit here.',
         items:['3–5 pages','Custom design','Mobile-first build','CRO-focused layouts','1–2 week delivery'], featured:true},
        {range:'£700–£1,500',label:'Professional',  desc:'Larger sites with more pages, copywriting support, or a more involved design.',
         items:['6+ pages','Copywriting help','Advanced CRO','Ongoing support plan','2–3 week delivery'], featured:false},
        {range:'£1,500+',    label:'Custom',         desc:'For more complex projects or ongoing relationships. Let\'s have a chat.',
         items:['Bespoke scope','All services','Priority support','Retainer option','Timeline agreed'], featured:false},
      ].map(p => `
        <div class="pricing-card${p.featured ? ' featured' : ''} reveal">
          ${p.featured ? '<div class="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">Most Popular</div>' : '<div class="mb-7"></div>'}
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">${p.label}</p>
          <p class="font-display font-extrabold text-gray-900 mb-3" style="font-size:1.55rem;letter-spacing:-0.02em;">${p.range}</p>
          <p class="text-gray-500 text-xs leading-relaxed mb-5 flex-1">${p.desc}</p>
          <ul class="space-y-2 mb-6">
            ${p.items.map(item => `
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <i class="fas fa-check text-brand-500 text-[10px] w-3 flex-shrink-0"></i>${item}
              </li>
            `).join('')}
          </ul>
          <a href="/contact" class="${p.featured ? 'btn-primary' : 'btn-outline-light'} px-5 py-2.5 text-sm justify-center w-full">
            Get a Quote
          </a>
        </div>
      `).join('')}
    </div>
    <p class="text-center text-gray-400 text-xs mt-8">Not sure which fits? Just describe your project and we'll work it out together.</p>
  </div>
</section>

<!-- ── WHY STATIC ─────────────────────────────────────────────────────── -->
<section class="section-gray py-20 border-y border-gray-100">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-5 gap-12 items-center">
      <div class="lg:col-span-2 reveal">
        <span class="pill pill-light mb-5">The Tech Side</span>
        <h2 class="font-display font-extrabold text-gray-900 tracking-tight mb-4"
            style="font-size:clamp(1.6rem,3vw,2.3rem);">Why static websites are the smart choice</h2>
        <p class="text-gray-500 text-sm leading-relaxed">Most small businesses don't need a complex CMS. A static website gives you everything you actually need — and none of what you don't.</p>
      </div>
      <div class="lg:col-span-3 grid sm:grid-cols-2 gap-4">
        ${[
          {icon:'fa-bolt',         title:'Loads Instantly',   desc:'No server processing or database queries — served straight to the visitor. Faster load times directly improve your conversion rate.'},
          {icon:'fa-shield-halved',title:'Inherently Secure', desc:'No login pages, no plugins to exploit, no CMS vulnerabilities. Static sites are far harder to hack.'},
          {icon:'fa-sterling-sign',title:'Low Running Costs', desc:'Static sites can be hosted for very little — sometimes free. No monthly platform fees eating into your margin.'},
          {icon:'fa-face-smile',   title:'Hassle Free',       desc:'No software to update, no plugins to maintain, no surprise breakages. It just works.'},
        ].map((s,i) => `
          <div class="bg-white border border-gray-200 rounded-xl p-5 reveal" style="transition-delay:${i*80}ms">
            <div class="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center mb-3">
              <i class="fas ${s.icon} text-brand-600 text-sm"></i>
            </div>
            <p class="font-display font-bold text-gray-900 text-sm mb-1.5">${s.title}</p>
            <p class="text-gray-400 text-xs leading-relaxed">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── PORTFOLIO ──────────────────────────────────────────────────────── -->
<section id="work" class="section-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal">
      <div>
        <span class="pill pill-light mb-5">Our Work</span>
        <h2 class="font-display font-extrabold text-gray-900 tracking-tight"
            style="font-size:clamp(1.9rem,3.8vw,3rem);">Recent <span class="grad">Projects</span></h2>
      </div>
      <a href="/contact" class="btn-outline-light px-6 py-2.5 text-sm self-start md:self-auto">
        Start Your Project <i class="fas fa-arrow-right text-xs"></i>
      </a>
    </div>
    <div class="max-w-xl mx-auto reveal">
      <div class="border-2 border-dashed border-brand-200 rounded-2xl p-14 text-center">
        <div class="w-14 h-14 mx-auto bg-brand-50 rounded-xl flex items-center justify-center mb-5">
          <i class="fas fa-images text-brand-400 text-xl"></i>
        </div>
        <h3 class="font-display font-bold text-xl text-gray-900 mb-3">Portfolio Coming Soon</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-6">We've just launched and are actively taking on our first clients. Check back here soon — this section will showcase real websites we've built for real businesses.</p>
        <a href="/contact" class="btn-primary px-6 py-3 text-sm">
          Be Our First Client <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ── REVIEWS ────────────────────────────────────────────────────────── -->
<section class="section-gray py-24 border-y border-gray-100">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="reveal">
        <span class="pill pill-light mb-5">Reviews</span>
        <h2 class="font-display font-extrabold text-gray-900 tracking-tight mb-4"
            style="font-size:clamp(1.9rem,3.8vw,3rem);">
          Client reviews<br/><span class="text-gray-300">coming soon</span>
        </h2>
        <p class="text-gray-500 leading-relaxed mb-7">We're brand new and building our reputation one client at a time. Every project gets everything we've got — and if we do a great job, we'd love for you to tell people.</p>
        <a href="/contact" class="btn-dark px-6 py-3 text-sm">Work With Us <i class="fas fa-arrow-right text-xs"></i></a>
      </div>
      <div class="reveal">
        <div class="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div class="flex justify-center gap-2 mb-5">
            ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-gray-200 text-2xl"></i>').join('')}
          </div>
          <h3 class="font-display font-bold text-xl text-gray-900 mb-3">Your Review Could Be First</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Get in touch today and experience what it's like to work with someone who genuinely cares about your results.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── FINAL CTA ───────────────────────────────────────────────────────── -->
<section class="hero-bg py-24 lg:py-32 relative overflow-hidden">
  <div class="orb w-96 h-96 bg-brand-600/20 top-[-80px] right-[5%]"></div>
  <div class="orb w-80 h-80 bg-violet-600/15 bottom-[-60px] left-[5%]"></div>
  <div class="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10 reveal">
    <span class="pill pill-dark mb-7">Ready When You Are</span>
    <h2 class="font-display font-extrabold text-white tracking-tight mb-6"
        style="font-size:clamp(2rem,5vw,3.8rem);">
      Ready to get your business<br/><span class="grad">online properly?</span>
    </h2>
    <p class="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
      Free quote, no obligation, no hard sell. We'll listen to what you need, be straight about cost, and deliver something you're proud to share.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/contact" class="btn-primary px-8 py-4 text-base">
        Get a Free Quote <i class="fas fa-arrow-right text-sm"></i>
      </a>
      <a href="tel:07518009604" class="btn-outline px-8 py-4 text-base">
        <i class="fas fa-phone text-brand-300 text-sm"></i> 07518 009604
      </a>
    </div>
  </div>
</section>
`

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const AboutPage = () => `

<!-- HERO -->
<section class="hero-bg relative overflow-hidden pt-36 pb-28">
  <div class="orb w-[500px] h-[500px] bg-brand-600/18 top-[-80px] right-[-60px]"></div>
  <div class="orb w-72 h-72 bg-violet-600/12 bottom-[-40px] left-[10%]"></div>
  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
    <div class="max-w-3xl">
      <span class="pill pill-dark mb-8">About Obsidian Digital</span>
      <h1 class="font-display font-extrabold text-white tracking-tight leading-tight mb-6"
          style="font-size:clamp(2.4rem,5.5vw,4rem);">
        We started because<br/><span class="grad">better was possible</span>
      </h1>
      <p class="text-white/50 text-xl leading-relaxed max-w-xl">
        Too many small businesses are paying too much for websites that look average and convert nobody. We're here to change that.
      </p>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full block">
      <path d="M0 72L60 62C120 52 240 32 360 28C480 24 600 34 720 40C840 46 960 46 1080 40C1200 34 1320 20 1380 14L1440 8V72H0Z" fill="#ffffff"/>
    </svg>
  </div>
</section>

<!-- STORY -->
<section class="section-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-16 items-start">
      <div class="reveal">
        <span class="pill pill-light mb-6">Our Story</span>
        <h2 class="font-display font-extrabold text-gray-900 tracking-tight leading-tight mb-7"
            style="font-size:clamp(1.9rem,3.8vw,3rem);">
          Honest work. <span class="grad">Fair prices.</span><br/>Real results.
        </h2>
        <div class="space-y-4 text-gray-500 leading-relaxed text-[0.95rem]">
          <p>Obsidian Digital was founded in 2025 by Riaz Darwin-Boyd, a Computer Science student from Ipswich who noticed something frustrating: local businesses were either paying thousands to big agencies for something they didn't need, or settling for cheap template sites that looked like everyone else's.</p>
          <p>There's a real gap in the middle — businesses that just want a <em class="text-gray-700 not-italic font-medium">genuinely good website</em>, without the big agency price tag and without the template compromise. That's exactly where we sit.</p>
          <p>We build custom static websites — clean, fast, mobile-first, and designed with conversion rate optimisation in mind from the start. Because a website that doesn't turn visitors into enquiries isn't really doing its job.</p>
          <p>We're new, and we're proud of that. It means we're genuinely invested in every project. You'll work directly with Riaz, get straight answers, and end up with something you're actually proud to share.</p>
        </div>
        <a href="/contact" class="btn-primary px-6 py-3.5 text-sm mt-8 inline-flex">Let's Talk <i class="fas fa-arrow-right text-xs"></i></a>
      </div>

      <div class="reveal">
        <!-- Quote card -->
        <div class="bg-gray-900 rounded-2xl p-7 mb-5 relative overflow-hidden border-l-4 border-brand-500">
          <p class="text-white/60 text-sm leading-relaxed mb-5 italic">
            "I wanted to build websites that genuinely make a difference to someone's business — not just look good in a screenshot. Fast, clean, built to convert. That's the standard I hold every project to."
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-brand-500 to-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-user text-white text-xs"></i>
            </div>
            <div>
              <p class="font-display font-bold text-white text-sm">Riaz Darwin-Boyd</p>
              <p class="text-white/35 text-xs">Founder, Obsidian Digital</p>
            </div>
          </div>
        </div>
        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-4">
          ${[
            {val:'2025', sub:'Founded',        icon:'fa-calendar',  light:true},
            {val:'1–2wk',sub:'Avg. delivery',  icon:'fa-clock',     light:false},
            {val:'Static',sub:'Our speciality',icon:'fa-globe',     light:false},
            {val:'100%', sub:'Bespoke builds', icon:'fa-pen-ruler', light:true},
          ].map(s => `
            <div class="${s.light ? 'bg-brand-50 border-brand-100' : 'bg-gray-50 border-gray-200'} border rounded-xl p-5 flex flex-col gap-2">
              <i class="fas ${s.icon} text-brand-400 text-sm"></i>
              <p class="font-display font-extrabold text-gray-900 text-2xl">${s.val}</p>
              <p class="text-gray-400 text-xs">${s.sub}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="section-gray py-24 border-y border-gray-100">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-14 reveal">
      <span class="pill pill-light mb-5">What We Stand For</span>
      <h2 class="font-display font-extrabold text-gray-900 tracking-tight"
          style="font-size:clamp(1.9rem,3.8vw,3rem);">The way we <span class="grad">work</span></h2>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      ${[
        {icon:'fa-handshake',    color:'bg-brand-50 text-brand-600',   title:'Straight Talking',    desc:'We tell you what things actually cost, what\'s realistic, and what we think is right — no fluff, no upselling.'},
        {icon:'fa-pen-ruler',    color:'bg-violet-50 text-violet-600', title:'Proper Craft',         desc:'Clean code, considered design, tested properly. We\'re not cutting corners to turn things around quickly.'},
        {icon:'fa-person-running',color:'bg-pink-50 text-pink-600',   title:'Quick & Responsive',  desc:'We reply quickly and keep projects moving. No waiting days for a reply or weeks for a simple update.'},
        {icon:'fa-bullseye',     color:'bg-green-50 text-green-600',  title:'Built to Convert',     desc:'Every layout decision is made with one goal: helping your business attract more customers online.'},
      ].map((v,i) => `
        <div class="bg-white border border-gray-200 rounded-2xl p-6 lift reveal" style="transition-delay:${i*80}ms">
          <div class="w-11 h-11 ${v.color} rounded-xl flex items-center justify-center mb-4">
            <i class="fas ${v.icon} text-lg"></i>
          </div>
          <h3 class="font-display font-bold text-gray-900 mb-2">${v.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">${v.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- FOUNDER -->
<section class="section-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-12 reveal">
      <span class="pill pill-light mb-5">Who You're Working With</span>
      <h2 class="font-display font-extrabold text-gray-900 tracking-tight"
          style="font-size:clamp(1.9rem,3.8vw,3rem);">The person behind <span class="grad">your project</span></h2>
    </div>
    <div class="max-w-3xl mx-auto reveal">
      <div class="bg-white border-2 border-gray-100 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start shadow-sm">
        <div class="flex-shrink-0">
          <div class="w-24 h-24 bg-gradient-to-br from-brand-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
            <i class="fas fa-laptop-code text-white text-3xl"></i>
          </div>
        </div>
        <div>
          <h3 class="font-display font-bold text-2xl text-gray-900 mb-0.5">Riaz Darwin-Boyd</h3>
          <p class="text-brand-600 font-semibold text-sm mb-5">Founder & Web Designer, Obsidian Digital</p>
          <div class="space-y-3 text-gray-500 text-sm leading-relaxed mb-5">
            <p>I'm a Computer Science student from Ipswich with a genuine passion for clean design and well-built websites. I started Obsidian Digital because I wanted to offer something I felt was missing locally — websites that genuinely look and work great, without the inflated agency prices.</p>
            <p>When you work with Obsidian Digital, you're working with me directly. I take the time to understand your business properly, I'm honest about what I can deliver, and I'll build you something that actually gets you more enquiries — not just something that looks nice.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            ${['Web Design','HTML & CSS','JavaScript','Mobile-First','CRO','SEO Basics','Clean Code'].map(s =>
              `<span class="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">${s}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHY US -->
<section class="section-gray py-24 border-t border-gray-100">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="reveal">
        <span class="pill pill-light mb-6">Why Obsidian Digital</span>
        <h2 class="font-display font-extrabold text-gray-900 tracking-tight mb-8"
            style="font-size:clamp(1.9rem,3.8vw,3rem);">What makes us <span class="grad">different</span></h2>
        <div class="space-y-4">
          ${[
            'You speak to Riaz directly — not an account manager or a chatbot. Real communication throughout.',
            'Transparent, fixed pricing. We agree the cost before starting and that\'s what you pay. No surprises.',
            'Every site is built with conversion rate optimisation from the start. Pretty isn\'t enough.',
            'Every site is built from scratch around your business. No templates, no shortcuts.',
            'Fast turnaround — most sites are live within 1–2 weeks of receiving your content.',
            'Mobile-first as standard. Your site will look just as good on a phone as a desktop.',
            'Because we\'re new, every client genuinely matters. You won\'t be deprioritised or forgotten about.',
          ].map(item => `
            <div class="flex items-start gap-3.5">
              <div class="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fas fa-check text-brand-600 text-[10px]"></i>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed">${item}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 reveal">
        ${[
          {label:'Average delivery',  value:'1–2 wks', icon:'fa-clock',        light:false},
          {label:'Satisfaction focus',value:'100%',    icon:'fa-star',         light:true},
          {label:'Our speciality',    value:'Static',  icon:'fa-globe',        light:false},
          {label:'Founded in Ipswich',value:'2025',    icon:'fa-location-dot', light:false},
        ].map(s => `
          <div class="${s.light ? 'bg-brand-600 border-brand-600' : 'bg-white border-gray-200'} border-2 rounded-xl p-6 flex flex-col gap-3">
            <i class="fas ${s.icon} text-xl ${s.light ? 'text-brand-200' : 'text-gray-400'}"></i>
            <p class="font-display font-extrabold text-2xl ${s.light ? 'text-white' : 'text-gray-900'}">${s.value}</p>
            <p class="text-xs ${s.light ? 'text-brand-200' : 'text-gray-400'}">${s.label}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="hero-bg py-24 relative overflow-hidden">
  <div class="orb w-96 h-96 bg-brand-600/20 top-[-60px] right-[-40px]"></div>
  <div class="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10 reveal">
    <h2 class="font-display font-extrabold text-white tracking-tight mb-6"
        style="font-size:clamp(2rem,4.5vw,3.5rem);">
      Sound like a good fit?<br/><span class="grad">Let's talk.</span>
    </h2>
    <p class="text-white/50 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
      No commitment required. Tell us what you need and we'll give you an honest, no-pressure quote.
    </p>
    <a href="/contact" class="btn-primary px-8 py-4 text-base">
      Get in Touch <i class="fas fa-arrow-right text-sm"></i>
    </a>
  </div>
</section>
`

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const ContactPage = () => `

<!-- HERO -->
<section class="hero-bg relative overflow-hidden pt-36 pb-28">
  <div class="orb w-[480px] h-[480px] bg-brand-600/18 top-[-80px] right-[-60px]"></div>
  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
    <div class="max-w-2xl">
      <div class="pill pill-dark mb-8">
        <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        We reply within 24 hours
      </div>
      <h1 class="font-display font-extrabold text-white tracking-tight leading-tight mb-5"
          style="font-size:clamp(2.4rem,5.5vw,4rem);">
        Let's get your<br/><span class="grad">project started</span>
      </h1>
      <p class="text-white/50 text-lg leading-relaxed">
        Tell us about your business and what you're looking for. We'll come back with an honest quote — no obligation, no hard sell.
      </p>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full block">
      <path d="M0 72L60 62C120 52 240 32 360 28C480 24 600 34 720 40C840 46 960 46 1080 40C1200 34 1320 20 1380 14L1440 8V72H0Z" fill="#f9fafb"/>
    </svg>
  </div>
</section>

<!-- BODY -->
<section class="section-gray py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-5 gap-12 items-start">

      <!-- Sidebar -->
      <div class="lg:col-span-2 space-y-4 reveal">
        <div class="mb-6">
          <h2 class="font-display font-bold text-2xl text-gray-900 mb-2">Get in Touch</h2>
          <p class="text-gray-500 text-sm leading-relaxed">Whether you're ready to go or just exploring your options — we're happy to chat.</p>
        </div>
        ${[
          {icon:'fa-phone',       title:'Phone',    val:'07518 009604',             sub:'Mon – Fri, 9am – 6pm',    href:'tel:07518009604'},
          {icon:'fa-envelope',    title:'Email',    val:'riaz.darwinboyd@gmail.com',sub:'We reply within 24 hours', href:'mailto:riaz.darwinboyd@gmail.com'},
          {icon:'fa-location-dot',title:'Location', val:'Ipswich, Suffolk',         sub:'Serving clients UK-wide',  href:'#'},
        ].map(c => `
          <a href="${c.href}" class="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 lift block">
            <div class="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas ${c.icon} text-brand-600 text-sm"></i>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">${c.title}</p>
              <p class="font-semibold text-gray-900 text-sm">${c.val}</p>
              <p class="text-gray-400 text-xs mt-0.5">${c.sub}</p>
            </div>
          </a>
        `).join('')}

        <div class="bg-white rounded-xl p-5 border border-gray-200">
          <p class="font-display font-bold text-gray-900 text-sm mb-4">What happens next?</p>
          <div class="space-y-3">
            ${[
              'We read your message carefully and reply within 24 hours',
              'We ask any questions needed to understand your project',
              'We send a clear, honest quote — no hidden extras',
              'If you\'re happy, we get started. Simple as that.',
            ].map((s,i) => `
              <div class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-brand-100 text-brand-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${i+1}</span>
                <p class="text-gray-500 text-xs leading-relaxed">${s}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="lg:col-span-3 reveal">
        <div class="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 shadow-sm" id="contact-form-wrapper">
          <h3 class="font-display font-bold text-xl text-gray-900 mb-1">Tell Us About Your Project</h3>
          <p class="text-gray-400 text-sm mb-7">The more detail you give us, the more accurate our quote will be.</p>

          <form id="contact-form" class="space-y-5" onsubmit="handleSubmit(event)">
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">First Name <span class="text-red-400">*</span></label>
                <input type="text" name="firstName" required placeholder="Your first name" class="form-input" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span class="text-red-400">*</span></label>
                <input type="text" name="lastName" required placeholder="Your last name" class="form-input" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span class="text-red-400">*</span></label>
              <input type="email" name="email" required placeholder="you@example.com" class="form-input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <input type="tel" name="phone" placeholder="Optional — but handy for a quick call" class="form-input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Business Name <span class="text-red-400">*</span></label>
              <input type="text" name="company" required placeholder="e.g. Dave's Barbershop, Suffolk Plumbing Co." class="form-input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">What do you need? <span class="text-red-400">*</span></label>
              <select name="service" required class="form-input appearance-none">
                <option value="" disabled selected>Select an option...</option>
                <option value="new-website">Brand new website — I have nothing at the moment</option>
                <option value="redesign">Website redesign — I have a site but it needs improving</option>
                <option value="portfolio">Portfolio or personal website</option>
                <option value="local-business">Local business site (barber, restaurant, tradesman, etc.)</option>
                <option value="landing-page">Single page / landing page</option>
                <option value="other">Something else — I'll explain below</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Approximate Budget <span class="text-gray-400 font-normal text-xs">(helps us tailor our suggestion)</span></label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                ${['£100–£300','£300–£700','£700–£1,500','£1,500+'].map((b,i) => `
                  <label class="cursor-pointer">
                    <input type="radio" name="budget" value="${b}" class="peer sr-only" ${i===1?'checked':''} />
                    <div class="peer-checked:bg-brand-50 peer-checked:border-brand-500 peer-checked:text-brand-700 bg-gray-50 border-2 border-gray-200 rounded-xl px-2 py-3 text-xs font-semibold text-gray-500 text-center transition-all hover:border-brand-300 font-display leading-tight">
                      ${b}
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Tell Us More <span class="text-red-400">*</span></label>
              <textarea name="message" required rows="5" placeholder="Tell us about your business, what you'd like on the site, any pages you need, websites you like the look of — anything that helps."
                class="form-input resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">How did you find us?</label>
              <select name="source" class="form-input appearance-none">
                <option value="">Select an option...</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Someone recommended you</option>
                <option value="local">Locally in Ipswich</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" class="btn-primary w-full px-6 py-4 text-base justify-center">
              Send My Enquiry <i class="fas fa-paper-plane text-sm"></i>
            </button>
            <p class="text-xs text-gray-400 text-center">
              <i class="fas fa-lock mr-1"></i> Your details are safe. We'll never share them with anyone.
            </p>
          </form>

          <div id="success-state" class="hidden text-center py-12">
            <div class="w-16 h-16 mx-auto bg-green-50 border-2 border-green-200 rounded-2xl flex items-center justify-center mb-6">
              <i class="fas fa-check text-green-500 text-2xl"></i>
            </div>
            <h3 class="font-display font-bold text-2xl text-gray-900 mb-3">Message Received!</h3>
            <p class="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              Thanks for getting in touch. We'll review your project and get back to you within 24 hours with an honest quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section-white py-24 border-t border-gray-100">
  <div class="max-w-3xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-12 reveal">
      <span class="pill pill-light mb-5">FAQ</span>
      <h2 class="font-display font-extrabold text-gray-900 tracking-tight mb-3"
          style="font-size:clamp(1.9rem,3.8vw,2.8rem);">Frequently asked <span class="grad">questions</span></h2>
      <p class="text-gray-500 text-sm">Straight answers to the things people usually want to know.</p>
    </div>
    <div class="space-y-3 reveal">
      ${[
        {q:'How much does a website cost?',
         a:'Our pricing is straightforward. Most small business static websites fall between £100 and £700 depending on the number of pages and complexity. Larger or more detailed projects can go up to £1,500 or more. We always agree the price before starting — no surprises, no hidden extras. Get in touch for a free quote.'},
        {q:'What kinds of businesses do you build websites for?',
         a:'We work with all sorts of local and small businesses — barbers, restaurants, cafés, tradesmen (plumbers, electricians, decorators), photographers, freelancers, personal trainers, local shops, and anyone who needs a clean, professional, converting online presence. If you\'re not sure if we\'re a fit, just ask.'},
        {q:'How long does it take?',
         a:'Most websites are completed within 1–2 weeks once we have your content (text, photos, etc.). We\'ll agree a clear timeline before starting so you know exactly what to expect.'},
        {q:'What\'s a static website — and is it right for me?',
         a:'A static website is one where the pages are pre-built and served directly to your visitors — no database, no CMS, no plugins. They load faster, are more secure, and cost less to run than WordPress sites. Faster loading also directly improves your conversion rate. For most small businesses, they\'re the perfect fit.'},
        {q:'What does "conversion rate optimisation" mean for my website?',
         a:'It means we design your site to turn visitors into actual enquiries — not just look good. Clear calls-to-action, trust signals in the right places, phone numbers that are easy to find, and layouts that guide people naturally towards getting in touch. A lot of websites skip this entirely. We don\'t.'},
        {q:'Can I update the website myself?',
         a:'For most changes (text, images, contact info), we handle updates for you quickly and at no extra cost for minor tweaks. If you want bigger changes down the line, we\'ll discuss a fair price. We keep things simple and won\'t leave you stuck.'},
        {q:'Do you work with businesses outside Ipswich?',
         a:'Absolutely. We\'re based in Ipswich but work with clients anywhere in the UK. Everything can be done remotely — a quick call or message is all it takes to get started.'},
      ].map(faq => `
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
            <span class="font-display font-semibold text-gray-900 text-sm">${faq.q}</span>
            <i class="fas fa-plus text-gray-300 text-sm flex-shrink-0 faq-icon transition-transform"></i>
          </button>
          <div class="faq-body px-6">
            <p class="text-gray-500 text-sm leading-relaxed pb-5">${faq.a}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<script>
  function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const success = document.getElementById('success-state');
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { form.classList.add('hidden'); success.classList.remove('hidden'); }, 300);
  }
  function toggleFaq(btn) {
    const body = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = body.classList.contains('open');
    document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.faq-icon').forEach(i => { i.classList.remove('fa-minus'); i.classList.add('fa-plus'); });
    if (!isOpen) { body.classList.add('open'); icon.classList.remove('fa-plus'); icon.classList.add('fa-minus'); }
  }
</script>
`

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (c) => c.html(Layout({ children: HomePage(), title: 'Obsidian Digital | Static Website Design for Small Businesses, Ipswich' })))
app.get('/about', (c) => c.html(Layout({ children: AboutPage(), title: 'About Us | Obsidian Digital — Ipswich Web Design' })))
app.get('/contact', (c) => c.html(Layout({ children: ContactPage(), title: 'Get a Free Quote | Obsidian Digital Web Design' })))
app.post('/api/contact', async (c) => {
  const data = await c.req.json()
  console.log('Contact form submission:', data)
  return c.json({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' })
})

export default app
