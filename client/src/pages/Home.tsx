import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Loader2, MessageCircle } from "lucide-react";

export default function Home() {
  const { t, language } = useLanguage();
  const { data: featuredProducts, isLoading } = trpc.products.featured.useQuery();

  const whatsappNumber = "962796668653";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="container relative py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                🛰️ Infinity SAT - Official Receivers & Softwares
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {t('home.hero.title')}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    {t('home.hero.browseReceivers')}
                  </Button>
                </Link>
                <Link href="/software">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    {t('home.hero.browseSoftware')}
                  </Button>
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t('home.hero.whatsappSupport')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t('home.featured.title')}</h2>
              <Link href="/products">
                <Button variant="outline">{t('home.featured.viewAll')}</Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : featuredProducts && featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
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
                      <h3 className="font-semibold text-lg mb-2">
                        {language === 'ar' ? product.nameAr : product.nameEn}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {language === 'ar' ? product.descriptionAr : product.descriptionEn}
                      </p>
                      <p className="text-2xl font-bold mt-4">
                        {product.price} {t('common.jod')}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <a
                        href={`${whatsappUrl}?text=${encodeURIComponent(`I want to order: ${language === 'ar' ? product.nameAr : product.nameEn}`)}`}
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
