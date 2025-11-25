'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import FlowerStep from './FlowerStep';
import SliderStep from './SliderStep';
import PoemStep from './PoemStep';

interface Surprise {
  id: number;
  password: string;
  partnerName: string;
  startDate: string;
  flowerMessage: string;
  finalPoem: string;
  musicUrl: string | null;
  images: string;
}

export default function SurprisePage() {
  const params = useParams();
  const [surprise, setSurprise] = useState<Surprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check session
    const sessionData = localStorage.getItem('surpriseSession');
    if (!sessionData) {
      router.push('/');
      return;
    }

    const session = JSON.parse(sessionData);
    const currentId = parseInt(params.id as string);

    // Validate that the session matches the current surprise ID
    if (session.surpriseId !== currentId) {
      router.push('/');
      return;
    }

    // Session expires after 24 hours
    const sessionAge = Date.now() - session.timestamp;
    if (sessionAge > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('surpriseSession');
      router.push('/');
      return;
    }

    const fetchSurprise = async () => {
      try {
        const response = await fetch(`/api/surprises/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setSurprise(data);
          // Set document title dynamically
          document.title = `Surprise for ${data.partnerName} 💕`;
        }
      } catch (error) {
        console.error('Error fetching surprise:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurprise();
  }, [params.id, router]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!surprise) {
    return (
      <div className="container">
        <div className="card">
          <h1 className="title">😢</h1>
          <p className="subtitle">المفاجأة غير موجودة</p>
        </div>
      </div>
    );
  }

  const images = JSON.parse(surprise.images);

  return (
    <>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <FlowerStep
              message={surprise.flowerMessage}
              onNext={() => setStep(2)}
              onFlowerClick={() => {
                if (audioRef.current) {
                  audioRef.current.play().catch(err => console.log('Audio play failed:', err));
                }
              }}
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <SliderStep
              images={images}
              startDate={surprise.startDate}
              onNext={() => setStep(3)}
            />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <PoemStep
              poem={surprise.finalPoem}
              onRestart={() => setStep(1)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio element for background music */}
      {surprise.musicUrl && (
        <>
          <audio ref={audioRef} src={surprise.musicUrl} loop />
          <button
            onClick={toggleMute}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              zIndex: 1000,
              color: '#ff69b4'
            }}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </>
      )}
    </>
  );
}
