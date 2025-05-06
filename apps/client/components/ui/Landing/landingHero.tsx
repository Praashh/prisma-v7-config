"use client"
import { motion, useAnimation } from "framer-motion"
import AnimatedButton from "../Buttons/AnimatedButton"
import oracle from '../../../assets/landingImgs/OracleFinal.png'
import cursor from '../../../assets/landingImgs/elements/cursor.png'
import ele1 from '../../../assets/landingImgs/elements/ele1.png'
import Image from "next/image"

const LandingHero = () => {

    const controls = useAnimation();
    
    return <motion.div>
        {/* main comp  */}
        <motion.div className="flex flex-row w-[100vw] h-[100vh] justify-between items-center">

            {/* Text Part */}
            <motion.div 
            className="relative text-white flex flex-col justify-center items-center w-[50%] h-full px-40 gap-6 pb-32 ">
                
                <motion.div 
                initial={{y:0}}
                animate={{y:[6,-6,6]}}
                transition={{repeat:Infinity,duration:2,ease:"easeInOut"}}
                className="absolute right-[6rem] bottom-[9rem] z-20">
                    <motion.div 
                    drag
                    whileDrag={{ rotate: 5, scale: 0.96 }}
                    onDragEnd={() => {
                    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300 } });
                    }}
                    dragElastic={0.5}
                    animate={controls}
                    >
                        <Image className="scale-x-[-1] rotate-[20deg] size-72 pointer-events-none" src={cursor} alt="a floating obj"/>
                    </motion.div>
                </motion.div>

                <motion.div 
                initial={{y:0}}
                animate={{y:[6,-6,6]}}
                transition={{repeat:Infinity,duration:2,ease:"easeInOut",delay:0.8}}
                className="absolute left-[1rem] top-[2rem] z-10">
                    <motion.div 
                    drag
                    whileDrag={{ rotate: 5, scale: 0.96 }}
                    onDragEnd={() => {
                    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300 } });
                    }}
                    dragElastic={0.5}
                    animate={controls}
                    >
                        <Image className="scale-x-[-1] rotate-[20deg] size-72 pointer-events-none" src={ele1} alt="a floating obj"/>
                    </motion.div>
                </motion.div>
                
                

                {/* Main Heading */}
                <motion.h1 
                    className="font-bold font-grotesk text-7xl lg:text-9xl 
                    bg-gradient-to-br from-[#1b2475] via-[#2e6dd8] to-[#38e1ff] 
                    text-transparent bg-clip-text leading-tight z-20"
                >
                    TruthChain
                </motion.h1>

                {/* Tagline */}
                <motion.h2 className="text-xl lg:text-3xl font-semibold text-gray-200">
                    Decentralized Truth. Verified by Proof.
                </motion.h2>

                {/* Subheading */}
                <motion.p className="text-xl text-gray-400 max-w-xl text-center">
                    A bias-free, transparent network of facts—stored on-chain, trusted by everyone.
                </motion.p>

                {/* CTA Button */}
                <AnimatedButton val="Explore the Chain!" />
            </motion.div>

            {/* Img Part */}
            <motion.div drag 
            whileDrag={{ rotate: 5, scale: 0.96 }}
            onDragEnd={() => {
              controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300 } });
            }}
            dragElastic={0.5}
            animate={controls}
            className="w-[50%]">
                <Image src={oracle} alt="Oracle Illustration" className="w-full h-auto pointer-events-none"/>
            </motion.div>

        </motion.div>
    
    </motion.div>
}

export default LandingHero