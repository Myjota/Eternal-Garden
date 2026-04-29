export function MemorialHero({
  memorial,
  totalCandles,
  onLightCandle,
}) {
  return (
    <section className="relative py-16 text-center">
      
      <h1 className="text-4xl font-bold">
        {memorial.first_name} {memorial.last_name}
      </h1>

      <p className="mt-4">
        {memorial.biography}
      </p>

      <Button onClick={onLightCandle}>
        Light Candle ({totalCandles})
      </Button>

    </section>
  )
}
