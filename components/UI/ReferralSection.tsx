import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useWallet } from '../../contexts/WalletContext';

const ReferralSection: React.FC = () => {
  const { address } = useWallet();
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generateReferralLink = () => {
    // In a real implementation, this would call your backend to generate a unique referral code
    const baseUrl = window.location.origin;
    const referralCode = Math.random().toString(36).substring(7);
    const link = `${baseUrl}/ref/${referralCode}?wallet=${address}`;
    setReferralLink(link);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Your Referral Program</Title>
        <Description>
          Share your referral link with friends and earn rewards when they join!
        </Description>
      </Header>

      <ReferralBox>
        {!referralLink ? (
          <GenerateButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateReferralLink}
          >
            Generate Referral Link
          </GenerateButton>
        ) : (
          <LinkSection>
            <LinkDisplay>
              <LinkText>{referralLink}</LinkText>
              <CopyButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </CopyButton>
            </LinkDisplay>
            <RegenerateButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateReferralLink}
            >
              Generate New Link
            </RegenerateButton>
          </LinkSection>
        )}
      </ReferralBox>

      <StatsGrid>
        <StatBox>
          <StatValue>0</StatValue>
          <StatLabel>Total Referrals</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>0 IST</StatValue>
          <StatLabel>Earnings</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>5%</StatValue>
          <StatLabel>Commission Rate</StatLabel>
        </StatBox>
      </StatsGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-family-clash-display);
`;

const Description = styled.p`
  color: #888;
  font-size: 1rem;
`;

const ReferralBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const GenerateButton = styled(motion.button)`
  background: white;
  color: black;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LinkDisplay = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const LinkText = styled.div`
  flex: 1;
  word-break: break-all;
  font-family: monospace;
  color: #888;
`;

const CopyButton = styled(motion.button)`
  background: white;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
`;

const RegenerateButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-family: var(--font-family-clash-display);
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

export default ReferralSection;
