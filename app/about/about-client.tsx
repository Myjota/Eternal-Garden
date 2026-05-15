'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { createNoise2D } from 'simplex-noise'

import { Card, CardContent } from '@/components/ui/card'

function MarbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const noise2D = createNoise2D()

    let animationFrameId: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()

    window.addEventListener('resize', resize)

    // PARTICLES
    const particles = Array.from({
      length: window.innerWidth < 768 ? 40 : 70,
    }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.03 + 0.008,
      speed: Math.random() * 0.04 + 0.01,
    }))

    // OFFSCREEN MARBLE
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
          // NOISE LAYERS
          const n1 = noise2D(
            x * scale,
            y * scale
          )

          const n2 = noise2D(
            x * scale * 2,
            y * scale * 2
          )

          const combined =
            n1 * 0.72 +
            n2 * 0.28

          // MARBLE FLOW
          const marble =
            Math.sin(
              x * 0.014 +
                combined * 4.5
            ) *
              0.5 +
            0.5

          // WARM LIMESTONE COLORS
          const base =
            232 + marble * 18

          const r = base + 4
          const g = base
          const b = base - 8

          const cell =
            (x + y * marbleCanvas.width) *
            4

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
      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        )

      gradient.addColorStop(0, '#f8f4ec')
      gradient.addColorStop(0.5, '#f1ebe1')
      gradient.addColorStop(1, '#ece4d8')

      ctx.fillStyle = gradient

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      // MARBLE TEXTURE
      ctx.globalAlpha = 0.32

      ctx.drawImage(
        marbleCanvas,
        Math.sin(t * 40) * -18,
        Math.cos(t * 28) * -10,
        canvas.width + 36,
        canvas.height + 20
      )

      ctx.globalAlpha = 1

      // LIGHT GLOW
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
        'rgba(255,255,255,0.14)'
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

      // SECOND GLOW
      const glow2 =
        ctx.createRadialGradient(
          canvas.width * 0.82,
          canvas.height * 0.75,
          0,
          canvas.width * 0.82,
          canvas.height * 0.75,
          800
        )

      glow2.addColorStop(
        0,
        'rgba(255,255,255,0.10)'
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

      // SOFT CLOUDS
      for (let i = 0; i < 3; i++) {
        const x =
          canvas.width *
            (0.2 + i * 0.3) +
          Math.sin(t + i) * 50

        const y =
          canvas.height *
          (0.3 + i * 0.2)

        const cloud =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            420
          )

        cloud.addColorStop(
          0,
          'rgba(255,255,255,0.05)'
        )

        cloud.addColorStop(
          1,
          'rgba(255,255,255,0)'
        )

        ctx.fillStyle = cloud

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
        opacity: 0.96,
      }}
    />
  )
}

export function AboutClient() {
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

      {/* GRAIN */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.018,
          backgroundImage:
            'radial-gradient(#000 0.45px, transparent 0.45px)',
          backgroundSize: '4px 4px',
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
                textTransform: 'uppercase',
                color: '#7b7168',
                marginBottom: '24px',
              }}
            >
              Kūrėjai Olegas & Andrius
            </p>

            <h1
              style={{
                fontSize:
                  'clamp(48px, 8vw, 82px)',
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing: '-0.055em',
                marginBottom: '36px',
                maxWidth: '760px',
              }}
            >
              Apie
              <br />
              Kūrėjus.
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
                Esame nepriklausoma kūrėjų
                komanda, priėmusi išūkį
                sukurti skaitmeninę 
                atminimo vietą.
              </p>

              <p>
                Ši vizija ir subūrė
                mus kartu į nedidelę komandą,
                kur vyrauja lygiateisiškumas
                ir komandinis darbas.
              </p>

              <p>
                Visapusiškas 
                dalijimasis idėjomis, darbu
                ir resursais, reguliarūs 
                susirinkimai siekiant,
                įgyvendinti naujausius
                išūkius.
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
              backdropFilter: 'blur(20px)',
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

        {/* PRINCIPLES */}
        <section
          style={{
            marginBottom: '180px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '72px',
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
              Mūsų tikslai
            </p>

            <h2
              style={{
                fontSize:
                  'clamp(38px, 6vw, 58px)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
              }}
            >
              Būti Pirmi
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
                t: 'Kūrybos Laisvė',
                d:
                  'Kūryba mums primena ąžuolą — ji tyliai dygsta, lėtai stiprėja ir galiausiai įauga į laiką.',
              },
              {
                t: 'Geras Pamatas',
                d:
                  'Projektą statome ant tvirto pagrindo — nuo technologijų iki dizaino filosofijos. Siekiame, kad tai išliktų aktualu ir po daugelio metų.',
              },
              {
                t: 'Partnerystė',
                d:
                  'Esame atviri žmonėms, idėjoms ir partnerystėms, kurios kuria ilgalaikę vertę.',
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
      </main>
    </div>
  )
}
