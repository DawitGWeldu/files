"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Arab } from "@prisma/client";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { useAsyncEffect } from 'use-async-effect'
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    country: z.string(),
    arab: z.string().min(1, {
        message: "Employer selection is required",
    }),
})

const CreatePage = () => {
    const router = useRouter();
    const [arabs, setArabs] = useState<Arab[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            country: "Saudi Arabia",
            arab: "",
        }
    });

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             axios.get("/api/arabs").then((res) => {
    //                 console.log("ARABS: ", res.data)
    //                 setArabs(res.data)
    //             })
    //             // setArabs(arbs.data)
    //         } catch (error) {
    //             console.log("HIIIIIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIII: ", error)
    //         }
    //     })()
    // }, [])

    useAsyncEffect(async () => {
        try {
            const res = await axios.get("/api/arabs")
            console.log("ARABSARABS: ", res.data)

            setArabs(res.data)

        } catch (error) {
            console.log("HI: ", error)
        }
    }, []);

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/workers", values);
            router.push(`/workers/${response.data.id}`);
            router.refresh();
            toast.success("Worker created successfully");
        } catch {
            toast.error("Something went wrong.")
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Register a new worker</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Enter the worker&apos;s details below.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isSubmitting}
                                            placeholder="Enter the worker's name"
                                            aria-describedby="name-description"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <p id="name-description" className="sr-only">
                                        Enter the full name of the worker
                                    </p>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="arab"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Employer</FormLabel>
                                    <Select defaultValue={arabs[0]?.name} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Employer" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {arabs?.map((arab) => (
                                                <SelectItem key={arab.id} value={arab.id}>{arab.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex items-center justify-end gap-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/workers')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                {isSubmitting ? 'Creating...' : 'Create Worker'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;