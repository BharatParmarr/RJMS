import styled, { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashbordImage from '../../assets/Static/dashbord_image.svg';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../../templates/styles/theme';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
`;

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 60px;
  margin-top: 20px;
  `;

const StyledSlidingCard = styled.div`
  background-color: ${props => props.theme.colors.primary}25;
    color: ${props => props.theme.colors.text};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 30%;
    transition: all 0.3s ease;
    &:hover {
        transform: translateY(-4px);
    }
        width: 70%;
    `;

const StyledcardHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

const ActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${props => props.theme.colors.primary}29;
        color: ${props => props.theme.colors.text};
    }
        width: 30%;
        align-self: baseline;
`;


// src/Slider.js


const images = [
    'https://images.pexels.com/photos/1322184/pexels-photo-1322184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?text=Slide+2',
    'https://images.unsplash.com/photo-1629721671030-a83edbb11211?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?text=Slide+3'
];

const SliderWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 300px;
  overflow: hidden;
  margin: auto;
    border-radius: 8px;
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const StyledH2 = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.primary};
    gap: 15px;
`;

const StyledP = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.text};
    font-size: 18px;
    font-weight: 500;
`;

const SliderMoveButton = styled.div`
position: absolute;
top: 50%;
transform: translateY(-50%);
cursor: pointer;
color: white;
transition: all 0.3s ease;
color: ${props => props.theme.colors.gray};
`;

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
    }),
};

const Slider = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = page % images.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setPage([page + 1, 1]);
        }, 4500);

        return () => clearInterval(timer);
    }, [page]);

    const text_to_overlay = [
        '“The only limit to our realization of tomorrow will be our doubts of today.”  — Franklin D. Roosevelt',
        '“I feel that luck is preparation meeting opportunity.” —Oprah Winfrey',
        'Acheived 100% growth in sales',
    ];


    return (
        <SliderWrapper>
            <AnimatePresence initial={false} custom={direction}>
                <Slide
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    style={{
                        backgroundImage: `url(${images[imageIndex]})`,
                    }}
                >
                    <SliderMoveButton onClick={() => setPage([page - 1, -1])} style={{
                        left: '15px'
                    }}><ArrowCircleLeftRoundedIcon fontSize='large' /></SliderMoveButton>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.866537826067927) 10%, rgba(255,255,255,0.02923081341911764) 100%)'
                    }}>
                        <h4 style={{
                            color: 'white',
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Adding text shadow for better readability
                            // backgroundColor: 'rgba(0,0,0,1)', // Adding a semi-transparent background
                            padding: '9px', // Adding some padding to not stick the text directly to its borders
                            borderRadius: '5px', // Optional: adding rounded corners for aesthetic purposes
                            maxWidth: '90%', // Optional: limiting the width of the text to make it look better
                        }}>{text_to_overlay[imageIndex]}</h4>
                    </div>
                    <SliderMoveButton style={{ right: '15px', }} onClick={() => setPage([page + 1, 1])}>
                        <ArrowCircleRightRoundedIcon fontSize='large' />
                    </SliderMoveButton>
                </Slide>
            </AnimatePresence>
        </SliderWrapper>
    );
};

// function Selaction({ data = 'month', month, setMonth }: { data: string, month: string, setMonth: any }) {


//     const handleChange = (event: SelectChangeEvent) => {
//         setMonth(event.target.value as string);
//     };

//     const years = ['2023', '2024'];

//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


//     return (
//         <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">{data.toLocaleUpperCase()}</InputLabel>
//                 {data === 'month' ? <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={month}
//                     label="Month"
//                     onChange={handleChange}
//                 >
//                     {months.map((month) => <MenuItem value={month}>{month}</MenuItem>)}
//                 </Select> : <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={month}
//                     label="Year"
//                     onChange={handleChange}
//                 >
//                     {years.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
//                 </Select>}
//             </FormControl>
//         </Box>
//     );
// }



const Dashboard = () => {
    const { theme } = useTheme();
    // const [month, setMonth] = React.useState('');
    // const [year, setYear] = React.useState('');

    // const ref = React.useRef(false);
    // useEffect(() => {
    //     const date = new Date();
    //     setMonth(date.toLocaleString('default', { month: 'long' }));
    //     setYear(date.getFullYear().toString());
    // }, []);


    // useEffect(() => {
    //     if (month === '' || year === '') {
    //         return;
    //     }
    //     if (ref.current == false) {
    //         ref.current = true;
    //         return;
    //     }
    //     // Fetch data from the Django API for the selected month and year
    // }, [month, year]);
    return (
        <ThemeProvider theme={theme}>
            <meta name="viewport" content="width=1024"></meta>
            <Container style={{
                padding: '20px',
            }}>
                {/* <h1 style={{ fontFamily: 'Roboto' }}>Dashboard</h1> */}
                <StyledCardContainer>
                    <StyledSlidingCard>
                        <StyledcardHeader>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: 10,

                            }} >
                                <StyledH2>Dashboard <DashboardCustomizeRoundedIcon /></StyledH2>
                                <StyledP>Dashboard for the sales data of the items sold. <br />
                                    Maximise the sales by analysing the data and taking necessary actions.
                                    <br />
                                    This data is not shared with any third party or Ony one else. This is only for the your use.
                                </StyledP>
                                <ActionButton>
                                    <span>Details</span>
                                    <InfoRoundedIcon />
                                </ActionButton>
                            </div>
                            <img src={DashbordImage} alt="Dashboard" style={{
                                width: 230, height: 250, borderRadius: '8px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                objectFit: 'cover',
                            }} />
                        </StyledcardHeader>
                    </StyledSlidingCard>
                    <Slider />
                </StyledCardContainer>
                {/* <Container style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <Selaction data='month' month={month} setMonth={setMonth} />
                    <Selaction data='year' month={year} setMonth={setYear} />
                </Container> */}
                {/* <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', width: '100%', marginBottom: '20px' }}>
                    <ItemsSold itemsSold={itemsSold} itemsSoldPercentage={data.items_sold_percentage} />
                    <AvgOrderCompletionTime avgCompletionTime={data.avg_order_completion_time.avg_completion_time} />
                </div> */}
                {/* <CategoryData categoryData={category_data} /> */}
                {/* <CategoryChart data={category_data} /> */}
                {/* selection of month and year for data */}

                {/* <RevenueChart revenueData={itemsrevenue} /> */}
                {/* <AvgCreationTimeChart creationTimeData={item_creation_time} /> */}
                <CssBaseline />
                {/* <OrderChart orderData={order_time} /> */}
            </Container>
        </ThemeProvider>
    )
};

export default Dashboard;






// const options = {
//     scales: {
//         y: {
//             type: 'linear',
//             display: true,
//             position: 'left',
//         },
//         y1: {
//             type: 'linear',
//             display: true,
//             position: 'right',
//             grid: {
//                 drawOnChartArea: false, // only want the grid lines for one axis to show up
//             },
//         },
//     },
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Category Wise Total Orders and Revenue',
//         },
//     },
// };

// const Styledh2 = styled.h2`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: ${props => props.theme.colors.primary};
//   gap: 15px;
// `;

// const Styleddiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 20px;
//   margin-bottom: 20px;
//   background-color: ${props => props.theme.colors.white};
//   padding: 20px;
//     border-radius: 8px;
// `;
// const CategoryChart = ({ data }: any) => {

//     const data_convet = {
//         labels: data.map((item: { item__category__name: any; }) => item.item__category__name),
//         datasets: [
//             {
//                 label: 'Total Orders',
//                 data: data.map((item: { total_orders: any; }) => item.total_orders),
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 yAxisID: 'y',
//             },
//             {
//                 label: 'Total Revenue',
//                 data: data.map((item: { total_revenue: any; }) => item.total_revenue),
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 yAxisID: 'y1',
//             }
//         ],
//     };
//     return (
//         <Container>
//             <Styleddiv style={{
//                 display: 'flex',
//                 justifyContent: 'space-around',
//                 flexDirection: 'column',
//                 width: '100%',
//             }}>
//                 <Styledh2 style={{ fontFamily: 'Roboto' }}>Category Cart</Styledh2>
//                 <Bar data={data_convet} options={options as any} />
//             </Styleddiv>
//         </Container>
//     );
// }
