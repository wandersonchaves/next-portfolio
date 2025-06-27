import axios from 'axios';

export interface DevtoUser {
  name: string;
  username: string;
  user_id: number;
  website_url: string;
  profile_image: string;
  profile_image_90: string;
  twitter_username: string | null;
  github_username: string | null;
}

export interface DevtoPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  path: string;
  url: string;
  published: boolean;
  published_at: string;
  comments_count: number;
  public_reactions_count: number;
  page_views_count: number;
  body_markdown: string;
  positive_reactions_count: number;
  cover_image: string | null;
  tag_list: string[];
  canonical_url: string;
  reading_time_minutes: number;
  user: DevtoUser;
}

export const getDevtoPosts = async (): Promise<DevtoPost[]> => {
  const DEVTO_KEY = process.env.NEXT_PUBLIC_DEVTO_KEY;

  if (!DEVTO_KEY)
    throw new Error('DEVTO_KEY not found in environment variables.');

  const response = await axios.get<DevtoPost[]>(
    'https://dev.to/api/articles/me',
    {
      headers: { 'api-key': DEVTO_KEY },
    },
  );

  return response.data;
};
