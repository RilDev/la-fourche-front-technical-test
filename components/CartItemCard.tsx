import { useContext, ReactElement } from "react";
import { IItem } from "types";
import { CartContext } from "lib/context";
import Image from "next/image";
import RemoveCartIcon from "public/remove-cart-icon.svg";

interface Props {
  item: IItem;
  isCartDiscount: boolean;
}

export default function CartItemCard({
  item,
  isCartDiscount,
}: Props): ReactElement {
  const { removeItem } = useContext(CartContext);
  const { image, name, salePrice, discountSalePrice } = item;

  return (
    <div className="flex justify-between items-center px-2 py-2 bg-gray-100 rounded">
      <div className="flex">
        <Image src={image} height="50" width="50" />
        <div className="ml-2">
          <div>{name}</div>
          <div>
            {isCartDiscount && salePrice !== discountSalePrice ? (
              <div className="flex items-center">
                <div className="mr-2 text-sm line-through font-gray-800">
                  {salePrice} €
                </div>
                <div>{discountSalePrice?.toFixed(2)} €</div>
              </div>
            ) : (
              <div>{salePrice} €</div>
            )}
          </div>
        </div>
      </div>
      <RemoveCartIcon
        onClick={() => removeItem?.(item)}
        className="bg-red-200 rounded cursor-pointer"
      />
    </div>
  );
}
