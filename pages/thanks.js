import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { getGlobalData } from '../utils';

export default function ThanksPage({ globalData }) {
  return (
    <section className="px-[10%]">
      <Layout>
        <Seo
          title="Thanks for Reaching Out | Eric (Jake) Laursen"
          slug="/thanks"
          metaDescription="Thank you for your project inquiry."
          robots="noindex,nofollow"
        />
        <Header name={globalData.name} />
        <article className="prose dark:prose-dark mx-auto lg:prose-lg lg:max-w-none">
          <h1>Thanks for Reaching Out</h1>
          <p>Your inquiry was submitted successfully.</p>
          <p>
            I&apos;ll review it and follow up soon. In the meantime, you can
            review my <Link href="/work">work experience</Link> or return to
            the <Link href="/services">services page</Link>.
          </p>
        </article>
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
