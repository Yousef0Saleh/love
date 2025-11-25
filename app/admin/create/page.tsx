'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CreateSurprisePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    partnerName: '',
    startDate: '',
    flowerMessage: '',
    finalPoem: `على طول 🎀\nمهما الدنيا ودتنا فين...\n\nهتفضل إنت أغلى حد عندي،\n\nأمانى وبيتي اللي برتاح فيه 🎀`,
    musicUrl: '',
  });
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validUrls = imageUrls.filter(url => url.trim() !== '');

    if (validUrls.length === 0) {
      setError('يجب إضافة رابط صورة واحد على الأقل');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/surprises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: validUrls,
        }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.error || 'حدث خطأ');
      }
    } catch (err) {
      setError('حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <h1 className="title" style={{ marginBottom: '40px' }}>
          إنشاء مفاجأة جديدة ✨
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px', textAlign: 'right' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#ff1493' }}>
              كلمة السر *
            </label>
            <input
              type="text"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="كلمة سر فريدة للمفاجأة"
            />
          </div>

          <div style={{ marginBottom: '25px', textAlign: 'right' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#ff1493' }}>
              اسم الشريك *
            </label>
            <input
              type="text"
              name="partnerName"
              className="input"
              value={formData.partnerName}
              onChange={handleInputChange}
              required
              placeholder="اسم الشخص المفاجأة له"
            />
          </div>

          <div style={{ marginBottom: '25px', textAlign: 'right' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#ff1493' }}>
              تاريخ بداية العلاقة *
            </label>
            <input
              type="date"
              name="startDate"
              className="input"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={{ marginBottom: '25px', textAlign: 'right' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#ff1493' }}>
              رسالة الوردة *
            </label>
            <textarea
              name="flowerMessage"
              className="input"
              value={formData.flowerMessage}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="الرسالة الطويلة التي ستظهر بعد الضغط على الوردة"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '25px', textAlign: 'right' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#ff1493' }}>
              القصيدة النهائية *
            </label>
            <textarea
              name="finalPoem"
              className="input"
              value={formData.finalPoem}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="القصيدة أو الرسالة النهائية"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '25px', textAlign: 'right' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#ff1493' }}>
              رابط الأغنية (اختياري)
            </label>
            <input
              type="url"
              name="musicUrl"
              className="input"
              value={formData.musicUrl}
              onChange={handleInputChange}
              placeholder="رابط ملف الأغنية (mp3)"
            />
          </div>

          <div style={{ marginBottom: '30px', textAlign: 'right' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#ff1493' }}>
              روابط الصور * (رابط واحد على الأقل)
            </label>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
              استخدم روابط من Imgur أو Google Drive أو أي خدمة تخزين سحابية
            </p>
            {imageUrls.map((url, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="url"
                  className="input"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required={index === 0}
                  style={{ flex: 1 }}
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    style={{
                      background: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      cursor: 'pointer',
                    }}
                  >
                    حذف
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageUrl}
              style={{
                background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              + إضافة رابط صورة
            </button>
          </div>

          {error && <div className="error" style={{ marginBottom: '20px' }}>{error}</div>}

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              type="button"
              className="button"
              onClick={() => router.push('/admin')}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #999, #666)',
              }}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="button"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء المفاجأة 💕'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
