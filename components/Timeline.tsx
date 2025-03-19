'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  const events = [
    {
      title: "Registration Opens",
      date: "TBD",
      description: "Join thousands of developers from around the globe as registration begins for the World's Largest Hackathon."
    },
    {
      title: "Opening Ceremony",
      date: "TBD",
      description: "Tune in for our spectacular virtual opening ceremony with special guests and the official theme announcement."
    },
    {
      title: "Hacking Begins",
      date: "TBD",
      description: "The 48-hour coding marathon kicks off! Teams start working on their groundbreaking projects."
    },
    {
      title: "Workshops & Mentorship",
      date: "TBD",
      description: "Access exclusive workshops and mentorship sessions from industry experts throughout the event."
    },
    {
      title: "Submissions Deadline",
      date: "TBD",
      description: "Projects must be submitted by this deadline to qualify for judging and prizes."
    },
    {
      title: "Judging Period",
      date: "TBD",
      description: "Our expert panel of judges will evaluate all submissions based on innovation, execution, and impact."
    },
    {
      title: "Winners Announced",
      date: "TBD",
      description: "Join us for the grand finale where we'll announce the winners and award over $1M in prizes."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <section ref={sectionRef} id="timeline" className="py-20 px-4 md:px-12 bg-black relative">
      {/* Background shader effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/30 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.2) 0%, transparent 20%),
            radial-gradient(circle at 75% 60%, rgba(153, 0, 255, 0.2) 0%, transparent 20%)
          `
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          Event Timeline
        </motion.h2>
        
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Center line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-electric-blue transform -translate-x-1/2"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ 
              boxShadow: "0 0 15px 1px rgba(0, 255, 255, 0.5)",
              background: "linear-gradient(180deg, #00FFFF 0%, #4D4DFF 50%, #9900FF 100%)"
            }}
          ></motion.div>
          
          {events.map((event, index) => (
            <motion.div 
              key={index}
              className={`relative flex items-start mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-electric-blue rounded-full transform -translate-x-1/2 z-20 flex items-center justify-center animate-pulse-slow"
                style={{ boxShadow: "0 0 20px 1px rgba(0, 255, 255, 0.7)" }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              
              {/* Content card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
              }`}>
                <div className="bg-black/60 p-6 rounded-lg glow-border">
                  <h3 className="text-2xl font-bold mb-2 text-electric-blue">{event.title}</h3>
                  <p className="text-fiery-orange font-mono mb-3">{event.date}</p>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline 