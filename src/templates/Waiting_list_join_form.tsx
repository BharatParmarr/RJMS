// waiting list join form

import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import Logo from '../assets/Static/logo.png'
import API_HOST from '../config';

const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
});

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'radial-gradient(circle, rgba(0,1,44,1) 0%, rgba(0,0,0,1) 100%)',
    padding: '20px',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    justifySelf: 'center',
    transition: 'all 0.3s ease-in-out',

});

const Heading = styled(Typography)({
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'white',
});


const StyledButton = styled(Button)({
    marginTop: '20px',
    color: 'white',
    background: 'linear-gradient(90deg, rgba(29,69,253,1) 0%, rgba(252,69,98,1) 100%)',
    '&:hover': {
        background: 'linear-gradient(90deg, rgba(29,69,253,1) 0%, rgba(252,69,98,1) 100%)',
    },
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '50px',
});

const StyledTypography = styled(Typography)({
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: 'white',
    letterSpacing: '0.5px',
    fontWeight: '300'
});

const CompenyName = styled(Typography)({
    fontSize: '2.9rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    background: ' linear-gradient(90deg, rgba(29,69,253,1) 0%, rgba(252,69,98,1) 100%)',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // clip background to border-box
    backgroundClip: 'text',
    color: 'transparent',
    textAlign: 'center',

});

const LogoImage = styled('img')({
    width: '5%',
    objectFit: 'contain',
    marginBottom: '40px',

    '@media (max-width: 768px)': {
        width: '20%',
    },
});

const WaitingListJoinForm = ({ waitingList, setWaitingList }: { waitingList: any, setWaitingList: any }) => {
    async function handleJoin() {
        let token = localStorage.getItem('token');
        let response = await fetch(`${API_HOST}/api/check/user_has_permission/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        console.log(response);
        let data = await response.json();
        setWaitingList(data.waiting_list);
    }
    console.log(waitingList);
    return (
        <Container>
            <LogoImage src={Logo} />
            {!waitingList ? <Heading>Join the Waiting List for <CompenyName>BizWayn</CompenyName></Heading> : <StyledTypography>
                You are on the waiting list.
                <br />
                We appreciate your interest! Unfortunately, due to overwhelming demand, we are currently unable to accept new registrations.
                <br />
                We’ll keep you updated via your registered email.
                <br />
            </StyledTypography>}
            {!waitingList && <StyledForm >
                <StyledTypography>
                    Sorry, Due to high demand, we are not allowing new Registrations.
                    <br />
                    Join the waiting list.
                    <br />
                    You will be notified for approval on your registered email.
                    <br />
                </StyledTypography>
                <StyledButton onClick={() => handleJoin()}>Join</StyledButton>
            </StyledForm>}
        </Container>
    );
};

export default WaitingListJoinForm;