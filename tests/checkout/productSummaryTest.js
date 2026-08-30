import { renderProductSummary } from '../../scripts/Checkout/productSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';

describe('test suite: renderProductSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-cart-list"></div>
    <div class="js-payment-summary"></div>
    <div class="js-cart-quantity"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() =>
      JSON.stringify([
        {
          id: productId1,
          quantity: 2,
          deliveryOptionId: 1
        },
        {
          id: productId2,
          quantity: 1,
          deliveryOptionId: 2
        }
      ])
    );

    loadFromStorage();

    renderProductSummary();
  });

  afterEach(
    () => (document.querySelector('.js-test-container').innerHTML = '')
  );
  it('displays the cart', () => {
    expect(document.querySelectorAll('.js-order-product-card').length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-item-quantity-${productId1}`).innerText
    ).toContain(2);
    expect(
      document.querySelector(`.js-item-quantity-${productId2}`).innerText
    ).toContain(1);
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerHTML
    ).toContain('$10.90');
  });

  it('removes from cart', () => {
    document.querySelector(`.js-delete-item-${productId1}`).click();
    expect(document.querySelectorAll('.js-order-product-card').length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-order-product-card-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-order-product-card-${productId2}`)
    ).not.toEqual(null);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual(productId2);
  });

  it('updates delivery option', () => {
    document.querySelector(`.js-date-${productId1}-3`).click();
    document.querySelector(`.js-date-${productId2}-3`).click();
    expect(
      document.querySelector(`.js-date-input-${productId1}-3`).checked
    ).toBe(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual(3);
    expect(document.querySelector('.js-shipping-price').innerText).toEqual(
      '$19.98'
    );
    expect(document.querySelector('.js-total-price').innerText).toEqual(
      '$69.00'
    );
  });
});
