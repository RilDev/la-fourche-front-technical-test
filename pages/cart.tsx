import { useContext, useEffect, useState } from "react";
import { CartContext } from "lib/context";
import Head from "next/head";
import Link from "next/link";
import Logo from "public/logo.svg";
import CartIcon from "public/cart-icon.svg";
import CartItemCard from "components/CartItemCard";
import { OnApproveActions } from "@paypal/paypal-js/types/components/buttons";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";

export default function Cart() {
  const { items, isDiscount } = useContext(CartContext);
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartDiscount, setIsCartDiscount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const newCartItems: any[] = [];
    let newTotalPrice = 0;
    const newIsCartDiscount = isDiscount?.() ?? false;
    items?.forEach((item) => {
      newCartItems.push(item);

      if (newIsCartDiscount) {
        newTotalPrice += Number(item?.discountSalePrice?.toFixed(2)) ?? 0;
      } else {
        newTotalPrice += Number(item.salePrice.toFixed(2));
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
          <div className="cursor-pointer">
            <Logo />
          </div>
        </Link>
        <Link href="/cart">
          <div className="cursor-pointer">
            <CartIcon />
          </div>
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
        <div className="px-2 pt-4 w-full text-right">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AfxaXXNa-yUCRWlKQ0G8mDKqxqRfmYYsjZ-8jN0QR6eNQAzJNs2h19hUPLLdp73VSgD6OS4ZY4HWogG-",
              currency: "EUR",
              // debug: true,
            }}
          >
            <PayPalButtons
              style={{ layout: "horizontal", tagline: false }}
              createOrder={(_data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "EUR",
                        value: totalPrice.toFixed(2),
                        breakdown: {
                          item_total: {
                            /* Required when including the items array */
                            currency_code: "EUR",
                            value: totalPrice.toFixed(2),
                          },
                        },
                      },
                      items: cartItems.map((item) => {
                        return {
                          name: item.name /* Shows within upper-right dropdown during payment approval */,
                          description: item.shortDescription.slice(0, 126),
                          /* Item details will also be in the completed paypal.com transaction view */
                          unit_amount: {
                            currency_code: "EUR",
                            value: isCartDiscount
                              ? item.discountSalePrice.toFixed(2)
                              : item.salePrice.toFixed(2),
                          },
                          quantity: "1",
                        };
                      }),
                    },
                  ],
                });
              }}
              onApprove={(_data, actions: OnApproveActions): Promise<void> => {
                return (
                  actions?.order?.capture().then((_details) => {
                    router.push("/order-confirmation");
                  }) ?? new Promise(() => undefined)
                );
              }}
            />
          </PayPalScriptProvider>
        </div>
      </main>
    </>
  );
}
