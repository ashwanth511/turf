import { Available, Beta, Enhanced, FAQ, Footer, Hero, Navbar, ProductDisp, Testimonials, Works } from '@/components/UI';
import Head from 'next/head';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Turf - Create Your Own DEX Platform</title>
        <meta name="description" content="Turf - The ultimate platform for influencers to create and manage their own decentralized exchanges (DEX)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600,300&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main>
        <Section>
          <Navbar />
          <Hero />
        </Section>
        <ProductDisp />
        <Works />
        <Enhanced />
        <Beta />
        <Testimonials />
        <FAQ />
        <Available />
        <Footer />
      </main>
    </>
  );
}

const Section = styled.section`
  background: #1a1a1a;
  color: white;
`;
