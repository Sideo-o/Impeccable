# 👟 SneakerSpa - Shoe Cleaning Store Order Tracker

A modern, loveable, and production-ready web application for managing shoe cleaning orders. Built with Next.js, Supabase, and Tailwind CSS.

## 🌟 Features

- **Dashboard**: Overview of active orders, revenue, and order statistics
- **Order Management**: Create, read, update, and delete shoe cleaning orders
- **Real-time Search & Filter**: Find orders by customer name or phone, filter by status
- **Image Upload**: Store before/after shoe photos in Supabase Storage
- **Responsive Design**: Fully mobile-friendly interface
- **Modern UI**: Premium aesthetic with warm color palette (cream, orange, charcoal)
- **Type-Safe**: Built with TypeScript for better code quality

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom color palette
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage Buckets
- **Language**: TypeScript

## 📋 Database Schema

### Orders Table
```sql
- id: UUID (Primary Key)
- customer_name: Text
- customer_phone: Text
- service_availed: Enum (Deep Clean, Sole Whitening, Repaint, Leather Conditioning)
- status: Enum (Pending, In Progress, Ready for Pickup, Claimed)
- image_before_url: Text (URL to Supabase Storage)
- image_after_url: Text (URL to Supabase Storage, nullable)
- date_availed: Timestamp with timezone
- date_claimed: Timestamp with timezone (nullable)
- payment_mode: Enum (Cash, Bank Transfer, E-Wallet)
- payment_receipt_url: Text (nullable)
- total_price: Numeric (Decimal)
- created_at: Timestamp
- updated_at: Timestamp
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier available at https://supabase.com)

### 1. Clone and Install
```bash
cd Vibecdd
npm install
```

### 2. Supabase Setup

#### Create a Supabase Project
1. Go to https://supabase.com and sign up
2. Create a new project
3. Get your project URL and API keys from the project settings

#### Set Up Database Schema
1. In Supabase, go to SQL Editor
2. Run the SQL from `database/schema.sql`
3. This creates the `orders` table, indexes, and sample data

#### Create Storage Buckets
1. In Supabase, go to Storage
2. Create a bucket named `shoe-images`
3. Set it to private (you can change to public if preferred)
4. Create another bucket named `receipts` for payment receipts (optional)

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.local.example first
cp .env.local.example .env.local
```

Then update with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-name.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

Get these values from:
- **Supabase URL**: Project Settings → API → Project URL
- **Anon Key**: Project Settings → API → Project API Keys (anon key)
- **Service Key**: Project Settings → API → Project API Keys (service_role key)

### 4. Run the Application

```bash
# Development server
npm run dev

# Open http://localhost:3000 in your browser
```

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Vibecdd/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── orders/              # Order endpoints
│   ├── orders/                  # Order pages
│   │   ├── page.tsx            # Orders list
│   │   ├── new/                # Create order page
│   │   └── [id]/               # Edit order page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── Header.tsx              # Navigation header
│   ├── StatCard.tsx            # Dashboard stat cards
│   ├── OrderCard.tsx           # Order display card
│   ├── OrderFilter.tsx         # Search & filter
│   └── OrderForm.tsx           # Create/edit form
├── lib/                        # Utilities and helpers
│   ├── types.ts               # TypeScript types
│   ├── supabase.ts            # Supabase client
│   └── utils.ts               # Helper functions
├── database/                  # Database files
│   └── schema.sql            # SQL schema
├── public/                    # Static assets
├── .env.local.example        # Environment template
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies
```

## 🎨 Color Palette

The application uses a warm, premium aesthetic:

- **Primary Orange**: `#FF6B35` (Call-to-action buttons)
- **Cream Background**: `#FFFAF5` (Main background)
- **Deep Charcoal**: `#1A1A1A` (Text)
- **Warm Accent**: `#FFB366`

Custom Tailwind colors are defined in `tailwind.config.ts` under the `sneaker` and `cream` color namespaces.

## 🔧 API Endpoints

All timestamps in ISO format with timezone info.

### Orders

- `GET /api/orders` - Fetch all orders (supports `?status=` and `?search=` queries)
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get specific order
- `PUT /api/orders/[id]` - Update order
- `DELETE /api/orders/[id]` - Delete order

### Request/Response Example

**Create Order Request:**
```json
{
  "customer_name": "Juan Santos",
  "customer_phone": "+63 917 123 4567",
  "service_availed": "deep-clean",
  "status": "pending",
  "image_before_url": "https://...",
  "date_availed": "2024-05-27T10:00:00Z",
  "payment_mode": "cash",
  "total_price": 1200
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "customer_name": "Juan Santos",
    ...
    "created_at": "2024-05-27T10:15:00Z",
    "updated_at": "2024-05-27T10:15:00Z"
  }
}
```

## 📦 Key Components

### StatCard
Displays statistics on the dashboard (total orders, revenue, etc.)

```tsx
<StatCard
  title="Daily Revenue"
  value={formatCurrency(dailyRevenue)}
  icon={<TrendingUp className="w-6 h-6" />}
  variant="success"
/>
```

### OrderCard
Displays individual order information with before/after images

```tsx
<OrderCard order={order} />
```

### OrderFilter
Search and filter orders by status

```tsx
<OrderFilter
  onSearchChange={handleSearch}
  onStatusChange={handleStatus}
  activeStatus={status}
/>
```

### OrderForm
Form for creating/editing orders with image upload support

```tsx
<OrderForm initialData={order} onSubmit={handleSubmit} />
```

## 🔐 Security Notes

- Supabase Row Level Security (RLS) policies are configured in the schema
- Only authenticated users can access orders
- API keys are stored in `.env.local` (never commit this file)
- Images are uploaded to Supabase Storage with signatures
- Service key should only be used server-side

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components are fully responsive and tested on mobile devices.

## 🐛 Troubleshooting

### Orders not loading
- Check `.env.local` contains correct Supabase URL and keys
- Verify network request in browser DevTools
- Check Supabase SQL editor for table creation errors

### Images not uploading
- Verify `shoe-images` bucket exists in Supabase Storage
- Check bucket permissions (set to private first)
- Validate file size and format (JPEG, PNG, WebP, max 5MB)

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## 📝 Sample Data

The database includes 4 pre-loaded shoe cleaning orders with realistic data:
1. Juan Santos - Deep Clean (Claimed)
2. Maria Angeles - Sole Whitening (Ready for Pickup)
3. Roberto Cruz - Leather Conditioning (In Progress)
4. Carmen Lopez - Repaint (Pending)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
git push origin main
# Vercel auto-deploys on push
```

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with one click

### Deploy to Other Platforms

Add your environment variables to the hosting platform's configuration before deploying.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

## 📄 License

This project is provided as-is for educational and commercial use.

## 💡 Future Enhancements

- [ ] Generate PDF invoices for orders
- [ ] Send SMS/email notifications to customers
- [ ] Admin dashboard with analytics
- [ ] Customer portal for order tracking
- [ ] Inventory management for services
- [ ] Integration with payment gateways
- [ ] Multi-location support
- [ ] Performance metrics and KPIs

---

**Built with ❤️ for premium shoe care businesses**
