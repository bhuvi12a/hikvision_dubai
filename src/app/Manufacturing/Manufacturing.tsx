'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ChevronRight, Factory, Shield, AlertTriangle, Users, Clock, HardHat, Wrench, Package, Truck, Camera, Zap, Thermometer } from 'lucide-react';

const Manufacturing = () => {
  const router = useRouter();
  const manufacturingFormRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    manufacturingFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    router.push('/Contact');
  };

  const banner = {
    name: 'Manufacturing Security Solutions',
    subtitle: 'Protecting Industry 4.0',
    tagline:
      'Hikvision Dubai provides comprehensive security and safety solutions for modern manufacturing facilities. Protect assets, ensure worker safety, and maintain operational continuity with intelligent surveillance, access control, and industrial monitoring systems designed for the UAE industrial sector.',
    buttons: [{ text: 'Discover Solutions', variant: 'outline' }],
    image:
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0',
  };

  // --- Animation Variants ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Observer for sections
  const [refAbout, inViewAbout] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refFeatures, inViewFeatures] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Factory className="w-8 h-8 text-red-600" />,
      title: 'Perimeter Security',
      description:
        'Robust intrusion detection systems for manufacturing facility boundaries. Video analytics, thermal imaging, and motion sensors to prevent unauthorized access and protect against external threats.',
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: 'Industrial Access Control',
      description:
        'Multi-layered access management for production floors, control rooms, and hazardous areas. Biometric verification, keycard systems, and time-based access restrictions for contractors and employees.',
    },
    {
      icon: <Camera className="w-8 h-8 text-red-600" />,
      title: 'Production Floor Surveillance',
      description:
        'High-definition cameras with industrial-grade housing to withstand dust, vibration, and temperature extremes. Monitor critical processes, equipment status, and personnel activity in real-time.',
    },
    {
      icon: <HardHat className="w-8 h-8 text-red-600" />,
      title: 'Worker Safety Monitoring',
      description:
        'AI-powered safety systems that detect PPE compliance, unsafe behaviors, and hazardous zone entry. Automated alerts for supervisors when safety protocols are breached.',
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      title: 'Industrial Alarm Integration',
      description:
        'Seamless integration with existing industrial alarms for fire, gas leaks, equipment failure, and environmental hazards. Centralized monitoring and automated emergency protocols.',
    },
    {
      icon: <Package className="w-8 h-8 text-red-600" />,
      title: 'Inventory & Asset Protection',
      description:
        'Track raw materials, work-in-progress, and finished goods with RFID and video verification. Prevent theft, reduce shrinkage, and optimize inventory management.',
    },
    
  
  ];

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={banner.image}
            alt={banner.name}
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/60" />
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-white/90 text-sm md:text-base font-light tracking-wide mb-2"
            >
              {banner.subtitle}
            </motion.p>

            {/* Main Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider mb-2"
            >
              <span className="text-gray-300 uppercase">MANUFACTURING</span>
              <span className="text-red-500"> SECURITY</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="text-white text-base md:text-lg lg:text-xl font-normal mb-6"
            >
              {banner.tagline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {banner.buttons.map((button, btnIndex) => (
                <button
                  key={btnIndex}
                  onClick={scrollToSection}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    button.variant === 'solid'
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'border-2 border-white/60 text-white hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {button.text}
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── About Us Section ── */}
      <section className="bg-white py-20 px-4 md:px-8 lg:px-16">
        <motion.div
          ref={refAbout}
          variants={staggerContainer}
          initial="hidden"
          animate={inViewAbout ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left – Two Overlapping Images */}
          <motion.div variants={fadeInLeft} className="relative w-full h-80 md:h-[420px]">
            {/* Back image – larger, sits behind, offset top-left */}
            <div className="absolute top-0 left-0 w-[75%] h-[78%] rounded-lg overflow-hidden shadow-2xl border border-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFudWZhY3R1cmluZ3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Modern manufacturing facility"
                fill
                className="object-cover"
              />
            </div>

            {/* Front image – smaller, overlaps bottom-right */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[62%] rounded-lg overflow-hidden shadow-2xl border-2 border-red-500/40 z-10">
              <Image
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=800&auto=format&fit=crop"
                alt="Industrial security control room"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative redaccent */}
            <div className="absolute bottom-6 left-[28%] w-10 h-10 bg-red-500/20 rounded-full blur-xl z-0" />
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-red-400/50 rounded-full z-20" />
          </motion.div>

          {/* Right – Text */}
          <motion.div variants={fadeInRight} className="flex flex-col gap-5">
            <span className="text-red-600 text-xs font-semibold uppercase tracking-widest">
              Manufacturing Security Solutions
            </span>

            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-snug">
              Securing the Backbone of Industry
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Hikvision Dubai recognizes that modern manufacturing facilities face unique security challenges requiring specialized industrial solutions. Our comprehensive approach combines advanced surveillance technology, industrial-grade access control, and worker safety systems to create secure, efficient production environments. From automotive plants to pharmaceutical manufacturing throughout Dubai and the UAE, we help industrial leaders protect their assets, workforce, and operational continuity while maintaining productivity and regulatory compliance.
            </p>

            <div>
              <button onClick={handleContactClick} className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded transition-colors duration-300">
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services / Features Section ── */}
      <section ref={manufacturingFormRef} className="bg-white py-20 px-4 md:px-8 lg:px-16">
        <div className="relative max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            ref={refFeatures}
            variants={sectionVariants}
            initial="hidden"
            animate={inViewFeatures ? 'visible' : 'hidden'}
            className="text-center mb-14"
          >
            <span className="text-red-600 text-xs font-semibold uppercase tracking-widest block mb-3">
              Industrial Security Solutions
            </span>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-snug max-w-xl mx-auto">
              Comprehensive Protection for Modern Manufacturing
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Hikvision Dubai's manufacturing-focused security ecosystem delivers end-to-end protection while supporting operational efficiency, worker safety, and regulatory compliance across production facilities, warehouses, and industrial campuses in the UAE region.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inViewFeatures ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative bg-white border border-gray-200 rounded-xl p-8 flex flex-col gap-4 hover:border-red-400 hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                {/* top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

                <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-400/10 rounded-full blur-2xl group-hover:bg-red-400/20 transition-all duration-500" />

                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full border border-red-400/50 flex items-center justify-center bg-red-50 group-hover:border-red-500 group-hover:bg-red-100 transition-colors duration-300">
                  {service.icon}
                </div>

                <h3 className="text-gray-900 text-lg font-semibold leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Manufacturing;