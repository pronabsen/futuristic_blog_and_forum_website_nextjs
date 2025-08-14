'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Star, MessageSquare, User, Edit, Home } from 'lucide-react'

export default function CosmicNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/topics', label: 'Topics', icon: Star },
    { href: '/blog', label: 'Blog', icon: Edit },
    { href: '/forum', label: 'Forum', icon: MessageSquare },
    { href: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 cosmic-card border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 cosmic-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold cosmic-gradient-text">Z.AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors cosmic-glow-hover px-3 py-2 rounded-lg"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
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
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-purple-500/10"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg">{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="cosmic-border cosmic-glow-hover">
              Sign In
            </Button>
            <Button className="cosmic-gradient cosmic-glow-hover">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}