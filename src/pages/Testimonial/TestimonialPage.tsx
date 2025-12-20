import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { testimonialColumns } from "@/utils/tableConfigs";
import { testimonialFormFields } from "@/utils/formSchemas";
import {
  useCreateTestimonialMutation,
  useGetAllTestimonialQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} from "@/redux/api/testimonialApi";

type TestimonialFormData = {
  name: string;
  designation?: string;
  review?: string;
  videoUrl?: string;
  thumbnail?: File;
  isActive?: boolean;
};

const TestimonialPage: React.FC = () => {
  const { data: testimonials, isLoading, refetch } = useGetAllTestimonialQuery();
  const [createTestimonial] = useCreateTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  // Convert form data to FormData
  const convertToFormData = (data: Record<string, any>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      let finalValue = value;
      if (value && value.originFileObj instanceof File) {
        finalValue = value.originFileObj;
      }
      if (finalValue instanceof File) {
        formData.append(key, finalValue);
      } else if (finalValue instanceof Date) {
        formData.append(key, finalValue.toISOString());
      } else if (typeof finalValue === "object" && finalValue !== null) {
        formData.append(key, JSON.stringify(finalValue));
      } else if (finalValue !== undefined && finalValue !== null) {
        formData.append(key, String(finalValue));
      }
    });

    return formData;
  };

  // Handle create
  const handleAdd = async (data: TestimonialFormData) => {
    try {
      const formData = convertToFormData(data);
      await createTestimonial(formData).unwrap();
      message.success("Testimonial added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add testimonial");
    }
  };

  // Handle update
  const handleEdit = async (id: string, data: TestimonialFormData) => {
    try {
      const formData = convertToFormData(data);
      await updateTestimonial({ id, data: formData }).unwrap();
      message.success("Testimonial updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update testimonial");
    }
  };

  // Handle delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteTestimonial(id).unwrap();
      message.success("Testimonial deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete testimonial");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Testimonial Management"
        data={testimonials?.data || []}
        columns={testimonialColumns}
        formFields={testimonialFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default TestimonialPage;
