import * as React from "react"
import { useState } from "react"
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FilterDropdown } from "@/components/ui/filter-dropdown"

interface SearchFilter {
  id: string
  type: "dropdown" | "text" | "date"
  label: string
  options?: { value: string; label: string }[]
  value: string | string[]
  multiSelect?: boolean
}

interface AdvancedSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: SearchFilter[]
  onFiltersChange: (filters: SearchFilter[]) => void
  suggestions?: string[]
  className?: string
}

export function AdvancedSearch({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  suggestions = [],
  className
}: AdvancedSearchProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const updateFilter = (filterId: string, newValue: string | string[]) => {
    const updatedFilters = filters.map(filter =>
      filter.id === filterId ? { ...filter, value: newValue } : filter
    )
    onFiltersChange(updatedFilters)
  }

  const clearFilter = (filterId: string) => {
    const filter = filters.find(f => f.id === filterId)
    updateFilter(filterId, filter?.multiSelect ? [] : "")
  }

  const getActiveFiltersCount = () => {
    return filters.filter(filter => {
      if (Array.isArray(filter.value)) {
        return filter.value.length > 0
      }
      return filter.value !== ""
    }).length
  }

  const clearAllFilters = () => {
    const clearedFilters = filters.map(filter => ({
      ...filter,
      value: filter.multiSelect ? [] : ""
    }))
    onFiltersChange(clearedFilters)
  }

  return (
    <div className={className}>
      {/* Main Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports, apps, or workspaces..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-12 text-base"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-elegant z-50">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-muted/50 cursor-pointer text-sm"
                onClick={() => {
                  onSearchChange(suggestion)
                  setShowSuggestions(false)
                }}
              >
                <Search className="inline h-3 w-3 mr-2 text-muted-foreground" />
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleContent className="mt-4">
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">Advanced Filters</h3>
              <div className="flex items-center gap-2">
                {getActiveFiltersCount() > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                )}
                <Badge variant="secondary" className="text-xs">
                  {getActiveFiltersCount()} active
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filters.map((filter) => (
                <div key={filter.id} className="relative">
                  {filter.type === "dropdown" && filter.options && (
                    <FilterDropdown
                      title={filter.label}
                      options={filter.options}
                      selectedValues={Array.isArray(filter.value) ? filter.value : [filter.value].filter(Boolean)}
                      onSelectionChange={(values) => updateFilter(filter.id, filter.multiSelect ? values : values[0] || "")}
                      multiSelect={filter.multiSelect}
                      className="w-full"
                    />
                  )}
                  
                  {filter.type === "text" && (
                    <Input
                      placeholder={filter.label}
                      value={typeof filter.value === "string" ? filter.value : ""}
                      onChange={(e) => updateFilter(filter.id, e.target.value)}
                      className="w-full"
                    />
                  )}

                  {/* Clear individual filter */}
                  {((Array.isArray(filter.value) && filter.value.length > 0) || 
                    (!Array.isArray(filter.value) && filter.value !== "")) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearFilter(filter.id)}
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-background border border-border rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.map((filter) => {
            const hasValue = Array.isArray(filter.value) 
              ? filter.value.length > 0 
              : filter.value !== ""
            
            if (!hasValue) return null

            const displayValue = Array.isArray(filter.value)
              ? filter.value.length === 1 
                ? filter.options?.find(opt => opt.value === filter.value[0])?.label || filter.value[0]
                : `${filter.value.length} selected`
              : filter.options?.find(opt => opt.value === filter.value)?.label || filter.value

            return (
              <Badge
                key={filter.id}
                variant="secondary"
                className="gap-1 pr-1"
              >
                <span className="text-xs">{filter.label}: {displayValue}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter(filter.id)}
                  className="h-4 w-4 p-0 hover:bg-background"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}