import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  title: string
  options: FilterOption[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  multiSelect?: boolean
  className?: string
}

export function FilterDropdown({
  title,
  options,
  selectedValues,
  onSelectionChange,
  multiSelect = false,
  className
}: FilterDropdownProps) {
  const handleSelect = (value: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      onSelectionChange(newValues)
    } else {
      onSelectionChange([value])
    }
  }

  const getDisplayText = () => {
    if (selectedValues.length === 0) return title
    if (selectedValues.length === 1) {
      const option = options.find(opt => opt.value === selectedValues[0])
      return option?.label || title
    }
    return `${selectedValues.length} selected`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn("justify-between font-normal", className)}
        >
          {getDisplayText()}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border border-border shadow-elegant">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="flex items-center justify-between cursor-pointer hover:bg-muted/50"
            onSelect={() => handleSelect(option.value)}
          >
            <span>{option.label}</span>
            {selectedValues.includes(option.value) && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}