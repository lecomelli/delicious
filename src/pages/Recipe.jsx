import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  let params = useParams();
  const [item, setItem] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    getRecipe(params.name);
  }, [params]);

  const getRecipe = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const recipe = await data.json();
    console.log(recipe);
    setItem(recipe);
  };
  return (
    <DetailWrapper>
      <div>
        <h2>{item.title}</h2>
        <img src={item.image} alt="" />
      </div>
      <Info>
        <Button
          onClick={() => setActiveTab("instructions")}
          className={activeTab === "instructions" ? "active" : ""}
        >
          Instructions
        </Button>
        <Button
          onClick={() => setActiveTab("ingredients")}
          className={activeTab === "ingredients" ? "active" : ""}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: item.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: item.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {item.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}> {ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
