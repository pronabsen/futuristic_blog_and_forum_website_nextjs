'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CosmicNavigation from '@/components/CosmicNavigation'
import { Search, MessageSquare, Users, Eye, Heart, Share2, Plus, Filter, ArrowUp, ArrowDown, Pin, Clock, Star, ThumbsUp, Reply, Flame, Video, Play } from 'lucide-react'

interface Thread {
  id: string
  title: string
  content: string
  type: 'text' | 'video' | 'mixed'
  videoUrl?: string
  videoThumbnail?: string
  videoDuration?: string
  author: {
    name: string
    avatar: string
    role: string
    level: number
  }
  topic: string
  tags: string[]
  createdAt: string
  lastActivity: string
  views: number
  replies: number
  likes: number
  isPinned: boolean
  isHot: boolean
  isLocked: boolean
}

interface Reply {
  id: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
    level: number
  }
  createdAt: string
  likes: number
  isAccepted: boolean
}

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filterTopic, setFilterTopic] = useState('all')
  const [activeTab, setActiveTab] = useState('threads')
  const [newReply, setNewReply] = useState('')

  const threads: Thread[] = [
    {
      id: '1',
      title: 'What are your thoughts on the latest Mars rover discoveries?',
      content: 'I\'ve been following the latest updates from the Mars rover mission and the findings are incredible. The evidence of ancient water activity is getting stronger...',
      type: 'mixed',
      videoUrl: '/mars-rover-video.mp4',
      videoThumbnail: '/mars-thumbnail.jpg',
      videoDuration: '8:45',
      author: {
        name: 'SpaceExplorer42',
        avatar: '/placeholder-avatar.jpg',
        role: 'Space Enthusiast',
        level: 15
      },
      topic: 'Space Exploration',
      tags: ['mars', 'rover', 'discovery', 'nasa'],
      createdAt: '2024-01-15T10:30:00Z',
      lastActivity: '2024-01-15T14:20:00Z',
      views: 1254,
      replies: 45,
      likes: 89,
      isPinned: true,
      isHot: true,
      isLocked: false
    },
    {
      id: '2',
      title: 'AI-generated art: Where do we draw the line?',
      content: 'With the rapid advancement of AI in creative fields, I\'m curious about the community\'s thoughts on AI-generated art. Should it be considered real art?',
      type: 'video',
      videoUrl: '/ai-art-video.mp4',
      videoThumbnail: '/ai-art-thumbnail.jpg',
      videoDuration: '15:30',
      author: {
        name: 'DigitalArtist',
        avatar: '/placeholder-avatar.jpg',
        role: 'Digital Creator',
        level: 22
      },
      topic: 'Cosmic Art & Design',
      tags: ['ai', 'art', 'creativity', 'ethics'],
      createdAt: '2024-01-14T16:45:00Z',
      lastActivity: '2024-01-15T12:30:00Z',
      views: 987,
      replies: 67,
      likes: 156,
      isPinned: false,
      isHot: true,
      isLocked: false
    },
    {
      id: '3',
      title: 'Best practices for building online communities',
      content: 'I\'m starting a new community platform and would love to hear from experienced community managers about what works and what doesn\'t.',
      type: 'text',
      author: {
        name: 'CommunityBuilder',
        avatar: '/placeholder-avatar.jpg',
        role: 'Community Manager',
        level: 18
      },
      topic: 'Community Events',
      tags: ['community', 'management', 'best-practices', 'engagement'],
      createdAt: '2024-01-13T09:15:00Z',
      lastActivity: '2024-01-15T11:45:00Z',
      views: 654,
      replies: 23,
      likes: 45,
      isPinned: false,
      isHot: false,
      isLocked: false
    },
    {
      id: '4',
      title: 'The physics behind nebula formations',
      content: 'Can someone explain the different types of nebulae and the physical processes that create them? I\'m particularly interested in star-forming regions.',
      type: 'video',
      videoUrl: '/nebulae-physics-video.mp4',
      videoThumbnail: '/nebulae-thumbnail.jpg',
      videoDuration: '12:20',
      author: {
        name: 'AstroStudent',
        avatar: '/placeholder-avatar.jpg',
        role: 'Physics Student',
        level: 8
      },
      topic: 'Astronomy & Astrophysics',
      tags: ['nebulae', 'physics', 'astronomy', 'star-formation'],
      createdAt: '2024-01-12T14:20:00Z',
      lastActivity: '2024-01-15T10:15:00Z',
      views: 1432,
      replies: 34,
      likes: 78,
      isPinned: false,
      isHot: false,
      isLocked: false
    }
  ]

  const replies: Reply[] = [
    {
      id: '1',
      content: 'Great question! The latest findings from Perseverance are indeed fascinating. The discovery of organic molecules in the Jezero Crater samples is particularly significant...',
      author: {
        name: 'MarsScientist',
        avatar: '/placeholder-avatar.jpg',
        role: 'Planetary Scientist',
        level: 25
      },
      createdAt: '2024-01-15T11:30:00Z',
      likes: 23,
      isAccepted: true
    },
    {
      id: '2',
      content: 'I agree! The implications for potential past microbial life are huge. What I find most interesting is the diversity of mineral compositions they\'re finding...',
      author: {
        name: 'GeoEnthusiast',
        avatar: '/placeholder-avatar.jpg',
        role: 'Geology Hobbyist',
        level: 12
      },
      createdAt: '2024-01-15T12:15:00Z',
      likes: 15,
      isAccepted: false
    }
  ]

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesTopic = filterTopic === 'all' || thread.topic === filterTopic
    
    return matchesSearch && matchesTopic
  })

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      case 'popular':
        return b.views - a.views
      case 'replies':
        return b.replies - a.replies
      case 'likes':
        return b.likes - a.likes
      default:
        return 0
    }
  })

  const topics = ['all', ...Array.from(new Set(threads.map(t => t.topic)))]

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
              Forum
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join discussions, share knowledge, and connect with fellow cosmic explorers
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
                placeholder="Search discussions, tags, or authors..."
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
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Viewed</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
                <SelectItem value="likes">Most Liked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTopic} onValueChange={setFilterTopic}>
              <SelectTrigger className="cosmic-card cosmic-border text-white w-full md:w-48">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent className="cosmic-card cosmic-border">
                {topics.map(topic => (
                  <SelectItem key={topic} value={topic}>
                    {topic === 'all' ? 'All Topics' : topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Create Thread Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <Button className="cosmic-gradient cosmic-glow-hover">
              <Plus className="w-5 h-5 mr-2" />
              Start New Discussion
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Forum Content */}
      <section className="relative pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="cosmic-card cosmic-border w-full justify-start mb-8">
              <TabsTrigger value="threads" className="data-[state=active]:cosmic-gradient">
                Discussions
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:cosmic-gradient">
                <Flame className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="pinned" className="data-[state=active]:cosmic-gradient">
                <Pin className="w-4 h-4 mr-2" />
                Pinned
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:cosmic-gradient">
                <Video className="w-4 h-4 mr-2" />
                Video Threads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="threads" className="space-y-4">
              {sortedThreads.map((thread, index) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="cosmic-card cosmic-border cosmic-glow-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {thread.isPinned && (
                            <Badge className="cosmic-gradient">
                              <Pin className="w-3 h-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                          {thread.isHot && (
                            <Badge variant="destructive" className="bg-orange-500">
                              <Flame className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          {thread.isLocked && (
                            <Badge variant="outline" className="cosmic-border text-gray-300">
                              Locked
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="cosmic-border text-gray-300">
                          {thread.topic}
                        </Badge>
                      </div>
                      <CardTitle className="text-white cosmic-text-glow">
                        {thread.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {thread.content}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                            <AvatarFallback className="cosmic-gradient text-white">
                              {thread.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-white flex items-center">
                              {thread.author.name}
                              <Badge className="ml-2 text-xs bg-purple-600">Level {thread.author.level}</Badge>
                            </div>
                            <div className="text-xs text-gray-400">{thread.author.role}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(thread.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {thread.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="cosmic-border text-gray-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{thread.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{thread.likes}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Reply className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              {threads.filter(t => t.isHot).map((thread, index) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="cosmic-card cosmic-border cosmic-glow-hover">
                    {/* Similar thread structure as above */}
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="destructive" className="bg-orange-500">
                          <Flame className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                        <Badge variant="outline" className="cosmic-border text-gray-300">
                          {thread.topic}
                        </Badge>
                      </div>
                      <CardTitle className="text-white cosmic-text-glow">
                        {thread.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {thread.content}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{thread.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{thread.likes}</span>
                          </div>
                        </div>
                        <Button className="cosmic-gradient cosmic-glow-hover">
                          Join Discussion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="pinned" className="space-y-4">
              {threads.filter(t => t.isPinned).map((thread, index) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="cosmic-card cosmic-border cosmic-glow-hover">
                    {/* Similar thread structure as above */}
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge className="cosmic-gradient">
                          <Pin className="w-3 h-3 mr-1" />
                          Pinned
                        </Badge>
                        <Badge variant="outline" className="cosmic-border text-gray-300">
                          {thread.topic}
                        </Badge>
                      </div>
                      <CardTitle className="text-white cosmic-text-glow">
                        {thread.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {thread.content}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{thread.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{thread.likes}</span>
                          </div>
                        </div>
                        <Button className="cosmic-gradient cosmic-glow-hover">
                          Join Discussion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              {threads.filter(thread => thread.type === 'video' || thread.type === 'mixed').map((thread, index) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="cosmic-card cosmic-border cosmic-glow-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {thread.isPinned && (
                            <Badge className="cosmic-gradient">
                              <Pin className="w-3 h-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                          {thread.isHot && (
                            <Badge variant="destructive" className="bg-orange-500">
                              <Flame className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          <Badge variant="outline" className="cosmic-border text-gray-300">
                            <Video className="w-3 h-3 mr-1" />
                            {thread.type === 'video' ? 'Video' : 'Mixed'}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="cosmic-border text-gray-300">
                          {thread.topic}
                        </Badge>
                      </div>
                      <CardTitle className="text-white cosmic-text-glow">
                        {thread.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {thread.content}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Video Thumbnail */}
                      {(thread.type === 'video' || thread.type === 'mixed') && thread.videoThumbnail && (
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                          <img 
                            src={thread.videoThumbnail} 
                            alt={thread.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-16 h-16 cosmic-gradient rounded-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {thread.videoDuration}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                            <AvatarFallback className="cosmic-gradient text-white">
                              {thread.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-white flex items-center">
                              {thread.author.name}
                              <Badge className="ml-2 text-xs bg-purple-600">Level {thread.author.level}</Badge>
                            </div>
                            <div className="text-xs text-gray-400">{thread.author.role}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(thread.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {thread.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="cosmic-border text-gray-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{thread.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{thread.likes}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Reply className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>

          {sortedThreads.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold text-white mb-2">No discussions found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}