'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { ThemeProvider } from '@/lib/themes/theme-context'

export default function AboutPage() {
  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen bg-background text-foreground">

        <main className="container mx-auto px-4 py-16 md:py-24">

          {/* HERO */}
          <section className="max-w-5xl mx-auto mb-28">

            <div className="grid lg:grid-cols-2 gap-14 items-center">

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
                  About Us
                </p>

                <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                  We are building
                  digital projects
                  with a more
                  human approach.
                </h1>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Eternal Garden was created by a small independent team
                    focused on long-term digital experiences and meaningful ideas.
                  </p>

                  <p>
                    We believe technology does not always need to be loud,
                    addictive, or built around endless engagement.
                  </p>

                  <p>
                    Sometimes digital spaces can simply exist to preserve,
                    remember, and give people a calmer place online.
                  </p>
                </div>
              </div>

              {/* VISUAL */}
              <div className="relative">

                <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl" />

                <div className="relative overflow-hidden rounded-3xl border bg-card">
                  <Image
                    src="/images/about/about-team.jpg"
                    alt="Team"
                    width={900}
                    height={1200}
                    priority
                    className="h-[620px] w-full object-cover"
                  />
                </div>

              </div>

            </div>

          </section>

          {/* STORY */}
          <section className="max-w-3xl mx-auto mb-28">

            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Why We Started
              </p>

              <h2 className="text-3xl md:text-4xl font-serif">
                The idea came from
                a simple observation.
              </h2>
            </div>

            <div className="space-y-7 text-lg leading-relaxed text-muted-foreground">

              <p>
                Over time we noticed that the internet became increasingly focused
                on speed, short attention spans, and temporary content.
              </p>

              <p>
                Important memories often become scattered across social media,
                old devices, forgotten accounts, or platforms that disappear over time.
              </p>

              <p>
                We wanted to explore a different direction —
                creating digital spaces that feel quieter, more respectful,
                and built with long-term thinking in mind.
              </p>

              <p>
                Eternal Garden became one of the first projects where we could
                fully express that philosophy as creators and developers.
              </p>

            </div>

          </section>

          {/* PRINCIPLES */}
          <section className="max-w-6xl mx-auto mb-28">

            <div className="text-center mb-14">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Our Approach
              </p>

              <h2 className="text-3xl md:text-4xl font-serif">
                How we think about
                building products.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">

              <Card className="rounded-3xl border-border/60">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Independent Thinking
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    We prefer building slowly and intentionally instead of
                    chasing trends or short-term attention.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-border/60">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Long-Term Vision
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    We believe meaningful digital projects should still matter
                    years from now, not only during launch week.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-border/60">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Human-Centered Design
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    Our goal is to create experiences that feel calm,
                    understandable, and respectful to the people using them.
                  </p>
                </CardContent>
              </Card>

            </div>

          </section>

          {/* TIMELINE */}
          <section className="max-w-4xl mx-auto mb-28">

            <div className="mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Journey
              </p>

              <h2 className="text-3xl md:text-4xl font-serif">
                Building step by step.
              </h2>
            </div>

            <div className="space-y-10 border-l pl-8 ml-2">

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  2025
                </p>

                <h3 className="text-xl font-semibold mb-3">
                  Initial Concept
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Early ideas and research around digital memory preservation,
                  long-term access, and memorial experiences.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  2026
                </p>

                <h3 className="text-xl font-semibold mb-3">
                  First Public Version
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Development of the first Eternal Garden platform and visual identity.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Future
                </p>

                <h3 className="text-xl font-semibold mb-3">
                  Long-Term Development
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Continuing to build thoughtful digital projects focused on memory,
                  legacy, and meaningful online experiences.
                </p>
              </div>

            </div>

          </section>

          {/* FOOTER CTA */}
          <section className="max-w-3xl mx-auto text-center">

            <div className="rounded-3xl border bg-card p-10 md:p-14">

              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Thank you for visiting.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We appreciate everyone who takes interest in what we are building
                and the ideas behind it.
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
    </ThemeProvider>
  )
}
