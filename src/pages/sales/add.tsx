'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AddSalePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    quantity: 1,
    unitPrice: 0,
    customerName: '',
    buyPrice: 0,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const calculateProfit = () => {
    const totalPrice = formData.quantity * formData.unitPrice;
    const totalCost = formData.quantity * formData.buyPrice;
    return totalPrice - totalCost;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['quantity', 'unitPrice', 'buyPrice'].includes(name) ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.productName || formData.quantity <= 0 || formData.unitPrice <= 0) {
      setError('رجاء ملء الحقول المطلوبة');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Here you would normally send data to Firebase
      console.log('بيعة جديدة:', {
        ...formData,
        totalPrice: formData.quantity * formData.unitPrice,
        profit: calculateProfit()
      });

      // Redirect back to sales list
      router.push('/sales');
    } catch (err) {
      setError('حدث خطأ عند حفظ البيعة');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = formData.quantity * formData.unitPrice;
  const profit = calculateProfit();
  const profitMargin = totalPrice > 0 ? (profit / totalPrice) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/sales">
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                <ArrowRight size={20} />
                المبيعات
              </button>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">بيع جديدة</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">إضافة بيع جديدة</h1>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900">بيانات المنتج</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="مثال: زيت فرامل"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الكمية</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سعر الابيع (للوحدة)</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">سعر الشراء (للوحدة)</label>
              <input
                type="number"
                name="buyPrice"
                value={formData.buyPrice}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900">بيانات العميل</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم العميل (اختياري)</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="مثال: أحمد محمد"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900">معلومات إضافية</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="مثلاً: عميل جديد "
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">الإجمالي</p>
              <p className="text-2xl font-bold text-gray-900">{totalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">الربح</p>
              <p className="text-2xl font-bold text-green-600">{profit.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">هامش الربح</p>
              <p className="text-2xl font-bold text-orange-600">{profitMargin.toFixed(2)}%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ البيعة'}
            </button>
            <Link href="/sales" className="flex-1">
              <button type="button" className="w-full bg-gray-200 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                إلغاء
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalePage;
