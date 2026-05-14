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

    const particles = Array.from({ length: 140 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2.6 + 0.8,
      speedX: (Math.random() - 0.5) * 0.22,
      speedY: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.14 + 0.03,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // marble base
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      g.addColorStop(0, '#f8f3ea')
      g.addColorStop(0.5, '#efe7db')
      g.addColorStop(1, '#f6f1e7')

      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // marble veins (stronger, more visible)
      ctx.globalAlpha = 0.45
      for (let i = 0; i < 22; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, 0)

        for (let y = 0; y < canvas.height; y += 35) {
          ctx.lineTo(
            Math.random() * canvas.width + Math.sin(y * 0.012 + i) * 110,
            y
          )
        }

        ctx.strokeStyle = 'rgba(110,100,90,0.10)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // particles
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(70,60,55,${p.alpha})`
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
          padding: '120px 24px 120px',
        }}
      >

        {/* HERO */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            gap: '70px',
            alignItems: 'center',
            marginBottom: '170px',
          }}
        >
          <div>
            <p style={{ fontSize: '12px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6b625a', marginBottom: '26px' }}>
              Olegas & Andrius Studija
            </p>

            <h1 style={{ fontSize: '72px', lineHeight: 1.05, fontWeight: 500, marginBottom: '36px', letterSpacing: '-0.04em' }}>
              Kuriame skaitmenines
              <br />
              erdves, kurios išlieka.
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', color: '#5f5851', fontSize: '18px', lineHeight: 1.9, maxWidth: '740px' }}>
              <p>
                Esame nedidelė nepriklausoma kūrėjų studija – Olegas & Andrius Studija –
                dirbanti su ilgalaikiais skaitmeniniais projektais, kurie orientuoti ne į
                trumpalaikį dėmesį, o į prasmingą buvimą laike.
              </p>

              <p>
                Mums svarbiausia ne greitis, ne tendencijos ir ne triukšmas. Svarbiausia –
                aiškumas, estetika ir tai, kas išlieka tada, kai viskas kita išblėsta.
              </p>

              <p>
                Eternal Garden gimė kaip viena iš pirmųjų mūsų bandymų sukurti
                skaitmeninę erdvę, kuri nėra paremta skubėjimu ar algoritmų spaudimu.
              </p>

              <p>
                Tai nėra produktas vien tik funkcine prasme – tai mūsų požiūrio
                į skaitmeninę ateitį išraiška.
              </p>
            </div>
          </div>

          <div style={{ borderRadius: '42px', overflow: 'hidden', border: '1px solid rgba(90,80,70,0.22)', boxShadow: '0 50px 140px rgba(0,0,0,0.10)' }}>
            <Image
              src="/images/about/about-team.jpg"
              alt="Olegas & Andrius Studija"
              width={900}
              height={1200}
              priority
              style={{ width: '100%', height: '740px', objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* STORY */}
        <section style={{ maxWidth: '900px', margin: '0 auto 170px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6b625a', marginBottom: '22px' }}>
            Kodėl pradėjome
          </p>

          <h2 style={{ fontSize: '54px', lineHeight: 1.1, marginBottom: '40px', fontWeight: 500 }}>
            Idėja gimė ne iš produkto,
            <br />
            o iš nuovargio triukšmui.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', color: '#5f5851', fontSize: '18px', lineHeight: 1.95 }}>
            <p>
              Stebėdami šiuolaikinį internetą matėme, kaip dauguma skaitmeninių
              platformų tampa vis labiau orientuotos į greitį, vartojimą ir
              nuolatinį vartotojo dėmesio išlaikymą.
            </p>

            <p>
              Tokioje aplinkoje prasmingi dalykai dažnai tampa trumpalaikiai –
              jie pasimeta tarp algoritmų, srautų ir nuolatinio informacijos pertekliaus.
            </p>

            <p>
              Mes pradėjome kelti paprastą klausimą – ar įmanoma sukurti skaitmeninę
              erdvę, kuri būtų ramesnė, lėtesnė ir labiau žmogiška?
            </p>

            <p>
              Iš šio klausimo ir gimė mūsų studija bei pirmieji projektai, tarp jų – Eternal Garden.
            </p>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section style={{ marginBottom: '170px' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6b625a' }}>
              Mūsų požiūris
            </p>

            <h2 style={{ fontSize: '54px', fontWeight: 500 }}>
              Kaip mes kuriame
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '26px' }}>
            {[
              {
                t: 'Nepriklausomybė',
                d: 'Kuriame be išorinio spaudimo ir trumpalaikių trendų.'
              },
              {
                t: 'Ilgalaikis mąstymas',
                d: 'Projektai kuriami taip, kad išliktų aktualūs po metų ar dešimtmečių.'
              },
              {
                t: 'Žmogiškas požiūris',
                d: 'Technologija turi tarnauti žmogui, o ne jį pervarginti.'
              }
            ].map((i) => (
              <Card key={i.t} style={{ borderRadius: '30px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(90,80,70,0.18)' }}>
                <CardContent style={{ padding: '44px' }}>
                  <h3 style={{ fontSize: '24px', marginBottom: '14px' }}>{i.t}</h3>
                  <p style={{ color: '#5f5851', lineHeight: 1.85 }}>{i.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section style={{ maxWidth: '900px', margin: '0 auto 170px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6b625a', marginBottom: '22px' }}>
            Kelionė
          </p>

          <h2 style={{ fontSize: '54px', marginBottom: '60px', fontWeight: 500 }}>
            Studijos istorija
          </h2>

          <div style={{ borderLeft: '1px solid rgba(90,80,70,0.22)', paddingLeft: '34px', display: 'flex', flexDirection: 'column', gap: '52px' }}>
            <div>
              <h3>2025 – Pradžia</h3>
              <p style={{ color: '#5f5851' }}>
                Pirmosios idėjos apie skaitmeninę atmintį ir ramesnį internetą.
              </p>
            </div>

            <div>
              <h3>2026 – Studijos formavimas</h3>
              <p style={{ color: '#5f5851' }}>
                Sukurta Olegas & Andrius Studija ir pirmi projektai.
              </p>
            </div>

            <div>
              <h3>Ateitis</h3>
              <p style={{ color: '#5f5851' }}>
                Toliau kuriame sistemas, kurios akcentuoja laiką, estetiką ir ramybę.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section style={{ textAlign: 'center' }}>
          <div style={{ borderRadius: '46px', border: '1px solid rgba(90,80,70,0.22)', background: 'rgba(255,255,255,0.55)', padding: '86px 40px', boxShadow: '0 60px 160px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '54px', marginBottom: '26px' }}>
              Ačiū, kad skiriate laiko
            </h2>

            <p style={{ color: '#5f5851', fontSize: '18px', lineHeight: 1.9, maxWidth: '780px', margin: '0 auto 42px' }}>
              Mums svarbu ne tik tai, ką kuriame, bet ir tai, kokias idėjas
              paliekame po savęs.
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
            
