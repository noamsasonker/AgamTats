/**
 * AgamTats Studio - Dedicated Gallery Engine
 * Real-time Multi-Filtering, Keyword Search & Modal Lightbox
 */

(function () {
  const fallbackTattoos = [
    {
      id: "tattoo-01",
      title: "פרחי בר עדינים תואמים",
      titleEn: "Matching Wildflower Vines",
      image: "assets/images/works/tattoo-01.jpg",
      style: "fineline",
      styleName: "קו דק",
      placement: "arm",
      placementName: "זרוע",
      description: "קעקוע תואם לשתי חברות בקו מיקרו עדין במיוחד. שילוב של פרחי בר וגבעולים זורמים המותאמים בדיוק לקו האנטומי של החלק האחורי בזרוע.",
      aspectRatio: "0.56",
      tags: ["פרחים", "בוטניקה", "מאצינג", "קו דק", "זרוע", "עדין"]
    },
    {
      id: "tattoo-02",
      title: "אבק כוכבים וניצוצות מיקרו",
      titleEn: "Cosmic Dust & Finger Sparkles",
      image: "assets/images/works/tattoo-02.jpg",
      style: "fineline",
      styleName: "קו דק ומיקרו",
      placement: "hand",
      placementName: "כף יד ואצבעות",
      description: "קומפוזיציה שמימית של ניצוצות וכוכבים בגדלים משתנים לאורך גב כף היד והאצבעות, בשילוב נגיעות עדינות של גוון אדום לצד שחור עדין.",
      aspectRatio: "0.56",
      tags: ["כוכבים", "כף יד", "אצבעות", "ניצוץ", "מיקרו", "קוסמוס"]
    },
    {
      id: "tattoo-03",
      title: "כיתוב Heavenly ועיטור בארוק",
      titleEn: "Heavenly Script & Baroque Flourish",
      image: "assets/images/works/tattoo-03.jpg",
      style: "lettering",
      styleName: "כיתוב ואורנמנט",
      placement: "wrist",
      placementName: "שורש כף היד ואמה",
      description: "קליגרפיה חופשית ואלגנטית של המילה Heavenly בשילוב עיטורי שריגים בסגנון בארוק גותי מעודן לאורך האמה ושורש כף היד.",
      aspectRatio: "0.75",
      tags: ["כיתוב", "קליגרפיה", "בארוק", "שורש כף יד", "אמה", "אורנמנט"]
    },
    {
      id: "tattoo-04",
      title: "צמד פרפרים בהצללה רכה",
      titleEn: "Soft-Shaded Duo Butterflies",
      image: "assets/images/works/tattoo-04.jpg",
      style: "fineline",
      styleName: "קו דק",
      placement: "ribs",
      placementName: "אגן ומותן",
      description: "צמד פרפרים בתנועה טבעית עם הצללה מדורגת חלקה ועבודת קווים דקה ונקייה, ממוקמים בקו המותן והאגן.",
      aspectRatio: "0.75",
      tags: ["פרפרים", "מותן", "אגן", "צלעות", "עדין", "ריאליזם רך"]
    },
    {
      id: "tattoo-05",
      title: "שרשרת קוראפיקה ופגיון",
      titleEn: "Kurapika Chain & Dagger",
      image: "assets/images/works/tattoo-05.jpg",
      style: "blackwork",
      styleName: "בלאקוורק ואנימה",
      placement: "arm",
      placementName: "זרוע ואמה",
      description: "עיצוב עוצמתי בהשראת האנימה Hunter x Hunter, שרשרת מתכת מדויקת עוטפת את האמה עם צלב ופגיון קונאי חדים.",
      aspectRatio: "0.56",
      tags: ["שרשרת", "אנימה", "בלאקוורק", "פגיון", "אמה", "זרוע"]
    },
    {
      id: "tattoo-06",
      title: "דוב קוטב מיקרו-ריאליסטי",
      titleEn: "Micro-Realistic Polar Bear",
      image: "assets/images/works/tattoo-06.jpg",
      style: "fineline",
      styleName: "מיקרו ריאליזם",
      placement: "back",
      placementName: "גב תחתון ומותן",
      description: "עבודת מיקרו-ריאליזם מרהיבה של דוב קוטב בצעידה. מרקם פרווה מפורט וקווים דקיקים במיוחד בגודל מיניאטורי מושלם.",
      aspectRatio: "0.56",
      tags: ["דוב", "חיות", "מיקרו", "ריאליזם", "גב תחתון", "מותן"]
    },
    {
      id: "tattoo-07",
      title: "דרקון יפני ופריחת דובדבן",
      titleEn: "Japanese Dragon & Cherry Blossom",
      image: "assets/images/works/tattoo-07.jpg",
      style: "japanese",
      styleName: "ניאו-יפני",
      placement: "arm",
      placementName: "זרוע ושרוול",
      description: "דרקון יפני מפותל לאורך הזרוע משולב פרחי דובדבן אדומים עדינים ומוטיבים של להבות ניאו-טרייבל בעיבוד מודרני.",
      aspectRatio: "0.56",
      tags: ["דרקון", "יפני", "פרחים", "סאקורה", "זרוע", "שרוול"]
    },
    {
      id: "tattoo-08",
      title: "גל ים ודולפין מינימליסטי",
      titleEn: "Minimalist Ocean Wave & Dolphin",
      image: "assets/images/works/tattoo-08.jpg",
      style: "fineline",
      styleName: "קו דק ומינימליזם",
      placement: "leg",
      placementName: "רגל ושוק",
      description: "גל ים בסגנון מסורתי עדין, דולפין מקפץ וירח לילי. עבודה נקייה ומאוזנת המדגישה תנועה ורוגע.",
      aspectRatio: "0.56",
      tags: ["גל", "ים", "דולפין", "ירח", "רגל", "שוק", "מינימליזם"]
    },
    {
      id: "tattoo-09",
      title: "שרוול דרקון ופרחים במבט מלא",
      titleEn: "Full Sleeve Flow - Dragon & Florals",
      image: "assets/images/works/tattoo-09.jpg",
      style: "japanese",
      styleName: "ניאו-יפני",
      placement: "arm",
      placementName: "זרוע שלמה",
      description: "מבט פנורמי מלא על יצירת שרוול שלם על לקוחה. זרימה אורגנית המדגישה את חיטובי הזרוע ויוצרת נוכחות אמנותית ייחודית.",
      aspectRatio: "0.56",
      tags: ["שרוול", "דרקון", "זרוע", "פרחים", "גוף", "ניאו יפני"]
    },
    {
      id: "tattoo-10",
      title: "נמר סייבר בתנועה",
      titleEn: "Cyber Chrome Pouncing Tiger",
      image: "assets/images/works/tattoo-10.jpg",
      style: "contemporary",
      styleName: "ניאו-טרייבל וסייבר",
      placement: "arm",
      placementName: "אמה וזרוע",
      description: "נמר מזנק בקווים שבטיים מודרניים עם אפקט אופטי של הילה אדומה ושחורה, המעניק תחושת תלת-ממד ודינמיות חסרת פשרות.",
      aspectRatio: "0.67",
      tags: ["נמר", "סייבר", "טרייבל", "אדום", "אמה", "עוצמתי"]
    },
    {
      id: "tattoo-11",
      title: "עקרב שחור ריאליסטי",
      titleEn: "Solid Blackwork Scorpion",
      image: "assets/images/works/tattoo-11.jpg",
      style: "blackwork",
      styleName: "בלאקוורק",
      placement: "arm",
      placementName: "זרוע עליונה",
      description: "עקרב שחור עמוק בריאליזם דרמטי עם ברק מתכתי שנוצר משימוש מושלם בשטח נגטיבי. יציבה מאיימת ואנטומיה מדויקת.",
      aspectRatio: "0.67",
      tags: ["עקרב", "בלאקוורק", "שחור", "זרוע", "כתף", "דרמטי"]
    },
    {
      id: "tattoo-12",
      title: "כוכבי כרום סייבר",
      titleEn: "3D Cyber Chrome Stars",
      image: "assets/images/works/tattoo-12.jpg",
      style: "contemporary",
      styleName: "סייבר וכרום",
      placement: "leg",
      placementName: "קרסול ורגל",
      description: "כוכבי כרום מתכתיים עם נפח והצללות עמוקות בסגנון Y2K / Cyberpunk לצד סמיילי קורץ, ממוקם מעל הקרסול.",
      aspectRatio: "0.56",
      tags: ["כוכבים", "כרום", "סייבר", "קרסול", "רגל", "עכשווי"]
    },
    {
      id: "tattoo-13",
      title: "קומפוזיציה אנטומית • שרשרת זרוע",
      titleEn: "Anatomical Forearm Chain & Kunai",
      image: "assets/images/works/tattoo-13.jpg",
      style: "blackwork",
      styleName: "בלאקוורק וקו עדין",
      placement: "arm",
      placementName: "זרוע ואמה",
      description: "קעקוע שרשרת ופגיון קונאי עוטף זרוע בהתאמה אנטומית מושלמת לתנועת השרירים, החל מהמרפק ועד לשורש כף היד.",
      aspectRatio: "0.56",
      tags: ["שרשרת", "זרוע", "אמה", "בלאקוורק", "אנטומיה", "חרב", "פגיון", "קו דק"]
    }
  ];

  let allTattoos = fallbackTattoos;
  let filteredTattoos = [...fallbackTattoos];
  let activeStyle = "all";
  let activePlacement = "all";
  let searchQuery = "";
  let currentLightboxIndex = -1;

  document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("galleryGrid");
    if (!gridContainer) return; // Not on gallery page

    const searchInput = document.getElementById("gallerySearch");
    const styleChips = document.querySelectorAll(".style-chip");
    const placementChips = document.querySelectorAll(".placement-chip");
    const countDisplay = document.getElementById("galleryCount");
    const emptyState = document.getElementById("galleryEmptyState");
    const resetFiltersBtn = document.getElementById("resetFiltersBtn");

    // Lightbox elements
    const lightbox = document.getElementById("galleryLightbox");
    const lbImg = document.getElementById("lbImage");
    const lbTitle = document.getElementById("lbTitle");
    const lbStyle = document.getElementById("lbStyle");
    const lbPlacement = document.getElementById("lbPlacement");
    const lbDesc = document.getElementById("lbDescription");
    const lbWaBtn = document.getElementById("lbWhatsAppBtn");
    const lbClose = document.getElementById("lbCloseBtn");
    const lbPrev = document.getElementById("lbPrevBtn");
    const lbNext = document.getElementById("lbNextBtn");

    // Fetch JSON or fallback
    fetch("assets/data/tattoos.json")
      .then(res => res.json())
      .then(data => {
        allTattoos = data;
        render();
      })
      .catch(() => {
        allTattoos = fallbackTattoos;
        render();
      });

    function render() {
      // Apply filters
      filteredTattoos = allTattoos.filter(item => {
        const matchesStyle = activeStyle === "all" || item.style === activeStyle;
        const matchesPlacement = activePlacement === "all" || item.placement === activePlacement;
        
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch = !q || 
          item.title.toLowerCase().includes(q) ||
          item.titleEn.toLowerCase().includes(q) ||
          item.styleName.toLowerCase().includes(q) ||
          item.placementName.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));

        return matchesStyle && matchesPlacement && matchesSearch;
      });

      // Update counter
      if (countDisplay) {
        countDisplay.textContent = `מציג ${filteredTattoos.length} מתוך ${allTattoos.length} עבודות`;
      }

      // Empty state
      if (filteredTattoos.length === 0) {
        gridContainer.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
        return;
      } else {
        if (emptyState) emptyState.classList.add("hidden");
      }

      // Render cards
      gridContainer.innerHTML = filteredTattoos.map((item, index) => `
        <div class="gallery-artwork-card group" onclick="window.openLightbox(${index})">
          <div class="artwork-media-wrap aspect-[3/4] relative">
            <img src="${item.image}" alt="${item.title}" class="artwork-img" loading="lazy">
            <div class="artwork-overlay">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="text-[11px] font-semibold text-[#f4ece7] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#15151a]/85 backdrop-blur-sm border border-[rgba(244,236,231,0.2)]">${item.styleName}</span>
                <span class="text-[11px] text-[#a69e9b] font-medium">${item.placementName}</span>
              </div>
              <h3 class="text-base font-bold text-[#f4ece7] tracking-wide">${item.title}</h3>
              <p class="text-xs text-[#a69e9b] line-clamp-1 mt-0.5 font-light">${item.description}</p>
            </div>
          </div>
          <div class="p-3.5 bg-[#15151a] border-t border-[rgba(244,236,231,0.08)] flex items-center justify-between">
            <div class="min-w-0 pr-1">
              <h4 class="text-xs sm:text-sm font-semibold text-[#f4ece7] truncate">${item.title}</h4>
              <p class="text-[11px] text-[#665f5c] truncate">${item.titleEn}</p>
            </div>
            <div class="w-7 h-7 rounded-full bg-[rgba(244,236,231,0.06)] group-hover:bg-[#f4ece7] text-[#f4ece7] group-hover:text-black flex items-center justify-center shrink-0 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </div>
          </div>
        </div>
      `).join("");
    }

    // Search input
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        render();
      });
    }

    // Style chips
    styleChips.forEach(chip => {
      chip.addEventListener("click", () => {
        styleChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        activeStyle = chip.dataset.style;
        render();
      });
    });

    // Placement chips
    placementChips.forEach(chip => {
      chip.addEventListener("click", () => {
        placementChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        activePlacement = chip.dataset.placement;
        render();
      });
    });

    // Reset filters
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        activeStyle = "all";
        activePlacement = "all";
        searchQuery = "";
        if (searchInput) searchInput.value = "";
        styleChips.forEach(c => c.classList.toggle("active", c.dataset.style === "all"));
        placementChips.forEach(c => c.classList.toggle("active", c.dataset.placement === "all"));
        render();
      });
    }

    // Lightbox functions
    window.openLightbox = function(index) {
      const item = filteredTattoos[index];
      if (!item) return;
      currentLightboxIndex = index;

      lbImg.src = item.image;
      lbImg.alt = item.title;
      lbTitle.textContent = item.title;
      lbStyle.textContent = item.styleName;
      lbPlacement.textContent = item.placementName;
      lbDesc.textContent = item.description;

      const waMsg = encodeURIComponent(`היי אגם, ראיתי בגלריה שלך את הקעקוע "${item.title}" ואשמח לתאם תור/ייעוץ עבור קעקוע בסגנון הזה!`);
      lbWaBtn.href = `https://wa.me/972559531511?text=${waMsg}`;

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lightbox) {
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    function showNext() {
      if (filteredTattoos.length === 0) return;
      // In RTL next moves to the left
      currentLightboxIndex = (currentLightboxIndex + 1) % filteredTattoos.length;
      window.openLightbox(currentLightboxIndex);
    }

    function showPrev() {
      if (filteredTattoos.length === 0) return;
      currentLightboxIndex = (currentLightboxIndex - 1 + filteredTattoos.length) % filteredTattoos.length;
      window.openLightbox(currentLightboxIndex);
    }

    if (lbNext) lbNext.addEventListener("click", showNext);
    if (lbPrev) lbPrev.addEventListener("click", showPrev);

    document.addEventListener("keydown", (e) => {
      if (!lightbox || !lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showNext();
      if (e.key === "ArrowRight") showPrev();
    });

    render();
  });
})();
