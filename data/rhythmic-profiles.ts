import type { RhythmicProfile } from './../types/repo';

const rhythmicProfiles: Record<string, RhythmicProfile> = {
  roots: {
    id: 'roots',
    name: 'Afro-Cuban Roots (clave grammar + rumba/son feel)',
    primaryAccents: [
      'clave (3-2 / 2-3)',
      'conga open tones (&2, 4)',
      'call/response push',
    ],
    accentPattern:
      'Phrase map: SON/RUMBA CLAVE. Common anchors: conga marcha open tones on &2 and 4; supporting 8ths (tres/guajeo, bongo martillo) weave around clave direction.',
    description:
      'This layer is “the grammar”: clave defines tension/release across the phrase. Conga marcha and bass tumbao create forward motion; rumba-derived phrasing adds conversational syncopation and anticipation.',
    notationHint:
      'Count 1 & 2 & 3 & 4 &. Hear conga open tones at &2 and 4 as landmarks. Identify 3-2 vs 2-3 clave by where phrases feel like they “resolve.”',
    bpm: {
      min: 80,
      max: 130,
      typical: 108,
      feel: 'either',
      note: 'Roots bucket spans slower yambú through medium/fast guaguancó and son-derived feels; tempo varies by ensemble and region.',
    },
    exampleUrls: [],
  },

  cuba: {
    id: 'cuba',
    name: 'Cuban Son → Son Montuno (engine + montuno lift)',
    primaryAccents: [
      'son clave (3-2 / 2-3)',
      'conga open tones (&2, 4)',
      'bongo martillo → bell',
      'bass anticipation (pickup → 1)',
      'piano/tres guajeo',
    ],
    accentPattern:
      'Verse: son clave + bongo martillo + conga marcha. Montuno: bell appears, bass tumbao leans forward (often anticipating), and guajeo/montuno patterns intensify call-and-response drive.',
    description:
      'The salsa engine becomes explicit: tumbao bass + repeating guajeo + coro/pregón. When montuno opens, the groove brightens (bell) and densifies (more syncopated “inner motion”).',
    notationHint:
      'Listen for the section change: coro/montuno + bell often signals “higher gear.” Bass frequently feels like it pulls into the next bar rather than landing squarely on 1.',
    bpm: {
      min: 90,
      max: 120,
      typical: 105,
      feel: 'either',
      note: 'Son montuno often sits in a medium pocket; hotter conjuntos can push faster while still feeling grounded.',
    },
    exampleUrls: [],
  },

  'cuba-charanga': {
    id: 'cuba-charanga',
    name: 'Charanga / danzón-mambo (cáscara + güiro grid)',
    primaryAccents: [
      'güiro (steady rail)',
      'timbales cáscara (shell)',
      'piano roll + bass support',
    ],
    accentPattern:
      'Time texture forward: güiro provides constant subdivision; timbales cáscara supplies a bright syncopated shell grid; piano+bass keep dance motion while flute/violins carry the melodic identity.',
    description:
      'Elegant orchestral dance feel with a crisp, high-frequency time grid. Compared to son-heavy percussion weight, charanga emphasizes sparkle, glide, and clarity while staying Afro-Cuban in phrasing.',
    notationHint:
      'Count 1 & 2 & 3 & 4 &. Hear the constant güiro as a “metronome with texture.” The cáscara pattern is the timbales’ syncopated clock that keeps dancers locked.',
    bpm: {
      min: 92,
      max: 120,
      typical: 108,
      feel: 'either',
      note: 'Danzón and danzón-mambo often live in moderate tempos; phrasing/sections can change the perceived momentum.',
    },
    exampleUrls: [],
  },

  'cuba-cha-cha': {
    id: 'cuba-cha-cha',
    name: 'Cha-cha-chá (social-dance clarity)',
    primaryAccents: [
      'güiro front-and-center',
      'clean timbales cues',
      'less “busy” syncopation',
    ],
    accentPattern:
      'Clear dance-guiding groove: güiro stays prominent and steady; timbales articulate clean cues; piano+bass support with reduced rhythmic turbulence compared to hot montuno/mambo sections.',
    description:
      'A mass-adoption groove: transparent pulse, lighter orchestration feel, and easy-to-follow time texture. Cuban phrasing remains, but the surface rhythm is intentionally accessible.',
    notationHint:
      'Listen for “less internal argument”: fewer dense offbeat fights, more consistent guidance from güiro and timbales. The groove feels like a clean lane for dancers.',
    bpm: {
      min: 120,
      max: 128,
      typical: 124,
      feel: 'either',
      note: 'Often presented in a fairly narrow dance-tempo band; recordings can drift slightly depending on orchestra and era.',
    },
    exampleUrls: [],
  },

  nyc: {
    id: 'nyc',
    name: 'NYC Salsa (Fania-era: arranged hits + street drive)',
    primaryAccents: [
      'timbales: cáscara → bell',
      'horn punches (moñas)',
      'breaks + pickups into 1',
      'piano montuno stabs',
    ],
    accentPattern:
      'Clave stays underneath, but the surface is “arranged”: timbales often move from cáscara to bell in open sections; horns/piano land planned offbeat punches; breaks set up dramatic ensemble re-entries.',
    description:
      'Cuban rhythmic logic plus NYC arranging drama. Horn riffs and ensemble hits behave like percussion, with stop-time breaks and tight re-entries that sharpen the dance-floor energy.',
    notationHint:
      'Track transitions: bell often signals an intensity lift. Listen for horn/piano figures that strike offbeats or pick up into 1, and for coordinated breaks that “reset” the room.',
    bpm: {
      min: 170,
      max: 210,
      typical: 190,
      feel: 'in-2',
      note: 'Many classic NYC salsa tracks sit fast in BPM but are often felt “in 2” by dancers as the groove heats up.',
    },
    exampleUrls: [],
  },

  'nyc-mambo': {
    id: 'nyc-mambo',
    name: 'Mambo / Latin jazz big-band (bell drive + moñas)',
    primaryAccents: [
      'mambo bell drive',
      'cáscara grid (timbales shell)',
      'section hits (moñas)',
      'stop-time breaks',
    ],
    accentPattern:
      'Big-band choreography on Afro-Cuban time: timbales establish cáscara, open sections lean into bell drive; horns play repeated riffs (moñas) and punctuate with coordinated hits and breaks.',
    description:
      'A rhythmic upgrade in architecture: larger horn sections, tighter arranging, and dramatic dynamics. The groove is still Afro-Cuban, but the band behaves like a single rhythmic machine.',
    notationHint:
      'Listen for “mambo sections”: bell gets brighter, horns repeat riff cycles, and breaks land like punctuation. Feel the difference between steady cáscara and the more forward bell drive.',
    bpm: {
      min: 160,
      max: 220,
      typical: 200,
      feel: 'in-2',
      note: 'Big-band mambo frequently runs hot; dancers commonly feel larger pulses (“in 2”) even when the band is moving fast.',
    },
    exampleUrls: [],
  },

  global: {
    id: 'global',
    name: 'Global Salsa / Fusion (clave + host groove)',
    primaryAccents: [
      'clave implied',
      'host groove (funk/reggae/pop)',
      'hybrid drumset',
      'montuno/tumbao overlays',
    ],
    accentPattern:
      'Salsa vocabulary (montuno/tumbao/coro) sits on a host groove: funk backbeat, reggae skank, pop/EDM kicks, or regional percussion feels. Clave may be implied rather than explicit.',
    description:
      'Salsa spreads by hybridizing: the form and arrangement language often stays (coro, montuno, horn riffs), while the underlying drum-language shifts to local or pop-derived patterns.',
    notationHint:
      'Identify the host groove first (backbeat vs offbeat skank vs programmed kick). Then notice how montuno/tumbao either locks in with it or deliberately creates tension against it.',
    bpm: {
      min: 80,
      max: 220,
      typical: 120,
      feel: 'either',
      note: 'Fusion tempo depends on the host genre (funk/reggae/pop/EDM/regional). Treat this as a broad bucket.',
    },
    exampleUrls: [],
  },

  modern: {
    id: 'modern',
    name: 'Songo → Timba (gears + bloques)',
    primaryAccents: [
      'kick/snare “gears”',
      'bloques (planned hits)',
      'dense bass syncopation',
      'aggressive piano tumbao',
    ],
    accentPattern:
      'Not one loop: groove “gears” switch via bloques (coordinated hits/breaks). Drumset figures answer Afro-Cuban percussion; bass/piano become highly syncopated and arrangement-driven.',
    description:
      'Modern Cuban dance music is rhythmic choreography: sudden energy spikes, tight ensemble breaks, and layered percussion + drumset language—still anchored by Afro-Cuban phrasing.',
    notationHint:
      'Track form rather than a single pattern: groove → bloque → new groove. Listen for kick accents that answer conga/timbales and for bass lines that feel like syncopated melodies.',
    bpm: {
      min: 90,
      max: 130,
      typical: 112,
      feel: 'either',
      note: 'Timba-era tempos vary; the “speed” is often perceived through gear shifts and density more than raw BPM.',
    },
    exampleUrls: [],
  },

  'modern-songo': {
    id: 'modern-songo',
    name: 'Songo (drumset integration + rumba phrasing)',
    primaryAccents: [
      'kit integration (kick/snare)',
      'rumba phrasing',
      'interlocking percussion',
      'funk pocket',
    ],
    accentPattern:
      'Drumset becomes part of the Afro-Cuban battery: kick/snare figures interlock with conga/timbales and rumba-derived phrasing. The pocket leans funkier while staying clave-aware.',
    description:
      'A modernization of the rhythm section: the groove breathes differently because drumset language joins the conversation rather than sitting outside the tradition.',
    notationHint:
      'Listen for “answers”: kit accents respond to conga and timbales rather than marking only a backbeat. The feel often toggles between steady drive and syncopated internal motion.',
    bpm: {
      min: 90,
      max: 120,
      typical: 105,
      feel: 'either',
      note: 'Songo often lives in a medium pocket with a funk-forward sense of motion; individual bands/eras can skew faster.',
    },
    exampleUrls: [],
  },

  'modern-timba': {
    id: 'modern-timba',
    name: 'Timba (aggressive tumbao + arrangement switches)',
    primaryAccents: [
      'gear shifts',
      'bloques + stops',
      'bass-led syncopation',
      'percussive piano',
    ],
    accentPattern:
      'High-energy arrangement logic: sudden stops, breakdowns, and re-entries. Bass and piano drive dense syncopation; percussion and kit accents create rapid intensity changes.',
    description:
      'Timba pushes dance-band intensity: the band “plays the arrangement” as much as the groove. Energy spikes and coordinated hits are part of the rhythmic identity.',
    notationHint:
      'Follow the map: sections change quickly and are often signposted by a bloque. If the groove suddenly feels like it downshifts or sprints, that’s the style’s core feature, not a mistake.',
    bpm: {
      min: 95,
      max: 125,
      typical: 112,
      feel: 'either',
      note: 'Commonly sits in a medium-to-fast pocket; perceived intensity is driven by bloques, density, and rhythmic “gearing.”',
    },
    exampleUrls: [],
  },
};

export { rhythmicProfiles };
