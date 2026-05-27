# SneakerSpa Order Tracker - Project Guidelines

## Project Overview
A production-ready shoe cleaning store order tracking application built with:
- **Frontend**: Next.js 14 with React 18, TypeScript
- **UI**: Tailwind CSS with custom warm color palette (cream, orange, charcoal)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage Buckets
- **Icons**: Lucide React

## Project Structure

```
Vibecdd/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (REST endpoints)
│   ├── orders/            # Order pages (list, create, edit)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utilities (types, Supabase client, helpers)
├── database/              # Database schema and seed data
├── public/                # Static assets
├── .env.local.example    # Environment template
├── tailwind.config.ts    # Tailwind configuration
├── README.md             # Full documentation
├── SETUP.md              # Quick setup guide
└── package.json          # Dependencies
```

## Key Technologies & Patterns

### Next.js App Router
- Using `/app` directory structure
- API routes in `/app/api`
- Server-side and client-side rendering mixed appropriately
- `'use client'` directive for interactive components

### TypeScript
- Strict mode enabled
- Type definitions in `lib/types.ts`
- All components are fully typed

### Tailwind CSS
- Custom colors: `sneaker-*` and `cream-*` namespaces
- Custom components: `.card`, `.btn-primary`, `.input-field`, etc.
- Responsive utilities for mobile-first design

### Supabase Integration
- Client for browser: `supabase` (anon key)
- Server client for API routes: `supabaseServer` (service key)
- PostgreSQL database with RLS policies
- Storage buckets: `shoe-images`, `receipts`

## Coding Standards

### Component Guidelines
- Functional components with hooks only
- Use client components (`'use client'`) for interactivity
- Props should be typed with interfaces
- Export components as named exports

### File Naming
- Components: PascalCase (e.g., `OrderCard.tsx`)
- API routes: lowercase with brackets for dynamic (e.g., `[id]`)
- Utility files: snake_case or lowercase (e.g., `utils.ts`)

### Styling
- Use Tailwind utility classes
- Define custom styles in `globals.css` using `@layer`
- Use custom `.card` and `.btn-*` classes for consistency
- Color palette: Use `sneaker-*` and `cream-*` custom colors

### API Routes Best Practices
- Validate input data
- Handle errors gracefully with appropriate HTTP status codes
- Return JSON with `{ success: true/false, data: ..., error: ... }` format
- Use Supabase client library for queries

### State Management
- Use React hooks (useState, useEffect)
- Next.js Server Actions for server-side mutations
- API routes for complex operations

## Database Schema

### Orders Table
- **Primary Key**: `id` (UUID)
- **Customer Info**: `customer_name`, `customer_phone`
- **Service**: `service_availed` (enum: deep-clean, sole-whitening, repaint, leather-conditioning)
- **Status**: `status` (enum: pending, in-progress, ready-for-pickup, claimed)
- **Images**: `image_before_url`, `image_after_url` (URLs to Supabase Storage)
- **Dates**: `date_availed`, `date_claimed`
- **Payment**: `payment_mode` (enum: cash, bank-transfer, e-wallet), `payment_receipt_url` (nullable)
- **Price**: `total_price` (numeric)
- **Tracking**: `created_at`, `updated_at`

### Indexes
- Customer name and phone for search queries
- Status for filtering
- Date for sorting

## Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
```

Never commit `.env.local`; always use `.env.local.example` as template.

## Feature Guidelines

### Dashboard (`app/page.tsx`)
- Display key statistics (total orders, revenue, pending orders)
- Show recent orders (last 3)
- Provide links to order management

### Orders List (`app/orders/page.tsx`)
- Display all orders in grid layout
- Support search by customer name/phone
- Support filtering by status
- Responsive grid: 1 column mobile, 2 tablet, 3 desktop

### Create Order (`app/orders/new/page.tsx`)
- Form for creating new orders
- Image upload for before photo
- Image upload for after photo (optional)
- Submit to `/api/orders` POST endpoint
- Redirect to detail page on success

### Edit Order (`app/orders/[id]/page.tsx`)
- Load order from `/api/orders/[id]` GET
- Pre-populate form with existing data
- Allow updating all fields
- Allow deleting order
- Update to `/api/orders/[id]` PUT endpoint

## API Endpoints Reference

### GET /api/orders
- Query params: `?status=pending`, `?search=john`
- Returns: Array of orders

### POST /api/orders
- Body: Order data (customer, service, status, etc.)
- Returns: Created order with ID

### GET /api/orders/[id]
- Returns: Single order object

### PUT /api/orders/[id]
- Body: Partial order data to update
- Returns: Updated order

### DELETE /api/orders/[id]
- Returns: Success message

## Color Palette Reference

### Custom Tailwind Colors
- `sneaker-orange`: #FF6B35 (primary action)
- `sneaker-dark`: #1A1A1A (text)
- `sneaker-white`: #FAFAFA
- `sneaker-charcoal`: #2C2C2C
- `cream-50` through `cream-900`: Warm cream gradient

### Status Badge Colors
- `.status-pending`: Yellow
- `.status-in-progress`: Blue
- `.status-ready`: Green
- `.status-claimed`: Gray

## Common Tasks

### Add a New Field to Orders
1. Add to TypeScript types in `lib/types.ts`
2. Update Supabase schema with migration SQL
3. Update API routes in `app/api/orders/`
4. Update components that display orders
5. Update form in `components/OrderForm.tsx`

### Modify Styling
1. Update colors in `tailwind.config.ts` if global color change
2. Update Tailwind classes in components for specific changes
3. Add custom styles to `app/globals.css` using `@layer`

### Fix Build Errors
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## Testing Checklist

Before deploying:
- [ ] Dashboard loads with sample orders
- [ ] Can create new order with image
- [ ] Can search by customer name and phone
- [ ] Can filter by status
- [ ] Can edit order details
- [ ] Can delete order
- [ ] Images upload to Supabase
- [ ] Responsive on mobile (< 768px)
- [ ] Responsive on tablet (768px - 1024px)
- [ ] Responsive on desktop (> 1024px)
- [ ] No TypeScript errors: `npm run build`
- [ ] No console errors in DevTools

## Performance Considerations

- Images are uploaded to Supabase Storage (offload from server)
- Database indexes on frequently queried fields
- Pagination can be added to orders list if needed
- Use React.memo for expensive components if needed

## Security Practices

- Row Level Security (RLS) enabled in Supabase
- Service key stored server-side only
- Anon key stored in `NEXT_PUBLIC_*` only for browser
- Input validation on API routes
- File type validation for uploads

## Deployment

Recommended platform: **Vercel** (native Next.js support)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

For other platforms:
1. Run `npm run build`
2. Start with `npm start`
3. Set environment variables in platform config

## Future Enhancement Ideas

- Email/SMS notifications for customers
- Admin authentication and permissions
- Customer portal for pickup status
- Analytics dashboard
- Invoice generation
- Multi-location support
- Service packages and pricing
- Staff performance metrics

## References & Documentation

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

## Getting Help

1. Check README.md for component documentation
2. Check SETUP.md for configuration issues
3. Review similar existing components for patterns
4. Check Supabase docs for database questions
5. Check Next.js docs for routing and file structure questions
