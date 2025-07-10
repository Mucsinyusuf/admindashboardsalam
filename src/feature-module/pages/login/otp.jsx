// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { all_routes } from "../../../Router/all_routes";
// import { useAuth } from "../../../context/AuthContext";
// import Cookies from "js-cookie";

// const OTPVerify = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [otp, setOtp] = useState("");
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ On mount, fetch pendingLogin from cookie
//   useEffect(() => {
//     try {
//       const pendingRaw = Cookies.get("pendingLogin");
//       if (pendingRaw) {
//         const pending = JSON.parse(pendingRaw);
//         if (pending?.username) {
//           setUsername(pending.username);
//           return;
//         }
//       }
//     } catch (err) {
//       console.error("Error reading pendingLogin cookie:", err);
//     }
//     navigate(all_routes.signin);
//   }, [navigate]);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/auth/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           otp,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || data.payload?.replyCode !== 200) {
//         const message =
//           data.payload?.replyMessage || "OTP verification failed.";
//         throw new Error(message);
//       }

//       const { token, tokenExpiry } = data.payload;

//       if (!token) {
//         throw new Error("Token missing in OTP verification response.");
//       }

//       // ✅ Save token to AuthContext and cookies
//       login(token, tokenExpiry, { username });

//       // Remove pendingLogin cookie
//       Cookies.remove("pendingLogin");

//       navigate(all_routes.dashboard);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "OTP verification failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="account-content">
//         <div className="login-wrapper bg-img">
//           <div className="login-content">
//             <form onSubmit={handleVerify}>
//               <h3>OTP Verification</h3>
//               <p>Enter the code sent to your phone</p>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//               {error && (
//                 <div className="alert alert-danger mt-2">{error}</div>
//               )}
//               <button
//                 type="submit"
//                 className="btn btn-login w-100 mt-3"
//                 disabled={loading}
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPVerify;
