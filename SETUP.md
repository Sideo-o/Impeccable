# 🚀 Quick Setup Guide - SneakerSpa Order Tracker

Follow these steps to get your shoe cleaning order tracker running in less than 10 minutes!

## Step 1: Install Dependencies

```bash
cd c:\xampp\htdocs\Vibecdd
npm install
```

**Estimated time: 3-5 minutes**

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New project"
4. Fill in project details:
   - **Project name**: `shoe-cleaning-tracker` (or your choice)
   - **Database password**: Create a strong password
   - **Region**: Choose closest to your location
5. Click "Create new project" and wait 2-3 minutes for it to initialize

**Estimated time: 5 minutes**

## Step 3: Set Up Database Schema

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy the entire contents of `database/schema.sql`
4. Paste into the SQL editor
5. Click **Run** button (or Ctrl+Enter)
6. Wait for the query to complete successfully

**Estimated time: 2 minutes**

## Step 4: Get Your API Keys

1. In Supabase dashboard, go **Settings** → **API**
2. Copy these values:
   - **Project URL**: Top of the page (looks like `https://xxxxx.supabase.co`)
   - **anon key**: Under "Project API keys" → "anon"
   - **service_role key**: Under "Project API keys" → "service_role"

**Estimated time: 1 minute**

## Step 5: Create Storage Buckets

1. In Supabase dashboard, go **Storage** (left sidebar)
2. Click **New bucket**
3. Create bucket named: `shoe-images`
   - Privacy: Set to **Private**
   - Click **Create bucket**
4. (Optional) Repeat for `receipts` bucket

**Estimated time: 2 minutes**

## Step 6: Configure Environment Variables

1. In the project root (`c:\xampp\htdocs\Vibecdd`), create file `.env.local`
2. Add the following (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-name.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijkl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Estimated time: 2 minutes**

## Step 7: Run the Application

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

You should see:
- ✅ Dashboard with sample orders
- ✅ Order statistics (Total Orders, Daily Revenue, etc.)
- ✅ 4 pre-loaded shoe cleaning orders
- ✅ Fully functional order management system

**Estimated time: 1 minute**

## Testing the Application

### Try These Features:

1. **Dashboard**: View order statistics and recent orders
2. **View All Orders**: Navigate to Orders page
3. **Search Orders**: Type a customer name in the search bar
4. **Filter by Status**: Click status filter buttons
5. **Create New Order**: 
   - Click "+ New Order" button
   - Fill in customer details
   - Upload a shoe image
   - Submit
6. **Edit Order**: Click "View Details" on any order to edit
7. **Update Status**: Change status to see different badge colors
8. **Delete Order**: Use the delete button when editing an order

## 🎨 Color Palette Preview

The app uses a premium, warm aesthetic:
- **Background**: Warm cream (#FFFAF5)
- **Primary**: Retro orange (#FF6B35)
- **Text**: Deep charcoal (#1A1A1A)
- **Accent**: Soft cream and warm tones

## 📱 Responsive Design

The application works seamlessly on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

Try resizing your browser window to see responsive behavior!

## 🔧 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install --save @supabase/supabase-js
```

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Check `.env.local` file exists
- Verify all three environment variables are set
- Restart the dev server: Stop with Ctrl+C, then `npm run dev`

### "Failed to fetch orders" error
- Check Supabase project is online (should show green status)
- Verify `orders` table exists in SQL editor
- Make sure environment variables are correct
- Check browser DevTools → Network tab for error details

### Images not uploading
- Verify `shoe-images` bucket exists in Storage
- Check bucket is set to Private
- Verify image is JPEG/PNG/WebP and under 5MB
- Check browser console for error messages

### Build errors with TypeScript
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Project Files Overview

| File/Folder | Purpose |
|---|---|
| `app/` | Next.js app directory with pages and API routes |
| `components/` | Reusable React components |
| `lib/` | Utility functions and Supabase client |
| `database/schema.sql` | Database schema and seed data |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `.env.local` | Environment variables (create this file) |

## 🚀 Next Steps

### Deploy to Production

#### Option 1: Vercel (Easiest)
1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables
5. Click Deploy ✅

#### Option 2: Docker
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 💡 Tips & Best Practices

1. **Always commit `.env.local` to `.gitignore`**
   - Never share your API keys!

2. **Use Supabase Row Level Security (RLS)**
   - Already configured in `schema.sql`
   - Adds extra security layer

3. **Image Optimization**
   - Currently uses 5MB limit per file
   - Consider using image compression for faster uploads

4. **Backup Your Data**
   - Export orders regularly from Supabase
   - Use Supabase's built-in backup feature

5. **Monitor Database Performance**
   - Check Supabase logs for errors
   - Use query performance insights

## 📞 Support

For issues, check:
1. [Next.js Docs](https://nextjs.org/docs)
2. [Supabase Docs](https://supabase.com/docs)
3. Browser DevTools → Console for error messages
4. Supabase Dashboard → Logs for server errors

---

## ✅ Success Checklist

Before you start managing orders, verify:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Project dependencies installed (`npm list react`)
- [ ] Supabase project created and online
- [ ] Database schema created (4 sample orders visible)
- [ ] Storage buckets created
- [ ] `.env.local` file created with all 3 keys
- [ ] Dev server running without errors (`npm run dev`)
- [ ] Can access `http://localhost:3000` in browser
- [ ] Dashboard shows the 4 sample orders
- [ ] Can create, edit, and delete orders

Enjoy your new order management system! 🎉

**Estimated Total Setup Time: 10-15 minutes**
