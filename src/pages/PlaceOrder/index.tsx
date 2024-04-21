import "./style.css"
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store.context";
import IDelInfo from "@/interfaces/DelInfo";
import IFoodList from "@/interfaces/FoodList";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState<IDelInfo>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let orderItems: IFoodList[] = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }

  }

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate('/');
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName" type="text" placeholder="Last name" />
        </div>
        <input required onChange={onChangeHandler} name="email" type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} name="street" type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="city" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="zipcode" type="text" placeholder="Zip code" />
          <input required onChange={onChangeHandler} name="country" type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name="phone" type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}</b>
            </div>
          </div>
          <div className="cart-total-button">
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form >
  )
}

export default PlaceOrder;
