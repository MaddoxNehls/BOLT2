'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface JudgeProps {
  id: string
  name: string
  twitter: string
  role: string
  company?: string
  expertise: string[]
  bio: string
  photo?: string
}

const Judges = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeJudge, setActiveJudge] = useState<string | null>(null)
  
  // Judges with images
  const judges: JudgeProps[] = [
    { 
      id: "1", 
      name: "Sarah Guo", 
      twitter: "saranormous", 
      role: "Founder",
      company: "Conviction",
      expertise: ["AI Adoption", "Startup Investment", "Tech Strategy"],
      bio: "Startup investor/helper, founder of Conviction. Accelerating AI adoption, interested in progress. Host of No Priors podcast.",
      photo: "/judges/Sarah.png"
    },
    { 
      id: "2", 
      name: "Theo Browne", 
      twitter: "theo", 
      role: "CEO",
      company: "t3.gg",
      expertise: ["TypeScript", "React", "Next.js", "Open Source"],
      bio: "Full-time CEO at T3 Chat. Part-time YouTuber, investor, and developer based in San Francisco.",
      photo: "/judges/Theo.jpg"
    },
    { 
      id: "3", 
      name: "Evan You", 
      twitter: "youyuxi", 
      role: "Founder",
      company: "Void Zero",
      expertise: ["JavaScript Frameworks", "Vue.js", "Vite", "Frontend Tools"],
      bio: "Creator of Vue.js & Vite. Founder of Void Zero. Husband and father of two, based in Singapore.",
      photo: "/judges/Evan.png"
    },
    { 
      id: "4", 
      name: "KP", 
      twitter: "thisiskp_", 
      role: "AI Launchpad & Founder Relations",
      company: "Paddle",
      expertise: ["Build In Public", "Entrepreneurship", "AI Products"],
      bio: "The \"Build In Public\" Guy. Running AI Launchpad & Founder Relations at Paddle. Entrepreneur based in Atlanta, GA.",
      photo: "/judges/KP.jpg"
    },
    { 
      id: "5", 
      name: "Coming Soon", 
      twitter: "", 
      role: "TBA",
      expertise: [],
      bio: "",
    },
    { 
      id: "6", 
      name: "Coming Soon", 
      twitter: "", 
      role: "TBA",
      expertise: [],
      bio: "",
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12
      }
    }
  }

  const handleJudgeHover = (id: string | null) => {
    setActiveJudge(id)
  }

  return (
    <section 
      ref={sectionRef} 
      id="judges" 
      className="py-32 px-4 md:px-12 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(153, 0, 255, 0.4) 0%, transparent 30%), radial-gradient(circle at 70% 50%, rgba(0, 255, 255, 0.4) 0%, transparent 30%)',
          filter: activeJudge ? 'hue-rotate(30deg) blur(10px)' : 'blur(5px)',
          transition: 'filter 0.5s ease'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Judges
        </motion.h2>
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="text-xl text-gray-300">Industry leaders who will evaluate your submissions</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {judges.map((judge) => {
            const isComingSoon = judge.name === "Coming Soon";
            return (
              <motion.div 
                key={judge.id}
                className="relative group"
                variants={itemVariants}
                onMouseEnter={() => !isComingSoon && handleJudgeHover(judge.id)}
                onMouseLeave={() => handleJudgeHover(null)}
                style={{ opacity: isComingSoon ? 0.5 : 1 }}
              >
                {/* Profile Card */}
                <div className={`bg-black/60 rounded-lg overflow-hidden transform transition-all duration-300 ${!isComingSoon ? 'group-hover:scale-105' : ''}`}>
                  {/* Judge Photo with distortion effect */}
                  <div className="h-56 relative overflow-hidden">
                    {judge.photo ? (
                      <img 
                        src={judge.photo} 
                        alt={`${judge.name} headshot`} 
                        className="w-full h-full object-cover"
                        style={{
                          filter: activeJudge === judge.id ? 'none' : 'grayscale(30%)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ) : (
                      <div 
                        className="h-full bg-gradient-to-br from-electric-blue/30 to-neon-purple/30 flex items-center justify-center"
                      >
                        <span className="text-5xl font-bold text-white/40">
                          {isComingSoon ? "?" : judge.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Interactive distortion effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 transition-opacity duration-300 ${activeJudge === judge.id ? 'opacity-40' : 'opacity-0'}`}></div>
                    
                    {/* Glow border effect */}
                    <div className={`absolute inset-0 border-t border-l border-r border-electric-blue/30 transition-opacity duration-300 ${activeJudge === judge.id ? 'opacity-100' : 'opacity-0'}`}
                      style={{ boxShadow: "0 0 15px 2px rgba(0, 255, 255, 0.3)" }}
                    ></div>
                  </div>
                  
                  {/* Judge info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1 text-electric-blue">{judge.name}</h3>
                    {!isComingSoon && (
                      <>
                        <p className="text-white/80 text-sm mb-3">{judge.role} at {judge.company}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {judge.expertise.map((skill, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-electric-blue/20 text-electric-blue px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        {judge.twitter && (
                          <a
                            href={`https://twitter.com/${judge.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-fiery-orange hover:text-fiery-orange/80 transition-colors inline-flex items-center mt-2"
                          >
                            @{judge.twitter}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="ml-1 w-3 h-3"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* Bio panel that slides up on hover - fixed to handle images */}
                {!isComingSoon && (
                  <motion.div 
                    className="absolute inset-0 bg-black/90 p-6 flex flex-col justify-center rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                    style={{
                      boxShadow: "0 0 20px 5px rgba(0, 255, 255, 0.2)",
                      zIndex: 10,
                      transitionProperty: 'opacity, visibility',
                      transitionDuration: '0.3s'
                    }}
                    initial={false}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-electric-blue">{judge.name}</h3>
                    <p className="text-white/90 mb-4">{judge.bio}</p>
                    <a
                      href={`https://twitter.com/${judge.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fiery-orange hover:underline mt-4 inline-flex items-center"
                    >
                      @{judge.twitter}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="ml-1 w-4 h-4"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                    <div className="mt-auto">
                      <p className="text-fiery-orange font-semibold">{judge.role} at {judge.company}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Judges
