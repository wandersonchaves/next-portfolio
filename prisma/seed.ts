import prisma from '@/common/libs/prisma';

async function main() {
  const projects = [
    {
      title: 'Bolepix – Pix Billing System',
      slug: 'bolepix-pix-billing-system',
      description:
        'Pix billing system integrated with Celcoin API: generates Pix charges, automates webhook handling, splits payments, generates PDF receipts and sends them via WhatsApp.',
      image: '/images/projects/bolepix.png',
      stacks: [
        'NestJS',
        'TypeScript',
        'PostgreSQL',
        'Celcoin API',
        'Event-Driven Architecture',
      ],
      is_show: true,
      is_featured: true,
      content:
        'Developed a complete Pix billing solution integrated with the Celcoin API. Supports BOLEPIX creation, asynchronous webhook handling, automatic split payments, and PDF delivery via WhatsApp. Built using Clean Architecture with Prisma ORM, and deployed on AWS.',
    },
    {
      title: 'Clinical Service System via WhatsApp',
      slug: 'clinical-service-system-whatsapp',
      description:
        'Multi-user platform for clinics with WhatsApp automation, smart routing by sector, and scheduling priority queue.',
      image: '/images/projects/clinic-whatsapp.png',
      stacks: [
        'Node.js',
        'NestJS',
        'Redis',
        'WhatsApp Business API',
        'Next.js',
      ],
      is_show: true,
      is_featured: true,
      content:
        'Built a system that connects patients to departments using automated WhatsApp flows. Features include multi-user access, smart routing, and priority queue management. Enabled faster service response and improved internal workflow efficiency.',
    },
    {
      title: 'Children’s Presence Control App',
      slug: 'childrens-presence-control-app',
      description:
        'QR Code check-in/check-out system for children in churches and events, with automated attendance reports.',
      image: '/images/projects/presence-control.png',
      stacks: ['NestJS', 'Next.js', 'Prisma ORM', 'QR Code', 'React'],
      is_show: true,
      is_featured: true,
      content:
        'Built a web/mobile system for managing child presence at events. Uses QR codes for check-ins, stores historical data, and generates visual reports. Developed with clean structure using NestJS and Next.js.',
    },
    {
      title: 'E-commerce Dashboard',
      slug: 'ecommerce-dashboard',
      description:
        'Responsive admin interface built with React.js, GraphQL, and TypeScript. Focused on performance and usability.',
      image: '/images/projects/ecommerce-dashboard.png',
      stacks: [
        'React.js',
        'GraphQL',
        'TypeScript',
        'Performance Optimization',
        'UI/UX Design',
      ],
      is_show: true,
      is_featured: true,
      content:
        'Developed a modern dashboard with reusable components, fast data-fetching via GraphQL, and strong UX focus. Improved application load time by 30% with optimizations at both frontend and data-layer levels.',
    },
  ];

  for (const project of projects) {
    await prisma.projects.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log('✅ Seed: Projects inserted successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
