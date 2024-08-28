import { useEffect, useState } from "react"
import styled from "styled-components"
import apis from "../../apis";
import { useNavigate } from "react-router-dom";

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.background};
    margin-bottom: 50px;
`;

const Heading = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-family: 'Roboto', sans-serif;
    text-transform: capitalize;
    align-self: flex-start;
    margin-left: 20px;
    margin-top: 20px;
`;

const BusinessList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background};
    margin-bottom: 50px;
`;

const Business = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    border-radius: 5px;
    width: 30%;
    min-width: 300px;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 0px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.white};

    @media (max-width: 768px) {
        width: 90%;
    }

    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }
`;

const BusinessName = styled.h2`
    color: ${({ theme }) => theme.colors.text};
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    margin-left: 10px;
    text-transform: capitalize;
`;

const BusinessAddress = styled.p`
    color: ${({ theme }) => theme.colors.gray};
    margin-left: 10px;
    margin-bottom: 10px;
`;

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    right: 20px;
    transition: all 0.3s ease;


    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

const BusinesesImage = styled.img`
    width: 100%;
    height: 200px;
    border-radius: 5px 5px 0px 0px;
    object-fit: contain;
`;



function Busineses({ props }: any) {
    const type = props.params.type
    const [businesses, setBusinesses] = useState([]);

    // navigation
    const navigate = useNavigate();


    useEffect(() => {
        if (type == 'hospital') {

            const fetchBusinesses = async () => {
                try {
                    const response = await apis.get('/businesses');
                    console.log(response)
                    setBusinesses(response.data.results);
                } catch (error) {
                    console.error('Error fetching businesses:', error);
                }
            };

            fetchBusinesses();
        }
    }, [])

    return (
        <DivContainer>
            <Heading>{type} List</Heading>
            <BusinessList>
                {businesses.length > 0 ? businesses.map((business: any) => (
                    <Business key={business.id} onClick={() => {
                        navigate(`/Manage/${type.toLowerCase()}/${business.id}/${business.business_id}`)
                    }}>
                        <BusinesesImage src={business.logo} alt={business.name} />
                        <BusinessName>{business.name}</BusinessName>
                        <BusinessAddress>{business.address.length < 25 ? business.address.length :
                            business.address.substring(0, 25) + '...'
                        }</BusinessAddress>
                    </Business>
                )) :
                    <Business>
                        <BusinessName>No {type} found</BusinessName>
                    </Business>}
            </BusinessList>
            {businesses.length > 0 ? <StyledButton onClick={() => {
                navigate(`/Manage/create/${type.toLowerCase()}`)
            }}>Register New {type}</StyledButton> :
                <StyledButton onClick={() => {
                    navigate(`/Manage/create/${type.toLowerCase()}`)
                }}>Register First {type}</StyledButton>}
        </DivContainer>
    )
}

export default Busineses