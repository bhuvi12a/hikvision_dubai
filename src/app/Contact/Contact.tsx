"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import {  ChevronRight } from 'lucide-react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const contactFormRef = useRef<HTMLDivElement>(null);

  const bannerBackground = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0';

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const bannerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

   const banner = {
    name: 'Hikvision Dubai',
    subtitle: 'Premium Security Solutions',
    title: 'HIKVISION DUBAI - YOUR TRUSTED SECURITY PARTNER',
    tagline: 'Advanced surveillance and security systems designed to protect your business, home, and assets with cutting-edge technology.',
    buttons: [
        { text: 'Get in Touch', variant: 'outline' }
    ],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80',
};

    // --- Animation Variants (Replacing CSS classes) ---
    
    // This replaces .animate-fadeInUp
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    };

    // Stagger container for children
    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Adds the delay between items
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

    const iconAnimation: Variants = {
        hover: { scale: 1.15, rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }
    };

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };
  const bannerTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const bannerFadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  const bannerSlideInRightVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.4 },
    },
  };
  // Observer for the main banner
  const [refBanner, inViewBanner] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <>
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

                {/* Center Content - Replaced CSS classes with motion.div */}
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
                            {banner.title}
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
                                    onClick={scrollToContact}
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
      <div className="bg-gray-50 flex items-center justify-center p-4">

        <div className="w-full max-w-6xl bg-white rounded-lg shadow-sm p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Navigation Link */}

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Secure Your World with <span className="text-red-600 uppercase">Hik<span className="text-gray-500 uppercase">vision</span></span>
                </h1>
              </div>

              {/* Description Text */}
              <div>
                <p className="text-gray-600 leading-relaxed">
                  Hikvision Dubai delivers comprehensive security solutions including advanced CCTV systems, AI-powered surveillance, access control, and smart security technology. Our expert team provides customized solutions tailored to your specific needs, ensuring maximum protection for your business, home, or facility.
                </p>
              </div>

              {/* Contact Information Grid */}
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                {/* Call Center */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Call Center</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>+971554221947</p>
                   
                  </div>
                </div>

                {/* Our Location */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Our Location</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>19 27d Street - Al Souq Al Kabeer -</p>
                    <p>Dubai - United Arab Emirates</p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Email</h3>
                  <div className="text-sm text-gray-600">
                    <p>sales@hikvision-dubai.ae</p>
                  </div>
                </div>

                {/* Social Network */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Social network</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div ref={contactFormRef} className="bg-gray-50 rounded-lg p-8 lg:p-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact <span className='text-red-600 uppercase'>Hik</span><span className='text-gray-500 uppercase'>vision</span> Dubai</h2>
              <p className="text-sm text-gray-600 mb-8">
                Reach out to us for security consultations, quotes, or technical support. Our team will respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                  />
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">Thank you! Your inquiry has been received. Our security team will contact you shortly.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">Failed to submit inquiry. Please try again or contact us directly.</p>
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed transition font-medium w-full justify-center"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m10-10H2" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl h-96 bg-gray-200 rounded-lg shadow-sm overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.832!2d55.290032!3d25.261643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4315231ad5b5%3A0xf131be56bbb42bd2!2s19%2027d%20Street%2C%20Al%20Souq%20Al%20Kabeer%2C%20Dubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1710610800000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
};

export default Contact;