import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import heroImage from '../../assets/Static/home.png';
import { useSpring, animated } from 'react-spring';
// import google fonts

const HeroSection: React.FC = () => {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } });
    const [props_2, set] = useSpring(() => ({ scale: 1 }));
    return (
        <HeroContainer>
            <HeroContent
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <StyledDiv>
                    <animated.div style={{ ...props, width: '45.0%' }}>
                        <animated.div
                            style={{
                                ...props_2,
                                display: 'inline-block',
                            }}
                            onMouseEnter={() => set({ scale: 1.04 })}
                            onMouseLeave={() => set({ scale: 1 })}
                        >
                            <Title>Welcome to Bizztrow</Title>
                        </animated.div>
                        <Subtitle>
                            Empowering Your Restaurant with Seamless Management Solutions.
                        </Subtitle>
                        {/* call to action */}
                        <button style={{
                            backgroundColor: '#f1356d',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }} ><a href="/login">Get Started</a></button>
                    </animated.div>
                    <ImageContainer>
                        <img style={{ width: '100%' }} src={heroImage} alt="Restaurant" />
                    </ImageContainer>
                </StyledDiv>
            </HeroContent>
        </HeroContainer>
    );
};

const HeroContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 110vh;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 1rem;
`;

// const typing = keyframes`
//   from { width: 0 }
//   to { width: 100% }
// `;

// const blink = keyframes`
//   50% { border-color: transparent }
// `;

// const Subtitle = styled.h2`
//   overflow: hidden;
//   border-right: .15em solid orange;
//   white-space: nowrap;
//   margin: 0 auto;
//   letter-spacing: .15em;
//   font-size: 24px;
//   animation: 
//     ${typing} 3.5s steps(40, end),
//     ${blink} .75s step-end infinite;
// `;

const Subtitle = styled.h2`
    font-size: 1.29rem;
    `;

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }   
    `;

const ImageContainer = styled.div`
    width: 50%;

    @media (max-width: 768px) {
        width: 95%;
    }
    `;

export default HeroSection;
