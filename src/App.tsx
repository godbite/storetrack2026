import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { InventoryPage } from "@/pages/InventoryPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { CategoryGrid } from "@/components/category/CategoryGrid";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/categories" element={<CategoryGrid />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
