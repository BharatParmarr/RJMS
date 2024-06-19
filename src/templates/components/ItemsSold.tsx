// src/components/ItemsSold.js
import styled from 'styled-components';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

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

const Styledp = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  font-weight: 600;
`;

const StyledUppersontage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  border-radius: 50%;
  padding: 10px;
  gap: 10px;
`;

const Styleduppersontage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`;

const ItemsSold = ({ itemsSold, itemsSoldPercentage }: any) => (
  <Container>
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
      width: '100%',
    }}>
      <Styledh2 style={{ fontFamily: 'Roboto' }}>Total Items Sold </Styledh2>
      <StyledUppersontage>
        <TrendingUpRoundedIcon style={{
          color: '#4CAF50',
          fontSize: 20,
        }} />
        <Styleduppersontage>{itemsSoldPercentage} %</Styleduppersontage>
      </StyledUppersontage>
      <Styledp style={{ fontFamily: 'Roboto' }}>{itemsSold}</Styledp>
    </div>
    <CategoryRoundedIcon style={{
      color: '#FFC107',
      width: 100,
    }} />
  </Container>
);

export default ItemsSold;
