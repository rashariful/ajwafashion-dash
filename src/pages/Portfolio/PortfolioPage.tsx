import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { portfolioColumns } from "@/utils/tableConfigs";
import { portfolioFormFields } from "@/utils/formSchemas";
import {
  useCreatePortfolioMutation,
  useGetAllPortfolioQuery,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} from "@/redux/api/portfolioApi";

type PortfolioFormData = {
  title: string;
  subTitle: string;
  images?: File[]; // multiple images upload
};

const PortfolioPage: React.FC = () => {
  const { data: portfolios, isLoading, refetch } = useGetAllPortfolioQuery();
  const [createPortfolio] = useCreatePortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

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

  // Handle create
  const handleAdd = async (data: PortfolioFormData) => {
    try {
      const formData = convertToFormData(data);
      await createPortfolio(formData).unwrap();
      message.success("Archive added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add portfolio");
    }
  };

  // Handle update
  const handleEdit = async (id: string, data: PortfolioFormData) => {
    try {
      const formData = convertToFormData(data);
      await updatePortfolio({ id, data: formData }).unwrap();
      message.success("Archive updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update portfolio");
    }
  };

  // Handle delete
  const handleDelete = async (id: string | number) => {
    try {
      await deletePortfolio(id).unwrap();
      message.success("Archive deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete portfolio");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Archive Management"
        data={portfolios?.data || []}
        columns={portfolioColumns}
        formFields={portfolioFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default PortfolioPage;
