import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { TimePicker } from 'antd';
import Switch from 'react-switch';

const AccessRights = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const users = [
        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'employee', label: 'Employee' }
    ];

    const modules = [
        { label: 'Dashboards', value: 'dashboards' },
        { label: 'Transfers', value: 'transfers' },
        { label: 'Payroll', value: 'payroll' },
        { label: 'Inventory', value: 'inventory' },
    ];

    const geolocationOptions = [
        { value: 'enabled', label: 'Enabled' },
        { value: 'disabled', label: 'Disabled' }
    ];

    const [formState, setFormState] = useState({
        user: null,
        modules: [],
        dailyLimit: '',
        perTransactionLimit: '',
        ipRanges: '',
        accessSchedule: null,
        geolocation: null,
        accessEnabled: false,
        auditTrail: false,
        remarks: ''
    });

    const handleInputChange = (field, value) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="row">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Company Access Rights</h4>
                            <h6>Assign system access rights</h6>
                        </div>
                    </div>
                    <ul className="table-top-head">
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Collapse</Tooltip>}>
                                <Link
                                    id="collapse-header"
                                    className={data ? 'active' : ''}
                                    onClick={() => dispatch(setToogleHeader(!data))}
                                >
                                    <ChevronUp />
                                </Link>
                            </OverlayTrigger>
                        </li>
                    </ul>
                </div>

                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>User/Group</label>
                                    <Select options={users} onChange={(option) => handleInputChange('user', option)} />
                                </div>
                                <div className="col-lg-8">
                                    <label>Access Modules</label>
                                    {modules.map((mod) => (
                                        <div key={mod.value}>
                                            <input
                                                type="checkbox"
                                                id={mod.value}
                                                checked={formState.modules.includes(mod.value)}
                                                onChange={() => {
                                                    const mods = [...formState.modules];
                                                    if (mods.includes(mod.value)) {
                                                        handleInputChange('modules', mods.filter((m) => m !== mod.value));
                                                    } else {
                                                        mods.push(mod.value);
                                                        handleInputChange('modules', mods);
                                                    }
                                                }}
                                            />
                                            <label htmlFor={mod.value}>{mod.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-4">
                                    <label>Transaction Limit (Daily)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formState.dailyLimit}
                                        onChange={(e) => handleInputChange('dailyLimit', e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label>Per Transaction Limit</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formState.perTransactionLimit}
                                        onChange={(e) => handleInputChange('perTransactionLimit', e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label>Allowed IP Ranges (CIDR)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="192.168.1.0/24"
                                        value={formState.ipRanges}
                                        onChange={(e) => handleInputChange('ipRanges', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-4">
                                    <label>Access Schedule</label>
                                    <TimePicker.RangePicker
                                        format="HH:mm"
                                        onChange={(value) => handleInputChange('accessSchedule', value)}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label>Geolocation Restriction</label>
                                    <Select
                                        options={geolocationOptions}
                                        onChange={(option) => handleInputChange('geolocation', option)}
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <label>Enable Access</label>
                                    <div>
                                        <Switch
                                            checked={formState.accessEnabled}
                                            onChange={(checked) => handleInputChange('accessEnabled', checked)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <label>Audit Trail Required</label>
                                    <div>
                                        <Switch
                                            checked={formState.auditTrail}
                                            onChange={(checked) => handleInputChange('auditTrail', checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <label>Remarks</label>
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        placeholder="Notes on access rights"
                                        value={formState.remarks}
                                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-submit me-2">
                                        Save Access Rights
                                    </button>
                                    <button type="button" className="btn btn-cancel">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessRights;
