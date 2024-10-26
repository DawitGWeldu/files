"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, File } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusFormProps {
  initialData: Attachment & { files: File[] };
  workerId: string
};



export const StatusForm = ({
  initialData,
  workerId
}: StatusFormProps) => {

  const formSchema = z.object({
    status: z.boolean().default(false)
  });

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    form.setValue("status", initialData?.files[0]?.status || false)

  }
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: initialData?.files[0]?.status || false
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const val = {...values, attachmentId: initialData.id, workerId: workerId}
      await axios.patch(`/api/workers/${workerId}/files/${initialData.files[0]?.id}`, val);
      toast.success(`${initialData.name} Updated`);
      router.refresh();
      toggleEdit();

    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader className="py-2">
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
        {
          !isEditing && (
            <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <span
              className={`text-sm font-medium ${
                initialData.files[0]?.status ? "text-green-600" : "text-yellow-600 italic"
              }`}
            >
              {initialData.files[0]?.status ? "Completed" : "Not completed"}
            </span>
          </div>
          )
        }
        {
          isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {field.value ? "Completed" : "Not Completed"}
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                  <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    className=""
                  >
                    {!initialData.files[0]?.status ? 'Save' : 'Update'}
                    
                  </Button>
                  
              </form>
            </Form>
          )
        }
      </CardContent>



    </Card >
  )
}