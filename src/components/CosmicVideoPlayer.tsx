'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Share2, 
  Heart, 
  MessageSquare,
  Eye,
  Clock,
  Star,
  Settings,
  ThumbsUp,
  ThumbsDown
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
  createdAt: string
  author: {
    name: string
    avatar: string
    subscribers?: number
  }
  tags: string[]
  category: string
  featured?: boolean
}

interface CosmicVideoPlayerProps {
  video: Video
  variant?: 'card' | 'full' | 'compact'
  autoPlay?: boolean
  showControls?: boolean
}

export default function CosmicVideoPlayer({ 
  video, 
  variant = 'card', 
  autoPlay = false, 
  showControls = true 
}: CosmicVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleLike = () => {
    setLiked(!liked)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (liked) setLiked(false)
  }

  if (variant === 'compact') {
    return (
      <Card className="cosmic-card cosmic-border cosmic-glow-hover">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-shrink-0">
              <div className="relative group">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-32 h-20 object-cover rounded-lg cosmic-glow-hover"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <Badge className="absolute bottom-1 right-1 bg-black/80 text-xs">
                  {video.duration}
                </Badge>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium line-clamp-2 mb-1">{video.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{video.views.toLocaleString()} views</span>
                <span>•</span>
                <span>{video.createdAt}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={video.author.avatar} alt={video.author.name} />
                  <AvatarFallback className="text-xs">
                    {video.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-400">{video.author.name}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'full') {
    return (
      <div className="cosmic-card cosmic-border overflow-hidden">
        {/* Video Player */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            src={video.url}
            poster={video.thumbnail}
            className="w-full aspect-video object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:text-purple-400"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:text-purple-400"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:text-purple-400"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          )}
          
          {/* Play Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                onClick={togglePlay}
                className="cosmic-gradient cosmic-glow-hover rounded-full w-16 h-16"
              >
                <Play className="w-8 h-8" />
              </Button>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
              <div className="flex items-center space-x-4 text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.createdAt}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{video.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {video.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="cosmic-border text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className={`${liked ? 'cosmic-gradient' : 'cosmic-border'} cosmic-glow-hover`}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                {video.likes + (liked ? 1 : 0)}
              </Button>
              <Button
                variant={disliked ? "default" : "outline"}
                size="sm"
                onClick={handleDislike}
                className={`${disliked ? 'bg-red-600' : 'cosmic-border'} cosmic-glow-hover`}
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="cosmic-border cosmic-glow-hover">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={video.author.avatar} alt={video.author.name} />
                <AvatarFallback className="cosmic-gradient text-white">
                  {video.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white font-medium">{video.author.name}</div>
                {video.author.subscribers && (
                  <div className="text-sm text-gray-400">
                    {video.author.subscribers.toLocaleString()} subscribers
                  </div>
                )}
              </div>
            </div>
            <Button className="cosmic-gradient cosmic-glow-hover">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Card variant (default)
  return (
    <Card className="cosmic-card cosmic-border h-full cosmic-glow-hover transform transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative group">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="lg"
              onClick={togglePlay}
              className="cosmic-gradient cosmic-glow-hover rounded-full w-12 h-12"
            >
              <Play className="w-6 h-6" />
            </Button>
          </div>
          <Badge className="absolute bottom-2 right-2 bg-black/80">
            {video.duration}
          </Badge>
          {video.featured && (
            <Badge className="absolute top-2 left-2 cosmic-gradient">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{video.description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{video.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{video.comments}</span>
              </div>
            </div>
            <span>{video.createdAt}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={video.author.avatar} alt={video.author.name} />
                <AvatarFallback className="text-xs">
                  {video.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-300">{video.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}