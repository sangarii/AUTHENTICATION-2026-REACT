import React, { useState, useRef } from "react";
import "../../styles/Auth.css";
import "./OTP.css";
import background_image from "../../assets/background-image.jpg";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const OTP = ({ title, subTitle }) => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;

    //Allow only digits
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //Auto input move
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.includes("")) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    navigate("/login");
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
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    inputMode="numeric"
                    type="text"
                    maxLength="1"
                    className="otp-input input2"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              {error && <small className="error">{error}</small>}
              <Button text="Proceed" />
            </form>
          </div>
        </div>
      </article>
    </section>
  );
};

export default OTP;
