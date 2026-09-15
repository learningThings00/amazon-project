import { products, loadProductsFetch } from '../data/products.js';
import { orders } from '../data/orders.js';
import { updateCartQuantity } from './utils/cartQuantity.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { searchProducts } from './utils/search.js';

async function loadPage() {
  await loadProductsFetch();

  renderTracking();
  updateCartQuantity();
}
loadPage();

function renderTracking() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const matchingOrder = orders.find((order) => order.id === orderId);
  const matchingProduct = matchingOrder.products.find(
    (product) => product.productId === productId
  );

  const isoString = matchingProduct.estimatedDeliveryTime;
  const deliveryDate = dayjs(isoString).format('dddd, MMMM D');
  const orderDate = matchingOrder.orderTime;

  const todayTimeStamp = dayjs().valueOf();
  const deliveryTimeStamp = dayjs(isoString).valueOf();
  const orderTimeStamp = dayjs(orderDate).valueOf();

  const progress =
    ((todayTimeStamp - orderTimeStamp) / (deliveryTimeStamp - orderTimeStamp)) *
    100;
  const inProducts = products.find((product) => product.id === productId);

  const deliveryStatus = progress < 100 ? 'Arriving' : 'Delivered';

  const trackingHTML = `
  <div class="page-title">${deliveryStatus} on ${deliveryDate}</div>
      <div class="product-name">${inProducts.name}</div>
      <div class="quantity-row">Quantity: ${matchingProduct.quantity}</div>
      <img
        src="${inProducts.image}"
        class="product-image"
      />
      <div class="progress-label-container">
        <div class="js-preparing">Preparing</div>
        <div class="js-shipped">Shipped</div>
        <div class="js-delivered">Delivered</div>
      </div>
      <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
      </div>
  `;

  document.querySelector('.js-tracking-container').innerHTML = trackingHTML;

  document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
  document.querySelector('.js-cart-quantity-mobile').innerText =
    updateCartQuantity();

  if (progress < 49) {
    document.querySelector('.js-preparing').classList.add('progress-indicator');
  }
  if (progress < 99) {
    document.querySelector('.js-shipping').classList.add('progress-indicator');
  }
  if (progress > 99) {
    document.querySelector('.js-delivered').classList.add('progress-indicator');
  }
  setTimeout(() => {
    document.querySelector('.js-progress-bar').style.width =
      `${Math.min(progress, 100)}%`;
  }, 0);
}

document.querySelector('.js-search-button').addEventListener('click', () => {
  searchProducts();
});

document.querySelector('.js-hamburger-icon').addEventListener('click', () => {
  document.querySelector('.nav-container').classList.toggle('nav-visible');
});
