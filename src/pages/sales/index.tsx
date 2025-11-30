'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit2, ShoppingCart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  profit: number;
  profitMargin: number;
  customerId?: string;
  customerName?: string;
  date: string;
  notes?: string;
}

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);

  // Load sales from localStorage (demo)
  useEffect(() => {
    setLoading(true);
    // Mock data for demo
    const mockSales: Sale[] = [
      {
        id: '1',
        productId: 'prod1',
        productName: 'زيت فرامل',
        quantity: 2,
        unitPrice: 105,
        totalPrice: 210,
        profit: 60,
        profitMargin: 28.57,
        customerName: 'أحمد محمد',
        date: new Date().toISOString().split('T')[0],
        notes: 'عميل جديد'
      },
      {
        id: '2',
        productId: 'prod2',
        productName: 'فلتر هواء',
        quantity: 1,
        unitPrice: 85,
        totalPrice: 85,
        profit: 25,
        profitMargin: 29.41,
        customerName: 'محمود علي',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        notes: 'عميل دائم'
      }
    ];
    setSales(mockSales);
    calculateTotals(mockSales);
    setLoading(false);
  }, []);

  const calculateTotals = (salesData: Sale[]) => {
    const total = salesData.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const profit = salesData.reduce((sum, sale) => sum + sale.profit, 0);
    const margin = total > 0 ? (profit / total) * 100 : 0;
    
    setTotalSales(total);
    setTotalProfit(profit);
    setProfitMargin(margin);
  };

  const filteredSales = sales.filter(sale =>
    sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  const handleDelete = (id: string) => {
    const updatedSales = sales.filter(sale => sale.id !== id);
    setSales(updatedSales);
    calculateTotals(updatedSales);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">المبيعات</h1>
              <p className="text-gray-600 mt-1">إدارة وتتبع المبيعات والأرباح</p>
            </div>
            <Link href="/sales/add">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                <Plus size={20} />
                بيع جديدة
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Sales Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المبيعات</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{totalSales.toFixed(2)} ج.م</p>
              </div>
              <ShoppingCart className="text-blue-500" size={40} />
            </div>
          </div>

          {/* Total Profit Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الأرباح</p>
                <p className="text-2xl font-bold text-green-600 mt-2">{totalProfit.toFixed(2)} ج.م</p>
              </div>
              <TrendingUp className="text-green-500" size={40} />
            </div>
          </div>

          {/* Profit Margin Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">هامش الربح</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">{profitMargin.toFixed(2)}%</p>
              </div>
              <div className="text-orange-500 text-3xl">📊</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ابحث عن منتج أو عميل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sales Table */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">المنتج</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">العميل</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الكمية</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">السعر الوحدة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الإجمالي</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الربح</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">التاريخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    جاري التحميل...
                  </td>
                </tr>
              ) : filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    لا توجد مبيعات. <Link href="/sales/add" className="text-blue-600 hover:underline">أضف مبيعة جديدة</Link>
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{sale.productName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sale.customerName || 'بدون عميل'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sale.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sale.unitPrice.toFixed(2)} ج.م</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{sale.totalPrice.toFixed(2)} ج.م</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{sale.profit.toFixed(2)} ج.م</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sale.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link href={`/sales/${sale.id}/edit`}>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit2 size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(sale.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
