// OrderChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import { Container, Paper, Typography } from '@mui/material';
import { useTheme } from '../styles/theme';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartContainer = styled(Paper)`
  padding: 20px;
  margin: 20px;
  background-color: ${props => props.theme.colors.background};
`;




const OrderChart = ({ orderData }: any) => {
    console.log(orderData, 'ddd');
    const { theme } = useTheme();
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: true,
                    color: theme.colors.text,
                },
                ticks: {
                    beginAtZero: true,
                    color: theme.colors.text,
                    fontSize: 12,
                }
            },
            x: {
                grid: {
                    drawBorder: true,
                    color: theme.colors.text,
                },
                ticks: {
                    color: theme.colors.text,
                    fontSize: 12,
                }
            }
        },
        responsive: true,
    };

    const orderHours = orderData.map((order: { order_hour: any; }) => order.order_hour);
    const totalOrders = orderData.map((order: { total_orders: any; }) => order.total_orders);

    const chartData = {
        labels: orderHours,
        datasets: [
            {
                label: 'Total Orders by Hour',
                data: totalOrders,
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primary + '33',
                borderWidth: 3,
                fill: true,
            },
        ],
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{
                fontFamily: 'Roboto',
                color: theme.colors.text,
                textAlign: 'center',
                marginBottom: 20
            }}>
                Orders Timings
            </Typography>
            <ChartContainer elevation={3} style={{
                backgroundColor: theme.colors.white,
                borderRadius: 8,
                padding: 20,
                color: theme.colors.primary
            }}>
                <Line data={chartData} options={options} style={{
                    backgroundColor: theme.colors.background,
                }} />
            </ChartContainer>
        </Container >
    );
};

export default OrderChart;
