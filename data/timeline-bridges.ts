import type { TimelineChapter } from './../types/repo';

export const bridgesChapter: TimelineChapter = {
  id: 'bridges',
  label: 'Bridge era: mambo, media, and crossover routes',
  description:
    'Between Cuba’s dance-band innovations and the New York salsa explosion, musicians, ballrooms, records, television, and pop culture carried Afro-Cuban ideas into jazz, mambo, rock, and mass media.',
  steps: [
    {
      id: 'bridges-bauza-webb',
      dateLabel: 'Nov 20, 1933',
      title: 'Mario Bauzá records inside Harlem swing',
      body:
        'Mario Bauzá appears in Chick Webb orchestra recording documentation, placing a Cuban-born musician inside Harlem’s leading swing-band ecosystem before the Machito breakthrough.\n\n' +
        'This is not “salsa” yet. It is the contact zone: Cuban musicians learning big-band swing from the inside while carrying Afro-Cuban rhythmic knowledge into New York’s jazz world.',
      musicalImpact: [
        'Places Bauzá in Harlem swing before his Afro-Cuban jazz work with Machito.',
        'Shows the bridge forming through personnel networks, not only through later named genres.',
        'Sets up the big-band arranging knowledge salsa later inherits through mambo and Latin jazz.',
      ],
      instrumentation: [
        'Swing-era trumpet section',
        'Reeds + rhythm section',
        'Dance-band arranging language',
      ],
      keyMusicians: [
        {
          name: 'Mario Bauzá',
          role: 'trumpeter / arranger',
          why: 'A Cuban-born bridge figure moving through Harlem swing, Afro-Cuban jazz, and mambo-era arranging.',
        },
        {
          name: 'Chick Webb',
          role: 'drummer / bandleader',
          why: 'Harlem swing leader whose orchestra gave Bauzá a major New York big-band context.',
        },
      ],
      relatedStyles: ['swing', 'Harlem jazz', 'Afro-Cuban jazz precursor'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
      bgCredit: {
        label: 'Mario Bauzá',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mario_Bauz%C3%A1.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'cuba',
    },

    {
      id: 'bridges-bauza-gillespie-calloway',
      dateLabel: 'Jul 17, 1939',
      title: 'Bauzá and Gillespie share a Cab Calloway session',
      body:
        'Mario Bauzá and Dizzy Gillespie are documented together in Cab Calloway’s orchestra at a New York recording session.\n\n' +
        'The session matters less as an Afro-Cuban performance than as a human bridge: Bauzá, Gillespie, Harlem bands, and later bebop circles all overlap before “Cubop” has a name.',
      musicalImpact: [
        'Documents an early personnel link between Bauzá and Gillespie.',
        'Connects Cuban musical knowledge to the jazz musicians who later open bebop to Afro-Cuban percussion.',
        'Shows salsa’s ancestry moving through working band networks.',
      ],
      instrumentation: [
        'Big-band brass section',
        'Reeds + rhythm section',
        'Swing arrangement vocabulary',
      ],
      keyMusicians: [
        {
          name: 'Mario Bauzá',
          role: 'trumpeter',
          why: 'The Cuban bridge figure who later helps connect Gillespie with Chano Pozo.',
        },
        {
          name: 'Dizzy Gillespie',
          role: 'trumpeter',
          why: 'Bebop architect who becomes central to Afro-Cuban jazz through Chano Pozo and “Manteca.”',
        },
        {
          name: 'Cab Calloway',
          role: 'bandleader',
          why: 'His orchestra becomes one of the New York big-band contexts where these networks cross.',
        },
      ],
      relatedStyles: ['swing', 'bebop precursor', 'Afro-Cuban jazz precursor'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
      bgCredit: {
        label: 'Mario Bauzá',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mario_Bauz%C3%A1.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'cuba',
    },

    {
      id: 'bridges-machito-afro-cubans',
      dateLabel: '1940',
      title: 'Machito forms Machito and His Afro-Cubans',
      body:
        'Machito forms the Afro-Cubans in New York, with Mario Bauzá soon central as musical director.\n\n' +
        'The band becomes a durable model for fusing Afro-Cuban percussion, clave-aware arranging, jazz harmony, and big-band stage power: a core bridge between Cuban dance music, Latin jazz, mambo, and the later salsa orchestra.',
      musicalImpact: [
        'Builds one of the most important Afro-Cuban jazz and mambo-era band formats.',
        'Centers clave while using jazz big-band arranging tools.',
        'Creates a professional template for salsa’s later horn-and-percussion architecture.',
      ],
      instrumentation: [
        'Full horn section',
        'Piano + bass tumbao',
        'Congas + bongó + timbales',
        'Lead vocals + coro',
      ],
      keyMusicians: [
        {
          name: 'Machito',
          role: 'bandleader / vocalist',
          why: 'Frontman for one of the definitive Afro-Cuban big-band lineages in New York.',
        },
        {
          name: 'Mario Bauzá',
          role: 'musical director / arranger',
          why: 'Shapes the band’s clave-aware big-band language.',
        },
      ],
      relatedStyles: ['Afro-Cuban jazz', 'mambo', 'Latin jazz'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
      bgCredit: {
        label: 'Mario Bauzá',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mario_Bauz%C3%A1.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-tanga',
      dateLabel: '1943',
      title: '“Tanga” points Afro-Cuban jazz forward',
      body:
        'Mario Bauzá’s “Tanga” becomes the landmark work around Machito and His Afro-Cubans: clave, jazz arranging, and improvisation working as one system.\n\n' +
        'The exact performance and recording chronology is messy, so the public timeline uses the safer year-level anchor. The important story is clear: “Tanga” shows how Afro-Cuban rhythm can live inside a jazz big-band mind.',
      musicalImpact: [
        'Often treated as a foundational Afro-Cuban jazz composition.',
        'Demonstrates clave-aware arranging at big-band scale.',
        'Creates a musical bridge later salsa orchestras inherit: horns, solos, montuno drive, and percussion logic in one architecture.',
      ],
      instrumentation: [
        'Horn sections arranged around clave',
        'Piano + bass foundation',
        'Afro-Cuban percussion battery',
        'Jazz soloing inside a dance-band frame',
      ],
      keyMusicians: [
        {
          name: 'Mario Bauzá',
          role: 'composer / arranger',
          why: 'Credited with creating the “Tanga” framework and shaping the band’s musical direction.',
        },
        {
          name: 'Machito and His Afro-Cubans',
          role: 'orchestra',
          why: 'The ensemble that turns the Afro-Cuban jazz idea into a durable band sound.',
        },
      ],
      relatedStyles: ['Afro-Cuban jazz', 'mambo', 'descarga precursor'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
      bgCredit: {
        label: 'Mario Bauzá',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mario_Bauz%C3%A1.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-gillespie-pozo-carnegie',
      dateLabel: 'Sep 29, 1947',
      title: 'Dizzy Gillespie and Chano Pozo bring Cubop to Carnegie Hall',
      body:
        'Dizzy Gillespie’s orchestra performs at Carnegie Hall with Chano Pozo, premiering “Cubano-Be” and “Cubano-Bop.”\n\n' +
        'For salsa history, this marks a public concert-stage bridge: Afro-Cuban percussion and bebop ambition meeting in a prestige jazz setting.',
      musicalImpact: [
        'Brings Afro-Cuban percussion into bebop’s concert narrative.',
        'Elevates conga and folkloric knowledge as serious jazz forces.',
        'Strengthens the Latin jazz path that later feeds salsa arranging and solo culture.',
      ],
      instrumentation: [
        'Big-band jazz orchestra',
        'Conga drum',
        'Bebop trumpet language',
        'Afro-Cuban rhythmic cells',
      ],
      keyMusicians: [
        {
          name: 'Dizzy Gillespie',
          role: 'trumpeter / bandleader',
          why: 'Bebop architect who publicly embraces Afro-Cuban rhythmic language.',
        },
        {
          name: 'Chano Pozo',
          role: 'conguero / composer',
          why: 'Brings deep Afro-Cuban percussion knowledge into the bebop orchestra.',
        },
      ],
      relatedStyles: ['Cubop', 'bebop', 'Afro-Cuban jazz'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
      bgCredit: {
        label: 'Mario Bauzá',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mario_Bauz%C3%A1.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-manteca',
      dateLabel: 'Dec 30, 1947',
      title: '“Manteca” becomes a Cubop landmark',
      body:
        'Dizzy Gillespie’s big band records “Manteca,” co-written with Chano Pozo and Gil Fuller.\n\n' +
        'The record becomes one of the canonical Afro-Cuban jazz statements: a model for how jazz horns, riffs, and improvisation can lock into Afro-Cuban rhythmic force.',
      musicalImpact: [
        'Establishes a canonical Afro-Cuban jazz recording.',
        'Places conga-driven Afro-Cuban phrasing inside a bebop big-band frame.',
        'Feeds the arranging and soloing vocabulary salsa musicians later draw from.',
      ],
      instrumentation: [
        'Big-band brass and reeds',
        'Conga-centered rhythmic hook',
        'Piano + bass support',
        'Bebop solos and arranged hits',
      ],
      keyMusicians: [
        {
          name: 'Dizzy Gillespie',
          role: 'trumpeter / bandleader',
          why: 'Makes Afro-Cuban jazz a central part of the bebop-era story.',
        },
        {
          name: 'Chano Pozo',
          role: 'conguero / co-writer',
          why: 'Supplies the Afro-Cuban rhythmic and melodic force that makes “Manteca” iconic.',
        },
      ],
      relatedStyles: ['Cubop', 'Afro-Cuban jazz', 'Latin jazz'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
      bgCredit: {
        label: 'Mario Bauzá',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mario_Bauz%C3%A1.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-palladium',
      dateLabel: '1947',
      title: 'The Palladium becomes mambo’s New York home',
      body:
        'The Palladium Ballroom begins Latin/mambo programming in midtown Manhattan and grows into the famous “home of the mambo.”\n\n' +
        'By the late 1940s, the room centers the “Big Three” orchestras: Machito, Tito Puente, and Tito Rodríguez. Just as important, the dance floor becomes a highly visible, multiethnic social space where mambo is danced, watched, copied, and mythologized.',
      musicalImpact: [
        'Turns mambo from bandstand music into a social dance institution.',
        'Places Machito, Puente, and Tito Rodríguez in direct competitive conversation.',
        'Creates the public dance-floor culture later salsa scenes inherit.',
      ],
      instrumentation: [
        'Mambo horn sections',
        'Timbales-led dance-band percussion',
        'Piano montuno + bass tumbao',
        'Lead vocals and coro',
      ],
      keyMusicians: [
        {
          name: 'Machito',
          role: 'bandleader',
          why: 'One of the Big Three Palladium-era orchestras.',
        },
        {
          name: 'Tito Puente',
          role: 'timbalero / bandleader',
          why: 'A defining Palladium-era bandleader and later salsa reference point.',
        },
        {
          name: 'Tito Rodríguez',
          role: 'singer / bandleader',
          why: 'One of the Big Three whose style helped define the room.',
        },
      ],
      relatedStyles: ['mambo', 'Latin jazz', 'social dance'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/TitoPuente.jpg?width=2400',
      bgCredit: {
        label: 'Tito Puente',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TitoPuente.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-i-love-lucy',
      dateLabel: 'Oct 15, 1951',
      title: 'I Love Lucy puts a Cuban bandleader in prime time',
      body:
        '`I Love Lucy` premieres with Desi Arnaz as Ricky Ricardo, a Cuban singer and nightclub bandleader.\n\n' +
        'This is a media-visibility bridge, not a core music-evolution card: Latin nightclub performance, Cuban bandleader identity, and numbers like the later “Cuban Pete / Sally Sweet” routine enter the American living room through early television.',
      musicalImpact: [
        'Moves Latin nightclub imagery into mass U.S. television.',
        'Makes the Cuban bandleader persona familiar to non-club audiences.',
        'Shows how media visibility can run alongside dance-floor and recording histories.',
      ],
      instrumentation: [
        'Television nightclub orchestra framing',
        'Cuban show-business repertoire',
        'Dance-band vocal performance',
      ],
      keyMusicians: [
        {
          name: 'Desi Arnaz',
          role: 'performer / bandleader',
          why: 'Turns Cuban bandleader showmanship into a prime-time television presence.',
        },
      ],
      relatedStyles: ['Cuban show music', 'mambo-era media', 'television visibility'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/TitoPuente.jpg?width=2400',
      bgCredit: {
        label: 'Tito Puente (mambo-era visual placeholder)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TitoPuente.jpg',
      },
      accent: 'cuba',
    },

    {
      id: 'bridges-arthur-murray-mambo',
      dateLabel: 'Sep 14, 1954',
      title: 'Arthur Murray teaches mambo on national TV',
      body:
        'Arthur Murray’s television dance brand gives mambo a coast-to-coast teaching segment.\n\n' +
        'That matters because mambo is no longer only something to encounter in a ballroom or nightclub. It becomes something mainstream audiences can imitate at home, simplified into steps and social-dance instruction.',
      musicalImpact: [
        'Turns mambo into teachable mass-media dance content.',
        'Shows how dance studios and television helped normalize Latin dance vocabulary.',
        'Bridges elite nightclub culture and ordinary living-room participation.',
      ],
      instrumentation: [
        'Television dance orchestra format',
        'Clear mambo pulse for instruction',
        'Simplified social-dance phrasing',
      ],
      relatedStyles: ['mambo', 'ballroom instruction', 'television dance'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/TitoPuente.jpg?width=2400',
      bgCredit: {
        label: 'Tito Puente (mambo-era visual placeholder)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TitoPuente.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-mambo-usa',
      dateLabel: 'Oct 22, 1954',
      title: 'Mambo USA packages mambo for the national stage',
      body:
        '`Mambo USA` debuts at Carnegie Hall, packaging mambo bands and dancers for prestige concert audiences and a national tour.\n\n' +
        'The story here is scale: music rooted in clubs and ballrooms becomes a touring cultural package, giving Latin musicians and dancers a broader mainstream frame.',
      musicalImpact: [
        'Moves mambo from local dance rooms into national concert promotion.',
        'Gives Latin musicians and dancers mainstream stage visibility.',
        'Foreshadows later salsa spectacles by treating the music as a complete touring culture.',
      ],
      instrumentation: [
        'Mambo orchestra',
        'Featured dancers',
        'Percussion-forward stage arrangements',
        'Horn-section showmanship',
      ],
      keyMusicians: [
        {
          name: 'Machito',
          role: 'bandleader',
          why: 'Anchors the concert as a major Afro-Cuban orchestra presence.',
        },
      ],
      relatedStyles: ['mambo', 'concert touring', 'Latin dance revue'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mario_Bauz%C3%A1.jpg',
      bgCredit: {
        label: 'Mario Bauzá',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mario_Bauz%C3%A1.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-cherry-pink',
      dateLabel: '1955',
      title: '“Cherry Pink” carries mambo into pop crossover',
      body:
        'Pérez Prado’s “Cherry Pink and Apple Blossom White” carries mambo-associated brass drama into pop charts and Hollywood soundtrack circulation.\n\n' +
        'It is not a salsa card in the narrow sense. It is a visibility card: the mambo sound becomes recognizable far beyond the dancers who know the Palladium vocabulary.',
      musicalImpact: [
        'Makes mambo-associated orchestral hooks part of mass pop listening.',
        'Links Latin dance sound to film and chart circulation.',
        'Shows how a simplified public image of mambo spreads beyond the music’s deeper dance-band roots.',
      ],
      instrumentation: [
        'Trumpet-led melody',
        'Big-band brass riffs',
        'Dance-band rhythm section',
        'Mambo showmanship',
      ],
      keyMusicians: [
        {
          name: 'Pérez Prado',
          role: 'bandleader / arranger',
          why: 'Popularizes the big, riff-forward mambo sound internationally.',
        },
      ],
      relatedStyles: ['mambo', 'pop crossover', 'film music'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P%C3%A9rez_Prado_in_1954.jpg',
      bgCredit: {
        label: 'Pérez Prado (1954)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Perez_Prado_1954.jpg',
      },
      accent: 'cuba',
      rhythmicProfileId: 'nyc-mambo',
    },

    {
      id: 'bridges-louie-louie-berry',
      dateLabel: 'Apr 1957',
      title: '“Louie Louie” begins as a Latin-to-R&B bridge',
      body:
        'Richard Berry and the Pharaohs release “Louie Louie,” whose musical idea is widely traced to René Touzet’s “El Loco Cha Cha.”\n\n' +
        'This is the quieter side of salsa history: Latin rhythmic ideas slipping into R&B and rock language, sometimes becoming so familiar that the source vocabulary disappears from memory.',
      musicalImpact: [
        'Shows cha-cha and Latin dance ideas entering R&B songwriting.',
        'Creates a bridge into one of rock’s most reused garage-band templates.',
        'Documents Afro-Latin influence beyond explicitly Latin genres.',
      ],
      instrumentation: [
        'R&B vocal group format',
        'Latin-derived rhythmic hook',
        'Backbeat-oriented band groove',
      ],
      keyMusicians: [
        {
          name: 'Richard Berry',
          role: 'singer / songwriter',
          why: 'Creates the first “Louie Louie” recording before the song becomes a rock standard.',
        },
        {
          name: 'René Touzet',
          role: 'composer / pianist',
          why: 'His “El Loco Cha Cha” is widely cited as the rhythmic source pathway.',
        },
      ],
      relatedStyles: ['cha-cha-chá', 'R&B', 'rock precursor'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P%C3%A9rez_Prado_in_1954.jpg',
      bgCredit: {
        label: 'Pérez Prado (mambo / pop-crossover visual placeholder)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Perez_Prado_1954.jpg',
      },
      accent: 'cuba',
    },

    {
      id: 'bridges-diana-cash-box',
      dateLabel: 'Jun 22, 1957',
      title: 'Cash Box hears Latin dance language in teen pop',
      body:
        '`Cash Box` frames Paul Anka’s “Diana” in rock, cha-cha, and Latin dance language.\n\n' +
        'This is a reception anchor rather than a musician-origin card: it shows that trade press was already hearing Latin rhythmic vocabulary inside the teen-pop transformation of the late 1950s.',
      musicalImpact: [
        'Shows Latin dance vocabulary entering mainstream pop criticism.',
        'Supports the broader “rock-a-cha-cha” bridge from Afro-Latin rhythm into early rock and teen pop.',
        'Keeps the timeline honest that influence can be rhythmic and receptive, not only genre-labeled.',
      ],
      instrumentation: [
        'Teen-pop vocal lead',
        'Rock-and-roll rhythm section',
        'Latin dance reception language',
      ],
      relatedStyles: ['rock-a-cha-cha', 'teen pop', 'Latin dance reception'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P%C3%A9rez_Prado_in_1954.jpg',
      bgCredit: {
        label: 'Pérez Prado (mambo / pop-crossover visual placeholder)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Perez_Prado_1954.jpg',
      },
      accent: 'cuba',
    },

    {
      id: 'bridges-kingsmen-louie-louie',
      dateLabel: 'Apr 6, 1963',
      title: 'The Kingsmen turn “Louie Louie” into garage rock',
      body:
        'The Kingsmen record “Louie Louie” in Portland, transforming a Latin/R&B-derived song into a garage-rock template.\n\n' +
        'The salsa-history value is the trace: a cha-cha-rooted idea travels so far into rock that the Latin source becomes nearly invisible.',
      musicalImpact: [
        'Turns a Latin-to-R&B song pathway into a rock standard.',
        'Shows how Afro-Latin rhythm can become hidden infrastructure inside U.S. pop.',
        'Completes the public arc started by Richard Berry’s 1957 version.',
      ],
      instrumentation: [
        'Garage-rock guitar and drums',
        'Simple repeating riff',
        'Latin-derived rhythmic DNA beneath a rock surface',
      ],
      keyMusicians: [
        {
          name: 'The Kingsmen',
          role: 'band',
          why: 'Their version makes “Louie Louie” a national rock reference point.',
        },
      ],
      relatedStyles: ['garage rock', 'R&B', 'Latin rhythm influence'],
      bg: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P%C3%A9rez_Prado_in_1954.jpg',
      bgCredit: {
        label: 'Pérez Prado (mambo / pop-crossover visual placeholder)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Perez_Prado_1954.jpg',
      },
      accent: 'cuba',
    },

    {
      id: 'bridges-santana-woodstock',
      dateLabel: 'Aug 16, 1969',
      title: 'Santana brings Afro-Latin rock to Woodstock',
      body:
        'Santana performs at Woodstock, turning Afro-Latin percussion, blues guitar, organ-driven rock, and San Francisco festival energy into a mass-audience breakthrough.\n\n' +
        'This is not a salsa-dance-floor card. It is a parallel bridge showing Afro-Latin rhythm entering rock festival mythology at the exact moment NYC salsa is about to crystallize.',
      musicalImpact: [
        'Makes congas and Afro-Latin percussion central to a rock-festival breakthrough.',
        'Connects Latin rhythm, blues guitar, and psychedelic-era stage culture.',
        'Shows a parallel mass-media path for Afro-Latin rhythm outside the salsa circuit.',
      ],
      instrumentation: [
        'Congas and timbales in a rock band',
        'Electric guitar and organ',
        'Bass + drumset rock foundation',
        'Extended percussion-driven jams',
      ],
      keyMusicians: [
        {
          name: 'Santana',
          role: 'band',
          why: 'Brings Afro-Latin percussion into late-1960s rock visibility.',
        },
        {
          name: 'Carlos Santana',
          role: 'guitarist / bandleader',
          why: 'Connects blues-rock guitar to Latin rhythmic architecture.',
        },
      ],
      relatedStyles: ['Latin rock', 'Afro-Latin percussion', 'festival rock'],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Salsa%20performers%20in%20New%20York.jpg?width=2400',
      bgCredit: {
        label: 'Salsa performers in New York (Afro-Latin performance visual placeholder)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Salsa_performers_in_New_York.jpg',
      },
      accent: 'nyc',
    },
  ],
};
