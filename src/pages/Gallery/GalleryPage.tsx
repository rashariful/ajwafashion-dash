import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { galleriesColumns } from "@/utils/tableConfigs";
import { galleriesFormFields } from "@/utils/formSchemas";
import {
  useCreateGalleryMutation,
  useGetAllGalleryQuery,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} from "@/redux/api/galleryApi";

type GalleryFormData = {
  title: string;
  images?: File[]; // multiple images upload
};

const GalleriesPage: React.FC = () => {
  const { data: galleries, isLoading, refetch } = useGetAllGalleryQuery();

  console.log(galleries, "gallery compo")
  const [createGallery] = useCreateGalleryMutation();
  const [updateGallery] = useUpdateGalleryMutation();
  const [deleteGallery] = useDeleteGalleryMutation();

  // Convert form data to FormData
  const convertToFormData = (data: Record<string, any>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file: File) => formData.append(key, file));
      } else if (value && value.originFileObj instanceof File) {
        formData.append(key, value.originFileObj);
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return formData;
  };

  // Handle add
  const handleAdd = async (data: GalleryFormData) => {
    try {
      const formData = convertToFormData(data);
      await createGallery(formData).unwrap();
      message.success("Gallery added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add gallery");
    }
  };

  // Handle edit
  const handleEdit = async (id: string, data: GalleryFormData) => {
    try {
      const formData = convertToFormData(data);
      await updateGallery({ id, data: formData }).unwrap();
      message.success("Gallery updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update gallery");
    }
  };

  // Handle delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteGallery(id).unwrap();
      message.success("Gallery deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete gallery");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Gallery Management"
        data={galleries?.data || []}
        columns={galleriesColumns}
        formFields={galleriesFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default GalleriesPage;
