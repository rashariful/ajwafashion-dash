import React, { useMemo } from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { serviceColumns } from "@/utils/tableConfigs";
import { serviceFormFields } from "@/utils/formSchemas";
import {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "@/redux/api/serviceApi";
import AddServicePage from "./AddServicePage";

type ServiceFormData = {
  title: string;
  subTitle: string;
  description: string;
  thumbnail?: File;
  isActive?: boolean;
  parentService?: string;
  subServices?: string[];
};

// ----- Utility: Convert form values to FormData -----
const convertToFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // Array of files
      if (value.every((v) => v instanceof File)) {
        value.forEach((file) => formData.append(key, file));
      }
      // Array of objects
      else if (value.every((v) => typeof v === "object")) {
        value.forEach((obj) => formData.append(`${key}[]`, JSON.stringify(obj)));
      }
      // Array of primitives
      else {
        value.forEach((v) => formData.append(`${key}[]`, String(v)));
      }
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

const ServicePage: React.FC = () => {
  const { data: services, isLoading, refetch } = useGetAllServiceQuery();
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  // ----- Handle Add -----
  const handleAdd = async (data: ServiceFormData) => {
    try {
      const formData = convertToFormData(data);
      await createService(formData).unwrap();
      message.success("Service added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add service");
    }
  };

  // ----- Handle Edit -----
  const handleEdit = async (id: string, data: ServiceFormData) => {
    console.log(id, data, "from edit service")
    try {
      const formData = convertToFormData(data);
      await updateService({ id, data: formData }).unwrap();
      message.success("Service updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update service");
    }
  };

  // ----- Handle Delete -----
  const handleDelete = async (id: string | number) => {
    try {
      await deleteService(id).unwrap();
      message.success("Service deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete service");
    }
  };

  // ----- Dynamic form fields with service options -----
  const dynamicServiceFormFields = useMemo(() => {
    const serviceOptions = services?.data?.map((s: any) => ({
      label: s.title,
      value: s.id,
    })) || [];

    return serviceFormFields.map((field) => {
      if (field.name === "parentService" || field.name === "subServices") {
        return { ...field, options: serviceOptions, dynamicOptions: true };
      }
      return field;
    });
  }, [services]);

  return (
    <section>
      <AddServicePage/>
      <CrudTemplate
        title="Service Management"
        subtitle="You can manage all Services"
        data={services?.data || []}
        columns={serviceColumns}
        formFields={dynamicServiceFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default ServicePage;

// import React from "react";
// import { message } from "antd";
// import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
// import { serviceColumns } from "@/utils/tableConfigs";
// import { serviceFormFields } from "@/utils/formSchemas";
// import {
//   useCreateServiceMutation,
//   useGetAllServiceQuery,
//   useUpdateServiceMutation,
//   useDeleteServiceMutation,
// } from "@/redux/api/serviceApi";

// type ServiceFormData = {
//   title: string;
//   subTitle: string;
//   description: string;
//   thumbnail?: File;
//   isActive?: boolean;
// };

// const ServicePage: React.FC = () => {
//   const { data: services, isLoading, refetch } = useGetAllServiceQuery();
//   const [createService] = useCreateServiceMutation();
//   const [updateService] = useUpdateServiceMutation();
//   const [deleteService] = useDeleteServiceMutation();
//   // Convert form data to FormData
//   // const convertToFormData = (data: Record<string, any>) => {
//   //   const formData = new FormData();

//   //   Object.entries(data).forEach(([key, value]) => {
//   //     if (!value) return;

//   //     // Single File from Upload
//   //     if (value.originFileObj instanceof File) {
//   //       formData.append(key, value.originFileObj);
//   //     }
//   //     // Array of Files from multiple Upload
//   //     else if (Array.isArray(value) && value[0]?.originFileObj instanceof File) {
//   //       value.forEach((fileObj: any) => formData.append(key, fileObj.originFileObj));
//   //     }
//   //     // Direct File object
//   //     else if (value instanceof File) {
//   //       formData.append(key, value);
//   //     }
//   //     // Date object
//   //     else if (value instanceof Date) {
//   //       formData.append(key, value.toISOString());
//   //     }
//   //     // Array of objects (like faqs)
//   //     else if (Array.isArray(value) && typeof value[0] === "object") {
//   //       formData.append(key, JSON.stringify(value));
//   //     }
//   //     // Other objects
//   //     else if (typeof value === "object" && value !== null) {
//   //       formData.append(key, JSON.stringify(value));
//   //     }
//   //     // Strings, numbers, booleans
//   //     else {
//   //       formData.append(key, String(value));
//   //     }
//   //   });

//   //   return formData;
//   // };
//   // utils/formData.ts
//   const convertToFormData = (data: Record<string, any>) => {
//     const formData = new FormData();

//     Object.entries(data).forEach(([key, value]) => {
//       if (value === undefined || value === null) return;

//       // Handle File
//       if (value instanceof File) {
//         formData.append(key, value);

//         // Handle array
//       } else if (Array.isArray(value)) {
//         // Array of files
//         if (value.every((v) => v instanceof File)) {
//           value.forEach((file) => formData.append(key, file));

//           // Array of objects (like FAQs)
//         } else if (value.every((v) => typeof v === "object")) {
//           value.forEach((obj) => {
//             // Append as object using FormData convention for arrays
//             // You can append as key[] so backend can parse it
//             formData.append(`${key}[]`, JSON.stringify(obj));
//           });

//           // Array of primitives
//         } else {
//           value.forEach((v) => formData.append(`${key}[]`, String(v)));
//         }

//         // Single object (not array)
//       } else if (typeof value === "object") {
//         formData.append(key, JSON.stringify(value));

//         // Primitives
//       } else {
//         formData.append(key, String(value));
//       }
//     });

//     return formData;
//   };

//   // Handle add
//   const handleAdd = async (data: ServiceFormData) => {
//     console.log(data, "service data");
//     try {
//       const formData = convertToFormData(data); // properly handles faqs, uploads, dates, etc.
//       await createService(formData).unwrap();
//       message.success("Service added successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to add service");
//     }
//   };

//   // Convert form data to FormData
//   // const convertToFormData = (data: Record<string, any>) => {
//   //   const formData = new FormData();

//   //   Object.entries(data).forEach(([key, value]) => {
//   //     if (value && value.originFileObj instanceof File) {
//   //       formData.append(key, value.originFileObj);
//   //     } else if (value instanceof File) {
//   //       formData.append(key, value);
//   //     } else if (value instanceof Date) {
//   //       formData.append(key, value.toISOString());
//   //     } else if (typeof value === "object" && value !== null) {
//   //       formData.append(key, JSON.stringify(value));
//   //     } else if (value !== undefined && value !== null) {
//   //       formData.append(key, String(value));
//   //     }
//   //   });

//   //   return formData;
//   // };

//   // // Handle add
//   // const handleAdd = async (data: ServiceFormData) => {
//   //   try {
//   //     const formData = convertToFormData(data);
//   //     await createService(formData).unwrap();
//   //     message.success("Service added successfully");
//   //     refetch();
//   //   } catch (error: any) {
//   //     message.error(error?.data?.message || "Failed to add service");
//   //   }
//   // };

//   // Handle edit
//   const handleEdit = async (id: string, data: ServiceFormData) => {
//     try {
//       const formData = convertToFormData(data);
//       await updateService({ id, data: formData }).unwrap();
//       message.success("Service updated successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to update service");
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id: string | number) => {
//     try {
//       await deleteService(id).unwrap();
//       message.success("Service deleted successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to delete service");
//     }
//   };

//   const dynamicServiceFormFields = serviceFormFields.map((field) => {
//   if (field.name === "parentService" || field.name === "subServices") {
//     return { ...field, options: serviceOptions, dynamicOptions: true };
//   }
//   return field;
// });


//   return (
//     <section>
//       <CrudTemplate
//         title="Service Management"
//         subtitle="you can manage all Service"
//         data={services?.data || []}
//         columns={serviceColumns}
//         formFields={serviceFormFields}
//         formFields={dynamicServiceFormFields}
//         loading={isLoading}
//         onAdd={handleAdd}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </section>
//   );
// };

// export default ServicePage;
