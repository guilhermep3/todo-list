"use client"
import { Aside } from "@/components/aside";
import { Main } from "@/components/main";
import { useState } from "react";

export default function Home() {
   const [showAsideMobile, setShowAsideMobile] = useState(false);

   return (
      <div className="flex">
         <Aside showAsideMobile={showAsideMobile}/>
         <Main showAsideMobile={showAsideMobile} setShowAsideMobile={setShowAsideMobile}/>
      </div>
   );
}
