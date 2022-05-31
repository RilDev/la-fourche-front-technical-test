# La Fourche - Test Technique Frontend V2

[La Fourche](https://lafourche.fr/)'s technical exam.

## Stack

- [Next.js](https://nextjs.org/docs/getting-started)
- [Algolia InstantSearch](https://www.algolia.com/products/instantsearch/)
- [Algolia InstantSearch React](https://github.com/algolia/react-instantsearch)
- [TailwindCSS](https://tailwindcss.com/)

## Usage

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
- [ ] cool design
