import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Loader2, MessageCircle, Wifi, Shield, Headphones, Zap, Tv, Radio, Globe, Star, Users, Award, TrendingUp } from "lucide-react";

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
        <section className="relative text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-bg.jpg" 
              alt="Satellite background" 
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          </div>
          
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
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                  <Link href="/products">
                    {t('home.hero.browseReceivers')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/software">
                    {t('home.hero.browseSoftware')}
                  </Link>
                </Button>
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

        {/* Features Section */}
        <section className="py-16 border-b">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('home.features.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('home.features.feature1.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.features.feature1.description')}</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('home.features.feature2.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.features.feature2.description')}</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('home.features.feature3.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.features.feature3.description')}</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('home.features.feature4.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.features.feature4.description')}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('home.categories.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.categories.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-8 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => window.location.href = '/products'}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tv className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('home.categories.satellite.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.categories.satellite.description')}</p>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => window.location.href = '/products'}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('home.categories.iptv.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.categories.iptv.description')}</p>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => window.location.href = '/software'}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('home.categories.software.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.categories.software.description')}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t('home.featured.title')}</h2>
              <Button variant="outline" asChild>
                <Link href="/products">{t('home.featured.viewAll')}</Link>
              </Button>
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
                      <Button 
                        className="w-full"
                        asChild
                      >
                        <a
                          href={`${whatsappUrl}?text=${encodeURIComponent(`I want to order: ${language === 'ar' ? product.nameAr : product.nameEn}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {t('products.orderWhatsApp')}
                        </a>
                      </Button>
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

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('home.whyChoose.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.whyChoose.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('home.whyChoose.reason1.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.whyChoose.reason1.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('home.whyChoose.reason2.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.whyChoose.reason2.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('home.whyChoose.reason3.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.whyChoose.reason3.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('home.whyChoose.reason4.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('home.whyChoose.reason4.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('home.testimonials.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.testimonials.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4">{t('home.testimonials.testimonial1.text')}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t('home.testimonials.testimonial1.name')}</p>
                    <p className="text-xs text-muted-foreground">{t('home.testimonials.testimonial1.location')}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4">{t('home.testimonials.testimonial2.text')}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t('home.testimonials.testimonial2.name')}</p>
                    <p className="text-xs text-muted-foreground">{t('home.testimonials.testimonial2.location')}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4">{t('home.testimonials.testimonial3.text')}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t('home.testimonials.testimonial3.name')}</p>
                    <p className="text-xs text-muted-foreground">{t('home.testimonials.testimonial3.location')}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container">
            <Card className="p-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.cta.title')}</h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                {t('home.cta.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t('home.cta.contactButton')}
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/products">
                    {t('home.cta.browseButton')}
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
