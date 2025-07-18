import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { Button, Card, Box } from '@mui/material';
import { Edit2, Trash2 } from 'lucide-react';

import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { useDispatch, useSelector } from 'react-redux';
import { setToogleHeader } from '../../core/redux/action';
import Table from '../../core/pagination/datatable';

const CompanyUserMapping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleHeader = useSelector((state) => state.toggle_header);

  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    const step1 = JSON.parse(sessionStorage.getItem("onboardingStep1") || "{}");
    const users = step1.users || [];

    const mappedUsers = users.map((user, i) => ({
      key: i,
      fullName: user.full_name || "",
      email: user.email || "",
      mobile: user.phone || "",
      designation: "",
      role: user.role || "",
      id_passport: "",
      mfa: "No",
      accounts: user.account || "",
      status: "Pending",
      language: "",
      remarks: "",
    }));

    setUserRows(mappedUsers);
  }, []);

  const handleNext = () => {
    sessionStorage.setItem("onboardingStep3", JSON.stringify(userRows));
    navigate("/company-access-rights");
  };

  const renderExportButtons = () => (
    <>
      <li>
        <OverlayTrigger placement="top" overlay={<Tooltip>PDF</Tooltip>}>
          <Link><ImageWithBasePath src="assets/img/icons/pdf.svg" alt="pdf" /></Link>
        </OverlayTrigger>
      </li>
      <li>
        <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
          <Link><ImageWithBasePath src="assets/img/icons/excel.svg" alt="excel" /></Link>
        </OverlayTrigger>
      </li>
      <li>
        <OverlayTrigger placement="top" overlay={<Tooltip>Printer</Tooltip>}>
          <Link><i data-feather="printer" className="feather-printer" /></Link>
        </OverlayTrigger>
      </li>
      <li>
        <OverlayTrigger placement="top" overlay={<Tooltip>Refresh</Tooltip>}>
          <Link><RotateCcw /></Link>
        </OverlayTrigger>
      </li>
      <li>
        <OverlayTrigger placement="top" overlay={<Tooltip>Collapse</Tooltip>}>
          <Link
            id="collapse-header"
            className={toggleHeader ? "active" : ""}
            onClick={() => dispatch(setToogleHeader(!toggleHeader))}
          >
            <ChevronUp />
          </Link>
        </OverlayTrigger>
      </li>
    </>
  );

  const columns = [
    { title: 'User Full Name', dataIndex: 'fullName' },
    { title: 'Email Address', dataIndex: 'email' },
    { title: 'Mobile Number', dataIndex: 'mobile' },
    { title: 'National ID / Passport', dataIndex: 'id_passport' },
    { title: 'Designation', dataIndex: 'designation' },
    { title: 'Assigned Role', dataIndex: 'role' },
    { title: 'MFA Enabled', dataIndex: 'mfa' },
    { title: 'Linked Accounts', dataIndex: 'accounts' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Preferred Language', dataIndex: 'language' },
    { title: 'Remarks', dataIndex: 'remarks' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <Box display="flex" gap={1}>
          <Link to="#" className="text-primary"><Edit2 size={18} /></Link>
          <Link to="#" className="text-danger"><Trash2 size={18} /></Link>
        </Box>
      )
    },
  ];

  return (
    <div className="row">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <div className="page-title">
            <h4>Company User Mapping</h4>
            <h6>Manage users and their access rights</h6>
          </div>
          <ul className="table-top-head d-flex align-items-center gap-2">
            {renderExportButtons()}
          </ul>
        </div>

        <Card className="table-list-card shadow-sm rounded-4">
          <Box className="card-body p-3">
            <div className="table-responsive">
              <Table columns={columns} dataSource={userRows} />
            </div>
            <Box className="d-flex justify-content-end mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ borderRadius: 2, px: 4, py: 1 }}
              >
                Next: Company Access Rights
              </Button>
            </Box>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default CompanyUserMapping;
