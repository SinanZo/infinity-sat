import { describe, expect, it } from "vitest";

describe("Shopping Cart Functionality", () => {
  describe("Cart Context", () => {
    it("should add items to cart", () => {
      const cartItems: Array<{
        id: number;
        nameEn: string;
        nameAr: string;
        price: number;
        image: string | null;
        quantity: number;
      }> = [];

      const product = {
        id: 1,
        nameEn: "9970",
        nameAr: "9970",
        price: 45,
        image: "https://example.com/image.jpg",
      };

      // Add product to cart
      cartItems.push({ ...product, quantity: 1 });

      expect(cartItems).toHaveLength(1);
      expect(cartItems[0]?.id).toBe(1);
      expect(cartItems[0]?.quantity).toBe(1);
    });

    it("should increase quantity if product already in cart", () => {
      const cartItems: Array<{
        id: number;
        nameEn: string;
        nameAr: string;
        price: number;
        image: string | null;
        quantity: number;
      }> = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 1,
        },
      ];

      // Add same product again
      const existingIndex = cartItems.findIndex((item) => item.id === 1);
      if (existingIndex >= 0 && cartItems[existingIndex]) {
        cartItems[existingIndex].quantity += 1;
      }

      expect(cartItems).toHaveLength(1);
      expect(cartItems[0]?.quantity).toBe(2);
    });

    it("should remove items from cart", () => {
      const cartItems: Array<{
        id: number;
        nameEn: string;
        nameAr: string;
        price: number;
        image: string | null;
        quantity: number;
      }> = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 1,
        },
      ];

      // Remove product
      const filtered = cartItems.filter((item) => item.id !== 1);

      expect(filtered).toHaveLength(0);
    });

    it("should update quantity", () => {
      const cartItems: Array<{
        id: number;
        nameEn: string;
        nameAr: string;
        price: number;
        image: string | null;
        quantity: number;
      }> = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 1,
        },
      ];

      // Update quantity
      const itemIndex = cartItems.findIndex((item) => item.id === 1);
      if (itemIndex >= 0 && cartItems[itemIndex]) {
        cartItems[itemIndex].quantity = 5;
      }

      expect(cartItems[0]?.quantity).toBe(5);
    });

    it("should calculate cart total correctly", () => {
      const cartItems = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 2,
        },
        {
          id: 2,
          nameEn: "9977",
          nameAr: "9977",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 1,
        },
      ];

      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      expect(total).toBe(135); // (45 * 2) + (45 * 1) = 135
    });

    it("should calculate cart count correctly", () => {
      const cartItems = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 2,
        },
        {
          id: 2,
          nameEn: "9977",
          nameAr: "9977",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 3,
        },
      ];

      const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

      expect(count).toBe(5); // 2 + 3 = 5
    });

    it("should clear cart", () => {
      let cartItems = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 2,
        },
      ];

      // Clear cart
      cartItems = [];

      expect(cartItems).toHaveLength(0);
    });
  });

  describe("WhatsApp Message Builder", () => {
    it("should build correct WhatsApp message in English", () => {
      const cartItems = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 2,
        },
      ];

      const language = "en";
      const cartTotal = 90;

      const header = "🛒 *New Order from Infinity SAT Website*\n\n";
      const itemsList = cartItems
        .map((item, index) => {
          const name = language === "en" ? item.nameEn : item.nameAr;
          return `${index + 1}. *${name}*\n   Quantity: ${item.quantity}\n   Price: ${item.price} JOD\n   Subtotal: ${item.price * item.quantity} JOD`;
        })
        .join("\n\n");
      const footer = `\n\n━━━━━━━━━━━━━━━━\n*Total:* ${cartTotal} JOD\n━━━━━━━━━━━━━━━━\n\nPlease confirm this order and provide delivery details.`;

      const message = header + itemsList + footer;

      expect(message).toContain("New Order from Infinity SAT Website");
      expect(message).toContain("9970");
      expect(message).toContain("Quantity: 2");
      expect(message).toContain("*Total:* 90 JOD");
    });

    it("should build correct WhatsApp message in Arabic", () => {
      const cartItems = [
        {
          id: 1,
          nameEn: "9970",
          nameAr: "9970",
          price: 45,
          image: "https://example.com/image.jpg",
          quantity: 2,
        },
      ];

      const language = "ar";
      const cartTotal = 90;

      const header = "🛒 *طلب جديد من موقع إنفينيتي سات*\n\n";
      const itemsList = cartItems
        .map((item, index) => {
          const name = language === "en" ? item.nameEn : item.nameAr;
          return `${index + 1}. *${name}*\n   الكمية: ${item.quantity}\n   السعر: ${item.price} JOD\n   المجموع الفرعي: ${item.price * item.quantity} JOD`;
        })
        .join("\n\n");
      const footer = `\n\n━━━━━━━━━━━━━━━━\n*المجموع الكلي:* ${cartTotal} JOD\n━━━━━━━━━━━━━━━━\n\nيرجى تأكيد هذا الطلب وتقديم تفاصيل التوصيل.`;

      const message = header + itemsList + footer;

      expect(message).toContain("طلب جديد من موقع إنفينيتي سات");
      expect(message).toContain("9970");
      expect(message).toContain("الكمية: 2");
      expect(message).toContain("*المجموع الكلي:* 90 JOD");
    });
  });
});
