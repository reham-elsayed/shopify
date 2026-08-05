class EditorialTestimonial extends HTMLElement {
  connectedCallback() {
    this.buttons = this.querySelectorAll('[data-testimonial-filter]');
    this.cards = this.querySelectorAll('[data-testimonial-card]');
    this.status = this.querySelector('[data-testimonial-status]');
    this.buttons.forEach((button) => button.addEventListener('click', () => this.filter(button)));
  }

  filter(activeButton) {
    const category = activeButton.dataset.testimonialFilter;
    let visible = 0;
    this.buttons.forEach((button) => button.setAttribute('aria-pressed', button === activeButton));
    this.cards.forEach((card) => {
      const matches = category === 'all' || card.dataset.testimonialCategory === category;
      card.parentElement.hidden = !matches;
      if (matches) visible += 1;
    });
    this.status.textContent = `${visible} testimonial${visible === 1 ? '' : 's'} shown`;
  }
}

if (!customElements.get('editorial-testimonial')) customElements.define('editorial-testimonial', EditorialTestimonial);
