import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  NextPage,
} from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import Home from '@/modules/home';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = context.req.headers.cookie || '';
  const isConnected = cookies.includes('spotify_refresh_token=');

  return {
    props: {
      isConnected,
    },
  };
};

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo title='Wanderson Chaves - Personal Website' />
      <Container data-aos='fade-up'>
        <Home isConnected />
      </Container>
    </>
  );
};

export default HomePage;
