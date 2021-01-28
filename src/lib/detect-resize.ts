import { useState, useEffect } from 'react'

/**
 * Adds a listener to the page to detect for resize changes (Responsive Action).
 * Returns the new width of the window.
 * @param window
 */
export const detectResize = (window: Window & typeof globalThis): number => {
  const [windowSize, setWindowSize] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
