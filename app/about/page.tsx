'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

function MarbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // -----------------------------
    // LIGHTWEIGHT NOISE (NO LIBS)
    // -----------------------------
    const noise = (x: number, y: number) => {
      return (
        Math.sin(x * 0.012 + y * 0.008) *
        Math.cos(y * 0.014 - x * 0.006)
      )
    }

    // -----------------------------
    // MARBLE VEINS FUNCTION (UPGRADED)
    // -----------------------------
    const marble = (x: number, y: number) => {
      const n =
        noise(x, y) * 0.6 +
        noise(x * 2.1, y * 2.1) * 0.3 +
        noise(x * 3.8, y * 3.8) * 0.1

      // flow distortion
      const flow =
        Math.sin(x * 3.2 + n * 5.0 + t * 0.6) +
        Math.cos(y * 2.8 + n * 4.2 - t * 0.4)

      // VEINS (core marble look)
      const veins =
        Math.sin((x * 6.0 + flow * 2.5)) *
        Math.cos((y * 4.5 - flow * 1.8))

      // sharpen veins into stone-like cracks
      const cracks = Math.pow(Math.abs(veins), 10.0)

      return flow * 0.6 + n * 0.4 - cracks * 1.2
    }

    // -----------------------------
    // DUST PARTICLES
    // -----------------------------
    const particles = Array.from({
      length: window.innerWidth < 768 ? 35 : 60,
    }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.2,
      alpha: Math.random() * 0.03 + 0.006,
      speed: Math.random() * 0.06 + 0.01,
    }))

    // -----------------------------
    // PRE-RENDER MARBLE TEXTURE
    // -----------------------------
    const marbleCanvas = document.createElement('canvas')
    const marbleCtx = marbleCanvas.getContext('2d')

    const renderMarble = () => {
      marbleCanvas.width = canvas.width
      marbleCanvas.height = canvas.height

      if (!marbleCtx) return

      const imgData = marbleCtx.createImageData(
        marbleCanvas.width,
        marbleCanvas.height
      )

      const data = imgData.data

      const scale = 0.0016

      for (let x = 0; x < marbleCanvas.width; x++) {
        for (let y = 0; y < marbleCanvas.height; y++) {
          const nx = x * scale
          const ny = y * scale

          const v = marble(nx, ny)

          // base limestone tone
          let base = 232 + v * 18

          // clamp
          base = Math.max(200, Math.min(245, base))

          const cell = (x + y * marbleCanvas.width) * 4

          // slight warm marble variation
          data[cell] = base + 6
          data[cell + 1] = base + 2
          data[cell + 2] = base - 6
          data[cell + 3] = 255
        }
      }

      marbleCtx.putImageData(imgData, 0, 0)
    }

    renderMarble()

    // -----------------------------
    // MAIN RENDER LOOP
    // -----------------------------
    const render = () => {
      t += 0.0012

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // base
      ctx.fillStyle = '#f6f1e8'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // marble texture drift
      ctx.globalAlpha = 0.45
      ctx.drawImage(
        marbleCanvas,
        Math.sin(t * 30) * -18,
        Math.cos(t * 25) * -12,
        canvas.width + 40,
        canvas.height + 40
      )

      ctx.globalAlpha = 1

      // soft light top
      const glow = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.2,
        0,
        canvas.width * 0.3,
        canvas.height * 0.2,
        800
      )

      glow.addColorStop(0, 'rgba(255,255,255,0.18)')
      glow.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.fillStyle = glow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // dust
      particles.forEach((p) => {
        p.y -= p.speed

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(90,80,70,${p.alpha})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.98,
      }}
    />
  )
}

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8f4ec 0%, #f1ebe1 100%)',
        color: '#2a2622',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <MarbleCanvas />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.02,
          backgroundImage:
            'radial-gradient(#000 0.5px, transparent 0.5px)',
          backgroundSize: '4px 4px',
          mixBlendMode: 'multiply',
        }}
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.08) 100%)',
        }}
      />

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 24px 140px',
        }}
      >
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '72px',
            alignItems: 'center',
            marginBottom: '190px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(48px, 8vw, 82px)',
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing: '-0.055em',
                marginBottom: '36px',
              }}
            >
              Kuriame skaitmenines erdves,
              <br />
              kurios išlieka.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.9, color: '#5f5851' }}>
              Šis marmuro fonas dabar turi tikras „veins“ struktūras ir organinį
              gylį be jokių bibliotekų.
            </p>
          </div>

          <div style={{ borderRadius: 42, overflow: 'hidden' }}>
            <Image
              src="/images/about/about-team.jpg"
              alt="team"
              width={900}
              height={1200}
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>
      </main>
    </div>
  )
      }
