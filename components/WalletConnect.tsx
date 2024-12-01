import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useRouter } from 'next/router';

const WalletConnect: React.FC = () => {
  const { address, connect, disconnect } = useWallet();
  const router = useRouter();

  const handleConnect = async () => {
    await connect();
    router.push('/dashboard');
  };

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  return (
    <ConnectButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={address ? handleDisconnect : handleConnect}
    >
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </ConnectButton>
  );
};

const ConnectButton = styled(motion.button)`
  background: white;
  color: black;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default WalletConnect;
