

// === LANGUAGE SWITCHER ===
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
    "auth.login" : "შესვლა",
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
    "sold.pricee" : "ფასი €85,000",
    "auction.bmw" : "აუქციონის თარიღი: იანვარი 6, 2026",
    "x30.sold" :  "ფასი €72,500",
    "x30.auction" : "აუქციონის თარიღი: ნოემბერი 5, 2025"
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
    "auth.login" : "login",
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
    "sold.pricee" : "Sold for €85,000",
    "auction.bmw" : "Auction date: Jan 6, 2026 ",
    "x30.sold" : "Sold for €72,500",
    "x30.auction" : "Auction date: Jan 5, 2026"
  }
};



const langButtons = document.querySelectorAll(".lang-btn");
const i18nElements = document.querySelectorAll("[data-i18n]");

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active from all
    langButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedLang = btn.dataset.lang;

    i18nElements.forEach(el => {
      const key = el.dataset.i18n;
      if (translations[selectedLang][key]) {
        el.textContent = translations[selectedLang][key];
      }
    });
  });
});


function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.dataset.i18n.split(".");
    let value = translations[lang];

    keys.forEach(k => value = value?.[k]);

    if (value) el.textContent = value;
  });

  document.documentElement.lang = lang;
}

document.querySelectorAll(".lang-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

// Default language
setLanguage("ka");


function animateCounter(element, target, duration = 30000) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out curve (luxury feel)
    const eased = 1 - Math.pow(1 - progress, 3);

    const value = Math.floor(eased * target);
    element.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

/* Trigger on load */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-value");

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    animateCounter(counter, target);
  });
});




// MODAL
const soldCards = document.querySelectorAll(".sold-card");
const soldModal = document.getElementById("soldModal");

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

// Populate modal
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

soldCards.forEach((card, i) => {
  card.addEventListener("click", () => openModal(i));
  
});

modalClose.addEventListener("click", () => {
  soldModal.classList.remove("active");
  document.body.style.overflow = "";
});



// Count-up function for price
function countUp(element, end) {
  let current = 0;
  const increment = Math.ceil(end / 60); // 60 frames
  const interval = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = "€" + end.toLocaleString();
      clearInterval(interval);
    } else {
      element.textContent = "€" + current.toLocaleString();
    }
  }, 12);
}

// Show modal
soldCards.forEach(card => {
  card.addEventListener("click", () => {
    modalImg.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h3").textContent;

    const priceText = card.querySelector("p:nth-child(2)").textContent.replace(/[^\d]/g,'');
    countUp(modalPrice, parseInt(priceText));

    modalDate.textContent = card.querySelector("p:nth-child(3)").textContent;
    modalRarity.textContent = card.dataset.rare === "yes" ? "Rare 🔥" : "Standard";

    soldModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  soldModal.classList.remove("active");
  document.body.style.overflow = "";
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    soldModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ===================== FILTERS WITH ANIMATION =====================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    soldCards.forEach((card, i) => {
      card.style.transition = "all 0.5s ease";
      setTimeout(() => {
        if (filter === "all") {
          card.style.display = "block";
        } else if (filter === "rare") {
          card.style.display = card.dataset.rare === "yes" ? "block" : "none";
        } else {
          card.style.display = card.dataset.year === filter ? "block" : "none";
        }
      }, i * 50); // staggered animation
    });
  });
});

// ===================== STAGGERED ENTRY ANIMATION =====================
window.addEventListener("load", () => {
  soldCards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("show");
    }, i * 120);
  });
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    soldModal.classList.remove("active");
    document.body.style.overflow = "";
  }
  if (e.key === "ArrowLeft") prevCar();
  if (e.key === "ArrowRight") nextCar();
});

function prevCar() {
  currentIndex = (currentIndex - 1 + soldCards.length) % soldCards.length;
  openModal(currentIndex);
}
function nextCar() {
  currentIndex = (currentIndex + 1) % soldCards.length;
  openModal(currentIndex);
}

prevCarBtn.addEventListener("click", prevCar);
nextCarBtn.addEventListener("click", nextCar);


// Elements
const zoomOverlay = document.getElementById("zoomOverlay");
const zoomedImage = document.getElementById("zoomedImage");
const zoomClose = document.querySelector(".zoom-close");
const modalImgZoomable = document.getElementById("modalImgZoomable");

// When user clicks the modal image
modalImgZoomable.addEventListener("click", () => {
  zoomedImage.src = modalImgZoomable.src; // keep same image
  zoomOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // prevent background scroll
});

// Close zoom overlay
zoomClose.addEventListener("click", () => {
  zoomOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Optional: close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && zoomOverlay.classList.contains("active")) {
    zoomOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});


