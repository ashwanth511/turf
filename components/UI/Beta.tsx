import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { container, item } from '@/utils/motionVariants';
import Link from 'next/link';

const Beta = () => {
  return (
    <Wrapper>
      <Inner initial="hidden" whileInView="visible" variants={container}>
        <Content variants={item}>
          <H1>Ready to Launch Your DEX?</H1>
          <P>
            Join the future of decentralized trading. Create your custom DEX platform
            today and start earning from every trade.
          </P>
          <ButtonContainer>
            <Link href="/dashboard">
              <Button>Start Building Now</Button>
            </Link>
            <Link href="/subscription">
              <SecondaryButton>View Plans</SecondaryButton>
            </Link>
          </ButtonContainer>
        </Content>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 6rem 0;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
`;

const Inner = styled(motion.div)`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Content = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const H1 = styled.h1`
  font-family: var(--font-family-clash-display);
  font-size: var(--font-size-xxxl);
  font-weight: var(--font-weight-semi-bold);
  margin-bottom: 1.5rem;
  color: white;
`;

const P = styled.p`
  font-family: var(--font-family-lufga);
  font-size: var(--font-size-lg);
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  background: white;
  color: var(--color-primary);
  font-family: var(--font-family-lufga);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export default Beta;
