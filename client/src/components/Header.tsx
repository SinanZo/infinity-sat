import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { APP_LOGO_LIGHT, APP_LOGO_DARK, APP_TITLE } from "@/const";
import { Menu, X, Moon, Sun, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useShoppingCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/products", label: t('nav.products') },
    { href: "/software", label: t('nav.software') },
    { href: "/about", label: t('nav.about') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src={theme === 'dark' ? APP_LOGO_DARK : APP_LOGO_LIGHT} 
            alt={APP_TITLE} 
            className="h-10 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-sm font-medium transition-colors hover:text-primary">
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Shopping Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(true)}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="hidden sm:inline-flex"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </Button>

          {isAuthenticated && (
            <Link href="/admin">
              <Button variant="default" size="sm">
                {t('nav.admin')}
              </Button>
            </Link>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="w-full"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </nav>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
