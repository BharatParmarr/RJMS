// import React from 'react';
// import styled from 'styled-components';
// // import { useTheme } from '../styles/theme';
// import { motion } from 'framer-motion';
// import heroImage from '../../assets/Static/home.png';
// import { useSpring, animated } from 'react-spring';
// // import { theme } from 'antd';
// // import google fonts
// import '../css/style.css'
// import { Brand_name } from '../../Veriables';

// const HeroSection: React.FC = () => {
//     const props = useSpring({ opacity: 1, from: { opacity: 0 } });
//     const [props_2, set] = useSpring(() => ({ scale: 1 }));
//     // const { theme } = useTheme();
//     return (
//         <HeroContainer>
//             <HeroContent
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7 }}
//             >
//                 <StyledDiv>
//                     <animated.div style={{ ...props }} className='Main_continer_div'>
//                         <animated.div
//                             style={{
//                                 ...props_2,
//                                 display: 'inline-block',
//                             }}
//                             onMouseEnter={() => set({ scale: 1.04 })}
//                             onMouseLeave={() => set({ scale: 1 })}
//                         >
//                             <Title>{Brand_name}</Title>
//                         </animated.div>
//                         <Subtitle>
//                             Empowering Your Business with Seamless Management Solutions.
//                             <br />
//                         </Subtitle>
//                         {/* call to action */}

//                     </animated.div>
//                     <ImageContainer>
//                         <img style={{ width: '100%' }} src={heroImage} alt="Restaurant" />
//                     </ImageContainer>
//                 </StyledDiv>
//             </HeroContent>
//         </HeroContainer>
//     );
// };

// const HeroContainer = styled.section`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   padding-top: 10vh;
//   background-color: ${({ theme }) => theme.colors.background};

//     @media (max-width: 768px) {
//         flex-direction: column;
//         padding-top: 7.3vh;
//         height: 90;
//     }
// `;

// const HeroContent = styled(motion.div)`
//   text-align: center;
//   color: ${({ theme }) => theme.colors.text};
// `;

// const Title = styled.h1`
//   font-size: 4.5rem;
//   margin-bottom: 1rem;
//   font-weight: 500;
//   font-family: "Roboto", sans-serif;
//   color: ${({ theme }) => theme.colors.primary};
//   letter-spacing: 0.2rem;
// `;

// const Subtitle = styled.h2`
//     font-size: 1.4rem;
//     font-family: "Roboto", sans-serif;
//   font-optical-sizing: auto;
//   font-weight: 400;
//   font-style: normal;
//   margin-top: 1rem;
//     color: ${({ theme }) => theme.colors.text};

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// //    animation on sub title
//     animation: fadeInUp 1s ease-in-out;
//     animation-fill-mode: both;
//     animation-delay: 0.5s;
// @keyframes fadeInUp {
//     from {
//         opacity: 0;
//         transform: translate3d(0, 100%, 0);
//     }
//     to {
//         opacity: 1;
//         transform: none;
//     }
// }

//     `;

// const StyledDiv = styled.div`
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     width: 100%;

//     @media (max-width: 768px) {
//         flex-direction: column;
//     }   
//     `;

// const ImageContainer = styled.div`
//     width: 50%;

//     @media (max-width: 768px) {
//         width: 95%;
//         margin-top: 2rem;
//     }
//     `;

// export default HeroSection;
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import heroImage from '../../assets/Static/home.png';
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
                Simplify Your Business Amplify Your Growth
              </Title>
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

  @media (max-width: 768px) {
    padding-top: 10vh;
    height: auto;
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
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.15rem;
  font-size: 3rem; /* Adjust size for mobile responsiveness */
    font-weight: 700;
    text-align: center;
    margin: 0;
    padding: 0.5rem 1rem;
    line-height: 1.2;
    letter-spacing: 1px;
    background: linear-gradient(194deg, rgba(0,14,241,1) 0%, rgba(156,0,53,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: transform 0.3s ease-in-out;
    

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

// const Subtitle = styled.h2`
//   font-size: 1.4rem;
//   font-weight: 400;
//   color: ${({ theme }) => theme.colors.text};
//   margin-top: 1rem;

//   @media (max-width: 768px) {
//     font-size: 1.2rem;
//   }
// `;

const CallToActionHolder = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
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

  &:hover {
    outline: none;
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;


  @media (max-width: 768px) {
    width: 90%;
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.1));
  filter: saturate(1.5);

`;

const MessageText = styled.div`
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
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
    }
    `;


export default HeroSection;
