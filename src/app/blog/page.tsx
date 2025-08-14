'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CosmicNavigation from '@/components/CosmicNavigation'
import VideoGrid from '@/components/VideoGrid'
import { Search, Calendar, Eye, Heart, MessageCircle, Share2, Filter, Plus, Star, Video, FileText, Play } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  type: 'article' | 'video' | 'mixed'
  videoUrl?: string
  videoThumbnail?: string
  videoDuration?: string
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: number
  views: number
  likes: number
  comments: number
  tags: string[]
  featured: boolean
  category: string
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

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filterCategory, setFilterCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [activeTab, setActiveTab] = useState('articles')

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Space Exploration: AI and Beyond',
      excerpt: 'Exploring how artificial intelligence is revolutionizing space exploration and opening new frontiers in our understanding of the universe.',
      content: 'Full content of the blog post...',
      type: 'mixed',
      videoUrl: '/space-exploration-video.mp4',
      videoThumbnail: '/space-thumbnail.jpg',
      videoDuration: '12:45',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: '/placeholder-avatar.jpg',
        role: 'Space Technology Expert'
      },
      publishedAt: '2024-01-15',
      readTime: 8,
      views: 2543,
      likes: 189,
      comments: 23,
      tags: ['space', 'ai', 'technology', 'exploration'],
      featured: true,
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Cosmic Art: Where Science Meets Creativity',
      excerpt: 'Discover how artists are using space imagery and cosmic phenomena to create stunning works that bridge the gap between science and art.',
      content: 'Full content of the blog post...',
      type: 'article',
      author: {
        name: 'Marcus Rodriguez',
        avatar: '/placeholder-avatar.jpg',
        role: 'Digital Artist'
      },
      publishedAt: '2024-01-12',
      readTime: 6,
      views: 1876,
      likes: 156,
      comments: 18,
      tags: ['art', 'space', 'creativity', 'design'],
      featured: false,
      category: 'Art & Design'
    },
    {
      id: '3',
      title: 'Building Community in the Digital Cosmos',
      excerpt: 'How online communities are creating new forms of connection and collaboration in our increasingly digital world.',
      content: 'Full content of the blog post...',
      type: 'video',
      videoUrl: '/community-building-video.mp4',
      videoThumbnail: '/community-thumbnail.jpg',
      videoDuration: '18:30',
      author: {
        name: 'Elena Vasquez',
        avatar: '/placeholder-avatar.jpg',
        role: 'Community Manager'
      },
      publishedAt: '2024-01-10',
      readTime: 5,
      views: 1432,
      likes: 98,
      comments: 31,
      tags: ['community', 'digital', 'social', 'connection'],
      featured: true,
      category: 'Community'
    },
    {
      id: '4',
      title: 'The Physics of Nebulae: Cosmic Beauty Explained',
      excerpt: 'Dive deep into the science behind nebulae, understanding the physics that creates these stunning cosmic phenomena.',
      content: 'Full content of the blog post...',
      type: 'video',
      videoUrl: '/nebulae-physics-video.mp4',
      videoThumbnail: '/nebulae-thumbnail.jpg',
      videoDuration: '25:15',
      author: {
        name: 'Dr. James Park',
        avatar: '/placeholder-avatar.jpg',
        role: 'Astrophysicist'
      },
      publishedAt: '2024-01-08',
      readTime: 10,
      views: 3210,
      likes: 267,
      comments: 45,
      tags: ['physics', 'nebulae', 'science', 'astronomy'],
      featured: false,
      category: 'Science'
    },
    {
      id: '5',
      title: 'Machine Learning in Space: Current Applications',
      excerpt: 'Exploring how machine learning algorithms are being used in space missions, from satellite imagery analysis to autonomous navigation.',
      content: 'Full content of the blog post...',
      type: 'mixed',
      videoUrl: '/ml-space-video.mp4',
      videoThumbnail: '/ml-space-thumbnail.jpg',
      videoDuration: '15:20',
      author: {
        name: 'Lisa Wang',
        avatar: '/placeholder-avatar.jpg',
        role: 'ML Engineer'
      },
      publishedAt: '2024-01-05',
      readTime: 7,
      views: 2876,
      likes: 198,
      comments: 27,
      tags: ['ml', 'space', 'ai', 'applications'],
      featured: false,
      category: 'Technology'
    },
    {
      id: '6',
      title: 'The Evolution of Cosmic Design in UI/UX',
      excerpt: 'How space-themed design elements are influencing modern user interfaces and creating more engaging digital experiences.',
      content: 'Full content of the blog post...',
      type: 'article',
      author: {
        name: 'Alex Thompson',
        avatar: '/placeholder-avatar.jpg',
        role: 'UI/UX Designer'
      },
      publishedAt: '2024-01-03',
      readTime: 4,
      views: 1543,
      likes: 87,
      comments: 12,
      tags: ['design', 'ui', 'ux', 'cosmic', 'trends'],
      featured: false,
      category: 'Art & Design'
    }
  ]

  const videos: VideoContent[] = [
    {
      id: '1',
      title: 'Space Exploration Technologies',
      description: 'Latest advancements in space exploration technology and AI applications',
      url: '/space-tech-video.mp4',
      thumbnail: '/space-tech-thumbnail.jpg',
      duration: '20:45',
      views: 45620,
      likes: 2890,
      comments: 456,
      uploadDate: '2024-01-14',
      author: {
        name: 'Tech Space Channel',
        avatar: '/tech-avatar.jpg'
      },
      tags: ['space', 'technology', 'ai', 'exploration'],
      category: 'Technology',
      featured: true,
      trending: true
    },
    {
      id: '2',
      title: 'Digital Art Creation Tutorial',
      description: 'Learn how to create stunning cosmic digital art from scratch',
      url: '/digital-art-tutorial.mp4',
      thumbnail: '/digital-art-thumbnail.jpg',
      duration: '35:20',
      views: 23450,
      likes: 1567,
      comments: 234,
      uploadDate: '2024-01-13',
      author: {
        name: 'Art Master',
        avatar: '/art-avatar.jpg'
      },
      tags: ['art', 'tutorial', 'digital', 'cosmic'],
      category: 'Art & Design',
      featured: true,
      trending: false
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case 'popular':
        return b.views - a.views
      case 'liked':
        return b.likes - a.likes
      case 'comments':
        return b.comments - a.comments
      default:
        return 0
    }
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="cosmic-card cosmic-border h-full cosmic-glow-hover transform transition-all duration-300 hover:scale-105">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <Badge variant="outline" className="cosmic-border text-gray-300">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge className="cosmic-gradient">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          {/* Content Type Badge */}
          <Badge variant="outline" className="cosmic-border text-gray-300 mb-2">
            {post.type === 'video' ? (
              <>
                <Video className="w-3 h-3 mr-1" />
                Video Post
              </>
            ) : post.type === 'mixed' ? (
              <>
                <Play className="w-3 h-3 mr-1" />
                Mixed Content
              </>
            ) : (
              <>
                <FileText className="w-3 h-3 mr-1" />
                Article
              </>
            )}
          </Badge>

          <CardTitle className="text-white cosmic-text-glow line-clamp-2">
            {post.title}
          </CardTitle>
          <CardDescription className="text-gray-300 line-clamp-3">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Video Thumbnail for video/mixed posts */}
          {(post.type === 'video' || post.type === 'mixed') && post.videoThumbnail && (
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <img 
                src={post.videoThumbnail} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 cosmic-gradient rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {post.videoDuration}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="cosmic-gradient text-white">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-white">{post.author.name}</div>
                <div className="text-xs text-gray-400">{post.author.role}</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="cosmic-border text-gray-300 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
            </div>
            <div className="text-xs">
              {post.readTime} min read
            </div>
          </div>
          <Button className="w-full cosmic-gradient cosmic-glow-hover">
            {post.type === 'video' ? 'Watch Video' : 'Read Article'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )

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
              Cosmic Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore thought-provoking articles and videos about space, technology, art, and community
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
                placeholder="Search articles, videos, tags, or authors..."
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
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="liked">Most Liked</SelectItem>
                <SelectItem value="comments">Most Comments</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="cosmic-card cosmic-border text-white w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="cosmic-card cosmic-border">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Art & Design">Art & Design</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Community">Community</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Create Post Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <Button className="cosmic-gradient cosmic-glow-hover">
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="relative pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="cosmic-card cosmic-border w-full justify-start mb-8">
              <TabsTrigger value="articles" className="data-[state=active]:cosmic-gradient">
                <FileText className="w-4 h-4 mr-2" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:cosmic-gradient">
                <Video className="w-4 h-4 mr-2" />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-6">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold cosmic-gradient-text cosmic-text-glow flex items-center">
                      <Star className="w-6 h-6 mr-2" />
                      Featured Posts
                    </h2>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredPosts.slice(0, 2).map((post, index) => (
                      <PostCard key={post.id} post={post} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold cosmic-gradient-text cosmic-text-glow">
                  All Articles ({sortedPosts.length})
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPosts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {sortedPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <FileText className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <VideoGrid 
                videos={videos} 
                title="Blog Videos"
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