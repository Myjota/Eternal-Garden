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

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2.4 + 0.8,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.12 + 0.03,
      shade: Math.random() > 0.5 ? 1 : 0,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // stronger marble base
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      g.addColorStop(0, '#f8f3ea')
      g.addColorStop(0.5, '#efe7db')
      g.addColorStop(1, '#f6f1e7')

      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // marble veins
      ctx.globalAlpha = 0.35
      for (let i = 0; i < 18; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, 0)

        for (let y = 0; y < canvas.height; y += 40) {
          ctx.lineTo(
            Math.random() * canvas.width + Math.sin(y * 0.01 + i) * 80,
            y
          )
        }

        ctx.strokeStyle = 'rgba(120,110,100,0.08)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // floating particles
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(80,70,60,${p.alpha})`
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
      }}
    />
  )
}

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f6f1e7',
        color: '#2a2622',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <MarbleCanvas />

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 24px 100px',
        }}
      >
        {/* HERO */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '64px',
            alignItems: 'center',
            marginBottom: '160px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#6b625a',
                marginBottom: '26px',
              }}
            >
              Olegas & Andrius Studija
            </p>

            <h1
              style={{
                fontSize: '72px',
                lineHeight: 1.05,
                fontWeight: 500,
                marginBottom: '36px',
                letterSpacing: '-0.04em',
              }}
            >
              Kuriame skaitmenines
              <br />
              erdves kitaip.
            </h1>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: '#5f5851',
                fontSize: '18px',
                lineHeight: 1.9,
                maxWidth: '720px',
              }}
            >
              <p>
                Esame nedidelė nepriklausoma kūrėjų studija, dirbanti su
                ilgalaikiais skaitmeniniais projektais.
              </p>

              <p>
                Mums svarbiausia ne greitis ar tendencijos, o prasmė,
                kokybė ir laikas.
              </p>

              <p>
                Eternal Garden yra vienas iš projektų, kuris atsirado iš
                mūsų bendro požiūrio į tai, kaip turėtų atrodyti skaitmeninė
                ateitis.
              </p>
            </div>
          </div>

          <div
            style={{
              borderRadius: '40px',
              overflow: 'hidden',
              border: '1px solid rgba(90,80,70,0.2)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.10)',
              background: '#fff',
            }}
          >
            <Image
              src="/images/about/about-team.jpg"
              alt="Studija"
              width={900}
              height={1200}
              priority
              style={{
                width: '100%',
                height: '720px',
                objectFit: 'cover',
              }}
            />
          </div>
        </section>

        {/* STORY */}
        <section
          style={{
            maxWidth: '860px',
            margin: '0 auto 160px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#6b625a',
              marginBottom: '22px',
            }}
          >
            Kodėl pradėjome
          </p>

          <h2
            style={{
              fontSize: '52px',
              lineHeight: 1.1,
              marginBottom: '38px',
              letterSpacing: '-0.03em',
              fontWeight: 500,
            }}
          >
            Idėja gimė iš
            <br />
            paprasto pastebėjimo.
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              color: '#5f5851',
              fontSize: '18px',
              lineHeight: 1.95,
            }}
          >
            <p>
              Pastebėjome, kad dauguma skaitmeninių platformų yra orientuotos
              į greitį, dėmesio išlaikymą ir nuolatinį srautą.
            </p>

            <p>
              Tuo tarpu svarbūs prisiminimai dažnai pasimeta arba išsisklaido
              tarp skirtingų sistemų.
            </p>

            <p>
              Norėjome sukurti kažką ramesnio – skaitmeninę erdvę, kuri
              nebūtų paremta triukšmu.
            </p>

            <p>
              Taip atsirado mūsų studijos kryptis ir pirmieji projektai.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <section style={{ textAlign: 'center' }}>
          <div
            style={{
              borderRadius: '44px',
              border: '1px solid rgba(90,80,70,0.2)',
              background: 'rgba(255,255,255,0.6)',
              padding: '80px 40px',
              boxShadow: '0 50px 140px rgba(0,0,0,0.10)',
            }}
          >
            <h2
              style={{
                fontSize: '52px',
                marginBottom: '24px',
                lineHeight: 1.1,
              }}
            >
              Ačiū, kad apsilankėte
            </h2>

            <p
              style={{
                color: '#5f5851',
                fontSize: '18px',
                lineHeight: 1.9,
                maxWidth: '760px',
                margin: '0 auto 40px',
              }}
            >
              Vertiname žmones, kurie domisi ne tik produktu, bet ir idėja
              už jo.
            </p>

            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Grįžti į pradžią
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
                }
