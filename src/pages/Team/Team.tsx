// components/pages/Team/TeamPage.tsx
import React from 'react';
import { message } from 'antd';
import { teamColumns } from '@/utils/tableConfigs';
import { teamFormFields } from '@/utils/formSchemas';
import CrudTemplate from '@/components/templates/CrudTemplate/CrudTemplate';
import { 
  useCreateTeamMutation, 
  useGetAllTeamQuery, 
  useUpdateTeamMutation, 
  useDeleteTeamMutation 
} from "@/redux/api/teamApi";

type TeamMemberFormData = {
  name: string;
  designation: string;
  phone: string;
  thumnail?: File; // if your form includes an upload
  email: string;
};
const TeamPage: React.FC = () => {
  const { data: teams, isLoading, refetch  } = useGetAllTeamQuery();
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  // File to FormData conversion function
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



// Handle add/submit data 
const handleAdd = async (data: TeamMemberFormData) => {
  try {
    const formData = convertToFormData(data);
    await createTeam(formData).unwrap();
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

// Handle Edit/Update
const handleEdit = async (id: string, data: TeamMemberFormData) => {
  try {
    const formData = convertToFormData(data);
    await updateTeam({ id, data: formData }).unwrap(); // check this call
    message.success('Team member updated successfully');
    refetch(); // reload the list
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'data' in error) {
      message.error((error as any)?.data?.message || 'Failed to update team member');
    } else {
      message.error('Failed to update team member');
    }
  }
};
// andle Delete
  // ✅ Delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteTeam(id).unwrap();
      // message.success("Partner deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete partner");
    }
  };

  return (
    <CrudTemplate
      title="Team Management"
      data={teams?.data || []}
      columns={teamColumns}
      formFields={teamFormFields}
      loading={isLoading}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default TeamPage;