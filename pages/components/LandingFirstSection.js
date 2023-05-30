import React from "react";
import styled from "styled-components";
import logo from "../../public/images/logo.png";
import handHoldingIphone from "../../public/images/hand-holding-phone.jpg";
import darkLaptop from "../../public/images/laptops-dark.jpg";
import Image from "next/image";
import NextImage from "./NextImage";
const StyledMainContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 1300px) {
    flex-direction: column;
  }
`;
const SectionOne = styled.div`
  position: relative;
  flex: 1;
  background: #fbfbfd;
  height: 500px;
  aspect-ratio: 134/100;
  padding-top: 48px;
  z-index: 1;
  img {
    z-index: -1;
    opacity: 0.8;
    @media only screen and (max-width: 768px) {
      opacity: 0.4;
    }
  }
`;
const SectionTwo = styled.div`
  position: relative;
  height: 500px;
  aspect-ratio: 134/100;
  flex: 1;
  z-index: 1;
  color: white;
  padding-top: 5%;
  &:hover {
    transition: 2s;
    filter: invert(1);
  }
  &:not(:hover) {
    transition: 2s;
    filter: invert(0);
  }
  img {
    z-index: -1;
  }
  background: black;
  p {
    text-align: center;
    font-size: 16px !important;
    max-width: 300px;
    text-shadow: 2px 2px 5px purple;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  h2 {
    font-size: 32px;
  }
  p {
    font-size: 20px;
  }
  a {
    color: #06c;
  }
`;
export default function LandingFirstSection() {
  return (
    <StyledMainContainer>
      <SectionOne>
        <NextImage src={handHoldingIphone} alt="hand holding phone" fill />
        <Row>
          <div style={{ position: "relative", width: "60px", height: "50px" }}>
            <NextImage src={logo} alt="Logo" width={50} />
          </div>

          <h2>Trade In</h2>
        </Row>
        <Row>
          <p>Upgrade and save. Its that easy.</p>
        </Row>
        <Row>
          <a href="#">See what your device is worth &gt; </a>
        </Row>
      </SectionOne>
      <SectionTwo>
        <NextImage src={darkLaptop} alt="hand holding phone" fill />
        <Row>
          <div style={{ position: "relative", width: "60px", height: "50px" }}>
            <NextImage src={logo} alt="Logo" width={50} height={50} />
          </div>
          <h2>ISurface Pro</h2>
        </Row>
        <Row>
          <p>
            Unleash Brilliance: The Ultimate Fusion of Power and Portability!
          </p>
        </Row>
      </SectionTwo>
    </StyledMainContainer>
  );
}
