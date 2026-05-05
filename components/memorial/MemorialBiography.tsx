'use client'

interface MemorialBiographyProps {
  biography?: string
}

export function MemorialBiography({ biography }: MemorialBiographyProps) {
  if (!biography || !biography.trim()) return null

  return (
    <section className="memorial-section memorial-biography-section">
      
      <div className="memorial-container">
        
        {/* SECTION TITLE */}
        <h2 className="memorial-section-title memorial-font-heading">
          Gyvenimo istorija
        </h2>

        {/* BIO CONTENT */}
        <div className="memorial-biography memorial-font-body">
          {biography.split('\n').map((paragraph, index) => (
            <p key={index} className="memorial-biography-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

      </div>

    </section>
  )
}
