"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"

export default function AnalyticsGate() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    async function check() {
      const res = await fetch('/api/my-ip')
      const data = await res.json()

      // Add more IPs here to exclude from analytics
      const EXCLUDED_IPS = [
        "88.119.221.209",
        // "123.456.789.000", // Example: add more IPs like this
      ]

      setEnabled(!EXCLUDED_IPS.includes(data.ip))
    }

    check()
  }, [])

  if (!enabled) return null

  return <Analytics />
}
