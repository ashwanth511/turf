import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import WalletConnect from '../components/WalletConnect';
import CreateDexModal from '../components/UI/CreateDexModal';
import ReferralSection from '../components/UI/ReferralSection';
import { useWallet } from '../contexts/WalletContext';

interface UserProfile {
  username: string;
  bio: string;
  twitter: string;
  telegram: string;
}

interface DEX {
  id: string;
  name: string;
  symbol: string;
  creatorAddress: string;
  tradingFee: string;
  description: string;
  createdAt: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : {
        username: '',
        bio: '',
        twitter: '',
        telegram: ''
      };
    }
    return {
      username: '',
      bio: '',
      twitter: '',
      telegram: ''
    };
  });

  const [dexList, setDexList] = useState<DEX[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dexList');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const { address, disconnect } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push('/');
    }
  }, [address, router]);

  const handleDisconnect = () => {
    disconnect();
  };

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    if (dexList) {
      localStorage.setItem('dexList', JSON.stringify(dexList));
    }
  }, [dexList]);

  const handleCreateDex = (dexData: any) => {
    const newDex: DEX = {
      id: Date.now().toString(),
      creatorAddress: address || '',
      createdAt: new Date().toISOString(),
      ...dexData
    };
    setDexList(prev => [...prev, newDex]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
      twitter: formData.get('twitter') as string,
      telegram: formData.get('telegram') as string
    };
    setUserProfile(updatedProfile);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dexes":
        return (
          <Section>
            <SectionHeader>
              <SectionTitle>My DEXes</SectionTitle>
              <CreateButton
                onClick={() => setIsCreateModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-plus"></i>
                Create New DEX
              </CreateButton>
            </SectionHeader>
            <DexGrid>
              {dexList.filter(dex => dex.creatorAddress === address).map((dex) => (
                <DexCard
                  key={dex.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <DexHeader>
                    <DexName>{dex.name}</DexName>
                    <DexStatus>Active</DexStatus>
                  </DexHeader>
                  <DexDescription>{dex.description}</DexDescription>
                  <DexStats>
                    <DexStat>
                      <DexStatLabel>Symbol</DexStatLabel>
                      <DexStatValue>{dex.symbol}</DexStatValue>
                    </DexStat>
                    <DexStat>
                      <DexStatLabel>Fee</DexStatLabel>
                      <DexStatValue>{dex.tradingFee}%</DexStatValue>
                    </DexStat>
                    <DexStat>
                      <DexStatLabel>Created</DexStatLabel>
                      <DexStatValue>
                        {new Date(dex.createdAt).toLocaleDateString()}
                      </DexStatValue>
                    </DexStat>
                  </DexStats>
                </DexCard>
              ))}
            </DexGrid>
          </Section>
        );

      case "settings":
        return (
          <SettingsSection>
            <SectionHeader>
              <SectionTitle>Profile Settings</SectionTitle>
            </SectionHeader>
            <ProfileForm onSubmit={handleUpdateProfile}>
              <FormGroup>
                <FormLabel>Username</FormLabel>
                <FormInput
                  name="username"
                  defaultValue={userProfile.username}
                  placeholder="Enter your username"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Bio</FormLabel>
                <FormTextarea
                  name="bio"
                  defaultValue={userProfile.bio}
                  placeholder="Tell us about yourself"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Twitter</FormLabel>
                <FormInput
                  name="twitter"
                  defaultValue={userProfile.twitter}
                  placeholder="Your Twitter handle"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Telegram</FormLabel>
                <FormInput
                  name="telegram"
                  defaultValue={userProfile.telegram}
                  placeholder="Your Telegram username"
                />
              </FormGroup>
              <SaveButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
              >
                Save Changes
              </SaveButton>
            </ProfileForm>
            <DisconnectSection>
              <DisconnectTitle>Disconnect Wallet</DisconnectTitle>
              <DisconnectDescription>
                This will disconnect your wallet from the platform. You can always reconnect later.
              </DisconnectDescription>
              <DisconnectButton
                onClick={disconnect}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Disconnect Wallet
              </DisconnectButton>
            </DisconnectSection>
          </SettingsSection>
        );

      case "referrals":
        return <ReferralSection />;

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
                <StatValue>45,678 IST</StatValue>
              </StatInfo>
            </StatCard>
            <StatCard whileHover={{ y: -5 }}>
              <StatIcon className="fas fa-wallet" />
              <StatInfo>
                <StatTitle>Total Liquidity</StatTitle>
                <StatValue>123,456 IST</StatValue>
              </StatInfo>
            </StatCard>
          </StatsGrid>
        );
    }
  };

  return (
    <Container>
      <Sidebar>
        <Logo>TURF</Logo>
        <NavItems>
          <NavItem active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
            <i className="fas fa-chart-line"></i>
            Overview
          </NavItem>
          <NavItem active={activeTab === "dexes"} onClick={() => setActiveTab("dexes")}>
            <i className="fas fa-exchange-alt"></i>
            My DEXes
          </NavItem>
          <NavItem active={activeTab === "referrals"} onClick={() => setActiveTab("referrals")}>
            <i className="fas fa-users"></i>
            Referrals
          </NavItem>
          <NavItem active={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
            <i className="fas fa-cog"></i>
            Settings
          </NavItem>
        </NavItems>
      </Sidebar>

      <MainContent>
        <Header>
          <WelcomeSection>
            <WelcomeText>Welcome to Turf</WelcomeText>
            <WalletSection>
              <WalletInfo>
                <WalletLabel>Connected Wallet:</WalletLabel>
                <WalletAddress>
                  {address ? `${address.slice(0, 8)}...${address.slice(-8)}` : 'Not Connected'}
                </WalletAddress>
              </WalletInfo>
              {address && (
                <DisconnectButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDisconnect}
                >
                  Disconnect Wallet
                </DisconnectButton>
              )}
            </WalletSection>
          </WelcomeSection>
          <CreateButton 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Create New DEX
          </CreateButton>
        </Header>
        
        {renderContent()}
      </MainContent>

      <CreateDexModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
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

const ReferralContainer = styled.div`
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

const Section = styled.div`
  padding: 2rem;
  background: #111111;
  border: 1px solid #222;
  border-radius: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const DexGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const DexCard = styled(motion.div)`
  background: #222;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DexHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DexName = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

const DexStatus = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const DexDescription = styled.p`
  color: #888;
  margin: 1rem 0;
  line-height: 1.5;
`;

const DexStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DexStat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DexStatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const DexStatValue = styled.div`
  color: white;
  font-size: 1rem;
`;

const SettingsSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #111111;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #222;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  color: #888;
  font-size: 0.9rem;
`;

const FormInput = styled.input`
  background: #222;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: white;
  }
`;

const FormTextarea = styled.textarea`
  background: #222;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: white;
  }
`;

const SaveButton = styled(motion.button)`
  background: white;
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
`;

const DisconnectSection = styled.div`
  margin-top: 2rem;
  background: #111111;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #222;
`;

const DisconnectTitle = styled.h3`
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const DisconnectDescription = styled.p`
  color: #888;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export default Dashboard;
