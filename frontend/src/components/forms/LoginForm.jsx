import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const data = await authService.login(email, password);
      // console.log(data.message);
      if (data) login(data);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        // console.log("Error: ",error.request);
        setErrorMessage("Network error: No response received from server.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ paddingRight: "40px" }}
        />
        <span onClick={handlePasswordVisibility}>
          {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
        <button type="submit">Login</button>
        <NavLink to={"/register"}>new user register</NavLink>
      </form>
      <div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </>
  );
};

export default LoginForm;
