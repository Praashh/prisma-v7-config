"use client"
import {motion} from 'framer-motion';
import Ball from '../../customElements/Ball';

const HowItWorks = () => {
    const step = [
        {
          id: 1,
          title: "Create a Fact",
          description:
            "Users initiate the process by creating a fact on the TruthChain platform, providing context and references.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                 className="text-truth-purple">
              <path d="M3 3v18h18"/>
              <path d="M7 8h8M7 12h6"/>
            </svg>
          )
        },
        {
          id: 2,
          title: "Zero-Knowledge Transport (ZKPTLP)",
          description:
            "Facts are wrapped in a ZKPTLP layer, ensuring secure, private transmission without exposing sensitive details.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                 className="text-truth-purple">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          )
        },
        {
          id: 3,
          title: "Reclaim Protocol Verification",
          description:
            "The Reclaim Protocol verifies the submitted sources, generating cryptographic proofs for authenticity.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                 className="text-truth-purple">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          )
        },
        {
          id: 4,
          title: "Fact Published On-Chain",
          description:
            "Once verified, the fact is recorded immutably on-chain and becomes publicly accessible with source proofs.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                 className="text-truth-purple">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M8 7h8M8 11h6M8 15h4"/>
            </svg>
          )
        }
      ];
      
  
    return (
      <section className="py-20 px-4 relative">
        <div className=" flex w-[100vw] items-center justify-center ">


          
            <div className="relative grid w-[80%] md:grid-cols-1 lg:grid-cols-1 gap-6">

                <div className="absolute w-full h-full flex justify-center ">
                    <motion.div className="w-1 h-[100%] bg-gradient-to-b from-[#32254e] via-[#1F51FF] to-[#32254e] rounded-full" />

                    
                </div>


                {/* Card 1  */}
                <motion.div 
                className="backdrop-blur-2xl max-w-[36rem] p-6 flex flex-col items-center text-center 
                border border-white/20 hover:border-[#1F51FF] 
                hover:rounded-xl hover:bg-gradient-to-br from-red-950/75 via-[#0815444f] to-black/10 hover:translate-y-[-5px] transition-all ease duration-300 rounded-md
                relative"
                ><Ball/>
                    <div className="h-16 w-16 rounded-full bg-truth-purple/20 flex items-center justify-center mb-6">
                    {step[0].icon} 
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white ">{step[0].title}</h3>
                    <p className="text-white/70 ">{step[0].description}</p>
                </motion.div>

                {/* Card 2  */}
                <motion.div 
                className="backdrop-blur-2xl max-w-[36rem] p-6 flex flex-col items-center text-center 
                border border-white/20 hover:border-[#1F51FF] 
                hover:rounded-xl hover:bg-gradient-to-br from-red-950/75 via-[#0815444f] to-black/10 hover:translate-y-[-5px] transition-all ease duration-300 rounded-md
                lg:translate-x-[20rem] xl:translate-x-[30rem] 2xl:translate-x-[58rem]
                relative ">
                    <Ball/>
                    <div className="h-16 w-16 rounded-full bg-truth-purple/20 flex items-center justify-center mb-6">
                    {step[1].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white ">{step[1].title}</h3>
                    <p className="text-white/70 ">{step[1].description}</p>
                </motion.div>

                {/* Card 3  */}
                <motion.div 
                className="backdrop-blur-2xl max-w-[36rem] p-6 flex flex-col items-center text-center 
                border border-white/20 hover:border-[#1F51FF] 
                hover:rounded-xl hover:bg-gradient-to-br from-red-950/75 via-[#0815444f] to-black/10 hover:translate-y-[-5px] transition-all ease duration-300 rounded-md"
                >
                    <Ball/>
                    <div className="h-16 w-16 rounded-full bg-truth-purple/20 flex items-center justify-center mb-6">
                    {step[2].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white ">{step[2].title}</h3>
                    <p className="text-white/70 ">{step[2].description}</p>
                </motion.div>

                {/* Card 4  */}
                <motion.div 
                className="backdrop-blur-2xl max-w-[36rem] p-6 flex flex-col items-center text-center 
                border border-white/20 hover:border-[#1F51FF] 
                hover:rounded-xl hover:bg-gradient-to-br from-red-950/75 via-[#0815444f] to-black/10 hover:translate-y-[-5px] transition-all ease duration-300 rounded-md
                lg:translate-x-[20rem] xl:translate-x-[30rem] 2xl:translate-x-[58rem]
                ">
                    <Ball/>
                    <div className="h-16 w-16 rounded-full bg-truth-purple/20 flex items-center justify-center mb-6">
                    {step[3].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white ">{step[3].title}</h3>
                    <p className="text-white/70 ">{step[3].description}</p>
                </motion.div>

            </div>
          
          
        </div>
      </section>
    );
  };
  
  export default HowItWorks;