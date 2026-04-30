# Eternal Garden – Pilnas Projekto Dokumentas

## Projekto Vizija
**Eternal Garden** – tai skaitmeninė memorialų platforma, skirta pagerbti artimųjų ir augintinių atminimą moderniu, estetišku ir ilgaamžiu būdu. Platforma sujungia atminties išsaugojimą, šeimos istorijas, bendruomenės palaikymą ir individualų vizualinį stilių.

Tikslas – sukurti vietą, kur prisiminimai išlieka gyvi, prieinami šeimai ir draugams iš bet kurios pasaulio vietos.

---

## Pagrindinės Funkcijos

### Memorialo Puslapis
Kiekvienas memorialas turi unikalų viešą puslapį su:
- Vardu, pavarde, gimimo / išėjimo datomis
- Nuotrauka arba portretu
- Biografija / gyvenimo istorija
- Žvakių sistema
- Peržiūrų statistika
- Timeline (gyvenimo įvykiai)
- Nuotraukų galerija
- Užuojautos žinutėmis
- Dalinimosi funkcija

### Temos (Themes)
Kiekvienas memorialas gali turėti individualų dizainą:
- Garden (nemokama)
- Marble
- Orthodox
n- Eternal Night
- Sunny Window
- Rainbow Bridge (augintiniams)
- Ateityje +20 papildomų temų

Temos keičia:
- Spalvas
- Fonus
- Glow efektus
- Rėmelius
- Dekoracijas
- Hero sekcijos nuotaiką

### Žvakių Sistema
Lankytojai gali uždegti virtualią žvakę:
- Realus degimo laikas
- Vartotojo vardas
- Žinutė
- Degimo istorija
- Premium boost funkcijos

### Timeline
Gyvenimo kelio įvykiai:
- Datos
- Nuotraukos
- Vieta
- Aprašymas

### Gallery
Nuotraukų ir video galerija.

### Condolences
Artimųjų ir draugų žinutės.

---

## Vartotojų Tipai

### Guest
- Peržiūri memorialus
- Uždega žvakę
- Rašo užuojautą

### User
- Kuria memorialus
- Valdo temas
- Įkelia nuotraukas
- Redaguoja turinį

### Moderator
- Tikrina turinį
- Sprendžia report'us

### Admin
- Pilna sistemos kontrolė
- Vartotojų valdymas
- Mokėjimai
- Temų valdymas
- Analitika

---

## Monetizacija

### Free Plan
- 1 memorialas
- Garden theme
- Ribota galerija

### Premium Memorial
- Premium temos
- Daugiau galerijos vietos
- Custom URL
- Boost funkcijos
- Family badge
- Advanced candle options

### Papildomos Paslaugos
- Candle Boost
- Memorial Boost
- Family Badge
- Extra Storage
- Forever Lock

---

## Technologijos

### Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Supabase Auth
- Supabase Database
- Supabase Storage
- Realtime features

### Deploy
- Vercel

---

## Sistemos Architektūra

### Frontend Struktūra
- app/
- components/
- hooks/
- lib/
- styles/
- types/

### Theme Sistema
Globali CSS tokenų sistema su `data-theme` atributu.

Pvz:
```html
<div data-theme="marble">
```

Visi komponentai automatiškai paveldi temos stilių.

---

## Memorial Page Flow
1. Atidaromas `/memorials/[slug]`
2. Server fetch iš Supabase
3. Gaunami duomenys + theme
4. MemorialClient uždeda `data-theme`
5. Visi child komponentai gauna stilių automatiškai

---

## Ateities Funkcijos
- AI biografijos generatorius
- Auto slideshow
- Voice memorial messages
- QR antkapio kodai
- Live remembrance day reminders
- Family tree integration
- Multi-language pages
- NFT legacy archive

---

## Dizaino Kryptis
Projektas turi kelti jausmą:
- Ramybės
- Orumo
- Šviesos
- Prisiminimų šilumos
- Elegancijos
- Ilgaamžiškumo

---

## Tikslinė Auditorija
- Šeimos po netekties
- Laidojimo namai
- Gyvūnų mylėtojai
- Genealogijos entuziastai
- Bendruomenės ir religinės organizacijos

---

## Projekto Vertė
Eternal Garden nėra tik puslapis. Tai skaitmeninė vieta, kur meilė ir prisiminimai lieka gyvi ilgus metus.

