import { Form, Input, Button } from 'antd';
import apis, { apis2 } from '../../apis';
import styled from 'styled-components';
import { useState } from 'react';
import { Tabs } from 'antd';
import { Table } from 'antd';
import { useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ConfigProvider } from "antd";

const StyledTable = styled(Table)`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.text};
    width: 100%;

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
`;

const StyledContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;
    border-radius: 10px;
    animation: smooth-appear 0.5s ease-in-out;
    position: relative;
    padding-bottom: 100px;
    @keyframes smooth-appear {
        from {
            bottom: -100%;
            opacity: 0;
        }
        to {
            bottom: 0;
            opacity: 1;
        }
    }
`;

const StyledHeader = styled.h2`
    color: ${({ theme }) => theme.colors.text};
    font-size: 24px;
    margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
    background-color: ${({ theme }) => theme.colors.background};
    padding: 20px;
    border-radius: 10px;
    width: 100%;

    .ant-form-item {
        margin-bottom: 15px;
    }

    .ant-form-item-label > label {
        color: ${({ theme }) => theme.colors.text};
    }

    .ant-form-item-control {
        color: ${({ theme }) => theme.colors.text};
    }

    .ant-form-item-control-input-content {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};

        .ant-input {
            background-color: ${({ theme }) => theme.colors.background};
            color: ${({ theme }) => theme.colors.text};
        }
    }

    .ant-form-item-control-input-content {
        color: ${({ theme }) => theme.colors.text};
    }

    .ant-select {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};

        .ant-select-selector {
            background-color: ${({ theme }) => theme.colors.background};
            color: ${({ theme }) => theme.colors.text};
        }
    }

    .ant-picker {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};

        .ant-picker-input > input {
            color: ${({ theme }) => theme.colors.text};
        }

        .ant-picker-suffix {
            color: ${({ theme }) => theme.colors.text};
        }
    }

    .ant-btn {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }

    .ant-btn:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }

    p{
        color: ${({ theme }) => theme.colors.text};
    }
`;

const CloseButton = styled(Button)`
    color: white;
    background-color: ${({ theme }) => theme.colors.gray};
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    border: none;
    font-size: 24px;
    cursor: pointer;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Conatiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

function Url_set(type_page: string | undefined) {
    if (type_page === 'hospital') {
        return 'hospital-staff'
    } else if (type_page === 'restorant') {
        return 'restorant-staff'
    }
}
function Url_set_attendance(type_page: string | undefined) {
    if (type_page === 'hospital') {
        return 'hospital-staff-attendance'
    } else if (type_page === 'restorant') {
        return 'restorant-staff-attendance'
    }
}
function Url_set_salary(type_page: string | undefined) {
    if (type_page === 'hospital') {
        return 'hospital-staff-salary'
    } else if (type_page === 'restorant') {
        return 'restorant-staff-salary'
    }
}



const StaffLeaveForm = ({ staff_id, setDialogOpen, setStaff, staff }: { staff_id: number, setDialogOpen: (open: boolean) => void, setStaff: (staff: any) => void, staff: any }) => {
    const [form] = Form.useForm();
    const { type_page, sub_id } = useParams();
    const onFinish = async (_values: any) => {
        let response = await apis.delete(`/${Url_set(type_page)}/${staff_id}/?${type_page}=${sub_id}`);
        if (response.status === 204) {
            form.resetFields();
            setStaff(staff.filter((staff: any) => staff.id !== staff_id));
            setDialogOpen(false);
        } else {
            alert('Failed to remove staff. Try again later');
        }
    };

    return (
        <StyledContainer>
            <StyledHeader>Staff Leave Form</StyledHeader>
            <StyledForm form={form} onFinish={onFinish}>
                <p>Are you sure you want to remove this staff?</p>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Remove</Button>
                    <Button type="primary" htmlType="button" onClick={() => {
                        setDialogOpen(false);
                    }}>Cancel</Button>
                </Form.Item>
            </StyledForm>
            {/* close button */}
            <CloseButton type="primary" htmlType="button" onClick={() => {
                setDialogOpen(false);
            }}>x</CloseButton>
        </StyledContainer>
    );
};


const StaffSalaryForm = ({ staff_id, setDialogOpen }: { staff_id: number, setDialogOpen: (open: boolean) => void }) => {
    const [form] = Form.useForm();
    const { type_page, sub_id } = useParams();
    const onFinish = async (_values: any) => {
        let response = await apis2.post(`/${Url_set_salary(type_page)}/?${type_page}=${sub_id}`, {
            staff: staff_id,
            amount: _values.amount,
            description: _values.description
        });
        if (response.status === 201) {
            form.resetFields();
            setDialogOpen(false);
            console.log(response.data);
        } else {
            alert('Failed to add salary. Try again later');
        }
    };

    return (
        <StyledContainer>
            <StyledHeader>Staff Salary Form</StyledHeader>
            <StyledForm form={form} onFinish={onFinish}>
                <Form.Item name="amount" label="Amount">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Salary</Button>
                    <Button type="primary" htmlType="button" onClick={() => {
                        setDialogOpen(false);
                    }}>Cancel</Button>
                </Form.Item>
            </StyledForm>
            <CloseButton type="primary" htmlType="button" onClick={() => {
                setDialogOpen(false);
            }}>x</CloseButton>
        </StyledContainer>
    );
};

function Selaction({ data = 'month', month, setMonth }: { data: string, month: string, setMonth: any }) {
    const handleChange = (event: any) => {
        setMonth(event.target.value as string);
    };

    const years = ['2023', '2024'];

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{data.toLocaleUpperCase()}</InputLabel>
                {data === 'month' ? <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Month"
                    onChange={handleChange}
                >
                    {months.map((month) => <MenuItem value={month}>{month}</MenuItem>)}
                </Select> : <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Year"
                    onChange={handleChange}
                >
                    {years.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
                </Select>}
            </FormControl>
        </Box>
    );
}

const StaffAttendance_and_Salary_History_pageination = ({ staff_id, setDialogOpen }: { staff_id: number, setDialogOpen: (open: boolean) => void }) => {
    const [page, _setPage] = useState(1);
    const [page2, _setPage2] = useState(1);
    const [attendance, setAttendance] = useState([]);
    const [salary, setSalary] = useState([]);
    const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [year, setYear] = useState(new Date().getFullYear());
    const [month2, setMonth2] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [year2, setYear2] = useState(new Date().getFullYear());
    const { type_page, sub_id } = useParams();
    useEffect(() => {
        fetchAttendance();
    }, [page, month, year]);
    useEffect(() => {
        fetchSalary();
    }, [page2, month2, year2]);

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const fetchAttendance = async () => {
        let month_selected = months.indexOf(month) + 1;
        const response = await apis2.get(`/${Url_set_attendance(type_page)}/monthly_attendance/?staff=${staff_id}&month=${month_selected}&year=${year}&page=${page}&${type_page}=${sub_id}`);
        setAttendance(response.data);
    };

    const fetchSalary = async () => {
        let month_selected = months.indexOf(month2) + 1;
        const response = await apis2.get(`/${Url_set_salary(type_page)}/monthly_salary/?staff=${staff_id}&month=${month_selected}&year=${year2}&page=${page2}&${type_page}=${sub_id}`);
        setSalary(response.data);
    };


    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Status',
            dataIndex: 'is_present',
            key: 'is_present',
            render: (is_present: boolean) => is_present ? 'Present' : 'Absent',
        },
    ];

    const columns2 = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];


    return (
        <StyledContainer>
            <CloseButton type="primary" htmlType="button" onClick={() => {
                setDialogOpen(false);
            }}>x</CloseButton>
            <ConfigProvider theme={{ token: { colorText: "gray" } }}>
                <Tabs defaultActiveKey="1"
                    items={[
                        {
                            key: '1',
                            label: 'Attendance History',
                            children: <Conatiner>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Selaction data='month' month={month} setMonth={setMonth} />
                                    <Selaction data='year' month={year.toString()} setMonth={setYear} />
                                </div>
                                <StyledTable
                                    dataSource={attendance}
                                    pagination={false}
                                    columns={columns}
                                    rowHoverable={false}
                                />
                            </Conatiner>
                        },
                        {
                            key: '2',
                            label: 'Salary History',
                            children: <Conatiner>
                                {/* date picker */}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Selaction data='month' month={month2} setMonth={setMonth2} />
                                    <Selaction data='year' month={year2.toString()} setMonth={setYear2} />
                                </div>
                                <StyledTable
                                    dataSource={salary}
                                    pagination={false}
                                    columns={columns2}
                                    rowHoverable={false}
                                />
                            </Conatiner>
                        }
                    ]}
                />
            </ConfigProvider>
        </StyledContainer>
    );
};





export { StaffLeaveForm, StaffSalaryForm, StaffAttendance_and_Salary_History_pageination };