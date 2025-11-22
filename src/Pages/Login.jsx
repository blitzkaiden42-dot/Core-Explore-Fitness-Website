import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", form);
      alert(res.data.message);
      console.log("Logged in user:", res.data.user);
      // Optionally, store user info in localStorage/sessionStorage
      navigate("/"); // redirect after login
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="login-card"
        >
          <h2 className="login-title">Welcome Back</h2>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="login-form"
          >
            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                name="usernameOrEmail"
                type="text"
                placeholder="Username or Email"
                className="login-input"
                value={form.usernameOrEmail}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="login-input"
                value={form.password}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="login-button"
              type="submit"
            >
              Login In
            </motion.button>
          </motion.form>

          <p className="login-register-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="login-register-link">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
