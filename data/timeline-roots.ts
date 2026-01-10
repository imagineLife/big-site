import type { TimelineChapter } from 'types/repo';

export const rootsChapter: TimelineChapter = {
  id: 'roots',
  label: 'Roots & foundations',
  description:
    'Afro-Caribbean rhythm + Spanish songcraft lays the groundwork for later Afro-Cuban forms (clave logic, call-and-response, and dance-first groove).',
  steps: [
    {
      id: 'roots-1',
      dateLabel: '1700s–1800s',
      title: 'Afro-Caribbean + Spanish fusion',
      body:
        `Across the Caribbean, African polyrhythm + call-and-response blend with Spanish/European harmony and instruments. Over time, dance-centered music cultures share ideas across islands and ports.\n\n` +
        `This is the “DNA layer” that later Afro-Cuban forms inherit: interlocking percussion, cyclic timelines (like clave thinking), and a tight relationship between rhythm, movement, and chant-like vocals.\n\n` +
        `Cuba becomes a major “fusion lab,” but parallel traditions (like Puerto Rico’s bomba) show the broader Afro-Caribbean rhythmic world that feeds into salsa’s ancestry.`,
      musicalImpact: [
        'Polyrhythmic layering + call-and-response (community/chorus energy)',
        'Dance-first phrasing: repeating cycles that “lock in” movement',
        'Early timeline concepts that later map cleanly onto clave logic',
      ],
      instrumentation: [
        'Hand drums (Afro-Caribbean barrel/drum traditions)',
        'Claves + simple timekeepers (often improvised / community-driven)',
        'Voice as rhythmic instrument (chants, coro-style responses)',
      ],
      relatedStyles: ['bomba', 'rumba', 'yambú', 'guaguancó', 'guajira', 'son cubano'],
      keyMusicians: [
        {
          name: 'Traditional folkloric communities',
          role: 'Culture-bearers (dance + percussion traditions)',
          why: 'Foundational rhythmic vocabulary and call-and-response structures that later Afro-Cuban and salsa-adjacent genres inherit.',
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'Bomba & Plena Radio (Spotify)',
              embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1E4nIlYTT8wuKg',
              note: 'A good “roots layer” listen: Puerto Rican bomba/plena percussion-and-dance tradition with call-and-response energy that connects to later Afro-Caribbean dance vocab.',
            },
          ],
        },
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bomba%20Dancer%20and%20Drummers.jpg?width=2400',
      bgCredit: {
        label: 'Bomba Dance (Puerto Rico)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bomba_Dancer_and_Drummers.jpg',
        author: 'TechyLibrarian',
        license: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      accent: 'roots',
    },

    {
      id: 'roots-2',
      dateLabel: '1880s',
      title: 'Bolero crystallizes (trova songcraft)',
      body:
        `Cuban bolero becomes a major romantic song form—lyrical, intimate, and melody-forward. Later, bolero interlocks with son and other Afro-Cuban grooves (e.g., bolero-son), and salsa bands keep boleros in the repertoire as ballads and “slow burners.”\n\n` +
        `What bolero contributes is *songcraft*: memorable melodies, harmonies you can reharmonize, and dramatic storytelling that survives almost any rhythm-section treatment.`,
      musicalImpact: [
        'Romantic lyric tradition and narrative songwriting (“song-first” power)',
        'Forms that pair well with montuno-style repetition later (bolero-son)',
        'A slower emotional register that salsa keeps as contrast to hard dance grooves',
      ],
      instrumentation: [
        'Guitar-led trova / trio textures (voice + guitar family)',
        'Later adapted into conjuntos/orquestas (piano, bass, horns, percussion)',
      ],
      relatedStyles: ['bolero', 'trova', 'bolero-son'],
      keyMusicians: [
        {
          name: 'Pepe Sánchez',
          role: 'Trova composer / early bolero figure',
          why: 'Frequently credited with shaping early Cuban bolero songcraft (notably the bolero “Tristezas”).',
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'Bolero Cubano (Spotify)',
              embedUrl: 'https://open.spotify.com/embed/playlist/3qoRkWaFtGQeEy3PS3VuFd',
              note: 'A modern listening bridge for classic Cuban bolero feeling and repertoire (useful while you refine more “primary source” examples).',
            },
          ],
        },
      ],
      // If you later prefer a more “bolero-specific” image, you can swap this.
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/TrioMat72.jpg?width=2400',
      bgCredit: {
        label: 'Trío Matamoros (c. 1930) — trio tradition image',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TrioMat72.jpg',
        author:
          'Scanned by self, photographer unknown (source: Sublette, Cuba and its music, p368)',
        license: 'Public Domain Mark 1.0',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
      },
      accent: 'roots',
    },

    // --- Musician sibling step: Pepe Sánchez ---
    {
      id: 'roots-m1',
      dateLabel: 'c. 1856–1918',
      title: 'Pepe Sánchez (trova → bolero origin)',
      body:
        `Pepe Sánchez is closely associated with early Cuban trova and the emergence of bolero as a recognizable romantic song form.\n\n` +
        `Why he matters in a salsa lineage: salsa doesn’t only inherit rhythm—it inherits *songwriting*. The bolero tradition provides durable melodies and lyrical storytelling that later bands can reinterpret with son, mambo, or salsa arrangements.\n\n` +
        `If you think of a classic salsa set where a hard dance tune is followed by a slow, emotional ballad—this is part of where that “emotional gear shift” comes from.`,
      musicalImpact: [
        'Bolero-era songwriting: strong melody + lyric-forward storytelling',
        'Gives later dance music a “ballad lane” that remains culturally central',
        'Sets up repertoire that salsa bands keep re-arranging for decades',
      ],
      instrumentation: ['Voice', 'Guitar (trova tradition)', 'Small ensemble accompaniment'],
      relatedStyles: ['trova', 'bolero'],
      keyMusicians: [
        {
          name: 'Pepe Sánchez',
          role: 'Composer / trova figure',
          why: 'Early bolero songcraft influence; a key “songwriting root” for later Latin dance repertoires.',
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'Bolero Cubano (Spotify)',
              embedUrl: 'https://open.spotify.com/embed/playlist/3qoRkWaFtGQeEy3PS3VuFd',
              note: 'A practical “listener bridge” into bolero repertoire (you can later curate your own playlist focused on early trova/bolero standards).',
            },
          ],
        },
      ],
      // NOTE: If you find a better Pepe Sánchez-specific image later, swap bg+credit.
      // I’m keeping the PD trio image to stay fully “known-good” on licensing.
      bg: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/PepeS.jpg',
      bgCredit: {
        label: 'Trío Matamoros (c. 1930) — representative trova/trio imagery',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TrioMat72.jpg',
        author:
          'Scanned by self, photographer unknown (source: Sublette, Cuba and its music, p368)',
        license: 'Public Domain Mark 1.0',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
      },
      accent: 'roots',
      stepType: 'musician',
    },

    // --- Musician sibling step: Trío Matamoros ---
    {
      id: 'roots-m2',
      dateLabel: '1920s–1940s (and beyond as standards)',
      title: 'Trío Matamoros (bolero-son, son, guaracha)',
      body:
        `Trío Matamoros is one of the iconic Cuban trio groups whose repertoire sits right on the bridge between romantic song forms and dance grooves.\n\n` +
        `Their importance for salsa history isn’t just “famous songs.” It’s texture and structure: the trio format (voices + guitar family instruments) helps standardize how melody, harmony, and rhythmic drive can coexist in a compact band.\n\n` +
        `A lot of later salsa and Latin dance music treats these songs as standards—rearranging them with horns, piano montunos, and modern percussion while keeping the core melodic/harmonic identity.`,
      musicalImpact: [
        'Trio texture: tight vocal blend + guitar-family rhythmic drive',
        'Creates (and popularizes) “standard” repertoire later bands reinterpret',
        'Models the bridge between romantic bolero feeling and danceable son motion',
      ],
      instrumentation: [
        'Guitar-family instruments (incl. tres tradition)',
        'Voices (lead + harmony)',
        'Light percussion/timekeepers',
      ],
      relatedStyles: ['bolero-son', 'son', 'guaracha'],
      keyMusicians: [
        {
          name: 'Miguel Matamoros',
          role: 'Singer / guitarist / composer',
          why: 'Central figure in the trio’s repertoire and enduring standards.',
          spotifyEmbeds: [
            {
              kind: 'playlist',
              title: 'This Is Trio Matamoros (Spotify)',
              embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO2qB67g',
            },
            {
              kind: 'album',
              title: 'Aquellos Tiempos... (Spotify)',
              embedUrl: 'https://open.spotify.com/embed/album/3BHKao5ijqNQq4eCj8m6Ij',
              note: 'Useful as a quick “drop-in” album embed while you refine the exact canonical releases you want.',
            },
          ],
        },
        {
          name: 'Siro Rodríguez',
          role: 'Member (voice/instruments)',
          why: 'Core trio member; part of the classic trio sound and repertoire.',
        },
        {
          name: 'Rafael Cueto',
          role: 'Member (voice/instruments)',
          why: 'Core trio member; part of the classic trio sound and repertoire.',
        },
      ],
      bg: 'https://commons.wikimedia.org/wiki/Special:FilePath/TrioMat72.jpg?width=2400',
      bgCredit: {
        label: 'Trío Matamoros (c. 1930)',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:TrioMat72.jpg',
        author:
          'Scanned by self, photographer unknown (source: Sublette, Cuba and its music, p368)',
        license: 'Public Domain Mark 1.0',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
      },
      accent: 'roots',
      stepType: 'musician',
    },
  ],
};
