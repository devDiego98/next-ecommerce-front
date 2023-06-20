import React from "react";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import Link from "next/link";
const Nav = styled.nav`
  display: flex;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    span {
      justify-content: center;
      svg {
        margin: 0 10px 0 0;
      }
    }
  }
`;
const NavItem = styled(Link)`
  padding: 1rem;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #444;
  }
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
  { href: "/", title: "Home" },
  { href: "/products", title: "Products" },
  { href: "#", title: "Account", loggedIn: true },
];

const Navbar = ({ session, openModal }) => {
  return (
    <Nav>
      {NavLinks.map((link) => {
        if (link.loggedIn) {
          if (session?.user.email) {
            return (
              <NavItem key={link.title} href={link.href}>
                {link.title}
              </NavItem>
            );
          }
        } else {
          return (
            <NavItem key={link.title} href={link.href}>
              {link.title}
            </NavItem>
          );
        }
      })}

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
    </Nav>
  );
};
export default Navbar;
