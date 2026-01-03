import React, { useState } from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { bannerColumns } from "@/utils/tableConfigs";
import { bannerFormFields } from "@/utils/formSchemas";
import {
  useCreateBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "@/redux/api/bannerApi";

type BannerFormData = {
  title: string;
  thumbnail?: File;
  isActive?: boolean;
};

const BannerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch banners with optional search term
  const {
    data: banners,
    isLoading,
    refetch,
  } = useGetAllBannerQuery();

  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();


const handleAdd = async (data: BannerFormData) => {
  if (!data.title || data.title.trim() === "") {
    message.error("Title is required");
    return;
  }

  try {
    // Send JSON directly
    await createBanner(data).unwrap();
    message.success("Banner created successfully");
    refetch();
  } catch (error: any) {
    message.error(error?.data?.message || "Failed to add banner");
  }
};


  // Handle edit
const handleEdit = async (id: string, data: BannerFormData) => {
  if (!data.title || data.title.trim() === "") {
    message.error("Title is required");
    return;
  }

  try {
    await updateBanner({ id, data }).unwrap(); // <-- pass `data` here
    message.success("Banner updated successfully");
    refetch();
  } catch (error: any) {
    message.error(error?.data?.message || "Failed to update banner");
  }
};


  // Handle delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteBanner(id).unwrap();
      message.success("Banner deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete banner");
    }
  };

  // Handle toggle active/inactive
const handleToggle = async (record: any, checked: boolean) => {
  try {
    await updateBanner({
      id: record,           // <-- record._id পাঠাতে হবে
      data: { isActive: checked },
    }).unwrap();

    message.success(`Banner ${checked ? "activated" : "deactivated"} successfully`);
    refetch();
  } catch (err) {
    console.error(err);
    message.error("Failed to update banner");
  }
};



  return (
    <section>
      <div>
        <CrudTemplate
          title="Banner Management"
          subtitle="Your all banner manage here "
          data={Array.isArray(banners?.data) ? banners.data : []}
          columns={bannerColumns}
          formFields={bannerFormFields}
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

export default BannerPage;

// import React from "react";
// import { message } from "antd";
// import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
// import { bannerColumns } from "@/utils/tableConfigs";
// import { bannerFormFields } from "@/utils/formSchemas";
// import {
//   useCreateBannerMutation,
//   useGetAllBannerQuery,
//   useUpdateBannerMutation,
//   useDeleteBannerMutation,
// } from "@/redux/api/bannerApi";

// type BannerFormData = {
//   title: string;
//   thumbnail?: File;
//   isActive?: boolean;
// };

// const BannerPage: React.FC = () => {
//     const [searchTerm, setSearchTerm] = React.useState("");

//   const { data: banners, isLoading, refetch } = useGetAllBannerQuery({ search: searchTerm });
//   const [createBanner] = useCreateBannerMutation();
//   const [updateBanner] = useUpdateBannerMutation();
//   const [deleteBanner] = useDeleteBannerMutation();

//   // Convert form data to FormData
//   const convertToFormData = (data: Record<string, any>) => {
//     const formData = new FormData();

//     Object.entries(data).forEach(([key, value]) => {
//       if (value && value.originFileObj instanceof File) {
//         formData.append(key, value.originFileObj);
//       } else if (value instanceof File) {
//         formData.append(key, value);
//       } else if (value instanceof Date) {
//         formData.append(key, value.toISOString());
//       } else if (typeof value === "object" && value !== null) {
//         formData.append(key, JSON.stringify(value));
//       } else if (value !== undefined && value !== null) {
//         formData.append(key, String(value));
//       }
//     });

//     return formData;
//   };

//   // Handle add
//   const handleAdd = async (data: BannerFormData) => {
//     try {
//       const formData = convertToFormData(data);
//       await createBanner(formData).unwrap();
//       message.success("Banner added successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to add banner");
//     }
//   };

//   // Handle edit
//   const handleEdit = async (id: string, data: BannerFormData) => {
//     // console.log(id, data, "from handle edit")
//     try {
//       const formData = convertToFormData(data);
//       await updateBanner({ id, data: formData }).unwrap();

//       // message.success("Banner updated successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to update banner");
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id: string | number) => {
//     try {
//       await deleteBanner(id).unwrap();
//       message.success("Banner deleted successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to delete banner");
//     }
//   };
//   const handleToggle = async (record: any, checked: boolean) => {
//     console.log(record, "toggle")
//     try {
//       // Update isActive via RTK Query
//       await updateBanner({ id: record.id, isActive: checked }).unwrap();
//       console.log(
//         `Banner ${record.id} set to ${checked ? "Active" : "Inactive"}`
//       );
//     } catch (error) {
//       console.error("Failed to update banner status", error);
//     }
//   };

//   return (
//     <section>
//      <div>
//         <CrudTemplate
//         title="Banner Management"
//         data={banners?.data || []}
//         columns={bannerColumns}
//         formFields={bannerFormFields}
//         loading={isLoading}
//         onAdd={handleAdd}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onToggle={handleToggle} // ✅ toggle directly updates isActive
//         searchable={true}
//       onSearch={(value: string) => setSearchTerm(value)} // ✅ sends term to RTK Query
//       />
//      </div>
//     </section>
//   );
// };

// export default BannerPage;
