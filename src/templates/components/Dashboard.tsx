// src/components/Dashboard.js
import styled, { ThemeProvider } from 'styled-components';
import ItemsSold from './ItemsSold';
import RevenueChart from './RevenueChart';
import CategoryData from './CategoryData';
import AvgCreationTimeChart from './AvgCreationTimeChart';
import AvgOrderCompletionTime from './AvgOrderCompletionTime';
import { useTheme } from '../styles/theme';
import OrderChart from './Order_time_Chart';
import { CssBaseline } from '@mui/material';
const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
`;

const Dashboard = ({ data }: any) => {
    const { theme } = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <meta name="viewport" content="width=1024"></meta>
            <Container>
                <h1 style={{ fontFamily: 'Roboto' }}>Dashboard</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', width: '100%', marginBottom: '20px' }}>
                    <ItemsSold itemsSold={data.items_sold} />
                    <CategoryData categoryData={data.category_data} />
                    <AvgOrderCompletionTime avgCompletionTime={data.avg_order_completion_time.avg_completion_time} />
                </div>
                <RevenueChart revenueData={data.item_revenue} />
                <AvgCreationTimeChart creationTimeData={data.item_creation_time} />
                <CssBaseline />
                <OrderChart orderData={data.order_time} />
            </Container>
        </ThemeProvider>
    )
};

export default Dashboard;
