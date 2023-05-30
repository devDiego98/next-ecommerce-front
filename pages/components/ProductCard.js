import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { Rating } from "@mui/material";
import NextImage from "./NextImage";
import ProductInfoModal from "./ProductInfoModal";
const CardContainer = styled.button`
  width: 200px;
  height: 275px;
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e1dd;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 20px -5px black;
`;
const CardContent = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 16px;
  flex: 1;
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 16px;
  }
`;
const ImageContainer = styled.div`
  min-width: 200px;
  height: 125px;
  position: relative;
  background: #cacec02e;
  box-shadow: 0px 5px 10px #0000004f;
  button {
    background: white;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    z-index: 1;
  }
  svg {
    width: 30px;
  }
`;

const ProductCard = ({ cardInfo }) => {
  const [showProductModal, setShowProductModal] = useState(false);

  return (
    <>
      <CardContainer onClick={() => setShowProductModal(true)}>
        <ImageContainer>
          <button onClick={() => alert("test")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          <NextImage
            src={cardInfo?.images[0]}
            alt="product image"
            height={150}
          />
        </ImageContainer>
        <CardContent>
          <h2>{cardInfo?.name}</h2>
          <h3>${cardInfo?.price}</h3>
          <Rating name="read-only" value={2.5} readOnly precision={0.5} />
        </CardContent>
      </CardContainer>
      <ProductInfoModal
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        cardInfo={cardInfo}
      />
    </>
  );
};

export default ProductCard;
