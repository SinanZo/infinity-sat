import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductComparison } from "@/contexts/ProductComparisonContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonBar from "@/components/ComparisonBar";
import ComparisonModal from "@/components/ComparisonModal";
import { Loader2, MessageCircle, Grid3x3, List, Search, X, Star, SlidersHorizontal, GitCompare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Products() {
  const { t, language } = useLanguage();
  const { addToComparison, removeFromComparison, isInComparison, canAddMore, comparisonProducts } = useProductComparison();
  const [showComparison, setShowComparison] = useState(false);
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const { data: categories } = trpc.categories.list.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const whatsappNumber = "962796668653";

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((product) => {
      const matchesSearch = 
        (language === 'ar' ? product.nameAr : product.nameEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (language === 'ar' ? product.descriptionAr : product.descriptionEn)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) || false;
      
      const matchesCategory = 
        categoryFilter === "all" || product.categoryId?.toString() === categoryFilter;
      
      const matchesPrice = 
        product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const matchesFeatured = 
        !showFeaturedOnly || product.featured === 1;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesFeatured;
    });
  }, [products, searchTerm, categoryFilter, priceRange, showFeaturedOnly, language]);

  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return 200;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  const hasActiveFilters = searchTerm !== "" || categoryFilter !== "all" || priceRange[0] !== 0 || priceRange[1] !== maxPrice || showFeaturedOnly;

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setPriceRange([0, maxPrice]);
    setShowFeaturedOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Comparison Components */}
      <ComparisonBar onCompare={() => setShowComparison(true)} />
      <ComparisonModal open={showComparison} onOpenChange={setShowComparison} />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">{t('products.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('products.subtitle')}</p>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 border-b bg-background">
          <div className="container">
            <div className="space-y-6">
              {/* Search and View Mode */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('products.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                    aria-label="Table view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{language === 'ar' ? 'الفلاتر:' : 'Filters:'}</span>
                </div>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t('products.allCategories')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('products.allCategories')}</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {language === 'ar' ? category.nameAr : category.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Price Range Filter */}
                <Select 
                  value={`${priceRange[0]}-${priceRange[1]}`} 
                  onValueChange={(value) => {
                    const [min, max] = value.split('-').map(Number);
                    setPriceRange([min, max]);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={`0-${maxPrice}`}>
                      {language === 'ar' ? 'جميع الأسعار' : 'All Prices'}
                    </SelectItem>
                    <SelectItem value="0-50">
                      {language === 'ar' ? 'أقل من 50 دينار' : 'Under 50 JOD'}
                    </SelectItem>
                    <SelectItem value="50-100">
                      {language === 'ar' ? '50-100 دينار' : '50-100 JOD'}
                    </SelectItem>
                    <SelectItem value="100-150">
                      {language === 'ar' ? '100-150 دينار' : '100-150 JOD'}
                    </SelectItem>
                    <SelectItem value="150-999">
                      {language === 'ar' ? 'أكثر من 150 دينار' : 'Over 150 JOD'}
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Featured Toggle */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse border rounded-md px-3 py-2">
                  <Checkbox 
                    id="featured" 
                    checked={showFeaturedOnly}
                    onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                  />
                  <Label htmlFor="featured" className="text-sm cursor-pointer flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {language === 'ar' ? 'المميزة فقط' : 'Featured Only'}
                  </Label>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1"
                  >
                    <X className="h-4 w-4" />
                    {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                  </Button>
                )}
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'الفلاتر النشطة:' : 'Active filters:'}
                  </span>
                  {searchTerm && (
                    <Badge variant="secondary" className="gap-1">
                      {language === 'ar' ? 'بحث:' : 'Search:'} {searchTerm}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setSearchTerm("")} 
                      />
                    </Badge>
                  )}
                  {categoryFilter !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {categories?.find(c => c.id.toString() === categoryFilter)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setCategoryFilter("all")} 
                      />
                    </Badge>
                  )}
                  {(priceRange[0] !== 0 || priceRange[1] !== maxPrice) && (
                    <Badge variant="secondary" className="gap-1">
                      {priceRange[0]}-{priceRange[1]} {t('common.jod')}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setPriceRange([0, maxPrice])} 
                      />
                    </Badge>
                  )}
                  {showFeaturedOnly && (
                    <Badge variant="secondary" className="gap-1">
                      <Star className="h-3 w-3" />
                      {language === 'ar' ? 'المميزة' : 'Featured'}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setShowFeaturedOnly(false)} 
                      />
                    </Badge>
                  )}
                </div>
              )}

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {language === 'ar' 
                  ? `عرض ${filteredProducts.length} من ${products?.length || 0} منتج`
                  : `Showing ${filteredProducts.length} of ${products?.length || 0} products`
                }
              </div>
            </div>
          </div>
        </section>

        {/* Products List */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredProducts.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
                      {/* Comparison Checkbox */}
                      <div className="absolute top-2 right-2 z-10">
                        <Checkbox
                          id={`compare-${product.id}`}
                          checked={isInComparison(product.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              if (canAddMore) {
                                addToComparison(product);
                              }
                            } else {
                              removeFromComparison(product.id);
                            }
                          }}
                          disabled={!isInComparison(product.id) && !canAddMore}
                          className="bg-background border-2"
                        />
                      </div>
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={language === 'ar' ? product.nameAr : product.nameEn}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="text-xs text-muted-foreground mb-2">{product.categoryId}</div>
                        <h3 className="font-semibold text-lg mb-2">
                          {language === 'ar' ? product.nameAr : product.nameEn}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {language === 'ar' ? product.descriptionAr : product.descriptionEn}
                        </p>
                        <p className="text-2xl font-bold">
                          {product.price} {t('common.jod')}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`I want to order: ${language === 'ar' ? product.nameAr : product.nameEn}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button className="w-full">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {t('products.orderWhatsApp')}
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4">Image</th>
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-t hover:bg-muted/50">
                          <td className="p-4">
                            <div className="w-16 h-16 bg-muted rounded overflow-hidden">
                              {product.image && (
                                <img
                                  src={product.image}
                                  alt={language === 'ar' ? product.nameAr : product.nameEn}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold">
                              {language === 'ar' ? product.nameAr : product.nameEn}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {language === 'ar' ? product.descriptionAr : product.descriptionEn}
                            </div>
                          </td>
                          <td className="p-4 text-sm">{product.categoryId}</td>
                          <td className="p-4 font-bold">
                            {product.price} {t('common.jod')}
                          </td>
                          <td className="p-4">
                            <a
                              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`I want to order: ${language === 'ar' ? product.nameAr : product.nameEn}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                {t('products.orderWhatsApp')}
                              </Button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {t('products.noResults')}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
