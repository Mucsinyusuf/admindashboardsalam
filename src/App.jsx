// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

// Auth Pages
import Signin from "./feature-module/pages/login/signin";
import OTPVerify from "./feature-module/pages/login/otp";

// Protected Route Config
import protectedRoutes from "./components/protectedRoutes";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/otp" element={<OTPVerify />} />

      {/* Dynamically Loaded Protected Routes */}
      {protectedRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute>
              <MainLayout>
                <Component />
              </MainLayout>
            </PrivateRoute>
          }
        />
      ))}

      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="text-center mt-5">
            <h3>404 - Page Not Found</h3>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
