import React, { useState } from 'react';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { CustomCursor } from './components/ui/CustomCursor';
import { ElectricGridBg } from './components/ui/ElectricGridBg';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { HeroVideoBanner } from './components/sections/HeroVideoBanner';
import { BrandStorySection } from './components/sections/BrandStorySection';
import { ProductShowcaseSection } from './components/sections/ProductShowcaseSection';
import { SmartAppSection } from './components/sections/SmartAppSection';
import { BatteryTechSection } from './components/sections/BatteryTechSection';
import { PerformanceSection } from './components/sections/PerformanceSection';
import { DetailedSpecsTableSection } from './components/sections/DetailedSpecsTableSection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { FinanceSection } from './components/sections/FinanceSection';
import { DealershipSection } from './components/sections/DealershipSection';
import { PressTestimonialsSection } from './components/sections/PressTestimonialsSection';
import { BookingDocumentsSection } from './components/sections/BookingDocumentsSection';
import { FAQSection } from './components/sections/FAQSection';
import { MegaCTASection } from './components/sections/MegaCTASection';
import { Footer } from './components/ui/Footer';
import { BookingModal } from './components/ui/BookingModal';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-[#00f0ff] selection:text-black font-sans relative overflow-x-hidden">
      {/* Branded Loading Screen Experience */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Ambient Electric Grid Background */}
      <ElectricGridBg />

      {/* Main Sticky Navbar */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Page Flow */}
      <main className="relative z-10 w-full">
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />
        <HeroVideoBanner />
        <BrandStorySection />
        <ProductShowcaseSection onOpenBooking={() => setIsBookingOpen(true)} />
        <SmartAppSection />
        <BatteryTechSection />
        <PerformanceSection />
        <DetailedSpecsTableSection />
        <ComparisonSection onOpenBooking={() => setIsBookingOpen(true)} />
        <FinanceSection onOpenBooking={() => setIsBookingOpen(true)} />
        <DealershipSection onOpenBooking={() => setIsBookingOpen(true)} />
        <PressTestimonialsSection />
        <BookingDocumentsSection onOpenBooking={() => setIsBookingOpen(true)} />
        <FAQSection />
        <MegaCTASection onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Booking Modal Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

export default App;
