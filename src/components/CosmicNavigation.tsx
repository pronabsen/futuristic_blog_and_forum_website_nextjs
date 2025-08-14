'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Menu, 
  Star, 
  MessageSquare, 
  User, 
  Edit, 
  Home,
  LogIn,
  UserPlus,
  Bell,
  Settings,
  ChevronDown
} from 'lucide-react'

export default function CosmicNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Mock user state - in a real app, this would come from authentication context
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    name: 'Alex Cosmic',
    avatar: '/placeholder-avatar.jpg',
    notifications: 3
  })

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/topics', label: 'Topics', icon: Star },
    { href: '/blog', label: 'Blog', icon: Edit },
    { href: '/forum', label: 'Forum', icon: MessageSquare },
    { href: '/profile', label: 'Profile', icon: User, authRequired: true },
  ]

  const handleSignIn = () => {
    // In a real app, this would redirect to sign in
    window.location.href = '/signin'
  }

  const handleJoin = () => {
    // In a real app, this would redirect to join
    window.location.href = '/join'
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setUserMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 cosmic-card border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 cosmic-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <span className="text-xl font-bold cosmic-gradient-text">DevCommunity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.authRequired && !isAuthenticated) {
                return null
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors cosmic-glow-hover px-3 py-2 rounded-lg"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
                  <Bell className="w-5 h-5" />
                  {user.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {user.notifications}
                    </span>
                  )}
                </Button>

                {/* User Menu */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="cosmic-gradient text-white text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 cosmic-card cosmic-border rounded-lg shadow-lg">
                      <div className="p-2">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <hr className="my-2 border-gray-600" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors w-full text-left"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" className="cosmic-border cosmic-glow-hover" onClick={handleSignIn}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button className="cosmic-gradient cosmic-glow-hover" onClick={handleJoin}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="cosmic-card border-purple-500/20">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile User Section */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3 p-4 cosmic-card cosmic-border rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="cosmic-gradient text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-sm text-gray-400">Member</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full cosmic-border cosmic-glow-hover" 
                      onClick={handleSignIn}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button 
                      className="w-full cosmic-gradient cosmic-glow-hover" 
                      onClick={handleJoin}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join Community
                    </Button>
                  </div>
                )}

                <hr className="border-gray-600" />

                {/* Mobile Navigation Links */}
                {navItems.map((item) => {
                  if (item.authRequired && !isAuthenticated) {
                    return null
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-purple-500/10"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  )
                })}

                {/* Mobile User Menu (if authenticated) */}
                {isAuthenticated && (
                  <>
                    <hr className="border-gray-600" />
                    <Link
                      href="/settings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-purple-500/10"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="text-lg">Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-purple-500/10 w-full text-left"
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="text-lg">Sign Out</span>
                    </button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}