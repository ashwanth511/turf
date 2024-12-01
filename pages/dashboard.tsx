import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import WalletConnect from '../components/WalletConnect';
import CreateDexModal from '../components/UI/CreateDexModal';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const referralLink = `https://turf.com/ref/${walletAddress}`;

  useEffect(() => {
    // Check if Keplr wallet is connected
    const checkWallet = async () => {
      if (window.keplr) {
        try {
          await window.keplr.enable("cosmoshub-4");
          const offlineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
          const accounts = await offlineSigner.getAccounts();
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0].address);
          }
        } catch (error) {
          console.error("Failed to connect to Keplr wallet:", error);
          router.push('/');
        }
      } else {
        router.push('/');
      }
    };

    checkWallet();
  }, [router]);

  const handleDisconnect = () => {
    setWalletAddress('');
    router.push('/');
  };

  const handleCreateDex = (dexData: any) => {
    console.log('Creating DEX with data:', dexData);
    setIsModalOpen(false);
    // Add DEX creation logic here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'referrals':
        return (
          <ReferralSection>
            <ReferralHeader>
              <h2>Referral Program</h2>
              <ReferralButton onClick={() => console.log('Create referral program')}>
                Create Referral Program
              </ReferralButton>
            </ReferralHeader>
            <ReferralInfo>
              <p>Share your unique referral link and earn rewards when new users join through your link!</p>
              <ReferralLinkBox>
                <ReferralLinkText>{referralLink}</ReferralLinkText>
                <CopyButton onClick={() => navigator.clipboard.writeText(referralLink)}>
                  Copy
                </CopyButton>
              </ReferralLinkBox>
            </ReferralInfo>
            <ReferralStats>
              <ReferralStatBox>
                <ReferralStatLabel>Total Referrals</ReferralStatLabel>
                <ReferralStatValue>24</ReferralStatValue>
              </ReferralStatBox>
              <ReferralStatBox>
                <ReferralStatLabel>Active Users</ReferralStatLabel>
                <ReferralStatValue>18</ReferralStatValue>
              </ReferralStatBox>
              <ReferralStatBox>
                <ReferralStatLabel>Total Earnings</ReferralStatLabel>
                <ReferralStatValue>1,240 ATOM</ReferralStatValue>
              </ReferralStatBox>
            </ReferralStats>
          </ReferralSection>
        );
      default:
        return (
          <StatsGrid>
            <StatCard whileHover={{ y: -5 }}>
              <StatIcon className="fas fa-exchange-alt" />
              <StatInfo>
                <StatTitle>Active DEXes</StatTitle>
                <StatValue>3</StatValue>
              </StatInfo>
            </StatCard>
            <StatCard whileHover={{ y: -5 }}>
              <StatIcon className="fas fa-users" />
              <StatInfo>
                <StatTitle>Total Users</StatTitle>
                <StatValue>1,234</StatValue>
              </StatInfo>
            </StatCard>
            <StatCard whileHover={{ y: -5 }}>
              <StatIcon className="fas fa-chart-line" />
              <StatInfo>
                <StatTitle>24h Volume</StatTitle>
                <StatValue>45,678 ATOM</StatValue>
              </StatInfo>
            </StatCard>
            <StatCard whileHover={{ y: -5 }}>
              <StatIcon className="fas fa-wallet" />
              <StatInfo>
                <StatTitle>Total Liquidity</StatTitle>
                <StatValue>123,456 ATOM</StatValue>
              </StatInfo>
            </StatCard>
          </StatsGrid>
        );
    }
  };

  return (
    <Container>
      <Sidebar>
        <Logo>Turf</Logo>
        <NavItems>
          <NavItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            <i className="fas fa-chart-line"></i>
            Overview
          </NavItem>
          <NavItem active={activeTab === 'dexes'} onClick={() => setActiveTab('dexes')}>
            <i className="fas fa-exchange-alt"></i>
            My DEXes
          </NavItem>
          <NavItem active={activeTab === 'referrals'} onClick={() => setActiveTab('referrals')}>
            <i className="fas fa-user-friends"></i>
            Referrals
          </NavItem>
          <NavItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>
            <i className="fas fa-chart-bar"></i>
            Analytics
          </NavItem>
          <NavItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
            <i className="fas fa-cog"></i>
            Settings
          </NavItem>
        </NavItems>
      </Sidebar>
      <MainContent>
        <Header>
          <WelcomeSection>
            <WelcomeText>Welcome to your DEX Dashboard!</WelcomeText>
            <WalletSection>
              <WalletInfo>
                <WalletLabel>Connected Wallet:</WalletLabel>
                <WalletAddress>{walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}` : 'Not Connected'}</WalletAddress>
              </WalletInfo>
              <DisconnectButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDisconnect}
              >
                Disconnect Wallet
              </DisconnectButton>
            </WalletSection>
          </WelcomeSection>
          <CreateButton 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            + Create New DEX
          </CreateButton>
        </Header>
        
        {renderContent()}
      </MainContent>

      <CreateDexModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprove={handleCreateDex}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #000000;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #111111;
  padding: 2rem;
  border-right: 1px solid #222;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: white;
  letter-spacing: 1px;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: ${props => props.active ? '#222' : 'transparent'};
  color: ${props => props.active ? 'white' : '#888'};

  i {
    font-size: 1.2rem;
  }

  &:hover {
    background: #222;
    color: white;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #222;
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WelcomeText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: #111111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.i`
  font-size: 1.5rem;
  color: white;
  background: #222;
  padding: 1rem;
  border-radius: 10px;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ReferralSection = styled.div`
  padding: 2rem;
  background: #111111;
  border: 1px solid #222;
  border-radius: 12px;
`;

const ReferralHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ReferralButton = styled(motion.button)`
  background: white;
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const ReferralInfo = styled.div`
  margin-bottom: 2rem;

  p {
    color: #888;
    line-height: 1.6;
  }
`;

const ReferralLinkBox = styled.div`
  display: flex;
  gap: 1rem;
  background: #222;
  padding: 1rem;
  border-radius: 8px;
  align-items: center;
  margin-top: 1rem;
`;

const ReferralLinkText = styled.div`
  flex: 1;
  font-family: 'JetBrains Mono', monospace;
  color: white;
  font-size: 0.9rem;
`;

const CopyButton = styled.button`
  background: white;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const ReferralStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ReferralStatBox = styled.div`
  background: #222;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
`;

const ReferralStatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ReferralStatValue = styled.div`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
`;

const CreateButton = styled(motion.button)`
  background: white;
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #222;
  padding: 0.75rem 1rem;
  border-radius: 8px;
`;

const WalletLabel = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const WalletAddress = styled.span`
  font-family: 'JetBrains Mono', monospace;
  color: white;
  font-size: 0.9rem;
`;

const DisconnectButton = styled(motion.button)`
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #ff2222;
    transform: translateY(-1px);
  }
`;

export default Dashboard;
