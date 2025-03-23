"use client"
import React, {useState} from 'react';
import Header from '@/components/Header'
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import TaskCreator from './TaskAddDialog';
import TaskList from './TaskList';
import { DialogTitle } from '@radix-ui/react-dialog';
import ProjectAddDialog from './ProjectAddDialog';

// Type definitions
type Message = {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: Date;
};

type Task = {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  title: string;
  description: string | null;
  dueDate: Date | null;
  priority: string | null;
  status: string | null;
  assignedTo: string | null;
  tags: string[] | null;
  projectId: string | null;
};

type Project = {
  id: number;
  name: string;
  createdAt: Date | null;
  status: string | null;
  description: string | null;
  githubRepoLink: string | null;
  ownerId: string;
  targetCompletionDate: Date | null;
};

type DevStageDashboardProps = {
  projects: Project[];
  tasks: Task[];
}

const DevStageDashboard: React.FC<DevStageDashboardProps> = ({ projects: initialProjects, tasks: initialTasks }) => {
  const [open, setOpen] = React.useState(false)
 
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey ?? e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  // Sample data
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);

  const [currentProjectId, setCurrentProjectId] = useState<string>(
    projects.length > 0 ? String(projects[0]?.id ?? '') : ''
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      content: "Welcome to dev-stage! Your project workspace is ready.",
      sender: "system",
      timestamp: new Date(),
    },
    {
      id: "msg-2",
      content: "Do you want to push these changes to branch-1?",
      sender: "system",
      timestamp: new Date(),
    },
  ]);
  const [messageInput, setMessageInput] = useState<string>("");

  // Get current project
  const currentProject = projects.find((p) => p.id === Number(currentProjectId));
  
  // Get remaining tasks for current project
  const remainingTasks = tasks.filter(task => 
    task.status !== 'completed'
  );

  // Handle message submission
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: `msg-${messages.length + 1}`,
        content: messageInput,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  // Handle keydown for message input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle project switch
  const handleProjectSwitch = (projectId: string) => {
    setCurrentProjectId(projectId);
  };
  return (
    <div>
        <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <Header/>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>My tasks</CommandItem>
          <CommandItem>My projects</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>

      {/* Main Content Area */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 pt-16">
        {/* Chat Panel */}
        <ResizablePanel defaultSize={75} minSize={50} className="flex flex-col">
          <div className="flex flex-col h-full p-4">
            {/* Messages Area */}
            <ScrollArea className="flex-1 mb-4 p-2 border rounded-lg">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-8"
                        : "bg-muted text-muted-foreground mr-8"
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.content.includes("push these changes") && (
                      <div className="mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-500 hover:text-green-700 mr-2"
                        >
                          y
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          make changes and respond to branch-1
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input Area */}
            <div className="flex items-center space-x-2 border rounded-lg p-2">
              <Input
                placeholder="Type a message or command..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Command Palette Hint */}
            <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground p-2 border rounded-lg">
              <Command className="h-4 w-4" />
              <span>chat with gemini</span>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <span>gemini-2.0-flash staging:web</span>
            </div>
          </div>
        </ResizablePanel>

        {/* Resizable Handle */}
        <ResizableHandle/>

        {/* Project Sidebar */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
          <div className="p-4 h-full">
            <Card className="h-full">
              <CardHeader className="pb-2">
                {/* Project Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <CardTitle>{currentProject?.name ?? 'No project selected'}</CardTitle>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    {projects.map((project) => (
                      <DropdownMenuItem
                        key={project.id}
                        onClick={() => handleProjectSwitch(String(project.id))}
                        className="cursor-pointer"
                      >
                        {project.name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem>
                        <ProjectAddDialog/>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Separator className="my-2" />
              </CardHeader>
              <CardContent>
                <h2 className="text-sm font-semibold mb-2">Tasks remaining</h2>
                <div className='flex flex-col gap-8'>
                
                  {/* <div className="space-y-2">
                    {remainingTasks.map((task) => (
                      <div
                        key={task.id}
                        className="py-2 border-b border-border last:border-0"
                      >
                        <p className="text-sm">{task.title}</p>
                      </div>
                    ))}
                    {remainingTasks.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">
                        No tasks remaining
                      </p>
                    )}
                  </div> */}
                  <TaskList tasks={initialTasks}/>
                  <TaskCreator/>
                  </div>
                
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
      
    </div>
  )
}

export default DevStageDashboard;
