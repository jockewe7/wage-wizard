import { AdvancedCalculator } from "@/app/(calculator)/components/AdvancedCalculator";

export const metadata = {
  title: "Avancerad kalkylator",
  description: "Fördjupad beräkning för frilansare.",
};

export default function AdvancedCalculatorPage() {
  return (
    <div className='min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <header className='text-center mb-12'>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Beräkna din lön, skatter, arbetsgivaravgifter och utdelning som
            frilansare i Sverige
          </p>
        </header>

        <AdvancedCalculator />
      </div>
    </div>
  );
}
