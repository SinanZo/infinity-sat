import { ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();
  const { language } = useLanguage();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">
            {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              {language === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login Required'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'يجب عليك تسجيل الدخول للوصول إلى لوحة التحكم'
                : 'You need to login to access the admin dashboard'}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              {language === 'ar' ? 'العودة للرئيسية' : 'Go Home'}
            </Button>
            <Button
              onClick={() => window.location.href = getLoginUrl()}
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Not admin
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              {language === 'ar' ? 'غير مصرح' : 'Unauthorized'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'ليس لديك صلاحيات الوصول إلى لوحة التحكم'
                : 'You do not have permission to access the admin dashboard'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            {language === 'ar' ? 'العودة للرئيسية' : 'Go Home'}
          </Button>
        </div>
      </div>
    );
  }

  // Authorized admin
  return <>{children}</>;
}
