import React, { useState } from "react";
import CountUp from "react-countup";
import { File, User, UserCheck, ArrowRight, Edit2, Trash2 } from "react-feather";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

const Dashboard = () => {
  const [chartOptions] = useState({
    series: [
      {
        name: "Credits",
        data: [130, 210, 300, 290, 150, 50, 210, 280, 105],
      },
      {
        name: "Debits",
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
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      ],
    },
    legend: { show: false },
    fill: {
      opacity: 1,
    },
  });

  const [dormantAccounts, setDormantAccounts] = useState([
    {
      id: 1,
      name: "Jamal kia Savings",
      account: "00123456789",
      lastActive: "17 Jan 2023",
      status: "Dormant",
    },
    {
      id: 2,
      name: "Wallalo Business Account",
      account: "00987654321",
      lastActive: "22 Feb 2023",
      status: "Dormant",
    },
  ]);

  const handleUpdateStatus = (id) => {
    setDormantAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, status: "Active" } : acc
      )
    );
  };

  const handleDeleteAccount = (id) => {
    setDormantAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          {[
            { value: 307144, label: "Total Deposits", icon: "dash1.svg" },
            { value: 4385, label: "Total Withdrawals", icon: "dash2.svg" },
            { value: 385656.5, label: "Total Account Balance", icon: "dash3.svg" },
            { value: 40000, label: "Total Murabaha Amount", icon: "dash4.svg" },
          ].map((item, idx) => (
            <div key={idx} className="col-xl-3 col-sm-6 col-12 d-flex">
              <div
                className="dash-widget w-100 p-3 text-white"
                style={{ backgroundColor: "#FFD580", borderRadius: "8px" }}
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
                      $ <CountUp
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
                  <h4>35</h4>
                  <h5>Murabaha Clients</h5>
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
                  <h4>45</h4>
                  <h5>Fixed Deposit Accounts</h5>
                </div>
                <File />
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
                  <h4>10</h4>
                  <h5>Closed Accounts</h5>
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
              <div className="card-header text-white" style={{ backgroundColor: "#003057" }}>
                <h5 className="card-title mb-0">Credit & Debit Transactions</h5>
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

          {/* Recent Transactions */}
          <div className="col-xl-5 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div
                className="card-header d-flex justify-content-between align-items-center text-white"
                style={{ backgroundColor: "#003057" }}
              >
                <h4 className="card-title mb-0">Recent Transactions</h4>
                <Link to="#" className="text-white d-flex align-items-center">
                  View All <ArrowRight className="ms-2" size={16} />
                </Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead style={{ backgroundColor: "#1A4C37", color: "#fff" }}>
                      <tr>
                        <th>#</th>
                        <th>Transaction</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, name: "Salary Credit", amount: "$12,500" },
                        { id: 2, name: "ATM Withdrawal", amount: "$1,600" },
                        { id: 3, name: "POS Purchase", amount: "$2,000" },
                        { id: 4, name: "Murabaha Repayment", amount: "$800" },
                      ].map((txn) => (
                        <tr key={txn.id}>
                          <td>{txn.id}</td>
                          <td>{txn.name}</td>
                          <td>{txn.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dormant Accounts */}
        <div className="card mt-4">
          <div className="card-header text-white" style={{ backgroundColor: "#003057" }}>
            <h4 className="card-title mb-0">Dormant Accounts</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead style={{ backgroundColor: "#1A4C37", color: "#fff" }}>
                  <tr>
                    <th>#</th>
                    <th>Account Name</th>
                    <th>Account Number</th>
                    <th>Last Active</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dormantAccounts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.account}</td>
                      <td>{item.lastActive}</td>
                      <td>{item.status}</td>
                      <td>
                        <Edit2
                          className="me-2 text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleUpdateStatus(item.id)}
                        />
                        <Trash2
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteAccount(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                  {dormantAccounts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">No dormant accounts.</td>
                    </tr>
                  )}
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
