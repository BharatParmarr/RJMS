import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import { useTheme } from '../templates/styles/theme';
import { Education_apis } from '../apis';
import {
    AppBar, Toolbar, Typography, Container, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { useTable } from 'react-table';

// Styled components
const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  margin-right: 20px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ContentContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

// Animation variants
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};

// Types
// type User = {
//     id: number;
//     username: string;
//     email: string;
//     first_name: string;
//     last_name: string;
//     is_staff: boolean;
//     is_active: boolean;
// }

type Student = {
    id: number;
    name: string;
    email: string;
    student_id: string;
    current_class: string;
}

type Teacher = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    department: string;
    subject: string;
}

type Course = {
    id: number;
    name: string;
    code: string;
    department: string;
}

// Components
const Dashboard = () => {
    // const theme = useTheme();

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6">Welcome to the Education Management System</Typography>
                <Typography>
                    Here you can manage students, teachers, courses, and more. Use the navigation menu to access different sections.
                </Typography>
            </Paper>
        </motion.div>
    );
};

const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await Education_apis.get('/students/');
                setStudents(response.data.results);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Student ID', accessor: 'student_id' },
            { Header: 'Class', accessor: 'current_class' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: students } as any);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <Typography variant="h4" gutterBottom>Student List</Typography>
            <TableContainer component={Paper}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
    );
};

const TeacherList = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    // const theme = useTheme();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await Education_apis.get('/staff/');
                setTeachers(response.data.results);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };
        fetchTeachers();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: (row: Teacher) => `${row.first_name} ${row.last_name}` },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Phone', accessor: 'phone' },
            { Header: 'Department', accessor: 'department' },
            { Header: 'Subject', accessor: 'subject' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: teachers } as any);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <Typography variant="h4" gutterBottom>Teacher List</Typography>
            <TableContainer component={Paper}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
    );
};

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await Education_apis.get('/courses/');
                setCourses(response.data.results);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Code', accessor: 'code' },
            { Header: 'Department', accessor: 'department' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: courses } as any);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <Typography variant="h4" gutterBottom>Course List</Typography>
            <TableContainer component={Paper}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
    );
};

const AttendanceForm = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [attendance, setAttendance] = useState<{ [key: number]: { status: string; reason: string } }>({});
    // const theme = useTheme();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await Education_apis.get('/students/');
                setStudents(response.data.results);
                const initialAttendance: { [key: number]: { status: string; reason: string } } = {};
                if (response.data.results.length > 0) {
                    response.data.results.forEach((student: Student) => {
                        initialAttendance[student.id] = { status: 'present', reason: '' };
                    });
                }
                setAttendance(initialAttendance);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const handleAttendanceChange = (studentId: number, field: string, value: string) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], [field]: value }
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await Education_apis.post('/attendance/bulk_create/', Object.entries(attendance).map(([studentId, data]) => ({
                student: studentId,
                status: data.status,
                reason: data.reason,
                date: new Date().toISOString().split('T')[0]
            })));
            console.log('Attendance submitted successfully', response.data);
            // Reset form or show success message
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <Typography variant="h4" gutterBottom>Attendance Form</Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <form onSubmit={handleSubmit}>
                    {students.map(student => (
                        <div key={student.id} style={{ marginBottom: '20px' }}>
                            <Typography variant="subtitle1">{student.name}</Typography>
                            <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={attendance[student.id]?.status || 'present'}
                                    onChange={(e) => handleAttendanceChange(student.id, 'status', e.target.value as string)}
                                    label="Status"
                                >
                                    <MenuItem value="present">Present</MenuItem>
                                    <MenuItem value="absent">Absent</MenuItem>
                                    <MenuItem value="late">Late</MenuItem>
                                </Select>
                            </FormControl>
                            {attendance[student.id]?.status !== 'present' && (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Reason"
                                    value={attendance[student.id]?.reason || ''}
                                    onChange={(e) => handleAttendanceChange(student.id, 'reason', e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                    <Button type="submit" variant="contained" color="primary">
                        Submit Attendance
                    </Button>
                </form>
            </Paper>
        </motion.div>
    );
};

const Education_App: React.FC = () => {
    const location = useLocation();

    if (!location.pathname.startsWith('/Education')) {
        return null;
    }

    return (
        <AppContainer>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Education Management System
                    </Typography>
                    <NavLink to="/Education" >Dashboard</NavLink>
                    <NavLink to="/Education/students" >Students</NavLink>
                    <NavLink to="/Education/teachers" >Teachers</NavLink>
                    <NavLink to="/Education/courses" >Courses</NavLink>
                    <NavLink to="/Education/attendance" >Attendance</NavLink>
                </Toolbar>
            </AppBar>
            <ContentContainer>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/students" element={<StudentList />} />
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/attendance" element={<AttendanceForm />} />
                    <Route path="*" element={<Typography variant="h4">404 - Page Not Found</Typography>} />
                </Routes>
            </ContentContainer>
        </AppContainer>
    );
};

export default Education_App;