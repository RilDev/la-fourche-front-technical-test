import { createContext, useState, FC, ReactNode } from "react";
import { IItem } from "types";

interface ICartContext {
  items: Map<string, IItem>;
  addItem: (item: IItem) => void;
  removeItem: (item: IItem) => void;
  hasItem: (item: IItem) => void;
  isDiscount: () => boolean;
}

export const CartContext = createContext<Partial<ICartContext>>({});

export const CartContextProvider: FC<ReactNode> = ({ children }) => {
  const addItem = (item) => {
    setState({
      ...state,
      items: state.items.set(item.objectID, {
        ...item,
        discountSalePrice:
          item.salePrice >= 250 ? item.salePrice / 2 : item.salePrice,
      }),
    });
  };
  const removeItem = (item) => {
    const newItems = state.items;
    newItems.delete(item.objectID);
    setState({ ...state, items: new Map(newItems) });
  };
  const hasItem = (item) => state.items.has(item.objectID);
  const isDiscount = () => {
    let totalPrice = 0;
    state.items.forEach((item) => (totalPrice += item.salePrice));

    if (totalPrice >= 200) {
      return true;
    }

    return false;
  };

  const initState = {
    items: new Map(),
    addItem: addItem,
    removeItem: removeItem,
    hasItem: hasItem,
    isDiscount: isDiscount,
  };

  const [state, setState] = useState(initState);

  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};
