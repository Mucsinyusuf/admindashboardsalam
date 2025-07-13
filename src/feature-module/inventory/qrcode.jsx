import React, { useState } from 'react'
import Select from 'react-select'

const CompanySignatories = () => {
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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData({ ...formData, [name]: selectedOption.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Company Signatories</h4>
                        <h6>Manage authorized company signatories</h6>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
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
                            <div className="form-group">
                                <label>Signature Upload</label>
                                <input type="file" name="signatureFile" className="form-control" onChange={handleChange} />
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
                    <button type="submit" className="btn btn-submit mt-3">Save Signatory</button>
                </form>
            </div>
        </div>
    );
};

export default CompanySignatories;
