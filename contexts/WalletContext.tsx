import React, { createContext, useContext, useState, useEffect } from 'react';

declare global {
  interface Window {
    keplr: any;
  }
}

interface WalletContextType {
  address: string | null;
  disconnect: () => void;
  connect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  disconnect: () => {},
  connect: async () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('walletAddress');
    }
    return null;
  });

  const connect = async () => {
    if (!window.keplr) {
      alert("Please install Keplr extension");
      return;
    }

    try {
      await window.keplr.enable("cosmoshub-4");
      const offlineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0].address);
        localStorage.setItem('walletAddress', accounts[0].address);
      }
    } catch (error) {
      console.error("Failed to connect to Keplr wallet:", error);
      alert("Failed to connect to Keplr wallet. Please try again.");
    }
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
