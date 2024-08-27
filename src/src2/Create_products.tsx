import HospitalDoctor from './component2/Doctor_form';
import HospitalFacility from './component2/Hospital_facility';
import HospitalNurse from './component2/Nurse_form';
import HospitalRoom from './component2/Room_form'
import styled from 'styled-components'
import Side_pannel_genral from './component2/Side_pannel_genral';
import { useParams } from 'react-router-dom';

const Container = styled.div`
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
`;

const MainHeading = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

function Create_products() {
    let { id, type_page } = useParams();
    return (
        <Container>
            <Side_pannel_genral id={id} option={'Products'} type_page={type_page} />
            <Div>
                <MainHeading>
                    Manage Hospital
                </MainHeading>
                <HospitalDoctor />
                <HospitalNurse />
                <HospitalRoom />
                <HospitalFacility />
            </Div>
        </Container>
    )
}

export default Create_products