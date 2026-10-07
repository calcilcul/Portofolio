'use client'

/**
 * @author: @emerald-ui
 * @description: Editorial-style team member card with overlapping layers and motion
 * @version: 2.0.0
 * @date: 2026-02-19
 * @license: MIT
 * @website: https://emerald-ui.com
 *
 */
import { ArrowRight, Download } from 'lucide-react'
import { motion, useInView, Variants } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useRef } from 'react'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TeamMemberCardProps {
  position?: 'left' | 'right'
  jobPosition?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  description?: string
  className?: string
  cvLink?: string | null
}

/**
 * Editorial-style team member card with overlapping portrait, large display
 * typography, circular CTA toggle, and staggered entrance animations.
 */
export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Backend Engineer',
  firstName = 'Jennie',
  lastName = 'Garcia',
  imageUrl = 'https://cdn.21st.dev/assets/mirror/17/1714867a87f5bff03a84da4493b98ade811acbd6bd667eb4f9cdd47c64d70f09.jpg',
  description = 'Jennie is a skilled developer with expertise in modern web technologies and a passion for creating seamless user experiences.',
  className,
  cvLink,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`
  const isPositionRight = position === 'right'

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // When not in view, keep opacity 0. When in view, animate to 1.
  // We'll use variants to control children based on parent state.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], staggerChildren: 0.1 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn('relative my-16 flex flex-col justify-center', className)}
    >
      {/* jobPosition label — editorial uppercase tracking */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } }
        }}
      >
        <p
          className={cn(
            'mb-4 text-xs font-medium tracking-[0.3em] text-zinc-400 uppercase dark:text-zinc-500',
            isPositionRight && 'text-right'
          )}
        >
          {jobPosition}
        </p>
      </motion.div>

      <div className='flex items-center justify-end'>
        {/* Portrait image with reveal animation */}
        <motion.div
          variants={{
             hidden: { opacity: 0, scale: 0.95, y: 30 },
             visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] } }
          }}
          className={cn(
            'relative h-125 w-90 shrink-0 overflow-hidden rounded-xl border border-white/5',
            isPositionRight && 'order-1'
          )}
          style={{ height: '500px', width: '360px' }} // Fallback sizing since h-125 w-90 might not exist in standard tailwind
        >
          {/* Subtle grain overlay for texture */}
          <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
          
          {imageUrl ? (
             <img
               src={imageUrl}
               alt={fullName}
               className='h-full w-full object-cover duration-500 ease-[0.22,1,0.36,1] hover:scale-105'
             />
          ) : (
            <div className="h-full w-full bg-zinc-800 flex items-center justify-center text-7xl font-bold text-zinc-700">
               {firstName.charAt(0)}{lastName.charAt(0)}
            </div>
          )}
        </motion.div>

        {/* Info block — overlaps image via negative margin */}
        <motion.div
          variants={{
             hidden: { opacity: 0, x: 40 },
             visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] } }
          }}
          className={cn(
            'relative -left-12 z-20 flex w-[calc(100%-300px)] flex-col gap-10 bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl',
            isPositionRight && 'left-8 items-end'
          )}
        >
          {/* Header row: Name and CTA */}
          <div className="flex flex-row justify-between items-start gap-4">
            {/* Display name — large editorial type */}
            <div>
              <p className='text-6xl md:text-7xl leading-[1.05] font-semibold tracking-tighter text-zinc-900 dark:text-white'>
                {firstName}
                <br />
                <span className='font-light text-[color:var(--color-lime-accent)]'>{lastName}</span>
              </p>
            </div>

            {/* Expanding CTA Button */}
            <div className="shrink-0 mt-2">
              {cvLink ? (
                <a
                  href={cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-zinc-900/50 transition-all duration-500 ease-out hover:w-[200px] hover:bg-[color:var(--color-lime-accent)] hover:border-[color:var(--color-lime-accent)] shadow-lg"
                >
                  <Download
                    size={24}
                    className="text-zinc-400 transition-colors duration-300 group-hover:text-black shrink-0"
                  />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-out group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-3 font-semibold text-black">
                    Download CV
                  </span>
                </a>
              ) : (
                <div
                  className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-zinc-900/50 transition-all duration-500 ease-out hover:w-[180px] hover:bg-white hover:border-white shadow-lg cursor-pointer"
                >
                  <ArrowRight
                    size={24}
                    className="text-zinc-400 transition-all duration-300 group-hover:-rotate-45 group-hover:text-black shrink-0"
                  />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-out group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-3 font-semibold text-black">
                    Explore
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details row — bio */}
          <div className={cn('flex flex-col items-start', isPositionRight && 'items-end')}>
            {/* Bio copy — restrained body text */}
            <div className='w-full md:w-[85%]'>
              <p
                className={cn(
                  'text-base md:text-lg leading-[1.8] text-zinc-500 dark:text-zinc-300 font-medium',
                  isPositionRight && 'text-right'
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
