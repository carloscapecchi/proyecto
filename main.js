// MENU //
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
const links = document.querySelectorAll('.nav__link');

const overlay = document.createElement('div');
overlay.className = 'nav__overlay';
document.body.appendChild(overlay);

function setMenu(open) {
  if (open) {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.textContent = '✕';
    toggle.setAttribute('aria-label', 'Cerrar menú');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('visible');
  } else {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('visible');
  }
}

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.contains('open');
  setMenu(!isOpen);
});

links.forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

overlay.addEventListener('click', () => setMenu(false));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

const mq = window.matchMedia('(min-width: 768px)');
mq.addEventListener('change', (e) => {
  if (e.matches) setMenu(false);
});

// LANDING LOAD EFFECT INDEX.html //
window.addEventListener("load", () => {
  document.querySelector(".landing").classList.add("visible");
});

// CONTAINERS EFFECT SCROLL //
const items = document.querySelectorAll(".single-highlight");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...items].indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.10}s`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

items.forEach((item) => observer.observe(item));

// EFECTO ENTRADA BARRIDO SERVICIO 1 //
document.addEventListener("DOMContentLoaded", () => {

  const firstElements = document.querySelectorAll(".first");

  if (firstElements.length === 0) return;

  const firstOnLoad = firstElements[0];
  firstOnLoad.classList.add("visible");

  const others = Array.from(firstElements).slice(1);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  others.forEach(el => observer.observe(el));

});

// EFECTO ENTRADA BARRIDO SERVICIO 2 //
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".second");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(el => observer.observe(el));
});

// EFECTO APARCION ABOUT.html //
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".about-main").classList.add("show");
});

// EFECTO CREDENTIALS SCROLL //
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".credentials");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  });

  if (target) observer.observe(target);
});

// EFECTO SINGLE-VALUE //
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".single-value");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`; 
    observer.observe(item);
  });
});

// CALENDAR //
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "consulta", {origin:"https://app.cal.com"});

Cal.ns.consulta("ui", {"hideEventTypeDetails":false,"layout":"month_view"});

// MAP //
const lat = -2.1574252;
const lng = -79.9051;

const map = L.map("map").setView([lat, lng], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const mapsURL = isIOS
    ? `http://maps.apple.com/?daddr=${lat},${lng}`
    : `https://www.google.com/maps?q=${lat},${lng}`;

L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`
    <b style="font-weight: bold;">Consultorio</b><br>
    C. 15 N-O 208, Guayaquil<br>
    <a href="${mapsURL}" target="_blank" 
        style="color:#0077cc; text-decoration:underline;">
        Cómo llegar
    </a>
    `)
    .openPopup();

// BLOG //
function toggleTag(tag) {
  const isAll = tag.dataset.filter === "all";

  if (isAll) {
      document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
      tag.classList.add("active");
  } else {
      document.querySelector('.tag[data-filter="all"]').classList.remove("active");

      tag.classList.toggle("active");
  }

  filterPosts();
}

function filterPosts() {
  const activeTags = [...document.querySelectorAll(".tag.active")]
    .map(tag => tag.dataset.filter);

  const posts = document.querySelectorAll(".post");

  if (activeTags.includes("all") || activeTags.length === 0) {
    posts.forEach(post => post.style.display = "block");
    return;
  }

  posts.forEach(post => {
    const categories = post.dataset.category.split(" ");

    const matches = activeTags.some(tag => categories.includes(tag));

    post.style.display = matches ? "block" : "none";
  });
}

// EFECTO POSTS //
document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".post");

  posts.forEach((post, index) => {
    post.style.animationDelay = `${index * 0.2}s`; 
  });
});




