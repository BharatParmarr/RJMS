import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useSpring, animated } from 'react-spring';

const HeroSectionBlogs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
  text-align: center;
  color: #ffffff;
  margin-bottom: 2rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  position: relative;
  z-index: 1;
  padding: 4rem 2rem;
  
  height: 60vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow: hidden;

`;

const SeconSection = styled.div`
  padding: 4rem 2rem;
    position: relative;
    z-index: 1;
`

const PageContainer = styled.div`
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  min-height: 100vh;
  background: rgb(19,28,71);
background: radial-gradient(circle, rgba(19,28,71,1) 0%, rgba(27,5,10,1) 100%);
`;

const Title = styled(motion.h1)`
  color: #ffffff;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 6rem;
`;

const BlogCard = styled(motion(Card))`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogTitle = styled(Typography)`
  color: #ffffff;
  font-weight: bold;
`;

const BlogExcerpt = styled(Typography)`
  color: #cccccc;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  background: rgb(131,58,180);
background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
background: rgb(19,28,71);
background: radial-gradient(circle, rgba(19,28,71,1) 0%, rgba(27,5,10,1) 100%);
`;

const NavbarBrand = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const BrandText = styled.h1`
  color: #ffffff;
  font-size: 1.5rem;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavItem = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        color: #ffcc00;
    }

    &:after {
        content: '';
        display: block;
        height: 2px;
        width: 0;
        background: #ffcc00;
        transition: width 0.3s;
    }

    &:hover:after {
        width: 100%;
    }
`;

const StyledSubtitleTypography = styled(Typography)`
    color: #ffffff;
    font-weight: 300;
    width: 50%;
    `;

const AnimatedGrid = animated(Grid);

const blogPosts = [
    { id: 1, title: 'The Future of AI', excerpt: 'Exploring the potential impact of artificial intelligence on our daily lives.', image: 'https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, title: 'Sustainable Business Practices', excerpt: 'How companies are adapting to meet environmental challenges.', image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, title: 'Remote Work Revolution', excerpt: 'The shifting landscape of office culture and productivity in the digital age.', image: 'https://source.unsplash.com/random/800x600?remote-work' },
    { id: 4, title: 'Blockchain in Finance', excerpt: 'Understanding the role of blockchain technology in reshaping financial systems.', image: 'https://source.unsplash.com/random/800x600?blockchain' },
    { id: 5, title: 'The Psychology of Leadership', excerpt: 'Insights into effective leadership strategies and team management.', image: 'https://source.unsplash.com/random/800x600?leadership' },
    { id: 6, title: 'Data-Driven Decision Making', excerpt: 'How businesses are leveraging big data to inform strategic choices.', image: 'https://source.unsplash.com/random/800x600?data' },
];

const BlogListing = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const titleAnimation = useAnimation();
    const cardAnimation = useAnimation();

    useEffect(() => {
        if (inView) {
            titleAnimation.start({
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, ease: 'easeOut' }
            });
            cardAnimation.start({
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, staggerChildren: 0.1 }
            });
        }
    }, [inView, titleAnimation, cardAnimation]);

    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

    const calc = (x: number, y: number) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x: number, y: number) => `translate3d(${x / 10}px,${y / 10}px,0)`;
    const trans2 = (x: number, y: number) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;

    return (
        <PageContainer
            onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
        >
            <Navbar>
                <NavbarBrand href="/">
                    <Logo src="/logo.svg" alt="Logo" />
                    <BrandText>BizWayn</BrandText>
                </NavbarBrand>
                <NavMenu>
                    <NavItem href="#blog-listing">About</NavItem>
                    <NavItem href="/">Services</NavItem>
                    <NavItem href="/contact">Contact</NavItem>
                    <NavItem href="#">Blog</NavItem>
                </NavMenu>
            </Navbar>
            <HeroSectionBlogs>
                <Typography variant="h2" gutterBottom>
                    Stay informed with our latest blog posts.
                </Typography>
                <StyledSubtitleTypography variant="h6" gutterBottom>
                    Discover innovative ideas, insights, and practical advice that will help you make informed decisions and drive better results.
                </StyledSubtitleTypography>
            </HeroSectionBlogs>
            <SeconSection>
                <Title
                    ref={ref}
                    initial={{ y: -50, opacity: 0 }}
                    animate={titleAnimation}
                    id="blog-listing"
                >
                    Our Latest Insights
                </Title>
                <AnimatedGrid
                    container
                    spacing={4}
                    style={{ transform: xy.interpolate(trans1) }}
                >
                    {blogPosts.map((post, index) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <BlogCard
                                initial={{ y: 50, opacity: 0 }}
                                animate={cardAnimation}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <BlogImage src={post.image} alt={post.title} loading='lazy' />
                                <CardContent>
                                    <BlogTitle variant="h5" gutterBottom>
                                        {post.title}
                                    </BlogTitle>
                                    <BlogExcerpt variant="body2">
                                        {post.excerpt}
                                    </BlogExcerpt>
                                </CardContent>
                            </BlogCard>
                        </Grid>
                    ))}
                </AnimatedGrid>
                <animated.div style={{ transform: xy.interpolate(trans2), position: 'absolute', top: '50%', left: '50%', width: '300px', height: '300px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(100px)' }} />
            </SeconSection>
        </PageContainer>
    );
};

export default BlogListing;