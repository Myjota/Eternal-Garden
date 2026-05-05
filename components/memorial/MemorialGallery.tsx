'use client'

import Image from 'next/image'

interface GalleryItem {
  id: string
  image_url: string
  title?: string | null
}

interface MemorialGalleryProps {
  items: GalleryItem[]
}

export function MemorialGallery({ items }: MemorialGalleryProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="memorial-gallery-section memorial-section">

      <div className="memorial-container">

        {/* TITLE */}
        <h2 className="memorial-section-title memorial-font-heading">
          Atminimo galerija
        </h2>

        {/* GRID */}
        <div className="memorial-gallery-grid">

          {items.map((item) => (
            <div key={item.id} className="memorial-gallery-item">

              <div className="memorial-gallery-image-wrapper">

                <Image
                  src={item.image_url}
                  alt={item.title || 'Memorial image'}
                  fill
                  className="memorial-gallery-image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

              </div>

              {item.title && (
                <p className="memorial-gallery-caption">
                  {item.title}
                </p>
              )}

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}
