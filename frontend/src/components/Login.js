import { Cancel, Room } from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/user/register", newUser);
      setError(false);
      console.log(res);
      setSuccess(true);
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
