import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    keplr: any;
  }
}

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect, onDisconnect }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const connectKeplr = async () => {
    try {
      // Check if Keplr is installed
      if (!window.keplr) {
        throw new Error("Please install Keplr extension");
      }

      // Enable access to Cosmos chain
      await window.keplr.enable("cosmoshub-4"); // or your specific chain-id

      const offlineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0].address);
        setError('');
        onConnect?.(accounts[0].address);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    onDisconnect?.();
  };

  return (
    <WalletContainer>
      {!walletAddress ? (
        <ConnectButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={connectKeplr}
        >
          Connect Keplr Wallet
        </ConnectButton>
      ) : (
        <WalletInfo>
          <AddressText>{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</AddressText>
          <DisconnectButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={disconnectWallet}
          >
            Disconnect
          </DisconnectButton>
        </WalletInfo>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </WalletContainer>
  );
};

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ConnectButton = styled(motion.button)`
  background: white;
  color: black;
  border: 2px solid black;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: black;
    color: white;
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddressText = styled.span`
  background: white;
  color: black;
  border: 2px solid black;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: monospace;
`;

const DisconnectButton = styled(motion.button)`
  background: white;
  color: black;
  border: 2px solid black;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: black;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
`;

export default WalletConnect;
