import { useContext, useEffect, useState } from "react";
import { CartContext } from "lib/context";
import Head from "next/head";
import Link from "next/link";
import Logo from "public/logo.svg";
import CartIcon from "public/cart-icon.svg";
import CartItem from "components/CartItem";

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
      <main className="flex flex-col h-full">
        <div class="flex flex-col space-y-2">
          {cartItems.map((item) => (
            <CartItem item={item} isCartDiscount={isCartDiscount} />
          ))}
        </div>
        <div className="px-2 mt-6 text-xl text-right">
          Total Price: {totalPrice} €{" "}
          {isCartDiscount && (
            <div className="inline-flex px-4 py-2 text-white bg-red-400 rounded">
              Discount Applied!
            </div>
          )}
        </div>
      </main>
    </>
  );
}
