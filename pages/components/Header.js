"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import LoginForm from "./LoginForm";
// import { Modal, ModalDialog, ModalClose, Typography } from "@mui/base";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";
import Register from "./RegisterForm";
import { signOut, useSession } from "next-auth/react";
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: #222;
  color: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
`;

const NavItem = styled.a`
  padding: 1rem;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #444;
  }
`;

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
const DesktopNav = styled.div`
  background: #222;
  color: #fff;
  background:#222 nav {
    display: flex;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  @media (max-width: 768px) {
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
  padding: 20px;
`;
const CartContainer = styled.span`
  display: flex;

  svg {
    width: 30px;
    margin-right: 50px;
    margin-left: 20px;
  }
`;

const NavLinks = [
  { href: "#", title: "Home" },
  { href: "#", title: "About" },
  { href: "#", title: "Services" },
  { href: "#", title: "Contact" },
];

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [form, setForm] = useState("login");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setShowLoginModal(true);
  };
  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <DesktopNav>
        <Container>
          <Link href={""}>Logo</Link>
          <nav>
            {NavLinks.map((link) => (
              <NavItem key={link.title} href={link.href}>
                {link.title}
              </NavItem>
            ))}
            {!session?.user.email ? (
              <NavItem href="#" onClick={openModal}>
                Login
              </NavItem>
            ) : (
              <CartContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <NavItem href="#" onClick={signOut}>
                  Logout
                </NavItem>
              </CartContainer>
            )}
          </nav>
          <Hamburger onClick={handleToggle}>
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
      </DesktopNav>

      <Nav open={isOpen}>
        <Hamburger onClick={handleToggle}>
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
        {NavLinks.map((link) => (
          <NavItem key={link.title} href={link.href}>
            {link.title}
          </NavItem>
        ))}
        {!session?.user.email ? (
          <NavItem href="#">Login</NavItem>
        ) : (
          <span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </span>
            <NavItem href="#" onClick={signOut}>
              Logout
            </NavItem>
          </span>
        )}
      </Nav>
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
