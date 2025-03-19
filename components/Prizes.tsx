'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const Prizes = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  
  // Matrix-style code rain effect
  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setCanvasSize()
    
    // Handle window resize
    window.addEventListener('resize', setCanvasSize)
    
    // Characters for the matrix effect (use a wider range of characters)
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%&!?#@'
    const fontSize = 16 // Larger font size for better visibility
    const columns = Math.floor(canvas.width / fontSize)
    
    // Track the y position of each column
    const drops: number[] = []
    // Initialize all drops to start at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height
    }
    
    // Store characters for each column so they don't change too often
    const columnChars: string[] = []
    for (let i = 0; i < columns; i++) {
      columnChars[i] = characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    // Character change frequency (every N frames)
    const charChangeFrequency = 10
    let frameCount = 0
    
    // Main animation function
    const draw = () => {
      // Slower fade effect for better trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Set text style
      ctx.font = `${fontSize}px 'Courier New', monospace`
      
      // Increment frame counter
      frameCount++
      
      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        // Change character periodically
        if (frameCount % charChangeFrequency === 0) {
          // 30% chance to change the character
          if (Math.random() < 0.3) {
            columnChars[i] = characters.charAt(Math.floor(Math.random() * characters.length))
          }
        }
        
        // Create a prominent "$1M" text that appears occasionally
        let text = columnChars[i]
        const specialText = Math.random() < 0.0015 // Very low chance for special text
        
        if (specialText) {
          // Choose a prize amount
          const prizes = ["$1M+", "$50K", "$25K"]
          text = prizes[Math.floor(Math.random() * prizes.length)]
          
          // Make these special texts brighter
          const gradient = ctx.createLinearGradient(0, drops[i] - 50, 0, drops[i] + 10)
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
          gradient.addColorStop(1, 'rgba(0, 255, 255, 0.9)')
          ctx.fillStyle = gradient
          ctx.font = `bold ${fontSize}px 'Courier New', monospace`
        } else {
          // Normal matrix characters with cyan to blue gradient
          const gradient = ctx.createLinearGradient(0, drops[i] - 30, 0, drops[i] + 10)
          gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)')
          gradient.addColorStop(1, 'rgba(70, 130, 240, 0.6)')
          ctx.fillStyle = gradient
          ctx.font = `${fontSize}px 'Courier New', monospace`
        }
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i])
        
        // Slower movement - Move drop position at varying speeds for more natural look
        const speed = Math.random() * 0.5 + 0.5 // Speed between 0.5 and 1.0
        drops[i] += fontSize * 0.2 * speed
        
        // Reset drop when it goes off screen with some randomization
        if (drops[i] > canvas.height) {
          // Reset to random negative position for staggered entry
          drops[i] = -Math.random() * 100
          // Reset character
          columnChars[i] = characters.charAt(Math.floor(Math.random() * characters.length))
        }
      }
      
      // Ensure there's always a reasonable density of characters
      if (frameCount % 120 === 0) { // Every ~2 seconds at 60fps
        // Count active columns
        const activeColumns = drops.filter(d => d > 0 && d < canvas.height).length
        const desiredActive = columns * 0.7 // Want about 70% of columns to be active
        
        if (activeColumns < desiredActive) {
          // Add more active drops
          for (let i = 0; i < drops.length; i++) {
            if (drops[i] < 0 || drops[i] > canvas.height) {
              if (Math.random() < 0.3) { // 30% chance to activate an inactive column
                drops[i] = 0
              }
            }
          }
        }
      }
      
      requestAnimationFrame(draw)
    }
    
    const animationId = requestAnimationFrame(draw)
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [isInView])
  
  // Mock prizes data
  const prizes = [
    {
      title: "Grand Prize",
      amount: "$50,000",
      description: "For the most innovative and impactful project overall."
    },
    {
      title: "AI Innovation Award",
      amount: "$25,000",
      description: "Best use of artificial intelligence or machine learning."
    },
    {
      title: "Sustainability Challenge",
      amount: "$25,000",
      description: "For solutions addressing environmental sustainability."
    },
    {
      title: "Health Tech Award",
      amount: "$25,000",
      description: "Most promising healthcare technology solution."
    },
    {
      title: "Best Web3 Project",
      amount: "$25,000",
      description: "Excellence in blockchain and decentralized applications."
    },
    {
      title: "Best Student Project",
      amount: "$20,000",
      description: "Top project from a student team."
    }
  ]
  
  const totalPrizePool = "$1,000,000+"

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
        damping: 10
      }
    }
  }

  return (
    <section ref={sectionRef} id="prizes" className="py-20 px-4 md:px-12 bg-black relative overflow-hidden">
      {/* Canvas for matrix animation - now takes entire section background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-40" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Prizes</h2>
          <p className="text-2xl md:text-3xl text-electric-blue font-light">
            Total Prize Pool: <span className="font-bold">{totalPrizePool}</span>
          </p>
          <p className="text-base md:text-lg text-gray-300 mt-2 max-w-2xl mx-auto">
            Featuring major category prizes shown below, plus hundreds of sponsor prizes, 
            cloud credits, hardware, and exclusive opportunities valued at over $850,000.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {prizes.map((prize, index) => (
            <motion.div 
              key={index}
              className="bg-black/40 backdrop-blur-sm rounded-lg p-6 glow-border transform transition-all duration-300 hover:scale-105 hover:shadow-glow"
              variants={itemVariants}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-electric-blue">{prize.title}</h3>
              <p className="text-2xl md:text-3xl font-bold mb-4 text-white">{prize.amount}</p>
              <p className="text-gray-300">{prize.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Additional sponsor prizes include cloud credits worth $500,000+, hardware packages, 
            seed investments, mentorship programs, and job opportunities at leading tech companies.
            All participants will also receive exclusive swag and digital assets.
          </p>
          
          <motion.a
            href="#register"
            className="neon-button mt-8 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Register to Compete
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Prizes 