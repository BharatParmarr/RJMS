import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const ServicesSection: React.FC = () => {

    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            setTimeout(() => controls.start("visible"), 200);
            // controls.start("visible");
        }
    }, [controls, inView])
    return (
        <Element name="servicesSection">
            <div ref={ref}>
                <motion.div
                    animate={controls}
                    initial="hidden"
                    transition={{ duration: 0.5 }}
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0 }
                    }}
                >
                    <ServicesContainer>
                        <Service>
                            <ServiceTitle>Table Management</ServiceTitle>
                            <ServiceDescription>Efficiently manage table bookings and customer seating.</ServiceDescription>
                        </Service>
                        <Service>
                            <ServiceTitle>Order Tracking</ServiceTitle>
                            <ServiceDescription>Keep track of orders from the kitchen to the customer's table.</ServiceDescription>
                        </Service>
                        <Service>
                            <ServiceTitle>Analytics</ServiceTitle>
                            <ServiceDescription>Get insights into your restaurant's performance with detailed reports.</ServiceDescription>
                        </Service>
                        <Service>
                            <ServiceTitle>Table Management</ServiceTitle>
                            <ServiceDescription>Efficiently manage table bookings and customer seating.</ServiceDescription>
                        </Service>
                        <Service>
                            <ServiceTitle>Table Management</ServiceTitle>
                            <ServiceDescription>Efficiently manage table bookings and customer seating.</ServiceDescription>
                        </Service>
                    </ServicesContainer>
                </motion.div>
            </div>
        </Element>
    );
};

const ServicesContainer = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 2.4rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
 
  }
`;

const Service = styled.div`
    flex: 1;
    max-width: 269px;
    text-align: center;
    shadow: ${({ theme }) => theme.colors.shadow};
    padding: 2rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.objectBg};
    transition: transform 0.3s;
    &:hover {
    transform: translateY(-10px);
    }
    margin: 1rem;
    min-height: 200px;
    @media (max-width: 768px) {
        margin: 1rem 0;
    }

`;

const ServiceTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export default ServicesSection;
