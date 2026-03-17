'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ChevronRight, Shield, AlertTriangle, RefreshCw } from 'lucide-react';

const Retail = () => {
  const router = useRouter();
  const retailFormRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    retailFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    router.push('/Contact');
  };

  const banner = {
    name: 'Retail Solutions',
    subtitle: 'Security for Retail',
    tagline:
      'Comprehensive security and analytics solutions designed specifically for retail environments. Protect your inventory, staff, and customers with cutting-edge surveillance and access control systems.',
    buttons: [{ text: 'Learn More', variant: 'outline' }],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0',
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
  const [refRetail, inViewRetail] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: 'Advanced Visual Surveillance',
      description:
        'High-resolution IP camera systems with intelligent video analytics provide comprehensive coverage of all retail zones, enabling proactive threat detection and detailed incident investigation.',
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: 'Access Control & Management',
      description:
        'Multi-layer access control systems protect restricted areas including stockrooms, cash offices, and staff zones with real-time monitoring and audit trails for compliance.',
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-red-500" />,
      title: 'Business Intelligence & Analytics',
      description:
        'Harness data-driven insights through footfall tracking, customer behavior analysis, and operational metrics to optimize store layouts, staffing, and customer engagement strategies.',
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/10 to-slate-900/40" />
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
              <span className="text-gray-500 uppercase">RETAIL</span>
              <span className="text-red-500"> SOLUTIONS</span>
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
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Hikvision retail security team"
                fill
                className="object-cover"
              />
            </div>

            {/* Front image – smaller, overlaps bottom-right */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[62%] rounded-lg overflow-hidden shadow-2xl border-2 border-red-500/40 z-10">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop"
                alt="Hikvision Dubai retail surveillance"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative teal dot / glow accent */}
            <div className="absolute bottom-6 left-[28%] w-10 h-10 bg-red-500/20 rounded-full blur-xl z-0" />
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-red-400/50 rounded-full z-20" />
          </motion.div>

          {/* Right – Text */}
          <motion.div variants={fadeInRight} className="flex flex-col gap-5">
            <span className="text-red-500 text-xs font-semibold uppercase tracking-widest">
              Retail Security Solutions
            </span>

            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-snug">
              Transform Your Retail Operations With Intelligent Security Solutions
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              We provide comprehensive security infrastructure designed for modern retail businesses. Our integrated systems combine advanced surveillance technology, real-time threat detection, and business intelligence tools to maximize operational efficiency while safeguarding your premises, inventory, and customers around the clock.
            </p>

            <div>
              <button onClick={handleContactClick} className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded transition-colors duration-300">
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services / Features Section ── */}
      <section ref={retailFormRef} className="bg-white py-20 px-4 md:px-8 lg:px-16">
        {/* Decorative teal wave / background accent */}
        <div className="relative max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            ref={refFeatures}
            variants={sectionVariants}
            initial="hidden"
            animate={inViewFeatures ? 'visible' : 'hidden'}
            className="text-center mb-14"
          >
            <span className="text-red-500 text-xs font-semibold uppercase tracking-widest block mb-3">
              Our Retail Solutions
            </span>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-snug max-w-xl mx-auto">
              Comprehensive Solutions for Modern Retail Challenges
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Our integrated security ecosystem delivers end-to-end protection and operational visibility, enabling retailers to make smarter decisions, reduce losses, and enhance customer experiences across all touchpoints.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inViewFeatures ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
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

export default Retail;