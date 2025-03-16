import TaskCreator from "@/components/TaskAddDialog"
import React from "react"
import TaskList from '@/components/TaskList'
import Header from "@/components/Header"

const todoHomePage = () => {
    
    return (
       <div className = 'min-h-screen bg-background pt-24 space-y-4 mx-12'>
       <Header/>
       <h1 className="text-4xl font-bold">Your tasks</h1>
       <TaskList/>
       <TaskCreator/>
       </div> 
    )
}

export default todoHomePage;