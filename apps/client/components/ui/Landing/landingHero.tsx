"use client"
import { motion, useAnimation } from "framer-motion"
import AnimatedButton from "../Buttons/AnimatedButton"
import oracle from '../../../assets/landingImgs/OracleFinal.png'
import cursor from '../../../assets/landingImgs/elements/cursor.png'
import ele1 from '../../../assets/landingImgs/elements/ele1.png'
import bgGrid from '../../../assets/landingImgs/bg-grid-hero-m.svg'
import Image from "next/image"
import { useRef } from "react"

const LandingHero = () => {

    const controls = useAnimation();
    const constraintRef = useRef(null);
    
    return <motion.div className="w-[100vw] h-[90vh]">

        {/* main comp  */}
        <motion.div 
        className="flex flex-row pl-10 w-[100vw] h-[100%] justify-between items-end  
        shadow-xl rounded-b-3xl
        bg-radial from-[#171246] via-[#070420] to-black 
        overflow-hidden"> {/* bg-gradient-to-br from-[#000000] via-[#0a2650] to-[#000000]  #2f286b #0a2650*/}

            <motion.div className="absolute top-40 right-0 left-0">
                <Image src={bgGrid} alt="bgImg" className="h-[90vh] w-full"/>
            </motion.div>
        
            {/* Text Part */}
            <motion.div 
            className="relative text-white flex flex-col justify-end items-center w-[50%] h-full px-40 pb-52 gap-6  ">
                
                <motion.div 
                initial={{y:0}}
                animate={{y:[6,-6,6]}}
                transition={{repeat:Infinity,duration:2,ease:"easeInOut",delay:1.6}}
                className="absolute right-[6rem] bottom-0 z-20">
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
                className="absolute left-[1rem] top-[4rem] z-10">
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
                    bg-gradient-to-br from-[#d4f9ff] via-[#bbcff0] to-[#96efff] 
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
            <motion.div 
            ref={constraintRef}
            initial={{filter: "drop-shadow(0px 0px 10px rgba(0, 255, 255, 0.1))",y:[10]}}
            animate={{filter: "drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5))",y:0}} 
            transition={{repeat:Infinity,duration:1.2,repeatType:"reverse",ease:"easeInOut"}}
            className="w-[50%]">
                <motion.div 
                drag 
                whileDrag={{ rotate: 5, scale: 0.96 }}
                onDragEnd={() => {
                  controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300 } });
                }}
                dragElastic={0.5}
                animate={controls}
                dragConstraints={constraintRef}
                >
                    <Image src={oracle} alt="Oracle Illustration" className="w-full h-auto pointer-events-none drop-shadow"/>
                </motion.div>


            </motion.div>

        </motion.div>
    
    </motion.div>
}

export default LandingHero