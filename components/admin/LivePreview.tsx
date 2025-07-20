"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, ExternalLink, Smartphone, Monitor, Tablet, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function LivePreview() {
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getIframeClasses = () => {
    switch (previewDevice) {
      case "mobile":
        return "w-[375px] h-[667px] mx-auto"
      case "tablet":
        return "w-[768px] h-[1024px] mx-auto"
      default:
        return "w-full h-[800px]"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Live Preview</h2>
          <p className="text-muted-foreground">
            See how your website looks in real-time as you make changes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("/", "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in New Tab
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Website Preview
              </CardTitle>
              <CardDescription>
                Real-time preview of your public website
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Live
              </Badge>
              <Tabs value={previewDevice} onValueChange={(value) => setPreviewDevice(value as any)}>
                <TabsList>
                  <TabsTrigger value="desktop">
                    <Monitor className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="tablet">
                    <Tablet className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="mobile">
                    <Smartphone className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg bg-gray-50 p-4 overflow-auto">
            <iframe
              src="/"
              className={`${getIframeClasses()} border rounded-lg bg-white shadow-lg transition-all duration-300`}
              title="Website Preview"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Navigation</CardTitle>
          <CardDescription>
            Jump to different sections of your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => window.open("/", "_blank")}
              className="justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("/portfolio", "_blank")}
              className="justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              Portfolio
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("/about", "_blank")}
              className="justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              About
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("/services", "_blank")}
              className="justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              Services
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("/contact", "_blank")}
              className="justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
