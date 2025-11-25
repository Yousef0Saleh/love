'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Surprise {
  id: number;
  password: string;
  partnerName: string;
  startDate: string;
  createdAt: string;
}

export default function AdminPage() {
  const [surprises, setSurprises] = useState<Surprise[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSurprises();
  }, []);

  const fetchSurprises = async () => {
    try {
      const response = await fetch('/api/surprises');
      if (response.ok) {
        const data = await response.json();
        setSurprises(data);
      }
    } catch (error) {
      console.error('Error fetching surprises:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه المفاجأة؟')) return;

    try {
      const response = await fetch(`/api/surprises?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSurprises();
      }
    } catch (error) {
      console.error('Error deleting surprise:', error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <h1 className="title" style={{ margin: 0 }}>
            لوحة التحكم 💕
          </h1>
          <button
            className="button"
            onClick={() => router.push('/admin/create')}
          >
            إنشاء مفاجأة جديدة ✨
          </button>
        </div>

        {surprises.length === 0 ? (
          <div className="card">
            <p className="subtitle">لا توجد مفاجآت بعد</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {surprises.map((surprise, index) => (
              <motion.div
                key={surprise.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: '30px' }}
              >
                <h3 style={{
                  fontSize: '24px',
                  color: '#ff1493',
                  marginBottom: '15px',
                }}>
                  {surprise.partnerName} 💕
                </h3>

                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '20px',
                }}>
                  <p><strong>كلمة السر:</strong> {surprise.password}</p>
                  <p><strong>تاريخ البداية:</strong> {new Date(surprise.startDate).toLocaleDateString('ar-EG')}</p>
                  <p><strong>تم الإنشاء:</strong> {new Date(surprise.createdAt).toLocaleDateString('ar-EG')}</p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '10px',
                }}>
                  <button
                    className="button"
                    style={{
                      flex: 1,
                      padding: '12px',
                      fontSize: '14px',
                    }}
                    onClick={() => window.open(`/surprise/${surprise.id}`, '_blank')}
                  >
                    عرض 👁️
                  </button>
                  <button
                    className="button"
                    style={{
                      flex: 1,
                      padding: '12px',
                      fontSize: '14px',
                      background: 'linear-gradient(135deg, #ff4444, #cc0000)',
                    }}
                    onClick={() => handleDelete(surprise.id)}
                  >
                    حذف 🗑️
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
