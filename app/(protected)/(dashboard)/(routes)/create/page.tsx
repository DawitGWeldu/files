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

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    })
})

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

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