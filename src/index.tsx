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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
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
              50: '#f0f4ff',
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
          },
          animation: {
            'float': 'float 6s ease-in-out infinite',
            'fade-in': 'fadeIn 0.5s ease-out forwards',
          },
          keyframes: {
            float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
            fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
          }
        }
      }
    }
  </script>
  <style>
    * { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; }
    .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
    .gradient-text {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-gradient {
      background: radial-gradient(ellipse at 60% 0%, rgba(99,102,241,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 0% 80%, rgba(168,85,247,0.10) 0%, transparent 60%),
                  #0a0a0f;
    }
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(99,102,241,0.15); }
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -4px; left: 0;
      width: 0; height: 2px;
      background: linear-gradient(90deg, #6366f1, #a855f7);
      transition: width 0.3s ease;
    }
    .nav-link:hover::after { width: 100%; }
    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(99,102,241,0.35);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.5); }
    .btn-outline { transition: all 0.3s ease; border: 2px solid rgba(99,102,241,0.5); }
    .btn-outline:hover { background: rgba(99,102,241,0.08); border-color: #6366f1; transform: translateY(-2px); }
    .glow { box-shadow: 0 0 40px rgba(99,102,241,0.25); }
    .section-light { background: #ffffff; }
    .section-subtle { background: #f8f7ff; }
    .tag-pill {
      background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
      border: 1px solid rgba(99,102,241,0.2);
    }
    #mobile-menu { display: none; }
    #mobile-menu.open { display: block; }
    .hamburger-line { display: block; width: 24px; height: 2px; background: white; margin: 5px 0; transition: all 0.3s ease; }
    .animate-on-scroll { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .animate-on-scroll.visible { opacity: 1; transform: translateY(0); }
    input:focus, textarea:focus, select:focus {
      outline: none; border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
    }
    .service-card { transition: all 0.3s ease; }
    .service-card:hover { transform: translateY(-4px); }
  </style>
</head>
<body class="antialiased text-gray-900 overflow-x-hidden">
  ${Navbar()}
  <main>${children}</main>
  ${Footer()}
  <script>
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.background = 'rgba(10,10,15,0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = '1px solid transparent';
      }
    });
  </script>
</body>
</html>
`

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => `
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style="background:transparent;border-bottom:1px solid transparent;">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex items-center justify-between py-4">
      <a href="/" class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl btn-primary flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
            <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
          </svg>
        </div>
        <span class="font-display font-bold text-xl text-white tracking-tight">Obsidian<span class="gradient-text"> Digital</span></span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a href="/" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Home</a>
        <a href="/about" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">About</a>
        <a href="/#services" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Services</a>
        <a href="/#work" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Work</a>
        <a href="/contact" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Contact</a>
      </div>

      <div class="hidden md:flex items-center">
        <a href="/contact" class="btn-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl">
          Get a Free Quote
        </a>
      </div>

      <button id="hamburger" class="md:hidden flex flex-col justify-center p-2">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>

  <div id="mobile-menu" class="md:hidden" style="background:rgba(10,10,15,0.98);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.06);">
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
      <a href="/" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Home</a>
      <a href="/about" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">About</a>
      <a href="/#services" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Services</a>
      <a href="/#work" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Work</a>
      <a href="/contact" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Contact</a>
      <a href="/contact" class="btn-primary text-white font-semibold text-sm px-5 py-3 rounded-xl text-center mt-2">Get a Free Quote</a>
    </div>
  </div>
</nav>
`

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => `
<footer class="bg-gray-950 border-t border-white/5">
  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div class="md:col-span-2">
        <a href="/" class="flex items-center gap-2.5 mb-5">
          <div class="w-9 h-9 rounded-xl btn-primary flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
              <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            </svg>
          </div>
          <span class="font-display font-bold text-xl text-white tracking-tight">Obsidian<span class="gradient-text"> Digital</span></span>
        </a>
        <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
          Clean, fast, affordable static websites for small businesses across Ipswich and the UK. Built properly. Priced fairly.
        </p>
        <div class="flex gap-3 mt-6">
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"><i class="fab fa-instagram text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"><i class="fab fa-linkedin-in text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"><i class="fab fa-twitter text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"><i class="fab fa-facebook-f text-sm"></i></a>
        </div>
      </div>

      <div>
        <h4 class="text-white font-semibold text-sm mb-5">Services</h4>
        <ul class="space-y-3">
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">Static Website Design</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">Mobile-Responsive Builds</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">SEO Foundations</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">Website Copywriting</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">Ongoing Support</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold text-sm mb-5">Company</h4>
        <ul class="space-y-3">
          <li><a href="/about" class="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></li>
          <li><a href="/#work" class="text-gray-400 hover:text-white text-sm transition-colors">Our Work</a></li>
          <li><a href="/contact" class="text-gray-400 hover:text-white text-sm transition-colors">Contact</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
        </ul>
        <div class="mt-6 p-4 rounded-xl bg-white/3 border border-white/5 space-y-1.5">
          <p class="text-gray-400 text-xs">📍 Ipswich, Suffolk</p>
          <p class="text-gray-400 text-xs">📞 07518 009604</p>
          <p class="text-gray-400 text-xs">✉️ riaz.darwinboyd@gmail.com</p>
        </div>
      </div>
    </div>

    <div class="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-gray-500 text-sm">© 2025 Obsidian Digital. All rights reserved.</p>
      <p class="text-gray-500 text-sm">Proudly built in <span class="text-brand-400">Ipswich, Suffolk</span> 🏴󠁧󠁢󠁥󠁮󠁧󠁿</p>
    </div>
  </div>
</footer>
`

// ═══════════════════════════════════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════════════
const HomePage = () => `

<!-- HERO -->
<section class="hero-gradient min-h-screen flex items-center relative overflow-hidden">
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
    <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 relative z-10">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-2 mb-8">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span class="text-brand-300 text-sm font-medium">Based in Ipswich · Now taking on clients</span>
        </div>

        <h1 class="font-display font-extrabold text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight mb-6">
          A Website Your Business <span class="gradient-text">Actually Deserves</span>
        </h1>

        <p class="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
          We build clean, fast, mobile-friendly static websites for local businesses — barbers, restaurants, tradesmen, creatives and more. Professional results at prices that make sense.
        </p>

        <div class="flex flex-wrap gap-4 mb-12">
          <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-xl text-base">
            Get a Free Quote <i class="fas fa-arrow-right text-sm"></i>
          </a>
          <a href="/#services" class="btn-outline inline-flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-xl text-base">
            See What We Offer
          </a>
        </div>

        <div class="flex flex-wrap gap-x-7 gap-y-3 items-center">
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <i class="fas fa-check-circle text-brand-400 text-xs"></i> No templates — built from scratch
          </div>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <i class="fas fa-check-circle text-brand-400 text-xs"></i> Mobile-first design
          </div>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <i class="fas fa-check-circle text-brand-400 text-xs"></i> Fixed, transparent pricing
          </div>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <i class="fas fa-check-circle text-brand-400 text-xs"></i> Delivered in 1–2 weeks
          </div>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="relative hidden lg:block">
        <div class="relative animate-float">
          <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl glow">
            <div class="bg-gray-800/80 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400/70"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400/70"></div>
                <div class="w-3 h-3 rounded-full bg-green-400/70"></div>
              </div>
              <div class="flex-1 mx-4 bg-gray-700/50 rounded-md px-3 py-1 text-xs text-gray-400 text-center">yourbusiness.co.uk</div>
            </div>
            <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
              <!-- Mock nav -->
              <div class="flex items-center justify-between mb-6">
                <div class="h-3 w-24 bg-brand-500/40 rounded-full"></div>
                <div class="flex gap-2">
                  <div class="h-2 w-10 bg-white/15 rounded-full"></div>
                  <div class="h-2 w-10 bg-white/15 rounded-full"></div>
                  <div class="h-2 w-10 bg-white/15 rounded-full"></div>
                </div>
              </div>
              <!-- Mock hero -->
              <div class="mb-5">
                <div class="h-4 bg-white/20 rounded-full w-4/5 mb-2.5"></div>
                <div class="h-4 bg-brand-500/35 rounded-full w-3/5 mb-4"></div>
                <div class="h-2 bg-white/10 rounded-full w-full mb-1.5"></div>
                <div class="h-2 bg-white/10 rounded-full w-5/6 mb-5"></div>
                <div class="flex gap-3">
                  <div class="h-9 bg-brand-500/70 rounded-lg w-28"></div>
                  <div class="h-9 bg-white/10 rounded-lg w-24 border border-white/10"></div>
                </div>
              </div>
              <!-- Mock service cards -->
              <div class="grid grid-cols-3 gap-3">
                ${['bg-brand-500/20', 'bg-purple-500/20', 'bg-pink-500/20'].map(c => `
                  <div class="h-16 ${c} rounded-xl border border-white/5 p-2.5">
                    <div class="w-5 h-5 bg-white/20 rounded mb-1.5"></div>
                    <div class="h-1.5 bg-white/20 rounded w-full mb-1"></div>
                    <div class="h-1.5 bg-white/10 rounded w-2/3"></div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Floating badges -->
          <div class="absolute -top-5 -left-8 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 bg-green-500/15 rounded-lg flex items-center justify-center">
                <i class="fas fa-mobile-screen text-green-400 text-xs"></i>
              </div>
              <div>
                <div class="text-white font-bold text-sm">100%</div>
                <div class="text-gray-400 text-xs">Mobile Ready</div>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-5 -right-6 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 bg-brand-500/15 rounded-lg flex items-center justify-center">
                <i class="fas fa-bolt text-brand-400 text-xs"></i>
              </div>
              <div>
                <div class="text-white font-bold text-sm">Fast Load</div>
                <div class="text-gray-400 text-xs">Every time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full">
      <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 43C1200 37 1320 23 1380 17L1440 10V80H0Z" fill="#ffffff"/>
    </svg>
  </div>
</section>

<!-- WHO WE BUILD FOR -->
<section class="section-light py-14 border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <p class="text-center text-gray-400 text-sm font-medium uppercase tracking-widest mb-8">Perfect for businesses like these</p>
    <div class="flex flex-wrap justify-center items-center gap-4 md:gap-6">
      ${[
        { icon: 'fa-scissors', label: 'Barbers' },
        { icon: 'fa-utensils', label: 'Restaurants' },
        { icon: 'fa-hard-hat', label: 'Tradesmen' },
        { icon: 'fa-camera', label: 'Photographers' },
        { icon: 'fa-store', label: 'Local Shops' },
        { icon: 'fa-paint-roller', label: 'Decorators' },
        { icon: 'fa-briefcase', label: 'Freelancers' },
        { icon: 'fa-music', label: 'Creatives' },
      ].map(b => `
        <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5">
          <i class="fas ${b.icon} text-brand-500 text-sm"></i>
          <span class="text-gray-700 font-medium text-sm">${b.label}</span>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" class="section-light py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-16 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">What We Offer</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 mb-5 tracking-tight">
        Everything You Need to <span class="gradient-text">Look the Part Online</span>
      </h2>
      <p class="text-gray-500 text-lg max-w-2xl mx-auto">
        We keep things focused. No bloated packages, no services we can't deliver well — just exactly what a small business needs to build a strong online presence.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      ${[
        {
          icon: 'fa-pen-ruler',
          color: 'bg-brand-50 text-brand-600',
          title: 'Custom Website Design',
          desc: 'Every website we build is designed from scratch around your business. Your colours, your vibe, your content — no generic templates that look like everyone else\'s site.',
          tags: ['Bespoke layouts', 'On-brand visuals', 'Clean modern look']
        },
        {
          icon: 'fa-mobile-screen',
          color: 'bg-purple-50 text-purple-600',
          title: 'Mobile-First Development',
          desc: 'Most of your customers will find you on their phone. Every site we build looks and works perfectly on all screen sizes — phones, tablets, and desktops.',
          tags: ['Fully responsive', 'Touch-friendly', 'Fast on mobile']
        },
        {
          icon: 'fa-bolt',
          color: 'bg-yellow-50 text-yellow-600',
          title: 'Fast & Lightweight Builds',
          desc: 'Our sites load in a flash. Static websites have no heavy databases or slow plugins — just clean code that your visitors (and Google) will love.',
          tags: ['Quick load times', 'No bloat', 'Smooth experience']
        },
        {
          icon: 'fa-magnifying-glass',
          color: 'bg-green-50 text-green-600',
          title: 'SEO Foundations',
          desc: 'Every site we build is set up to be found. We handle the technical groundwork — proper page structure, meta tags, fast loading, and mobile optimisation — so you\'re ready to rank.',
          tags: ['Meta tags & titles', 'Structured content', 'Google-ready']
        },
        {
          icon: 'fa-file-lines',
          color: 'bg-orange-50 text-orange-600',
          title: 'Content & Copywriting Help',
          desc: 'Not sure what to write? We can help. Whether you need a gentle steer or want us to write the whole thing, we\'ll make sure your site says the right things to the right people.',
          tags: ['Clear messaging', 'Engaging copy', 'Conversion-focused']
        },
        {
          icon: 'fa-screwdriver-wrench',
          color: 'bg-cyan-50 text-cyan-600',
          title: 'Aftercare & Updates',
          desc: 'Need to change your opening hours, update a price, or tweak a section? We\'re here after launch too. Small updates, questions, or future changes — just drop us a message.',
          tags: ['Post-launch help', 'Quick updates', 'Friendly support']
        },
      ].map((s, i) => `
        <div class="service-card card-hover bg-white border border-gray-100 rounded-2xl p-7 animate-on-scroll" style="animation-delay: ${i * 80}ms">
          <div class="w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-5">
            <i class="fas ${s.icon} text-lg"></i>
          </div>
          <h3 class="font-display font-bold text-lg text-gray-900 mb-3">${s.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-5">${s.desc}</p>
          <div class="flex flex-wrap gap-2">
            ${s.tags.map(t => `<span class="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">${t}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- What we don't do — transparency box -->
    <div class="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 animate-on-scroll">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
          <i class="fas fa-circle-info text-brand-500"></i>
        </div>
        <div>
          <h4 class="font-display font-bold text-gray-900 mb-2">Honest about what we do</h4>
          <p class="text-gray-500 text-sm leading-relaxed">
            We specialise in <strong class="text-gray-700">static websites</strong> — which means we don't currently build complex web applications, customer login portals, or database-driven platforms. What we <em>do</em> build, we build really well. If you need a clean, professional online presence that loads fast and looks great, you're in exactly the right place.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-16 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">How It Works</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 mb-5 tracking-tight">
        Simple Process, <span class="gradient-text">Great Results</span>
      </h2>
      <p class="text-gray-500 text-base max-w-xl mx-auto">No confusing briefs or lengthy onboarding. We keep it simple so you can focus on running your business.</p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
      <div class="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-100 via-brand-400 to-brand-100 z-0"></div>
      ${[
        { step: '01', icon: 'fa-comments', title: 'Chat With Us', desc: 'Tell us about your business, what you need, and any ideas you have. No jargon, no pressure — just a friendly conversation.' },
        { step: '02', icon: 'fa-pen-ruler', title: 'We Design It', desc: 'We put together a design based on your brand, your goals, and your audience. You review it and we refine until it\'s exactly right.' },
        { step: '03', icon: 'fa-code', title: 'We Build It', desc: 'Once you\'re happy with the design, we build the site — clean code, fast performance, and tested on every screen size.' },
        { step: '04', icon: 'fa-rocket', title: 'We Launch It', desc: 'Your site goes live. We make sure everything is working, hand it over properly, and stay on hand for any follow-up questions.' },
      ].map((p, i) => `
        <div class="relative z-10 text-center animate-on-scroll" style="animation-delay: ${i * 100}ms">
          <div class="w-20 h-20 mx-auto bg-white border-2 border-brand-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm relative">
            <i class="fas ${p.icon} text-brand-600 text-xl"></i>
            <span class="absolute -top-2.5 -right-2.5 w-7 h-7 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">${p.step}</span>
          </div>
          <h3 class="font-display font-bold text-gray-900 mb-3">${p.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">${p.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- WHY STATIC -->
<section class="hero-gradient py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-12 animate-on-scroll">
      <h2 class="font-display font-extrabold text-3xl lg:text-4xl text-white mb-4 tracking-tight">Why <span class="gradient-text">Static Websites</span> Are the Smart Choice</h2>
      <p class="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">Most small businesses don't need a complex CMS. A static website gives you everything you actually need — and none of what you don't.</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      ${[
        { icon: 'fa-bolt', title: 'Loads Instantly', desc: 'No server processing or database queries. Your site is served straight to the visitor — fast every single time.' },
        { icon: 'fa-shield-halved', title: 'Inherently Secure', desc: 'No login pages, no plugins to exploit, no CMS vulnerabilities. Static sites are far harder to hack.' },
        { icon: 'fa-sterling-sign', title: 'Low Running Costs', desc: 'Static sites can be hosted for very little — sometimes free. You\'re not paying ongoing platform fees every month.' },
        { icon: 'fa-face-smile', title: 'Hassle Free', desc: 'No software to update, no plugins to maintain, no surprise breakages. It just works.' },
      ].map((s, i) => `
        <div class="animate-on-scroll bg-white/5 border border-white/10 rounded-2xl p-6 text-center" style="animation-delay: ${i * 100}ms">
          <div class="w-12 h-12 mx-auto bg-brand-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas ${s.icon} text-brand-300 text-lg"></i>
          </div>
          <div class="font-display font-bold text-white text-base mb-2">${s.title}</div>
          <div class="text-gray-400 text-xs leading-relaxed">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- PORTFOLIO -->
<section id="work" class="section-light py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 animate-on-scroll">
      <div>
        <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
          <span class="text-brand-600 text-sm font-medium">Our Work</span>
        </div>
        <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight">
          Recent <span class="gradient-text">Projects</span>
        </h2>
      </div>
      <a href="/contact" class="btn-outline text-brand-600 border-brand-300 font-semibold px-6 py-3 rounded-xl text-sm self-start md:self-auto">
        Start Your Project <i class="fas fa-arrow-right ml-1.5 text-xs"></i>
      </a>
    </div>

    <div class="max-w-2xl mx-auto text-center animate-on-scroll">
      <div class="bg-white border-2 border-dashed border-brand-200 rounded-3xl p-14">
        <div class="w-16 h-16 mx-auto bg-brand-50 rounded-2xl flex items-center justify-center mb-5">
          <i class="fas fa-images text-brand-400 text-2xl"></i>
        </div>
        <h3 class="font-display font-bold text-xl text-gray-900 mb-3">Portfolio Coming Soon</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-6">We've just launched and are actively taking on our first clients. Check back here soon — this section will showcase real websites we've built for real businesses.</p>
        <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm">
          Be Our First Client <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- REVIEWS -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-14 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">Reviews</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight">
        Client Reviews <span class="gradient-text">Coming Soon</span>
      </h2>
      <p class="text-gray-500 text-base mt-5 max-w-xl mx-auto">We're brand new and building our reputation one client at a time. Be one of the first — and if we do a great job, we'd love for you to tell people.</p>
    </div>
    <div class="max-w-2xl mx-auto animate-on-scroll">
      <div class="bg-white border-2 border-dashed border-brand-200 rounded-3xl p-12 text-center">
        <div class="flex justify-center gap-1.5 mb-5">
          ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-gray-200 text-2xl"></i>').join('')}
        </div>
        <h3 class="font-display font-bold text-xl text-gray-900 mb-3">Your Review Could Be First</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-6">We put everything into every project we take on. Get in touch today and experience it for yourself.</p>
        <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm">
          Work With Us <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="hero-gradient py-24">
  <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
    <div class="animate-on-scroll">
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-white mb-6 tracking-tight">
        Ready to Get Your Business <span class="gradient-text">Online Properly?</span>
      </h2>
      <p class="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
        Get in touch for a free, no-obligation quote. We'll listen to what you need, be straight with you about cost, and get started fast.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base">
          Get a Free Quote <i class="fas fa-arrow-right text-sm"></i>
        </a>
        <a href="tel:07518009604" class="btn-outline inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base">
          <i class="fas fa-phone text-brand-400 text-sm"></i> 07518 009604
        </a>
      </div>
    </div>
  </div>
</section>
`

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const AboutPage = () => `
<!-- PAGE HERO -->
<section class="hero-gradient pt-32 pb-24 relative overflow-hidden">
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/3 right-1/3 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
    <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="grid2" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs>
      <rect width="100%" height="100%" fill="url(#grid2)" />
    </svg>
  </div>
  <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
    <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-2 mb-7">
      <span class="text-brand-300 text-sm font-medium">About Obsidian Digital</span>
    </div>
    <h1 class="font-display font-extrabold text-5xl lg:text-6xl text-white leading-tight mb-6 tracking-tight">
      We Started Because <br class="hidden md:block"/><span class="gradient-text">Better Was Possible</span>
    </h1>
    <p class="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
      Too many small businesses are paying too much for websites that look average. We're here to change that.
    </p>
  </div>
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full">
      <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 43C1200 37 1320 23 1380 17L1440 10V80H0Z" fill="#ffffff"/>
    </svg>
  </div>
</section>

<!-- STORY -->
<section class="section-light py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="animate-on-scroll">
        <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-6">
          <span class="text-brand-600 text-sm font-medium">Our Story</span>
        </div>
        <h2 class="font-display font-extrabold text-4xl text-gray-900 mb-6 tracking-tight leading-tight">
          Honest Work. <span class="gradient-text">Fair Prices. Real Results.</span>
        </h2>
        <p class="text-gray-500 leading-relaxed mb-5">
          Obsidian Digital was founded in 2025 by Riaz Darwin-Boyd, a Computer Science student from Ipswich who noticed something frustrating: local businesses were either paying thousands to big agencies for something they didn't need, or settling for cheap template sites that looked like everyone else's.
        </p>
        <p class="text-gray-500 leading-relaxed mb-5">
          There's a real gap in the middle — businesses that just want a <em>genuinely good</em> website, without the big agency price tag and without the template compromise. That's exactly where we sit.
        </p>
        <p class="text-gray-500 leading-relaxed mb-5">
          We build custom static websites — clean, fast, mobile-friendly — for the kinds of businesses that are the backbone of every town: barbers, restaurants, tradesmen, photographers, freelancers, local shops. People who are brilliant at what they do, but don't have a website that shows it.
        </p>
        <p class="text-gray-500 leading-relaxed mb-8">
          We're new, and we're proud of that. It means we're genuinely invested in every project. You'll never be an afterthought here — you'll work directly with Riaz, get straight answers, and end up with something you're actually proud to share.
        </p>
        <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl">
          Let's Talk <i class="fas fa-arrow-right text-sm"></i>
        </a>
      </div>

      <div class="relative animate-on-scroll">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-br from-brand-50 to-purple-50 rounded-3xl transform rotate-3"></div>
          <div class="relative bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-8">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl h-36 flex flex-col items-center justify-center text-white text-center px-4">
                <i class="fas fa-laptop-code text-3xl mb-2 opacity-90"></i>
                <span class="text-sm font-semibold">CS Student</span>
                <span class="text-xs opacity-70 mt-0.5">Ipswich</span>
              </div>
              <div class="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl h-36 flex flex-col items-center justify-center text-white text-center px-4">
                <i class="fas fa-hand-holding-heart text-3xl mb-2 opacity-90"></i>
                <span class="text-sm font-semibold">Client-First</span>
                <span class="text-xs opacity-70 mt-0.5">Always</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-2xl p-5 text-center">
                <div class="text-2xl font-display font-bold text-gray-900">2025</div>
                <div class="text-xs text-gray-500 mt-0.5">Founded</div>
              </div>
              <div class="bg-gray-50 rounded-2xl p-5 text-center">
                <div class="text-2xl font-display font-bold text-gray-900">1–2 wk</div>
                <div class="text-xs text-gray-500 mt-0.5">Avg. Delivery</div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute -top-4 -right-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-lg">
          <div class="flex items-center gap-2">
            <span class="text-lg">🚀</span>
            <span class="text-xs font-semibold text-gray-700">Now Taking on Clients</span>
          </div>
          <div class="text-xs text-gray-400 mt-0.5">Get in early — 2025</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-16 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">What We Stand For</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight">
        The Way We <span class="gradient-text">Work</span>
      </h2>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
      ${[
        { icon: 'fa-handshake', color: 'bg-brand-50 text-brand-600', title: 'Straight Talking', desc: 'We tell you what things actually cost, what\'s realistic, and what we think is right for your project — no fluff, no upselling.' },
        { icon: 'fa-pen-ruler', color: 'bg-purple-50 text-purple-600', title: 'Proper Craft', desc: 'Every site is built with care. Clean code, considered design, tested properly. We\'re not cutting corners to turn things around quickly.' },
        { icon: 'fa-person-running', color: 'bg-pink-50 text-pink-600', title: 'Quick & Responsive', desc: 'We get back to people quickly and keep projects moving. No waiting days for a reply or weeks for a simple update.' },
        { icon: 'fa-bullseye', color: 'bg-green-50 text-green-600', title: 'Built for Purpose', desc: 'Every decision we make — layout, copy, structure — is made with one goal: helping your business look great and attract customers.' },
      ].map((v, i) => `
        <div class="card-hover bg-white rounded-2xl p-7 border border-gray-100 text-center animate-on-scroll" style="animation-delay: ${i * 80}ms">
          <div class="w-14 h-14 mx-auto ${v.color} rounded-2xl flex items-center justify-center mb-5">
            <i class="fas ${v.icon} text-xl"></i>
          </div>
          <h3 class="font-display font-bold text-gray-900 mb-3">${v.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">${v.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- FOUNDER -->
<section class="section-light py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-14 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">Who You're Working With</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight">
        The Person Behind <span class="gradient-text">Your Project</span>
      </h2>
    </div>

    <div class="max-w-3xl mx-auto animate-on-scroll">
      <div class="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div class="flex-shrink-0">
          <div class="w-28 h-28 bg-gradient-to-br from-brand-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <i class="fas fa-laptop-code text-white text-4xl"></i>
          </div>
        </div>
        <div>
          <h3 class="font-display font-bold text-2xl text-gray-900 mb-1">Riaz Darwin-Boyd</h3>
          <p class="text-brand-600 font-medium text-sm mb-4">Founder & Web Designer, Obsidian Digital</p>
          <p class="text-gray-500 text-sm leading-relaxed mb-4">
            I'm a Computer Science student from Ipswich with a genuine passion for clean design and well-built websites. I started Obsidian Digital because I wanted to offer something I felt was missing locally — websites that genuinely look and work great, without the inflated agency prices.
          </p>
          <p class="text-gray-500 text-sm leading-relaxed mb-5">
            When you work with Obsidian Digital, you're working with me directly. I'll take the time to understand your business properly, be honest about what I can deliver, and build you something that you're actually proud to show people.
          </p>
          <div class="flex flex-wrap gap-2">
            ${['Web Design', 'HTML & CSS', 'JavaScript', 'Mobile-First', 'SEO Basics', 'Clean Code'].map(s =>
              `<span class="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">${s}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHY CHOOSE US -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="animate-on-scroll">
        <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-6">
          <span class="text-brand-600 text-sm font-medium">Why Obsidian Digital</span>
        </div>
        <h2 class="font-display font-extrabold text-4xl text-gray-900 mb-8 tracking-tight leading-tight">
          What Makes Us <span class="gradient-text">Different</span>
        </h2>
        <div class="space-y-5">
          ${[
            { icon: 'fa-check-circle', text: 'You speak to Riaz directly — not an account manager or a chatbot. Real communication throughout.' },
            { icon: 'fa-check-circle', text: 'Transparent, fixed pricing. We agree the cost before starting and that\'s what you pay. No surprises.' },
            { icon: 'fa-check-circle', text: 'We only build static websites — which means we\'re focused, not stretched thin across things we half-know.' },
            { icon: 'fa-check-circle', text: 'Every site is built from scratch around your business. No templates, no shortcuts.' },
            { icon: 'fa-check-circle', text: 'Fast turnaround — most sites are live within 1–2 weeks of receiving your content.' },
            { icon: 'fa-check-circle', text: 'Mobile-first as standard. Your site will look just as good on a phone as a desktop.' },
            { icon: 'fa-check-circle', text: 'Because we\'re new, every client genuinely matters. You won\'t be deprioritised or forgotten about.' },
          ].map(item => `
            <div class="flex items-start gap-4">
              <i class="fas ${item.icon} text-brand-500 mt-0.5 flex-shrink-0"></i>
              <p class="text-gray-600 text-sm leading-relaxed">${item.text}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5 animate-on-scroll">
        ${[
          { label: 'Average delivery time', value: '1–2 wks', icon: 'fa-clock', color: 'bg-brand-50 border-brand-100' },
          { label: 'Satisfaction commitment', value: '100%', icon: 'fa-star', color: 'bg-yellow-50 border-yellow-100' },
          { label: 'Our speciality', value: 'Static', icon: 'fa-globe', color: 'bg-green-50 border-green-100' },
          { label: 'Founded in Ipswich', value: '2025', icon: 'fa-location-dot', color: 'bg-purple-50 border-purple-100' },
        ].map(s => `
          <div class="${s.color} border rounded-2xl p-6 flex flex-col gap-3">
            <i class="fas ${s.icon} text-xl text-gray-600"></i>
            <div class="font-display font-extrabold text-2xl text-gray-900">${s.value}</div>
            <div class="text-gray-500 text-xs leading-snug">${s.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="hero-gradient py-24">
  <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center animate-on-scroll">
    <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-white mb-6 tracking-tight">
      Sound Like a Good Fit? <span class="gradient-text">Let's Talk.</span>
    </h2>
    <p class="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
      No commitment required. Tell us what you need and we'll give you an honest, no-pressure quote.
    </p>
    <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base">
      Get in Touch <i class="fas fa-arrow-right text-sm"></i>
    </a>
  </div>
</section>
`

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const ContactPage = () => `
<!-- PAGE HERO -->
<section class="hero-gradient pt-32 pb-24 relative overflow-hidden">
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/3 right-1/3 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>
    <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="grid3" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs>
      <rect width="100%" height="100%" fill="url(#grid3)" />
    </svg>
  </div>
  <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
    <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-2 mb-7">
      <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      <span class="text-brand-300 text-sm font-medium">We reply within 24 hours</span>
    </div>
    <h1 class="font-display font-extrabold text-5xl lg:text-6xl text-white leading-tight mb-6 tracking-tight">
      Let's Get Your <span class="gradient-text">Project Started</span>
    </h1>
    <p class="text-gray-400 text-xl max-w-xl mx-auto">
      Tell us a bit about your business and what you're looking for. We'll come back with an honest quote — no obligation, no hard sell.
    </p>
  </div>
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full">
      <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 43C1200 37 1320 23 1380 17L1440 10V80H0Z" fill="#f8f7ff"/>
    </svg>
  </div>
</section>

<!-- CONTACT SECTION -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-5 gap-12 items-start">

      <!-- Left: Info -->
      <div class="lg:col-span-2 space-y-5 animate-on-scroll">
        <div>
          <h2 class="font-display font-bold text-2xl text-gray-900 mb-2">Get in Touch</h2>
          <p class="text-gray-500 text-sm leading-relaxed">Whether you're ready to go or just exploring your options — we're happy to chat. Fill in the form or reach out directly.</p>
        </div>

        ${[
          { icon: 'fa-phone', color: 'bg-brand-50 text-brand-600', title: 'Phone', val: '07518 009604', sub: 'Mon – Fri, 9am – 6pm', href: 'tel:07518009604' },
          { icon: 'fa-envelope', color: 'bg-purple-50 text-purple-600', title: 'Email', val: 'riaz.darwinboyd@gmail.com', sub: 'We reply within 24 hours', href: 'mailto:riaz.darwinboyd@gmail.com' },
          { icon: 'fa-location-dot', color: 'bg-pink-50 text-pink-600', title: 'Location', val: 'Ipswich, Suffolk', sub: 'Serving clients UK-wide', href: '#' },
        ].map(c => `
          <a href="${c.href}" class="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm card-hover block">
            <div class="w-11 h-11 ${c.color} rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas ${c.icon}"></i>
            </div>
            <div>
              <div class="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">${c.title}</div>
              <div class="font-semibold text-gray-900 text-sm">${c.val}</div>
              <div class="text-gray-400 text-xs mt-0.5">${c.sub}</div>
            </div>
          </a>
        `).join('')}

        <!-- What to expect -->
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p class="text-sm font-semibold text-gray-900 mb-4">What happens next?</p>
          <div class="space-y-3">
            ${[
              'We read your message carefully and reply within 24 hours',
              'We ask any questions we need to understand your project',
              'We send you a clear, honest quote with no hidden extras',
              'If you\'re happy, we get started — simple as that',
            ].map((s, i) => `
              <div class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-brand-100 text-brand-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${i + 1}</span>
                <p class="text-gray-500 text-xs leading-relaxed">${s}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="lg:col-span-3 animate-on-scroll">
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10" id="contact-form-wrapper">
          <h3 class="font-display font-bold text-xl text-gray-900 mb-2">Tell Us About Your Project</h3>
          <p class="text-gray-400 text-sm mb-7">The more detail you give us, the more accurate our quote will be.</p>

          <form id="contact-form" class="space-y-5" onsubmit="handleSubmit(event)">
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">First Name <span class="text-red-400">*</span></label>
                <input type="text" name="firstName" required placeholder="Your first name"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span class="text-red-400">*</span></label>
                <input type="text" name="lastName" required placeholder="Your last name"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span class="text-red-400">*</span></label>
              <input type="email" name="email" required placeholder="you@example.com"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <input type="tel" name="phone" placeholder="Optional — but handy for a quick call"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Business Name <span class="text-red-400">*</span></label>
              <input type="text" name="company" required placeholder="e.g. Dave's Barbershop, Suffolk Plumbing Co."
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">What do you need? <span class="text-red-400">*</span></label>
              <select name="service" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 transition-all appearance-none">
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
              <label class="block text-sm font-medium text-gray-700 mb-3">Approximate Budget <span class="text-gray-400 font-normal text-xs ml-1">(helps us tailor our suggestion)</span></label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                ${['£100–£300', '£300–£700', '£700–£1,500', '£1,500+'].map((b, i) => `
                  <label class="relative cursor-pointer">
                    <input type="radio" name="budget" value="${b}" class="peer sr-only" ${i === 1 ? 'checked' : ''} />
                    <div class="peer-checked:bg-brand-50 peer-checked:border-brand-400 peer-checked:text-brand-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs font-medium text-gray-600 text-center transition-all hover:border-brand-300 leading-tight">
                      ${b}
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Tell Us More <span class="text-red-400">*</span></label>
              <textarea name="message" required rows="5" placeholder="Tell us about your business, what you'd like on the site, any pages you need, websites you like the look of — anything that helps us understand what you're after."
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">How did you find us?</label>
              <select name="source" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 transition-all appearance-none">
                <option value="">Select an option...</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Someone recommended you</option>
                <option value="local">Locally in Ipswich</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" class="btn-primary w-full text-white font-semibold px-6 py-4 rounded-xl text-base flex items-center justify-center gap-2">
              Send My Enquiry <i class="fas fa-paper-plane text-sm"></i>
            </button>

            <p class="text-xs text-gray-400 text-center">
              <i class="fas fa-lock mr-1"></i> Your details are safe. We'll never share them with anyone.
            </p>
          </form>

          <!-- Success State -->
          <div id="success-state" class="hidden text-center py-10">
            <div class="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-check text-green-500 text-3xl"></i>
            </div>
            <h3 class="font-display font-bold text-2xl text-gray-900 mb-3">Message Received!</h3>
            <p class="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              Thanks for getting in touch. We'll review your project and get back to you within 24 hours with an honest quote.
            </p>
            <div class="mt-6 p-4 bg-brand-50 rounded-xl border border-brand-100">
              <p class="text-brand-700 text-sm font-medium">Follow us while you wait</p>
              <div class="flex justify-center gap-3 mt-3">
                <a href="#" class="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 hover:bg-brand-200 transition-colors"><i class="fab fa-instagram text-sm"></i></a>
                <a href="#" class="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 hover:bg-brand-200 transition-colors"><i class="fab fa-linkedin-in text-sm"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section-light py-24">
  <div class="max-w-3xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-12 animate-on-scroll">
      <h2 class="font-display font-extrabold text-4xl text-gray-900 tracking-tight mb-4">
        Frequently Asked <span class="gradient-text">Questions</span>
      </h2>
      <p class="text-gray-500">Straight answers to the things people usually want to know.</p>
    </div>

    <div class="space-y-4 animate-on-scroll">
      ${[
        {
          q: 'How much does a website cost?',
          a: 'Our pricing is straightforward. Most small business static websites fall between £100 and £700 depending on the number of pages and complexity. Larger or more detailed projects can go up to £1,500 or more. We always agree the price before starting — no surprises, no hidden extras. Get in touch for a free quote.'
        },
        {
          q: 'What kinds of businesses do you build websites for?',
          a: 'We work with all sorts of local and small businesses — barbers, restaurants, cafés, tradesmen (plumbers, electricians, decorators), photographers, freelancers, personal trainers, local shops, and anyone who needs a clean, professional online presence. If you\'re not sure if we\'re a fit, just ask.'
        },
        {
          q: 'How long does it take?',
          a: 'Most websites are completed within 1–2 weeks once we have your content (text, photos, etc.). We\'ll agree a clear timeline with you before starting so you know exactly what to expect.'
        },
        {
          q: 'What\'s a static website — and is it right for me?',
          a: 'A static website is one where the pages are pre-built and served directly to your visitors — there\'s no database, no CMS, no plugins. They load faster, are more secure, and cost less to run than WordPress sites. For most small businesses that need a professional online presence, they\'re the perfect fit.'
        },
        {
          q: 'Can I update the website myself?',
          a: 'For most changes (text, images, contact info), we handle updates for you quickly and at no extra cost for minor tweaks. If you want bigger changes down the line, we\'ll discuss a fair price. We keep things simple and won\'t leave you stuck.'
        },
        {
          q: 'Do you work with businesses outside Ipswich?',
          a: 'Absolutely. We\'re based in Ipswich but work with clients anywhere in the UK. Everything can be done remotely — a quick call or message is all it takes to get the ball rolling.'
        },
      ].map((faq, i) => `
        <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
            <span class="font-semibold text-gray-900 text-sm">${faq.q}</span>
            <i class="fas fa-chevron-down text-gray-400 text-sm transition-transform flex-shrink-0 faq-icon"></i>
          </button>
          <div class="faq-answer hidden px-6 pb-5">
            <p class="text-gray-500 text-sm leading-relaxed">${faq.a}</p>
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
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = !answer.classList.contains('hidden');
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');
    if (!isOpen) {
      answer.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
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
