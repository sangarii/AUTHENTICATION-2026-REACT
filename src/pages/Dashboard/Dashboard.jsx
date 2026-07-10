import React from "react";
import "./Dashboard.css";
import { FaUser } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { VscCircleSmallFilledCompact } from "react-icons/vsc";
import welcome from "../../assets/welcome.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const username = user.email.split("@")[0].replace(/[0-9]/g, "");
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <section className="dashboard">
      <nav>
        <div className="nav-left">
          <FaShieldAlt />
          <h4>Admin</h4>
        </div>
        <div className="nav-right">
          <FaUser className="user-icon" />
          <p><span className="welcome-text">Welcome, </span>{displayName}</p>
        </div>
      </nav>
      <main>
        <article className="welcome-card">
          <figure className="welcome-img">
            <img src={welcome} alt="welcome-page" />
          </figure>
          <h1>
            Login <span className="success-msg">Successful!</span>
          </h1>
          <p className="welcome-success">Welcome to Admin Panel</p>
          <div className="divider-row">
            <div className="divider"></div>
            <VscCircleSmallFilledCompact className="circle-ball"/>
            <div className="divider"></div>
          </div>
          <p className="log-success">You have logged in successfully.</p>
          <button onClick={()=>navigate("/login")}>
            <LuLogOut className="logout" /> Logout
          </button>
        </article>
      </main>
    </section>
  );
};

export default Dashboard;
