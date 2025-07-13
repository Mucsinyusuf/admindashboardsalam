import React from 'react';
import { DatePicker, Switch } from 'antd';
import Select from 'react-select';

const ProfileManagement = () => {
  const riskProfiles = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const branches = [
    { value: 'nairobi-branch', label: 'Nairobi Branch' },
    { value: 'mombasa-branch', label: 'Mombasa Branch' },
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'so', label: 'Somali' },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Profile Management</h4>
            <h6>Manage company profile information</h6>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Company Name</label>
                        <input type="text" className="form-control" value="ABC Ltd" readOnly />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Contact Email</label>
                        <input type="email" className="form-control" placeholder="contact@company.com" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Contact Number</label>
                        <input type="text" className="form-control" placeholder="+254..." />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Primary Contact Person</label>
                        <input type="text" className="form-control" placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Risk Profile</label>
                        <Select options={riskProfiles} placeholder="Select Risk Profile" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Registered Address</label>
                        <input type="text" className="form-control" placeholder="Address" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Branch Affiliation</label>
                        <Select options={branches} placeholder="Select Branch" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks d-flex justify-content-between align-items-center">
                        <label>Active Status</label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Linked Bank Accounts</label>
                        <textarea className="form-control" placeholder="A/C 123456789, A/C 987654321" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Date of Last Update</label>
                        <DatePicker className="form-control" format="DD-MM-YYYY" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Preferred Language</label>
                        <Select options={languages} placeholder="Select Language" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Remarks</label>
                        <textarea className="form-control" placeholder="Admin notes or update history..." />
                      </div>
                    </div>
                  </div>

                  <div className="text-end mt-3">
                    <button type="submit" className="btn btn-submit me-2">Save</button>
                    <button type="reset" className="btn btn-cancel">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Optional sidebar for image or status */}
          <div className="col-lg-4 col-sm-12">
            <div className="card">
              <div className="card-body text-center">
                <img src="assets/img/company/company-logo.png" alt="Company Logo" width={100} />
                <p className="mt-2">Company Logo</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileManagement;
