renderProducts();

function renderProducts() {
  let productHTML =  products.map((product) => {
    return `
    <div class="product-container">
        <div class="product-image-container">
          <img
            src="${product.image}"
            alt="${product.alt}"
            class="product-image"
          />
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            src="images/ratings/rating-${product.rating.stars * 10}.png"
            alt="${product.rating.stars}"
            class="rating-image"
          />
          <div class="product-rating-count">${product.rating.count}</div>
        </div>

        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

        <div class="product-quantity-selector">
          <select name="quantity" id="quantity" class="select-quantity">
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

        <div class="added-message">
          <img src="images/icons/checkmark.png" alt="checkmark" />
          <div>Added</div>
        </div>

        <button class="add-to-cart-button js-add-to-cart" data-button-id="${product.id}">Add to Cart</button>
      </div>
    `;
  }).join('');

  document.querySelector('.js-product-display-container').innerHTML = productHTML;

}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.buttonId;

    let matching;
    let cartQuantity = 0;

    cart.forEach(item => {
      if (item.id === id) {
        matching = item;
      }
    });

    if (matching) {
      matching.quantity++;
    } else {
      cart.push({
      id,
      quantity: 1
    })
    }

    cart.forEach(item => cartQuantity += item.quantity);
    
    document.querySelector('.js-cart-quantity').innerText = cartQuantity;
  })
})
