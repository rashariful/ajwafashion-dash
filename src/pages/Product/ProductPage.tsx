import React, { useState } from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { productColumns } from "@/utils/tableConfigs";
import { productFormFields } from "@/utils/formSchemas";

import {
  useCreateProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/api/productApi";

type ProductFormData = {
  title: string;                  // matches `title`
  details: string;                // matches `details`
  regulerPrice: number;           // matches `regulerPrice`
  sellingPrice: number;           // matches `sellingPrice`
  thumbnail: File | null;         // single File, matches schema String
  variants?: {                     // matches schema object
    key: string;
    value: string;
  };
  isActive?: boolean;              // optional, default true
};


const ProductPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // fetch products
  const { data: products, isLoading, refetch } = useGetAllProductQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

// Convert form data to FormData (handles single File and nested objects)
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

//   variyent chara kaj kortese ata 
// const convertToFormData = (data: Record<string, any>) => {
//   const formData = new FormData();

//   const appendFormData = (form: FormData, key: string, value: any) => {
//     if (value === undefined || value === null) return;

//     // File
//     if (value instanceof File) {
//       form.append(key, value);
//       return;
//     }

//     // Array
//     if (Array.isArray(value)) {
//       value.forEach((item, index) => {
//         // Array of File
//         if (item instanceof File) {
//           form.append(key, item);
//         }
//         // Array of objects
//         else if (typeof item === "object") {
//           Object.entries(item).forEach(([childKey, childValue]) => {
//             form.append(`${key}[${index}][${childKey}]`, String(childValue));
//           });
//         }
//         // Array of primitive
//         else {
//           form.append(`${key}[${index}]`, String(item));
//         }
//       });
//       return;
//     }

//     // Object
//     if (typeof value === "object") {
//       Object.entries(value).forEach(([childKey, childValue]) => {
//         form.append(`${key}[${childKey}]`, String(childValue));
//       });
//       return;
//     }

//     // Primitive
//     form.append(key, String(value));
//   };

//   Object.entries(data).forEach(([key, value]) => {
//     appendFormData(formData, key, value);
//   });

//   return formData;
// };

  // ADD Product
  const handleAdd = async (data: ProductFormData) => {
  
    try {
      const formData = convertToFormData(data);
      await createProduct(formData).unwrap();
      message.success("Product added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add product");
    }
  };

  // EDIT Product
  const handleEdit = async (id: string, data: ProductFormData) => {
    try {
      const formData = convertToFormData(data);
      await updateProduct({ id, data: formData }).unwrap();
      message.success("Product updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update product");
    }
  };

  // DELETE Product
  const handleDelete = async (id: string | number) => {
    try {
      await deleteProduct(id).unwrap();
      message.success("Product deleted");
      refetch();
    } catch (error: any) {
      message.error("Failed to delete product");
    }
  };

  const handleToggle = async (record: any, checked: boolean) => {
    try {
      await updateProduct({ id: record, data: { isActive: checked } }).unwrap();
      message.success(`product ${checked ? "activated" : "deactivated"} successfully`);
      refetch();
    } catch (err) {
      console.error(err);
      message.error("Failed to update product");
    }
  };
  return (
    <section>
      <CrudTemplate
        title="Product Management"
        subtitle="Manage all products, images, variants, price etc."
        data={Array.isArray(products?.data) ? products.data : []}
        columns={productColumns}
        formFields={productFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      onToggle={handleToggle}
      
      />
    </section>
  );
};

export default ProductPage;
