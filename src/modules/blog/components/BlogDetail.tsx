import Breakline from '@/common/components/elements/Breakline';
import MDXComponent from '@/common/components/elements/MDXComponent';
import { BlogDetailProps } from '@/common/types/blog';

import BlogHeader from './BlogHeader';

const BlogDetail = ({
  title,
  body_markdown,
  tags_list,
  comments_count = 0,
  reading_time_minutes = 0,
  published_at,
  public_reactions_count = 0,
}: BlogDetailProps) => {
  const tagList = tags_list || [];

  return (
    <>
      <BlogHeader
        title={title}
        comments_count={comments_count}
        reading_time_minutes={reading_time_minutes}
        published_at={published_at}
        public_reactions_count={public_reactions_count}
      />
      <div className='space-y-6 leading-[1.8] dark:text-neutral-300 '>
        {body_markdown && <MDXComponent>{body_markdown}</MDXComponent>}
      </div>
      {tagList?.length >= 1 && (
        <div className='my-10 space-y-2'>
          <h6 className='text-lg font-medium'>Tags:</h6>
          <div className='flex flex-wrap gap-2 pt-2'>
            {tagList?.map((tag) => (
              <div
                key={tag?.term_id}
                className='rounded-full bg-neutral-200 px-4 py-1 text-[14px] font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-200'
              >
                <span className='mr-1 font-semibold'>#</span>
                {tag?.name.charAt(0).toUpperCase() + tag?.name.slice(1)}
              </div>
            ))}
          </div>
        </div>
      )}
      <Breakline className='!my-10' />
    </>
  );
};

export default BlogDetail;
