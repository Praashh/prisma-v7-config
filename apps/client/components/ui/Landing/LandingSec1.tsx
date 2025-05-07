"use client"
import { motion } from "framer-motion";
import TruthCrisis from "./sub/TruthCrisis";

const LandingSection1 = () => {

    return <motion.div className="min-h-[100vh] w-[100vw] bg-radial  from-[#0c054b] via-[#02000e] to-[#000]">
        <motion.div className="h-[100%] w-[100%] 
        flex flex-col">

            <TruthCrisis/>

        </motion.div>
    </motion.div> 
}

export default LandingSection1;