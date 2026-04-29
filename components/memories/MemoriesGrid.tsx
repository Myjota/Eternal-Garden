import { MemorialCard } from './MemorialCard'

export function MemoriesGrid({
  items,
  images,
  viewLabel,
}: any) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((m: any, i: number) => (
          <MemorialCard
            key={m.id}
            memorial={m}
            image={images[i % images.length]}
            viewLabel={viewLabel}
          />
        ))}
      </div>
    </section>
  )
}
