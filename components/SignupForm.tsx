'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SignupFormProps {
  onClose: () => void
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    team: '',
    interest: 'individual'
  })
  const [formStep, setFormStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (formStep < 2) {
      setFormStep(formStep + 1)
    }
  }

  const prevStep = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", damping: 15 }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  const formStepVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", damping: 15 }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 12,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const successItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  // Loading animation
  const loadingCircleVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1, 
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div 
          className="relative bg-black/95 w-full max-w-lg mx-4 rounded-lg overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ 
            boxShadow: "0 0 30px 5px rgba(0, 255, 255, 0.3)",
            border: "1px solid rgba(0, 255, 255, 0.2)"
          }}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-electric-blue/20 to-neon-purple/20 py-6 px-8">
            <h2 className="text-3xl font-bold text-gradient">Hackathon Portal</h2>
            <p className="text-white/70 mt-1">Register to join the World's Largest Hackathon</p>
          </div>

          {/* Form content */}
          <div className="p-8">
            {isSubmitted ? (
              <motion.div 
                className="py-8 text-center"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full mx-auto mb-6 flex items-center justify-center"
                  variants={successItemVariants}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold mb-2 text-electric-blue"
                  variants={successItemVariants}
                >
                  Registration Complete!
                </motion.h3>
                
                <motion.p 
                  className="text-white/70 mb-8"
                  variants={successItemVariants}
                >
                  Thank you for signing up. We'll be in touch with next steps soon.
                </motion.p>
                
                <motion.button
                  onClick={onClose}
                  className="neon-button"
                  variants={successItemVariants}
                >
                  Return to Site
                </motion.button>
              </motion.div>
            ) : isSubmitting ? (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-6">
                  <svg width="80" height="80" viewBox="0 0 50 50" className="text-electric-blue">
                    <motion.circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      variants={loadingCircleVariants}
                      initial="hidden"
                      animate="visible"
                      strokeDasharray="1, 200"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-xl text-electric-blue">Processing your registration...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {formStep === 0 && (
                    <motion.div 
                      key="step1"
                      variants={formStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="mb-6">
                        <label htmlFor="name" className="block text-white/90 mb-2">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/60 border border-electric-blue/30 text-white p-3 rounded-md focus:border-electric-blue focus:outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-white/90 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/60 border border-electric-blue/30 text-white p-3 rounded-md focus:border-electric-blue focus:outline-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  {formStep === 1 && (
                    <motion.div 
                      key="step2"
                      variants={formStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="mb-6">
                        <label htmlFor="team" className="block text-white/90 mb-2">Team Name (Optional)</label>
                        <input
                          type="text"
                          id="team"
                          name="team"
                          value={formState.team}
                          onChange={handleChange}
                          className="w-full bg-black/60 border border-electric-blue/30 text-white p-3 rounded-md focus:border-electric-blue focus:outline-none"
                          placeholder="Enter your team name if you have one"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="interest" className="block text-white/90 mb-2">Participation Type</label>
                        <select
                          id="interest"
                          name="interest"
                          value={formState.interest}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/60 border border-electric-blue/30 text-white p-3 rounded-md focus:border-electric-blue focus:outline-none"
                        >
                          <option value="individual">Individual Participant</option>
                          <option value="team">Team Participant</option>
                          <option value="sponsor">Interested in Sponsoring</option>
                          <option value="volunteer">Volunteer/Mentor</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                  
                  {formStep === 2 && (
                    <motion.div 
                      key="step3"
                      variants={formStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="mb-6">
                        <p className="text-white/90 mb-4">Please review your information:</p>
                        <div className="bg-black/40 p-4 rounded-md mb-4">
                          <p><span className="text-electric-blue">Name:</span> {formState.name}</p>
                          <p><span className="text-electric-blue">Email:</span> {formState.email}</p>
                          <p><span className="text-electric-blue">Team:</span> {formState.team || 'N/A'}</p>
                          <p><span className="text-electric-blue">Participation:</span> {formState.interest}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="terms"
                            required
                            className="mr-2"
                          />
                          <label htmlFor="terms" className="text-white/70 text-sm">
                            I agree to the <a href="#" className="text-electric-blue">Terms and Conditions</a>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex justify-between mt-8">
                  {formStep > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 bg-black/60 border border-electric-blue/50 text-electric-blue rounded-md hover:bg-electric-blue/10 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {formStep < 2 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="neon-button"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="neon-button"
                    >
                      Complete Registration
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SignupForm 