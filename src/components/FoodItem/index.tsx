

import IFoodList from "@/interfaces/FoodList";
import "./style.css"
import { assets } from "@/assets/assets";
import { useContext } from "react";
import { StoreContext } from "@/context/store.context";

interface IFoodItemProps {
  item: IFoodList;
}

const FoodItem = ({ item }: IFoodItemProps) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={item.image} alt={item.name} />
        {!cartItems[item._id]
          ? <img className='add' onClick={() => addToCart(item._id)} src={assets.add_icon_white} alt="" />
          : <div className="food-item-counter">
            <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[item._id]}</p>
            <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{item.name}</p>
          <img src={assets.rating_starts} alt="star image" />
        </div>
        <p className="food-item-desc">{item.description}</p>
        <p className="food-item-price">${item.price}</p>
      </div>
    </div>
  )
}

export default FoodItem;
