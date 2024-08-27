// src/pages/BusinessSettings.js
import styled from 'styled-components';
import UpdateManagerStaff from './component2/UpdateManagerStaff';
import EditBusinessForm from './component2/EditBusinessForm';
import EditHospitalForm from './component2/Edit_Specific_domain_Form';
// import { Divider } from '@mui/material';
import Side_pannel_genral from './component2/Side_pannel_genral';
import { useParams } from 'react-router-dom';

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;


const Div = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 60px;
`;

const BusinessSettings = () => {
    let { id, type_page } = useParams();
    return (
        <SettingsContainer>
            <Side_pannel_genral id={id} option={'Settings'} type_page={type_page} />
            <Div>
                <UpdateManagerStaff />
                <EditBusinessForm />
                <EditHospitalForm />
            </Div>
        </SettingsContainer>
    );
};

export default BusinessSettings;
