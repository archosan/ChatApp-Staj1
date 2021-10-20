import React from "react";
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="http://chat.gulchat.net/wp-content/uploads/2017/09/chat.png"
          alt=""
        />
        <div className="login__text">
          <h1>Mesajlaşma uygulamasına giriş</h1>
        </div>
        <Button onClick={signIn}>Google ile Giriş Yapın</Button>
      </div>
    </div>
  );
}

export default Login;
