import React from 'react';
import styled from 'styled-components';
// import { useTheme } from '../styles/theme';
import { motion } from 'framer-motion';
import heroImage from '../../assets/Static/home.png';
import { useSpring, animated } from 'react-spring';
// import { theme } from 'antd';
// import google fonts
import '../css/style.css'
import { Brand_name } from '../../Veriables';

const HeroSection: React.FC = () => {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } });
    const [props_2, set] = useSpring(() => ({ scale: 1 }));
    // const { theme } = useTheme();
    return (
        <HeroContainer>
            <HeroContent
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <StyledDiv>
                    <animated.div style={{ ...props }} className='Main_continer_div'>
                        <animated.div
                            style={{
                                ...props_2,
                                display: 'inline-block',
                            }}
                            onMouseEnter={() => set({ scale: 1.04 })}
                            onMouseLeave={() => set({ scale: 1 })}
                        >
                            <Title>Welcome to {Brand_name}</Title>
                        </animated.div>
                        <Subtitle>
                            Empowering Your Business with Seamless Management Solutions.
                            <br />
                            <br />
                            Get Started Today and take your business to the next level.
                        </Subtitle>
                        {/* call to action */}

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
  height: 100vh;
  padding-top: 10vh;

    @media (max-width: 768px) {
        flex-direction: column;
        padding-top: 7.3vh;
        height: 90;
    }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2.9rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-family: "Oswald", sans-serif;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Subtitle = styled.h2`
    font-size: 1.6rem;
    font-family: "Edu TAS Beginner", cursive;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  margin-top: 1rem;
    color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    width: 100%;
  }
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
        margin-top: 2rem;
    }
    `;

export default HeroSection;
