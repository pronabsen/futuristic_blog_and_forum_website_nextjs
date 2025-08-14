'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CosmicBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Camera position
    camera.position.z = 5

    // Create stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    const starsVertices = []
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Create nebula clouds
    const nebulaColors = [0x8B5CF6, 0xC084FC, 0xF472B6] // Purple, light purple, pink
    
    const nebulae = []
    for (let i = 0; i < 3; i++) {
      const nebulaGeometry = new THREE.SphereGeometry(2 + Math.random() * 1, 32, 32)
      const nebulaMaterial = new THREE.MeshBasicMaterial({
        color: nebulaColors[i],
        transparent: true,
        opacity: 0.1 + Math.random() * 0.1,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      })
      
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial)
      nebula.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      )
      nebula.scale.set(
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5
      )
      
      scene.add(nebula)
      nebulae.push(nebula)
    }

    // Mouse interaction
    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      // Create ripple effect on stars near mouse
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(stars)
      
      if (intersects.length > 0) {
        const positions = stars.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < intersects.length; i++) {
          const index = intersects[i].index! * 3
          const originalX = positions[index]
          const originalY = positions[index + 1]
          const originalZ = positions[index + 2]
          
          // Create ripple effect
          const ripple = Math.sin(Date.now() * 0.01) * 0.1
          positions[index] = originalX + ripple
          positions[index + 1] = originalY + ripple
          positions[index + 2] = originalZ + ripple
        }
        stars.geometry.attributes.position.needsUpdate = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Slow rotation
      scene.rotation.y += 0.001
      
      // Rotate nebulae slowly
      nebulae.forEach((nebula, index) => {
        nebula.rotation.x += 0.0005 * (index + 1)
        nebula.rotation.y += 0.0003 * (index + 1)
        nebula.rotation.z += 0.0007 * (index + 1)
      })
      
      // Twinkling stars
      const time = Date.now() * 0.001
      const positions = stars.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const twinkle = Math.sin(time + i) * 0.01
        positions[i + 1] += twinkle
      }
      stars.geometry.attributes.position.needsUpdate = true
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-50 bg-black"
      style={{ pointerEvents: 'none' }}
    />
  )
}