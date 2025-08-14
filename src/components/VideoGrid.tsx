'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import VideoPlayer from './VideoPlayer'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Play, 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare,
  TrendingUp,
  Calendar,
  SortAsc,
  SortDesc,
  Star
} from 'lucide-react'

interface Video {
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

interface VideoGridProps {
  videos: Video[]
  title?: string
  showFilters?: boolean
  showSort?: boolean
  layout?: 'grid' | 'list'
  className?: string
}

export default function VideoGrid({ 
  videos, 
  title = "Videos", 
  showFilters = true, 
  showSort = true,
  layout = 'grid',
  className = "" 
}: VideoGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filterCategory, setFilterCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(layout)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const categories = ['all', ...Array.from(new Set(videos.map(v => v.category)))]

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = filterCategory === 'all' || video.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      case 'views':
        return b.views - a.views
      case 'likes':
        return b.likes - a.likes
      case 'comments':
        return b.comments - a.comments
      case 'duration':
        return a.duration.localeCompare(b.duration)
      default:
        return 0
    }
  })

  const featuredVideos = videos.filter(v => v.featured)
  const trendingVideos = videos.filter(v => v.trending)

  const VideoCard = ({ video, index }: { video: Video; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Card className="cosmic-card cosmic-border h-full cosmic-glow-hover transform transition-all duration-300 hover:scale-105">
        <CardContent className="p-0">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 cosmic-gradient rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>

            {/* Feature Badges */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {video.featured && (
                <Badge className="cosmic-gradient">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {video.trending && (
                <Badge className="bg-orange-500">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
          </div>

          {/* Video Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
              {video.title}
            </h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {video.description}
            </p>

            {/* Author Info */}
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="cosmic-gradient text-white text-xs">
                  {video.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-400">{video.author.name}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{video.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{video.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{video.comments.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {video.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="cosmic-border text-gray-300 text-xs">
                  {tag}
                </Badge>
              ))}
              {video.tags.length > 3 && (
                <Badge variant="outline" className="cosmic-border text-gray-300 text-xs">
                  +{video.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <Badge variant="outline" className="cosmic-border text-gray-300">
                {video.category}
              </Badge>
              <Button 
                size="sm" 
                className="cosmic-gradient cosmic-glow-hover"
                onClick={() => setSelectedVideo(video)}
              >
                <Play className="w-3 h-3 mr-1" />
                Watch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const VideoListItem = ({ video, index }: { video: Video; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="cosmic-card cosmic-border cosmic-glow-hover">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            {/* Thumbnail */}
            <div className="relative w-48 h-28 bg-black rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                {video.duration}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 cosmic-gradient rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold line-clamp-2 flex-1 mr-2">
                  {video.title}
                </h3>
                <div className="flex space-x-1">
                  {video.featured && (
                    <Badge className="cosmic-gradient text-xs">
                      <Star className="w-2 h-2 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {video.trending && (
                    <Badge className="bg-orange-500 text-xs">
                      <TrendingUp className="w-2 h-2 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{video.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{video.comments.toLocaleString()}</span>
                  </div>
                </div>
                <span>{video.duration}</span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="cosmic-gradient text-white text-xs">
                      {video.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-400">{video.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="cosmic-border text-gray-300 text-xs">
                    {video.category}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="cosmic-gradient cosmic-glow-hover"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold cosmic-gradient-text">{title}</h2>
        <div className="flex items-center space-x-2">
          {showSort && (
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="cosmic-card cosmic-border text-white w-40">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="cosmic-card cosmic-border">
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
                <SelectItem value="likes">Most Likes</SelectItem>
                <SelectItem value="comments">Most Comments</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button
            variant="outline"
            size="sm"
            className="cosmic-border cosmic-glow-hover"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cosmic-card cosmic-border pl-10 text-white placeholder-gray-400"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="cosmic-card cosmic-border text-white w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="cosmic-card cosmic-border">
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Featured Videos */}
      {featuredVideos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold cosmic-gradient-text flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Featured Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Trending Videos */}
      {trendingVideos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold cosmic-gradient-text flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Trending Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* All Videos */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold cosmic-gradient-text">
          All Videos ({sortedVideos.length})
        </h3>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedVideos.map((video, index) => (
              <VideoListItem key={video.id} video={video} index={index} />
            ))}
          </div>
        )}

        {sortedVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:text-purple-400 z-10"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </Button>
            <VideoPlayer video={selectedVideo} className="w-full" />
          </div>
        </div>
      )}
    </div>
  )
}