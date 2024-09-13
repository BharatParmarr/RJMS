import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Typography, Container, Grid, List, ListItemText, AppBar, Toolbar, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
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

const BlogPost = () => {
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
        { id: 'main-points', title: 'Main Points' },
        { id: 'sub-topics', title: 'Sub-Topics' },
        { id: 'conclusion', title: 'Conclusion' },
        { id: 'conclusion2', title: 'Conclusion2' },
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
                                    // as={motion.h1}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeInUp}
                                >
                                    The Impact of Artificial Intelligence on Modern Business
                                </BlogTitle>
                                <BlogMeta>
                                    <time dateTime="2024-09-09">September 9, 2024</time> | By John Doe
                                </BlogMeta>
                                <BlogImage src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blog Image" />
                            </header>

                            <Element name="introduction">
                                <section ref={ref}>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Introduction
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        Artificial Intelligence (AI) is revolutionizing the way businesses operate in the 21st century. From automating routine tasks to providing deep insights through data analysis, AI is becoming an indispensable tool for modern enterprises.
                                    </Paragraph>
                                </section>
                            </Element>

                            <Element name="main-points">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Main Points
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        1. Enhanced Decision Making: AI-powered analytics help businesses make data-driven decisions.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        2. Improved Customer Experience: Chatbots and personalized recommendations are changing how businesses interact with customers.
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        3. Operational Efficiency: AI can automate repetitive tasks, freeing up human resources for more complex work.
                                    </Paragraph>
                                </section>
                            </Element>

                            <Element name="sub-topics">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Sub-Topics
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        • Machine Learning in Predictive Maintenance
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        • Natural Language Processing for Customer Service
                                    </Paragraph>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        • Computer Vision in Quality Control
                                    </Paragraph>
                                </section>
                            </Element>

                            <Element name="conclusion">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Conclusion
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        As AI continues to evolve, its impact on business will only grow. Companies that embrace AI and integrate it into their operations will be better positioned to compete in an increasingly digital marketplace.
                                        <br />
                                        AI is the future of business and it is important for businesses to stay ahead of the curve. If not now, then when?
                                    </Paragraph>
                                </section>
                            </Element>
                            <Element name="conclusion2">
                                <section>
                                    <SectionTitle variants={fadeInUp} animate={controls}>
                                        Conclusion2
                                    </SectionTitle>
                                    <Paragraph variants={fadeInUp} animate={controls}>
                                        As AI continues to evolve, its impact on business will only grow. Companies that embrace AI and integrate it into their operations will be better positioned to compete in an increasingly digital marketplace.
                                        <br />
                                        AI is the future of business and it is important for businesses to stay ahead of the curve. If not now, then when?
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

export default BlogPost;