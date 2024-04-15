import { ReactNode, createContext, useState } from "react";
import { food_list } from "@/assets/assets"
import FoodList from "@/interfaces/FoodList"
import ICartItem from "@/interfaces/CartItem";
import { SetState } from "@/types";

interface IContextValue {
  food_list: FoodList[];
  cartItems: ICartItem;
  setCartItems: SetState<ICartItem>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  getTotalCartAmount: () => number;
}

export const StoreContext = createContext<IContextValue>({} as IContextValue);

interface IStoreContextProvider {
  children: ReactNode
}

const StoreContextProvider = ({ children }: IStoreContextProvider) => {


  const [cartItems, setCartItems] = useState<ICartItem>({});

  const addToCart = (itemId: string) => {
    setCartItems((prev) => {
      const newQuantity = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item]
        }
      }
    }
    return totalAmount;
  }

  const contextValue: IContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;
