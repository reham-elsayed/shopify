class EditorialHeroSlider extends HTMLElement {
  connectedCallback() {
    this.slides = [...this.querySelectorAll('.editorial-hero__slide')];
    if (this.slides.length < 2) return;

    this.currentIndex = 0;
    this.previousButton = this.querySelector('[data-slider-previous]');
    this.nextButton = this.querySelector('[data-slider-next]');
    this.previousButton.addEventListener('click', () => this.showSlide(this.currentIndex - 1));
    this.nextButton.addEventListener('click', () => this.showSlide(this.currentIndex + 1));

    if (this.dataset.autoplay === 'true' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const interval = Number(this.dataset.interval) || 5000;
      this.timer = window.setInterval(() => this.showSlide(this.currentIndex + 1), interval);
      this.addEventListener('mouseenter', () => window.clearInterval(this.timer), { once: true });
    }
  }

  showSlide(nextIndex) {
    this.slides[this.currentIndex].classList.remove('is-active');
    this.currentIndex = (nextIndex + this.slides.length) % this.slides.length;
    this.slides[this.currentIndex].classList.add('is-active');
  }
}

if (!customElements.get('editorial-hero-slider')) customElements.define('editorial-hero-slider', EditorialHeroSlider);

class EditorialHeroParallax {
  constructor() {
    this.section = document.querySelector('.editorial-hero');
    if (!this.section) return;

    // Mapping based on user's Parallax Motion Strategy
    this.elements = [
      { selector: '.editorial-hero__image--top-left', speed: 0.85 },
      { selector: '.editorial-hero__image--bottom-left', speed: 1.15 },
      { selector: '.editorial-hero__image--top-right-small', speed: 1.2 },
      { selector: '.editorial-hero__image--bottom-right', speed: 0.88 },
      { selector: '.editorial-hero__brand', speed: 1.1 },
      { selector: '.editorial-hero__content', speed: 0.9 }
    ];

    this.parallaxElements = [];
    
    this.elements.forEach(el => {
      const node = this.section.querySelector(el.selector);
      if (node) {
        this.parallaxElements.push({ node, speed: el.speed });
      }
    });

    if (this.parallaxElements.length > 0) {
      window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
      window.addEventListener('resize', this.onScroll.bind(this), { passive: true });
      this.onScroll();
    }
  }

  onScroll() {
    // Only apply parallax on desktop
    if (window.innerWidth < 990) {
      this.parallaxElements.forEach(item => {
        item.node.style.transform = '';
      });
      return;
    }

    const scrollY = window.scrollY;
    
    this.parallaxElements.forEach(item => {
      // Base speed = 1.0 (browser's native scroll)
      // Speed > 1.0 = Moves faster (upwards) -> negative translateY
      // Speed < 1.0 = Moves slower (stays behind) -> positive translateY
      const speedDiff = 1 - item.speed;
      const yPos = scrollY * speedDiff;
      
      item.node.style.transform = `translateY(${yPos}px)`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new EditorialHeroParallax();
});
