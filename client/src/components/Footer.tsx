import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">Infinity SAT</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t('nav.products')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Receivers
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Dishes
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    LNBs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Wires & Cables
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/software">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('nav.software')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('nav.about')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('nav.contact')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('contact.title')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+962 79 666 8653</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@infinity-sat.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Amman, Jordan</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://web.facebook.com/profile.php?id=61563891854263"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/infinity.sat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCb0YhmGTvpi4m-V5F1F1P8Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Infinity SAT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
