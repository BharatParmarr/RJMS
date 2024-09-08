import { useEffect, useState } from 'react';
import { Table, Switch, Button } from 'antd';
import apis from '../../apis';
import { StaffSalaryForm, StaffLeaveForm, StaffAttendance_and_Salary_History_pageination } from './StaffLeaveForm';
import styled from 'styled-components';
import { useTheme } from '../../templates/styles/theme';
import StaffForm from './StaffForm';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MoneyIcon from '@mui/icons-material/Money';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';



const StyledContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    padding: 20px;
    min-height: 100vh;
`;

const StyledHeading = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const StyledTable = styled(Table)`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.text};

    .ant-table-pagination.ant-pagination {
        margin-right: 20px;
    }

    .ant-pagination-item {
        background-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.white};

        a {
            color: ${({ theme }) => theme.colors.white};
        }
    }

    .ant-pagination-item-active {
        background-color: ${({ theme }) => theme.colors.primary};
        
        a {
            color: white;
        }
    }

    .ant-table-thead > tr > th {
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
    }

    .ant-table-tbody > tr > td {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.text};
    }

    .ant-table-footer {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.text};
    }

    @media (max-width: 768px) {
        width: 100%;
        overflow-x: auto;

        .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
            white-space: nowrap;
        }

        .ant-table-thead > tr > th {
            background-color: ${({ theme }) => theme.colors.primary};
            color: white;
            font-size: 12px;
            width: 120px;
        }

        .ant-table-tbody > tr > td {
            background-color: ${({ theme }) => theme.colors.white};
            color: ${({ theme }) => theme.colors.text};
        }

        .ant-table-footer {
            background-color: ${({ theme }) => theme.colors.white};
            color: ${({ theme }) => theme.colors.text};
        }

        .ant-table-pagination.ant-pagination {
            margin-right: 20px;
        }

        .ant-pagination-item {
            background-color: ${({ theme }) => theme.colors.black};
            color: ${({ theme }) => theme.colors.white};

            a {
                color: ${({ theme }) => theme.colors.white};
            }
        }

        .ant-pagination-item-active {
            background-color: ${({ theme }) => theme.colors.primary};
            
            a {
                color: white;
            }
        }
        
    }
`;

const OpentContainer = styled.div`
    position: fixed;
    top: 10px;
    left: 10px;
    width: 99vw;
    height: 99vh;
    background-color: ${({ theme }) => theme.colors.background};
    z-index: 1000;
`;

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const { theme } = useTheme();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [staff_id, setStaff_id] = useState(0);
    const [dialogOpen2, setDialogOpen2] = useState(false);
    const [dialogOpen3, setDialogOpen3] = useState(false);

    // set urls according to the type of business
    const { type_page, sub_id } = useParams();
    let url_set = '';
    if (type_page === 'hospital') {
        url_set = 'hospital-staff'
    } else if (type_page === 'restorant') {
        url_set = 'restorant-staff'
    }


    useEffect(() => {
        fetchStaff();
    }, [page]);

    const fetchStaff = async () => {
        if (type_page === 'restorant') {
            const response = await apis.get(`/${url_set}/?page=${page}&restorant=${sub_id}`);
            setStaff(response.data.results);
            setTotalPages(response.data.count / 40);
        } else if (type_page === 'hospital') {
            const response = await apis.get(`/${url_set}/?page=${page}&hospital=${sub_id}`);
            setStaff(response.data.results);
            setTotalPages(response.data.count / 40);
        }
    };

    const toggleActiveStatus = async (id: number, isActive: boolean) => {
        await apis.patch(`/${url_set}/${id}/?${type_page}=${sub_id}`, { is_active: !isActive });
        fetchStaff();
    };

    const columns = [
        { title: 'Name', dataIndex: 'username', key: 'username' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Shift Time', dataIndex: 'shift_time', key: 'shift_time' },
        { title: 'Salary', dataIndex: 'salary', key: 'salary' },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (text: boolean, record: any) => (
                <Switch
                    checked={text}
                    onChange={() => toggleActiveStatus(record.id, text)}
                />
            ),
        },
        // leave button
        {
            title: 'Remove',
            dataIndex: 'id',
            key: 'id',
            render: (_text: number, record: any) => (
                <>
                    <StyledButton style={{ backgroundColor: 'red' }} onClick={() => {
                        setDialogOpen(true);
                        setStaff_id(record.id);
                    }}><PersonRemoveIcon /></StyledButton>
                    {dialogOpen && <OpentContainer><StaffLeaveForm staff_id={staff_id} setDialogOpen={setDialogOpen} setStaff={setStaff} staff={staff} /></OpentContainer>}
                </>
            ),
        },
        {
            title: 'Salary',
            dataIndex: 'id',
            key: 'id',
            render: (_text: number, record: any) => (
                <>
                    <StyledButton style={{ marginRight: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => {
                        setDialogOpen2(true);
                        setStaff_id(record.id);
                    }}><MoneyIcon /> Record Salary</StyledButton>
                    {dialogOpen2 && <OpentContainer><StaffSalaryForm staff_id={staff_id} setDialogOpen={setDialogOpen2} /></OpentContainer>}
                </>
            ),
        },
        {
            title: 'Attendance',
            dataIndex: 'id',
            key: 'id',
            render: (_text: number, record: any) => (
                <>
                    <StyledButton style={{ marginRight: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => {
                        setDialogOpen3(true);
                        setStaff_id(record.id);
                    }}><CalendarMonthIcon /> Attendance</StyledButton>
                    {dialogOpen3 && <OpentContainer><StaffAttendance_and_Salary_History_pageination staff_id={staff_id} setDialogOpen={setDialogOpen3} /></OpentContainer>}
                </>
            ),
        },
    ];

    return (
        <StyledContainer>
            <StyledHeading>Staff List</StyledHeading>
            <StyledTable
                pagination={{
                    pageSize: 40,
                    total: totalPages * 40,
                    onChange: (page) => setPage(page),
                }}
                dataSource={staff} columns={columns} rowKey="id"
                style={{ background: theme.colors.white, borderRadius: '10px', color: theme.colors.text }}
                tableLayout='fixed'
                rowHoverable={false}
            />
            <StyledButton type="primary" onClick={() => {
                setShowForm(!showForm);
            }}>{showForm ? 'Close' : 'Add Staff'}</StyledButton>
            {showForm && <StaffForm onSubmit={() => { setShowForm(false); fetchStaff(); }} />}
        </StyledContainer>
    );
};

export default StaffList;