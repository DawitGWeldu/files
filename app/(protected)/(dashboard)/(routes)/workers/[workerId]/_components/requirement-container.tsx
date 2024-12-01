"use client";

import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Loader2, X, Check, Hourglass, MessageSquare, Activity } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Action, Attachment, File, Note, Requirement, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { LongTextForm } from "./long-text-form";
import { FileForm } from "./file-form";
import { StatusForm } from "./status-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DashIcon } from "@radix-ui/react-icons";
import { DateTimeForm } from "./date-time-form";
import { ScrollArea } from "@/components/ui/scroll-area";

type ExtendedAction = Action & {
  user: User
};

type ExtendedAttachment = Attachment & {
  files: File[];
  actions: ExtendedAction[];
};

type ExtendedRequirement = Requirement & {
  attachments: ExtendedAttachment[];
  notes: Note[];
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
  const [note, setNote] = useState(initialData.notes[0]?.note)
  const [exNote, setexNote] = useState<Note>()
  const [totalAtt, setTotalAtt] = useState(initialData.attachments.length || 0)
  let completedAtt = initialData.attachments.filter(att => att.files?.length > 0).length

  const handleNoteSubmit = async () => {
    try {
      const val = { note: note, requirementId: initialData.id, workerId: workerId }

      await axios.patch(`/api/workers/${workerId}/notes/${exNote?.id}`, val);
      setIsAddingNote(false);
      toast.success(`Note updated`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-transparent border-none shadow-lg">
      <Accordion type="single" defaultValue={initialData.title} collapsible>
        <AccordionItem value={initialData.title}>
          <AccordionTrigger className="px-4">
            <span>{initialData.title}</span>
            {totalAtt - completedAtt == 0 && (
              <Badge variant="outline" className="bg-green-400 text-foreground ">
                <Check className="h-4 w-4 mr-1" />
                Completed
              </Badge>
            )}

            {totalAtt - completedAtt > 0 && (
              <Badge variant="outline" className="text-foreground ">
                {completedAtt } of {totalAtt}
              </Badge>
            )}

          </AccordionTrigger>
          <AccordionContent>
            <CardContent>
              {initialData.attachments.map((attachment, index) => (
                <Fragment key={attachment.id}>
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
        <AccordionItem value={`${initialData.title}_actions`}>
          <AccordionTrigger className="px-4 py-2 hover:bg-accent hover:text-accent-foreground">
            <div className="flex items-center">
              {/* <Activity className="h-4 w-4 mr-2" /> */}
              <span className="font-semibold">Actions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent >
            <CardContent>
              <ScrollArea className="h-[200px] w-full pr-4">
                <div className="space-y-4 relative pl-6">
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-border"></div>
                  {initialData.attachments.map((attachment) => (
                    <Fragment key={attachment.id}>
                      {attachment.actions.map((action) => (
                        <div key={action.id} className="relative">
                          <div className="absolute left-[-23px] top-1 w-4 h-4 rounded-full border-2 border-primary bg-background"></div>
                          <div className="flex justify-between items-baseline mb-1">
                            <p className="text-sm text-muted-foreground">
                              {new Date(action.createdAt).toLocaleString()}
                            </p>
                            <p className="text-sm font-medium">{action.user.name}</p>
                          </div>
                          <p className="text-sm">{`Updated ${attachment.name}`}</p>
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <CardFooter className="flex flex-col items-start pt-4 border-t">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex items-center mb-2 w-full">
            {/* <MessageSquare className="h-4 w-4 mr-2" /> */}
            <span className="font-semibold">Note</span>
          </div>
          {!isAddingNote && (
            // <Button variant="outline" size="sm" onClick={() => setIsAddingNote(true)} className="w-full">
            //   <PlusCircle className="h-4 w-4 mr-2" />
            //   Add Note
            // </Button>
            <Button variant="outline" size="sm" onClick={() => setIsAddingNote(true)} className="">
              <Pencil />

              {initialData.notes.length == 0 && <span> Add Note</span>}

            </Button>
          )}
        </div>

        {initialData.notes.length > 0 &&
          <div className="flex items-center mb-2 w-full">
            {/* <DashIcon className="h-4 w-4 mr-2" /> */}
            <span className="font-normal">{initialData.notes[0].note}</span>
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
              <Button size="sm" onClick={handleNoteSubmit}>
                {note ? 'Save' : "Add"}
              </Button>
            </div>
          </div>
        )}



      </CardFooter>
    </Card>
  )
}