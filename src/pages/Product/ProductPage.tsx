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
  title: string;
  price: number;
  discountPrice: number;
  images?: File[];
  whyBuy?: { title: string }[];
  variants?: {
    colorName: string;
    image?: File;
    stock: number;
  }[];
};

const ProductPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // fetch products
  const { data: products, isLoading, refetch } = useGetAllProductQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Convert form data to FormData
const convertToFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  const appendFormData = (form: FormData, key: string, value: any) => {
    if (value === undefined || value === null) return;

    // If value is File
    if (value instanceof File) {
      form.append(key, value);
      return;
    }

    // If value is an array
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        // If array item is File
        if (item instanceof File) {
          form.append(`${key}[${index}]`, item);
        }
        // If array item is object
        else if (typeof item === "object") {
          Object.entries(item).forEach(([childKey, childValue]) => {
            // Nested File inside object
            if (childValue instanceof File) {
              form.append(`${key}[${index}][${childKey}]`, childValue);
            } else {
              form.append(`${key}[${index}][${childKey}]`, String(childValue));
            }
          });
        }
        // Primitive array item
        else {
          form.append(`${key}[${index}]`, String(item));
        }
      });
      return;
    }

    // If value is object
    if (typeof value === "object") {
      Object.entries(value).forEach(([childKey, childValue]) => {
        // File inside object
        if (childValue instanceof File) {
          form.append(`${key}[${childKey}]`, childValue);
        } else {
          form.append(`${key}[${childKey}]`, String(childValue));
        }
      });
      return;
    }

    // Primitive
    form.append(key, String(value));
  };

  Object.entries(data).forEach(([key, value]) => {
    appendFormData(formData, key, value);
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
    
    console.log(data, "product info")
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
        searchable={true}
        onSearch={(v: string) => setSearchTerm(v)}
      />
    </section>
  );
};

export default ProductPage;
