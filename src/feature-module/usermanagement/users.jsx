import React, { useState } from 'react';
import { Filter, Sliders, MoreVertical } from 'react-feather';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
 
import Table from '../../core/pagination/datatable';
import AddUsers from '../../core/modals/usermanagement/addusers';
import EditUser from '../../core/modals/usermanagement/edituser';
 
const Users = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
 
  const MySwal = withReactContent(Swal);
 
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };
 
  const handleDelete = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00ff00',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  };
 
  const dummyUsers = [
    {
      fullname: 'John Doe',
      username: 'jdoe',
      email: 'jdoe@example.com',
      phone: '1234567890',
      role: 'Admin',
      status: 'Active',
      companyId: 'C001',
      departments: ['Finance', 'HR'],
      lastLogin: '2025-07-18 09:15',
    },
    {
      fullname: 'Jane Smith',
      username: 'jsmith',
      email: 'jsmith@example.com',
      phone: '9876543210',
      role: 'Checker',
      status: 'Suspended',
      companyId: 'C002',
      departments: ['Operations'],
      lastLogin: '2025-07-17 16:30',
    },
    {
      fullname: 'Ali Khan',
      username: 'akhan',
      email: 'ali.khan@example.com',
      phone: '1112223333',
      role: 'Maker',
      status: 'Locked',
      companyId: 'C003',
      departments: ['HR'],
      lastLogin: '2025-07-16 10:45',
    },
    {
      fullname: 'Mary Wambui',
      username: 'mwambui',
      email: 'mary.w@example.com',
      phone: '0712345678',
      role: 'Viewer',
      status: 'Active',
      companyId: 'C004',
      departments: ['Finance'],
      lastLogin: '2025-07-15 12:00',
    },
    {
      fullname: 'David Otieno',
      username: 'dotieno',
      email: 'david.o@example.com',
      phone: '0789123456',
      role: 'Admin',
      status: 'Suspended',
      companyId: 'C005',
      departments: ['Operations', 'HR'],
      lastLogin: '2025-07-14 08:30',
    },
    {
      fullname: 'Aisha Abdi',
      username: 'aabdi',
      email: 'aisha.a@example.com',
      phone: '0700111222',
      role: 'Checker',
      status: 'Active',
      companyId: 'C006',
      departments: ['Finance'],
      lastLogin: '2025-07-13 18:20',
    },
    {
      fullname: 'Brian Kimani',
      username: 'bkimani',
      email: 'brian.k@example.com',
      phone: '0799001122',
      role: 'Maker',
      status: 'Locked',
      companyId: 'C007',
      departments: ['Operations'],
      lastLogin: '2025-07-12 14:55',
    },
    {
      fullname: 'Fatma Said',
      username: 'fsaid',
      email: 'fatma.s@example.com',
      phone: '0755123456',
      role: 'Viewer',
      status: 'Active',
      companyId: 'C008',
      departments: ['HR', 'Finance'],
      lastLogin: '2025-07-11 11:00',
    },
    {
      fullname: 'Samuel Njoroge',
      username: 'snjoroge',
      email: 'samuel.n@example.com',
      phone: '0711999888',
      role: 'Checker',
      status: 'Active',
      companyId: 'C009',
      departments: ['Operations'],
      lastLogin: '2025-07-10 17:15',
    },
    {
      fullname: 'Grace Muthoni',
      username: 'gmuthoni',
      email: 'grace.m@example.com',
      phone: '0700554433',
      role: 'Admin',
      status: 'Suspended',
      companyId: 'C010',
      departments: ['Finance', 'HR'],
      lastLogin: '2025-07-09 13:45',
    },
  ];
 
  const filteredUsers = dummyUsers.filter((user) =>
    [user.fullname, user.username, user.email, user.phone]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
 
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <span className={`badge ${status === 'Active' ? 'badge-linesuccess' : 'badge-linedanger'}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Company ID',
      dataIndex: 'companyId',
    },
    {
      title: 'Departments',
      dataIndex: 'departments',
      render: (depts) => depts?.join(', '),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
    },
    {
      title: 'Actions',
      render: (_, user) => (
        <div className="dropdown action-dropdown">
          <button className="btn btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
            <MoreVertical />
          </button>
          <ul className="dropdown-menu">
            <li><Link to="#" className="dropdown-item">View</Link></li>
            <li><button className="dropdown-item" onClick={() => handleEdit(user)}>Edit</button></li>
            <li><button className="dropdown-item text-danger" onClick={handleDelete}>Delete</button></li>
          </ul>
        </div>
      ),
    },
  ];
 
  return (
    <div className="row">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <div>
            <h4>Manage Users</h4>
            <h6>View and control access</h6>
          </div>
         
        </div>
 
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top d-flex justify-content-between">
              <div className="search-input">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="form-control form-control-sm"
                />
              </div>
 
              <div className="d-flex align-items-center gap-2">
                <button className={`btn btn-filter ${isFilterVisible ? 'setclose' : ''}`} onClick={() => setIsFilterVisible(!isFilterVisible)}>
                  <Filter />
                </button>
                <div className="form-sort d-flex align-items-center">
                  <Sliders />
                  <Select
                    className="ms-2"
                    options={[
                      { value: 'date', label: 'Sort by Date' },
                      { value: 'newest', label: 'Newest' },
                      { value: 'oldest', label: 'Oldest' },
                    ]}
                    placeholder="Sort by"
                  />
                </div>
              </div>
            </div>
 
            {isFilterVisible && (
              <div className="card mt-3" id="filter_inputs">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3"><Select placeholder="User Role" /></div>
                    <div className="col-md-3"><Select placeholder="Status" /></div>
                    <div className="col-md-3"><Select isMulti placeholder="Departments" /></div>
                    <div className="col-md-3">
                      <button className="btn btn-filters w-100"><i className="feather-search" /> Search</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
 
            <div className="table-responsive mt-3">
              <Table columns={columns} dataSource={filteredUsers} />
            </div>
          </div>
        </div>
      </div>
 
      <AddUsers />
      {editModalVisible && (
        <EditUser
          show={editModalVisible}
          onHide={() => setEditModalVisible(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
};
 
export default Users;
 
 