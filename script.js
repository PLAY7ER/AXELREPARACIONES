// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Selección de marca
const brandCards = document.querySelectorAll('.brand-card');
brandCards.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    brandCards.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const select = document.querySelector('select[name="brand"]');
    if(select){ select.value = btn.dataset.brand; }
    document.querySelector('#cotizador')?.scrollIntoView({behavior:'smooth'});
  });
});

// Cotizador sencillo
const ISSUE_BASE = { pantalla:1.0, bateria:0.55, conector:0.45, camara:0.6, software:0.35, otro:0.4 };
const BRAND_MULT = { Apple:1.6, Samsung:1.2, Xiaomi:1.0, Motorola:1.0, Huawei:1.1, Otro:1.0 };

function formatARS(n){
  return n.toLocaleString('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0});
}

document.getElementById('quoteForm').addEventListener('submit', e=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget).entries());
  const base = 120000; // base orientativa
  const multBrand = BRAND_MULT[data.brand] ?? 1.0;
  const multIssue = ISSUE_BASE[data.issue] ?? 0.5;
  const estimate = Math.round(base * multBrand * multIssue);
  document.getElementById('estimatePrice').textContent = formatARS(estimate);
  document.getElementById('estimateBox').classList.remove('hidden');
});