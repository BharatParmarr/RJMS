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
                                {/* <div className="card__icon symbol symbol--rounded"></div> */}
                                <h2>Free</h2>
                            </div>
                            {/* <div className="card__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</div> */}
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
                    color: `${theme.colors.primary}`
                }}>
                    {"Subscription Free!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{
                        color: `${theme.colors.gray}`
                    }}>
                        <h3 style={{
                            color: `${theme.colors.text}`
                        }}>You just need to create an account and you are good to go.</h3>
                        <br />
                        We are providing free subscription to all users.
                        <br />
                        <br />
                        Enjoy the service and let us know if you need any help.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </section>
    )
}
