# Salsa History Timeline Research Dossiers

Purpose: review proposed timeline elements before editing `data/timeline*.ts`.

Implementation gate: do not create `data/timeline-bridges.ts`, alter `data/timeline.ts`, or merge these claims into `data/timeline-cuba.ts` / `data/timeline-ny.ts` until Jake reviews this packet.

Timeline item specificity rule: a final candidate timeline item should anchor to a specific event, recording, release, performance, broadcast, venue engagement, or person-on-recording. Broad ranges such as `1930s`, `1950s`, or `late 1950s-mid 1960s` are background buckets only until research can convert them into one or more specific candidate timeline items.

## Coordinator Synthesis

Recommended candidate timeline items:

- Add a new bridge chapter between Cuba and NYC if approved. Working file: `data/timeline-bridges.ts`.
- Strongest bridge-chapter candidate timeline items:
  - `1939-07-17`: Mario Bauza and Dizzy Gillespie appear in Cab Calloway's orchestra recording session.
  - `1940`: Machito forms Machito and His Afro-Cubans.
  - `1943-05-29`: "Tanga" emerges in Machito's band context at La Conga.
  - `1947-09-29`: Dizzy Gillespie presents Afro-Cuban jazz with Chano Pozo at Carnegie Hall.
  - `1947-12-30`: Dizzy Gillespie records "Manteca" with Chano Pozo.
  - `1947`: Palladium Ballroom begins Latin/mambo programming.
  - `1953-03`: Orquesta America records Enrique Jorrin's "La enganadora."
  - `1957-04`: Richard Berry and the Pharaohs release "Louie Louie."
  - `1969-08-16`: Santana performs at Woodstock.
- Strongest media-visibility bridge candidate timeline items:
  - `1941`: Katherine Dunham's `Carnival of Rhythm`.
  - `1954-09-14`: Arthur Murray TV mambo segment.
  - `1954-10-22`: `Mambo USA` debuts at Carnegie Hall.
  - `1955`: Perez Prado's "Cherry Pink and Apple Blossom White" crossover.
  - `1972-07`: `Our Latin Thing` release/review cycle.
  - `1973-08-24`: Fania All-Stars at Yankee Stadium.
  - `1975-03-08`: Fania All-Stars on `Don Kirshner's Rock Concert`.
  - `2000-09-13`: first Latin Grammy Awards.
- Strongest existing timeline item enrichments:
  - `data/timeline-cuba.ts`: add specific cha-cha-cha recording and U.S.-market recording anchors.
  - `data/timeline-ny.ts`: add specific boogaloo releases, Fania/Cheetah performance/film anchors, and Rubén Blades / Siembra / Fania-fragmentation anchors.
- Strongest new NYC candidate timeline item:
  - `1967`: Willie Colon's debut `El Malo` launches the Colon-Lavoe Fania partnership.
- Keep mostly ledger-only unless later scope expands:
  - Desi Arnaz / `I Love Lucy` as media visibility bridge.
  - Day Tripper, Good Lovin', "Jewish Latin", "mambo-niks", and unsupported Brill/Palladium proximity claims.
  - Lavoe decline/addiction/illness details, unless a future biography mode handles them sensitively.

Sub-agent outputs were intentionally structured as markdown-only research packets. No sub-agent edited repo files.

## Specific Candidate Timeline Items For Review

Use this section for approval/rejection. Mark each line with `APPROVED`, `REJECT`, `MAYBE`, or `LEDGER ONLY`.

### Bridge Chapter Candidates

#### 1933-11-20 - Mario Bauza records with Chick Webb's Harlem-based orchestra

- Type: person-on-recording.
- Review status: APPROVED
- Proposed timeline wording: Mario Bauza appears on trumpet in Chick Webb orchestra recording documentation, placing a Cuban-born musician inside Harlem's leading swing-band ecosystem before the Machito breakthrough.
- Verified claims: jazz discography documentation lists Bauza among Chick Webb personnel for a 1933 session; Chick Webb's orchestra was central to Harlem's Savoy Ballroom swing world; this supports the broader Bauza-in-Harlem bridge item as a pre-Machito apprenticeship anchor.
- Sources: [Jazz Archeology Chick Webb PDF](https://www.jazzarcheology.com/artists/chick_webb.pdf), [NMAAHC Harmonious Mixes](https://nmaahc.si.edu/explore/stories/harmonious-mixes).
- Uncertainty: exact session should be cross-checked against a full sessionography before public use.
- Recommendation: supplement, not primary anchor.

#### 1939-07-17 - Mario Bauza and Dizzy Gillespie appear in Cab Calloway's orchestra recording session

- Type: person-on-recording.
- Review status: APPROVED
- Proposed timeline wording: Mario Bauza and Dizzy Gillespie are documented in Cab Calloway's orchestra at a New York recording session, an early direct bridge between Cuban musical knowledge and bebop's emerging circle.
- Verified claims: Jazzdisco lists a New York City session on July 17, 1939; personnel include Bauza and Gillespie on trumpet; titles include "Trylon Swing," "Utt-Da-Zay," "Crescendo in Drums," and "The Jumpin' Jive"; NMAAHC notes Bauza worked with Black jazz orchestras including Cab Calloway.
- Sources: [Jazzdisco Cab Calloway catalog](https://www.jazzdisco.org/cab-calloway/catalog/), [NMAAHC Harmonious Mixes](https://nmaahc.si.edu/explore/stories/harmonious-mixes).
- Uncertainty: this is a contact/personnel bridge, not itself an Afro-Cuban jazz performance.
- Recommendation: replace the vague "Bauza in Harlem meets jazz/bebop musicians" idea.

#### 1940 - Machito forms Machito and His Afro-Cubans

- Type: event.
- Review status: APPROVED
- Proposed timeline wording: Machito forms the Afro-Cubans in New York, with Mario Bauza soon central as musical director, creating the durable band format that fused Afro-Cuban percussion with jazz arranging.
- Verified claims: Smithsonian dates the formation to 1940 and Bauza joining as musical director to 1941; LOC describes the group as active from 1940 into the early 1980s; NMAAHC credits the orchestra with consistently mixing Afro-Cuban and jazz rhythms.
- Sources: [Smithsonian Latin Jazz timeline](https://www.americanhistory.si.edu/explore/projects/smithsonian-jazz/collections-and-archives/latin-jazz/timeline), [LOC finding aid](https://findingaids.loc.gov/repositories/15/resources/1485), [NMAAHC Harmonious Mixes](https://nmaahc.si.edu/explore/stories/harmonious-mixes).
- Uncertainty: exact first performance date is contested; use `1940` unless stronger primary support appears.
- Recommendation: replace the broad "Machito and the Afro-Cubans emerge" item.

#### 1943-05-29 - "Tanga" emerges in Machito's band context

- Type: performance.
- Review status: APPROVED
- Proposed timeline wording: Mario Bauza's "Tanga" is publicly performed by Machito and His Afro-Cubans, becoming a foundational Afro-Cuban jazz work built around clave, jazz arranging, and improvisation.
- Verified claims: Smithsonian Folkways calls "Tanga" generally considered the first Afro-Cuban jazz composition and says it was publicly performed in 1943; Folkways search text gives May 29, 1943 at La Conga; NMAAHC treats it as a landmark work.
- Sources: [Smithsonian Folkways Latin Jazz liner notes](https://folkways-media.si.edu/docs/folkways/artwork/SFW40802.pdf), [NMAAHC Harmonious Mixes](https://nmaahc.si.edu/explore/stories/harmonious-mixes), [Smithsonian Latin Jazz timeline](https://www.americanhistory.si.edu/explore/projects/smithsonian-jazz/collections-and-archives/latin-jazz/timeline).
- Uncertainty: use this as performance anchor, not settled recording date; Smithsonian also gives a 1945 recording date.
- Recommendation: replace broad "Tanga invented Afro-Cuban jazz" item; optionally pair with 1945 recording.
- Jake note: maybe this item and the next item can be "merged" into one?
- Coordinator note: merge with the 1945 recording item; public timeline should use year-level `1943` unless the exact date is re-verified.

#### 1945 - Machito and His Afro-Cubans record "Tanga"

- Type: recording.
- Review status: MERGED
- Proposed timeline wording: Machito and His Afro-Cubans record "Tanga," carrying the Afro-Cuban jazz experiment from bandstand practice into recorded circulation.
- Verified claims: Smithsonian's Latin Jazz timeline says the Afro-Cubans recorded "Tanga" in 1945; NMAAHC identifies it as Bauza's composition and the band's iconic song.
- Sources: [Smithsonian Latin Jazz timeline](https://www.americanhistory.si.edu/explore/projects/smithsonian-jazz/collections-and-archives/latin-jazz/timeline), [NMAAHC Harmonious Mixes](https://nmaahc.si.edu/explore/stories/harmonious-mixes), [Smithsonian Folkways Latin Jazz liner notes](https://folkways-media.si.edu/docs/folkways/artwork/SFW40802.pdf).
- Uncertainty: some secondary summaries say 1943; use 1945 for recording unless label/session evidence proves otherwise.
- Recommendation: supplement the 1943 performance item.
- Jake note: maybe this item and the previous item can be "merged" into one?
- Coordinator note: keep recording-date ambiguity in the ledger and fold the public story into the 1943 `Tanga` item.

#### 1947-09-29 - Dizzy Gillespie presents Afro-Cuban jazz with Chano Pozo at Carnegie Hall

- Type: performance.
- Review status: APPROVED
- Proposed timeline wording: Dizzy Gillespie's orchestra performs at Carnegie Hall with Chano Pozo, premiering "Cubano-Be" and "Cubano-Bop" and bringing Afro-Cuban percussion into bebop's concert-stage narrative.
- Verified claims: Carnegie Hall lists Dizzy Gillespie and His Orchestra on September 29, 1947; the event includes world premieres of "Cubano-Be" and "Cubano-Bop"; LOC and Smithsonian place Pozo with Gillespie in 1947.
- Sources: [Carnegie Hall event data](https://data.carnegiehall.org/events/15149/about), [LOC National Recording Registry](https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/registry-by-induction-years/2004/), [Smithsonian Latin Jazz timeline](https://www.americanhistory.si.edu/explore/projects/smithsonian-jazz/collections-and-archives/latin-jazz/timeline).
- Uncertainty: Carnegie data confirms the program but should be paired with LOC/Smithsonian for the Pozo claim.
- Recommendation: replace broad "Dizzy + Chano bring Afro-Cuban jazz to bebop" item.

#### 1947-12-30 - Dizzy Gillespie records "Manteca" with Chano Pozo

- Type: recording.
- Review status: APPROVED
- Proposed timeline wording: Dizzy Gillespie's big band records "Manteca," co-written with Chano Pozo and Gil Fuller, establishing one of the canonical Afro-Cuban jazz records.
- Verified claims: FIU's Diaz-Ayala discography lists December 30, 1947 recordings including "Manteca"; MusicBrainz also gives 1947-12-30; LOC identifies "Manteca" by Dizzy Gillespie Big Band with Chano Pozo as a 1947 National Recording Registry work.
- Sources: [FIU Diaz-Ayala PDF](https://latinpop.fiu.edu/pdf/EFiles/PQ_ENG.pdf), [MusicBrainz Manteca release](https://musicbrainz.org/release/c0d5b10f-5bf3-411b-9c47-f0a4928d7918), [LOC National Recording Registry](https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/registry-by-induction-years/2004/).
- Uncertainty: some secondary sources cite December 22, 1947 for nearby Gillespie/Pozo recordings; for "Manteca," December 30 is the stronger discographic anchor found here.
- Recommendation: replace broad "Manteca released/recorded" item.

#### 1947 - Palladium Ballroom begins Latin/mambo programming

- Type: event.
- Review APPROVED
- Proposed timeline wording: The Palladium Ballroom begins Latin music programming in midtown Manhattan, becoming the central New York social dance venue for mambo.
- Verified claims: PalladiumMambo.com says the Palladium began Latin music on Sundays in 1947; the venue was at 1698 Broadway and 53rd Street; its Latin nights drew multiracial and multiethnic audiences and helped make the room known as "the home of the mambo."
- Sources: [PalladiumMambo.com](https://www.palladium-mambo.com/ballroom.shtml), [History.com salsa origins article](https://www.history.com/articles/salsa-music-origins-new-york-city-mambo-machito).
- Uncertainty: some sources date the Palladium's Latin turn to 1948; use "by 1947/1948" if the timeline can tolerate softer date text.
- Recommendation: replace broad "Palladium mambo era" item.

#### 1948 - "Big Three" Palladium orchestra rivalry defines mambo's New York social world

- Type: event / performance context.
- Review status: APPROVED
- Proposed timeline wording: By 1948, the Palladium's mambo identity centers on the "Big Three" orchestras: Machito, Tito Puente, and Tito Rodriguez.
- Verified claims: PalladiumMambo.com identifies the Big Three as Tito Puente, Tito Rodriguez, and Machito; Routledge says Palladium frequently booked those three orchestras; History.com frames their rivalry as raising mambo's cultural currency.
- Sources: [PalladiumMambo.com](https://www.palladium-mambo.com/ballroom.shtml), [Routledge Encyclopedia of Modernism: Palladium](https://www.rem.routledge.com/articles/palladium), [History.com salsa origins article](https://www.history.com/articles/salsa-music-origins-new-york-city-mambo-machito).
- Uncertainty: 1948 is supportable context but should not imply one definitive debut performance unless a dated bill is found.
- Recommendation: replace broad "Palladium / Big Three" item or supplement the 1947 venue item.

#### 1951-10-15 - `I Love Lucy` premieres on CBS with Desi Arnaz as Ricky Ricardo

- Type: broadcast.
- Review status: APPROVED
- Proposed timeline wording: `I Love Lucy` premieres on CBS, placing Desi Arnaz's Cuban bandleader persona inside a mass U.S. television sitcom.
- Verified claims: LOC dates the first broadcast to October 15, 1951; Ball's real-life husband Desi Arnaz became her co-star; the series made Ricky Ricardo, a Cuban singer/bandleader, a recurring mainstream-TV presence.
- Sources: [LOC I Love Lucy overview](https://www.loc.gov/exhibits/i-love-lucy/overview.html), [Paramount Press Express CBS timeline](https://www.paramountpressexpress.com/cbs-entertainment/releases/?view=5134).
- Uncertainty: strong date, but still a media-visibility bridge rather than a core music-evolution item.
- Recommendation: keep ledger-only unless Jake wants U.S. mainstream media bridges in the visible rail.

#### 1951-10-29 - "The Diet" episode broadcasts the "Cuban Pete / Sally Sweet" number

- Type: performance / broadcast.
- Review status: APPROVED
- Proposed timeline wording: The `I Love Lucy` episode "The Diet" airs, featuring Desi Arnaz and Lucille Ball's "Cuban Pete / Sally Sweet" nightclub-style number.
- Verified claims: Paley Center lists `I Love Lucy: The Diet` on October 29, 1951; Arnaz is credited as Ricky Ricardo; the performance is a concrete example of Latin dance-band material entering prime-time sitcom entertainment.
- Sources: [Paley Center: The Diet](https://www.paleycenter.org/collection/item?item=T%3A60598), [epguides: I Love Lucy](https://epguides.com/ILoveLucy/), [LOC Theme Songs](https://www.loc.gov/exhibits/i-love-lucy/theme-songs.html).
- Uncertainty: some fan pages give conflicting air dates; Paley is preferred.
- Recommendation: supplement the premiere item only if Desi/TV is approved for public timeline use.

#### 1953-03 - Orquesta America records Enrique Jorrin's "La enganadora"

- Type: recording.
- Review status: APPROVED
- Proposed timeline wording: Orquesta America records Enrique Jorrin's "La enganadora," widely treated as the first major cha-cha-cha record.
- Verified claims: discographic summaries date the recording to March 1953; the song is credited to Cuban violinist/composer Jorrin; it became a major Panart single and is widely cited as foundational cha-cha-cha.
- Sources: [Get Bailar: La Enganadora](https://getbailar.com/es/biblioteca/encyclopedia/cha-cha-cha/recordings/la-enganadora-1953), [Fremeaux: Cha-cha-cha 1953-1958](https://www.fremeaux.com/en/1723-cha-cha-cha-1953-1958-3561302533629-fa5336.html).
- Uncertainty: exact day in March is not consistently available.
- Recommendation: replace broad "cha-cha-cha emerges" item.

#### 1953-06-30 - Miguelito Valdes records a U.S.-market cha-cha-cha version of "La enganadora"

- Type: recording / person-on-recording.
- Review status: APPROVED
- Proposed timeline wording: Miguelito Valdes records "La enganadora" with Rene Hernandez's conjunto, billed by Seeco as a cha-cha-cha rhythm.
- Verified claims: sources date the recording to June 30, 1953; the backing group was led by pianist Rene Hernandez; the Seeco billing used "ritmo de cha cha cha"; the recording documents the genre label moving into commercial circulation outside Cuba.
- Sources: [Get Bailar: La Enganadora](https://getbailar.com/es/biblioteca/encyclopedia/cha-cha-cha/recordings/la-enganadora-1953), [La enganadora entry](https://en.wikipedia.org/wiki/La_enga%C3%B1adora).
- Uncertainty: a label scan or Seeco session log would strengthen the exact date.
- Recommendation: supplement the Orquesta America item as a commercial-label/media bridge.

#### 1958 - Tito Puente releases `Dance Mania`

- Type: release.
- Review status: APPROVED
- Proposed timeline wording: Tito Puente releases `Dance Mania`, a landmark mambo LP that carries Palladium-era dance-band energy into the recording market.
- Verified claims: LOC identifies `Dance Mania` as probably Puente's most popular album and dates it to 1958; the essay connects Puente's dance reputation to the mambo era; the album was later added to the National Recording Registry.
- Sources: [LOC Dance Mania essay PDF](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/DanceMania.pdf), [AllMusic Dance Mania](https://www.allmusic.com/album/dance-mania-mw0000097564).
- Uncertainty: some sources give only year; "August 1958" circulates discographically but was not verified by LOC in this pass.
- Recommendation: supplement Palladium / Big Three as a recorded-media anchor.

#### 1957-04 - Richard Berry and the Pharaohs release "Louie Louie"

- Type: release.
- Review status: APPROVED
- Proposed timeline wording: Richard Berry and the Pharaohs release "Louie Louie," whose musical idea is widely traced to Rene Touzet's "El Loco Cha Cha."
- Verified claims: Berry's original was released by Flip Records in April 1957; it was initially the B-side to "You Are My Sunshine"; the riff/musical idea is widely traced to Touzet's "El Loco Cha Cha"; its first impact was regional before the Kingsmen made it a national rock standard.
- Sources: [HistoryLink](https://historylink.org/File/9173), [LouieLouie.net Richard Berry](https://www.louielouie.net/blog/?page_id=2667), [GPB/NPR Louie Louie story](https://www.gpb.org/news/2023/10/31/louie-louie-the-story-behind-the-song-everyone-knows-no-one-understands), [EBSCO Research Starter](https://www.ebsco.com/research-starters/music/louie-louie-song).
- Uncertainty: exact release day is not reliably established; April 1957 is defensible.
- Recommendation: replace broad "Louie Louie shows Latin-to-rock bridge" item.

#### 1957-06-22 - `Cash Box` frames Paul Anka's "Diana" as Latin-inflected rock/dance pop

- Type: reception anchor.
- Review status: APPROVED
- Proposed timeline wording: `Cash Box` magazine frames Paul Anka's hit "Diana" in rock/cha-cha/Latin dance language, showing Latin rhythmic vocabulary entering teen pop reception.
- Verified claims: Samuel Flynn identifies "Diana" as a key early rock and roll example of straight-quaver polyrhythm; Flynn argues the rhythmic transition in U.S. pop/rock drew heavily from Afro-Latin musics; contemporary trade reception associated the record with rock/cha-cha/Latin dance language.
- Sources: [Cambridge Core Rock-a-Cha-Cha](https://www.cambridge.org/core/journals/twentieth-century-music/article/rockachacha-the-erased-impact-of-latin-american-music-on-the-rhythmic-transformation-of-us-popular-music/BA5E9B6BAA6C542FB533102A725A5DA8), [Cash Box June 22, 1957](https://www.worldradiohistory.com/Archive-All-Music/Cash-Box/Cash-Box/50s/1957/CB-1957-06-22.pdf), [Paul Anka chart/release context](https://chart-history.net/wp-content/uploads/arch-paul-anka.pdf).
- Uncertainty: use June 22, 1957 for reception; use July 1957 if framed as single release.
- Recommendation: supplement the rock-a-cha-cha dossier as a named example.

#### 1963-04-06 - The Kingsmen record "Louie Louie" in Portland

- Type: recording.
- Review status: APPROVED
- Proposed timeline wording: The Kingsmen record "Louie Louie," transforming a Latin/calypso/R&B-derived song into a garage-rock template.
- Verified claims: The Kingsmen recorded their version on April 6, 1963; it was first issued locally on Jerden before broader Wand release; its later chart success helped detach the song from its Afro-Latin source in popular memory.
- Sources: [Oregon Encyclopedia: The Kingsmen](https://www.oregonencyclopedia.org/articles/the_kingsmen/), [Portland Monthly Louie Louie story](https://www.pdxmonthly.com/news-and-city-life/2013/03/the-accidental-story-of-louie-louie-march-2013), [Getty Images label context](https://www.gettyimages.se/detail/nyhetsfoto/rpm-recording-of-the-1963-hit-single-louie-louie-by-the-nyhetsfoto/1142868676).
- Uncertainty: recording date is strong; first release month varies.
- Recommendation: supplement Richard Berry item if the pop/rock bridge gets more than one item.

#### 1963-07-05 - The Ronettes begin recording "Be My Baby"

- Type: recording.
- Review status: REJECT
- Proposed timeline wording: The Ronettes begin recording "Be My Baby," a Brill/1650 Broadway ecosystem record whose percussion and rhythm choices support pop's Latin-rhythm absorption story.
- Verified claims: LOC identifies July 5, 1963 session documentation; the song was written by Jeff Barry, Ellie Greenwich, and Phil Spector; the record used castanets/maracas; Flynn cites Brill Building writers using Latin-derived rhythmic patterns.
- Sources: [LOC Be My Baby at 60](https://blogs.loc.gov/now-see-hear/2023/08/be-my-baby-at-60/), [LOC Be My Baby essay PDF](https://lcweb2.loc.gov/static/programs/national-recording-preservation-board/documents/Be-My-Baby_Waldron.pdf), [Cambridge Core Rock-a-Cha-Cha](https://www.cambridge.org/core/journals/twentieth-century-music/article/rockachacha-the-erased-impact-of-latin-american-music-on-the-rhythmic-transformation-of-us-popular-music/BA5E9B6BAA6C542FB533102A725A5DA8).
- Uncertainty: exact public release day is inconsistent; August 1963 is solid for release, July 5 for recording/session.
- Recommendation: supplement broad Brill Building claims only if the pop/rock bridge gets more than one item.
- Jake note: I can't tell if the latin influence of the rhythm is too "weak". I'd maybe have to have similar latin song(s) to refer to

#### 1966 - Joe Cuba Sextet turns "Bang! Bang! Push, Push, Push" into a crossover boogaloo breakthrough

- Type: release / recording.
- Review status: APPROVED
- Proposed timeline wording: Joe Cuba Sextet turns "Bang! Bang! Push, Push, Push" into a crossover boogaloo breakthrough after a Palm Gardens Ballroom origin story.
- Verified claims: Fania places the origin story at Palm Gardens Ballroom in 1966; the song grew from Jimmy Sabater's idea and Nick Jimenez's piano tumbao; Fania describes Joe Cuba's band as developing boogaloo into a form accepted beyond younger Latin audiences.
- Sources: [Fania: Bang Bang Push Push](https://fania.com/record/bang-bang-push-push/).
- Uncertainty: exact recording and single-release dates were not reliably available; use 1966.
- Recommendation: supplement broad boogaloo item.

#### 1967 - Pete Rodriguez's "I Like It Like That" becomes the canonical Latin boogaloo hit

- Type: release.
- Review status: APPROVED
- Proposed timeline wording: Pete Rodriguez's "I Like It Like That" becomes the canonical Latin boogaloo hit and shows the mid-1960s New York Latin scene at peak crossover.
- Verified claims: Fania identifies Pete Rodriguez y Su Conjunto as the group most fully associated with Latin boogaloo; Fania calls "I Like It Like That" the quintessential boogaloo tune; Concord/Craft says the album was released on Alegre Records in 1967.
- Sources: [Fania: I Like It Like That](https://fania.com/record/i-like-it-like-that/), [Concord media kit](https://mediakits.concord.com/p/ilikeitlikethat/press-releases.html).
- Uncertainty: exact month/day not verified.
- Recommendation: replace generic "boogaloo peaks in NYC" item.

#### 1967 - Willie Colon's debut `El Malo` launches the Colon-Lavoe Fania partnership

- Type: release / person-on-recording.
- Review status: APPROVED
- Proposed timeline wording: Willie Colon's debut `El Malo` launches the Colon-Lavoe Fania partnership after Hector Lavoe joins the band at Johnny Pacheco's urging.
- Verified claims: Fania's history says Colon released his first album in 1967 after Lavoe joined; Fania notes say Hector Perez, later Hector Lavoe, agreed to record `El Malo` in 1967; Fania says Masucci agreed to issue Colon's early albums on condition that the band include a versatile singer.
- Sources: [Fania history](https://fania.com/history/), [Fania: Guisando](https://fania.com/record/guisando/), [Fania: The Player](https://fania.com/record/a-man-and-his-music-the-player/).
- Uncertainty: use 1967, not Fania's likely placeholder January 1 date.
- Recommendation: replace broad Colon/Lavoe emergence item.

#### 1969 - Willie Colon and Hector Lavoe release `Guisando`

- Type: release.
- Review status: APPROVED
- Proposed timeline wording: Colon and Lavoe move from boogaloo-era sounds toward an aggressive urban salsa identity on `Guisando`.
- Verified claims: Fania calls `Guisando` "really the first salsa album by a duo"; the notes frame it as moving from "decadent boogaloo" toward guaracha, guajira, son, bomba, Latin jazz, and guaguanco; Fania describes the Colon-Lavoe sound as rebellious and rooted in New York barrio life.
- Sources: [Fania: Guisando](https://fania.com/record/guisando/), [Fania: Crime Pays](https://fania.com/record/crime-pays/).
- Uncertainty: exact month/day not verified.
- Recommendation: supplement `El Malo` as the stylistic-turn anchor.

#### 1969-08-16 - Santana performs at Woodstock

- Type: performance.
- Review status: APPROVED
- Proposed timeline wording: Santana performs at Woodstock, turning Afro-Latin percussion, blues guitar, organ-driven rock, and San Francisco festival energy into a mass-audience breakthrough.
- Verified claims: Santana performed on August 16, 1969; Woodstock's official lineup page says the band began around 2:00 pm; the performance included "Soul Sacrifice"; the band was not yet widely known to the wider audience.
- Sources: [Woodstock Santana lineup](https://www.woodstock.com/lineup/santana/), [Woodstock lineup archive](https://woodstock.com/lineup/), [MusicBrainz Santana Woodstock](https://musicbrainz.org/release/dd6f6c9d-1401-4f12-96a4-5dfc811a98d7).
- Uncertainty: exact set length/order varies; date and afternoon slot are reliable.
- Recommendation: replace broad Santana/Woodstock item.

#### 1969-08-30 - Santana releases debut album after Woodstock breakthrough

- Type: release.
- Review status: REJECT
- Proposed timeline wording: Santana releases its self-titled debut LP shortly after Woodstock, converting festival attention into the record market.
- Verified claims: MusicBrainz and Apple Music list August 30, 1969; the album included studio versions of "Soul Sacrifice," "Jingo," and "Evil Ways"; its release followed the Woodstock performance.
- Sources: [MusicBrainz Santana release group](https://musicbrainz.org/release-group/cbe55545-7a3e-3f8c-8c5f-33984a818e91), [Apple Music Santana](https://music.apple.com/us/album/santana/871131767), [Santanamigos 1969 chronology](https://www.santanamigos.com/1969.htm).
- Uncertainty: some sources list August 22; use August 1969 if avoiding date conflict.
- Recommendation: supplement Woodstock item.
- Jake note: Santana has never come up with my latin friends or salsa dancing peers or mentors. Not a "strong enough" timeline point

#### 1971-08-26 - Fania All-Stars perform at the Cheetah Club

- Type: performance / recording.
- Review status: APPROVED
- Proposed timeline wording: Fania All-Stars perform at the Cheetah Club, creating the live/film anchor for the salsa explosion.
- Verified claims: Fania dates the performance to August 26, 1971; Fania calls it a transitional moment in salsa history; Fania says the concert was later chronicled in `Our Latin Thing`; Craft says `Live at the Cheetah, Vol. 1` helped define the Fania All-Stars and salsa.
- Sources: [Fania history](https://fania.com/history/), [Craft: Live at the Cheetah Vol. 1](https://craftrecordings.com/products/live-at-the-cheetah-vol-1-180g-lp).
- Uncertainty: album release dates are less cleanly verified than the performance date.
- Recommendation: replace any broad Fania/Cheetah item.

#### 1972 - `Our Latin Thing` turns the Cheetah concert into salsa's defining screen document

- Type: film release.
- Review status: APPROVED
- Proposed timeline wording: `Our Latin Thing` turns the Cheetah concert into salsa's defining screen document.
- Verified claims: Fania history says `Our Latin Thing` was released in 1972; Fania describes it as the full-length feature film documenting the birth of the salsa explosion; the film chronicled the August 26, 1971 Cheetah concert.
- Sources: [Fania history](https://fania.com/history/).
- Uncertainty: exact theatrical/release date not verified.
- Recommendation: supplement the Cheetah performance item.

#### 1974-02-01 - Ruben Blades signs to Fania

- Type: event / person-on-label.
- Review status: APPROVED
- Proposed timeline wording: Ruben Blades signs to Fania during the post-Cheetah expansion.
- Verified claims: Fania's timeline lists Blades as signed on February 1, 1974; Fania artist notes say Blades had worked in Fania's mail department around 1969; Fania notes say Blades brought "El Cantante" to Johnny Pacheco, who passed it to Hector Lavoe and Willie Colon.
- Sources: [Fania history](https://fania.com/history/), [Fania Ruben Blades essentials](https://fania.com/artist-essentials/ruben-blades/).
- Uncertainty: Fania first-of-month dates may be simplified placeholders; still better than year-only unless contradicted.
- Recommendation: supplement the Blades / `Siembra` arc.

#### 1978 - Willie Colon and Ruben Blades release `Siembra`

- Type: release.
- Review status: APPROVED
- Proposed timeline wording: Willie Colon and Ruben Blades release `Siembra`, the commercial and artistic apex of Fania-era salsa.
- Verified claims: Fania calls `Siembra` arguably the finest album released by the Fania empire and says it outsold all other salsa albums of its time; Concord/Craft says it was originally released in 1978 and "changed the history of Latin music"; Concord/Craft describes it as Blades and Colon's second full-length collaboration.
- Sources: [Fania: Siembra](https://fania.com/eras/willie-colon-and-ruben-blades-siembra/), [Concord/Craft Siembra press release](https://mediakits.concord.com/p/siembra/english-press-release.html).
- Uncertainty: some metadata gives September 7, 1978, but official Fania/Craft pages checked here only verify 1978.
- Recommendation: replace broad Blades / `Siembra` item.

#### 1979 - Masucci sells Fania's assets to Valsyn as the original label structure fragments

- Type: event.
- Review status: APPROVED
- Proposed timeline wording: Masucci sells Fania's assets to Valsyn as the original label structure fragments.
- Verified claims: Marisol Negron states that by 1978 Fania was in decline; Masucci sold the catalog in 1979 to Uruguayan company Valsyn; the sale included copyrights, master recordings, publishing rights, manufacturing rights, distribution rights, and exploitation rights; Fania Records and all but one subsidiary ceased operations that year.
- Sources: [Made in NuYoRico excerpt](https://dokumen.pub/made-in-nuyorico-fania-records-latin-music-and-salsas-nuyorican-meanings.html).
- Uncertainty: exact sale date not verified in accessible excerpt.
- Recommendation: replace broad Fania fragmentation item.

#### 1984 - Ruben Blades leaves Fania for Elektra and begins legal action over rights and royalties

- Type: event.
- Review status: APPROVED
- Proposed timeline wording: Ruben Blades leaves Fania for Elektra and begins legal action over rights and royalties.
- Verified claims: Negron states Blades signed with Elektra in 1984; she says Blades filed the first of three lawsuits against Fania-related companies that same year; Billboard's February 4, 1984 issue reported that Musica Latina International brought suit against Blades amid a long-running dispute.
- Sources: [Made in NuYoRico excerpt](https://dokumen.pub/made-in-nuyorico-fania-records-latin-music-and-salsas-nuyorican-meanings.html), [Billboard Feb. 4, 1984](https://www.worldradiohistory.com/Archive-All-Music/Billboard/80s/1984/BB-1984-02-04.pdf).
- Uncertainty: exact filing dates not verified; use 1984 or the Billboard issue date as press-document anchor.
- Recommendation: supplement the Fania fragmentation item with an artist-rights afterlife anchor.

### Media-Visibility Bridge Candidates

#### 1941 - Katherine Dunham's `Carnival of Rhythm` circulates Afro-Caribbean dance through Hollywood short film

- Type: film release / dance-media bridge.
- Review status: LEDGER ONLY
- Proposed timeline wording: Katherine Dunham's Warner Bros. short `Carnival of Rhythm` brings Afro-Caribbean and Latin American-derived concert dance into Hollywood short-film circulation.
- Verified claims: Library of Congress dates Dunham's `Carnival of Rhythm` to 1941; Dunham's company was built around ethnographic study and performance of African diasporic and Caribbean movement; the film is a concrete media artifact before the mambo boom.
- Sources: [Library of Congress Katherine Dunham timeline](https://www.loc.gov/collections/katherine-dunham/articles-and-essays/katherine-dunham-timeline/), [Katherine Dunham filmography](https://www.dunhamcertification.org/katherine-dunham-filmography).
- Uncertainty: this is roots/media prehistory rather than a direct salsa or mambo item.
- Recommendation: add only if the timeline wants a media-visibility precursor before mambo.
- Jake note: I'd have to "tie this in" to salsa pretty directly if this were to make the timeline.
- Coordinator note: researched tie-in remains indirect; preserve as roots/media context rather than a public timeline item.

#### 1954-09-14 - Arthur Murray television show features a coast-to-coast mambo segment

- Type: broadcast / dance instruction.
- Review status: APPROVED
- Proposed timeline wording: Arthur Murray's national television dance brand gives mambo a coast-to-coast teaching segment, turning a nightclub dance craze into living-room instruction.
- Verified claims: `Cash Box` magazine reported that Arthur Murray's TV show devoted fifteen minutes to mambo on September 14, 1954; the segment was framed as coast-to-coast television exposure; the item documents mambo's translation into mainstream U.S. dance pedagogy.
- Sources: [Cash Box, September 18, 1954](https://www.worldradiohistory.com/Archive-All-Music/Cash-Box/50s/1954/CB-1954-09-18.pdf).
- Uncertainty: source is a trade-publication report rather than surviving broadcast footage.
- Recommendation: strong media-visibility candidate because it is specific, dated, and nationally framed.

#### 1954-10-22 - `Mambo USA` debuts at Carnegie Hall

- Type: concert / touring-media package.
- Review status: APPROVED
- Proposed timeline wording: `Mambo USA` debuts at Carnegie Hall, packaging Palladium-era mambo bands and dancers for national concert audiences.
- Verified claims: Carnegie Hall materials date the `Mambo USA` debut to October 22, 1954; contemporary trade coverage promoted the show as a mambo stage package; the event points to mambo moving from New York club culture into prestige concert and touring circuits.
- Sources: [Carnegie Hall Latin America press kit](https://www.carnegiehall.org/uploadedFiles/Resources_and_Components/PDF/Press/UPDATED%20Complete%20Voices%20from%20Latin%20America%20Press%20Kit.pdf), [Billboard, September 4, 1954](https://www.worldradiohistory.com/Archive-All-Music/Billboard/50s/1954/Billboard%201954-09-04.pdf), [Cash Box, November 6, 1954](https://www.worldradiohistory.com/Archive-All-Music/Cash-Box/50s/1954/CB-1954-11-06.pdf).
- Uncertainty: public card should avoid implying this was the first mambo concert unless that claim is separately verified.
- Recommendation: strong bridge candidate; pairs well with Palladium and Arthur Murray items.
- Jake note: found a bunch of seemingly great notes about this online, here's a summary:
  - The Debut of a Legend: The concert marked the official Carnegie Hall debut of the legendary Cuban bandleader and singer, Machito (Francisco Raúl Gutiérrez Grillo). His 18-piece orchestra anchored the musical performances for the evening.
  - A Massive Nationwide Undertaking: Designed to give Latin musicians unprecedented mainstream exposure, the "Mambo USA" tour traveled through over 50 major U.S. cities and featured a traveling bill of more than 40 top-tier artists, big bands, and dancers.
  - Cultural Blueprint: This ambitious caravan predated similar, highly publicized package tours—like Berry Gordy's Motown Revue and Dick Clark’s Caravan of Stars—by nearly a decade.
  - The concert solidified mambo's transition from New York City's localized ballroom scene (such as the famed Palladium Ballroom) into a true nationwide cultural phenomenon.

#### 1955 - Perez Prado's "Cherry Pink and Apple Blossom White" becomes a major crossover hit

- Type: recording / film crossover.
- Review status: APPROVED
- Proposed timeline wording: Perez Prado's "Cherry Pink and Apple Blossom White" carries mambo-associated orchestral sound into pop charts and Hollywood soundtrack circulation.
- Verified claims: the recording is tied to the 1955 film `Underwater!`; Official Charts lists UK chart activity beginning March 31, 1955; secondary music histories note the record's major U.S. pop success.
- Sources: [Official Charts](https://www.officialcharts.com/songs/perez-prez-prado-and-his-orchestra-cherry-pink-and-apple-blossom-white/), [Donald Clarke Music Box: Perez Prado](https://www.donaldclarkemusicbox.com/encyclopedia/detail.php?s=2741), [`Underwater!` overview](https://browse.zim.carpocratian.org/content/wikipedia_en_all_maxi_2022-05/A/Underwater%21).
- Uncertainty: exact U.S. release and chart dates need stronger primary support; musically this is more mambo/pop crossover than salsa lineage.
- Recommendation: use as a media-visibility bridge only if pop crossover belongs in the public timeline.

#### 1972-07 - `Our Latin Thing` release/review cycle makes salsa visually legible

- Type: film release / reception anchor.
- Review status: APPROVED
- Proposed timeline wording: `Our Latin Thing` brings the Cheetah concert and Nuyorican salsa scene to film audiences, making salsa a visual culture as well as a club and record phenomenon.
- Verified claims: Fania dates the film to 1972; MoMA identifies `Our Latin Thing` as Leon Gast's film about the Fania All-Stars and the Cheetah concert; research notes found New York release/review activity in July 1972.
- Sources: [MoMA: Our Latin Thing](https://www.moma.org/calendar/events/11583), [Fania history](https://fania.com/history/).
- Uncertainty: exact opening date should be pinned before a final public card uses a day-level date.
- Recommendation: strengthen or replace the existing `1972` film item if media visibility is a priority.

#### 1973-08-24 - Fania All-Stars perform at Yankee Stadium

- Type: concert / filmed recording.
- Review status: APPROVED
- Proposed timeline wording: Fania All-Stars bring salsa to Yankee Stadium, turning the label's club-born supergroup into a stadium-scale spectacle captured for later records and film.
- Verified claims: the Library of Congress essay dates the historic Yankee Stadium concert to August 24, 1973; the essay frames the event as a major salsa milestone; Fania's own history also dates a Yankee Stadium performance to August 1973.
- Sources: [Library of Congress: Live at Yankee Stadium essay](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/FaniaAllStars.pdf), [Fania history](https://fania.com/history/), [Concord: Live at Yankee Stadium](https://concord.com/concord-albums/fania-all-stars-live-at-yankee-stadium/).
- Uncertainty: some sources use August 23 and others August 24; verify before final timeline implementation.
- Recommendation: strong media-visibility item, but avoid duplicating the existing Cheetah/Fania All-Stars card.

#### 1975-03-08 - Fania All-Stars appear on `Don Kirshner's Rock Concert`

- Type: national television broadcast.
- Review status: APPROVED
- Proposed timeline wording: Fania All-Stars appear on `Don Kirshner's Rock Concert`, giving salsa one of its clearest shots at a national U.S. pop/rock television audience.
- Verified claims: `Billboard` reported the Fania All-Stars appearance in its March 8, 1975 issue; the item framed the booking as a major exposure opportunity for salsa; the show targeted a broad pop/rock audience rather than only Latin music listeners.
- Sources: [Billboard, March 8, 1975](https://www.worldradiohistory.com/Archive-All-Music/Billboard/70s/1975/Billboard%201975-03-08.pdf).
- Uncertainty: confirm whether March 8 is the broadcast date or issue/report date before day-level public use.
- Recommendation: one of the strongest pure media-visibility candidates.

#### 2000-09-13 - First Latin Grammy Awards airs with salsa categories and winners

- Type: awards broadcast / institutional media.
- Review status: APPROVED
- Proposed timeline wording: The first Latin Grammy Awards airs, placing salsa inside a U.S. televised Latin music institution with categories and winners visible beyond the salsa circuit.
- Verified claims: the 1st Annual Latin Grammy Awards were held on September 13, 2000; the Latin Grammy winners archive includes salsa-specific recognition; contemporary coverage lists winners including Celia Cruz and Marc Anthony.
- Sources: [Latin Grammy winners archive](https://www.latingrammy.com/en/awards/1st-annual-latin-grammy-awards-2000/), [CBS News winners list](https://www.cbsnews.com/news/the-latin-grammy-winners/), [Grammy: Celia Cruz](https://www.grammy.com/artists/celia-cruz/1461/).
- Uncertainty: this is institutional visibility rather than a musical turning point; best suited if the timeline extends into recognition and canonization.
- Recommendation: add as a later media/institutional endpoint if post-Fania salsa visibility belongs in scope.

## Background Research Dossiers

These older dossiers preserve the broader research context. Treat their background date/range fields as context only; use the specific candidate timeline items above for approval/rejection.

## Researcher A - Afro-Cuban Jazz Bridge

### Mario Bauza In Harlem

Proposed title: Mario Bauza in Harlem: Chick Webb, the Savoy, and the Jazz-Cuba Bridge

Background date/range: 1930-1939, with core emphasis on 1933-1938.

Verified claims:

- Mario Bauza returned to New York in 1930 and worked in Cuban ensembles and Black swing-band networks before his later Afro-Cuban jazz work.
- By the mid-1930s, Bauza was associated with Chick Webb's orchestra; Smithsonian's jazz anthology notes him as Webb's musical director by 1936.
- Chick Webb's band was strongly tied to Harlem's Savoy Ballroom, a major swing-era dance venue.
- Bauza's work with Chick Webb and later Cab Calloway placed him directly inside Harlem jazz circles before he helped shape Afro-Cuban jazz.
- Bauza is a credible bridge figure because he moved between Cuban dance music, Harlem swing, big-band arranging, and the Dizzy Gillespie / Chano Pozo pathway.

Uncertainty/conflict notes:

- Ella Fitzgerald's path into Chick Webb's band is told differently across sources. Smithsonian credits Bauza with bringing her into the band; Library of Congress accounts emphasize Webb, Harlem amateur-night networks, and unnamed musicians. Public copy should say Bauza is "often credited" or avoid making him the sole discoverer.
- Dates vary slightly: some sources place Bauza with Webb from 1933; Smithsonian phrasing highlights his role by 1936.
- "Bridge figure" is interpretive framing, but strongly supported by his documented career path.

Sources:

- [Smithsonian Folkways, Jazz: The Smithsonian Anthology](https://folkways-media.si.edu/docs/folkways/artwork/SFW40820.pdf)
- [Library of Congress, "Chick and Satchmo on the Air"](https://blogs.loc.gov/now-see-hear/2024/02/chick-webb-on-nbc/)
- [Library of Congress, "'First Lady of Song'"](https://www.loc.gov/loc/lcib/9708/ella.html)
- [NYPL, "Spanish Harlem's Contribution to Jazz"](https://www.nypl.org/blog/2020/09/02/spanish-harlems-contribution-jazz)
- [Encyclopedia.com, "Bauza, Mario"](https://www.encyclopedia.com/humanities/encyclopedias-almanacs-transcripts-and-maps/bauza-mario-1911-1993)

Existing repo placement suggestion:

- Add to a new bridge chapter between `data/timeline-cuba.ts` and `data/timeline-ny.ts`, likely `data/timeline-bridges.ts`.
- If avoiding a new chapter, merge as a late Cuba card after charanga/mambo material, though the setting and meaning are Harlem-centered.

Suggested candidate timeline item summary:

Before "salsa" became a New York identity, Mario Bauza was already moving between Havana-trained musicianship and Harlem swing. His years around Chick Webb, the Savoy Ballroom, and Cab Calloway made him a living bridge between Cuban rhythm, Black big-band jazz, and the Afro-Cuban jazz experiments that followed.

Notes that should stay ledger-only:

- Do not state flatly that Bauza "discovered" Ella Fitzgerald unless phrased as contested or attributed.
- Avoid discographical minutiae about exact Webb personnel years.
- Keep wage-dispute / management-conflict details out of candidate timeline items unless a deeper biography panel is added.

### Machito, Mario Bauza, La Conga, And "Tanga"

Proposed title: Machito, Mario Bauza, La Conga, and "Tanga": Afro-Cuban Jazz Takes Shape

Background date/range: 1940-1945, with "Tanga" centered on 1943 and recording-date caveats.

Verified claims:

- Machito, also known as Frank Grillo, formed Machito and his Afro-Cubans in New York around 1940.
- Mario Bauza became Machito's musical director in the early 1940s and helped shape the band's arranging concept.
- The Afro-Cubans are credited by Library of Congress with blending Afro-Cuban rhythms, improvisation, and big-band jazz into a legacy connected to Latin jazz, salsa, Afro-Cuban jazz, and cubop.
- Smithsonian / NMAAHC sources describe Machito and the Afro-Cubans as important for consistently mixing Afro-Cuban and jazz rhythms and standardizing timbales, congas, and bongo in Latin jazz percussion.
- "Tanga," composed by Bauza and performed by Machito and the Afro-Cubans, is widely treated as an early or first landmark Afro-Cuban jazz composition.

Uncertainty/conflict notes:

- "Tanga" has date conflicts across sources: Smithsonian's Latin Jazz timeline says the Afro-Cubans recorded the classic in 1945; NMAAHC says they recorded it in 1943; Smithsonian Folkways liner notes say it was first publicly performed in 1943 and cite a later 1948/1949 recording in one anthology context.
- La Conga Club chronology varies by source. Use cautious phrasing: "early-1940s La Conga engagement" rather than a single definitive debut date unless following one chosen source.
- "First Afro-Cuban jazz recording/composition" should be phrased as "widely considered" or "often cited," since sources differ between composition, public performance, and recording.

Sources:

- [Library of Congress finding aid, Music of Machito and his Afro-Cubans](https://findingaids.loc.gov/repositories/15/resources/1485)
- [Library of Congress, "Let's Mambo!: Machito and His Afro-Cubans"](https://blogs.loc.gov/music/2020/03/lets-mambo-machito-and-his-afro-cubans/)
- [Smithsonian NMAAHC, "Frank 'Machito' Grillo"](https://nmaahc.si.edu/latinx/frank-machito-grillo)
- [Smithsonian NMAAHC, "Harmonious Mixes"](https://nmaahc.si.edu/explore/stories/harmonious-mixes)
- [Smithsonian Folkways, Latin Jazz: La combinacion perfecta liner notes](https://folkways-media.si.edu/docs/folkways/artwork/SFW40802.pdf)
- [Smithsonian Folkways, Jazz: The Smithsonian Anthology](https://folkways-media.si.edu/docs/folkways/artwork/SFW40820.pdf)

Existing repo placement suggestion:

- Best fit: new bridge chapter after `data/timeline-cuba.ts`, before `data/timeline-ny.ts`.
- If merged into existing data, place near the end of `data/timeline-cuba.ts` as a Cuba-in-New-York bridge card, not in the 1960s NYC chapter.

Suggested candidate timeline item summary:

Machito and Mario Bauza turned Cuban dance rhythm and New York big-band jazz into a new orchestral language. At La Conga and other New York stages, the Afro-Cubans made congas, bongo, timbales, jazz voicings, and clave-based riffs speak as one. "Tanga" became the landmark proof of concept.

Notes that should stay ledger-only:

- "Tanga" title meaning/slang should stay out of candidate timeline item copy unless the site has an adult/annotation mode.
- Keep exact recording-date conflict in the research ledger; candidate timeline item can say "first performed in 1943" or "early 1940s landmark," depending on chosen source policy.
- Do not oversimplify Machito as only a vocalist/frontman; preserve his maracas/frontman role and Bauza's arranging/music-director role.

### Dizzy Gillespie + Chano Pozo / "Manteca"

Proposed title: Dizzy Gillespie + Chano Pozo: "Manteca" and Cubop

Background date/range: 1947-1948, with "Manteca" recorded December 22, 1947.

Verified claims:

- Mario Bauza introduced Dizzy Gillespie to Cuban percussionist Luciano "Chano" Pozo.
- Gillespie added Pozo to his band in 1947; Smithsonian's timeline places Gillespie and Pozo together at Carnegie Hall that year.
- "Manteca" was a collaboration among Dizzy Gillespie, Chano Pozo, and arranger Gil Fuller.
- Library of Congress states that Pozo brought the core rhythmic/riff idea, Gillespie added a bridge, and Fuller rounded out the piece.
- "Manteca" was first recorded on December 22, 1947 and later became a jazz standard and defining Latin-jazz / Cubop milestone.

Uncertainty/conflict notes:

- Some short histories compress "Manteca" into a Dizzy-and-Chano collaboration; fuller sources credit Gil Fuller as essential arranger/co-writer.
- "Cubop" is historically useful but may need a definition for public readers: bebop vocabulary fused with Afro-Cuban rhythm, especially clave/conga-driven structures.
- Public copy should avoid making "Manteca" the single birth of Latin jazz; better: "a defining milestone after Machito/Bauza's earlier groundwork."

Sources:

- [Library of Congress National Recording Registry essay, "Manteca"](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/Manteca.pdf)
- [Smithsonian, "Conga drums and collaboration"](https://americanhistory.si.edu/explore/stories/conga-drums-and-collaboration-peek-inside-our-afro-cuban-jazz-concerts)
- [Smithsonian Latin Jazz timeline](https://americanhistory.si.edu/explore/projects/smithsonian-jazz/collections-and-archives/latin-jazz/timeline)
- [Smithsonian Folkways, Latin Jazz: La combinacion perfecta liner notes](https://folkways-media.si.edu/docs/folkways/artwork/SFW40802.pdf)
- [Smithsonian Folkways, Jazz: The Smithsonian Anthology](https://folkways-media.si.edu/docs/folkways/artwork/SFW40820.pdf)

Existing repo placement suggestion:

- Place in the same new bridge chapter after the Machito/Bauza/"Tanga" card and before `data/timeline-ny.ts`'s boogaloo/Fania sequence.
- Do not merge into `data/timeline-cuba.ts` unless the project refuses a bridge chapter, because this is specifically a New York bebop/Afro-Cuban encounter.

Suggested candidate timeline item summary:

When Dizzy Gillespie brought Chano Pozo into his band, bebop met Afro-Cuban percussion at full force. "Manteca" turned Pozo's rhythmic ideas, Gillespie's bridge, and Gil Fuller's arranging into a Cubop anthem, proving that clave, conga, and bebop horns could drive the same modern jazz engine.

Notes that should stay ledger-only:

- Chano Pozo's violent death and drug-dispute details should stay ledger-only unless a separate biography card requires them.
- Keep authorship nuance in the ledger: Pozo's riff/rhythm concept, Gillespie's bridge, Fuller's arranging/compositional role.
- Avoid implying salsa descends directly from "Manteca"; frame it as a jazz bridge that influenced the New York Latin-music environment.

## Researcher B - Mambo Social World

### Palladium Mambo And The Big Three

Proposed title: The Palladium: Mambo's New York Furnace

Background date/range: 1947-1966, with peak mambo visibility in the 1950s.

Verified claims:

- The Palladium Ballroom at 1698 Broadway and 53rd Street became a central New York venue for Latin dance music after beginning Latin programming in 1947 and expanding to multiple Latin nights.
- The Palladium was widely known as the "Home of the Mambo," a phrase also used in Library of Congress material on Tito Puente.
- The core Big Three orchestras associated with Palladium mambo were Machito, Tito Puente, and Tito Rodriguez.
- The venue's importance was both musical and social: it drew mixed audiences across race, ethnicity, class, and celebrity status, with dancing ability central to status inside the room.
- The Palladium's dance culture included contests and professional shows; "Killer Joe" Piro is sourceable as host/teacher, and Augie and Margo Rodriguez are sourceable as star dancers.

Uncertainty/conflict notes:

- "Birthplace of modern Latin dancing" and "co-created mambo music and dance" language appears in dance-history sources but should be softened for public copy: better say "a defining New York incubator."
- Palladium-era dancer lineages are contested; avoid ranking dancers or naming a single "inventor" of New York mambo.
- Cuban Pete, Millie Donay, Freddy Rios, Mike Ramos, and others are important, but use only in deeper ledger or modal copy unless backed by stable sources.

Sources:

- [Library of Congress, Dance Mania / Tito Puente essay](https://www.loc.gov/static/programs/national-recording-preservation-board/documents/DanceMania.pdf)
- [National Park Service, "Salsa Is More Than Salsa"](https://www.nps.gov/articles/000/salsa-is-more-than-salsa.htm)
- [PBS / WGBH, Latin Music USA viewing guide](https://www-tc.pbs.org/wgbh/latinmusicusa/pdf/latinmusicusa_viewingguide_en.pdf)
- [Cambridge Core, "Rock-a-Cha-Cha"](https://www.cambridge.org/core/journals/twentieth-century-music/article/rockachacha-the-erased-impact-of-latin-american-music-on-the-rhythmic-transformation-of-us-popular-music/BA5E9B6BAA6C542FB533102A725A5DA8)
- [Palladium Era Mambo Dancers Project, "Palladium Ballroom"](https://www.palladium-mambo.com/ballroom.shtml)
- [Sydney Hutchinson, "Mambo On 2," Centro Journal](https://www.redalyc.org/pdf/377/37716209.pdf)

Existing repo placement suggestion:

- Add as a new opening card in `data/timeline-ny.ts`, before the current `nyc-1` boogaloo card.
- Suggested id: `nyc-palladium-mambo`.
- Use `accent: 'nyc'` and likely `rhythmicProfileId: 'nyc-mambo'`.

Suggested candidate timeline item summary:

The Palladium Ballroom turned mambo into a New York institution. In the 1950s, dancers packed the room for the Big Three orchestras: Machito, Tito Puente, and Tito Rodriguez. The venue helped transform Afro-Cuban dance music into a citywide, interracial, high-style social scene that later salsa would inherit.

Ledger-only notes:

- Keep drug-raid/liquor-license details out of the candidate timeline item unless building a deeper venue-decline ledger.
- Keep claims about "inventing" On2 or salsa out of the card; frame Palladium as a foundation, not a single origin point.
- Dancer list can be expanded in a ledger: Killer Joe Piro, Augie and Margo Rodriguez, Cuban Pete, Millie Donay, Mambo Aces, Freddy Rios, Mike Ramos, Carmen Cruz.

### Cha-Cha-Cha, Mambo Accessibility, And Mambo Decline Context

Proposed title: Cha-Cha-Cha: The Friendlier Mambo Doorway

Background date/range: early-mid 1950s; mass U.S. popularity by mid-1950s.

Verified claims:

- Cha-cha-cha emerged from the Cuban danzon / danzon-mambo lineage in the early 1950s.
- Enrique Jorrin is the central composer/bandleader associated with the genre's early formation.
- PBS describes mambo as fast-paced and Palladium-centered, and says mambo eventually gave way to the slower, easier-to-dance cha-cha-cha.
- NPS describes cha-cha-cha as a triple-step dance emerging in Cuba to accompany mambo, danzon, and danzonete.
- Arthur Murray-linked dance literature supports the "accessibility" angle: cha-cha was marketed and taught as easier for broad social dancers than mambo.

Uncertainty/conflict notes:

- The "cha-cha was invented because dancers struggled with mambo syncopation" story is common and plausible, but institutional sources often state it more generally. Use as a ledger note or phrase cautiously: "often explained as..."
- Dates vary: sources point to c.1952, 1953-54, or early 1950s. Candidate timeline item should use "early 1950s."
- "Mambo decline" should not imply disappearance. Mambo persisted in bands, dancers, and later salsa/On2 vocabularies; the decline is about mainstream craze status and big-band format.

Sources:

- [PBS / WGBH, Latin Music USA viewing guide](https://www-tc.pbs.org/wgbh/latinmusicusa/pdf/latinmusicusa_viewingguide_en.pdf)
- [National Park Service, "Salsa Is More Than Salsa"](https://www.nps.gov/articles/000/salsa-is-more-than-salsa.htm)
- [Oxford Academic, Danzon: Circum-Caribbean Dialogues in Music and Dance](https://academic.oup.com/book/9698)
- [Encyclopedia.com / Concise Oxford Dictionary of Music, "cha cha cha"](https://www.encyclopedia.com/arts/dictionaries-thesauruses-pictures-and-press-releases/cha-cha-cha)
- [Arthur Murray paper on dance history](https://archives.dance/wp-content/uploads/2014/02/Arthur-Murrays-Paper-on-History-of-Dances-USA.pdf)
- [Latino Public Broadcasting, Latin Music USA](https://lpbp.org/programs/latin-music-usa/)

Existing repo placement suggestion:

- Strengthen the existing `cuba-cha-cha` card in `data/timeline-cuba.ts`.
- Add decline/accessibility context to the existing public body or create a short companion card immediately after it.
- Suggested companion id if split: `cuba-cha-cha-accessibility`.

Suggested candidate timeline item summary:

Cha-cha-cha made Cuban dance music easier for mass social floors without breaking from mambo's world. Its clearer triple-step feel gave casual dancers a way into Afro-Cuban rhythm just as mambo's fast, athletic craze began losing mainstream dominance.

Ledger-only notes:

- Keep Arthur Murray details mostly ledger-only unless the site wants a dance-studios and mass-teaching sidebar.
- Avoid saying cha-cha "killed" mambo. Better: "helped redirect mainstream dance attention."
- Note that rock and roll, smaller-band economics, pachanga/boogaloo, and changing youth tastes also shaped mambo's decline.

### Desi Arnaz / I Love Lucy And Latin Culture In American Living Rooms

Proposed title: Ricky Ricardo Brings Latin Sound To Prime-Time America

Background date/range: 1951-1957 for `I Love Lucy`; Desi's conga popularization begins earlier, especially 1937-1940.

Verified claims:

- `I Love Lucy` premiered on CBS in October 1951, with Desi Arnaz playing Cuban bandleader Ricky Ricardo.
- Arnaz had already built a music career before the show, including popularizing conga-line performance in Miami and touring with / after Xavier Cugat.
- PBS notes CBS resistance to casting Arnaz as Ball's TV husband because he was Cuban; the couple's live road act helped prove audience acceptance.
- Academic media history identifies `I Love Lucy` as an early landmark for Cuban American / Latino visibility on U.S. television.
- PBS `Pioneers of Television` frames Arnaz as one of the highest-profile Latinos in American television and notes that the show worked to avoid reducing Ricky entirely to stereotype, though accent humor remained part of the comedy.

Uncertainty/conflict notes:

- "Latin culture in American living rooms" is a good public-facing framing, but should be nuanced: the show presented nightclub Latin music, Cuban identity, accent comedy, and a mixed marriage through a 1950s sitcom filter.
- Avoid overstating authenticity. Arnaz's TV Latinness was mediated for mainstream U.S. audiences and sometimes generalized beyond specifically Cuban culture.
- The show is relevant as cultural transmission and visibility, not as a direct musical ancestor of salsa.

Sources:

- [PBS American Experience, "Why We Still Love Lucy"](https://www.pbs.org/wgbh/americanexperience/features/why-we-still-love-lucy/)
- [PBS American Masters, "5 ways I Love Lucy transformed television"](https://www.pbs.org/wnet/americanmasters/5-ways-i-love-lucy-transformed-television-history/19407/)
- [PBS Pioneers of Television, "Breaking Barriers"](https://www.pbs.org/video/breaking-barriers-iwXAWF/)
- [Library of Congress, I Love Lucy: An American Legend](https://www.loc.gov/exhibits/i-love-lucy/)
- [University of Georgia Pressbooks, "The Cuban American Experience in Media"](https://open.online.uga.edu/latinxmedia/chapter/61/)
- [Smithsonian Magazine, Desi Arnaz historical marker article](https://www.smithsonianmag.com/travel/desi-arnaz-is-getting-a-much-deserved-historical-marker-in-miami-beach-180985093/)

Existing repo placement suggestion:

- Add as a contextual mainstream-media bridge card in `data/timeline-cuba.ts` after `cuba-cha-cha` or near the mambo/Latin jazz section only if Jake wants media visibility in the main rail.
- If the project later adds a U.S. mainstream chapter, this belongs there rather than in the core music-evolution rail.
- Suggested id: `cuba-desi-arnaz-tv`.

Suggested candidate timeline item summary:

Before many Americans encountered mambo or cha-cha-cha in a club, they met a version of Latin music at home through Desi Arnaz. As Ricky Ricardo on `I Love Lucy`, Arnaz made the Cuban bandleader a prime-time figure and carried Latin nightclub sound into the American living room.

Ledger-only notes:

- Keep stereotype/assimilation nuance in ledger or expandable notes, not the candidate timeline item headline.
- Note that Ricky Ricardo's repertoire was not a clean salsa-history line; it is a media-visibility bridge.
- Keep "interracial marriage" phrasing careful: Cuban/Latino racial classification in 1950s U.S. media is historically complex.

## Researcher C - NYC Salsa Revolution

### Boogaloo As Nuyorican Bridge

Proposed title: Boogaloo: The Nuyorican Bridge From Mambo To Salsa

Background date/range: c. 1965-1968, with afterlife into early 1970s salsa.

Verified claims:

- Latin boogaloo fused Cuban son/mambo-derived Latin dance language with pop, soul, R&B, and other African American formats in New York.
- Fania describes boogaloo as a "quintessential New York genre" created by Latin barrio musicians, many of Puerto Rican origin.
- Pete Rodriguez, Joe Cuba, Ricardo Ray, Ray Barretto, Johnny Colon, Joe Bataan, and others are repeatedly named as central boogaloo-era figures.
- Fania explicitly frames boogaloo as a musical bridge between mambo and 1970s salsa.
- PBS/America ReFramed presents boogaloo as both wildly successful and contested by older Latin-music gatekeepers, with disagreement over whether it "ran its course" or was pushed aside.

Uncertainty/conflict notes:

- "First Nuyorican music" is useful but should be attributed, not stated as universal consensus.
- The decline of boogaloo has competing explanations: short hit cycle, industry resistance/blacklisting, generational politics, and Fania's later salsa-market consolidation.
- Avoid implying salsa simply "replaced" boogaloo naturally; the transition was cultural, commercial, and contested.

Sources:

- [Fania Records: Boogaloo Blues](https://fania.com/record/boogaloo-blues/)
- [Fania Records: I Like It Like That](https://fania.com/record/i-like-it-like-that/)
- [PBS / America ReFramed: We Like It Like That transcript](https://www.pbs.org/video/america-reframed-we-it/)
- [PBS Latin Music USA viewing guide](https://www-tc.pbs.org/wgbh/latinmusicusa/pdf/latinmusicusa_viewingguide_en.pdf)
- [Oxford Academic: "Boogaloo Soul" chapter abstract](https://academic.oup.com/book/6051/chapter-abstract/149485363)
- [Marisol Negron, Made in NuYoRico excerpt](https://assets-us-01.kc-usercontent.com/f7ca9afb-82c2-002a-a423-84e111d5b498/56d7da76-9547-4888-917d-6633469f47b9/978-1-4780-3089-8_601.pdf)

Existing repo placement suggestion:

- Tighten existing `nyc-1` in `data/timeline-ny.ts`.
- Keep it before the Fania Records founding/industry step.
- Add ledger/source notes for the contested decline rather than surfacing all of that on the candidate timeline item.

Suggested candidate timeline item summary:

Boogaloo was the 1960s Nuyorican crossover moment: Latin percussion and mambo/son roots met R&B hooks, bilingual street choruses, and young barrio identity. It proved New York Latin music could sound contemporary, urban, and club-ready, setting up the salsa explosion that followed.

Notes that should stay ledger-only:

- Blacklisting/industry suppression claims from PBS transcript.
- "Assassinated" rhetoric around boogaloo's decline.
- Any claim that Fania intentionally killed boogaloo unless carefully attributed.
- "First Nuyorican music" unless framed as a cited interpretation.

### Willie Colon + Hector Lavoe / El Malo

Proposed title: El Malo: Colon, Lavoe, Trombones, And The Bad-Boy Salsa Image

Background date/range: 1967-early 1970s.

Verified claims:

- Johnny Pacheco brought Hector Lavoe in to sing lead vocals on Willie Colon's 1967 Fania debut, `El Malo`.
- Fania describes `El Malo` as raw, unorthodox, and trombone-heavy, initially perceived near the Latin soul/boogaloo/shing-a-ling craze.
- By `The Hustler`, Fania frames Colon and Lavoe as one of salsa's great duos and says that session shaped both men's stylistic direction.
- `Cosa Nuestra` continued the underworld visual language, with Fania describing its cover as a mafia/crime-scene image.
- Fania describes Colon's late-1960s band fame as resting partly on "revolutionary trombones" and Lavoe's refined, sentimental vocals.

Uncertainty/conflict notes:

- `El Malo` date appears consistently as 1967 in Fania materials, but exact release-day claims vary in secondary sources; use "1967" unless the repo needs a precise date.
- "Gangster imagery" should be handled as performative/satirical branding, not literal criminal biography.
- "El Malo" nickname origin has anecdotal/legend status; Fania's compilation note frames it as legend tied to older musicians mocking Colon's trombone range.

Sources:

- [Fania Records: The Hustler](https://fania.com/record/the-hustler/)
- [Fania Records: Guisando](https://fania.com/record/guisando/)
- [Fania Records: Cosa Nuestra](https://fania.com/record/cosa-nuestra/)
- [Fania Records: La Voz](https://fania.com/record/la-voz/)
- [Fania Records: Willie Colon artist essentials](https://fania.com/artist-essentials/willie-colon/)
- [Marisol Negron, Made in NuYoRico, chapter excerpt](https://dokumen.pub/made-in-nuyorico-fania-records-latin-music-and-salsas-nuyorican-meanings.html)

Existing repo placement suggestion:

- Add a dedicated NYC step in `data/timeline-ny.ts` between existing `nyc-1` Boogaloo and `nyc-2` Fania Records, or expand `nyc-2` if avoiding a new step.
- The repo already uses Colon/Lavoe imagery for the Fania step; this material probably deserves its own card because it explains sound, image, and youth identity more clearly than a label-history card can.

Suggested candidate timeline item summary:

With `El Malo`, Willie Colon and Hector Lavoe gave New York salsa a sharper street edge: rough trombone lines, barrio swagger, crime-film cover imagery, and Lavoe's agile sonero voice. The result was not just a sound, but a visual identity for young Nuyorican salsa.

Notes that should stay ledger-only:

- FBI-related cover intervention around `La Gran Fuga` / `The Big Break` unless sourced and contextualized carefully.
- Detailed violence/criminality readings of the image.
- Lavoe's later addiction, illness, and death unless the page has a separate biography mode.
- Any "original gangster" phrasing unless explicitly presented as album-cover persona.

### Fania All-Stars At The Cheetah

Proposed title: August 26, 1971: Fania All-Stars Turn Salsa Into Spectacle

Background date/range: August 26, 1971; film/album afterlife in 1972 and beyond.

Verified claims:

- The Fania All-Stars performed live at New York's Cheetah Club on August 26, 1971.
- Fania calls the Cheetah performance a transitional moment in salsa history.
- The concert was filmed and recorded live; Fania's `Our Latin Thing` documentary later chronicled the salsa explosion around that Cheetah concert.
- Craft Recordings identifies `Live at the Cheetah, Vol. 1` as recorded that night and lists "Descarga Fania," "Anacaona," and "Quitate Tu" among the live tracks.
- Fania's artist page says the 1971 Cheetah concert "revolutionized salsa as a genre."

Uncertainty/conflict notes:

- Avoid "birth of salsa" language. The concert did not create salsa from nothing; it packaged, staged, filmed, and exported an already developing New York scene.
- "Defined the genre" is label language; good for impact, but candidate timeline item should use "helped define" or "crystallized."
- Exact personnel can vary depending on whether citing the concert, the album release, or broader All-Stars roster.

Sources:

- [Fania Records: History](https://fania.com/history/)
- [Fania Records: Fania All Stars artist page](https://fania.com/artist/fania-all-stars/)
- [Craft Recordings: Live At The Cheetah, Vol. 1](https://craftrecordings.com/products/live-at-the-cheetah-vol-1-180g-lp)
- [Craft Recordings: 50th Anniversary Live At The Cheetah article](https://craftrecordings.com/blogs/news/50th-anniversary-edition-of-fania-live-at-the-cheetah-vol-1)
- [Marisol Negron, Made in NuYoRico on JSTOR](https://www.jstor.org/stable/jj.19092165)

Existing repo placement suggestion:

- Keep and source-tighten existing `nyc-3` in `data/timeline-ny.ts`.
- Add source notes and consider changing public phrasing from "salsa as spectacle" to "salsa becomes a filmed movement" or "salsa on the world stage."
- Good fit for a candidate timeline item plus a ledger note explaining why "birth of salsa" is too strong.

Suggested candidate timeline item summary:

At the Cheetah Club on August 26, 1971, the Fania All-Stars turned New York salsa into a filmed, recorded, exportable spectacle: descarga energy, stacked vocalists, hard percussion, and a crowd that made the movement visible.

Notes that should stay ledger-only:

- "Birth of salsa" correction.
- Label-marketing language versus historical causality.
- Personnel uncertainty unless the implementation has a separate verified roster field.
- Distinction between the concert date, album releases, and `Our Latin Thing` release.

### Ruben Blades, Siembra, And Fania Fragmentation

Proposed title: Siembra: Salsa Consciente At Fania's Peak And Turning Point

Background date/range: 1978-early 1980s; Fania slowdown through the 1980s.

Verified claims:

- `Siembra` was released in 1978 as the second of four Fania collaborations between Willie Colon and Ruben Blades.
- Fania describes `Siembra` as arguably the finest album of the Fania musical empire and says it outsold other salsa albums of its time, with millions sold worldwide.
- Craft Recordings says nearly every song on `Siembra` became a hit at one time or another in the U.S. and Latin America.
- Fania frames Blades' songbook as salsa's coming of age: music that could make listeners "dance and think."
- Fania's own history says its growth slowed in the 1980s amid salsa romantica and merengue, while an academic salsa study notes Fania lost much of its market dominance during the 1980s.

Uncertainty/conflict notes:

- "Best-selling salsa album of all time" is common in Fania/Craft/artist materials, but exact sales totals vary wildly in secondary sources; avoid hard numbers unless separately verified.
- "Fania fragmentation" is better framed as market fragmentation/slowdown/loss of dominance, not a single collapse.
- Blades' departure/contract conflict should be ledger-only unless the page has room for business-history nuance.

Sources:

- [Fania Records: Willie Colon and Ruben Blades, Siembra](https://fania.com/eras/willie-colon-and-ruben-blades-siembra/)
- [Craft Recordings: Willie Colon and Ruben Blades, Siembra LP](https://craftrecordings.com/products/willie-colon-ruben-blades-siembra-lp/)
- [Fania Records: Ruben Blades, A Man And His Music / Poeta del Pueblo](https://fania.com/record/ruben-blades-a-man-and-his-music-poeta-del-pueblo/)
- [Ruben Blades official: Siembra 45](https://www.rubenblades.com/siembra45)
- [Fania Records: History](https://fania.com/history/)
- [Bachmayer et al., "Taste differentiation and hierarchization within popular culture: The case of salsa music"](https://nicowilterdink.nl/wp-content/uploads/2015/06/Salsa.poetics2.pdf)

Existing repo placement suggestion:

- Add a new late-NYC step in `data/timeline-ny.ts` after existing Fania/Cheetah/Lavoe material and before the global chapter.
- If the site wants a movement arc, this could be the final NYC step: Fania's artistic peak with Blades, then the market begins to splinter into salsa romantica, merengue, regional scenes, and later global branches.

Suggested candidate timeline item summary:

`Siembra` showed salsa could be literary, political, massively danceable, and commercially huge at the same time. Ruben Blades' storytelling with Willie Colon's production marked a high point for Fania, just before the label's dominance began to loosen in the 1980s.

Notes that should stay ledger-only:

- Exact sales numbers beyond "millions" or "best-selling/among the best-selling" language.
- Blades/Fania contract disputes and departure details.
- Claims that `Siembra` alone caused Fania's decline.
- Detailed market-share claims unless a stronger industry source is added.

## Researcher D - Pop/Rock Bridge And Media Scout

### Latin Music In American Pop/Rock

Proposed title: Rock-a-Cha-Cha: Latin Rhythm Inside Early Pop/Rock

Background date/range: late 1950s-mid 1960s; background range: 1958-1965.

Verified claims:

- Trade-press and musicological evidence supports a broad Latin-rhythm influence on late-1950s/early-1960s U.S. pop/rock, especially the "rock-a-cha-cha" vocabulary used in `Cash Box` and related coverage.
- The Brill Building was a late-1950s/early-1960s pop industry hub: NYC Landmarks notes more than 160 music-related businesses there by the early 1960s, while cautioning that not every "Brill Building sound" figure literally worked at 1619 Broadway.
- Brill-era pop is sourceable as a New York synthesis of Tin Pan Alley craft, R&B, rock and roll, and Latin rhythms, though this should be stated as a scene-level influence rather than a claim about every Brill song.
- `Louie Louie` is sourceable as a strong public example: Richard Berry's song drew from the riff/rhythm of Rene Touzet's `El Loco Cha Cha`; Ned Sublette treats the Kingsmen hit as part of a Cuban/cha-cha thread in rock history.
- `Satisfaction` is sourceable only as a more technical, musicology-led claim: Flynn argues a Latin influence can be heard in the Rolling Stones track, specifically through an embellished tresillo-like bass pattern related to earlier "Diana" patterns.
- `Good Lovin'` is sourceable as a Young Rascals 1966 rock/R&B crossover hit and as a cover of an earlier Olympics version, but the "Latin song" claim is weakly sourced compared with `Louie Louie` and `Satisfaction`.

Uncertainty/conflict notes:

- `Day Tripper`: do not use publicly as a Latin/cha-cha claim unless a stronger source appears.
- `Satisfaction`: usable only if phrased as musicological analysis, not as "the Stones wrote a cha-cha."
- `Good Lovin'`: keep as ledger-only unless a stronger source confirms the Latin-rhythm claim.
- "Brill Building was near the Palladium" may be geographically useful, but the causal leap from proximity to influence needs sourcing before public use.
- "Jewish Latin" / "mambo-niks" language should stay ledger-only unless tied to a reliable interview or published source.

Sources:

- [Rock-a-Cha-Cha: The Erased Impact of Latin American Music on the Rhythmic Transformation of US Popular Music](https://www.cambridge.org/core/journals/twentieth-century-music/article/rockachacha-the-erased-impact-of-latin-american-music-on-the-rhythmic-transformation-of-us-popular-music/BA5E9B6BAA6C542FB533102A725A5DA8)
- [NYC LPC Brill Building designation report](https://www.nyc.gov/html/records/pdf/govpub/5437brill_building.pdf)
- [History.com: How One NYC Building Became America's Pop Music Hit Factory](https://www.history.com/articles/brill-building-pop-music-songwriters)
- [JSTOR: Ned Sublette, "The Kingsmen and the Cha-Cha-Cha"](https://www.jstor.org/stable/j.ctv11sn0sw.7)
- [OUP listening feature PDF mentioning Louie Louie / El Loco Cha Cha](https://learninglink.oup.com/protected/files/content/file/585d811e575a8d0f007f652d-1482522922186-edited_Web_Feature_31_1.pdf)

Existing repo placement suggestion:

- Preferred: create a future `data/timeline-bridges.ts` chapter between `timeline-cuba.ts` and `timeline-ny.ts`, then import it in `data/timeline.ts`.
- Lower-change option: add as a new early step in `data/timeline-ny.ts` before `nyc-1`, with an id like `nyc-bridge-rock-a-cha-cha`.
- Update the notes ledger from `research-needed` to `included` for the scene-level card, while keeping `Day Tripper`, `Good Lovin'`, and unsupported Brill anecdotes as ledger-only.

Suggested candidate timeline item summary:

Before salsa became a named New York movement, Latin rhythm was already moving through American pop and rock. Trade papers called some hits "rock-a-cha-cha," Brill-era writers worked inside a dense New York mix of R&B, teen pop, and Latin dance culture, and even garage-rock staples like `Louie Louie` carried a traceable cha-cha lineage.

Ledger-only notes:

- Keep `Day Tripper` out of the candidate timeline item.
- Keep `Good Lovin'` as "possible, needs stronger support."
- Keep `Satisfaction` as "musicology note: embellished tresillo," not a headline example.
- Preserve "mambo-niks," "Jewish Latin," and Palladium proximity as prompts for later research.

Candidate image/source/credit/license:

- Image: `Brill Building 001.jpg`
- Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Brill_Building_001.jpg)
- Credit: Kidfly182
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Suggested `bg`: `https://commons.wikimedia.org/wiki/Special:FilePath/Brill%20Building%20001.jpg?width=2400`

Optional Spotify embed targets:

- `Louie Louie` - Kingsmen: `https://open.spotify.com/embed/track/14dlhhc713aqoHwlUnqFY0`
- `(I Can't Get No) Satisfaction` - The Rolling Stones: `https://open.spotify.com/embed/track/2PzU4IB8Dr6mxV3lHuaG34`
- `Good Lovin'` - The Young Rascals, ledger-only/caution: `https://open.spotify.com/embed/track/4dTGqZkJ0ewpMCiF89Z7sl`

### Bill Graham / Fillmore / Santana At Woodstock

Proposed title: Santana At Woodstock: Latin Rock Crosses The Festival Stage

Background date/range: 1968-1969; candidate timeline item date label: 1969.

Verified claims:

- Santana's official biography describes the group's early sound as "Afro-Latin-blues-rock fusion" in San Francisco and says their global breakthrough came with Woodstock in 1969, the same year their debut LP appeared.
- Rock Hall frames Santana's lasting importance as a fusion of jazz, rock, and Latin influences.
- Bethel Woods identifies Santana as a surprise Woodstock hit: percussion-driven, Latin-infused, already known from Fillmore performances, but still largely unknown to the wider audience.
- Bethel Woods places Santana's first Fillmore West gig in June 1968 and connects Bill Graham to the Woodstock booking: Graham managed Jefferson Airplane and the Grateful Dead and reportedly made Santana part of the booking package.
- Santana performed at Woodstock on Saturday, August 16, 1969, with a set including `Waiting`, `Evil Ways`, `Jingo`, and `Soul Sacrifice`.
- Public-domain/CC image support is strong enough for a candidate timeline item: a 1969 Santana press photo on Wikimedia Commons is marked public domain in the U.S. because it was published without copyright notice.

Uncertainty/conflict notes:

- "Bill Graham recreated the Palladium at the Fillmore" is not yet sourceable enough for public copy. Rephrase as: Graham's Fillmore booking world helped Latin rock reach the San Francisco rock audience.
- Bethel Woods gives a rich narrative, but some details are oral-history based. Good for public summary, but avoid over-precise claims that rely on a single anecdote.
- Avoid using Jim Marshall Woodstock photos unless licensed; Bethel Woods credits its image as copyright Jim Marshall.
- LOC/SF psychedelic poster collections are valuable research references, but rights are often "not evaluated" or restricted; do not treat them as reusable candidate timeline item images without separate clearance.

Sources:

- [Santana official biography](https://santana.com/Carlos-Santana-Biography/)
- [Rock & Roll Hall of Fame: Santana](https://rockhall.com/inductees/santana/)
- [Bethel Woods: Santana, 50 Years of Peace & Music](https://www.bethelwoodscenter.org/news/detail/santana-50-years-of-peace-music)
- [Woodstock lineup archive: Santana](https://woodstock.com/lineup/)
- [Wikimedia Commons: Santana 1969 press photo](https://commons.wikimedia.org/wiki/File:Santana_1969_press_photo.jpg)
- [Library of Congress: Graham collection of psychedelic posters](https://www.loc.gov/pictures/item/2005682805/)

Existing repo placement suggestion:

- Preferred: place in a future `data/timeline-bridges.ts` chapter after the rock-a-cha-cha / Brill card and before `nyc-1` boogaloo.
- If avoiding a new chapter, add near the top of `data/timeline-ny.ts` as `nyc-bridge-santana-woodstock`.
- Existing ledger placement already exists under `1969: Santana At Woodstock` and `Fillmore / Santana Background`; update those sections later with source-backed claims.

Suggested candidate timeline item summary:

Santana turned Afro-Latin percussion, blues guitar, organ-driven rock, and San Francisco festival energy into a mass-audience breakthrough. Bill Graham's Fillmore circuit helped position the band, and Woodstock gave `Soul Sacrifice` a national stage just as Santana's debut album was arriving.

Ledger-only notes:

- Keep Carlos Santana childhood details ledger-only unless a future musician spotlight needs them.
- Keep "Fillmore as Palladium recreation" ledger-only until sourced.
- Note that Santana works better as a bridge-era endpoint than as a salsa card: it shows Afro-Cuban/Latin rhythm entering rock's festival mainstream.

Candidate image/source/credit/license:

- Image: `Santana 1969 press photo.jpg`
- Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Santana_1969_press_photo.jpg)
- Credit: Distributed by Columbia Records
- License: Public domain in the U.S. / PD-US-no-notice
- Suggested `bg`: `https://commons.wikimedia.org/wiki/Special:FilePath/Santana%201969%20press%20photo.jpg?width=2400`

Optional Spotify embed target:

- Album/set target: `Woodstock Saturday August 16, 1969 (Live)` - Santana: `https://open.spotify.com/embed/album/0sD74v39fruVV6LM9cP6G4`
- Recommended focus track inside album: `Soul Sacrifice - Live at The Woodstock Music & Art Fair, August 16, 1969`
