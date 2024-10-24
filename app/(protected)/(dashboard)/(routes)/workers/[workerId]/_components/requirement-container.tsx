"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, File, Requirement } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { IconBadge } from "@/components/icon-badge";
import { LongTextForm } from "./long-text-form";
import { FileForm } from "./file-form";
import { StatusForm } from "./status-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


type ExtendedAttachment = Attachment & {
  files: File[];
};

type ExtendedRequirement = Requirement & {
  attachments: ExtendedAttachment[];
};

interface RequirementFormProps {
  initialData: ExtendedRequirement;
  workerId: string;
};



export const RequirementContainer = ({
  initialData,
  workerId
}: RequirementFormProps) => {
  // const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();


  return (
    <Accordion type="single" defaultValue={initialData.title} collapsible>
      <AccordionItem value={initialData.title}>
        <AccordionTrigger>
          {initialData.title}
        </AccordionTrigger>
        <AccordionContent>

          {initialData.attachments.map((attachment, index) => (
            <>
              {attachment.type == "text" && (
                <LongTextForm key={index} initialData={attachment} workerId={workerId} />
              )}
              {attachment.type == "file" && (
                <FileForm key={index} initialData={attachment} workerId={workerId} />
              )}
              {attachment.type == "status" && (
                <StatusForm key={index} initialData={attachment} workerId={workerId} />
              )}
            </>
          ))}
        </AccordionContent>

      </AccordionItem>

    </Accordion>
  )
}