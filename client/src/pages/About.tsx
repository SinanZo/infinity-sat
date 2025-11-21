import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users, Award } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('about.subtitle')}</p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">{t('about.ourStory')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {t('about.storyParagraph1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.storyParagraph2')}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.quality')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('about.qualityDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.innovation')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('about.innovationDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.support')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('about.supportDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.experience')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('about.experienceDescription')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{t('about.mission')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.missionDescription')}
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{t('about.vision')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.visionDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
