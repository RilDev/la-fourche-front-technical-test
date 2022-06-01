import { useContext, useEffect, useState } from "react";
import { CartContext } from "lib/context";
import Head from "next/head";
import Link from "next/link";
import Logo from "public/logo.svg";
import CartIcon from "public/cart-icon.svg";
import CartItemCard from "components/CartItemCard";

export default function Cart() {
  const { items, isDiscount } = useContext(CartContext);
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartDiscount, setIsCartDiscount] = useState(false);

  useEffect(() => {
    const newCartItems: any[] = [];
    let newTotalPrice = 0;
    const newIsCartDiscount = isDiscount?.() ?? false;
    items?.forEach((item) => {
      newCartItems.push(item);

      if (newIsCartDiscount) {
        newTotalPrice += item?.discountSalePrice ?? 0;
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
        <div className="flex flex-col space-y-2">
          {cartItems.map((item) => (
            <CartItemCard item={item} isCartDiscount={isCartDiscount} />
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
