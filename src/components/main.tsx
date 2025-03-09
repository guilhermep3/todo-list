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
export const Main = ({ showAsideMobile, setShowAsideMobile }: props) => {
   const [isOpenDialog, setIsOpenDialog] = useState(false);
   const [newGroupName, setNewGroupName] = useState("");
   const { groups, addGroup, tasks, searchQuery } = useTodoStore();

   function handleCreateGroup() {
      if (newGroupName.trim()) {
         addGroup({
            id: crypto.randomUUID(),
            name: newGroupName,
            color: '#00a6f4',
            createdAt: new Date(),
         });
         setIsOpenDialog(false);
         setNewGroupName('');
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
      <main className="flex-1 p-3 md:p-6 md:pl-[300px] overflow-auto min-h-screen relative" style={{}}>
         <div className={`z-20 absolute top-0 right-0 w-full h-full bg-black/50 ${showAsideMobile ? 'block' : 'hidden'}`}
            onClick={() => setShowAsideMobile(false)}></div>
         <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
               <p className="font-bold text-xl md:text-2xl">Minhas tarefas</p>
               <div className="flex items-center gap-2">
                  <Button icon={<FolderPlus />} text="Criar grupo" onClick={() => setIsOpenDialog(true)} />
                  <Menu size={32} onClick={() => setShowAsideMobile(!showAsideMobile)} className="block md:hidden z-20" />
               </div>
               {isOpenDialog &&
                  <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                     <DialogContent className="-mt-10 md:mt-0">
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
               {groups.length === 0 &&
                  <div className="text-base text-center my-10 text-zinc-700 dark:text-zinc-300">
                     Crie um grupo de tarefas.
                  </div>}
               {filteredGroups.map(group => (
                  <GroupMain key={group.id}
                     group={group}
                     tasks={filteredTasks.filter((task) => task.groupId === group.id)}
                  />
               ))}
            </div>
         </div>
         <footer className="text-center my-10">
            <p className="text-zinc-500 text-sm">Desenvolvido por <a href="https://github.com/guilhermep3" target="_blank" className="underline">Guilherme Pereira</a></p>
         </footer>
      </main>
   )
}