'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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

    // LIGHTWEIGHT PSEUDO NOISE
    const noise = (x: number, y: number) => {
      return (
        Math.sin(x * 0.0124 + y * 0.0087) *
        Math.cos(y * 0.0153 - x * 0.0061)
      )
    }

    // FLOATING DUST
    const particles = Array.from({
      length: window.innerWidth < 768 ? 40 : 70,
    }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.035 + 0.008,
      speed: Math.random() * 0.05 + 0.01,
    }))

    // PRE-RENDER MARBLE
    const marbleCanvas = document.createElement('canvas')
    const marbleCtx = marbleCanvas.getContext('2d')

    marbleCanvas.width = canvas.width
    marbleCanvas.height = canvas.height

    if (marbleCtx) {
      const imgData = marbleCtx.createImageData(
        marbleCanvas.width,
        marbleCanvas.height
      )

      const data = imgData.data

      const scale = 0.0018

      for (let x = 0; x < marbleCanvas.width; x++) {
        for (let y = 0; y < marbleCanvas.height; y++) {
          // MULTI-LAYER NOISE
          const n1 = noise(
            x * scale,
            y * scale
          )

          const n2 = noise(
            x * scale * 2,
            y * scale * 2
          )

          const value =
            n1 * 0.72 +
            n2 * 0.28

          // MARBLE FLOW
          const marble =
            Math.sin(
              x * 0.014 +
              value * 5.2 +
              y * 0.002
            ) *
              0.5 +
            0.5

          // VEINS
          const veins =
            Math.pow(
              Math.abs(
                Math.sin(
                  value * 8 +
                  x * 0.02
                )
              ),
              14
            ) * 85

          // LIMESTONE BASE
          const base =
            228 +
            marble * 20 -
            veins

          const r = base + 4
          const g = base
          const b = base - 8

          const cell =
            (x + y * marbleCanvas.width) * 4

          data[cell] = r
          data[cell + 1] = g
          data[cell + 2] = b
          data[cell + 3] = 255
        }
      }

      marbleCtx.putImageData(imgData, 0, 0)
    }

    const render = () => {
      t += 0.0008

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      // BASE
      ctx.fillStyle = '#f6f1e8'

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      // MARBLE TEXTURE
      ctx.globalAlpha = 0.42

      ctx.drawImage(
        marbleCanvas,
        Math.sin(t * 40) * -20,
        Math.cos(t * 30) * -12,
        canvas.width + 40,
        canvas.height + 24
      )

      ctx.globalAlpha = 1

      // TOP LIGHT
      const glow1 =
        ctx.createRadialGradient(
          canvas.width * 0.25,
          canvas.height * 0.2,
          0,
          canvas.width * 0.25,
          canvas.height * 0.2,
          700
        )

      glow1.addColorStop(
        0,
        'rgba(255,255,255,0.18)'
      )

      glow1.addColorStop(
        1,
        'rgba(255,255,255,0)'
      )

      ctx.fillStyle = glow1

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      // BOTTOM LIGHT
      const glow2 =
        ctx.createRadialGradient(
          canvas.width * 0.8,
          canvas.height * 0.75,
          0,
          canvas.width * 0.8,
          canvas.height * 0.75,
          800
        )

      glow2.addColorStop(
        0,
        'rgba(255,255,255,0.12)'
      )

      glow2.addColorStop(
        1,
        'rgba(255,255,255,0)'
      )

      ctx.fillStyle = glow2

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      // SOFT FOG
      for (let i = 0; i < 3; i++) {
        const x =
          canvas.width *
            (0.2 + i * 0.3) +
          Math.sin(t + i) * 50

        const y =
          canvas.height *
          (0.3 + i * 0.2)

        const fog =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            420
          )

        fog.addColorStop(
          0,
          'rgba(255,255,255,0.05)'
        )

        fog.addColorStop(
          1,
          'rgba(255,255,255,0)'
        )

        ctx.fillStyle = fog

        ctx.fillRect(
          x - 420,
          y - 420,
          840,
          840
        )
      }

      // DUST
      particles.forEach((p) => {
        p.y -= p.speed

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x =
            Math.random() *
            canvas.width
        }

        ctx.beginPath()

        ctx.arc(
          p.x,
          p.y,
          p.r,
          0,
          Math.PI * 2
        )

        ctx.fillStyle = `rgba(90,80,70,${p.alpha})`

        ctx.fill()
      })

      animationFrameId =
        requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(
        animationFrameId
      )

      window.removeEventListener(
        'resize',
        resize
      )
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
        background:
          'linear-gradient(180deg, #f8f4ec 0%, #f1ebe1 100%)',
        color: '#2a2622',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <MarbleCanvas />

      {/* FILM GRAIN */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.018,
          mixBlendMode: 'multiply',
          backgroundImage:
            'radial-gradient(#000 0.45px, transparent 0.45px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* DARK VIGNETTE */}
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
          padding:
            '120px 24px 140px',
        }}
      >
        {/* HERO */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '72px',
            alignItems: 'center',
            marginBottom: '190px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '0.35em',
                textTransform:
                  'uppercase',
                color: '#7b7168',
                marginBottom: '24px',
              }}
            >
              Olegas & Andrius Studija
            </p>

            <h1
              style={{
                fontSize:
                  'clamp(48px, 8vw, 82px)',
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing:
                  '-0.055em',
                marginBottom: '36px',
                maxWidth: '760px',
              }}
            >
              Kuriame
              <br />
              skaitmenines erdves,
              <br />
              kurios išlieka.
            </h1>

            <div
              style={{
                display: 'flex',
                flexDirection:
                  'column',
                gap: '22px',
                color: '#5f5851',
                fontSize: '18px',
                lineHeight: 1.95,
                maxWidth: '720px',
              }}
            >
              <p>
                Esame nepriklausoma
                kūrėjų studija,
                orientuota į
                ilgalaikius
                skaitmeninius
                projektus.
              </p>

              <p>
                Mums svarbus ne
                triukšmas ar
                trumpalaikis dėmesys,
                o ramus, aiškus ir
                estetiškas buvimas
                laike.
              </p>

              <p>
                Eternal Garden tapo
                vienu pirmųjų bandymų
                sukurti skaitmeninę
                erdvę, kuri nėra
                paremta algoritmais,
                spaudimu ar nuolatiniu
                skubėjimu.
              </p>
            </div>
          </div>

          <div
            style={{
              borderRadius: '42px',
              overflow: 'hidden',
              border:
                '1px solid rgba(90,80,70,0.14)',
              background:
                'rgba(255,255,255,0.34)',
              backdropFilter:
                'blur(20px)',
              boxShadow:
                '0 40px 120px rgba(0,0,0,0.10)',
            }}
          >
            <Image
              src="/images/about/about-team.jpg"
              alt="Olegas & Andrius Studija"
              width={900}
              height={1200}
              priority
              style={{
                width: '100%',
                aspectRatio: '0.78',
                objectFit: 'cover',
              }}
            />
          </div>
        </section>
      </main>
    </div>
  )
              }
