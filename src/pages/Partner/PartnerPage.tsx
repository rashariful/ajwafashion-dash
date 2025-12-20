import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { partnerColumns } from "@/utils/tableConfigs";
import { partnerFormFields } from "@/utils/formSchemas";
import {
  useGetAllPartnerQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} from "@/redux/api/partnerApi";

type PartnerFormData = {
  title: string;
  thumbnail: File;
};

const PartnerPage: React.FC = () => {
  const { data: partners, isLoading, refetch } = useGetAllPartnerQuery();
  // console.log(partners, "partner data fromt partner component")
  const [createPartner] = useCreatePartnerMutation();
  const [updatePartner] = useUpdatePartnerMutation();
  const [deletePartner] = useDeletePartnerMutation();

  // 🔄 Convert object to FormData
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


  // ✅ Create
const handleAdd = async (data: PartnerFormData) => {
  try {
    const formData = convertToFormData(data);
    console.log(formData, "from handle add partner")
    await createPartner(formData).unwrap();
    // message.success('Team member added successfully');
    refetch()
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'data' in error) {
      message.error((error as any)?.data?.message || 'Failed to add team member');
    } else {
      message.error('Failed to add team member');
    }
  }
};

  // ✅ Update
  const handleEdit = async (id: string, data: PartnerFormData) => {
    try {
      const formData = convertToFormData(data);
      await updatePartner({ id, data: formData }).unwrap();
      message.success("Partner updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update partner");
    }
  };

  // ✅ Delete
  const handleDelete = async (id: string | number) => {
    try {
      await deletePartner(id).unwrap();
      message.success("Partner deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete partner");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Partner Management"
        data={partners?.data || []}
        columns={partnerColumns}
        formFields={partnerFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default PartnerPage;
