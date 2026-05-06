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

/* ---------- SLIDE NAVIGATION ---------- */
function goToSlide(i) {
  index = (i + slides.length) % slides.length;

  slides[index].scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest'
  });
}

/* ---------- MODAL ---------- */
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

/* ---------- AUTOPLAY ---------- */
function startAutoScroll() {
  clearInterval(timer);

  timer = setInterval(() => {
    goToSlide(index + 1);
  }, 3500);
}

function resetAutoScroll() {
  startAutoScroll();
}

/* ---------- EVENTS ---------- */
slides.forEach((slide) => {
  slide.addEventListener('click', () => {
    if (modal.classList.contains('open')) closeModal();
    else openModal(slide);
  });

  slide.addEventListener('mouseenter', resetAutoScroll);
});

/* buttons */
prevBtn?.addEventListener('click', () => {
  goToSlide(index - 1);
  resetAutoScroll();
});

nextBtn?.addEventListener('click', () => {
  goToSlide(index + 1);
  resetAutoScroll();
});

/* modal */
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target === modalImg) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ---------- FIXED INDEX TRACKING (KEY PART) ---------- */
carousel.addEventListener('scroll', () => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, i) => {
    const rect = slide.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const viewportCenter = window.innerWidth / 2;

    const distance = Math.abs(center - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });

  index = closestIndex;
});

/* ---------- START ---------- */
startAutoScroll();
