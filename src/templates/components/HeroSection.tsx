import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import heroImage from '../../assets/Static/home.png';
import heroImage2 from '../../assets/Static/hero1.jpg';
import { useSpring, animated } from 'react-spring';
import '../css/style.css';
// import { Brand_name } from '../../Veriables';
import { useNavigate } from 'react-router-dom';



const HeroSection: React.FC = () => {
  const fadeInProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 300 });
  const scaleProps = useSpring({ scale: 1, config: { tension: 200, friction: 20 } });
  const navigate = useNavigate();

  const [is_logged_in, set_is_logged_in] = React.useState(false);
  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      set_is_logged_in(true);
    }
  }, []);

  return (
    <HeroContainer>
      <HeroContent
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <ContentWrapper>
          <TextSection>
            <animated.div style={fadeInProps}>
              <animated.div
                style={scaleProps}
                onMouseEnter={() => scaleProps.scale.set(1.05)}
                onMouseLeave={() => scaleProps.scale.set(1)}
              >
                {/* <Title>{Brand_name.toUpperCase()}</Title> */}
              </animated.div>
              <Title>
                {/* Simplify Your Business Amplify Your Growth */}
                Simplify, Automate, Elevate
              </Title>
              <SubTitle>
                From Chaos to Clarity, in One Click
              </SubTitle>
              <CallToActionHolder>
                <CallToAction onClick={() => {
                  { is_logged_in ? navigate('/create-restaurant') : navigate('/auth') }
                }} style={{
                  backgroundColor: '#0b52e0',
                }} >Restorant</CallToAction>
                <CallToAction onClick={() => {
                  { is_logged_in ? navigate('/Manage/Hospital?type=hospital') : navigate('/auth') }
                }} style={{
                  backgroundColor: '#bd0052',
                }} >Hospital</CallToAction>
                <CallToAction onClick={() => {
                  window.location.href = 'https://fitwayn.com';
                }} style={{
                  backgroundColor: '#d13800',
                }} >Fitness</CallToAction>
              </CallToActionHolder>
            </animated.div>
          </TextSection>
          <ImageContainer>
            <HeroImage src={heroImage} alt="Business Solutions" />
          </ImageContainer>
          <MessageText>
            <p>
              "Serving the best solutions for your business needs."
            </p>
          </MessageText>
        </ContentWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 5vh 2vw;
  // background-image: url(${heroImage2});
  // background-image: url('https://images.pexels.com/photos/9002742/pexels-photo-9002742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  

  @media (max-width: 768px) {
    padding-top: 10vh;
    height: 100vh;
    padding-bottom: 10vh;
  }

`;

const HeroContent = styled(motion.div)`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: auto;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.15rem;
  font-size: 2.8rem; /* Adjust size for mobile responsiveness */
  font-weight: 900;
  text-align: center;
  margin: 0;
  padding: 0.5rem 1rem;
  line-height: 1.2;
  letter-spacing: 1px;
  background: linear-gradient(194deg, rgba(0,14,241,1) 0%, rgba(156,0,53,1) 100%);
  -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease-in-out;
  font-family: 'Aboreto', sans-serif;
  color: ${({ theme }) => theme.colors.text};
  // text-shadow: -0.06em 0 red,  0.06em 0 cyan; 
  

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const SubTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0.5rem 1rem;
  line-height: 1.2;
  letter-spacing: 1px;
  background: linear-gradient(194deg, rgba(0,14,241,1) 0%, rgba(156,0,53,1) 100%);
  -webkit-background-clip: text;
  font-family: 'Lato', serif;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  `;


const CallToActionHolder = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
        bottom: 0;
    }
    `;

const CallToAction = styled.button`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  border-radius: 3rem;
  transition: transform 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background: linear-gradient(194deg, rgba(0,14,241,1) 0%, rgba(156,0,53,1) 100%);
  background: #0b52e0!important;


  &:hover {
    outline: none;
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 1rem;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: none;
  justify-content: center;


  @media (max-width: 768px) {
    width: 90%;
  }
`;

const HeroImage = styled.img`
  max-width: 90%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.1));
  filter: saturate(1.5);
  transform: perspective(1000px);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: perspective(0px);
  }
`;

const MessageText = styled.div`
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
    position: absolute;
    bottom: 4rem;
    left: 50%;
    transform: translateX(-50%);

    
    p {
        font-style: italic;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        position: relative;
        bottom: 0;
    }
    `;


export default HeroSection;
