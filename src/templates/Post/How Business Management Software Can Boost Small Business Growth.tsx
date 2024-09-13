import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Typography, Container, Grid, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as ScrollLink, Element } from 'react-scroll';

const PageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const ContentContainer = styled(Container)`
  padding-top: 80px;
  padding-bottom: 40px;
`;

const BlogTitle = styled(motion.h1)`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const BlogMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2rem;
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem;
  color: #444;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
`;

const TableOfContents = styled(motion.div)`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 80px;
`;

const NavBar = styled(AppBar)`
  background-color: #fff;
  color: #333;
`;

const NavLinkStyled = styled(ScrollLink)`
  color: #333;
  margin: 0 1rem;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const DrawerContent = styled.div`
  width: 250px;
  padding: 1rem;
`;

const DrawerContent2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-top: 1rem;
    gap: 1rem;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
        font-size: 1rem;
        font-weight: 500;
        flex-direction: column;
    }
`;



const BlogPost_1 = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const blogSections = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'benefits', title: 'Key Benefits' },
        { id: 'features', title: 'Essential Features' },
        { id: 'implementation', title: 'Implementation Strategies' },
        { id: 'conclusion', title: 'Conclusion' },
    ];

    const toggleDrawer = (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const renderNavLinks = () => (
        <DrawerContent2>
            {blogSections.map((section) => (
                <NavLinkStyled
                    key={section.id}
                    to={section.id}
                    smooth={true}
                    duration={500}
                    onClick={() => toggleDrawer(false)}
                >
                    {section.title}
                </NavLinkStyled>
            ))}
        </DrawerContent2>
    );

    return (
        <PageContainer>
            <NavBar position="fixed">
                <Toolbar>
                    {isMobile ? (
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                            <Typography variant="h6" color="inherit">
                                BizWayn
                            </Typography>
                        </IconButton>
                    ) : (
                        renderNavLinks()
                    )}
                </Toolbar>
            </NavBar>

            <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
                <DrawerContent>
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                    {renderNavLinks()}
                </DrawerContent>
            </Drawer>

            <ContentContainer>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <article>
                            <header>
                                <BlogTitle
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeInUp}
                                >
                                    How Business Management Software Can Boost Small Business Growth
                                </BlogTitle>
                                <BlogMeta>
                                    <time dateTime="2024-03-15">March 15, 2024</time> | By Sarah Johnson
                                </BlogMeta>
                                <BlogImage src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Business Management Software" />
                            </header>

                            <Element name="introduction">
                                <section ref={ref}>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Introduction
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        In today's fast-paced business environment, small businesses are constantly seeking ways to streamline operations, increase efficiency, and drive growth. Business management software has emerged as a powerful tool to achieve these goals, offering a wide range of features designed to address the unique challenges faced by small enterprises.
                                    </Paragraph>
                                </section>
                            </Element>

                            <Element name="benefits">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Key Benefits
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        1. Improved Efficiency: Automate routine tasks and streamline workflows to save time and reduce errors.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        2. Enhanced Decision Making: Access real-time data and analytics to make informed business decisions.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        3. Better Customer Relationships: Manage customer interactions and improve service quality with integrated CRM features.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        4. Cost Reduction: Optimize resource allocation and identify areas for cost savings.
                                    </Paragraph>
                                </section>
                            </Element>

                            <Element name="features">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Essential Features
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        • Financial Management: Track expenses, manage invoices, and generate financial reports.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        • Inventory Control: Monitor stock levels, automate reordering, and optimize inventory turnover.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        • Project Management: Plan, execute, and track projects to ensure timely delivery and resource optimization.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        • Customer Relationship Management (CRM): Manage customer data, track interactions, and improve customer satisfaction.
                                    </Paragraph>
                                </section>
                            </Element>

                            <Element name="implementation">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Implementation Strategies
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        1. Assess Your Needs: Identify the specific challenges and goals of your business before selecting a software solution.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        2. Start Small: Begin with core functionalities and gradually expand as your team becomes more comfortable with the system.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        3. Provide Training: Ensure your team is well-trained to maximize the benefits of the new software.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        4. Regularly Review and Optimize: Continuously assess the software's performance and make adjustments as needed.
                                    </Paragraph>
                                </section>
                            </Element>

                            <Element name="conclusion">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Conclusion
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        Business management software has become an indispensable tool for small businesses looking to accelerate growth and stay competitive. By leveraging the right solution, small enterprises can streamline operations, make data-driven decisions, and focus on core business activities. As technology continues to evolve, embracing these powerful tools will be crucial for small businesses aiming to thrive in the digital age.
                                    </Paragraph>
                                </section>
                            </Element>
                        </article>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TableOfContents
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <Typography variant="h6" gutterBottom>Table of Contents</Typography>
                            <List>
                                {blogSections.map((section) => (
                                    <NavLinkStyled key={section.id} to={section.id} smooth={true} duration={500}>
                                        <ListItemText primary={section.title} />
                                    </NavLinkStyled>
                                ))}
                            </List>
                        </TableOfContents>
                    </Grid>
                </Grid>
            </ContentContainer>
        </PageContainer>
    );
};

export default BlogPost_1;