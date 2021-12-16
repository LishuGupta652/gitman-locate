import { Room } from "@mui/icons-material";
import { useState } from "react";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room /> Gitman Locate
      </div>
      <form action="">
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
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
