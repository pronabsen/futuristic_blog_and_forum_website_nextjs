'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  Share2,
  Heart,
  MessageSquare,
  Eye
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
}

interface VideoPlayerProps {
  video: Video
  autoPlay?: boolean
  showControls?: boolean
  className?: string
}

export default function VideoPlayer({ 
  video, 
  autoPlay = false, 
  showControls = true, 
  className = "" 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [quality, setQuality] = useState('1080p')
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
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
    setCurrentTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
    }
  }

  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality)
    setShowSettings(false)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Video Container */}
      <Card className="cosmic-card cosmic-border overflow-hidden">
        <CardContent className="p-0">
          {/* Video Element */}
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              src={video.url}
              poster={video.thumbnail}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
            />
            
            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                onClick={togglePlay}
              >
                <div className="w-20 h-20 cosmic-gradient rounded-full flex items-center justify-center">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
              </motion.div>
            )}

            {/* Video Controls */}
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
              >
                {/* Progress Bar */}
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-purple-400"
                      onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)}
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-purple-400"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-purple-400"
                      onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-purple-400"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:text-purple-400"
                        onClick={() => setShowSettings(!showSettings)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      
                      {/* Settings Menu */}
                      {showSettings && (
                        <Card className="absolute bottom-full right-0 mb-2 w-48 cosmic-card cosmic-border z-10">
                          <CardContent className="p-3 space-y-2">
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Playback Speed</p>
                              <div className="space-y-1">
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                  <button
                                    key={speed}
                                    onClick={() => handleSpeedChange(speed)}
                                    className={`w-full text-left px-2 py-1 rounded text-sm ${
                                      playbackSpeed === speed ? 'cosmic-gradient text-white' : 'text-gray-300 hover:text-white'
                                    }`}
                                  >
                                    {speed}x
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Quality</p>
                              <div className="space-y-1">
                                {['1080p', '720p', '480p', '360p'].map(q => (
                                  <button
                                    key={q}
                                    onClick={() => handleQualityChange(q)}
                                    className={`w-full text-left px-2 py-1 rounded text-sm ${
                                      quality === q ? 'cosmic-gradient text-white' : 'text-gray-300 hover:text-white'
                                    }`}
                                  >
                                    {q}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-purple-400"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Video Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{video.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{video.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{video.comments.toLocaleString()}</span>
                </div>
              </div>
              <span className="text-sm text-gray-400">{video.duration}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {video.tags.map(tag => (
                <Badge key={tag} variant="outline" className="cosmic-border text-gray-300 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 cosmic-gradient rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {video.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{video.author.name}</div>
                    <div className="text-xs text-gray-400">{video.uploadDate}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="cosmic-border cosmic-glow-hover">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="cosmic-border cosmic-glow-hover">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}