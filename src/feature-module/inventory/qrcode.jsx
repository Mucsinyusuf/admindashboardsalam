import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '../../context/AuthContext';

const CompanySignatories = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    idNumber: '',
    email: '',
    mobile: '',
    linkedUser: '',
    signatureFile: null,
    signingLimit: '',
    signingLevel: '',
    signingMandate: '',
    verificationStatus: '',
    remarks: '',
  });

  const [signaturePreview, setSignaturePreview] = useState(null);

  const signingLevels = [
    { value: 'level1', label: 'Level 1' },
    { value: 'level2', label: 'Level 2' },
    { value: 'level3', label: 'Level 3' },
  ];

  const signingMandates = [
    { value: 'any1', label: 'Any 1' },
    { value: 'any2of3', label: 'Any 2 of 3' },
    { value: 'all', label: 'All' },
  ];

  const verificationStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
  ];

  // Auto-fill from session user mapping
  useEffect(() => {
    const userMapping = JSON.parse(sessionStorage.getItem('onboardingStep3') || '{}');
    if (userMapping && userMapping.users && Array.isArray(userMapping.users) && userMapping.users.length > 0) {
      const firstUser = userMapping.users[0]; // optionally allow choosing user later
      setFormData(prev => ({
        ...prev,
        fullName: firstUser.fullName || '',
        email: firstUser.email || '',
        mobile: firstUser.mobile || '',
        designation: firstUser.designation || '',
        linkedUser: firstUser.username || '',
      }));
    }

    // Load previously saved state
    const step6 = JSON.parse(sessionStorage.getItem('onboardingStep6') || '{}');
    if (step6 && Object.keys(step6).length > 0) {
      setFormData(prev => ({ ...prev, ...step6 }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));

      // Preview signature image
      const reader = new FileReader();
      reader.onloadend = () => setSignaturePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const step1 = JSON.parse(sessionStorage.getItem('onboardingStep1') || '{}');
    const step2 = JSON.parse(sessionStorage.getItem('onboardingStep2') || '{}');
    const step3 = JSON.parse(sessionStorage.getItem('onboardingStep3') || '{}');
    const step4 = JSON.parse(sessionStorage.getItem('onboardingStep4') || '{}');
    const step5 = JSON.parse(sessionStorage.getItem('onboardingStep5') || '{}');

    const finalPayload = {
      accountLookup: step1,
      kycDocuments: step2,
      userMapping: step3,
      accessRights: step4,
      profile: step5,
      signatory: formData,
    };

    try {
      const res = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalPayload),
      });

      if (!res.ok) throw new Error('Submission failed');

      await MySwal.fire({
        icon: 'success',
        title: 'Onboarding Completed',
        text: 'Client has been onboarded successfully.',
      });

      // Clear onboarding data
      for (let i = 1; i <= 6; i++) sessionStorage.removeItem(`onboardingStep${i}`);

      navigate('/onboarding-summary');
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong while submitting onboarding details.',
      });
    }
  };

  useEffect(() => {
    sessionStorage.setItem('onboardingStep6', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="row">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Company Signatories</h4>
            <h6>Step 6: Manage authorized company signatories and submit onboarding</h6>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              {/* Left side fields */}
              <div className="form-group">
                <label>Signatory Full Name</label>
                <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>National ID / Passport No</label>
                <input type="text" name="idNumber" className="form-control" value={formData.idNumber} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Linked User Profile</label>
                <input type="text" name="linkedUser" className="form-control" value={formData.linkedUser} onChange={handleChange} />
              </div>
            </div>
            <div className="col-md-6">
              {/* Right side fields */}
              <div className="form-group">
                <label>Signature Upload</label>
                <input type="file" name="signatureFile" className="form-control" onChange={handleChange} />
                {signaturePreview && (
                  <img src={signaturePreview} alt="Signature Preview" style={{ marginTop: 10, maxWidth: '100%', height: 'auto' }} />
                )}
              </div>
              <div className="form-group">
                <label>Signing Limit (Amount)</label>
                <input type="number" name="signingLimit" className="form-control" value={formData.signingLimit} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Signing Level</label>
                <Select options={signingLevels} onChange={(selected) => handleSelectChange('signingLevel', selected)} />
              </div>
              <div className="form-group">
                <label>Signing Mandate</label>
                <Select options={signingMandates} onChange={(selected) => handleSelectChange('signingMandate', selected)} />
              </div>
              <div className="form-group">
                <label>Verification Status</label>
                <Select options={verificationStatuses} onChange={(selected) => handleSelectChange('verificationStatus', selected)} />
              </div>
              <div className="form-group">
                <label>Remarks</label>
                <textarea name="remarks" className="form-control" value={formData.remarks} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>

          <div className="text-end mt-4">
            <button type="submit" className="btn btn-success">
              Submit Onboarding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySignatories;
