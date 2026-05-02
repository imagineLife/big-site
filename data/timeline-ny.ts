const nyChapter = {
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
      relatedStyles: [
        'boogaloo',
        'Latin soul',
        'R&B crossover',
        'mozambique (NY variant)',
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ray_Barretto.jpg?width=2400',
      bgCredit: {
        label: 'Ray Barretto (NY Latin scene)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ray_Barretto.jpg',
      },
      accent: 'nyc',
      rhythmicProfileId: 'nyc',
    },

    //
    // ---- Musician spotlight: Joe Cuba
    //
    {
      id: 'nyc-m-joe-cuba',
      dateLabel: '1960s (spotlight)',
      title:
        'Musician spotlight: Joe Cuba — boogaloo’s club-friendly Latin soul',
      body:
        'Joe Cuba (often billed as **Joe Cuba Sextet**) became one of the defining bandleaders of NYC’s boogaloo moment—' +
        'where Latin percussion meets R&B backbeat, catchy hooks, and a dance-floor-first attitude.\n\n' +
        'If you want a single “boogaloo gateway” musician spotlight, he’s perfect: short songs, big choruses, and grooves that ' +
        'still read as unmistakably Latin because the percussion is doing the storytelling.',
      musicalImpact: [
        'Defines the “Latin boogaloo” bridge between Afro-Cuban rhythm and 1960s R&B/soul club aesthetics.',
        'Popularizes hook-forward, sing-along choruses that translate easily to crowded dance floors.',
        'Helps set the stage for salsa’s later NYC commercial explosion by proving “Latin + pop immediacy” can win big.',
      ],
      instrumentation: [
        'Piano (montuno patterns + pop-friendly hooks)',
        'Bass (tight, repetitive dance-floor lines)',
        'Percussion (congas, bongó, timbales; the Latin identity anchor)',
        'Vocals / coro (call-and-response + catchy refrains)',
        'Occasional horns (punctuation riffs)',
      ],
      keyMusicians: [
        {
          name: 'Joe Cuba',
          role: 'bandleader',
          why: 'A flagship figure of NYC’s Latin boogaloo era: club grooves, big hooks, and Latin percussion at the core.',
          hide: true,
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'This Is Joe Cuba (Spotify)',
              openUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO3p8SCB',
              embedUrl:
                'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3p8SCB',
              note: 'Best quick “boogaloo entry point” playlist.',
            },
          ],
        },
      ],
      relatedStyles: ['boogaloo', 'latin soul', 'nyc latin dance'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ray%20Barretto.jpg?width=2400',
      bgCredit: {
        label: 'Ray Barretto (photo used as a “NYC Latin music” background)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ray_Barretto.jpg',
      },
      accent: 'nyc',
    },

    //
    // ---- Musician spotlight: Eddie Palmieri
    //
    {
      id: 'nyc-m-eddie-palmieri',
      dateLabel: 'late 1960s–1970s (spotlight)',
      title:
        'Musician spotlight: Eddie Palmieri — hard-edged, trombone-forward NYC salsa',
      body:
        'Eddie Palmieri is one of the most influential NYC bandleaders/arrangers in the transition from boogaloo-era clubs ' +
        'into the more “salsa” identity: tighter **montuno drive**, sharper **horn writing**, and a streetwise intensity that ' +
        'still leaves room for jazz harmony.\n\n' +
        'For a musician spotlight, he’s great because the tracks often make the *arrangement* feel like the star—' +
        'piano motifs, horn hits, breaks, and builds designed for dancers.',
      musicalImpact: [
        'Shapes the NYC sound with aggressive horn writing, strong breaks, and dance-floor “push.”',
        'Blends Afro-Cuban structures with jazz harmony/voicings in a distinctly New York way.',
        'Creates a template for bandleading where arrangement detail is central to the vibe.',
      ],
      instrumentation: [
        'Piano (signature motifs + driving montuno)',
        'Trombones (weighty, gritty horn front line)',
        'Bass + percussion (tumbao + timbales-led energy)',
        'Vocals / coro (call-and-response sections)',
      ],
      keyMusicians: [
        {
          name: 'Eddie Palmieri',
          role: 'bandleader / pianist / arranger',
          why: 'A defining architect of the NYC salsa sound—trombone-forward power with jazz-smart arranging.',
          hide: true,
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'This Is Eddie Palmieri (Spotify)',
              openUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO1GJL9f',
              embedUrl:
                'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1GJL9f',
              note: 'Fast way to hear the Palmieri “arrangement + drive” signature across eras.',
            },
          ],
        },
      ],
      relatedStyles: ['nyc salsa', 'descarga', 'latin jazz'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Eddie%20Palmieri%20mit%20Bassist%20Luques%20Curtis%20%28cropped%29.jpg?width=2400',
      bgCredit: {
        label: 'Eddie Palmieri (2013)',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Eddie_Palmieri_mit_Bassist_Luques_Curtis_(cropped).jpg',
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
        {
          name: 'Héctor Lavoe',
          role: 'singer',
          why: 'Defining Fania-era voice and phrasing.',
        },
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
        {
          name: 'Ray Barretto',
          role: 'conga',
          why: 'A rhythmic anchor of the NYC scene.',
        },
      ],
      relatedStyles: [
        'salsa (NYC)',
        'descarga',
        'guaguancó influence (feel/phrasing)',
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Willie%20Col%C3%B3n%20and%20H%C3%A9ctor%20Lavoe%20(1969%20Fania%20Records%20publicity%20photo).jpg?width=2400',
      bgCredit: {
        label: 'Fania era (Colón & Lavoe promo photo)',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Willie_Col%C3%B3n_and_H%C3%A9ctor_Lavoe_(1969_Fania_Records_publicity_photo).jpg',
      },
      accent: 'nyc',
    },

    //
    // ---- Musician spotlight: Johnny Pacheco
    //
    {
      id: 'nyc-m-johnny-pacheco',
      dateLabel: '1960s–1970s (spotlight)',
      title:
        'Musician spotlight: Johnny Pacheco — charanga roots → Fania-era architect',
      body:
        'Johnny Pacheco is a key “bridge” figure: rooted in charanga/danzón traditions but central to the NYC salsa industry turn—' +
        'as a bandleader, composer/arranger, and co-founder of Fania.\n\n' +
        'In a spotlight panel, you can frame him as the person who helps formalize a scene into a label-driven movement: ' +
        'tight bands, recognizable hits, and a recognizable “Fania” ecosystem of stars.',
      musicalImpact: [
        'Helps crystallize NYC salsa as a movement via bandleading, composing, and label infrastructure.',
        'Brings charanga-era sensibilities into the emerging salsa-era repertoire.',
        'Connects “street dance floor” energy with a more formalized recording/marketing machine.',
      ],
      instrumentation: [
        'Flute + violins (charanga lineage)',
        'Piano + bass (tumbao foundation)',
        'Percussion (congas, bongó, timbales)',
        'Vocals / coro (classic call-and-response)',
      ],
      keyMusicians: [
        {
          name: 'Johnny Pacheco',
          role: 'bandleader / composer / arranger',
          why: 'Charanga-rooted bandleader who becomes a core architect of the Fania-era NYC salsa ecosystem.',
          hide: true,
          spotifyEmbeds: [
            {
              kind: 'artist',
              title: 'Johnny Pacheco (Spotify)',
              openUrl: 'https://open.spotify.com/artist/09947uhj2ZwU9mFXK5v50o',
              embedUrl:
                'https://open.spotify.com/embed/artist/09947uhj2ZwU9mFXK5v50o',
            },
            {
              kind: 'album',
              title: 'Cañonazo (Remastered) (Spotify)',
              openUrl: 'https://open.spotify.com/album/33oZsKnX4opzbP747zvrBf',
              embedUrl:
                'https://open.spotify.com/embed/album/33oZsKnX4opzbP747zvrBf',
              note: 'Compact “bandleader + repertoire” snapshot for the Pacheco sound.',
            },
          ],
        },
      ],
      relatedStyles: ['charanga', 'nyc salsa', 'fania'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Compositor%20Jhonny%20Pacheco.jpg?width=2400',
      bgCredit: {
        label: 'Johnny Pacheco',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Compositor_Jhonny_Pacheco.jpg',
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
        {
          name: 'Larry Harlow',
          role: 'piano',
          why: 'A defining Fania-era pianist/arranger.',
        },
        {
          name: 'Roberto Roena',
          role: 'percussion',
          why: 'Percussion leadership and performance intensity.',
        },
        {
          name: 'Bobby Valentín',
          role: 'bass',
          why: 'Bass engine; a major scene figure.',
        },
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
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Salsa_performers_in_New_York.jpg',
      },
      accent: 'nyc',
    },

    // ---- Musician spotlight: Ray Barretto
    {
      id: 'nyc-m-ray-barretto',
      dateLabel: 'late 1960s–1970s (spotlight)',
      title:
        'Musician spotlight: Ray Barretto — conga-led bridge from Latin jazz to salsa',
      body:
        'Ray Barretto is a crucial connector in the NYC story: a conguero rooted in Latin jazz/descarga who becomes central to ' +
        'the salsa era’s band sound.\n\n' +
        'Spotlighting Barretto lets you teach a subtle but important NYC idea: “salsa” isn’t a brand-new rhythm—' +
        'it’s a re-centering of Afro-Cuban language inside new arrangements, new marketing, and new dance-floor contexts.',
      musicalImpact: [
        'Bridges Latin jazz/descarga vocabulary into the salsa-era band format.',
        'Keeps Afro-Cuban percussion language front-and-center as arrangements modernize.',
        'Influences band feel: tumbao, breaks, and percussion texture become core to the NYC sound.',
      ],
      instrumentation: [
        'Congas (Barretto’s signature voice)',
        'Piano + bass (tumbao engine)',
        'Horn section (riff-driven dance-floor hits)',
        'Timbales + bongó (energy + articulation)',
      ],
      keyMusicians: [
        {
          name: 'Ray Barretto',
          role: 'conguero / bandleader',
          why: 'A key NYC percussion voice bridging descarga/Latin jazz and the salsa-era band sound.',
          hide: true,
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'This Is Ray Barretto (Spotify)',
              openUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO1ipdbO',
              embedUrl:
                'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1ipdbO',
              note: 'A quick “best of” tour through his salsa + Latin jazz catalog.',
            },
            {
              kind: 'album',
              title: 'Acid (1968) (Spotify)',
              openUrl: 'https://open.spotify.com/album/0RpE6Nz3Cyb7gx2CpC5dJn',
              embedUrl:
                'https://open.spotify.com/embed/album/0RpE6Nz3Cyb7gx2CpC5dJn',
              note: 'Classic late-60s NYC record: Latin jazz edge with a dance-floor pulse.',
            },
          ],
        },
      ],
      relatedStyles: ['latin jazz', 'descarga', 'nyc salsa'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ray%20Barretto.jpg?width=2400',
      bgCredit: {
        label: 'Ray Barretto',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ray_Barretto.jpg',
      },
      accent: 'nyc',
    },

    // ---- Musician spotlight: Héctor Lavoe
    {
      id: 'nyc-m-hector-lavoe',
      dateLabel: 'early 1970s (spotlight)',
      title:
        'Musician spotlight: Héctor Lavoe — the voice of Fania-era NYC salsa',
      body:
        'Héctor Lavoe becomes one of the most iconic vocalists of the Fania era: sharp phrasing, improvisational soneo, and a ' +
        'persona that turns street storytelling into sing-along anthems.\n\n' +
        'In the NYC timeline, he’s a clean spotlight choice because you can point directly to how vocals + coro energy ' +
        'shape what dancers remember: the hook, the call-and-response, the “moment” before the break.',
      musicalImpact: [
        'Defines the Fania-era vocalist archetype: soneo-driven phrasing with unforgettable hooks.',
        'Turns everyday NYC/Puerto Rican cultural references into dance-floor narratives.',
        'Anchors some of the most influential “trombone-led” arrangements of the 1970s.',
      ],
      instrumentation: [
        'Lead vocals + coro (call-and-response)',
        'Trombones (signature NYC bite in many Lavoe-era recordings)',
        'Piano + bass (tumbao engine)',
        'Percussion (congas, bongó, timbales)',
      ],
      keyMusicians: [
        {
          name: 'Héctor Lavoe',
          role: 'vocalist',
          why: 'One of the definitive voices of the Fania era—soneo, swagger, and hooks that dancers live for.',
          hide: true,
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'This Is Héctor Lavoe (Spotify)',
              openUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO4nm0YU',
              embedUrl:
                'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO4nm0YU',
              note: 'Essential “Lavoe in one sitting” overview.',
            },
            {
              kind: 'album',
              title: 'Asalto Navideño: Vol. 1 & 2 (Spotify)',
              openUrl: 'https://open.spotify.com/album/2m2jXwkrxiFkmfjYArZRQw',
              embedUrl:
                'https://open.spotify.com/embed/album/2m2jXwkrxiFkmfjYArZRQw',
              note: 'Classic Lavoe + Willie Colón collaboration; a great “arrangement + coro” study.',
            },
          ],
        },
      ],
      relatedStyles: ['fania', 'nyc salsa', 'salsa dura'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/H%C3%A9ctor%20Lavoe%20%281969%20Fania%20Records%20publicity%20photo%29.jpg?width=2400',
      bgCredit: {
        label: 'Héctor Lavoe (1969 Fania Records publicity photo)',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:H%C3%A9ctor_Lavoe_(1969_Fania_Records_publicity_photo).jpg',
      },
      accent: 'nyc',
    },

    // ---- Musician spotlight: Celia Cruz
    {
      id: 'nyc-m-celia-cruz',
      dateLabel: '1970s (spotlight)',
      title:
        'Musician spotlight: Celia Cruz — global star power in the NYC salsa era',
      body:
        'Celia Cruz’s NYC-era recordings connect Cuban performance lineage to the Fania-era salsa boom—' +
        'a huge voice, charisma, and a stage presence that makes “big-band salsa” feel like a world event.\n\n' +
        'For your timeline, her spotlight panel can emphasize how star vocalists help a genre travel: ' +
        'the sound is danceable, but it’s also theatrical and instantly recognizable.',
      musicalImpact: [
        'Brings Cuban vocal tradition + showmanship into the NYC salsa movement.',
        'Expands salsa’s reach: the voice becomes a global brand, not just a local club sound.',
        'Proves that salsa can be both dance-floor music and “headline” concert music.',
      ],
      instrumentation: [
        'Lead vocals (power + phrasing) + coro responses',
        'Horn sections (big, celebratory hits)',
        'Piano + bass (tumbao foundation)',
        'Percussion (congas, bongó, timbales)',
      ],
      keyMusicians: [
        {
          name: 'Celia Cruz',
          role: 'vocalist',
          why: 'A defining global voice who bridges Cuban lineage into the NYC salsa-era spotlight.',
          hide: true,
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'This Is Celia Cruz (Spotify)',
              openUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO1rwPYs',
              embedUrl:
                'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1rwPYs',
            },
            {
              kind: 'artist',
              title: 'Celia Cruz (Spotify)',
              openUrl: 'https://open.spotify.com/artist/2weA6hhVqTIN2gSn9PUB9U',
              embedUrl:
                'https://open.spotify.com/embed/artist/2weA6hhVqTIN2gSn9PUB9U',
            },
          ],
        },
      ],
      relatedStyles: ['fania', 'nyc salsa', 'son', 'guaguancó'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Celia%20Cruz%201.jpg?width=2400',
      bgCredit: {
        label: 'Celia Cruz (Paris, 1980)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Celia_Cruz_1.jpg',
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
      relatedStyles: [
        'salsa dura',
        'salsa with social commentary',
        'son montuno framework',
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Willie%20Col%C3%B3n%20and%20H%C3%A9ctor%20Lavoe%20(1969%20Fania%20Records%20publicity%20photo).jpg?width=2400',
      bgCredit: {
        label: 'Fania-era NYC salsa (visual placeholder)',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Willie_Col%C3%B3n_and_H%C3%A9ctor_Lavoe_(1969_Fania_Records_publicity_photo).jpg',
      },
      accent: 'nyc',
    },

    //
    // ---- Musician spotlight: Rubén Blades
    //
    {
      id: 'nyc-m-ruben-blades',
      dateLabel: 'late 1970s (spotlight)',
      title:
        'Musician spotlight: Rubén Blades — story-forward salsa and the “Siembra” era',
      body:
        'Rubén Blades is a watershed in the NYC/Fania timeline because his writing makes salsa feel like a short story: ' +
        'characters, plot, social commentary, and punchlines—without sacrificing groove.\n\n' +
        'In a musician spotlight, you can call out the “lyrics-as-cinema” approach: dancers still get breaks and hooks, ' +
        'but listeners also get narrative depth that expands what salsa *can be*.',
      musicalImpact: [
        'Elevates salsa lyric writing into narrative storytelling and social commentary.',
        'Broadens audience: salsa becomes both dance music and “listening music.”',
        'Anchors one of the most iconic LPs of the era: *Siembra* (with Willie Colón).',
      ],
      instrumentation: [
        'Lead vocals + coro (story-driven delivery + chantable choruses)',
        'Horn hits + breaks (arrangement drama)',
        'Piano + bass (tumbao foundation)',
        'Percussion (congas, bongó, timbales)',
      ],
      keyMusicians: [
        {
          name: 'Rubén Blades',
          role: 'vocalist / songwriter',
          why: 'Defines the story-forward, socially aware side of late-70s NYC salsa.',
          hide: true,
          spotifyEmbeds: [
            {
              kind: 'album',
              title: 'Siembra (1978) (Spotify)',
              openUrl: 'https://open.spotify.com/album/7wOJ9RTQr05ytqROWtTPzy',
              embedUrl:
                'https://open.spotify.com/embed/album/7wOJ9RTQr05ytqROWtTPzy',
              note: 'Core late-70s reference point (Willie Colón + Rubén Blades).',
            },
            {
              kind: 'playlist',
              title: 'This Is Rubén Blades (Spotify)',
              openUrl:
                'https://open.spotify.com/playlist/37i9dQZF1DZ06evO3iDsmW',
              embedUrl:
                'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3iDsmW',
            },
            {
              kind: 'artist',
              title: 'Rubén Blades (Spotify)',
              openUrl: 'https://open.spotify.com/artist/5BwMgvRwlq61SmknvsVIQj',
              embedUrl:
                'https://open.spotify.com/embed/artist/5BwMgvRwlq61SmknvsVIQj',
            },
          ],
        },
      ],
      relatedStyles: ['fania', 'nyc salsa', 'salsa dura'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ruben%20Blades%20by%20Gage%20Skidmore.jpg?width=2400',
      bgCredit: {
        label: 'Rubén Blades',
        sourceName: 'Wikimedia Commons',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Ruben_Blades_by_Gage_Skidmore.jpg',
      },
      accent: 'nyc',
    },
  ],
};

export { nyChapter };
