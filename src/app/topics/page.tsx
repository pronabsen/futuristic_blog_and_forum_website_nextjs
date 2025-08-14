'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CosmicNavigation from '@/components/CosmicNavigation'
import VideoGrid from '@/components/VideoGrid'
import { Search, Star, MessageCircle, Users, TrendingUp, Plus, Filter, Video, FileText, Play } from 'lucide-react'

interface Topic {
  id: string
  title: string
  description: string
  posts: number
  members: number
  videos: number
  trending: boolean
  tags: string[]
  lastActivity: string
  contentType: 'text' | 'video' | 'mixed'
}

interface VideoContent {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  comments: number
  uploadDate: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
  category: string
  featured?: boolean
  trending?: boolean
}

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [filterCategory, setFilterCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('topics')

  const topics: Topic[] = [
    {
      id: '1',
      title: 'Space Exploration',
      description: 'Discuss the latest in space exploration, missions, and discoveries',
      posts: 1234,
      members: 5678,
      videos: 45,
      trending: true,
      tags: ['space', 'nasa', 'exploration'],
      lastActivity: '2 hours ago',
      contentType: 'mixed'
    },
    {
      id: '2',
      title: 'AI & Machine Learning',
      description: 'Explore the frontiers of artificial intelligence and machine learning',
      posts: 987,
      members: 4321,
      videos: 67,
      trending: true,
      tags: ['ai', 'ml', 'technology'],
      lastActivity: '1 hour ago',
      contentType: 'video'
    },
    {
      id: '3',
      title: 'Cosmic Art & Design',
      description: 'Share and discuss space-themed art, design, and creativity',
      posts: 654,
      members: 2345,
      videos: 23,
      trending: false,
      tags: ['art', 'design', 'creativity'],
      lastActivity: '5 hours ago',
      contentType: 'mixed'
    },
    {
      id: '4',
      title: 'Astronomy & Astrophysics',
      description: 'Deep dive into the science of stars, galaxies, and the universe',
      posts: 876,
      members: 3456,
      videos: 89,
      trending: true,
      tags: ['astronomy', 'physics', 'science'],
      lastActivity: '30 minutes ago',
      contentType: 'video'
    },
    {
      id: '5',
      title: 'Future Technology',
      description: 'Discuss emerging technologies and their impact on humanity',
      posts: 543,
      members: 1876,
      videos: 34,
      trending: false,
      tags: ['future', 'tech', 'innovation'],
      lastActivity: '4 hours ago',
      contentType: 'mixed'
    },
    {
      id: '6',
      title: 'Community Events',
      description: 'Stay updated on community meetups, webinars, and events',
      posts: 234,
      members: 1234,
      videos: 12,
      trending: false,
      tags: ['events', 'community', 'meetups'],
      lastActivity: '1 day ago',
      contentType: 'text'
    }
  ]

  const videos: VideoContent[] = [
    {
      id: '1',
      title: 'Mars Rover Latest Discoveries',
      description: 'Exclusive footage and analysis of the latest findings from the Mars rover mission',
      url: '/sample-video-1.mp4',
      thumbnail: '/sample-thumbnail-1.jpg',
      duration: '15:42',
      views: 15420,
      likes: 892,
      comments: 156,
      uploadDate: '2024-01-15',
      author: {
        name: 'Space Agency',
        avatar: '/avatar-1.jpg'
      },
      tags: ['mars', 'rover', 'discovery', 'nasa'],
      category: 'Space Exploration',
      featured: true,
      trending: true
    },
    {
      id: '2',
      title: 'Neural Networks Explained',
      description: 'Deep dive into how neural networks work and their applications in modern AI',
      url: '/sample-video-2.mp4',
      thumbnail: '/sample-thumbnail-2.jpg',
      duration: '22:15',
      views: 12350,
      likes: 756,
      comments: 89,
      uploadDate: '2024-01-14',
      author: {
        name: 'AI Research Lab',
        avatar: '/avatar-2.jpg'
      },
      tags: ['ai', 'neural-networks', 'machine-learning'],
      category: 'AI & Machine Learning',
      featured: false,
      trending: true
    },
    {
      id: '3',
      title: 'Creating Cosmic Art in Photoshop',
      description: 'Step-by-step tutorial on creating stunning space-themed digital art',
      url: '/sample-video-3.mp4',
      thumbnail: '/sample-thumbnail-3.jpg',
      duration: '18:30',
      views: 8765,
      likes: 543,
      comments: 67,
      uploadDate: '2024-01-13',
      author: {
        name: 'Digital Artist Pro',
        avatar: '/avatar-3.jpg'
      },
      tags: ['art', 'photoshop', 'cosmic', 'tutorial'],
      category: 'Cosmic Art & Design',
      featured: true,
      trending: false
    },
    {
      id: '4',
      title: 'Black Holes: The Complete Guide',
      description: 'Everything you need to know about black holes, from formation to recent discoveries',
      url: '/sample-video-4.mp4',
      thumbnail: '/sample-thumbnail-4.jpg',
      duration: '28:45',
      views: 21340,
      likes: 1234,
      comments: 234,
      uploadDate: '2024-01-12',
      author: {
        name: 'Astrophysics Institute',
        avatar: '/avatar-4.jpg'
      },
      tags: ['black-holes', 'physics', 'space', 'astronomy'],
      category: 'Astronomy & Astrophysics',
      featured: true,
      trending: true
    }
  ]

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = filterCategory === 'all' || topic.tags.includes(filterCategory)
    
    return matchesSearch && matchesCategory
  })

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.members - a.members
      case 'active':
        return b.posts - a.posts
      case 'videos':
        return b.videos - a.videos
      case 'recent':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen relative">
      <CosmicNavigation />
      
      {/* Header */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 cosmic-gradient-text cosmic-text-glow">
              Topic Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our cosmic community topics with both text discussions and video content
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search topics, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cosmic-card cosmic-border pl-10 text-white placeholder-gray-400"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="cosmic-card cosmic-border text-white w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="cosmic-card cosmic-border">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
                <SelectItem value="videos">Most Videos</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="cosmic-card cosmic-border text-white w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="cosmic-card cosmic-border">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="space">Space</SelectItem>
                <SelectItem value="ai">AI & Tech</SelectItem>
                <SelectItem value="art">Art & Design</SelectItem>
                <SelectItem value="science">Science</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Create Topic Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <Button className="cosmic-gradient cosmic-glow-hover">
              <Plus className="w-5 h-5 mr-2" />
              Create New Topic
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="relative pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="cosmic-card cosmic-border w-full justify-start mb-8">
              <TabsTrigger value="topics" className="data-[state=active]:cosmic-gradient">
                <FileText className="w-4 h-4 mr-2" />
                Topics
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:cosmic-gradient">
                <Video className="w-4 h-4 mr-2" />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="topics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="cosmic-card cosmic-border h-full cosmic-glow-hover transform transition-all duration-300 hover:scale-105">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white cosmic-text-glow mb-2">
                              {topic.title}
                            </CardTitle>
                            {topic.trending && (
                              <Badge className="cosmic-gradient mb-2">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardDescription className="text-gray-300">
                          {topic.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {topic.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="cosmic-border text-gray-300">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Content Type Indicator */}
                        <div className="flex items-center space-x-2 mb-4">
                          <Badge variant="outline" className="cosmic-border text-gray-300">
                            {topic.contentType === 'video' ? (
                              <>
                                <Video className="w-3 h-3 mr-1" />
                                Video Focus
                              </>
                            ) : topic.contentType === 'text' ? (
                              <>
                                <FileText className="w-3 h-3 mr-1" />
                                Text Focus
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 mr-1" />
                                Mixed Content
                              </>
                            )}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{topic.posts}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Video className="w-4 h-4" />
                              <span>{topic.videos}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{topic.members}</span>
                            </div>
                          </div>
                          <div className="text-xs">
                            {topic.lastActivity}
                          </div>
                        </div>
                        <Button className="w-full mt-4 cosmic-gradient cosmic-glow-hover">
                          Join Discussion
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {sortedTopics.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Star className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">No topics found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <VideoGrid 
                videos={videos} 
                title="Topic Videos"
                showFilters={true}
                showSort={true}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}