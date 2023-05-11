import React, { useState } from "react";
import { Link } from "react-router-dom";
import { trpc } from "../trpc";
//import '../styles/loginStyles.scss'
//import 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
export default function SignInForm() {

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const check = trpc.AccountRouter.checkIfUserExists.useQuery({username,password:pass});

  const login = async () => {
    if (check.data) {
      const userId = check.data.id
      window.location.href = `/Home/${userId}`;
    }
  };


  return (
    <>
      <div style={{ width: "30%", margin: "0 0 0 400px" }}>
        <h3>Login form</h3>
        <div className="form-group">
          <p>Username</p>
          <input
            type="text"
            value={username}
            id="login"
            className="form-control"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="login"
            style={{ marginBottom: "10px" }}
            required
          />
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            value={pass}
            type="password"
            id="password"
            className="form-control"
            name="password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
            required
          />
        </div>{" "}
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
        <Link to="/Home"></Link>
      </div>
    </>
  );
}
