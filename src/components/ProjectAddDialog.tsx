"use client"
import React from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { toast } from 'sonner';

const projectFormSchema = z.object({
    name: z.string().min(5, "Project name must contain at least 5 characters"),
    description: z.string().min(10, "Project description must contain at least 10 characters"),
    githubRepoLink: z.string().url("Invalid Repository link or your repo must be private").optional(),
    status: z.enum(["active", "completed", "archived"]).default("active"),
    startDate: z.string().optional(),
    targetCompletionDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
    members: z.array(z.object({
        userId: z.string(),
        role: z.enum(["admin", "reviewer", "member"]).default("member")
    })).optional(),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const ProjectAddDialog = () => {
    const utils = api.useUtils();
    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            name: "Untitled Project",
            description: "",
            githubRepoLink: "",
            status: "active",
            startDate: "",
            targetCompletionDate: "",
            tags: [],
            members: [],
        },
    })

    const createProjectMutation = api.project.createProject.useMutation({
        onSuccess: async () => {
            toast.success("Project added successfully");
            form.reset();
            await utils.project.getProjectsAssignedToUser.invalidate();
        },
        onError: () => {
            toast.error("Failed to add project");
        }
    });

    const handleSubmit = async (values: ProjectFormValues) => {
        console.log("Submitting:", values);
        await createProjectMutation.mutateAsync(values); // No need for async/await here
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Create a new Project</Button>
            </DialogTrigger>
            <DialogContent className="backdrop-blur-md">
                <DialogHeader>
                    <DialogTitle>Create a new Project</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new project.
                    </DialogDescription>
                    <DialogClose asChild />
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="githubRepoLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GitHub Repository Link</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="targetCompletionDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Target Completion Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button 
    type="submit" 
    className="mt-4" 
    disabled={createProjectMutation.isPending}
>
    {createProjectMutation.isPending ? "Creating..." : "Create Project"}
</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectAddDialog;
