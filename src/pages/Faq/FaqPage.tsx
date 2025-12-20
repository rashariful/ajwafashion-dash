import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { faqColumns } from "@/utils/tableConfigs";
import { faqFormFields } from "@/utils/formSchemas";
import {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "@/redux/api/faqApi";

type FaqFormData = {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  isActive?: boolean;
};

const FaqPage: React.FC = () => {
  const { data: faqs, isLoading, refetch } = useGetAllFaqQuery();
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  // Handle Add
  const handleAdd = async (data: FaqFormData) => {
    try {
      await createFaq(data).unwrap();
      message.success("FAQ added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add FAQ");
    }
  };

  // Handle Edit
  const handleEdit = async (id: string, data: FaqFormData) => {
    try {
      console.log(id,data, "faq update")
    const res =  await updateFaq({ id, body: data }).unwrap();
          console.log(res, "after success")
      message.success("FAQ updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update FAQ");
    }
  };

  // Handle Delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteFaq(id).unwrap();
      message.success("FAQ deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="FAQ Management"
        data={faqs?.data || []}
        columns={faqColumns}
        formFields={faqFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default FaqPage;
