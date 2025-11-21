import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import AdminRoute from "@/components/AdminRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CategoryForm {
  id?: number;
  nameEn: string;
  nameAr: string;
  slug: string;
}

export default function AdminCategories() {
  const { language } = useLanguage();
  const utils = trpc.useUtils();
  const { data: categories, isLoading } = trpc.categories.list.useQuery();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [formData, setFormData] = useState<CategoryForm>({
    nameEn: "",
    nameAr: "",
    slug: "",
  });

  const createMutation = trpc.categories.create.useMutation({
    onSuccess: () => {
      utils.categories.list.invalidate();
      toast.success(language === 'ar' ? 'تم إضافة الفئة بنجاح' : 'Category created successfully');
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.categories.update.useMutation({
    onSuccess: () => {
      utils.categories.list.invalidate();
      toast.success(language === 'ar' ? 'تم تحديث الفئة بنجاح' : 'Category updated successfully');
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = trpc.categories.delete.useMutation({
    onSuccess: () => {
      utils.categories.list.invalidate();
      toast.success(language === 'ar' ? 'تم حذف الفئة بنجاح' : 'Category deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      nameEn: "",
      nameAr: "",
      slug: "",
    });
  };

  const handleCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleEdit = (category: any) => {
    setFormData({
      id: category.id,
      nameEn: category.nameEn,
      nameAr: category.nameAr,
      slug: category.slug,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedCategory(id);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.id) {
      updateMutation.mutate({
        id: formData.id,
        nameEn: formData.nameEn,
        nameAr: formData.nameAr,
        slug: formData.slug,
      });
    } else {
      createMutation.mutate({
        nameEn: formData.nameEn,
        nameAr: formData.nameAr,
        slug: formData.slug,
      });
    }
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      deleteMutation.mutate({ id: selectedCategory });
    }
  };

  // Auto-generate slug from nameEn
  const handleNameEnChange = (value: string) => {
    setFormData({
      ...formData,
      nameEn: value,
      slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    });
  };

  return (
    <AdminRoute>
      <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'ar' ? 'إدارة الفئات' : 'Manage Categories'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إضافة وتعديل وحذف فئات المنتجات' 
                : 'Create, edit, and delete product categories'}
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إضافة فئة' : 'Add Category'}
          </Button>
        </div>

        {/* Categories Table */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الرمز' : 'Slug'}</TableHead>

                  <TableHead className="text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {language === 'ar' ? category.nameAr : category.nameEn}
                    </TableCell>
                    <TableCell>
                      <code className="px-2 py-1 text-xs bg-muted rounded">
                        {category.slug}
                      </code>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {formData.id
                  ? (language === 'ar' ? 'تعديل فئة' : 'Edit Category')
                  : (language === 'ar' ? 'إضافة فئة جديدة' : 'Add New Category')}
              </DialogTitle>
              <DialogDescription>
                {language === 'ar'
                  ? 'املأ جميع الحقول المطلوبة'
                  : 'Fill in all required fields'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nameEn">{language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}</Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={(e) => handleNameEnChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameAr">{language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}</Label>
                  <Input
                    id="nameAr"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">{language === 'ar' ? 'الرمز (Slug)' : 'Slug'}</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="satellite-receivers"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {language === 'ar'
                    ? 'يتم إنشاؤه تلقائياً من الاسم الإنجليزي'
                    : 'Auto-generated from English name'}
                </p>
              </div>



              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {formData.id
                    ? (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
                    : (language === 'ar' ? 'إضافة' : 'Create')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {language === 'ar' ? 'هل أنت متأكد؟' : 'Are you sure?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {language === 'ar'
                  ? 'سيتم حذف هذه الفئة نهائياً. قد يؤثر هذا على المنتجات المرتبطة بها.'
                  : 'This category will be permanently deleted. This may affect products linked to it.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{language === 'ar' ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                {deleteMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {language === 'ar' ? 'حذف' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </AdminLayout>
    </AdminRoute>
  );
}
