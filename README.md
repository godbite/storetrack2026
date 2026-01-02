# StoreAdmin Catalog Inventory Portal

A fast, responsive React application for store managers to browse, search, and analyze product inventory using the DummyJSON Product API.

- Live Data Source: https://dummyjson.com/products
- API Docs: https://dummyjson.com/docs/products

## Features (mapped to requirements)

- **Inventory Overview**

  - High-density table view with columns: Name, Price, Brand, Category, Stock, Rating, Discount.
  - Sort by `title`, `price`, `rating`, `stock` and order `asc/desc`.
  - Filter by Category and search by product name with debounced input.
  - Paged loading: loads a minimum of 20 items initially and supports Load More.

- **Product Details**

  - Rich detail page with image gallery, description, rating, discount info.
  - “Browse Similar Products” cards from the same category (limit 6).

- **Hierarchical Catalogue Overview**

  - Category grid with visual cards (category image fetched from first product thumbnail).
  - Drill-down into category shows the same reusable Inventory table for consistency.

- **Welcome Home Page**

  - Explains app capabilities and provides direct navigation to Inventory and Catalogue.

- **UX & Quality**
  - Loading states, graceful error messages, debounced search, progressive pagination.
  - Responsive layout for desktop, tablet, and mobile.
  - Consistent visual system via Chakra UI and a cohesive color palette.

## Tech Stack

- React 19, TypeScript, Vite 7
- react-router-dom 7 for routing
- Chakra UI 3 for UI components
- Axios for API requests

## Project Structure

```
src/
  components/
    category/CategoryGrid.tsx
    inventory/
      ProductFilters.tsx
      ProductSearch.tsx
      ProductTable.tsx
    layout/
      Layout.tsx
      Navbar.tsx
    product/
      ProductDetail.tsx
      RelatedProducts.tsx
  hooks/
    useProducts.ts
    useProduct.ts
    useCategories.ts
    useDebounce.ts
  pages/
    HomePage.tsx
    InventoryPage.tsx
    CategoryPage.tsx
    ProductDetailPage.tsx
  types/product.ts
  utils/api.ts
  App.tsx
```

## Routing

- `/` → HomePage
- `/inventory` → Inventory overview (table with search/sort/filter/pagination)
- `/categories` → CategoryGrid (visual catalogue overview)
- `/category/:categoryName` → Category drill-down using the same table pattern
- `/product/:id` → ProductDetailPage with related products

## Data Fetching & API Usage

- Base URL: `https://dummyjson.com`
- Key utilities in `utils/api.ts`:
  - `getProducts({ limit, skip, search, category, sortBy, order, select })` →
    - Routes: `/products`, `/products/search?q=`, `/products/category/:name`
  - `getProduct(id)` → `/products/:id`
  - `getCategories()` → `/products/categories` (enhanced to typed `Category`)
  - `getCategoryProducts(category, limit, skip)` → `/products/category/:name`
  - `searchProducts(query, limit)` → `/products/search?q=`

Hooks layer provides loading/error states:

- `useProducts` supports server-side search/sort/paging and client-side name filter when searching.
- `useProduct` for a single product.
- `useCategories` for category list.

## Performance & UX

- Debounced search input to avoid request storms (`useDebounce`).
- Minimum initial page size of 20 and Load More pagination to control memory usage.
- Conditional rendering for spinners and friendly error alerts.
- Reused table component across Inventory and Category drill-down for consistency.

## Getting Started

Prerequisites:

- Node.js 18+ and pnpm/yarn/npm

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Vite will print a local URL (typically http://localhost:5173).

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment

- No secrets required. All data is fetched from public DummyJSON endpoints.
- Network errors and empty states are handled gracefully in the UI.

## Design Decisions

- **Chakra UI** for rapid, accessible component styling and consistent theming.
- **Axios** client with a single base URL and minimal helpers for clarity.
- **Hooks** abstract data fetching and keep pages focused on presentation.
- **Router v7** clean route structure with dedicated pages and reusable components.

## Assumptions

- The DummyJSON API is treated as highly available and stable; no retry/backoff layer added to keep scope focused.
- Sorting and searching leverage DummyJSON query params; for “search by name only,” client-side filtering is applied on the fetched results to match the requirement exactly.
- Category images aren’t provided by the API; we derive a representative thumbnail from the first product in each category.
- Pagination uses a simple “Load More” model to balance simplicity and performance for a demo-scale project.
- Authentication/authorization is out of scope for the challenge.

## Potential Improvements

- Virtualized table for very large lists (e.g., react-virtual) and infinite scroll.
- Persist filters/sort/search to URL query params for shareable links.
- Add unit tests for hooks and components; add MSW for API mocking.
- Add error boundary and retry UI.
- Add dark mode toggle and theme tokens for extended branding.

## License

This project is provided for the coding assignment and educational purposes.
