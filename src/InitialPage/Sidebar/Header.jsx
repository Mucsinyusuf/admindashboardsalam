import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Search, XCircle } from "react-feather";
import { all_routes } from "../../Router/all_routes";
import companyLogo from "../../assets/img/company/company-logo.png";

const Header = () => {
  const route = all_routes;
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleMouseover = (e) => {
      const body = document.body;
      const toggleBtn = document.getElementById("toggle_btn");

      if (
        body.classList.contains("mini-sidebar") &&
        toggleBtn?.offsetParent !== null
      ) {
        const target = e.target.closest(".sidebar, .header-left");

        if (target) {
          body.classList.add("expand-menu");
        } else {
          body.classList.remove("expand-menu");
        }

        e.preventDefault();
      }
    };

    document.addEventListener("mouseover", handleMouseover);
    return () => document.removeEventListener("mouseover", handleMouseover);
  }, []);

  const handleSidebar = () => {
    document.body.classList.toggle("mini-sidebar");
    setToggle((prev) => !prev);
  };

  const sidebarOverlay = () => {
    document.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
    document.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
    document.querySelector("html")?.classList?.toggle("menu-opened");
  };

  const pathname = window.location.pathname;

  if (
    ["/reactjs/template/dream-pos/index-three", "/reactjs/template/dream-pos/index-one"].includes(pathname)
  ) return null;

  return (
    <div className="header">
      {/* Sidebar Logo */}
      <div
        className={`header-left ${toggle ? "" : "active"}`}
        onMouseLeave={() => document.body.classList.remove("expand-menu")}
        onMouseOver={() => document.body.classList.add("expand-menu")}
      >
        <Link to="/dashboard" className="logo logo-normal">
          <img
            src={companyLogo}
            alt="Company Logo"
            style={{ height: "40px", objectFit: "contain" }}
          />
        </Link>
        <Link to="/dashboard" className="logo logo-white">
          <img
            src={companyLogo}
            alt="Company Logo"
            style={{ height: "40px", objectFit: "contain" }}
          />
        </Link>
        <Link to="/dashboard" className="logo logo-small">
          <img
            src={companyLogo}
            alt="Company Logo"
            style={{ height: "30px", objectFit: "contain" }}
          />
        </Link>
        <Link
          id="toggle_btn"
          to="#"
          style={{
            display: pathname.includes("tasks") || pathname.includes("compose") ? "none" : "",
          }}
          onClick={handleSidebar}
        >
          <FeatherIcon icon="chevrons-left" className="feather-16" />
        </Link>
      </div>

      <Link
        id="mobile_btn"
        className="mobile_btn"
        to="#"
        onClick={sidebarOverlay}
      >
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </Link>

      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}
        <li className="nav-item nav-searchinputs">
          <div className="top-nav-search">
            <Link to="#" className="responsive-search">
              <Search />
            </Link>
            <form className="dropdown">
              <div
                className="searchinputs dropdown-toggle"
                id="dropdownMenuClickable"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
              >
                <input type="text" placeholder="Search" />
                <div className="search-addon">
                  <span>
                    <XCircle className="feather-14" />
                  </span>
                </div>
              </div>
              <div
                className="dropdown-menu search-dropdown"
                aria-labelledby="dropdownMenuClickable"
              >
                <div className="search-info">
                  <h6>
                    <i data-feather="search" className="feather-16" /> Recent
                    Searches
                  </h6>
                  <ul className="search-tags">
                    <li><Link to="#">Products</Link></li>
                    <li><Link to="#">Sales</Link></li>
                    <li><Link to="#">Applications</Link></li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </li>

        {/* Select Branch */}
        <li className="nav-item dropdown has-arrow main-drop select-store-dropdown">
          <Link
            to="#"
            className="dropdown-toggle nav-link select-store"
            data-bs-toggle="dropdown"
          >
            <span className="user-info">
              <span className="user-letter" style={{ fontSize: "20px" }}>🏦</span>
              <span className="user-detail">
                <span className="user-name">Select Branch</span>
              </span>
            </span>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link to="#" className="dropdown-item">🏢 BBS Mall</Link>
            <Link to="#" className="dropdown-item">📍 Kimathi Street</Link>
            <Link to="#" className="dropdown-item">🏬 Jam Street</Link>
          </div>
        </li>

        {/* Admin Profile */}
        <li className="nav-item dropdown has-arrow main-drop">
          <Link
            to="#"
            className="dropdown-toggle nav-link userset"
            data-bs-toggle="dropdown"
          >
            <span className="user-info">
              <span className="user-letter" style={{ fontSize: "22px" }}>👤</span>
              <span className="user-detail">
                <span className="user-name">Admin</span>
                <span className="user-role">Bank Admin</span>
              </span>
            </span>
          </Link>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilename p-3">
              <h6 className="mb-1">Admin</h6>
              <p className="mb-2">Salaam Bank</p>
              <hr className="m-0" />
              <Link className="dropdown-item" to={route.route}>
                <i className="me-2" data-feather="user" /> My Profile
              </Link>
              <Link className="dropdown-item" to={route.generalsettings}>
                <i className="me-2" data-feather="settings" /> Settings
              </Link>
              <hr className="m-0" />
              <Link className="dropdown-item logout" to="/signin">
                <i className="me-2" data-feather="log-out" /> Logout
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
