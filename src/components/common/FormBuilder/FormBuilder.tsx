"use client";
import React, { useState, useEffect } from "react";
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
  SyncOutlined,
} from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import _ from "lodash";

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
  initialValues?: Record<string, any>;
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
  initialValues,
}) => {
  const [newFiles, setNewFiles] = useState<Record<string, File[]>>({});
  const [existingUrls, setExistingUrls] = useState<Record<string, string[]>>({});
  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});

  // Load existing image URLs from initialValues
  useEffect(() => {
    if (!initialValues) return;

    const urlsMap: Record<string, string[]> = {};

    const collectUrls = (fieldsList: FormField[], parent = "") => {
      fieldsList.forEach((f) => {
        const path = parent ? `${parent}.${f.name}` : f.name;

        if (f.type === "upload") {
          const val = _.get(initialValues, path);
          if (val) {
            if (Array.isArray(val) && val.every((v) => typeof v === "string")) {
              urlsMap[path] = [...val];
            } else if (typeof val === "string") {
              urlsMap[path] = [val];
            }
          }
        }

        if (f.type === "dynamicList" && f.fields) {
          collectUrls(f.fields, path);
        }
      });
    };

    collectUrls(fields);
    setExistingUrls(urlsMap);
  }, [initialValues, fields]);

  // Set all form initial values (including dynamic lists)
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFileSelect = (file: File, field: FormField, path: string) => {
    if (!file.type.startsWith("image/")) {
      message.error("Only image files are allowed");
      return Upload.LIST_IGNORE;
    }

    if (file.size / 1024 / 1024 > 2) {
      message.error("Image must be less than 2MB");
      return Upload.LIST_IGNORE;
    }

    setNewFiles((prev) => ({
      ...prev,
      [path]: field.multiple ? [...(prev[path] || []), file] : [file],
    }));

    return false;
  };

  const removeNewFile = (path: string, index: number) => {
    setNewFiles((prev) => {
      const updated = (prev[path] || []).filter((_, i) => i !== index);
      return { ...prev, [path]: updated.length ? updated : undefined };
    });
  };

  const removeExistingUrl = (path: string, index: number) => {
    setExistingUrls((prev) => {
      const updated = (prev[path] || []).filter((_, i) => i !== index);
      return { ...prev, [path]: updated.length ? updated : undefined };
    });
  };

  const renderField = (field: FormField, parentPath = "") => {
    const fullPath = parentPath ? `${parentPath}.${field.name}` : field.name;
    const commonProps = { placeholder: field.placeholder, disabled: field.disabled };

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
          <Select {...commonProps} mode={field.multiple ? "multiple" : undefined} allowClear>
            {field.options?.map((opt) => (
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
        const existing = existingUrls[fullPath] || [];
        const newOnes = newFiles[fullPath] || [];
        const isUploading = uploadingFields[fullPath] || false;

        return (
          <div className="flex flex-wrap gap-4">
            {/* Existing Images */}
            {existing.map((url, index) => (
              <div key={`exist-${index}`} className="w-32">
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300 shadow-sm mb-2">
                  <img src={url} alt="existing" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => removeExistingUrl(fullPath, index)}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                >
                  <CloseOutlined />
                  Remove
                </button>
              </div>
            ))}

            {/* Newly Uploaded */}
            {newOnes.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <div key={`new-${index}`} className="w-32">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300 shadow-sm mb-2">
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onLoad={() => URL.revokeObjectURL(previewUrl)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNewFile(fullPath, index)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                  >
                    <CloseOutlined />
                    Remove
                  </button>
                </div>
              );
            })}

            {/* Upload Button */}
            {(field.multiple || existing.length + newOnes.length === 0) && (
              <Upload
                multiple={field.multiple}
                showUploadList={false}
                beforeUpload={(file) => {
                  setUploadingFields((prev) => ({ ...prev, [fullPath]: true }));
                  const result = handleFileSelect(file, field, fullPath);
                  setTimeout(() => {
                    setUploadingFields((prev) => ({ ...prev, [fullPath]: false }));
                  }, 1000);
                  return result;
                }}
                accept="image/*"
              >
                <div
                  className={`
                    w-32 h-32 rounded-lg border-2 border-dashed border-gray-400 
                    flex flex-col items-center justify-center cursor-pointer
                    hover:border-[${PRIMARY_COLOR}] hover:bg-orange-50 transition-colors
                    ${isUploading ? "opacity-50 pointer-events-none" : ""}
                  `}
                >
                  {isUploading ? (
                    <div className="text-center">
                      <SyncOutlined spin className="text-3xl mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <UploadOutlined className="text-4xl mb-2 text-gray-400" />
                      <p className="text-xs text-gray-500 text-center">
                        Upload Image
                        <br />
                        <span className="opacity-70">(max 2MB)</span>
                      </p>
                    </>
                  )}
                </div>
              </Upload>
            )}
          </div>
        );
      }

      case "dynamicList":
        return (
          <Form.List name={field.name}>
            {(fieldsList, { add, remove }) => (
              <>
                {fieldsList.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 relative"
                  >
                    {field.fields?.map((subField) => (
                      <Form.Item
                        key={subField.name}
                        label={subField.label}
                        name={[name, subField.name]}
                        rules={
                          subField.required
                            ? [{ required: true, message: `${subField.label} is required` }]
                            : []
                        }
                      >
                        {renderField(subField, `${field.name}.${name}`)}
                      </Form.Item>
                    ))}

                    <Button
                      danger
                      type="dashed"
                      onClick={() => remove(name)}
                      icon={<CloseOutlined />}
                
                    >
                      Remove Item
                    </Button>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
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

  const handleSubmit = (formValues: any) => {
    const finalValues = { ...formValues };

    // Add newly uploaded files
    Object.entries(newFiles).forEach(([path, files]) => {
      _.set(finalValues, path, files);
    });

    // Optionally keep remaining existing URLs
    Object.entries(existingUrls).forEach(([path, urls]) => {
      if (urls.length > 0 && !_.get(finalValues, path)) {
        _.set(finalValues, path, urls);
      }
    });

    onSubmit(finalValues);
  };

  return (
    <Form
      form={form}
      layout={layout}
      onFinish={handleSubmit}
      autoComplete="off"
      size="large"
      initialValues={initialValues}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-24 gap-6">
        {fields.map((field) => (
          <div
            key={field.name}
            className="w-full"
            style={{ gridColumn: `span ${field.span || 24}` }}
          >
            <Form.Item
              label={field.label}
              name={field.name}
              rules={
                field.rules ||
                (field.required ? [{ required: true, message: `${field.label} is required` }] : [])
              }
            >
              {renderField(field)}
            </Form.Item>
          </div>
        ))}
      </div>

      <Form.Item className="mt-10">
        <Space size="large">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            size="large"
            style={{ background: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
          >
            {submitText}
          </Button>

          {onCancel && (
            <Button
              size="large"
              onClick={onCancel}
              icon={<CloseOutlined />}
              style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
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