import { useEffect, useState } from "react"
import styled from "styled-components"
import apis from "../../apis";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useNotification from "../../General/useNotification";
import Button from "@mui/material/Button";
import WaitingListJoinForm from "../../templates/Waiting_list_join_form";
import API_HOST from "../../config";
const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const Heading = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-family: 'Roboto', sans-serif;
    text-transform: capitalize;
    align-self: flex-start;
    width: 100%;
    text-align: center;
    margin-top: 30px;
`;

const BusinessList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 90%;
    margin: 0 auto;
    padding: 40px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gradiant1};
    margin-bottom: 50px;
    margin-top: 30px;
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Business = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    border-radius: 10px;
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
    margin-top: 20px;
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

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.black};
`;

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    left: 20px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.white};
    }
`;

const StyledButton2 = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 5%;
    cursor: pointer;
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1000;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    `;

const BusinesesImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0px 0px;
    object-fit: contain;
    object-position: center;
`;




function Busineses({ props }: any) {
    const type = props.params.type
    const [businesses, setBusinesses] = useState([]);
    const [backdrop, setBackdrop] = useState(false)
    const [showForm, setShowForm] = useState(false);
    const [UserHaspermission, setUserHaspermission] = useState(false);
    const [waitingList, setWaitingList] = useState(false);
    function show() {
        setShowForm(!showForm);
    }
    useEffect(() => {
        if (showForm) {
            window.history.pushState(null, '', window.location.href);
        }
    }, [showForm]);
    window.addEventListener('popstate', () => {
        if (showForm) {
            setShowForm(false);
        }
    });
    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/api/check/user_has_permission/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.waiting_list, 'data');
                setUserHaspermission(data.permission);
                setWaitingList(data.waiting_list);
            })
            .catch(error => console.error('Error:', error));
    }, [])


    const { openNotification } = useNotification()
    const navigate = useNavigate();
    useEffect(() => {
        if (type == 'hospital') {
            setBackdrop(true)
            const fetchBusinesses = async () => {
                try {
                    const response = await apis.get('/businesses');
                    console.log(response)
                    setBusinesses(response.data.results);
                    // set local storage
                    let posistion_obj: any = {
                        'hospital': {}
                    }
                    response.data.results.forEach((business: any) => {
                        posistion_obj.hospital[business.id] = business.position
                    })
                    localStorage.setItem('position', JSON.stringify(posistion_obj));
                    console.log(posistion_obj, 'posistion_obj')
                } catch (error) {
                    console.error('Error fetching businesses:', error);
                    openNotification('error', 'Error', 'Error fetching businesses')
                } finally {
                    setBackdrop(false)
                }
            };

            fetchBusinesses();
        }
    }, [])




    return (
        <DivContainer>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Heading>{type} List</Heading>
            <BusinessList>
                {businesses.length > 0 ? businesses.map((business: any) => (
                    <Business key={business.id} onClick={() => {
                        navigate(`/Manage/${type.toLowerCase()}/${business.id}/${business.business_id}?position=${business.position}`)
                    }}>
                        <BusinesesImage src={business.logo} alt={business.name} />
                        <BusinessName>{business.name}</BusinessName>
                        <BusinessAddress>{business.address.length < 35 ? business.address.length :
                            business.address.substring(0, 35) + '...'
                        }</BusinessAddress>
                    </Business>
                )) :
                    <Business>
                        <BusinessName>No {type} found</BusinessName>
                    </Business>}
            </BusinessList>
            <StyledButton2 onClick={() => {
                navigate('/')
            }}><ArrowBackIcon /></StyledButton2>
            {UserHaspermission ?
                <StyledButton onClick={() => {
                    navigate(`/Manage/create/${type.toLowerCase()}`)
                }}>New {type}</StyledButton>
                :
                <StyledButton onClick={() => { show() }}>Waiting List</StyledButton>}

            {showForm && <StyledForm
                style={{
                    display: showForm ? 'block' : 'none',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    overflow: 'auto',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                }}
            >
                <Button onClick={() => show()} style={{
                    backgroundColor: `${({ theme }: any) => theme.colors.white}`,
                    color: `${({ theme }: any) => theme.colors.primary}`,
                    borderRadius: '10px',
                    padding: '10px',
                    marginBottom: '20px',
                    boxShadow: `${({ theme }: any) => theme.colors.shadow}`,
                    position: 'absolute',
                    top: '12px',
                    right: '0',
                    fontSize: '1.5rem',
                }}
                    variant="text"
                >X</Button>
                <WaitingListJoinForm waitingList={waitingList} setWaitingList={(value: any) => setWaitingList(value)} />
            </StyledForm>}
        </DivContainer>
    )
}

export default Busineses