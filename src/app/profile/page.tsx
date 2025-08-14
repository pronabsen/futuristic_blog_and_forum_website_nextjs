'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import CosmicNavigation from '@/components/CosmicNavigation'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Star, 
  Trophy, 
  MessageSquare, 
  Eye, 
  Heart,
  Edit,
  Share2,
  Settings,
  Activity,
  Award,
  Rocket,
  Zap,
  Sparkles,
  Globe,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface Activity {
  id: string
  type: 'post' | 'comment' | 'like' | 'achievement'
  title: string
  description: string
  timestamp: string
  data?: any
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const user = {
    name: 'Alex Cosmic',
    username: '@alexcosmic',
    email: 'alex@cosmic.community',
    location: 'San Francisco, CA',
    joinDate: '2023-06-15',
    bio: 'Space enthusiast, AI researcher, and digital artist. Exploring the intersection of technology and creativity in the cosmos.',
    avatar: '/placeholder-avatar.jpg',
    level: 25,
    experience: 7500,
    nextLevelExp: 10000,
    stats: {
      posts: 127,
      comments: 892,
      likesReceived: 3456,
      views: 25678
    },
    social: {
      github: 'alexcosmic',
      twitter: 'alexcosmic',
      linkedin: 'alex-cosmic'
    }
  }

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Created your first post',
      icon: '🚀',
      unlockedAt: '2023-06-16',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Community Star',
      description: 'Received 1000 likes on your posts',
      icon: '⭐',
      unlockedAt: '2023-08-22',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Discussion Master',
      description: 'Participated in 500 discussions',
      icon: '💬',
      unlockedAt: '2023-11-15',
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Cosmic Explorer',
      description: 'Reached level 25',
      icon: '🌌',
      unlockedAt: '2024-01-10',
      rarity: 'legendary'
    },
    {
      id: '5',
      title: 'Content Creator',
      description: 'Published 100 posts',
      icon: '✍️',
      unlockedAt: '2024-01-05',
      rarity: 'rare'
    }
  ]

  const activities: Activity[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'Achievement Unlocked',
      description: 'Cosmic Explorer - Reached level 25',
      timestamp: '2024-01-10T14:30:00Z',
      data: { achievementId: '4' }
    },
    {
      id: '2',
      type: 'post',
      title: 'New Post Published',
      description: 'The Future of AI in Space Exploration',
      timestamp: '2024-01-08T10:15:00Z',
      data: { postId: '123', views: 234, likes: 45 }
    },
    {
      id: '3',
      type: 'comment',
      title: 'Comment Posted',
      description: 'Great insights on Mars rover discoveries!',
      timestamp: '2024-01-07T16:45:00Z',
      data: { commentId: '456', likes: 12 }
    },
    {
      id: '4',
      type: 'like',
      title: 'Post Liked',
      description: 'Your post received 50 new likes',
      timestamp: '2024-01-06T09:20:00Z',
      data: { postId: '122', likes: 50 }
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500'
      case 'rare': return 'bg-blue-500'
      case 'epic': return 'bg-purple-500'
      case 'legendary': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return <Edit className="w-4 h-4" />
      case 'comment': return <MessageSquare className="w-4 h-4" />
      case 'like': return <Heart className="w-4 h-4" />
      case 'achievement': return <Trophy className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen relative">
      <CosmicNavigation />
      
      {/* Profile Header */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cosmic-card cosmic-border p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="cosmic-gradient text-white text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 cosmic-gradient rounded-full p-2">
                  <Badge className="cosmic-gradient text-white">
                    Level {user.level}
                  </Badge>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl font-bold cosmic-gradient-text cosmic-text-glow">
                    {user.name}
                  </h1>
                  <Badge className="cosmic-gradient">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Pro Member
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4">{user.username}</p>
                <p className="text-gray-300 mb-6 max-w-2xl">{user.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold cosmic-gradient-text">{user.stats.posts}</div>
                    <div className="text-sm text-gray-400">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold cosmic-gradient-text">{user.stats.comments}</div>
                    <div className="text-sm text-gray-400">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold cosmic-gradient-text">{user.stats.likesReceived}</div>
                    <div className="text-sm text-gray-400">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold cosmic-gradient-text">{user.stats.views}</div>
                    <div className="text-sm text-gray-400">Views</div>
                  </div>
                </div>

                {/* Experience Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Level {user.level}</span>
                    <span>{user.experience}/{user.nextLevelExp} XP</span>
                  </div>
                  <Progress 
                    value={(user.experience / user.nextLevelExp) * 100} 
                    className="h-2 cosmic-border"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button className="cosmic-gradient cosmic-glow-hover">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="cosmic-border cosmic-glow-hover">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button variant="outline" className="cosmic-border cosmic-glow-hover">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="relative pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="cosmic-card cosmic-border w-full justify-start mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:cosmic-gradient">
                Overview
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:cosmic-gradient">
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:cosmic-gradient">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="cosmic-card cosmic-border">
                  <CardHeader>
                    <CardTitle className="text-white cosmic-text-glow flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">{user.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="cosmic-card cosmic-border">
                  <CardHeader>
                    <CardTitle className="text-white cosmic-text-glow flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="cosmic-border cosmic-glow-hover">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button variant="outline" className="cosmic-border cosmic-glow-hover">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="outline" className="cosmic-border cosmic-glow-hover">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="cosmic-card cosmic-border">
                  <CardHeader>
                    <CardTitle className="text-white cosmic-text-glow flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="cosmic-gradient rounded-full p-2 mt-1">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{activity.title}</div>
                            <div className="text-gray-400 text-sm">{activity.description}</div>
                            <div className="text-gray-500 text-xs mt-1">
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="cosmic-border cosmic-glow-hover w-full mt-4">
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="cosmic-card cosmic-border h-full cosmic-glow-hover">
                        <CardHeader className="text-center">
                          <div className={`w-16 h-16 rounded-full ${getRarityColor(achievement.rarity)} flex items-center justify-center text-2xl mb-4 mx-auto`}>
                            {achievement.icon}
                          </div>
                          <CardTitle className="text-white cosmic-text-glow">
                            {achievement.title}
                          </CardTitle>
                          <Badge className={`${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-300 text-center mb-4">
                            {achievement.description}
                          </CardDescription>
                          <div className="text-center text-sm text-gray-400">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="cosmic-card cosmic-border">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <div className="cosmic-gradient rounded-full p-3">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{activity.title}</div>
                            <div className="text-gray-300">{activity.description}</div>
                            <div className="text-gray-500 text-sm mt-2">
                              {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}