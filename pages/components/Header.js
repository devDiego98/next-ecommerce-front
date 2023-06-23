"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";
import Register from "./RegisterForm";
import { useSession } from "next-auth/react";
import { Drawer } from "@mui/material";
import Navbar from "./Navbar";
import Image from "next/image";
import Logo from "../../public/images/logo.png";

const Hamburger = styled.button`
  display: none;
  align-self: flex-end;
  color: #fff;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.span`
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
const DesktopNavContainer = styled.div`
  background: #222;
  color: #fff;
  background: #222;
  nav {
    display: flex;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
`;
const DesktopNav = styled.div`
  @media only screen and (max-width: 768px) {
    nav {
      display: none;
    }
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: auto;
  padding: 0 20px;
`;

const DrawerContent = styled.span`
  width: 80vw;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const LogoLink = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    font-size: 24px;
  }
  img {
    margin: 5px 0;
    width: 40px;
    height: 40px;
    filter: invert(1) drop-shadow(2px 2px 8px black);
  }
`;

const Header = () => {
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [form, setForm] = useState("login");
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);

  const openModal = () => {
    if (showLeftDrawer === true) {
      setShowLeftDrawer(false);
    }
    setShowLoginModal(true);
  };

  return (
    <>
      <DesktopNavContainer>
        <Container>
          <LogoLink href={"/"}>
            <Image src={Logo} alt="logo" />
            <span>MiTek</span>
          </LogoLink>
          <DesktopNav>
            <Navbar session={session} openModal={openModal}></Navbar>
          </DesktopNav>
          <Hamburger onClick={() => setShowLeftDrawer(true)}>
            <MenuIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </MenuIcon>
          </Hamburger>
        </Container>
      </DesktopNavContainer>

      <Drawer
        anchor={"left"}
        open={showLeftDrawer}
        onClose={() => setShowLeftDrawer(false)}
      >
        <DrawerContent>
          <Navbar session={session} openModal={openModal}></Navbar>
        </DrawerContent>
      </Drawer>
      <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <ModalDialog>
          <ModalClose />
          {form === "login" ? (
            <LoginForm setForm={setForm} />
          ) : (
            <Register setForm={setForm} />
          )}
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Header;
