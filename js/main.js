// ===================== TRANSLATIONS =====================
const translations = {
  ka: {
    "logo": "BMWX",
    "nav.home": "მთავარი",
    "nav.auctions": "აუქციონები",
    "nav.models": "მოდელები",
    "nav.contact": "კონტაქტი",
    "auth.login": "შესვლა",
    "hero.title": "BMW X5 აუქციონების პლატფორმა",
    "hero.subtitle": "პრემიუმ BMW X5 მოდელების ცოცხალი აუქციონები და დეტალური ინფორმაცია",
    "hero.cta": "ნახე აუქციონები",
    "stats.activeAuctions": "აქტიური აუქციონები",
    "stats.registeredUsers": "რეგისტრირებული მომხმარებლები",
    "stats.vehiclesSold": "გაყიდული ავტომობილები",
    "footer.text": "© 2026 BMW X5 Platform — ყველა უფლება დაცულია",
    "social.facebook": "Facebook",
    "social.instagram": "Instagram",
    "social.youtube": "YouTube",
    "bmw.sold" : "წინა კვირაში გაყიდული",
    "filter.all": "ყველა",
    "filter.2023": "2023",
    "filter.2022": "2022",
    "filter.rare": "შეზღუდული 🔥",
    "sold.price": "ფასი",
    "sold.date": "აუქციონის თარიღი",
    "sold.rarity": "გაბარიტი",
    "sold.year": "წელი",
    "sold.mileage": "გარბენი",
    "sold.fuel": "საწვავი",
    "sold.color": "ფერი",
    "sold.engine": "ძრავი",
    "share.facebook": "გაზიარება Facebook-ზე",
    "share.instagram": "გაზიარება Instagram-ზე",
    "share.twitter": "გაზიარება Twitter-ზე",
    "auction.bmw" : "აუქციონის თარიღი: იანვარი 6, 2026",
    "x30.auction" : "აუქციონის თარიღი: ნოემბერი 5, 2025",
     "filters.title": "ფილტრები",
    "filters.status": "სტატუსი",
    "filters.year": "წელი",
    "filters.fuel": "საწვავი",
    "filters.damage": "დაზიანება",
    "filters.price": "ფასის დიაპაზონი",
    "price.below5": "5,000€-მდე",
    "price.10plus": "10,000€+",
    "price.20plus": "20,000€+",
    "price.30plus": "30,000€+",
    "price.50plus": "50,000€+",
    "bid.now": "დაბიდვა",
    "bid.upcoming": "მალე"
  },
  en: {
    "logo": "BMWX",
    "nav.home": "Home",
    "nav.auctions": "Auctions",
    "nav.models": "Models",
    "nav.contact": "Contact",
    "auth.login": "Login",
    "hero.title": "BMW X5 Auction Platform",
    "hero.subtitle": "Premium BMW X5 live auctions and detailed information",
    "hero.cta": "See Auctions",
    "stats.activeAuctions": "Active Auctions",
    "stats.registeredUsers": "Registered Users",
    "stats.vehiclesSold": "Vehicles Sold",
    "footer.text": "© 2026 BMW X5 Platform — All rights reserved",
    "social.facebook": "Facebook",
    "social.instagram": "Instagram",
    "social.youtube": "YouTube",
    "bmw.sold" : "Sold in the last week",
    "filter.all": "All",
    "filter.2023": "2023",
    "filter.2022": "2022",
    "filter.rare": "Rare 🔥",
    "sold.price": "Price",
    "sold.date": "Auction Date",
    "sold.rarity": "Rarity",
    "sold.year": "Year",
    "sold.mileage": "Mileage",
    "sold.fuel": "Fuel Type",
    "sold.color": "Color",
    "sold.engine": "Engine",
    "share.facebook": "Share on Facebook",
    "share.instagram": "Share on Instagram",
    "share.twitter": "Share on Twitter",
    "auction.bmw" : "Auction date: Jan 6, 2026",
    "x30.auction" : "Auction date: Jan 5, 2026",
     "filters.title": "Filters",
    "filters.status": "Status",
    "filters.year": "Year",
    "filters.fuel": "Fuel",
    "filters.damage": "Damage",
    "filters.price": "Price Range",
    "price.below5": "Below €5K",
    "price.10plus": "€10K+",
    "price.20plus": "€20K+",
    "price.30plus": "€30K+",
    "price.50plus": "€50K+",
    "bid.now": "Bid Now",
    "bid.upcoming": "Upcoming"
  }
};

// ===================== LANGUAGE SWITCHER =====================
function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });
  document.documentElement.lang = lang;
}

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll(".lang-btn");
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (!lang) return;
      setLanguage(lang);
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// ===================== NAV HIGHLIGHT =====================
function setActiveNav() {
  const links = document.querySelectorAll(".main-nav a");
  const current = location.pathname.split("/").pop() || "index.html";
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === current));
}

// ===================== HEADER INJECTION =====================
async function loadHeader() {
  const headerRoot = document.getElementById("header-root");
  if (!headerRoot) return;

  const res = await fetch("partials/header.html");
  headerRoot.innerHTML = await res.text();

  // AFTER HEADER IS IN DOM
  setActiveNav();
  initLanguageSwitcher();
  setLanguage("ka"); // default language
}

// ===================== STAT COUNTERS =====================
function animateCounter(element, target, duration = 30000) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    element.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = target.toLocaleString();
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll(".stat-value");
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    animateCounter(counter, target);
  });
}

// ===================== MODAL LOGIC =====================
function initSoldModal() {
  const soldCards = document.querySelectorAll(".sold-card");
  const soldModal = document.getElementById("soldModal");
  if (!soldModal || !soldCards.length) return;

  const modalImg = soldModal.querySelector(".sold-modal-img");
  const modalTitle = soldModal.querySelector(".sold-modal-title");
  const modalPrice = soldModal.querySelector(".sold-modal-price");
  const modalDate = soldModal.querySelector(".sold-modal-date");
  const modalRarity = soldModal.querySelector(".sold-modal-rarity");
  const modalYear = soldModal.querySelector(".sold-modal-year");
  const modalMileage = soldModal.querySelector(".sold-modal-mileage");
  const modalFuel = soldModal.querySelector(".sold-modal-fuel");
  const modalColor = soldModal.querySelector(".sold-modal-color");
  const modalEngine = soldModal.querySelector(".sold-modal-engine");
  const modalClose = soldModal.querySelector(".sold-close");
  const prevCarBtn = soldModal.querySelector("#prevCar");
  const nextCarBtn = soldModal.querySelector("#nextCar");

  let currentIndex = 0;

  function openModal(index) {
    const card = soldCards[index];
    currentIndex = index;
    modalImg.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalPrice.textContent = card.querySelector("p:nth-child(2)").textContent;
    modalDate.textContent = card.querySelector("p:nth-child(3)").textContent;
    modalRarity.textContent = card.dataset.rare === "yes" ? "Rare 🔥" : "Standard";
    modalYear.textContent = card.dataset.year || "-";
    modalMileage.textContent = card.dataset.mileage || "-";
    modalFuel.textContent = card.dataset.fuel || "-";
    modalColor.textContent = card.dataset.color || "-";
    modalEngine.textContent = card.dataset.engine || "-";
    soldModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function prevCar() {
    currentIndex = (currentIndex - 1 + soldCards.length) % soldCards.length;
    openModal(currentIndex);
  }

  function nextCar() {
    currentIndex = (currentIndex + 1) % soldCards.length;
    openModal(currentIndex);
  }

  soldCards.forEach((card, i) => {
    card.addEventListener("click", () => openModal(i));
  });

  modalClose.addEventListener("click", () => {
    soldModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  prevCarBtn.addEventListener("click", prevCar);
  nextCarBtn.addEventListener("click", nextCar);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      soldModal.classList.remove("active");
      document.body.style.overflow = "";
    }
    if (e.key === "ArrowLeft") prevCar();
    if (e.key === "ArrowRight") nextCar();
  });
}

// ===================== FILTERS =====================
function initFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const soldCards = document.querySelectorAll(".sold-card");
  if (!filterButtons.length || !soldCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      soldCards.forEach((card, i) => {
        card.style.transition = "all 0.5s ease";
        setTimeout(() => {
          if (filter === "all") card.style.display = "block";
          else if (filter === "rare") card.style.display = card.dataset.rare === "yes" ? "block" : "none";
          else card.style.display = card.dataset.year === filter ? "block" : "none";
        }, i * 50);
      });
    });
  });
}

// ===================== STAGGERED ENTRY =====================
function initStaggeredCards() {
  const soldCards = document.querySelectorAll(".sold-card");
  soldCards.forEach((card, i) => {
    setTimeout(() => card.classList.add("show"), i * 120);
  });
}

// ===================== IMAGE ZOOM =====================
function initZoom() {
  const zoomOverlay = document.getElementById("zoomOverlay");
  const zoomedImage = document.getElementById("zoomedImage");
  const zoomClose = document.querySelector(".zoom-close");
  const modalImgZoomable = document.getElementById("modalImgZoomable");
  if (!zoomOverlay || !zoomedImage || !zoomClose || !modalImgZoomable) return;

  modalImgZoomable.addEventListener("click", () => {
    zoomedImage.src = modalImgZoomable.src;
    zoomOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  zoomClose.addEventListener("click", () => {
    zoomOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && zoomOverlay.classList.contains("active")) {
      zoomOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ===================== INIT ALL =====================
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  initCounters();
  initSoldModal();
  initFilters();
  initStaggeredCards();
  initZoom();
});







// Auctions


// auctions.js

/* =========================
   IMAGE SLIDER (UNCHANGED)
========================= */
document.querySelectorAll('.car-card').forEach(card => {
  const images = card.querySelectorAll('.car-slider img');
  if (!images.length) return;

  let index = 0;
  images[index].classList.add('active');

  setInterval(() => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  }, 3000);
});

/* =========================
   FILTER CORE
========================= */
const rows = document.querySelectorAll(".auction-row");
const emptyState = document.getElementById("emptyState");

const statusSel = document.getElementById("filterStatus");
const yearSel = document.getElementById("filterYear");
const fuelSel = document.getElementById("filterFuel");
const damageSel = document.getElementById("filterDamage");

const priceButtons = document.querySelectorAll(".price-option");
const minInput = document.getElementById("customMin");
const maxInput = document.getElementById("customMax");
const resetBtn = document.getElementById("resetFilters");

/* =========================
   PRICE STATE (SINGLE SOURCE)
========================= */
let priceFilter = null; // { min, max }

/* =========================
   APPLY FILTERS (VISUAL SAFE)
========================= */
function applyFilters() {
  let visibleCount = 0;

  rows.forEach(row => {
    const price = +row.dataset.price;
    const status = row.dataset.status;
    const year = row.dataset.year;
    const fuel = row.dataset.fuel;
    const damage = row.dataset.damage;

    const matches =
      (statusSel.value === "all" || status === statusSel.value) &&
      (yearSel.value === "all" || year === yearSel.value) &&
      (fuelSel.value === "all" || fuel === fuelSel.value) &&
      (damageSel.value === "all" || damage === damageSel.value) &&
      (!priceFilter ||
        ((priceFilter.min === null || price >= priceFilter.min) &&
         (priceFilter.max === null || price <= priceFilter.max)));

    /* 🔒 LOCK VISUALS */
    row.style.display = matches ? "flex" : "none";

    if (matches) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
}

/* =========================
   SELECT FILTERS
========================= */
[statusSel, yearSel, fuelSel, damageSel].forEach(select => {
  select.addEventListener("change", applyFilters);
});

/* =========================
   PRICE PRESETS (TOGGLEABLE)
========================= */
priceButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const min = btn.dataset.min ? +btn.dataset.min : null;
    const max = btn.dataset.max ? +btn.dataset.max : null;

    const isActive =
      btn.classList.contains("active") &&
      priceFilter &&
      priceFilter.min === min &&
      priceFilter.max === max;

    // TOGGLE OFF
    if (isActive) {
      priceFilter = null;
      btn.classList.remove("active");
    } 
    // TOGGLE ON
    else {
      priceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      priceFilter = { min, max };
    }

    minInput.value = "";
    maxInput.value = "";

    applyFilters();
  });
});

/* =========================
   CUSTOM PRICE INPUT
========================= */
[minInput, maxInput].forEach(input => {
  input.addEventListener("input", () => {
    priceButtons.forEach(b => b.classList.remove("active"));

    const min = minInput.value ? +minInput.value : null;
    const max = maxInput.value ? +maxInput.value : null;

    priceFilter = (min !== null || max !== null)
      ? { min, max }
      : null;

    applyFilters();
  });
});

/* =========================
   RESET FILTERS
========================= */
resetBtn.addEventListener("click", () => {
  statusSel.value = "all";
  yearSel.value = "all";
  fuelSel.value = "all";
  damageSel.value = "all";

  priceFilter = null;
  minInput.value = "";
  maxInput.value = "";

  priceButtons.forEach(b => b.classList.remove("active"));

  applyFilters();
});

document.querySelectorAll('.car-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  let index = 0;

  if(images.length > 0) images[0].classList.add('active');

  const leftBtn = slider.querySelector('.slider-btn.left');
  const rightBtn = slider.querySelector('.slider-btn.right');

  // Prevent clicks on arrows from triggering card clicks
  [leftBtn, rightBtn].forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      images[index].classList.remove('active');
      
      if (btn.classList.contains('left')) {
        index = (index - 1 + images.length) % images.length;
      } else {
        index = (index + 1) % images.length;
      }
      
      images[index].classList.add('active');
    });
  });
});

function initSliders() {
  document.querySelectorAll('.car-slider').forEach(slider => {
    const images = slider.querySelectorAll('img');
    if (images.length === 0) return;

    // Reset: Remove 'active' from all and give it to the first one
    images.forEach(img => img.classList.remove('active'));
    images[0].classList.add('active');

    // ... (rest of your click listener logic here)
  });
}

