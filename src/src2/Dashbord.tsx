import { useParams } from 'react-router-dom'
// import DashboardComponetn from './component2/DashBordComponent';
import styled from 'styled-components';
import Side_pannel_genral from './component2/Side_pannel_genral';
import { useEffect, useState } from 'react';
import { apis2 } from '../apis';
import Dashboard2 from './component2/DashBordComponent2';

const DashBordContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

function Dashbord() {
    const { sub_id } = useParams();

    const [Dashbord_data, setDashbord_data] = useState({});

    useEffect(() => {
        // Fetch data from API
        apis2.get('/dashbord/' + sub_id).then((response) => {
            console.log(response.data, 'l');
            setDashbord_data(response.data);
        });
    }, []);
    let { id, type_page } = useParams();

    return (
        <DashBordContainer>
            <Side_pannel_genral id={id} option={'Dashbord'} type_page={type_page} />
            {/* <DashboardComponetn /> */}
            <Dashboard2 data={Dashbord_data} />
        </DashBordContainer>
    )
}

export default Dashbord