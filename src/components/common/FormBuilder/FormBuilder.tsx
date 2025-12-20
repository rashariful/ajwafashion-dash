// "use client";
// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   Select,
//   Switch,
//   Upload,
//   Button,
//   Space,
//   DatePicker,
//   InputNumber,
//   Rate,
//   Checkbox,
//   Radio,
//   message,
// } from "antd";
// import {
//   SaveOutlined,
//   CloseOutlined,
//   PlusOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import type { FormInstance } from "antd/es/form";
// import _ from "lodash";

// const { TextArea } = Input;
// const { Option } = Select;

// export interface FormField {
//   name: string;
//   label: string;
//   type:
//     | "text"
//     | "email"
//     | "password"
//     | "number"
//     | "textarea"
//     | "select"
//     | "switch"
//     | "upload"
//     | "date"
//     | "rate"
//     | "checkbox"
//     | "radio"
//     | "tags"
//     | "dynamicList";
//   options?: { label: string; value: any }[];
//   dynamicOptions?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   disabled?: boolean;
//   rules?: any[];
//   initialValue?: any;
//   span?: number;
//   multiple?: boolean;
//   fields?: FormField[];
// }

// interface FormBuilderProps {
//   fields: FormField[];
//   form: FormInstance;
//   loading?: boolean;
//   onSubmit: (values: any) => void;
//   onCancel?: () => void;
//   submitText?: string;
//   cancelText?: string;
//   layout?: "horizontal" | "vertical" | "inline";
// }

// const PRIMARY_COLOR = "#FE5F15";

// const FormBuilder: React.FC<FormBuilderProps> = ({
//   fields,
//   form,
//   loading = false,
//   onSubmit,
//   onCancel,
//   submitText = "Submit",
//   cancelText = "Cancel",
//   layout = "vertical",
// }) => {
//   const [fileStorage, setFileStorage] = useState<Record<string, any>>({});

//   // -------- FILE SELECT HANDLER WITH NESTED PATH --------
//   const handleFileSelect = (file: File, field: FormField, path: string) => {
//     if (!file.type.startsWith("image/")) {
//       message.error("Only image files allowed");
//       return Upload.LIST_IGNORE;
//     }

//     if (file.size / 1024 / 1024 > 2) {
//       message.error("Image must be less than 2MB");
//       return Upload.LIST_IGNORE;
//     }

//     setFileStorage((prev) => ({
//       ...prev,
//       [path]: field.multiple
//         ? [...(prev[path] || []), file]
//         : file,
//     }));

//     return false; // stop auto-upload
//   };

//   // -------- FIELD RENDERER --------
//   const renderField = (field: FormField, parentPath = "") => {
//     const fullPath = parentPath ? `${parentPath}.${field.name}` : field.name;
//     const commonProps = { placeholder: field.placeholder, disabled: field.disabled };

//     switch (field.type) {
//       case "text":
//       case "email":
//       case "password":
//         return <Input type={field.type} {...commonProps} />;

//       case "textarea":
//         return <TextArea rows={4} {...commonProps} />;

//       case "number":
//         return <InputNumber style={{ width: "100%" }} {...commonProps} />;

//       case "select":
//         return (
//           <Select
//             {...commonProps}
//             mode={field.multiple ? "multiple" : undefined}
//             allowClear
//           >
//             {field.options?.map((opt) => (
//               <Option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </Option>
//             ))}
//           </Select>
//         );

//       case "switch":
//         return <Switch />;

//       case "date":
//         return <DatePicker style={{ width: "100%" }} />;

//       case "rate":
//         return <Rate />;

//       case "checkbox":
//         return (
//           <Checkbox.Group>
//             {field.options?.map((opt) => (
//               <Checkbox key={opt.value} value={opt.value}>
//                 {opt.label}
//               </Checkbox>
//             ))}
//           </Checkbox.Group>
//         );

//       case "radio":
//         return (
//           <Radio.Group>
//             {field.options?.map((opt) => (
//               <Radio key={opt.value} value={opt.value}>
//                 {opt.label}
//               </Radio>
//             ))}
//           </Radio.Group>
//         );

//       // -------- UPLOAD FIELD WITH FULL NESTED SUPPORT --------
//       case "upload": {
//         const files = fileStorage[fullPath];
//         const filesArr = Array.isArray(files) ? files : files ? [files] : [];

//         return (
//           <Upload
//             multiple={field.multiple}
//             listType="picture-card"
//             showUploadList={false}
//             beforeUpload={(file) => handleFileSelect(file, field, fullPath)}
//             accept="image/*"
//           >
//             {filesArr.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {filesArr.map((file, i) => {
//                   const url = URL.createObjectURL(file);
//                   return (
//                     <img
//                       key={i}
//                       src={url}
//                       alt="preview"
//                       style={{
//                         width: 80,
//                         height: 80,
//                         borderRadius: 8,
//                         objectFit: "cover",
//                       }}
//                       onLoad={() => URL.revokeObjectURL(url)}
//                     />
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center">
//                 <UploadOutlined />
//                 <div style={{ marginTop: 8 }}>Upload</div>
//               </div>
//             )}
//           </Upload>
//         );
//       }

//       // -------- DYNAMIC LIST WITH NESTED UPLOAD SUPPORT --------
//       case "dynamicList":
//         return (
//           <Form.List name={field.name}>
//             {(list, { add, remove }) => (
//               <>
//                 {list.map((item) => (
//                   <div
//                     key={item.key}
//                     style={{
//                       border: "1px solid #ddd",
//                       borderRadius: 8,
//                       padding: 16,
//                       marginBottom: 16,
//                     }}
//                   >
//                     {field.fields?.map((sub) => (
//                       <Form.Item
//                         key={sub.name}
//                         label={sub.label}
//                         name={[item.name, sub.name]}
//                         rules={
//                           sub.required
//                             ? [{ required: true, message: `${sub.label} is required` }]
//                             : []
//                         }
//                       >
//                         {renderField(sub, `${field.name}.${item.name}`)}
//                       </Form.Item>
//                     ))}

//                     <Button
//                       danger
//                       type="dashed"
//                       onClick={() => remove(item.name)}
//                       icon={<CloseOutlined />}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}

//                 <Button
//                   type="dashed"
//                   onClick={() => add()}
//                   block
//                   icon={<PlusOutlined />}
//                   style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
//                 >
//                   Add {field.label}
//                 </Button>
//               </>
//             )}
//           </Form.List>
//         );

//       default:
//         return <Input {...commonProps} />;
//     }
//   };

//   // -------- FINAL SUBMIT HANDLER --------
//   const handleSubmit = (values: any) => {
//     const finalValues = { ...values };

//     Object.keys(fileStorage).forEach((path) => {
//       _.set(finalValues, path, fileStorage[path]);
//     });

//     onSubmit(finalValues);
//   };

//   return (
//     <Form
//       form={form}
//       layout={layout}
//       onFinish={handleSubmit}
//       autoComplete="off"
//       size="large"
//     >
//       <div className="grid grid-cols-24 gap-4">
//         {fields.map((field) => (
//           <div key={field.name} style={{ gridColumn: `span ${field.span || 24}` }}>
//             <Form.Item
//               label={field.label}
//               name={field.name}
//               rules={
//                 field.rules ||
//                 (field.required ? [{ required: true, message: `${field.label} is required` }] : [])
//               }
//             >
//               {renderField(field)}
//             </Form.Item>
//           </div>
//         ))}
//       </div>

//       <Form.Item style={{ marginTop: 24 }}>
//         <Space>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             icon={<SaveOutlined />}
//             style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
//           >
//             {submitText}
//           </Button>

//           {onCancel && (
//             <Button
//               onClick={onCancel}
//               icon={<CloseOutlined />}
//               style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
//             >
//               {cancelText}
//             </Button>
//           )}
//         </Space>
//       </Form.Item>
//     </Form>
//   );
// };

// export default FormBuilder;




// "use client";
// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   Select,
//   Switch,
//   Upload,
//   Button,
//   Space,
//   DatePicker,
//   InputNumber,
//   Rate,
//   Checkbox,
//   Radio,
//   message,
// } from "antd";
// import {
//   SaveOutlined,
//   CloseOutlined,
//   PlusOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import type { FormInstance } from "antd/es/form";

// const { TextArea } = Input;
// const { Option } = Select;

// export interface FormField {
//   name: string;
//   label: string;
//   type:
//     | "text"
//     | "email"
//     | "password"
//     | "number"
//     | "textarea"
//     | "select"
//     | "switch"
//     | "upload"
//     | "date"
//     | "rate"
//     | "checkbox"
//     | "radio"
//     | "tags"
//     | "dynamicList";
//   options?: { label: string; value: any }[];
//   dynamicOptions?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   disabled?: boolean;
//   rules?: any[];
//   initialValue?: any;
//   span?: number;
//   multiple?: boolean;
//   fields?: FormField[];
// }

// interface FormBuilderProps {
//   fields: FormField[];
//   form: FormInstance;
//   loading?: boolean;
//   onSubmit: (values: any) => void;
//   onCancel?: () => void;
//   submitText?: string;
//   cancelText?: string;
//   layout?: "horizontal" | "vertical" | "inline";
// }

// const PRIMARY_COLOR = "#FE5F15";

// const FormBuilder: React.FC<FormBuilderProps> = ({
//   fields,
//   form,
//   loading = false,
//   onSubmit,
//   onCancel,
//   submitText = "Submit",
//   cancelText = "Cancel",
//   layout = "vertical",
// }) => {
//   const [fileStorage, setFileStorage] = useState<
//     Record<string, File | File[]>
//   >({});

//   // ----- File upload handler -----
//   const handleFileSelect = (file: File, field: FormField) => {
//     if (!file.type.startsWith("image/")) {
//       message.error("You can only upload image files!");
//       return Upload.LIST_IGNORE;
//     }
//     if (file.size / 1024 / 1024 > 2) {
//       message.error("Image must be smaller than 2MB!");
//       return Upload.LIST_IGNORE;
//     }

//     setFileStorage((prev) => {
//       if (field.multiple) {
//         const existing = prev[field.name];
//         const filesArray = Array.isArray(existing)
//           ? existing
//           : existing
//           ? [existing]
//           : [];
//         return { ...prev, [field.name]: [...filesArray, file] };
//       } else {
//         return { ...prev, [field.name]: file };
//       }
//     });
//     return false; // prevent auto upload
//   };

//   // ----- Field renderer -----
//   const renderField = (field: FormField) => {
//     const commonProps = {
//       placeholder: field.placeholder,
//       disabled: field.disabled,
//     };

//     switch (field.type) {
//       case "text":
//       case "email":
//       case "password":
//         return <Input type={field.type} {...commonProps} />;

//       case "textarea":
//         return <TextArea rows={4} {...commonProps} />;

//       case "number":
//         return <InputNumber style={{ width: "100%" }} {...commonProps} />;

//       case "select":
//         const options = field.options || [];
//         return (
//           <Select
//             {...commonProps}
//             mode={field.multiple ? "multiple" : undefined}
//             allowClear
//           >
//             {options.map((opt) => (
//               <Option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </Option>
//             ))}
//           </Select>
//         );

//       case "switch":
//         return <Switch />;

//       case "date":
//         return <DatePicker style={{ width: "100%" }} />;

//       case "rate":
//         return <Rate />;

//       case "checkbox":
//         return (
//           <Checkbox.Group>
//             {field.options?.map((opt) => (
//               <Checkbox key={opt.value} value={opt.value}>
//                 {opt.label}
//               </Checkbox>
//             ))}
//           </Checkbox.Group>
//         );

//       case "radio":
//         return (
//           <Radio.Group>
//             {field.options?.map((opt) => (
//               <Radio key={opt.value} value={opt.value}>
//                 {opt.label}
//               </Radio>
//             ))}
//           </Radio.Group>
//         );

//       case "upload": {
//         const rawFiles = fileStorage[field.name];
//         const files = Array.isArray(rawFiles)
//           ? rawFiles
//           : rawFiles
//           ? [rawFiles]
//           : [];

//         return (
//           <Upload
//             multiple={field.multiple}
//             listType="picture-card"
//             showUploadList={false}
//             beforeUpload={(file) => handleFileSelect(file, field)}
//             accept="image/*"
//           >
//             {files.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {files.map((file, i) => {
//                   const imageUrl = URL.createObjectURL(file);
//                   return (
//                     <img
//                       key={i}
//                       src={imageUrl}
//                       alt="preview"
//                       style={{
//                         width: 80,
//                         height: 80,
//                         borderRadius: 8,
//                         objectFit: "cover",
//                       }}
//                       onLoad={() => URL.revokeObjectURL(imageUrl)}
//                     />
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center">
//                 <UploadOutlined />
//                 <div style={{ marginTop: 8 }}>Upload</div>
//               </div>
//             )}
//           </Upload>
//         );
//       }

//       case "dynamicList":
//         if (!field.fields) return null;
//         return (
//           <Form.List name={field.name}>
//             {(list, { add, remove }) => (
//               <>
//                 {list.map((f) => (
//                   <div
//                     key={f.key}
//                     style={{
//                       border: "1px solid #ddd",
//                       borderRadius: 8,
//                       padding: 16,
//                       marginBottom: 16,
//                     }}
//                   >
//                     {field.fields!.map((sub) => (
//                       <Form.Item
//                         key={sub.name}
//                         label={sub.label}
//                         name={[f.name, sub.name]}
//                         rules={
//                           sub.required
//                             ? [
//                                 {
//                                   required: true,
//                                   message: `${sub.label} is required`,
//                                 },
//                               ]
//                             : []
//                         }
//                       >
//                         {renderField(sub)}
//                       </Form.Item>
//                     ))}
//                     <Button
//                       danger
//                       type="dashed"
//                       onClick={() => remove(f.name)}
//                       icon={<CloseOutlined />}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="dashed"
//                   onClick={() => add()}
//                   icon={<PlusOutlined />}
//                   block
//                   style={{
//                     borderColor: PRIMARY_COLOR,
//                     color: PRIMARY_COLOR,
//                   }}
//                 >
//                   Add {field.label}
//                 </Button>
//               </>
//             )}
//           </Form.List>
//         );

//       default:
//         return <Input {...commonProps} />;
//     }
//   };

//   // ----- Submit handler -----
//   const handleSubmit = (values: any) => {
//     const finalValues = { ...values };
//     fields
//       .filter((f) => f.type === "upload")
//       .forEach((f) => {
//         if (fileStorage[f.name]) {
//           finalValues[f.name] = fileStorage[f.name];
//         }
//       });
//     onSubmit(finalValues);
//   };

//   return (
//     <Form
//       form={form}
//       layout={layout}
//       onFinish={handleSubmit}
//       autoComplete="off"
//       size="large"
//     >
//       <div className="grid grid-cols-24 gap-4">
//         {fields.map((field) => (
//           <div
//             key={field.name}
//             style={{
//               gridColumn: `span ${field.span || 24}`,
//             }}
//           >
//             <Form.Item
//               label={field.label}
//               name={field.name}
//               rules={
//                 field.rules ||
//                 (field.required
//                   ? [{ required: true, message: `${field.label} is required` }]
//                   : [])
//               }
//               initialValue={field.initialValue}
//               valuePropName={field.type === "switch" ? "checked" : "value"}
//             >
//               {renderField(field)}
//             </Form.Item>
//           </div>
//         ))}
//       </div>

//       <Form.Item style={{ marginTop: 24 }}>
//         <Space>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             icon={<SaveOutlined />}
//             style={{
//               backgroundColor: PRIMARY_COLOR,
//               borderColor: PRIMARY_COLOR,
//             }}
//           >
//             {submitText}
//           </Button>
//           {onCancel && (
//             <Button
//               onClick={onCancel}
//               icon={<CloseOutlined />}
//               style={{
//                 borderColor: PRIMARY_COLOR,
//                 color: PRIMARY_COLOR,
//               }}
//             >
//               {cancelText}
//             </Button>
//           )}
//         </Space>
//       </Form.Item>
//     </Form>
//   );
// };

// export default FormBuilder;







// components/common/FormBuilder/FormBuilder.tsx
"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  Upload,
  Button,
  Space,
  DatePicker,
  InputNumber,
  Rate,
  Checkbox,
  Radio,
  message,
} from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";

const { TextArea } = Input;
const { Option } = Select;

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "switch"
    | "upload"
    | "date"
    | "rate"
    | "checkbox"
    | "radio"
    | "tags"
    | "dynamicList";
  options?: { label: string; value: any }[];
  dynamicOptions?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  rules?: any[];
  initialValue?: any;
  span?: number;
  multiple?: boolean;
  fields?: FormField[];
}

interface FormBuilderProps {
  fields: FormField[];
  form: FormInstance;
  loading?: boolean;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  layout?: "horizontal" | "vertical" | "inline";
}

const PRIMARY_COLOR = "#FE5F15";

const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  form,
  loading = false,
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  layout = "vertical",
}) => {
  const [fileStorage, setFileStorage] = useState<Record<string, any>>({});

  // Utility: Save file into storage
  const storeFile = (key: string, file: File, multiple?: boolean) => {
    setFileStorage((prev) => {
      if (multiple) {
        return { ...prev, [key]: [...(prev[key] || []), file] };
      }
      return { ...prev, [key]: file };
    });
  };

  // Upload Handler
  const handleFileSelect = (file: File, field: FormField, key: string) => {
    if (!file.type.startsWith("image/")) {
      message.error("Only images allowed!");
      return Upload.LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    storeFile(key, file, field.multiple);
    return false;
  };

  // Render Field
  const renderField = (field: FormField, parentName?: string, index?: number) => {
    const fieldKey = parentName ? `${parentName}.${index}.${field.name}` : field.name;

    const commonProps = {
      placeholder: field.placeholder,
      disabled: field.disabled,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "password":
        return <Input type={field.type} {...commonProps} />;

      case "textarea":
        return <TextArea rows={4} {...commonProps} />;

      case "number":
        return <InputNumber style={{ width: "100%" }} {...commonProps} />;

      case "select":
        return (
          <Select
            {...commonProps}
            mode={field.multiple ? "multiple" : undefined}
            allowClear
          >
            {(field.options || []).map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );

      case "switch":
        return <Switch />;

      case "date":
        return <DatePicker style={{ width: "100%" }} />;

      case "rate":
        return <Rate />;

      case "checkbox":
        return (
          <Checkbox.Group>
            {field.options?.map((opt) => (
              <Checkbox key={opt.value} value={opt.value}>
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case "radio":
        return (
          <Radio.Group>
            {field.options?.map((opt) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );

      case "upload": {
        const stored = fileStorage[fieldKey];
        const files = Array.isArray(stored) ? stored : stored ? [stored] : [];

        return (
          <Upload
            multiple={field.multiple}
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) =>
              handleFileSelect(file, field, fieldKey)
            }
            accept="image/*"
          >
            {files.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {files.map((file, i) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <img
                      key={i}
                      src={url}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                      onLoad={() => URL.revokeObjectURL(url)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center">
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        );
      }

      case "dynamicList":
        if (!field.fields) return null;

        return (
          <Form.List name={field.name}>
            {(list, { add, remove }) => (
              <>
                {list.map((f, idx) => (
                  <div
                    key={f.key}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 8,
                      padding: 16,
                      marginBottom: 16,
                    }}
                  >
                    {field.fields!.map((sub) => (
                      <Form.Item
                        key={sub.name}
                        label={sub.label}
                        name={[f.name, sub.name]}
                        rules={
                          sub.required
                            ? [
                                {
                                  required: true,
                                  message: `${sub.label} is required`,
                                },
                              ]
                            : []
                        }
                      >
                        {renderField(sub, field.name, idx)}
                      </Form.Item>
                    ))}

                    <Button
                      danger
                      type="dashed"
                      onClick={() => remove(f.name)}
                      icon={<CloseOutlined />}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: PRIMARY_COLOR,
                    color: PRIMARY_COLOR,
                  }}
                >
                  Add {field.label}
                </Button>
              </>
            )}
          </Form.List>
        );

      default:
        return <Input {...commonProps} />;
    }
  };

  // Final submit handler
  const handleSubmit = (values: any) => {
    const finalValues = { ...values, ...fileStorage };
    onSubmit(finalValues);
  };

  return (
    <Form
      form={form}
      layout={layout}
      onFinish={handleSubmit}
      autoComplete="off"
      size="large"
    >
      <div className="grid grid-cols-24 gap-4">
        {fields.map((field) => (
          <div
            key={field.name}
            style={{
              gridColumn: `span ${field.span || 24}`,
            }}
          >
            <Form.Item
              label={field.label}
              name={field.name}
              rules={
                field.rules ||
                (field.required
                  ? [{ required: true, message: `${field.label} is required` }]
                  : [])
              }
              initialValue={field.initialValue}
              valuePropName={field.type === "switch" ? "checked" : "value"}
            >
              {renderField(field)}
            </Form.Item>
          </div>
        ))}
      </div>

      <Form.Item style={{ marginTop: 24 }}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            style={{
              backgroundColor: PRIMARY_COLOR,
              borderColor: PRIMARY_COLOR,
            }}
          >
            {submitText}
          </Button>

          {onCancel && (
            <Button
              onClick={onCancel}
              icon={<CloseOutlined />}
              style={{
                borderColor: PRIMARY_COLOR,
                color: PRIMARY_COLOR,
              }}
            >
              {cancelText}
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormBuilder;

