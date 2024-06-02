import React from 'react';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import HistoryIcon from '@mui/icons-material/History';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const StyledFab = styled(Fab)(() => ({
    transition: 'width 0.3s ease-in-out',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const AnimatedText = styled(animated.span)(({ theme }) => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block',
    marginLeft: theme.spacing(1),
}));

const AnimatedButton = ({ id }: any) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = React.useState(false);

    const textAnimation = useSpring({
        width: hovered ? 'auto' : '0px',
        opacity: hovered ? 1 : 0,
    });

    return (
        <StyledFab
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => navigate('/order-history/' + id)}
            variant="extended"
            sx={{ width: hovered ? 'auto' : 56 }}
        >
            <HistoryIcon sx={{ mr: 1 }} />
            <AnimatedText style={textAnimation}>
                Orders History
            </AnimatedText>
        </StyledFab>
    );
};

export default AnimatedButton;
