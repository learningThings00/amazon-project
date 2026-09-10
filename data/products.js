import { currencyFormat } from '../scripts/utils/money.js';
export class Product {
  id;
  image;
  alt;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.alt = productDetails.alt;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getRating() {
    return `${this.rating.stars * 10}.png"
            alt="${this.rating.stars}`;
  }

  getPrice() {
    return `$${currencyFormat(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">
    Size Chart</a>
    `;
  }
}

export class Appliance extends Product {
  warrantyLink;
  instructionLink;

  constructor(productDetails) {
    super(productDetails);
    this.warrantyLink = productDetails.warrantyLink;
    this.instructionLink = productDetails.instructionLink;
  }

  extraInfoHTML() {
    return `
    <div>
    <a href="${this.instructionLink}" target="_blank">
    Instructions
    </a>
    <br/>
    <a href="${this.warrantyLink}" target="_blank">
    Warranty
    </a>
    </div>
    `;
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch('https://supersimplebackend.dev/products')
    .then((response) => {
      return response.json();
    })
    .then((productDetails) => {
      products = productDetails.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }

        if (productDetails.type === 'appliance') {
          return new Appliance(productDetails);
        }
        return new Product(productDetails);
      });
    })
    .catch(() => {
      console.error('Unexpected error:', error);
    });

  return promise;
}
