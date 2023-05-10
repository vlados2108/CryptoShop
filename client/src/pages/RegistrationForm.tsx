import { useState } from "react";
import { trpc } from "../trpc";
export function RegistrationForm() {
  const [username, setUserName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const createUser = trpc.AccountRouter.createUser.useMutation()

  const register = async () => {
    if (pass1 != pass2) {
      console.log("Passwords don't match");
      return;
    }
    const data = { username: username, password: pass1 };
    createUser.mutate(data)
  };

  return (
    <>
      <div style={{ width: "30%", margin: "100px 0 0 400px" }}>
        <h3>Registration form</h3>
        <div className="form-group">
          <p>Login</p>
          <input
            type="text"
            value={username}
            id="inp1"
            className="form-control"
            name="login"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
            required
          />
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            type="password"
            value={pass1}
            id="inp2"
            className="form-control"
            name="password1"
            onChange={(e) => {
              setPass1(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
            required
          />
        </div>
        <div className="form-group">
          <p>Confirm password</p>
          <input
            type="password"
            value={pass2}
            id="inp3"
            className="form-control"
            name="password2"
            onChange={(e) => {
              setPass2(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={register}>
          Register
        </button>
      </div>
    </>
  );
}
