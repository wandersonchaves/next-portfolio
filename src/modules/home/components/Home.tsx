'use client';

import SpotifyLoginButton from '@/components/SpotifyLoginButton';

import Breakline from '@/common/components/elements/Breakline';

import BlogPreview from './BlogPreview';
import Introduction from './Introduction';
import Services from './Services';
import SkillsSection from './SkillsSection';

type HomeProps = {
  isConnected: boolean;
};

const Home = ({ isConnected }: HomeProps) => {
  return (
    <>
      <Introduction />
      <Breakline className='mb-7 mt-8' />
      <BlogPreview />
      <Breakline className='my-8' />
      <SkillsSection />
      <Breakline className='my-8' />
      <Services />
      <Breakline className='my-8' />

      {!isConnected && <SpotifyLoginButton />}
    </>
  );
};

export default Home;
