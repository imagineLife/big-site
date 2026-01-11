import type { TimelineChapter, TimelineStep } from './../types/repo';
import { rootsChapter } from './timeline-roots';
import { cubaChapter } from './timeline-cuba';
import { nyChapter } from './timeline-ny';
import { globalChapter } from './timeline-global';
export const chapters: TimelineChapter[] = [
  rootsChapter,
  cubaChapter,
  nyChapter,
  globalChapter,

  {
    id: 'modern',
    label: 'Modern extensions (Cuba: songo → timba)',
    description:
      'Cuba’s dance bands keep innovating: songo modernizes the rhythm section language (drumset + rumba concepts), and timba supercharges it with funk/R&B influence, dense syncopation, and aggressive ‘gear changes.’',
    steps: [
      {
        id: 'modern-1',
        dateLabel: '1970s',
        title: 'Songo (modern Cuban rhythm-section language)',
        body:
          '**Songo** is a turning point in how the rhythm section thinks.\n\n' +
          'Instead of only ‘traditional’ percussion roles, songo brings in a more modern, integrated kit approach (trap drummer concepts) while still pulling heavily from rumba phrasing.\n\n' +
          'What you *feel* as a dancer:\n' +
          '• More syncopated internal motion\n' +
          '• New accents and subdivisions (the groove breathes differently)\n' +
          '• Funk influence creeping into how bass + drums lock\n\n' +
          'It’s not a break from the past; it’s a modernization of son/rumba logic that directly sets up timba.',
        musicalImpact: [
          'Modernizes Cuban dance music by integrating drumset language with son/rumba concepts.',
          'Introduces new rhythmic phrasing and accents that later become timba’s playground.',
          'Moves arrangement feel toward funk-forward pocket while staying Afro-Cuban at the core.',
        ],
        instrumentation: [
          'Trap drumset (integrated with Afro-Cuban percussion language)',
          'Congas + timbales (still central, but re-contextualized)',
          'Electric bass / modern bass articulation (funkier lock with drums)',
          'Keyboards/piano (more modern textures)',
          'Horns used for rhythmic hits and hooks',
        ],
        keyMusicians: [
          {
            name: 'Los Van Van',
            role: 'band',
            why: 'Widely credited with creating songo as a genre language.',
          },
          {
            name: 'Juan Formell',
            role: 'bassist / bandleader',
            why: 'Founder of Los Van Van; central architect of songo’s identity.',
          },
          {
            name: 'Changuito',
            role: 'drummer',
            why: 'Highly influential in Cuban drumset phrasing that shaped songo/timba vocabulary.',
          },
        ],
        relatedStyles: [
          'songo',
          'rumba influence (guaguancó phrasing)',
          'mozambique (Cuban innovation context)',
        ],
        bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Los%20Van%20Van%20dans%20les%20nuits%20d%27Afrique%20Montr%C3%A9al%202015.jpg?width=2400',
        bgCredit: {
          label: 'Los Van Van (Cuban dance-band innovation)',
          author: 'Bull-Doser',
          sourceName: 'Wikimedia Commons',
          sourceUrl:
            'https://commons.wikimedia.org/wiki/File:Los_Van_Van_dans_les_nuits_d%27Afrique_Montr%C3%A9al_2015.jpg',
          license: 'Public domain (PD-self)',
        },
        accent: 'modern',
      },

      {
        id: 'modern-2',
        dateLabel: '1990s',
        title: 'Timba takes off (dense syncopation + funk power)',
        body:
          '**Timba** is salsa’s high-energy Cuban cousin/descendant: same general tempo world and shared Afro-Cuban roots, but a different intensity and arrangement philosophy.\n\n' +
          'What changes:\n' +
          '• Rhythm sections often emphasize **bass drum + trap kit** more than classic salsa\n' +
          '• Arrangements feature **sudden ‘gear shifts’** (breakdowns, stops, re-entries)\n' +
          '• Funk/R&B influence shows up in bass vocabulary, drum feel, and harmonic color\n\n' +
          'For your timeline UI, timba is a perfect ‘modern explosion’ finale: it shows the tradition is alive and still mutating—not frozen in 1970s NYC.\n\n' +
          'If you ever add a ‘learn the feel’ widget: this is where you demonstrate why dancers describe timba as more ‘athletic’ and rhythmically surprising.',
        musicalImpact: [
          'Expands Cuban dance music into a funk-forward, highly syncopated language with dramatic arrangement shifts.',
          'Re-centers the rhythm section as a feature (breaks, gears, and percussive architecture).',
          'Shows a living lineage from son/rumba → songo → timba rather than a single ‘salsa’ endpoint.',
        ],
        instrumentation: [
          'Trap drumset (common in timba bands)',
          'Congas + timbales + auxiliary percussion',
          'Electric bass with aggressive, syncopated vocabulary',
          'Keyboards/synth textures alongside piano',
          'Horns used for hooks, hits, and rhythmic punctuation',
          'Lead vocals + coro with high-energy call/response',
        ],
        keyMusicians: [
          {
            name: 'NG La Banda',
            role: 'band',
            why: 'Frequently cited as a key timba-era innovator/early flagship.',
          },
          {
            name: 'Issac Delgado',
            role: 'singer',
            why: 'Major timba-era vocalist associated with the style’s global visibility.',
          },
          {
            name: 'Paulito FG',
            role: 'singer',
            why: 'Central 90s Cuban figure in timba’s rise.',
          },
          {
            name: 'Charanga Habanera',
            role: 'band',
            why: 'High-energy timba band known for modern arrangements and stage impact.',
          },
        ],
        relatedStyles: [
          'timba',
          'songo',
          'rumba (folkloric influence)',
          'funk/R&B influence',
        ],
        bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/IsaacDelgado.jpg?width=2400',
        bgCredit: {
          label: 'Issac Delgado (timba era)',
          author: 'Adalbertotorres',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:IsaacDelgado.jpg',
          license: 'CC BY 3.0 (also GFDL)',
          licenseUrl: 'https://creativecommons.org/licenses/by/3.0',
        },
        accent: 'modern',
      },
    ],
  },
];

export const accentToClasses: Record<
  TimelineStep['accent'],
  { dot: string; pill: string }
> = {
  roots: {
    dot: 'bg-amber-400',
    pill: 'bg-amber-400/15 text-amber-200 border-amber-400/30',
  },
  cuba: {
    dot: 'bg-emerald-400',
    pill: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
  },
  nyc: {
    dot: 'bg-sky-400',
    pill: 'bg-sky-400/15 text-sky-200 border-sky-400/30',
  },
  global: {
    dot: 'bg-fuchsia-400',
    pill: 'bg-fuchsia-400/15 text-fuchsia-200 border-fuchsia-400/30',
  },
  modern: {
    dot: 'bg-rose-400',
    pill: 'bg-rose-400/15 text-rose-200 border-rose-400/30',
  },
};
