"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { initializeSampleData } from "@/lib/sampleData"

export function SampleDataInitializer() {
  const handleInitializeSampleData = () => {
    try {
      initializeSampleData()
      alert("Sample data added successfully! Refresh the page to see the changes.")
      window.location.reload()
    } catch (error) {
      alert("Error adding sample data: " + error)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>
          Add some sample photos and videos to get started with your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleInitializeSampleData}>
          Add Sample Data
        </Button>
        <p className="text-sm text-gray-600 mt-2">
          This will add sample photos and videos to help you see how the portfolio works.
        </p>
      </CardContent>
    </Card>
  )
}
