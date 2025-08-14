'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CosmicNavigation from '@/components/CosmicNavigation'
import { 
  Star, 
  Users, 
  Rocket, 
  Zap, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Heart,
  MessageSquare,
  Eye,
  Trophy,
  Gift,
  Shield,
  Globe,
  Calendar,
  Target,
  Lightbulb,
  Crown,
  Infinity,
  CreditCard,
  Banknote,
  Clock
} from 'lucide-react'

interface MembershipTier {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  color: string
  icon: React.ReactNode
}

interface CommunityStats {
  members: number
  posts: number
  videos: number
  countries: number
}

export default function JoinCommunityPage() {
  const [selectedTier, setSelectedTier] = useState('pro')
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    username: '',
    interests: [] as string[],
    experience: '',
    goals: '',
    agreeTerms: false,
    agreeGuidelines: false
  })

  const communityStats: CommunityStats = {
    members: 45678,
    posts: 123456,
    videos: 8934,
    countries: 156
  }

  const membershipTiers: MembershipTier[] = [
    {
      id: 'basic',
      name: 'Basic Explorer',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started with our community',
      features: [
        'Access to public discussions',
        'Basic content viewing',
        'Community events access',
        'Monthly newsletter'
      ],
      color: 'from-gray-600 to-gray-700',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'pro',
      name: 'Pro Voyager',
      price: '$9',
      period: '/month',
      description: 'Ideal for active community members',
      features: [
        'Everything in Basic',
        'Premium content access',
        'Video tutorials & courses',
        'Priority support',
        'Custom profile features',
        'Early access to new features'
      ],
      popular: true,
      color: 'from-purple-600 to-pink-600',
      icon: <Rocket className="w-6 h-6" />
    },
    {
      id: 'elite',
      name: 'Elite Cosmic',
      price: '$29',
      period: '/month',
      description: 'For serious creators and professionals',
      features: [
        'Everything in Pro',
        'Unlimited video uploads',
        'Advanced analytics',
        'Monetization tools',
        '1-on-1 mentoring',
        'Exclusive networking events',
        'API access',
        'Custom branding'
      ],
      color: 'from-yellow-600 to-orange-600',
      icon: <Crown className="w-6 h-6" />
    }
  ]

  const interests = [
    'Space Exploration', 'AI & Machine Learning', 'Cosmic Art', 'Astronomy',
    'Future Technology', 'Community Building', 'Digital Content Creation',
    'Physics & Science', 'Game Development', 'Virtual Reality'
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Space Technology Expert',
      avatar: '/avatar-1.jpg',
      content: 'Joining DevCommunity community transformed my career. The connections and knowledge shared here are invaluable!',
      tier: 'Elite Cosmic'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Digital Artist',
      avatar: '/avatar-2.jpg',
      content: 'The creative energy in this community is amazing. I\'ve grown so much as an artist here.',
      tier: 'Pro Voyager'
    },
    {
      name: 'Dr. James Park',
      role: 'Astrophysicist',
      avatar: '/avatar-3.jpg',
      content: 'Finally found a place where science and creativity merge perfectly. Highly recommended!',
      tier: 'Elite Cosmic'
    }
  ]

  const handleInterestChange = (interest: string, checked: boolean) => {
    setJoinForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Join form:', joinForm, 'Selected tier:', selectedTier)
    // Handle join logic here
  }

  return (
    <div className="min-h-screen relative">
      <CosmicNavigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 cosmic-gradient rounded-full blur-3xl opacity-20 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-20 float-animation"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20 float-animation"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="cosmic-gradient mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Join the Movement
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 cosmic-gradient-text cosmic-text-glow">
              Become Part of Our Cosmic Family
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with thousands of space enthusiasts, tech innovators, and creative minds from around the world.
            </p>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: Users, value: communityStats.members.toLocaleString(), label: 'Members' },
              { icon: MessageSquare, value: communityStats.posts.toLocaleString(), label: 'Posts' },
              { icon: Eye, value: communityStats.videos.toLocaleString(), label: 'Videos' },
              { icon: Globe, value: communityStats.countries.toLocaleString(), label: 'Countries' }
            ].map((stat, index) => (
              <Card key={stat.label} className="cosmic-card cosmic-border text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 cosmic-gradient-text mx-auto mb-2" />
                  <div className="text-2xl font-bold cosmic-gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="relative pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-gradient-text cosmic-text-glow">
              Choose Your Journey
            </h2>
            <p className="text-lg text-gray-300">
              Select the membership tier that best fits your goals and aspirations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${tier.popular ? 'transform scale-105' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="cosmic-gradient">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`cosmic-card cosmic-border h-full cosmic-glow-hover ${
                  selectedTier === tier.id ? 'ring-2 ring-purple-500' : ''
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                      {tier.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{tier.name}</CardTitle>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold cosmic-gradient-text">{tier.price}</span>
                      <span className="text-gray-400 ml-1">{tier.period}</span>
                    </div>
                    <CardDescription className="text-gray-300">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${selectedTier === tier.id ? 'cosmic-gradient' : 'cosmic-border'} cosmic-glow-hover`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {selectedTier === tier.id ? 'Selected' : 'Choose Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section className="relative pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="cosmic-card cosmic-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold cosmic-gradient-text cosmic-text-glow">
                  Complete Your Profile
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Tell us about yourself to get the most out of our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={joinForm.name}
                        onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                        className="cosmic-card cosmic-border text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={joinForm.email}
                        onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                        className="cosmic-card cosmic-border text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      placeholder="Choose a unique username"
                      value={joinForm.username}
                      onChange={(e) => setJoinForm({...joinForm, username: e.target.value})}
                      className="cosmic-card cosmic-border text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">Your Interests</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={joinForm.interests.includes(interest)}
                            onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                            className="border-gray-600"
                          />
                          <Label htmlFor={interest} className="text-gray-300 text-sm">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-white">Experience Level</Label>
                    <Select value={joinForm.experience} onValueChange={(value) => setJoinForm({...joinForm, experience: value})}>
                      <SelectTrigger className="cosmic-card cosmic-border text-white">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent className="cosmic-card cosmic-border">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals" className="text-white">What are your goals?</Label>
                    <Textarea
                      id="goals"
                      placeholder="Tell us what you hope to achieve in our community..."
                      value={joinForm.goals}
                      onChange={(e) => setJoinForm({...joinForm, goals: e.target.value})}
                      className="cosmic-card cosmic-border text-white placeholder-gray-400 min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={joinForm.agreeTerms}
                        onCheckedChange={(checked) => setJoinForm({...joinForm, agreeTerms: checked as boolean})}
                        className="border-gray-600"
                        required
                      />
                      <Label htmlFor="terms" className="text-gray-300 text-sm">
                        I agree to the{' '}
                        <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                          Terms of Service
                        </Button>{' '}
                        and{' '}
                        <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                          Community Guidelines
                        </Button>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="guidelines"
                        checked={joinForm.agreeGuidelines}
                        onCheckedChange={(checked) => setJoinForm({...joinForm, agreeGuidelines: checked as boolean})}
                        className="border-gray-600"
                        required
                      />
                      <Label htmlFor="guidelines" className="text-gray-300 text-sm">
                        I promise to be respectful and contribute positively to the community
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Selected tier: <span className="cosmic-gradient-text font-medium">
                        {membershipTiers.find(t => t.id === selectedTier)?.name}
                      </span>
                    </div>
                    <Button type="submit" className="cosmic-gradient cosmic-glow-hover">
                      Join Community <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-gradient-text cosmic-text-glow">
              What Our Members Say
            </h2>
            <p className="text-lg text-gray-300">
              Join thousands of satisfied community members
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="cosmic-card cosmic-border h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="cosmic-gradient text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white font-medium">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                        <Badge variant="outline" className="cosmic-border text-gray-300 text-xs mt-1">
                          {testimonial.tier}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}