"use client"
import { ThemeToggle } from "@/components/theme-toggle";
import { ListTodo, Search } from "lucide-react";
import { GroupAside } from "./group-aside";
import { useTodoStore } from "@/app/store/store";
import { inputStyle } from "@/utils/inputstyle";


export const Aside = () => {
   const { groups, tasks, searchQuery, setSearchQuery } = useTodoStore();
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter((task) => task.completed).length;

   return (
      <aside className="w-64 h-screen border-r p-4 flex flex-col gap-6">
         <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
               <ListTodo size={32} />
               <h1 className="font-bold text-xl">Tarefando</h1>
            </div>
            <ThemeToggle />
         </div>
         <div className={`${inputStyle} flex items-center`}>
            <Search size={20} className="text-zinc-600 dark:text-zinc-400" />
            <input type="text"
               className="outline-none w-full"
               placeholder="Pesquise uma tarefa"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)} />
         </div>
         <div>
            <h2 className="font-semibold">Overview</h2>
            <span className="text-sm text-p text-zinc-600 dark:text-zinc-400">{completedTasks} de {totalTasks} tarefas concluídas</span>
         </div>
         <div>
            <h2 className="font-semibold">Grupos</h2>
            <ul className="flex flex-col mt-1 gap-1">
               {groups.map((group) => (
                  <GroupAside group={group} key={group.id} />
               ))}
            </ul>
         </div>
      </aside>
   )
}