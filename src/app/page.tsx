
import { SimpleCalculator } from "./(calculator)/components/SimpleCalculator";
import { Calculator, TrendingUp, PiggyBank } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Frilanskalkylatorn",
  description: "Fördjupad beräkning för frilansare.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center py-12 lg:py-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Calculator className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
            Sweden Wage Wizard
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Beräkna din optimala lön och utdelning som frilansare i Sverige. 
            Få en snabb överblick över din ekonomi med vårt enkla verktyg.
          </p>
          
          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center p-6">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Snabba Beräkningar</h3>
              <p className="text-sm text-muted-foreground text-center">
                Få omedelbar feedback på hur olika timprisser påverkar din ekonomi
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <PiggyBank className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Optimal Fördelning</h3>
              <p className="text-sm text-muted-foreground text-center">
                Hitta den bästa balansen mellan lön, utdelning och företagssparande
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Svenska Skatteregler</h3>
              <p className="text-sm text-muted-foreground text-center">
                Byggt för svenskt skattesystem med aktuella skattesatser
              </p>
            </div>
          </div>
        </div>
        
        <SimpleCalculator />
        
        {/* CTA Section */}
        <div className="text-center mt-16 py-12 bg-muted/20 rounded-2xl border border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Behöver du mer detaljerade beräkningar?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Utforska vår avancerade kalkylator för djupare analyser av lön, utdelning, 
            kassaflöde och långsiktiga prognoser.
          </p>
          <Link href="/freelance-wage-calculator">
            <Button size="lg" className="font-semibold">
              Gå till Avancerad Kalkylator
            </Button>
          </Link>
        </div>
        
        <footer className="mt-16 py-8 text-center text-sm text-muted-foreground border-t border-border/50">
          <p className="mb-2">
            Detta är en förenklad kalkylator. Konsultera alltid en skatterådgivare för exakta beräkningar.
          </p>
          <p className="text-xs">
            Baserat på svenska skatteregler för 2024. Skattesatser kan ändras.
          </p>
        </footer>
      </div>
    </div>
  );
}
