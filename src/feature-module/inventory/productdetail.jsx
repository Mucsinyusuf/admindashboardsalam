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
        <div className="page-header mb-4">
          <div className="page-title">
            <h4>Profile Management</h4>
            <h6>Manage company profile information</h6>
          </div>
        </div>

        {/* Full width form */}
        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <form>
                  <div className="row g-3">
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
                        <textarea className="form-control" placeholder="A/C 123456789, A/C 987654321" rows={2} />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Date of Last Update</label>
                        <DatePicker className="form-control w-100" format="DD-MM-YYYY" />
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
                        <textarea className="form-control" placeholder="Admin notes or update history..." rows={3} />
                      </div>
                    </div>
                  </div>

                  <div className="text-end mt-4">
                    <button type="submit" className="btn btn-primary me-2">Save</button>
                    <button type="reset" className="btn btn-secondary">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
