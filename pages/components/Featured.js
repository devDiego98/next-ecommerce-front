"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

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
    background: #fff;
    color: #222;
    font-size: 20px;
    border-radius: 8px;
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
                <button>Read More</button>
                <button>Add to Cart</button>
              </BtnContainer>
            </div>
            <ImageCont>
              <Image
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
