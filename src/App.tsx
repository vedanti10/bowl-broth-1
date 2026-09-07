import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { StudentBanner } from './components/StudentBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedRamen } from './components/FeaturedRamen';
import { BuildYourBowl } from './components/BuildYourBowl';
import { FlavourBoosters } from './components/FlavourBoosters';
import { OurStory } from './components/OurStory';
import { CampusHub } from './components/CampusHub';
import { EventsSection } from './components/EventsSection';
import { CollaborateSection } from './components/CollaborateSection';
import { PartnerSection } from './components/PartnerSection';
import { SocialSection } from './components/SocialSection';
import { MenuSection } from './components/MenuSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { PRODUCTS } from './data/menuData';
import { Product } from './types';

const MainApp: React.FC = () => {
  const { setQuickViewProduct } = useCart();
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#181512]">
      {/* Top Banner: Student Mode */}
      <StudentBanner />

      {/* Main Navbar */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 6: Hero */}
        <section id="hero">
          <Hero
            onOrderNow={() => scrollToSection('menu')}
            onBringToCampus={() => scrollToSection('campus')}
            onCustomBowl={() => scrollToSection('build-bowl')}
          />
        </section>

        {/* Section 7: Featured Ramen — Meet The Bowl Crew */}
        <FeaturedRamen
          products={PRODUCTS}
          onOpenQuickView={handleOpenQuickView}
        />

        {/* Section 8: Build Your Bowl — Interactive Workshop */}
        <BuildYourBowl />

        {/* Section 9: Chilli Oil & Sauces — The Flavour Boosters & The Slurp Kit */}
        <FlavourBoosters
          products={PRODUCTS}
          onOpenQuickView={handleOpenQuickView}
        />

        {/* Section 11: Campus Section — Deals, Challenges, Pop-Up Tour */}
        <CampusHub />

        {/* Section 10: Our Story — Manifesto */}
        <OurStory />

        {/* Section 13: Events — Fest Booking & Packages */}
        <EventsSection />

        {/* Section 14: Creators & Influencers */}
        <CollaborateSection />

        {/* Section 12 & 15: Partnerships (Canteens & Vendors) */}
        <PartnerSection />

        {/* Section 16: Social Media — Spotted: Bowl & Broth */}
        <SocialSection />

        {/* Section 5: Full Filterable Menu */}
        <MenuSection
          products={PRODUCTS}
          onOpenQuickView={handleOpenQuickView}
        />
      </main>

      {/* Section 18: Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOrderNow={() => scrollToSection('menu')}
      />

      {/* Interactive Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <ProductModal />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
