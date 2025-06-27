'use client';

import { useEffect, useState } from 'react';

import { DevtoPost, getDevtoPosts } from '@/services/devto/getDevtoPosts';

const DevtoArticles = () => {
  const [posts, setPosts] = useState<DevtoPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const articles = await getDevtoPosts();
        setPosts(articles);
      } catch (err) {
        console.error('Failed to fetch Dev.to posts', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='rounded border p-4 shadow-sm transition hover:shadow-md'
        >
          <h2 className='mb-2 text-lg font-semibold'>{post.title}</h2>
          <p className='text-sm text-gray-600'>{post.description}</p>
          <div className='mt-2 text-xs text-gray-400'>
            <span>{post.page_views_count} views</span> ·{' '}
            <span>{post.reading_time_minutes} min read</span>
          </div>
          <a
            href={post.url}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-2 block text-blue-600 hover:underline'
          >
            Ler no Dev.to →
          </a>
        </div>
      ))}
    </div>
  );
};

export default DevtoArticles;
