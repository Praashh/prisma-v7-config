"use client"
import { motion } from "framer-motion"
import HowItWorks from "./sub/HowItWorks"

const LandingBody = () => {
    return <motion.div className="h-[100dvh] w-[100vw] ">
        <motion.div className="h-[100%] w-[100%] bg-radial  from-[#06022c] via-[#02000e] to-[#000]
        flex flex-col">
            {/* Txt part */}

            <motion.div className=" flex flex-col gap-4 items-center justify-center mt-44 ">
                <motion.h1 
                className="font-semibold font-sans text-xl text-transparent 
                bg-gradient-to-b from-[#201733] to-[#823ee9] bg-clip-text">H &nbsp;&nbsp;O &nbsp;&nbsp;W &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I &nbsp;&nbsp;T &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;W &nbsp;&nbsp;O &nbsp;&nbsp;R &nbsp;&nbsp;K &nbsp;&nbsp;S</motion.h1>

                <motion.h1 className="text-4xl text-white/90 font-bold text-center ">Decentralized, Verified, Effortless.</motion.h1>

                <motion.h1 className="max-w-xl text-center text-white/60 mt-4">No more setting up full nodes or getting lost in the stack.
                TruthChain lets you record facts on-chain, backed by real proofs—
                in just a few clicks.
                </motion.h1>
                
            </motion.div>


            {/* content */}
            <motion.div className="h-full">
                <HowItWorks/>
            </motion.div>

        </motion.div>
    </motion.div>
}

export default LandingBody