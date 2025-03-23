import TaskCreator from "@/components/TaskAddDialog"
import React from "react"
import TaskList from '@/components/TaskList'
import Header from "@/components/Header"
import ProjectAddDialog from "@/components/ProjectAddDialog"
import ProjectList from "@/components/ProjectList"
import { api } from "@/trpc/react";
const todoHomePage = async  () => {
    // implement prefetching
    // const projects = await api.project.getProjectsAssignedToUser.useQuery();
    return (
       <div className = 'min-h-screen bg-background pt-24 space-y-4 mx-12'>
       <Header/>
       <ProjectAddDialog/>
       <TaskCreator/>
       <h1 className="text-4xl font-bold">Your projects</h1>
       <ProjectList/>
       <h1 className="text-4xl font-bold">Your tasks</h1>
       {/* will pass the data prefetched from the server to the tasklist component as a props which will be used again to make it more fast */}
       
       
       
       </div>
    )
}

export default todoHomePage;