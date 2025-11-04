import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import SectionPreview from '../components/SectionPreview';
import FoundryPulse from '../sections/FoundryPulse';
import ValueProposition from '../sections/ValueProposition';
import Forge from '../sections/TheForge';
import Showroom from '../sections/Showroom';
import EnterFoundry from '../sections/EnterFoundry';
import Crucible from '../sections/Crucible';
import StarterKit from '../sections/StarterKit';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FoundryPulse />
        <ValueProposition />

        {/* --- TEASER FOR THE FORGE --- */}
        <SectionPreview
          subtitle="Our Services"
          title="The Forge"
          description="From robust SaaS platforms to data-driven marketing strategies, we offer a complete suite of digital services built by the next generation of talent."
          imageUrl="work.png"
          linkTo="/forge"
        />

        {/* --- TEASER FOR THE SHOWROOM --- */}
        <SectionPreview
          subtitle="Our Work"
          title="The Showroom"
          description="We don't just talk about quality, we deliver it. Explore our gallery of finished projects and see the impact of our student-led teams."
          imageUrl="service.png"
          linkTo="/showroom"
          reverse={true} // This will flip the layout for visual variety
        />

        <EnterFoundry />
        <StarterKit />
        {/* We can decide later if Crucible needs its own preview or stays on the homepage */}
      </main>
    </>
  );
}