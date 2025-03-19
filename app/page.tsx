'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import Prizes from '../components/Prizes'
import Sponsors from '../components/Sponsors'
import Judges from '../components/Judges'
import SignupForm from '../components/SignupForm'
import Footer from '../components/Footer'
import AiGuide from '../components/AiGuide'
import Navbar from '../components/Navbar'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-deep-black text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gradient"
        >
          The Challenge Awaits...
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Navbar must be outside any section and at the top */}
      <Navbar />

      {/* AI Guide */}
      <AiGuide />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <section id="about" className="py-20 px-4 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">About the Hackathon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/40 p-6 rounded-lg glow-border">
                <h3 className="text-2xl font-bold mb-4 text-electric-blue">The Mission</h3>
                <p className="text-lg">Join us for the World's Largest Hackathon, where innovators from around the globe come together to solve challenges, build groundbreaking solutions, and push the boundaries of what's possible with code.</p>
              </div>
              <div className="bg-black/40 p-6 rounded-lg glow-border">
                <h3 className="text-2xl font-bold mb-4 text-electric-blue">The Vision</h3>
                <p className="text-lg">Our mission is to ignite creativity and foster collaboration in a futuristic virtual environment. With over $1M in prizes, we're empowering the next generation of tech visionaries.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-20"
          >
            <button 
              className="neon-button text-xl"
              onClick={() => setShowSignup(true)}
            >
              Enter Hackathon Portal
            </button>
          </motion.div>

          <div className="rounded-lg overflow-hidden mb-30 glow-border">
            <div className="aspect-w-16 aspect-h-9 bg-black/50 flex items-center justify-center">
              <p className="text-xl text-center p-8">Watch the Reveal &mdash; Holographic Video Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* Prizes Section */}
      <Prizes />

      {/* Sponsors Section */}
      <Sponsors />

      {/* Judges Section */}
      <Judges />

      {/* Footer */}
      <Footer />

      {/* Signup Form Modal */}
      {showSignup && (
        <SignupForm onClose={() => setShowSignup(false)} />
      )}
    </main>
  )
} 