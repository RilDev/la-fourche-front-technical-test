import { createContext, useState } from "react";

export const CartContext = createContext({
  items: new Map(),
  addItem: () => {},
  removeItem: () => {},
  hasItem: () => {},
  isDiscount: () => {},
});

export const CartContextProvider = ({ children }) => {
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
