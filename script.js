document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

function setNavOpen(open){
  mainNav.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  document.body.classList.toggle('nav-open', open);
}

navToggle.addEventListener('click', () => {
  setNavOpen(!mainNav.classList.contains('open'));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setNavOpen(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNavOpen(false);
});

/* ---------- LIGHTBOX ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(piece){
  const img = piece.querySelector('img');
  const name = piece.querySelector('.piece-info h3')?.textContent ?? '';
  const cat = piece.querySelector('.piece-info span')?.textContent ?? '';

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.innerHTML = `${name}<span>${cat}</span>`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('nav-open');
}

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('nav-open');
}

document.querySelectorAll('.piece').forEach(piece => {
  const trigger = piece.querySelector('.piece-figure');
  trigger.addEventListener('click', () => openLightbox(piece));
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      openLightbox(piece);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const item = document.getElementById('fItem').value;
  const size = document.getElementById('fSize').value.trim();
  const msg = document.getElementById('fMsg').value.trim();

  let text = `Bonjour DIAFEZ SHOP, je suis ${name}.\nJe suis intéressé(e) par : ${item}.`;
  if (size) text += `\nTaille : ${size}.`;
  if (msg) text += `\n${msg}`;

  const url = `https://wa.me/23797695006?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
});
