'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface SponsorProps {
  id: string
  name: string
  logo?: string
}

const Sponsors = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Updated sponsors with logo URLs
  const sponsors: SponsorProps[] = [
    { id: "1", name: "Supabase", logo: "/logos/supabase.jpg" },
    { id: "2", name: "Netlify", logo: "/logos/netlify.png" },
    { id: "3", name: "Cloudflare", logo: "/logos/cloudflare.jpg" },
    { id: "4", name: "Sentry", logo: "/logos/Sentry.png" },
    { id: "5", name: "Loops", logo: "/logos/Loops.jpg" },
    { id: "6", name: "Algorand Foundation", logo: "/logos/algorand.jpg" },
    { id: "7", name: "Coming Soon" },
    { id: "8", name: "Coming Soon" }
  ]

  return (
    <section id="sponsors" className="py-32 px-4 md:px-12 bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,30,60,0.4) 0%, rgba(0,0,0,1) 70%)',
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Sponsors
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-300 max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Our sponsors make this event possible. Their support enables the next generation of innovators to create groundbreaking solutions.
        </motion.p>
        
        {/* Sponsor cards - made larger */}
        <div 
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto"
        >
          {sponsors.map((sponsor, index) => {
            const isComingSoon = sponsor.name === "Coming Soon";
            
            return (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="aspect-square"
                whileHover={{ scale: isComingSoon ? 1 : 1.05, transition: { duration: 0.2 } }}
                onHoverStart={() => !isComingSoon && setHoveredSponsor(sponsor.id)}
                onHoverEnd={() => setHoveredSponsor(null)}
              >
                <div className="w-full h-full relative">
                  {/* Sponsor Card */}
                  <div 
                    className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden p-6"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                      boxShadow: hoveredSponsor === sponsor.id 
                        ? '0 0 20px rgba(0, 200, 255, 0.4), inset 0 0 10px rgba(0, 180, 255, 0.2)' 
                        : '0 0 10px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0, 180, 255, 0.1)',
                      opacity: isComingSoon ? 0.5 : 1
                    }}
                  >
                    {/* Continuous circular border animation - always visible */}
                    {!isComingSoon && (
                      <div className="absolute inset-0 z-0 pointer-events-none rounded-lg overflow-hidden">
                        {/* The circular moving border line */}
                        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          {/* SVG filter for glow effect */}
                          <defs>
                            <filter id={`glow-${sponsor.id}`} x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="2" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>
                          
                          {/* Animated stroke that goes around the box */}
                          <motion.rect 
                            x="1" 
                            y="1" 
                            width="98" 
                            height="98" 
                            fill="none" 
                            stroke="rgba(0, 180, 255, 0.7)"
                            strokeWidth="1"
                            strokeDasharray="196" 
                            strokeDashoffset="196"
                            rx="5"
                            ry="5"
                            filter={`url(#glow-${sponsor.id})`}
                            initial={false}
                            animate={{
                              strokeDashoffset: [196, 0, -196]
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </svg>
                      </div>
                    )}
                    
                    {/* Sponsor Logo or Initials - made larger */}
                    <div className="text-center z-10">
                      <div 
                        className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 bg-white shadow-md"
                      >
                        {sponsor.logo ? (
                          <img 
                            src={sponsor.logo} 
                            alt={`${sponsor.name} logo`}
                            className="w-full h-full object-contain rounded-full"
                          />
                        ) : (
                          <span className="text-3xl font-bold text-gray-700">
                            ?
                          </span>
                        )}
                      </div>
                      
                      <motion.p 
                        className="text-base md:text-lg font-medium mt-4"
                        style={{
                          color: hoveredSponsor === sponsor.id ? '#ffffff' : '#a0a0a0',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {sponsor.name}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Become a Sponsor button - made larger and moved down */}
        <div className="text-center mt-24">
          <motion.a
            href="#sponsor-us"
            className="neon-button text-xl px-8 py-4 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Become a Sponsor
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default Sponsors 
