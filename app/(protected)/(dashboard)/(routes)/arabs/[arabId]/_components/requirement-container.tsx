"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Loader2, X, Check, Hourglass, MessageSquare } from "lucide-react";
import { Fragment, useState } from "react";
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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DashIcon } from "@radix-ui/react-icons";
import { DateTimeForm } from "./date-time-form";


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
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [note, setNote] = useState("")



  return (
    <Card className="w-full max-w-3xl mx-auto bg-transparent border-none shadow-lg">
      <Accordion type="single" defaultValue={initialData.title} collapsible>
        <AccordionItem value={initialData.title}>
          <AccordionTrigger>
            <span className="px-2">{initialData.title}</span>
            {/* {isComplete && ( */}
            <Badge variant="secondary" className="border-green-500 text-green-700 ">
              <Check className="h-4 w-4" />
              {/* <Hourglass className="h-4 w-4" /> */}
              {/* Complete */}
            </Badge>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent>
              {initialData.attachments.map((attachment, index) => (
                <Fragment key={index}>
                  {attachment.type == "text" && (
                    <LongTextForm key={attachment?.id} initialData={attachment} workerId={workerId} />
                  )}
                   {attachment.type == "date" && (
                    <DateTimeForm key={attachment?.id} initialData={attachment} workerId={workerId} />
                  )}
                  {attachment.type == "file" && (
                    <FileForm key={attachment?.id} initialData={attachment} workerId={workerId} />
                  )}
                  {attachment.type == "status" && (
                    <StatusForm key={attachment?.id} initialData={attachment} workerId={workerId} />
                  )}
                </Fragment>
              ))}
            </CardContent>
          </AccordionContent>

        </AccordionItem>

      </Accordion>
      <CardFooter className="flex flex-col items-start pt-4 border-t">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex items-center mb-2 w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="font-semibold">Notes</span>
          </div>
          {!isAddingNote &&  (
            // <Button variant="outline" size="sm" onClick={() => setIsAddingNote(true)} className="w-full">
            //   <PlusCircle className="h-4 w-4 mr-2" />
            //   Add Note
            // </Button>
            <Button variant="outline" size="sm" onClick={() => setIsAddingNote(true)} className="">
              <Pencil className="h-4 w-4 mr-2" />
              {note? "Edit Note" : "Add Note"}
            </Button>
          )}
        </div>

        {note &&
          <div className="flex items-center mb-2 w-full">
            <DashIcon className="h-4 w-4 mr-2" />
            <span className="font-normal">{note}</span>
          </div>
        }


        {isAddingNote && (
          <div className="w-full space-y-2">
            <Textarea
              placeholder="Add your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button size="sm" variant="outline" onClick={() => setIsAddingNote(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setIsAddingNote(false)}>
                {note? 'Save' : "Add"}
              </Button>
            </div>
          </div>
        )}



      </CardFooter>
    </Card>
  )
}