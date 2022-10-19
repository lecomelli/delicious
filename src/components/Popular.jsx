import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { useEffect, useState } from "react";
import styled from "styled-components";


function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const data = await api.json();
        // console.log(data);
        setPopular(data.recipes)
    }


    return (
        <Wrapper>
            <h3>Popular</h3>
            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem'

            }} >
                {popular.map(
                    (recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card >
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />

                                </Card>
                            </SplideSlide>
                        );
                    }
                )
                }
            </Splide>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        heigth: 100%;
        object-fir: cover;
    }
    p{
        position: absolute;
        z-index: 10;
        bottom: 0%;
        transform: translate(-50%,0%).
        color: white;
        width: 100%;
        text-align: center;
        font-weigth: 600;
        fotn-size: 1rem;
        heigth:40%;
        justify-content: center;
        align-items: center;
    }
`;

export default Popular