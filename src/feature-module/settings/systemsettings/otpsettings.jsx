import React, { useState } from 'react';
import Select from 'react-select';

const OtpSettings = () => {
    const otpMethods = [
        { value: 'SMS', label: 'SMS' },
        { value: 'Email', label: 'Email' },
        { value: 'AuthenticatorApp', label: 'Authenticator App' },
    ];

    const otpStatusOptions = [
        { value: 'enabled', label: 'Enabled' },
        { value: 'disabled', label: 'Disabled' },
    ];

    const [username, setUsername] = useState('');
    const [otpMethod, setOtpMethod] = useState(null);
    const [otpStatus, setOtpStatus] = useState(null);
    const [forceReReg, setForceReReg] = useState(false);
    const [lastOtpSent] = useState('2025-07-14 10:45:23');

    const handleResetChannel = () => {
        alert('OTP channel has been reset.');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle save logic
        console.log({
            username,
            otpMethod,
            otpStatus,
            forceReReg,
            lastOtpSent,
        });
    };

    return (
        <div className="row">
            <h3>OTP Management</h3>
            <p>Manage OTP configuration for a user</p>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">User ID or Username</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">OTP Method</label>
                    <div className="col-sm-6">
                        <Select
                            options={otpMethods}
                            value={otpMethod}
                            onChange={setOtpMethod}
                            className="select"
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">OTP Activation Status</label>
                    <div className="col-sm-6">
                        <Select
                            options={otpStatusOptions}
                            value={otpStatus}
                            onChange={setOtpStatus}
                            className="select"
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Force Re-registration</label>
                    <div className="col-sm-6">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={forceReReg}
                                onChange={(e) => setForceReReg(e.target.checked)}
                                id="forceReRegSwitch"
                            />
                            <label className="form-check-label" htmlFor="forceReRegSwitch">
                                {forceReReg ? 'Yes' : 'No'}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Last OTP Sent</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            value={lastOtpSent}
                            readOnly
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Reset OTP Channel</label>
                    <div className="col-sm-6">
                        <button
                            type="button"
                            className="btn  btn-secondary"
                            onClick={handleResetChannel}
                        >
                            Reset OTP Channel
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <button type="submit" className="btn btn-primary me-2">
                        Save Changes
                    </button>
                    <button type="button" className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OtpSettings;
