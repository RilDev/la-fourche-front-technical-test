# La Fourche - Test Technique Frontend V2

[La Fourche](https://lafourche.fr/)'s technical exam.

Live demo: https://la-fourche-front-technical-test.vercel.app/

<div style="text-align: center;">
 <img src="public/demo.gif" style="width: 500px;">
</div>

## Stack

- [Next.js](https://nextjs.org/docs/getting-started)
- [Algolia InstantSearch](https://www.algolia.com/products/instantsearch/)
- [Algolia InstantSearch React](https://github.com/algolia/react-instantsearch)
- [TailwindCSS](https://tailwindcss.com/)
- [React Paypal JS](https://www.npmjs.com/package/@paypal/react-paypal-js)

## Usage

Install dependencies: `yarn`

Run dev server: `yarn dev`

## Features

### Search Page /

- [x] Search input
- [x] Display result
- [x] Product card: image, name, price, add / remove from cart button
- [x] Display result in 4 columns grid on desktop and in a 2 columns grid on mobile
- [x] Display 20 top results
- [x] Pagination

### Cart /cart

- [x] global context
- [x] only 1 product of each type in cart
- [x] display total price
- [x] display list of products in cart: name, price

### Discount price

- [x] if total price >= 200 (euros?) then -50% on items with price >= 250: cart total price, items prices

### Extra

- [x] add favicon
- [x] remove item from cart page
- [x] cool design
- [x] add TypeScript
- [x] paypal
- [ ] add quantity to items in cart
- [x] improve pagination design
- [x] improve search bar design
