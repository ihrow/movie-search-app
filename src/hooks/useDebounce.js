/**
 * Popular hook to debounce a value that changes frequently (like an input value)
 */
import { useCallback, useRef } from 'react'

function useDebounce(callback, delay) {
  const timer = useRef()

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  return debouncedCallback
}

export default useDebounce