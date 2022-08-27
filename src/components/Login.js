import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase.config";

const Login = () => {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  const loginError = () => {
    const p = document.getElementById("errorMess");
    p.textContent = "Mail ou mot de passe incorrect !";

    setTimeout(() => {
      p.textContent = "";
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Se connecter</h3>
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="Email" required ref={loginEmail} />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            ref={loginPassword}
          />
          <input type="submit" value="Se connecter" />
          <p
            id="errorMess"
            style={{
              color: "rgb(211,27,57)",
              transition: "0.7s ease-in-out",
              padding: "10px 0",
            }}
          ></p>
          {error && loginError()}
        </form>
      </div>
    </div>
  );
};

export default Login;
