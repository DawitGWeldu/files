"use client";

import axios from "axios";
import { Download, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { DownloadModal } from "@/components/modals/download-modal";

interface ActionsProps {
  disabled: boolean;
  workerId: string;
  workerName: string;
  hasDeparted: boolean;
};

export const Actions = ({
  disabled,
  workerName,
  workerId,
  hasDeparted
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState(null);



  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/workers/${workerId}`);

      toast.success("Worker deleted");
      router.push(`/workers`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const onDownload = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`/api/workers/${workerId}/download`, {
        responseType: "blob", // Important to handle binary data
      });

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "").slice(0, 15); // Format the timestamp
      link.setAttribute("download", `${workerName}_${timestamp}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download has started");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      {/* <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button> */}
      <DownloadModal onConfirm={onDownload}>
        <Button size="sm" disabled={isLoading} variant={"default"}>
          {isLoading ?
            <div>
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            :
            <>
              <Download className="h-4 w-4" />
              Download
            </>
          }
        </Button>
      </DownloadModal>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} variant={"destructive"}>
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </ConfirmModal>
    </div>
  )
}