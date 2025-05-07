"use client"

import { motion } from "framer-motion"

const Ball = () => {
    return <motion.div className="absolute z-10 transform left-4 top-4">
        <div className="h-4 w-4 rounded-full bg-blue-500"></div>
        <div className="absolute left-0 top-0 h-4 w-4 animate-ping rounded-full bg-blue-500 opacity-80"></div>
    </motion.div>
}

export default Ball