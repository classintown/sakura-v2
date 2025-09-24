import { useEffect, useCallback, useState } from 'react'

interface UseKeyboardNavigationProps {
  onEscape?: () => void
  onEnter?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onTab?: () => void
  onShiftTab?: () => void
  enabled?: boolean
}

export function useKeyboardNavigation({
  onEscape,
  onEnter,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  onShiftTab,
  enabled = true
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return

    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        onEscape?.()
        break
      case 'Enter':
        if (!event.ctrlKey && !event.metaKey) {
          event.preventDefault()
          onEnter?.()
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        onArrowUp?.()
        break
      case 'ArrowDown':
        event.preventDefault()
        onArrowDown?.()
        break
      case 'ArrowLeft':
        event.preventDefault()
        onArrowLeft?.()
        break
      case 'ArrowRight':
        event.preventDefault()
        onArrowRight?.()
        break
      case 'Tab':
        if (event.shiftKey) {
          onShiftTab?.()
        } else {
          onTab?.()
        }
        break
    }
  }, [enabled, onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab, onShiftTab])

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, enabled])
}

// Hook for managing focus within a list of items
export function useListNavigation<T>(
  items: T[],
  onSelect: (item: T, index: number) => void,
  enabled: boolean = true
) {
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const handleArrowDown = useCallback(() => {
    setFocusedIndex(prev => Math.min(items.length - 1, prev + 1))
  }, [items.length])

  const handleArrowUp = useCallback(() => {
    setFocusedIndex(prev => Math.max(0, prev - 1))
  }, [])

  const handleEnter = useCallback(() => {
    if (focusedIndex >= 0 && focusedIndex < items.length) {
      onSelect(items[focusedIndex], focusedIndex)
    }
  }, [focusedIndex, items, onSelect])

  const handleEscape = useCallback(() => {
    setFocusedIndex(-1)
  }, [])

  useKeyboardNavigation({
    onArrowDown: handleArrowDown,
    onArrowUp: handleArrowUp,
    onEnter: handleEnter,
    onEscape: handleEscape,
    enabled
  })

  return {
    focusedIndex,
    setFocusedIndex,
    resetFocus: () => setFocusedIndex(-1)
  }
}

