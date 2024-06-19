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
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Styledh2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  gap: 15px;
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
    margin-bottom: 10px;
    padding: 10px 20px;
    margin-top: 10px;
    gap: 30px;
`;

const Styledliholder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 10px 20px;
    background-color: ${props => props.theme.colors.primary}39;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

const Styledli = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  font-weight: 600;
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
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            width: '100%',

        }}>
            <Styledh2 style={{ fontFamily: 'Roboto' }}>Category Data</Styledh2>
            <StyledUl style={{ fontFamily: 'Roboto', listStyle: 'none' }}>
                {categoryData.map((category: Category) => (
                    <Styledliholder key={category.item__category__name}>
                        <Styledli >
                            {category.item__category__name}
                        </Styledli>
                        <Styledli >
                            {category.total_orders} orders,
                        </Styledli>
                        <Styledli>
                            {category.total_revenue.toFixed(0)} revenue
                        </Styledli>
                    </Styledliholder>
                ))}
            </StyledUl>
        </div>
    </Container>
);

// export default CategoryData;

export default CategoryData;
