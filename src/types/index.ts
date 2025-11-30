// Product Type
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  minStock: number;
  maxStock: number;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Purchase Type
export interface Purchase {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  buyPrice: number;
  buyTotal: number; // quantity * buyPrice
  supplier: string;
  supplierPhone?: string;
  invoiceNumber: string;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sale Type
export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number; // quantity * unitPrice
  buyPrice: number;
  profit: number; // (unitPrice - buyPrice) * quantity
  profitMargin: number; // (profit / totalPrice) * 100
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Stats Type
export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  totalInventoryValue: number; // SUM(product.quantity * product.sellPrice)
  totalSales: number; // SUM(sale.totalPrice)
  totalProfit: number; // SUM(sale.profit)
  averageProfitMargin: number; // average of all profit margins
  totalPurchases: number; // SUM(purchase.buyTotal)
  salesThisMonth: number;
  profitThisMonth: number;
}

// Customer Type
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  totalPurchases: number;
  createdAt: Date;
  updatedAt: Date;
}

// Supplier Type
export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  bankAccount?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Report Type
export interface SalesReport {
  id: string;
  date: Date;
  totalSales: number;
  totalProfit: number;
  profitMargin: number;
  itemsSold: number;
  topProduct: Product;
}

export interface InventoryReport {
  id: string;
  date: Date;
  totalValue: number;
  totalItems: number;
  lowStockCount: number;
  products: Product[];
}

// User/Admin Type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  createdAt: Date;
  updatedAt: Date;
}
