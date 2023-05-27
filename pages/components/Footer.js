import React, { useState } from "react";
import styled from "@emotion/styled";
import { Drawer as MUIDrawer } from "@mui/material";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const FooterContainer = styled.footer`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;
const TopContainer = styled.footer`
  width: 100vw;
`;
const BottomContainer = styled.div`
  width: 100vw;

  border-top: 1px solid grey;
  box-shadow: 2px 2px 10px white;
  padding: 16px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    color: grey;
    font-size: 10px;
  }
`;
const DrawerContent = styled.footer`
  height: 500px;
`;
const Drawer = styled(MUIDrawer)`
  position: relative;
`;
const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12px;
  align-items: center;
`;
const MoreInfoBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 15px;
  border: 1px solid grey;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-top: 10px;
  border-bottom: none;
  background: white;
  position: relative;
  top: 1px;
  cursor: pointer;
`;
const StyledSeparatedRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;
const SocialMediaIcon = styled(SocialIcon)`
  width: 40px !important;
  height: 40px !important;
  &:hover {
    transition: 0.3s;
    opacity: 0.4;
    width: 45px !important;
    height: 45px !important;
  }
`;

const StyledCopyrightSection = styled.div``;
export default function Footer() {
  const [state, setState] = useState({
    bottom: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, bottom: open });
  };
  const links = [
    { text: "Work with us", href: "#" },
    { text: "Terms and Conditions", href: "#" },
    { text: "Help", href: "#" },
    { text: "FAQ", href: "#" },
  ];
  return (
    <FooterContainer>
      <MoreInfoBtn onClick={toggleDrawer("bottom", true)}>
        More Information{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: "20px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </MoreInfoBtn>
      <BottomContainer>
        <StyledSeparatedRow>
          <LinkContainer>
            {links.map((link) => (
              <Link href={link.href}>{link.text}</Link>
            ))}
          </LinkContainer>
          <Row>
            <SocialMediaIcon url="https://google.com/" network="twitter" />
            <SocialMediaIcon url="https://instagram.com/" network="instagram" />
            <SocialMediaIcon url="https://discord.com/" network="discord" />
            <SocialMediaIcon url="https://whatsapp.com/" network="whatsapp" />
          </Row>
        </StyledSeparatedRow>
        <StyledCopyrightSection>
          <p>Copyright @ 2016-2023 MiTek S.R.L</p>
          <p>Silicon Valley 132</p>
        </StyledCopyrightSection>
      </BottomContainer>
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        <DrawerContent></DrawerContent>
      </Drawer>
    </FooterContainer>
  );
}
