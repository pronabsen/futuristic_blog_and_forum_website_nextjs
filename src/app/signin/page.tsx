'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import CosmicNavigation from '@/components/CosmicNavigation'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Star, 
  Sparkles, 
  Rocket, 
  Zap,
  ArrowRight,
  Github,
  Twitter,
  Chrome,
  Shield,
  Fingerprint
} from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', loginForm)
    // Handle login logic here
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup:', signupForm)
    // Handle signup logic here
  }

  const features = [
    {
      icon: Star,
      title: 'Exclusive Content',
      description: 'Access premium articles, videos, and discussions'
    },
    {
      icon: Rocket,
      title: 'Advanced Features',
      description: 'Unlock powerful tools for content creation and community building'
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: 'Get help faster with dedicated customer support'
    }
  ]

  return (
    <div className="min-h-screen relative">
      <CosmicNavigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 cosmic-gradient rounded-full blur-3xl opacity-20 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 float-animation"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 float-animation"></div>
      </div>

      <div className="relative pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <Badge className="cosmic-gradient mb-4">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Welcome to DevCommunity
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 cosmic-gradient-text cosmic-text-glow">
                  Join Our Cosmic Community
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Connect with space enthusiasts, tech innovators, and creative minds from around the universe.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center space-x-2 p-4 cosmic-card cosmic-border rounded-lg"
              >
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">
                  Your data is secure with enterprise-grade encryption
                </span>
              </motion.div>
            </motion.div>

            {/* Right Side - Auth Forms */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="cosmic-card cosmic-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold cosmic-gradient-text cosmic-text-glow">
                    Access Your Portal
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Choose your preferred method to join the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="cosmic-card cosmic-border w-full grid grid-cols-2">
                      <TabsTrigger value="login" className="data-[state=active]:cosmic-gradient">
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger value="signup" className="data-[state=active]:cosmic-gradient">
                        Join Now
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email" className="text-white">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="Enter your email"
                              value={loginForm.email}
                              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                              className="cosmic-card cosmic-border pl-10 text-white placeholder-gray-400"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="login-password" className="text-white">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="login-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={loginForm.password}
                              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                              className="cosmic-card cosmic-border pl-10 pr-10 text-white placeholder-gray-400"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="remember"
                              checked={rememberMe}
                              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                              className="border-gray-600"
                            />
                            <Label htmlFor="remember" className="text-gray-300 text-sm">Remember me</Label>
                          </div>
                          <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                            Forgot password?
                          </Button>
                        </div>

                        <Button type="submit" className="w-full cosmic-gradient cosmic-glow-hover">
                          Sign In
                        </Button>
                      </form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button variant="outline" className="w-full cosmic-border cosmic-glow-hover">
                          <Github className="w-4 h-4 mr-2" />
                          Continue with GitHub
                        </Button>
                        <Button variant="outline" className="w-full cosmic-border cosmic-glow-hover">
                          <Chrome className="w-4 h-4 mr-2" />
                          Continue with Google
                        </Button>
                        <Button variant="outline" className="w-full cosmic-border cosmic-glow-hover">
                          <Twitter className="w-4 h-4 mr-2" />
                          Continue with Twitter
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="text-white">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Enter your full name"
                              value={signupForm.name}
                              onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                              className="cosmic-card cosmic-border pl-10 text-white placeholder-gray-400"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-white">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="Enter your email"
                              value={signupForm.email}
                              onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                              className="cosmic-card cosmic-border pl-10 text-white placeholder-gray-400"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-white">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={signupForm.password}
                              onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                              className="cosmic-card cosmic-border pl-10 pr-10 text-white placeholder-gray-400"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-confirm" className="text-white">Confirm Password</Label>
                          <div className="relative">
                            <Fingerprint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="signup-confirm"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              value={signupForm.confirmPassword}
                              onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                              className="cosmic-card cosmic-border pl-10 text-white placeholder-gray-400"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
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
                              Privacy Policy
                            </Button>
                          </Label>
                        </div>

                        <Button type="submit" className="w-full cosmic-gradient cosmic-glow-hover">
                          Create Account
                        </Button>
                      </form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-transparent text-gray-400">Or sign up with</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button variant="outline" className="w-full cosmic-border cosmic-glow-hover">
                          <Github className="w-4 h-4 mr-2" />
                          Sign up with GitHub
                        </Button>
                        <Button variant="outline" className="w-full cosmic-border cosmic-glow-hover">
                          <Chrome className="w-4 h-4 mr-2" />
                          Sign up with Google
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Quick Access */}
                  <div className="text-center">
                    <p className="text-sm text-gray-400">
                      Already have an account?{' '}
                      <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                        Sign in here
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}