# Salsa History People Biographical Dossiers

Purpose: collect birthdates, death dates, birthplaces, short bios, and salsa-history significance for people already represented in the public salsa-history timeline.

Implementation gate: do not add biographical timeline cards, person pages, or structured person data until Jake reviews this packet.

Important review note: a birthdate is not automatically a good public timeline item. Most entries here are better as person/profile data, hover details, "musician spotlight" enrichment, or source ledger material unless Jake explicitly wants birthdate cards on the visible rail.

## How To Review

For each person, change `Review status: UNMARKED` to one of:

- `APPROVED`: good candidate for future person/profile data or public bio enrichment.
- `REJECT`: do not use.
- `MAYBE`: needs more research.
- `MERGED`: use only through an existing timeline card.
- `LEDGER ONLY`: preserve in research notes, not public UI.

## Proposed Person Data Shape

If this later becomes structured data, use one record per person and link back to existing timeline IDs instead of duplicating event copy.

```ts
type SalsaHistoryPerson = {
  id: string;
  name: string;
  birthDate: string | null;
  deathDate: string | null;
  birthplace: string | null;
  roles: string[];
  significance: string;
  relatedTimelineIds: string[];
  confidence: 'high' | 'medium' | 'low';
  uncertainty?: string;
  sources: string[];
};
```

## Coordinator Synthesis

Best use cases:

- Add a future people ledger or profile drawer rather than many birthdate timeline cards.
- Use bios to enrich existing "Musician spotlight" cards where the person already has a visible card.
- Use birthplace data to support the geography/country-events research without overloading the public timeline.
- Treat disputed dates as ledger-first until stronger sources are found.

Strong source/conflict notes:

- Eddie Palmieri died on `2025-08-06`; NEA now lists both birth and death dates.
- Willie Colon died on `2026-02-21`; this is a recent update and should be rechecked before public release.
- Machito's birth year/place is disputed; use approximate language.
- Perez Prado's birth year appears as `1916` in many sources and `1917` in some institutional timelines; flag before structured data.
- Tito Puente's death day appears as `2000-05-31` or `2000-06-01` depending on source/reporting; use year-only unless verified.
- Pete Rodriguez has inconsistent biographical data and should be marked medium confidence.
- Arsenio Rodriguez has a death-date conflict (`1970-12-30` vs `1970-12-31`) and a birth-year correction note in some sources.

## Specific People For Review

### Roots, Cuba, And Early Bridge Figures

#### Pepe Sanchez

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1856-03-19` to `1918-01-03`.
- Birthplace: Santiago de Cuba, Cuba.
- Roles: trovador, singer, guitarist, composer.
- Brief bio/significance: Pepe Sanchez is widely treated as a founding figure in Cuban trova and early bolero songcraft, grounding the lyric-song tradition that later flows into bolero-son and salsa repertory.
- Related timeline IDs: `roots-m1`, `roots-2`.
- Confidence: medium.
- Uncertainty: dates are widely circulated but should be verified against a stronger Cuban music reference before structured use.
- Sources: [EcuRed: Pepe Sanchez](https://www.ecured.cu/Pepe_S%C3%A1nchez), [AllMusic: Pepe Sanchez](https://www.allmusic.com/artist/pepe-sanchez-mn0001636064).

#### Miguel Matamoros

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1894-05-08` to `1971-04-15`.
- Birthplace: Santiago de Cuba, Cuba.
- Roles: singer, guitarist, composer, bandleader.
- Brief bio/significance: As leader of Trio Matamoros, Miguel Matamoros helped popularize bolero-son, son, and guaracha in ways that shaped the Cuban popular-music vocabulary salsa later drew from.
- Related timeline IDs: `roots-m2`.
- Confidence: medium.
- Uncertainty: use as Trio Matamoros context rather than a standalone public birthdate card unless a people feature is approved.
- Sources: [CIDMUC / Cuban music reference via Montuno Cubano: Trio Matamoros](https://montunocubano.com/Tumbao/biographies/matamoros,%20trio.htm), [AllMusic: Trio Matamoros](https://www.allmusic.com/artist/trio-matamoros-mn0000012333).

#### Ignacio Pineiro

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1888-05-21` to `1969-03-12`.
- Birthplace: Havana, Cuba.
- Roles: composer, bassist, bandleader.
- Brief bio/significance: Pineiro founded and led Septeto Nacional, helping codify and popularize early son as a key structural and rhythmic ancestor of salsa.
- Related timeline IDs: `cuba-1`, `cuba-m-pineiro`.
- Confidence: medium.
- Uncertainty: some secondary sources vary on death year; verify before using exact date in public UI.
- Sources: [Tumbao Cuban music archive: Ignacio Pineiro](https://montunocubano.com/Tumbao/biographies/pineiro%2C%20ignacio.htm), [AllMusic: Septeto Nacional de Ignacio Pineiro](https://www.allmusic.com/artist/septeto-nacional-de-ignacio-pi%C3%B1eiro-mn0000010827/biography).

#### Arsenio Rodriguez

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: likely `1911-08-30` or `1911-08-31` to `1970-12-30` or `1970-12-31`.
- Birthplace: Guira de Macurijes, Matanzas, Cuba.
- Roles: tresero, composer, bandleader.
- Brief bio/significance: Arsenio expanded the conjunto format and intensified son montuno, establishing core rhythmic, instrumental, and arranging practices that later salsa musicians adapted.
- Related timeline IDs: `cuba-1`, `cuba-m-arsenio`, `cuba-2`.
- Confidence: medium.
- Uncertainty: date conflicts remain for both birth and death; FIU notes he corrected his registered birth year in some accounts.
- Sources: [FIU Diaz-Ayala Collection: Arsenio Rodriguez biography](https://latinpop.fiu.edu/discography/Arsenio_Rodr%C3%ADguez_Biography_sp.cfm), [Encyclopedia.com: Arsenio Rodriguez](https://www.encyclopedia.com/humanities/encyclopedias-almanacs-transcripts-and-maps/rodriguez-arsenio-1911-1970).

#### Enrique Jorrin

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1926-12-25` to `1987-12-12`.
- Birthplace: Candelaria, Pinar del Rio, Cuba.
- Roles: violinist, composer, bandleader.
- Brief bio/significance: Jorrin's charanga work and development of cha-cha-cha added a major social-dance form to the Cuban lineage that salsa later drew on.
- Related timeline IDs: `cuba-charanga`, `cuba-cha-cha`.
- Confidence: medium.
- Uncertainty: "La enganadora" is often dated to 1951 as a composition, while the timeline's strongest current anchors are 1953 recordings.
- Sources: [Directorio Musica Cubana: Enrique Jorrin](https://directoriomusicacubana.com/?artista=enrique-jorrin), [Smithsonian Folkways cha-cha-cha liner notes PDF](https://folkways-media.si.edu/docs/folkways/artwork/FW04066.pdf).

#### Perez Prado

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: commonly `1916-12-11` to `1989-09-14`.
- Birthplace: Matanzas, Cuba.
- Roles: pianist, arranger, bandleader, composer.
- Brief bio/significance: Prado did not originate mambo, but his brass-forward arrangements and pop crossover made mambo an international dance craze.
- Related timeline IDs: `bridges-cherry-pink`, `cuba-2`, `cuba-m-prado`.
- Confidence: medium-high.
- Uncertainty: some institutional timelines give a 1917 birth year; flag before structured data.
- Sources: [National Sound Archive of Mexico: Perez Prado timeline](https://fonotecanacional.cultura.gob.mx/escucha/miscelanea-sonora/damaso-perez-prado/linea-del-tiempo), [AllMusic: Perez Prado](https://www.allmusic.com/artist/perez-prado-mn0000600908/biography).

#### Mario Bauza

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1911-04-28` to `1993-07-11`.
- Birthplace: Havana, Cuba.
- Roles: trumpeter, arranger, bandleader, musical director.
- Brief bio/significance: Bauza's clave-aware big-band arranging, work with Machito, and connection to Dizzy Gillespie made him one of the key bridge figures between Cuban music and jazz.
- Related timeline IDs: `bridges-bauza-webb`, `bridges-bauza-gillespie-calloway`, `bridges-machito-afro-cubans`, `bridges-tanga`, `cuba-m-machito-bauza`.
- Confidence: high for role, medium-high for exact vital data.
- Uncertainty: public copy should avoid flattening him to one invention story; his role is best told as connector, arranger, and band architect.
- Sources: [NMAAHC: Harmonious Mixes](https://nmaahc.si.edu/explore/stories/harmonious-mixes), [LOC Manteca essay PDF](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/Manteca.pdf), [Smithsonian Folkways Latin Jazz liner notes PDF](https://folkways-media.si.edu/docs/folkways/artwork/SFW40802.pdf).

#### Machito

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: circa `1908` to `1984-04-15`.
- Birthplace: disputed; often Havana, Cuba, but some sources discuss conflicting accounts.
- Roles: singer, maracas player, bandleader, frontman.
- Brief bio/significance: Machito fronted the Afro-Cubans, whose big-band blend of Afro-Cuban rhythm, jazz arranging, and improvisation shaped Latin jazz and salsa's orchestral language.
- Related timeline IDs: `bridges-machito-afro-cubans`, `bridges-tanga`, `bridges-palladium`, `bridges-mambo-usa`, `cuba-m-machito-bauza`.
- Confidence: high for role, medium for birth details.
- Uncertainty: birth year/place should remain approximate unless a primary source is found.
- Sources: [NMAAHC: Frank "Machito" Grillo](https://nmaahc.si.edu/latinx/frank-machito-grillo), [LOC: Music of Machito and his Afro-Cubans](https://findingaids.loc.gov/repositories/15/resources/1485), [LOC blog: Let's Mambo](https://blogs.loc.gov/music/2020/03/lets-mambo-machito-and-his-afro-cubans/).

#### Chano Pozo

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1915-01-07` to `1948-12-02`.
- Birthplace: Havana, Cuba.
- Roles: conguero, singer, dancer, composer.
- Brief bio/significance: Pozo's conga work and compositions with Dizzy Gillespie, especially "Manteca," made Afro-Cuban rhythmic practice central to the emerging Latin-jazz vocabulary.
- Related timeline IDs: `bridges-gillespie-pozo-carnegie`, `bridges-manteca`.
- Confidence: medium-high.
- Uncertainty: stronger institutional support exists for his role than for all exact vital-date details.
- Sources: [LOC Manteca essay PDF](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/Manteca.pdf), [Smithsonian Latin Jazz timeline](https://www.americanhistory.si.edu/explore/projects/smithsonian-jazz/collections-and-archives/latin-jazz/timeline), [Wolfsonian-FIU: Chano Pozo](https://wolfsonianfiulibrary.wordpress.com/2022/11/09/turning-the-beat-around-spotlight-on-chano-pozo/).

#### Dizzy Gillespie

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1917-10-21` to `1993-01-06`.
- Birthplace: Cheraw, South Carolina, United States.
- Roles: trumpeter, composer, bandleader.
- Brief bio/significance: Gillespie's collaborations with Chano Pozo brought Afro-Cuban percussion and rhythms directly into bebop and helped popularize the Cubop/Latin-jazz encounter.
- Related timeline IDs: `bridges-bauza-gillespie-calloway`, `bridges-gillespie-pozo-carnegie`, `bridges-manteca`.
- Confidence: high.
- Uncertainty: distinguish Carnegie Hall performance context from later recording chronology.
- Sources: [NEA Jazz Masters: Dizzy Gillespie](https://www.arts.gov/honors/jazz/john-birks-dizzy-gillespie), [LOC Manteca essay PDF](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/Manteca.pdf), [Carnegie Hall event data](https://data.carnegiehall.org/events/15149/about).

#### Tito Puente

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1923-04-20` to `2000` (exact death day needs final verification).
- Birthplace: New York City, United States.
- Roles: timbalero, composer, arranger, bandleader.
- Brief bio/significance: Puente's timbales-driven showmanship and Latin-jazz recordings carried Palladium-era mambo virtuosity into salsa's later stage and ensemble culture.
- Related timeline IDs: `bridges-palladium`, `bridges-arthur-murray-mambo`, `cuba-2`, `cuba-m-puente`.
- Confidence: high for role, medium for exact death day.
- Uncertainty: some sources report May 31, 2000 and others June 1, 2000; use year-only until settled.
- Sources: [Smithsonian Music: Tito Puente](https://music.si.edu/spotlight/latin-music-legends-stamps/tito-puente), [LOC Dance Mania essay PDF](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/DanceMania.pdf), [Smithsonian Folkways Latin Jazz liner notes PDF](https://folkways-media.si.edu/docs/folkways/artwork/SFW40802.pdf).

#### Tito Rodriguez

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1923-01-04` to `1973-02-28`.
- Birthplace: Santurce, Puerto Rico.
- Roles: singer, bandleader, arranger.
- Brief bio/significance: Rodriguez was a leading Palladium-era bandleader whose polished mambo, bolero, and dance-orchestra work helped define the competitive New York Latin scene before salsa.
- Related timeline IDs: `bridges-palladium`, `cuba-2`.
- Confidence: medium-high.
- Uncertainty: confirm exact dates against an institutional source if used in structured data.
- Sources: [Fundacion Nacional para la Cultura Popular: Tito Rodriguez](https://prpop.org/biografias/tito-rodriguez/), [Smithsonian Folkways Latin Jazz liner notes PDF](https://folkways-media.si.edu/docs/folkways/artwork/SFW40802.pdf).

#### Desi Arnaz

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1917-03-02` to `1986-12-02`.
- Birthplace: Santiago de Cuba, Cuba.
- Roles: bandleader, singer, actor, producer.
- Brief bio/significance: Arnaz's role as Ricky Ricardo on `I Love Lucy` put a Cuban bandleader persona and Latin music into U.S. mass television.
- Related timeline IDs: `bridges-i-love-lucy`.
- Confidence: high.
- Uncertainty: separate Arnaz's real biography from Ricky Ricardo as a fictional television character.
- Sources: [LOC I Love Lucy: Latin Roots/Yankee Roots](https://www.loc.gov/exhibits/i-love-lucy/latin-rootsyankee-roots.html), [Lucy-Desi Museum: A Legacy of Laughter](https://lucy-desi.com/a-legacy-of-laughter/).

#### Carlos Santana

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1947-07-20` to living.
- Birthplace: Autlan de Navarro, Jalisco, Mexico.
- Roles: guitarist, bandleader, composer.
- Brief bio/significance: Santana's Latin, rock, blues, and jazz fusion brought Afro-Latin percussion and Latin-derived repertoire to global rock audiences, especially after Woodstock.
- Related timeline IDs: `bridges-santana-woodstock`, `cuba-m-puente`.
- Confidence: high.
- Uncertainty: use only if the timeline keeps pop/rock bridge material.
- Sources: [Santana official biography](https://santana.com/Carlos-Santana-Biography/), [Rock & Roll Hall of Fame: Santana](https://rockhall.com/inductees/santana/), [Bethel Woods: Santana at Woodstock](https://www.bethelwoodscenter.org/news/detail/santana-50-years-of-peace-music).

### New York, Boogaloo, And Fania

#### Joe Cuba

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1931-04-22` to `2009-02-15`.
- Birthplace: East Harlem, New York City, United States.
- Roles: conguero, bandleader.
- Brief bio/significance: Cuba's sextet made bilingual, hook-heavy boogaloo a major bridge between Afro-Cuban dance music and 1960s New York R&B/pop.
- Related timeline IDs: `nyc-1`, `nyc-m-joe-cuba`.
- Confidence: medium-high.
- Uncertainty: stronger official source needed for exact vital dates.
- Sources: [The Guardian obituary: Joe Cuba](https://www.theguardian.com/music/2009/apr/03/joe-cuba-obituary), [PBS America ReFramed: We Like It Like That](https://www.pbs.org/video/america-reframed-we-it/).

#### Pete Rodriguez

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: likely `1934-04-16` to `2024-03-11`.
- Birthplace: Bronx, New York City, United States.
- Roles: pianist, bandleader.
- Brief bio/significance: Rodriguez's band made "I Like It Like That" one of boogaloo's signature records, illustrating the bilingual, R&B-inflected New York sound feeding salsa.
- Related timeline IDs: `nyc-1`.
- Confidence: medium.
- Uncertainty: some sources conflict on birth year and death details; also, Tony Pabon is the vocalist most associated with "I Like It Like That," so Rodriguez should not be labeled the singer.
- Sources: [Concord media kit: I Like It Like That](https://mediakits.concord.com/p/ilikeitlikethat/biography.html), [Caracol Radio obituary](https://caracol.com.co/2024/03/12/fallecio-pete-rodriguez-pianista-y-director-de-orquesta-de-boogaloo-y-salsa/), [El Colombiano obituary](https://www.elcolombiano.com/cultura/muere-pete-rodriguez-rey-del-booaloo-LB23991318).

#### Eddie Palmieri

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1936-12-15` to `2025-08-06`.
- Birthplace: New York City, United States.
- Roles: pianist, composer, arranger, bandleader.
- Brief bio/significance: Palmieri's La Perfecta used a trombone-forward, jazz-inflected approach that helped define a more forceful New York salsa sound.
- Related timeline IDs: `nyc-1`, `nyc-m-eddie-palmieri`, `nyc-2`, `bridges-palladium`.
- Confidence: high.
- Uncertainty: public timeline data should be checked for any outdated living/death wording.
- Sources: [NEA Jazz Masters: Eddie Palmieri](https://www.arts.gov/honors/jazz/eddie-palmieri), [NPS: Eddie Palmieri and His Trombanga](https://www.nps.gov/articles/000/eddie-palmieri-and-his-trombanga.htm), [LOC Azucar Pa' Ti essay PDF](https://lcweb2.loc.gov/static/programs/national-recording-preservation-board/documents/AzucarPaTi.pdf).

#### Johnny Pacheco

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1935-03-25` to `2021-02-15`.
- Birthplace: Santiago de los Caballeros, Dominican Republic.
- Roles: flutist, percussionist, composer, arranger, producer, bandleader.
- Brief bio/significance: Pacheco co-founded Fania Records and shaped the label, repertoire, branding, and All-Stars network that made New York salsa internationally visible.
- Related timeline IDs: `nyc-2`, `nyc-m-johnny-pacheco`, `nyc-4`, `nyc-yankee-stadium`.
- Confidence: high.
- Uncertainty: none major for role; exact vital dates should still be cross-checked before structured launch.
- Sources: [Fania: Johnny Pacheco](https://fania.com/artist/johnny-pacheco/), [Fania: Johnny Pacheco A Man And His Music](https://fania.com/record/johnny-pacheco-a-man-and-his-music-el-maestro/), [USPTO: Inventing Salsa](https://www.uspto.gov/learning-and-resources/journeys-innovation/historical-stories/inventing-salsa).

#### Jerry Masucci

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: likely `1934-10-07` to `1997-12-21`.
- Birthplace: Brooklyn, New York City, United States.
- Roles: attorney, record executive, producer.
- Brief bio/significance: Masucci co-founded Fania with Pacheco, supplying business infrastructure, media strategy, and distribution muscle for salsa's global boom.
- Related timeline IDs: `nyc-2`, `nyc-fania-fragments`.
- Confidence: medium.
- Uncertainty: founding role is well documented; vital dates need a stronger non-paywalled primary or institutional source.
- Sources: [USPTO: Inventing Salsa](https://www.uspto.gov/learning-and-resources/journeys-innovation/historical-stories/inventing-salsa), [Fania: Johnny Pacheco A Man And His Music](https://fania.com/record/johnny-pacheco-a-man-and-his-music-el-maestro/), [Smithsonian Folkways teacher guide PDF](https://folkways-media.si.edu/docs/folkways/lessons/SFLN069_teacher_guide.pdf).

#### Hector Lavoe

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1946-09-30` to `1993-06-29`.
- Birthplace: Ponce, Puerto Rico.
- Roles: singer, songwriter.
- Brief bio/significance: Lavoe's high, agile voice, phrasing, and street-level storytelling made him one of the defining voices of Fania-era salsa dura.
- Related timeline IDs: `nyc-colon-lavoe-el-malo`, `nyc-m-hector-lavoe`, `nyc-2`, `nyc-3`, `nyc-yankee-stadium`.
- Confidence: high.
- Uncertainty: biographical details about addiction/illness should remain sensitive and ledger-only unless a future bio mode intentionally handles them.
- Sources: [Fania: La Voz](https://fania.com/record/la-voz/), [Fania: Hector Lavoe La Voz era](https://fania.com/eras/hector-lavoe-la-voz/).

#### Willie Colon

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1950-04-28` to `2026-02-21`.
- Birthplace: Bronx, New York City, United States.
- Roles: trombonist, bandleader, composer, arranger, producer, singer.
- Brief bio/significance: Colon's gritty trombone-led records with Lavoe helped shape salsa dura, while his later work with Ruben Blades expanded salsa's socially engaged storytelling.
- Related timeline IDs: `nyc-colon-lavoe-el-malo`, `nyc-2`, `nyc-3`, `nyc-yankee-stadium`, `nyc-fania-fragments`.
- Confidence: high for role, medium-high for recently updated death data.
- Uncertainty: death date is recent as of this dossier; verify again before public launch.
- Sources: [Fania: Willie Colon](https://fania.com/artist/willie-colon/), [Fania: A Man And His Music - The Player](https://fania.com/record/a-man-and-his-music-the-player/), [LOC: Willie Colon "El Juicio"](https://blogs.loc.gov/music/2026/03/willie-colon-el-juicio/), [AP News: Willie Colon dies](https://apnews.com/article/66ecf4eeec614e156d0c88382aec64b7).

#### Celia Cruz

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1925-10-21` to `2003-07-16`.
- Birthplace: Havana, Cuba.
- Roles: singer.
- Brief bio/significance: Cruz carried Cuban vocal traditions into the international salsa mainstream and became one of the genre's defining icons after joining the Fania orbit.
- Related timeline IDs: `nyc-2`, `nyc-m-celia-cruz`, `nyc-yankee-stadium`, `global-latin-grammys`.
- Confidence: high.
- Uncertainty: none major; keep exile/politics context nuanced.
- Sources: [NMAAHC: Celia Cruz](https://nmaahc.si.edu/latinx/celia-cruz), [Smithsonian Institution: Celia Cruz](https://www.si.edu/spotlight/latin-music-legends-stamps/celia-cruz), [National Women's History Museum: Celia Cruz](https://www.womenshistory.org/education-resources/biographies/celia-cruz).

#### Ray Barretto

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1929-04-29` to `2006-02-17`.
- Birthplace: Brooklyn, New York City, United States.
- Roles: conguero, bandleader.
- Brief bio/significance: Barretto connected postwar jazz, Latin jazz, boogaloo, and Fania salsa, becoming one of the central congueros in the New York salsa story.
- Related timeline IDs: `nyc-1`, `nyc-2`, `nyc-3`, `nyc-m-ray-barretto`, `bridges-manteca`.
- Confidence: high.
- Uncertainty: none major.
- Sources: [NEA Jazz Masters: Ray Barretto](https://www.arts.gov/honors/jazz/ray-barretto), [NMAAHC: Ray Barretto](https://nmaahc.si.edu/latinx/ray-barretto).

#### Ruben Blades

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1948-07-16` to living.
- Birthplace: Panama City, Panama.
- Roles: singer, songwriter, actor, lawyer, politician.
- Brief bio/significance: Blades brought narrative and socially conscious songwriting to salsa, especially through his Fania-era collaborations with Willie Colon.
- Related timeline IDs: `nyc-4`, `nyc-m-ruben-blades`, `nyc-yankee-stadium`, `global-1`.
- Confidence: high.
- Uncertainty: do not tie him to Cheetah 1971 unless a specific source supports it; keep him in the later Fania/Siembra arc.
- Sources: [Ruben Blades official biography](https://www.rubenblades.com/biography), [Fania: Ruben Blades artist essentials](https://fania.com/artist-essentials/ruben-blades/), [Fania: De Panama a Nueva York](https://fania.com/record/de-panama-a-nueva-york/).

### Colombia, Global, And Contemporary Visibility

#### Jairo Varela

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1949-12-09` to `2012-08-08`.
- Birthplace: Quibdo, Choco, Colombia.
- Roles: composer, singer, producer, bandleader.
- Brief bio/significance: Varela founded Grupo Niche and helped establish Colombian salsa, especially Cali's identity, as a major global salsa center.
- Related timeline IDs: `global-1`.
- Confidence: high.
- Uncertainty: formation chronology varies between 1979 and 1980 depending on whether sources mean founding or activity.
- Sources: [Cali cultural office: Jairo Varela legacy](https://www.cali.gov.co/cultura/publicaciones/177482/jairo-varela-un-legado-que-perdura/), [Senal Colombia: Jairo Varela biography](https://www.senalcolombia.tv/cultura/jairo-varela-biografia-grupo-niche), [SciELO: Grupo Niche as a translocal salsa project](https://www.scielo.cl/scielo.php?pid=S0716-27902020000200175&script=sci_arttext).

#### Alexis Lozano

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1958-11-07` to living.
- Birthplace: Quibdo, Choco, Colombia.
- Roles: trombonist, arranger, composer, bandleader.
- Brief bio/significance: Lozano co-founded Grupo Niche with Jairo Varela and later founded Guayacan Orquesta, linking Choco musicianship to Colombia's salsa production boom.
- Related timeline IDs: `global-1`.
- Confidence: medium.
- Uncertainty: exact date and birthplace should be verified against stronger biographical sources before structured use.
- Sources: [SciELO: Grupo Niche as a translocal salsa project](https://www.scielo.cl/scielo.php?pid=S0716-27902020000200175&script=sci_arttext), [Guayacan Orquesta official site](https://guayacanorquesta.com/).

#### Marc Anthony

- Review status: UNMARKED (change to APPROVED, REJECT, MAYBE, MERGED, or LEDGER ONLY)
- Birth/death: `1968-09-16` to living.
- Birthplace: New York City, United States.
- Roles: singer, actor, producer.
- Brief bio/significance: Marc Anthony carried salsa into late-1990s and 2000s Latin pop markets, sustaining broad global visibility for the genre.
- Related timeline IDs: `global-latin-grammys`.
- Confidence: high.
- Uncertainty: best used as contemporary visibility context, not as a core origin-story figure.
- Sources: [Marc Anthony official bio](https://marcanthonyonline.com/pages/about), [GRAMMY artist profile: Marc Anthony](https://www.grammy.com/artists/marc-anthony/448/).

## Additional Timeline People And Groups To Research Later

These names appear in current timeline data but were not expanded in this first biographical pass. Treat this as a preservation list rather than a public-timeline recommendation.

| Name / group | Seen in timeline context | Review status | Suggested next action |
| --- | --- | --- | --- |
| Traditional folkloric communities | roots chapter | UNMARKED | Research as community/culture context, not individual bio. |
| Siro Rodriguez | Trio Matamoros | UNMARKED | Research if Trio Matamoros receives a deeper profile. |
| Rafael Cueto | Trio Matamoros | UNMARKED | Research if Trio Matamoros receives a deeper profile. |
| Sexteto Habanero | son cubano | UNMARKED | Research as ensemble history. |
| Septeto Nacional | son cubano / Ignacio Pineiro legacy | UNMARKED | Research as ensemble history. |
| Arcaño y sus Maravillas | charanga / danzon-mambo bridge | UNMARKED | Research as ensemble and Arcaño biography. |
| Orquesta Aragon | charanga | UNMARKED | Research as ensemble history. |
| Miguelito Valdes | cha-cha-cha U.S. circulation | UNMARKED | Research as Cuba-to-U.S. recording bridge. |
| Chick Webb | Bauza in Harlem swing | UNMARKED | Research as bridge-context figure. |
| Cab Calloway | Bauza/Gillespie session | UNMARKED | Research as bridge-context figure. |
| Richard Berry | "Louie Louie" bridge | UNMARKED | Research if rock/Latin bridge expands. |
| Rene Touzet | "El Loco Cha Cha" / "Louie Louie" bridge | UNMARKED | Research if rock/Latin bridge expands. |
| The Kingsmen | "Louie Louie" garage-rock bridge | UNMARKED | Research as band context only. |
| Larry Harlow | Fania / Cheetah | UNMARKED | Research as Fania-era artist. |
| Roberto Roena | Fania / Cheetah | UNMARKED | Research as Fania-era artist. |
| Bobby Valentin | Fania / Cheetah | UNMARKED | Research as Fania-era artist. |
| Cheo Feliciano | Fania / Cheetah | UNMARKED | Research as Fania-era artist. |
| Ismael Miranda | Fania / Cheetah | UNMARKED | Research as Fania-era artist. |
| Leon Gast | `Our Latin Thing` / Fania film | UNMARKED | Research as media-visibility contributor. |
| Fruko / Julio Ernesto Estrada | Colombia salsa ecosystem | UNMARKED | Research if Colombia chapter expands. |
| Fruko y sus Tesos | Colombia salsa ecosystem | UNMARKED | Research as ensemble history. |
| Guayacan Orquesta | Colombia salsa ecosystem | UNMARKED | Research as ensemble history. |
| Los Van Van | songo / modern Cuba | UNMARKED | Research as ensemble and Juan Formell context. |
| Juan Formell | songo / Los Van Van | UNMARKED | Research as modern Cuban innovator. |
| Changuito | songo rhythm-section language | UNMARKED | Research as rhythm/percussion innovator. |
| NG La Banda | timba | UNMARKED | Research as ensemble history. |
| Issac Delgado | timba | UNMARKED | Research as modern Cuban vocalist. |
| Paulito FG | timba | UNMARKED | Research as modern Cuban vocalist/bandleader. |
| Charanga Habanera | timba | UNMARKED | Research as ensemble history. |
