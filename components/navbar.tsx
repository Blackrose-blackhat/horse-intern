"use client"

import Image from "next/image"
import horse from "@/public/assets/svg/1659639.svg";
const Navbar = () => {
  return (
    <nav className="sticky top-0 h-[10vh] w-full p-5 flex flex-row justify-between items-center bg-[#00000098] border-b border-black z-50">
        {/* //TODO logo work */}
        <Image className="h-10 w-10 text-white" src={horse} alt="horse-logo" />

        <div className="flex flex-row justify-center w-1/2 gap-10  text-white">
            <p>Home</p>
            <p>About</p>
        </div>
    </nav>
  )
}

export default Navbar