// src/stores/useTaskStore.ts

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date | null;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed' | 'archived';
  assignedTo?: string;
  tags?: string[];
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
};

// type TaskFilters = {
//   status?: Task['status'];
//   priority?: Task['priority'];
//   assignedTo?: string;
//   projectId?: string;
// };

// interface TaskState {
//   tasks: Task[];
//   isLoading: boolean;
//   error: string | null;
//   filters: TaskFilters;
  
//   // Actions
//   setTasks: (tasks: Task[]) => void;
//   addTask: (task: Task) => void;
// //   updateTask: (id: string, data: Partial<Task>) => void;
// //   removeTask: (id: string) => void;
// //   setFilters: (filters: TaskFilters) => void;
// //   clearFilters: () => void;
  
//   // API interactions
// //   fetchTasks: () => Promise<void>;
//   createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
// //   updateTaskStatus: (id: string, status: Task['status']) => Promise<void>;
// //   deleteTask: (id: string) => Promise<void>;
// }

// const useTaskStore = create<TaskState>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         tasks: [],
//         isLoading: false,
//         error: null,
//         filters: {},
        
//         // State setters
//         setTasks: (tasks) => set({ tasks }),
//         addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
//         // updateTask: (id, data) => set((state) => ({
//         //   tasks: state.tasks.map((task) => 
//         //     task.id === id ? { ...task, ...data } : task
//         //   ),
//         // })),
//         // removeTask: (id) => set((state) => ({
//         //   tasks: state.tasks.filter((task) => task.id !== id),
//         // })),
//         // setFilters: (filters) => set({ filters }),
//         // clearFilters: () => set({ filters: {} }),
        
//         // API interactions
        
//     //     createTask: async (taskData) => {
//     //       set({ isLoading: true, error: null });
          
//     //       try {
//     //         const response = await api.task.createTask.mutateAsync(taskData);
//     //         if (response.success) {
//     //           set((state) => ({ 
//     //             tasks: [response.task, ...state.tasks],
//     //             isLoading: false 
//     //           }));
//     //         }
//     //       } catch (error) {
//     //         set({ 
//     //           error: error instanceof Error ? error.message : 'Failed to create task', 
//     //           isLoading: false 
//     //         });
//     //       }
//     //     },
//     //   }),
//       {
//         name: 'task-storage',
//         partialize: (state) => ({ filters: state.filters }), // Only persist filters
//       }
//     )
//   )
// );

// export default useTaskStore;