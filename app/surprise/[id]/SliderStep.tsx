'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SliderStepProps {
  images: string[];
  startDate: string;
  onNext: () => void;
}

export default function SliderStep({ images, startDate, onNext }: SliderStepProps) {
  const [timeElapsed, setTimeElapsed] = useState('');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ maxWidth: '900px', padding: '40px', borderRadius: '20px', overflow: 'hidden' }}
      >
        <h2 className="title" style={{ fontSize: '36px', marginBottom: '30px' }}>
          Our Memories 🎀
        </h2>

        <div style={{ marginBottom: '30px' }}>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            loop={true}
            style={{ borderRadius: '15px', height: '500px', paddingBottom: '40px' }}
          >
            {images.map((image, i) => (
              <SwiperSlide key={i}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '15px'
                }}>
                  <img
                    src={image}
                    alt={`Slide ${i + 1}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => {
                      setIndex(i);
                      setOpen(true);
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            color: 'white',
            padding: '25px',
            borderRadius: '20px',
            marginBottom: '30px',
            fontSize: '18px',
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          🎀 We've been together for {timeElapsed} 🎀
        </motion.div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={images.map(src => ({ src }))}
          plugins={[Zoom]}
        />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="button"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next 💖
        </motion.button>
      </motion.div>
    </div>
  );
}
