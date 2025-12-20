import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { quoteColumns } from "@/utils/tableConfigs";
import { quoteFormFields } from "@/utils/formSchemas";
import {
  useGetAllQuoteQuery,
  useCreateQuoteMutation,
  useUpdateQuoteMutation,
  useDeleteQuoteMutation,
} from "@/redux/api/quoteApi";

type QuoteFormData = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  message?: string;
};

const QuotePage: React.FC = () => {
  const { data: quotes, isLoading, refetch } = useGetAllQuoteQuery();
  const [createQuote] = useCreateQuoteMutation();
  const [updateQuote] = useUpdateQuoteMutation();
  const [deleteQuote] = useDeleteQuoteMutation();

  // Handle Add
  const handleAdd = async (data: QuoteFormData) => {
    try {
      await createQuote(data).unwrap();
      message.success("Quote added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add quote");
    }
  };

  // Handle Edit
  const handleEdit = async (id: string, data: QuoteFormData) => {
    try {
      await updateQuote({ id, body: data }).unwrap();
      message.success("Quote updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update quote");
    }
  };

  // Handle Delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteQuote(id).unwrap();
      message.success("Quote deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete quote");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Quote Management"
        data={quotes?.data || []}
        columns={quoteColumns}
        formFields={quoteFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default QuotePage;
