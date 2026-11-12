import Link from 'next/link';
import { getGlobalData } from '../../../utils/global-data';
import GenericPost from '../../../components/GenericPost';
import TagList from '../../../components/TagList';

const posts = [
  {
    href: '/ai-ml/personal-ai-assistant-team/why-im-building-a-personal-ai-assistant-team',
    title: "Why I'm Building a Personal AI Assistant Team",
    description:
      'The motivation for a local-first Mac mini assistant appliance, starting with a coffee-roaster control app and moving toward bounded helpers.',
  },
  {
    href: '/ai-ml/personal-ai-assistant-team/from-vibe-coded-coffee-roaster-to-ai-appliance',
    title: 'From Vibe-Coded Coffee Roaster to AI Appliance',
    description:
      'How one personal tool changed the texture of AI-assisted software and pointed toward a more repeatable local setup.',
  },
  {
    href: '/ai-ml/personal-ai-assistant-team/designing-the-assistant-team',
    title: 'Designing the Assistant Team',
    description:
      'A public architecture sketch for separate roles, macOS users, assistant profiles, skills, and models.',
  },
  {
    href: '/ai-ml/personal-ai-assistant-team/prepping-before-the-hardware-arrives',
    title: 'Prepping Before the Hardware Arrives',
    description:
      'A practical checklist for documents, workspaces, first safe tasks, and the hardware-specific questions that still need testing.',
  },
  {
    href: '/ai-ml/personal-ai-assistant-team/dev-assistant-for-side-projects',
    title: 'Dev Assistant for Side Projects',
    description:
      'A deliberately boring first coding task: one repo, one branch, one visible improvement, and a clear stopping point.',
  },
  {
    href: '/ai-ml/personal-ai-assistant-team/security-recovery-and-boundaries',
    title: 'Security, Recovery, and Boundaries',
    description:
      'The failure modes that make the project more credible: credentials, external content, backups, recovery, and human approval gates.',
  },
];

export default function PersonalAiAssistantTeamHub({ globalData }) {
  const title = 'Building a Personal AI Assistant Team';
  const tags = ['ai', 'local ai', 'mac mini', 'personal software', 'automation'];

  return (
    <GenericPost
      globalData={globalData}
      title={title}
      slug="ai-ml/personal-ai-assistant-team"
      slugArr={['ai-ml', 'personal-ai-assistant-team']}
      excerpt="A build journal for turning a Mac mini into a local-first assistant appliance with bounded helpers and strong human control."
      tags={tags}
      jsonLdType="WebPage"
    >
      <p>
        This series is a build journal for turning a Mac mini into a local-first
        assistant appliance.
      </p>

      <p>
        The idea is not to create one all-powerful assistant with access to
        everything. The idea is to create a few bounded helpers: one for software
        projects, one for personal project notes, and a human-operated admin
        layer around the whole thing. Some workflows stay private by design.
      </p>

      <p>
        The project started with a much smaller feeling: a completely vibe-coded
        coffee-roaster control app. That first tool made it obvious that
        AI-assisted software could become more personal, more practical, and
        more tied to the small systems of everyday life.
      </p>

      <p>
        This series follows the next step: designing the machine, the roles, the
        boundaries, and the recovery plan carefully enough that the setup can
        become useful without becoming sloppy.
      </p>

      <h2>Posts</h2>
      {posts.map((post) => (
        <section key={post.href}>
          <Link href={post.href} className="no-underline hover:underline">
            <h3>{post.title}</h3>
          </Link>
          <p>{post.description}</p>
        </section>
      ))}

      <TagList hideTitle tags={tags} />
    </GenericPost>
  );
}

export const getStaticProps = async () => ({
  props: {
    globalData: getGlobalData(),
  },
});
