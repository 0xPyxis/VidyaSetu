import Link from 'next/link';
import {
  BookOpen,
  Boxes,
  Database,
  FileCode2,
  GitPullRequest,
  Layers3,
  Route,
  ServerCog,
} from 'lucide-react';

const architectureLayers = [
  {
    title: 'App Router Pages',
    path: 'src/app',
    description:
      'Route-based screens for public pages, auth, dashboard, NCERT explorer, notes, quiz, profile, and admin flows.',
  },
  {
    title: 'API Routes',
    path: 'src/app/api',
    description:
      'Next.js route handlers that receive browser requests and delegate work to domain modules.',
  },
  {
    title: 'Domain Modules',
    path: 'src/modules',
    description:
      'Feature logic grouped by auth, admin, NCERT, quiz, notes, AI, analytics, and user concerns.',
  },
  {
    title: 'Shared Libraries',
    path: 'src/lib',
    description:
      'Reusable helpers for Prisma, auth, cookies, Cloudinary, logging, responses, and provider integrations.',
  },
  {
    title: 'Database Schema',
    path: 'src/prisma/schema.prisma',
    description:
      'Prisma models for users, NCERT structure, notes, quizzes, sessions, responses, AI logs, and analytics.',
  },
  {
    title: 'Generated Prisma Client',
    path: 'src/generated/prisma',
    description:
      'Generated after running pnpm db:generate. This folder is ignored and should not be manually edited.',
  },
];

const requestFlow = [
  'A page or client component calls an API route under src/app/api.',
  'The API route calls the matching controller in src/modules.',
  'The controller validates input and calls the service layer.',
  'The service handles business rules and calls repositories or providers.',
  'Repositories use Prisma to read or write PostgreSQL data.',
  'The API route returns a structured response to the frontend.',
];

const dataModels = [
  'User and Account handle credentials, OAuth accounts, refresh tokens, profile state, and roles.',
  'AcademicClass, Subject, Chapter, and Topic represent the NCERT content structure.',
  'Question and Option store MCQ and subjective question data.',
  'Quiz, QuizSession, and QuestionResponse track quiz creation, attempts, scores, and timing.',
  'SubjectiveEvaluation stores feedback and ideal answers for written responses.',
  'Note stores uploaded or pasted study material and extracted text.',
  'UserStats stores aggregate analytics for student progress.',
  'AIGenerationLog tracks AI provider usage, status, token counts, and cost estimates.',
];

const contributorTasks = [
  {
    title: 'Add or adjust a page',
    start: 'src/app',
    note: 'Use the App Router route folder that matches the URL you are changing.',
  },
  {
    title: 'Change backend behavior',
    start: 'src/modules',
    note: 'Update the relevant controller, service, repository, validator, or type file.',
  },
  {
    title: 'Change database structure',
    start: 'src/prisma/schema.prisma',
    note: 'Update the schema, create a migration, then regenerate the Prisma client.',
  },
  {
    title: 'Work on NCERT data',
    start: 'src/modules/ncert and src/prisma/seed.ts',
    note: 'Use seed data for class, subject, chapter, and PDF link setup.',
  },
  {
    title: 'Work on auth',
    start: 'src/modules/auth and src/lib/auth',
    note: 'Check token creation, cookies, refresh logic, and route handlers together.',
  },
  {
    title: 'Work on quiz flow',
    start: 'src/modules/quiz and src/app/quiz',
    note: 'Trace quiz creation, session start, response submission, and scoring.',
  },
];

const setupSteps = [
  'Copy .env.example to .env.',
  'Choose hosted PostgreSQL or Docker PostgreSQL.',
  'Run pnpm install.',
  'Run pnpm db:generate.',
  'Run pnpm db:migrate.',
  'Run pnpm db:seed.',
  'Run pnpm dev.',
];

function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] font-semibold uppercase tracking-wider text-secondary">
        {label}
      </p>
      <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
        {title}
      </h2>
      <p className="max-w-3xl text-sm leading-7 text-secondary md:text-base">
        {children}
      </p>
    </div>
  );
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-black/10 px-6 py-6 md:px-10">
        <nav className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold uppercase">
            VidyaSetu
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/ncert" className="text-secondary hover:text-black">
              NCERT
            </Link>
            <Link href="/dashboard" className="text-secondary hover:text-black">
              Dashboard
            </Link>
          </div>
        </nav>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div className="flex flex-col gap-6">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-secondary">
              Contributor Docs
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
              Understand the VidyaSetu codebase before you contribute.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-secondary md:text-lg">
              This page explains the project structure, request flow, database
              model, setup path, and the best files to open for common
              contribution tasks.
            </p>
          </div>

          <div className="border-l border-black/20 pl-6">
            <p className="text-sm font-semibold uppercase tracking-wider">
              First local run
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {setupSteps.map((step, index) => (
                <div key={step} className="flex gap-3 text-sm text-secondary">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-black text-[12px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white px-6 py-14 md:px-10">
        <SectionHeading label="Architecture" title="How the code is organized">
          VidyaSetu uses a Next.js App Router frontend with API routes and
          feature modules. Most changes should start from the route or module
          that owns the feature, then move inward toward services, repositories,
          Prisma, and shared libraries as needed.
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {architectureLayers.map((layer) => (
            <article
              key={layer.path}
              className="border border-black/10 bg-background p-6"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center bg-black text-white">
                <Layers3 size={18} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">{layer.title}</h3>
              <p className="mt-2 font-mono text-xs text-secondary">
                {layer.path}
              </p>
              <p className="mt-4 text-sm leading-6 text-secondary">
                {layer.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading label="Request Flow" title="From screen to data">
              The codebase follows a simple path from UI interaction to database
              operation. When debugging, trace the feature in this order before
              changing shared code.
            </SectionHeading>

            <div className="mt-10 flex flex-col gap-4">
              {requestFlow.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-black text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-secondary">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black p-8 text-white">
            <div className="flex items-center gap-3">
              <ServerCog size={22} aria-hidden="true" />
              <h2 className="text-2xl font-semibold">Backend module shape</h2>
            </div>
            <div className="mt-8 grid gap-4">
              {[
                'controller.ts receives requests and shapes responses.',
                'service.ts owns business rules and orchestration.',
                'repository.ts owns database access.',
                'validator.ts validates incoming payloads.',
                'types.ts keeps feature-specific TypeScript contracts.',
              ].map((item) => (
                <p
                  key={item}
                  className="border border-white/15 p-4 text-sm leading-6 text-white/75"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading label="Database" title="Core Prisma models">
            PostgreSQL is the source of truth. Prisma defines the schema,
            migrations shape the database, and the generated client gives the
            app typed access to the models.
          </SectionHeading>

          <div className="grid gap-3 md:grid-cols-2">
            {dataModels.map((model) => (
              <div
                key={model}
                className="flex gap-3 border border-black/10 p-4 text-sm leading-6 text-secondary"
              >
                <Database
                  size={18}
                  className="mt-1 shrink-0 text-black"
                  aria-hidden="true"
                />
                <p>{model}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <SectionHeading label="Contribution Map" title="Where to start">
          Start from the smallest area that owns the behavior. A UI-only change
          should usually stay in `src/app` or `src/components`; a data change
          should usually include Prisma and the matching module.
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contributorTasks.map((task) => (
            <article key={task.title} className="border border-black/10 p-6">
              <div className="mb-5 flex h-10 w-10 items-center justify-center bg-accent/40">
                <FileCode2 size={18} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="mt-3 font-mono text-xs text-secondary">
                {task.start}
              </p>
              <p className="mt-4 text-sm leading-6 text-secondary">
                {task.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-black/10 bg-white px-6 py-16 md:px-10">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: 'Read setup docs',
              body: 'Use README.md for environment variables, database setup, migrations, and seed data.',
            },
            {
              icon: Database,
              title: 'Seed your database',
              body: 'Run pnpm db:seed to populate NCERT classes, subjects, chapters, and PDF links.',
            },
            {
              icon: Route,
              title: 'Trace the route',
              body: 'Find the page or API route first, then follow it into the owning module.',
            },
            {
              icon: GitPullRequest,
              title: 'Open a focused PR',
              body: 'Keep changes scoped to one issue or feature so review stays clear.',
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="border border-black/10 p-6">
                <Icon size={22} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-secondary">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-4 bg-background p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Boxes size={22} aria-hidden="true" />
            <p className="font-semibold">Need the full setup path?</p>
          </div>
          <Link
            href="https://github.com/MRIARC-08/VidyaSetu"
            className="w-full bg-black px-5 py-3 text-center text-sm font-semibold text-white md:w-auto"
          >
            Open GitHub Repository
          </Link>
        </div>
      </section>
    </main>
  );
}
