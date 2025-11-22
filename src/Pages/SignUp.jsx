import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/signup", form);
      alert(res.data.message);
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
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
          <h2 className="login-title">Create Account</h2>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="login-form"
          >
            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="login-input"
                value={form.username}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="login-input"
                value={form.email}
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

            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                name="gender"
                type="text"
                placeholder="Gender"
                className="login-input"
                value={form.gender}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                name="age"
                type="number"
                placeholder="Age"
                className="login-input"
                value={form.age}
                onChange={handleChange}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="login-button"
              type="submit"
            >
              Sign Up
            </motion.button>
          </motion.form>

          <p className="login-register-text">
            Already have an account?{" "}
            <Link to="/" className="login-register-link">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
