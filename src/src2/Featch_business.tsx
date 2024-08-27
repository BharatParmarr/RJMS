// import apis from "../apis";
import styled from "styled-components";
import Busineses from "./component2/Busineses";
import { useSearchParams } from 'react-router-dom';


const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    `;

function Featch_business() {
    let [searchParams] = useSearchParams();
    let type = searchParams.get('type')
    let props = { params: { type: type } }
    return (
        <MainContainer>
            <Busineses props={props} />
        </MainContainer>
    )
}

export default Featch_business