import { Product, Clothing, Appliance } from '../../data/products.js';

describe('test suite: Product Class', () => {
  let product;
  beforeEach(() => {
    product = new Product({
      id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
      alt: 'Cotton T-shirt',
      name: 'Adults Plain Cotton T-Shirt - 2 Pack',
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: ['tshirts', 'apparel', 'mens'],
      type: 'clothing',
      sizeChartLink: 'images/clothing-size-chart.png'
    });
  });

  it('has correct properties', () => {
    expect(product.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(product.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(product.rating.stars).toEqual(4.5);
    expect(product.priceCents).toEqual(799);
  });

  it('gets rating star url', () => {
    expect(product.getRating()).toContain('45.png');
  });

  it('gets the price', () => {
    expect(product.getPrice()).toEqual('$7.99');
  });

  it('does not display extra info', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });
});

describe('test suite: Clothing Class', () => {
  let clothing;
  beforeEach(() => {
    clothing = new Clothing({
      id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
      alt: 'Cotton T-shirt',
      name: 'Adults Plain Cotton T-Shirt - 2 Pack',
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: ['tshirts', 'apparel', 'mens'],
      type: 'clothing',
      sizeChartLink: 'images/clothing-size-chart.png'
    });
  });

  it('has correct properties', () => {
    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(clothing.rating.stars).toEqual(4.5);
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('gets rating star url', () => {
    expect(clothing.getRating()).toContain('45.png');
  });

  it('gets the price', () => {
    expect(clothing.getPrice()).toEqual('$7.99');
  });

  it('display size chart link', () => {
    expect(clothing.extraInfoHTML()).toContain(
      '<a href="images/clothing-size-chart.png" target="_blank">'
    );
    expect(clothing.extraInfoHTML()).toContain('Size Chart');
  });
});

describe('test suite: Appliance Class', () => {
  let appliance;
  beforeEach(() => {
    appliance = new Appliance({
      id: '54e0eccd-8f36-462b-b68a-8182611d9add',
      image: 'images/products/2-slot-toaster-white.jpg',
      alt: 'White Toaster',
      name: '2 Slot Toaster - White',
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: ['toaster', 'kitchen', 'appliances'],
      type: 'appliance',
      warrantyLink: 'images/appliance-warranty.png',
      instructionLink: 'images/appliance-instructions.png'
    });
  });

  it('has correct properties', () => {
    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.name).toEqual('2 Slot Toaster - White');
    expect(appliance.rating.stars).toEqual(5);
    expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('gets rating star url', () => {
    expect(appliance.getRating()).toContain('50.png');
  });

  it('gets the price', () => {
    expect(appliance.getPrice()).toEqual('$18.99');
  });

  it('displays size chart link', () => {
    expect(appliance.extraInfoHTML()).toContain(
      '<a href="images/appliance-instructions.png" target="_blank">'
    );
    expect(appliance.extraInfoHTML()).toContain('Instructions');
    expect(appliance.extraInfoHTML()).toContain(
      '<a href="images/appliance-warranty.png" target="_blank">'
    );
    expect(appliance.extraInfoHTML()).toContain('Warranty');
  });
});
