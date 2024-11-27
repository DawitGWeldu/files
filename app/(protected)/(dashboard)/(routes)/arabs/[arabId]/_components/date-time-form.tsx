"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar, CalendarIcon, Clock, Pencil, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, File } from "@prisma/client";
import { format } from "date-fns"

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateTimeFormProps {
    initialData: Attachment & { files: File[] };
    workerId: string
};



export const DateTimeForm = ({
    initialData,
    workerId
}: DateTimeFormProps) => {
    const [date, setDate] = useState<Date>()
    

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing((current) => !current);
        // form.setValue("dateTime", initialData?.files[0]?.dateTime || new Date("0000-00-00"))

    }
    const router = useRouter();

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         dateTime: initialData?.files[0]?.dateTime || new Date("0000-00-00")
    //     },
    // });


    const onSave = async () => {
        try {
            const val = { dateTime: date, attachmentId: initialData.id, workerId: workerId }

            await axios.patch(`/api/workers/${workerId}/files/${initialData.files[0]?.id}`, val);
            toggleEdit();
            toast.success(`${initialData.name} Updated`);
            router.refresh()

        } catch {

            toast.error("Something went wrong");
        }
    }
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (date) {
            const [hours, minutes] = e.target.value.split(':')
            const newDate = new Date(date)
            newDate.setHours(parseInt(hours), parseInt(minutes))
            setDate(newDate)
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
                {!isEditing ? (
                    <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${!date && "italic font-normal"}`}>
                            {date ? format(date, "PPP 'at' p") : "No date and time selected"}
                        </span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    // @ts-ignore
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Input
                                type="time"
                                value={date ? format(date, "HH:mm") : ""}
                                onChange={handleTimeChange}
                                className="flex-1"
                            />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button onClick={onSave} disabled={!date}>
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}