'use client'

import { MapPin, Navigation } from 'lucide-react'

interface BurialPlace {
  id: string
  name: string
  address?: string | null
  city?: string | null
  country?: string | null
  latitude?: number | null
  longitude?: number | null
  cemetery_name?: string | null
  section?: string | null
  plot_number?: string | null
}

interface BurialPlaceProps {
  burialPlace: BurialPlace
}

export function BurialPlace({ burialPlace }: BurialPlaceProps) {
  const hasLocation = burialPlace.latitude && burialPlace.longitude
  
  const locationParts = [
    burialPlace.address,
    burialPlace.city,
    burialPlace.country
  ].filter(Boolean)
  
  const locationString = locationParts.join(', ')
  
  const detailParts = [
    burialPlace.section && `Sektorius: ${burialPlace.section}`,
    burialPlace.plot_number && `Kapavietė: ${burialPlace.plot_number}`
  ].filter(Boolean)

  const openInMaps = () => {
    if (hasLocation) {
      const url = `https://www.google.com/maps/search/?api=1&query=${burialPlace.latitude},${burialPlace.longitude}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="memorial-section memorial-burial-place-section">
      <div className="memorial-container">
        
        {/* SECTION TITLE */}
        <h2 className="memorial-section-title memorial-font-heading">
          Palaidojimo vieta
        </h2>

        {/* BURIAL PLACE CARD */}
        <div className="memorial-burial-place-card">
          
          {/* CEMETERY NAME */}
          {burialPlace.cemetery_name && (
            <div className="memorial-burial-place-cemetery">
              <MapPin className="memorial-burial-place-icon" />
              <span className="memorial-burial-place-cemetery-name">
                {burialPlace.cemetery_name}
              </span>
            </div>
          )}

          {/* LOCATION */}
          {locationString && (
            <p className="memorial-burial-place-location">
              {locationString}
            </p>
          )}

          {/* DETAILS (SECTION & PLOT) */}
          {detailParts.length > 0 && (
            <div className="memorial-burial-place-details">
              {detailParts.map((detail, index) => (
                <span key={index} className="memorial-burial-place-detail">
                  {detail}
                </span>
              ))}
            </div>
          )}

          {/* OPEN IN MAPS BUTTON */}
          {hasLocation && (
            <button
              onClick={openInMaps}
              className="memorial-burial-place-maps-btn"
              aria-label="Atidaryti Google Maps"
            >
              <Navigation className="memorial-burial-place-btn-icon" />
              <span>Rodyti žemėlapyje</span>
            </button>
          )}

        </div>
      </div>
    </section>
  )
}
