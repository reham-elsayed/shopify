document.querySelectorAll('[data-editorial-trigger]').forEach((item) => {
  function activate() {
    const index = item.dataset.editorialTrigger;

    document.querySelectorAll('.editorial-multirow__image').forEach((image) => image.classList.remove('is-active'));

    document.querySelector(`[data-editorial-image="${index}"]`)?.classList.add('is-active');
  }

  item.addEventListener('mouseenter', activate);
  item.addEventListener('click', activate);
});
