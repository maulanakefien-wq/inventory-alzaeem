# تثبيت وتشغيل نظام إدارة المخزون
# Installation & Setup Guide - Inventory Management System

## المتطلبات | Prerequisites

- Node.js 16+ و npm
- Git
- Firebase Project
- Firebase Credentials

## خطوات التثبيت | Installation Steps

### 1. استنساخ المستودع | Clone Repository
```bash
git clone https://github.com/maulanakefien-wq/inventory-alzaeem.git
cd inventory-alzaeem
```

### 2. تثبيت الحزم | Install Dependencies
```bash
npm install
```

### 3. إعداد متغيرات البيئة | Configure Environment
```bash
cp .env.example .env.local
```

ثم قم بتحرير `.env.local` وأدخل بيانات Firebase:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. تشغيل خادم التطوير | Run Development Server
```bash
npm run dev
```

ثم افتح `http://localhost:3000` في المتصفح.

## البناء للإنتاج | Build for Production

```bash
npm run build
npm run start
```

## النشر على Vercel | Deploy to Vercel

### الطريقة الأولى: من خلال Git

1. ادفع التغييرات إلى GitHub
2. اذهب إلى https://vercel.com
3. انقر على "Import Project"
4. اختر المستودع `inventory-alzaeem`
5. أضف متغيرات البيئة في إعدادات Vercel
6. انقر على "Deploy"

### الطريقة الثانية: استخدام Vercel CLI

```bash
npm install -g vercel
vercel
```

## الهيكل المشروع | Project Structure

```
inventory-alzaeem/
├── src/
│   ├── types/          # TypeScript type definitions
│   ├── config/         # Firebase configuration
│   ├── services/       # Business logic & API services
│   ├── components/     # Reusable React components
│   ├── pages/          # Next.js pages
│   │   ├── sales/      # Sales management
│   │   ├── purchases/  # Purchase management
│   │   └── inventory/  # Inventory management
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── next.config.js      # Next.js config
└── .env.example        # Environment template
```

## المميزات | Features

✅ إدارة المبيعات - Sales Management
✅ إدارة المشتريات - Purchase Management
✅ إدارة المخزون - Inventory Management
✅ حسابات الأرباح - Profit Calculations
✅ دعم اللغة العربية - Arabic Language Support
✅ Firebase Firestore - Real-time Database
✅ واجهة استخدام حديثة - Modern UI with Tailwind CSS
✅ Type-Safe TypeScript - Full TypeScript Support

## الدعم | Support

للمساعدة أو الإبلاغ عن المشاكل، يرجى فتح issue على GitHub.
