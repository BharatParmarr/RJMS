import { Pie, Bar } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const ChartComponent = ({ data, type }: any) => {
    const chartData = {
        labels: data.map((item: { appointment_status: any; room__name: any; facility__name: any; }) => item.appointment_status || item.room__name || item.facility__name),
        datasets: [
            {
                label: 'Count',
                data: data.map((item: { count: any; total_appointments: any; }) => item.count || item.total_appointments),
                backgroundColor: ['#3f51b5', '#ff9800', '#f44336', '#4caf50'],
                borderColor: '#ffffff',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <ChartWrapper>
            {type === 'pie' ? <Pie data={chartData} options={options as any} /> : <Bar data={chartData} options={options as any} />}
        </ChartWrapper>
    );
};
