# 🎨 Components Documentation

## Overview
This document describes all reusable components in the SneakerSpa application.

## Header Component (`Header.tsx`)

Navigation and branding header component.

**Props**: None

**Features**:
- Logo and brand name
- Navigation links to Dashboard and Orders
- Admin profile display
- Sticky positioning

**Usage**:
```tsx
<Header />
```

## StatCard Component (`StatCard.tsx`)

Displays a statistic card on the dashboard.

**Props**:
```tsx
interface StatCardProps {
  title: string              // Card title (e.g., "Total Orders")
  value: string | number     // Main value to display
  subtitle?: string          // Optional subtitle (e.g., "This month")
  icon?: ReactNode          // Optional icon from Lucide React
  variant?: 'default' | 'accent' | 'success'
}
```

**Features**:
- Multiple visual variants
- Icon support
- Responsive layout

**Usage**:
```tsx
<StatCard
  title="Daily Revenue"
  value={formatCurrency(1000)}
  subtitle="Today"
  icon={<TrendingUp className="w-6 h-6" />}
  variant="success"
/>
```

## OrderCard Component (`OrderCard.tsx`)

Displays individual order information with before/after images.

**Props**:
```tsx
interface OrderCardProps {
  order: Order  // Order object from database
}
```

**Features**:
- Before/after shoe images
- Status badge with color coding
- Customer information with phone number
- Order details (service, price, dates)
- Link to order details page

**Usage**:
```tsx
<OrderCard order={order} />
```

## OrderFilter Component (`OrderFilter.tsx`)

Search and filter component for the orders list.

**Props**:
```tsx
interface OrderFilterProps {
  onSearchChange: (value: string) => void
  onStatusChange: (status: OrderStatus | 'all') => void
  activeStatus: OrderStatus | 'all'
}
```

**Features**:
- Search by customer name or phone
- Filter by order status
- Visual feedback on active filters

**Usage**:
```tsx
<OrderFilter
  onSearchChange={handleSearch}
  onStatusChange={handleStatus}
  activeStatus={activeStatus}
/>
```

## OrderForm Component (`OrderForm.tsx`)

Form for creating and editing orders.

**Props**:
```tsx
interface OrderFormProps {
  initialData?: Order  // Pre-populated data for edit mode
  onSubmit: (data: any) => Promise<void>  // Submit handler
  isLoading?: boolean  // Loading state
}
```

**Features**:
- Customer information fields
- Service and status selection
- Date picker
- Payment mode selection
- Image upload with preview
- Price input with currency symbol
- Form validation

**Usage**:
```tsx
// Create mode
<OrderForm onSubmit={handleSubmit} />

// Edit mode
<OrderForm initialData={order} onSubmit={handleSubmit} />
```

## Custom Tailwind Components

### `.card`
Base card component with shadow and rounded corners.
```tsx
<div className="card">Content here</div>
```

### `.btn-primary`
Primary action button (orange background).
```tsx
<button className="btn-primary">Create Order</button>
```

### `.btn-secondary`
Secondary action button (cream background).
```tsx
<button className="btn-secondary">Cancel</button>
```

### `.input-field`
Styled input field with focus states.
```tsx
<input className="input-field" placeholder="Search..." />
```

### `.badge-status`
Status badge styling.
```tsx
<span className={`badge-status ${statusColor}`}>Pending</span>
```

### `.heading-lg`, `.heading-md`, `.heading-sm`
Typography utilities for headings.
```tsx
<h1 className="heading-lg">Dashboard</h1>
<h2 className="heading-md">Recent Orders</h2>
<h3 className="heading-sm">Order Details</h3>
```

### `.grid-cols-responsive`
Responsive grid that adapts to screen size.
```tsx
<div className="grid-cols-responsive">
  {items.map(item => <div key={item.id}>{item}</div>)}
</div>
```

## Creating New Components

### Best Practices

1. **Use TypeScript interfaces for props**:
```tsx
interface MyComponentProps {
  title: string
  onAction: () => void
  variant?: 'primary' | 'secondary'
}
```

2. **Use 'use client' directive for interactive components**:
```tsx
'use client'

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>
}
```

3. **Apply Tailwind classes consistently**:
```tsx
export function Button({ children, variant = 'primary' }: ButtonProps) {
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  }
  return <button className={styles[variant]}>{children}</button>
}
```

4. **Export as named export**:
```tsx
// ✅ Correct
export function MyComponent() {}

// ❌ Avoid
export default function MyComponent() {}
```

5. **Document with comments**:
```tsx
/**
 * Displays a loading spinner while data is being fetched
 * @param size - Size of spinner: 'sm', 'md', 'lg'
 */
export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  // ...
}
```

## Icon Usage

All icons come from Lucide React. Common icons used:

- `<ShoppingCart />` - Orders
- `<TrendingUp />` - Revenue
- `<CheckCircle2 />` - Completed orders
- `<AlertCircle />` - Pending/issues
- `<Search />` - Search
- `<Filter />` - Filtering
- `<Upload />` - File upload
- `<Trash2 />` - Delete
- `<Phone />` - Phone number
- `<Sparkles />` - Branding/premium

Find more at [lucide.dev](https://lucide.dev)

## Responsive Design

All components follow mobile-first responsive design:

```css
/* Mobile first: default styles for mobile */
.component {
  @apply text-sm;
}

/* Tablet and up */
@screen md {
  .component {
    @apply text-base;
  }
}

/* Desktop and up */
@screen lg {
  .component {
    @apply text-lg;
  }
}
```

Breakpoints:
- Mobile: < 768px
- Tablet (md): 768px - 1024px
- Desktop (lg): > 1024px

## Color Usage

Always use semantic color classes:

```tsx
// ✅ Correct
<div className="card bg-white border-sneaker-dark/5">
  <h1 className="text-sneaker-dark">Title</h1>
  <button className="btn-primary">Action</button>
</div>

// ❌ Avoid
<div className="card bg-blue-50 border-gray-300">
  <h1 className="text-gray-900">Title</h1>
  <button className="bg-red-500">Action</button>
</div>
```

## Testing Components

When testing:
1. Verify responsive layout on mobile, tablet, desktop
2. Check keyboard accessibility
3. Test with long content
4. Verify color contrast
5. Test empty states

---

**Last Updated**: May 2024
