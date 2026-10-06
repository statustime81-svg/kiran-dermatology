import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal, Sparkles } from 'lucide-react'

export default function BeforeAfterSlider({ item, index = 0 }) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  // ✅ Support both Supabase (snake_case) and static (camelCase)
  const beforeImage = item.before_image || item.before
  const afterImage = item.after_image || item.after

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = (x / rect.width) * 100
    setPosition(Math.min(Math.max(percent, 0), 100))
  }

  const handleMouseDown = () => setIsDragging(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX)
    }
    const handleMouseUp = () => setIsDragging(false)

    const handleTouchMove = (e) => {
      if (isDragging) handleMove(e.touches[0].clientX)
    }
    const handleTouchEnd = () => setIsDragging(false)

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden border border-borderLight shadow-soft hover:shadow-large transition-all duration-500"
    >
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden cursor-ew-resize select-none bg-gradient-to-br from-gray-100 to-gray-200"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (base) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100" />
          {afterImage && (
            <img
              src={afterImage}
              alt={`${item.title} after`}
              className="relative w-full h-full object-cover pointer-events-none"
              draggable={false}
              onError={(e) => (e.target.style.opacity = 0)}
            />
          )}
          <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg">
            After
          </span>
        </div>

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
            {beforeImage && (
              <img
                src={beforeImage}
                alt={`${item.title} before`}
                className="w-full h-full object-cover pointer-events-none"
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
                draggable={false}
                onError={(e) => (e.target.style.opacity = 0)}
              />
            )}
          </div>
          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-widest shadow-lg">
            Before
          </span>
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-large flex items-center justify-center border-2 border-primary cursor-ew-resize"
            style={{ transform: 'translate(-50%, -50%) scale(1)' }}
          >
            <MoveHorizontal className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Hint overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium tracking-wider uppercase pointer-events-none z-10 flex items-center gap-1.5">
          <MoveHorizontal className="w-3 h-3" />
          Drag to compare
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading font-semibold text-secondary text-base leading-snug">
            {item.title}
          </h3>
          {item.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-[10px] font-semibold text-primary-700 uppercase tracking-wide shrink-0">
              <Sparkles className="w-3 h-3" />
              {item.category}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-textSecondary mb-1.5">{item.description}</p>
        )}
        {item.sessions && (
          <p className="text-xs text-textMuted font-medium">{item.sessions}</p>
        )}
      </div>
    </motion.div>
  )
}