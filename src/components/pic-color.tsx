import { useTodoStore } from "@/app/store/store";
import { Button } from "./ui/button";

type Props = {
   groupId: string;
   closePopover: () => void;
};

export const PicColor = ({ groupId, closePopover }: Props) => {
   const { updateGroupColor } = useTodoStore();

   function handleColorClicked(color: string) {
      updateGroupColor(groupId, color);
      closePopover();
   }

   const colors = [
      "#ec4899", // pink-500
      "#a855f7", // purple-500
      "#00a6f4", // sky-500
      "#1d4ed8", // blue-700
      "#22c55e", // green-500
      "#15803d", // green-700
      "#eab308", // yellow-500
      "#a16207", // yellow-800
      "#f97316", // orange-500
      "#dc2626", // red-600
   ];

   return (
      <div className="flex gap-2 flex-wrap">
         {colors.map((color) => (
            <Button
               key={color}
               value={color}
               className={`p-0 inline-block w-7 h-7 rounded-sm hover:brightness-110 cursor-pointer`}
               style={{backgroundColor: color}}
               onClick={() => handleColorClicked(color)}
            ></Button>
         ))}
      </div>
   );
};