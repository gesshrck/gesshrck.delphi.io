

export const mascotBlurbs = {
  welcome: [
    "Hi Olivia! I'm Delphi. Ready to dive into some roots?",
    "Welcome back, Olivia! The water's fine for learning!",
    "Let's make a splash today, Olivia!",
    "Ahoy Olivia! Ready to explore the ocean of words?",
    "The tide is high for learning, Olivia!",
    "Ready to fish for some new knowledge?",
    "Glad to see you! Let's conquer some words!",
    "Fins up, Olivia! Let's get started!",
    "I've been waiting for a study buddy. Let's go!",
    "Ready to unlock the secrets of language?"
  ],
  categorySelect: [
    "Ooh, fascinating choice, Olivia!",
    "Diving deep into that topic!",
    "I love that category. Good luck, Olivia!",
    "Let's explore these waters together.",
    "A fine selection for a brilliant mind!",
    "Setting sail for new discoveries!",
    "That's a deep dive! You got this!",
    "Excellent choice, Captain Olivia!",
    "That set is full of treasure!",
    "I'm ready when you are!"
  ],
  cardFlip: [
    "What's hiding behind this one?",
    "Flip it good, Olivia!",
    "Do you know the answer?",
    "Show me the meaning!",
    "I bet you know this one, Olivia!",
    "The answer lies beneath the surface!",
    "Uncover the treasure!",
    "Is it Latin or Greek? Let's see!",
    "Reveal the mystery!",
    "Drumroll please...",
    "The moment of truth!"
  ],
  nextCard: [
    "On to the next wave!",
    "Keep swimming, Olivia!",
    "What's next on the horizon?",
    "Cruising right along!",
    "Full speed ahead!",
    "You're making great waves!",
    "Nothing can stop you now!",
    "Moving with the current!",
    "Let's see what the next tide brings.",
    "You're breezing through these!"
  ],
  correctMatch: [
    "Splash! You got it, Olivia!",
    "Fin-tastic work!",
    "You're swimming fast now!",
    "That matches perfectly!",
    "High fin, Olivia!",
    "You're a natural, Olivia!",
    "Nothing gets past you!",
    "Pure brilliance!",
    "You're sharper than a shark's tooth!",
    "Absolutely correct!"
  ],
  incorrectMatch: [
    "Oops, try another current.",
    "Not quite that one.",
    "Don't sink, try again!",
    "Almost there, keep looking!",
    "Shake it off, Olivia!",
    "Just a small ripple, try again!",
    "Even dolphins miss a jump sometimes.",
    "Learning happens when we miss too!"
  ],
  gameWon: [
    "You rule the seven seas, Olivia!",
    "Incredible work! You're a master!",
    "That was amazing! Another round?",
    "You cleared the deck! Great job!",
    "Champion of the ocean of words!",
    "You've charted all the territories!",
    "I'm flipping with joy for you!"
  ],
  idle: [
    "Did you know 'delphis' is Greek for dolphin?",
    "Just keep swimming...",
    "I'm ready when you are, Captain Olivia.",
    "Greek and Latin roots are the building blocks of language!",
    "Need a hint? I'm right here!",
    "The sea of knowledge is vast, but you're a great navigator.",
    "I wonder what the root for 'ocean' is?",
    "Learning never stops, just like the tides.",
    "I'm just floating here, admiring your brain."
  ],
  linkJump: [
    "Whoa! Riding the current to another root!",
    "Everything is connected, Olivia!",
    "Taking a shortcut through the ocean of words!",
    "Nice find! Let's see where this root leads.",
    "A hidden passage! Masterful navigation, Olivia.",
    "Jumping currents! Hold on tight!",
    "Connecting the dots across the sea!"
  ],
  konamiHint: [
    "I wonder what would happen if you pressed Up Up Down Down Left Right Left Right B A?"
  ]
};

export type MascotEvent = keyof typeof mascotBlurbs;

// Templates for generating dynamic hints based on derivatives
export const derivativeTemplates = [
  "Think about the word *{word}*, Olivia!",
  "You might find this root hiding in *{word}*.",
  "Use *{word}* as a clue!",
  "If you know what *{word}* means, you've got this!",
  "This root helps build the word *{word}*.",
  "Picture a *{word}* to remember this one.",
  "Connect the dots: This root is in *{word}*!",
  "A *{word}* is the perfect example of this root.",
  "Don't forget, this is the building block for *{word}*!",
  "Imagine a *{word}*..."
];

export const rootBlurbs: Record<string, string[]> = {
  // --- Nature ---
  "Photos": [
    "Take a *Photograph* of this moment, Olivia!",
    "Are you *phototropic*? You turn towards the light of knowledge!",
    "Don't have *photophobia*, embrace the light!"
  ],
  "Pyro": [
    "You're on fire today! Like a *pyromaniac* of learning!",
    "Let's watch the *pyrotechnics* of your brain at work!",
    "Don't let this one burn you!"
  ],
  "Ignis": [
    "Time to *ignite* your memory!",
    "Turn the key in the *ignition*, let's go!",
    "Is that an *igneous* rock or just a hard question?"
  ],
  "Hydros": [
    "Stay hydrated! Or should I say *dehydrated*?",
    "Don't have *hydrophobia*, the water's fine!",
    "Power up like a *hydroelectric* dam!"
  ],
  "Aqua": [
    "I live in an *aquarium*... sort of.",
    "This one is purely *aqueous*.",
    "Channel your inner *Aquaman*!"
  ],
  "Helios": [
    "You're shining brighter than the sun!",
    "Don't get too close, or you'll need a *parasol*!",
    "Are you *heliotropic*? You're facing the right way!"
  ],
  "Geo": [
    "You mean the world to me, like *geology*!",
    "Let's map this out like a *geographer*.",
    "Don't take *geometry* for granted!"
  ],
  "Terra": [
    "Stay grounded like a *terrestrial* being.",
    "This is familiar *territory* for you, Olivia.",
    "Don't go *subterranean* on me, stay up here!"
  ],
  "Astron": [
    "You're a star! A regular *astronaut* of words.",
    "This answer is written in the *astronomy* books.",
    "Don't let this be a *disaster*!"
  ],
  "Stella": [
    "Your performance is absolutely *stellar*!",
    "Look at that *constellation* of brain cells!",
    "Shine bright like *interstellar* light."
  ],
  "Thermos": [
    "Is it getting hot in here, or is it just the *thermal* energy?",
    "Check the *thermometer*, your brain is heating up!",
    "Keep your knowledge warm in a *thermos*."
  ],
  "Zoon": [
    "This place is a *zoo* of information!",
    "Study hard like a *zoologist*.",
    "Don't be afraid of the *protozoa*."
  ],

  // --- Human Body ---
  "Caput": [
    "Use your head! Or your *capital*!",
    "You're the *captain* of this ship, Olivia!",
    "Let's recap(itulate) what we know."
  ],
  "Manus": [
    "Need a hand? Or a *manual*?",
    "Let's *manufacture* a correct answer.",
    "I can tell you're writing a *manuscript* of success."
  ],
  "Pes": [
    "Don't be a *pedestrian* learner, speed it up!",
    "Put the *pedal* to the metal!",
    "Stand tall on your *pedestal*."
  ],
  "Dentis": [
    "This one has bite! Like a *dentist*.",
    "Don't put a *dent* in your score.",
    "Show me your *dentures*... wait, never mind!"
  ],
  "Corpus": [
    "Incorporating new words into your *corpus*!",
    "Whatever you do, don't become a *corpse*!",
    "A *corps* of knowledge supports you."
  ],
  "Bios": [
    "Write your own *biography* of success!",
    "It's just *biology*, Olivia!",
    "This is vital for your *bionic* brain."
  ],
  "Dormio": [
    "Wake up! Don't be *dormant*!",
    "This isn't a *dormitory*, no sleeping!",
    "Are you a *dormouse*? Wakey wakey!"
  ],
  "Hypnos": [
    "Don't get *hypnotized* by the screen!",
    "Snap out of the *hypnosis*!",
    "This is mesmerizing, isn't it?"
  ],
  "Spiro": [
    "You *inspire* me, Olivia!",
    "Keep up that learning *spirit*!",
    "Take a deep breath... *respiration* helps."
  ],
  "Cor": [
    "I believe in you with all my *core* (heart)!",
    "Let's capture this for the *record*.",
    "Be *courageous*, Olivia!"
  ],

  // --- Communication ---
  "Scribo": [
    "Don't just *scribble*, describe it!",
    "Stick to the *script*... or *scripture*!",
    "I *prescribe* more studying!"
  ],
  "Audio": [
    "I can hear the answer! It's *audible*!",
    "You're a great *audience*.",
    "Let's *audition* this answer."
  ],
  "Voco": [
    "Use your *vocal* cords!",
    "What's your *vocabulary* looking like?",
    "Finding words is your *vocation*."
  ],
  "Specio": [
    "What a *spectacle*!",
    "From my *perspective*, you're winning.",
    "Let's *inspect* this card closely."
  ],
  "Graph": [
    "Can I have your *autograph* when you win?",
    "Let's make a *diagram* of your success.",
    "Check the *graphite* in your pencil."
  ],
  "Tele": [
    "I'm sending you the answer via *telepathy*...",
    "Watch out, it's on *television*!",
    "Use a *telescope* if it's too far away."
  ],
  "Phone": [
    "Ring ring! It's the *telephone* calling with the answer!",
    "That sounds like a *symphony* to my ears.",
    "Phonics is fun!"
  ],
  "Video": [
    "It's like a *video* playing in your head.",
    "Do you have *vision*? I can see it!",
    "The view is *evident* from here."
  ],
  "Logos": [
    "Use your *logic*, Olivia!",
    "This is the *logical* conclusion.",
    "Don't *apologize*, just try!"
  ],
  "Verbum": [
    "That's a *verb*! Action time!",
    "Don't be too *verbose*.",
    "Let me repeat that *verbatim*."
  ],
  "Nomen": [
    "I *nominate* Olivia for student of the year!",
    "What's the *nomenclature* for 'smart'?",
    "That's a *nominal* fee for knowledge."
  ],
  "Dico": [
    "I *predict* you will get this right.",
    "Don't be a *dictator*, just choose!",
    "Check your *diction*."
  ],
  "Biblos": [
    "Check the *bibliography*!",
    "Are you a *bibliophile*? You love books!",
    "It's in the *bible* of roots."
  ],
  "Scio": [
    "Use your *conscience*!",
    "Are you *conscious* of the answer?",
    "It's not rocket *science*... oh wait, maybe it is!"
  ],
  "Credo": [
    "I give you full *credit*!",
    "That's *incredible*!",
    "What is your *creed*?"
  ],

  // --- Numbers ---
  "Pan": [
    "Take a *panoramic* look at the options.",
    "No *pandemonium* allowed!",
    "A *panacea* for ignorance."
  ],
  "Poly": [
    "Do you speak many languages? You're a *polyglot*!",
    "That's a *polygon* of knowledge.",
    "Is it *polyester*? No, it's real!"
  ],
  "Metron": [
    "Let's measure this in *centimeters*.",
    "Check the *barometer* of your success.",
    "Set the *metronome* to fast!"
  ],
  "Unus": [
    "We are *united* in this!",
    "You are *unique*, Olivia!",
    "Form a perfect *union*."
  ],
  "Duo": [
    "We make a great *duet*!",
    "Don't *duplicate* your mistakes.",
    "It's a *dual* purpose card."
  ],
  "Tres": [
    "Third time's the charm! A *trio*!",
    "Ride your *tricycle* to the answer.",
    "Complete the *triangle*."
  ],
  "Centum": [
    "I'm 100 *percent* sure of you!",
    "It's the deal of the *century*.",
    "A *centurion* commands you to answer!"
  ],
  "Mille": [
    "You're a *million* times smarter!",
    "Walking a *mile* in my fins.",
    "Welcome to the new *millennium*."
  ],
  "Bonus": [
    "That's a *bonus* point!",
    "A real *bonanza* of points!",
    "Here's a *bounty* of fun."
  ],
  "Mikros": [
    "Put it under the *microscope*.",
    "Don't *micromanage*, just answer.",
    "Even a *microbe* knows this one!"
  ],
  "Megas": [
    "Shout it through a *megaphone*!",
    "Don't be a *megalomaniac*.",
    "This is *mega* cool."
  ],
  "Magnus": [
    "Simply *magnificent*!",
    "Let's *magnify* the text.",
    "Of the highest *magnitude*."
  ],
  "Chronos": [
    "Let's *synchronize* our watches!",
    "Is this a *chronic* problem? No!",
    "Check the *chronology*."
  ],
  "Tempus": [
    "The *tempo* is picking up!",
    "This is only *temporary*.",
    "Don't lose your *temper* (or time)!"
  ],
  "Annus": [
    "Happy *anniversary* of learning!",
    "Is this an *annual* event?",
    "Every *millennium* brings wisdom."
  ],

  // --- People ---
  "Pater": [
    "Be a *patriot* of learning!",
    "Like a *patriarch* of wisdom.",
    "Ask your *pater* (father)!"
  ],
  "Mater": [
    "Does it *matter*? Yes!",
    "Your *alma mater* would be proud.",
    "Think *maternal* thoughts."
  ],
  "Frater": [
    "Join the *fraternity* of smart people.",
    "Don't *fraternize* with wrong answers!",
    "Brotherly love... *fraternal*."
  ],
  "Demos": [
    "This is a *democracy*, you have a vote!",
    "Show the *demographics* who's boss.",
    "Don't cause a *pandemic* of wrong answers."
  ],
  "Populus": [
    "You're the most *popular* student!",
    "The *population* agrees with you.",
    "Make it *public* knowledge."
  ],
  "Polis": [
    "Call the *police*! You're killing it!",
    "No *politics* here, just facts.",
    "Welcome to the *metropolis*."
  ],
  "Urbs": [
    "Are you an *urban* explorer?",
    "Move to the *suburbs* of genius.",
    "So *urbane* and sophisticated."
  ],
  "Pathos": [
    "Don't be *pathetic*, be powerful!",
    "I can feel your *sympathy*.",
    "It's *telepathy*, I swear."
  ],
  "Bellum": [
    "Don't be a *rebel* without a cause.",
    "Stop being *belligerent* and answer!",
    "Before the war... *antebellum*."
  ],
  "Pax": [
    "Make a *pact* with yourself to win.",
    "Peace out! *Pacify* the quiz.",
    "Sail the *Pacific* ocean."
  ],

  // --- Action ---
  "Morph": [
    "It's *morphin* time! *Metamorphosis*!",
    "Don't be *amorphous*, take shape!",
    "Study the *morphology*."
  ],
  "Port": [
    "Grab your *portable* brain.",
    "*Transport* yourself to the answer.",
    "An *important* discovery!"
  ],
  "Rupt": [
    "Don't *interrupt* your flow!",
    "My brain is going to *erupt*!",
    "Don't go *bankrupt* on points."
  ],
  "Tract": [
    "Start the *tractor*!",
    "Don't get *distracted*.",
    "I'm *attracted* to the right answer."
  ],
  "Missio": [
    "Mission possible!",
    "Launch the *missile* of truth.",
    "Don't *dismiss* this question."
  ],
  "Jacio": [
    "*Eject* the wrong answers!",
    "I *object*! No, wait, I agree.",
    "What a *project* this is."
  ],
  "Curro": [
    "Stay with the *current*.",
    "Run the *course*.",
    "Write in *cursive* if you want."
  ],
  "Verto": [
    "*Reverse* course!",
    "Are you an *introvert* or *extrovert*?",
    "The *universe* is on your side."
  ],
  "Facio": [
    "That's a *fact*!",
    "It's *perfect*!",
    "Like a *factory* of genius."
  ],
  "Struct": [
    "Build a *structure* of knowledge.",
    "*Construct* a great sentence.",
    "Don't *destruct*, create!"
  ]
};
