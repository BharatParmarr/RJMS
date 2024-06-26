import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import './style/search_box.css'
import { useTheme } from '../templates/styles/theme';
import styled from 'styled-components';
import API_HOST from '../config';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';



const StyledHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;

    @media (max-width: 768px) {
        gap: 0px;
    }
`
const StyledInput = styled.input`
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    outline: none;

    @media (max-width: 768px) {
        width: 100%;
    }
`
const StyledUl = styled.ul`
    list-style: none;
    padding: 4px;
    margin: 0;
    width: 100%;
    height: 70vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    

    // scrollbar styles
    &::-webkit-scrollbar {
        width: 4px;
        
    }
    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.gray};
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.primary};
        border-radius: 5px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`

const StyledLi = styled.li`
    padding: 0px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.text};
    outline: none;
    color: '#000';
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
    margin-bottom: 10px;
    &:hover {
        background-color: ${({ theme }) => theme.colors.text};
        color: ${({ theme }) => theme.colors.primary};
    }
    height: 200px;
    background-size: cover;
    background-position: center;
    width: 30%;

    @media (max-width: 768px) {
        width: 100%;
        height: 200px;
        flex-wrap: wrap;
    }
`

const StyledP = styled.p`
    font-size: 12px;
    color: '#fff';
`

const StyledDialogContent = styled(DialogContent)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
    width: 100%;
    }
`



function CardBuissnes({ item, index, type }: any) {
    console.log(item, 'item')

    const navigate = useNavigate();
    let link_type = '404'
    if (type === 1) {
        link_type = 'restorant'
    } else if (type === 2) {
        link_type = 'hostels'
    } else if (type === 3) {
        link_type = 'Service-shop'
    }

    let defult_images = ['https://c8.alamy.com/comp/2H47HT0/restaurant-icon-monochrome-sign-from-big-city-life-collection-creative-restaurant-icon-illustration-for-web-design-infographics-and-more-2H47HT0.jpg', 'https://c8.alamy.com/comp/2C841X6/hostel-services-concept-vector-illustration-2C841X6.jpg', 'https://thumbs.dreamstime.com/z/vector-illustration-concept-business-workflow-idea-to-product-service-creative-flat-design-web-banner-marketing-124626018.jpg']


    return (
        <StyledLi key={index}
            style={{
                backgroundImage: { item }.item.logo ? `url(${API_HOST + item.logo})` : `url(${defult_images[type]})`,
            }}
            onClick={() => {
                navigate('/' + link_type + '/home/' + item.id, { state: { item } })
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, rgba(255,255,255,0.04071540725665268) 3%, rgba(16,16,16,0.8362336145395658) 49%, rgba(0,0,0,0.8026201691614145) 53%, rgba(0,0,0,0.8362336145395658) 57%, rgba(0,0,0,0.5085025221025911) 94%)',
                color: '#fff',
            }}>
                {item.name}
                {item.address && item.address.length > 22 ? <StyledP>{item.address.substring(0, 22)}...</StyledP> : <StyledP>{item.address}</StyledP>}
            </div>
        </StyledLi>
    )

}




const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ SearchType, type }: any) {
    const { theme } = useTheme();
    const [open, setOpen] = React.useState(false);
    // handle button click 

    useEffect(() => {
        // Function to handle back button press
        const handleBackButton = ({ event }: any) => {
            if (open) {
                setOpen(false);
                // Prevent the default back action
                event.preventDefault();
            }
        };

        // Add an entry to the history stack when open becomes true
        if (open) {
            window.history.pushState({ open: true }, '');
        }

        // Listen for the popstate event, which is triggered by pressing the back button
        window.addEventListener('popstate', handleBackButton);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('popstate', handleBackButton);
    }, [open]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [search, setSearch] = React.useState('')
    const [result, setResult] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        // fetch data from api
        if (search === '') {
            setResult([])
            return
        }
        setLoading(true)
        fetch(`${API_HOST}/api/Search?q=${search}&type=${type}`).then(res => res.json()).then(data => {
            console.log(data)
            setResult(data)
        }).catch(err => console.log(err)).finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        })
    }, [search])
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}
                style={{
                    backgroundColor: theme.colors.primary,
                    color: '#fff',
                }}
            >
                {SearchType}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullScreen
            >
                <DialogTitle style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                }}>{SearchType}</DialogTitle>
                <StyledDialogContent >
                    {/* search bar and resutl with styled component  */}
                    <StyledHolder>
                        <StyledInput type="text" placeholder="Search.." name="search" autoFocus
                            autoComplete='off'
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            value={search}
                        />
                        {/* <StyledButton>Search</StyledButton> */}
                        <StyledUl>
                            {loading ?
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}>
                                    <CircularProgress />
                                </Box>
                                :
                                result.map((item: any, index: number) => (
                                    <CardBuissnes item={item} index={index} type={type} />
                                ))
                            }
                        </StyledUl>
                    </StyledHolder>
                </StyledDialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}
