"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"

export default function AnalyticsGate() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    async function check() {
      const res = await fetch('/api/my-ip')
      const data = await res.json()

      const DEV_IP = "88.119.221.209"

      setEnabled(data.ip !== DEV_IP)
    }

    check()
  }, [])

  if (!enabled) return null

  return <Analytics />
}
