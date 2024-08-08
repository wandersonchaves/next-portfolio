const canonicalUrl = 'https://wandersonchaves.vercel.app'
const metaImage =
  'https://cloud.wandersonchaves.com/public/images/wandersonchaves.png'
const metaDescription =
  'Seasoned Software Engineer especially in Backend side, with a passion for creating pixel-perfect web experiences'

const defaultSEOConfig = {
  defaultTitle: 'Wanderson Chaves - Personal Website',
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: 'Wanderson Chaves - Personal Website',
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: 'wandersonchaves og-image',
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: 'wandersonchaves og-image',
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: 'wandersonchaves og-image',
        width: 1600,
        height: 900,
      },
    ],
    site_name: 'wandersonchaves',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
}

export default defaultSEOConfig
