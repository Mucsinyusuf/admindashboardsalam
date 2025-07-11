import React, { useState } from "react";
import CountUp from "react-countup";
import {
  File,
  User,
  UserCheck,
  ArrowRight,
} from "react-feather";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { all_routes } from "../../Router/all_routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Dashboard = () => {
  const route = all_routes;

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "#FF0000",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "OK",
        });
      } else {
        MySwal.close();
      }
    });
  };

  const [chartOptions] = useState({
    series: [
      {
        name: "Sales",
        data: [130, 210, 300, 290, 150, 50, 210, 280, 105],
      },
      {
        name: "Purchase",
        data: [-150, -90, -50, -180, -50, -70, -100, -90, -105],
      },
    ],
    colors: ["#003057", "#FFD580"],
    chart: {
      type: "bar",
      height: 320,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: -200,
      max: 300,
      tickAmount: 5,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: { show: false },
    fill: {
      opacity: 1,
    },
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          {/* Dashboard Widgets */}
          {[
            { value: 307144, label: "Total Purchase Due", icon: "dash1.svg" },
            { value: 4385, label: "Total Sales Due", icon: "dash2.svg" },
            { value: 385656.5, label: "Total Sale Amount", icon: "dash3.svg" },
            { value: 40000, label: "Total Expense Amount", icon: "dash4.svg" },
          ].map((item, idx) => (
            <div key={idx} className="col-xl-3 col-sm-6 col-12 d-flex">
              <div
                className="dash-widget w-100 p-3 text-white"
                style={{
                  backgroundColor: "#FFD580",
                  borderRadius: "8px",
                }}
              >
                <div className="d-flex align-items-center">
                  <span className="me-3">
                    <ImageWithBasePath
                      src={`assets/img/icons/${item.icon}`}
                      alt="icon"
                    />
                  </span>
                  <div>
                    <h5 className="mb-1">
                      ${" "}
                      <CountUp
                        start={0}
                        end={item.value}
                        duration={3}
                        decimals={item.value % 1 !== 0 ? 1 : 0}
                      />
                    </h5>
                    <h6 className="mb-0">{item.label}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dash Counts */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div
              className="dash-count w-100 text-white p-3"
              style={{ backgroundColor: "#003057", borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4>100</h4>
                  <h5>Customers</h5>
                </div>
                <User />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div
              className="dash-count w-100 text-white p-3"
              style={{ backgroundColor: "#003057", borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4>110</h4>
                  <h5>Suppliers</h5>
                </div>
                <UserCheck />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div
              className="dash-count w-100 text-white p-3"
              style={{ backgroundColor: "#003057", borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4>150</h4>
                  <h5>Purchase Invoice</h5>
                </div>
                <ImageWithBasePath
                  src="assets/img/icons/file-text-icon-01.svg"
                  className="img-fluid"
                  alt="icon"
                />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div
              className="dash-count w-100 text-white p-3"
              style={{ backgroundColor: "#003057", borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4>170</h4>
                  <h5>Sales Invoice</h5>
                </div>
                <File />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="row mt-4">
          <div className="col-xl-7 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#003057" }}
              >
                <h5 className="card-title mb-0">Purchase & Sales</h5>
              </div>
              <div className="card-body">
                <Chart
                  options={chartOptions}
                  series={chartOptions.series}
                  type="bar"
                  height={320}
                />
              </div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="col-xl-5 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div
                className="card-header d-flex justify-content-between align-items-center text-white"
                style={{ backgroundColor: "#003057" }}
              >
                <h4 className="card-title mb-0">Recent Products</h4>
                <Link to="#" className="text-white d-flex align-items-center">
                  View All
                  <ArrowRight className="ms-2" size={16} />
                </Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead
                      style={{
                        backgroundColor: "#1A4C37",
                        color: "#fff",
                      }}
                    >
                      <tr>
                        <th>#</th>
                        <th>Products</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 1,
                          name: "Lenevo 3rd Generation",
                          price: "$12500",
                          img: "stock-img-01.png",
                        },
                        {
                          id: 2,
                          name: "Bold V3.2",
                          price: "$1600",
                          img: "stock-img-06.png",
                        },
                        {
                          id: 3,
                          name: "Nike Jordan",
                          price: "$2000",
                          img: "stock-img-02.png",
                        },
                        {
                          id: 4,
                          name: "Apple Series 5 Watch",
                          price: "$800",
                          img: "stock-img-03.png",
                        },
                      ].map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td className="d-flex align-items-center">
                            <ImageWithBasePath
                              src={`assets/img/products/${product.img}`}
                              alt={product.name}
                              className="me-2"
                              style={{ width: 40, height: 40 }}
                            />
                            <Link to={route.productlist}>
                              {product.name}
                            </Link>
                          </td>
                          <td>{product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expired Products */}
        <div className="card mt-4">
          <div
            className="card-header text-white"
            style={{ backgroundColor: "#003057" }}
          >
            <h4 className="card-title mb-0">Expired Products</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead
                  style={{ backgroundColor: "#1A4C37", color: "#fff" }}
                >
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Manufactured Date</th>
                    <th>Expired Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      name: "Red Premium Handy",
                      sku: "PT006",
                      mfg: "17 Jan 2023",
                      exp: "29 Mar 2023",
                      img: "expire-product-01.png",
                    },
                    {
                      id: 2,
                      name: "Iphone 14 Pro",
                      sku: "PT007",
                      mfg: "22 Feb 2023",
                      exp: "04 Apr 2023",
                      img: "expire-product-02.png",
                    },
                  ].map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td className="d-flex align-items-center">
                        <ImageWithBasePath
                          src={`assets/img/products/${item.img}`}
                          alt={item.name}
                          className="me-2"
                          style={{ width: 40, height: 40 }}
                        />
                        {item.name}
                      </td>
                      <td>{item.sku}</td>
                      <td>{item.mfg}</td>
                      <td>{item.exp}</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            to="#"
                            className="me-2 text-primary"
                          >
                            <i className="feather-edit"></i>
                          </Link>
                          <Link
                            to="#"
                            className="text-danger"
                            onClick={showConfirmationAlert}
                          >
                            <i className="feather-trash-2"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
