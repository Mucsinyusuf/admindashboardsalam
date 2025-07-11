import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import Cookies from "js-cookie";

const Signin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.payload?.replyCode !== 200) {
        const message =
          data.payload?.replyMessage || "Login failed. Please try again.";
        throw new Error(message);
      }

      // Save pending login details in cookie for OTP step
      Cookies.set(
        "pendingLogin",
        JSON.stringify({
          username,
        }),
        {
          expires: 0.1, // roughly a few hours
          secure: true,
          sameSite: "strict",
        }
      );

      navigate(all_routes.otpSettings);
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleLogin}>
          <div className="text-center mb-4">
            <h3>Sign In</h3>
            <p>Access the Dreamspos panel using your email and passcode.</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger mt-2">{error}</div>
          )}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>
          <div className="text-center mt-4">
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
