import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

// ─── Shared Layout ────────────────────────────────────────────────────────────
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
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['DM Sans', 'sans-serif'],
            display: ['Syne', 'sans-serif'],
          },
          colors: {
            obsidian: {
              50:  '#fafaf9',
              100: '#f5f4f0',
              200: '#e8e5de',
              300: '#d4cfc4',
              400: '#b8b0a0',
              500: '#9a9080',
              600: '#7a7060',
              700: '#5c5448',
              800: '#3d3830',
              900: '#1e1a14',
              950: '#0f0d0a',
            },
            amber: {
              50:  '#fffbeb',
              100: '#fef3c7',
              200: '#fde68a',
              300: '#fcd34d',
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
              700: '#b45309',
              800: '#92400e',
              900: '#78350f',
            }
          },
        }
      }
    }
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: #fafaf9; color: #1e1a14; overflow-x: hidden; }
    .font-display { font-family: 'Syne', sans-serif; }

    /* ── Colour tokens ── */
    :root {
      --ink:    #1e1a14;
      --ink-2:  #3d3830;
      --ink-3:  #5c5448;
      --muted:  #9a9080;
      --border: #e8e5de;
      --sand:   #f5f4f0;
      --gold:   #f59e0b;
      --gold-d: #b45309;
      --cream:  #fffbeb;
      --dark:   #0f0d0a;
      --dark-2: #1e1a14;
    }

    /* ── Typography ── */
    .display-xl {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      line-height: 1.0;
      letter-spacing: -0.03em;
    }
    .display-lg {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.025em;
    }
    .label-upper {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* ── Gold accent ── */
    .text-gold { color: var(--gold); }
    .bg-gold { background: var(--gold); }
    .border-gold { border-color: var(--gold); }

    /* ── Underline accent (editorial) ── */
    .underline-gold {
      position: relative;
      display: inline-block;
    }
    .underline-gold::after {
      content: '';
      position: absolute;
      bottom: 0.05em;
      left: 0;
      width: 100%;
      height: 0.12em;
      background: var(--gold);
      border-radius: 2px;
      z-index: -1;
    }

    /* ── Highlight block (brush-stroke feel) ── */
    .highlight-block {
      position: relative;
      display: inline;
    }
    .highlight-block::before {
      content: '';
      position: absolute;
      bottom: -0.05em;
      left: -0.1em;
      right: -0.1em;
      height: 0.45em;
      background: rgba(245,158,11,0.22);
      border-radius: 3px;
      z-index: -1;
      transform: rotate(-0.5deg);
    }

    /* ── Nav ── */
    #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: all 0.3s ease; }
    #navbar.scrolled { background: rgba(15,13,10,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .nav-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(255,255,255,0.65);
      transition: color 0.2s;
      position: relative;
    }
    .nav-link:hover { color: #fff; }
    .nav-link.active { color: #fff; }

    /* ── Buttons ── */
    .btn-gold {
      background: var(--gold);
      color: var(--ink);
      font-weight: 700;
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.01em;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-gold:hover {
      background: #fbbf24;
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(245,158,11,0.35);
    }
    .btn-ghost {
      color: rgba(255,255,255,0.8);
      border: 1.5px solid rgba(255,255,255,0.2);
      font-weight: 600;
      font-family: 'Syne', sans-serif;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-ghost:hover {
      border-color: rgba(255,255,255,0.5);
      color: #fff;
      background: rgba(255,255,255,0.05);
    }
    .btn-dark {
      background: var(--ink);
      color: #fff;
      font-weight: 700;
      font-family: 'Syne', sans-serif;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-dark:hover { background: var(--ink-2); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
    .btn-outline-dark {
      border: 1.5px solid var(--border);
      color: var(--ink);
      font-weight: 600;
      font-family: 'Syne', sans-serif;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-outline-dark:hover { border-color: var(--ink); background: var(--ink); color: #fff; }

    /* ── Cards ── */
    .card-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(30,26,20,0.10); }

    /* ── Section stripe ── */
    .stripe-dark { background: var(--dark); color: #fff; }
    .stripe-sand { background: var(--sand); }
    .stripe-cream { background: var(--cream); }
    .stripe-white { background: #fff; }

    /* ── Diagonal divider ── */
    .clip-diagonal-down { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
    .clip-diagonal-up   { clip-path: polygon(0 6%, 100% 0, 100% 100%, 0 100%); }

    /* ── Number accent ── */
    .step-num {
      font-family: 'Syne', sans-serif;
      font-size: 4rem;
      font-weight: 800;
      line-height: 1;
      color: var(--border);
      letter-spacing: -0.04em;
    }

    /* ── Tag pill ── */
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid var(--border);
      background: #fff;
      color: var(--muted);
      border-radius: 100px;
      padding: 0.35rem 0.9rem;
    }
    .pill-dark {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.5);
    }
    .pill-gold {
      background: rgba(245,158,11,0.12);
      border-color: rgba(245,158,11,0.3);
      color: #b45309;
    }

    /* ── Scroll animation ── */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── Mobile menu ── */
    #mobile-menu { display: none; }
    #mobile-menu.open { display: block; }

    /* ── Form ── */
    .form-input {
      width: 100%;
      background: var(--sand);
      border: 1.5px solid var(--border);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      color: var(--ink);
      font-family: 'DM Sans', sans-serif;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .form-input:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(245,158,11,0.12);
      background: #fff;
    }
    .form-input::placeholder { color: var(--muted); }

    /* ── Ticker tape ── */
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ticker-track { display: flex; animation: ticker 28s linear infinite; width: max-content; }
    .ticker-track:hover { animation-play-state: paused; }

    /* ── Service card border ── */
    .service-card {
      background: #fff;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    }
    .service-card:hover {
      border-color: var(--gold);
      box-shadow: 0 12px 36px rgba(245,158,11,0.10);
      transform: translateY(-3px);
    }

    /* ── FAQ ── */
    .faq-body { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
    .faq-body.open { max-height: 400px; padding-bottom: 1.25rem; }

    /* ── Marquee business types ── */
    .biz-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
      padding: 0.5rem 1.1rem;
      border-radius: 100px;
      border: 1.5px solid var(--border);
      background: #fff;
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--ink-2);
      margin: 0 0.35rem;
    }

    /* ── CRO highlight strip ── */
    .cro-strip {
      background: linear-gradient(135deg, #1e1a14 0%, #3d3830 100%);
      border-left: 4px solid var(--gold);
      border-radius: 0 12px 12px 0;
    }

    /* ── Stat block ── */
    .stat-block {
      border-right: 1.5px solid var(--border);
    }
    .stat-block:last-child { border-right: none; }

    /* ── Scroll hint ── */
    @keyframes bounce-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
    .bounce-y { animation: bounce-y 1.6s ease-in-out infinite; }

    input:focus, textarea:focus, select:focus { outline: none; }
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
      if (window.scrollY > 30) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    }

    // Scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  </script>
</body>
</html>
`

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => `
<nav id="navbar">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-center justify-between py-5">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-8 h-8 bg-amber-400 rounded flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="#1e1a14"/>
          </svg>
        </div>
        <span class="font-display font-bold text-lg text-white tracking-tight leading-none">Obsidian<span class="text-amber-400"> Digital</span></span>
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-7">
        <a href="/" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/#services" class="nav-link">Services</a>
        <a href="/#pricing" class="nav-link">Pricing</a>
        <a href="/contact" class="nav-link">Contact</a>
      </div>

      <div class="hidden md:block">
        <a href="/contact" class="btn-gold px-5 py-2.5 text-sm">Get a Free Quote <i class="fas fa-arrow-right text-xs"></i></a>
      </div>

      <!-- Hamburger -->
      <button id="hamburger" class="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
        <span class="block w-6 h-0.5 bg-white rounded-full transition-all"></span>
        <span class="block w-6 h-0.5 bg-white rounded-full transition-all"></span>
        <span class="block w-4 h-0.5 bg-white rounded-full transition-all"></span>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" style="background:rgba(15,13,10,0.98);backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,0.05);">
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
      <a href="/" class="text-white/70 hover:text-white font-medium py-1.5 text-sm">Home</a>
      <a href="/about" class="text-white/70 hover:text-white font-medium py-1.5 text-sm">About</a>
      <a href="/#services" class="text-white/70 hover:text-white font-medium py-1.5 text-sm">Services</a>
      <a href="/#pricing" class="text-white/70 hover:text-white font-medium py-1.5 text-sm">Pricing</a>
      <a href="/contact" class="text-white/70 hover:text-white font-medium py-1.5 text-sm">Contact</a>
      <a href="/contact" class="btn-gold px-5 py-3 text-sm text-center mt-2">Get a Free Quote</a>
    </div>
  </div>
</nav>
`

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => `
<footer class="stripe-dark">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/8">

      <!-- Brand col -->
      <div class="md:col-span-5">
        <a href="/" class="flex items-center gap-3 mb-5 group">
          <div class="w-8 h-8 bg-amber-400 rounded flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="#1e1a14"/>
            </svg>
          </div>
          <span class="font-display font-bold text-lg text-white leading-none">Obsidian<span class="text-amber-400"> Digital</span></span>
        </a>
        <p class="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
          Clean, fast, affordable websites for small businesses across Ipswich and the UK. Built properly. Priced fairly.
        </p>
        <div class="flex gap-2.5">
          ${['fab fa-instagram','fab fa-linkedin-in','fab fa-twitter','fab fa-facebook-f'].map(icon => `
            <a href="#" class="w-8 h-8 rounded bg-white/6 hover:bg-amber-400 flex items-center justify-center text-white/40 hover:text-obsidian-900 transition-all duration-200 text-xs">
              <i class="${icon}"></i>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Services col -->
      <div class="md:col-span-3">
        <p class="label-upper text-white/30 mb-5">Services</p>
        <ul class="space-y-2.5">
          ${['Static Website Design','Mobile-First Builds','Conversion Rate Optimisation','SEO Foundations','Content & Copywriting','Ongoing Support'].map(s => `
            <li><a href="/#services" class="text-white/45 hover:text-white text-sm transition-colors">${s}</a></li>
          `).join('')}
        </ul>
      </div>

      <!-- Company + contact col -->
      <div class="md:col-span-4">
        <p class="label-upper text-white/30 mb-5">Company</p>
        <ul class="space-y-2.5 mb-7">
          ${[['About Us','/about'],['Our Work','/#work'],['Contact','/contact'],['Privacy Policy','#']].map(([l,h]) => `
            <li><a href="${h}" class="text-white/45 hover:text-white text-sm transition-colors">${l}</a></li>
          `).join('')}
        </ul>
        <div class="space-y-2 bg-white/4 rounded-lg p-4 border border-white/6">
          <p class="text-white/35 text-xs flex items-center gap-2"><i class="fas fa-location-dot text-amber-400/70 w-3"></i> Ipswich, Suffolk</p>
          <p class="text-white/35 text-xs flex items-center gap-2"><i class="fas fa-phone text-amber-400/70 w-3"></i> 07518 009604</p>
          <p class="text-white/35 text-xs flex items-center gap-2"><i class="fas fa-envelope text-amber-400/70 w-3"></i> riaz.darwinboyd@gmail.com</p>
        </div>
      </div>
    </div>

    <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-white/25 text-xs">© 2025 Obsidian Digital. All rights reserved.</p>
      <p class="text-white/25 text-xs">Proudly built in <span class="text-amber-400/60">Ipswich, Suffolk</span> 🏴󠁧󠁢󠁥󠁮󠁧󠁿</p>
    </div>
  </div>
</footer>
`

// ═══════════════════════════════════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════════════
const HomePage = () => `

<!-- ── HERO ─────────────────────────────────────────────────────────────────── -->
<section class="stripe-dark relative overflow-hidden" style="min-height:100svh;display:flex;flex-direction:column;justify-content:center;">

  <!-- Texture overlay -->
  <div class="absolute inset-0 pointer-events-none" style="background-image:url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.018'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M40 0v80M0 40h80' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.06'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");"></div>

  <!-- Gold accent line top -->
  <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-20 relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      <!-- Left copy -->
      <div>
        <div class="pill pill-dark mb-8">
          <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          Based in Ipswich · Taking on clients now
        </div>

        <h1 class="display-xl text-white mb-6" style="font-size:clamp(2.8rem,6vw,5rem);">
          Websites that<br/>
          <span class="text-amber-400">actually</span> get<br/>
          you customers
        </h1>

        <p class="text-white/50 text-lg leading-relaxed mb-3 max-w-lg" style="font-weight:300;">
          We build clean, fast, mobile-first static websites for local businesses — and we design every page to <em class="text-white/70 not-italic font-normal">convert visitors into enquiries</em>, not just look pretty.
        </p>
        <p class="text-white/40 text-sm leading-relaxed mb-10 max-w-md">
          Barbers · Restaurants · Tradesmen · Photographers · Freelancers · Local shops
        </p>

        <div class="flex flex-wrap gap-3 mb-12">
          <a href="/contact" class="btn-gold px-7 py-3.5 text-sm font-bold">
            Get a Free Quote <i class="fas fa-arrow-right text-xs"></i>
          </a>
          <a href="/#services" class="btn-ghost px-7 py-3.5 text-sm">
            See What We Offer
          </a>
        </div>

        <!-- Trust signals -->
        <div class="flex flex-wrap gap-x-6 gap-y-3">
          ${[
            'Built from scratch — no templates',
            'Fixed, transparent pricing',
            'Delivered in 1–2 weeks',
            'Designed to convert',
          ].map(t => `
            <span class="flex items-center gap-2 text-white/40 text-xs font-medium">
              <span class="w-1 h-1 bg-amber-400 rounded-full flex-shrink-0"></span>${t}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Right: editorial feature card stack -->
      <div class="hidden lg:block relative">
        <!-- Main card -->
        <div class="bg-obsidian-900 border border-white/10 rounded-2xl overflow-hidden">
          <!-- Card header bar -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <span class="font-display font-bold text-white text-sm">yourbusiness.co.uk</span>
            <div class="flex gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-white/10"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-white/10"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-400/40"></div>
            </div>
          </div>
          <!-- Mock page layout -->
          <div class="p-6 space-y-4">
            <!-- Mock hero text -->
            <div class="space-y-2 pb-4 border-b border-white/6">
              <div class="h-5 bg-white/18 rounded w-3/4"></div>
              <div class="h-5 bg-amber-400/30 rounded w-1/2"></div>
              <div class="h-3 bg-white/8 rounded w-full mt-3"></div>
              <div class="h-3 bg-white/8 rounded w-5/6"></div>
              <div class="flex gap-2 pt-2">
                <div class="h-8 bg-amber-400/70 rounded w-28"></div>
                <div class="h-8 bg-white/8 border border-white/10 rounded w-24"></div>
              </div>
            </div>
            <!-- Mock conversion section -->
            <div class="space-y-1.5">
              <div class="h-2.5 bg-white/12 rounded w-2/5"></div>
              <div class="grid grid-cols-3 gap-2 pt-1">
                ${['bg-amber-400/15','bg-white/8','bg-white/8'].map(c => `
                  <div class="${c} border border-white/6 rounded-lg p-3">
                    <div class="w-4 h-4 bg-white/15 rounded mb-1.5"></div>
                    <div class="h-1.5 bg-white/15 rounded w-full mb-1"></div>
                    <div class="h-1.5 bg-white/8 rounded w-2/3"></div>
                  </div>
                `).join('')}
              </div>
            </div>
            <!-- Mock CTA -->
            <div class="bg-amber-400/10 border border-amber-400/20 rounded-lg p-3 flex items-center justify-between">
              <div class="space-y-1">
                <div class="h-2.5 bg-amber-400/40 rounded w-24"></div>
                <div class="h-2 bg-white/12 rounded w-16"></div>
              </div>
              <div class="h-7 bg-amber-400/70 rounded w-20"></div>
            </div>
          </div>
        </div>

        <!-- Floating badges -->
        <div class="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-xl border border-obsidian-100">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-arrow-trend-up text-green-600 text-xs"></i>
            </div>
            <div>
              <p class="font-display font-bold text-obsidian-900 text-xs">More enquiries</p>
              <p class="text-obsidian-400 text-xs">CRO-built pages</p>
            </div>
          </div>
        </div>

        <div class="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl border border-obsidian-100">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-bolt text-amber-600 text-xs"></i>
            </div>
            <div>
              <p class="font-display font-bold text-obsidian-900 text-xs">Loads fast</p>
              <p class="text-obsidian-400 text-xs">Every time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Diagonal slice -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-obsidian-50" style="clip-path:polygon(0 100%,100% 100%,100% 0)"></div>
</section>

<!-- ── TICKER — business types ─────────────────────────────────────────────── -->
<section class="stripe-sand py-10 overflow-hidden border-b border-obsidian-200">
  <p class="label-upper text-center text-obsidian-400 mb-5">Perfect for businesses like these</p>
  <div class="relative overflow-hidden">
    <div class="ticker-track">
      ${[
        { icon: 'fa-scissors',     label: 'Barbers' },
        { icon: 'fa-utensils',     label: 'Restaurants' },
        { icon: 'fa-hard-hat',     label: 'Tradesmen' },
        { icon: 'fa-camera',       label: 'Photographers' },
        { icon: 'fa-store',        label: 'Local Shops' },
        { icon: 'fa-paint-roller', label: 'Decorators' },
        { icon: 'fa-briefcase',    label: 'Freelancers' },
        { icon: 'fa-music',        label: 'Creatives' },
        { icon: 'fa-dumbbell',     label: 'Personal Trainers' },
        { icon: 'fa-mug-hot',      label: 'Cafés' },
      ].concat([
        { icon: 'fa-scissors',     label: 'Barbers' },
        { icon: 'fa-utensils',     label: 'Restaurants' },
        { icon: 'fa-hard-hat',     label: 'Tradesmen' },
        { icon: 'fa-camera',       label: 'Photographers' },
        { icon: 'fa-store',        label: 'Local Shops' },
        { icon: 'fa-paint-roller', label: 'Decorators' },
        { icon: 'fa-briefcase',    label: 'Freelancers' },
        { icon: 'fa-music',        label: 'Creatives' },
        { icon: 'fa-dumbbell',     label: 'Personal Trainers' },
        { icon: 'fa-mug-hot',      label: 'Cafés' },
      ]).map(b => `
        <div class="biz-chip">
          <i class="fas ${b.icon} text-amber-500 text-xs"></i>
          ${b.label}
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ── SERVICES ───────────────────────────────────────────────────────────────── -->
<section id="services" class="stripe-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">

    <!-- Section header -->
    <div class="grid lg:grid-cols-2 gap-8 items-end mb-16 reveal">
      <div>
        <span class="pill pill-gold mb-5">What We Offer</span>
        <h2 class="display-lg text-obsidian-900" style="font-size:clamp(2rem,4vw,3rem);">
          Everything your<br/>business needs<br/>to <span class="underline-gold">stand out online</span>
        </h2>
      </div>
      <p class="text-obsidian-500 leading-relaxed lg:pb-2">
        We keep things focused. No bloated packages, no services we can't deliver well — just exactly what a small business needs to build a strong, converting online presence.
      </p>
    </div>

    <!-- Service cards — 3 col grid with alternating accent -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${[
        {
          num: '01',
          icon: 'fa-pen-ruler',
          title: 'Custom Website Design',
          desc: 'Every website is designed from scratch around your business — your colours, your voice, your goals. No generic templates that look like everyone else\'s site.',
          tags: ['Bespoke layouts', 'On-brand visuals', 'Clean & modern'],
          accent: false,
        },
        {
          num: '02',
          icon: 'fa-mobile-screen',
          title: 'Mobile-First Development',
          desc: 'Most of your customers will find you on their phone. Every site looks and works perfectly on all screen sizes — phones, tablets, and desktops.',
          tags: ['Fully responsive', 'Touch-friendly', 'Fast on mobile'],
          accent: false,
        },
        {
          num: '03',
          icon: 'fa-arrow-trend-up',
          title: 'Conversion Rate Optimisation',
          desc: 'A pretty website that doesn\'t convert is just expensive wallpaper. We design every page with a clear purpose — guiding your visitors towards picking up the phone or filling in a form.',
          tags: ['Clear calls-to-action', 'Built to convert', 'Enquiry-focused'],
          accent: true,
        },
        {
          num: '04',
          icon: 'fa-bolt',
          title: 'Fast & Lightweight Builds',
          desc: 'Static websites have no heavy databases or slow plugins — just clean code that loads in a flash. Your visitors (and Google) will notice the difference.',
          tags: ['Quick load times', 'No bloat', 'Smooth UX'],
          accent: false,
        },
        {
          num: '05',
          icon: 'fa-magnifying-glass',
          title: 'SEO Foundations',
          desc: 'Every site is set up to be found. Proper page structure, meta tags, fast loading, mobile optimisation — the groundwork so you\'re ready to rank from day one.',
          tags: ['Meta & titles', 'Structured content', 'Google-ready'],
          accent: false,
        },
        {
          num: '06',
          icon: 'fa-file-lines',
          title: 'Content & Copywriting',
          desc: 'Not sure what to write? We can help. Whether you need a steer or want us to write the whole thing, we\'ll make sure your site says the right things to the right people.',
          tags: ['Clear messaging', 'Engaging copy', 'Conversion-focused'],
          accent: false,
        },
      ].map((s) => `
        <div class="service-card reveal ${s.accent ? 'border-amber-300 bg-amber-50' : ''}">
          <div class="flex items-start justify-between mb-5">
            <div class="w-11 h-11 ${s.accent ? 'bg-amber-400' : 'bg-obsidian-100'} rounded-lg flex items-center justify-center flex-shrink-0">
              <i class="fas ${s.icon} text-base ${s.accent ? 'text-obsidian-900' : 'text-obsidian-600'}"></i>
            </div>
            <span class="font-display font-bold text-3xl text-obsidian-100" style="line-height:1;">${s.num}</span>
          </div>
          <h3 class="font-display font-bold text-lg text-obsidian-900 mb-2.5">${s.title}</h3>
          <p class="text-obsidian-500 text-sm leading-relaxed mb-4">${s.desc}</p>
          <div class="flex flex-wrap gap-1.5">
            ${s.tags.map(t => `<span class="text-xs font-medium text-obsidian-500 bg-obsidian-100 px-2.5 py-1 rounded-full">${t}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Transparency box -->
    <div class="mt-10 flex items-start gap-5 bg-obsidian-50 border border-obsidian-200 rounded-xl p-6 md:p-8 reveal">
      <div class="w-9 h-9 bg-obsidian-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <i class="fas fa-circle-info text-obsidian-600 text-sm"></i>
      </div>
      <div>
        <h4 class="font-display font-bold text-obsidian-900 mb-1.5">Honest about what we do</h4>
        <p class="text-obsidian-500 text-sm leading-relaxed">
          We specialise in <strong class="text-obsidian-700">static websites</strong> — which means we don't currently build complex web applications, customer login portals, or database-driven platforms. What we <em>do</em> build, we build really well. If you need a clean, professional, <strong class="text-obsidian-700">conversion-focused</strong> online presence that loads fast and looks great, you're in exactly the right place.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── CRO CALLOUT STRIP ──────────────────────────────────────────────────── -->
<section class="stripe-dark py-20">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="reveal">
        <span class="pill pill-dark mb-6">Why It Matters</span>
        <h2 class="display-lg text-white mb-5" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">
          A website that <span class="text-amber-400">doesn't convert</span> is just expensive decoration
        </h2>
        <p class="text-white/50 leading-relaxed mb-6" style="font-weight:300;">
          Most websites are built to look good in a screenshot. We build sites with conversion rate optimisation baked in from the start — clear calls-to-action, trust signals in the right places, and page structures that guide a visitor towards contacting you.
        </p>
        <p class="text-white/40 text-sm leading-relaxed">
          Every layout decision, every headline, every button placement — it's all thought through with one question in mind: <em class="text-white/60 not-italic">"Does this help the visitor take the next step?"</em>
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 reveal">
        ${[
          { icon: 'fa-bullseye', title: 'Clear CTAs', desc: 'Every page has one clear next action. No confusion, no dead ends.' },
          { icon: 'fa-shield-halved', title: 'Trust Signals', desc: 'Phone numbers, location, and social proof placed where they have maximum impact.' },
          { icon: 'fa-mobile-screen', title: 'Mobile UX', desc: 'Optimised for how real people actually browse — thumbs first.' },
          { icon: 'fa-gauge-high', title: 'Fast Load = More Leads', desc: 'Every second of load time costs you conversions. Static sites load instantly.' },
        ].map(c => `
          <div class="bg-white/5 border border-white/8 rounded-xl p-5">
            <div class="w-8 h-8 bg-amber-400/15 rounded-lg flex items-center justify-center mb-3">
              <i class="fas ${c.icon} text-amber-400 text-xs"></i>
            </div>
            <p class="font-display font-bold text-white text-sm mb-1.5">${c.title}</p>
            <p class="text-white/40 text-xs leading-relaxed">${c.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── HOW IT WORKS ───────────────────────────────────────────────────────── -->
<section class="stripe-sand py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-16 reveal">
      <span class="pill mb-5">How It Works</span>
      <h2 class="display-lg text-obsidian-900 mb-4" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Simple process.<br/>Serious results.</h2>
      <p class="text-obsidian-400 max-w-md mx-auto text-sm leading-relaxed">No confusing briefs or lengthy onboarding. We keep it simple so you can focus on running your business.</p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
      <!-- Connector line -->
      <div class="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-obsidian-200 z-0"></div>

      ${[
        { step: '01', icon: 'fa-comments', title: 'Chat With Us', desc: 'Tell us about your business and what you need. No jargon, no pressure — just a real conversation.' },
        { step: '02', icon: 'fa-pen-ruler', title: 'We Design It', desc: 'We build a design around your brand and goals. You review it; we refine until it\'s right.' },
        { step: '03', icon: 'fa-code', title: 'We Build It', desc: 'Clean code, fast performance, tested on every screen size. CRO principles applied throughout.' },
        { step: '04', icon: 'fa-rocket', title: 'It Goes Live', desc: 'Your site launches. We hand it over properly and stay on hand for any follow-up questions.' },
      ].map((p, i) => `
        <div class="relative z-10 text-center px-6 py-8 reveal" style="transition-delay:${i*80}ms">
          <div class="relative inline-flex mb-5">
            <div class="w-16 h-16 bg-white border-2 border-obsidian-200 rounded-2xl flex items-center justify-center shadow-sm">
              <i class="fas ${p.icon} text-obsidian-700 text-lg"></i>
            </div>
            <span class="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center font-display font-bold text-xs text-obsidian-900">${p.step}</span>
          </div>
          <h3 class="font-display font-bold text-obsidian-900 mb-2 text-base">${p.title}</h3>
          <p class="text-obsidian-400 text-sm leading-relaxed">${p.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ── PRICING ─────────────────────────────────────────────────────────────── -->
<section id="pricing" class="stripe-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-14 reveal">
      <span class="pill pill-gold mb-5">Pricing</span>
      <h2 class="display-lg text-obsidian-900 mb-4" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Straightforward prices.<br/>No surprises.</h2>
      <p class="text-obsidian-400 max-w-sm mx-auto text-sm leading-relaxed">We agree the cost before starting. What we quote is what you pay.</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${[
        {
          range: '£100 – £300',
          label: 'Starter',
          desc: 'Single page or landing page. Great for getting something professional live quickly.',
          includes: ['1 page','Mobile responsive','SEO setup','Contact section','Delivered in ~1 week'],
          highlight: false,
        },
        {
          range: '£300 – £700',
          label: 'Small Business',
          desc: 'A proper multi-page site for a local business. Most of our clients sit here.',
          includes: ['3–5 pages','Custom design','Mobile-first build','CRO-focused layout','Delivered in 1–2 weeks'],
          highlight: true,
        },
        {
          range: '£700 – £1,500',
          label: 'Professional',
          desc: 'Larger sites with more pages, copywriting help, or a more involved design.',
          includes: ['6+ pages','Copywriting support','Advanced CRO','Ongoing support plan','Delivered in 2–3 weeks'],
          highlight: false,
        },
        {
          range: '£1,500+',
          label: 'Custom',
          desc: 'For more complex projects or ongoing relationships. Let\'s have a chat.',
          includes: ['Bespoke scope','All services included','Priority support','Ongoing retainer option','Timeline agreed upfront'],
          highlight: false,
        },
      ].map(p => `
        <div class="rounded-xl border-2 ${p.highlight ? 'border-amber-400 bg-amber-50' : 'border-obsidian-200 bg-white'} p-7 flex flex-col reveal card-lift relative">
          ${p.highlight ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-obsidian-900 font-display font-bold text-xs px-3 py-1 rounded-full">Most Popular</span>' : ''}
          <p class="label-upper ${p.highlight ? 'text-amber-700' : 'text-obsidian-400'} mb-2">${p.label}</p>
          <p class="font-display font-bold text-obsidian-900 mb-3" style="font-size:1.5rem;letter-spacing:-0.02em;">${p.range}</p>
          <p class="text-obsidian-500 text-xs leading-relaxed mb-5 flex-1">${p.desc}</p>
          <ul class="space-y-2 mb-6">
            ${p.includes.map(item => `
              <li class="flex items-center gap-2 text-xs text-obsidian-600">
                <i class="fas fa-check text-amber-500 text-xs w-3"></i>${item}
              </li>
            `).join('')}
          </ul>
          <a href="/contact" class="${p.highlight ? 'btn-gold' : 'btn-outline-dark'} px-5 py-2.5 text-sm justify-center">
            Get a Quote
          </a>
        </div>
      `).join('')}
    </div>

    <p class="text-center text-obsidian-400 text-xs mt-8">Not sure which fits? Just describe your project — we'll work it out together.</p>
  </div>
</section>

<!-- ── WHY STATIC ────────────────────────────────────────────────────────── -->
<section class="stripe-sand py-20 border-y border-obsidian-200">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-5 gap-12 items-center">
      <div class="lg:col-span-2 reveal">
        <span class="pill mb-5">The Tech Side</span>
        <h2 class="display-lg text-obsidian-900 mb-4" style="font-size:clamp(1.6rem,3vw,2.4rem);">Why static websites are the smart choice</h2>
        <p class="text-obsidian-500 text-sm leading-relaxed">Most small businesses don't need a complex CMS. A static website gives you everything you actually need — and none of what you don't.</p>
      </div>
      <div class="lg:col-span-3 grid sm:grid-cols-2 gap-4">
        ${[
          { icon: 'fa-bolt', title: 'Loads Instantly', desc: 'No server processing or database queries — served straight to the visitor. Fast every time. And faster load times directly improve your conversion rate.' },
          { icon: 'fa-shield-halved', title: 'Inherently Secure', desc: 'No login pages, no plugins to exploit, no CMS vulnerabilities. Static sites are far harder to hack.' },
          { icon: 'fa-sterling-sign', title: 'Low Running Costs', desc: 'Static sites can be hosted for very little — sometimes free. No monthly platform fees eating into your budget.' },
          { icon: 'fa-face-smile', title: 'Hassle Free', desc: 'No software to update, no plugins to maintain, no surprise breakages. It just works.' },
        ].map((s, i) => `
          <div class="bg-white border border-obsidian-200 rounded-xl p-5 reveal" style="transition-delay:${i*80}ms">
            <div class="w-9 h-9 bg-obsidian-100 rounded-lg flex items-center justify-center mb-3">
              <i class="fas ${s.icon} text-obsidian-700 text-sm"></i>
            </div>
            <p class="font-display font-bold text-obsidian-900 text-sm mb-1.5">${s.title}</p>
            <p class="text-obsidian-400 text-xs leading-relaxed">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── PORTFOLIO ─────────────────────────────────────────────────────────── -->
<section id="work" class="stripe-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal">
      <div>
        <span class="pill pill-gold mb-5">Our Work</span>
        <h2 class="display-lg text-obsidian-900" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Recent Projects</h2>
      </div>
      <a href="/contact" class="btn-outline-dark px-6 py-2.5 text-sm self-start md:self-auto">
        Start Your Project <i class="fas fa-arrow-right text-xs"></i>
      </a>
    </div>

    <div class="max-w-xl mx-auto reveal">
      <div class="border-2 border-dashed border-obsidian-200 rounded-2xl p-14 text-center">
        <div class="w-14 h-14 mx-auto bg-obsidian-100 rounded-xl flex items-center justify-center mb-5">
          <i class="fas fa-images text-obsidian-400 text-xl"></i>
        </div>
        <h3 class="font-display font-bold text-xl text-obsidian-900 mb-3">Portfolio Coming Soon</h3>
        <p class="text-obsidian-400 text-sm leading-relaxed mb-6">We've just launched and are actively taking on our first clients. Check back here soon — this section will showcase real sites we've built for real businesses.</p>
        <a href="/contact" class="btn-gold px-6 py-3 text-sm">
          Be Our First Client <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ── REVIEWS ─────────────────────────────────────────────────────────── -->
<section class="stripe-sand py-24 border-y border-obsidian-200">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="reveal">
        <span class="pill mb-5">Reviews</span>
        <h2 class="display-lg text-obsidian-900 mb-4" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Client reviews<br/><span class="text-obsidian-300">coming soon</span></h2>
        <p class="text-obsidian-500 leading-relaxed mb-6">We're brand new and building our reputation one client at a time. Every project gets everything we've got — and if we do a great job, we'd love for you to tell people.</p>
        <a href="/contact" class="btn-dark px-6 py-3 text-sm">Work With Us <i class="fas fa-arrow-right text-xs"></i></a>
      </div>
      <div class="reveal">
        <div class="bg-white border border-obsidian-200 rounded-2xl p-8 text-center">
          <div class="flex justify-center gap-2 mb-5">
            ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-amber-200 text-xl"></i>').join('')}
          </div>
          <p class="font-display font-bold text-2xl text-obsidian-900 mb-2">Your Review Could Be First</p>
          <p class="text-obsidian-400 text-sm leading-relaxed">Get in touch today and experience what it's like to work with someone who genuinely cares about your results.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── CTA ──────────────────────────────────────────────────────────────── -->
<section class="stripe-dark py-24 lg:py-32 relative overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
  <div class="max-w-4xl mx-auto px-6 lg:px-10 text-center reveal">
    <span class="pill pill-dark mb-7">Ready When You Are</span>
    <h2 class="display-xl text-white mb-6" style="font-size:clamp(2.2rem,5vw,4rem);">
      Get your business<br/><span class="text-amber-400">online properly.</span>
    </h2>
    <p class="text-white/45 text-lg mb-10 max-w-xl mx-auto leading-relaxed" style="font-weight:300;">
      Free quote, no obligation, no hard sell. We'll listen to what you need, be straight with you about cost, and deliver something you're proud to share.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/contact" class="btn-gold px-8 py-4 text-base">
        Get a Free Quote <i class="fas fa-arrow-right text-sm"></i>
      </a>
      <a href="tel:07518009604" class="btn-ghost px-8 py-4 text-base">
        <i class="fas fa-phone text-amber-400 text-sm"></i> 07518 009604
      </a>
    </div>
  </div>
</section>
`

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const AboutPage = () => `

<!-- ── HERO ─────────────────────────────────────────────────────────────────── -->
<section class="stripe-dark relative overflow-hidden pt-36 pb-28">
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
  <div class="absolute inset-0 pointer-events-none" style="background-image:url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M40 0v80M0 40h80' stroke='%23ffffff' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/g%3E%3C/svg%3E\");"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
    <div class="max-w-3xl">
      <span class="pill pill-dark mb-8">About Obsidian Digital</span>
      <h1 class="display-xl text-white mb-6" style="font-size:clamp(2.5rem,6vw,4.5rem);">
        We started because<br/><span class="text-amber-400">better was possible</span>
      </h1>
      <p class="text-white/45 text-xl leading-relaxed" style="font-weight:300;">
        Too many small businesses are paying too much for websites that look average and convert nobody. We're here to change that.
      </p>
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 h-16 bg-white" style="clip-path:polygon(0 100%,100% 100%,100% 0)"></div>
</section>

<!-- ── STORY ─────────────────────────────────────────────────────────────────── -->
<section class="stripe-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-16 items-start">

      <!-- Copy -->
      <div class="reveal">
        <span class="pill pill-gold mb-6">Our Story</span>
        <h2 class="display-lg text-obsidian-900 mb-7" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">
          Honest work.<br/><span class="underline-gold">Fair prices.</span><br/>Real results.
        </h2>
        <div class="space-y-4 text-obsidian-500 leading-relaxed">
          <p>Obsidian Digital was founded in 2025 by Riaz Darwin-Boyd, a Computer Science student from Ipswich who noticed something frustrating: local businesses were either paying thousands to big agencies for something they didn't need, or settling for cheap template sites that looked like everyone else's.</p>
          <p>There's a real gap in the middle — businesses that just want a <em class="text-obsidian-700 not-italic">genuinely good website</em>, without the big agency price tag and without the template compromise. That's exactly where we sit.</p>
          <p>We build custom static websites — clean, fast, mobile-first, and designed with conversion rate optimisation in mind from the start. Because a website that doesn't turn visitors into enquiries isn't really doing its job.</p>
          <p>We're new, and we're proud of that. It means we're genuinely invested in every project. You'll work directly with Riaz, get straight answers, and end up with something you're actually proud to share.</p>
        </div>
        <a href="/contact" class="btn-gold px-6 py-3.5 text-sm mt-8 inline-flex">Let's Talk <i class="fas fa-arrow-right text-xs"></i></a>
      </div>

      <!-- Visual block -->
      <div class="reveal">
        <!-- Big quote card -->
        <div class="bg-obsidian-950 rounded-2xl p-8 mb-5 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l-2xl"></div>
          <p class="text-white/60 text-sm leading-relaxed mb-4 pl-4">
            "I wanted to build websites that genuinely make a difference to someone's business — not just look good in a screenshot. Fast, clean, built to convert. That's the standard."
          </p>
          <div class="flex items-center gap-3 pl-4">
            <div class="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <i class="fas fa-user text-obsidian-900 text-xs"></i>
            </div>
            <div>
              <p class="text-white font-display font-bold text-sm">Riaz Darwin-Boyd</p>
              <p class="text-white/35 text-xs">Founder, Obsidian Digital</p>
            </div>
          </div>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-4">
          ${[
            { val: '2025', sub: 'Founded', icon: 'fa-calendar', color: 'bg-amber-50 border-amber-200' },
            { val: '1–2 wk', sub: 'Avg. delivery', icon: 'fa-clock', color: 'bg-obsidian-50 border-obsidian-200' },
            { val: 'Static', sub: 'Our speciality', icon: 'fa-globe', color: 'bg-obsidian-50 border-obsidian-200' },
            { val: '100%', sub: 'Bespoke builds', icon: 'fa-pen-ruler', color: 'bg-amber-50 border-amber-200' },
          ].map(s => `
            <div class="${s.color} border rounded-xl p-5 flex flex-col gap-2">
              <i class="fas ${s.icon} text-obsidian-400 text-sm"></i>
              <p class="font-display font-bold text-obsidian-900 text-2xl">${s.val}</p>
              <p class="text-obsidian-400 text-xs">${s.sub}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── VALUES ─────────────────────────────────────────────────────────────────── -->
<section class="stripe-sand py-24 border-y border-obsidian-200">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-14 reveal">
      <span class="pill mb-5">What We Stand For</span>
      <h2 class="display-lg text-obsidian-900" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">The way we work</h2>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      ${[
        { icon: 'fa-handshake', title: 'Straight Talking', desc: 'We tell you what things actually cost, what\'s realistic, and what we think is right — no fluff, no upselling.' },
        { icon: 'fa-pen-ruler', title: 'Proper Craft', desc: 'Clean code, considered design, tested properly. We\'re not cutting corners to turn things around fast.' },
        { icon: 'fa-person-running', title: 'Quick & Responsive', desc: 'We reply quickly and keep projects moving. No waiting days for a reply or weeks for a simple update.' },
        { icon: 'fa-bullseye', title: 'Built to Convert', desc: 'Every layout decision is made with one goal: helping your business attract more customers online.' },
      ].map((v, i) => `
        <div class="bg-white border border-obsidian-200 rounded-xl p-6 reveal card-lift" style="transition-delay:${i*80}ms">
          <div class="w-10 h-10 bg-obsidian-100 rounded-lg flex items-center justify-center mb-4">
            <i class="fas ${v.icon} text-obsidian-700 text-sm"></i>
          </div>
          <h3 class="font-display font-bold text-obsidian-900 mb-2">${v.title}</h3>
          <p class="text-obsidian-400 text-sm leading-relaxed">${v.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ── FOUNDER ─────────────────────────────────────────────────────────────────── -->
<section class="stripe-white py-24 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-12 reveal">
      <span class="pill pill-gold mb-5">Who You're Working With</span>
      <h2 class="display-lg text-obsidian-900" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">The person behind your project</h2>
    </div>

    <div class="max-w-3xl mx-auto reveal">
      <div class="bg-white border-2 border-obsidian-200 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-shrink-0">
          <div class="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
            <i class="fas fa-laptop-code text-obsidian-900 text-3xl"></i>
          </div>
        </div>
        <div>
          <h3 class="font-display font-bold text-2xl text-obsidian-900 mb-0.5">Riaz Darwin-Boyd</h3>
          <p class="text-amber-600 font-medium text-sm mb-5">Founder & Web Designer, Obsidian Digital</p>
          <div class="space-y-3 text-obsidian-500 text-sm leading-relaxed mb-5">
            <p>I'm a Computer Science student from Ipswich with a genuine passion for clean design and well-built websites. I started Obsidian Digital because I wanted to offer something I felt was missing locally — websites that genuinely look and work great, without the inflated agency prices.</p>
            <p>When you work with Obsidian Digital, you're working with me directly. I take the time to understand your business properly, I'm honest about what I can deliver, and I'll build you something that actually gets you more enquiries — not just something that looks nice.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            ${['Web Design','HTML & CSS','JavaScript','Mobile-First','CRO','SEO Basics','Clean Code'].map(s =>
              `<span class="bg-obsidian-100 text-obsidian-600 text-xs font-medium px-3 py-1.5 rounded-full">${s}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── WHY US ──────────────────────────────────────────────────────────────── -->
<section class="stripe-sand py-24 border-t border-obsidian-200">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="reveal">
        <span class="pill mb-6">Why Obsidian Digital</span>
        <h2 class="display-lg text-obsidian-900 mb-8" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">What makes us different</h2>
        <div class="space-y-4">
          ${[
            'You speak to Riaz directly — not an account manager or a chatbot.',
            'Transparent, fixed pricing. We agree the cost before starting — no surprises.',
            'Every site is built with conversion rate optimisation from the start. Pretty isn\'t enough.',
            'Every site is built from scratch around your business. No templates, no shortcuts.',
            'Fast turnaround — most sites live within 1–2 weeks of receiving your content.',
            'Mobile-first as standard. Looks just as good on a phone as a desktop.',
            'Because we\'re new, every client genuinely matters. You won\'t be forgotten about.',
          ].map(item => `
            <div class="flex items-start gap-3.5">
              <div class="w-5 h-5 bg-amber-400 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fas fa-check text-obsidian-900 text-xs"></i>
              </div>
              <p class="text-obsidian-600 text-sm leading-relaxed">${item}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Visual grid -->
      <div class="grid grid-cols-2 gap-4 reveal">
        ${[
          { label: 'Average delivery', value: '1–2 wks', icon: 'fa-clock', gold: false },
          { label: 'Satisfaction focus', value: '100%', icon: 'fa-star', gold: true },
          { label: 'Our speciality', value: 'Static', icon: 'fa-globe', gold: false },
          { label: 'Founded in Ipswich', value: '2025', icon: 'fa-location-dot', gold: false },
        ].map(s => `
          <div class="${s.gold ? 'bg-amber-400 border-amber-400' : 'bg-white border-obsidian-200'} border-2 rounded-xl p-6 flex flex-col gap-3">
            <i class="fas ${s.icon} text-lg ${s.gold ? 'text-obsidian-900' : 'text-obsidian-400'}"></i>
            <p class="font-display font-bold text-2xl ${s.gold ? 'text-obsidian-900' : 'text-obsidian-900'}">${s.value}</p>
            <p class="text-xs ${s.gold ? 'text-obsidian-700' : 'text-obsidian-400'}">${s.label}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── CTA ──────────────────────────────────────────────────────────────── -->
<section class="stripe-dark py-24 relative overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
  <div class="max-w-4xl mx-auto px-6 lg:px-10 text-center reveal">
    <h2 class="display-xl text-white mb-6" style="font-size:clamp(2rem,4.5vw,3.5rem);">
      Sound like a good fit?<br/><span class="text-amber-400">Let's talk.</span>
    </h2>
    <p class="text-white/45 text-lg mb-10 max-w-lg mx-auto leading-relaxed" style="font-weight:300;">
      No commitment required. Tell us what you need and we'll give you an honest, no-pressure quote.
    </p>
    <a href="/contact" class="btn-gold px-8 py-4 text-base">
      Get in Touch <i class="fas fa-arrow-right text-sm"></i>
    </a>
  </div>
</section>
`

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const ContactPage = () => `

<!-- ── HERO ─────────────────────────────────────────────────────────────────── -->
<section class="stripe-dark relative overflow-hidden pt-36 pb-28">
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
  <div class="absolute inset-0 pointer-events-none" style="background-image:url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M40 0v80M0 40h80' stroke='%23ffffff' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/g%3E%3C/svg%3E\");"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
    <div class="max-w-2xl">
      <div class="pill pill-dark mb-8">
        <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        We reply within 24 hours
      </div>
      <h1 class="display-xl text-white mb-5" style="font-size:clamp(2.5rem,6vw,4.5rem);">
        Let's get your<br/><span class="text-amber-400">project started</span>
      </h1>
      <p class="text-white/45 text-lg leading-relaxed" style="font-weight:300;">
        Tell us about your business and what you're looking for. We'll come back with an honest quote — no obligation, no hard sell.
      </p>
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 h-16 bg-obsidian-50" style="clip-path:polygon(0 100%,100% 100%,100% 0)"></div>
</section>

<!-- ── CONTACT BODY ────────────────────────────────────────────────────────── -->
<section class="stripe-sand py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-5 gap-12 items-start">

      <!-- Left sidebar info -->
      <div class="lg:col-span-2 space-y-4 reveal">
        <div class="mb-6">
          <h2 class="font-display font-bold text-2xl text-obsidian-900 mb-2">Get in Touch</h2>
          <p class="text-obsidian-500 text-sm leading-relaxed">Whether you're ready to go or just exploring — we're happy to chat. Fill in the form or reach out directly.</p>
        </div>

        ${[
          { icon: 'fa-phone', title: 'Phone', val: '07518 009604', sub: 'Mon – Fri, 9am – 6pm', href: 'tel:07518009604' },
          { icon: 'fa-envelope', title: 'Email', val: 'riaz.darwinboyd@gmail.com', sub: 'We reply within 24 hours', href: 'mailto:riaz.darwinboyd@gmail.com' },
          { icon: 'fa-location-dot', title: 'Location', val: 'Ipswich, Suffolk', sub: 'Serving clients UK-wide', href: '#' },
        ].map(c => `
          <a href="${c.href}" class="flex items-start gap-4 bg-white rounded-xl p-4 border border-obsidian-200 card-lift block">
            <div class="w-9 h-9 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <i class="fas ${c.icon} text-amber-600 text-sm"></i>
            </div>
            <div>
              <p class="label-upper text-obsidian-400 mb-0.5">${c.title}</p>
              <p class="font-semibold text-obsidian-900 text-sm">${c.val}</p>
              <p class="text-obsidian-400 text-xs mt-0.5">${c.sub}</p>
            </div>
          </a>
        `).join('')}

        <!-- What to expect -->
        <div class="bg-white rounded-xl p-5 border border-obsidian-200">
          <p class="font-display font-bold text-obsidian-900 text-sm mb-4">What happens next?</p>
          <div class="space-y-3">
            ${[
              'We read your message and reply within 24 hours',
              'We ask any questions needed to understand your project',
              'We send a clear, honest quote — no hidden extras',
              'If you\'re happy, we get started. Simple as that.',
            ].map((s, i) => `
              <div class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${i + 1}</span>
                <p class="text-obsidian-500 text-xs leading-relaxed">${s}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="lg:col-span-3 reveal">
        <div class="bg-white rounded-2xl border border-obsidian-200 p-8 lg:p-10" id="contact-form-wrapper">
          <h3 class="font-display font-bold text-xl text-obsidian-900 mb-1">Tell Us About Your Project</h3>
          <p class="text-obsidian-400 text-sm mb-7">The more detail you give us, the more accurate our quote will be.</p>

          <form id="contact-form" class="space-y-5" onsubmit="handleSubmit(event)">
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">First Name <span class="text-red-400 normal-case">*</span></label>
                <input type="text" name="firstName" required placeholder="Your first name" class="form-input" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">Last Name <span class="text-red-400 normal-case">*</span></label>
                <input type="text" name="lastName" required placeholder="Your last name" class="form-input" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">Email Address <span class="text-red-400 normal-case">*</span></label>
              <input type="email" name="email" required placeholder="you@example.com" class="form-input" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">Phone Number</label>
              <input type="tel" name="phone" placeholder="Optional — but handy for a quick call" class="form-input" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">Business Name <span class="text-red-400 normal-case">*</span></label>
              <input type="text" name="company" required placeholder="e.g. Dave's Barbershop, Suffolk Plumbing Co." class="form-input" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">What do you need? <span class="text-red-400 normal-case">*</span></label>
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
              <label class="block text-xs font-semibold text-obsidian-700 mb-3 uppercase tracking-wide">Approximate Budget <span class="text-obsidian-400 font-normal normal-case text-xs ml-1">(helps us tailor our suggestion)</span></label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                ${['£100–£300', '£300–£700', '£700–£1,500', '£1,500+'].map((b, i) => `
                  <label class="cursor-pointer">
                    <input type="radio" name="budget" value="${b}" class="peer sr-only" ${i === 1 ? 'checked' : ''} />
                    <div class="peer-checked:bg-amber-50 peer-checked:border-amber-400 peer-checked:text-amber-800 bg-obsidian-50 border-2 border-obsidian-200 rounded-lg px-2 py-3 text-xs font-semibold text-obsidian-500 text-center transition-all hover:border-amber-300 leading-tight font-display">
                      ${b}
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">Tell Us More <span class="text-red-400 normal-case">*</span></label>
              <textarea name="message" required rows="5" placeholder="Tell us about your business, what you'd like on the site, any pages you need, websites you like the look of — anything that helps."
                class="form-input resize-none"></textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-obsidian-700 mb-1.5 uppercase tracking-wide">How did you find us?</label>
              <select name="source" class="form-input appearance-none">
                <option value="">Select an option...</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Someone recommended you</option>
                <option value="local">Locally in Ipswich</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" class="btn-gold w-full px-6 py-4 text-base justify-center font-bold">
              Send My Enquiry <i class="fas fa-paper-plane text-sm"></i>
            </button>

            <p class="text-xs text-obsidian-400 text-center">
              <i class="fas fa-lock mr-1"></i> Your details are safe. We'll never share them with anyone.
            </p>
          </form>

          <!-- Success state -->
          <div id="success-state" class="hidden text-center py-12">
            <div class="w-16 h-16 mx-auto bg-green-50 border-2 border-green-200 rounded-2xl flex items-center justify-center mb-6">
              <i class="fas fa-check text-green-500 text-2xl"></i>
            </div>
            <h3 class="font-display font-bold text-2xl text-obsidian-900 mb-3">Message Received!</h3>
            <p class="text-obsidian-500 text-sm leading-relaxed max-w-sm mx-auto">
              Thanks for getting in touch. We'll review your project and get back to you within 24 hours with an honest quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── FAQ ──────────────────────────────────────────────────────────────── -->
<section class="stripe-white py-24 border-t border-obsidian-200">
  <div class="max-w-3xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-12 reveal">
      <span class="pill mb-5">FAQ</span>
      <h2 class="display-lg text-obsidian-900 mb-3" style="font-size:clamp(1.8rem,3.5vw,2.5rem);">Frequently asked questions</h2>
      <p class="text-obsidian-400 text-sm">Straight answers to the things people usually want to know.</p>
    </div>

    <div class="space-y-3 reveal">
      ${[
        {
          q: 'How much does a website cost?',
          a: 'Our pricing is straightforward. Most small business static websites fall between £100 and £700 depending on the number of pages and complexity. Larger or more detailed projects can go up to £1,500 or more. We always agree the price before starting — no surprises, no hidden extras. Get in touch for a free quote.'
        },
        {
          q: 'What kinds of businesses do you build websites for?',
          a: 'We work with all sorts of local and small businesses — barbers, restaurants, cafés, tradesmen (plumbers, electricians, decorators), photographers, freelancers, personal trainers, local shops, and anyone who needs a clean, professional, converting online presence. If you\'re not sure if we\'re a fit, just ask.'
        },
        {
          q: 'How long does it take?',
          a: 'Most websites are completed within 1–2 weeks once we have your content (text, photos, etc.). We\'ll agree a clear timeline before starting so you know exactly what to expect.'
        },
        {
          q: 'What\'s a static website — and is it right for me?',
          a: 'A static website is one where the pages are pre-built and served directly to your visitors — no database, no CMS, no plugins. They load faster, are more secure, and cost less to run than WordPress sites. Faster loading also directly improves your conversion rate, because people are less likely to leave before your site loads. For most small businesses, they\'re the perfect fit.'
        },
        {
          q: 'What does "conversion rate optimisation" mean for my website?',
          a: 'It means we design your site to turn visitors into actual enquiries — not just look good. Things like clear calls-to-action, trust signals in the right places, phone numbers that are easy to find, and page layouts that guide people naturally towards getting in touch. A lot of websites skip this entirely. We don\'t.'
        },
        {
          q: 'Can I update the website myself?',
          a: 'For most changes (text, images, contact info), we handle updates for you quickly and at no extra cost for minor tweaks. If you want bigger changes down the line, we\'ll discuss a fair price. We keep things simple and won\'t leave you stuck.'
        },
        {
          q: 'Do you work with businesses outside Ipswich?',
          a: 'Absolutely. We\'re based in Ipswich but work with clients anywhere in the UK. Everything can be done remotely — a quick call or message is all it takes to get started.'
        },
      ].map((faq, i) => `
        <div class="bg-white border border-obsidian-200 rounded-xl overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-obsidian-50 transition-colors">
            <span class="font-display font-semibold text-obsidian-900 text-sm">${faq.q}</span>
            <i class="fas fa-plus text-obsidian-300 text-sm flex-shrink-0 faq-icon transition-transform"></i>
          </button>
          <div class="faq-body px-6">
            <p class="text-obsidian-500 text-sm leading-relaxed">${faq.a}</p>
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
    setTimeout(() => {
      form.classList.add('hidden');
      success.classList.remove('hidden');
    }, 300);
  }

  function toggleFaq(btn) {
    const body = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = body.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.faq-icon').forEach(i => {
      i.classList.remove('fa-minus');
      i.classList.add('fa-plus');
      i.style.transform = 'rotate(0deg)';
    });
    if (!isOpen) {
      body.classList.add('open');
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-minus');
    }
  }
</script>
`

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════════
app.get('/', (c) => {
  return c.html(Layout({ children: HomePage(), title: 'Obsidian Digital | Static Website Design for Small Businesses, Ipswich' }))
})

app.get('/about', (c) => {
  return c.html(Layout({ children: AboutPage(), title: 'About Us | Obsidian Digital — Ipswich Web Design' }))
})

app.get('/contact', (c) => {
  return c.html(Layout({ children: ContactPage(), title: 'Get a Free Quote | Obsidian Digital Web Design' }))
})

app.post('/api/contact', async (c) => {
  const data = await c.req.json()
  console.log('Contact form submission:', data)
  return c.json({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' })
})

export default app
