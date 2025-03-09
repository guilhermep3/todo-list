"use client"
import { FolderPlus, Menu } from "lucide-react";
import { Button } from "./button";
import { GroupMain } from "./group-main";
import { useTodoStore } from "@/app/store/store";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { inputStyle } from "@/utils/inputstyle";

type props = {
   showAsideMobile: boolean;
   setShowAsideMobile: (showAsideMobile: boolean) => void;
}
export const Main = ({showAsideMobile, setShowAsideMobile}: props) => {
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
      <main className="flex-1 p-3 md:p-6 md:pl-[300px] overflow-auto">
         <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
               <p className="font-bold text-xl md:text-2xl">Minhas tarefas</p>
               <div className="flex items-center gap-2">
                  <Button icon={<FolderPlus />} text="Criar grupo" onClick={() => setIsOpenDialog(true)} />
                  <Menu size={32} onClick={() => setShowAsideMobile(!showAsideMobile)} />
               </div>
               {isOpenDialog &&
                  <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Crie um novo grupo</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                           <input type="text" placeholder="Nome do grupo..."
                              className={`w-full p-2 outline-none rounded-lg ${inputStyle}`}
                              value={newGroupName}
                              onChange={(e) => setNewGroupName(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCreateGroup()}
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