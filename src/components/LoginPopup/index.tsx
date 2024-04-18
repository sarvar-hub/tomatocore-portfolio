import { useContext, useState } from "react";
import "./style.css"
import { assets } from "@/assets/assets";
import { IUserRegister } from "@/interfaces/User";
import { ELogOrReg } from "@/enums";
import axios from "axios";
import { StoreContext } from "@/context/store.context";

interface ILoginPopup {
  setShowLogin: (b: boolean) => void;
}

const LoginPopup = ({ setShowLogin }: ILoginPopup) => {
  const { setToken, url } = useContext(StoreContext)
  const [currState, setCurrState] = useState<string>(ELogOrReg.LOGIN);
  const [data, setData] = useState<IUserRegister>({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(currState, data)
    let newUrl = url;
    if (currState === ELogOrReg.LOGIN) {
      newUrl += '/api/user/login'
    } else {
      newUrl += '/api/user/register'
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }

  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross_icon" />
        </div>
        <div className="login-popup-inputs">
          {currState === ELogOrReg.LOGIN ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">{currState === ELogOrReg.REGISTER ? "Create account" : ELogOrReg.LOGIN}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === ELogOrReg.LOGIN
          ? <p>Create a new account? <span onClick={() => setCurrState(ELogOrReg.REGISTER)}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState(ELogOrReg.LOGIN)}>Login here</span></p>
        }

      </form>
    </div>
  )
}

export default LoginPopup;

