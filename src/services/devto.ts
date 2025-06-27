import axios from 'axios';

import { BlogItemProps } from '@/common/types/blog';

import type { DevtoPost } from './devto/getDevtoPosts';

const BASE_URL = 'https://dev.to/api/';
const DEVTO_KEY = process.env.DEVTO_KEY ?? '';
const USERNAME = 'wandersonchaves';
const DEVTO_API = 'https://dev.to/api/articles/me';

export const getDevtoPosts = async ({
  page = 1,
  per_page = 6,
}: {
  page?: number;
  per_page?: number;
}): Promise<{ status: number; data: BlogItemProps[] }> => {
  const params = new URLSearchParams({
    username: USERNAME,
    page: page.toString(),
    per_page: per_page.toString(),
  });

  const { status, data } = await axios.get(`${BASE_URL}articles/me?${params}`, {
    headers: { 'api-key': DEVTO_KEY },
  });

  return { status, data };
};

export const getDevtoPostDetail = async (
  id: number,
): Promise<{ status: number; data: BlogItemProps | null }> => {
  try {
    const response = await axios.get(`${BASE_URL}articles/${id}`, {
      headers: { 'api-key': DEVTO_KEY },
    });
    return { status: response.status, data: response.data };
  } catch {
    return { status: 404, data: null };
  }
};

export const getDevtoComments = async (
  postId: string,
): Promise<{ status: number; data: any[] }> => {
  const response = await axios.get(`${BASE_URL}comments?a_id=${postId}`, {
    headers: { 'api-key': DEVTO_KEY },
  });

  return { status: response.status, data: response.data };
};

export const getDevtoViews = async (
  id: number,
): Promise<{ status: number; data: { page_views_count: number } }> => {
  const { data, status } = await axios.get(`${BASE_URL}articles/me/all`, {
    headers: { 'api-key': DEVTO_KEY },
  });

  const article = data.find((item: BlogItemProps) => item.id === id);
  return {
    status,
    data: { page_views_count: article?.page_views_count ?? 0 },
  };
};

export const getAllPosts = async (): Promise<DevtoPost[]> => {
  const { data } = await axios.get<DevtoPost[]>(DEVTO_API, {
    headers: {
      'api-key': DEVTO_KEY ?? '',
    },
  });

  return data;
};
