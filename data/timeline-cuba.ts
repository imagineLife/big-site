import type { TimelineChapter } from './../types/repo';

type SpotifyEmbed =
  | { kind: 'artist'; label: string; url: string }
  | { kind: 'playlist'; label: string; url: string }
  | { kind: 'album'; label: string; url: string };

type MusicianRef = {
  name: string;
  role: string;
  why: string;
  spotifyEmbeds?: SpotifyEmbed[];
};

export const cubaChapter: TimelineChapter = {
  id: 'cuba',
  label: 'Cuba: son → montuno → dance-band power',
  // No description here!
  steps: [
    // ============================================================
    // 1) SON BLUEPRINT
    // ============================================================
    {
      id: 'cuba-1',
      dateLabel: 'Late 1800s → early 1900s',
      title: 'Son cubano rises (the blueprint)',
      body:
        '**Son** emerges in eastern Cuba and spreads to Havana, codifying the core mechanics later salsa inherits.\n\n' +
        'Key musical ideas you can *literally point to* in a track:\n\n' +
        '• **Clave logic** (the alignment grid)\n\n' +
        '• **Bass tumbao** (the forward-leaning engine)\n\n' +
        '• **Guajeo / montuno** (repeating syncopated patterns that create hypnosis)\n\n' +
        '• **Verse → montuno** (song opens up into call-and-response + improvisation)\n\n' +
        'Son becomes a magnet for hybrids: **guajira-son**, **bolero-son**, and Afro-Cuban rhythmic phrasing shaped by rumba traditions (yambú/guaguancó timing, conversational swing, and ‘street’ feel).\n\n' +
        'If your UI ever adds a ‘tap-to-learn’ sidebar, this step is where you teach: **clave, tumbao, montuno, coro/pregón**.',

      musicalImpact: [
        'Defines the verse→montuno architecture salsa keeps (structured song → open dance drive).',
        'Standardizes ensemble roles: bass engine + timekeeping percussion + chordal pattern instrument (later piano) + vocals.',
        'Creates the rhythmic grammar arrangers build around (hits, breaks, coro responses).',
      ],
      instrumentation: [
        'Tres (signature Cuban string voice)',
        'Guitar (song + harmony support)',
        'Bongó (time + fills)',
        'Maracas + claves (clock)',
        'Botija / marímbula → later upright bass',
        'Later: trumpet + piano as ensembles expand',
      ],
      keyMusicians: [
        {
          name: 'Ignacio Piñeiro',
          role: 'composer / bandleader',
          why: 'Essential early son songcraft; widely associated with Septeto Nacional’s canon.',
          spotifyEmbeds: [
            {
              kind: 'artist',
              title: 'Ignacio Piñeiro y su Septeto Nacional (Spotify)',
              embedUrl:
                'https://open.spotify.com/embed/artist/6CAcYA0u2XRkxOOibwrM6w',
              note: 'Best “canonical” Spotify entry point for Piñeiro’s son catalog + Septeto-era recordings.',
            },
            {
              kind: 'playlist',
              title: 'The Sound of Música Tradicional Cubana (Spotify)',
              embedUrl:
                'https://open.spotify.com/embed/playlist/5elKpfFPejpmof8qyNkpRw',
              note: "A reliable 'son/trova roots' playlist that tends to embed consistently.",
            },
          ],
        },

        {
          name: 'Sexteto Habanero',
          role: 'ensemble',
          why: 'Early son ensemble model as son spreads in Havana.',
          spotifyEmbeds: [
            {
              kind: 'album',
              title: 'Puro Ritmo Cubano (Spotify)',
              openUrl: 'https://open.spotify.com/album/5v1o4L2gtkk98y1lUiMWSZ',
              embedUrl:
                'https://open.spotify.com/embed/album/5v1o4L2gtkk98y1lUiMWSZ',
              note: 'Compact “era sound” snapshot: early son ensemble feel and pacing.',
            },
          ],
        },
        {
          name: 'Septeto Nacional',
          role: 'ensemble',
          why: 'Classic septet format; preserves and popularizes son tradition.',
          spotifyEmbeds: [
            {
              kind: 'album',
              title: 'Sones de Mi Habana (Spotify)',
              openUrl: 'https://open.spotify.com/album/51OWw4m3vNisHiuomSOPRH',
              embedUrl:
                'https://open.spotify.com/embed/album/51OWw4m3vNisHiuomSOPRH',
              note: '“Son blueprint” listening: septet format, coro/response structure, classic repertoire feel.',
            },
          ],
        },
      ],
      relatedStyles: [
        'son cubano',
        'son montuno',
        'guajira-son',
        'bolero-son',
        'rumba (yambú, guaguancó)',
      ],

      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Conjunto%20de%20Arsenio%20Rodr%C3%ADguez.JPG?width=2400',
      bgCredit: {
        label: 'Conjunto de Arsenio Rodríguez (son montuno / conjunto era)',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Conjunto_de_Arsenio_Rodr%C3%ADguez.JPG',
      },
      accent: 'cuba',
    },

    // ---- Musician spotlight: Arsenio Rodríguez
    {
      id: 'cuba-m-arsenio',
      dateLabel: '1930s–1950s (spotlight)',
      title: 'Musician spotlight: Arsenio Rodríguez (tres → conjunto power)',
      body:
        '**Arsenio Rodríguez** is a defining architect of **son montuno** as a *dance-band engine*.\n\n' +
        'What he emphasizes musically:\n' +
        '• **Montuno intensity**: longer, hotter open sections built for dancing\n' +
        '• **Stronger rhythmic conversation** between bass, tres/piano patterns, and percussion\n' +
        '• **Bigger ensemble impact** (the ‘conjunto’ sound)\n\n' +
        'Listen for the feeling of the groove ‘locking’ into a higher gear as the montuno opens up.\n\n' +
        '**Starter listening (search these):** “Dundunbanza”, “Bruca Maniguá”, “Fuego en el 23”.',
      musicalImpact: [
        'Pushes son toward a higher-energy, dance-forward montuno aesthetic.',
        'Popularizes a thicker ensemble footprint that later salsa bands love (more rhythmic density, bigger hits).',
      ],
      instrumentation: [
        'Tres (lead rhythmic-harmonic voice)',
        'Upright bass tumbao (engine)',
        'Expanded percussion feel (bongó + conga layers, later timbales contexts)',
        'Trumpets (punch + riffs)',
      ],
      keyMusicians: [
        {
          hide: true,
          name: 'Arsenio Rodríguez',
          role: 'tresero / composer / bandleader',
          why: 'Catalyst for son montuno’s ensemble power and rhythmic density.',
          spotifyEmbeds: [
            {
              kind: 'artist',
              embedUrl:
                'https://open.spotify.com/artist/2hN2DVx3lbISa1k2EuA9ug',
              note: 'Artist page embed (catalog + top tracks).',
            },
            {
              kind: 'playlist',
              embedUrl:
                'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1iQc90',
            },
          ],
        },
      ] as MusicianRef[],
      relatedStyles: [
        'son montuno',
        'conjunto',
        'guaguancó feel (in phrasing)',
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Conjunto%20de%20Arsenio%20Rodr%C3%ADguez.JPG?width=2400',
      bgCredit: {
        label: 'Conjunto de Arsenio Rodríguez',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Conjunto_de_Arsenio_Rodr%C3%ADguez.JPG',
      },
      accent: 'cuba',
    },

    // ---- Musician spotlight: Ignacio Piñeiro / Septeto Nacional (as a concept)
    {
      id: 'cuba-m-pineiro',
      dateLabel: '1920s–1930s (spotlight)',
      title:
        'Musician spotlight: Ignacio Piñeiro (son’s songcraft + septeto canon)',
      body:
        '**Ignacio Piñeiro** is a pillar for **son’s** *melodic and lyrical identity* — the part that makes the groove memorable.\n\n' +
        'What he emphasizes musically:\n' +
        '• **Tight, singable coro hooks**\n' +
        '• **Clear verse→montuno storytelling** (the track ‘opens’ naturally)\n' +
        '• A son feel that’s danceable without needing big-band density\n\n' +
        '**Starter listening (search these):** “Échale Salsita”, “Suavecito”, “Don Lengua”.',
      musicalImpact: [
        'Strengthens son’s ‘song’ side (hooks, coro structure, memorable themes).',
        'Reinforces the septeto format as a template for later salsa’s coro/pregón logic.',
      ],
      instrumentation: [
        'Vocals + coro (identity + hook)',
        'Tres/guitar (syncopated harmony)',
        'Bongó + claves/maracas (pulse + sparkle)',
        'Bass (tumbao foundation)',
      ],
      keyMusicians: [
        {
          name: 'Ignacio Piñeiro',
          role: 'composer / bandleader',
          why: 'Essential early son songcraft; widely associated with Septeto Nacional’s canon.',
          spotifyEmbeds: [
            {
              kind: 'album',
              title: 'El Son de Altura (Spotify)',
              embedUrl: 'https://open.spotify.com/album/6EinOJz9QpkIe34uqemN9L',
              note: 'Great “Piñeiro-era son” entry point: coro/response, early ensemble feel, classic songcraft.',
            },
          ],
        },
        {
          name: 'Septeto Nacional (Ignacio Piñeiro legacy)',
          role: 'ensemble',
          why: 'Septeto model that preserves and popularizes classic son language.',
          spotifyEmbeds: [
            {
              kind: 'playlist',
              label: 'This Is Septeto Nacional (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO31sZWO',
              // note: 'Spotify-curated essentials playlist; tends to embed reliably.',
            },
          ],
        },
      ] as MusicianRef[],
      relatedStyles: ['son cubano', 'septeto', 'bolero-son'],
      // A usable Commons image for Piñeiro itself is trickier to guarantee for every build,
      // so we credit the canonical page + you can swap later if you prefer a different photo.
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ignaciopineiro.jpg?width=2400',
      bgCredit: {
        label: 'Ignacio Piñeiro',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ignaciopineiro.jpg',
      },
      accent: 'cuba',
    },

    // ============================================================
    // 2) MAMBO + LATIN JAZZ (ARRANGEMENT + VIRTUOSITY)
    // ============================================================
    {
      id: 'cuba-2',
      dateLabel: '1940s–1950s',
      title: 'Mambo & Latin jazz era (arrangement + virtuosity)',
      body:
        'The big shift here is **band architecture**: larger horn sections, tighter arranging, and more jazz-forward harmony and improvisation.\n\n' +
        '**Mambo** and the broader Afro-Cuban jazz ecosystem amplify:\n' +
        '• **Horn writing** (punchy unison lines, harmonized riffs, dramatic hits)\n' +
        '• **Solo culture** (improvised statements that ‘speak’ over the groove)\n' +
        '• **Stage power** (big-band dynamics and showmanship)\n\n' +
        'This is also where dance-band vocabulary multiplies: **cha-cha-cha** emerges as a smoother, more ‘walking’ dance feel, while Afro-Cuban rhythmic experiments keep growing and later influence salsa’s arranging toolbox.\n\n' +
        'If 1970s salsa is the ‘street newspaper’ sound, this era is where it inherits a **symphonic horn brain** and a jazz-trained improvisation ethos.',
      musicalImpact: [
        'Elevates horn arranging and big-band dynamics that become central to salsa’s sound.',
        'Normalizes extended instrumental sections (descargas, solos) over Afro-Cuban grooves.',
        'Bridges Afro-Cuban rhythm to jazz harmony and improvisation culture.',
      ],
      instrumentation: [
        'Trombones / trumpets / saxes (bigger horn sections)',
        'Piano (more harmonically active montunos + jazz voicings)',
        'Upright bass (strong tumbao engine)',
        'Congas + bongó + timbales (expanded percussion battery)',
      ],
      keyMusicians: [
        {
          name: 'Pérez Prado',
          role: 'bandleader / arranger',
          why: 'Signature mambo figure; popularized the style internationally (big hooks, big brass).',
        },
        {
          name: 'Machito',
          role: 'bandleader',
          why: 'Central to Afro-Cuban jazz big-band lineage and NYC’s Cuban-jazz bridge.',
        },
        {
          name: 'Mario Bauzá',
          role: 'musical director / trumpeter',
          why: 'Key architect connecting Afro-Cuban rhythm with jazz big-band arranging (the bridge builder).',
        },
        {
          name: 'Tito Puente',
          role: 'timbales / bandleader',
          why: 'Iconic mambo/Latin jazz bandleader; reference point for later salsa performance culture.',
        },
      ],
      relatedStyles: ['mambo', 'cha-cha-cha', 'Latin jazz', 'descarga'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/TitoPuente.jpg?width=2400',
      bgCredit: {
        label: 'Tito Puente (mambo / Latin jazz)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TitoPuente.jpg',
      },
      accent: 'cuba',
    },

    // ---- Musician spotlight: Pérez Prado
    {
      id: 'cuba-m-prado',
      dateLabel: '1940s–1950s (spotlight)',
      title: 'Musician spotlight: Pérez Prado (mambo hooks + brass drama)',
      body:
        '**Pérez Prado** is the loudspeaker version of mambo: bold riffs, big brass, and instantly recognizable hooks.\n\n' +
        'What he emphasizes musically:\n' +
        '• **Riff-forward arranging** (memorable brass motifs)\n' +
        '• **Punchy dynamics** (sudden hits, stop-time, shout sections)\n' +
        '• Dance-floor clarity: the groove is sophisticated, but the *hooks* are direct\n\n' +
        '**Starter listening (search these):** “Mambo No. 5”, “Cherry Pink and Apple Blossom White”, “Patricia”.',
      musicalImpact: [
        'Codifies a mass-audience ‘mambo’ identity: hooks + brass spectacle.',
        'Influences how later salsa writers think about horn lines as *melody carriers*, not just accompaniment.',
      ],
      instrumentation: [
        'Trumpets + saxes (riff machines)',
        'Trombones (weight + punch)',
        'Piano + bass (groove spine)',
        'Percussion battery (conga/timbales/bongó depending on band)',
      ],
      keyMusicians: [
        {
          name: 'Pérez Prado',
          role: 'bandleader / arranger',
          why: 'Mambo’s global popularizer; big-band Latin dance spectacle.',
          spotifyEmbeds: [
            {
              kind: 'playlist',
              label: 'This Is Pérez Prado (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO17YZLu',
              note: 'Spotify-curated essentials playlist; reliable embed.',
            },
          ],
        },
      ] as MusicianRef[],
      relatedStyles: ['mambo', 'big-band Latin dance'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Perez_Prado_1954.jpg?width=2400',
      bgCredit: {
        label: 'Pérez Prado (1954)',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Perez_Prado_1954.jpg',
      },
      accent: 'cuba',
    },

    // ---- Musician spotlight: Machito + Mario Bauzá (bridge to jazz)
    {
      id: 'cuba-m-machito-bauza',
      dateLabel: '1940s–1950s (spotlight)',
      title:
        'Musician spotlight: Machito + Mario Bauzá (Afro-Cuban jazz bridge)',
      body:
        '**Machito** (front) and **Mario Bauzá** (musical brain) are a cornerstone for Afro-Cuban jazz big-band language.\n\n' +
        'What they emphasize musically:\n' +
        '• **Clave-respecting big-band arranging** (jazz harmony without losing Afro-Cuban time)\n' +
        '• **Section precision** (horns as a unified rhythmic instrument)\n' +
        '• **Improvisation culture** — solos that sit *inside* the clave grid\n\n' +
        'Think of this as the ‘wiring harness’ that later salsa inherits: horns + jazz harmony + Afro-Cuban rhythm, all cooperating.\n\n' +
        '**Starter listening (search these):** “Tanga” (often associated with this lineage), plus Machito big-band classics/compilations.',
      musicalImpact: [
        'Normalizes clave-aware jazz arranging as a professional standard.',
        'Shapes the NYC pipeline where Cuban rhythmic science meets jazz orchestration.',
      ],
      instrumentation: [
        'Trumpets/saxes/trombones (tight sectional writing)',
        'Piano (montuno vocabulary with jazz voicings)',
        'Bass (tumbao discipline)',
        'Congas + timbales/bongó (Afro-Cuban timekeeping at big-band scale)',
      ],
      keyMusicians: [
        {
          name: 'Machito',
          role: 'bandleader / vocalist',
          why: 'One of the most important Afro-Cuban big-band leaders in the NYC lineage.',
          spotifyEmbeds: [
            {
              kind: 'playlist',
              label: 'This Is Machito (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO1WOlxd',
              note: 'Spotify-curated essentials playlist; reliable embed.',
            },
          ],
        },
        {
          name: 'Mario Bauzá',
          role: 'musical director / trumpeter / arranger',
          why: 'Architect linking Afro-Cuban rhythm to jazz big-band arranging practice.',
          spotifyEmbeds: [
            {
              kind: 'artist',
              label: 'Mario Bauzá (Spotify)',
              embedUrl:
                'https://open.spotify.com/artist/4ac8P2JGDFcQLNdGLm227f',
              note: 'Artist page embed (catalog + top tracks).',
            },
            {
              kind: 'album',
              label: 'My Time Is Now (Spotify)',
              embedUrl: 'https://open.spotify.com/album/2IkqDV8vYvw2nkGEGamMLj',
              note: 'A solid “anchor album” for Bauzá’s Afro-Cuban jazz language.',
            },
          ],
        },
      ] as MusicianRef[],
      relatedStyles: [
        'Latin jazz',
        'Afro-Cuban jazz',
        'big-band mambo lineage',
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Machito%20and%20Graciella%20cropped.jpg?width=2400',
      bgCredit: {
        label: 'Machito (with Graciela) – photo by William P. Gottlieb',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Machito_and_Graciella_cropped.jpg',
      },
      accent: 'cuba',
    },

    // ---- Musician spotlight: Tito Puente (timbales + stage power)
    {
      id: 'cuba-m-puente',
      dateLabel: '1950s–1960s (spotlight)',
      title: 'Musician spotlight: Tito Puente (timbales + bandleader energy)',
      body:
        '**Tito Puente** is a master symbol of the mambo/Latin-jazz era: virtuosic **timbales**, tight ensembles, and undeniable stage power.\n\n' +
        'What he emphasizes musically:\n' +
        '• **Percussion as a lead voice** (fills, breaks, callouts)\n' +
        '• **Big-band discipline** (hits land *together*)\n' +
        '• **Dance-floor propulsion** — the groove feels like it’s always accelerating\n\n' +
        '**Starter listening (search these):** “Oye Como Va”, “Ran Kan Kan”, “Mambo Gozón”.',
      musicalImpact: [
        'Popularizes timbales-forward performance culture that later salsa inherits (breaks, fireworks, precision).',
        'Strengthens the idea that percussion can be both timekeeper *and* front-line character.',
      ],
      instrumentation: [
        'Timbales (lead percussion voice)',
        'Congas + bongó (full battery)',
        'Horns (big-band punch)',
        'Piano + bass (engine + harmonic glue)',
      ],
      keyMusicians: [
        {
          name: 'Tito Puente',
          role: 'timbalero / bandleader',
          why: 'Iconic mambo/Latin jazz leader; a reference point for salsa’s later showmanship + precision.',
          spotifyEmbeds: [
            {
              kind: 'artist',
              title: 'Tito Puente (Spotify)',
              embedUrl:
                'https://open.spotify.com/artist/6SPpCqM8gOzrtICAxN5NuX',
              note: 'Artist page embed (catalog + top tracks).',
            },
            {
              kind: 'playlist',
              title: '10 Tito Puente Essentials (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/3fOLJuvAKAjYUvgEylWpb0',
              note: 'Short, curated set—nice for a ‘starter listening’ box.',
            },
          ],
        },
      ] as MusicianRef[],
      relatedStyles: ['mambo', 'Latin jazz', 'descarga'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/TitoPuente.jpg?width=2400',
      bgCredit: {
        label: 'Tito Puente',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TitoPuente.jpg',
      },
      accent: 'cuba',
    },
  ],
};
