import { SetState } from "@/types";
import "./style.css"
import { menu_list } from "@/assets/assets"


interface IExploreMenuProps {
  category: string;
  setCategory: SetState<string>;
}

const ExploreMenu = ({category, setCategory}: IExploreMenuProps) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">Choose from a diverse menu featuring a delectable array of dishes. Our misson is to satisfy your cravings and elevate your dining experience, one delicious meal at time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div key={index} onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className="explore-menu-list-item">
              <img className={ category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu;
