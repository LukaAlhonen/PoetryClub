import { PrismaClient } from "../generated/prisma/index.js";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  // Generate simple password hash
  const password = "password123";
  let hash = "password";
  try {
    hash = await argon2.hash(password, { type: argon2.argon2id });
  } catch (err) {
    console.error(`Error hashing password: ${err}`);
  }

  const edgar = await prisma.author.create({
    data: {
      username: "Edgar Allan Poe",
      email: "edgar.allan@domain.com",
      password: hash,
      poems: {
        create: [
          {
            title: "A Dream Within A Dream",
            text: `Take this kiss upon the brow!
          And, in parting from you now,
          Thus much let me avow --
          You are not wrong, who deem
          That my days have been a dream;
          Yet if hope has flown away
          In a night, or in a day,
          In a vision, or in none,
          Is it therefore the less gone?
          All that we see or seem
          Is but a dream within a dream.

          I stand amid the roar
          Of a surf-tormented shore,
          And I hold within my hand
          Grains of the golden sand --
          How few! yet how they creep
          Through my fingers to the deep,
          While I weep -- while I weep!
          O God! can I not grasp
          Them with a tighter clasp?
          O God! can I not save
          One from the pitiless wave?
          Is all that we see or seem
          But a dream within a dream?`,
            views: 0,
          },
          {
            title: "Dream-Land",
            text: `By a route obscure and lonely,
          Haunted by ill angels only,
          Where an Eidolon, named NIGHT,
          On a black throne reigns upright,
          I have reached these lands but newly
          From an ultimate dim Thule --
          From a wild weird clime that lieth, sublime,
                Out of SPACE -- out of TIME.

          Bottomless vales and boundless floods,
          And chasms, and caves, and Titan woods,
          With forms that no man can discover
          For the dews that drip all over;
          Mountains toppling evermore
          Into seas without a shore;
          Seas that restlessly aspire,
          Surging, unto skies of fire;
          Lakes that endlessly outspread
          Their lone waters -- lone and dead, --
          Their still waters -- still and chilly
          With the snows of the lolling lily.

          By the lakes that thus outspread
          Their lone waters, lone and dead, --
          Their sad waters, sad and chilly
          With the snows of the lolling lily, --
          By the mountains -- near the river
          Murmuring lowly, murmuring ever, --
          By the grey woods, -- by the swamp
          Where the toad and the newt encamp, --
          By the dismal tarns and pools
                  Where dwell the Ghouls, --
          By each spot the most unholy --
          In each nook most melancholy, --
          There the traveller meets aghast
          Sheeted Memories of the Past --
          Shrouded forms that start and sigh
          As they pass the wanderer by --
          White-robed forms of friends long given,
          In agony, to the Earth -- and Heaven.

          For the heart whose woes are legion
          'Tis a peaceful, soothing region --
          For the spirit that walks in shadow
          'Tis -- oh 'tis an Eldorado!
          But the traveller, travelling through it,
          May not -- dare not openly view it;
          Never its mysteries are exposed
          To the weak human eye unclosed;
          So wills its King, who hath forbid
          The uplifting of the fringed lid;
          And thus the sad Soul that here passes
          Beholds it but through darkened glasses.

          By a route obscure and lonely,
          Haunted by ill angels only,
          Where an Eidolon, named NIGHT,
          On a black throne reigns upright,
          I have wandered home but newly
          From this ultimate dim Thule.`,
            views: 0,
          },
          {
            title: "The Raven",
            text: `Once upon a midnight dreary, while I pondered, weak and weary,
            Over many a quaint and curious volume of forgotten lore,
            While I nodded, nearly napping, suddenly there came a tapping,
            As of some one gently rapping, rapping at my chamber door.
            "'Tis some visitor," I muttered, "tapping at my chamber door-
                             Only this, and nothing more."

            Ah, distinctly I remember it was in the bleak December,
            And each separate dying ember wrought its ghost upon the floor.
            Eagerly I wished the morrow;- vainly I had sought to borrow
            From my books surcease of sorrow- sorrow for the lost Lenore-
            For the rare and radiant maiden whom the angels name Lenore-
                             Nameless here for evermore.

            And the silken, sad, uncertain rustling of each purple curtain
            Thrilled me- filled me with fantastic terrors never felt before;
            So that now, to still the beating of my heart, I stood repeating,
            "'Tis some visitor entreating entrance at my chamber door-
            Some late visitor entreating entrance at my chamber door;-
                             This it is, and nothing more."

            Presently my soul grew stronger; hesitating then no longer,
            "Sir," said I, "or Madam, truly your forgiveness I implore;
            But the fact is I was napping, and so gently you came rapping,
            And so faintly you came tapping, tapping at my chamber door,
            That I scarce was sure I heard you"- here I opened wide the door;-
                             Darkness there, and nothing more.

            Deep into that darkness peering, long I stood there wondering, fearing,
            Doubting, dreaming dreams no mortal ever dared to dream before;
            But the silence was unbroken, and the stillness gave no token,
            And the only word there spoken was the whispered word, "Lenore?"
            This I whispered, and an echo murmured back the word, "Lenore!"-
                             Merely this, and nothing more.

            Back into the chamber turning, all my soul within me burning,
            Soon again I heard a tapping somewhat louder than before.
            "Surely," said I, "surely that is something at my window lattice:
            Let me see, then, what thereat is, and this mystery explore-
            Let my heart be still a moment and this mystery explore;-
                             'Tis the wind and nothing more!"

            Open here I flung the shutter, when, with many a flirt and flutter,
            In there stepped a stately Raven of the saintly days of yore;
            Not the least obeisance made he; not a minute stopped or stayed he;
            But, with mien of lord or lady, perched above my chamber door-
            Perched upon a bust of Pallas just above my chamber door-
                             Perched, and sat, and nothing more.

            Then this ebony bird beguiling my sad fancy into smiling,
            By the grave and stern decorum of the countenance it wore.
            "Though thy crest be shorn and shaven, thou," I said, "art sure no craven,
            Ghastly grim and ancient Raven wandering from the Nightly shore-
            Tell me what thy lordly name is on the Night's Plutonian shore!"
                             Quoth the Raven, "Nevermore."

            Much I marvelled this ungainly fowl to hear discourse so plainly,
            Though its answer little meaning- little relevancy bore;
            For we cannot help agreeing that no living human being
            Ever yet was blessed with seeing bird above his chamber door-
            Bird or beast upon the sculptured bust above his chamber door,
                             With such name as "Nevermore."

            But the Raven, sitting lonely on the placid bust, spoke only
            That one word, as if his soul in that one word he did outpour.
            Nothing further then he uttered- not a feather then he fluttered-
            Till I scarcely more than muttered, "Other friends have flown before-
            On the morrow he will leave me, as my hopes have flown before."
                             Then the bird said, "Nevermore."

            Startled at the stillness broken by reply so aptly spoken,
            "Doubtless," said I, "what it utters is its only stock and store,
            Caught from some unhappy master whom unmerciful Disaster
            Followed fast and followed faster till his songs one burden bore-
            Till the dirges of his Hope that melancholy burden bore
                             Of 'Never- nevermore'."

            But the Raven still beguiling all my fancy into smiling,
            Straight I wheeled a cushioned seat in front of bird, and bust and door;
            Then upon the velvet sinking, I betook myself to linking
            Fancy unto fancy, thinking what this ominous bird of yore-
            What this grim, ungainly, ghastly, gaunt and ominous bird of yore
                             Meant in croaking "Nevermore."

            This I sat engaged in guessing, but no syllable expressing
            To the fowl whose fiery eyes now burned into my bosom's core;
            This and more I sat divining, with my head at ease reclining
            On the cushion's velvet lining that the lamp-light gloated o'er,
            But whose velvet violet lining with the lamp-light gloating o'er,
                             She shall press, ah, nevermore!

            Then methought the air grew denser, perfumed from an unseen censer
            Swung by Seraphim whose footfalls tinkled on the tufted floor.
            "Wretch," I cried, "thy God hath lent thee- by these angels he hath sent thee
            Respite- respite and nepenthe, from thy memories of Lenore!
            Quaff, oh quaff this kind nepenthe and forget this lost Lenore!"
                             Quoth the Raven, "Nevermore."

            "Prophet!" said I, "thing of evil! - prophet still, if bird or devil! -
            Whether Tempter sent, or whether tempest tossed thee here ashore,
            Desolate yet all undaunted, on this desert land enchanted-
            On this home by Horror haunted- tell me truly, I implore-
            Is there- is there balm in Gilead?- tell me- tell me, I implore!"
                             Quoth the Raven, "Nevermore."

            "Prophet!" said I, "thing of evil! - prophet still, if bird or devil!
            By that Heaven that bends above us- by that God we both adore-
            Tell this soul with sorrow laden if, within the distant Aidenn,
            It shall clasp a sainted maiden whom the angels name Lenore-
            Clasp a rare and radiant maiden whom the angels name Lenore."
                             Quoth the Raven, "Nevermore."

            "Be that word our sign in parting, bird or fiend," I shrieked, upstarting-
            "Get thee back into the tempest and the Night's Plutonian shore!
            Leave no black plume as a token of that lie thy soul hath spoken!
            Leave my loneliness unbroken!- quit the bust above my door!
            Take thy beak from out my heart, and take thy form from off my door!"
                             Quoth the Raven, "Nevermore."

            And the Raven, never flitting, still is sitting, still is sitting
            On the pallid bust of Pallas just above my chamber door;
            And his eyes have all the seeming of a demon's that is dreaming,
            And the lamp-light o'er him streaming throws his shadow on the floor;
            And my soul from out that shadow that lies floating on the floor
                             Shall be lifted- nevermore!`,
            views: 0,
          },
          {
            title: "The Haunted Palace",
            text: `In the greenest of our valleys
               By good angels tenanted,
            Once a fair and stately palace-
               Radiant palace- reared its head.
            In the monarch Thought's dominion-
               It stood there!
            Never seraph spread a pinion
               Over fabric half so fair!
            Banners yellow, glorious, golden,
               On its roof did float and flow,
            (This- all this- was in the olden
               Time long ago,)
            And every gentle air that dallied,
               In that sweet day,
            Along the ramparts plumed and pallid,
               A winged odor went away.

            Wanderers in that happy valley,
               Through two luminous windows, saw
            Spirits moving musically,
               To a lute's well-tuned law,
            Round about a throne where, sitting
               (Porphyrogene!)
            In state his glory well-befitting,
               The ruler of the realm was seen.

            And all with pearl and ruby glowing
               Was the fair palace door,
            Through which came flowing, flowing, flowing,
               And sparkling evermore,
            A troop of Echoes, whose sweet duty
               Was but to sing,
            In voices of surpassing beauty,
               The wit and wisdom of their king.

            But evil things, in robes of sorrow,
               Assailed the monarch's high estate.
            (Ah, let us mourn!- for never morrow
               Shall dawn upon him desolate!)
            And round about his home the glory
               That blushed and bloomed,
            Is but a dim-remembered story
               Of the old time entombed.

            And travellers, now, within that valley,
               Through the red-litten windows see
            Vast forms, that move fantastically
               To a discordant melody,
            While, like a ghastly rapid river,
               Through the pale door
            A hideous throng rush out forever
               And laugh- but smile no more. `,
            views: 0,
          },
        ],
      },
    },
  });

  const oscar = await prisma.author.create({
    data: {
      username: "Oscar Wilde",
      email: "oscar.wilde@domain.com",
      password: hash,
      poems: {
        create: [
          {
            title: "Requiescat",
            text: `Tread lightly, she is near
            Under the snow,
            Speak gently, she can hear
            The daisies grow.

            All her bright golden hair
            Tarnished with rust,
            She that was young and fair
            Fallen to dust.

            Lily-like, white as snow,
            She hardly knew
            She was a woman, so
            Sweetly she grew.

            Coffin-board, heavy stone,
            Lie on her breast,
            I vex my heart alone
            She is at rest.

            Peace, Peace, she cannot hear
            Lyre or sonnet,
            All my life’s buried here,
            Heap earth upon it.`,
            views: 0,
          },
          {
            title: "A Villanelle",
            text: `O singer of Persephone!
            In the dim meadows desolate
            Dost thou remember Sicily?

            Still through the ivy flits the bee
            Where Amaryllis lies in state;
            O Singer of Persephone!

            Simaetha calls on Hecate
            And hears the wild dogs at the gate;
            Dost thou remember Sicily?

            Still by the light and laughing sea
            Poor Polypheme bemoans his fate;
            O Singer of Persephone!

            And still in boyish rivalry
            Young Daphnis challenges his mate;
            Dost thou remember Sicily?

            Slim Lacon keeps a goat for thee,
            For thee the jocund shepherds wait;
            O Singer of Persephone!
            Dost thou remember Sicily?`,
            views: 0,
          },
        ],
      },
    },
  });

  const emily = await prisma.author.create({
    data: {
      username: "Emily Dickinson",
      email: "emily.dickinson@domain.com",
      password: hash,
      poems: {
        create: [
          {
            title: "Hope is the thing with feathers",
            text: `Hope is the thing with feathers
            That perches in the soul,
            And sings the tune without the words,
            And never stops at all,

            And sweetest in the gale is heard;
            And sore must be the storm
            That could abash the little bird
            That kept so many warm.

            I've heard it in the chillest land,
            And on the strangest sea;
            Yet, never, in extremity,
            It asked a crumb of me.`,
            views: 0,
          },
          {
            title: "A Bird, came down the Walk",
            text: `A Bird, came down the Walk -
            He did not know I saw -
            He bit an Angle Worm in halves
            And ate the fellow, raw,

            And then, he drank a Dew
            From a convenient Grass -
            And then hopped sidewise to the Wall
            To let a Beetle pass -

            He glanced with rapid eyes,
            That hurried all abroad -
            They looked like frightened Beads, I thought,
            He stirred his Velvet Head. -

            Like one in danger, Cautious,
            I offered him a Crumb,
            And he unrolled his feathers,
            And rowed him softer Home -

            Than Oars divide the Ocean,
            Too silver for a seam,
            Or Butterflies, off Banks of Noon,
            Leap, plashless as they swim. `,
            views: 0,
          },
          {
            title: "A Day",
            text: `I'll tell you how the sun rose, -
            A ribbon at a time.
            The steeples swam in amethyst,
            The news like squirrels ran.
            The hills untied their bonnets,
            The bobolinks begun.
            Then I said softly to myself,
            “That must have been the sun!”

            But how he set, I know not.
            There seemed a purple stile
            Which little yellow boys and girls
            Were climbing all the while

            Till when they reached the other side,
            A dominie in gray
            Put gently up the evening bars,
            And led the flock away.`,
            views: 0,
          },
          {
            title: "A Drop fell on the Apple Tree",
            text: `A Drop fell on the Apple Tree -
            Another - on the Roof -
            A Half a Dozen kissed the Eaves -
            And made the Gables laugh -

            A few went out to help the Brook
            That went to help the Sea -
            Myself Conjectured were they Pearls -
            What Necklaces could be -

            The Dust replaced, in Hoisted Roads -
            The Birds jocoser sung -
            The Sunshine threw his Hat away -
            The Bushes - spangles flung -

            The Breezes brought dejected Lutes -
            And bathed them in the Glee -
            The Orient showed a single Flag,
            And signed the fête away - `,
            views: 0,
          },
        ],
      },
    },
  });
  const runeberg = await prisma.author.create({
    data: {
      username: "Johan Ludvig Runeberg",
      email: "johan.l.runeberg@domain.com",
      password: hash,
      poems: {
        create: [
          {
            title: "Flyktfåglarna",
            text: `I flyktande gäster på främmande strand,
            när söken I åter ert fädernesland?
            När sippan sig döljer
            i fädernedalen
            och bäcken besköljer
            den grönskande alen:
            då lyfta de vingen,
            då komma de små;
            väg visar dem ingen
            i villande blå:
            de hitta ändå.

            De finna så säkert den saknade nord,
            där våren dem väntar med hydda och bord,
            där källornas spenar
            de trötte förfriska
            och vaggande grenar
            om njutningar viska,
            där hjärtat får drömma
            vid nattsolens gång
            och kärleken glömma
            vid lekar och sång,
            att vägen var lång.

            De lyckliga glada, de bygga i ro
            bland mossiga tallar sitt fredliga bo;
            och stormarna, krigen,
            bekymren och sorgen,
            de känna ej stigen
            till värnlösa borgen,
            där glädjen behöver
            blott majdagens brand
            och natten, som söver
            med rosende hand
            de späda ibland.

            Du flyktande ande på främmande strand,
            när söker du åter ditt fädernesland?
            När palmerna mogna
            i fädernevärlden,
            då börjar du trogna
            den fröjdfulla färden,
            då lyfter du vingen
            som fåglarna små;
            väg visar dig ingen
            i villande blå;
            du hittar ändå.`,
            views: 0,
          },
          {
            title: "Kyssen",
            text: `Jag kysser dig och ledsnar ej,
            och skall jag nån'sin ledsna? Nej!
            Nu, goda flicka, svara mig,
            vad sällhet kyssen skänker dig!

            Du älskar den så väl som jag:
            nu säg, vad utgör dess behag?
            Jag frågar nu, jag frågte nyss
            och får till svar blott kyss på kyss.

            Om i min läpp man honung gömt,
            du kysste den ej mera ömt;
            om galla vore stänkt därpå,
            du kysste lika ömt ändå.

            Se till, vad förebär du väl,
            om någon frågar efter skäl,
            om någon oblygt kommer nu
            och frågar: Varför kysses du?

            Och folket dömer strängt, min vän,
            vad skall det säga då om den,
            som annat ej än kyssa gör
            och själv ej en gång vet varför?

            För min del jag ej hittat på,
            vad gott i kyssen finnas må;
            men jag vill dö, om jag en stund
            skall stängas från din purpurmun.`,
            views: 0,
          },
          {
            title: "Vårvisa",
            text: `De komma, de komma,
            de vingade skaror, som flytt,
            till lundar, som blomma,
            till sjöar, som ljummas på nytt.

            Där stormarna ilat,
            hörs sången melodisk och ljuv,
            där drivan har vilat,
            bor glädjen och skönheten nu.

            Blott kärleken fäster
            en flykting från skyarnas rand,
            och himmelens gäster
            besöka blott leende land.

            Mitt hjärta skall blomma,
            min känsla skall ljummas på nytt;
            kanhända de komma,
            de vingade änglar, som flytt.`,
            views: 0,
          },
        ],
      },
    },
  });

  const doom = await prisma.author.create({
    data: {
      username: "MF DOOM",
      email: "metal.face@domain.com",
      password: hash,
      poems: {
        create: [
          {
            title: "Curls",
            text: `Villain get the money like curls
            They just tryin' to get a nut like squirrels in his mad world
            Land of milk and honey with the swirls
            Where reckless naked girls get necklaces of pearls
            Compliments of the town jeweler
            Left back now-schooler tryna sound cooler
            On the microphone known as the crown ruler
            Never lied to ma when we said we found the moolah
            Five-hundred somethin' dollars layin' right there in the street
            Huh, now let's try and get somethin' to eat
            Then he turned four and started flowin' to the poor
            That's about when he first started going raw
            Kept the 'dro in the drawer
            A rhymin' klepto who couldn't go up in the store no more
            His life is like a folklore legend
            Why you so stiff, you need to smoke more, bredren
            Instead of trying to riff with the broke war veteran
            Spliff made him swore he saw heaven he was seven
            Yup, you know it, growin' up too fast
            Showin' up to class with Moet in a flask
            He ask the teacher if he leave will he pass
            His girl is home alone, he tryin' to get the...
            If you want a sip get a paper water fountain glass
            How I'm 'posed to know where your mouth been last?
            Hands so fast he can out-spin Flash
            Known to smoke a whole mountain of hash to the ash
            Boom-bash, leave the room with the stash
            Assume it's in a smash, DOOM get the cash`,
            views: 0,
          },
          {
            title: "Accordion",
            text: `Living off borrowed time, the clock ticks faster
            That'd be the hour they knock the slick blaster
            Dick Dastardly and Muttley with sick laughter
            A gunfight and they come to cut the mixmaster
            I-C-E cold, nice to be old
            Y2G stee twice to threefold
            He sold scrolls, lo and behold
            Know who's the illest ever like the greatest story told
            Keep your glory, gold and glitter
            For half, half of his niggas'll take him out the picture
            The other half is rich and it don't mean shit-ta
            Villain: a mixture between both with a twist of liquor
            Chase it with more beer, taste it like truth or dare
            When he have the mic, it's like the place get like, "Aw, yeah!"
            It's like they know what's 'bout to happen
            Just keep ya eye out like, "Aye, aye, captain"
            Is he still a fly guy clapping if nobody ain't hear it?
            And can they testify from in the spirit? (Nah)
            In living, the true gods
            Giving y'all nothing but the lick like two broads
            Got more lyrics than the church got "Ooh, Lords"
            And he hold the mic and your attention like two swords
            (Either that) Or either one with two blades on it
            Hey you, don't touch the mic like it's AIDS on it (Yuck)
            It's like the end to the means
            Fuck type of message that sends to the fiends?
            That's why he bring his own needles
            And get more cheese than Doritos, Cheetos or Fritos
            Slip like Freudian
            Your first and last step to playing yourself like accordion

            When he at the mic, you don't go next
            Leaving pussy cats like why hoes need Kotex
            Exercise index, won't need BowFlex
            And won't take the one with no skinny legs like Joe Tex`,
            views: 0,
          },
          {
            title: "Meat Grinder",
            text: `Tripping off the beat kinda, dripping off the meat grinder
            Heat niner, pimping, stripping, soft sweet minor
            China was a neat signer, trouble with the script
            Digits double dipped, bubble lipped, subtle lisp midget
            Borderline schizo, sort of fine tits though
            Pour the wine, whore to grind, quarter to nine, let's go
            Ever since ten eleven, glad she made a brethren
            Then it's last down seven alligator seven
            At the gates of heaven, knockin'—no answer
            Slow dancer, hopeless romancer, dopest flow stanzas
            Yes, no? Villain, Metal Face to Destro
            Guess so, still incredible in escrow
            Just say, "Ho!" I'll test the yayo
            Wild West style fest, y'all best to lay low
            Hey bro, DayGlo, set the bet, pay dough
            Before the cheddar get away, best to get Maaco
            The worst hated God who perpetrated odd favors
            Demonstrated in the perforated Rod Lavers
            … In all quad flavors, Lord save us
            Still back in the game like Jack LaLanne
            Think you know the name, don't rack your brain
            On a fast track to half insane
            Either in a slow beat or that the speed of "Wrath of Kane"
            Laughter, pain
            Hackthoo'ing songs lit, in the booth, with the best host
            Doing bong hits, on the roof in the west coast
            He's at it again, Mad at the pen
            Glad that we win, a tad fat, in a bad hat for men
            Grind the cinnamon, Manhattan warmongers
            You can find the villain in satin … congas
            The van screeches, the old man preaches
            About the gold sand beaches, the cold hand reaches
            For the old tan Ellesses …
            … Jesus`,
            views: 0,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1);
  });
