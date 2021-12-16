import { Room } from "@mui/icons-material";

const Register = () => {
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
        <span className="success">Successfull. You can login now</span>
        <span className="error">Something went wrong</span>
      </form>
    </div>
  );
};

export default Register;
