import { describe, expect, it } from "vitest";

describe("Product Filtering Logic", () => {
  const mockProducts = [
    {
      id: 1,
      nameEn: "Infinity SAT 9970+",
      nameAr: "إنفينيتي سات 9970+",
      descriptionEn: "Premium satellite receiver",
      descriptionAr: "جهاز استقبال فضائي متميز",
      price: 85,
      categoryId: 1,
      featured: 1,
    },
    {
      id: 2,
      nameEn: "Infinity SAT 9970 Pro",
      nameAr: "إنفينيتي سات 9970 برو",
      descriptionEn: "Professional grade receiver",
      descriptionAr: "جهاز احترافي",
      price: 95,
      categoryId: 1,
      featured: 1,
    },
    {
      id: 3,
      nameEn: "Infinity SAT F900",
      nameAr: "إنفينيتي سات F900",
      descriptionEn: "Compact IPTV receiver",
      descriptionAr: "جهاز IPTV مدمج",
      price: 75,
      categoryId: 2,
      featured: 0,
    },
    {
      id: 4,
      nameEn: "Infinity SAT 9988+",
      nameAr: "إنفينيتي سات 9988+",
      descriptionEn: "Latest model with 4K HDR",
      descriptionAr: "أحدث موديل مع 4K HDR",
      price: 120,
      categoryId: 1,
      featured: 1,
    },
  ];

  describe("Search Filter", () => {
    it("should filter products by English name", () => {
      const searchTerm = "9970";
      const filtered = mockProducts.filter((p) =>
        p.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      expect(filtered).toHaveLength(2);
      expect(filtered[0]?.nameEn).toContain("9970");
      expect(filtered[1]?.nameEn).toContain("9970");
    });

    it("should filter products by Arabic name", () => {
      const searchTerm = "برو";
      const filtered = mockProducts.filter((p) =>
        p.nameAr.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.nameAr).toContain("برو");
    });

    it("should filter products by description", () => {
      const searchTerm = "IPTV";
      const filtered = mockProducts.filter((p) =>
        p.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.nameEn).toBe("Infinity SAT F900");
    });

    it("should return all products when search is empty", () => {
      const searchTerm = "";
      const filtered = mockProducts.filter((p) =>
        p.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      expect(filtered).toHaveLength(mockProducts.length);
    });
  });

  describe("Category Filter", () => {
    it("should filter products by category", () => {
      const categoryId = 1;
      const filtered = mockProducts.filter((p) => p.categoryId === categoryId);
      
      expect(filtered).toHaveLength(3);
      filtered.forEach((p) => expect(p.categoryId).toBe(1));
    });

    it("should return all products when category is 'all'", () => {
      const filtered = mockProducts; // No filter applied
      
      expect(filtered).toHaveLength(mockProducts.length);
    });

    it("should filter IPTV category products", () => {
      const categoryId = 2;
      const filtered = mockProducts.filter((p) => p.categoryId === categoryId);
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.nameEn).toBe("Infinity SAT F900");
    });
  });

  describe("Price Range Filter", () => {
    it("should filter products within price range", () => {
      const minPrice = 80;
      const maxPrice = 100;
      const filtered = mockProducts.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
      
      expect(filtered).toHaveLength(2);
      filtered.forEach((p) => {
        expect(p.price).toBeGreaterThanOrEqual(minPrice);
        expect(p.price).toBeLessThanOrEqual(maxPrice);
      });
    });

    it("should filter products under 100 JOD", () => {
      const maxPrice = 100;
      const filtered = mockProducts.filter((p) => p.price <= maxPrice);
      
      expect(filtered).toHaveLength(3);
    });

    it("should filter products over 100 JOD", () => {
      const minPrice = 100;
      const filtered = mockProducts.filter((p) => p.price >= minPrice);
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.price).toBe(120);
    });
  });

  describe("Featured Filter", () => {
    it("should filter only featured products", () => {
      const filtered = mockProducts.filter((p) => p.featured === 1);
      
      expect(filtered).toHaveLength(3);
      filtered.forEach((p) => expect(p.featured).toBe(1));
    });

    it("should return all products when featured filter is off", () => {
      const filtered = mockProducts; // No filter applied
      
      expect(filtered).toHaveLength(mockProducts.length);
    });
  });

  describe("Combined Filters", () => {
    it("should apply search and category filters together", () => {
      const searchTerm = "9970";
      const categoryId = 1;
      const filtered = mockProducts.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) &&
          p.categoryId === categoryId
      );
      
      expect(filtered).toHaveLength(2);
    });

    it("should apply all filters together", () => {
      const searchTerm = "sat";
      const categoryId = 1;
      const minPrice = 80;
      const maxPrice = 100;
      const featuredOnly = true;
      
      const filtered = mockProducts.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) &&
          p.categoryId === categoryId &&
          p.price >= minPrice &&
          p.price <= maxPrice &&
          (!featuredOnly || p.featured === 1)
      );
      
      expect(filtered).toHaveLength(2);
      expect(filtered[0]?.nameEn).toBe("Infinity SAT 9970+");
      expect(filtered[1]?.nameEn).toBe("Infinity SAT 9970 Pro");
    });

    it("should return empty array when no products match all filters", () => {
      const searchTerm = "xyz";
      const categoryId = 1;
      const filtered = mockProducts.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) &&
          p.categoryId === categoryId
      );
      
      expect(filtered).toHaveLength(0);
    });
  });
});
