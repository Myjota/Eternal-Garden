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
    <section className="memorial-cover min-h-[70vh] py-20 text-center overflow-hidden">  
  
      {/* ============================================  
          BACKGROUND (CSS THEME HANDLES EVERYTHING)  
          ============================================ */}  
      <div className="memorial-bg-wrapper absolute inset-0 z-0">  
  
        {/* COVER IMAGE (LAYER 1) */}  
        {coverImage && (  
          <div className="memorial-bg-image">  
            <Image  
              src={coverImage}  
              alt=""  
              fill  
              priority  
              className="object-cover"  
            />  
          </div>  
        )}  
  
      </div>  
  
      {/* ============================================  
          CONTENT (LAYER 2)  
          ============================================ */}  
      <div className="memorial-content relative z-20">  
  
        {/* PROFILE IMAGE */}  
        <div className="relative mx-auto mb-8 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56">  
          <div className="portrait-frame relative h-full w-full rounded-full overflow-hidden">  
  
            <Image  
              src={profileImage}  
              alt={`${memorial.first_name} ${memorial.last_name}`}  
              fill  
              className="object-cover"  
              priority  
            />  
          </div>  
  
          <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.15)]" />  
        </div>  
  
        {/* NAME */}  
        <h1 className="memorial-name text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight">  
          {memorial.first_name} {memorial.last_name}  
        </h1>  
  
        {/* EPITAPH */}  
        <p className="memorial-epitaph mt-6 text-lg sm:text-xl italic max-w-xl mx-auto leading-relaxed">  
          "{epitaph}"  
        </p>  
  
        {/* DATES */}  
        {(birthDate || deathDate) && (  
          <p className="memorial-dates mt-4 text-sm text-muted-foreground">  
            {birthDate || '—'} – {deathDate || '—'}  
          </p>  
        )}  
  
        {/* BIO */}  
        {memorial.biography && (  
          <p className="memorial-bio mt-6 text-sm text-muted-foreground max-w-2xl mx-auto line-clamp-3">  
            {memorial.biography}  
          </p>  
        )}  
  
      </div>  
    </section>  
  )  
            } 
