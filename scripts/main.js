import { products, loadProductsFetch } from '../data/products.js';
import { addToCart } from '../data/cart.js';
import { updateCartQuantity } from './utils/cartQuantity.js';
import { searchProducts } from './utils/search.js';

let productsToRender = [];

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get('search');
  console.log(searchTerm);
  productsToRender = searchTerm
    ? products.filter((product) =>
        product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : products;

  renderProducts();
  updateCartQuantity();
}
loadPage();
/*
loadProducts(() => {
  renderProducts();
  updateCartQuantity();
});
*/
/*
loadProductsFetch().then(() => {
  renderProducts();
  updateCartQuantity();
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => resolve());
}).then(() => {
  renderProducts();
  updateCartQuantity();
});
*/

export function renderProducts() {
  let productHTML = productsToRender
    .map((product) => {
      return `
    <div class="product-container">
        <div class="product-image-container">
          <img
            src="${product.image}"
            alt="${product.alt}"
            class="product-image"
            onerror="this.onerror=null; this.src='images/images.png';"
          />
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            src="images/ratings/rating-${product.getRating()}"
            class="rating-image"
          />
          <div class="product-rating-count">${product.rating.count}</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-selector">
          <select name="quantity-${product.id}" id="quantity-${product.id}" class="js-quantity-selector-${product.id}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}


        <div class="added-message js-add-message-${product.id}">
          <img src="images/icons/checkmark.png" alt="checkmark" />
          <div>Added</div>
        </div>

        <button class="add-to-cart-button js-add-to-cart" data-button-id="${product.id}">Add to Cart</button>
      </div>
    `;
    })
    .join('');

  document.querySelector('.js-product-display-container').innerHTML =
    productHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.buttonId;
      const itemQuantity = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      let quantity = Number(itemQuantity.value);
      addToCart(productId, quantity);
      updateCartQuantity();
      addedMessage(productId);
    });
  });
}
const allTimeoutIds = {};

function addedMessage(id) {
  document
    .querySelector(`.js-add-message-${id}`)
    .classList.add('add-message-visible');

  const previousTimeoutId = allTimeoutIds[id];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    document
      .querySelector(`.js-add-message-${id}`)
      .classList.remove('add-message-visible');
  }, 2000);

  allTimeoutIds[id] = timeoutId;
}

document.querySelector('.js-search-button').addEventListener('click', () => {
  searchProducts();
  console.log('click');
});
