import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingSummary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    accountData: {},
    users: [],
    profile: {},
    signatories: [],
  });

  useEffect(() => {
    const step1 = JSON.parse(sessionStorage.getItem("onboardingStep1") || "{}");
    const profile = JSON.parse(sessionStorage.getItem("onboardingProfile") || "{}");
    const signatories = JSON.parse(sessionStorage.getItem("onboardingSignatories") || "[]");

    setSummary({
      accountData: step1.accountData || {},
      users: step1.users || [],
      profile,
      signatories,
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summary),
      });

      if (!res.ok) throw new Error("Submission failed");

      alert("✅ Onboarding completed successfully!");
      sessionStorage.clear();
      navigate("/dashboard");
    } catch (error) {
      alert("🚫 Submission error: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📋 Confirm Onboarding Summary</h3>

      {/* Account Info */}
      <div className="card mt-3">
        <div className="card-header">🏦 Account Lookup Details</div>
        <div className="card-body">
          {Object.entries(summary.accountData).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {String(value)}</p>
          ))}
        </div>
      </div>

      {/* Profile Info */}
      <div className="card mt-3">
        <div className="card-header">👤 Profile Information</div>
        <div className="card-body">
          {Object.entries(summary.profile).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {String(value)}</p>
          ))}
        </div>
      </div>

      {/* Signatories */}
      <div className="card mt-3">
        <div className="card-header">✍️ Company Signatories</div>
        <div className="card-body">
          {summary.signatories.length === 0 ? (
            <p>No signatories added.</p>
          ) : (
            summary.signatories.map((s, i) => (
              <div key={i}>
                <h6>Signatory {i + 1}</h6>
                {Object.entries(s).map(([k, v]) => (
                  <p key={k}><strong>{k}:</strong> {String(v)}</p>
                ))}
                <hr />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Directors / Users */}
      <div className="card mt-3">
        <div className="card-header">👥 Onboarded Directors</div>
        <div className="card-body">
          {summary.users.length === 0 ? (
            <p>No directors added.</p>
          ) : (
            summary.users.map((u, i) => (
              <div key={i}>
                <h6>Director {i + 1}</h6>
                <p><strong>Name:</strong> {u.full_name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Phone:</strong> {u.phone}</p>
                <p><strong>Role:</strong> {u.role}</p>
                <hr />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="text-end mt-4">
        <button className="btn btn-success" onClick={handleSubmit}>
          ✅ Submit All
        </button>
      </div>
    </div>
  );
};

export default OnboardingSummary;
