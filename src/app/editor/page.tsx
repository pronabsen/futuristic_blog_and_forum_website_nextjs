'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CosmicNavigation from '@/components/CosmicNavigation'
import { 
  Save, 
  Eye, 
  Share2, 
  Image, 
  Video, 
  FileText, 
  Code, 
  Link, 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  HelpCircle,
  Sparkles,
  Zap,
  Star,
  X,
  Maximize,
  Minimize
} from 'lucide-react'

interface PostData {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'scheduled'
  publishDate?: string
  featuredImage?: string
}

export default function EditorPage() {
  const [post, setPost] = useState<PostData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    status: 'draft'
  })
  
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [currentTag, setCurrentTag] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [autoSave, setAutoSave] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null)

  const categories = [
    'Technology',
    'Art & Design', 
    'Science',
    'Community',
    'Space Exploration',
    'AI & Machine Learning',
    'Future Technology'
  ]

  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.value
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0)
      setCharCount(text.length)
    }
  }, [post.content])

  useEffect(() => {
    if (autoSave && (post.title || post.content)) {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
      
      autoSaveTimer.current = setTimeout(() => {
        handleSave()
      }, 3000)
    }

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
    }
  }, [post, autoSave])

  const handleSave = () => {
    // Simulate saving
    setLastSaved(new Date())
    console.log('Auto-saving post:', post)
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !post.tags.includes(currentTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFormatText = (format: string) => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = post.content.substring(start, end)
    
    let formattedText = ''
    let newCursorPos = end

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        newCursorPos = start + formattedText.length
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        newCursorPos = start + formattedText.length
        break
      case 'underline':
        formattedText = `__${selectedText}__`
        newCursorPos = start + formattedText.length
        break
      case 'code':
        formattedText = `\`${selectedText}\``
        newCursorPos = start + formattedText.length
        break
      case 'link':
        formattedText = `[${selectedText}](url)`
        newCursorPos = start + formattedText.length - 4
        break
      case 'quote':
        formattedText = `> ${selectedText}`
        newCursorPos = start + formattedText.length
        break
    }

    const newContent = post.content.substring(0, start) + formattedText + post.content.substring(end)
    setPost(prev => ({ ...prev, content: newContent }))
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handlePublish = () => {
    setPost(prev => ({ ...prev, status: 'published' }))
    console.log('Publishing post:', post)
    // Here you would typically send the post to your backend
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`min-h-screen relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {!isFullscreen && <CosmicNavigation />}
      
      <div className={`pt-20 ${isFullscreen ? 'pt-0' : ''}`}>
        <div className={`container mx-auto ${isFullscreen ? 'max-w-full h-full' : 'max-w-6xl'} px-4`}>
          {/* Editor Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cosmic-card cosmic-border p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold cosmic-gradient-text cosmic-text-glow">
                  {isFullscreen ? 'Fullscreen Editor' : 'Create New Post'}
                </h1>
                <Badge className={`${post.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
                {lastSaved && (
                  <span className="text-sm text-gray-400">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="cosmic-border cosmic-glow-hover"
                  onClick={() => setAutoSave(!autoSave)}
                >
                  {autoSave ? 'Auto-save ON' : 'Auto-save OFF'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cosmic-border cosmic-glow-hover"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cosmic-border cosmic-glow-hover"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cosmic-border cosmic-glow-hover"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  className="cosmic-gradient cosmic-glow-hover"
                  onClick={handlePublish}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              </div>
            </div>

            {/* Post Title */}
            <Input
              placeholder="Enter your post title..."
              value={post.title}
              onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
              className="cosmic-card cosmic-border text-white text-xl font-semibold placeholder-gray-400 mb-4"
            />

            {/* Post Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Select value={post.category} onValueChange={(value) => setPost(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="cosmic-card cosmic-border text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="cosmic-card cosmic-border">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add tags..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="cosmic-card cosmic-border text-white placeholder-gray-400"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="cosmic-border cosmic-glow-hover"
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
              </div>
            </div>

            {/* Tags Display */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cosmic-border text-gray-300">
                    {tag}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-white" 
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Formatting Toolbar */}
            <div className="flex items-center space-x-2 mb-4 p-2 cosmic-card cosmic-border rounded-lg">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => handleFormatText('bold')}>
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => handleFormatText('italic')}>
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => handleFormatText('underline')}>
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px h-4 bg-gray-600"></div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => handleFormatText('code')}>
                <Code className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => handleFormatText('link')}>
                <Link className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => handleFormatText('quote')}>
                <Quote className="w-4 h-4" />
              </Button>
              <div className="w-px h-4 bg-gray-600"></div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <List className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ListOrdered className="w-4 h-4" />
              </Button>
              <div className="w-px h-4 bg-gray-600"></div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Image className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Editor Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cosmic-card cosmic-border"
          >
            <Tabs value={isPreviewMode ? 'preview' : 'edit'} onValueChange={(value) => setIsPreviewMode(value === 'preview')}>
              <TabsList className="cosmic-card cosmic-border w-full">
                <TabsTrigger value="edit" className="data-[state=active]:cosmic-gradient">
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:cosmic-gradient">
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="p-0">
                <Textarea
                  ref={contentRef}
                  placeholder="Start writing your post..."
                  value={post.content}
                  onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                  className="cosmic-card cosmic-border text-white placeholder-gray-400 min-h-[500px] border-0 rounded-none resize-none focus:ring-0"
                />
              </TabsContent>

              <TabsContent value="preview" className="p-6">
                <div className="prose prose-invert max-w-none">
                  {post.content ? (
                    <div className="text-white">
                      {post.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">Nothing to preview yet. Start writing...</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Editor Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 cosmic-card cosmic-border p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-medium">Editor Tips</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p><strong>Markdown:</strong> Use **bold**, *italic*, and `code` for formatting</p>
                <p><strong>Links:</strong> [text](url) for clickable links</p>
              </div>
              <div>
                <p><strong>Auto-save:</strong> Enabled by default every 3 seconds</p>
                <p><strong>Shortcuts:</strong> Ctrl/Cmd + B for bold, I for italic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}