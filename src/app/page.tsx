import { Aside } from "@/components/aside";
import { Main } from "@/components/main";

export default function Home() {
   return (
      <div className="flex">
         <Aside/>
         <Main/>
      </div>
   );
}
