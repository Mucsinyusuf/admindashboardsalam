import React, { useState } from 'react';
import Select from 'react-select';

const GeoRestrictions = () => {
    const [username, setUsername] = useState('');
    const [allowedIps, setAllowedIps] = useState('');
    const [allowedCountries, setAllowedCountries] = useState([]);
    const [deviceBinding, setDeviceBinding] = useState(false);
    const [lastKnownIp] = useState('192.168.1.100'); // Mock data
    const [lastDeviceInfo] = useState('Chrome on Windows 10'); // Mock data

    const countries = [
        { value: 'US', label: 'United States' },
        { value: 'KE', label: 'Kenya' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'SO', label: 'Somalia' },
        { value: 'UG', label: 'Uganda' },
        // Add more as needed
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            allowedIps,
            allowedCountries: allowedCountries.map(c => c.value),
            deviceBinding,
        };
        console.log('Submitted Data:', data);
        alert('Geo/IP restriction settings saved.');
    };

    return (
       <div className="row">
            <h3>Geo/IP Restrictions</h3>
            <p>Configure access restrictions based on IP, location, and device</p>

            <form onSubmit={handleSubmit} className="mt-4">
                {/* Username */}
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

                {/* Allowed IPs/Subnets */}
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Allowed IPs/Subnets</label>
                    <div className="col-sm-6">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={allowedIps}
                            onChange={(e) => setAllowedIps(e.target.value)}
                            placeholder="e.g., 192.168.1.0/24, 10.0.0.1"
                        />
                        <small className="form-text text-muted">
                            Separate multiple IPs/subnets with commas.
                        </small>
                    </div>
                </div>

                {/* Allowed Countries */}
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Allowed Countries</label>
                    <div className="col-sm-6">
                        <Select
                            isMulti
                            options={countries}
                            value={allowedCountries}
                            onChange={setAllowedCountries}
                            className="select"
                            placeholder="Select allowed countries"
                        />
                    </div>
                </div>

                {/* Device Binding */}
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Device Binding</label>
                    <div className="col-sm-6">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="deviceBindingSwitch"
                                checked={deviceBinding}
                                onChange={(e) => setDeviceBinding(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="deviceBindingSwitch">
                                {deviceBinding ? 'Enabled' : 'Disabled'}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Last Known IP */}
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Last Known IP</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            value={lastKnownIp}
                            readOnly
                        />
                    </div>
                </div>

                {/* Last Device Info */}
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Last Device Info</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            value={lastDeviceInfo}
                            readOnly
                        />
                    </div>
                </div>

                {/* Buttons */}
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

export default GeoRestrictions;
