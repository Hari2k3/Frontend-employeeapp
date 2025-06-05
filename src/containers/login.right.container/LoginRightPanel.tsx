import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import logo from "../../assets/kv-logo.png";
import "./LoginRightPanel.css";
// import useMousePointer from "../../hooks/useMousePointerHook"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLoginMutation } from "../../api-services/auth/login.api";

const EndAdornment = (props: { func: any }) => {
  return (
    <Button
      type="button"
      variant="grey"
      text="Clear"
      className="clear-username"
      onclick={props.func}
    />
  );
};

const LoginRightPanel = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useLocalStorage(
    "showPassword",
    "false"
  );
  // const [currentUser,setCurrentUser] = useLocalStorage("currentUser",username);

  const navigate = useNavigate();

  const doLogin = async () => {
    login({ email: username, password: password })
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("currentUser", username);
        navigate("/");
      })
      .catch((error) => {
        setError(error.data.message);
      });
    // const response = await login({email:username,password:password});
    // if(response.data?.accessToken){
    //     localStorage.setItem("token",response.data?.accessToken)
    //     localStorage.setItem("isLoggedIn", "true")
    //     navigate("/")
    // }
    // else localStorage.setItem("isLoggedIn", "false")
  };

  const usernameRef = useRef<HTMLInputElement>(null);

  // const [coordinates] = useMousePointer();

  const handleclickClear = () => {
    setUsername("");
    // setPassword('')
  };
  const handlePclickclear = () => {
    setPassword("");
  };
  const handleShowPasswordCheckbox = () => {
    if (showPassword === "true") setShowPassword("false");
    else setShowPassword("true");
  };

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (username.length > 20) {
      setMessage("Username must be less than 20 characters");
    }

    return () => {
      setMessage("");
    };
  }, [username]);

  return (
    <div className="login-div">
      <div className="login-form-container">
        <div className="login-form-element">
          <img src={logo} className="logo" />
        </div>
        <div className="login-form-element">
          <Input
            variant="login"
            name="Username"
            type="text"
            label="Username"
            placeholder=" "
            onchange={(event) => setUsername(event.target.value)}
            value={username}
            inputRef={usernameRef}
            endAdornment={<EndAdornment func={handleclickClear} />}
          />

          {message && (
            <div
              style={{
                marginLeft: "20px",
                padding: "0px",
                color: "red",
                borderRadius: "5px",
              }}
            >
              {message}
            </div>
          )}

          <Input
            variant="login"
            name="Password"
            type={JSON.parse(showPassword) ? "text" : "Password"}
            label="Password"
            placeholder=" "
            onchange={(event) => setPassword(event.target.value)}
            value={password}
            endAdornment={<EndAdornment func={handlePclickclear} />}
          />
          <p className="error">{error}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "20px",
              justifyContent: "left",
            }}
          >
            <input
              type="checkbox"
              checked={JSON.parse(showPassword)}
              onChange={handleShowPasswordCheckbox}
              style={{ width: "20px", marginRight: "10px" }}
            />

            <label>Show password</label>
          </div>

          {/* <div className="login-form-element">
                        <p>x : {coordinates.x}</p>
                        <p>y: {coordinates.y}</p>
                    </div> */}
          <div className="login-form-element">
            <Button
              variant="blue"
              className="button-login"
              type="submit"
              text="Login"
              onclick={doLogin}
              disabled={
                username.length === 0 || password.length === 0 || isLoading
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRightPanel;
