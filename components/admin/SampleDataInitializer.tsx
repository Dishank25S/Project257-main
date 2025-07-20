"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, Plus } from "lucide-react"
import { localDB } from "@/lib/localDB"
import { useQueryClient } from "@tanstack/react-query"

export function SampleDataInitializer() {
  const queryClient = useQueryClient()

  const handleResetToSampleData = async () => {
    const confirmed = confirm(
      "This will reset all data to sample content (6 photos + 2 videos). All your custom content will be replaced. Are you sure?"
    )
    if (confirmed) {
      try {
        localDB.resetToDefaults()
        queryClient.invalidateQueries()
        alert("✅ Website populated with sample content! Check the home page and portfolio.")
      } catch (error) {
        alert("❌ Error resetting data: " + error)
      }
    }
  }

  return (
    <div className="space-y-3">
      <Button 
        onClick={handleResetToSampleData} 
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Load Sample Content
      </Button>
      <p className="text-xs text-gray-500 text-center">
        Populates the website with professional sample photos and videos to showcase the portfolio functionality.
      </p>
    </div>
  )
}
