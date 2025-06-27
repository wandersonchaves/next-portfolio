import { PrismaClient } from '@prisma/client';

import { logger } from '@/lib/logger';

const prisma = new PrismaClient();

async function main() {
  await prisma.projects.deleteMany();

  await prisma.projects.createMany({
    data: [
      {
        title: 'Next.js Portfolio',
        slug: 'nextjs-portfolio',
        description:
          'A personal portfolio built with Next.js, TailwindCSS, and TypeScript.',
        image: '/images/portfolio-cover.png',
        link_demo: 'https://wandersonchaves.vercel.app',
        link_github: 'https://github.com/wandersonchaves/next-portfolio',
        stacks: 'Next.js, TailwindCSS, TypeScript',
        is_show: true,
        is_featured: true,
        updated_at: new Date(),
        content:
          'This portfolio showcases my work and blog posts using modern tools.',
      },
      {
        title: 'BOLEPIX Billing System',
        slug: 'bolepix-billing',
        description:
          'A billing system integrated with Celcoin for Pix-based payments.',
        image: '/images/bolepix-cover.png',
        link_demo: '',
        link_github: '',
        stacks: 'NestJS, Prisma, PostgreSQL, RabbitMQ, Celcoin API',
        is_show: true,
        is_featured: true,
        updated_at: new Date(),
        content:
          'Automated billing and webhook processing system with split payments.',
      },
      {
        title: 'Check-in/out Kids App',
        slug: 'kids-checkin-app',
        description:
          'QR code-based check-in/out system for children’s ministry management.',
        image: '/images/checkin-cover.png',
        link_demo: '',
        link_github: '',
        stacks: 'NestJS, Next.js, PostgreSQL, QR Code',
        is_show: true,
        is_featured: false,
        updated_at: new Date(),
        content:
          'Built for churches to securely manage children’s entrance and exit records.',
      },
    ],
  });

  logger.log('✅ Seed completed with demo projects');
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    logger.error('❌ Seed failed:', error);
    return prisma.$disconnect();
  });
