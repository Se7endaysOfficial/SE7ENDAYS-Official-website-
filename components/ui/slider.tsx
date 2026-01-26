'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps {
  className?: string
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: number[]) => void
}

function Slider({
  className,
  defaultValue = [0],
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  ...props
}: SliderProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'>) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [Number(e.target.value)]
    if (!value) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const percentage = ((currentValue[0] - min) / (max - min)) * 100

  return (
    <div
      data-slot="slider"
      className={cn(
        'relative flex w-full touch-none items-center select-none',
        disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="absolute h-full bg-zinc-900 dark:bg-zinc-50"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue[0]}
        onChange={handleChange}
        disabled={disabled}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <div
        className="absolute h-4 w-4 rounded-full border border-zinc-900 bg-white shadow-sm dark:border-zinc-50"
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  )
}

export { Slider }
