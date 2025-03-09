import { Task, Group } from "@/lib/types";
import { create } from "zustand";

interface TodoStore {
   tasks: Task[];
   groups: Group[];
   searchQuery: string;
   addTask: (task: Task) => void;
   updateTask: (taskId: string, updates: Partial<Task>) => void;
   toggleCompleteTask: (taskId: string) => void;
   deleteTask: (taskId: string) => void;
   addGroup: (group: Group) => void;
   updateGroupName: (groupId: string, name: string) => void;
   updateGroupColor: (groupId: string, color: string) => void;
   deleteGroup: (groupId: string) => void;
   setSearchQuery: (query: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
   tasks: [],
   groups: [],
   searchQuery: '',

   addTask: (task) => set((state) => ({
      tasks: [...state.tasks, task]
   })),

   updateTask: (taskId, updates) => set((state) => ({
      tasks: state.tasks.map((task) => 
         taskId === task.id ? { ...task, ...updates } : task
      )
   })),

   toggleCompleteTask: (taskId) => set((state) => ({
      tasks: state.tasks.map((task) =>
         task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
   })),

   deleteTask: (taskId) => set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId)
   })),

   addGroup: (group) => set((state) => ({ 
      groups: [...state.groups, group] 
    })),

   updateGroupName: (groupId, name) => set((state) => ({
      groups: state.groups.map((group) => 
         groupId === group.id ? {...group, name} : group
      )
   })),

   updateGroupColor: (groupId, color) => set((state) => ({
      groups: state.groups.map((group) => 
         groupId === group.id ? {...group, color} : group)
   })),

   deleteGroup: (groupId) => set((state) => ({
      groups: state.groups.filter((group) => group.id !== groupId),
      tasks: state.tasks.filter((task) => task.groupId !== groupId)
   })),

   setSearchQuery: (query) => set({ searchQuery: query }),
}));