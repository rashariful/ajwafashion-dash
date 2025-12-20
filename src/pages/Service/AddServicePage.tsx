"use client";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import React, { useState } from "react";

const AddServicePage = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    alert("Service Submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Add New Service</h2>

      <RichTextEditor
        value={description}
        onChange={setDescription}
        label="Service Description"
        placeholder="Write your detailed service information..."
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Submit
      </button>

      {/* Live Preview */}
      <div className="mt-6 p-4 border rounded bg-white prose">
        <h3 className="font-semibold mb-2">Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default AddServicePage;
