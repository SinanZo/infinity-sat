import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.software': 'Software & APK',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Home page
    'home.hero.title': 'Watch everything you love with Infinity SAT receivers',
    'home.hero.subtitle': 'High-quality satellite & IPTV receivers, official software and APKs, ready for Jordan and the region. Stable, updated and easy to use.',
    'home.hero.browseReceivers': 'Browse Receivers',
    'home.hero.browseSoftware': 'Software & APK',
    'home.hero.whatsappSupport': 'WhatsApp Support',
    'home.featured.title': 'Featured Products',
    'home.featured.viewAll': 'View All Products',
    
    // Products page
    'products.title': 'Our Products',
    'products.subtitle': 'Explore our range of high-quality satellite receivers and accessories',
    'products.search': 'Search products...',
    'products.allCategories': 'All Categories',
    'products.grid': 'Grid',
    'products.table': 'Table',
    'products.noResults': 'No products found',
    'products.orderWhatsApp': 'Order via WhatsApp',
    'products.viewDetails': 'View Details',
    
    // Software page
    'software.title': 'Softwares & APK for Infinity SAT',
    'software.subtitle': 'Latest software, loaders, channel lists and APK applications',
    'software.search': 'Search by model or title...',
    'software.allTypes': 'All Types',
    'software.grid': 'Grid',
    'software.table': 'Table',
    'software.noResults': 'No software found',
    'software.download': 'Download',
    'software.orderWhatsApp': 'Order via WhatsApp',
    'software.model': 'Model',
    'software.title.col': 'Title',
    'software.files': 'Files',
    'software.entryDate': 'Entry Date',
    'software.order': 'Order',
    'software.version': 'Version',
    'software.fileSize': 'File Size',
    'software.releaseDate': 'Release Date',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with us for any inquiries or support',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.workingHours': 'Working Hours',
    'contact.workingHoursValue': 'Saturday - Thursday: 9:00 AM - 11:00 PM',
    'contact.hours': 'Working Hours',
    'contact.workingDays': 'Saturday - Thursday',
    'contact.findUs': 'Find Us on Map',
    'contact.followUs': 'Follow Us',
    
    // About page
    'about.title': 'About Infinity SAT',
    'about.subtitle': 'Official Infinity SAT receivers, software, and support in Jordan and the region',
    'about.mission.title': 'Our Mission',
    'about.mission.content': 'We specialize in receivers, software and updates so your channels are always ready. Stable, updated and easy to use.',
    'about.why.title': 'Why Infinity SAT?',
    'about.why.official': 'Official products',
    'about.why.officialDesc': 'Original Infinity SAT receivers and accessories with trusted sources.',
    'about.why.updates': 'Regular software updates',
    'about.why.updatesDesc': 'We publish updated software to keep your device with the latest channels and compatible.',
    'about.why.support': 'Local support',
    'about.why.supportDesc': 'Located in Amman with direct WhatsApp and phone support.',
    'about.why.warranty': 'Warranty & follow-up',
    'about.why.warrantyDesc': 'We keep with setup, troubleshooting and warranty handling.',
    'about.ourStory': 'Our Story',
    'about.storyParagraph1': 'Infinity SAT is a leading provider of high-quality satellite receivers, IPTV equipment, and official software in Jordan and the region.',
    'about.storyParagraph2': 'With years of experience, we offer premium receivers, regular software updates, and professional technical support.',
    'about.quality': 'Premium Quality',
    'about.qualityDescription': 'Official, high-quality receivers and software with guaranteed performance',
    'about.innovation': 'Latest Technology',
    'about.innovationDescription': 'Stay up-to-date with the latest receivers and software updates',
    'about.support': 'Expert Support',
    'about.supportDescription': 'Our team is ready to help you 24/7 via WhatsApp and phone',
    'about.experience': 'Years of Experience',
    'about.experienceDescription': 'Trusted by thousands of customers across Jordan',
    'about.mission': 'Our Mission',
    'about.missionDescription': 'To provide the best satellite entertainment experience with premium products and exceptional support',
    'about.vision': 'Our Vision',
    'about.visionDescription': 'To be the leading provider of satellite receivers and software in the region',
    
    // Common
    'common.jod': 'JOD',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.software': 'البرامج والتطبيقات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'لوحة التحكم',
    
    // Home page
    'home.hero.title': 'شاهد كل ما تحب مع أجهزة Infinity SAT',
    'home.hero.subtitle': 'أجهزة استقبال فضائية و IPTV عالية الجودة، برامج رسمية وتطبيقات APK، جاهزة للأردن والمنطقة. مستقرة ومحدثة وسهلة الاستخدام.',
    'home.hero.browseReceivers': 'تصفح الأجهزة',
    'home.hero.browseSoftware': 'البرامج والتطبيقات',
    'home.hero.whatsappSupport': 'دعم واتساب',
    'home.featured.title': 'المنتجات المميزة',
    'home.featured.viewAll': 'عرض جميع المنتجات',
    
    // Products page
    'products.title': 'منتجاتنا',
    'products.subtitle': 'استكشف مجموعتنا من أجهزة الاستقبال الفضائية والملحقات عالية الجودة',
    'products.search': 'البحث عن المنتجات...',
    'products.allCategories': 'جميع الفئات',
    'products.grid': 'شبكة',
    'products.table': 'جدول',
    'products.noResults': 'لم يتم العثور على منتجات',
    'products.orderWhatsApp': 'اطلب عبر واتساب',
    'products.viewDetails': 'عرض التفاصيل',
    
    // Software page
    'software.title': 'البرامج والتطبيقات لأجهزة Infinity SAT',
    'software.subtitle': 'أحدث البرامج والتحميلات وقوائم القنوات وتطبيقات APK',
    'software.search': 'البحث بالموديل أو العنوان...',
    'software.allTypes': 'جميع الأنواع',
    'software.grid': 'شبكة',
    'software.table': 'جدول',
    'software.noResults': 'لم يتم العثور على برامج',
    'software.download': 'تحميل',
    'software.orderWhatsApp': 'اطلب عبر واتساب',
    'software.model': 'الموديل',
    'software.title.col': 'العنوان',
    'software.files': 'الملفات',
    'software.entryDate': 'تاريخ الإضافة',
    'software.order': 'الطلب',
    'software.version': 'الإصدار',
    'software.fileSize': 'حجم الملف',
    'software.releaseDate': 'تاريخ الإصدار',
    
    // Contact page
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل معنا لأي استفسارات أو دعم',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.location': 'الموقع',
    'contact.workingHours': 'ساعات العمل',
    'contact.workingHoursValue': 'السبت - الخميس: 9:00 صباحاً - 11:00 مساءً',
    'contact.hours': 'ساعات العمل',
    'contact.workingDays': 'السبت - الخميس',
    'contact.findUs': 'موقعنا على الخريطة',
    'contact.followUs': 'تابعنا',
    
    // About page
    'about.title': 'عن Infinity SAT',
    'about.subtitle': 'أجهزة Infinity SAT الرسمية والبرامج والدعم في الأردن والمنطقة',
    'about.mission.title': 'مهمتنا',
    'about.mission.content': 'نحن متخصصون في الأجهزة والبرامج والتحديثات حتى تكون قنواتك جاهزة دائماً. مستقرة ومحدثة وسهلة الاستخدام.',
    'about.why.title': 'لماذا Infinity SAT؟',
    'about.why.official': 'منتجات رسمية',
    'about.why.officialDesc': 'أجهزة استقبال Infinity SAT الأصلية والملحقات من مصادر موثوقة.',
    'about.why.updates': 'تحديثات منتظمة للبرامج',
    'about.why.updatesDesc': 'ننشر البرامج المحدثة للحفاظ على جهازك مع أحدث القنوات والتوافق.',
    'about.why.support': 'دعم محلي',
    'about.why.supportDesc': 'موجودون في عمان مع دعم مباشر عبر واتساب والهاتف.',
    'about.why.warranty': 'الضمان والمتابعة',
    'about.why.warrantyDesc': 'نحن نتابع الإعداد واستكشاف الأخطاء ومعالجة الضمان.',
    'about.ourStory': 'قصتنا',
    'about.storyParagraph1': 'إنفينيتي سات هي المزود الرائد لأجهزة الاستقبال الفضائية عالية الجودة ومعدات IPTV والبرامج الرسمية في الأردن والمنطقة.',
    'about.storyParagraph2': 'مع سنوات من الخبرة، نقدم أجهزة مميزة وتحديثات برامج منتظمة ودعم فني محترف.',
    'about.quality': 'جودة ممتازة',
    'about.qualityDescription': 'أجهزة وبرامج رسمية عالية الجودة بأداء مضمون',
    'about.innovation': 'أحدث التقنيات',
    'about.innovationDescription': 'ابق على اطلاع بأحدث الأجهزة وتحديثات البرامج',
    'about.support': 'دعم متخصص',
    'about.supportDescription': 'فريقنا جاهز لمساعدتك على مدار الساعة عبر واتساب والهاتف',
    'about.experience': 'سنوات من الخبرة',
    'about.experienceDescription': 'موثوق به من قبل آلاف العملاء في جميع أنحاء الأردن',
    'about.mission': 'مهمتنا',
    'about.missionDescription': 'تقديم أفضل تجربة ترفيهية فضائية مع منتجات مميزة ودعم استثنائي',
    'about.vision': 'رؤيتنا',
    'about.visionDescription': 'أن نكون المزود الرائد لأجهزة الاستقبال الفضائية والبرامج في المنطقة',
    
    // Common
    'common.jod': 'دينار',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
