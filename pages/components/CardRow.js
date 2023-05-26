import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const FlexItem = styled.div`
  flex: 0 0 ${(props) => `${100 / props.itemsPerRow}%`};
`;

const CardRow = ({ itemsPerRow, cards }) => {
  return (
    <FlexContainer>
      {cards.map((card, index) => (
        <FlexItem key={index} itemsPerRow={itemsPerRow}>
          {/* Render your card component here */}
          <ProductCard cardInfo={card} />
        </FlexItem>
      ))}
    </FlexContainer>
  );
};

export default CardRow;
