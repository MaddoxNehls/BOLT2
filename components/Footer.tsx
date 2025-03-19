'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Footer = () => {
  // Animation variants
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.5
      }
    }
  }

  return (
    <footer className="bg-black py-16 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-electric-blue/20 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <motion.div 
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 text-gradient">The World's Largest Hackathon</h3>
              <p className="text-white/70 mb-6">Join us for an immersive coding experience that will ignite your creativity and push the boundaries of innovation.</p>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-electric-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-electric-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-electric-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-electric-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-4 text-electric-blue">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#timeline" className="text-white/70 hover:text-white transition-colors">Timeline</Link></li>
                <li><Link href="#prizes" className="text-white/70 hover:text-white transition-colors">Prizes</Link></li>
                <li><Link href="#sponsors" className="text-white/70 hover:text-white transition-colors">Sponsors</Link></li>
                <li><Link href="#judges" className="text-white/70 hover:text-white transition-colors">Judges</Link></li>
              </ul>
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-4 text-electric-blue">Contact</h4>
              <div className="space-y-2">
                <p className="text-white/70">
                  <span className="block font-medium">Email:</span>
                  <a href="mailto:info@hackathon.dev" className="hover:text-electric-blue transition-colors">hello@stackblitz.com</a>
                </p>
                <p className="text-white/70">
                  <span className="block font-medium">Location:</span>
                  Virtual
                </p>
              </div>
              
              <div className="mt-6">
                <Link 
                  href="#"
                  className="neon-button inline-block"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm"
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} The World's Largest Hackathon. All rights reserved.</p>
          <p className="mt-2">
            <Link href="#" className="hover:text-electric-blue transition-colors">Privacy Policy</Link>
            {' '}&bull;{' '}
            <Link href="#" className="hover:text-electric-blue transition-colors">Terms of Service</Link>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 