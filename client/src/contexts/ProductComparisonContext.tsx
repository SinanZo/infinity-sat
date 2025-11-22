import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string | null;
  descriptionAr: string | null;
  price: number;
  image: string | null;
  categoryId: number | null;
  featuresEn: string | null;
  featuresAr: string | null;
  featured: number;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductComparisonContextType {
  comparisonProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
  canAddMore: boolean;
}

const ProductComparisonContext = createContext<ProductComparisonContextType | undefined>(undefined);

const MAX_COMPARISON_PRODUCTS = 4;

export function ProductComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length >= MAX_COMPARISON_PRODUCTS) {
      return;
    }
    if (!comparisonProducts.find(p => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setComparisonProducts(comparisonProducts.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonProducts([]);
  };

  const isInComparison = (productId: number) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  const canAddMore = comparisonProducts.length < MAX_COMPARISON_PRODUCTS;

  return (
    <ProductComparisonContext.Provider
      value={{
        comparisonProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        canAddMore,
      }}
    >
      {children}
    </ProductComparisonContext.Provider>
  );
}

export function useProductComparison() {
  const context = useContext(ProductComparisonContext);
  if (context === undefined) {
    throw new Error("useProductComparison must be used within a ProductComparisonProvider");
  }
  return context;
}
