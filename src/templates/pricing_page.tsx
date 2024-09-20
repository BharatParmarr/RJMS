import { useState } from 'react';
import API_HOST from '../config';
import './css/pricing.css'
import { useTheme } from './styles/theme';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Star from '@mui/icons-material/Star';
import Rocket from '@mui/icons-material/Rocket';
import ThumbsUp from '@mui/icons-material/ThumbsUpDown';

function FormDialog({ open, setOpen, setCode, makeRequset, type }: any) {

    const [code, setcodevalue] = useState('')
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                }}
                onSubmit={() => {
                    setCode(code)
                    makeRequset(type)
                    handleClose()
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter code to activate your subscription.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="Code"
                        label="Code"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={code}
                        onChange={(e) => {
                            setcodevalue(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        setCode(code)
                        makeRequset(type)
                        handleClose()
                    }}>submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default function Pricing_page() {
    const { theme } = useTheme();
    const [code, setCode] = useState('')
    const [open, setOpen] = useState(false);

    const makeRequset = async (plan: string) => {
        if (plan === 'free') {
            fetch(API_HOST + '/api/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    'plan': plan,
                    'code': code
                })
            }).then((res) => {
                if (res.ok) {
                    window.location.href = '/'
                } else {

                    alert('Something went wrong')
                }
                return res.json()
            }).then((data) => {
                console.log(data)
            })
        }
    }
    return (
        <section className="plans__container" style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            minHeight: '100vh',
            padding: '2rem 0',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="plans">
                <div className="plansHero">
                    <h1 className="plansHero__title">Simple, Transparent pricing</h1>
                    <p className="plansHero__subtitle">No contracts. No suprise fees.</p>
                </div>
                <div className="planItem__container">
                    <div className="planItem planItem--free" style={{
                        backgroundColor: theme.colors.white,
                        color: theme.colors.text,
                    }}>

                        <div className="card">
                            <div className="card__header">
                                <h2>Free</h2>
                            </div>
                        </div>

                        <div className="price">₹ 0<span>/ month</span></div>

                        <ul className="featureList">
                            <li>2 Business</li>
                            <li>Own analytics platform</li>
                            <li className="disabled">Chat support</li>
                            <li className="disabled">Unlimited users</li>
                        </ul>

                        <div className="button get-started-button"
                            onClick={() => {
                                setOpen(true)
                            }}
                            style={{
                                background: theme.colors.background,
                                color: theme.colors.black,
                            }}>Get Started</div>
                        <FormDialog open={open} setOpen={setOpen} setCode={setCode} makeRequset={makeRequset} type='free' />
                    </div>
                    <div className="planItem planItem--pro" style={{
                        backgroundColor: theme.colors.white,
                        color: theme.colors.text,
                    }}>
                        <div className="card">
                            <div className="card__header">
                                {/* <div className="card__icon symbol"></div> */}
                                <h2>Pro</h2>
                                {/* <div className="card__label label">Best Value</div> */}
                            </div>
                            {/* <div className="card__desc">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</div> */}
                        </div>

                        <div className="price">₹ 7999<span>/ month</span></div>

                        <ul className="featureList">
                            <li>10 Business</li>
                            <li>Own analytics platform</li>
                            <li>Chat support</li>
                            <li className="disabled">Mobile application</li>
                            <li >Unlimited users</li>
                        </ul>

                        <button className="button button--pink get-started-button">Get Started</button>
                    </div>
                    <div className="planItem planItem--entp" style={{
                        backgroundColor: theme.colors.white,
                        color: theme.colors.text,
                    }}>
                        <div className="card">
                            <div className="card__header">
                                <div className="card__icon"></div>
                                <h2>Enterprise</h2>
                            </div>
                            {/* <div className="card__desc">Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor</div> */}
                        </div>

                        <div className="price">Let's Talk</div>

                        <ul className="featureList">
                            {/* <li>2 links</li> */}
                            <li>Own analytics platform</li>
                            <li>Chat support</li>
                            <li>Mobile application</li>
                            <li>Unlimited users</li>
                            <li>Customize Panel</li>
                        </ul>
                        <div className="button button--white get-started-button" onClick={() => {
                            window.location.href = "mailto:bharat2901parmar@gmail.com"
                        }}>Get Started</div>
                    </div>
                </div>
            </div>
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{
                    backgroundColor: `${theme.colors.background}`,
                    backdropFilter: 'blur(6px)',
                }}

            >
                <DialogTitle id="alert-dialog-title" style={{
                    color: `${theme.colors.primary}`,
                    background: theme.colors.background,
                }}>
                    {"Subscription Free!"}
                </DialogTitle>
                <DialogContent style={{
                    color: theme.colors.gray,
                    background: theme.colors.background,
                }}>
                    <DialogContentText id="alert-dialog-description" style={{
                        color: theme.colors.gray,
                        background: theme.colors.background,
                    }}>
                        {/* <h3 style={{
                            color: `${theme.colors.text}`
                        }}>You just need to create an account and you are good to go.</h3>
                        <br />
                        We are providing free subscription to all users.
                        <br />
                        <br />
                        Enjoy the service and let us know if you need any help. */}
                        <PromotionalCard />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </section>
    )
}


const StyledCard = styled(Card)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.common.white,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    maxWidth: 400,
    margin: '2rem auto',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
}));

const CardBackground = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
});

const StyledCardContent = styled(CardContent)({
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
});

const Title = styled(Typography)(({ }) => ({
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
}));

const HighlightText = styled('span')(({ theme }) => ({
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
}));

const IconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1.5rem',
});


const PromotionalCard = () => {
    return (
        <StyledCard>
            <CardBackground />
            <StyledCardContent>
                <Title variant="h4">
                    Join Our Platform for Free!
                </Title>
                <Typography variant="body1" component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    You just need to create an account and you're good to go. We're providing a <HighlightText>free subscription</HighlightText> to all users.
                </Typography>
                <Typography variant="body1" component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    Enjoy the service and let us know if you need any help.
                </Typography>
                <Typography variant="body1" component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                    <HighlightText>Limited spots available!</HighlightText> We currently have a waitlist due to high demand.
                </Typography>
                <IconWrapper>
                    <Star />
                    <Rocket />
                    <ThumbsUp />
                </IconWrapper>
            </StyledCardContent>
        </StyledCard>
    );
};