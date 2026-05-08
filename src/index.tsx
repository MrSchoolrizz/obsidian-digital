import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// ─── Shared Layout ────────────────────────────────────────────────────────────
const Layout = ({ children, title = 'Ipswich Web Design Agency | Obsidian Digital' }: { children: any; title?: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="Obsidian Digital — a web design agency based in Ipswich, Suffolk. We create stunning, high-converting websites that grow your business." />
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
            },
            accent: {
              400: '#fb7185',
              500: '#f43f5e',
              600: '#e11d48',
            }
          },
          animation: {
            'fade-up': 'fadeUp 0.6s ease-out forwards',
            'fade-in': 'fadeIn 0.5s ease-out forwards',
            'float': 'float 6s ease-in-out infinite',
          },
          keyframes: {
            fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
            fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
            float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
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
    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 48px rgba(99,102,241,0.18);
    }
    .nav-link {
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #6366f1, #a855f7);
      transition: width 0.3s ease;
    }
    .nav-link:hover::after, .nav-link.active::after {
      width: 100%;
    }
    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(99,102,241,0.4);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(99,102,241,0.55);
    }
    .btn-outline {
      transition: all 0.3s ease;
      border: 2px solid rgba(99,102,241,0.5);
    }
    .btn-outline:hover {
      background: rgba(99,102,241,0.1);
      border-color: #6366f1;
      transform: translateY(-2px);
    }
    .glow {
      box-shadow: 0 0 40px rgba(99,102,241,0.3);
    }
    .mesh-bg {
      background-color: #0f0f1a;
      background-image:
        radial-gradient(at 20% 20%, rgba(99,102,241,0.08) 0px, transparent 50%),
        radial-gradient(at 80% 80%, rgba(168,85,247,0.08) 0px, transparent 50%);
    }
    .section-light {
      background: #ffffff;
    }
    .section-subtle {
      background: #f8f7ff;
    }
    .tag-pill {
      background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1));
      border: 1px solid rgba(99,102,241,0.2);
    }
    /* Mobile menu */
    #mobile-menu { display: none; }
    #mobile-menu.open { display: block; }
    .hamburger-line {
      display: block;
      width: 24px;
      height: 2px;
      background: white;
      margin: 5px 0;
      transition: all 0.3s ease;
    }
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .stat-counter { font-variant-numeric: tabular-nums; }
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
    }
  </style>
</head>
<body class="antialiased text-gray-900 overflow-x-hidden">
  ${Navbar()}
  <main>${children}</main>
  ${Footer()}
  <script>
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }

    // Scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Sticky navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(10,10,15,0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      } else {
        navbar.classList.remove('scrolled');
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
    <div class="flex items-center justify-between h-18 py-4">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2.5 group">
        <div class="w-9 h-9 rounded-xl btn-primary flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
            <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
          </svg>
        </div>
        <span class="font-display font-bold text-xl text-white tracking-tight">Obsidian<span class="gradient-text"> Digital</span></span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8">
        <a href="/" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Home</a>
        <a href="/about" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">About</a>
        <a href="#services" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Services</a>
        <a href="#work" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Work</a>
        <a href="/contact" class="nav-link text-gray-300 hover:text-white font-medium text-sm transition-colors">Contact</a>
      </div>

      <!-- CTA -->
      <div class="hidden md:flex items-center gap-3">
        <a href="/contact" class="btn-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl">
          Get a Free Quote
        </a>
      </div>

      <!-- Hamburger -->
      <button id="hamburger" class="md:hidden flex flex-col justify-center p-2">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="md:hidden" style="background:rgba(10,10,15,0.98);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.06);">
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
      <a href="/" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Home</a>
      <a href="/about" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">About</a>
      <a href="/#services" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Services</a>
      <a href="/#work" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Work</a>
      <a href="/contact" class="text-gray-300 hover:text-white font-medium py-2 transition-colors">Contact</a>
      <a href="/contact" class="btn-primary text-white font-semibold text-sm px-5 py-3 rounded-xl text-center mt-2">
        Get a Free Quote
      </a>
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
          Obsidian Digital — a web design agency based in Ipswich, Suffolk. We craft digital experiences that convert visitors into customers.
        </p>
        <div class="flex gap-4 mt-6">
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
            <i class="fab fa-instagram text-sm"></i>
          </a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
            <i class="fab fa-linkedin-in text-sm"></i>
          </a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
            <i class="fab fa-twitter text-sm"></i>
          </a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
            <i class="fab fa-facebook-f text-sm"></i>
          </a>
        </div>
      </div>

      <div>
        <h4 class="text-white font-semibold text-sm mb-5">Services</h4>
        <ul class="space-y-3">
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">Web Design</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">Web Development</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">E-Commerce</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">SEO & Marketing</a></li>
          <li><a href="/#services" class="text-gray-400 hover:text-white text-sm transition-colors">Brand Identity</a></li>
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
        <div class="mt-6 p-4 rounded-xl bg-white/3 border border-white/5">
          <p class="text-gray-400 text-xs">📍 Ipswich, Suffolk</p>
          <p class="text-gray-400 text-xs mt-1">📞 01473 000 000</p>
          <p class="text-gray-400 text-xs mt-1">✉️ riaz.darwinboyd@gmail.com</p>
        </div>
      </div>
    </div>

    <div class="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-gray-500 text-sm">© 2024 Obsidian Digital. All rights reserved.</p>
      <p class="text-gray-500 text-sm">Proudly designed & built in <span class="text-brand-400">Ipswich, Suffolk</span> 🏴󠁧󠁢󠁥󠁮󠁧󠁿</p>
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
  <!-- Background decorations -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl"></div>
    <!-- Grid pattern -->
    <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 relative z-10">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-2 mb-8">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span class="text-brand-300 text-sm font-medium">Based in Ipswich, Suffolk</span>
        </div>

        <h1 class="font-display font-extrabold text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight mb-6">
          Websites That <span class="gradient-text">Convert</span> Visitors Into Customers
        </h1>

        <p class="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
          We design and build stunning, high-performance websites for ambitious businesses across Ipswich and Suffolk. No templates — just bespoke digital experiences built to grow your revenue.
        </p>

        <div class="flex flex-wrap gap-4 mb-14">
          <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-xl text-base">
            Start Your Project <i class="fas fa-arrow-right text-sm"></i>
          </a>
          <a href="/#work" class="btn-outline inline-flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-xl text-base">
            <i class="fas fa-play text-sm text-brand-400"></i> View Our Work
          </a>
        </div>

        <!-- Trust signals -->
        <div class="flex flex-wrap gap-6 items-center">
          <div class="flex items-center gap-1.5">
            <div class="flex">
              ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-yellow-400 text-sm"></i>').join('')}
            </div>
            <span class="text-gray-400 text-sm ml-1">5.0 on Google</span>
          </div>
          <div class="w-px h-4 bg-white/10"></div>
          <span class="text-gray-400 text-sm"><span class="text-white font-semibold">50+</span> Projects Delivered</span>
          <div class="w-px h-4 bg-white/10"></div>
          <span class="text-gray-400 text-sm"><span class="text-white font-semibold">8 Years</span> Experience</span>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="relative hidden lg:block">
        <div class="relative animate-float">
          <!-- Main browser mockup -->
          <div class="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl glow">
            <!-- Browser chrome -->
            <div class="bg-gray-800/80 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400/70"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400/70"></div>
                <div class="w-3 h-3 rounded-full bg-green-400/70"></div>
              </div>
              <div class="flex-1 mx-4 bg-gray-700/50 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                yourclient.co.uk
              </div>
            </div>
            <!-- Fake website content -->
            <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
              <div class="h-3 bg-brand-500/30 rounded-full w-3/4 mb-3"></div>
              <div class="h-2 bg-white/10 rounded-full w-full mb-2"></div>
              <div class="h-2 bg-white/10 rounded-full w-5/6 mb-6"></div>
              <div class="flex gap-3 mb-6">
                <div class="h-9 bg-brand-500/60 rounded-lg w-28"></div>
                <div class="h-9 bg-white/10 rounded-lg w-24"></div>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="h-20 bg-white/5 rounded-xl border border-white/5 p-3">
                  <div class="w-6 h-6 bg-brand-500/40 rounded-lg mb-2"></div>
                  <div class="h-1.5 bg-white/20 rounded w-full mb-1.5"></div>
                  <div class="h-1.5 bg-white/10 rounded w-3/4"></div>
                </div>
                <div class="h-20 bg-white/5 rounded-xl border border-white/5 p-3">
                  <div class="w-6 h-6 bg-purple-500/40 rounded-lg mb-2"></div>
                  <div class="h-1.5 bg-white/20 rounded w-full mb-1.5"></div>
                  <div class="h-1.5 bg-white/10 rounded w-2/3"></div>
                </div>
                <div class="h-20 bg-white/5 rounded-xl border border-white/5 p-3">
                  <div class="w-6 h-6 bg-pink-500/40 rounded-lg mb-2"></div>
                  <div class="h-1.5 bg-white/20 rounded w-full mb-1.5"></div>
                  <div class="h-1.5 bg-white/10 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating metric cards -->
          <div class="absolute -top-5 -left-8 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 bg-green-500/15 rounded-lg flex items-center justify-center">
                <i class="fas fa-arrow-trend-up text-green-400 text-xs"></i>
              </div>
              <div>
                <div class="text-white font-bold text-sm">+247%</div>
                <div class="text-gray-400 text-xs">Conversions</div>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-5 -right-6 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 bg-brand-500/15 rounded-lg flex items-center justify-center">
                <i class="fas fa-bolt text-brand-400 text-xs"></i>
              </div>
              <div>
                <div class="text-white font-bold text-sm">100/100</div>
                <div class="text-gray-400 text-xs">PageSpeed Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Wave -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full">
      <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 43C1200 37 1320 23 1380 17L1440 10V80H0Z" fill="#ffffff"/>
    </svg>
  </div>
</section>

<!-- SOCIAL PROOF LOGOS -->
<section class="section-light py-12 border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <p class="text-center text-gray-400 text-sm font-medium uppercase tracking-widest mb-8">Trusted by businesses across Suffolk</p>
    <div class="flex flex-wrap justify-center items-center gap-10 opacity-40">
      <span class="font-display font-bold text-xl text-gray-500">AquaSuffolk</span>
      <span class="font-display font-bold text-xl text-gray-500">Ipswich Eats</span>
      <span class="font-display font-bold text-xl text-gray-500">SuffolkLaw</span>
      <span class="font-display font-bold text-xl text-gray-500">OrwellHomes</span>
      <span class="font-display font-bold text-xl text-gray-500">CraftBrew Co.</span>
      <span class="font-display font-bold text-xl text-gray-500">NovaSolar</span>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" class="section-light py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-16 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">What We Do</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 mb-5 tracking-tight">
        Everything You Need to <span class="gradient-text">Dominate Online</span>
      </h2>
      <p class="text-gray-500 text-lg max-w-2xl mx-auto">
        From stunning designs to bulletproof development — we handle every aspect of your digital presence.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      ${[
        { icon: 'fa-pen-nib', color: 'bg-brand-50 text-brand-600', title: 'Web Design', desc: 'Bespoke, pixel-perfect designs that reflect your brand and captivate your audience from the first click.' },
        { icon: 'fa-code', color: 'bg-purple-50 text-purple-600', title: 'Web Development', desc: 'Lightning-fast, secure websites built with modern technologies and optimised for performance.' },
        { icon: 'fa-cart-shopping', color: 'bg-pink-50 text-pink-600', title: 'E-Commerce', desc: 'Online stores that make buying effortless. Shopify, WooCommerce, or custom-built for your needs.' },
        { icon: 'fa-magnifying-glass-chart', color: 'bg-green-50 text-green-600', title: 'SEO & Marketing', desc: 'Rank higher on Google and drive qualified traffic that actually converts into paying customers.' },
        { icon: 'fa-palette', color: 'bg-orange-50 text-orange-600', title: 'Brand Identity', desc: 'Logo design, brand guidelines and visual systems that make your business instantly recognisable.' },
        { icon: 'fa-headset', color: 'bg-cyan-50 text-cyan-600', title: 'Support & Maintenance', desc: 'Ongoing website care, updates, and technical support so you never have to worry about downtime.' },
      ].map((s, i) => `
        <div class="group card-hover bg-white border border-gray-100 rounded-2xl p-7 animate-on-scroll" style="animation-delay: ${i * 80}ms">
          <div class="w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-5">
            <i class="fas ${s.icon} text-lg"></i>
          </div>
          <h3 class="font-display font-bold text-lg text-gray-900 mb-3">${s.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-5">${s.desc}</p>
          <a href="/contact" class="inline-flex items-center gap-1.5 text-brand-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
            Learn more <i class="fas fa-arrow-right text-xs"></i>
          </a>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-16 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">How It Works</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 mb-5 tracking-tight">
        Our Proven <span class="gradient-text">4-Step Process</span>
      </h2>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
      <!-- Connector line (desktop) -->
      <div class="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 z-0"></div>

      ${[
        { step: '01', icon: 'fa-comments', title: 'Discovery Call', desc: 'We learn about your business, goals, and target audience to craft the perfect strategy.' },
        { step: '02', icon: 'fa-pencil-ruler', title: 'Design & Prototype', desc: 'We create stunning mockups and interactive prototypes for your approval before a single line of code.' },
        { step: '03', icon: 'fa-laptop-code', title: 'Build & Test', desc: 'Our developers bring the design to life with clean, fast, accessible code — rigorously tested.' },
        { step: '04', icon: 'fa-rocket', title: 'Launch & Grow', desc: 'We go live, monitor performance, and provide ongoing support to ensure continued growth.' },
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
      <a href="/contact" class="btn-outline text-brand-600 font-semibold px-6 py-3 rounded-xl text-sm self-start md:self-auto">
        Start Your Project <i class="fas fa-arrow-right ml-1.5 text-xs"></i>
      </a>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      ${[
        { name: 'OrwellHomes', type: 'Estate Agency', tag: 'E-Commerce', color: 'from-blue-600 to-indigo-700', icon: 'fa-house', result: '+312% Enquiries' },
        { name: 'CraftBrew Co.', type: 'Food & Drink', tag: 'Web Design', color: 'from-amber-500 to-orange-600', icon: 'fa-beer-mug-empty', result: '+189% Sales' },
        { name: 'SuffolkLaw', type: 'Legal Services', tag: 'Branding', color: 'from-slate-700 to-gray-900', icon: 'fa-scale-balanced', result: '+95% Leads' },
        { name: 'NovaSolar', type: 'Renewables', tag: 'Web Dev', color: 'from-emerald-500 to-teal-600', icon: 'fa-solar-panel', result: '+220% Traffic' },
        { name: 'Ipswich Eats', type: 'Restaurant', tag: 'Booking System', color: 'from-rose-500 to-pink-600', icon: 'fa-utensils', result: '+410% Bookings' },
        { name: 'AquaSuffolk', type: 'Fitness', tag: 'E-Commerce', color: 'from-cyan-500 to-blue-600', icon: 'fa-droplet', result: '+158% Members' },
      ].map((p, i) => `
        <div class="group card-hover rounded-2xl overflow-hidden border border-gray-100 animate-on-scroll" style="animation-delay: ${i * 80}ms">
          <div class="h-48 bg-gradient-to-br ${p.color} relative overflow-hidden flex items-center justify-center">
            <i class="fas ${p.icon} text-white/20 text-8xl absolute -right-4 -bottom-4"></i>
            <div class="relative z-10 text-center">
              <div class="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <i class="fas ${p.icon} text-white text-2xl"></i>
              </div>
              <div class="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold inline-block">${p.tag}</div>
            </div>
          </div>
          <div class="p-6 bg-white">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-display font-bold text-gray-900">${p.name}</h3>
                <p class="text-gray-400 text-sm">${p.type}</p>
              </div>
              <span class="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">${p.result}</span>
            </div>
            <a href="/contact" class="inline-flex items-center gap-1.5 text-brand-600 text-sm font-semibold mt-3 group-hover:gap-2.5 transition-all">
              View case study <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- STATS -->
<section class="hero-gradient py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      ${[
        { value: '50+', label: 'Projects Delivered' },
        { value: '8', label: 'Years in Business' },
        { value: '98%', label: 'Client Retention' },
        { value: '£2M+', label: 'Revenue Generated' },
      ].map((s, i) => `
        <div class="animate-on-scroll" style="animation-delay: ${i * 100}ms">
          <div class="font-display font-extrabold text-5xl text-white mb-2 stat-counter">${s.value}</div>
          <div class="text-gray-400 text-sm">${s.label}</div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-14 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">Testimonials</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight">
        What Our Clients <span class="gradient-text">Say</span>
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-7">
      ${[
        { quote: 'Obsidian Digital completely transformed our online presence. Within 3 months of our new website launching, our enquiries had more than tripled. Absolutely phenomenal work.', name: 'Sarah Mitchell', role: 'Director, OrwellHomes', stars: 5 },
        { quote: 'I was blown away by the quality of the design and how quickly Riaz understood our brand. Professional, creative, and genuinely cares about results. Would recommend to anyone.', name: 'James Thornton', role: 'Owner, CraftBrew Co.', stars: 5 },
        { quote: 'Our new website looks incredible and performs even better. Our Google rankings shot up and we\'re getting far more qualified leads than ever before. Highly recommend!', name: 'Emma Richards', role: 'Partner, SuffolkLaw', stars: 5 },
      ].map((t, i) => `
        <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm card-hover animate-on-scroll" style="animation-delay: ${i * 100}ms">
          <div class="flex mb-4">
            ${[1,2,3,4,5].map(() => '<i class="fas fa-star text-yellow-400 text-sm"></i>').join('')}
          </div>
          <p class="text-gray-600 text-sm leading-relaxed mb-6 italic">"${t.quote}"</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              ${t.name.charAt(0)}
            </div>
            <div>
              <div class="font-semibold text-gray-900 text-sm">${t.name}</div>
              <div class="text-gray-400 text-xs">${t.role}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="hero-gradient py-24">
  <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
    <div class="animate-on-scroll">
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-white mb-6 tracking-tight">
        Ready to Build Your <span class="gradient-text">Dream Website?</span>
      </h2>
      <p class="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
        Get a free, no-obligation quote today. We'll respond within 24 hours with a tailored proposal for your project.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base">
          Get Your Free Quote <i class="fas fa-arrow-right text-sm"></i>
        </a>
        <a href="tel:01473000000" class="btn-outline inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base">
          <i class="fas fa-phone text-brand-400 text-sm"></i> 01473 000 000
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
      We're a Creative Agency <br class="hidden md:block"/><span class="gradient-text">With a Purpose</span>
    </h1>
    <p class="text-gray-400 text-xl max-w-2xl mx-auto">
      Founded in Ipswich by a Computer Science student with a passion for design — building digital experiences that actually move the needle for local businesses.
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
          Built in Ipswich, <span class="gradient-text">Driven by Passion</span>
        </h2>
        <p class="text-gray-500 leading-relaxed mb-5">
          Obsidian Digital was founded by Riaz Darwin-Boyd, a Computer Science student based in Ipswich with a genuine passion for design, code, and building things that work. Frustrated by the overpriced, generic websites being sold to local businesses, Riaz set out to offer something better — websites that are beautifully crafted, technically sharp, and built to convert.
        </p>
        <p class="text-gray-500 leading-relaxed mb-5">
          Combining academic knowledge in computer science with hands-on real-world projects, Obsidian Digital brings a fresh, modern perspective to web design. Every project gets the same level of care, precision and attention to detail — whether it's a portfolio site or a full e-commerce store.
        </p>
        <p class="text-gray-500 leading-relaxed mb-8">
          Proudly Ipswich-based and passionate about helping local Suffolk businesses thrive online. If you want a website that genuinely works for your business, you're in the right place.
        </p>
        <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl">
          Work With Us <i class="fas fa-arrow-right text-sm"></i>
        </a>
      </div>

      <div class="relative animate-on-scroll">
        <!-- Visual card stack -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-br from-brand-50 to-purple-50 rounded-3xl transform rotate-3"></div>
          <div class="relative bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-8">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl h-36 flex flex-col items-center justify-center text-white">
                <span class="font-display font-extrabold text-4xl">CS</span>
                <span class="text-sm opacity-80">Graduate</span>
              </div>
              <div class="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl h-36 flex flex-col items-center justify-center text-white">
                <span class="font-display font-extrabold text-4xl">50+</span>
                <span class="text-sm opacity-80">Projects</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-2xl p-5">
                <div class="text-2xl font-display font-bold text-gray-900">98%</div>
                <div class="text-xs text-gray-500">Client Retention</div>
              </div>
              <div class="bg-gray-50 rounded-2xl p-5">
                <div class="text-2xl font-display font-bold text-gray-900">£2M+</div>
                <div class="text-xs text-gray-500">Revenue Generated</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Award badge -->
        <div class="absolute -top-4 -right-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-lg">
          <div class="flex items-center gap-2">
            <i class="fas fa-trophy text-yellow-400"></i>
            <span class="text-xs font-semibold text-gray-700">Suffolk Business Awards</span>
          </div>
          <div class="text-xs text-gray-400 mt-0.5">Best Digital Agency 2023</div>
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
        <span class="text-brand-600 text-sm font-medium">What Drives Us</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight">
        Our Core <span class="gradient-text">Values</span>
      </h2>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
      ${[
        { icon: 'fa-heart', color: 'bg-rose-50 text-rose-500', title: 'Client First', desc: 'Every decision we make is guided by what\'s best for your business and your customers.' },
        { icon: 'fa-lightbulb', color: 'bg-yellow-50 text-yellow-500', title: 'Creativity', desc: 'We push creative boundaries to craft experiences that stand out in a crowded digital landscape.' },
        { icon: 'fa-shield-halved', color: 'bg-green-50 text-green-500', title: 'Transparency', desc: 'No hidden fees, no jargon. We keep you fully informed at every stage of the project.' },
        { icon: 'fa-chart-line', color: 'bg-brand-50 text-brand-600', title: 'Results-Driven', desc: 'Beautiful websites that also perform. We measure success by the growth we generate for you.' },
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

<!-- TEAM -->
<section class="section-light py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-14 animate-on-scroll">
      <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-5">
        <span class="text-brand-600 text-sm font-medium">Meet the Team</span>
      </div>
      <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight">
        The People Behind <span class="gradient-text">Your Project</span>
      </h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
      ${[
        { name: 'Riaz Darwin-Boyd', role: 'Founder & Lead Developer', color: 'from-brand-400 to-purple-500', icon: 'fa-laptop-code', skills: ['Web Design', 'TypeScript', 'React'] },
        { name: 'Creative Direction', role: 'UI & Visual Design', color: 'from-pink-400 to-rose-500', icon: 'fa-pen-ruler', skills: ['Figma', 'Branding', 'Prototyping'] },
        { name: 'Development', role: 'Build & Performance', color: 'from-cyan-400 to-blue-500', icon: 'fa-code', skills: ['Performance', 'SEO', 'Accessibility'] },
        { name: 'Growth', role: 'SEO & Digital Marketing', color: 'from-green-400 to-emerald-500', icon: 'fa-magnifying-glass-chart', skills: ['SEO', 'Analytics', 'Conversions'] },
      ].map((m, i) => `
        <div class="group card-hover text-center animate-on-scroll" style="animation-delay: ${i * 80}ms">
          <div class="w-24 h-24 mx-auto bg-gradient-to-br ${m.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow">
            <i class="fas ${m.icon} text-white text-3xl"></i>
          </div>
          <h3 class="font-display font-bold text-gray-900 mb-1">${m.name}</h3>
          <p class="text-brand-600 text-sm font-medium mb-4">${m.role}</p>
          <div class="flex flex-wrap justify-center gap-1.5">
            ${m.skills.map(s => `<span class="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">${s}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- WHY CHOOSE US -->
<section class="section-subtle py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="animate-on-scroll">
        <div class="inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5 mb-6">
          <span class="text-brand-600 text-sm font-medium">Why Choose Us</span>
        </div>
        <h2 class="font-display font-extrabold text-4xl text-gray-900 mb-8 tracking-tight leading-tight">
          The Obsidian Digital <span class="gradient-text">Difference</span>
        </h2>
        <div class="space-y-5">
          ${[
            { icon: 'fa-check-circle', text: 'Local agency with national-level quality — you\'ll always speak to the person actually doing the work.' },
            { icon: 'fa-check-circle', text: 'Fixed-price projects with no hidden extras. What we quote is what you pay.' },
            { icon: 'fa-check-circle', text: 'All websites come with full training so you can manage your site with confidence.' },
            { icon: 'fa-check-circle', text: 'We\'re obsessed with results — not just pretty designs. Every element has a purpose.' },
            { icon: 'fa-check-circle', text: 'Ongoing support and maintenance packages available to keep your site healthy.' },
            { icon: 'fa-check-circle', text: 'All websites are fully accessible, GDPR-compliant, and optimised for Google.' },
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
          { label: 'Average project delivery', value: '4 weeks', icon: 'fa-clock', color: 'bg-brand-50 border-brand-100' },
          { label: 'Client satisfaction rate', value: '5.0 ★', icon: 'fa-star', color: 'bg-yellow-50 border-yellow-100' },
          { label: 'Websites built', value: '50+', icon: 'fa-globe', color: 'bg-green-50 border-green-100' },
          { label: 'Years in Ipswich', value: '8 Years', icon: 'fa-location-dot', color: 'bg-purple-50 border-purple-100' },
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
      Let's Build Something <span class="gradient-text">Great Together</span>
    </h2>
    <p class="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
      Whether you're starting from scratch or need a complete redesign, we'd love to hear about your project.
    </p>
    <a href="/contact" class="btn-primary inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base">
      Start a Conversation <i class="fas fa-arrow-right text-sm"></i>
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
      Let's Start Your <span class="gradient-text">Project</span>
    </h1>
    <p class="text-gray-400 text-xl max-w-xl mx-auto">
      Tell us about your project and we'll get back to you with a tailored proposal — completely free and with no obligation.
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

      <!-- Left: Info Cards -->
      <div class="lg:col-span-2 space-y-5 animate-on-scroll">
        <div>
          <h2 class="font-display font-bold text-2xl text-gray-900 mb-2">Get in Touch</h2>
          <p class="text-gray-500 text-sm leading-relaxed">Fill in the form or reach out to us directly. We'd love to learn about your project.</p>
        </div>

        ${[
          { icon: 'fa-phone', color: 'bg-brand-50 text-brand-600', title: 'Phone', val: '01473 000 000', sub: 'Mon – Fri, 9am – 5:30pm', href: 'tel:01473000000' },
          { icon: 'fa-envelope', color: 'bg-purple-50 text-purple-600', title: 'Email', val: 'riaz.darwinboyd@gmail.com', sub: 'We reply within 24 hours', href: 'mailto:riaz.darwinboyd@gmail.com' },
          { icon: 'fa-location-dot', color: 'bg-pink-50 text-pink-600', title: 'Office', val: 'Ipswich, Suffolk', sub: 'IP1 3PH', href: '#' },
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

        <!-- Social links -->
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p class="text-xs text-gray-400 font-medium uppercase tracking-wide mb-4">Follow Us</p>
          <div class="flex gap-3">
            ${[
              { icon: 'fa-instagram', color: 'hover:bg-pink-500' },
              { icon: 'fa-linkedin-in', color: 'hover:bg-blue-600' },
              { icon: 'fa-twitter', color: 'hover:bg-sky-500' },
              { icon: 'fa-facebook-f', color: 'hover:bg-blue-700' },
            ].map(s => `
              <a href="#" class="w-10 h-10 bg-gray-100 ${s.color} hover:text-white text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
                <i class="fab ${s.icon} text-sm"></i>
              </a>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="lg:col-span-3 animate-on-scroll">
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10" id="contact-form-wrapper">
          <h3 class="font-display font-bold text-xl text-gray-900 mb-7">Tell Us About Your Project</h3>

          <form id="contact-form" class="space-y-5" onsubmit="handleSubmit(event)">
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">First Name <span class="text-red-400">*</span></label>
                <input type="text" name="firstName" required placeholder="Alex"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span class="text-red-400">*</span></label>
                <input type="text" name="lastName" required placeholder="Turner"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span class="text-red-400">*</span></label>
              <input type="email" name="email" required placeholder="alex@company.co.uk"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <input type="tel" name="phone" placeholder="01473 000 000"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Company / Business Name</label>
              <input type="text" name="company" placeholder="Your Business Ltd"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">What do you need? <span class="text-red-400">*</span></label>
              <select name="service" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 transition-all appearance-none">
                <option value="" disabled selected>Select a service...</option>
                <option value="new-website">Brand New Website</option>
                <option value="redesign">Website Redesign</option>
                <option value="ecommerce">E-Commerce Store</option>
                <option value="seo">SEO & Digital Marketing</option>
                <option value="branding">Brand Identity & Logo</option>
                <option value="maintenance">Website Support & Maintenance</option>
                <option value="other">Something Else</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Budget Range</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                ${['£500–£1k', '£1k–£3k', '£3k–£8k', '£8k+'].map((b, i) => `
                  <label class="relative cursor-pointer">
                    <input type="radio" name="budget" value="${b}" class="peer sr-only" ${i === 1 ? 'checked' : ''} />
                    <div class="peer-checked:bg-brand-50 peer-checked:border-brand-400 peer-checked:text-brand-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-600 text-center transition-all hover:border-brand-300">
                      ${b}
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Tell Us More <span class="text-red-400">*</span></label>
              <textarea name="message" required rows="5" placeholder="Tell us about your project, your business, and any specific requirements you have..."
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all resize-none"></textarea>
            </div>

            <!-- How did you hear -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">How did you find us?</label>
              <select name="source" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 transition-all appearance-none">
                <option value="">Select an option...</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Referred by someone</option>
                <option value="local">Saw us locally</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit"
              class="btn-primary w-full text-white font-semibold px-6 py-4 rounded-xl text-base flex items-center justify-center gap-2">
              Send My Enquiry <i class="fas fa-paper-plane text-sm"></i>
            </button>

            <p class="text-xs text-gray-400 text-center">
              <i class="fas fa-lock mr-1"></i>
              Your information is secure and will never be shared with third parties.
            </p>
          </form>

          <!-- Success State (hidden by default) -->
          <div id="success-state" class="hidden text-center py-10">
            <div class="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-check text-green-500 text-3xl"></i>
            </div>
            <h3 class="font-display font-bold text-2xl text-gray-900 mb-3">Thank You!</h3>
            <p class="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              We've received your enquiry and will be in touch within 24 hours with a tailored proposal.
            </p>
            <div class="mt-6 p-4 bg-brand-50 rounded-xl border border-brand-100">
              <p class="text-brand-700 text-sm font-medium">In the meantime, why not follow us?</p>
              <div class="flex justify-center gap-3 mt-3">
                <a href="#" class="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 hover:bg-brand-200 transition-colors">
                  <i class="fab fa-instagram text-sm"></i>
                </a>
                <a href="#" class="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 hover:bg-brand-200 transition-colors">
                  <i class="fab fa-linkedin-in text-sm"></i>
                </a>
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
      <p class="text-gray-500">Everything you need to know before getting started.</p>
    </div>

    <div class="space-y-4 animate-on-scroll">
      ${[
        { q: 'How much does a website cost?', a: 'Every project is unique, but most websites for small-to-medium businesses fall between £1,500 and £8,000. We\'ll give you a fixed-price quote after an initial call — no surprises.' },
        { q: 'How long does it take to build a website?', a: 'A typical website takes 4–8 weeks from briefing to launch. More complex projects like e-commerce stores may take longer. We\'ll give you a clear timeline upfront.' },
        { q: 'Will I be able to update the website myself?', a: 'Absolutely. We build all our websites with easy-to-use content management systems and provide full training so you can make updates without needing us.' },
        { q: 'Do you work with businesses outside of Ipswich?', a: 'Yes! While we\'re proud to be an Ipswich-based agency, we work with clients across the UK. Everything can be handled remotely with regular video calls.' },
        { q: 'What happens after the website launches?', a: 'We offer ongoing support and maintenance packages to keep your site fast, secure, and up to date. We\'re always just an email away.' },
        { q: 'Do you help with SEO?', a: 'Yes — all our websites are built with SEO best practices baked in from the start. We also offer dedicated SEO and digital marketing packages.' },
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
  // Form submission
  function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const success = document.getElementById('success-state');
    form.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => {
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.classList.add('animate-fade-in');
    }, 300);
  }

  // FAQ accordion
  function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = !answer.classList.contains('hidden');
    // Close all
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
  return c.html(Layout({ children: HomePage(), title: 'Obsidian Digital | Ipswich Web Design Agency' }))
})

app.get('/about', (c) => {
  return c.html(Layout({ children: AboutPage(), title: 'About Us | Obsidian Digital Ipswich' }))
})

app.get('/contact', (c) => {
  return c.html(Layout({ children: ContactPage(), title: 'Contact Us | Obsidian Digital Ipswich' }))
})

// API: contact form submission
app.post('/api/contact', async (c) => {
  const data = await c.req.json()
  // In production, send email via SendGrid, Resend, etc.
  console.log('Contact form submission:', data)
  return c.json({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' })
})

export default app
