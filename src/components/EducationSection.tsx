import FadeIn from './FadeIn';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  location: string;
  grade?: string;
  highlights: string[];
}

const EDUCATION: EducationItem[] = [
  {
    year: '2020 — 2023',
    degree: 'Bachelor of Technology',
    institution: 'Dr. Babasaheb Ambedkar Technological University',
    location: 'Maharashtra, India',
    grade: 'CGPA: 8.40 / 10',
    highlights: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Web Technologies',
      'Data Analytics',
    ],
  },
  {
    year: '2017 — 2020',
    degree: 'Diploma',
    institution: 'Gourishiv Polytechnic',
    location: 'Maharashtra, India',
    grade: '70.40%',
    highlights: [
      'Programming Fundamentals',
      'Computer Fundamentals',
      'Database Concepts',
      'Engineering Mathematics',
      'Web Technologies',
      'Problem Solving',
    ],
  },
];

const EducationSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            y: 100,
            opacity: 0,
            rotationX: 45,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Timeline line animation
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate each card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          {
            rotationY: -45,
            rotationX: 15,
            opacity: 0,
            x: 100,
            filter: "blur(5px)",
          },
          {
            rotationY: 0,
            rotationX: 0,
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            delay: index * 0.3,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3D hover effect
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;
          
          gsap.to(card, {
            rotationY: rotateY,
            rotationX: rotateX,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative w-full bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-950 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden perspective-1000"
    >
      {/* Animated Background with emerald/teal accents */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY, opacity }}
      >
        {/* Gradient orbs in emerald/teal */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-600/20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles in emerald/teal */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotateZ: [0, 360, 0],
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>

      {/* Title with emerald gradient */}
      <div className="relative mb-16 sm:mb-20 md:mb-28" style={{ transformStyle: 'preserve-3d' }}>
        <h2
          ref={titleRef}
          className="text-center font-black uppercase bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          Education
        </h2>
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
          animate={{ width: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Timeline Container */}
      <div className="relative mx-auto max-w-5xl">
        {/* Vertical timeline line with emerald gradient */}
        <motion.div 
          ref={timelineRef}
          className="absolute left-[19px] sm:left-[21px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 hidden sm:block"
          style={{ transformOrigin: "top" }}
        />

        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
          {EDUCATION.map((item, i) => (
            <div key={i} className="relative">
              {/* Timeline dot with emerald pulse */}
              <motion.div 
                className="hidden sm:flex absolute left-[11px] sm:left-[13px] -translate-x-1/2 z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.3, type: "spring" }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center z-20 shadow-lg shadow-emerald-500/30">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Card */}
              <motion.div
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="ml-0 sm:ml-12 group"
                style={{ transformStyle: 'preserve-3d' }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">
                  {/* Glow effect on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 opacity-0 transition-opacity duration-500 pointer-events-none"
                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  />
                  
                  {/* Glass morphism */}
                  <div className="absolute inset-0 backdrop-blur-3xl" />
                  
                  <div className="relative p-6 sm:p-8 md:p-10">
                    {/* Year badge with emerald */}
                    <motion.div 
                      className="inline-flex mb-4 sm:mb-6"
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm backdrop-blur-sm">
                        {item.year}
                      </span>
                    </motion.div>

                    {/* Degree */}
                    <motion.h3 
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
                      whileHover={{ x: 10 }}
                    >
                      {item.degree}
                    </motion.h3>

                    {/* Institution and location */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                      <span className="text-emerald-300 font-medium">
                        {item.institution}
                      </span>
                      <span className="text-white/20 hidden sm:inline">•</span>
                      <span className="text-white/50 text-sm flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.location}
                      </span>
                    </div>

                    {/* Grade with emerald theme */}
                    {item.grade && (
                      <motion.div 
                        className="inline-flex mb-6 sm:mb-8"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 animate-pulse" />
                          <span className="relative text-emerald-400 font-semibold text-sm">
                            {item.grade}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Highlights */}
                    <div className="mt-6">
                      <p className="text-white/60 text-sm mb-3 font-medium uppercase tracking-wider">
                        Key Highlights
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((highlight, idx) => (
                          <motion.span
                            key={idx}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
                            whileHover={{ 
                              scale: 1.1,
                              y: -3,
                              rotateZ: Math.random() * 5 - 2.5
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Decorative line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element with emerald */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white/50 text-xs uppercase tracking-wider">Continuous Learning Journey</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default EducationSection;