import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WalletConnect from '../WalletConnect';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  const handleWalletConnection = (connected: boolean) => {
    setIsWalletConnected(connected);
    if (connected) {
      router.push('/dashboard');
    }
  };

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
          {!isWalletConnected ? (
            <WalletConnectWrapper>
              <WalletConnect onConnect={() => handleWalletConnection(true)} onDisconnect={() => handleWalletConnection(false)} />
            </WalletConnectWrapper>
          ) : (
            <DashboardButton href="/dashboard">Dashboard</DashboardButton>
          )}
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
            {!isWalletConnected ? (
              <WalletConnectWrapper>
                <WalletConnect onConnect={() => handleWalletConnection(true)} onDisconnect={() => handleWalletConnection(false)} />
              </WalletConnectWrapper>
            ) : (
              <DashboardButton href="/dashboard">Dashboard</DashboardButton>
            )}
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  
  span {
    background: linear-gradient(to right, #000000, #333333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
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
  color: #000;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #333;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const WalletConnectWrapper = styled.div`
  margin-left: 1rem;
`;

const DashboardButton = styled(Link)`
  background: white;
  color: black;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: black;
    color: white;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 24px;
    height: 2px;
    background: #333;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export default Navbar;
