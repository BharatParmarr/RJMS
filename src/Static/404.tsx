import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import './404.css'
// Define styled components
const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
});

const AnimatedBox = styled(motion.div)({
    marginBottom: '20px',
});

const AnimatedSvg = styled(animated.div)({
    width: '150px',
    height: '150px',
    marginBottom: '20px',
});

const StyledForm = styled(animated.form)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'gray',

});

const NotFound: React.FC = () => {
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        config: { duration: 1000 },
    });

    const [showGame, setShowGame] = React.useState(false);
    // const [gameScore, setGameScore] = React.useState({
    //     user: 0,
    //     computer: 0,
    // });
    // const [gameMessage, setGameMessage] = React.useState('');

    return (
        <StyledContainer maxWidth="sm">
            <AnimatedBox
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h1" component="div" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                    Oops! Page not found.
                </Typography>
            </AnimatedBox>
            <AnimatedSvg style={props}>
                {/* Placeholder for your SVG */}
                <svg
                    width="150"
                    height="150"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13h-2v-2h2v2zm-4 0h-2v-2h2v2zm-4 0H7v-2h2v2zm4-4h-2V7h2v4z"
                        fill="currentColor"
                    />
                </svg>
            </AnimatedSvg>
            {showGame && <StyledForm style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                <input type="radio" id="rock-rock" name="rock-paper-scissors" />
                <input type="radio" id="rock-paper" name="rock-paper-scissors" />
                <input type="radio" id="rock-scissors" name="rock-paper-scissors" />
                <input type="radio" id="paper-rock" name="rock-paper-scissors" />
                <input type="radio" id="paper-paper" name="rock-paper-scissors" />
                <input type="radio" id="paper-scissors" name="rock-paper-scissors" />
                <input type="radio" id="scissors-rock" name="rock-paper-scissors" />
                <input type="radio" id="scissors-paper" name="rock-paper-scissors" />
                <input type="radio" id="scissors-scissors" name="rock-paper-scissors" />

                <div>
                    <h1>CSS Rock-Paper-Scissors</h1>
                    <div id="hands">
                        <div className="hand" id="computer-hand">
                            <div className="fist"></div>
                            <div className="finger finger-1"></div>
                            <div className="finger finger-2"></div>
                            <div className="finger finger-3"></div>
                            <div className="finger finger-4"></div>
                            <div className="thumb"></div>
                            <div className="arm"></div>
                        </div>

                        <div className="hand" id="user-hand">
                            <div className="fist"></div>
                            <div className="finger finger-1"></div>
                            <div className="finger finger-2"></div>
                            <div className="finger finger-3"></div>
                            <div className="finger finger-4"></div>
                            <div className="thumb"></div>
                            <div className="arm"></div>
                        </div>

                        <div id="icons">
                            <div>
                                <label htmlFor="rock-rock">✊</label>
                                <label htmlFor="paper-rock">✊</label>
                                <label htmlFor="scissors-rock">✊</label>
                            </div>
                            <div>
                                <label htmlFor="rock-paper">🖐️</label>
                                <label htmlFor="paper-paper">🖐️</label>
                                <label htmlFor="scissors-paper">🖐️</label>
                            </div>
                            <div>
                                <label htmlFor="rock-scissors">✌</label>
                                <label htmlFor="paper-scissors">✌</label>
                                <label htmlFor="scissors-scissors">✌</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="message">
                    <h2></h2>
                    {/* <input type="reset" value="Refresh Round" /> */}
                </div>

            </StyledForm>}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px',
            }}>
                {!showGame && <Button variant="contained" color="primary" href="/">
                    Go to Home
                </Button>}
                Or
                <Button variant="contained" color="primary" onClick={() => {
                    setShowGame(!showGame)
                }}>
                    {showGame ? 'Close' : 'Play Game'}
                </Button>
            </div>
        </StyledContainer>
    );
};

export default NotFound;
