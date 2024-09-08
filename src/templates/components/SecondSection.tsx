import styled from "styled-components"
import { Carousel } from 'antd';
import { Key } from "react";

const MainContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    padding: 40px;
`

const SecondWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 27%;
    height: 85%;
    padding: 10px;
    border-radius: 16px;
    margin-top: 10px;
    margin-left: 10px;
`

const Wrapper1 = styled.div`
    width: 72%;
    height: 85%;
    margin: 0 auto;
    border-radius: 16px;
    margin-top: 10px;
    margin-left: 10px;
    overflow: hidden;
`

const Wrapper2 = styled.div`
    display: flex;
    width: 100%;
    background: ${({ theme }) => theme.colors.background};
    height: 30%;
    margin: 0 auto;
    padding: 10px;
    border-radius: 16px;
    margin-top: 10px;
    margin-left: 10px;
    right: 0;
    `

const SubWrapper2_1 = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    margin: 0 auto;
`

const Wrapper3 = styled.div`
    display: flex;
    width: 28%;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.background};
`

const ListUL = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Listli = styled.li`
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    background-color: #f90000;
    width: 100%;
    text-align: center;
`


// image slider 

const CarouselHolder = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.background};
`


const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f90000;
    overflow: hidden;
`

const ImageText = styled.h1`
    font-size: 2rem;
    color: #f9f9f9;
    margin: 10px;
    text-align: center;
    position: absolute;
    z-index: 1;
    background-color: #00000080;
    border-radius: 8px;
    font-family: 'lobster';
    padding: 10px;
`

const ImageDisplay = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: relative;
`


function ImageSlider({ Image_list }: any) {

    return (
        <CarouselHolder>
            <Carousel autoplay arrows >
                {Image_list.map((item: { title: any; image: string | undefined; description: string | undefined }, index: Key | null | undefined) => {
                    return (
                        <ImageWrapper key={index}>
                            {/* <ImageText>{item.title}</ImageText> */}
                            <ImageText>{item.description}</ImageText>
                            <ImageDisplay src={item.image} alt="image" />
                        </ImageWrapper>
                    )
                })}
            </Carousel>
        </CarouselHolder>
    )
}

// data slider

const DataWrapper = styled.div`
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.text};
`

const DataTitle = styled.h1`
    font-size: 2rem;
    color: #f9f9f9;
    color: ${({ theme }) => theme.colors.text};
    
`

const DataDescription = styled.p`
    font-size: 1rem;
    color: #f9f9f9;
    color: ${({ theme }) => theme.colors.text};

`

function DataSlider({ DataSlider }: any) {

    return (
        <CarouselHolder>
            <Carousel autoplay>
                {DataSlider.map((item: { title: any; description: any; }, index: Key | null | undefined) => {
                    return (
                        <DataWrapper key={index}>
                            <DataTitle>{item.title}</DataTitle>
                            <DataDescription>{item.description}</DataDescription>
                        </DataWrapper>
                    )
                })}
            </Carousel>
        </CarouselHolder >
    )
}


function SecondSection() {

    let Image_list = [
        {
            image: "https://plus.unsplash.com/premium_photo-1661688164534-db78aaf825b0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Manage your business",
            description: "Manage your business with our tools and services <br> and get the best results."
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1724800663657-3e57bf4f622c?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Title 2",
            description: "Description 2"
        },
        {
            image: "https://images.unsplash.com/photo-1558975355-84703f540cf6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Title 3",
            description: "Description 3"
        },
    ]

    let DataSlider_data = [
        {
            title: "Title 1",
            description: "Description 1 Manage your business with our tools and services <br> and get the best results."
        },
        {
            title: "Title 2",
            description: "Manage your business with our tools and services <br> and get the best results."
        },
        {
            title: "Title 3",
            description: "Manage your business with our tools and services <br> and get the best results."
        },
    ]

    let list_items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
    return (
        <MainContainer>
            <Wrapper1>
                <ImageSlider Image_list={Image_list} />
            </Wrapper1>
            <SecondWrapper >
                <Wrapper2>
                    <SubWrapper2_1>
                        <DataSlider DataSlider={DataSlider_data} />
                    </SubWrapper2_1>
                </Wrapper2>
                <Wrapper3>
                    <ListUL>
                        {list_items.map((item, index) => {
                            return (
                                <Listli key={index}>{item}</Listli>
                            )
                        })}
                    </ListUL>
                </Wrapper3>
            </SecondWrapper>
        </MainContainer>
    )
}

export default SecondSection