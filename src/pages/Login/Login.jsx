import React, { useState } from "react";
import "../../styles/Auth.css";
import background_image from "../../assets/background-image.jpg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const Login = ({ title, subTitle, accountText, linkText }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newError = {
      email: "",
      password: "",
    };
    let isValid = true;

    //Email Validation
    if (email.trim() === "") {
      newError.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newError.email = "Please enter a valid email";
      isValid = false;
    }

    //password validation
    if (password.trim() === "") {
      newError.password = "Password is required";
      isValid = false;
    }

    setErrors(newError);

    if (!isValid) return;

    //Get registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //Find by users
    const user = users.find((user) => user.email === email);
    localStorage.setItem('loggedInUser', JSON.stringify(user)); 

    if (!user) {
      setErrors({
        email: "Email not found",
        password: "",
      });
      return;
    }

    //check password
    if (user.password !== password) {
      setErrors({
        email: "",
        password: "Incorrect Password",
      });
      return;
    }

    navigate("/dashboard");
  };
  return (
    <section className="auth">
      <article className="auth-card">
        <div className="auth-left">
          <figure className="auth-img">
            <img src={background_image} alt="OTP background" />
          </figure>
        </div>
        <div className="auth-right">
          <div className="auth-form">
            <h2>{title}</h2>
            <p>{subTitle}</p>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="email">EMAIL ID</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <small className="error">{errors.email}</small>
                )}
              </div>

              <div className="auth-form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <small className="error">{errors.password}</small>
                )}
              </div>
              <Button text="Log In"></Button>
              <p>
                {accountText}
                <span className="login-link" onClick={() => navigate("/")}>
                  {linkText}
                </span>
              </p>
            </form>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Login;
