'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Canvas animation for static background with particles and lightning
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Particle class for stable animation
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = `rgba(${Math.floor(100 + Math.random() * 155)}, ${Math.floor(180 + Math.random() * 75)}, 255, ${0.3 + Math.random() * 0.4})`
      }
      
      update() {
        // Slow movement
        this.x += this.speedX
        this.y += this.speedY
        
        // Wrap around screen edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }
      
      draw() {
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }
    
    // Create particle array
    const particleCount = 250 // Reduced count for better performance
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    
    // Lightning bolt class
    class LightningBolt {
      points: { x: number, y: number }[]
      width: number
      opacity: number
      decay: number
      color: string
      active: boolean
      
      constructor() {
        this.points = []
        this.width = Math.random() * 3 + 2
        this.opacity = 1
        this.decay = Math.random() * 0.03 + 0.015
        this.color = '#00FFFF'
        this.active = false
        this.generatePoints()
      }
      
      generatePoints() {
        // Start at a random x position at the top
        const startX = Math.random() * canvas.width
        const endX = startX + (Math.random() * canvas.width/2 - canvas.width/4)
        
        // Number of zigzag segments
        const segments = Math.floor(Math.random() * 5) + 3
        
        this.points = []
        this.points.push({ x: startX, y: 0 })
        
        // Create zigzag pattern
        for (let i = 1; i < segments; i++) {
          const segmentLength = canvas.height / segments
          const randomOffsetX = Math.random() * 100 - 50
          
          this.points.push({
            x: startX + randomOffsetX * (i % 2 === 0 ? 1 : -1),
            y: i * segmentLength
          })
        }
        
        // Add end point
        this.points.push({ x: endX, y: canvas.height })
      }
      
      update() {
        this.opacity -= this.decay
        
        if (this.opacity <= 0) {
          this.active = false
        }
      }
      
      draw() {
        if (!this.active) return
        
        ctx!.strokeStyle = this.color
        ctx!.lineWidth = this.width
        ctx!.globalAlpha = this.opacity
        ctx!.beginPath()
        ctx!.moveTo(this.points[0].x, this.points[0].y)
        
        for (let i = 1; i < this.points.length; i++) {
          ctx!.lineTo(this.points[i].x, this.points[i].y)
        }
        
        ctx!.stroke()
        ctx!.globalAlpha = 1
      }
      
      activate() {
        this.generatePoints()
        this.opacity = 1
        this.active = true
      }
    }
    
    // Create lightning bolts
    const maxBolts = 3
    const lightningBolts: LightningBolt[] = []
    for (let i = 0; i < maxBolts; i++) {
      lightningBolts.push(new LightningBolt())
    }
    
    // Random lightning generation
    let nextLightningTime = Date.now() + Math.random() * 2000 + 1000
    
    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Check if it's time for new lightning
      const now = Date.now()
      if (now > nextLightningTime) {
        // Find inactive bolt
        const inactiveBolts = lightningBolts.filter(bolt => !bolt.active)
        if (inactiveBolts.length > 0) {
          const randomBolt = inactiveBolts[Math.floor(Math.random() * inactiveBolts.length)]
          randomBolt.activate()
          
          // Schedule next lightning
          nextLightningTime = now + Math.random() * 3000 + 1000
        }
      }
      
      // Update and draw lightning bolts
      lightningBolts.forEach(bolt => {
        if (bolt.active) {
          bolt.update()
          bolt.draw()
        }
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])
  
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* Canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0" 
      />
      
      {/* Content */}
      <div className="z-10 text-center px-4 relative">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient flex items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="flex items-center">
            <img 
              src="/b-logo.png" 
              alt="B" 
              className="inline-block h-[1.6em] mr-[-0.35em] translate-y-[0.02em]" 
            />
            OLT
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl mb-6 text-electric-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The World's Largest Hackathon
        </motion.p>
        
        {/* Prize pool highlight - reimagined to match cyberpunk theme */}
        <motion.div
          className="mb-12 mx-auto w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative py-6 px-4 overflow-hidden bg-black/40 backdrop-blur-sm border border-electric-blue/30 rounded-lg">
            {/* Cyber glitch effects */}
            <motion.div
              className="absolute inset-0 z-0 bg-gradient-to-r from-electric-blue/5 to-purple-500/5"
              animate={{ 
                background: [
                  'linear-gradient(90deg, rgba(0,255,255,0.05) 0%, rgba(128,0,255,0.05) 100%)',
                  'linear-gradient(90deg, rgba(128,0,255,0.05) 0%, rgba(0,255,255,0.05) 100%)',
                  'linear-gradient(90deg, rgba(0,255,255,0.05) 0%, rgba(128,0,255,0.05) 100%)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Digital scan line effect */}
            <motion.div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)'
              }}
              animate={{ 
                y: [0, 40, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Horizontal neon lines */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-electric-blue to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-electric-blue to-transparent" />
            
            {/* Vertical neon lines */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-electric-blue to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-electric-blue to-transparent" />
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-electric-blue" style={{ boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)' }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-electric-blue" style={{ boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-electric-blue" style={{ boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-electric-blue" style={{ boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)' }} />
            
            {/* Cyberpunk-themed prize pool text with glitch effect */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 relative z-10">
              <div className="text-lg md:text-xl uppercase tracking-widest text-electric-blue font-mono">
                <span className="opacity-80">PRIZE_POOL:</span>
              </div>
              
              <motion.div
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono relative"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-electric-blue to-cyan-300">$1,000,000+</span>
                
                {/* Glitch effect lines */}
                <motion.span 
                  className="absolute -inset-0.5 bg-electric-blue/20 opacity-0"
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    x: [-2, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 0.2, 
                    repeat: Infinity, 
                    repeatDelay: 5,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <a 
            href="#register" 
            className="neon-button text-lg md:text-xl"
          >
            Register Now
          </a>
        </motion.div>
        
        <motion.div
          className="absolute bottom-[-100px] left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a 
            href="#about" 
            className="text-electric-blue flex flex-col items-center animate-bounce"
            aria-label="Scroll down to about section"
          >
            <span className="mb-2 text-sm">Explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 