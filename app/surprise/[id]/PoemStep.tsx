'use client';

import { motion } from 'framer-motion';

interface PoemStepProps {
  poem: string;
  onRestart: () => void;
}

export default function PoemStep({ poem, onRestart }: PoemStepProps) {
  const lines = poem.split('\n').filter(line => line.trim());

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card"
        style={{ maxWidth: '700px' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          style={{ fontSize: '80px', marginBottom: '40px' }}
        >
          🎀
        </motion.div>

        <div style={{ marginBottom: '50px' }}>
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.8,
                duration: 0.6,
              }}
              style={{
                fontSize: '24px',
                lineHeight: '1.8',
                color: '#ff1493',
                marginBottom: '20px',
                fontWeight: '500',
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: lines.length * 0.8 + 1 }}
          className="button"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Restart 🔄
        </motion.button>
      </motion.div>
    </div>
  );
}
