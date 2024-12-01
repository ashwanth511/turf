import styled from 'styled-components';
import { motion } from 'framer-motion';
import { card, item } from '@/utils/motionVariants';

const Enhanced = () => {
  return (
    <Wrapper>
      <Inner>
        <Header initial="hidden" whileInView="visible" variants={item}>
          <motion.h1 variants={item}>
            Enhanced Features for Your DEX
          </motion.h1>
          <Features>
            <Feature>
              <Title>Custom Branding</Title>
              <Description>
                Make your DEX uniquely yours with custom colors, logos, and UI elements that match your brand identity.
              </Description>
            </Feature>
            <Feature>
              <Title>Trading Pair Management</Title>
              <Description>
                Choose and manage the trading pairs available on your DEX. Add new tokens and maintain liquidity pools.
              </Description>
            </Feature>
            <Feature>
              <Title>Fee Configuration</Title>
              <Description>
                Set custom trading fees and earn from every transaction. Configure different fee tiers for various user groups.
              </Description>
            </Feature>
            <Feature>
              <Title>Analytics Dashboard</Title>
              <Description>
                Track trading volume, user engagement, and revenue with our comprehensive analytics dashboard.
              </Description>
            </Feature>
            <Feature>
              <Title>Community Tools</Title>
              <Description>
                Engage your community with built-in chat, announcements, and governance features.
              </Description>
            </Feature>
            <Feature>
              <Title>Security Features</Title>
              <Description>
                Enterprise-grade security with multi-sig wallets, automated audits, and real-time monitoring.
              </Description>
            </Feature>
          </Features>
        </Header>
      </Inner>
    </Wrapper>
  );
};

export default Enhanced;

const Wrapper = styled.div`
  background: #fcfaed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 0;
`;

const Inner = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 3em;
  margin: 2em 0;
  h1 {
    font-family: var(--font-family-clash-display);
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-xxxl);
    line-height: 39px;
    color: #1e1e1e;

    @media (max-width: 768px) {
      font-size: var(--font-size-xxl);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1em;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2em;
  justify-items: center;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(6, 1fr);
    width: 90%;
  }
`;

const Feature = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fcfaed;
  border: 2px solid var(--color-tertiary);
  border-radius: 25px;
  padding: 2em;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 1em;
  }
`;

const Title = styled.h2`
  font-family: var(--font-family-clash-display);
  font-weight: var(--font-weight-semi-bold);
  font-size: var(--font-size-xxxl);
  line-height: 39px;
  color: var(--color-tertiary);
  margin-bottom: 0.5em;

  @media (max-width: 768px) {
    font-size: var(--font-size-xxl);
  }
`;

const Description = styled.p`
  font-family: var(--font-family-lufga);
  font-size: 1.2em;
  font-weight: 400;
  color: var(--color-tertiary);
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
  }
`;
