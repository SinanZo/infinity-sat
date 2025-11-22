import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface ShoppingCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShoppingCartDrawer({ open, onOpenChange }: ShoppingCartDrawerProps) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useShoppingCart();
  const { language } = useLanguage();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error(language === 'en' ? "Your cart is empty" : "سلة التسوق فارغة");
      return;
    }

    // Build WhatsApp message
    const message = buildWhatsAppMessage();
    const whatsappNumber = "+962787738423";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Show success message
    toast.success(
      language === 'en' 
        ? "Redirecting to WhatsApp..." 
        : "جاري التحويل إلى واتساب..."
    );
  };

  const buildWhatsAppMessage = () => {
    const header = language === 'en' 
      ? "🛒 *New Order from Infinity SAT Website*\n\n" 
      : "🛒 *طلب جديد من موقع إنفينيتي سات*\n\n";

    const itemsList = cartItems
      .map((item, index) => {
        const name = language === 'en' ? item.nameEn : item.nameAr;
        return `${index + 1}. *${name}*\n   ${language === 'en' ? 'Quantity' : 'الكمية'}: ${item.quantity}\n   ${language === 'en' ? 'Price' : 'السعر'}: ${item.price} JOD\n   ${language === 'en' ? 'Subtotal' : 'المجموع الفرعي'}: ${item.price * item.quantity} JOD`;
      })
      .join("\n\n");

    const footer = `\n\n━━━━━━━━━━━━━━━━\n*${language === 'en' ? 'Total' : 'المجموع الكلي'}:* ${cartTotal} JOD\n━━━━━━━━━━━━━━━━\n\n${language === 'en' ? 'Please confirm this order and provide delivery details.' : 'يرجى تأكيد هذا الطلب وتقديم تفاصيل التوصيل.'}`;

    return header + itemsList + footer;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {language === 'en' ? 'Shopping Cart' : 'سلة التسوق'}
          </SheetTitle>
          <SheetDescription>
            {language === 'en' 
              ? 'Review your items and checkout via WhatsApp' 
              : 'راجع العناصر واطلب عبر واتساب'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  {language === 'en' ? 'Your cart is empty' : 'سلة التسوق فارغة'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'en' 
                    ? 'Add some products to get started' 
                    : 'أضف بعض المنتجات للبدء'}
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={language === 'en' ? item.nameEn : item.nameAr}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {language === 'en' ? item.nameEn : item.nameAr}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.price} JOD
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-auto text-destructive"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success(
                            language === 'en' 
                              ? 'Item removed from cart' 
                              : 'تم إزالة المنتج من السلة'
                          );
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      {item.price * item.quantity} JOD
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>{language === 'en' ? 'Total' : 'المجموع'}</span>
                <span>{cartTotal} JOD</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  {language === 'en' ? 'Order via WhatsApp' : 'اطلب عبر واتساب'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    clearCart();
                    toast.success(
                      language === 'en' 
                        ? 'Cart cleared' 
                        : 'تم تفريغ السلة'
                    );
                  }}
                >
                  {language === 'en' ? 'Clear Cart' : 'تفريغ السلة'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
