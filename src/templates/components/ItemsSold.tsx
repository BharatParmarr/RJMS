// src/components/ItemsSold.js
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 8px;
`;

const ItemsSold = ({ itemsSold }: any) => (
  <Container>
    <h2 style={{ fontFamily: 'Roboto' }}>Items Sold</h2>
    <p style={{ fontFamily: 'Roboto' }}>{itemsSold}</p>
  </Container>
);

export default ItemsSold;
