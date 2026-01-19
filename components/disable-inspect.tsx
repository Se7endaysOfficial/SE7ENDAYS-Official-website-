"use client"

import { useEffect } from "react"

export function DisableInspect() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault()
      }
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault()
      }
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault()
      }
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault()
      }
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault()
      }
      if (e.metaKey && e.altKey && e.key === "i") {
        e.preventDefault()
      }
      if (e.metaKey && e.altKey && e.key === "j") {
        e.preventDefault()
      }
      if (e.metaKey && e.altKey && e.key === "c") {
        e.preventDefault()
      }
      if (e.metaKey && e.key === "u") {
        e.preventDefault()
      }
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault()
      }
      if (e.metaKey && e.key === "a") {
        e.preventDefault()
      }
    }

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "IMG" || target.tagName === "A" || target.closest("a")) {
        e.preventDefault()
      }
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

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

    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.setAttribute("draggable", "false")
    })

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
