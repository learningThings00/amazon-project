export function searchProducts() {
  const search = document.querySelector('.js-search-bar').value;
  window.location.href = `index.html?search=${encodeURIComponent(search)}`;
}
