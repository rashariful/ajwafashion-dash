import React, { useState } from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";

import {
  useCreateKeyPointMutation,
  useGetAllKeyPointQuery,
  useUpdateKeyPointMutation,
  useDeleteKeyPointMutation,
} from "@/redux/api/keyPointApi";
import { keyPointColumns } from "@/utils/tableConfigs";
import { keyPointFormFields } from "@/utils/formSchemas";

type KeyPointFormData = {
  title: string;
  keyPoint: string[]; // array of strings
  images?: File[];
  isActive?: boolean;
};

const KeyPointPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: keyPoints, isLoading, refetch } = useGetAllKeyPointQuery();

  const [createKeyPoint] = useCreateKeyPointMutation();
  const [updateKeyPoint] = useUpdateKeyPointMutation();
  const [deleteKeyPoint] = useDeleteKeyPointMutation();

const convertToFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // ✅ keyPoint dynamicList fix
    if (key === "keyPoint" && Array.isArray(value)) {
      value.forEach((v: any) => {
        // v এর মধ্যে object আছে, আমরা value টা নিতে চাই
        if (v && typeof v === "object" && "value" in v) {
          formData.append("keyPoint", v.value);
        } else {
          formData.append("keyPoint", v);
        }
      });
      return;
    }

    // ✅ images as File[]
    if (key === "images" && Array.isArray(value)) {
      value.forEach((file: File) => {
        formData.append("images", file);
      });
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

  const handleAdd = async (data: KeyPointFormData) => {
    try {
      const formData = convertToFormData(data);
      await createKeyPoint(formData).unwrap();
      message.success("KeyPoint added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add KeyPoint");
    }
  };

  const handleEdit = async (id: string, data: KeyPointFormData) => {
    try {
      const formData = convertToFormData(data);
      await updateKeyPoint({ id, data: formData }).unwrap();
      message.success("KeyPoint updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update KeyPoint");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteKeyPoint(id).unwrap();
      message.success("KeyPoint deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete KeyPoint");
    }
  };

  const handleToggle = async (record: any, checked: boolean) => {
    try {
      await updateKeyPoint({ id: record, data: { isActive: checked } }).unwrap();
      message.success(`KeyPoint ${checked ? "activated" : "deactivated"} successfully`);
      refetch();
    } catch (err) {
      console.error(err);
      message.error("Failed to update KeyPoint");
    }
  };

  return (
    <section>
      <div>
        <CrudTemplate
          title="KeyPoint Management"
          subtitle="Manage all key points here"
          data={Array.isArray(keyPoints?.data) ? keyPoints.data : []}
          columns={keyPointColumns}
          formFields={keyPointFormFields}
          loading={isLoading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </div>
    </section>
  );
};

export default KeyPointPage;
