import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import { base_path } from "./environment.jsx";

// Styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./style/css/feather.css";
import "./style/css/line-awesome.min.css";
import "./style/scss/main.scss";
import "./style/icons/fontawesome/css/fontawesome.min.css";
import "./style/icons/fontawesome/css/all.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Redux
import { Provider } from "react-redux";
import store from "./core/redux/store.jsx";

// Auth Context
import { AuthProvider } from "./context/AuthContext"; // ✅ added

// App
import App from "./App.jsx"; // ✅ now using App.jsx directly

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={base_path}>
          <AuthProvider> {/* ✅ provide auth context to app */}
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}
