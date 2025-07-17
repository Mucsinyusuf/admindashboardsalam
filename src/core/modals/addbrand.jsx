import React, { useState } from 'react';
import Select from 'react-select';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import { Link } from 'react-router-dom';

const AddUsers = () => {
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

  const departmentOptions = [
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'HR' },
    { value: 'Operations', label: 'Operations' },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div>
      <div className="modal fade" id="add-units">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{ maxWidth: '900px' }} // inline wider modal
        >
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add New User</h4>
                  </div>
                  <button type="button" className="close" data-bs-dismiss="modal">
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="new-employee-field">
                          <span>Avatar</span>
                          <div className="profile-pic-upload mb-2">
                            <div className="profile-pic">
                              <span>
                                <PlusCircle className="plus-down-add" /> Profile Photo
                              </span>
                            </div>
                            <div className="input-blocks mb-0">
                              <div className="image-upload mb-0">
                                <input type="file" />
                                <div className="image-uploads">
                                  <h4>Change Image</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6"><div className="input-blocks"><label>Full Name</label><input type="text" className="form-control" /></div></div>
                      <div className="col-lg-6"><div className="input-blocks"><label>Username</label><input type="text" className="form-control" /></div></div>
                      <div className="col-lg-6"><div className="input-blocks"><label>Email</label><input type="email" className="form-control" /></div></div>
                      <div className="col-lg-6"><div className="input-blocks"><label>Phone Number</label><input type="text" className="form-control" /></div></div>
                      <div className="col-lg-6"><div className="input-blocks"><label>User Role</label><Select className="select" options={roleOptions} placeholder="Select Role" /></div></div>
                      <div className="col-lg-6"><div className="input-blocks"><label>Account Status</label><Select className="select" options={statusOptions} placeholder="Select Status" /></div></div>
                      <div className="col-lg-6"><div className="input-blocks"><label>Company ID</label><input type="text" className="form-control" /></div></div>
                      <div className="col-lg-6"><div className="input-blocks"><label>Departments/Branches</label><Select isMulti className="select" options={departmentOptions} placeholder="Assign Departments" /></div></div>

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Password</label>
                          <div className="pass-group">
                            <input type={showPassword ? 'text' : 'password'} className="pass-input" />
                            <span className={`fas toggle-password ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={togglePassword}></span>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Confirm Password</label>
                          <div className="pass-group">
                            <input type={showConfirmPassword ? 'text' : 'password'} className="pass-input" />
                            <span className={`fas toggle-password ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleConfirmPassword}></span>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Last Login</label>
                          <input type="text" className="form-control" value={new Date().toLocaleString()} readOnly />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Descriptions</label>
                          <textarea className="form-control" placeholder="Type Message" maxLength={600}></textarea>
                          <p>Maximum 600 Characters</p>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer-btn mt-3">
                      <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">Cancel</button>
                      <Link to="#" className="btn btn-submit">Submit</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
