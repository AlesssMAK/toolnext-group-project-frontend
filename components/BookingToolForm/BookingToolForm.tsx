'use client';

import { useState } from 'react';

type Props = {
  toolId: string;
  pricePerDay: number;
};

export default function BookingForm({ toolId, pricePerDay }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any>(null);

  const [form, setForm] = useState({
    userFirstname: '',
    userLastname: '',
    userPhone: '',
    startDate: '',
    endDate: '',
    deliveryCity: '',
    deliveryBranch: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3030/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          toolId,
          userFirstname: form.userFirstname,
          userLastname: form.userLastname,
          userPhone: form.userPhone,
          startDate: form.startDate,
          endDate: form.endDate,
          deliveryCity: form.deliveryCity,
          deliveryBranch: form.deliveryBranch,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Помилка бронювання');
      }

      setSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 border p-4 rounded"
    >
      <h2 className="text-xl font-semibold">Підтвердження бронювання</h2>

      <div className="grid grid-cols-2 gap-3">
        <input
          name="userFirstname"
          placeholder="Імʼя"
          value={form.userFirstname}
          onChange={handleChange}
          required
        />
        <input
          name="userLastname"
          placeholder="Прізвище"
          value={form.userLastname}
          onChange={handleChange}
          required
        />
      </div>

      <input
        name="userPhone"
        placeholder="+380 50 123 45 67"
        value={form.userPhone}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <input
        name="deliveryCity"
        placeholder="Місто доставки"
        value={form.deliveryCity}
        onChange={handleChange}
        required
      />

      <input
        name="deliveryBranch"
        placeholder="Відділення / склад"
        value={form.deliveryBranch}
        onChange={handleChange}
        required
      />

      <div className="flex justify-between items-center pt-2">
        <span className="font-medium">Ціна: {pricePerDay} грн / день</span>
        <button disabled={loading}>
          {loading ? 'Зачекайте...' : 'Забронювати'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {success && (
        <div className="p-3 border rounded bg-green-50">
          <p className="font-medium">Бронювання створено ✅</p>
        </div>
      )}
    </form>
  );
}
