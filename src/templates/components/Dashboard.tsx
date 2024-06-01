// src/components/Dashboard.js
import styled, { ThemeProvider } from 'styled-components';
import ItemsSold from './ItemsSold';
import RevenueChart from './RevenueChart';
import CategoryData from './CategoryData';
import AvgCreationTimeChart from './AvgCreationTimeChart';
import AvgOrderCompletionTime from './AvgOrderCompletionTime';
import { useTheme } from '../styles/theme';

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
`;

const Dashboard = ({ data }: any) => {
    const { theme } = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ItemsSold itemsSold={data.items_sold} />
                <CategoryData categoryData={data.category_data} />
                <AvgOrderCompletionTime avgCompletionTime={data.avg_order_completion_time.avg_completion_time} />
                <RevenueChart revenueData={data.item_revenue} />
                <AvgCreationTimeChart creationTimeData={data.item_creation_time} />
            </Container>
        </ThemeProvider>
    )
};

export default Dashboard;
