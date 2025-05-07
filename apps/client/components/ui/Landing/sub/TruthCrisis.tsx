"use client"

const TruthCrisis = () => {
  return (
    <section className="py-20 px-4 relative  h-full">
      <div className="container mx-auto h-full">

        <h2 className="text-4xl md:text-7xl font-bold mb-16 text-center font-grotesk lg:text-9xl 
                    bg-gradient-to-br from-[#d4f9ff] via-[#bbcff0] to-[#96efff] 
                    text-transparent bg-clip-text mt-24">
          <span className="">The Truth Crisis</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div 
            className="p-8 transition-all duration-300 hover:translate-y-[-5px]
            border-white/20 border rounded-lg hover:border-[#1F51FF]
            backdrop-blur-3xl bg-[#ffffff13]"
            >
            <div className="h-16 w-16 rounded-full bg-truth-purple/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-truth-purple"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">The Problem</h3>
            <p className="text-white/70 mb-4">
                In a world flooded with information, truth is increasingly hard to validate. Traditional fact-checking is slow, opaque, and prone to bias — leaving critical public discourse vulnerable to manipulation.
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                No verifiable ownership of facts
              </li>
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                Centralized verification authorities
              </li>
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                Lack of cryptographic guarantees
              </li>
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                Susceptibility to misinformation and agenda-driven narratives
              </li>
            </ul>
          </div>
          
          {/* Solution Card */}
          <div 
            className=" p-8 transition-all duration-300 hover:translate-y-[-5px]
            border-white/20 border rounded-lg hover:border-[#1F51FF]
            backdrop-blur-3xl bg-[#ffffff13]"
          >
            <div className="h-16 w-16 rounded-full bg-truth-purple/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-truth-purple"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Our Solution</h3>
            <p className="text-white/70 mb-4">
            TruthChain redefines the way truth is recorded — enabling users to generate and verify facts through a zero-knowledge-proof transport layer and the Reclaim Protocol, all stored immutably on-chain.
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                User-led fact creation & sharing
              </li>
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                ZKPTLP (Zero-Knowledge Proof Transport Layer) for privacy & integrity
              </li>
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                Source verification via Reclaim Protocol
              </li>
              <li className="flex items-start">
                <span className="text-truth-purple mr-2">→</span>
                On-chain, tamper-proof fact registry
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TruthCrisis;