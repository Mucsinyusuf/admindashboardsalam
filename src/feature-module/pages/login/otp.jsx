import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/AuthContext";
import {
  Alert,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import bgImage from "../../../assets/img/company/AdminDashboardBackground@2x.png";

const OTP_LENGTH = 6;

const OTPVerify = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  useEffect(() => {
    const raw = Cookies.get("pendingLogin");
    try {
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.username) {
          setUsername(parsed.username);
          return;
        }
      }
    } catch (err) {
      console.error("Cookie parse error", err);
    }
    navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const allFilled = otp.every((digit) => digit !== "");
    if (allFilled && !loading) {
      handleVerify(otp.join(""));
    }
  }, [otp]);

  const handleChange = (element, index) => {
    const val = element.value.replace(/\D/, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const backOtp = [...otp];
        backOtp[index - 1] = "";
        setOtp(backOtp);
      }
    }
  };

  const handleVerify = async (enteredOtp) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp: enteredOtp }),
      });

      const data = await res.json();
      const payload = data?.payload;

      if (!res.ok || payload?.replyCode !== 200) {
        throw new Error(payload?.replyMessage || "OTP verification failed");
      }

      const { token, tokenExpiry } = payload;
      login(token, tokenExpiry, { username });
      Cookies.remove("pendingLogin");

      navigate("/overview");
    } catch (err) {
      console.error("OTP Error:", err);
      setError(err.message || "OTP verification failed.");
      setOtp(new Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "440px",
          minHeight: "500px",
          padding: "50px 40px",
          borderRadius: "24px",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ color: "#212121", fontWeight: "bold" }}
        >
          OTP Verification
        </Typography>

        <Typography
          align="center"
          variant="body1"
          gutterBottom
          style={{ color: "#444", marginBottom: "20px" }}
        >
          Enter the OTP sent to your email or phone
        </Typography>

        <Box display="flex" justifyContent="space-between" gap={1} mb={3}>
          {otp.map((digit, idx) => (
            <TextField
              key={idx}
              inputRef={(el) => (inputsRef.current[idx] = el)}
              value={digit ? "*" : ""}
              onChange={(e) => handleChange(e.target, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              type="text"
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                style: {
                  textAlign: "center",
                  fontSize: "28px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  padding: "10px",
                },
                onPaste: (e) => e.preventDefault(),
              }}
              sx={{
                width: "48px",
                "& .MuiInputBase-root": {
                  color: "#212121",
                  background: "#fff",
                  borderRadius: "10px",
                },
              }}
              disabled={loading}
            />
          ))}
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={28} />
          </Box>
        )}

        {error && (
          <Alert severity="error" className="mt-2">
            {error}
          </Alert>
        )}
      </motion.div>
    </div>
  );
};

export default OTPVerify;
