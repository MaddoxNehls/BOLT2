'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Change navbar style when scrolled
      setIsScrolled(currentScrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'prizes', 'sponsors', 'judges']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (!element) return false
        
        const rect = element.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Prizes', path: '#prizes' },
    { name: 'Sponsors', path: '#sponsors' },
    { name: 'Judges', path: '#judges' },
    { name: 'Apply', path: '#apply', isButton: true }
  ]
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  return (
    <>
      <motion.nav 
        className="fixed top-5 left-0 right-0 mx-auto w-fit z-50 transition-all duration-300 py-3 px-8 rounded-full"
        style={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
          border: isScrolled ? '1px solid rgba(0, 255, 255, 0.2)' : 'none',
          boxShadow: isScrolled ? '0 0 10px rgba(0, 255, 255, 0.2)' : 'none'
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0,
          scale: isScrolled ? 0.95 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Desktop menu */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navLinks.map((link) => (
            link.isButton ? (
              <motion.a
                key={link.name}
                href={link.path}
                className="neon-button px-6 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ) : (
              <Link key={link.name} href={link.path}>
                <motion.span 
                  className={`relative text-lg font-medium transition-colors ${
                    activeSection === link.path.substring(1) ? 'text-electric-blue' : 'text-white'
                  }`}
                  whileHover={{ color: "#00ffff" }}
                >
                  {link.name}
                  
                  {/* Animated underline - fixed to use a new approach without layoutId */}
                  {activeSection === link.path.substring(1) && (
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      style={{ originX: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            )
          ))}
        </div>
        
        {/* Mobile menu button */}
        <motion.button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="w-6 h-0.5 bg-white mb-1.5 block"
            animate={{ 
              rotate: isMobileMenuOpen ? 45 : 0,
              translateY: isMobileMenuOpen ? 8 : 0
            }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white mb-1.5 block"
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white block"
            animate={{ 
              rotate: isMobileMenuOpen ? -45 : 0,
              translateY: isMobileMenuOpen ? -8 : 0
            }}
          />
        </motion.button>
      </motion.nav>
      
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-24 bg-black/95 backdrop-blur-lg md:hidden"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="w-full"
                >
                  {link.isButton ? (
                    <a
                      href={link.path}
                      className="neon-button block text-center py-3 w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      href={link.path}
                      className={`block text-2xl font-bold text-center py-3 ${
                        activeSection === link.path.substring(1) ? 'text-electric-blue' : 'text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}
              
              {/* Decorative element */}
              <motion.div 
                className="absolute bottom-10 w-full px-10"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <div className="h-0.5 bg-gradient-to-r from-transparent via-electric-blue to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 