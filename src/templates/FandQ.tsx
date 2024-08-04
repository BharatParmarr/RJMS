import styled from 'styled-components'
import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
import { useTheme } from './styles/theme';

const FandQContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    `

const StyledAccordion = styled(Accordion)`
    width: 50%;

    @media (max-width: 768px) {
        width: 90%;
    }
    
    `
function Fandq() {
    const { theme } = useTheme();

    const Quations = [
        {
            id: 1,
            question: "What is the purpose of this website?",
            answer: "The purpose of this website is to provide a platform for students to find a hostel room and for hostel owners to list their rooms. It is a win-win situation for both parties."
        },
        {
            id: 2,
            question: "How do I list my hostel room?",
            answer: "To list your hostel room, you need to create an account and log in. Once you are logged in, you can click on the 'Create Room' button and fill in the required details."
        },
        {
            id: 3,
            question: "How do I find a hostel room?",
            answer: "To find a hostel room, you need to create an account and log in. Once you are logged in, you can search for available rooms by entering your preferred location, price range, and other filters."
        },
        {
            id: 4,
            question: "How do I pay for a hostel room?",
            answer: "To pay for a hostel room, you need to contact the hostel owner directly. The payment method will depend on the hostel owner's preference."
        },
        {
            id: 5,
            question: "How do I contact the hostel owner?",
            answer: "To contact the hostel owner, you can send them a message through the website. You can also find their contact details on the room listing page."
        },
        {
            id: 6,
            question: "How do I report a problem with a hostel room?",
            answer: "To report a problem with a hostel room, you can send us a message through the website. We will investigate the issue and take appropriate action."
        }
    ]
    return (
        <FandQContainer>
            <h1 style={{
                color: theme.colors.primary,
                fontSize: '2rem',
                marginTop: '2rem',
                marginBottom: '2rem'
            }}>FAQs</h1>
            {/* quations and expandeble ans component */}
            {Quations.map((item, index) => (
                <StyledAccordion key={index} sx={{
                    backgroundColor: theme.colors.white,
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    color: theme.colors.text,

                }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h3>{item.question}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>{item.answer}</p>
                    </AccordionDetails>
                </StyledAccordion>
            ))}
        </FandQContainer>
    )
}

export default Fandq