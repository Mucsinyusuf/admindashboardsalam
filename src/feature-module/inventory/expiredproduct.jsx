import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable';

const CompanyUserMapping = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const dataSource = useSelector((state) => state.company_user_mapping);

    const MySwal = withReactContent(Swal);

    const showConfirmationAlert = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#00ff00',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonColor: '#ff0000',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'User mapping has been deleted.',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-success',
                    },
                });
            } else {
                MySwal.close();
            }
        });
    };

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
                <td className="action-table-data">
                    <div className="edit-delete-action">
                        <Link className="me-2 p-2" to="#">
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <i data-feather="trash-2" className="feather-trash-2" onClick={showConfirmationAlert}></i>
                        </Link>
                    </div>
                </td>
            )
        },
    ];

    return (
        <div className="row">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Company User Mapping</h4>
                            <h6>Manage users and their access rights</h6>
                        </div>
                    </div>
                    <ul className="table-top-head">
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip>PDF</Tooltip>}>
                                <Link><ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" /></Link>
                            </OverlayTrigger>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                                <Link><ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" /></Link>
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
                                    className={data ? "active" : ""}
                                    onClick={() => { dispatch(setToogleHeader(!data)) }}
                                >
                                    <ChevronUp />
                                </Link>
                            </OverlayTrigger>
                        </li>
                    </ul>
                </div>

                <div className="card table-list-card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <Table columns={columns} dataSource={dataSource} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyUserMapping;
