import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('contact.subtitle')}</p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('contact.phone')}</h3>
                  <p className="text-sm text-muted-foreground">+962 79 666 8653</p>
                  <p className="text-sm text-muted-foreground">+962 7 9960 6653</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('contact.email')}</h3>
                  <p className="text-sm text-muted-foreground">info@infinity-sat.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('contact.location')}</h3>
                  <p className="text-sm text-muted-foreground">Al Muqablain</p>
                  <p className="text-sm text-muted-foreground">Amman, Jordan</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('contact.hours')}</h3>
                  <p className="text-sm text-muted-foreground">{t('contact.workingDays')}</p>
                  <p className="text-sm text-muted-foreground">9:00 AM - 11:00 PM</p>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t('contact.findUs')}</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317.1853319105512!2d35.9119806789159!3d31.90298287492432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca774f418e775%3A0x9ddad31b9848f0f0!2z2LTYsdmD2Kkg2KfZhNmE2YXYs9ipINin2YTZhdiq2LfZiNix2Kkg2YjZg9mE2KfYoSDZg9in2YXZitix2KfYqiBVTlYg2Ygg2LHYs9mK2YHZitixINin2YbZgdmG2KrZiiAo2KfZhNmF2YbYp9ixKQ!5e0!3m2!1sen!2sjo!4v1763526323378!5m2!1sen!2sjo"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('contact.followUs')}</h2>
              <div className="flex gap-4">
                <a
                  href="https://web.facebook.com/profile.php?id=61563891854263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <span className="font-medium">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/infinity.sat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Instagram className="h-6 w-6 text-pink-600" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCb0YhmGTvpi4m-V5F1F1P8Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Youtube className="h-6 w-6 text-red-600" />
                  <span className="font-medium">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
