import React from "react";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";
import styled from "styled-components";
import NextImage from "./NextImage";
import Counter from "./Counter";
const Row = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
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
  position: relative;
  width: 500px;
  height: 350px;
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
  console.log(cardInfo);
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
              <h1>{cardInfo.name}</h1>
              <p>${cardInfo.price}</p>
              <h2>{cardInfo.desc}</h2>
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
