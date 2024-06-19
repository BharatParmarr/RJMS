// src/components/RevenueChart.js
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useTheme } from '../styles/theme';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Container = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.white};
`;


const RevenueChart = ({ revenueData }: any) => {
    const { theme } = useTheme();

    // Split revenueData into chunks of 12 items each
    const chunks = [];
    for (let i = 0; i < revenueData.length; i += 12) {
        chunks.push(revenueData.slice(i, i + 12));
    }

    return (
        <div>
            {chunks.map((chunk, index) => {
                const data = {
                    labels: chunk.map((item: { item__name: any; }) => item.item__name),
                    datasets: [
                        {
                            label: 'Revenue',
                            data: chunk.map((item: { revenue: any; }) => item.revenue),
                            backgroundColor: theme.colors.primary,
                            borderColor: theme.colors.primary,
                            borderWidth: 1
                        }
                    ]
                };

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
                    }
                };

                return (
                    <Container key={index} >
                        <h2 style={{ fontFamily: 'Roboto', color: theme.colors.text }}>Item Revenue</h2>
                        {revenueData.length === 0 && <p style={{ fontFamily: 'Roboto', color: theme.colors.text }}>No data available</p>}
                        <Bar data={data} options={options} color={theme.colors.text} style={{
                            backgroundColor: theme.colors.background,
                            borderRadius: 8,
                            padding: 20,
                            color: theme.colors.primary
                        }} />
                    </Container>
                );
            })}
        </div>
    );
};

export default RevenueChart;
