import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable';
import Select from 'react-select';
import Sliders from 'feather-icons-react/build/IconComponents/Sliders';
import { ChevronUp, Filter, PlusCircle, RotateCcw, StopCircle, Zap } from 'feather-icons-react/build/IconComponents';
import { DatePicker } from 'antd';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { setToogleHeader } from '../../core/redux/action';
import withReactContent from 'sweetalert2-react-content';

const ComplianceAlertList = () => {
  const dataSource = useSelector((state) => state.compliance_alert_list);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const sortOptions = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const alertTypeOptions = [
    { value: 'transaction', label: 'Transaction Alert' },
    { value: 'login', label: 'Login Alert' },
    { value: 'account_change', label: 'Account Change' },
    { value: 'kyc', label: 'KYC Alert' },
  ];

  const severityStatus = [
    { value: 'active', label: 'Active' },
    { value: 'resolved', label: 'Resolved' },
  ];

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlertType, setSelectedAlertType] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState(null);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>PDF</Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
  );
  const renderPrinterTooltip = (props) => (
    <Tooltip id="printer-tooltip" {...props}>Printer</Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
  );

  const columns = [
    {
      title: "Alert ID",
      dataIndex: "alertId",
      sorter: (a, b) => a.alertId.localeCompare(b.alertId),
    },
    {
      title: "Account ID",
      dataIndex: "accountId",
      sorter: (a, b) => a.accountId.localeCompare(b.accountId),
    },
    {
      title: "Alert Type",
      dataIndex: "alertType",
      sorter: (a, b) => a.alertType.localeCompare(b.alertType),
    },
    {
      title: "Severity",
      dataIndex: "severity",
      render: (text) => (
        <span className={`badge badge-line${text === 'Active' ? 'danger' : 'success'}`}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.severity.localeCompare(b.severity),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      sorter: (a, b) => new Date(a.createdOn) - new Date(b.createdOn),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span>{text}</span>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-alert">
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i data-feather="trash-2" className="feather-trash-2" onClick={showConfirmationAlert}></i>
            </Link>
          </div>
        </td>
      )
    },
  ];

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "This alert will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00ff00',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Deleted!',
          text: 'The alert has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      } else {
        MySwal.close();
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Compliance Alerts</h4>
                <h6>Manage and review compliance alerts</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Link>
                    <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="PDF icon" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                  <Link>
                    <ImageWithBasePath src="assets/img/icons/excel.svg" alt="Excel icon" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
                  <Link>
                    <i data-feather="printer" className="feather-printer" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link>
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => dispatch(setToogleHeader(!data))}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-alert"
              >
                <PlusCircle className="me-2" />
                Add New Alert
              </Link>
            </div>
          </div>
          {/* /compliance alert list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-top">
                <div className="search-set">
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search by Account ID or Description"
                      className="form-control form-control-sm formsearch"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search by Account ID or Description"
                    />
                    <Link to="#" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                </div>
                <div className="search-path">
                  <Link
                    className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
                    id="filter_search"
                    onClick={toggleFilterVisibility}
                  >
                    <Filter className="filter-icon" />
                    <span>
                      <ImageWithBasePath src="assets/img/icons/closes.svg" alt="toggle filter" />
                    </span>
                  </Link>
                </div>
                <div className="form-sort">
                  <Sliders className="info-img" />
                  <Select
                    className="select"
                    options={sortOptions}
                    placeholder="Newest"
                  />
                </div>
              </div>

              {/* Filters Panel */}
              <div
                className={`card${isFilterVisible ? ' visible' : ''}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? 'block' : 'none' }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Zap className="info-img" />
                        <Select
                          className="select"
                          options={alertTypeOptions}
                          placeholder="Choose Alert Type"
                          value={selectedAlertType}
                          onChange={setSelectedAlertType}
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <div className="input-groupicon">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="filterdatepicker"
                            placeholder="Choose Date"
                            allowClear
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />
                        <Select
                          className="select"
                          options={severityStatus}
                          placeholder="Choose Severity"
                          value={selectedSeverity}
                          onChange={setSelectedSeverity}
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                      <div className="input-blocks">
                        <Link className="btn btn-filters ms-auto" to="#">
                          <i data-feather="search" className="feather-search" /> Search
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /compliance alert list */}
        </div>
      </div>
      
     
    </div>
  );
};

export default ComplianceAlertList;
