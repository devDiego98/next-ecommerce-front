import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const StyledPageContentContainer = styled.main`
  flex: 1;
`;
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
export default function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <StyledPageContentContainer>{children}</StyledPageContentContainer>
      <Footer />
    </Wrapper>
  );
}
