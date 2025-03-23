"use client"

import React, { useState } from 'react';
import { api } from '@/trpc/react';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

type SortOption = 'priority' | 'dueDate' | 'status' | 'title';
type SortDirection = 'asc' | 'desc';
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

const TaskList: React.FC<{tasks: Task[]}> = ({ tasks:initialTasks })=> {
  const [sortBy, setSortBy] = useState<SortOption>('status');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // API query for tasks
  const { data: tasksData, isLoading, error } = api.task.getTasksAssignedToUser.useQuery(undefined,{initialData: initialTasks});
  
  // Create a client-side tasks state for optimistic updates
  const [optimisticTasks, setOptimisticTasks] = useState<typeof tasksData>(initialTasks);
  
  // Sync optimisticTasks with the fetched data when it arrives
  React.useEffect(() => {
    if (tasksData) {
      setOptimisticTasks(tasksData);
    }
  }, [tasksData]);

  const tasks = optimisticTasks ?? [];
  
  // Mutation to update task status
  const utils = api.useUtils();
  const updateTaskMutation = api.task.updateTaskStatus.useMutation({
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches
      await utils.task.getTasksAssignedToUser.cancel();
      
      // Snapshot the previous value
      const previousTasks = utils.task.getTasksAssignedToUser.getData();
      
      // Optimistically update to the new value
      setOptimisticTasks(prev => 
        prev?.map(task => 
          task.id === id ? { ...task, status } : task
        )
      );
      
      // Return the previous value
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        setOptimisticTasks(context.previousTasks);
      }
    },
    onSettled: async () => {
      // Always refetch after error or success
      await utils.task.getTasksAssignedToUser.invalidate();
    },
  });

  // Handle checkbox toggle with optimistic update
  const handleStatusChange = (taskId: number, isCompleted: boolean) => {
    updateTaskMutation.mutate({
      id: taskId,
      status: isCompleted ? "completed" : "todo"
    });
  };

  // Sort tasks
  const sortedTasks = React.useMemo(() => {
    if (!tasks) return [];
    
    return [...tasks].sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'priority') {
        const priorityValues = { high: 3, medium: 2, low: 1, null: 0 };
        const priorityA = a.priority?.toLowerCase() ?? 'null';
        const priorityB = b.priority?.toLowerCase() ?? 'null';
        comparison = (priorityValues[priorityA as keyof typeof priorityValues] ?? 0) - 
                     (priorityValues[priorityB as keyof typeof priorityValues] ?? 0);
      } else if (sortBy === 'dueDate') {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
        comparison = dateA - dateB;
      } else if (sortBy === 'status') {
        const statusValues = { completed: 1, todo: 0 };
        const statusA = a.status?.toLowerCase() ?? 'todo';
        const statusB = b.status?.toLowerCase() ?? 'todo';
        comparison = (statusValues[statusA as keyof typeof statusValues] ?? 0) - 
                     (statusValues[statusB as keyof typeof statusValues] ?? 0);
      } else if (sortBy === 'title') {
        comparison = (a.title ?? '').localeCompare(b.title ?? '');
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [tasks, sortBy, sortDirection]);

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // Change sort option
  const changeSortOption = (option: SortOption) => {
    if (sortBy === option) {
      toggleSortDirection();
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };

  if (isLoading) return (
    <Card className="w-full p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </Card>
  );
  
  if (error) return (
    <Card className="w-full p-4">
      <div className="text-destructive">Error loading tasks</div>
    </Card>
  );
  
  if (!tasks?.length) return (
    <Card className="w-full p-4">
      <div className="text-muted-foreground">No tasks assigned to you yet!</div>
    </Card>
  );

  return (
    <Card className="w-full border-none">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Your Tasks</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto h-8 gap-1">
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeSortOption('priority')}>
                Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeSortOption('dueDate')}>
                Due Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeSortOption('status')}>
                Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeSortOption('title')}>
                Title
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-72">
          <ul className="divide-y">
            <AnimatePresence initial={false}>
              {sortedTasks.map((task) => {
                const isCompleted = task.status === "completed";
                
                return (
                  <motion.li 
                    key={task.id} 
                    className="flex items-start p-4 gap-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    layout
                  >
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={isCompleted}
                      onCheckedChange={(checked) => handleStatusChange(task.id, !!checked)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor={`task-${task.id}`}
                          className={cn(
                            "font-medium text-sm cursor-pointer",
                            isCompleted && "line-through text-muted-foreground"
                          )}
                        >
                          {task.title}
                        </label>
                        {task.description && (
                          <p className={cn(
                            "text-xs text-muted-foreground",
                            isCompleted && "line-through"
                          )}>
                            {task.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {task.priority && (
                            <Badge 
                              variant={isCompleted ? "outline" : getPriorityVariant(task.priority)}
                              className={cn(isCompleted && "opacity-60")}
                            >
                              {task.priority}
                            </Badge>
                          )}
                          {task.dueDate && (
                            <Badge variant="outline" className={cn(
                              isCompleted && "opacity-60", 
                              "flex gap-1 items-center"
                            )}>
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-xs text-muted-foreground">
          {tasks.filter(t => t.status === "completed").length} of {tasks.length} tasks completed
        </div>
      </CardFooter>
    </Card>
  );
};

// Helper function to get badge variant based on priority
const getPriorityVariant = (priority: string | null) => {
  if (!priority) return "default";
  switch (priority.toLowerCase()) {
    case 'high':
      return "destructive";
    case 'medium':
      return "secondary";
    case 'low':
      return "default";
    default:
      return "default";
  }
};

export default TaskList;