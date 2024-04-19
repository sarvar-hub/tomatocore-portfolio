import { ReactNode, createContext, useEffect, useState } from "react";
import FoodList from "@/interfaces/FoodList"
import ICartItem from "@/interfaces/CartItem";
import { SetState } from "@/types";
import IFoodList from "@/interfaces/FoodList";
import axios from "axios";

interface IContextValue {
  food_list: FoodList[];
  cartItems: ICartItem;
  setCartItems: SetState<ICartItem>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: SetState<string>;
}

export const StoreContext = createContext<IContextValue>({} as IContextValue);

interface IStoreContextProvider {
  children: ReactNode
}

const url = import.meta.env.VITE_URL;

const StoreContextProvider = ({ children }: IStoreContextProvider) => {


  const [cartItems, setCartItems] = useState<ICartItem>({});
  const [token, setToken] = useState<string>("");
  const [food_list, setFoodList] = useState<IFoodList[]>([] as IFoodList[]);

  const addToCart = async (itemId: string) => {
    setCartItems((prev) => {
      const newQuantity = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: newQuantity };
    });

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }

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

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data);
  }

  const loadCartData = async (token: string) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const tokenFromStorage = localStorage.getItem("authToken");
      if (tokenFromStorage) {
        setToken(tokenFromStorage);
        await loadCartData(tokenFromStorage);
      }
    }

    loadData();
  }, []);

  const contextValue: IContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;
