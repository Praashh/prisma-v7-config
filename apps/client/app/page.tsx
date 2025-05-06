"use client"
import Landing from "../components/pages/Landing";
import { useLenisScroll } from "../utils/useLenisScroll";
// import Navbar from "../components/ui/Appbar/main-nav";

export default function Home() {

  useLenisScroll();

  return (
   <div>

      <Landing/>
      
   </div>
  )
}