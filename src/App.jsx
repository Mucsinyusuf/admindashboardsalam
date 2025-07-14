// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Auth pages
import Signin from "./feature-module/pages/login/signin";
import OTPVerify from "./feature-module/pages/login/otp";

// Dashboard
import Dashboard from "./feature-module/dashboard/Dashboard";
import SalesDashboard from "./feature-module/dashboard/Salesdashboard";

// Inventory
import CustomerOnboarding from "./feature-module/inventory/productlist";
import KYCForm from "./feature-module/inventory/addproduct";
import BrandList from "./feature-module/inventory/brandlist";
import AccountTypes from "./feature-module/inventory/units";
import VariantAttributes from "./feature-module/inventory/variantattributes";
import Warranty from "./feature-module/inventory/warranty";
import PrintBarcode from "./feature-module/inventory/printbarcode";

// UI Components
import Alert from "./feature-module/uiinterface/alert";
import Grid from "./feature-module/uiinterface/grid";
import Accordion from "./feature-module/uiinterface/accordion";
import Avatar from "./feature-module/uiinterface/avatar";
import Badges from "./feature-module/uiinterface/badges";
import Borders from "./feature-module/uiinterface/borders";
import Buttons from "./feature-module/uiinterface/buttons";
import ButtonsGroup from "./feature-module/uiinterface/buttonsgroup";
import Popovers from "./feature-module/uiinterface/popover";
import Breadcrumb from "./feature-module/uiinterface/breadcrumb";
import Cards from "./feature-module/uiinterface/cards";
import Dropdowns from "./feature-module/uiinterface/dropdowns";
import Colors from "./feature-module/uiinterface/colors";
import Carousel from "./feature-module/uiinterface/carousel";
import Spinner from "./feature-module/uiinterface/spinner";
import NavTabs from "./feature-module/uiinterface/navtabs";
import Toasts from "./feature-module/uiinterface/toasts";
import Typography from "./feature-module/uiinterface/typography";
import Video from "./feature-module/uiinterface/video";
import Tooltips from "./feature-module/uiinterface/tooltips";
import Lightboxes from "./feature-module/uiinterface/lightbox";
import Media from "./feature-module/uiinterface/media";
import Modals from "./feature-module/uiinterface/modals";
import Offcanvas from "./feature-module/uiinterface/offcanvas";
import Pagination from "./feature-module/uiinterface/pagination";

// Advanced UI
import DragDrop from "./feature-module/uiinterface/advancedui/dragdrop";
import SweetAlert from "./feature-module/uiinterface/sweetalert";
import Progress from "./feature-module/uiinterface/progress";
import Placeholder from "./feature-module/uiinterface/placeholder";
import Rating from "./feature-module/uiinterface/advancedui/rating";
import TextEditor from "./feature-module/uiinterface/advancedui/texteditor";
import Counter from "./feature-module/uiinterface/advancedui/counter";
import Uiscrollbar from "./feature-module/uiinterface/advancedui/uiscrollbar";
import Stickynote from "./feature-module/uiinterface/advancedui/stickynote";
import Timeline from "./feature-module/uiinterface/advancedui/timeline";

// Charts
import Apexchart from "./feature-module/uiinterface/charts/apexcharts";
import ChartJs from "./feature-module/uiinterface/charts/chartjs";

const App = () => {
  return (
    <Routes>
      {/* ✅ Redirect root to signin */}
      <Route path="/" element={<Navigate to="/signin" />} />

      {/* Public Routes */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/otp" element={<OTPVerify />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/sales-dashboard" element={<PrivateRoute><SalesDashboard /></PrivateRoute>} />

      {/* Inventory Routes */}
      <Route path="/corporate-onboarding" element={<PrivateRoute><CustomerOnboarding /></PrivateRoute>} />
      <Route path="/company-KYC" element={<PrivateRoute><KYCForm /></PrivateRoute>} />
      <Route path="/brand-list" element={<PrivateRoute><BrandList /></PrivateRoute>} />
      <Route path="/accountTypes" element={<PrivateRoute><AccountTypes /></PrivateRoute>} />
      <Route path="/variant-attributes" element={<PrivateRoute><VariantAttributes /></PrivateRoute>} />
      <Route path="/warranty" element={<PrivateRoute><Warranty /></PrivateRoute>} />
      <Route path="/barcode" element={<PrivateRoute><PrintBarcode /></PrivateRoute>} />

      {/* UI Components */}
      <Route path="/alert" element={<PrivateRoute><Alert /></PrivateRoute>} />
      <Route path="/grid" element={<PrivateRoute><Grid /></PrivateRoute>} />
      <Route path="/accordion" element={<PrivateRoute><Accordion /></PrivateRoute>} />
      <Route path="/avatar" element={<PrivateRoute><Avatar /></PrivateRoute>} />
      <Route path="/badges" element={<PrivateRoute><Badges /></PrivateRoute>} />
      <Route path="/borders" element={<PrivateRoute><Borders /></PrivateRoute>} />
      <Route path="/buttons" element={<PrivateRoute><Buttons /></PrivateRoute>} />
      <Route path="/buttonsgroup" element={<PrivateRoute><ButtonsGroup /></PrivateRoute>} />
      <Route path="/popover" element={<PrivateRoute><Popovers /></PrivateRoute>} />
      <Route path="/breadcrumb" element={<PrivateRoute><Breadcrumb /></PrivateRoute>} />
      <Route path="/cards" element={<PrivateRoute><Cards /></PrivateRoute>} />
      <Route path="/dropdowns" element={<PrivateRoute><Dropdowns /></PrivateRoute>} />
      <Route path="/colors" element={<PrivateRoute><Colors /></PrivateRoute>} />
      <Route path="/carousel" element={<PrivateRoute><Carousel /></PrivateRoute>} />
      <Route path="/spinner" element={<PrivateRoute><Spinner /></PrivateRoute>} />
      <Route path="/navtabs" element={<PrivateRoute><NavTabs /></PrivateRoute>} />
      <Route path="/toasts" element={<PrivateRoute><Toasts /></PrivateRoute>} />
      <Route path="/typography" element={<PrivateRoute><Typography /></PrivateRoute>} />
      <Route path="/video" element={<PrivateRoute><Video /></PrivateRoute>} />
      <Route path="/tooltip" element={<PrivateRoute><Tooltips /></PrivateRoute>} />
      <Route path="/lightbox" element={<PrivateRoute><Lightboxes /></PrivateRoute>} />
      <Route path="/media" element={<PrivateRoute><Media /></PrivateRoute>} />
      <Route path="/modals" element={<PrivateRoute><Modals /></PrivateRoute>} />
      <Route path="/offcanvas" element={<PrivateRoute><Offcanvas /></PrivateRoute>} />
      <Route path="/pagination" element={<PrivateRoute><Pagination /></PrivateRoute>} />

      {/* Advanced UI */}
      <Route path="/dragdrop" element={<PrivateRoute><DragDrop /></PrivateRoute>} />
      <Route path="/sweetalert" element={<PrivateRoute><SweetAlert /></PrivateRoute>} />
      <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
      <Route path="/placeholder" element={<PrivateRoute><Placeholder /></PrivateRoute>} />
      <Route path="/rating" element={<PrivateRoute><Rating /></PrivateRoute>} />
      <Route path="/texteditor" element={<PrivateRoute><TextEditor /></PrivateRoute>} />
      <Route path="/counter" element={<PrivateRoute><Counter /></PrivateRoute>} />
      <Route path="/scrollbar" element={<PrivateRoute><Uiscrollbar /></PrivateRoute>} />
      <Route path="/stickynote" element={<PrivateRoute><Stickynote /></PrivateRoute>} />
      <Route path="/timeline" element={<PrivateRoute><Timeline /></PrivateRoute>} />

      {/* Charts */}
      <Route path="/apexcharts" element={<PrivateRoute><Apexchart /></PrivateRoute>} />
      <Route path="/chartjs" element={<PrivateRoute><ChartJs /></PrivateRoute>} />

      {/* ❌ Catch all unknown routes */}
      <Route path="*" element={<div className="text-center mt-5"><h3>404 - Page Not Found</h3></div>} />
    </Routes>
  );
};

export default App;
