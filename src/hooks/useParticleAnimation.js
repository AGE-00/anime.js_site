import { useEffect } from 'react'
import { createParticleSystem } from '../utils/particleSystem'

export function useParticleAnimation(canvasRef) {
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const particleSystem = createParticleSystem(canvas)
    
    // Start animation
    particleSystem.start()

    // Handle resize
    const handleResize = () => {
      particleSystem.resize()
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      particleSystem.stop()
    }
  }, [canvasRef])
}