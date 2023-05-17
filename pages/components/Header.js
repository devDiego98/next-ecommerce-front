"use client";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Center from "./Center";

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

const NavLinks = [
  { href: "#", title: "Home" },
  { href: "#", title: "About" },
  { href: "#", title: "Services" },
  { href: "#", title: "Contact" },
];

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
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
      </Nav>
    </>
  );
};

export default Header;
