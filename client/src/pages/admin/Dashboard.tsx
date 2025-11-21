import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import AdminRoute from "@/components/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Download, FolderTree, TrendingUp } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { language } = useLanguage();
  const { data: products, isLoading: productsLoading } = trpc.products.list.useQuery();
  const { data: software, isLoading: softwareLoading } = trpc.software.list.useQuery();

  const stats = [
    {
      title: language === 'ar' ? 'إجمالي المنتجات' : 'Total Products',
      value: products?.length || 0,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: language === 'ar' ? 'إجمالي البرامج' : 'Total Software',
      value: software?.length || 0,
      icon: Download,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: language === 'ar' ? 'المنتجات المميزة' : 'Featured Products',
      value: products?.filter(p => p.featured === 1).length || 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: language === 'ar' ? 'الفئات' : 'Categories',
      value: 2,
      icon: FolderTree,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  if (productsLoading || softwareLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminRoute>
      <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'ar' 
              ? 'نظرة عامة على إحصائيات الموقع' 
              : 'Overview of your website statistics'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'أحدث المنتجات' : 'Recent Products'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products?.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={language === 'ar' ? product.nameAr : product.nameEn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {language === 'ar' ? product.nameAr : product.nameEn}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.price} {language === 'ar' ? 'دينار' : 'JOD'}
                    </p>
                  </div>
                  {product.featured === 1 && (
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {language === 'ar' ? 'مميز' : 'Featured'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Software */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'أحدث البرامج' : 'Recent Software'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {software?.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={language === 'ar' ? item.titleAr : item.titleEn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Download className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.model} • {item.version}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-muted rounded-full">
                    {item.fileType}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </AdminLayout>
    </AdminRoute>
  );
}
