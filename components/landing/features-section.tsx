import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { MemorialIcon, LifeStoryIcon, CandleIcon, CommentsIcon, FamilyTreeIcon, QRCodeIcon } from '@/components/icons'
import { type Translations } from '@/lib/i18n/locales/lt'
import { type ThemeId } from '@/lib/themes/config'

interface FeaturesSectionProps {
  t: Translations
  theme?: ThemeId
}

export function FeaturesSection({ t, theme = 'garden' }: FeaturesSectionProps) {
  const features = [
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

  const isMarble = theme === 'marble'

  return (
    <section className={`py-16 md:py-24 relative ${isMarble ? 'bg-[#faf8f5]' : 'bg-background'}`}>
      {/* Marble texture background */}
      {isMarble && (
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q25 10 50 20 T100 20' fill='none' stroke='%23d4c4a8' stroke-width='0.5' opacity='0.5'/%3E%3Cpath d='M0 40 Q30 30 60 40 T100 40' fill='none' stroke='%23d4c4a8' stroke-width='0.3' opacity='0.3'/%3E%3Cpath d='M0 60 Q20 50 40 60 T80 60 T100 55' fill='none' stroke='%23d4c4a8' stroke-width='0.4' opacity='0.4'/%3E%3Cpath d='M0 80 Q35 70 70 80 T100 80' fill='none' stroke='%23d4c4a8' stroke-width='0.3' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 100px',
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Eternal Garden"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </div>
          <h2 className={`font-serif text-3xl font-bold md:text-4xl ${isMarble ? 'text-[#2d5a3d]' : 'text-primary'}`}>
            Eternal Garden
          </h2>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className={`h-px w-12 ${isMarble ? 'bg-[#d4c4a8]' : 'bg-primary/30'}`} />
            <svg className={`h-4 w-8 ${isMarble ? 'text-[#d4c4a8]' : 'text-primary/50'}`} viewBox="0 0 32 16">
              <path
                d="M0 8 Q8 0 16 8 Q24 16 32 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <div className={`h-px w-12 ${isMarble ? 'bg-[#d4c4a8]' : 'bg-primary/30'}`} />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <h3 className={`text-2xl font-semibold mb-4 ${isMarble ? 'text-[#1a1a1a]' : 'text-foreground'}`}>
            {t.features.title}
          </h3>
          <p className={`max-w-2xl mx-auto leading-relaxed ${isMarble ? 'text-[#4a4a4a]' : 'text-muted-foreground'}`}>
            {t.features.description}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border transition-all duration-300 ${
                isMarble 
                  ? 'bg-white/80 border-[#d4c4a8]/50 hover:border-[#d4c4a8] hover:shadow-lg backdrop-blur' 
                  : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`feature-icon shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    isMarble 
                      ? 'bg-[#f5f3ef] border border-[#d4c4a8]/30' 
                      : 'bg-primary/10'
                  }`}>
                    <feature.icon className={`h-6 w-6 ${isMarble ? 'text-[#2d5a3d]' : 'text-primary'}`} />
                  </div>
                  {/* Content */}
                  <div>
                    <h4 className={`font-semibold mb-2 ${isMarble ? 'text-[#1a1a1a]' : 'text-foreground'}`}>
                      {feature.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${isMarble ? 'text-[#4a4a4a]' : 'text-muted-foreground'}`}>
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
