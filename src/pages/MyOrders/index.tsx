import { useContext, useEffect, useState } from "react";
import "./style.css"
import { StoreContext } from "@/context/store.context";
import axios from "axios";
import { assets } from "@/assets/assets";
import IUserOrder from "@/interfaces/UserOrder";

const MyOrders = () => {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState<IUserOrder[]>([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    if (response.data.success) {
      setData(response.data.data);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className='container'>
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b> </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders;
