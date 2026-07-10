import React, { useState } from "react";
import '../../styles/Auth.css';
import { useNavigate } from "react-router-dom";
import background_image from "../../assets/background-image.jpg";
import Button from "../../components/Button/Button";

const Register = ({ title, subTitle, accountText, linkText }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    //Email Validation
    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password Validation
    if (password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm Password Validation
    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    //store single Login users

    //       localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       email,
    //       password,
    //     })
    //   );
    //   console.log(localStorage.getItem("user"));

    //store multiple login users

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      newErrors.email = "Email already registered";
      setErrors(newErrors);
      return;
    }
    const newUser = {
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    console.log(JSON.parse(localStorage.getItem("users")));

    navigate("/otp");
  };
  return (
    <section className="auth">
      <article className="auth-card">
        <div className="auth-left">
          <figure className="auth-img">
            <img src={background_image} alt="Register background" />
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

              <div className="auth-form-group">
                <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter your confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <small className="error">{errors.confirmPassword}</small>
                )}
              </div>
              <Button text="Register"></Button>
              <p>
                {accountText} 
                <span className="login-link" onClick={() => navigate("/login")}>
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

export default Register;
