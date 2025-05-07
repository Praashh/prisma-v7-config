"use client"
import Navbar from "../ui/Appbar/main-nav";
import LandingBody from "../ui/Landing/LandingBody";
import LandingHero from "../ui/Landing/landingHero";
import LandingSection1 from "../ui/Landing/LandingSec1";
import { LenisWrapper } from "../Wrappers/LenisWrapper";

export default function Landing() {
    return (
        <LenisWrapper>
            <div className="relative">
        
                <Navbar/>
                <LandingHero/>
                <LandingBody/>
                <LandingSection1/>
                
            </div>
        </LenisWrapper>
    )
  }