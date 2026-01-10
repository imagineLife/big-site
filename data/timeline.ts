import type { TimelineChapter, TimelineStep } from 'types/repo';
import { rootsChapter } from './timeline-roots';
import { cubaChapter } from './timeline-cuba';

export const chapters: TimelineChapter[] = [
  rootsChapter,
  cubaChapter,
  {
    id: 'nyc',
    label: 'NYC: the ‘salsa’ movement',
    description:
      'New York’s Puerto Rican/Nuyorican scene fuses Afro-Cuban roots with barrio energy, R&B, jazz, and a new lyrical identity. ‘Salsa’ becomes both a sound and a global brand—driven by bands, labels, and dance floors.',
    steps: [
      {
        id: 'nyc-1',
        dateLabel: '1960s',
        title: 'Boogaloo (Latin–R&B crossover)',
        body:
          'NYC boogaloo (often called **Latin boogaloo / Latin soul**) bridges Latin grooves with R&B/soul energy and bilingual street identity.\n\n' +
          'Musically, this step is about **backbeat clarity** and **hook-first songwriting**:\n' +
          '• More obvious ‘pop’ structure\n' +
          '• Crowd-friendly choruses\n' +
          '• A rhythm feel that can lean toward R&B while keeping Latin percussion identity\n\n' +
          'In your UI, boogaloo is a perfect ‘gateway’ panel: it explains how the scene moves from older dance-band forms into the modern salsa explosion by proving Latin music can dominate clubs with contemporary attitude.',
        musicalImpact: [
          'Pushes Latin music toward pop-forward hooks and dance-floor immediacy.',
          'Creates a bilingual, urban identity that becomes central to NYC salsa’s story.',
          'Blends Latin percussion with R&B-oriented phrasing and groove expectations.',
        ],
        instrumentation: [
          'Piano or organ (often more ‘club’ sounding)',
          'Trombones / trumpets (punchy riffs)',
          'Electric or upright bass (depends on band)',
          'Timbales + congas + bongó (still the engine room)',
          'Vocals with chant-like hooks',
        ],
        keyMusicians: [
          {
            name: 'Joe Cuba',
            role: 'bandleader',
            why: 'Major boogaloo-era figure; helped define the crossover club sound.',
          },
          {
            name: 'Pete Rodríguez',
            role: 'singer',
            why: 'A well-known voice in the boogaloo wave; emblematic of the era’s bilingual club energy.',
          },
          {
            name: 'Eddie Palmieri',
            role: 'pianist / bandleader',
            why: 'Bridged hard Afro-Cuban sophistication with NYC innovation (including mozambique experiments later).',
          },
        ],
        relatedStyles: ['boogaloo', 'Latin soul', 'R&B crossover', 'mozambique (NY variant)'],
        bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ray_Barretto.jpg?width=2400',
        bgCredit: {
          label: 'Ray Barretto (NY Latin scene)',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ray_Barretto.jpg',
        },
        accent: 'nyc',
      },

      {
        id: 'nyc-2',
        dateLabel: '1964',
        title: 'Fania Records is founded (the salsa engine)',
        body:
          'Fania’s importance isn’t just business—it’s how it **packages and standardizes** the era’s sound:\n\n' +
          '• Records that travel (distribution)\n' +
          '• Stars with identity (branding)\n' +
          '• A shared repertoire and performance culture (bands cross-pollinating)\n\n' +
          'On the *music* level, the Fania-era NYC sound often foregrounds:\n' +
          '• **Trombone-forward horn lines** (aggressive, streetwise)\n' +
          '• **Hard percussion drive** (timbales/conga/bongó pushing dancers)\n' +
          '• **Coro/pregón intensity** (call-and-response becomes a chant)\n\n' +
          'If you want your cards to teach, this step can carry a ‘What is salsa here?’ mini-definition: son-derived structure + Puerto Rican/Nuyorican identity + NYC arranging attitude.',
        musicalImpact: [
          'Turns a scene into a global movement by distributing and marketing a coherent ‘salsa’ identity.',
          'Solidifies the NYC aesthetic: punchy horns, hard rhythm section, crowd-chant coros.',
          'Creates a shared superstar ecosystem where musicians collaborate and evolve quickly.',
        ],
        instrumentation: [
          'Trombones / trumpets (often trombone-heavy)',
          'Piano (montuno patterns + breaks)',
          'Bass (strong tumbao, often more aggressive articulation)',
          'Congas + timbales + bongó (plus cowbell-driven intensity)',
          'Vocals (lead + coro; high-energy pregones)',
        ],
        keyMusicians: [
          {
            name: 'Johnny Pacheco',
            role: 'musician / producer',
            why: 'Co-founded Fania; key architect of the label’s sound and roster.',
            url: 'https://en.wikipedia.org/wiki/Johnny_Pacheco',
          },
          {
            name: 'Jerry Masucci',
            role: 'producer / label founder',
            why: 'Co-founded Fania and helped build the global infrastructure around salsa.',
            url: 'https://en.wikipedia.org/wiki/Jerry_Masucci',
          },
          { name: 'Héctor Lavoe', role: 'singer', why: 'Defining Fania-era voice and phrasing.' },
          {
            name: 'Willie Colón',
            role: 'trombonist / bandleader',
            why: 'Key architect of the trombone-forward NYC sound.',
          },
          {
            name: 'Celia Cruz',
            role: 'singer',
            why: 'Iconic global salsa voice; major Fania-era star.',
          },
          {
            name: 'Larry Harlow',
            role: 'pianist / bandleader',
            why: 'Arranging + piano language that shaped the era.',
          },
          { name: 'Ray Barretto', role: 'conga', why: 'A rhythmic anchor of the NYC scene.' },
        ],
        relatedStyles: ['salsa (NYC)', 'descarga', 'guaguancó influence (feel/phrasing)'],
        bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Willie%20Col%C3%B3n%20and%20H%C3%A9ctor%20Lavoe%20(1969%20Fania%20Records%20publicity%20photo).jpg?width=2400',
        bgCredit: {
          label: 'Fania era (Colón & Lavoe promo photo)',
          sourceName: 'Wikimedia Commons',
          sourceUrl:
            'https://commons.wikimedia.org/wiki/File:Willie_Col%C3%B3n_and_H%C3%A9ctor_Lavoe_(1969_Fania_Records_publicity_photo).jpg',
        },
        accent: 'nyc',
      },

      {
        id: 'nyc-3',
        dateLabel: 'Aug 26, 1971',
        title: 'Fania All-Stars at the Cheetah (salsa as spectacle)',
        body:
          'This moment is often treated as a ‘defining salsa snapshot’: a packed stage, a roaring crowd, and the All-Stars functioning like a supergroup.\n\n' +
          'Musically, it highlights:\n' +
          '• **Descarga energy** (extended jams and solo features)\n' +
          '• **Call-and-response intensity** (coro becomes a crowd weapon)\n' +
          '• **Live arrangement drama** (hits, stops, builds, and percussion breaks)\n\n' +
          "For dancers, this era cements the ‘salsa concert’ feeling: the band isn’t background—it's a main character driving the room.",
        musicalImpact: [
          'Popularizes the All-Star ‘supergroup’ format and concert-scale salsa performance.',
          'Centers descarga/jam culture as a core salsa experience (not just studio songs).',
          'Elevates crowd interaction and call-and-response as a live performance tool.',
        ],
        instrumentation: [
          'Full horn section (trombones/trumpets) + tight rhythmic hits',
          'Piano montuno driving transitions',
          'Bass tumbao with strong forward push',
          'Percussion battery (congas/timbales/bongó/cowbell) + breaks',
          'Multiple singers trading lead + coro sections',
        ],
        keyMusicians: [
          {
            name: 'Ray Barretto',
            role: 'conga',
            why: 'Signature rhythmic power in the All-Stars format.',
          },
          {
            name: 'Willie Colón',
            role: 'trombone',
            why: 'Key horn identity and arranger/bandleader presence.',
          },
          { name: 'Larry Harlow', role: 'piano', why: 'A defining Fania-era pianist/arranger.' },
          {
            name: 'Roberto Roena',
            role: 'percussion',
            why: 'Percussion leadership and performance intensity.',
          },
          { name: 'Bobby Valentín', role: 'bass', why: 'Bass engine; a major scene figure.' },
          {
            name: 'Cheo Feliciano',
            role: 'singer',
            why: 'One of the iconic voices associated with the era.',
          },
          {
            name: 'Héctor Lavoe',
            role: 'singer',
            why: 'Era-defining phrasing and stage charisma.',
          },
          {
            name: 'Ismael Miranda',
            role: 'singer',
            why: 'Key Fania voice and performance identity.',
          },
        ],
        relatedStyles: [
          'descarga',
          'salsa dura',
          'guaguancó feel (vocal phrasing)',
          'son montuno architecture',
        ],
        bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Salsa%20performers%20in%20New%20York.jpg?width=2400',
        bgCredit: {
          label: 'Salsa performers in New York',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Salsa_performers_in_New_York.jpg',
        },
        accent: 'nyc',
      },

      {
        id: 'nyc-4',
        dateLabel: '1978',
        title: 'Siembra (Colón & Blades) — salsa becomes literature',
        body:
          'This step is about **lyric ambition** meeting massive reach.\n\n' +
          'With *Siembra*, salsa leans into:\n' +
          '• Story songs that feel like short films\n' +
          '• Social commentary and character-driven writing\n' +
          '• Still 100% dance-floor functional\n\n' +
          'Musically it’s not ‘soft’—it’s disciplined: tight horn writing, strong montuno drive, and a vocal delivery that makes narrative feel urgent. If earlier salsa is ‘party + identity,’ this is ‘party + identity + storytelling that sticks.’',
        musicalImpact: [
          'Pushes salsa lyricism toward socially conscious, narrative songwriting at blockbuster scale.',
          'Shows salsa can be both deeply literary and relentlessly danceable.',
          'Becomes a cultural reference point for what ‘serious’ salsa songwriting can do.',
        ],
        instrumentation: [
          'Trombones/trumpets with cinematic hits and transitions',
          'Piano montuno patterns supporting narrative pacing',
          'Bass tumbao with strong forward lean',
          'Full percussion battery (timbales/congas/bongó) driving dancers',
          'Vocals that foreground story and character',
        ],
        keyMusicians: [
          {
            name: 'Willie Colón',
            role: 'trombone / bandleader',
            why: 'Co-leads the project; defining arranger/sound identity.',
          },
          {
            name: 'Rubén Blades',
            role: 'singer / songwriter',
            why: 'Transforms salsa’s lyrical and narrative ambition.',
          },
        ],
        relatedStyles: ['salsa dura', 'salsa with social commentary', 'son montuno framework'],
        bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Willie%20Col%C3%B3n%20and%20H%C3%A9ctor%20Lavoe%20(1969%20Fania%20Records%20publicity%20photo).jpg?width=2400',
        bgCredit: {
          label: 'Fania-era NYC salsa (visual placeholder)',
          sourceName: 'Wikimedia Commons',
          sourceUrl:
            'https://commons.wikimedia.org/wiki/File:Willie_Col%C3%B3n_and_H%C3%A9ctor_Lavoe_(1969_Fania_Records_publicity_photo).jpg',
        },
        accent: 'nyc',
      },
    ],
  },

  {
    id: 'global',
    label: 'Global branches (Colombia & beyond)',
    description:
      'Salsa spreads and localizes. Colombia becomes a major powerhouse: DJs, dancers, labels, and bands build a complete ecosystem—especially around Cali—while also blending in local rhythmic sensibilities (cumbia/porro and coastal swing).',
    steps: [
      {
        id: 'global-1',
        dateLabel: '1970s–1980s',
        title: 'Colombia’s salsa ecosystem grows (Cali as a world center)',
        body:
          'Colombia doesn’t just ‘consume’ salsa—its scene **re-composes** it.\n\n' +
          'Cali becomes a dance capital with a distinctive culture: fast footwork aesthetics, DJ/record culture, and bands that develop a local stamp. Meanwhile, groups tied to Colombian labels and studios help create a pipeline of hits.\n\n' +
          'Musically, Colombian salsa often emphasizes:\n' +
          '• Very dance-forward arrangements (strong groove continuity)\n' +
          '• Bright, driving horn lines and punchy choruses\n' +
          '• Local flavor in swing and phrasing—without abandoning son/salsa structure\n\n' +
          'This is also a great step to surface Colombian connections to broader coastal rhythms (cumbia/porro) as ‘neighbors’ in your related styles UI.',
        musicalImpact: [
          'Builds a self-sustaining salsa industry and dance culture outside NYC/Cuba.',
          'Refines dance-forward arranging choices (groove continuity, chorus punch, horn brightness).',
          'Blends local Colombian sensibilities with the core son/salsa blueprint.',
        ],
        instrumentation: [
          'Horn sections (often bright, chorus-forward writing)',
          'Piano montunos tailored for strong dance continuity',
          'Bass tumbao with clear pocket (club-oriented)',
          'Percussion optimized for high-energy dance floors',
        ],
        keyMusicians: [
          {
            name: 'Fruko (Julio Ernesto Estrada)',
            role: 'bassist / bandleader',
            why: 'Catalyst figure in Colombian salsa; formed Fruko y sus Tesos.',
          },
          {
            name: 'Fruko y sus Tesos',
            role: 'band',
            why: 'One of the foundational Colombian salsa groups; helped define a national scene.',
          },
          {
            name: 'Grupo Niche',
            role: 'band',
            why: 'Cali-linked flagship band that helped cement Colombia’s global salsa identity.',
          },
          {
            name: 'Jairo Varela',
            role: 'composer / director',
            why: 'Key creative force in Grupo Niche’s rise.',
          },
          {
            name: 'Alexis Lozano',
            role: 'trombone / arranger',
            why: 'Co-founded Grupo Niche; later formed Guayacán Orquesta.',
          },
          {
            name: 'Guayacán Orquesta',
            role: 'band',
            why: 'Major Colombian salsa orchestra shaping 80s+ sound.',
          },
        ],
        relatedStyles: [
          'Colombian salsa',
          'Cali salsa culture',
          'cumbia (neighbor rhythm)',
          'porro (neighbor rhythm)',
        ],
        bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sals%C3%B3dromo%2C%20Feria%20de%20Cali%2C%20Colombia.JPG?width=2400',
        bgCredit: {
          label: 'Salsódromo (Feria de Cali)',
          author: 'Jyon',
          sourceName: 'Wikimedia Commons',
          sourceUrl:
            'https://commons.wikimedia.org/wiki/File:Sals%C3%B3dromo,_Feria_de_Cali,_Colombia.JPG',
          license: 'CC BY-SA 3.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        accent: 'global',
      },
    ],
  },

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
          { name: 'Paulito FG', role: 'singer', why: 'Central 90s Cuban figure in timba’s rise.' },
          {
            name: 'Charanga Habanera',
            role: 'band',
            why: 'High-energy timba band known for modern arrangements and stage impact.',
          },
        ],
        relatedStyles: ['timba', 'songo', 'rumba (folkloric influence)', 'funk/R&B influence'],
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

export const accentToClasses: Record<TimelineStep['accent'], { dot: string; pill: string }> = {
  roots: { dot: 'bg-amber-400', pill: 'bg-amber-400/15 text-amber-200 border-amber-400/30' },
  cuba: { dot: 'bg-emerald-400', pill: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30' },
  nyc: { dot: 'bg-sky-400', pill: 'bg-sky-400/15 text-sky-200 border-sky-400/30' },
  global: {
    dot: 'bg-fuchsia-400',
    pill: 'bg-fuchsia-400/15 text-fuchsia-200 border-fuchsia-400/30',
  },
  modern: { dot: 'bg-rose-400', pill: 'bg-rose-400/15 text-rose-200 border-rose-400/30' },
};
