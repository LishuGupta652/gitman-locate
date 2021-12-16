import { Room } from "@mui/icons-material";

const Register = () => {
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
      </div>
      <form action="">
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
