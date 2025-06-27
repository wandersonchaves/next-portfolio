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
        Senior Software Engineer specialized in back-end development with a
        strong foundation in Clean Architecture and scalable systems. I build
        modern APIs, intelligent automations, and complex integrations focused
        on performance, maintainability, and scalability. My main stack includes
        JavaScript/TypeScript (NestJS, Node.js), Python (Django), RabbitMQ for
        messaging, PostgreSQL, and AWS cloud infrastructure. I turn ideas into
        robust and reliable solutions with clean, testable code built for the
        long run.
      </p>
    </section>
  );
};

export default Introduction;
