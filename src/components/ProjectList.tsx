"use client"
import React from 'react'
import { api } from '@/trpc/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from './ui/skeleton'

import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
const ProjectList = () => {
    const {data:projects, isLoading, error} = api.project.getProjectsAssignedToUser.useQuery();
    if (isLoading) return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Card><CardHeader><Skeleton className="h-4 w-24" /></CardHeader><CardContent><Skeleton className="h-4 w-24" /></CardContent></Card></div>
    if (error) return <div>Error loading tasks</div>
    if (!projects?.length) return <div>No projects assigned to you yet! Keep building!</div>
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
      {projects?.map((p) => (
                <Card key={p.id} className='bg-card'>
                    <CardHeader>
                        <CardTitle>{p.name}</CardTitle>
                        <CardDescription>{p.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Badge>{p.status}</Badge><Link href={`${p.githubRepoLink}`} className="text-foreground">
                            <GithubIcon/>
                        </Link>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="text-sm text-muted-foreground">
                            Due: {p.targetCompletionDate && new Date(p.targetCompletionDate).toLocaleDateString()}
                        </div>
                    </CardFooter>
                </Card>
            ))}
    </div>
  )
}

export default ProjectList
