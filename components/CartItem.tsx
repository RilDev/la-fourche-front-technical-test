import { useContext, useEffect, useState } from "react";
import { CartContext } from "lib/context";
import Image from "next/image";
import RemoveCartIcon from "public/remove-cart-icon.svg";

export default function CartItem({ item, isCartDiscount }) {
  const { items, addItem, removeItem, hasItem, isDiscount } =
    useContext(CartContext);
  return (
    <div className="flex justify-between items-center px-2 py-2 bg-gray-100 rounded">
      <div className="flex">
        <Image src={item.image} height="50" width="50" />
        <div className="ml-2">
          <div>{item.name}</div>
          <div>
            {isCartDiscount && item.salePrice !== item.discountSalePrice ? (
              <div className="flex items-center">
                <div className="mr-2 text-sm line-through font-gray-800">
                  {item.salePrice} €
                </div>
                <div>{item.discountSalePrice} €</div>
              </div>
            ) : (
              <div>{item.salePrice} €</div>
            )}
          </div>
        </div>
      </div>
      <RemoveCartIcon
        onClick={() => removeItem(item)}
        className="bg-red-200 rounded cursor-pointer"
      />
    </div>
  );
}
