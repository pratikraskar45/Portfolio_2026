import FadeIn from './FadeIn';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    title: 'Backend Development',
    description:
      'Building reliable and scalable backend applications using Java, Spring Boot, Spring Data JPA, Hibernate, and JDBC, with a focus on clean architecture, business logic, and maintainable code.',
  },
  {
    number: '02',
    title: 'REST API Development',
    description:
      'Designing and developing RESTful APIs for authentication, CRUD operations, business workflows, search, filtering, and application integration using Spring Boot and Spring Data JPA.',
  },
  {
    number: '03',
    title: 'React Frontend Development',
    description:
      'Building responsive and user-friendly frontend interfaces using React.js, JavaScript, HTML5, and CSS3, with seamless integration with backend REST APIs.',
  },
  {
    number: '04',
    title: 'Database & Full Stack Integration',
    description:
      'Designing database entities and relationships and integrating backend services with MySQL and PostgreSQL to build complete full-stack applications with reliable data management.',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Updated Header with gradient and animated underline */}
      <div className="relative mb-16 sm:mb-20 md:mb-28">
        <h2
          className="text-center font-black uppercase bg-gradient-to-r from-[#0C0C0C] via-gray-600 to-[#0C0C0C] bg-clip-text text-transparent leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#0C0C0C]/60 to-transparent rounded-full"
          animate={{ 
            width: ["0%", "100%", "0%"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Rest of the content - unchanged */}
      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === SERVICES.length - 1
                  ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }
                  : {}),
              }}
            >
              <div
                className="shrink-0 font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </div>

              <div className="group flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] leading-tight relative inline-block w-fit"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#0C0C0C]/60 transition-all duration-500 group-hover:w-full" />
                </h3>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;