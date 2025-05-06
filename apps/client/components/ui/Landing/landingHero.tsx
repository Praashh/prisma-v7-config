"use client"
import { motion, useAnimation } from "framer-motion"
import AnimatedButton from "../Buttons/AnimatedButton"
import oracle from '../../../assets/landingImgs/OracleFinal.png'
import Image from "next/image"

const LandingHero = () => {

    const controls = useAnimation();
    
    return <motion.div>
        {/* main comp  */}
        <motion.div className="flex flex-row w-[100vw] h-[100vh] justify-between items-center">

            {/* Text Part */}
            <motion.div className="text-white flex flex-col justify-center items-start w-[50%] h-full px-40 gap-6">
                {/* Main Heading */}
                <motion.h1 
                    className="font-bold text-7xl lg:text-9xl bg-gradient-to-b from-[#2e1fff] to-[#01a5db] text-transparent bg-clip-text leading-tight"
                >
                    TruthChain
                </motion.h1>

                {/* Tagline */}
                <motion.h2 className="text-xl lg:text-3xl font-semibold text-gray-200">
                    Decentralized Truth. Verified by Proof.
                </motion.h2>

                {/* Subheading */}
                <motion.p className="text-xl text-gray-400 max-w-xl">
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