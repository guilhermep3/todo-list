import { FolderPlus } from "lucide-react"
import { ReactNode } from "react";

type props = {
   icon?: ReactNode;
   text: string;
   onClick?: () => void;
   paddingSmall?: boolean;
   textSm?: boolean;
}
export const Button = ({ icon, text, onClick, paddingSmall, textSm }: props) => {

   return (
      <button onClick={onClick}
         className={`${paddingSmall ? 'px-2 py-1' : 'px-3 py-2'} md:${paddingSmall ? 'px-3 py-2' : 'px-4 py-3'}
         flex gap-2 transition bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900
         rounded-lg hover:bg-zinc-800 hover:dark:bg-zinc-200 cursor-pointer ${textSm ? 'text-sm' : 'text-base'}`}
      >
         {icon}
         <p>{text}</p>
      </button>
   )
}