// src/components/MainLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../InitialPage/Sidebar/Sidebar";
import Header from "../InitialPage/Sidebar/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
