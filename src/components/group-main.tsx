import { IterationCw, Pen, Plus, Trash2, X } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PicColor } from "./pic-color";
import { useState } from "react";
import { useTodoStore } from "@/app/store/store";
import { Group, Task } from "@/lib/types";
import { Checkbox } from "./ui/checkbox";
import { inputStyle } from "@/utils/inputstyle";

type props = {
   group: Group;
   tasks: Task[];
}
export const GroupMain = ({ group, tasks }: props) => {
   const [isEditingGroupName, setisEditingGroupName] = useState(false);
   const [editingGroupName, setEditingGroupName] = useState(group?.name);
   const [newTask, setNewTask] = useState("");
   const [newTaskTitle, setNewTaskTitle] = useState('');
   const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
   const [open, setOpen] = useState(false);
   const { updateGroupName, addTask, toggleCompleteTask, updateTask, deleteTask, deleteGroup } = useTodoStore();

   function handleUpdateGroupName() {
      if (editingGroupName.trim()) {
         updateGroupName(group.id, editingGroupName);
         setisEditingGroupName(false);
      };
   };

   function handleAddTask() {
      if (newTask.trim() || newTask != '') {
         addTask({
            id: crypto.randomUUID(),
            title: newTask,
            completed: false,
            groupId: group.id,
            createdAt: new Date(),
         });
         setNewTask('');
      };
   };

   function handleEditTask(task: Task) {
      setEditingTaskId(task.id);
      setNewTaskTitle(task.title);
   }

   function handleUpdateTask(taskId: string) {
      if (newTaskTitle.trim()) {
         updateTask(taskId, { title: newTaskTitle });
         setEditingTaskId(null);
      };
   };

   function handleCancelTaskUpdate(taskId: string){
      setEditingTaskId(null);
   }

   return (
      <div className="my-6 border-2 p-2 rounded-lg" style={{borderColor: group.color}}>
         <div className="flex gap-2 items-center">
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger className="-mb-2">
                  <span
                     className={`inline-block w-7 h-7 rounded-sm border border-secondary cursor-pointer`}
                     style={{backgroundColor: group.color}}
                  ></span>
               </PopoverTrigger>
               <PopoverContent className="max-w-52">
                  <PicColor groupId={group.id} closePopover={() => setOpen(false)} />
               </PopoverContent>
            </Popover>
            {isEditingGroupName
               ?
               <>
                  <input type="text"
                     className={`${inputStyle} text-xl font-semibold p-1 w-full`}
                     value={editingGroupName}
                     onChange={(e) => setEditingGroupName(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleUpdateGroupName()}
                  />
                  <Button text="salvar" onClick={handleUpdateGroupName} paddingSmall={true} textSm={true} />
                  <X size={24} onClick={() => setisEditingGroupName(false)} className="cursor-pointer" />
               </>
               :
               <>
                  <p className="text-xl font-semibold mr-4 p-1">{group.name}</p>
                  <div className="flex items-center gap-3 ml-auto md:ml-0">
                     <Pen size={20} onClick={() => setisEditingGroupName(true)} className="cursor-pointer hover:opacity-70 transition ml-5" />
                     <Trash2 size={20} onClick={() => deleteGroup(group.id)} className="hover:text-red-600 transition cursor-pointer" />
                  </div>
               </>
            }
         </div>
         <div className="flex gap-2 items-center my-3 ">
            <input type="text"
               className={`${inputStyle} flex-1`}
               placeholder="Adicione uma tarefa..."
               value={newTask}
               onChange={(e) => setNewTask(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <div className="flex justify-center items-center h-10 w-10 bg-zinc-900 rounded-md cursor-pointer">
               <Plus className=" text-zinc-100"
                  onClick={handleAddTask} />
            </div>
         </div>
         <div className="my-2">
            {tasks.map(task => (
               <div key={task.id}
                  className={`flex items-center justify-between m-0 md:m-2 p-2 rounded-lg border `}
                  style={
                     {borderColor: group.color,
                        background: task.completed ? `linear-gradient(to right, ${group.color}, transparent)` : ''
                     }
                  }
               >
                  <div className="flex items-center gap-2">
                     <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleCompleteTask(task.id)}
                        className="w-5 h-5 border-zinc-800 dark:border-zinc-300 cursor-pointer"
                     />
                     {editingTaskId === task.id
                        ?
                        <div className="flex items-center gap-1 md:gap-2 flex-1">
                           <input type="text"
                              className={`${inputStyle} w-full md:w-60`}
                              value={newTaskTitle}
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleUpdateTask(task.id)}
                              placeholder={task.title}
                           />
                           <Button text="Salvar" onClick={() => handleUpdateTask(task.id)} paddingSmall={true} textSm={true} />
                           <X size={28} onClick={() => handleCancelTaskUpdate(task.id)} className="cursor-pointer mr-1" />
                        </div>
                        :
                        <div className="flex">
                           <p className={`p-1 ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
                        </div>
                     }
                  </div>
                  <div className="flex gap-3">
                     {editingTaskId
                        ? <IterationCw size={20} onClick={() => handleEditTask(task)} className="cursor-pointer hover:opacity-70 transition hidden md:block" />
                        : <Pen size={20} onClick={() => handleEditTask(task)} className="cursor-pointer hover:opacity-70 transition" />
                     }
                     <Trash2 size={20} onClick={() => deleteTask(task.id)} className="hover:text-red-600 transition cursor-pointer" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}