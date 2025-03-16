"use client"
import React from 'react'
import { api } from '@/trpc/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from './ui/skeleton'

const TaskList = () => {
    const { data: tasks, isLoading, error } = api.task.getTasksAssignedToUser.useQuery();

    if (isLoading) return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Card><CardHeader><Skeleton className="h-4 w-24" /></CardHeader><CardContent><Skeleton className="h-4 w-24" /></CardContent></Card></div>
    if (error) return <div>Error loading tasks</div>
    if (!tasks?.length) return <div>No tasks assigned to you yet!</div>

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <Card key={task.id} className='bg-card'>
                    <CardHeader>
                        <CardTitle>{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Badge>{task.priority}</Badge>
                            <Badge variant="outline">{task.status}</Badge>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="text-sm text-muted-foreground">
                            Due: {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default TaskList
