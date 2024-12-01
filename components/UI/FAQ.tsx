import Image from 'next/image';
import styled from 'styled-components';
import faq from '@/public/svgs/FAQ.svg';
import one from '@/public/svgs/1.svg';
import two from '@/public/svgs/2.svg';
import three from '@/public/svgs/3.svg';

const FAQ = () => {
  return (
    <Wrapper>
      <hr />
      <Inner>
        <LHS>
          <h1>Frequently Asked Questions</h1>
          <Image src={faq} alt="FAQ" />
        </LHS>
        <RHS>
          <Questions>
            <Question>
              <QuestionHeader>
                <H2>What is Turf?</H2>
                <Button>+</Button>
              </QuestionHeader>
              <Answer>
                Turf is a platform that enables influencers to create and manage their own decentralized exchanges (DEX). It provides all the tools needed to launch a custom trading platform for your community.
              </Answer>
            </Question>
            <Question>
              <QuestionHeader>
                <H2>How do I start creating my DEX?</H2>
                <Button>+</Button>
              </QuestionHeader>
              <Answer>
                Simply sign up, choose your subscription plan, and use our intuitive dashboard to customize and launch your DEX. No coding knowledge required!
              </Answer>
            </Question>
            <Question>
              <QuestionHeader>
                <H2>What features are included?</H2>
                <Button>+</Button>
              </QuestionHeader>
              <Answer>
                Features include custom branding, trading pair selection, fee configuration, analytics dashboard, liquidity management, and community engagement tools.
              </Answer>
            </Question>
            <Question>
              <QuestionHeader>
                <H2>How do I earn from my DEX?</H2>
                <Button>+</Button>
              </QuestionHeader>
              <Answer>
                You earn through trading fees from every transaction on your DEX. You can set custom fee structures and receive payments directly to your wallet.
              </Answer>
            </Question>
            <Question>
              <QuestionHeader>
                <H2>Is technical knowledge required?</H2>
                <Button>+</Button>
              </QuestionHeader>
              <Answer>
                No! Turf is designed to be user-friendly. Our platform handles all the technical aspects while you focus on growing your community and business.
              </Answer>
            </Question>
          </Questions>
        </RHS>
      </Inner>
    </Wrapper>
  );
};

export default FAQ;

const Wrapper = styled.section`
  background: #fce37a;
  position: relative;
  height: 100%;
  padding: 4em 0 15em;

  hr {
    border: 1px solid #1e1e1e;
    margin-bottom: 2em;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LHS = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  gap: 2em;

  h1 {
    font-size: var(--font-size-xxxl);
    font-weight: var(--font-weight-semi-bold);
    font-family: var(--font-family-clash-display);
    color: var(--color--tertiary);

    @media (max-width: 768px) {
      font-size: var(--font-size-xxl);
    }
  }

  img {
    object-fit: contain;

    @media (max-width: 768px) {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }

  @media (max-width: 425px) {
    img {
      width: 100%;
    }
  }
`;

const RHS = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  gap: 8em;

  @media (max-width: 768px) {
    margin-top: 1em;
    width: 100%;
    align-items: center;
    gap: 4em;
  }
`;

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 100%;
  height: 100%;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  height: 100%;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const H2 = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-lufga);
  color: var(--color--tertiary);

  @media (max-width: 768px) {
    font-size: var(--font-size-md);
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-lufga);
  color: var(--color--tertiary);

  @media (max-width: 768px) {
    font-size: var(--font-size-md);
  }
`;

const Answer = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-lufga);
  color: var(--color--tertiary);

  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
  }
`;
