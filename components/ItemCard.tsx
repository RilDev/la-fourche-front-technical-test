import { useContext, ReactElement } from "react";
import { IItem } from "types";
import { CartContext } from "lib/context";
import Image from "next/image";
import AddCartIcon from "public/add-cart-icon.svg";
import RemoveCartIcon from "public/remove-cart-icon.svg";

export default function Hit({ hit }: { hit: IItem }): ReactElement {
  console.log(hit);
  const { addItem, removeItem, hasItem, isDiscount } = useContext(CartContext);
  const { image, name, salePrice } = hit;
  const discountSalePrice = salePrice >= 250 ? salePrice / 2 : salePrice;
  const isCartDiscount: boolean = isDiscount();

  return (
    <div className="flex flex-col px-2 py-2 h-full bg-gray-100 rounded">
      <div className="relative w-full h-28">
        <Image src={image} layout="fill" objectFit="contain" />
      </div>
      <div>{name}</div>
      <div className="flex justify-between items-center mt-auto">
        <div>
          {isCartDiscount && salePrice !== discountSalePrice ? (
            <div className="flex items-center">
              <div className="mr-2 text-sm line-through font-gray-800">
                {salePrice} €
              </div>
              <div>{discountSalePrice} €</div>
            </div>
          ) : (
            <div>{salePrice} €</div>
          )}
        </div>
        {hasItem(hit) ? (
          <RemoveCartIcon
            onClick={() => removeItem(hit)}
            className="bg-red-200 rounded cursor-pointer"
          />
        ) : (
          <AddCartIcon
            onClick={() => addItem(hit)}
            className="bg-yellow-200 rounded cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
