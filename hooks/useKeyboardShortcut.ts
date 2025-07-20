"use client"

import { useEffect, useCallback } from "react"

export function useKeyboardShortcut(keys: string[], callback: () => void, deps: any[] = []) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const isCtrlShiftA = event.ctrlKey && event.shiftKey && event.key === "A"

    if (isCtrlShiftA) {
      event.preventDefault()
      callback()
    }
  }, deps)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])
}
