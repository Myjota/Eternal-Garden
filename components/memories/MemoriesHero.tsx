import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function MemoriesHero({
  title,
  placeholder,
  searchQuery,
  setSearchQuery,
}: {
  title: string
  placeholder: string
  searchQuery: string
  setSearchQuery: (v: string) => void
}) {
  return (
    <section className="bg-muted/30 border-b border-border">
      <div className="container mx-auto px-4 py-12 text-center">

        <h1 className="font-serif text-3xl md:text-4xl font-bold">
          {title}
        </h1>

        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Atraskite ir prisiminkite tuos, kurie paliko pėdsaką istorijoje.
        </p>

        <div className="mt-8 max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>

          <Input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 rounded-full"
          />
        </div>

      </div>
    </section>
  )
}
