// src/feature-module/banking/AccountTypes.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../core/pagination/datatable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { DatePicker } from "antd";
import {
  Calendar,
  ChevronUp,
  Filter,
  PlusCircle,
  RotateCcw,
  Sliders,
  StopCircle,
  Zap,
} from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { setToogleHeader } from "../../core/redux/action";

const AccountTypes = () => {
  const dataSource = useSelector((state) => state.account_type_data);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const accountTypeOptions = [
    { value: "Savings", label: "Savings" },
    { value: "Checking", label: "Checking" },
    { value: "Loan", label: "Loan" },
    { value: "Investment", label: "Investment" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const sortOptions = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  const handleDateChange = (date) => setSelectedDate(date);
  const toggleFilterVisibility = () => setIsFilterVisible((prev) => !prev);

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Deleted!", "Account type has been deleted.", "success");
      }
    });
  };

  const columns = [
    { title: "Account Type", dataIndex: "type", sorter: (a, b) => a.type.length - b.type.length },
    { title: "Description", dataIndex: "description", sorter: (a, b) => a.description.length - b.description.length },
    { title: "Interest Rate", dataIndex: "interestRate", sorter: (a, b) => a.interestRate - b.interestRate },
    { title: "Created On", dataIndex: "createdOn", sorter: (a, b) => a.createdOn.length - b.createdOn.length },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span className="badge badge-linesuccess">
          <Link to="#">{text}</Link>
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <div className="edit-delete-action">
          <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-account-type">
            <i className="feather-edit" />
          </Link>
          <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
            <i className="feather-trash-2" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Account Types</h4>
              <h6>Manage account types for banking operations</h6>
            </div>
          </div>

          <ul className="table-top-head">
            <li><OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}><Link><ImageWithBasePath src="assets/img/icons/pdf.svg" alt="pdf" /></Link></OverlayTrigger></li>
            <li><OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}><Link><ImageWithBasePath src="assets/img/icons/excel.svg" alt="excel" /></Link></OverlayTrigger></li>
            <li><OverlayTrigger placement="top" overlay={<Tooltip>Printer</Tooltip>}><Link><i className="feather-printer" /></Link></OverlayTrigger></li>
            <li><OverlayTrigger placement="top" overlay={<Tooltip>Refresh</Tooltip>}><Link><RotateCcw /></Link></OverlayTrigger></li>
            <li><OverlayTrigger placement="top" overlay={<Tooltip>Collapse</Tooltip>}><Link className={data ? "active" : ""} onClick={() => dispatch(setToogleHeader(!data))}><ChevronUp /></Link></OverlayTrigger></li>
          </ul>

          <div className="page-btn">
            <a className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-account-type">
              <PlusCircle className="me-2" /> Add Account Type
            </a>
          </div>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input type="text" placeholder="Search" className="form-control form-control-sm formsearch" />
                  <Link className="btn btn-searchset"><i className="feather-search" /></Link>
                </div>
              </div>

              <div className="search-path">
                <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
                  <Filter className="filter-icon" onClick={toggleFilterVisibility} />
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                  </span>
                </Link>
              </div>

              <div className="form-sort">
                <Sliders className="info-img" />
                <Select className="select" options={sortOptions} placeholder="Sort" />
              </div>
            </div>

            {isFilterVisible && (
              <div className="card visible" id="filter_inputs">
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-4 col-sm-6">
                      <div className="input-blocks">
                        <Zap className="info-img" />
                        <Select className="select" options={accountTypeOptions} placeholder="Choose Type" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="input-blocks">
                        <Calendar className="info-img" />
                        <DatePicker value={selectedDate} onChange={handleDateChange} className="filterdatepicker" placeholder="Choose Date" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />
                        <Select className="select" options={statusOptions} placeholder="Choose Status" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="table-responsive">
              <Table columns={columns} dataSource={dataSource} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypes;
