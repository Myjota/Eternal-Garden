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

    // STATIC VEINS
    const veins = Array.from({ length: 7 }).map((_, i) => {
      const points = []

      let x = Math.random() * canvas.width
      let drift = (Math.random() - 0.5) * 0.6

      for (let y = -100; y < canvas.height + 100; y += 60) {
        x += Math.sin(y * 0.003 + i * 2) * 18 + drift * 12

        points.push({
          x,
          y,
        })
      }

      return points
    })

    // SOFT PARTICLES
    const particles = Array.from({
      length: window.innerWidth < 768 ? 40 : 70,
    }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.04 + 0.01,
      speed: Math.random() * 0.08 + 0.02,
    }))

    const render = () => {
      t += 0.0015

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // BASE GRADIENT
      const g = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      )

      g.addColorStop(0, '#f8f4ed')
      g.addColorStop(0.5, '#efe6d8')
      g.addColorStop(1, '#f3eee6')

      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // AMBIENT LIGHT
      const glow1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        600
      )

      glow1.addColorStop(0, 'rgba(255,255,255,0.18)')
      glow1.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.fillStyle = glow1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // SECOND GLOW
      const glow2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        700
      )

      glow2.addColorStop(0, 'rgba(255,255,255,0.12)')
      glow2.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.fillStyle = glow2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // MARBLE VEINS
      veins.forEach((vein, i) => {
        ctx.beginPath()

        vein.forEach((p, index) => {
          const animatedX =
            p.x + Math.sin(t + p.y * 0.002 + i) * 6

          if (index === 0) {
            ctx.moveTo(animatedX, p.y)
          } else {
            ctx.lineTo(animatedX, p.y)
          }
        })

        ctx.strokeStyle =
          i % 2 === 0
            ? 'rgba(120,110,100,0.06)'
            : 'rgba(160,150,140,0.04)'

        ctx.lineWidth = i % 3 === 0 ? 2 : 1

        ctx.stroke()
      })

      // SOFT DEPTH CLOUDS
      for (let i = 0; i < 3; i++) {
        const x =
          canvas.width * (0.2 + i * 0.3) +
          Math.sin(t + i) * 40

        const y =
          canvas.height * (0.3 + i * 0.2)

        const cloud = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          400
        )

        cloud.addColorStop(
          0,
          'rgba(255,255,255,0.08)'
        )

        cloud.addColorStop(
          1,
          'rgba(255,255,255,0)'
        )

        ctx.fillStyle = cloud

        ctx.fillRect(
          x - 400,
          y - 400,
          800,
          800
        )
      }

      // FLOATING DUST
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

      animationFrameId =
        requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
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
        opacity: 0.95,
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
          'linear-gradient(180deg, #f8f4ed 0%, #efe6d8 100%)',
        color: '#2a2622',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <MarbleCanvas />

      {/* GRAIN OVERLAY */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.025,
          zIndex: 1,
          backgroundImage:
            'radial-gradient(#000 0.5px, transparent 0.5px)',
          backgroundSize: '4px 4px',
        }}
      />

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 24px',
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
            marginBottom: '180px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#7b7168',
                marginBottom: '24px',
              }}
            >
              Olegas & Andrius Studija
            </p>

            <h1
              style={{
                fontSize: 'clamp(48px, 8vw, 78px)',
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing: '-0.05em',
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
                flexDirection: 'column',
                gap: '22px',
                color: '#5f5851',
                fontSize: '18px',
                lineHeight: 1.95,
                maxWidth: '720px',
              }}
            >
              <p>
                Esame nepriklausoma kūrėjų studija,
                orientuota į ilgalaikius
                skaitmeninius projektus.
              </p>

              <p>
                Mums svarbus ne triukšmas ar
                trumpalaikis dėmesys, o ramus,
                aiškus ir estetiškas buvimas laike.
              </p>

              <p>
                Eternal Garden tapo vienu pirmųjų
                bandymų sukurti skaitmeninę erdvę,
                kuri nėra paremta spaudimu,
                algoritmais ar nuolatiniu skubėjimu.
              </p>
            </div>
          </div>

          <div
            style={{
              borderRadius: '42px',
              overflow: 'hidden',
              border:
                '1px solid rgba(90,80,70,0.16)',
              boxShadow:
                '0 40px 120px rgba(0,0,0,0.10)',
              background: 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(20px)',
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

        {/* STORY */}
        <section
          style={{
            maxWidth: '900px',
            margin: '0 auto 180px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#7b7168',
              marginBottom: '22px',
            }}
          >
            Kodėl pradėjome
          </p>

          <h2
            style={{
              fontSize: 'clamp(38px, 6vw, 58px)',
              lineHeight: 1.08,
              marginBottom: '40px',
              fontWeight: 500,
              letterSpacing: '-0.04em',
            }}
          >
            Idėja gimė
            <br />
            iš nuovargio triukšmui.
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              color: '#5f5851',
              fontSize: '18px',
              lineHeight: 1.95,
            }}
          >
            <p>
              Šiuolaikinis internetas tampa vis
              greitesnis, triukšmingesnis ir labiau
              orientuotas į trumpalaikį dėmesį.
            </p>

            <p>
              Prasmingi dalykai dažnai pasimeta tarp
              algoritmų, srautų ir nuolatinio
              informacijos pertekliaus.
            </p>

            <p>
              Pradėjome kelti klausimą — ar įmanoma
              sukurti ramesnę ir žmogiškesnę
              skaitmeninę erdvę?
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
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#7b7168',
                marginBottom: '18px',
              }}
            >
              Mūsų požiūris
            </p>

            <h2
              style={{
                fontSize: 'clamp(38px, 6vw, 58px)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
              }}
            >
              Kaip mes kuriame
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
            }}
          >
            {[
              {
                t: 'Nepriklausomybė',
                d:
                  'Kuriame be spaudimo, trumpalaikių trendų ir dirbtinio skubėjimo.',
              },
              {
                t: 'Ilgalaikis mąstymas',
                d:
                  'Projektai kuriami taip, kad išliktų aktualūs po metų ar dešimtmečių.',
              },
              {
                t: 'Žmogiškas požiūris',
                d:
                  'Technologija turi suteikti ramybę, aiškumą ir buvimo jausmą.',
              },
            ].map((i) => (
              <Card
                key={i.t}
                style={{
                  borderRadius: '32px',
                  background:
                    'rgba(255,255,255,0.34)',
                  border:
                    '1px solid rgba(90,80,70,0.12)',
                  backdropFilter: 'blur(18px)',
                  boxShadow:
                    '0 20px 60px rgba(90,80,70,0.06)',
                }}
              >
                <CardContent
                  style={{
                    padding: '44px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '24px',
                      marginBottom: '14px',
                    }}
                  >
                    {i.t}
                  </h3>

                  <p
                    style={{
                      color: '#5f5851',
                      lineHeight: 1.9,
                    }}
                  >
                    {i.d}
                  </p>
                </CardContent>
              </Card>
            ))}
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
              borderRadius: '46px',
              border:
                '1px solid rgba(90,80,70,0.14)',
              background:
                'rgba(255,255,255,0.42)',
              backdropFilter: 'blur(24px)',
              padding: '90px 40px',
              boxShadow:
                '0 50px 140px rgba(0,0,0,0.10)',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(38px, 6vw, 58px)',
                marginBottom: '26px',
                fontWeight: 500,
                letterSpacing: '-0.04em',
              }}
            >
              Ačiū,
              <br />
              kad skiriate laiko.
            </h2>

            <p
              style={{
                color: '#5f5851',
                fontSize: '18px',
                lineHeight: 1.9,
                maxWidth: '760px',
                margin: '0 auto 42px',
              }}
            >
              Mums svarbu ne tik tai,
              ką kuriame, bet ir tai,
              kokias idėjas paliekame po savęs.
            </p>

            <Button
              variant="outline"
              asChild
            >
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
