export function searchProducts() {
  const search = document.querySelector('.js-search-bar').value;
  window.location.href = `/?search=${encodeURIComponent(search)}`;
}
