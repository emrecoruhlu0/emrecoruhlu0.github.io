// Theme (dark/light) with localStorage
(function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved) document.documentElement.setAttribute("data-theme", saved);
})();

function toggleTheme(){
  const cur = document.documentElement.getAttribute("data-theme");
  const next = (cur === "light") ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  toast(next === "light" ? "Light mode" : "Dark mode");
}

// Toast
let toastTimer = null;
function toast(msg){
  const el = document.getElementById("toast");
  if(!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove("show"), 1600);
}

// Scroll progress bar + back-to-top
function onScroll(){
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  const bar = document.getElementById("progressBar");
  if(bar) bar.style.width = p.toFixed(2) + "%";

  const toTop = document.getElementById("toTop");
  if(toTop){
    if(scrollTop > 500) toTop.classList.add("show");
    else toTop.classList.remove("show");
  }
}
window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);

// Simple typing effect
function typeText(el, text, speed=45){
  if(!el) return;
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, i);
    i++;
    if(i <= text.length) requestAnimationFrame(()=> setTimeout(tick, speed));
  };
  tick();
}

// Reveal on scroll (IntersectionObserver)
function initReveal(){
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("show");
        // animate skill bars once visible
        e.target.querySelectorAll("[data-bar]").forEach(bar=>{
          const v = bar.getAttribute("data-bar");
          const inner = bar.querySelector("div");
          if(inner && inner.style.width === "0%") inner.style.width = v + "%";
        });
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  items.forEach(x=> io.observe(x));
}

// Project filter
function initProjectFilter(){
  const input = document.getElementById("projectFilter");
  if(!input) return;
  const cards = Array.from(document.querySelectorAll("[data-project]"));

  input.addEventListener("input", ()=>{
    const q = input.value.trim().toLowerCase();
    cards.forEach(card=>{
      const hay = (card.getAttribute("data-project") || "").toLowerCase();
      card.style.display = hay.includes(q) ? "" : "none";
    });
  });
}

// Contact "fake form" -> mailto compose
function initMailComposer(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = (document.getElementById("c_name")?.value || "").trim();
    const subj = (document.getElementById("c_subject")?.value || "").trim();
    const msg  = (document.getElementById("c_msg")?.value || "").trim();

    const to = "ecoruhlu0@gmail.com"; // burayı kendi mailinle değiştir
    const subject = encodeURIComponent(subj || "İletişim");
    const body = encodeURIComponent(`İsim: ${name}\n\nMesaj:\n${msg}`);

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    toast("Mail uygulaması açılıyor...");
  });
}

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navlinks a").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
  });
}

// İletişim Tercihi Fonksiyonu
function initContactPreference() {
  const radios = document.querySelectorAll('input[name="iletisim"]');
  const container = document.getElementById("dynamicContactFields");
  const label = document.getElementById("dyLabel");
  const input = document.getElementById("dyInput");

  if (!radios.length || !container || !label || !input) return;

  radios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      container.style.display = "block";
      if (e.target.value === "eposta") {
        label.textContent = "E-posta Adresi (İletişim İçin):";
        input.type = "email";
        input.placeholder = "ornek@mail.com";
      } else if (e.target.value === "telefon") {
        label.textContent = "Telefon Numarası:";
        input.type = "tel";
        input.placeholder = "05xx xxx xx xx";
      }
    });
  });
}

// Hamburger nav toggle
function initNavToggle(){
  const btn = document.getElementById("navToggle");
  const links = document.querySelector(".navlinks");
  if(!btn || !links) return;
  btn.addEventListener("click", ()=>{
    const open = links.classList.toggle("open");
    btn.textContent = open ? "✕" : "☰";
    btn.setAttribute("aria-expanded", open);
  });
  // Bir linke tıklanınca menüyü kapat
  links.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click", ()=>{
      links.classList.remove("open");
      btn.textContent = "☰";
      btn.setAttribute("aria-expanded", false);
    });
  });
}

window.addEventListener("load", ()=>{
  // hero typing
  const t = document.getElementById("typing");
  if(t){
    const text = t.getAttribute("data-text") || "Web • Gömülü Sistemler • Yapay Zeka";
    typeText(t, text, 35);
  }

  initReveal();
  initProjectFilter();
  initMailComposer();
  initContactPreference();
  setActiveNav();
  initNavToggle();

  const btn = document.getElementById("themeBtn");
  if(btn) btn.addEventListener("click", toggleTheme);

  const toTop = document.getElementById("toTop");
  if(toTop) toTop.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));
});