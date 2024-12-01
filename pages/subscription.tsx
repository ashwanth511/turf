import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const SubscriptionPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29/month',
      features: [
        'Create 1 DEX',
        'Basic analytics',
        'Community support',
        'Standard trading features'
      ]
    },
    {
      name: 'Premium',
      price: '$99/month',
      features: [
        'Create 3 DEXes',
        'Advanced analytics',
        'Priority support',
        'Advanced trading features',
        'Custom branding'
      ]
    },
    {
      name: 'Enterprise',
      price: '$299/month',
      features: [
        'Unlimited DEXes',
        'Enterprise analytics',
        'Dedicated support',
        'All trading features',
        'White-label solution',
        'API access'
      ]
    }
  ];

  return (
    <Container>
      <Title>Choose Your Plan</Title>
      <Subtitle>Start creating your DEX today</Subtitle>
      <PlansContainer>
        {plans.map((plan) => (
          <PlanCard key={plan.name}>
            <PlanName>{plan.name}</PlanName>
            <PlanPrice>{plan.price}</PlanPrice>
            <FeaturesList>
              {plan.features.map((feature) => (
                <FeatureItem key={feature}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
            <Link href="/dashboard" passHref>
              <Button>Get Started</Button>
            </Link>
          </PlanCard>
        ))}
      </PlansContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
`;

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #4a90e2;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  padding: 0.5rem 0;
  color: #666;
  &:before {
    content: "✓";
    color: #4a90e2;
    margin-right: 0.5rem;
  }
`;

const Button = styled.a`
  background: #4a90e2;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #357abd;
  }
`;

export default SubscriptionPage;
