import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Download, MessageCircle, Grid3x3, List } from "lucide-react";

export default function Software() {
  const { t, language } = useLanguage();
  const { data: software, isLoading } = trpc.software.list.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const whatsappNumber = "962796668653";

  const filteredSoftware = useMemo(() => {
    if (!software) return [];
    
    return software.filter((item) => {
      const matchesSearch = 
        (language === 'ar' ? item.titleAr : item.titleEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.model?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      
      return matchesSearch;
    });
  }, [software, searchTerm, language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">{t('software.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('software.subtitle')}</p>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Input
                placeholder={t('software.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              
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

        {/* Software List */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredSoftware.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSoftware.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={language === 'ar' ? item.titleAr : item.titleEn}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Download className="h-16 w-16 text-muted-foreground" />
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{item.fileType}</Badge>
                          {item.model && <Badge variant="outline">{item.model}</Badge>}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          {language === 'ar' ? item.titleAr : item.titleEn}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{t('software.version')}: {item.version}</span>
                          {item.fileSize && <span>{item.fileSize}</span>}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex gap-2">
                        {item.downloadUrl ? (
                          <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button className="w-full" variant="default">
                              <Download className="mr-2 h-4 w-4" />
                              {t('software.download')}
                            </Button>
                          </a>
                        ) : (
                          <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`I want to order: ${language === 'ar' ? item.titleAr : item.titleEn}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button className="w-full">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              {t('software.orderWhatsApp')}
                            </Button>
                          </a>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4">{t('software.model')}</th>
                        <th className="text-left p-4">{t('software.title.col')}</th>
                        <th className="text-left p-4">{t('software.files')}</th>
                        <th className="text-left p-4">{t('software.entryDate')}</th>
                        <th className="text-left p-4">{t('software.order')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSoftware.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-muted rounded overflow-hidden flex items-center justify-center">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.model || ''}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Download className="h-6 w-6 text-muted-foreground" />
                                )}
                              </div>
                              <span className="font-medium">{item.model}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold">
                              {language === 'ar' ? item.titleAr : item.titleEn}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t('software.version')}: {item.version}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">{item.fileType}</Badge>
                              {item.fileSize && <Badge variant="outline">{item.fileSize}</Badge>}
                            </div>
                          </td>
                          <td className="p-4 text-sm">
                            {item.releaseDate ? new Date(item.releaseDate).toLocaleDateString() : '-'}
                          </td>
                          <td className="p-4">
                            {item.downloadUrl ? (
                              <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  {t('software.download')}
                                </Button>
                              </a>
                            ) : (
                              <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`I want to order: ${language === 'ar' ? item.titleAr : item.titleEn}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button size="sm">
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  {t('software.orderWhatsApp')}
                                </Button>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {t('software.noResults')}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
