'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CosmicNavigation from '@/components/CosmicNavigation'
import { Star, MessageSquare, Users, Zap, Rocket, Sparkles } from 'lucide-react'

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        const parallax = parallaxRef.current
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: Star,
      title: 'Cosmic Design',
      description: 'Immerse yourself in a space-themed interface with dynamic nebula backgrounds'
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Engage in meaningful discussions with fellow space enthusiasts'
    },
    {
      icon: Users,
      title: 'User Profiles',
      description: 'Showcase your cosmic journey with personalized space-themed profiles'
    },
    {
      icon: Zap,
      title: 'Real-time Chat',
      description: 'Connect instantly with community members through our cosmic chat system'
    },
    {
      icon: Rocket,
      title: 'Blog Platform',
      description: 'Share your thoughts and discoveries with the community'
    },
    {
      icon: Sparkles,
      title: 'Interactive UI',
      description: 'Experience smooth animations and responsive design'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CosmicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div ref={parallaxRef} className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 cosmic-gradient rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-500 rounded-full blur-3xl float-animation"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl float-animation"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 cosmic-gradient-text cosmic-text-glow">
              Z.AI
            </h1>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8 cosmic-text-glow">
              Cosmic Blog & Forum
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join our futuristic community where technology meets the cosmos. 
              Share ideas, engage in discussions, and explore the universe together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="cosmic-gradient cosmic-glow-hover text-lg px-8 py-4">
                <Rocket className="w-5 h-5 mr-2" />
                Explore Community
              </Button>
              <Button size="lg" variant="outline" className="cosmic-border cosmic-glow-hover text-lg px-8 py-4">
                <Sparkles className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 star-twinkle"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-gradient-text">
              Cosmic Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of community platforms with our space-themed features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="cosmic-card cosmic-border h-full cosmic-glow-hover transform transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 cosmic-gradient rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white cosmic-text-glow">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-gradient-text">
              Join Our Cosmic Community
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Be part of a growing community of space enthusiasts, tech lovers, and creative minds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="cosmic-card cosmic-border p-6">
                <div className="text-3xl font-bold cosmic-gradient-text mb-2">10K+</div>
                <div className="text-gray-300">Active Members</div>
              </div>
              <div className="cosmic-card cosmic-border p-6">
                <div className="text-3xl font-bold cosmic-gradient-text mb-2">500+</div>
                <div className="text-gray-300">Daily Posts</div>
              </div>
              <div className="cosmic-card cosmic-border p-6">
                <div className="text-3xl font-bold cosmic-gradient-text mb-2">50+</div>
                <div className="text-gray-300">Topics</div>
              </div>
            </div>
            <Button size="lg" className="cosmic-gradient cosmic-glow-hover text-lg px-8 py-4">
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-purple-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 cosmic-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold cosmic-gradient-text">Z.AI</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 Z.AI Cosmic Community. All rights reserved.</p>
              <p className="text-sm mt-1">Exploring the universe together.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}