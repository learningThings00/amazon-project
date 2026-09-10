# Amazon Clone Project

A front-end clone of Amazon's product listing, cart, and checkout flow — built with vanilla HTML, CSS, and JavaScript to practice DOM manipulation, cart logic, and testing.

## Live Demo

[View live site](https://learningthings00.github.io/amazon-project/)

## Pages

- `index.html` — product grid, add to cart
- `checkout.html` — cart summary, delivery options, payment summary
- `orders.html` — order history
- `tracking.html` — order tracking page

## Structure

```
amazon-project/
├── data/          # product, cart, and order data
├── scripts/       # page logic (checkout, orders, tracking, main)
│   └── utils/     # shared helpers (money formatting, date formatting, search)
├── stylesheets/   # per-page CSS
├── images/        # product images, icons, logos
└── tests/         # Jasmine unit tests
```

## Running locally

Open `index.html` in a browser, or serve the folder with a local server (e.g. VS Code Live Server) so relative paths resolve correctly.

## Running tests

Open `tests/test.html` in a browser. It runs the Jasmine test suite against `scripts/` and `data/`.

## Tech

- Vanilla JavaScript (no framework)
- Jasmine for unit testing
- Plain CSS
