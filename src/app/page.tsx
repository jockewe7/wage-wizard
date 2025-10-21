import { Calculator } from "@/components/Calculator";
import Image from "next/image";


export default function Home() {
  return (
   <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Frilanskalkylatorn
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beräkna din lön, skatter, arbetsgivaravgifter och utdelning som frilansare i Sverige
          </p>
        </header>
        
        <Calculator />
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Detta är en förenklad kalkylator. Konsultera alltid en skatterådgivare för exakta beräkningar.</p>
        </footer>
      </div>
    </div>
  );
}
