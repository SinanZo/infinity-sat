import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
import { Loader2, MessageCircle, Grid3x3, List } from "lucide-react";

export default function Products() {
  const { t, language } = useLanguage();
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
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
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter, language]);

  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = Array.from(new Set(products.map(p => p.categoryId).filter(Boolean)));
    return uniqueCategories;
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">{t('products.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('products.subtitle')}</p>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full md:w-auto">
                <Input
                  placeholder={t('products.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('products.allCategories')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('products.allCategories')}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category?.toString() || ''}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
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
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
