import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutUsSection: React.FC = () => {
    return (
        <AboutUsContainer>
            <Heading>About Us</Heading>
            <HeroSection>
                <HeroContent>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Revolutionizing Business Management
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Empowering enterprises with cutting-edge software solutions
                    </motion.p>
                </HeroContent>
            </HeroSection>

            <ContentSection>
                <SectionTitle>Our Mission</SectionTitle>
                <FlexContainer>
                    <TextContent>
                        <p>At BizWayn, we're on a relentless pursuit to transform the landscape of business management. Our mission is to empower organizations of all sizes with state-of-the-art software solutions that drive efficiency, foster innovation, and catalyze growth.</p>
                        <p>We believe that every business, from startups to multinational corporations, deserves access to powerful, intuitive tools that can streamline operations and unlock their full potential.</p>
                    </TextContent>
                    <ImageWrapper>
                        <img style={{ width: "100%", maxHeight: "50vh", objectFit: "cover" }} src="https://images.unsplash.com/photo-1680472139496-aec545d8392b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Our Mission" />
                    </ImageWrapper>
                </FlexContainer>
            </ContentSection>

            <ContentSection>
                <SectionTitle>How We Help</SectionTitle>
                <FlexContainer reverse>
                    <TextContent>
                        <p>Our suite of advanced software solutions is designed to address the complex challenges faced by modern businesses:</p>
                        <FeatureList>
                            <FeatureItem>AI-Driven Analytics: Harness the power of machine learning to gain actionable insights and make data-driven decisions.</FeatureItem>
                            <FeatureItem>Process Automation: Streamline workflows and eliminate repetitive tasks, allowing your team to focus on high-value activities.</FeatureItem>
                            <FeatureItem>Cloud Integration: Seamlessly connect your business processes across platforms and devices for unparalleled flexibility.</FeatureItem>
                            <FeatureItem>Customizable Modules: Tailor our software to fit your unique business needs with modular, scalable solutions.</FeatureItem>
                        </FeatureList>
                    </TextContent>
                    <ImageWrapper>
                        <img src="https://plus.unsplash.com/premium_photo-1675644726841-a9ae77b72d9e?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Our Solutions" />
                    </ImageWrapper>
                </FlexContainer>
            </ContentSection>

            <ContentSection>
                <SectionTitle>Our Vision</SectionTitle>
                <VisionStatement>
                    Shaping the future of business in the digital age
                </VisionStatement>
                <p>We envision a world where businesses of all sizes can harness the full potential of technology to drive innovation, efficiency, and growth. Our goal is to create an ecosystem that not only simplifies business management but also fosters a new era of digital transformation across industries.</p>
            </ContentSection>

            <ContentSection>
                <SectionTitle>Future Plans</SectionTitle>
                <FlexContainer>
                    <TextContent>
                        <p>As we look to the future, our roadmap is filled with ambitious plans to further revolutionize business management:</p>
                        <FuturePlansList>
                            <PlanItem>
                                <PlanTitle>Global AI Research Center</PlanTitle>
                                <PlanDescription>Establishing a cutting-edge facility dedicated to advancing AI technologies for business applications.</PlanDescription>
                            </PlanItem>
                            <PlanItem>
                                <PlanTitle>Industry-Specific Solutions</PlanTitle>
                                <PlanDescription>Developing tailored software packages for emerging industries and niche markets.</PlanDescription>
                            </PlanItem>
                            <PlanItem>
                                <PlanTitle>Small Business Empowerment Initiative</PlanTitle>
                                <PlanDescription>Launching a global program to accelerate digital adoption among small and medium enterprises.</PlanDescription>
                            </PlanItem>
                            <PlanItem>
                                <PlanTitle>Strategic Tech Alliances</PlanTitle>
                                <PlanDescription>Forming partnerships with leading technology innovators to integrate breakthrough technologies.</PlanDescription>
                            </PlanItem>
                        </FuturePlansList>
                    </TextContent>
                    <ImageWrapper>
                        <img style={{ width: "100%", maxHeight: "50vh", objectFit: "cover" }} src="https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Our Future Plans" />
                    </ImageWrapper>
                </FlexContainer>
            </ContentSection>

            <CommitmentSection>
                <h2>Our Commitment</h2>
                <p>We are dedicated to pushing the boundaries of what's possible in business technology. Our commitment to innovation, excellence, and client success drives us to continuously evolve our solutions and services. Together, we're not just adapting to the future of business – we're defining it.</p>
            </CommitmentSection>
        </AboutUsContainer>
    );
};

const Heading = styled.h1`
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #ffffff;
  position: absolute;
  top: 2vh;
  left: 1vw;
`;

const AboutUsContainer = styled.div`
  background-color: #0a0a0a;
  color: #e0e0e0;
  font-family: 'Roboto', sans-serif;
`;

const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroContent = styled.div`
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  p {
    font-size: 1.5rem;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
  }
`;

const ContentSection = styled.section`
  padding: 5rem 10%;
  background: linear-gradient(45deg, #0a0a0a, #1a1a1a);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const FlexContainer = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const ImageWrapper = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 60%;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  }
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  &:before {
    content: "▹";
    color: #00ffff;
    position: absolute;
    left: 0;
  }
`;

const VisionStatement = styled.h3`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #00ffff;
`;

const FuturePlansList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const PlanItem = styled.div`
  background: rgba(0, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
  }
`;

const PlanTitle = styled.h4`
  color: #00ffff;
  margin-bottom: 0.5rem;
`;

const PlanDescription = styled.p`
  font-size: 0.9rem;
`;

const CommitmentSection = styled.section`
  background: linear-gradient(to right, #0a0a0a, #1a1a1a);
  padding: 5rem 10%;
  text-align: center;

  h2 {
    color: #00ffff;
    margin-bottom: 1rem;
  }

  p {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

export default AboutUsSection;