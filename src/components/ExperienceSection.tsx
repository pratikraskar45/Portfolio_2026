import FadeIn from './FadeIn';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
 {
  number: '01',
  period: 'Jul 2024 - May 2026',
  type: 'Full-time',
  role: 'Software Developer',
  company: 'ShedEx',
  location: 'Bengaluru, Karnataka, India',
  description:
    'Developed and maintained REST APIs and backend services for a B2B logistics and warehousing application using Java, Spring Boot, Spring Data JPA, Hibernate, and JDBC. Built backend modules for user management, property management, search and filtering, and logistics operations. Implemented CRUD operations, JPA entity relationships, exception handling, and database operations using MySQL and PostgreSQL. Integrated backend APIs with frontend applications, tested endpoints using Postman, debugged backend issues, and collaborated with frontend developers during feature development and integration.',
  tags: [
    'Java',
    'Spring Boot',
    'Spring Data JPA',
    'Hibernate',
    'JDBC',
    'REST APIs',
    'MySQL',
    'PostgreSQL',
    'React.js',
    'Git',
    'Maven',
    'Postman',
  ],
},
{
  number: '02',
  period: 'Nov 2023 - Apr 2024',
  type: 'Trainee',
  role: 'Internship Trainee',
  company: 'JSpiders Training & Development Center',
  location: 'Navi Mumbai, Maharashtra, India',
  description:
    'Completed intensive Full Stack Java Development training with a strong focus on backend technologies. Developed backend applications using Core Java, Spring MVC, JDBC, Hibernate, and Spring Boot. Built and tested RESTful APIs using Postman, implemented CRUD operations and MySQL database integration, and developed responsive frontend interfaces using HTML5, CSS3, JavaScript, and React.js.',
  tags: [
    'Java',
    'Spring Boot',
    'Spring MVC',
    'JDBC',
    'Hibernate',
    'REST APIs',
    'MySQL',
    'React.js',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Postman',
  ],
},

  {
    number: '03',
    period: 'Oct 2022 - Apr 2023',
    type: 'Internship',
    role: 'Engineering Intern',
    company: 'HP Engineering',
    location: 'Satara, Maharashtra, India',
    description:
      'Supported Quality Operating Systems (QOS) and Integrated Production Systems (IPS) initiatives aligned with ISO 9000 standards. Worked on procurement optimization, material selection, quality assurance processes, and production improvement activities while collaborating with cross-functional teams.',
    tags: [
      'ISO 9000',
      'Quality Control',
      'QOS',
      'IPS',
      'Procurement',
      'Operations',
      'Manufacturing',
      'Process Improvement',
    ],
  },

  {
    number: '04',
    period: 'May 2018 - Jan 2020',
    type: 'Full-time',
    role: 'Supply Chain & Data Operations Analyst',
    company: 'Aahnik Petroleums',
    location: 'Navi Mumbai, Maharashtra, India',
    description:
      'Managed supply chain operations, inventory planning, transportation scheduling, and logistics analytics. Created KPI reports, performed data analysis, stock reconciliation, vendor performance tracking, ERP support, and process automation using Excel-based reporting solutions. Delivered actionable insights to improve operational efficiency and decision making.',
    tags: [
      'Data Analysis',
      'Supply Chain',
      'KPI Dashboards',
      'Excel',
      'Reporting',
      'Inventory Management',
      'ERP',
      'Logistics',
      'Automation',
      'Business Intelligence',
    ],
  },
];

const ExperienceSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            y: 100,
            opacity: 0,
            rotationX: 45,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
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
      

      // Animate each card with 3D rotation on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              rotationY: 90,
              rotationX: 20,
              opacity: 0,
              x: 100,
            },
            {
              rotationY: 0,
              rotationX: 0,
              opacity: 1,
              x: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Add hover 3D effect
          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
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
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % EXPERIENCE.length;
      gsap.fromTo(`.slide-${next}`,
        {
          scale: 0.8,
          rotationY: 180,
          opacity: 0,
        },
        {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        }
      );
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + EXPERIENCE.length) % EXPERIENCE.length;
      gsap.fromTo(`.slide-${next}`,
        {
          scale: 0.8,
          rotationY: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        }
      );
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-gradient-to-br from-gray-900 via-[#0A0A0A] to-black rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden perspective-1000"
    >
      {/* 3D Animated Background with neon particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-cyan-500/10" />
        <div className="absolute inset-0 opacity-20" />

        {/* Animated glowing orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotateZ: [0, 360, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 3D Title */}
      <div ref={titleRef} className="mb-16 sm:mb-20 md:mb-28" style={{ transformStyle: 'preserve-3d' }}>
        <h2
          className="text-center font-black uppercase bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          Experience
        </h2>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* 3D Slider Container */}
      <div ref={containerRef} className="relative mx-auto max-w-5xl">
        {/* 3D Navigation Buttons */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-black/60 transition-all duration-300 group"
          whileHover={{ scale: 1.1, x: -5, rotateY: 15 }}
          whileTap={{ scale: 0.9 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-black/60 transition-all duration-300 group"
          whileHover={{ scale: 1.1, x: 5, rotateY: -15 }}
          whileTap={{ scale: 0.9 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Main Content with 3D Cards */}
        <div className="relative min-h-[600px] overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className={`slide-${currentIndex} w-full`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={(el) => {
                  if (el) cardsRef.current[currentIndex] = el;
                }}
                className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden transform-gpu cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Border Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Glass morphism effect */}
                <div className="absolute inset-0 backdrop-blur-3xl" />
                
                <div className="relative p-6 sm:p-8 md:p-12">
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {/* 3D Number */}
                    <motion.div
                      className="font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-none"
                      style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                      animate={{ 
                        rotateX: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                    >
                      {EXPERIENCE[currentIndex].number}
                    </motion.div>

                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                      {/* Period + type */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <motion.span
                          className="font-light uppercase tracking-widest text-white/40"
                          style={{ fontSize: 'clamp(0.6rem, 1vw, 0.78rem)' }}
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {EXPERIENCE[currentIndex].period}
                        </motion.span>
                        <span className="text-white/15 text-xs">·</span>
                        <motion.span
                          className="inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-3 py-0.5 font-light uppercase tracking-widest text-white/40 backdrop-blur-sm"
                          style={{ fontSize: 'clamp(0.58rem, 0.95vw, 0.74rem)' }}
                          whileHover={{ scale: 1.05, rotateX: 10 }}
                        >
                          {EXPERIENCE[currentIndex].type}
                        </motion.span>
                      </div>

                      {/* Role with 3D text */}
                      <motion.h3
                        className="font-medium uppercase text-white leading-tight"
                        style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                        whileHover={{ 
                          scale: 1.02,
                          textShadow: "0 5px 15px rgba(255,255,255,0.1)",
                          rotateX: 5
                        }}
                      >
                        {EXPERIENCE[currentIndex].role}
                      </motion.h3>

                      {/* Company + location */}
                      <div className="flex flex-wrap items-center gap-2">
                        <motion.span
                          className="font-light text-white/60"
                          style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)' }}
                          whileHover={{ x: 5 }}
                        >
                          {EXPERIENCE[currentIndex].company}
                        </motion.span>
                        <span className="text-white/15 text-xs">·</span>
                        <motion.span
                          className="font-light uppercase tracking-wider text-white/30"
                          style={{ fontSize: 'clamp(0.65rem, 1vw, 0.82rem)' }}
                          whileHover={{ x: -5 }}
                        >
                          {EXPERIENCE[currentIndex].location}
                        </motion.span>
                      </div>

                      {/* Description */}
                      <motion.p
                        className="font-light leading-relaxed text-white max-w-2xl"
                        style={{
                          fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                          opacity: 0.5,
                        }}
                        whileHover={{ opacity: 0.7, x: 5 }}
                      >
                        {EXPERIENCE[currentIndex].description}
                      </motion.p>

                      {/* 3D Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {EXPERIENCE[currentIndex].tags.map((tag, idx) => (
                          <motion.span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/50 hover:border-purple-500/50 hover:text-white/90 hover:bg-purple-500/10 transition-all duration-300 cursor-default backdrop-blur-sm"
                            style={{ fontSize: 'clamp(0.62rem, 1vw, 0.8rem)' }}
                            whileHover={{ 
                              scale: 1.1,
                              rotateZ: Math.random() * 10 - 5,
                              y: -5
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D Card Shadow */}
                <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none" style={{ boxShadow: 'inset 0 0 50px rgba(255,255,255,0.05)' }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8 sm:mt-12">
          {EXPERIENCE.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-3 rounded-full transition-all duration-500 ${
                idx === currentIndex 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 w-12' 
                  : 'bg-white/30 w-3 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.3, rotateX: 360 }}
              animate={idx === currentIndex ? {
                scale: [1, 1.2, 1],
                boxShadow: ['0 0 0 0 rgba(168,85,247,0.7)', '0 0 0 10px rgba(168,85,247,0)', '0 0 0 0 rgba(168,85,247,0)']
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>

        {/* 3D Counter */}
        <motion.div 
          className="text-center mt-6"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-sm font-light text-white/40 inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            {String(currentIndex + 1).padStart(2, '0')} / {String(EXPERIENCE.length).padStart(2, '0')}
          </span>
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes float3D {
          0%, 100% { transform: translateZ(0px) rotateX(0deg); }
          50% { transform: translateZ(50px) rotateX(5deg); }
        }
        
        .card-3d {
          animation: float3D 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;