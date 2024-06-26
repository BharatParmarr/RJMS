import styled from "styled-components"
import AlertDialogSlide from "./Service_find_form";

const View_Home = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
    padding: 20px;
`

const ServicesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin-top: 100px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`

const ServicesCard = styled.div`
    position: relative;
    color: ${({ theme }) => theme.colors.text};
    padding: 20px;
    border-radius: 10px;
    width: 30%;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 500px;
    background-image: url('https://img.freepik.com/premium-photo/amazing-lovely-best-this-photo-take-this-picture-your-work-ai-generated-top-wonderful-photo_1078211-270211.jpg?w=740');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.3s;
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.shadow};

    /* Overlay styles */
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:  linear-gradient(0deg, rgba(0,0,0,0.5085025221025911) 5%, rgba(255,255,255,0.04071540725665268) 54%, rgba(0,0,0,0.8866537826067927) 89%);
        border-radius: 10px; /* Match the border-radius of the parent */
    }

    /* Ensure content is layered above the overlay */
    > * {
        position: relative;
        z-index: 1;
    }

    &:hover {
        transform: translateY(-10px);
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 20px;
    }
`




const Cardheading = styled.h2`
    font-size: 24px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    color: ${({ theme }) => theme.colors.primary};
`

const Cardp = styled.p`
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.secondary};
`

function Coustemer_view_Home() {

    const images = {
        restorant: ['https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://img.freepik.com/premium-photo/amazing-lovely-best-this-photo-take-this-picture-your-work-ai-generated-top-wonderful-photo_1078211-270211.jpg?w=740'],
        hotels: ['https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg?t=st=1718911829~exp=1718915429~hmac=eb3c4323fcd1f5f901384083450e1c7e1eb524b302df00342fe354f0c0033768&w=996', 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9zdGVsfGVufDB8fDB8fHww', 'https://images.unsplash.com/photo-1596276020587-8044fe049813?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        services: ['https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
    }
    return (
        <View_Home>
            {/* <Headers toggleColorMode={toggleTheme} mode={colorMode} /> */}
            {/* choose serveci section */}
            <ServicesContainer>
                <ServicesCard style={{
                    backgroundImage: `url(${images.restorant[Math.floor(Math.random() * images.restorant.length)]})`,
                    padding: 0
                }}>
                    <div style={{
                        padding: '20px',
                    }}>
                        <Cardheading>Restaurants and Cafes</Cardheading>
                        <Cardp>
                            Find the best restaurants and cafes around you which are available on our platform.
                        </Cardp>
                        <AlertDialogSlide SearchType={'Restorant'} type={1} />

                    </div>
                </ServicesCard>
                <ServicesCard style={{
                    backgroundImage: `url(${images.hotels[Math.floor(Math.random() * images.hotels.length)]})`,
                    padding: 0
                }}>
                    <div style={{
                        padding: '20px',
                    }}>
                        <Cardheading>PG - Hotel - Stays</Cardheading>
                        <Cardp>
                            Explore and choose from the best PGs, Hotels and Stays available on our platform.
                        </Cardp>
                        <AlertDialogSlide SearchType={'Find Stays'} type={2} />
                    </div>
                </ServicesCard>
                <ServicesCard style={{
                    backgroundImage: `url(${images.services[Math.floor(Math.random() * images.services.length)]})`,
                    padding: 0
                }}>
                    <div style={{
                        padding: '20px',
                    }}>
                        <Cardheading>Service Providers</Cardheading>
                        <Cardp>
                            Find the best service providers around you which are available on our platform.
                        </Cardp>
                        <AlertDialogSlide SearchType={'Services'} type={3} />
                    </div>
                </ServicesCard>
            </ServicesContainer>
        </View_Home>
    )
}

export default Coustemer_view_Home