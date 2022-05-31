import { createContext, useState } from "react";

export const CartContext = createContext({
  items: new Map(),
  addItem: () => {},
  removeItem: () => {},
  hasItem: () => {},
});

export const CartContextProvider = ({ children }) => {
  const addItem = (item) => {
    setState({ ...state, items: state.items.set(item.objectID, item) });
  };
  const removeItem = (item) => {
    const newItems = state.items;
    newItems.delete(item.objectID);
    setState({ ...state, items: new Map(newItems) });
  };
  const hasItem = (item) => state.items.has(item.objectID);

  const initState = {
    items: new Map(),
    addItem: addItem,
    removeItem: removeItem,
    hasItem: hasItem,
  };

  const [state, setState] = useState(initState);

  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};
