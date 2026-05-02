import type { TimelineChapter } from './../types/repo';

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
      rhythmicProfileId: 'cuba',
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
      ],
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
              title: 'This Is Septeto Nacional (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO31sZWO',
              // note: 'Spotify-curated essentials playlist; tends to embed reliably.',
            },
          ],
        },
      ],
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

    {
      id: 'cuba-charanga',
      dateLabel: '1930s–1950s',
      title: 'Charanga + danzón-mambo (the “lighter orchestral” bridge)',
      body:
        '**Charanga** traditions keep Cuban dance music elegant and orchestral — and quietly set up rhythms + instrumentation that salsa later absorbs.\n\n' +
        'Why this matters for salsa history:\n\n' +
        '• **Instrumentation DNA**: flute + violins up top; **piano + bass + timbales + güiro** underneath.\n\n' +
        '• **Time-feel**: timbales **cáscara** patterns + güiro create a steady, bright grid (less “earthy” than son percussion, but still deeply Afro-Cuban in phrasing).\n\n' +
        '• **Section behavior**: arrangements start to “open up” — repeating riffs, vamp-like moments, and dance-forward builds that later mambo/salsa explode.\n\n' +
        'If son is the *engine blueprint*, charanga is the *dance-floor orchestration blueprint* — it teaches how to make a groove feel elegant, fast, and social.',
      musicalImpact: [
        'Locks in charanga instrumentation that remains a major branch of Afro-Latin dance music.',
        'Strengthens the role of timbales + güiro as a bright, steady rhythmic grid.',
        'Bridges formal danzón structures toward more dance-forward, repeating, vamp-like sections.',
      ],
      instrumentation: [
        'Flute + violins (charanga lead voice)',
        'Piano (rhythmic-harmonic engine)',
        'Bass (tumbao-like foundation)',
        'Timbales (cáscara → bell-like brightness in open sections)',
        'Güiro (constant time texture)',
        'Optional: congas in later contexts / hybrids',
      ],
      relatedStyles: ['danzón', 'danzón-mambo', 'charanga'],
      keyMusicians: [
        {
          name: 'Arcaño y sus Maravillas',
          role: 'charanga ensemble',
          why: 'A foundational charanga sound: flute/violins riding over piano+bass+timbales+güiro time-feel.',
          spotifyEmbeds: [
            {
              kind: 'artist',
              title: 'Arcaño y sus Maravillas (Spotify)',
              embedUrl:
                'https://open.spotify.com/artist/1yob7mmfOrtxnHZhiaWjHh',
              note: 'Artist page: great for sampling danzón/charanga repertoire and hearing the orchestral groove identity.',
            },
            {
              kind: 'playlist',
              title: 'This Is Arcaño y sus Maravillas (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO0RwfTA',
              note: 'Spotify-curated essentials playlist; tends to embed reliably.',
            },
          ],
        },
        {
          name: 'Orquesta Aragón',
          role: 'charanga orchestra',
          why: 'Iconic charanga lineage; a strong reference point for flute-led dance orchestration and bright time-feel.',
          spotifyEmbeds: [
            {
              kind: 'artist',
              title: 'Orquesta Aragón (Spotify)',
              embedUrl:
                'https://open.spotify.com/artist/2jXlqT8v9XIJnKQYRgLvSr',
              note: 'Artist page: charanga feel in many tempos; great for “how the groove sits” listening.',
            },
          ],
        },
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charanga%20orchestra.jpg?width=2400',
      bgCredit: {
        label: 'Charanga-style orchestra (flute/violins + rhythm section)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/',
      },
      accent: 'cuba',
    },

    {
      id: 'cuba-cha-cha',
      dateLabel: 'Early–mid 1950s',
      title: 'Cha-cha-chá (social-dance clarity with Cuban rhythm DNA)',
      accent: 'cuba',
      rhythmicProfileId: 'cuba-cha-cha',
      body:
        '**Cha-cha-chá** becomes a world-moving social dance because it’s *rhythmically clear* while staying Cuban at the core.\n\n' +
        'What to listen for:\n\n' +
        '• **Bright time texture**: güiro is front-and-center; timbales feel clean and dance-guiding.\n\n' +
        '• **Less “busy” syncopation** than hot son montuno/mambo sections — more “everyone can lock in” energy.\n\n' +
        '• **Orchestration continuity**: charanga instruments (flute/violins) often remain a signature voice, keeping the dance feel light and elegant.\n\n' +
        'This step is important because salsa history isn’t only about complexity — it’s also about *mass adoption*. Cha-cha-chá shows how Cuban rhythmic logic can be packaged into a global social groove.',
      musicalImpact: [
        'Creates a widely accessible Cuban-rooted social dance groove that spreads internationally.',
        'Reinforces güiro+timbales as a clear rhythmic grid for dancers.',
        'Keeps charanga orchestration prominent as Afro-Latin dance music globalizes.',
      ],
      instrumentation: [
        'Güiro (high, steady time texture)',
        'Timbales (clean dance-guiding articulation)',
        'Piano + bass (support + forward motion)',
        'Flute + violins (charanga voice in many recordings)',
        'Vocals (often lighter phrasing than later salsa dura)',
      ],
      relatedStyles: ['cha-cha-chá', 'charanga'],
      keyMusicians: [
        {
          name: 'Enrique Jorrín',
          role: 'composer / bandleader',
          why: 'Canonical early cha-cha-chá lineage; strong “origin-era” reference point.',
          spotifyEmbeds: [
            {
              kind: 'artist',
              title: 'Enrique Jorrín (Spotify)',
              embedUrl:
                'https://open.spotify.com/artist/0qXDXAc75w0pBZQZmeoHVg',
              note: 'Artist page: good entry point for early-era cha-cha-chá repertoire.',
            },
            {
              kind: 'artist',
              title: 'Enrique Jorrín y su Orquesta (Spotify)',
              embedUrl:
                'https://open.spotify.com/artist/53NEhVUtuCRbFLZTiOKqz9',
              note: 'Often has richer catalog coverage for orchestra-era recordings.',
            },
            {
              kind: 'album',
              title: 'Cha Cha Cha Jorrin (Spotify)',
              embedUrl: 'https://open.spotify.com/album/6lSqsY9YNXXYAI5Wxboddd',
              note: 'Convenient “starter album” anchor for cha-cha-chá feel and repertoire.',
            },
          ],
        },
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cha-cha-cha%20dancers.jpg?width=2400',
      bgCredit: {
        label: 'Cha-cha-chá social dancers',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/',
      },
    },

    // ============================================================
    // 2) MAMBO + LATIN JAZZ (ARRANGEMENT + VIRTUOSITY)
    // ============================================================
    {
      id: 'cuba-2',
      dateLabel: '1940s–1950s',
      title: 'Mambo & Latin jazz era (arrangement + virtuosity)',
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
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
              title: 'This Is Pérez Prado (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO17YZLu',
              note: 'Spotify-curated essentials playlist',
            },
          ],
        },
      ],
      relatedStyles: ['mambo', 'big-band Latin dance'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P%C3%A9rez_Prado_in_1954.jpg',
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
              title: 'This Is Machito (Spotify)',
              embedUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO1WOlxd',
              note: 'Spotify-curated essentials playlist.',
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
              title: 'Mario Bauzá (Spotify)',
              embedUrl:
                'https://open.spotify.com/artist/4ac8P2JGDFcQLNdGLm227f',
              note: 'Artist page embed (catalog + top tracks).',
            },
            {
              kind: 'album',
              title: 'My Time Is Now (Spotify)',
              embedUrl: 'https://open.spotify.com/album/2IkqDV8vYvw2nkGEGamMLj',
              note: 'A solid “anchor album” for Bauzá’s Afro-Cuban jazz language.',
            },
          ],
        },
      ],
      relatedStyles: [
        'Latin jazz',
        'Afro-Cuban jazz',
        'big-band mambo lineage',
      ],
      // bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Machito%20and%20Graciella%20cropped.jpg?width=2400',
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
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
      ],
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
