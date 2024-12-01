import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { container, item } from '@/utils/motionVariants';
import Image from 'next/image';

const Works = () => {
  return (
    <Wrapper>
      <Inner initial="hidden" whileInView="visible" variants={container}>
        <Header variants={item}>
          <H1>
            How <span>Turf</span> Works
          </H1>
          <P>Create your DEX platform in three simple steps</P>
        </Header>
        <Grid>
          <Card variants={item}>
            <Number>1</Number>
            <CardContent>
              <H2>Choose Your Plan</H2>
              <P>
                Select a subscription tier that matches your needs. From basic DEX features
                to enterprise-level capabilities.
              </P>
            </CardContent>
          </Card>
          <Card variants={item}>
            <Number>2</Number>
            <CardContent>
              <H2>Customize Your DEX</H2>
              <P>
                Personalize your platform with your branding, select trading pairs,
                and configure fee structures.
              </P>
            </CardContent>
          </Card>
          <Card variants={item}>
            <Number>3</Number>
            <CardContent>
              <H2>Launch & Earn</H2>
              <P>
                Deploy your DEX instantly and start earning from trading fees.
                Engage your community in DeFi.
              </P>
            </CardContent>
          </Card>
        </Grid>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f6f9fc 0%, #ecf3f9 100%);
`;

const Inner = styled(motion.div)`
  width: 90%;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const H1 = styled.h1`
  font-family: var(--font-family-clash-display);
  font-size: var(--font-size-xxxl);
  font-weight: var(--font-weight-semi-bold);
  color: var(--color-tertiary);
  margin-bottom: 1rem;

  span {
    color: var(--color-primary);
  }
`;

const H2 = styled.h2`
  font-family: var(--font-family-clash-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semi-bold);
  color: var(--color-tertiary);
  margin-bottom: 1rem;
`;

const P = styled.p`
  font-family: var(--font-family-lufga);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-normal);
  color: var(--color-secondary);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Number = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-clash-display);
  font-weight: var(--font-weight-semi-bold);
  font-size: var(--font-size-lg);
`;

const CardContent = styled.div`
  margin-top: 1rem;
`;

export default Works;
