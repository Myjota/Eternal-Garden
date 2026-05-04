'use client'  
  
import Image from 'next/image'  
  
interface MemorialHeroProps {  
  memorial: any  
  theme?: string  
}  
  
export function MemorialHero({  
  memorial,  
}: MemorialHeroProps) {  
  
  const birthDate = memorial.birth_date  
    ? new Date(memorial.birth_date).toLocaleDateString('lt-LT')  
    : null  
  
  const deathDate = memorial.death_date  
    ? new Date(memorial.death_date).toLocaleDateString('lt-LT')  
    : null  
  
  const epitaph =  
    memorial.epitaph?.trim() || 'Visada liks mūsų širdyse'  
  
  const normalizeImage = (url: any) => {  
    if (typeof url !== 'string') return null  
  
    const cleaned = url.trim().toLowerCase()  
  
    if (  
      !cleaned ||  
      cleaned === 'null' ||  
      cleaned === 'undefined' ||  
      cleaned === 'false'  
    ) return null  
  
    return url  
  }  
  
  const coverImage = normalizeImage(memorial.cover_image_url)  
  const profileImage =  
    normalizeImage(memorial.profile_image_url) || '/images/logo.png'  
  
  return (  
    <section className="memorial-cover memorial-section-top">  
  
      {/* ============================================  
          BACKGROUND (CSS THEME HANDLES EVERYTHING)  
          ============================================ */}  
      <div className="memorial-bg-wrapper absolute inset-0 z-0">  
  
        {/* THEME GLOW BACKGROUND */}  
        <div className="theme-glow-bg absolute inset-0" />  
  
        {/* COVER IMAGE (LAYER 1) */}  
        {coverImage && (  
          <div className="memorial-bg-image">  
            <Image  
              src={coverImage}  
              alt=""  
              fill  
              priority  
              className="memorial-hero-image"  
            />  
          </div>  
        )}  
  
      </div>  
  
      {/* ============================================  
          CONTENT (LAYER 2)  
          ============================================ */}  
      <div className="memorial-content memorial-font-base relative z-20">  
  
        {/* PROFILE IMAGE WITH GLOW */}  
        <div className="memorial-profile-container">  
          <div className="portrait-frame theme-card-glow">  
  
            <Image  
              src={profileImage}  
              alt={`${memorial.first_name} ${memorial.last_name}`}  
              fill  
              className="memorial-hero-image"  
              priority  
            />  
          </div>  
        </div>  
  
        {/* NAME WITH HEADING FONT */}  
        <h1 className="memorial-name memorial-font-heading">  
          {memorial.first_name} {memorial.last_name}  
        </h1>  
  
        {/* LOCATION (if available) */}  
        {memorial.location && (  
          <p className="memorial-location memorial-font-accent">  
            📍 {memorial.location}  
          </p>  
        )}  
  
        {/* EPITAPH WITH BODY FONT */}  
        <p className="memorial-epitaph memorial-font-body">  
          "{epitaph}"  
        </p>  
  
        {/* DATES */}  
        {(birthDate || deathDate) && (  
          <p className="memorial-dates memorial-font-accent">  
            {birthDate || '—'} – {deathDate || '—'}  
          </p>  
        )}  
  
        {/* BIO WITH BODY FONT */}  
        {memorial.biography && (  
          <p className="memorial-bio memorial-font-body">  
            {memorial.biography}  
          </p>  
        )}  
  
      </div>  
    </section>  
  )  
            } 
