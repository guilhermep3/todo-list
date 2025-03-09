import { Group } from "@/lib/types"

type props = {
   group: Group;
}
export const GroupAside = ({group}: props) => {
   
   return (
      <li className="flex items-center gap-2 p-2 hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded-lg">
         <span
            className={`inline-block w-5 h-5 rounded-full border border-secondary`}
            style={{backgroundColor: group.color}}
         ></span>
         <p>{group.name}</p>
      </li>
   )
}