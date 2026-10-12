// AgamTats Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lightbox Data & Handling
  const galleryItems = [
    {
      id: 1,
      title: "Fine Line Mandala",
      titleHe: "מנדלה גיאומטרית בקו דק",
      category: "mandala",
      categoryName: "מנדלות וקווים עדינים",
      src: "assets/images/mandala-fine-line.png",
      desc: "קעקוע מנדלה מעודן, סימטריה מוחלטת עם עבודת מחט עדינה במיוחד (03RL)."
    },
    {
      id: 2,
      title: "Dotwork Moon & Cosmos",
      titleHe: "ירח קוסמי בטכניקת דוטוורק",
      category: "dotwork",
      categoryName: "דוטוורק (נקודות)",
      src: "assets/images/dotwork-moon.png",
      desc: "עבודת הצללה נקודתית מדורגת (Dotwork shading) משולבת אלמנטים שמימיים וקווים גיאומטריים."
    },
    {
      id: 3,
      title: "Fine Line Serpent",
      titleHe: "נחש ריאליסטי בקו עדין",
      category: "fineline",
      categoryName: "קו דק (Fine Line)",
      src: "assets/images/fine-line-snake.png",
      desc: "תנועה זורמת המותאמת לאנטומיית הגוף, דיוק מינימליסטי ומרקם קשקשים עדין."
    },
    {
      id: 4,
      title: "Geometric Compass",
      titleHe: "מצפן גיאומטרי קדוש",
      category: "geometric",
      categoryName: "גיאומטריה מקודשת",
      src: "assets/images/geometric-compass.png",
      desc: "שילוב של גיאומטריה מקודשת, מעגלים מושלמים וקווים ישרים חדים ומדויקים."
    },
    {
      id: 5,
      title: "Wrist Lotus Blossom",
      titleHe: "פרח לוטוס מעודן לפרק כף היד",
      category: "fineline",
      categoryName: "קו דק (Fine Line)",
      src: "assets/images/wrist-lotus.png",
      desc: "עיצוב עדין ורומנטי, מותאם במיוחד לאזורים קטנים ואינטימיים בגוף."
    },
    {
      id: 6,
      title: "Dotwork Sacred Mandala",
      titleHe: "מנדלה עגולה בדוטוורק מלא",
      category: "dotwork",
      categoryName: "דוטוורק ומנדלות",
      src: "assets/images/dotwork-mandala.png",
      desc: "קומפוזיציה עשירה בפרטים מיקרוסקופיים, עבודת נמלים נקייה ואסתטיקה נצחית."
    }
  ];

  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalWaLink = document.getElementById('modalWaLink');
  const closeModalBtn = document.getElementById('closeModalBtn');
  let currentItemIndex = -1;

  window.openArtworkModal = function(index) {
    const item = galleryItems[index];
    if (!item) return;
    currentItemIndex = index;
    modalImg.src = item.src;
    modalImg.alt = item.titleHe;
    modalTitle.textContent = item.titleHe;
    modalCategory.textContent = item.categoryName;
    modalDesc.textContent = item.desc;
    
    // Custom WhatsApp message targeting this specific tattoo design
    const waText = encodeURIComponent(`היי אגם, ראיתי בתיק העבודות שלך את הקעקוע "${item.titleHe}" ואשמח לתאם תור/ייעוץ בסגנון הזה!`);
    modalWaLink.href = `https://wa.me/972559531511?text=${waText}`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (modal.classList.contains('open')) {
      if (e.key === 'ArrowRight') {
        // RTL next
        const nextIdx = (currentItemIndex - 1 + galleryItems.length) % galleryItems.length;
        window.openArtworkModal(nextIdx);
      } else if (e.key === 'ArrowLeft') {
        // RTL prev
        const prevIdx = (currentItemIndex + 1) % galleryItems.length;
        window.openArtworkModal(prevIdx);
      }
    }
  });

  // 2. Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-white', 'text-black');
        b.classList.add('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
      });
      btn.classList.add('active', 'bg-white', 'text-black');
      btn.classList.remove('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');

      const filter = btn.dataset.filter;
      galleryCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. Toast Notification for Phone Copy
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const toast = document.getElementById('toast');

  window.showToast = function(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 2800);
  };

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('055-9531511').then(() => {
        window.showToast('מספר הטלפון הועתק בהצלחה');
      }).catch(() => {
        window.showToast('חייגו: 055-9531511');
      });
    });
  }

  // 5. Mobile Sticky CTA Bottom Bar visibility on scroll
  const mobileBar = document.getElementById('mobileStickyBar');
  const heroSection = document.getElementById('heroSection');

  if (mobileBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 100) {
        mobileBar.classList.remove('translate-y-full');
        mobileBar.classList.add('translate-y-0');
      } else {
        mobileBar.classList.add('translate-y-full');
        mobileBar.classList.remove('translate-y-0');
      }
    });
  }
});
