import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const AccountLookupStep = () => {
  const { token } = useAuth();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState({ details: {} });
  const [users, setUsers] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [searchError, setSearchError] = useState("");
  console.log(MySwal);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/admin/roles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const formatted = data.map((r) => ({
          id: r.id,
          label: r.description || r.name,
        }));
        setRolesList(formatted);
      } catch (err) {
        console.error("Failed to load roles", err);
      }
    };
    fetchRoles();
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError("");
    setLoading(true);
    setAccountData({ details: {} });
    setUsers([]);

    try {
      const res = await fetch("/api/onboarding/account-lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ branch, account_number: accountNumber }),
      });

      if (!res.ok) throw new Error("Lookup failed");

      const data = await res.json();
      if (!data || !data.account_number) {
        setSearchError("Account not found.");
        return;
      }

      setAccountData(data);
      const directors = data.directors || [];
      const preparedUsers = directors.map((name) => ({
        full_name: name,
        username: "",
        password: "",
        phone: "",
        email: "",
        daily_limit: "",
        role: "",
        role_id: "",
      }));
      setUsers(preparedUsers);
    } catch (err) {
      setSearchError("Something went wrong. Check details or connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };

  const handleNext = () => {
    // Store form state in sessionStorage
    sessionStorage.setItem(
      "onboardingStep1",
      JSON.stringify({ accountData, users })
    );

    navigate("/company-KYC");
  };

  return (
    <div className="row">
      <div className="page-header mb-4">
        <h4>Corporate Onboarding</h4>
        <h6>Step 1: Account Look Up and Onboard Directors</h6>
      </div>

      <form className="row mb-3" onSubmit={handleSearch}>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {searchError && <div className="alert alert-danger">{searchError}</div>}

      {/* Account Details */}
      <div className="card mb-4">
        <div className="card-header">Account Details</div>
        <div className="card-body">
          <div className="row g-3">
            {[
              { label: "Account Number", value: accountData.account_number },
              { label: "Account Name", value: accountData.account_name },
              { label: "Customer No", value: accountData.custno },
              { label: "Branch", value: accountData.brn },
              { label: "Customer", value: accountData.details?.cust_name },
              { label: "Owners", value: (accountData.owners || []).join(", ") },
              { label: "Directors", value: (accountData.directors || []).join(", ") },
              {
                label: "Address",
                value: [
                  accountData.details?.address_1,
                  accountData.details?.address_2,
                  accountData.details?.address_3,
                  accountData.details?.address_4,
                ]
                  .filter(Boolean)
                  .join(", "),
              },
            ].map((field, i) => (
              <div className="col-md-6" key={i}>
                <label className="form-label">{field.label}</label>
                <input type="text" className="form-control" value={field.value || ""} readOnly />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Directors Table */}
      <div className="card">
        <div className="card-header">Onboard Directors</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <thead className="table-light">
                <tr>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Daily Limit</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No directors found. Search for an account.
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={user.full_name}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={user.username}
                          onChange={(e) => handleUserChange(idx, "username", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="password"
                          className="form-control form-control-sm"
                          value={user.password}
                          onChange={(e) => handleUserChange(idx, "password", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={user.phone}
                          onChange={(e) => handleUserChange(idx, "phone", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          value={user.email}
                          onChange={(e) => handleUserChange(idx, "email", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={user.daily_limit}
                          onChange={(e) => handleUserChange(idx, "daily_limit", e.target.value)}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={user.role_id}
                          onChange={(e) => {
                            const id = e.target.value;
                            const role = rolesList.find((r) => String(r.id) === id);
                            handleUserChange(idx, "role_id", id);
                            handleUserChange(idx, "role", role?.label || "");
                          }}
                        >
                          <option value="">Select Role</option>
                          {rolesList.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="text-end">
            <button
              className="btn btn-primary mt-3"
              onClick={handleNext}
              disabled={users.length === 0}
            >
              Next
            </button>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLookupStep;
