const carousel = document.getElementById('carousel');
const slides = [...document.querySelectorAll('.slide')];
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.modal-close');

let index = 0;
let timer;

function goToSlide(i) {
  index = (i + slides.length) % slides.length;
  slides[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function openModal(slide) {
  const img = slide.querySelector('img');
  const caption = slide.querySelector('figcaption').textContent;
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalCaption.textContent = caption;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function startAutoScroll() {
  timer = setInterval(() => goToSlide(index + 1), 3500);
}

function resetAutoScroll() {
  clearInterval(timer);
  startAutoScroll();
}

slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    if (modal.classList.contains('open')) closeModal();
    else openModal(slide);
  });
  slide.addEventListener('mouseenter', resetAutoScroll);
});

prevBtn?.addEventListener('click', () => { goToSlide(index - 1); resetAutoScroll(); });
nextBtn?.addEventListener('click', () => { goToSlide(index + 1); resetAutoScroll(); });
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target === modalImg) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

carousel.addEventListener('scroll', () => {
  const slideWidth = slides[0].getBoundingClientRect().width + 14;
  index = Math.round(carousel.scrollLeft / slideWidth);
});

startAutoScroll();
