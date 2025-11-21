import { useProductComparison } from "@/contexts/ProductComparisonContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComparisonModal({ open, onOpenChange }: ComparisonModalProps) {
  const { comparisonProducts, removeFromComparison } = useProductComparison();
  const { t, language } = useLanguage();

  const whatsappNumber = "962796668653";

  if (comparisonProducts.length === 0) {
    return null;
  }

  const comparisonRows = [
    {
      label: language === 'ar' ? 'الصورة' : 'Image',
      getValue: (product: typeof comparisonProducts[0]) => (
        <div className="w-full aspect-video bg-muted rounded overflow-hidden">
          {product.image && (
            <img
              src={product.image}
              alt={language === 'ar' ? product.nameAr : product.nameEn}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ),
    },
    {
      label: language === 'ar' ? 'الاسم' : 'Name',
      getValue: (product: typeof comparisonProducts[0]) => (
        <div className="font-semibold">
          {language === 'ar' ? product.nameAr : product.nameEn}
        </div>
      ),
    },
    {
      label: language === 'ar' ? 'الوصف' : 'Description',
      getValue: (product: typeof comparisonProducts[0]) => (
        <div className="text-sm text-muted-foreground">
          {language === 'ar' ? product.descriptionAr : product.descriptionEn}
        </div>
      ),
    },
    {
      label: language === 'ar' ? 'المميزات' : 'Features',
      getValue: (product: typeof comparisonProducts[0]) => (
        <div className="text-sm">
          {language === 'ar' ? product.featuresAr : product.featuresEn}
        </div>
      ),
    },
    {
      label: language === 'ar' ? 'السعر' : 'Price',
      getValue: (product: typeof comparisonProducts[0]) => (
        <div className="text-2xl font-bold text-primary">
          {product.price} {t('common.jod')}
        </div>
      ),
    },
    {
      label: language === 'ar' ? 'مميز' : 'Featured',
      getValue: (product: typeof comparisonProducts[0]) => (
        <div className="text-sm">
          {product.featured === 1 
            ? (language === 'ar' ? 'نعم' : 'Yes')
            : (language === 'ar' ? 'لا' : 'No')
          }
        </div>
      ),
    },
    {
      label: language === 'ar' ? 'الطلب' : 'Order',
      getValue: (product: typeof comparisonProducts[0]) => (
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`I want to order: ${language === 'ar' ? product.nameAr : product.nameEn}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button size="sm" className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            {t('products.orderWhatsApp')}
          </Button>
        </a>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'مقارنة المنتجات' : 'Product Comparison'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold bg-muted/50 sticky left-0 z-10">
                    {language === 'ar' ? 'المواصفات' : 'Specifications'}
                  </th>
                  {comparisonProducts.map((product) => (
                    <th key={product.id} className="p-4 text-center min-w-[200px] relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeFromComparison(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium bg-muted/30 sticky left-0 z-10">
                      {row.label}
                    </td>
                    {comparisonProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {row.getValue(product)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
