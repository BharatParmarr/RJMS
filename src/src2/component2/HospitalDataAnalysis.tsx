import { useState, useEffect } from 'react';
import {
    Box,
    Grid as MuiGrid,
    Paper,
    Typography,
    CircularProgress,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
    LocalHospital,
    EventAvailable,
    People,
    Inventory,
    AttachMoney
} from '@mui/icons-material';
import { apis2 } from '../../apis';
import React from 'react';
import { styled as styledcom } from 'styled-components';
import { useTheme } from '../../templates/styles/theme';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const StyledPaper = styled(Paper)(({ theme }) => {
    const customTheme = useTheme();
    console.log(customTheme);
    return ({
        padding: theme.spacing(2),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: customTheme.theme.colors.text,
        backgroundColor: customTheme.theme.colors.objectBg,
    })
});

const Grid = styledcom(MuiGrid)`
    margin-top: 20px;
    background: ${({ theme }) => theme.colors.background};
`;

const Container = styledcom.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    background: ${({ theme }) => theme.colors.background};
`;
const AnimatedValue = ({ value, duration = 2000 }: { value: number, duration?: number }) => {
    const spring = useSpring({
        from: { val: 0 },
        to: { val: value },
        config: { duration },
    });

    return <animated.span>{spring.val.interpolate(val => Math.floor(val))}</animated.span>;
};

function Selaction({ data = 'month', month, setMonth }: { data: string, month: string, setMonth: any }) {


    const handleChange = (event: SelectChangeEvent) => {
        setMonth(event.target.value as string);
    };

    const years = ['2023', '2024'];

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const { theme } = useTheme();

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel sx={{ color: theme.colors.text }} id="demo-simple-select-label">{data.toLocaleUpperCase()}</InputLabel>
                {data === 'month' ? <Select
                    sx={{ color: theme.colors.text, borderColor: theme.colors.text, backgroundColor: theme.colors.white }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Month"
                    onChange={handleChange}
                >
                    {months.map((month) => <MenuItem value={month}>{month}</MenuItem>)}
                </Select> : <Select
                    sx={{ color: theme.colors.text, borderColor: theme.colors.text, backgroundColor: theme.colors.white }}
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

const HospitalDataAnalysis = ({ hospitalId }: any) => {
    type Data = {
        hospital_info: {
            name: string;
            beds: number;
            rooms: number;
            specialties: string;
        };
        occupancy_stats: {
            current_occupancy_rate: number;
        };
        appointment_stats: {
            appointment_status_distribution: {
                appointment_status: string;
                count: number;
            }[];
        };
        staff_stats: {
            staff_distribution: {
                role: string;
                count: number;
            }[];
        };
        inventory_stats: {
            low_stock_items: {
                product__name: string;
                quantity: number;
            }[];
        };
        financial_stats: {
            total_revenue: number;
            revenue_by_department: {
                specialization: string;
                revenue: number;
            }[];
        };
    };
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = React.useState('');
    const [year, setYear] = React.useState('');

    const ref = React.useRef(false);
    useEffect(() => {
        const date = new Date();
        setMonth(date.toLocaleString('default', { month: 'long' }));
        setYear(date.getFullYear().toString());
    }, []);
    useEffect(() => {
        if (month === '' || year === '') {
            return;
        }
        if (ref.current == false) {
            ref.current = true;
            return;
        }
        // Fetch data from the Django API for the selected month and year
        const fetchData = async () => {
            try {
                const response = await apis2.get(`/hospital/${hospitalId}/analysis/`, {
                    params: {
                        month: month,
                        year: year
                    }
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [month, year]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apis2.get(`/hospital/${hospitalId}/analysis/`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [hospitalId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!data) {
        return <Typography>No data available</Typography>;
    }

    const occupancyData = {
        labels: ['Occupied', 'Vacant'],
        datasets: [{
            data: [data.occupancy_stats.current_occupancy_rate * 100, (1 - data.occupancy_stats.current_occupancy_rate) * 100],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }]
    };

    const appointmentData = {
        labels: data.appointment_stats.appointment_status_distribution.map(item => item.appointment_status),
        datasets: [{
            label: 'Appointments',
            data: data.appointment_stats.appointment_status_distribution.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    };

    const staffData = {
        labels: data.staff_stats.staff_distribution.map(item => item.role),
        datasets: [{
            label: 'Staff Count',
            data: data.staff_stats.staff_distribution.map(item => item.count),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }]
    };

    const inventoryData = {
        labels: data.inventory_stats.low_stock_items.map(item => item.product__name),
        datasets: [{
            label: 'Quantity',
            data: data.inventory_stats.low_stock_items.map(item => item.quantity),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <Selaction data='month' month={month} setMonth={setMonth} />
                <Selaction data='year' month={year} setMonth={setYear} />
            </Container>
            <MuiGrid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Box display="flex" alignItems="center">
                            <LocalHospital color="primary" fontSize="large" />
                            <Typography variant="h6" ml={1}>Hospital Info</Typography>
                        </Box>
                        <Typography>Name: {data.hospital_info.name}</Typography>
                        <Typography>Beds: <AnimatedValue value={data.hospital_info.beds} /></Typography>
                        <Typography>Rooms: <AnimatedValue value={data.hospital_info.rooms} /></Typography>
                        <Typography>Specialties: {data.hospital_info.specialties}</Typography>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Box display="flex" alignItems="center">
                            <EventAvailable color="secondary" fontSize="large" />
                            <Typography variant="h6" ml={1}>Occupancy</Typography>
                        </Box>
                        <Doughnut data={occupancyData} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Box display="flex" alignItems="center">
                            <People color="error" fontSize="large" />
                            <Typography variant="h6" ml={1}>Appointments</Typography>
                        </Box>
                        <Bar data={appointmentData} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Box display="flex" alignItems="center">
                            <People color="success" fontSize="large" />
                            <Typography variant="h6" ml={1}>Staff Distribution</Typography>
                        </Box>
                        <Bar data={staffData} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Box display="flex" alignItems="center">
                            <Inventory color="warning" fontSize="large" />
                            <Typography variant="h6" ml={1}>Low Stock Items</Typography>
                        </Box>
                        <Line data={inventoryData} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Box display="flex" alignItems="center">
                            <AttachMoney color="info" fontSize="large" />
                            <Typography variant="h6" ml={1}>Financial Overview</Typography>
                        </Box>
                        <Typography>Total Revenue: ₹{data.financial_stats.total_revenue?.toFixed(2)}</Typography>
                        {data.financial_stats.revenue_by_department.map((dept, index) => (
                            <Typography key={index}>
                                {dept.specialization}: ₹{dept.revenue?.toFixed(2)}
                            </Typography>
                        ))}
                    </StyledPaper>
                </Grid>
            </MuiGrid>
        </motion.div>
    );
};

export default HospitalDataAnalysis;