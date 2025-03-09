import getEnv from "@/helpers/getEnv";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import showToast from "@/helpers/showToast";

export default function useCategoryActions() {
  const { loading, data, error } = useFetch(
    `${getEnv("VITE_BASE_URL")}/category/get`
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  async function addOrUpdateCategory(
    values,
    currentEditedId,
    resetForm,
    closeDialog
  ) {
    //api call
    const url = currentEditedId
      ? `${getEnv("VITE_BASE_URL")}/category/${currentEditedId}/update`
      : `${getEnv("VITE_BASE_URL")}/category/add`;
    const method = currentEditedId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          credentials: true,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      showToast("success", data.message);
      resetForm();
      closeDialog();

      setCategories((prev) =>
        currentEditedId
          ? prev.map((cat) =>
              cat._id === currentEditedId ? data.category : cat
            )
          : [...prev, data.category]
      );
    } catch (error) {
      console.error(error.message);
      showToast("error", error.message);
    }
  }

  async function handleDeleteCategory(categoryId) {
    try {
      const response = await fetch(
        `${getEnv("VITE_BASE_URL")}/category/${categoryId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            credentials: true,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      const updatedData = categories.filter(
        (cat) => cat._id !== data.category._id
      );
      setCategories(updatedData);
      showToast("success", data.message);
    } catch (error) {
      console.error(error.message);
      showToast("error", error.message);
    }
  }

  return {
    loading,
    error,
    addOrUpdateCategory,
    handleDeleteCategory,
    categories,
  };
}
