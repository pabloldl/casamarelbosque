'use strict';

// Mobile index: a real disclosure. The index stays visible if JavaScript is off.
const rail = document.querySelector('.index-rail');
const menu = document.querySelector('#chapter-nav');
const toggle = document.querySelector('.menu-toggle');
const mobile = matchMedia('(max-width: 760px)');
document.body.classList.remove('no-menu-js');
toggle.hidden = false;
function setMenu(open, restoreFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.menu-label').textContent = open ? 'Cerrar' : 'Menú';
  menu.classList.toggle('is-open', open);
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  setMenu(false);
  if (mobile.matches) {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('pointerdown', event => {
  if (mobile.matches && !rail.contains(event.target)) setMenu(false);
});
rail.addEventListener('focusout', event => {
  if (event.relatedTarget && !rail.contains(event.relatedTarget)) setMenu(false);
});
mobile.addEventListener('change', () => setMenu(false));

// Each photograph has one place in the page: cover, space, then fragments.
const photos = (window.CASA_MAR_PHOTOS || []).filter(photo =>
  photo && typeof photo.src === 'string' && /^imgs\//.test(photo.src) &&
  !photo.src.includes('..') && typeof photo.alt === 'string' && photo.alt.trim()
);
const dialog = document.querySelector('#lightbox');
const largePhoto = document.querySelector('#large-photo');
const stage = document.querySelector('#stage');
const zoom = document.querySelector('#zoom');
let currentPhoto = 0;
let opener;
function resetZoom() {
  stage.classList.remove('zoomed');
  zoom.textContent = 'Ampliar';
  zoom.setAttribute('aria-pressed', 'false');
  stage.scrollTo(0, 0);
}
function showPhoto(index) {
  if (!photos.length) return;
  currentPhoto = (index + photos.length) % photos.length;
  largePhoto.src = photos[currentPhoto].src;
  largePhoto.alt = photos[currentPhoto].alt;
  document.querySelector('#photo-counter').textContent = `${currentPhoto + 1} / ${photos.length}`;
  document.querySelector('#photo-caption').textContent = photos[currentPhoto].alt;
  resetZoom();
}
function openPhoto(index, trigger) {
  opener = trigger;
  showPhoto(index);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  document.querySelector('#close').focus();
}
function photoButton(photo, index, eager = false) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'photo-open';
  button.setAttribute('aria-label', `Abrir fotografía: ${photo.alt}`);
  const image = new Image();
  image.src = photo.src;
  image.alt = photo.alt;
  image.loading = eager ? 'eager' : 'lazy';
  image.decoding = 'async';
  if (eager) image.fetchPriority = 'high';
  if (photo.width > 0) image.width = photo.width;
  if (photo.height > 0) image.height = photo.height;
  if (photo.srcset) {
    image.srcset = photo.srcset;
    image.sizes = eager ? '(max-width: 760px) 49vw, 40vw' : '(max-width: 760px) 85vw, 65vw';
  }
  image.addEventListener('load', () => {
    const figure = button.closest('figure');
    figure?.classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth);
    figure?.classList.toggle('is-landscape', image.naturalWidth >= image.naturalHeight);
  });
  image.addEventListener('error', () => {
    image.hidden = true;
    button.disabled = true;
    button.textContent = 'Fotografía no disponible';
  });
  button.append(image);
  button.addEventListener('click', () => openPhoto(index, button));
  return button;
}
if (photos[0]) {
  const cover = document.querySelector('#cover-image');
  cover.classList.remove('no-photo');
  cover.replaceChildren(photoButton(photos[0], 0, true));
}
if (photos[1]) {
  const space = document.querySelector('#space-image');
  space.hidden = false;
  space.append(photoButton(photos[1], 1));
  document.querySelector('.space-composition').classList.add('has-photo');
}
if (photos.length > 2) {
  const collage = document.querySelector('#photo-collage');
  collage.hidden = false;
  document.querySelector('#album-pending').hidden = true;
  photos.slice(2).forEach((photo, i) => {
    const figure = document.createElement('figure');
    figure.className = 'fragment';
    const caption = document.createElement('figcaption');
    const number = document.createElement('span');
    number.textContent = String(i + 1).padStart(2, '0');
    caption.append(number, document.createTextNode(photo.alt));
    figure.append(photoButton(photo, i + 2), caption);
    collage.append(figure);
    if (i === 1 && photos.length > 4) {
      const note = document.createElement('p');
      note.className = 'collage-note';
      note.append('Un mismo espacio. Distintas miradas.');
      const label = document.createElement('span');
      label.textContent = 'FRAGMENTOS / CASA MAR';
      note.append(label);
      collage.append(note);
    }
  });
}
document.querySelector('#close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  resetZoom();
  largePhoto.removeAttribute('src');
  opener?.focus();
});
document.querySelector('#previous').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#next').addEventListener('click', () => showPhoto(currentPhoto + 1));
zoom.addEventListener('click', () => {
  const expanded = stage.classList.toggle('zoomed');
  zoom.setAttribute('aria-pressed', String(expanded));
  zoom.textContent = expanded ? 'Reducir' : 'Ampliar';
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); }
});
let touchStart;
stage.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1 ? event.touches[0] : null;
}, { passive: true });
stage.addEventListener('touchend', event => {
  if (!touchStart || stage.classList.contains('zoomed')) return;
  const end = event.changedTouches[0];
  const dx = end.clientX - touchStart.clientX;
  const dy = end.clientY - touchStart.clientY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) showPhoto(currentPhoto + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
largePhoto.addEventListener('error', () => {
  document.querySelector('#photo-caption').textContent = 'No se ha podido cargar esta fotografía.';
});

if ('IntersectionObserver' in window) {
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const navObserver = new IntersectionObserver(entries => {
    const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!active) return;
    const selected = links.find(link => link.hash === `#${active.target.id}`);
    if (!selected) return;
    links.forEach(link => link.removeAttribute('aria-current'));
    selected.setAttribute('aria-current', 'location');
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  links.forEach(link => {
    const target = document.querySelector(link.hash);
    if (target) navObserver.observe(target);
  });
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const elements = document.querySelectorAll('.space-image:not([hidden]), .fragment, .display-title, .fragments h2, .place h2');
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    }
  }), { threshold: 0.07 });
  if (!motion.matches) elements.forEach(element => {
    element.classList.add(element.matches('figure') ? 'mask-ready' : 'type-ready');
    reveal.observe(element);
  });
  motion.addEventListener('change', event => {
    if (event.matches) { elements.forEach(element => element.classList.add('is-visible')); reveal.disconnect(); }
  });
}

