import React from "react";

interface FileUploaderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader = ({ onChange }: FileUploaderProps) => {
  return (
    <label className="cursor-pointer">
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onChange}
      />
      <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded">
        Upload Logo
      </div>
    </label>
  );
};

export default FileUploader;
