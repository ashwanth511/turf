import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
            <WelcomeText>Welcome back, Influencer!</WelcomeText>
            <SubText>Your DEX empire awaits</SubText>
          </WelcomeSection>
          <CreateButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            + Create New DEX
          </CreateButton>
        </Header>
        
        <StatsGrid>
          <StatCard whileHover={{ y: -5 }}>
            <StatIcon className="fas fa-exchange-alt" />
            <StatInfo>
              <StatTitle>Active DEXes</StatTitle>
              <StatValue>3</StatValue>
              <StatTrend positive>+2 this month</StatTrend>
            </StatInfo>
          </StatCard>
          <StatCard whileHover={{ y: -5 }}>
            <StatIcon className="fas fa-chart-line" />
            <StatInfo>
              <StatTitle>Total Volume</StatTitle>
              <StatValue>$1.2M</StatValue>
              <StatTrend positive>+15% vs last month</StatTrend>
            </StatInfo>
          </StatCard>
          <StatCard whileHover={{ y: -5 }}>
            <StatIcon className="fas fa-users" />
            <StatInfo>
              <StatTitle>Total Users</StatTitle>
              <StatValue>2.5K</StatValue>
              <StatTrend positive>+300 new users</StatTrend>
            </StatInfo>
          </StatCard>
          <StatCard whileHover={{ y: -5 }}>
            <StatIcon className="fas fa-dollar-sign" />
            <StatInfo>
              <StatTitle>Revenue</StatTitle>
              <StatValue>$45K</StatValue>
              <StatTrend positive>+25% this week</StatTrend>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionHeader>
            <SectionTitle>Your DEXes</SectionTitle>
            <ViewAllButton>View All</ViewAllButton>
          </SectionHeader>
          <DexGrid>
            {[1, 2, 3].map((dex) => (
              <DexCard key={dex} whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                <DexHeader>
                  <DexName>TurfSwap #{dex}</DexName>
                  <DexStatus>Active</DexStatus>
                </DexHeader>
                <DexStats>
                  <DexStat>
                    <StatLabel>24h Volume</StatLabel>
                    <StatNumber>$400K</StatNumber>
                  </DexStat>
                  <DexStat>
                    <StatLabel>Total Users</StatLabel>
                    <StatNumber>850</StatNumber>
                  </DexStat>
                  <DexStat>
                    <StatLabel>Pairs</StatLabel>
                    <StatNumber>12</StatNumber>
                  </DexStat>
                </DexStats>
                <DexActions>
                  <ActionButton primary>Manage</ActionButton>
                  <ActionButton>Analytics</ActionButton>
                </DexActions>
              </DexCard>
            ))}
          </DexGrid>
        </Section>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4a460;
`;

const Sidebar = styled.div`
  width: 280px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 2rem;
  color: white;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  color: white;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.div<{ active?: boolean }>`
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  transition: all 0.3s ease;

  i {
    font-size: 1.2rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const WelcomeSection = styled.div``;

const WelcomeText = styled.h1`
  font-size: 2rem;
  color: white;
  margin: 0;
`;

const SubText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 0 0;
`;

const CreateButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: white;
  color: #f4a460;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.i`
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.9);
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatTitle = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.3rem 0;
`;

const StatTrend = styled.div<{ positive?: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#4ADE80' : '#F87171'};
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: white;
  margin: 0;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const DexGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const DexCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
`;

const DexHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const DexName = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.2rem;
`;

const DexStatus = styled.span`
  background: #4ADE80;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const DexStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;

const DexStat = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
`;

const StatNumber = styled.div`
  color: white;
  font-weight: 600;
`;

const DexActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  background: ${props => props.primary ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.primary ? '#f4a460' : 'white'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default Dashboard;
