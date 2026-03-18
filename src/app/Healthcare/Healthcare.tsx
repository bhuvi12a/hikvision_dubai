'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ChevronRight, Heart, Activity, Shield, Users, Clock, AlertCircle } from 'lucide-react';

const Healthcare = () => {
  const router = useRouter();
  const healthcareFormRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    healthcareFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    router.push('/Contact');
  };

  const banner = {
    name: 'Healthcare Solutions',
    subtitle: 'Security for Healthcare',
    tagline:
      'Hikvision Dubai delivers advanced security and patient monitoring solutions designed specifically for healthcare environments. Protect patients, staff, and sensitive areas with intelligent surveillance and access control systems tailored for the UAE healthcare sector.',
    buttons: [{ text: 'Learn More', variant: 'outline' }],
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0',
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
  const [refHealthcare, inViewHealthcare] = useInView({
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
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Patient & Staff Safety',
      description:
        'Comprehensive monitoring solutions that ensure the safety of patients and healthcare workers. Real-time alert systems for emergency situations, wandering patient detection, and duress alarms for staff protection.',
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: 'Controlled Access Management',
      description:
        'Multi-tiered access control for sensitive areas including operating rooms, pharmacies, mental health units, and neonatal wards. Ensure only authorized personnel enter restricted zones with detailed audit trails.',
    },
    {
      icon: <Activity className="w-8 h-8 text-red-500" />,
      title: 'Asset & Inventory Protection',
      description:
        'Track and secure expensive medical equipment, pharmaceutical inventory, and controlled substances. RFID integration and motion-activated surveillance prevent theft and ensure regulatory compliance.',
    },
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: 'Visitor Management',
      description:
        'Streamlined visitor check-in systems that maintain patient privacy while ensuring safe visiting hours. Monitor waiting areas and manage crowd flow during peak hours or emergency situations.',
    },
    {
      icon: <Clock className="w-8 h-8 text-red-500" />,
      title: '24/7 Remote Monitoring',
      description:
        'Round-the-clock surveillance with immediate response protocols. Integration with local emergency services and security personnel for rapid incident response across multiple facility locations.',
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      title: 'Emergency Preparedness',
      description:
        'Advanced early warning systems for fire, security breaches, or medical emergencies. Automated lockdown protocols and evacuation assistance to protect patients and staff during critical situations.',
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
              <span className="text-gray-500 uppercase">HEALTHCARE</span>
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
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop"
                alt="Healthcare security team"
                fill
                className="object-cover"
              />
            </div>

            {/* Front image – smaller, overlaps bottom-right */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[62%] rounded-lg overflow-hidden shadow-2xl border-2 border-red-500/40 z-10">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
                alt="Hospital surveillance system"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative red accent */}
            <div className="absolute bottom-6 left-[28%] w-10 h-10 bg-red-500/20 rounded-full blur-xl z-0" />
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-red-400/50 rounded-full z-20" />
          </motion.div>

          {/* Right – Text */}
          <motion.div variants={fadeInRight} className="flex flex-col gap-5">
            <span className="text-red-500 text-xs font-semibold uppercase tracking-widest">
              Healthcare Security Solutions
            </span>

            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-snug">
              Protecting What Matters Most: Patients, Staff, and Critical Assets
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Hikvision Dubai understands that healthcare facilities face unique security challenges requiring specialized solutions. Our integrated systems combine advanced surveillance technology, intelligent access control, and patient monitoring features to create safe, compliant, and efficient environments. From emergency rooms to pharmaceutical storage, we ensure every area is protected while maintaining the compassionate atmosphere essential for patient care across hospitals and clinics throughout Dubai and the UAE.
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
      <section ref={healthcareFormRef} className="bg-white py-20 px-4 md:px-8 lg:px-16">
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
              Our Healthcare Solutions
            </span>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-snug max-w-xl mx-auto">
              Comprehensive Security for Modern Healthcare Facilities
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Hikvision Dubai's healthcare-focused security ecosystem delivers end-to-end protection while supporting patient privacy, regulatory compliance, and operational efficiency across hospitals, clinics, and long-term care facilities in the UAE region.
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

export default Healthcare;