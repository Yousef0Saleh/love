'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlowerStepProps {
  message: string;
  // musicUrl is no longer needed here; audio is handled at page level
  // musicUrl?: string | null;
  onNext: () => void;
  onFlowerClick: () => void;
}

export default function FlowerStep({ message, onNext, onFlowerClick }: FlowerStepProps) {
  const [showMessage, setShowMessage] = useState(false);
  // Removed internal audio ref; playback is controlled by parent.

  const handleFlowerClick = () => {
    setShowMessage(true);
    // Trigger music playback in parent component
    onFlowerClick();
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {!showMessage ? (
          <motion.div
            key="flower"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="card"
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFlowerClick}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ fontSize: '120px', marginBottom: '20px' }}
              >
                🌹
              </motion.div>
              <h2 className="title" style={{ fontSize: '32px', fontFamily: 'Almarai, cairo' }}>
                دوسي على الوردة 💕
              </h2>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{ maxWidth: '700px' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              style={{ fontSize: '80px', marginBottom: '30px' }}
            >
              💖
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p
                style={{
                  fontSize: '20px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '40px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message}
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="button"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next 💕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio element for background music */}
    </div>
  );
}
