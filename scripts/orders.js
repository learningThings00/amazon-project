import { orders } from '../data/orders.js';
import { currencyFormat } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { products, loadProductsFetch } from '../data/products.js';
import { updateCartQuantity } from './utils/cartQuantity.js';
import { addToCart, updateStorage } from '../data/cart.js';

loadPage();

async function loadPage() {
  await loadProductsFetch();

  renderOrders();
  updateCartQuantity();
}

function renderOrders() {
  let orderHTML = orders
    .map((value) => {
      const isoString = value.orerTime;
      const date = dayjs(isoString).format('MMMM D');
      const totalCost = currencyFormat(value.totalCostCents);

      let productHTML = value.products
        .map((item) => {
          const matchingProduct = products.find(
            (match) => match.id === item.productId
          );

          const deliveryDate = dayjs(item.estimatedDeliveryTime).format(
            'MMMM D'
          );

          return ` <div class="order-details">
              <div class="image-container">
                <img
                  src="${matchingProduct.image}"
                  onerror="this.onerror=null; this.src='images/images.png';"
                  class="product-image"
                />
              </div>

              <div class="product-details">
                <div class="product-name">${matchingProduct.name}</div>
                <div class="delivery-date">
                  Arriving On: <span class="date">${deliveryDate}</span>
                </div>
                <div class="quantity-row">
                  Quantity: <span class="js-quantity">${item.quantity}</span>
                </div>
                <button class="buy-again js-buy-again" data-button-id="${item.productId}">
                  <img src="images/icons/buy-again.png" class="buy-icon" />Buy
                  it again
                </button>
                <button class="track-package">
                  <a href="tracking.html">Track package</a>
                </button>
              </div>
            </div>`;
        })
        .join('');

      return `
    <div class="order-card">
          <div class="order-header">
            <div class="order-property">
              Order Placed:
              <span class="order-value">${date}</span>
            </div>
            <div class="order-property">
              Total:
              <span class="order-value">$${totalCost}</span>
            </div>
            <div class="order-property">
              Order ID:
              <span class="order-value"
                >${value.id}</span
              >
            </div>
          </div>

          <div class="product-list">
           ${productHTML}
          </div>
        </div>
    `;
    })
    .join('');

  document.querySelector('.js-order-list').innerHTML = orderHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.buttonId;
      addToCart(productId, 1);
      updateStorage();
      updateCartQuantity();
    });
  });
}
