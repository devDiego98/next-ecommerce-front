import React from "react";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";
import styled from "styled-components";
import NextImage from "./NextImage";
import Counter from "./Counter";
const Row = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 24px;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      margin: auto;
    }
  }
`;
const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 500px;
  height: 350px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 500px) {
    height: auto;
  }
  img {
    width: 100% !important;
    position: relative !important;
    height: auto !important;
  }
`;
const CardInfoModal = styled(Modal)`
  padding: 50px 10px;
  .MuiModalDialog-root {
    min-width: 80vw;
    min-height: 70vh;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-start;
  .title {
    font-size: 36px;
  }
  .price {
    font-size: 20px;
  }
  .desc {
    font-size: 16px;
    margin-bottom: 48px;
  }
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

export default function ProductInfoModal({
  showProductModal,
  setShowProductModal,
  cardInfo,
}) {
  return (
    <CardInfoModal
      open={showProductModal}
      onClose={() => setShowProductModal(false)}
    >
      <ModalDialog>
        <ModalContent>
          <ModalClose />
          <Row>
            <ImageContainer>
              <NextImage src={cardInfo.images[0]} alt={cardInfo.name} />
            </ImageContainer>
            <InfoContainer>
              <h1 className="title">{cardInfo.name}</h1>
              <p className="price">${cardInfo.price}</p>
              <p className="desc">{cardInfo.desc}</p>
              {cardInfo?.properties && (
                <p className="properties">
                  {Object?.entries(cardInfo?.properties).map((property) => {
                    return (
                      <div>
                        <span className="property-key">{property[0]}</span>
                        <span className="property-value">{property[1]}</span>
                      </div>
                    );
                  })}
                </p>
              )}
              <Counter item={cardInfo} />
            </InfoContainer>
          </Row>
        </ModalContent>
      </ModalDialog>
    </CardInfoModal>
  );
}
