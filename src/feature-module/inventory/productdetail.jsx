import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker, Switch } from "antd";
import Select from "react-select";
import dayjs from "dayjs";

const ProfileManagement = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    contactPhone: "",
    primaryContact: "",
    riskProfile: "",
    address: "",
    branch: "",
    isActive: true,
    linkedAccounts: "",
    lastUpdated: dayjs(),
    language: "",
    remarks: ""
  });

  const riskProfiles = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const branches = [
    { value: "nairobi-branch", label: "Nairobi Branch" },
    { value: "mombasa-branch", label: "Mombasa Branch" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "so", label: "Somali" },
  ];

  useEffect(() => {
    const stored = sessionStorage.getItem("onboardingStep1");
    if (stored) {
      const { accountData } = JSON.parse(stored);
      const details = accountData.details || {};

      const fullAddress = [
        details.address_1,
        details.address_2,
        details.address_3,
        details.address_4,
      ]
        .filter(Boolean)
        .join(", ");

      const linkedAccounts = [accountData.account_number].filter(Boolean).join(", ");

      setFormData((prev) => ({
        ...prev,
        companyName: accountData.account_name || "",
        contactPhone: details.phone || "",
        address: fullAddress,
        branch: accountData.brn || "",
        contactEmail: details.email || "",
        linkedAccounts: linkedAccounts,
        primaryContact: (accountData.directors || [])[0] || "", // default to first director
      }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    sessionStorage.setItem("onboardingStep5", JSON.stringify(formData));
    navigate("/companysignatories");
  };

  const handleBack = () => {
    navigate("/onboarding/company-access-rights");
  };

  return (
    <div className="row">
      <div className="content">
        <div className="page-header mb-4">
          <div className="page-title">
            <h4>Profile Management</h4>
            <h6>Manage company profile information</h6>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <form>
                  <div className="row g-3">
                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.companyName}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Contact Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Contact Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Primary Contact Person</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.primaryContact}
                          onChange={(e) => handleInputChange("primaryContact", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Risk Profile</label>
                        <Select
                          options={riskProfiles}
                          placeholder="Select Risk Profile"
                          value={riskProfiles.find((r) => r.value === formData.riskProfile)}
                          onChange={(option) => handleInputChange("riskProfile", option.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Registered Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Branch Affiliation</label>
                        <Select
                          options={branches}
                          value={branches.find((b) => b.value === formData.branch)}
                          onChange={(option) => handleInputChange("branch", option.value)}
                          placeholder="Select Branch"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks d-flex justify-content-between align-items-center">
                        <label>Active Status</label>
                        <Switch
                          checked={formData.isActive}
                          onChange={(checked) => handleInputChange("isActive", checked)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Linked Bank Accounts</label>
                        <textarea
                          className="form-control"
                          rows={2}
                          value={formData.linkedAccounts}
                          onChange={(e) => handleInputChange("linkedAccounts", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Date of Last Update</label>
                        <DatePicker
                          className="form-control w-100"
                          format="DD-MM-YYYY"
                          value={formData.lastUpdated}
                          onChange={(date) => handleInputChange("lastUpdated", date)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Preferred Language</label>
                        <Select
                          options={languages}
                          placeholder="Select Language"
                          value={languages.find((l) => l.value === formData.language)}
                          onChange={(option) => handleInputChange("language", option.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Remarks</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={formData.remarks}
                          onChange={(e) => handleInputChange("remarks", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleNext}
                    >
                      Next: Company Signatories
                    </button>
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
