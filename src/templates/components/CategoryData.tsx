// src/components/CategoryData.js
import React from 'react';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

interface Category {
    item__category__name: string;
    total_orders: number;
    total_revenue: number;
}

interface CategoryDataProps {
    categoryData: Category[];
}

const CategoryData: React.FC<CategoryDataProps> = ({ categoryData }) => (
    <Container>
        <h2 style={{ fontFamily: 'Roboto' }}>Category Data</h2>
        <ul style={{ fontFamily: 'Roboto', listStyle: 'none' }}>
            {categoryData.map((category: Category) => (
                <li key={category.item__category__name}>
                    {category.item__category__name}: {category.total_orders} orders, {category.total_revenue} revenue
                </li>
            ))}
        </ul>
    </Container>
);

// export default CategoryData;

export default CategoryData;
