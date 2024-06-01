import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  const StyledFooter = styled.footer`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.footerBg};
  color: ${({ theme }) => theme.colors.footerText};
  text-align: center;
`;

  const FooterContent = styled.div`
  font-size: 0.9rem;
`;

  const SocialLinks = styled.div`
  a {
    margin-right: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.footerText};
  }
`;

  const PageLinks = styled.div`
  a {
    margin-right: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.footerText};
  }
`;

  const Quote = styled.p`
  font-style: italic;
  margin: 1rem 0;
    color: ${({ theme }) => theme.colors.footerText};
    font-size: 0.69rem;
    margin-top: 3rem;
`;

  const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
  return (
    <StyledFooter>
      <FooterContent>
        <StyledDiv>
          <SocialLinks>
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.twitter.com/yourpage" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">Instagram</a>
          </SocialLinks>
          <PageLinks>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </PageLinks>
        </StyledDiv>
        <Quote>"Your inspirational quote here."</Quote>
        &copy; 2024 Bizztrow. All rights reserved.
      </FooterContent>
    </StyledFooter>
  );
};



export default Footer;