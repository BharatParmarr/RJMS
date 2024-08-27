import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import Dashboard from './component2/Data_analisys';
import HospitalDataAnalysis from './component2/HospitalDataAnalysis';
import { useParams } from 'react-router-dom';

// Styled-components for page layout and styling
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;


const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const DataAnalysisPage = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    // Spring animation for chart appearance

    if (loading) {
        return (
            <LoaderContainer>
                <CircularProgress />
            </LoaderContainer>
        );
    }
    const { sub_id } = useParams();

    return (
        <PageContainer>
            <Title>Hospital Data Analysis</Title>
            <Dashboard />
            <HospitalDataAnalysis hospitalId={sub_id} />
        </PageContainer>
    );
};

export default DataAnalysisPage;
