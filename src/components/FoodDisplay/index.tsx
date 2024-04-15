

import { useContext } from "react";
import "./style.css"
import { StoreContext } from "@/context/store.context";
import FoodItem from "@/components/FoodItem";
import IFoodList from "@/interfaces/FoodList";

interface IFoodDisplayProps {
  category: string;
}

const FoodDisplay = ({ category }: IFoodDisplayProps) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item: IFoodList, index) => {
          if(category==="All" || category === item.category) {
            return <FoodItem key={index} item={item} />
          }
        })}
      </div>
    </div>
  )
}
export default FoodDisplay;
