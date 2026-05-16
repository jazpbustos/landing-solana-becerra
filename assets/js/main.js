const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('nav--open');
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('nav--open');
    });
  });
}


/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      e.preventDefault();

      const offset = 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth',
      });
    }
  });
});

/* Fade-in animation */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll('.service-card, .diff-item, .about__content, .about__image-wrap, .ig-card')
  .forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

//Carrusel servicios
const servicesTrack = document.getElementById('servicesTrack');
const servicesPrev = document.querySelector('.services-carousel__btn--prev');
const servicesNext = document.querySelector('.services-carousel__btn--next');

if (servicesTrack && servicesPrev && servicesNext) {
  function getCardStep() {
    const firstCard = servicesTrack.querySelector('.service-card');
    const gap = parseFloat(getComputedStyle(servicesTrack).gap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }

  function moveNext() {
    const step = getCardStep();

    servicesTrack.style.transition = 'transform 0.4s ease';
    servicesTrack.style.transform = `translateX(-${step}px)`;

    servicesTrack.addEventListener(
      'transitionend',
      () => {
        const firstCard = servicesTrack.firstElementChild;
        servicesTrack.appendChild(firstCard);

        servicesTrack.style.transition = 'none';
        servicesTrack.style.transform = 'translateX(0)';
      },
      { once: true }
    );
  }

  function movePrev() {
    const step = getCardStep();
    const lastCard = servicesTrack.lastElementChild;

    servicesTrack.insertBefore(lastCard, servicesTrack.firstElementChild);

    servicesTrack.style.transition = 'none';
    servicesTrack.style.transform = `translateX(-${step}px)`;

    requestAnimationFrame(() => {
      servicesTrack.style.transition = 'transform 0.4s ease';
      servicesTrack.style.transform = 'translateX(0)';
    });
  }

  servicesNext.addEventListener('click', moveNext);
  servicesPrev.addEventListener('click', movePrev);
}

if (window.lucide) {
  lucide.createIcons();
}
