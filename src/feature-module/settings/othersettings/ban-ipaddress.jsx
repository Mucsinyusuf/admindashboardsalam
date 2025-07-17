import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChevronUp, RotateCcw, Sliders } from 'feather-icons-react/build/IconComponents';
import { Filter } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { setToogleHeader } from '../../../core/redux/action';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserActivityLogs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activityType, setActivityType] = useState(null);
  const [ipFilter, setIpFilter] = useState('');

  const activityOptions = [
    { value: 'login', label: 'Login' },
    { value: 'approve', label: 'Approve' },
    { value: 'edit', label: 'Edit' },
    { value: 'create', label: 'Create' },
  ];

  const mockData = [
    {
      userId: '1001',
      username: 'user1',
      activity: 'Login',
      ip: '192.168.0.1',
      device: 'Windows 10, Chrome',
      timestamp: '2025-07-14T10:00:00',
    },
    {
      userId: '1002',
      username: 'user2',
      activity: 'Edit',
      ip: '192.168.0.2',
      device: 'MacBook, Safari',
      timestamp: '2025-07-13T16:23:00',
    },
    {
      userId: '1003',
      username: 'user3',
      activity: 'Create',
      ip: '10.0.0.1',
      device: 'Ubuntu, Firefox',
      timestamp: '2025-07-15T13:45:00',
    },
  ];

  // Toggle filter panel visibility
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => {
      console.log('Filter visibility toggled:', !prev);
      return !prev;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setActivityType(null);
    setStartDate(null);
    setEndDate(null);
    setIpFilter('');
    setIsFilterVisible(false);
  };

  // Filter data according to filters
  const filteredData = mockData.filter((log) => {
    const searchLower = searchTerm.toLowerCase();

    // Search by userId or username
    const matchesSearch =
      log.userId.toLowerCase().includes(searchLower) ||
      log.username.toLowerCase().includes(searchLower);

    // Activity filter
    const matchesActivity = activityType ? log.activity.toLowerCase() === activityType.value : true;

    // IP filter
    const matchesIP = ipFilter ? log.ip.includes(ipFilter) : true;

    // Date filter
    const logDate = new Date(log.timestamp);
    const matchesDate =
      (!startDate || logDate >= startDate) &&
      (!endDate || logDate <= endDate);

    return matchesSearch && matchesActivity && matchesIP && matchesDate;
  });

  // Tooltips
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh Filters
    </Tooltip>
  );

  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>
      Collapse Header
    </Tooltip>
  );

  return (
    <div className="content settings-content">
      <div className="page-header settings-pg-header">
        <div className="page-title">
          <h4>User Activity Logs</h4>
          <h6>Track user actions and audit logs</h6>
        </div>
        <ul className="table-top-head">
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={resetFilters}
                aria-label="Reset filters"
              >
                <RotateCcw />
              </button>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
              <button
                type="button"
                className={`btn btn-link p-0 ${data ? 'active' : ''}`}
                onClick={() => dispatch(setToogleHeader(!data))}
                aria-label="Toggle header"
              >
                <ChevronUp />
              </button>
            </OverlayTrigger>
          </li>
        </ul>
      </div>

      <div className="card table-list-card">
        <div className="card-body">
          <div className="table-top d-flex flex-wrap align-items-center gap-3">
            {/* Search Input */}
            <div className="search-input flex-grow-1" style={{ minWidth: '250px' }}>
              <input
                type="text"
                placeholder="Search by User ID or Username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control form-control-sm formsearch"
                aria-label="Search by User ID or Username"
              />
            </div>

            {/* Filter toggle */}
            <div className="search-path">
              <button
                type="button"
                className={`btn btn-filter ${isFilterVisible ? 'setclose' : ''}`}
                onClick={toggleFilterVisibility}
                aria-pressed={isFilterVisible}
                aria-label={isFilterVisible ? 'Close filters' : 'Open filters'}
              >
                <Filter className="filter-icon" />
                <span>
                  <ImageWithBasePath src="assets/img/icons/closes.svg" alt="Toggle filter icon" />
                </span>
              </button>
            </div>

            {/* Activity Type Dropdown */}
            <div className="form-sort" style={{ minWidth: '200px' }}>
              <Sliders className="info-img" />
              <Select
                options={activityOptions}
                placeholder="Activity Type"
                onChange={setActivityType}
                value={activityType}
                isClearable
                aria-label="Select activity type"
              />
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterVisible && (
            <div className="card visible mt-3" id="filter_inputs" style={{ display: 'block' }}>
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <label htmlFor="startDate">From</label>
                      <DatePicker
                        id="startDate"
                        selected={startDate}
                        onChange={setStartDate}
                        placeholderText="Start Date"
                        className="form-control"
                        maxDate={endDate || null}
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <label htmlFor="endDate">To</label>
                      <DatePicker
                        id="endDate"
                        selected={endDate}
                        onChange={setEndDate}
                        placeholderText="End Date"
                        className="form-control"
                        minDate={startDate || null}
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <label htmlFor="ipFilter">IP Address (Optional)</label>
                      <input
                        id="ipFilter"
                        type="text"
                        className="form-control"
                        placeholder="e.g. 192.168.0.1"
                        value={ipFilter}
                        onChange={(e) => setIpFilter(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="table-responsive mt-4">
            <table className="table datanew" role="table" aria-label="User Activity Logs">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Activity</th>
                  <th>IP Address</th>
                  <th>Device Info</th>
                  <th>Action Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No matching logs found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((log, idx) => (
                    <tr key={idx}>
                      <td>{log.userId}</td>
                      <td>{log.username}</td>
                      <td>{log.activity}</td>
                      <td>{log.ip}</td>
                      <td>{log.device}</td>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivityLogs;
