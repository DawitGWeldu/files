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
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LongTextFormProps {
    initialData: Attachment & { files: File[] };
    workerId: string
};



export const LongTextForm = ({
    initialData,
    workerId
}: LongTextFormProps) => {

    const formSchema = z.object({
        text: z.string().min(1, {
            message: `${initialData.name} is required`,
        }),
    });

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing((current) => !current);
        form.setValue("text", initialData?.files[0]?.text || "")

    }
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: initialData?.files[0]?.text || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
        const val = { ...values, attachmentId: initialData.id, workerId: workerId }

        await axios.patch(`/api/workers/${workerId}/files/${initialData.files[0]?.id}`, val);
        toggleEdit();
        toast.success(`${initialData.name} Updated`);
        router.refresh();

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
                {!isEditing && (
                    <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${!initialData.files[0]?.text && "italic font-normal"}`}>
                            {initialData.files[0]?.text || "No text"}
                        </span>
                    </div>
                )}

                {isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-2"
                        >
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                // value={initialData.files[0].text!}
                                                disabled={isSubmitting}
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                >
                                    {!initialData.files[0]?.text ? 'Save' : 'Update'}

                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    )
}