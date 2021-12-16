import { Room } from "@mui/icons-material";
import { useRef, useState } from "react";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room /> Gitman Locate
      </div>
      <form action="">
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerButton">Register</button>
        {success && (
          <span className="success">Successfull. You can login now</span>
        )}

        {error && <span className="error">Something went wrong</span>}
      </form>
    </div>
  );
};

export default Register;
