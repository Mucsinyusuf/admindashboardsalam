import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, PlusCircle, Sliders, StopCircle, User, Zap } from 'react-feather';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable';
import AddUsers from '../../core/modals/usermanagement/addusers';
import EditUser from '../../core/modals/usermanagement/edituser';

const Users = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const dataSource = useSelector((state) => state.userlist_data);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFilterVisibility = () => setIsFilterVisible(prev => !prev);

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#00ff00',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: '#ff0000',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      }
    });
  };

  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const roleOptions = [
    { value: 'Maker', label: 'Maker' },
    { value: 'Checker', label: 'Checker' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Viewer', label: 'Viewer' },
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Locked', label: 'Locked' },
  ];

  const departments = [
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'HR' },
    { value: 'Operations', label: 'Operations' },
  ];

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "User Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Account Status",
      dataIndex: "status",
      render: (text) => (
        <span className={`badge ${text === "Active" ? "badge-linesuccess" : "badge-linedanger"}`}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Company ID",
      dataIndex: "companyId",
    },
    {
      title: "Assigned Departments/Branches",
      dataIndex: "departments",
      render: (departments) => departments?.join(', '),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: () => (
        <div className="edit-delete-action">
          <Link className="me-2 p-2" to="#"><i data-feather="eye" className="feather-eye" /></Link>
          <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-units"><i data-feather="edit" className="feather-edit" /></Link>
          <Link className="confirm-text p-2" to="#"><i data-feather="trash-2" onClick={showConfirmationAlert} /></Link>
        </div>
      ),
    },
  ];

  // ✅ Filtered users based on search
  const filteredData = dataSource?.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.fullname?.toLowerCase().includes(term) ||
      user.username?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="row">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Manage Users</h4>
              <h6>View and control access</h6>
            </div>
          </div>

          <ul className="table-top-head">
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
            <a to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-units">
              <PlusCircle className="me-2" />
              Add New User
            </a>
          </div>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                  />
                  <Link to="#" className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>

              <div className="search-path">
                <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}>
                  <Filter className="filter-icon" onClick={toggleFilterVisibility} />
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                  </span>
                </Link>
              </div>

              <div className="form-sort">
                <Sliders className="info-img" />
                <Select className="select" options={oldandlatestvalue} placeholder="Sort by" />
              </div>
            </div>

            {isFilterVisible && (
              <div className="card" id="filter_inputs">
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <User className="info-img" />
                        <Select className="select" options={roleOptions} placeholder="User Role" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />
                        <Select className="select" options={statusOptions} placeholder="Account Status" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Zap className="info-img" />
                        <Select className="select" isMulti options={departments} placeholder="Departments/Branches" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <a className="btn btn-filters ms-auto">
                          <i data-feather="search" className="feather-search" /> Search
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="table-responsive">
              <Table columns={columns} dataSource={filteredData} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUsers />
      <EditUser />
    </div>
  );
};

export default Users;
