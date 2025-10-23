
import { SimpleCalculator } from "./(calculator)/components/SimpleCalculator";

export const metadata = {
  title: "Frilanskalkylatorn",
  description: "Fördjupad beräkning för frilansare.",
};

export default function Home() {
  return (
   <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <SimpleCalculator />
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Detta är en förenklad kalkylator. Konsultera alltid en skatterådgivare för exakta beräkningar.</p>
        </footer>
      </div>
    </div>
  );
}
