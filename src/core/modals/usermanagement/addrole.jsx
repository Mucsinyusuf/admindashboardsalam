import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const AddRole = () => {
  const accessScopeOptions = [
    { value: 'global', label: 'Global' },
    { value: 'department', label: 'Department' },
    { value: 'branch', label: 'Branch' },
  ];

  const userOptions = [
    { value: 'user1', label: 'User One' },
    { value: 'user2', label: 'User Two' },
    { value: 'user3', label: 'User Three' },
  ];

  return (
    <div>
      {/* Add Role */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Create Role</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Role Name</label>
                          <input type="text" className="form-control" placeholder="e.g. Admin" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Access Scope (Global / Department / Branch)</label>
                          <Select options={accessScopeOptions} placeholder="Choose Scope" />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Description</label>
                          <textarea
                            className="form-control"
                            rows="2"
                            placeholder="Describe the role’s purpose"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Assign to User(s)</label>
                          <Select
                            isMulti
                            options={userOptions}
                            placeholder="Select users to assign"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Permissions Matrix</label>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="viewUsers" />
                            <label className="form-check-label" htmlFor="viewUsers">
                              View Users
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="editUsers" />
                            <label className="form-check-label" htmlFor="editUsers">
                              Edit Users
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="deleteUsers" />
                            <label className="form-check-label" htmlFor="deleteUsers">
                              Delete Users
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Modules Access Control</label>
                          <div className="form-switch">
                            <input className="form-check-input" type="checkbox" id="dashboardModule" />
                            <label className="form-check-label" htmlFor="dashboardModule">
                              Enable Dashboard Module
                            </label>
                          </div>
                          <div className="form-switch">
                            <input className="form-check-input" type="checkbox" id="userMgmtModule" />
                            <label className="form-check-label" htmlFor="userMgmtModule">
                              Enable User Management
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <Link to="#" className="btn btn-submit">
                        Create Role
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Role */}
    </div>
  );
};

export default AddRole;
