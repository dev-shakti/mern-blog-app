import { Button } from "@/components/ui/button";
import AddCategoryDialog from "@/components/AddCategoryDialog";
import CategoryListTable from "@/components/CategoryListTable";
import useCategoryActions from "@/hooks/useCategoryActions";
import useCategoryDialog from "@/hooks/useCategoryDialog";

const CategoryList = () => {
  const {
    loading,
    error,
    addOrUpdateCategory,
    handleDeleteCategory,
    categories,
  }=useCategoryActions()
 
  const { open, currentEditedId, form, openDialog, closeDialog }=useCategoryDialog()

  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => openDialog(null)}
          className="bg-violet-500 hover:bg-violet-600 cursor-pointer"
        >
          Add Category
        </Button>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">
        All Categories
      </h1>
      <CategoryListTable
        categories={categories}
        loading={loading}
        error={error}
        onEdit={openDialog}
        onDelete={handleDeleteCategory}
      />
      {open && (
        <AddCategoryDialog
          openCategoryDialog={open}
          onClose={closeDialog}
          form={form}
          handleCategoryForm={(values) => addOrUpdateCategory(values, currentEditedId, form.reset, closeDialog)}
          currentEditedId={currentEditedId}
        />
      )}
    </div>
  );
};

export default CategoryList;
