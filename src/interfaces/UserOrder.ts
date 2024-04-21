import { EUserOrderStatus } from "@/enums";
import IAddress from "@/interfaces/address";
import IFoodList from "@/interfaces/FoodList";

interface IUserOrder {
  _id: string;
  address: IAddress;
  amount: number;
  date: Date;
  items: IFoodList[];
  payment: boolean;
  status: EUserOrderStatus;
  userId: string;
}

export default IUserOrder;
