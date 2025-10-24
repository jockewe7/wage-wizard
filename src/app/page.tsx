
import { SimpleCalculator } from "./(calculator)/components/SimpleCalculator";
import { Calculator, TrendingUp, PiggyBank, BookOpen, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Frilanskalkylatorn - Gratis timpris och lönekalkylator för svenska frilansare",
  description: "Beräkna din optimala lön och utdelning som frilansare i Sverige. Gratis kalkylator som visar nettoinkomst, skatter och företagssparande baserat på aktuella svenska skatteregler 2024.",
  keywords: "frilans kalkylator, timpris kalkylator, lön utdelning, svenska frilansare, skattekalkylator, egenanställning, aktiebolag ekonomi",
  openGraph: {
    title: "Frilanskalkylatorn - Beräkna lön och utdelning för svenska frilansare",
    description: "Gratis kalkylator för svenska frilansare. Beräkna optimal lön, utdelning och skatter baserat på ditt timpris.",
    type: "website",
    locale: "sv_SE",
  },
  alternates: {
    canonical: "https://your-domain.com", // Replace with your actual domain
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Frilanskalkylatorn",
    "description": "Gratis kalkylator för svenska frilansare att beräkna optimal lön och utdelning",
    "url": "https://your-domain.com", // Replace with your actual domain
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "SEK"
    },
    "featureList": [
      "Beräkning av nettolön",
      "Utdelningsoptimering", 
      "Skattekalkylering",
      "Företagssparande analys"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Frilansare",
      "geographicArea": "Sverige"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            Frilanskalkylatorn
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
        <div className="text-center mt-12 py-6 bg-muted/20 rounded-xl border border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Behöver du mer detaljerade beräkningar?
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
            Utforska vår avancerade kalkylator för djupare analyser av lön, utdelning och kassaflöde.
          </p>
          <Link href="/freelance-wage-calculator">
            <Button size="default" className="font-semibold">
              Avancerad Kalkylator
            </Button>
          </Link>
        </div>
        
        {/* Content Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Lär dig mer om svenskt frilansande
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fördjupa dig i skatteregler, optimeringsstrategier och praktiska tips för att maximera din lönsamhet.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Link href="/blog">
              <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Artiklar & Skatteregler</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Läs våra djupgående artiklar om 3:12-regler, skattetabeller och optimeringsstrategier för svenska frilansare.
                </p>
                <span className="text-primary font-medium">Läs artiklar →</span>
              </Card>
            </Link>
            
            <Link href="/guides">
              <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Praktiska Guider</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Steg-för-steg guider som hjälper dig optimera lön och utdelning, förstå reglerna och maximera din ekonomi.
                </p>
                <span className="text-accent-foreground font-medium">Utforska guider →</span>
              </Card>
            </Link>
          </div>
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
    </>
  );
}
