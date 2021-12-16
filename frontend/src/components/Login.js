import { Cancel, Room } from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "axios";

const Login = ({ setShowLogin, myStorage }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        user
      );
      myStorage.setItem("user", res.data.username);
      setError(false);
      console.log(res);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room /> Gitman Locate
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginButton">Login</button>

        {error && <span className="error">Something went wrong</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
