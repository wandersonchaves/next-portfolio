import { NextApiRequest, NextApiResponse } from 'next';

import { logger } from '@/lib/logger';
import { getAllPosts } from '@/services/devto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { page = '1', per_page = '6', search = '' } = req.query;

    const allPosts = await getAllPosts();

    const normalizedSearch = (search as string).toLowerCase();
    const filteredPosts = allPosts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(normalizedSearch);
      const descriptionMatch = post.description
        ?.toLowerCase()
        .includes(normalizedSearch);
      return titleMatch || descriptionMatch;
    });

    const pageNum = parseInt(page as string, 10);
    const perPageNum = parseInt(per_page as string, 10);
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / perPageNum);

    const paginatedPosts = filteredPosts.slice(
      (pageNum - 1) * perPageNum,
      pageNum * perPageNum,
    );

    res.status(200).json({
      status: true,
      data: {
        posts: paginatedPosts,
        page: pageNum,
        per_page: perPageNum,
        total_pages: totalPages,
        total_posts: totalPosts,
        categories: [],
      },
    });
  } catch (error) {
    logger.error('[DEVTO_POSTS_ERROR]', error);
    res.status(500).json({
      status: false,
      error: 'Erro ao obter os posts do blog.',
    });
  }
}
