import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

const RolesPermissions = () => {
  const accessScopeOptions = [
    { value: "global", label: "Global" },
    { value: "department", label: "Department" },
    { value: "branch", label: "Branch" },
  ];

  const userOptions = [
    { value: "user1", label: "User One" },
    { value: "user2", label: "User Two" },
    { value: "user3", label: "User Three" },
  ];

  return (
    <div className="row">
      <div className="page-title mb-4">
        <h4>Roles & Permission Setup (RBAC)</h4>
        <h6>Create and configure user roles</h6>
      </div>
      <form>
        <div className="row">
          {/* Role Name */}
          <div className="col-lg-6">
            <div className="input-blocks mb-3">
              <label>Role Name</label>
              <input type="text" className="form-control" placeholder="e.g. Admin" />
            </div>
          </div>

          {/* Access Scope */}
          <div className="col-lg-6">
            <div className="input-blocks mb-3">
              <label>Access Scope </label>
              <Select options={accessScopeOptions} placeholder="Choose Scope" />
            </div>
          </div>

          {/* Description */}
          <div className="col-lg-12">
            <div className="input-blocks mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Describe the role’s purpose"
              ></textarea>
            </div>
          </div>

          {/* Assign to Users */}
          <div className="col-lg-12">
            <div className="input-blocks mb-3">
              <label>Assign to User(s)</label>
              <Select isMulti options={userOptions} placeholder="Select users to assign" />
            </div>
          </div>

          {/* Permissions Matrix */}
          <div className="col-lg-12">
            <div className="input-blocks mb-3">
              <label>Permissions Matrix </label>
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

          {/* Modules Access Control */}
          <div className="col-lg-12">
            <div className="input-blocks mb-3">
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

          {/* Buttons */}
          <div className="col-lg-12">
            <div className="d-flex justify-content-end mt-3">
              <button type="button" className="btn btn-secondary me-2">
                Cancel
              </button>
              <Link to="#" className="btn btn-primary">
                Create Role
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RolesPermissions;
