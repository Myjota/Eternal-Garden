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

    // soft marble veins particles
    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.08 + 0.02,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // soft creamy marble base glow
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.3,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width
      )

      gradient.addColorStop(0, 'rgba(255, 248, 240, 0.55)')
      gradient.addColorStop(1, 'rgba(245, 245, 240, 0.05)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120, 130, 120, ${p.alpha})`
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
        background: 'linear-gradient(135deg, #f7f3ee 0%, #ece7df 50%, #f5f1ea 100%)',
        color: '#2f2f2a',
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
            marginBottom: '180px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#6e6b63',
                marginBottom: '28px',
              }}
            >
              About Us
            </p>

            <h1
              style={{
                fontSize: '70px',
                lineHeight: 1.05,
                fontWeight: 500,
                marginBottom: '40px',
                letterSpacing: '-0.03em',
                color: '#2b2a27',
              }}
            >
              We are a small
              <br />
              independent studio
              <br />
              building thoughtful
              <br />
              digital spaces.
            </h1>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                color: '#5f5c55',
                fontSize: '18px',
                lineHeight: 1.9,
                maxWidth: '720px',
              }}
            >
              <p>
                Eternal Garden was not created as a product idea first, but as
                a reflection of how we see digital life evolving.
              </p>

              <p>
                We are a small group of creators interested in long-term
                thinking, calm design, and meaningful digital presence.
              </p>

              <p>
                This project is part of our ongoing exploration of how
                technology can feel more natural, respectful, and timeless.
              </p>
            </div>
          </div>

          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '36px',
                overflow: 'hidden',
                border: '1px solid rgba(80,80,70,0.15)',
                background: 'rgba(255,255,255,0.6)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.08)',
              }}
            >
              <Image
                src="/images/about/about-team.jpg"
                alt="Team"
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
          </div>
        </section>

        {/* STORY */}
        <section
          style={{
            maxWidth: '820px',
            margin: '0 auto 180px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#6e6b63',
              marginBottom: '24px',
            }}
          >
            Why We Started
          </p>

          <h2
            style={{
              fontSize: '52px',
              lineHeight: 1.1,
              marginBottom: '42px',
              letterSpacing: '-0.03em',
              fontWeight: 500,
              color: '#2b2a27',
            }}
          >
            A calmer approach
            <br />
            to digital space.
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '26px',
              color: '#5f5c55',
              fontSize: '18px',
              lineHeight: 1.95,
            }}
          >
            <p>
              We observed how digital environments increasingly prioritize speed
              and constant interaction over clarity and depth.
            </p>

            <p>
              Many meaningful moments online become fragmented or lost over
              time, spread across platforms that were never designed for
              permanence.
            </p>

            <p>
              We wanted to approach digital creation differently — more slowly,
              more intentionally, and with more respect for what people leave
              behind.
            </p>

            <p>
              Eternal Garden is one expression of that direction in our work.
            </p>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section style={{ marginBottom: '180px' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#6e6b63',
                marginBottom: '24px',
              }}
            >
              Our Approach
            </p>

            <h2
              style={{
                fontSize: '52px',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                fontWeight: 500,
                color: '#2b2a27',
              }}
            >
              How we think about
              <br />
              building digital work.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {['Independence', 'Long-Term Thinking', 'Human Focus'].map(
              (title) => (
                <Card
                  key={title}
                  style={{
                    borderRadius: '30px',
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(120,110,100,0.15)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                  }}
                >
                  <CardContent style={{ padding: '40px' }}>
                    <h3
                      style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        fontWeight: 600,
                        color: '#2b2a27',
                      }}
                    >
                      {title}
                    </h3>

                    <p
                      style={{
                        color: '#5f5c55',
                        lineHeight: 1.9,
                        fontSize: '16px',
                      }}
                    >
                      We prioritize calm, clarity and long-term value over
                      fast-moving trends.
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </section>

        {/* FOOTER */}
        <section style={{ textAlign: 'center' }}>
          <div
            style={{
              borderRadius: '40px',
              border: '1px solid rgba(120,110,100,0.15)',
              background: 'rgba(255,255,255,0.65)',
              padding: '80px 40px',
              boxShadow: '0 30px 90px rgba(0,0,0,0.08)',
            }}
          >
            <h2
              style={{
                fontSize: '52px',
                marginBottom: '28px',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                fontWeight: 500,
                color: '#2b2a27',
              }}
            >
              Thank you for visiting
            </h2>

            <p
              style={{
                color: '#5f5c55',
                fontSize: '18px',
                lineHeight: 1.9,
                maxWidth: '760px',
                margin: '0 auto 42px',
              }}
            >
              We appreciate your interest in both our work and the ideas behind
              it.
            </p>

            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
                           }
