
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { flashcardsData } from './data';
import { FlashcardData } from './types';
import { mascotBlurbs, rootBlurbs, MascotEvent, derivativeTemplates } from './mascotData';
import { logSession } from './logger';

// --- Icons ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M20 6 9 17l-5-5"/></svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
);
const LightbulbIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
);
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1 mb-0.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);
const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);
const VolumeXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
);
const GameControllerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h4"/><path d="M8 10v4"/><path d="M15 13a1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1Z"/><path d="M18 11a1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1Z"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
);
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

// --- Helper Components ---

const PixelGlasses = () => (
  <svg viewBox="0 0 100 30" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
    <defs>
      <pattern id="pixel-pattern" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
        <rect width="2" height="2" fill="black" />
      </pattern>
    </defs>
    
    {/* Left Lens Frame */}
    <path fill="black" d="
       M5,0 h40 v5 h5 v5 h-5 v5 h-5 v5 h-25 v-5 h-5 v-5 h-5 v-10 z
    " />
    
    {/* Right Lens Frame */}
    <path fill="black" d="
       M55,0 h40 v10 h-5 v5 h-5 v5 h-25 v-5 h-5 v-5 h-5 v-5 h5 v-5 z
    " />

    {/* Bridge */}
    <rect x="45" y="5" width="10" height="5" fill="black" />

    {/* Glints (Pixel Style) */}
    {/* Left */}
    <rect x="10" y="5" width="5" height="5" fill="white" opacity="0.9" />
    <rect x="15" y="10" width="5" height="5" fill="white" opacity="0.9" />
    <rect x="20" y="10" width="5" height="5" fill="white" opacity="0.9" />
    
    {/* Right */}
    <rect x="60" y="5" width="5" height="5" fill="white" opacity="0.9" />
    <rect x="65" y="10" width="5" height="5" fill="white" opacity="0.9" />
    <rect x="70" y="10" width="5" height="5" fill="white" opacity="0.9" />
  </svg>
);

// --- Helper Functions ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Sound Hook ---
type SoundType = 'click' | 'flip' | 'dolphin' | 'success' | 'hover' | 'giggle' | 'pop' | 'party' | 'sad' | 'match' | 'mismatch' | 'win';

const useSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context lazily
  const initAudio = useCallback(() => {
     if (typeof window === 'undefined') return null;
     if (!audioCtxRef.current) {
         const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
         if (AudioContext) {
             audioCtxRef.current = new AudioContext();
         }
     }
     if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
         audioCtxRef.current.resume().catch(() => {});
     }
     return audioCtxRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
      if (isMuted) return;
      const ctx = initAudio();
      if (!ctx) return;

      const t = ctx.currentTime;

      switch (type) {
          case 'click':
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.type = 'sine';
              osc.frequency.setValueAtTime(800, t);
              osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);
              gain.gain.setValueAtTime(0.05, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
              osc.start(t);
              osc.stop(t + 0.1);
              break;

          case 'hover':
              const hOsc = ctx.createOscillator();
              const hGain = ctx.createGain();
              hOsc.connect(hGain);
              hGain.connect(ctx.destination);
              hOsc.frequency.setValueAtTime(400, t);
              hGain.gain.setValueAtTime(0.02, t);
              hGain.gain.linearRampToValueAtTime(0, t + 0.05);
              hOsc.start(t);
              hOsc.stop(t + 0.05);
              break;
              
          case 'flip':
              const bufferSize = ctx.sampleRate * 0.3;
              const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
              const data = buffer.getChannelData(0);
              for (let i = 0; i < bufferSize; i++) {
                  data[i] = Math.random() * 2 - 1;
              }
              const noise = ctx.createBufferSource();
              noise.buffer = buffer;
              const noiseFilter = ctx.createBiquadFilter();
              noiseFilter.type = 'lowpass';
              noiseFilter.frequency.setValueAtTime(200, t);
              noiseFilter.frequency.linearRampToValueAtTime(1500, t + 0.1);
              noiseFilter.frequency.linearRampToValueAtTime(200, t + 0.3);
              const noiseGain = ctx.createGain();
              noiseGain.gain.setValueAtTime(0.03, t);
              noiseGain.gain.linearRampToValueAtTime(0, t + 0.3);
              noise.connect(noiseFilter);
              noiseFilter.connect(noiseGain);
              noiseGain.connect(ctx.destination);
              noise.start(t);
              break;

          case 'dolphin':
              const playChirp = (startTime: number, dur: number, freqStart: number, freqEnd: number) => {
                  const dOsc = ctx.createOscillator();
                  const dGain = ctx.createGain();
                  dOsc.connect(dGain);
                  dGain.connect(ctx.destination);
                  dOsc.type = 'sine';
                  dOsc.frequency.setValueAtTime(freqStart, startTime);
                  dOsc.frequency.linearRampToValueAtTime(freqEnd, startTime + dur);
                  dGain.gain.setValueAtTime(0, startTime);
                  dGain.gain.linearRampToValueAtTime(0.05, startTime + (dur/2));
                  dGain.gain.linearRampToValueAtTime(0, startTime + dur);
                  dOsc.start(startTime);
                  dOsc.stop(startTime + dur);
              };
              playChirp(t, 0.1, 2000, 3000);
              playChirp(t + 0.12, 0.08, 3000, 2500);
              playChirp(t + 0.22, 0.15, 2500, 4000);
              break;

          case 'success':
          case 'match':
              const sOsc = ctx.createOscillator();
              const sGain = ctx.createGain();
              sOsc.connect(sGain);
              sGain.connect(ctx.destination);
              sOsc.type = 'sine';
              sOsc.frequency.setValueAtTime(523.25, t); // C5
              sOsc.frequency.setValueAtTime(659.25, t + 0.1); // E5
              sOsc.frequency.setValueAtTime(783.99, t + 0.2); // G5
              sGain.gain.setValueAtTime(0.05, t);
              sGain.gain.linearRampToValueAtTime(0, t + 0.6);
              sOsc.start(t);
              sOsc.stop(t + 0.6);
              break;
          
          case 'win':
               const winNotes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
               winNotes.forEach((freq, i) => {
                   const time = t + i * 0.15;
                   const wOsc = ctx.createOscillator();
                   const wGain = ctx.createGain();
                   wOsc.connect(wGain);
                   wGain.connect(ctx.destination);
                   wOsc.frequency.setValueAtTime(freq, time);
                   wGain.gain.setValueAtTime(0.05, time);
                   wGain.gain.linearRampToValueAtTime(0, time + 0.2);
                   wOsc.start(time);
                   wOsc.stop(time + 0.2);
               });
               break;

          case 'mismatch':
              const mOsc = ctx.createOscillator();
              const mGain = ctx.createGain();
              mOsc.connect(mGain);
              mGain.connect(ctx.destination);
              mOsc.type = 'sawtooth';
              mOsc.frequency.setValueAtTime(300, t);
              mOsc.frequency.linearRampToValueAtTime(150, t + 0.2);
              mGain.gain.setValueAtTime(0.05, t);
              mGain.gain.linearRampToValueAtTime(0, t + 0.2);
              mOsc.start(t);
              mOsc.stop(t + 0.2);
              break;

          case 'giggle':
              const gOsc = ctx.createOscillator();
              const gGain = ctx.createGain();
              gOsc.connect(gGain);
              gGain.connect(ctx.destination);
              gOsc.type = 'triangle';
              gOsc.frequency.setValueAtTime(500, t);
              gOsc.frequency.linearRampToValueAtTime(600, t + 0.05);
              gOsc.frequency.linearRampToValueAtTime(500, t + 0.1);
              gOsc.frequency.linearRampToValueAtTime(600, t + 0.15);
              gOsc.frequency.linearRampToValueAtTime(500, t + 0.2);
              gGain.gain.setValueAtTime(0.05, t);
              gGain.gain.linearRampToValueAtTime(0, t + 0.25);
              gOsc.start(t);
              gOsc.stop(t + 0.25);
              break;
              
          case 'pop':
               const pOsc = ctx.createOscillator();
               const pGain = ctx.createGain();
               pOsc.connect(pGain);
               pGain.connect(ctx.destination);
               pOsc.frequency.setValueAtTime(400, t);
               pOsc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
               pGain.gain.setValueAtTime(0.05, t);
               pGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
               pOsc.start(t);
               pOsc.stop(t + 0.1);
               break;

           case 'party':
               // A fast arpeggio
               const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 523.25];
               notes.forEach((freq, i) => {
                   const time = t + i * 0.08;
                   const partyOsc = ctx.createOscillator();
                   const partyGain = ctx.createGain();
                   partyOsc.connect(partyGain);
                   partyGain.connect(ctx.destination);
                   partyOsc.frequency.setValueAtTime(freq, time);
                   partyGain.gain.setValueAtTime(0.03, time);
                   partyGain.gain.linearRampToValueAtTime(0, time + 0.1);
                   partyOsc.start(time);
                   partyOsc.stop(time + 0.1);
               });
               break;
            case 'sad':
               const sadOsc = ctx.createOscillator();
               const sadGain = ctx.createGain();
               sadOsc.connect(sadGain);
               sadGain.connect(ctx.destination);
               sadOsc.type = 'sawtooth';
               sadOsc.frequency.setValueAtTime(300, t);
               sadOsc.frequency.linearRampToValueAtTime(100, t + 0.5);
               sadGain.gain.setValueAtTime(0.05, t);
               sadGain.gain.linearRampToValueAtTime(0, t + 0.5);
               sadOsc.start(t);
               sadOsc.stop(t + 0.5);
               break;

      }
  }, [isMuted, initAudio]);

  const toggleMute = () => {
      logSession("Mute Toggled", { isMuted: !isMuted });
      setIsMuted(prev => !prev);
  };

  return { isMuted, toggleMute, playSound };
};

// --- Theme Helper ---
const getCardTheme = (origin: string) => {
  const isGreek = origin.toLowerCase().includes('greek');
  if (isGreek) {
    return {
      type: 'greek',
      textMain: 'text-purple-600',
      textDark: 'text-purple-800',
      bgLight: 'bg-purple-50',
      tagBg: 'bg-purple-100 text-purple-700 border-purple-200',
      backGradient: 'bg-gradient-to-br from-purple-600 to-indigo-700',
      backText: 'text-white',
      backSubtext: 'text-purple-100',
      indicatorBg: 'bg-purple-500',
      indicatorText: 'text-purple-100',
      buttonPrimary: 'bg-purple-600 hover:bg-purple-500 text-white',
      derivativeCard: 'bg-white/10 border-purple-400/30'
    };
  } else {
    return {
      type: 'latin',
      textMain: 'text-cyan-600',
      textDark: 'text-cyan-800',
      bgLight: 'bg-cyan-50',
      tagBg: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      backGradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      backText: 'text-white',
      backSubtext: 'text-cyan-100',
      indicatorBg: 'bg-cyan-500',
      indicatorText: 'text-cyan-100',
      buttonPrimary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      derivativeCard: 'bg-white/10 border-cyan-400/30'
    };
  }
};

// --- Mascot Component ---

const DolphinMascot = ({ eventTrigger, currentCard, playSound }: { eventTrigger: MascotEvent | null, currentCard?: FlashcardData, playSound: (t: SoundType) => void }) => {
  const [message, setMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isRainbowMessage, setIsRainbowMessage] = useState(false);
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ignoredTriggersRef = useRef<number>(0);

  const generateDynamicBlurb = (card: FlashcardData): string => {
      if (!card.derivatives || card.derivatives.length === 0) return "Keep exploring, Olivia!";
      
      const randomDerivative = card.derivatives[Math.floor(Math.random() * card.derivatives.length)];
      const randomTemplate = derivativeTemplates[Math.floor(Math.random() * derivativeTemplates.length)];
      
      // Inject the word into the template
      return randomTemplate.replace('{word}', randomDerivative.word);
  };

  const getMessage = (type: MascotEvent, card?: FlashcardData) => {
    // 70% chance to use a specific root hint or dynamic derivative blurb
    if (card && (type === 'cardFlip' || type === 'nextCard' || type === 'linkJump') && Math.random() > 0.3) {
       // Prioritize specific handwritten blurbs if available
       if (rootBlurbs[card.root] && Math.random() > 0.4) {
           const hints = rootBlurbs[card.root];
           return hints[Math.floor(Math.random() * hints.length)];
       } else {
           // Fallback to the dynamic hint generator
           return generateDynamicBlurb(card);
       }
    }

    const list = mascotBlurbs[type];
    if (!list) return "Keep going!";
    return list[Math.floor(Math.random() * list.length)];
  };

  useEffect(() => {
    if (!eventTrigger) {
       // Only show generic welcome if not already visible/active
       if(!isVisible) {
           const msg = getMessage('welcome');
           setMessage(msg);
           setIsVisible(true);
           setIsRainbowMessage(false);
           timeoutRef.current = setTimeout(() => setIsVisible(false), 5000);
       }
       return;
    }

    // Check if we need to ignore this trigger to let the rare message be read
    if (ignoredTriggersRef.current > 0) {
        ignoredTriggersRef.current -= 1;
        return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Rare chance (e.g., 2% on common events) to trigger the Konami hint
    // We avoid doing this on 'gameWon' or crucial feedback events
    const canTriggerKonami = ['cardFlip', 'nextCard', 'idle'].includes(eventTrigger);
    if (canTriggerKonami && Math.random() < 0.02) {
        const hintList = mascotBlurbs['konamiHint'];
        if (hintList) {
            setMessage(hintList[0]);
            setIsVisible(true);
            setIsRainbowMessage(true);
            // Ignore next 3 triggers
            ignoredTriggersRef.current = 3;
            
            playSound('dolphin');
            logSession("Mascot Speaking", { trigger: 'konamiHint', message: hintList[0] });

            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                setIsRainbowMessage(false);
            }, 8000);
            return;
        }
    }

    // Normal Message Logic
    const msg = getMessage(eventTrigger, currentCard);
    setMessage(msg);
    setIsVisible(true);
    setIsRainbowMessage(false);
    logSession("Mascot Speaking", { trigger: eventTrigger, message: msg });
    
    // Play sound on new message if visible
    if (!isPartyMode) playSound('dolphin');

    const duration = eventTrigger === 'gameWon' ? 8000 : 6000;
    timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
    }, duration);

    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [eventTrigger, currentCard, playSound, isPartyMode]);

  const handleMascotClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSpinning(true);
      playSound('giggle');
      logSession("Mascot Clicked");
      
      // Spawn Hearts/Bubbles via event
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const evt = new CustomEvent('spawn-particles', {
          detail: { x: centerX, y: centerY, type: 'heart', count: 10 }
      });
      window.dispatchEvent(evt);

      setTimeout(() => setIsSpinning(false), 1000);
  }

  // Konami Code Listener
  useEffect(() => {
      let keys: string[] = [];
      const konami = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";
      const handleKey = (e: KeyboardEvent) => {
          keys.push(e.key);
          if (keys.length > 10) keys.shift();
          if (keys.join(',') === konami) {
              setIsPartyMode(true);
              playSound('party');
              logSession("Konami Code Activated");
              // Party mode off after 10s
              setTimeout(() => setIsPartyMode(false), 10000);
          }
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
  }, [playSound]);

  return (
    <>
    {isPartyMode && <div className="animate-rainbow-bg fixed inset-0 pointer-events-none z-[1]" style={{opacity: 0.3}} />}
    
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col items-end pointer-events-none">
      {/* Speech Bubble */}
      <div className={`
        mb-3 mr-4 bg-white text-[#667eea] p-4 rounded-2xl rounded-br-none shadow-2xl border-2 border-purple-200 max-w-[280px]
        transition-all duration-500 transform origin-bottom-right relative pointer-events-auto
        ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4'}
      `}>
        <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 bg-white border-r-2 border-b-2 border-purple-200 transform rotate-45"></div>
        <p className={`font-bold text-sm leading-relaxed relative z-10 ${isRainbowMessage ? 'bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 animate-pulse font-extrabold text-base' : ''}`} dangerouslySetInnerHTML={{__html: message.replace(/\*(.*?)\*/g, '<span class="text-purple-600 font-extrabold">$1</span>')}} />
      </div>

      {/* Dolphin Image */}
      <div 
        onClick={handleMascotClick}
        className={`
            w-32 h-32 md:w-48 md:h-48 filter drop-shadow-2xl relative transition-transform hover:scale-105 origin-center cursor-pointer pointer-events-auto
            ${!isSpinning ? 'animate-bounce-custom' : 'animate-spin-fast'}
        `}>
         <img 
            src="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f42c.svg" 
            alt="Delphi the Dolphin" 
            className="w-full h-full object-contain filter hue-rotate-[60deg] brightness-110 saturate-150"
         />
         {isPartyMode && (
             <div className="absolute top-[28%] left-[18%] w-[60%] h-[25%] pointer-events-none animate-spin-in origin-center">
                <PixelGlasses />
             </div>
         )}
      </div>
    </div>
    </>
  );
};

// --- Parsing Component for Derivative Parts ---
const DerivativeParts = ({ parts, globalRoots, onJump }: { parts: string, globalRoots: Set<string>, onJump: (root: string) => void }) => {
    if (!parts) return null;
    
    const cleanParts = parts.replace(/[()]/g, '');
    const segments = cleanParts.split(',').map(s => s.trim());

    return (
        <span className="text-xs text-white/90 font-mono bg-black/20 px-2 py-0.5 rounded inline-block">
            (
            {segments.map((segment, i) => {
                const splitIndex = segment.indexOf('-');
                let rootPart = segment;
                let rest = "";
                
                if (splitIndex !== -1) {
                    rootPart = segment.substring(0, splitIndex).trim();
                    rest = segment.substring(splitIndex);
                }

                // Find the canonical root name (case insensitive check)
                // We iterate to find the exact casing key
                let canonicalRoot: string | undefined;
                for (let r of globalRoots) {
                    if (r.toLowerCase() === rootPart.toLowerCase()) {
                        canonicalRoot = r;
                        break;
                    }
                }

                return (
                    <React.Fragment key={i}>
                        {i > 0 && ", "}
                        {canonicalRoot ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onJump(canonicalRoot!);
                                }}
                                className="group/link inline-flex items-center hover:bg-white/20 px-1 rounded transition-colors -my-0.5"
                                title={`Jump to ${canonicalRoot}`}
                            >
                                <span className="underline decoration-dotted decoration-white/50 underline-offset-2 font-bold text-white group-hover/link:decoration-solid group-hover/link:text-white group-hover/link:decoration-white">
                                    {rootPart}
                                </span>
                                <span className="opacity-0 group-hover/link:opacity-100 transition-opacity w-0 group-hover/link:w-auto overflow-hidden">
                                   <LinkIcon />
                                </span>
                            </button>
                        ) : (
                            <span>{rootPart}</span>
                        )}
                        {rest}
                    </React.Fragment>
                );
            })}
            )
        </span>
    );
};

// --- Glitter & Particle Components ---

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  size: number;
  type: 'circle' | 'heart' | 'text';
  text?: string;
}

const GlitterCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Event Listener for Custom Particle Spawns
    const handleSpawn = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        const count = detail.count || 10;
        for(let i=0; i<count; i++) {
            particles.current.push(createParticle(detail.x, detail.y, true, detail.type, detail.text));
        }
    };
    window.addEventListener('spawn-particles', handleSpawn);

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      // Add trail particles
      for (let i = 0; i < 2; i++) {
        particles.current.push(createParticle(e.clientX, e.clientY));
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      // Burst
      for (let i = 0; i < 20; i++) {
        particles.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((p, i) => {
        p.life -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.99; // drag
        
        if (p.life <= 0) {
          particles.current.splice(i, 1);
        } else {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          
          if (p.type === 'heart') {
             const size = p.size * 5;
             ctx.font = `${size}px serif`;
             ctx.fillText("❤️", p.x, p.y);
          } else if (p.type === 'text' && p.text) {
             const size = p.size * 4;
             ctx.font = `${size}px sans-serif`;
             ctx.fillText(p.text, p.x, p.y);
          } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
              // Star shape for larger particles to simulate glitter
              if (p.size > 2) {
                 ctx.fillRect(p.x - p.size*2, p.y - 0.5, p.size*4, 1);
                 ctx.fillRect(p.x - 0.5, p.y - p.size*2, 1, p.size*4);
              }
          }
        }
      });
      
      ctx.globalAlpha = 1;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('spawn-particles', handleSpawn);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const createParticle = (x: number, y: number, burst = false, type: 'circle'|'heart'|'text' = 'circle', text?: string): Particle => {
    const colors = ['#ffffff', '#FFD700', '#C084FC', '#22D3EE']; // White, Gold, Purple, Cyan
    const angle = Math.random() * Math.PI * 2;
    const speed = burst ? Math.random() * 5 + 2 : Math.random() * 2;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (burst ? 2 : 0), // Upward tendency for burst
      life: 1.0,
      decay: Math.random() * 0.03 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 3 + (burst ? 1 : 0.5),
      type,
      text
    };
  };

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

// --- Components ---

interface CategoryMenuProps {
  onSelectCategory: (category: string | null, mode: 'flashcards' | 'matching') => void;
  totalCount: number;
  playSound: (type: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const CategoryMenu = ({ onSelectCategory, totalCount, playSound, isMuted, toggleMute }: CategoryMenuProps) => {
  const categories = Array.from(new Set(flashcardsData.map(d => d.category)));
  const getCount = (cat: string) => flashcardsData.filter(d => d.category === cat).length;
  const [shakeExit, setShakeExit] = useState(false);
  const [mode, setMode] = useState<'flashcards' | 'matching'>('flashcards');

  const handleExitClick = () => {
      setShakeExit(true);
      playSound('sad');
      logSession("User attempted to exit");
      setTimeout(() => setShakeExit(false), 500);
  };

  const handleModeChange = (newMode: 'flashcards' | 'matching') => {
      playSound('click'); 
      setMode(newMode);
      logSession("Mode Changed", { mode: newMode });
  };

  return (
    <div className="flex-1 h-full w-full overflow-y-auto custom-scrollbar p-6 md:p-12 flex flex-col items-center relative z-10">
      <div className="absolute top-4 right-4 z-50 flex gap-2">
          <button 
             onClick={toggleMute} 
             className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors"
             title={isMuted ? "Unmute" : "Mute"}
          >
             {isMuted ? <VolumeXIcon /> : <VolumeIcon />}
          </button>
          <button
            onClick={handleExitClick}
            className={`px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-all backdrop-blur-md border border-white/10 ${shakeExit ? 'animate-shake-horizontal bg-red-500/50' : ''}`}
          >
            Exit
          </button>
      </div>

      <header className="text-center mb-8 animate-fadeInDown mt-12 md:mt-0 w-full max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
          Topics
        </h1>
        <p className="text-purple-100 opacity-90 text-lg mb-8">
          Choose a set to study, Olivia!
        </p>
        
        {/* Mode Toggle - Sliding Switch */}
        <div className="relative bg-black/20 p-1.5 rounded-2xl border border-white/10 mb-8 w-72 h-14 shadow-inner backdrop-blur-sm flex cursor-pointer mx-auto" onClick={() => handleModeChange(mode === 'flashcards' ? 'matching' : 'flashcards')}>
            {/* The Slider */}
            <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-lg transition-all duration-500 ${mode === 'flashcards' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
            
            {/* Study Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleModeChange('flashcards'); }}
              className={`flex-1 relative z-10 flex items-center justify-center gap-2 text-sm font-bold transition-colors duration-300 ${mode === 'flashcards' ? 'text-[#667eea]' : 'text-white/60 hover:text-white'}`}
            >
                <BookOpenIcon /> Study Mode
            </button>
            
            {/* Game Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleModeChange('matching'); }}
              className={`flex-1 relative z-10 flex items-center justify-center gap-2 text-sm font-bold transition-colors duration-300 ${mode === 'matching' ? 'text-[#667eea]' : 'text-white/60 hover:text-white'}`}
            >
                <GameControllerIcon /> Game Mode
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl animate-fadeInUp">
        <button
          onClick={() => { playSound('click'); logSession("Started Shuffle All", { mode }); onSelectCategory(null, mode); }}
          onMouseEnter={() => playSound('hover')}
          className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-white/20 to-white/10 border border-white/20 backdrop-blur-md"
        >
          {/* Shimmer Effect */}
          <div className="animate-shimmer" />
          
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <LayersIcon />
          </div>
          <div className="relative z-10">
             <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white">
               <RefreshIcon />
             </div>
             <h3 className="text-2xl font-bold text-white mb-1">Shuffle All</h3>
             <p className="text-purple-100 text-sm font-medium opacity-80">{totalCount} Cards</p>
          </div>
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => { playSound('click'); logSession("Started Category", { category, mode }); onSelectCategory(category, mode); }}
            onMouseEnter={() => playSound('hover')}
            className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-2xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md"
          >
             {/* Shimmer Effect */}
            <div className="animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
               <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {flashcardsData.find(d => d.category === category)?.emoji}
               </div>
               <h3 className="text-xl font-bold text-white mb-1">{category}</h3>
               <p className="text-purple-200 text-sm font-medium opacity-70">{getCount(category)} Cards</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Sidebar & FlashcardBoard ---

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string | null;
  onSwitchCategory: (category: string | null) => void;
  onBackToCategories: () => void;
  cards: FlashcardData[];
  currentIndex: number;
  progressState: Record<string, { discovered: boolean, reviewed: boolean }>;
  onJumpToCard: (idx: number) => void;
  playSound: (type: SoundType) => void;
}

const Sidebar = ({ 
  isOpen, 
  onClose, 
  selectedCategory, 
  onSwitchCategory, 
  onBackToCategories, 
  cards,
  currentIndex,
  progressState,
  onJumpToCard,
  playSound
}: SidebarProps) => {
  const categories = Array.from(new Set(flashcardsData.map(d => d.category)));

  const handleSwitch = (cat: string | null) => {
     playSound('click');
     onSwitchCategory(cat);
     if (window.innerWidth < 768) onClose();
  };

  const renderCardList = () => {
    // We only show unlocked (discovered) cards
    const visibleCards = cards.map((c, i) => ({...c, originalIndex: i})).filter(c => progressState[c.root]?.discovered);
    
    return (
        <div className="mt-1 pl-4 pr-2 pb-3 space-y-1 relative animate-fadeInDown">
            <div className="absolute left-[2.25rem] top-2 bottom-4 w-0.5 bg-white/10" />

            {visibleCards.map((card, idx) => {
                // Check if this card corresponds to the currently selected card in the view
                const isCurrent = card.originalIndex === currentIndex;
                const isReviewed = progressState[card.root]?.reviewed;
                const theme = getCardTheme(card.origin);
                
                return (
                    <button
                        key={card.root}
                        onClick={(e) => { e.stopPropagation(); playSound('click'); onJumpToCard(card.originalIndex); }}
                        className={`
                            relative w-full text-left p-2 pl-12 rounded-lg text-sm flex items-center justify-between group transition-all
                            ${isCurrent ? 'bg-white/20 text-white font-medium shadow-sm' : 'hover:bg-white/10 text-white/70'}
                        `}
                    >
                         <div className={`
                             absolute left-2 w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all z-10 border
                             ${isCurrent 
                                ? 'bg-white shadow-md scale-110 ' + theme.textMain
                                : isReviewed 
                                    ? `${theme.indicatorBg} text-white border-transparent`
                                    : `${theme.indicatorBg} ${theme.indicatorText} opacity-50 group-hover:opacity-80 border-transparent`}
                         `}>
                             {isReviewed && !isCurrent ? <CheckIcon /> : (card.originalIndex + 1)}
                         </div>

                        <span className="truncate">{card.root}</span>
                    </button>
                );
            })}
            
            {visibleCards.length < cards.length && (
                <div className="relative w-full text-left p-2 pl-12 rounded-lg text-sm flex items-center gap-2 text-white/40 italic">
                     <div className="absolute left-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/10 z-10 border border-white/5">
                        <div className="scale-75"><LockIcon /></div>
                     </div>
                     <span>{cards.length - visibleCards.length} Locked</span>
                </div>
            )}
        </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:relative z-50 h-full w-80 flex-shrink-0
        bg-[#667eea]/30 backdrop-blur-xl border-r border-white/10 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-5 border-b border-white/10 flex justify-between items-center flex-shrink-0 bg-black/10">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <LayersIcon /> Sets
          </h2>
          <button onClick={onClose} className="md:hidden text-white/70 hover:text-white"><XIcon /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
           {/* Shuffle All */}
           <div className={`rounded-xl transition-all duration-300 border border-transparent overflow-hidden ${selectedCategory === null ? 'bg-black/20 shadow-inner border-white/5' : 'hover:bg-white/5'}`}>
             <button
                onClick={() => handleSwitch(null)}
                className="w-full p-3 flex items-center gap-3 text-left"
             >
                <div className={`p-2 rounded-lg transition-colors ${selectedCategory === null ? 'bg-white text-[#667eea]' : 'bg-white/10 text-white'}`}>
                   <RefreshIcon />
                </div>
                <div className="flex-1">
                   <div className={`font-bold ${selectedCategory === null ? 'text-white' : 'text-white/80'}`}>Shuffle All</div>
                   <div className="text-xs text-white/50">{flashcardsData.length} Cards</div>
                </div>
             </button>
             {selectedCategory === null && renderCardList()}
          </div>

          {/* Categories */}
          {categories.map(cat => (
             <div key={cat} className={`rounded-xl transition-all duration-300 border border-transparent overflow-hidden ${selectedCategory === cat ? 'bg-black/20 shadow-inner border-white/5' : 'hover:bg-white/5'}`}>
                <button
                   onClick={() => handleSwitch(cat)}
                   className="w-full p-3 flex items-center gap-3 text-left"
                >
                   <div className="text-2xl">{flashcardsData.find(d => d.category === cat)?.emoji}</div>
                   <div className="flex-1">
                      <div className={`font-bold ${selectedCategory === cat ? 'text-white' : 'text-white/80'}`}>{cat}</div>
                      <div className="text-xs text-white/50">{flashcardsData.filter(d => d.category === cat).length} Cards</div>
                   </div>
                </button>
                {selectedCategory === cat && renderCardList()}
             </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 text-center flex-shrink-0 bg-black/10">
           <button 
              onClick={() => { playSound('click'); onBackToCategories(); }}
              className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 font-medium transition-colors flex items-center justify-center gap-2 border border-white/5 text-sm"
           >
              <ArrowLeftIcon /> Back to Home
           </button>
        </div>
      </aside>
    </>
  );
};

interface FlashcardBoardProps {
  selectedCategory: string | null;
  currentDeck: FlashcardData[];
  currentIndex: number;
  isFlipped: boolean;
  progressState: Record<string, { discovered: boolean, reviewed: boolean }>;
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onBackToCategories: () => void;
  onToggleSidebar: () => void;
  onLinkJump: (root: string) => void;
  playSound: (type: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const FlashcardBoard = ({ 
  selectedCategory, 
  currentDeck,
  currentIndex,
  isFlipped,
  progressState,
  onFlip,
  onNext,
  onPrev,
  onBackToCategories,
  onToggleSidebar,
  onLinkJump,
  playSound,
  isMuted,
  toggleMute
}: FlashcardBoardProps) => {
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    setIsAnimating(true);
    if (currentIndex > prevIndexRef.current) setSlideDirection('right');
    if (currentIndex < prevIndexRef.current) setSlideDirection('left');
    prevIndexRef.current = currentIndex;
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [isFlipped, currentIndex]);

  const globalRoots = useMemo(() => new Set(flashcardsData.map(c => c.root)), []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev(); }
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onFlip(); }
  }, [onNext, onPrev, onFlip]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleEmojiClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      playSound('pop');
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const evt = new CustomEvent('spawn-particles', {
          detail: { x: centerX, y: centerY, type: 'text', text: currentDeck[currentIndex].emoji, count: 8 }
      });
      window.dispatchEvent(evt);
  };

  if (!currentDeck || currentDeck.length === 0) return null;

  const currentCard = currentDeck[currentIndex];
  const theme = getCardTheme(currentCard.origin);
  
  const hasNext = currentIndex < currentDeck.length - 1;
  const nextCardDiscovered = hasNext && progressState[currentDeck[currentIndex + 1].root]?.discovered;
  const canMoveForward = hasNext && nextCardDiscovered;
  
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="flex-shrink-0 p-4 flex items-center justify-between z-10 w-full">
         <div className="flex items-center gap-3">
            <button 
              onClick={() => { playSound('click'); onToggleSidebar(); }}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors md:hidden"
            >
              <MenuIcon />
            </button>
            <div className="text-white">
               <h2 className="font-bold text-xl md:text-2xl drop-shadow-md flex items-center gap-2">
                 {selectedCategory || "Shuffle All"}
               </h2>
            </div>
         </div>
         
         <div className="flex items-center gap-2">
             <button 
               onClick={toggleMute}
               className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors mr-2"
               title={isMuted ? "Unmute" : "Mute"}
            >
               {isMuted ? <VolumeXIcon /> : <VolumeIcon />}
            </button>

            <button 
               onClick={() => { playSound('click'); onBackToCategories(); }}
               className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-all backdrop-blur-md border border-white/10"
            >
               Exit
            </button>
         </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center p-4 pb-8 md:pb-12 relative overflow-hidden">
         <div className="w-full max-w-lg md:max-w-xl flex flex-col items-center gap-6 relative z-10">
            
            {/* Card */}
            <div 
                className={`perspective-1500 w-full aspect-[4/5] md:aspect-[3/2] max-h-[60vh] cursor-pointer group ${slideDirection === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}`}
                key={currentCard.root} 
                onClick={onFlip}
                onMouseEnter={() => playSound('hover')}
            >
                <div className={`
                   relative w-full h-full duration-700 transform-style-3d transition-transform ease-in-out-back
                   ${isFlipped ? 'rotate-y-180' : ''}
                `}>
                   {/* Front Face */}
                   <div 
                      className={`
                        absolute inset-0 w-full h-full backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center
                        bg-white border-4 border-white overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)]
                      `}
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                   >
                       {/* Shimmer on hover */}
                      <div className="animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity backface-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} />

                      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 backface-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                         <div 
                             onClick={handleEmojiClick}
                             className={`text-5xl md:text-6xl mb-6 cursor-pointer hover:scale-110 transition-transform ${!isAnimating ? 'animate-pulse-custom' : ''}`}
                         >
                           {currentCard.emoji}
                         </div>
                         <h2 className={`text-4xl md:text-6xl font-extrabold mb-4 ${theme.textMain} tracking-tight break-words max-w-full`}>
                           {currentCard.root}
                         </h2>
                         <div className={`px-3 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider border ${theme.tagBg} shadow-sm`}>
                           {currentCard.origin}
                         </div>
                      </div>
                      <div className={`mt-auto text-xs font-medium flex items-center gap-2 animate-bounce-custom ${theme.textMain} opacity-60 backface-hidden`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                        <LightbulbIcon /> Click to reveal meaning
                      </div>
                   </div>

                   {/* Back Face */}
                   <div 
                      className={`
                        absolute inset-0 w-full h-full backface-hidden rounded-3xl rotate-y-180 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)]
                        ${theme.backGradient} border-4 border-white flex flex-col
                      `}
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                   >
                      <div className={`h-full overflow-y-auto custom-scrollbar p-6 md:p-8 text-center backface-hidden`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                         <div className="mb-6">
                            <div className={`text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70 ${theme.backSubtext}`}>Definition</div>
                            <h3 className={`text-2xl md:text-3xl font-extrabold ${theme.backText} leading-tight`}>
                               "{currentCard.meaning}"
                            </h3>
                         </div>
                         <div className="flex items-center justify-center gap-4 mb-4 opacity-40">
                            <div className="h-px w-8 bg-white"></div>
                            <div className="text-[10px] font-bold uppercase text-white tracking-widest">Derivatives</div>
                            <div className="h-px w-8 bg-white"></div>
                         </div>
                         <div className="space-y-3 pb-8 text-left">
                            {currentCard.derivatives.map((d, i) => (
                               <div key={i} className={`${theme.derivativeCard} backdrop-blur-md p-3 rounded-lg shadow-sm border`}>
                                  <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
                                     <span className="text-base font-bold text-white">{d.word}</span>
                                     {d.parts && (
                                         <DerivativeParts parts={d.parts} globalRoots={globalRoots} onJump={(root) => { playSound('click'); onLinkJump(root); }} />
                                     )}
                                  </div>
                                  <p className="text-white/80 leading-snug text-xs md:text-sm">
                                     {d.meaning}
                                  </p>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full justify-center">
                <button 
                   onClick={(e) => { e.stopPropagation(); onPrev(); }}
                   disabled={currentIndex === 0}
                   className={`p-3 md:p-4 rounded-full transition-all ${currentIndex === 0 ? 'bg-white/10 text-white/20 cursor-not-allowed' : 'bg-white text-[#667eea] hover:scale-110 shadow-lg'}`}
                >
                   <ArrowLeftIcon />
                </button>

                <button 
                   onClick={(e) => { e.stopPropagation(); onFlip(); }}
                   className={`flex-1 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-white/20 active:scale-95 ${theme.buttonPrimary}`}
                >
                   {isFlipped ? 'Flip Back' : 'Reveal'}
                </button>

                <button 
                   onClick={(e) => { e.stopPropagation(); onNext(); }}
                   disabled={!canMoveForward}
                   className={`p-3 md:p-4 rounded-full transition-all ${!canMoveForward ? 'bg-black/20 text-white/40 cursor-not-allowed border border-white/5' : 'bg-white text-[#667eea] hover:scale-110 shadow-lg'}`}
                >
                   <div className="rotate-180"><ArrowLeftIcon /></div>
                </button>
            </div>
         </div>
      </main>
    </div>
  );
};

// --- Matching Game Component ---

interface MatchCard {
  id: string;
  content: string;
  type: 'root' | 'meaning';
  pairId: string; 
  origin: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MatchingGame = ({ 
  category, 
  onBack, 
  playSound, 
  isMuted, 
  toggleMute, 
  triggerMascot 
}: { 
  category: string | null; 
  onBack: () => void; 
  playSound: (t: SoundType) => void; 
  isMuted: boolean; 
  toggleMute: () => void;
  triggerMascot: (e: MascotEvent, c?: FlashcardData) => void;
}) => {
    const [cards, setCards] = useState<MatchCard[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [attempts, setAttempts] = useState(0);

    // Initialize Game
    useEffect(() => {
        logSession("Initializing Matching Game", { category });
        let pool = category 
            ? flashcardsData.filter(d => d.category === category)
            : flashcardsData;
        
        // Shuffle and pick 6 pairs (12 cards)
        pool = shuffleArray(pool).slice(0, 6);
        
        const newCards: MatchCard[] = [];
        pool.forEach(item => {
            newCards.push({
                id: `${item.root}-root`,
                content: item.root,
                type: 'root',
                pairId: item.root,
                origin: item.origin,
                isFlipped: false,
                isMatched: false
            });
            newCards.push({
                id: `${item.root}-meaning`,
                content: item.meaning,
                type: 'meaning',
                pairId: item.root,
                origin: item.origin,
                isFlipped: false,
                isMatched: false
            });
        });

        setCards(shuffleArray(newCards));
        setGameWon(false);
        setAttempts(0);
        setSelectedIds([]);
    }, [category]);

    const handleCardClick = (id: string) => {
        if (isProcessing || gameWon) return;
        
        const clickedCard = cards.find(c => c.id === id);
        if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

        playSound('flip');
        logSession("Card Clicked", { id, content: clickedCard.content });

        // Flip the card
        setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
        
        const newSelected = [...selectedIds, id];
        setSelectedIds(newSelected);

        if (newSelected.length === 2) {
            setIsProcessing(true);
            setAttempts(prev => prev + 1);
            
            const card1 = cards.find(c => c.id === newSelected[0]);
            const card2 = clickedCard; // current one

            if (card1 && card2 && card1.pairId === card2.pairId) {
                // Match!
                logSession("Match Found", { pair: card1.pairId });
                setTimeout(() => {
                    playSound('match');
                    // Spawn particles
                    const evt = new CustomEvent('spawn-particles', {
                        detail: { x: window.innerWidth/2, y: window.innerHeight/2, type: 'circle', count: 15 }
                    });
                    window.dispatchEvent(evt);

                    setCards(prev => prev.map(c => 
                        newSelected.includes(c.id) ? { ...c, isMatched: true } : c
                    ));
                    setSelectedIds([]);
                    setIsProcessing(false);
                    triggerMascot('correctMatch');

                    // Check Win
                    const remaining = cards.filter(c => !c.isMatched && !newSelected.includes(c.id));
                    if (remaining.length === 0) {
                        setGameWon(true);
                        playSound('win');
                        logSession("Game Won", { attempts: attempts + 1 });
                        triggerMascot('gameWon');
                         const evt = new CustomEvent('spawn-particles', {
                            detail: { x: window.innerWidth/2, y: window.innerHeight/2, type: 'heart', count: 30 }
                        });
                        window.dispatchEvent(evt);
                    }
                }, 500);
            } else {
                // Mismatch
                logSession("Mismatch", { card1: card1?.content, card2: card2.content });
                setTimeout(() => {
                    playSound('mismatch');
                    setCards(prev => prev.map(c => 
                        newSelected.includes(c.id) ? { ...c, isFlipped: false } : c
                    ));
                    setSelectedIds([]);
                    setIsProcessing(false);
                    triggerMascot('incorrectMatch');
                }, 1200);
            }
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full max-w-4xl mx-auto">
             <header className="flex-shrink-0 p-4 flex items-center justify-between z-10 w-full">
                <div className="flex items-center gap-2 text-white">
                    <h2 className="font-bold text-xl md:text-2xl drop-shadow-md flex items-center gap-2">
                        {category || "Shuffle All"} <span className="opacity-50 text-sm ml-2 bg-white/10 px-2 py-1 rounded">Pairs: {attempts}</span>
                    </h2>
                </div>
                 <div className="flex items-center gap-2">
                     <button onClick={toggleMute} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors mr-2">
                        {isMuted ? <VolumeXIcon /> : <VolumeIcon />}
                     </button>
                    <button onClick={() => { playSound('click'); onBack(); }} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-md border border-white/10">
                       Exit Game
                    </button>
                 </div>
             </header>

             <main className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col justify-center pb-32">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full h-full max-h-[80vh] auto-rows-fr">
                    {cards.map((card) => {
                        const theme = getCardTheme(card.origin);
                        return (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(card.id)}
                                className={`
                                    relative rounded-xl cursor-pointer perspective-1500 group transition-all duration-300
                                    ${card.isMatched ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}
                                `}
                            >
                                <div className={`
                                   relative w-full h-full duration-500 transform-style-3d transition-transform ease-in-out-back shadow-lg
                                   ${card.isFlipped ? 'rotate-y-180' : ''}
                                `}>
                                    {/* Back */}
                                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/30 rounded-xl backdrop-blur-md flex items-center justify-center">
                                        <div className="opacity-50 text-white"><LayersIcon /></div>
                                    </div>
                                    
                                    {/* Front */}
                                    <div className={`
                                        absolute inset-0 backface-hidden rotate-y-180 rounded-xl border-2 border-white/50 flex items-center justify-center p-2 text-center shadow-xl
                                        ${card.type === 'root' ? `${theme.bgLight} ${theme.textMain}` : 'bg-white text-slate-700'}
                                    `}>
                                        <span className={`font-bold ${card.type === 'root' ? 'text-lg md:text-2xl' : 'text-sm md:text-base leading-tight'}`}>
                                            {card.content}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {gameWon && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeInUp">
                         <div className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-sm mx-4 border-4 border-purple-300">
                             <div className="text-6xl mb-4 animate-bounce-custom">🏆</div>
                             <h2 className="text-3xl font-extrabold text-[#667eea] mb-2">You Won!</h2>
                             <p className="text-slate-500 mb-6">Splendid work navigating the roots!</p>
                             <button 
                                onClick={() => { playSound('click'); onBack(); }}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg hover:scale-105 transition-transform"
                             >
                                Play Again
                             </button>
                         </div>
                    </div>
                )}
             </main>
        </div>
    );
};

// --- App Logic ---

interface AppGameProps {
   sessionCategory: string | null;
   onBack: () => void;
   progressState: Record<string, { discovered: boolean, reviewed: boolean }>;
   setProgressState: React.Dispatch<React.SetStateAction<Record<string, { discovered: boolean, reviewed: boolean }>>>;
   playSound: (type: SoundType) => void;
   isMuted: boolean;
   toggleMute: () => void;
}

const AppGame = ({ sessionCategory, onBack, progressState, setProgressState, playSound, isMuted, toggleMute }: AppGameProps) => {
   // --- State ---
   
   // Current View State
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [isFlipped, setIsFlipped] = useState(false);
   const [currentCategory, setCurrentCategory] = useState<string | null>(sessionCategory);
   const [currentIndex, setCurrentIndex] = useState(0);

   // Mascot
   const [mascotEvent, setMascotEvent] = useState<MascotEvent | null>('categorySelect');
   const [mascotCard, setMascotCard] = useState<FlashcardData | undefined>(undefined);

   // --- Derived Deck ---
   const currentDeck = useMemo(() => {
       if (!currentCategory) return flashcardsData;
       return flashcardsData.filter(d => d.category === currentCategory);
   }, [currentCategory]);

   // --- Init Progress ---
   useEffect(() => {
       if (currentDeck.length === 0) return;
       const firstRoot = currentDeck[0].root;
       
       // Only update if strictly necessary to prevent loops or extra renders
       if (!progressState[firstRoot]?.discovered) {
           setProgressState(prev => ({
               ...prev,
               [firstRoot]: { discovered: true, reviewed: false }
           }));
       }
   }, [currentDeck, progressState, setProgressState]); 
   
   // Effect: Trigger mascot hint when index changes (but wait for animation)
   useEffect(() => {
       if (currentDeck.length > 0) {
           const card = currentDeck[currentIndex];
           // If we just navigated to a new card and it's NOT flipped (front side), trigger a hint
           if (!isFlipped) {
              setMascotEvent(null);
              setTimeout(() => {
                 setMascotEvent('nextCard'); // Use nextCard as the trigger type, but getMessage handles specific card logic
                 setMascotCard(card);
              }, 500);
           }
       }
   }, [currentIndex, currentDeck, isFlipped]);

   // --- Actions ---

   const triggerMascot = (event: MascotEvent, card?: FlashcardData) => {
      setMascotEvent(null); 
      setTimeout(() => {
         setMascotEvent(event);
         setMascotCard(card);
      }, 10);
   };

   const handleFlip = () => {
       const card = currentDeck[currentIndex];
       playSound('flip');
       if (!isFlipped) {
           logSession("Card Revealed", { root: card.root });
           triggerMascot('cardFlip', card);
           // Mark as reviewed
           // Unlock next card in THIS deck
           const nextIndex = currentIndex + 1;
           
           setProgressState(prev => {
               const nextState = { ...prev };
               
               // 1. Mark current reviewed
               nextState[card.root] = { ...nextState[card.root], reviewed: true, discovered: true };
               
               // 2. Unlock next in sequence
               if (nextIndex < currentDeck.length) {
                   const nextRoot = currentDeck[nextIndex].root;
                   if (!nextState[nextRoot]?.discovered) {
                       nextState[nextRoot] = { discovered: true, reviewed: false };
                   }
               }
               return nextState;
           });
       } else {
           logSession("Card Hidden", { root: card.root });
       }
       setIsFlipped(!isFlipped);
   };

   const handleNext = () => {
       if (currentIndex < currentDeck.length - 1) {
           const nextCard = currentDeck[currentIndex + 1];
           // Only proceed if unlocked (though button should be disabled)
           if (progressState[nextCard.root]?.discovered) {
               playSound('flip');
               logSession("Navigated Next", { to: nextCard.root });
               setIsFlipped(false);
               setCurrentIndex(prev => prev + 1);
               // Trigger handled by useEffect
           }
       }
   };

   const handlePrev = () => {
       if (currentIndex > 0) {
           playSound('flip');
           logSession("Navigated Prev", { to: currentDeck[currentIndex - 1].root });
           setIsFlipped(false);
           setCurrentIndex(prev => prev - 1);
           // Trigger handled by useEffect
       }
   };

   const handleLinkJump = (targetRoot: string) => {
       // 1. Find the card
       const card = flashcardsData.find(c => c.root.toLowerCase() === targetRoot.toLowerCase());
       if (!card) return;

       logSession("Link Jump", { target: targetRoot });

       // 2. Unlock it
       setProgressState(prev => ({
           ...prev,
           [card.root]: { ...prev[card.root], discovered: true }
       }));

       triggerMascot('linkJump', card);

       // 3. Navigate to it.
       if (currentCategory === null) {
           // In Shuffle All
           const idx = currentDeck.findIndex(c => c.root === card.root);
           if (idx !== -1) {
               setIsFlipped(false);
               setCurrentIndex(idx);
           }
       } else {
           // Check if in current deck
           const idx = currentDeck.findIndex(c => c.root === card.root);
           if (idx !== -1) {
               setIsFlipped(false);
               setCurrentIndex(idx);
           } else {
               // Not in current deck. Switch to Shuffle All (or could check category).
               // For simplicity, switch to "Shuffle All" implicitly via category null, or find its category.
               // Let's just find where it is globally.
               const globalIndex = flashcardsData.findIndex(c => c.root === card.root);
               setCurrentCategory(null); 
               setCurrentIndex(globalIndex);
               setIsFlipped(false);
           }
       }
   };

   const handleSwitchCategory = (cat: string | null) => {
       logSession("Sidebar Category Switch", { category: cat });
       setCurrentCategory(cat);
       setCurrentIndex(0);
       setIsFlipped(false);
       triggerMascot('categorySelect');
   };

   return (
      <div className="flex h-screen w-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden font-sans text-slate-800 relative z-0">
         <DolphinMascot eventTrigger={mascotEvent} currentCard={mascotCard} playSound={playSound} />
         
         <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            selectedCategory={currentCategory}
            onSwitchCategory={handleSwitchCategory}
            onBackToCategories={onBack}
            cards={currentDeck}
            currentIndex={currentIndex}
            progressState={progressState}
            onJumpToCard={(idx) => {
                logSession("Sidebar Jump", { index: idx });
                setCurrentIndex(idx);
                setIsFlipped(false);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            playSound={playSound}
         />

         <FlashcardBoard 
            selectedCategory={currentCategory}
            currentDeck={currentDeck}
            currentIndex={currentIndex}
            isFlipped={isFlipped}
            progressState={progressState}
            onFlip={handleFlip}
            onNext={handleNext}
            onPrev={handlePrev}
            onBackToCategories={onBack}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onLinkJump={handleLinkJump}
            playSound={playSound}
            isMuted={isMuted}
            toggleMute={toggleMute}
         />
      </div>
   );
};

// Wrapper
const AppWrapper = () => {
   const [view, setView] = useState<'menu' | 'flashcards' | 'matching'>('menu');
   const [category, setCategory] = useState<string | null>(null);
   // Lifted state to persist progress across menu navigation
   const [progressState, setProgressState] = useState<Record<string, { discovered: boolean, reviewed: boolean }>>({});
   
   // Sound Manager
   const { isMuted, toggleMute, playSound } = useSound();
   const [mascotTrigger, setMascotTrigger] = useState<{e: MascotEvent, c?: FlashcardData} | null>(null);

   // Log Mount
   useEffect(() => {
       logSession("App Mounted", { userAgent: navigator.userAgent });
   }, []);

   const handleStart = (cat: string | null, mode: 'flashcards' | 'matching') => {
      setCategory(cat);
      setView(mode);
   };

   const handleBack = () => {
      logSession("Navigated to Menu");
      setView('menu');
      setCategory(null);
   };
   
   return (
     <div className="flex h-screen w-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden">
        {/* Global Glitter Overlay */}
        <GlitterCanvas />

        {view === 'menu' ? (
           <>
              <CategoryMenu 
                 onSelectCategory={handleStart} 
                 totalCount={flashcardsData.length} 
                 playSound={playSound}
                 isMuted={isMuted}
                 toggleMute={toggleMute}
              />
              <DolphinMascot eventTrigger={null} playSound={playSound} />
           </>
        ) : view === 'flashcards' ? (
           <AppGame 
              sessionCategory={category} 
              onBack={handleBack} 
              progressState={progressState}
              setProgressState={setProgressState}
              playSound={playSound}
              isMuted={isMuted}
              toggleMute={toggleMute}
           />
        ) : (
            <>
                <MatchingGame 
                    category={category}
                    onBack={handleBack}
                    playSound={playSound}
                    isMuted={isMuted}
                    toggleMute={toggleMute}
                    triggerMascot={(e, c) => setMascotTrigger({e, c})}
                />
                <DolphinMascot eventTrigger={mascotTrigger?.e || null} currentCard={mascotTrigger?.c} playSound={playSound} />
            </>
        )}
     </div>
   );
};

export default AppWrapper;
