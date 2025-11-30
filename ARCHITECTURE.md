# Inventory Management System - Architecture & Implementation Guide

## Overview
Investory Management System for Al-Zaeem Auto Parts Store - A complete web application for managing inventory, purchases, sales, and warehouse operations.

## Tech Stack
- **Frontend**: React 18 + Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Realtime Database / Firestore
- **State Management**: React Context API + Custom Hooks
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure
```
inventory-alzaeem/
├── src/
│   ├── pages/
│   │   ├── index.tsx              # Dashboard
│   │   ├── inventory/
│   │   │   ├── index.tsx        # Products List
│   │   │   ├── [id]/
│   │   │   │   ├── edit.tsx   # Edit Product
│   │   │   └── add.tsx        # Add Product
│   │   ├── purchases/
│   │   │   ├── index.tsx    # Purchases List
│   │   │   └── add.tsx     # Add Purchase
│   │   ├── sales/
│   │   │   ├── index.tsx  # Sales List
│   │   │   └── add.tsx   # Add Sale
│   │   ├── reports/
│   │   │   ├── index.tsx        # Reports Dashboard
│   │   │   ├── sales.tsx        # Sales Report
│   │   │   ├── purchases.tsx    # Purchases Report
│   │   │   └── profit.tsx       # Profit Report
│   │   └── settings/
│   │       ├── index.tsx      # Settings
│   │       └── categories.tsx # Manage Categories
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── Dashboard/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── DashboardGrid.tsx
│   │   ├── Products/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   └── ProductTable.tsx
│   │   ├── Common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── Forms/
│   │       ├── FormField.tsx
│   │       ├── FormSelect.tsx
│   │       └── FormDatePicker.tsx
│   ├── hooks/
│   │   ├── useFirebase.ts
│   │   ├── useProducts.ts
│   │   ├── usePurchases.ts
│   │   ├── useSales.ts
│   │   └── useAuth.ts
│   ├── services/
│   │   ├── firebase.ts
│   │   ├── products.service.ts
│   │   ├── purchases.service.ts
│   │   ├── sales.service.ts
│   │   └── reports.service.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── InventoryContext.tsx
│   │   └── NotificationContext.tsx
│   ├── types/
│   │   ├── index.ts
│   │   ├── product.ts
│   │   ├── purchase.ts
│   │   ├── sale.ts
│   │   └── user.ts
│   ├── utils/
│   │   ├── calculations.ts
│   │   ├── formatting.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   └── _app.tsx
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Key Features

### 1. Product Management
- Add, Edit, Delete products
- Search and filter by category/type
- Automatic calculation of totals (quantity × price)
- Track inventory levels
- Multiple categories support

### 2. Purchase Management
- Record incoming purchases from suppliers
- Automatic inventory updates
- Invoice tracking
- Supplier information
- Purchase history

### 3. Sales Management
- Record product sales
- Calculate profit margins
- Customer tracking
- Sales history
- Automatic inventory deduction

### 4. Dashboard & Reports
- Real-time inventory status
- Sales charts & analytics
- Profit/Loss reports
- Top-selling products
- Stock level warnings
- Monthly/Yearly summaries

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  buyTotal: number;        // quantity × buyPrice
  sellTotal: number;       // quantity × sellPrice
  dateAdded: Date;
  carModel?: string[];
  filters?: string[];
  invoiceNumber?: string;
  status: 'active' | 'inactive';
}
```

### Purchase
```typescript
interface Purchase {
  id: string;
  productId: string;
  supplierId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;      // quantity × unitPrice
  invoiceNumber: string;
  date: Date;
  notes?: string;
}
```

### Sale
```typescript
interface Sale {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;      // quantity × unitPrice
  profit: number;          // (unitPrice - buyPrice) × quantity
  customerId?: string;
  date: Date;
  notes?: string;
}
```

## Formulas & Calculations

### Inventory Totals
- **Buy Total** = Quantity × Buy Price
- **Sell Total** = Quantity × Sell Price
- **Total Inventory Value** = SUM(Sell Total for all products)

### Sales Calculations
- **Sale Price** = Unit Price × Quantity
- **Cost** = Buy Price × Quantity  
- **Profit** = (Unit Price - Buy Price) × Quantity
- **Profit Margin %** = (Profit / Sale Price) × 100

### Reports
- **Total Sales** = SUM(Sale Price)
- **Total Cost** = SUM(Cost of sold items)
- **Gross Profit** = Total Sales - Total Cost
- **Average Daily Sales** = Total Sales / Number of Days

## Firebase Setup

1. Create Firebase project
2. Enable Realtime Database
3. Set up authentication (Email/Password)
4. Configure security rules
5. Add environment variables

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in Firebase config

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel
4. Deploy automatically on push

## Best Practices

- Use TypeScript for type safety
- Implement error boundaries
- Add loading states for async operations
- Cache Firebase queries
- Optimize images
- Implement proper error handling
- Use React Context for global state
- Add input validation
- Implement pagination for large datasets

## Future Enhancements

- [ ] Multi-user support with roles
- [ ] PDF export for reports
- [ ] Barcode scanning
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Supplier management system
- [ ] Customer loyalty program
- [ ] Automated restocking alerts
- [ ] Integration with accounting software
- [ ] Multi-warehouse support
