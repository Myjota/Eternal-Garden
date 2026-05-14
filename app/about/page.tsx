'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function BackgroundCanvas() {
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

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.06)'
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
        background: '#0f0f10',
        color: '#f5f5f4',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BackgroundCanvas />

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
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#a1a1aa',
                marginBottom: '28px',
              }}
            >
              About Us
            </p>

            <h1
              style={{
                fontSize: '72px',
                lineHeight: 1.05,
                fontWeight: 500,
                marginBottom: '40px',
                letterSpacing: '-0.04em',
              }}
            >
              We are a small
              <br />
              independent team
              <br />
              building digital
              <br />
              projects differently.
            </h1>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                color: '#c4c4c5',
                fontSize: '18px',
                lineHeight: 1.9,
                maxWidth: '720px',
              }}
            >
              <p>
                Eternal Garden was created from a simple idea — that not every
                digital product has to compete for attention.
              </p>

              <p>
                Over time we became increasingly interested in building calmer,
                more meaningful experiences that focus on people instead of
                constant engagement.
              </p>

              <p>
                This project became an opportunity to explore a more thoughtful
                and long-term approach to technology, design, and digital space.
              </p>
            </div>
          </div>

          <div
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-40px',
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            <div
              style={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <Image
                src="/images/about/about-team.jpg"
                alt="About us"
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
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#a1a1aa',
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
              letterSpacing: '-0.04em',
              fontWeight: 500,
            }}
          >
            The internet became faster.
            <br />
            We wanted to build slower.
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              color: '#c4c4c5',
              fontSize: '19px',
              lineHeight: 1.95,
            }}
          >
            <p>
              We noticed that most modern platforms are designed around speed,
              algorithms, endless feeds, and short-term attention.
            </p>

            <p>
              Important memories and personal stories often become fragmented,
              temporary, or lost among constant digital noise.
            </p>

            <p>
              Instead of building another product focused purely on engagement,
              we wanted to experiment with something quieter and more personal.
            </p>

            <p>
              Eternal Garden became one of the first projects where we could
              fully express that philosophy as creators.
            </p>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section
          style={{
            marginBottom: '180px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '70px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#a1a1aa',
                marginBottom: '24px',
              }}
            >
              Our Approach
            </p>

            <h2
              style={{
                fontSize: '52px',
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                fontWeight: 500,
              }}
            >
              How we think about
              <br />
              creating digital products.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            <Card
              style={{
                borderRadius: '28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent style={{ padding: '42px' }}>
                <h3
                  style={{
                    fontSize: '26px',
                    marginBottom: '18px',
                    fontWeight: 600,
                  }}
                >
                  Independent
                </h3>

                <p
                  style={{
                    color: '#c4c4c5',
                    lineHeight: 1.9,
                    fontSize: '17px',
                  }}
                >
                  We prefer building thoughtfully instead of chasing every trend
                  or rapid growth strategy.
                </p>
              </CardContent>
            </Card>

            <Card
              style={{
                borderRadius: '28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent style={{ padding: '42px' }}>
                <h3
                  style={{
                    fontSize: '26px',
                    marginBottom: '18px',
                    fontWeight: 600,
                  }}
                >
                  Long-Term Thinking
                </h3>

                <p
                  style={{
                    color: '#c4c4c5',
                    lineHeight: 1.9,
                    fontSize: '17px',
                  }}
                >
                  We believe meaningful digital projects should still matter
                  years from now, not only during launch.
                </p>
              </CardContent>
            </Card>

            <Card
              style={{
                borderRadius: '28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent style={{ padding: '42px' }}>
                <h3
                  style={{
                    fontSize: '26px',
                    marginBottom: '18px',
                    fontWeight: 600,
                  }}
                >
                  Human Approach
                </h3>

                <p
                  style={{
                    color: '#c4c4c5',
                    lineHeight: 1.9,
                    fontSize: '17px',
                  }}
                >
                  We try to create calmer digital experiences that feel more
                  respectful and less overwhelming.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* TIMELINE */}
        <section
          style={{
            maxWidth: '860px',
            margin: '0 auto 180px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#a1a1aa',
              marginBottom: '24px',
            }}
          >
            Journey
          </p>

          <h2
            style={{
              fontSize: '52px',
              lineHeight: 1.1,
              marginBottom: '70px',
              letterSpacing: '-0.04em',
              fontWeight: 500,
            }}
          >
            Building one step at a time.
          </h2>

          <div
            style={{
              borderLeft: '1px solid rgba(255,255,255,0.12)',
              paddingLeft: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '54px',
            }}
          >
            <div>
              <p
                style={{
                  color: '#71717a',
                  marginBottom: '10px',
                }}
              >
                2025
              </p>

              <h3
                style={{
                  fontSize: '28px',
                  marginBottom: '18px',
                  fontWeight: 600,
                }}
              >
                First Ideas
              </h3>

              <p
                style={{
                  color: '#c4c4c5',
                  lineHeight: 1.9,
                  fontSize: '17px',
                }}
              >
                Early concepts around digital memory, preservation, and more
                meaningful online experiences.
              </p>
            </div>

            <div>
              <p
                style={{
                  color: '#71717a',
                  marginBottom: '10px',
                }}
              >
                2026
              </p>

              <h3
                style={{
                  fontSize: '28px',
                  marginBottom: '18px',
                  fontWeight: 600,
                }}
              >
                Building Eternal Garden
              </h3>

              <p
                style={{
                  color: '#c4c4c5',
                  lineHeight: 1.9,
                  fontSize: '17px',
                }}
              >
                Development of the platform, visual identity, and long-term
                creative direction.
              </p>
            </div>

            <div>
              <p
                style={{
                  color: '#71717a',
                  marginBottom: '10px',
                }}
              >
                Future
              </p>

              <h3
                style={{
                  fontSize: '28px',
                  marginBottom: '18px',
                  fontWeight: 600,
                }}
              >
                Continuing the Journey
              </h3>

              <p
                style={{
                  color: '#c4c4c5',
                  lineHeight: 1.9,
                  fontSize: '17px',
                }}
              >
                Continuing to build projects focused on long-term thinking,
                digital legacy, and more human-centered experiences.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              borderRadius: '36px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              padding: '80px 40px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2
              style={{
                fontSize: '52px',
                marginBottom: '28px',
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                fontWeight: 500,
              }}
            >
              Thank you for visiting.
            </h2>

            <p
              style={{
                color: '#c4c4c5',
                fontSize: '18px',
                lineHeight: 1.9,
                maxWidth: '760px',
                margin: '0 auto 42px',
              }}
            >
              We appreciate everyone interested not only in the product itself,
              but also in the ideas and philosophy behind it.
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
              
