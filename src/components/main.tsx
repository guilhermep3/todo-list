"use client"
import { FolderPlus } from "lucide-react";
import { Button } from "./button";
import { GroupMain } from "./group-main";
import { useTodoStore } from "@/app/store/store";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";


export const Main = () => {
   const [isOpenDialog, setIsOpenDialog] = useState(false);
   const [newGroupName, setNewGroupName] = useState("");
   const { groups, addGroup, tasks, searchQuery } = useTodoStore();

   function handleCreateGroup() {
      if (newGroupName.trim()) {
         addGroup({
            id: crypto.randomUUID(),
            name: newGroupName,
            color: '#3b82f6',
            createdAt: new Date(),
         });
         setIsOpenDialog(false);
      };
   };

   const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
   );

   const filteredGroups = searchQuery
      ? groups.filter((group) => 
         filteredTasks.some((task) => task.groupId === group.id)
      )
      : groups

   return (
      <main className="flex-1 p-6 overflow-auto">
         <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
               <p className="font-bold text-2xl">Minhas tarefas</p>
               <Button icon={<FolderPlus />} text="Criar grupo" onClick={() => setIsOpenDialog(true)} />
               {isOpenDialog &&
                  <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Crie um novo grupo</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                           <input type="text" placeholder="Nome do grupo..."
                              className="w-full p-2 outline-none rounded-lg border border-zinc-300 dark:border-zinc-800 focus:border-zinc-500 focus:dark:border-zinc-700"
                              value={newGroupName}
                              onChange={(e) => setNewGroupName(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCreateGroup}
                           />
                           <Button text="Adicionar" onClick={handleCreateGroup} />
                        </div>
                     </DialogContent>
                  </Dialog>
               }
            </div>
            <div className="mt-4">
               {filteredGroups.map(group => (
                  <GroupMain key={group.id}
                     group={group}
                     tasks={filteredTasks.filter((task) => task.groupId === group.id)}
                  />
               ))}
            </div>
         </div>
      </main>
   )
}