// src/components/AvgOrderCompletionTime.js
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const AvgOrderCompletionTime = ({ avgCompletionTime }: any) => (
  <Container>
    <h2 style={{ fontFamily: 'Roboto' }}>Average Order Completion Time</h2>
    <p style={{ fontFamily: 'Roboto' }}>{avgCompletionTime} ms</p>
  </Container>
);

export default AvgOrderCompletionTime;
