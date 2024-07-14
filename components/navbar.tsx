"use client"

import Image from "next/image"
import horse from "@/public/assets/svg/1659639.svg";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="sticky top-0 h-[10vh] w-full p-5 flex flex-row justify-between items-center bg-[#00000098] border-b border-black z-50">
        {/* //TODO logo work */}
        <Link href="/">

        <Image className="h-10 w-10 text-white" src={horse} alt="horse-logo" />
        </Link>

        <div className="flex flex-row justify-center w-1/2 gap-10  text-white">
           <Link href="/">
           <p>Home</p>
           </Link> 
            
        </div>
    </nav>
  )
}

export default Navbar