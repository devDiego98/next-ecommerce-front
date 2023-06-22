import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1300px;
  margin: auto;
  gap: 16px;
`;

const FlexItem = styled.div`
  flex: 0 0 ${(props) => `${100 / props.itemsperrow}%`};
  display: flex;
  justify-content: center;
`;

const CardRow = ({ itemsperrow }) => {
  const products = useSelector((state) => state.products.value);
  const favorites = useSelector((state) => state.userData.favorites);

  return (
    <>
      <FlexContainer>
        {products.map((card, index) => {
          return (
            <FlexItem key={index} itemsperrow={itemsperrow}>
              <ProductCard
                key={index}
                cardInfo={card}
                favorited={favorites.includes(card._id)}
              />
            </FlexItem>
          );
        })}
      </FlexContainer>
    </>
  );
};

export default CardRow;
