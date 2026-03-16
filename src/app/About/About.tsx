'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const About = () => {
  const aboutFormRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const banner = {
    name: 'About Hikvision Dubai',
    subtitle: 'Our Story',
    tagline: 'With over a decade of expertise, we provide comprehensive security solutions combining cutting-edge technology with professional service to protect what matters most to you.',
    buttons: [
      { text: 'Learn More', variant: 'outline' }
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0',
  };

  // --- Animation Variants ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Observer for sections
  const [refAbout, inViewAbout] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refMission, inViewMission] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refValues, inViewValues] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={banner.image}
            alt={banner.title}
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
              <span className="text-gray-500 uppercase">HIK</span><span className="text-red-500">VISION</span> DUBAI - INNOVATING SECURITY SOLUTIONS
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
                  onClick={scrollToAbout}
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

      {/* About Section */}
      <div ref={refAbout} className="bg-gray-50 flex items-center justify-center p-4 py-16">
        <motion.div
          className="w-full max-w-6xl bg-white rounded-lg shadow-sm p-8 lg:p-12"
          variants={sectionVariants}
          initial="hidden"
          animate={inViewAbout ? "visible" : "hidden"}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column */}
            <div ref={aboutFormRef} className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Who We Are <span className="text-red-600 uppercase">Hik<span className="text-gray-500 uppercase">vision</span></span>
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Hikvision Dubai is a premier provider of advanced security solutions in the UAE. With a proven track record of excellence, we specialize in delivering cutting-edge surveillance systems, access control, and comprehensive security infrastructure for businesses, organizations, and residences.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our commitment to innovation and customer satisfaction has made us a trusted partner for thousands of clients across the region. We combine world-class technology with professional expertise to create tailored security solutions that meet your unique needs.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">500+</h3>
                  <p className="text-sm text-gray-600">Satisfied Customers</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">10+</h3>
                  <p className="text-sm text-gray-600">Years of Experience</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">24/7</h3>
                  <p className="text-sm text-gray-600">Technical Support</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">100%</h3>
                  <p className="text-sm text-gray-600">Quality Assurance</p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              className="relative h-96 lg:h-auto rounded-lg overflow-hidden shadow-lg"
              variants={cardVariants}
              initial="hidden"
              animate={inViewAbout ? "visible" : "hidden"}
            >
              <Image
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=870&auto=format&fit=crop"
                alt="Hikvision Dubai Team"
                fill
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div ref={refMission} className="bg-white flex items-center justify-center p-4 py-16">
        <motion.div
          className="w-full max-w-6xl"
          variants={sectionVariants}
          initial="hidden"
          animate={inViewMission ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dedicated to providing innovative security solutions that protect your assets and give you peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-50 rounded-lg p-8 shadow-sm"
              variants={cardVariants}
              initial="hidden"
              animate={inViewMission ? "visible" : "hidden"}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-4">Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver world-class security solutions through innovative technology, professional expertise, and exceptional customer service. We are committed to protecting what matters most to our clients.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-lg p-8 shadow-sm"
              variants={cardVariants}
              initial="hidden"
              animate={inViewMission ? "visible" : "hidden"}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-4">Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading security solutions provider in the Middle East, known for innovation, reliability, and unwavering commitment to customer success and satisfaction.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      
    </>
  );
};

export default About;
