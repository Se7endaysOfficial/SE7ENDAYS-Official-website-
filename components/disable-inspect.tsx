"use client"

import { useEffect } from "react"

export function DisableInspect() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Disable keyboard shortcuts for dev tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault()
      }
      // Ctrl+Shift+I (Dev tools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault()
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault()
      }
      // Ctrl+Shift+C (Inspect element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault()
      }
      // Ctrl+U (View source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault()
      }
      // Cmd+Option+I (Mac dev tools)
      if (e.metaKey && e.altKey && e.key === "i") {
        e.preventDefault()
      }
      // Cmd+Option+J (Mac console)
      if (e.metaKey && e.altKey && e.key === "j") {
        e.preventDefault()
      }
      // Cmd+Option+C (Mac inspect)
      if (e.metaKey && e.altKey && e.key === "c") {
        e.preventDefault()
      }
      // Cmd+Option+U (Mac view source)
      if (e.metaKey && e.key === "u") {
        e.preventDefault()
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return null
}
