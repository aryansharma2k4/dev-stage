import TaskCreator from "@/components/TaskAddDialog"
import React from "react"
import TaskList from '@/components/TaskList'
import Header from "@/components/Header"

const todoHomePage = async() => {

    //made this function async to implement prefetch here to make the page load faster
    
    return (
       <div className = 'min-h-screen bg-background pt-24 space-y-4 mx-12'>
       <Header/>
       <h1 className="text-4xl font-bold">Your tasks</h1>
       {/* will pass the data prefetched from the server to the tasklist component as a props which will be used again to make it more fast */}
       <TaskList/>
       <TaskCreator/>
       </div>
    )
}

export default todoHomePage;