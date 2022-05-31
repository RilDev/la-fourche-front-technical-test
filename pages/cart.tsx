import { useContext, useEffect, useState } from "react";
import { CartContext } from "lib/context";
import Head from "next/head";
import Link from "next/link";
import Logo from "public/logo.svg";
import CartIcon from "public/cart-icon.svg";

export default function Cart() {
  const { items, addItem, removeItem, hasItem, isDiscount } =
    useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartDiscount, setIsCartDiscount] = useState(false);

  useEffect(() => {
    const newCartItems = [];
    let newTotalPrice = 0;
    const newIsCartDiscount = isDiscount();
    items.forEach((item) => {
      newCartItems.push(item);

      if (newIsCartDiscount) {
        newTotalPrice += item.discountSalePrice;
      } else {
        newTotalPrice += item.salePrice;
      }
    });
    setCartItems(newCartItems);
    setTotalPrice(newTotalPrice);
    setIsCartDiscount(newIsCartDiscount);
  }, [items]);

  return (
    <>
      <Head>
        <title>La Fourche - Cart</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <nav className="flex justify-between items-center px-2 py-4 w-full shadow-md">
        <Link href="/">
          <Logo className="cursor-pointer" />
        </Link>
        <Link href="/cart">
          <CartIcon className="cursor-pointer" />
        </Link>
      </nav>
      <main>
        {cartItems.map((item) => (
          <>
            <div>{item.name}</div>
            <div>
              {isCartDiscount ? item.discountSalePrice : item.salePrice} €
            </div>
            <div onClick={() => removeItem(item)}>remove</div>
          </>
        ))}
        <div>Total Price: {totalPrice} €</div>
        {isDiscount() && "Discount!!"}
      </main>
    </>
  );
}
