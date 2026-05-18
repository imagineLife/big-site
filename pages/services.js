import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { getGlobalData } from '../utils';

const SERVICES_SLUG = '/services';
const CONTACT_FORM_NAME = 'services-inquiry';

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'React, Node.js, and TypeScript Contract Services',
  description:
    'Contract software development services for React, Node.js, and TypeScript projects.',
  url: 'https://laursen.tech/services',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://laursen.tech/about/#person',
    name: 'Eric (Jake) Laursen',
    url: 'https://laursen.tech/about',
    jobTitle: 'Senior Software Engineer',
    homeLocation: {
      '@type': 'Place',
      name: 'United States',
    },
    sameAs: [
      'https://www.linkedin.com/in/eric-laursen-6a1b20b8/',
      'https://github.com/imagineLife',
    ],
    knowsAbout: [
      'React',
      'Node.js',
      'TypeScript',
      'API development',
      'Full-stack web development',
    ],
  },
};

export default function ServicesPage({ globalData }) {
  return (
    <section className="px-[10%]">
      <Layout>
        <Seo
          title="React, Node.js, and TypeScript Contract Services | Eric (Jake) Laursen"
          slug={SERVICES_SLUG}
          tags={[
            'reactjs developer',
            'nodejs developer',
            'typescript developer',
            'react contractor',
            'node contractor',
            'typescript contractor',
          ]}
          metaDescription="Senior React.js developer, Node.js developer, and TypeScript developer available for contract engagements. Full-stack delivery for production web applications."
          jsonLdOverride={servicesJsonLd}
        />
        <Header name={globalData.name} />

        <div className="max-w-4xl mx-auto pt-10 md:pt-14 pb-20">
          <article className="prose dark:prose-dark lg:prose-lg lg:max-w-none space-y-12 md:space-y-16">
            <section className="space-y-6 md:space-y-8">
              <h1 className="max-w-3xl">
                React, Node.js, and TypeScript Contract Services
              </h1>
              <p className="max-w-2xl">
                I partner with teams that need a React.js developer, Node.js
                developer, or TypeScript developer to ship production features
                quickly without sacrificing code quality.
              </p>
              <p className="max-w-2xl">
                Location: <b>US-based, Eastern Time, remote-friendly.</b>
              </p>
            </section>

            <section className="space-y-4 md:space-y-5">
              <h2>Services Offered</h2>
              <ul className="space-y-3">
                <li>
                  React front-end delivery: feature development, UX
                  implementation, and app-state architecture.
                </li>
                <li>
                  Node.js backend delivery: APIs, authentication, integrations,
                  and operational hardening.
                </li>
                <li>
                  Full-stack TypeScript delivery: end-to-end features across UI,
                  services, and data workflows.
                </li>
              </ul>
            </section>

            <section className="space-y-4 md:space-y-5">
              <h2>Proof and Relevant Work</h2>
              <p>
                If you want a quick look at recent work and technical depth,
                start with these:
              </p>
              <ul className="space-y-3">
                <li>
                  <Link href="/work">Work Experience and Certifications</Link>
                </li>
                <li>
                  <Link href="/node">Node.js Articles and Examples</Link>
                </li>
                <li>
                  <Link href="/ai-ml/system-design-case-studies/harmful-content-detection">
                    AI/ML System Design Case Study
                  </Link>
                </li>
              </ul>
            </section>

            <section className="space-y-4 md:space-y-5">
              <h2>Engagement Style</h2>
              <p>
                Best fit projects usually need senior hands-on execution with
                clear ownership, pragmatic architecture decisions, and close
                collaboration with product and design.
              </p>
              <ul className="space-y-3">
                <li>Scoped feature delivery and roadmap execution</li>
                <li>Legacy-to-TypeScript migration support</li>
                <li>Frontend and backend performance/reliability improvements</li>
              </ul>
            </section>

            <section className="space-y-4 md:space-y-5">
              <h2>Start a Project Inquiry</h2>
              <form
                name={CONTACT_FORM_NAME}
                method="POST"
                action="/thanks"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="mt-4 md:mt-6 p-5 md:p-6 rounded-lg border border-slate-700/40 bg-slate-900/30 grid gap-5 max-w-2xl"
              >
                <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out if you&apos;re human:
                    <input name="bot-field" />
                  </label>
                </p>
                <label className="text-sm font-medium">
                  Name (required)
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full mt-1.5"
                  />
                </label>
                <label className="text-sm font-medium">
                  Email (required)
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full mt-1.5"
                  />
                </label>
                <label className="text-sm font-medium">
                  Company
                  <input name="company" type="text" className="w-full mt-1.5" />
                </label>
                <label className="text-sm font-medium">
                  Project Type
                  <select name="project_type" className="w-full mt-1.5">
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Full-stack">Full-stack</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="text-sm font-medium">
                  Timeline
                  <input name="timeline" type="text" className="w-full mt-1.5" />
                </label>
                <label className="text-sm font-medium">
                  Budget
                  <input name="budget" type="text" className="w-full mt-1.5" />
                </label>
                <label className="text-sm font-medium">
                  Message (required)
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full mt-1.5"
                  />
                </label>
                <button
                  type="submit"
                  className="w-fit px-4 py-2 border rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Send Inquiry
                </button>
              </form>
            </section>
          </article>
        </div>
      </Layout>
      <Footer copyrightText={globalData.footerText} />
    </section>
  );
}

export async function getStaticProps() {
  const globalData = getGlobalData();

  return {
    props: {
      globalData,
    },
  };
}
