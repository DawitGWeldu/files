"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileIcon, Loader2 } from 'lucide-react';
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface FileUploadProps {
  onChange: (url?: string) => void;
  workerId: string;
}

export const FileUpload = ({
  onChange,
  workerId,
}: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<String | null>(null);
  const [preview, setPreview] = useState<{
    url: string;
    type: string;
    name: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading) return;
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  }, [isUploading]);

  const handleFileSelect = (file: File | undefined) => {
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.error("File size must be under 4MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreview({
      url,
      type: file.type,
      name: file.name
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData()

      setIsUploading(true);
      formData.append('file', selectedFile)
      const {data} = await axios.post(`/api/workers/${workerId}/upload`, formData); 
      onChange(data?.url);
      clearFile();
      setIsUploading(false);
  };

  const clearFile = () => {
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }
    setSelectedFile(null);
    setPreview(null);
    onChange(undefined);
  };

  return (
    <div 
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="w-full"
    >
      {!preview ? (
        <div className={`relative border-2 border-dashed border-gray-300 rounded-lg p-4 transition ${isUploading ? 'bg-gray-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}>
          <input
            type="file"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            accept="*/*"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-6 w-6 text-gray-400" />
            <p className="text-sm text-gray-500">Click or drag file to upload</p>
            <p className="text-xs text-gray-400">File size must be under 4mb</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative border rounded-lg overflow-hidden">
            <button 
              onClick={clearFile}
              className="absolute top-2 right-2 p-1 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition z-10"
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </button>
            
            {preview.type.startsWith('image/') ? (
              <div className="relative aspect-video w-full">
                <Image
                  src={preview.url}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="p-4 flex items-center gap-2 bg-gray-50">
                <FileIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 truncate">{preview.name}</span>
              </div>
            )}
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={isUploading} 
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};