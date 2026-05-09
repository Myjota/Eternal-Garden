import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  MemorialIcon,
  LifeStoryIcon,
  CandleIcon,
  CommentsIcon,
  FamilyTreeIcon,
  QRCodeIcon,
} from '@/components/icons'
import { type Translations } from '@/lib/i18n/locales/lt'

interface FeaturesSectionProps {
  t: Translations
}

const features = (t: Translations) => [
  {
    icon: MemorialIcon,
    title: t.features.memorial.title,
    description: t.features.memorial.description,
  },
  {
    icon: LifeStoryIcon,
    title: t.features.lifeStory.title,
    description: t.features.lifeStory.description,
  },
  {
    icon: CandleIcon,
    title: t.features.candles.title,
    description: t.features.candles.description,
  },
  {
    icon: CommentsIcon,
    title: t.features.comments.title,
    description: t.features.comments.description,
  },
  {
    icon: FamilyTreeIcon,
    title: t.features.familyTree.title,
    description: t.features.familyTree.description,
  },
  {
    icon: QRCodeIcon,
    title: t.features.qrCode.title,
    description: t.features.qrCode.description,
  },
]

export function FeaturesSection({ t }: FeaturesSectionProps) {
  return (
    <section className="py-16 md:py-24 relative bg-[#faf8f5] overflow-hidden">

      {/* subtle background glow texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(212,196,168,0.25) 0%, transparent 40%),
              radial-gradient(circle at 80% 40%, rgba(212,196,168,0.18) 0%, transparent 45%),
              radial-gradient(circle at 50% 80%, rgba(45,90,61,0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Eternal Garden"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2d5a3d]">
            Eternal Garden
          </h2>

          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-12 bg-[#d4c4a8]" />
            <div className="w-2 h-2 rounded-full bg-[#d4c4a8]" />
            <div className="h-px w-12 bg-[#d4c4a8]" />
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-[#1a1a1a]">
            {t.features.title}
          </h3>
          <p className="max-w-2xl mx-auto text-[#4a4a4a] leading-relaxed">
            {t.features.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features(t).map((feature, index) => (
            <Card
              key={index}
              className="
                border border-[#d4c4a8]/40
                bg-white/70 backdrop-blur-sm
                rounded-xl
                shadow-sm
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
              "
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[#f5f3ef] border border-[#d4c4a8]/30 flex items-center justify-center shrink-0">
                    <feature.icon className="h-6 w-6 text-[#2d5a3d]" />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[#4a4a4a] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
