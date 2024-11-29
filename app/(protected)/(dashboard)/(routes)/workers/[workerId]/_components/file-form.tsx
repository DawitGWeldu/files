"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, File } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FileFormProps {
  initialData: Attachment & { files: File[] };
  workerId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const FileForm = ({
  initialData,
  workerId
}: FileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.url) {
        var name = values.url?.split("/").pop()
      }
      const val = { ...values, name: name || '', attachmentId: initialData.id, workerId: workerId }
      await axios.patch(`/api/workers/${workerId}/files/${undefined}`, val);
      toast.success("File Uploaded");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/workers/${workerId}/files/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader className=" py-2">
        <CardTitle className="flex items-center justify-between text-base font-medium" >
          <span className="truncate">{initialData.name}</span>

          <Button onClick={toggleEdit} variant="ghost" size="icon" className="h-8 w-8">
            {isEditing ? (
              <X className="h-4 w-4" />
            ) : (
              <Pencil className="h-4 w-4" />
            )}
            <span className="sr-only">{isEditing ? "Cancel" : "Edit"}</span>
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 bg-gradient-to-br from-background to-secondary/20">
        {!isEditing && (
          <>
            {initialData.files.filter(file => file.url != '').length === 0 && (
              <p className="text-sm text-slate-500 italic">
                please, upload the required file
              </p>
            )}
            {initialData.files.filter(file => file.url != '').length > 0 && (
              <div className="space-y-2">
                {initialData.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center p-2 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                  >
                    <a href={file.url!} className="text-xs inline-block max-w-full overflow-hidden whitespace-nowrap">
                      {file.name!.substring(0, file.name!.length - 7)}...
                      {file.name!.substring(file.name!.length - 3)}
                    </a>
                    {deletingId === file.id && (
                      <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {deletingId !== file.id && (
                      <button
                        onClick={() => onDelete(file.id)}
                        className="ml-auto hover:opacity-75 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}


                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {isEditing && (
          <div>
            <FileUpload
              workerId={workerId}
              onChange={(url) => {
                if (url) {
                  onSubmit({ url: url });
                }
              }}
            />
          </div>
        )}
      </CardContent>


    </Card>
  )
}