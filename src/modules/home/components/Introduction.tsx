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
            <li>Working remotely worldwide 🌍</li>
          </ul>
        </div>
      </div>

      <p className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
        I’m a Senior Backend Engineer focused on scalable architectures, Clean
        Architecture, and high-reliability backend systems. I specialize in
        building robust APIs, event-driven pipelines, intelligent automation
        flows, and cloud-native services designed for performance, resilience,
        and long-term maintainability. My core stack includes TypeScript
        (NestJS, Node.js), PostgreSQL, Prisma, Redis, RabbitMQ, AWS (ECS, RDS,
        S3, SQS), and modern patterns such as DDD, event-driven architecture,
        async processing, and distributed system design. I turn ideas and
        complex requirements into solid, well-structured, production-ready
        solutions — guided by clean code, maintainability, and architectural
        clarity.
      </p>
    </section>
  );
};

export default Introduction;
