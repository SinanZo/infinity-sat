import { describe, expect, it } from "vitest";

describe("Product Comparison Logic", () => {
  interface Product {
    id: number;
    nameEn: string;
    nameAr: string;
    price: number;
  }

  const mockProducts: Product[] = [
    { id: 1, nameEn: "Product 1", nameAr: "منتج 1", price: 100 },
    { id: 2, nameEn: "Product 2", nameAr: "منتج 2", price: 200 },
    { id: 3, nameEn: "Product 3", nameAr: "منتج 3", price: 300 },
    { id: 4, nameEn: "Product 4", nameAr: "منتج 4", price: 400 },
    { id: 5, nameEn: "Product 5", nameAr: "منتج 5", price: 500 },
  ];

  const MAX_COMPARISON_PRODUCTS = 4;

  describe("Add to Comparison", () => {
    it("should add product to comparison list", () => {
      const comparisonProducts: Product[] = [];
      const productToAdd = mockProducts[0];

      if (!comparisonProducts.find(p => p?.id === productToAdd?.id)) {
        comparisonProducts.push(productToAdd!);
      }

      expect(comparisonProducts).toHaveLength(1);
      expect(comparisonProducts[0]?.id).toBe(1);
    });

    it("should not add duplicate products", () => {
      const comparisonProducts: Product[] = [mockProducts[0]!];
      const productToAdd = mockProducts[0];

      if (!comparisonProducts.find(p => p?.id === productToAdd?.id)) {
        comparisonProducts.push(productToAdd!);
      }

      expect(comparisonProducts).toHaveLength(1);
    });

    it("should allow adding up to 4 products", () => {
      const comparisonProducts: Product[] = [];

      for (let i = 0; i < 4; i++) {
        if (comparisonProducts.length < MAX_COMPARISON_PRODUCTS) {
          comparisonProducts.push(mockProducts[i]!);
        }
      }

      expect(comparisonProducts).toHaveLength(4);
    });

    it("should not allow adding more than 4 products", () => {
      const comparisonProducts: Product[] = [];

      for (let i = 0; i < 5; i++) {
        if (comparisonProducts.length < MAX_COMPARISON_PRODUCTS) {
          comparisonProducts.push(mockProducts[i]!);
        }
      }

      expect(comparisonProducts).toHaveLength(4);
      expect(comparisonProducts.find(p => p.id === 5)).toBeUndefined();
    });
  });

  describe("Remove from Comparison", () => {
    it("should remove product from comparison list", () => {
      let comparisonProducts: Product[] = [mockProducts[0]!, mockProducts[1]!];
      const productIdToRemove = 1;

      comparisonProducts = comparisonProducts.filter(p => p.id !== productIdToRemove);

      expect(comparisonProducts).toHaveLength(1);
      expect(comparisonProducts[0]?.id).toBe(2);
    });

    it("should handle removing non-existent product", () => {
      let comparisonProducts: Product[] = [mockProducts[0]!];
      const productIdToRemove = 999;

      comparisonProducts = comparisonProducts.filter(p => p.id !== productIdToRemove);

      expect(comparisonProducts).toHaveLength(1);
    });
  });

  describe("Clear Comparison", () => {
    it("should clear all products from comparison", () => {
      let comparisonProducts: Product[] = [
        mockProducts[0]!,
        mockProducts[1]!,
        mockProducts[2]!,
      ];

      comparisonProducts = [];

      expect(comparisonProducts).toHaveLength(0);
    });
  });

  describe("Check if Product is in Comparison", () => {
    it("should return true if product is in comparison", () => {
      const comparisonProducts: Product[] = [mockProducts[0]!, mockProducts[1]!];
      const productId = 1;

      const isInComparison = comparisonProducts.some(p => p.id === productId);

      expect(isInComparison).toBe(true);
    });

    it("should return false if product is not in comparison", () => {
      const comparisonProducts: Product[] = [mockProducts[0]!, mockProducts[1]!];
      const productId = 3;

      const isInComparison = comparisonProducts.some(p => p.id === productId);

      expect(isInComparison).toBe(false);
    });
  });

  describe("Can Add More Products", () => {
    it("should return true when less than 4 products", () => {
      const comparisonProducts: Product[] = [mockProducts[0]!, mockProducts[1]!];

      const canAddMore = comparisonProducts.length < MAX_COMPARISON_PRODUCTS;

      expect(canAddMore).toBe(true);
    });

    it("should return false when 4 products are selected", () => {
      const comparisonProducts: Product[] = [
        mockProducts[0]!,
        mockProducts[1]!,
        mockProducts[2]!,
        mockProducts[3]!,
      ];

      const canAddMore = comparisonProducts.length < MAX_COMPARISON_PRODUCTS;

      expect(canAddMore).toBe(false);
    });
  });

  describe("Comparison Table Data", () => {
    it("should format comparison data correctly", () => {
      const comparisonProducts: Product[] = [mockProducts[0]!, mockProducts[1]!];
      const language = "en";

      const comparisonData = comparisonProducts.map(product => ({
        id: product.id,
        name: language === "ar" ? product.nameAr : product.nameEn,
        price: product.price,
      }));

      expect(comparisonData).toHaveLength(2);
      expect(comparisonData[0]?.name).toBe("Product 1");
      expect(comparisonData[1]?.name).toBe("Product 2");
    });

    it("should format comparison data in Arabic", () => {
      const comparisonProducts: Product[] = [mockProducts[0]!, mockProducts[1]!];
      const language = "ar";

      const comparisonData = comparisonProducts.map(product => ({
        id: product.id,
        name: language === "ar" ? product.nameAr : product.nameEn,
        price: product.price,
      }));

      expect(comparisonData[0]?.name).toBe("منتج 1");
      expect(comparisonData[1]?.name).toBe("منتج 2");
    });
  });
});
