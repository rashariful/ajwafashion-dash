// utils/formSchemas.ts
import { FormField } from "../components/common/FormBuilder/FormBuilder";

// utils/formSchemas.ts
export const bannerFormFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter banner title",
    span: 12,
    required: true,
  },
  {
    name: "subTitle",
    label: "Sub Title",
    type: "text",
    placeholder: "Enter banner sub title",
    span: 12,
    required: false, // matches schema
  },
  {
    name: "details",
    label: "Details",
    type: "textarea",
    placeholder: "Enter banner details",
    span: 24,
    required: false,
  },
  {
    name: "offerText",
    label: "Offer Text",
    type: "text",
    placeholder: "Enter offer text",
    span: 12,
    required: false,
  },
  {
    name: "keyword",
    label: "Keyword",
    type: "text",
    placeholder: "Enter keyword",
    span: 12,
    required: false,
  },
  {
    name: "buttonText",
    label: "Button Text",
    type: "text",
    placeholder: "Enter button text",
    span: 12,
    required: false,
    initialValue: "Shop Now", // matches schema default
  },
  {
    name: "isActive",
    label: "Active Status",
    type: "switch",
    span: 12,
    initialValue: true, // matches schema default
  },
];


export const productFormFields: FormField[] = [
  {
    name: "title",
    label: "Product Title",
    type: "text",
    placeholder: "Enter product title",
    required: true,
    span: 24,
  },

  {
    name: "details",
    label: "Product Details",
    type: "textarea",
    placeholder: "Enter product details",
    required: true,
    span: 24,
  },

  {
    name: "regulerPrice",
    label: "Regular Price",
    type: "number",
    placeholder: "Enter regular price",
    required: true,
    span: 12,
  },

  {
    name: "sellingPrice",
    label: "Selling Price",
    type: "number",
    placeholder: "Enter selling price",
    required: true,
    span: 12,
  },


  // ✅ VARIANTS (single key-value object)
  {
    name: "variants.key",
    label: "Variant Name",
    type: "text",
    placeholder: "Variant Name: Size/Color",
    required: true,
    span: 12,
  },
  {
    name: "variants.value",
    label: "Variant Value",
    type: "text",
    placeholder: "Color: Black, Red, Size: S, L ,XL",
    required: true,
    span: 12,
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    span: 24,
    required: true,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
 
];

// Order Form Fields (Dynamic configuration based on OrderSchema)
export const orderFormFields = [
  // 🧍 Customer Info
  {
    name: ["customerInfo", "name"],
    label: "Customer Name",
    type: "text",
    placeholder: "Enter customer name",
    span: 12,
    required: true,
  },
  {
    name: ["customerInfo", "phone"],
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    span: 12,
    required: true,
  },
  {
    name: ["customerInfo", "address"],
    label: "Address",
    type: "textarea",
    placeholder: "Enter delivery address",
    span: 24,
    required: true,
  },
  {
    name: ["customerInfo", "notes"],
    label: "Additional Notes",
    type: "textarea",
    placeholder: "Optional notes about this order",
    span: 24,
  },

  // 🚚 Delivery Area
  {
    name: "deliveryArea",
    label: "Delivery Area",
    type: "select",
    options: [
      { label: "Inside", value: "inside" },
      { label: "Outside", value: "outside" },
    ],
    span: 12,
    required: true,
  },

  // 📦 Items (Dynamic Subform)
  {
    name: "items",
    label: "Order Items",
    type: "dynamicList", // ✅ Updated from "array"
    fields: [
      {
        name: "productId",
        label: "Product ID",
        type: "text",
        placeholder: "Enter product ID or code",
        span: 8,
        required: true,
      },
      {
        name: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "Enter product name",
        span: 8,
        required: true,
      },
      // {
      //   name: "size",
      //   label: "Size",
      //   type: "select",
      //   options: [
      //     { label: "52", value: "52" },
      //     { label: "54", value: "54" },
      //     { label: "56", value: "56" },
      //     { label: "58", value: "58" },
      //     { label: "60", value: "60" },
      //   ],
      //   span: 8,
      //   required: true,
      // },
      {
        name: "quantity",
        label: "Quantity",
        type: "number",
        placeholder: "Enter quantity",
        span: 6,
        required: true,
      },
      {
        name: "price",
        label: "Price (per item)",
        type: "number",
        placeholder: "Enter price",
        span: 6,
        required: true,
      },
      // {
      //   name: "withHijab",
      //   label: "Include Hijab?",
      //   type: "switch",
      //   span: 6,
      // },
      // {
      //   name: "itemTotal",
      //   label: "Total",
      //   type: "number",
      //   placeholder: "Auto calculated",
      //   span: 6,
      //   disabled: true,
      // },
    ],
  },

  // 💰 Pricing Summary
  {
    name: ["pricing", "productTotal"],
    label: "Product Total",
    type: "number",
    placeholder: "Auto-calculated total",
    span: 8,
    required: true,
  },
  {
    name: ["pricing", "deliveryCharge"],
    label: "Delivery Charge",
    type: "number",
    placeholder: "Enter delivery charge",
    span: 8,
    required: true,
  },
  {
    name: ["pricing", "grandTotal"],
    label: "Grand Total",
    type: "number",
    placeholder: "Auto-calculated grand total",
    span: 8,
    required: true,
  },

  // 📦 Order Status
  {
    name: "status",
    label: "Order Status",
    type: "select",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Confirmed", value: "Confirmed" },
      { label: "Delivered", value: "delivered" },
      { label: "Canceled", value: "Canceled" },
    ],
    span: 12,
    required: true,
  },
];


export const teamFormFields: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter team member name",
    span: 12,
  },
  {
    name: "designation",
    label: "Position",
    type: "text",
    required: true,
    placeholder: "Enter position",
    span: 12,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter email address",
    span: 12,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    span: 12,
  },
  {
    name: "thumbnail",
    label: "Profile Image",
    type: "upload",
    required: false,
    span: 24,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
];
export const partnerFormFields: FormField[] = [
  {
    name: "title",
    label: "title",
    type: "text",
    placeholder: "Enter title",
    span: 12,
  },
  {
    name: "thumbnail",
    label: "Company logo",
    type: "upload",
    required: false,
    span: 24,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
];

export const serviceFormFields: FormField[] = [
  {
    name: "title",
    label: "Service Title",
    type: "text",
    placeholder: "Enter service title",
    span: 12,
    required: true,
  },
  {
    name: "shortDescription",
    label: "Short Description",
    type: "textarea",
    placeholder: "Enter short description",
    span: 24,
  },
  {
    name: "longDescription",
    label: "Long Description",
    type: "textarea",
    placeholder: "Enter long description",
    span: 24,
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    span: 12,
    multiple: false,
  },
  {
    name: "videoUrl",
    label: "Video URL",
    type: "text",
    placeholder: "Enter video URL",
    span: 12,
  },
  {
    name: "parentService",
    label: "Parent Service",
    type: "select",
    options: [], // will be populated dynamically in component
    span: 12,
    dynamicOptions: true, // flag to indicate options come from API
  },
  {
    name: "subServices",
    label: "Sub Services",
    type: "select",
    options: [], // will be populated dynamically in component
    span: 12,
    multiple: true,
    dynamicOptions: true, // flag to indicate options come from API
  },
  // Uncomment if you want FAQs
  // {
  //   name: "faqs",
  //   label: "FAQs",
  //   type: "dynamicList",
  //   span: 24,
  //   fields: [
  //     {
  //       name: "question",
  //       label: "Question",
  //       type: "text",
  //       placeholder: "Enter question",
  //       required: true,
  //     },
  //     {
  //       name: "answer",
  //       label: "Answer",
  //       type: "textarea",
  //       placeholder: "Enter answer",
  //       required: true,
  //     },
  //   ],
  // },
];




// export const serviceFormFields: FormField[] = [
//   {
//     name: "title",
//     label: "Title",
//     type: "text",
//     placeholder: "Enter service title",
//     span: 12,
//     required: true,
//   },
//   {
//     name: "subTitle",
//     label: "Sub Title",
//     type: "text",
//     placeholder: "Enter service subtitle",
//     span: 12,
//     required: true,
//   },
//   {
//     name: "description",
//     label: "Description",
//     type: "textarea",
//     placeholder: "Enter service description",
//     span: 24,
//     required: true,
//   },
//   {
//     name: "thumbnail",
//     label: "Thumbnail",
//     type: "upload",
//     span: 24,
//     required: true,
//     rules: [
//       {
//         validator: (_, value) => {
//           if (value && value.size > 2 * 1024 * 1024) {
//             return Promise.reject(
//               new Error("Image size must be less than 2MB!")
//             );
//           }
//           return Promise.resolve();
//         },
//       },
//     ],
//   },
// ];

export const testimonialFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter client name",
    span: 12,
    required: true,
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "Enter client designation (optional)",
    span: 12,
  },
  {
    name: "review",
    label: "Review",
    type: "textarea",
    placeholder: "Write testimonial review",
    span: 24,
  },
  {
    name: "videoUrl",
    label: "Video URL",
    type: "text",
    placeholder: "Enter video URL (optional)",
    span: 24,
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    required: false,
    span: 24,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
];

export const portfolioFormFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter portfolio title",
    span: 12,
    required: true,
  },
  {
    name: "subTitle",
    label: "Sub Title",
    type: "text",
    placeholder: "Enter portfolio subtitle",
    span: 12,
    required: true,
  },
  {
    name: "images",
    label: "Images",
    type: "upload",
    required: true,
    span: 24,
    multiple: true,
    rules: [
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          const files = Array.isArray(value) ? value : [value]; // ensure array
          const tooBig = files.some(
            (file: File) => file.size > 2 * 1024 * 1024
          );
          if (tooBig) {
            return Promise.reject(
              new Error("Each image must be less than 2MB!")
            );
          }

          return Promise.resolve();
        },
      },
    ],
  },
];

export const galleriesFormFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter gallery title",
    span: 12,
    required: true,
  },
  {
    name: "images",
    label: "Images",
    type: "upload",
    span: 24,
    required: true,
    multiple: true,
    rules: [
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          const files = Array.isArray(value) ? value : [value]; // ensure array
          const tooBig = files.some(
            (file: File) => file.size > 2 * 1024 * 1024
          );
          if (tooBig) {
            return Promise.reject(
              new Error("Each image must be less than 2MB!")
            );
          }

          return Promise.resolve();
        },
      },
    ],
  },
];

export const contactFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name",
    span: 12,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    span: 12,
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    span: 12,
  },
  {
    name: "subject",
    label: "Subject",
    type: "select",
    placeholder: "Select subject",
    span: 12,
    required: true,
    options: [
      { label: "Website Design", value: "website_design" },
      { label: "Digital Marketing", value: "digital_marketing" },
      { label: "App Development", value: "app_development" },
      { label: "UI/UX Design", value: "ui_ux_design" },
      { label: "SEO Optimization", value: "seo_optimization" },
      { label: "Custom Software", value: "custom_software" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter message",
    span: 24,
    required: true,
  },
];

export const quoteFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name",
    span: 12,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    span: 12,
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    span: 12,
  },
 {
  name: "service",
  label: "Service Type",
  type: "select",
  placeholder: "Select service type",
  span: 12,
  required: true,
  options: [
    { label: "Residential Design", value: "residential_design" },
    { label: "Commercial Design", value: "commercial_design" },
    { label: "Office Interior", value: "office_interior" },
    { label: "Kitchen Design", value: "kitchen_design" },
    { label: "Bedroom Design", value: "bedroom_design" },
    { label: "Living Room Design", value: "living_room_design" },
    { label: "Space Planning", value: "space_planning" },
    { label: "Renovation", value: "renovation" },
    { label: "3D Visualization", value: "3d_visualization" },
    { label: "Other", value: "other" },
  ],
},

  {
    name: "budget",
    label: "Estimated Budget",
    type: "text",
    placeholder: "Enter budget amount or range",
    span: 12,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter additional details or requirements",
    span: 24,
  },
];

export const faqFormFields: FormField[] = [
  {
    name: "question",
    label: "Question",
    type: "text",
    placeholder: "Enter question",
    span: 24,
    required: true,
  },
  {
    name: "answer",
    label: "Answer",
    type: "textarea",
    placeholder: "Enter answer",
    span: 24,
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    span: 12,
    options: [
      { label: "General", value: "General" },
      { label: "Service", value: "Service" },
      { label: "Pricing", value: "Pricing" },
      { label: "Support", value: "Support" },
      { label: "Policy", value: "Policy" },
    ],
  },
  {
    name: "order",
    label: "Order",
    type: "number",
    placeholder: "Enter display order (e.g. 1, 2, 3)",
    span: 12,
  },
  {
    name: "isActive",
    label: "Active Status",
    type: "switch",
    span: 12,
    required: false,
  },
];
