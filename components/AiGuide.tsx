'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const AiGuide = () => {
  const [guideState, setGuideState] = useState<'orb' | 'timeline' | 'prizes' | 'sponsors' | 'judges'>('orb')
  const guideRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Track scroll position for transformations
  const yPos = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [100, 200, 400, 600, 800])
  const scale = useTransform(scrollYProgress, 
    [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9], 
    [1, 0.9, 1.1, 0.8, 1, 0.9, 1.1, 0.8, 1]
  )
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])
  
  // Define shape variants
  const orbVariants = {
    orb: {
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(77,77,255,0.5) 70%, rgba(153,0,255,0.3) 100%)',
      boxShadow: '0 0 20px 5px rgba(0,255,255,0.5)',
      width: 60,
      height: 60,
    },
    timeline: {
      borderRadius: '3px',
      background: 'linear-gradient(90deg, #00FFFF 0%, #4D4DFF 100%)',
      boxShadow: '0 0 15px 3px rgba(0,255,255,0.5)',
      width: 100,
      height: 3,
    },
    prizes: {
      borderRadius: '10px',
      background: 'conic-gradient(from 180deg at 50% 50%, #00FFFF 0deg, #4D4DFF 120deg, #9900FF 240deg, #00FFFF 360deg)',
      boxShadow: '0 0 15px 3px rgba(0,255,255,0.5)',
      width: 50,
      height: 50,
      rotate: 45,
    },
    sponsors: {
      borderRadius: '50% 50% 50% 0',
      background: 'linear-gradient(225deg, #00FFFF 0%, #9900FF 100%)',
      boxShadow: '0 0 15px 3px rgba(0,255,255,0.5)',
      width: 40,
      height: 40,
    },
    judges: {
      borderRadius: '20px 0 20px 0',
      background: 'linear-gradient(135deg, #FF6600 0%, #9900FF 100%)',
      boxShadow: '0 0 15px 3px rgba(153,0,255,0.5)',
      width: 50,
      height: 40,
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Get all section h2 titles directly
      const sectionTitles = document.querySelectorAll('section h2');
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Home/hero section special case
      if (scrollPosition < viewportHeight * 0.5) {
        setGuideState('orb');
        return;
      }
      
      // Check which section title is closest to 1/3 of the viewport
      const targetPosition = viewportHeight / 3;
      
      // Map each title to its position and section
      const titlesWithPositions = Array.from(sectionTitles).map(title => {
        const rect = title.getBoundingClientRect();
        let section = 'timeline'; // Default
        
        // Determine which section this title belongs to based on text content
        const titleText = title.textContent?.toLowerCase() || '';
        
        if (titleText.includes('timeline') || titleText.includes('event')) {
          section = 'timeline';
        } else if (titleText.includes('prize') || titleText.includes('$1')) {
          section = 'prizes';
        } else if (titleText.includes('sponsor')) {
          section = 'sponsors';
        } else if (titleText.includes('judge') || titleText.includes('expert')) {
          section = 'judges';
        }
        
        return {
          section: section as 'timeline' | 'prizes' | 'sponsors' | 'judges',
          // Distance from the title to our target position (positive = below target, negative = above target)
          distance: Math.abs(rect.top - targetPosition),
          // Whether the title is in the viewport (with some padding)
          inView: rect.top < viewportHeight + 100 && rect.bottom > -100
        };
      });
      
      // Filter to only titles in view and sort by closest to target position
      const visibleTitles = titlesWithPositions.filter(t => t.inView);
      
      if (visibleTitles.length > 0) {
        // Sort by distance to target position
        visibleTitles.sort((a, b) => a.distance - b.distance);
        setGuideState(visibleTitles[0].section);
      }
    };
    
    // Initial check
    setTimeout(handleScroll, 500); // Give time for page to render
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Pulse animation
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div 
      ref={guideRef}
      className="fixed left-5 z-40 flex items-center justify-center pointer-events-none hidden md:flex"
      style={{ 
        top: yPos, 
        scale 
      }}
    >
      <motion.div
        className="relative"
        style={{ rotate: rotation }}
      >
        <motion.div 
          className="relative z-10"
          initial="orb"
          animate={guideState}
          variants={orbVariants}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div 
          className="absolute inset-0 z-0"
          initial="orb"
          animate="pulse"
          variants={pulseVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </motion.div>

      {/* Guide tooltip */}
      <motion.div
        className="ml-4 py-2 px-4 bg-black/80 text-electric-blue rounded-lg max-w-[150px] text-sm"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {guideState === 'orb' && "I'll guide you through this journey"}
        {guideState === 'timeline' && "Check out the event timeline"}
        {guideState === 'prizes' && "Over $1M in prizes await"}
        {guideState === 'sponsors' && "Our amazing sponsors"}
        {guideState === 'judges' && "Meet our expert judges"}
      </motion.div>
    </motion.div>
  )
}

export default AiGuide 