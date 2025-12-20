// utils/tableConfigs.tsx
import { ColumnsType } from "antd/es/table";
import { Button, Image, message, Tag, Typography } from "antd";
import axios from "axios";

export const bannerColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
    {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image width={50} height={50} src={thumbnail} alt="Banner" />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Sub Title",
    dataIndex: "subTitle",
    key: "subTitle",
  },

  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
  
  
];

export const productColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
 {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images: string[]) =>
      Array.isArray(images) && images.length > 0 ? (
        <Image.PreviewGroup>
          {images.map((img, i) => (
            <Image
              key={i}
              width={40}
              height={40}
              src={img}
              style={{ marginRight: 5, borderRadius: 6 }}
            />
          ))}
        </Image.PreviewGroup>
      ) : (
        "No Image"
      ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "Discount Price",
    dataIndex: "discountPrice",
    key: "discountPrice",
  },

 

  {
    title: "Variants",
    dataIndex: "variants",
    key: "variants",
    render: (variants: any[]) =>
      variants?.length ? (
        variants.map((v, i) => (
          <Tag key={i} color="blue">
            {v.colorName} ({v.stock})
          </Tag>
        ))
      ) : (
        <Tag>No Variant</Tag>
      ),
  },
   {
    title: "Why Buy",
    dataIndex: "whyBuy",
    key: "whyBuy",
    render: (whyBuy: any[]) =>
      Array.isArray(whyBuy) && whyBuy.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {whyBuy.map((item, i) => (
            <Tag key={i} color="green">
              {item.title}
            </Tag>
          ))}
        </div>
      ) : (
        <Tag color="default">No Reasons</Tag>
      ),
  },
];

export const teamColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 80,
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image
          width={50}
          height={50}
          src={thumbnail}
          alt="Profile"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          No Image
        </div>
      ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Joined Date",
    dataIndex: "joinedAt",
    key: "joinedAt",
    render: (date: string) =>
      date ? new Date(date).toLocaleDateString() : "N/A",
    sorter: (a, b) =>
      new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime(),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
];
export const partnerColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 80,
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image
          width={50}
          height={50}
          src={thumbnail}
          alt="Profile"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          No Image
        </div>
      ),
  },
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    sorter: false,
  },

  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
];

export const serviceColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
  },
  
  {
    title: "Short Description",
    dataIndex: "shortDescription",
    key: "shortDescription",
    render: (text: string) => (text?.length > 50 ? text.slice(0, 50) + "..." : text),
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (url: string) =>
      url ? (
        <img
          src={url}
          alt="thumbnail"
          style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 4 }}
        />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Video URL",
    dataIndex: "videoUrl",
    key: "videoUrl",
    render: (text: string) =>
      text ? (
        <a href={text} target="_blank" rel="noreferrer">
          View
        </a>
      ) : (
        "N/A"
      ),
  },

  {
    title: "FAQs",
    dataIndex: "faqs",
    key: "faqs",
    render: (faqs: { question: string; answer: string }[]) =>
      faqs?.length
        ? faqs.map((f, i) => (
            <div key={i}>
              <strong>Q:</strong> {f.question} <br />
              <strong>A:</strong> {f.answer}
            </div>
          ))
        : "No FAQs",
  },

  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    render: (value: boolean) => (value ? "Active" : "Inactive"),
  },
];


// export const serviceColumns: ColumnsType<any> = [
//   {
//     title: "SL",
//     key: "index",
//     width: 60,
//     align: "center",
//     render: (_, __, index) => index + 1,
//   },
//   {
//     title: "Title",
//     dataIndex: "title",
//     key: "title",
//   },
//   {
//     title: "Sub Title",
//     dataIndex: "subTitle",
//     key: "subTitle",
//   },
//   {
//     title: "Description",
//     dataIndex: "description",
//     key: "description",
//     render: (text: string) =>
//       text?.length > 60 ? `${text.slice(0, 60)}...` : text,
//   },
//   {
//     title: "Thumbnail",
//     dataIndex: "thumbnail",
//     key: "thumbnail",
//     render: (thumbnail: string) =>
//       thumbnail ? (
//         <Image width={50} height={50} src={thumbnail} alt="Thumbnail" />
//       ) : (
//         "No Image"
//       ),
//   },
//   {
//     title: "Status",
//     dataIndex: "isActive",
//     key: "isActive",
//     render: (isActive: boolean) => (
//       <Tag color={isActive ? "green" : "red"}>
//         {isActive ? "Active" : "Inactive"}
//       </Tag>
//     ),
//     filters: [
//       { text: "Active", value: true },
//       { text: "Inactive", value: false },
//     ],
//     onFilter: (value, record) => record.isActive === value,
//   },
// ];

export const testimonialColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 80,
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image
          width={50}
          height={50}
          src={thumbnail}
          alt="Profile"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          No Image
        </div>
      ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: false,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    sorter: false,
  },
  {
    title: "Review",
    dataIndex: "review",
    key: "review",
    render: (text: string) =>
      text?.length > 60 ? `${text.slice(0, 60)}...` : text || "—",
  },
  {
    title: "Video URL",
    dataIndex: "videoUrl",
    key: "videoUrl",
    render: (url: string) =>
      url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      ) : (
        "—"
      ),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
];

export const portfolioColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Sub Title",
    dataIndex: "subTitle",
    key: "subTitle",
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images: string[]) =>
      images?.length
        ? images.map((img, idx) => (
            <Image
              key={idx}
              width={50}
              height={50}
              src={img}
              alt={`Portfolio ${idx + 1}`}
              style={{ marginRight: 5, objectFit: "cover" }}
            />
          ))
        : "No Images",
  },
];

export const galleriesColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images: string[]) =>
      images?.length
        ? images.map((img, idx) => (
            <Image
              key={idx}
              width={50}
              height={50}
              src={img}
              alt={`Gallery ${idx + 1}`}
              style={{ marginRight: 5, objectFit: "cover" }}
            />
          ))
        : "No Images",
  },
];



export const contactColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
];

export const quoteColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Budget",
    dataIndex: "budget",
    key: "budget",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
];

export const faqColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Question",
    dataIndex: "question",
    key: "question",
  },
  {
    title: "Answer",
    dataIndex: "answer",
    key: "answer",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    align: "center",
    render: (value: boolean) => (value ? "Active" : "Inactive"),
  },
];

// export const orderColumns: ColumnsType<any> = [


//   {
//     title: "SL",
//     key: "index",
//     width: 60,
//     align: "center",
//     render: (_, __, index) => index + 1,
//   },
//   {
//     title: "Customer Name",
//     dataIndex: ["customerInfo", "name"],
//     key: "customerName",
//   },
//   {
//     title: "Phone",
//     dataIndex: ["customerInfo", "phone"],
//     key: "phone",
//   },
//   {
//     title: "Delivery Area",
//     dataIndex: "deliveryArea",
//     key: "deliveryArea",
//     render: (area: string) =>
//       <Tag color={area === "inside" ? "green" : "blue"}>{area}</Tag>,
//   },
//   {
//     title: "Total Amount",
//     dataIndex: ["pricing", "grandTotal"],
//     key: "grandTotal",
//     render: (value: number) => `${value}৳`,
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//     render: (status: string) => {
//       const colors: Record<string, string> = {
//         Pending: "orange",
//         Confirmed: "blue",
//         Delivered: "green",
//         Canceled: "red",
//       };
//       return <Tag color={colors[status] || "default"}>{status}</Tag>;
//     },
//     filters: [
//       { text: "Pending", value: "Pending" },
//       { text: "Confirmed", value: "Confirmed" },
//       { text: "Delivered", value: "Delivered" },
//       { text: "Canceled", value: "Canceled" },
//     ],
//     onFilter: (value, record) => record.status === value,
//   },
// ];




export const orderColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },

{
  title: "Parcel Id",
  dataIndex: "parcelId",
  key: "parcelId",
  render: (parcelId: string) =>
    parcelId ? (
      <Typography.Text copyable>{parcelId}</Typography.Text>
    ) : (
      <Tag color="red">No Parcel Id</Tag>
    ),
},
  {
    title: "Customer Name",
    dataIndex: ["customerInfo", "name"],
    key: "customerName",
  },
  {
    title: "Phone",
    dataIndex: ["customerInfo", "phone"],
    key: "phone",
  },
  {
    title: "Delivery Area",
    dataIndex: "deliveryArea",
    key: "deliveryArea",
    render: (area: string) => (
      <Tag color={area === "inside" ? "green" : "blue"}>{area}</Tag>
    ),
  },
{
  title: "Address",
  dataIndex: ["customerInfo", "address"],
  key: "address",
},

  {
    title: "Product Name",
    dataIndex: ["items"],
    key: "productName",
    render: (items: OrderItem[]) => items.map((item) => item.productName).join(", "),
  },
  {
    title: "Quantity",
    dataIndex: ["items"],
    key: "quantity",
    render: (items: OrderItem[]) =>
      items.map((item) => `${item.quantity}`).join(", "),
  },
  {
    title: "Price",
    dataIndex: ["items"],
    key: "price",
    render: (items: OrderItem[]) =>
      items.map((item) => `${item.price}৳`).join(", "),
  },
  {
    title: "Total Amount",
    dataIndex: ["pricing", "grandTotal"],
    key: "grandTotal",
    render: (value: number) => `${value}৳`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const colors: Record<string, string> = {
        pending: "orange",
        Confirmed: "blue",
        Delivered: "green",
        Canceled: "red",
      };
      return <Tag color={colors[status] || "default"}>{status}</Tag>;
    },
    filters: [
      { text: "Pending", value: "pending" },
      { text: "Confirmed", value: "Confirmed" },
      { text: "Delivered", value: "Delivered" },
      { text: "Canceled", value: "Canceled" },
    ],
    onFilter: (value, record) => record.status === value,
  },
];
