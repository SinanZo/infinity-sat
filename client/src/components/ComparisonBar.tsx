import { useProductComparison } from "@/contexts/ProductComparisonContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { GitCompare, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComparisonBarProps {
  onCompare: () => void;
}

export default function ComparisonBar({ onCompare }: ComparisonBarProps) {
  const { comparisonProducts, removeFromComparison, clearComparison } = useProductComparison();
  const { language } = useLanguage();

  if (comparisonProducts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50 animate-in slide-in-from-bottom">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Selected Products */}
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              <GitCompare className="h-5 w-5" />
              <span className="font-medium">
                {language === 'ar' 
                  ? `المقارنة (${comparisonProducts.length}/4)`
                  : `Compare (${comparisonProducts.length}/4)`
                }
              </span>
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {comparisonProducts.map((product) => (
                <Badge 
                  key={product.id} 
                  variant="secondary" 
                  className="gap-2 px-3 py-1.5 shrink-0"
                >
                  <span className="max-w-[150px] truncate">
                    {language === 'ar' ? product.nameAr : product.nameEn}
                  </span>
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeFromComparison(product.id)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
            >
              {language === 'ar' ? 'مسح الكل' : 'Clear All'}
            </Button>
            <Button
              size="sm"
              onClick={onCompare}
              disabled={comparisonProducts.length < 2}
            >
              <GitCompare className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'مقارنة' : 'Compare'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
