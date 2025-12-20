import React from "react";
import { message, Tag, Button } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import {
  useGetAllOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "@/redux/api/orderApi";
import { orderColumns } from "@/utils/tableConfigs";
import { orderFormFields } from "@/utils/formSchemas";
import axios from "axios";

// ✅ Send to courier function
const API_BASE_URL = import.meta.env.VITE_REACT_APP_ROOT;




const OrderPage: React.FC = () => {
  const { data: orders, isLoading, refetch } = useGetAllOrderQuery();
  const [createOrder] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleAdd = async (formData: any) => {
    try {
      await createOrder(formData).unwrap();
      message.success("Order added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add order");
    }
  };

  const handleEdit = async (id: string, formData: any) => {
    try {
      await updateOrder({ id, data: formData }).unwrap();
      message.success("Order updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update order");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteOrder(id).unwrap();
      message.success("Order deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete order");
    }
  };

const sendToCourier = async (orderId: string) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/parcels`,
      { _id: orderId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
refetch()
    message.success(
      `Parcel Send successfully.`
    );
  } catch (error: any) {
    console.error("Axios error:", error?.response);
    message.error(
      error?.response?.data?.message ||
      "Parcel creation failed"
    );
  }
};
  // ✅ Add "Send to Courier" button column dynamically
  const columnsWithCourier = [
    ...orderColumns,
    {
      title: "Actions",
      key: "sendToCourier",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          size="small"
          onClick={() => sendToCourier(record._id)}
          disabled
          // disabled={record.status !== "pending"}
        >
          Send to Courier
        </Button>
      ),
    },
  ];

  return (
    <section>
      <CrudTemplate
        title="Order Management"
        data={orders?.data || []}
        columns={columnsWithCourier}
        formFields={orderFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default OrderPage;

// import React from "react";
// import { message, Tag } from "antd";
// import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
// import {
//   useGetAllOrderQuery,
//   useCreateOrderMutation,
//   useUpdateOrderMutation,
//   useDeleteOrderMutation,
// } from "@/redux/api/orderApi";
// import { orderColumns } from "@/utils/tableConfigs";
// import { orderFormFields } from "@/utils/formSchemas";

// // ================== ⚙️ Main Component ==================
// const OrderPage: React.FC = () => {
//   const { data: orders, isLoading, refetch } = useGetAllOrderQuery();
//   const [createOrder] = useCreateOrderMutation();
//   const [updateOrder] = useUpdateOrderMutation();
//   const [deleteOrder] = useDeleteOrderMutation();

//   // ✅ Create
//   const handleAdd = async (formData: any) => {
//     try {
//       await createOrder(formData).unwrap();
//       message.success("Order added successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to add order");
//     }
//   };

//   // ✅ Update
//   const handleEdit = async (id: string, formData: any) => {
//     try {
//       await updateOrder({ id, data: formData }).unwrap();
//       message.success("Order updated successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to update order");
//     }
//   };

//   // ✅ Delete
//   const handleDelete = async (id: string | number) => {
//     // console.log(id, "from handler")
//     try {
//       await deleteOrder(id).unwrap();
//       message.success("Order deleted successfully");
//       refetch();
//     } catch (error: any) {
//       message.error(error?.data?.message || "Failed to delete order");
//     }
//   };

//   return (
//     <section>
//      <CrudTemplate
//         title="Order Management"
//         data={orders?.data || []}
//         columns={orderColumns}
//         formFields={orderFormFields}
//         loading={isLoading}
//         onAdd={handleAdd}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </section>
//   );
// };

// export default OrderPage;
