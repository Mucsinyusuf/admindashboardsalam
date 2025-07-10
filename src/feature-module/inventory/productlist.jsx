import React, { useState } from "react";

const CustomerOnboarding = () => {
  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [onboardingResult, setOnboardingResult] = useState(null);

  const rolesList = [
    { label: "Maker", id: 2 },
    { label: "Checker", id: 3 },
    { label: "Approver", id: 4 },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    setAccountData(null);
    setUsers([]);
    setOnboardingResult(null);

    try {
      const res = await fetch("/api/onboarding/account-lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X251bWJlciI6IiIsImJyYW5jaF9jb2RlIjoiIiwiY2lmIjoiIiwiZXhwIjoxNzUyMTM4OTQyLCJwaG9uZV9udW1iZXIiOiIyNTQ3NDUxOTI5MTMiLCJyb2xlX2lkIjpbMV0sInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiJ9.cqXeZrPXcVNsTrwkjBULPM8h40IPBGIYAEY5BckqUbM",
        },
        body: JSON.stringify({
          branch: branch,
          account_number: accountNumber,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`Server error (${res.status}):`, text);
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      setAccountData(data);

      const directors = data.directors || [];

      const usersFromDirectors = directors.map((name) => ({
        full_name: name,
        phone: "",
        email: "",
        username: "",
        password: "",
        daily_limit: "",
        role: "",
        role_id: "",
      }));

      setUsers(usersFromDirectors);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong. Please check the account number or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleSubmitOnboarding = async () => {
    try {
      const payload = {
        account_number: accountData.account_number,
        branch: accountData.brn,
        custno: accountData.custno,
        users: users.map((u) => ({
          full_name: u.full_name,
          phone: u.phone,
          email: u.email,
          username: u.username,
          password: u.password || "12345", // default if blank
          daily_limit: Number(u.daily_limit),
          role: u.role,
          role_ids: u.role_id ? [Number(u.role_id)] : [],
        })),
      };

      console.log("Submitting payload:", payload);

      const res = await fetch("/api/onboarding/add-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X251bWJlciI6IiIsImJyYW5jaF9jb2RlIjoiIiwiY2lmIjoiIiwiZXhwIjoxNzUyMTM4OTQyLCJwaG9uZV9udW1iZXIiOiIyNTQ3NDUxOTI5MTMiLCJyb2xlX2lkIjpbMV0sInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiJ9.cqXeZrPXcVNsTrwkjBULPM8h40IPBGIYAEY5BckqUbM",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error response:", data);
        setOnboardingResult({
          status: "error",
          message: data.message || "Onboarding failed",
          data: data.data || {},
        });
        return;
      }

      setOnboardingResult({
        status: "success",
        message: data.message || "Onboarding completed successfully",
        data: data.data || {},
      });

      alert("Onboarding saved successfully!");
    } catch (error) {
      console.error(error);
      setOnboardingResult({
        status: "error",
        message: "Failed to onboard users.",
        data: {},
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Customer Onboarding Lookup</h2>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Branch</label>
            <input
              type="text"
              className="form-control"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="e.g. 002"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-control"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 0020002442"
              required
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Searching...
                </>
              ) : (
                "Search Account"
              )}
            </button>
          </div>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {accountData && (
        <>
          <div className="card mt-4">
            <div className="card-body">
              <h5>Account Lookup Result</h5>
              <table className="table table-bordered mt-3">
                <tbody>
                  <tr>
                    <th>Account Number</th>
                    <td>{accountData.account_number}</td>
                  </tr>
                  <tr>
                    <th>Account Name</th>
                    <td>{accountData.account_name}</td>
                  </tr>
                  <tr>
                    <th>Customer No</th>
                    <td>{accountData.custno}</td>
                  </tr>
                  <tr>
                    <th>Branch</th>
                    <td>{accountData.brn}</td>
                  </tr>
                  <tr>
                    <th>Owners</th>
                    <td>{accountData.owners?.join(", ")}</td>
                  </tr>
                  <tr>
                    <th>Directors</th>
                    <td>{accountData.directors?.join(", ")}</td>
                  </tr>
                  <tr>
                    <th>Customer Name (Details)</th>
                    <td>{accountData.details?.cust_name}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>
                      {[
                        accountData.details?.address_1,
                        accountData.details?.address_2,
                        accountData.details?.address_3,
                        accountData.details?.address_4,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th>Account Status</th>
                    <td>{accountData.details?.accstat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h5>Onboard Users for this Account</h5>
              <table className="table table-bordered mt-3">
                <thead>
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
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          className="form-control"
                          value={user.full_name}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={user.username}
                          onChange={(e) =>
                            handleUserChange(idx, "username", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="password"
                          className="form-control"
                          value={user.password}
                          onChange={(e) =>
                            handleUserChange(idx, "password", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={user.phone}
                          onChange={(e) =>
                            handleUserChange(idx, "phone", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={user.email}
                          onChange={(e) =>
                            handleUserChange(idx, "email", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={user.daily_limit}
                          onChange={(e) =>
                            handleUserChange(idx, "daily_limit", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          value={user.role_id}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedRole = rolesList.find(
                              (r) => String(r.id) === selectedId
                            );
                            handleUserChange(idx, "role_id", selectedId);
                            handleUserChange(
                              idx,
                              "role",
                              selectedRole?.label || ""
                            );
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
                  ))}
                </tbody>
              </table>

              <button
                className="btn btn-success"
                onClick={handleSubmitOnboarding}
              >
                Submit Onboarding
              </button>

              {onboardingResult && (
                <div
                  className={`alert mt-4 ${
                    onboardingResult.status === "success"
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  <h5>{onboardingResult.message}</h5>

                  {onboardingResult.data?.success?.length > 0 && (
                    <div>
                      <h6>✅ Successfully onboarded:</h6>
                      <ul>
                        {onboardingResult.data.success.map((user, idx) => (
                          <li key={idx}>
                            {user.email} - {user.message || "Created"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {onboardingResult.data?.failed?.length > 0 && (
                    <div className="mt-2">
                      <h6>❌ Failed to onboard:</h6>
                      <ul>
                        {onboardingResult.data.failed.map((fail, idx) => (
                          <li key={idx}>
                            {fail.email} — {fail.reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerOnboarding;
