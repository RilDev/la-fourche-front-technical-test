import { createContext, useState } from "react";

export const CartContext = createContext({
  items: new Map(),
  addItem: () => {},
  removeItem: () => {},
  hasItem: () => {},
});

export const CartContextProvider = ({ children }) => {
  const addItem = (item) => {
    console.log(state);
    setState({ ...state, items: state.items.set(item.objectID, item) });
  };
  const removeItem = (item) => {
    setState({ ...state, items: state.items.delete(item.objectID) });
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
