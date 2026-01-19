"use client"

import { useEffect } from "react"

export function DisableInspect() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
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
      // Ctrl+A (Select all)
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault()
      }
      // Cmd+A (Mac select all)
      if (e.metaKey && e.key === "a") {
        e.preventDefault()
      }
    }

    // Disable drag start on all elements
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Disable selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Disable mouse down + move (drag behavior)
    const handleMouseDown = (e: MouseEvent) => {
      // Prevent dragging on images and links
      const target = e.target as HTMLElement
      if (target.tagName === "IMG" || target.tagName === "A" || target.closest("a")) {
        e.preventDefault()
      }
    }

    // Disable drop
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Disable drag over
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("dragstart", handleDragStart)
    document.addEventListener("selectstart", handleSelectStart)
    document.addEventListener("copy", handleCopy)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("drop", handleDrop)
    document.addEventListener("dragover", handleDragOver)

    // Disable image dragging via attribute
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.setAttribute("draggable", "false")
    })

    // Disable link dragging
    const links = document.querySelectorAll("a")
    links.forEach((link) => {
      link.setAttribute("draggable", "false")
    })

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("dragstart", handleDragStart)
      document.removeEventListener("selectstart", handleSelectStart)
      document.removeEventListener("copy", handleCopy)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("drop", handleDrop)
      document.removeEventListener("dragover", handleDragOver)
    }
  }, [])

  return null
}
