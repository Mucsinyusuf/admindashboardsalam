import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { DatePicker } from "antd";
import { Calendar } from "feather-icons-react/build/IconComponents";

const CompanyKYCDocuments = () => {
  const navigate = useNavigate();

  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [lastVerifiedDate, setLastVerifiedDate] = useState(null);
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [remarks, setRemarks] = useState("");

  const [documentType, setDocumentType] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [verifiedBy, setVerifiedBy] = useState(null);
  const [complianceCategory, setComplianceCategory] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [accountData, setAccountData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("onboardingData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCompanyName(parsed.accountData?.account_name || "");
      setAccountData(parsed.accountData);
      setUsers(parsed.users || []);
    }
  }, []);

  const documentTypes = [
    { value: "cert_of_incorp", label: "Certificate of Incorporation" },
    { value: "cr12", label: "CR12" },
    { value: "tax_cert", label: "Tax Certificate" },
  ];

  const verificationStatuses = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const complianceCategories = [
    { value: "basic", label: "Basic" },
    { value: "enhanced", label: "Enhanced" },
  ];

  const complianceOfficers = [
    { value: "john_doe", label: "John Doe" },
    { value: "jane_smith", label: "Jane Smith" },
  ];

  const handleNext = (e) => {
    e.preventDefault();

    const step2Data = {
      documentType,
      issuingAuthority,
      issueDate,
      expiryDate,
      verificationStatus,
      verifiedBy,
      lastVerifiedDate,
      complianceCategory,
      remarks,
    };

    const fullOnboardingData = {
      accountData,
      users,
      kycDocuments: step2Data,
    };

    sessionStorage.setItem("onboardingData", JSON.stringify(fullOnboardingData));
    navigate("/company-user-mapping");
  };

  const handleCancel = () => {
    navigate("/account-lookup");
  };

  return (
    <div className="row">
      <div className="content">
        <div className="page-header">
          <h4>Step 2: Company KYC Documents</h4>
          <h6>
            Upload and verify KYC compliance for{" "}
            <strong>{companyName}</strong>
          </h6>
        </div>

        <form onSubmit={handleNext}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                {/* Document Type */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Document Type</label>
                  <Select
                    options={documentTypes}
                    value={documentType}
                    onChange={setDocumentType}
                    placeholder="Choose"
                  />
                </div>

                {/* Issuing Authority */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Issuing Authority</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Registrar, KRA, etc."
                    value={issuingAuthority}
                    onChange={(e) => setIssuingAuthority(e.target.value)}
                  />
                </div>

                {/* File Upload */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Upload Document</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="form-control"
                  />
                </div>

                {/* Issue Date */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Issue Date</label>
                  <div className="input-groupicon calender-input">
                    <Calendar className="info-img" />
                    <DatePicker
                      onChange={setIssueDate}
                      className="datetimepicker w-100"
                      placeholder="Choose date"
                      value={issueDate}
                    />
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Expiry Date</label>
                  <div className="input-groupicon calender-input">
                    <Calendar className="info-img" />
                    <DatePicker
                      onChange={setExpiryDate}
                      className="datetimepicker w-100"
                      placeholder="Choose date"
                      value={expiryDate}
                    />
                  </div>
                </div>

                {/* Verification Status */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Verification Status</label>
                  <Select
                    options={verificationStatuses}
                    value={verificationStatus}
                    onChange={setVerificationStatus}
                    placeholder="Choose"
                  />
                </div>

                {/* Verified By */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Verified By</label>
                  <Select
                    options={complianceOfficers}
                    value={verifiedBy}
                    onChange={setVerifiedBy}
                    placeholder="Compliance Officer"
                  />
                </div>

                {/* Last Verified Date */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Last Verified Date</label>
                  <div className="input-groupicon calender-input">
                    <Calendar className="info-img" />
                    <DatePicker
                      onChange={setLastVerifiedDate}
                      className="datetimepicker w-100"
                      placeholder="Choose date"
                      value={lastVerifiedDate}
                    />
                  </div>
                </div>

                {/* Compliance Category */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Compliance Category</label>
                  <Select
                    options={complianceCategories}
                    value={complianceCategory}
                    onChange={setComplianceCategory}
                    placeholder="Choose"
                  />
                </div>

                {/* Remarks */}
                <div className="col-lg-12 mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Notes on verification..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Next: Company User Mapping →
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyKYCDocuments;
