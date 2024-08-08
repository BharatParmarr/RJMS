import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import SimpleAlert from './components/succes_aleart';
import styled from 'styled-components';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

const InfoContainer = styled.div`
  color: #fff;
  padding: 29px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 100px 0;

  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  flex: 1;
  justify-content: center;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
  justify-content: center;
  
`;

const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;

`;

const TextWrapper = styled.div`
  width: 60%;
  padding-top: 0;
  padding-bottom: 60px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const TopLine = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.2rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 1.9rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease-in-out;
  animation: fadeIn 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }


  @keyframes fadeIn {
    from {
      color: ${({ theme }) => theme.colors.primary};
    },
    to {
      color: ${({ theme }) => theme.colors.secondary};
      }
  }
`;

const Heading = styled.h1`
  margin-bottom: 30px;
  font-size: 3.6rem;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;

  @media screen and (max-width: 768px) {

  & span {
    display: none;
  }
  }
`;

const Subtitle = styled.p`
  margin-bottom: 35px;
  font-size: 1.4rem;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text}db;
  font-weight: 500;
  text-align: justify;
  font-family: 'Poppins', sans-serif;
`;


const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  width: 48%;

  @media screen and (max-width: 768px) {
    width: 100%;

  }
`;


const CardTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Poppins', sans-serif;
`;

const CardText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const Cardaction = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Morphinediv = styled.div`
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
    }
`;



const MorphingText: React.FC = () => {
  const { theme } = useTheme();
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  const texts = [
    "Productivity", "Availability", "Security"
  ];

  const morphTime = 1;
  const cooldownTime = 2.25;

  const textIndexRef = useRef(texts.length - 1);
  const timeRef = useRef(new Date().getTime());
  const morphRef = useRef(0);
  const cooldownRef = useRef(cooldownTime);

  useEffect(() => {
    const elts = {
      text1: text1Ref.current,
      text2: text2Ref.current
    };

    if (elts.text1 && elts.text2) {
      elts.text1.textContent = texts[textIndexRef.current % texts.length];
      elts.text2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    }

    const animate = () => {
      requestAnimationFrame(animate);

      const newTime = new Date().getTime();
      const shouldIncrementIndex = cooldownRef.current > 0;
      const dt = (newTime - timeRef.current) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) {
        if (shouldIncrementIndex) {
          textIndexRef.current = textIndexRef.current + 1;
        }

        doMorph();
      } else {
        doCooldown();
      }
    };

    const doMorph = () => {
      morphRef.current -= cooldownRef.current;
      cooldownRef.current = 0;

      let fraction = morphRef.current / morphTime;

      if (fraction > 1) {
        cooldownRef.current = cooldownTime;
        fraction = 1;
      }

      setMorphStyles(fraction);
    };

    const setMorphStyles = (fraction: number) => {
      if (elts.text1 && elts.text2) {
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        elts.text1.textContent = texts[textIndexRef.current % texts.length];
        elts.text2.textContent = texts[(textIndexRef.current + 1) % texts.length];
      }
    };

    const doCooldown = () => {
      morphRef.current = 0;

      if (elts.text1 && elts.text2) {
        elts.text2.style.filter = "";
        elts.text2.style.opacity = "100%";

        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";
      }
    };

    animate();
  }, []);

  return (
    <Morphinediv style={{
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        color: theme.colors.primary,
      }} id="text1" ref={text1Ref}></div>
      <div style={{
        position: 'absolute',
        color: theme.colors.primary,
        zIndex: -1,
      }} id="text2" ref={text2Ref}></div>
    </Morphinediv>
  );
};




const InfoSection = () => {
  const { theme } = useTheme();

  return (
    <InfoContainer>
      <InfoWrapper>
        <InfoRow>
          <Column1>
            <TextWrapper>
              <TopLine>
                How we are usefull to you!
              </TopLine>
              <Heading>
                <span style={{
                  color: 'transparent',
                }}> m
                </span>
                <MorphingText />
              </Heading>
              <Subtitle>
                Our platform is designed to increase productivity and ease of access to your data. We provide the best security to ensure your data is safe and secure.
                <br />
                <br />
                We provide a wide range of services to help you manage your business, from inventory management to data analysis. Our platform is designed to be easy to use and accessible from anywhere.
                <br />
                <br />
                Our platform is designed to increase productivity and ease of access to your data. We provide the best security to ensure your data is safe and secure.
              </Subtitle>
            </TextWrapper>
          </Column1>
          <Column2>
            <Card>
              <CloudDoneIcon style={{
                fontSize: '2.5rem',
                color: theme.colors.primary,
                marginBottom: '20px',
              }} />
              <CardTitle>
                Cloud Accessibility
              </CardTitle>
              <CardText>
                Use our platform from anywhere in the world. Our cloud-based platform is accessible from any device with an internet connection.
              </CardText>
              <a href="#" className="">
                <Cardaction >
                  Get Started
                </Cardaction></a>
            </Card>
            <Card>
              <Inventory2RoundedIcon style={{
                fontSize: '2.5rem',
                color: theme.colors.secondary,
                marginBottom: '20px',
              }} />
              <CardTitle>
                Inventory Management
              </CardTitle>
              <CardText>
                Keep track of your inventory with our easy-to-use platform. Our platform is designed to help you manage your inventory with ease.
              </CardText>
              <a href="#" className="">
                <Cardaction >
                  Get Started
                </Cardaction></a>
            </Card>

          </Column2>
        </InfoRow>
      </InfoWrapper>
    </InfoContainer>
  );
}



const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  // alert stats
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const [type, setType] = useState('success');

  type Theme = 'light' | 'dark';

  useEffect(() => {
    const isOnline = window.navigator.onLine;
    if (!isOnline) {
      setMessage('No internet connection');
      setType('error');
      setOpen(true);
    }
  }, []);


  let colorMode = 'light' as Theme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header toggleColorMode={toggleTheme} mode={colorMode} />
      <HeroSection />
      <InfoSection />
      <ServicesSection />
      <Footer />
      <div style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        minWidth: '300px',
        zIndex: 1000,
      }}>
        <SimpleAlert
          message={message}
          type={type}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;

