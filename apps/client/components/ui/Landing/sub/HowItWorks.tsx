const HowItWorks = () => {
    const steps = [
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
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div 
                key={step.id}
                className="backdrop-blur-2xl p-6 flex flex-col items-center text-center transform  
                border border-white/20 hover:border-[#1F51FF] hover:translate-y-[-5px] transition-all ease duration-300 rounded-md"
                data-aos="fade-up"
                data-aos-delay={step.id * 100}
              >
                <div className="h-16 w-16 rounded-full bg-truth-purple/20 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
                <div className="mt-4 text-truth-purple text-2xl font-bold">
                  {step.id}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <div className="h-1 bg-gradient-to-r from-[#32254e] via-[#1F51FF] to-[#32254e] rounded-full"></div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;