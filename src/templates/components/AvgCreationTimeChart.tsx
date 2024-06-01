// src/components/AvgCreationTimeChart.js
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../styles/theme';

Chart.register(...registerables);
const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AvgCreationTimeChart = ({ creationTimeData }: any) => {
    const { theme } = useTheme();

    // Split creationTimeData into chunks of 12 items each
    const chunks = [];
    for (let i = 0; i < creationTimeData.length; i += 12) {
        chunks.push(creationTimeData.slice(i, i + 12));
    }

    return (
        <div>
            {chunks.map((chunk, index) => {
                const data = {
                    labels: chunk.map((item: { item__name: any; }) => item.item__name),
                    datasets: [
                        {
                            label: 'Avg Creation Time (ms)',
                            data: chunk.map((item: { avg_creation_time: any; }) => item.avg_creation_time),
                            backgroundColor: (props: { theme: { colors: { secondary: any; }; }; }) => theme.colors.secondary,
                            borderColor: (props: { theme: { colors: { secondary: any; }; }; }) => theme.colors.secondary,
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
                    <Container key={index}>
                        <h2 style={{ fontFamily: 'Roboto' }}>Average Creation Time</h2>
                        <Bar data={data} options={options} style={{
                            backgroundColor: theme.colors.background,
                            borderRadius: 8,
                            padding: 20
                        }} />
                    </Container>
                );
            })}
        </div>
    );
};

export default AvgCreationTimeChart;
