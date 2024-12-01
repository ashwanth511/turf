import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Navbar = () => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <Wrapper>
      <Inner>
        <Logo>
          <Link href="/">
            <span>Turf</span>
          </Link>
        </Logo>
        <Nav>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/docs">Docs</NavLink>
        </Nav>
        <AuthButtons>
          <LoginButton href="/login">Login</LoginButton>
          <SignUpButton href="/dashboard">Get Started</SignUpButton>
        </AuthButtons>
        <MobileMenuButton onClick={() => setToggle(!toggle)}>
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
        {toggle && (
          <MobileMenu>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <LoginButton href="/login">Login</LoginButton>
            <SignUpButton href="/dashboard">Get Started</SignUpButton>
          </MobileMenu>
        )}
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
  position: fixed;
  top: 0;
  z-index: 100;
`;

const Inner = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  span {
    font-family: var(--font-family-clash-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: white;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: var(--font-family-lufga);
  font-size: var(--font-size-sm);
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1rem;
  font-family: var(--font-family-lufga);
  font-size: var(--font-size-sm);
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const SignUpButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 4px;
  font-family: var(--font-family-lufga);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-primary);
  padding: 1rem;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: flex;
  }
`;

export default Navbar;
