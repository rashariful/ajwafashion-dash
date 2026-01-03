import React, { useState } from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { promotionColumns } from "@/utils/tableConfigs";
import { promotionFormFields } from "@/utils/formSchemas";
import {
  useCreatePromotionMutation,
  useGetAllPromotionQuery,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} from "@/redux/api/promotionApi";

type PromotionFormData = {
  title: string;
  isActive?: boolean;
};

const PromotionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: promotions,
    isLoading,
    refetch,
  } = useGetAllPromotionQuery();

  const [createPromotion] = useCreatePromotionMutation();
  const [updatePromotion] = useUpdatePromotionMutation();
  const [deletePromotion] = useDeletePromotionMutation();

  // Add
  const handleAdd = async (data: PromotionFormData) => {
    if (!data.title || data.title.trim() === "") {
      message.error("Title is required");
      return;
    }

    try {
      await createPromotion(data).unwrap();
      message.success("Promotion created successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add promotion");
    }
  };

  // Edit
  const handleEdit = async (id: string, data: PromotionFormData) => {
    if (!data.title || data.title.trim() === "") {
      message.error("Title is required");
      return;
    }

    try {
      await updatePromotion({ id, data }).unwrap();
      message.success("Promotion updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update promotion");
    }
  };

  // Delete
  const handleDelete = async (id: string | number) => {
    try {
      await deletePromotion(id).unwrap();
      message.success("Promotion deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete promotion");
    }
  };

  // Toggle Active
  const handleToggle = async (record: any, checked: boolean) => {
    try {
      await updatePromotion({
        id: record,
        data: { isActive: checked },
      }).unwrap();

      message.success(
        `Promotion ${checked ? "activated" : "deactivated"} successfully`
      );
      refetch();
    } catch (error) {
      message.error("Failed to update promotion");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Promotion Management"
        subtitle="Manage all promotions here"
        data={Array.isArray(promotions?.data) ? promotions.data : []}
        columns={promotionColumns}
        formFields={promotionFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </section>
  );
};

export default PromotionPage;
