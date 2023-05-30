"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import NextImage from "./NextImage";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  button {
    height: 50px;
    width: 200px;
    @media only screen and (max-width: 768px) {
      width: 150px;
      height: 40px;
    }
  }
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Center = styled.div`
  width: 1400px;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  .left {
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 20px;
    p {
      max-width: 80vw;
    }
  }
  @media only screen and (max-width: 1500px) {
    flex-direction: column;
    align-items: center;
    padding: 0 50px;
    div {
      align-items: center;
    }
  }
  @media only screen and (max-width: 1500px) {
    gap: 50px;
    margin-top: 50px;
  }
`;

const ImageCont = styled.div`
  position: relative;
  width: 80vw;
  height: 400px;
  aspect-ratio: 200/111;
  @media only screen and (max-width: 1500px) {
    height: auto;
  }
`;

const StyledButton = styled.button`
  background-color: initial;
  background-image: linear-gradient(-180deg, #545454, #000000);
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, -apple-system, system-ui, Roboto, "Helvetica Neue", Arial,
    sans-serif;
  height: 40px;
  line-height: 40px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;
  z-index: 9;
  border: 0;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: rgba(253, 76, 0, 0.5) 0 3px 8px;
  }
`;
const Featured = () => {
  return (
    <div>
      <Bg>
        <Container>
          <Center>
            <div className="left">
              <Title>Pro anywhere</Title>
              <p>
                Experience the ultimate in performance, speed, and power with
                the newest MacBook Pro. Equipped with Apples latest M1 chip,
                this revolutionary laptop delivers lightning-fast processing,
                seamless multitasking, and exceptional battery life. With a
                stunning Retina display, advanced graphics, and studio-quality
                microphones and speakers, the MacBook Pro offers a truly
                immersive experience for work, play, and everything in between.
                Whether youre a creative professional, a power user, or a
                student on the go, the MacBook Pro is the perfect tool to help
                you achieve your goals. Dont miss out on the latest innovation
                from Apple - order your MacBook Pro today!
              </p>
              <BtnContainer>
                <StyledButton>Read More</StyledButton>
                <StyledButton>Add to Cart</StyledButton>
              </BtnContainer>
            </div>
            <ImageCont>
              <NextImage
                alt="mac laptop"
                src="https://diego-next-ecommerce.s3.us-east-2.amazonaws.com/1679151719649.png"
                fill={true}
                priority
              />
            </ImageCont>
          </Center>
        </Container>
      </Bg>
    </div>
  );
};

export default Featured;
