/**
 * AgamTats Studio - Common UI & Navigation Scripts
 * Luxury Editorial Tattoo Studio | Safed, Israel
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const menuBtn = document.getElementById('mobileMenuToggle');
  const closeMenuBtn = document.getElementById('closeMobileMenu');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  function openMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  drawerLinks.forEach(link => link.addEventListener('click', closeMenu));

  // 2. Active Page Link Detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop();
    if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Scroll Header Effect
  const header = document.querySelector('.editorial-nav');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-lg', 'bg-zinc-950/95');
      } else {
        header.classList.remove('shadow-lg', 'bg-zinc-950/95');
      }
    });
  }

  // 4. Toast Notification Engine
  window.showToast = function(message) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[120] px-5 py-3 rounded-full bg-zinc-800/95 text-white text-xs sm:text-sm font-medium border border-zinc-700 shadow-2xl opacity-0 translate-y-4 pointer-events-none transition-all duration-300 backdrop-blur-md flex items-center gap-2';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 2800);
  };

  // 5. Copy Phone Button
  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '0559531511';
      navigator.clipboard.writeText(phone).then(() => {
        window.showToast('מספר הטלפון הועתק: 055-9531511');
      }).catch(() => {
        window.showToast('טלפון: 055-9531511');
      });
    });
  });

  // 6. Year Updater
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // 7. Cookie Consent Banner Engine
  initCookieConsent();

  // 8. UserWay Accessibility Icon Mobile Positioning (Prevent Logo Overlap)
  initUserWayMobileAdjustment();
});

/**
 * Cookie Consent Management System
 */
function initCookieConsent() {
  const CONSENT_KEY = 'agamtats_cookie_consent';
  let banner = document.getElementById('agamtatsCookieBanner');

  function renderBanner() {
    if (document.getElementById('agamtatsCookieBanner')) return;

    banner = document.createElement('div');
    banner.id = 'agamtatsCookieBanner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'הודעת הסכמת עוגיות ופרטיות');
    banner.className = 'fixed bottom-4 inset-x-4 sm:inset-x-auto sm:left-6 sm:bottom-6 z-[130] max-w-lg p-5 sm:p-6 rounded-2xl bg-[#0d0d11]/95 backdrop-blur-xl border border-[rgba(244,236,231,0.18)] shadow-2xl text-right transition-all duration-300 opacity-0 translate-y-4';

    banner.innerHTML = `
      <div class="flex items-start gap-3.5 mb-3">
        <div class="w-8 h-8 rounded-lg bg-[rgba(244,236,231,0.06)] border border-[rgba(244,236,231,0.14)] flex items-center justify-center shrink-0 text-[#f4ece7]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-[#f4ece7]">הגנת פרטיות ושימוש בעוגיות</h3>
          <p class="text-xs text-[#a69e9b] leading-relaxed mt-1 font-light">
            סטודיו AgamTats משתמש בקובצי עוגיות (Cookies) ואחסון מקומי לצורך חוויית גלישה מותאמת, הפעלת סרגל הנגישות ואבטחה. איננו מעבירים מידע לצדדים שלישיים. לפרטים נוספים קראו את 
            <a href="privacy.html" class="text-[#f4ece7] underline hover:text-white">מדיניות הפרטיות והעוגיות</a>.
          </p>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2 border-t border-[rgba(244,236,231,0.08)]">
        <button id="cookieAcceptAll" type="button" class="px-4 py-2 rounded-xl bg-[#5e1422] hover:bg-[#7a1c2d] text-white text-xs font-semibold shadow-md transition">
          אישור הכל
        </button>
        <button id="cookieEssentialOnly" type="button" class="px-3.5 py-2 rounded-xl bg-[#15151a] hover:bg-[#1f1f24] text-[#a69e9b] hover:text-[#f4ece7] text-xs font-medium border border-[rgba(244,236,231,0.12)] transition">
          הכרחיות בלבד
        </button>
        <a href="privacy.html" class="text-center sm:text-right px-2 py-1 text-xs text-[#665f5c] hover:text-[#a69e9b] transition">
          למידע נוסף
        </a>
      </div>
    `;

    document.body.appendChild(banner);

    // Fade in
    requestAnimationFrame(() => {
      banner.classList.remove('opacity-0', 'translate-y-4');
      banner.classList.add('opacity-100', 'translate-y-0');
    });

    document.getElementById('cookieAcceptAll').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'all');
      hideBanner();
      window.showToast('העדפות העוגיות נשמרו בהצלחה (הכל מאושר)');
    });

    document.getElementById('cookieEssentialOnly').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'essential');
      hideBanner();
      window.showToast('נשמרו עוגיות הכרחיות בלבד');
    });
  }

  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('opacity-100', 'translate-y-0');
    banner.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
        banner = null;
      }
    }, 320);
  }

  // Check initial state
  const currentConsent = localStorage.getItem(CONSENT_KEY);
  if (!currentConsent) {
    // Show banner after brief delay
    setTimeout(renderBanner, 800);
  }

  // Public method to reopen from footer at any time
  window.reopenCookieBanner = function() {
    renderBanner();
  };
}

/**
 * Ensures the UserWay accessibility icon does not overlap the logo on mobile.
 * Moves it below the 64px top navigation bar (top: 82px) on mobile viewports.
 */
function initUserWayMobileAdjustment() {
  function adjustPosition() {
    if (window.innerWidth > 768) return;

    const selectors = [
      '#userwayAccessibilityIcon',
      '[id*="userwayAccessibilityIcon"]',
      '.userway-widget',
      '.userway-widget-container',
      '.uway-accessibility-icon',
      'div.uway:not([role="dialog"])',
      'div[id^="userway"]:not([role="dialog"]):not([class*="modal"]):not([class*="dialog"])'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach(el => {
      if (el.tagName === 'BODY' || el.tagName === 'HTML' || el.getAttribute('role') === 'dialog') return;
      const computed = window.getComputedStyle(el);
      if (computed.position === 'fixed') {
        const top = parseFloat(computed.top) || 0;
        if (top < 75) {
          el.style.setProperty('top', '82px', 'important');
        }
      }
    });

    // Check custom elements shadowRoot if present
    document.querySelectorAll('*').forEach(el => {
      if (el.shadowRoot) {
        const shadowIcon = el.shadowRoot.querySelector('#userwayAccessibilityIcon, .userway-widget, [id*="userway"]');
        if (shadowIcon && shadowIcon.getAttribute('role') !== 'dialog') {
          const comp = window.getComputedStyle(shadowIcon);
          if (comp.position === 'fixed' && (parseFloat(comp.top) || 0) < 75) {
            shadowIcon.style.setProperty('top', '82px', 'important');
          }
        }
      }
    });
  }

  // Initial immediate check
  adjustPosition();

  // Run during the first several seconds while UserWay CDN script loads and initializes
  const interval = setInterval(adjustPosition, 200);
  setTimeout(() => clearInterval(interval), 6000);

  // MutationObserver to catch dynamic DOM injections or style recalculations by UserWay
  try {
    const observer = new MutationObserver(() => {
      adjustPosition();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  } catch (err) {
    // Non-blocking fallback
  }

  window.addEventListener('resize', adjustPosition, { passive: true });
  window.addEventListener('orientationchange', adjustPosition, { passive: true });
}

