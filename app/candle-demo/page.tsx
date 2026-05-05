import { CandleSection } from "@/components/candle/CandleSection";

export default function CandleDemoPage() {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Žvakių Sekcijos Demo
        </h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl text-white/80 mb-4">Pagrindinė žvakių sekcija:</h2>
            <CandleSection />
          </div>
          
          <div>
            <h2 className="text-xl text-white/80 mb-4">Jau uždegta žvakė:</h2>
            <CandleSection initialLit={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
