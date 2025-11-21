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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductForm {
  id?: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  image: string;
  categoryId: number;
  featured: boolean;
}

export default function AdminProducts() {
  const { language } = useLanguage();
  const utils = trpc.useUtils();
  const { data: products, isLoading } = trpc.products.list.useQuery();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductForm>({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    price: 0,
    image: "",
    categoryId: 1,
    featured: false,
  });

  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      utils.products.list.invalidate();
      toast.success(language === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Product created successfully');
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.products.update.useMutation({
    onSuccess: () => {
      utils.products.list.invalidate();
      toast.success(language === 'ar' ? 'تم تحديث المنتج بنجاح' : 'Product updated successfully');
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      utils.products.list.invalidate();
      toast.success(language === 'ar' ? 'تم حذف المنتج بنجاح' : 'Product deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      price: 0,
      image: "",
      categoryId: 1,
      featured: false,
    });
  };

  const handleCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleEdit = (product: any) => {
    setFormData({
      id: product.id,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      descriptionEn: product.descriptionEn || "",
      descriptionAr: product.descriptionAr || "",
      price: product.price,
      image: product.image || "",
      categoryId: product.categoryId || 1,
      featured: product.featured === 1,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedProduct(id);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.id) {
      updateMutation.mutate({
        id: formData.id,
        nameEn: formData.nameEn,
        nameAr: formData.nameAr,
        descriptionEn: formData.descriptionEn,
        descriptionAr: formData.descriptionAr,
        price: formData.price,
        image: formData.image,
        categoryId: formData.categoryId,
        featured: formData.featured ? 1 : 0,
      });
    } else {
      createMutation.mutate({
        nameEn: formData.nameEn,
        nameAr: formData.nameAr,
        descriptionEn: formData.descriptionEn,
        descriptionAr: formData.descriptionAr,
        price: formData.price,
        image: formData.image,
        categoryId: formData.categoryId,
        featured: formData.featured ? 1 : 0,
      });
    }
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteMutation.mutate({ id: selectedProduct });
    }
  };

  return (
    <AdminRoute>
      <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'ar' ? 'إدارة المنتجات' : 'Manage Products'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إضافة وتعديل وحذف المنتجات' 
                : 'Create, edit, and delete products'}
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إضافة منتج' : 'Add Product'}
          </Button>
        </div>

        {/* Products Table */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'الصورة' : 'Image'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                  <TableHead>{language === 'ar' ? 'السعر' : 'Price'}</TableHead>

                  <TableHead>{language === 'ar' ? 'مميز' : 'Featured'}</TableHead>
                  <TableHead className="text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={language === 'ar' ? product.nameAr : product.nameEn}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {language === 'ar' ? product.nameAr : product.nameEn}
                    </TableCell>
                    <TableCell>{product.price} JOD</TableCell>

                    <TableCell>
                      {product.featured === 1 && (
                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {language === 'ar' ? 'مميز' : 'Featured'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {formData.id
                  ? (language === 'ar' ? 'تعديل منتج' : 'Edit Product')
                  : (language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')}
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
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
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
                <Label htmlFor="descriptionEn">{language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr">{language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}</Label>
                <Textarea
                  id="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">{language === 'ar' ? 'السعر (JOD)' : 'Price (JOD)'}</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId">{language === 'ar' ? 'الفئة' : 'Category'}</Label>
                  <Input
                    id="categoryId"
                    type="number"
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">{language === 'ar' ? 'رابط الصورة' : 'Image URL'}</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  {language === 'ar' ? 'منتج مميز' : 'Featured Product'}
                </Label>
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
                  ? 'سيتم حذف هذا المنتج نهائياً. لا يمكن التراجع عن هذا الإجراء.'
                  : 'This product will be permanently deleted. This action cannot be undone.'}
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
