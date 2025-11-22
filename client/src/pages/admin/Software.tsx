import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import AdminRoute from "@/components/AdminRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ImageUpload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface SoftwareForm {
  id?: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  version: string;
  releaseDate: Date;
  fileType: "software" | "apk" | "loader" | "rom" | "channels";
  downloadUrl: string;
  fileSize: string;
  model: string;
  image: string;
}

export default function AdminSoftware() {
  const { language } = useLanguage();
  const utils = trpc.useUtils();
  const { data: software, isLoading } = trpc.software.list.useQuery();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState<number | null>(null);
  const [formData, setFormData] = useState<SoftwareForm>({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    version: "",
    releaseDate: new Date(),
    fileType: "software",
    downloadUrl: "",
    fileSize: "",
    model: "",
    image: "",
  });

  const createMutation = trpc.software.create.useMutation({
    onSuccess: () => {
      utils.software.list.invalidate();
      toast.success(language === 'ar' ? 'تم إضافة البرنامج بنجاح' : 'Software created successfully');
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.software.update.useMutation({
    onSuccess: () => {
      utils.software.list.invalidate();
      toast.success(language === 'ar' ? 'تم تحديث البرنامج بنجاح' : 'Software updated successfully');
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = trpc.software.delete.useMutation({
    onSuccess: () => {
      utils.software.list.invalidate();
      toast.success(language === 'ar' ? 'تم حذف البرنامج بنجاح' : 'Software deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedSoftware(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      version: "",
      releaseDate: new Date(),
      fileType: "software",
      downloadUrl: "",
      fileSize: "",
      model: "",
      image: "",
    });
  };

  const handleCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setFormData({
      id: item.id,
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      descriptionEn: item.descriptionEn || "",
      descriptionAr: item.descriptionAr || "",
      version: item.version || "",
      releaseDate: item.releaseDate ? new Date(item.releaseDate) : new Date(),
      fileType: item.fileType,
      downloadUrl: item.downloadUrl || "",
      fileSize: item.fileSize || "",
      model: item.model || "",
      image: item.image || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedSoftware(id);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.id) {
      updateMutation.mutate({
        id: formData.id,
        titleEn: formData.titleEn,
        titleAr: formData.titleAr,
        descriptionEn: formData.descriptionEn,
        descriptionAr: formData.descriptionAr,
        version: formData.version,
        releaseDate: formData.releaseDate,
        fileType: formData.fileType,
        downloadUrl: formData.downloadUrl,
        fileSize: formData.fileSize,
        model: formData.model,
        image: formData.image,
      });
    } else {
      createMutation.mutate({
        titleEn: formData.titleEn,
        titleAr: formData.titleAr,
        descriptionEn: formData.descriptionEn,
        descriptionAr: formData.descriptionAr,
        version: formData.version,
        releaseDate: formData.releaseDate,
        fileType: formData.fileType,
        downloadUrl: formData.downloadUrl,
        fileSize: formData.fileSize,
        model: formData.model,
        image: formData.image,
      });
    }
  };

  const confirmDelete = () => {
    if (selectedSoftware) {
      deleteMutation.mutate({ id: selectedSoftware });
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
              {language === 'ar' ? 'إدارة البرامج' : 'Manage Software'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إضافة وتعديل وحذف البرامج والتحديثات' 
                : 'Create, edit, and delete software and updates'}
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إضافة برنامج' : 'Add Software'}
          </Button>
        </div>

        {/* Software Table */}
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
                  <TableHead>{language === 'ar' ? 'العنوان' : 'Title'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الموديل' : 'Model'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الإصدار' : 'Version'}</TableHead>
                  <TableHead>{language === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead className="text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {software?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={language === 'ar' ? item.titleAr : item.titleEn}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.version}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs bg-muted rounded-full">
                        {item.fileType}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
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
                  ? (language === 'ar' ? 'تعديل برنامج' : 'Edit Software')
                  : (language === 'ar' ? 'إضافة برنامج جديد' : 'Add New Software')}
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
                  <Label htmlFor="titleEn">{language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleAr">{language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}</Label>
                  <Input
                    id="titleAr"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
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

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">{language === 'ar' ? 'الموديل' : 'Model'}</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="9970+, F900, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">{language === 'ar' ? 'الإصدار' : 'Version'}</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="v1.0.0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fileSize">{language === 'ar' ? 'حجم الملف' : 'File Size'}</Label>
                  <Input
                    id="fileSize"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="45 MB"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fileType">{language === 'ar' ? 'نوع الملف' : 'File Type'}</Label>
                  <Select
                    value={formData.fileType}
                    onValueChange={(value: any) => setFormData({ ...formData, fileType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="apk">APK</SelectItem>
                      <SelectItem value="loader">Loader</SelectItem>
                      <SelectItem value="rom">ROM/Firmware</SelectItem>
                      <SelectItem value="channels">Channels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="releaseDate">{language === 'ar' ? 'تاريخ الإصدار' : 'Release Date'}</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate.toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, releaseDate: new Date(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downloadUrl">{language === 'ar' ? 'رابط التحميل' : 'Download URL'}</Label>
                <Input
                  id="downloadUrl"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">{language === 'ar' ? 'الصورة' : 'Image'}</Label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label={language === 'ar' ? 'اسحب وأفلت الصورة هنا أو انقر للتحميل' : 'Drag and drop image here or click to upload'}
                />
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
                  ? 'سيتم حذف هذا البرنامج نهائياً. لا يمكن التراجع عن هذا الإجراء.'
                  : 'This software will be permanently deleted. This action cannot be undone.'}
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
