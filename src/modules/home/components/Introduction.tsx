const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hi, I&apos;m Wanderson</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Based in Piauí, Brazil <span className='ml-1'>🇧🇷</span>
            </li>
            <li>Working remotely</li>
          </ul>
        </div>
      </div>

      <p className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
        Senior Software Engineer with a strong focus on back-end development,
        Clean Architecture, and scalable system design. I specialize in building
        robust APIs, intelligent automation flows, and complex integrations with
        an emphasis on performance, reliability, and maintainability. My core
        stack includes TypeScript/JavaScript (NestJS, Node.js), Python (Django),
        PostgreSQL, RabbitMQ for messaging, and AWS for cloud infrastructure. I
        transform ideas into solid, long-term solutions through clean, testable,
        and scalable code.
      </p>
    </section>
  );
};

export default Introduction;
