// staff attendance list for today
// list full staff with switch to mark attendance

import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Switch } from 'antd';
import { apis2 } from '../../apis';
import { Input } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    padding: 20px;
    min-height: 100vh;
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

const StyledInput = styled(Input)`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 10px;
    margin-bottom: 20px;

    &::placeholder {
        color: ${({ theme }) => theme.colors.text};
    }

    &:focus {
        border: 1px solid ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.background};
    }

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.white};
    }
`;

const StyledSwitch = styled(Switch)`
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
`;



const StaffAttendanceList = () => {
    const [staffAttendance, setStaffAttendance] = useState([]);
    const [staffName, setStaffName] = useState('');
    const { type_page, sub_id } = useParams();
    let Url_set_attendance = '';
    if (type_page === 'hospital') {
        Url_set_attendance = 'hospital-staff-attendance'
    } else if (type_page === 'restorant') {
        Url_set_attendance = 'restorant-staff-attendance'
    }

    useEffect(() => {
        const fetchStaffAttendance = async () => {
            if (type_page === 'hospital') {
                const data = await apis2.get(`/${Url_set_attendance}?hospital=${sub_id}&name=${staffName}`);
                console.log(data);
                setStaffAttendance(data.data);
            } else if (type_page === 'restorant') {
                const data = await apis2.get(`/${Url_set_attendance}?restorant=${sub_id}&name=${staffName}`);
                console.log(data);
                setStaffAttendance(data.data);
            }
        };
        fetchStaffAttendance();
    }, [staffName]);

    const handleAttendanceChange = async (staffId: any, checked: any) => {
        const data = await apis2.post(`/${Url_set_attendance}/?${type_page}=${sub_id}`, {
            hospital: sub_id,
            staff: staffId,
            is_present: checked,
        });
        console.log(data);
        if (data.status === 201 || data.status === 200) {
            let newStaffAttendance = staffAttendance.map((item: any) => {
                if (item.id === staffId) {
                    item.is_present = checked;
                    item.time = new Date().toISOString();
                }
                return item;
            });
            setStaffAttendance(newStaffAttendance as any);
        }
    };

    function convertTimeToReadableDate(timeString: string) {
        // Get the current date
        const now = new Date();

        // Parse the time string
        const [hours, minutes, secondsWithMilliseconds] = timeString.split(':');
        const [seconds, milliseconds] = secondsWithMilliseconds.split('.');

        // Create a new Date object with today's date and the parsed time
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
            parseInt(hours), parseInt(minutes), parseInt(seconds),
            parseInt(milliseconds.padEnd(3, '0')));

        // Format the Date object to a human-readable string
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        return date.toLocaleString('en-US', options as any);
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (_text: any, record: any) => (
                <span>{record.is_present ? convertTimeToReadableDate(record.time) : '---'}</span>
            ),
        },
        {
            title: 'Attendance',
            dataIndex: 'attendance',
            key: 'attendance',
            render: (_text: any, record: any) => (
                <StyledSwitch checked={record.is_present} onChange={(checked) => handleAttendanceChange(record.id, checked)} />
            ),
        },
    ];

    return (
        <Container>
            <StyledInput placeholder="Search by name" onChange={(e) => setStaffName(e.target.value)} />
            <StyledTable columns={columns} dataSource={staffAttendance} rowHoverable={false} pagination={false} />
        </Container>
    );
};

export default StaffAttendanceList;
